from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from models import MercadoPagoSettings, Subscription, User
from auth.dependencies import get_current_user
from config import settings
from utils import encrypt_value, decrypt_value, mask_token, slugify_external_reference
from utils.mercadopago_client import MercadoPagoClient
from pydantic import BaseModel, EmailStr

router = APIRouter(prefix="/mercadopago", tags=["mercadopago"])


class MercadoPagoConfigUpdate(BaseModel):
    environment: str
    public_key: str
    access_token: str
    client_id: str | None = None
    client_secret: str | None = None
    preapproval_plan_id: str | None = None


class MercadoPagoConfigResponse(BaseModel):
    environment: str
    public_key: str
    access_token: str
    client_id: str | None = None
    client_secret: str | None = None
    preapproval_plan_id: str | None = None


class SubscriptionRequest(BaseModel):
    reason: str
    external_reference: str
    payer_email: EmailStr


class SubscriptionResponse(BaseModel):
    init_point: str
    mp_subscription_id: str


@router.post("/config", response_model=MercadoPagoConfigResponse)
async def update_config(config: MercadoPagoConfigUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    mp_settings = db.query(MercadoPagoSettings).first()
    encrypted_token = encrypt_value(config.access_token)
    encrypted_secret = encrypt_value(config.client_secret) if config.client_secret else None
    if mp_settings is None:
        mp_settings = MercadoPagoSettings(
            environment=config.environment,
            public_key=config.public_key,
            access_token_encrypted=encrypted_token,
            client_id=config.client_id,
            client_secret_encrypted=encrypted_secret,
            preapproval_plan_id=config.preapproval_plan_id,
        )
        db.add(mp_settings)
    else:
        mp_settings.environment = config.environment
        mp_settings.public_key = config.public_key
        mp_settings.access_token_encrypted = encrypted_token
        mp_settings.client_id = config.client_id
        mp_settings.client_secret_encrypted = encrypted_secret
        mp_settings.preapproval_plan_id = config.preapproval_plan_id
    db.commit()
    db.refresh(mp_settings)
    return MercadoPagoConfigResponse(
        environment=mp_settings.environment,
        public_key=mp_settings.public_key,
        access_token=mask_token(decrypt_value(mp_settings.access_token_encrypted) or ""),
        client_id=mp_settings.client_id,
        client_secret=mp_settings.client_secret_encrypted and mask_token(decrypt_value(mp_settings.client_secret_encrypted) or ""),
        preapproval_plan_id=mp_settings.preapproval_plan_id,
    )


@router.get("/config", response_model=MercadoPagoConfigResponse)
async def get_config(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    mp_settings = db.query(MercadoPagoSettings).first()
    if not mp_settings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="MP settings not configured")
    return MercadoPagoConfigResponse(
        environment=mp_settings.environment,
        public_key=mp_settings.public_key,
        access_token=mask_token(decrypt_value(mp_settings.access_token_encrypted) or ""),
        client_id=mp_settings.client_id,
        client_secret=mp_settings.client_secret_encrypted and mask_token(decrypt_value(mp_settings.client_secret_encrypted) or ""),
        preapproval_plan_id=mp_settings.preapproval_plan_id,
    )


@router.post("/test-connection")
async def test_connection(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    mp_settings = db.query(MercadoPagoSettings).first()
    if not mp_settings:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="MP settings not configured")
    token = decrypt_value(mp_settings.access_token_encrypted)
    if not token:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to decrypt MP token")
    client = MercadoPagoClient(token)
    try:
        await client.validate_token()
        return {"message": "Conectado com sucesso."}
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    finally:
        await client.close()


@router.post("/plan/validate")
async def validate_plan(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    mp_settings = db.query(MercadoPagoSettings).first()
    if not mp_settings or not mp_settings.access_token_encrypted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="MP settings not configured")
    token = decrypt_value(mp_settings.access_token_encrypted)
    if not token:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to decrypt MP token")
    client = MercadoPagoClient(token)
    try:
        if not mp_settings.preapproval_plan_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Preapproval Plan ID não configurado")
        plan = await client.get_preapproval(mp_settings.preapproval_plan_id)
        return plan
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    finally:
        await client.close()


@router.post("/subscribe", response_model=SubscriptionResponse)
async def subscribe(request: SubscriptionRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    mp_settings = db.query(MercadoPagoSettings).first()
    if not mp_settings or not mp_settings.access_token_encrypted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="MP settings not configured")
    token = decrypt_value(mp_settings.access_token_encrypted)
    if not token:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to decrypt MP token")
    client = MercadoPagoClient(token)

    if not mp_settings.preapproval_plan_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Preapproval Plan ID não configurado")

    payload = {
        "preapproval_plan_id": mp_settings.preapproval_plan_id,
        "reason": request.reason,
        "external_reference": request.external_reference,
        "payer_email": request.payer_email,
        "back_url": settings.mp_back_url,
        "status": "authorized",
    }
    try:
        result = await client.create_subscription(payload)
        subscription = Subscription(
            user_id=current_user.id,
            mp_subscription_id=result.get("id", ""),
            external_reference=result.get("external_reference"),
            preapproval_plan_id=result.get("preapproval_plan_id", ""),
            reason=result.get("reason", ""),
            payer_email=result.get("payer_email", ""),
            back_url=result.get("back_url", ""),
            init_point=result.get("init_point", ""),
            payer_id=result.get("payer_id"),
            card_id=result.get("card_id"),
            payment_method_id=result.get("payment_method_id"),
            next_payment_date=result.get("next_payment_date"),
            status=result.get("status", ""),
            frequency=settings.mp_frequency,
            frequency_type=settings.mp_frequency_type,
            transaction_amount=settings.mp_plan_price,
            currency_id=settings.mp_currency,
            start_date=result.get("start_date"),
            end_date=result.get("end_date"),
            free_trial=False,
        )
        db.add(subscription)
        db.commit()
        db.refresh(subscription)
        return SubscriptionResponse(init_point=result.get("init_point", ""), mp_subscription_id=subscription.mp_subscription_id)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc))
    finally:
        await client.close()

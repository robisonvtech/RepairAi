from datetime import datetime
from fastapi import APIRouter, Request, HTTPException, status, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import MercadoPagoSettings, Subscription, Payment
from utils import decrypt_value
from utils.mercadopago_client import MercadoPagoClient

router = APIRouter(prefix="/webhook", tags=["webhook"])


@router.post("/mercadopago")
async def mercadopago_webhook(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    topic = body.get("topic") or body.get("type")
    resource = body.get("data", {}).get("id") or body.get("id")
    if not topic or not resource:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid webhook payload")

    mp_settings = db.query(MercadoPagoSettings).first()
    if not mp_settings or not mp_settings.access_token_encrypted:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="MP settings not configured")
    token = decrypt_value(mp_settings.access_token_encrypted)
    if not token:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to decrypt MP token")

    client = MercadoPagoClient(token)
    try:
        if topic in ["preapproval", "preapproval.created", "preapproval.updated"]:
            preapproval = await client.get_preapproval(resource)
            subscription = db.query(Subscription).filter(Subscription.mp_subscription_id == preapproval.get("id")).first()
            if subscription:
                subscription.status = preapproval.get("status", subscription.status)
                subscription.last_modified = preapproval.get("last_modified", subscription.last_modified)
                db.add(subscription)
                db.commit()
        elif topic in ["payment", "payment.created", "payment.updated"]:
            payment = await client.get_payment(resource)
            subscription = db.query(Subscription).filter(Subscription.mp_subscription_id == payment.get("preapproval_id")).first()
            if subscription:
                payment_item = Payment(
                    subscription_id=subscription.id,
                    mp_payment_id=payment.get("id", ""),
                    status=payment.get("status", ""),
                    payment_method_id=payment.get("payment_method_id"),
                    collector_id=payment.get("collector_id"),
                    application_id=payment.get("application_id"),
                    transaction_amount=payment.get("transaction_amount", 0.0),
                    currency_id=payment.get("currency_id", ""),
                    date_approved=payment.get("date_approved"),
                    external_reference=payment.get("external_reference"),
                    description=payment.get("description"),
                )
                db.add(payment_item)
                subscription.status = payment.get("status", subscription.status)
                db.commit()
        return {"success": True}
    finally:
        await client.close()

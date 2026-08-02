from pydantic import BaseSettings, Field, AnyUrl


class Settings(BaseSettings):
    app_name: str = Field("RepairAI", env="APP_NAME")
    debug: bool = Field(True, env="DEBUG")
    host: str = Field("0.0.0.0", env="HOST")
    port: int = Field(8000, env="PORT")

    secret_key: str = Field(..., env="SECRET_KEY")
    algorithm: str = Field("HS256", env="ALGORITHM")
    access_token_expire_minutes: int = Field(60, env="ACCESS_TOKEN_EXPIRE_MINUTES")

    database_url: str = Field("sqlite:///./repairai.db", env="DATABASE_URL")

    mp_environment: str = Field("sandbox", env="MP_ENVIRONMENT")
    mp_public_key: str = Field(..., env="MP_PUBLIC_KEY")
    mp_access_token: str = Field(..., env="MP_ACCESS_TOKEN")
    mp_client_id: str | None = Field(None, env="MP_CLIENT_ID")
    mp_client_secret: str | None = Field(None, env="MP_CLIENT_SECRET")
    mp_plan_id: str | None = Field(None, env="MP_PLAN_ID")
    mp_plan_name: str = Field("PLANO ELITE", env="MP_PLAN_NAME")
    mp_plan_price: float = Field(29.90, env="MP_PLAN_PRICE")
    mp_currency: str = Field("BRL", env="MP_CURRENCY")
    mp_frequency: int = Field(1, env="MP_FREQUENCY")
    mp_frequency_type: str = Field("months", env="MP_FREQUENCY_TYPE")
    mp_back_url: AnyUrl = Field("http://localhost:8000/return", env="MP_BACK_URL")
    mp_webhook_url: AnyUrl = Field("http://localhost:8000/webhook/mercadopago", env="MP_WEBHOOK_URL")

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

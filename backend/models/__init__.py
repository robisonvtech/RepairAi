from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    plan = Column(String(50), default="free")
    theme = Column(String(20), default="light")
    last_login = Column(DateTime, nullable=True)
    last_ip = Column(String(50), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    subscriptions = relationship("Subscription", back_populates="user")
    sessions = relationship("Session", back_populates="user")
    notifications = relationship("Notification", back_populates="user")
    logs = relationship("Log", back_populates="user")


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    mp_subscription_id = Column(String(255), unique=True, nullable=False, index=True)
    external_reference = Column(String(255), nullable=True)
    preapproval_plan_id = Column(String(255), nullable=False)
    reason = Column(String(255), nullable=False)
    payer_email = Column(String(255), nullable=False)
    back_url = Column(String(255), nullable=True)
    init_point = Column(String(255), nullable=False)
    payer_id = Column(String(255), nullable=True)
    card_id = Column(String(255), nullable=True)
    payment_method_id = Column(String(255), nullable=True)
    next_payment_date = Column(String(50), nullable=True)
    date_created = Column(DateTime, default=datetime.utcnow)
    last_modified = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    status = Column(String(50), nullable=False)
    frequency = Column(Integer, nullable=False)
    frequency_type = Column(String(50), nullable=False)
    transaction_amount = Column(Float, nullable=False)
    currency_id = Column(String(10), nullable=False)
    start_date = Column(String(50), nullable=True)
    end_date = Column(String(50), nullable=True)
    free_trial = Column(Boolean, default=False)

    user = relationship("User", back_populates="subscriptions")
    payments = relationship("Payment", back_populates="subscription")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    subscription_id = Column(Integer, ForeignKey("subscriptions.id", ondelete="CASCADE"), nullable=False)
    mp_payment_id = Column(String(255), unique=True, nullable=False, index=True)
    status = Column(String(50), nullable=False)
    payment_method_id = Column(String(255), nullable=True)
    collector_id = Column(String(255), nullable=True)
    application_id = Column(String(255), nullable=True)
    transaction_amount = Column(Float, nullable=False)
    currency_id = Column(String(10), nullable=False)
    date_approved = Column(DateTime, nullable=True)
    date_created = Column(DateTime, default=datetime.utcnow)
    last_modified = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    external_reference = Column(String(255), nullable=True)
    description = Column(Text, nullable=True)

    subscription = relationship("Subscription", back_populates="payments")


class MercadoPagoSettings(Base):
    __tablename__ = "mercado_pago_settings"

    id = Column(Integer, primary_key=True, index=True)
    environment = Column(String(50), nullable=False, default="sandbox")
    public_key = Column(String(255), nullable=False)
    access_token_encrypted = Column(Text, nullable=False)
    client_id = Column(String(255), nullable=True)
    client_secret_encrypted = Column(Text, nullable=True)
    preapproval_plan_id = Column(String(255), nullable=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Theme(Base):
    __tablename__ = "theme"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    theme_name = Column(String(50), nullable=False, default="light")
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User")


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    session_token = Column(String(255), unique=True, nullable=False, index=True)
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="sessions")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")


class Log(Base):
    __tablename__ = "logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(255), nullable=False)
    detail = Column(Text, nullable=True)
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="logs")

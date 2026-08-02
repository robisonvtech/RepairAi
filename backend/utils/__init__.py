import base64
import hashlib
from cryptography.fernet import Fernet, InvalidToken
from config import settings


def _get_cipher() -> Fernet:
    raw_key = settings.secret_key.encode("utf-8")
    digest = hashlib.sha256(raw_key).digest()
    key = base64.urlsafe_b64encode(digest)
    return Fernet(key)


def encrypt_value(value: str) -> str:
    cipher = _get_cipher()
    return cipher.encrypt(value.encode("utf-8")).decode("utf-8")


def decrypt_value(token: str) -> str | None:
    try:
        cipher = _get_cipher()
        return cipher.decrypt(token.encode("utf-8")).decode("utf-8")
    except InvalidToken:
        return None


def mask_token(token: str) -> str:
    if not token or len(token) < 10:
        return "********"
    prefix = token[:10]
    suffix = token[-4:]
    return f"{prefix}...{suffix}"


def slugify_external_reference(user_id: int, suffix: str) -> str:
    safe_suffix = suffix.replace("@", "-").replace(" ", "-").lower()
    return f"user-{user_id}-{safe_suffix}"

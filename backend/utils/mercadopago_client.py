import httpx
from config import settings


class MercadoPagoClient:
    BASE_URL = "https://api.mercadopago.com"

    def __init__(self, access_token: str):
        self.access_token = access_token
        self.client = httpx.AsyncClient(base_url=self.BASE_URL, timeout=20.0)

    async def _request(self, method: str, path: str, json: dict | None = None, params: dict | None = None):
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json",
        }
        response = await self.client.request(method, path, json=json, params=params, headers=headers)
        response.raise_for_status()
        return response.json()

    async def validate_token(self):
        return await self._request("GET", "/users/me")

    async def create_subscription(self, payload: dict):
        return await self._request("POST", "/preapproval", json=payload)

    async def get_preapproval(self, preapproval_id: str):
        return await self._request("GET", f"/preapproval/{preapproval_id}")

    async def get_payment(self, payment_id: str):
        return await self._request("GET", f"/v1/payments/{payment_id}")

    async def close(self):
        await self.client.aclose()

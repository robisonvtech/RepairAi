from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, Base
from auth.routes import router as auth_router
from mercadopago import router as mp_router
from webhooks import router as webhook_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="RepairAI Subscription API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")

app.include_router(auth_router)
app.include_router(mp_router)
app.include_router(webhook_router)


@app.get("/")
def root():
    return {"status": "ok", "message": "RepairAI backend is running."}

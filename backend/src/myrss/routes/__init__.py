from fastapi import APIRouter

from myrss.routes.v1 import router as v1_router

router = APIRouter(prefix="/api", tags=["V1"])

router.include_router(v1_router)

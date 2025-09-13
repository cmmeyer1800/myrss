from fastapi import APIRouter

from myrss.routes.v1.rss import router as rss_router

router = APIRouter(prefix="/v1")

router.include_router(rss_router)
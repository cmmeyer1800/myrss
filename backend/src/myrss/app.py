from fastapi import FastAPI, Request
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

from myrss.core.logging import logger
from myrss.routes import router

app = FastAPI(
    docs_url="/api/docs",
    openapi_url="/api/openapi.json",
)

@app.get("/liveness", tags=[""])
async def liveness():
    return {"status": "up"}

@app.middleware("http")
async def log_request(request: Request, call_next):
    response = await call_next(request)
    logger.info("request_completed", path=request.url.path, method=request.method, status_code=response.status_code)
    return response


app.include_router(router)

FastAPIInstrumentor.instrument_app(app)

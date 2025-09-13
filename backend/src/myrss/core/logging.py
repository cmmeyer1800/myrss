# logging_setup.py
import logging
import structlog
from opentelemetry import trace

def add_trace_id(logger, method_name, event_dict):
    span = trace.get_current_span()
    if span and span.get_span_context().is_valid:
        event_dict["trace_id"] = format(span.get_span_context().trace_id, '032x')
    return event_dict

# Configure structlog
structlog.configure(
    processors=[
        add_trace_id,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ],
    logger_factory=structlog.stdlib.LoggerFactory(),
)

logging.basicConfig(level=logging.INFO)
logger = structlog.get_logger()

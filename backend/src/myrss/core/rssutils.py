from datetime import datetime
from typing import List, Optional, Annotated
from pydantic import BaseModel
from pydantic.functional_validators import BeforeValidator
import xmltodict


def parse_rss_date(date_string: str) -> datetime:
    return datetime.strptime(date_string, "%a, %d %b %Y %H:%M:%S %z")

# -----------------------------
# 1. Define Pydantic models
# -----------------------------
class Item(BaseModel):
    title: Optional[str]
    link: Optional[str]
    description: Optional[str]
    pubDate: Annotated[datetime, BeforeValidator(func = parse_rss_date)]


class Channel(BaseModel):
    title: str
    link: str
    description: str
    item: List[Item]


class Rss(BaseModel):
    version: Optional[str] = None
    channel: Channel


# -----------------------------
# 2. Parse RSS XML into Pydantic
# -----------------------------
def parse_rss(xml_string: str) -> Rss:
    parsed = xmltodict.parse(xml_string)
    rss_dict = parsed["rss"]

    return Rss(**rss_dict)  # type: ignore

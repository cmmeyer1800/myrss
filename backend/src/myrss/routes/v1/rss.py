import asyncio
from datetime import datetime, timedelta, UTC
from typing import Coroutine, Any, Optional

import httpx
from fastapi import APIRouter

from myrss.core.settings import config
from myrss.core.rssutils import parse_rss, Rss

router = APIRouter(prefix="/rss")


@router.get("/preview")
async def rss_preview():
    return config.sources

@router.get("/")
async def rss_feeds(
    until: Optional[datetime] = None,
    tag: Optional[str] = "All"
) -> list[Rss]:
    """
    Get all RSS feeds

    args:
        until: Optional[datetime] = get all feeds until this date, default is now - 7 days
    """
    if until is None:
        until = datetime.now(tz=UTC) - timedelta(days=7)

    feed_reqs: list[Coroutine[Any, Any, httpx.Response]] = []
    async with httpx.AsyncClient(timeout=10.0) as client:  # TODO: Make timeout configurable
        for source in config.sources:
            if tag != "All" and tag not in source.tags:
                continue
            feed_reqs.append(client.get(source.url))  # TODO: add logging and error handling

        responses = await asyncio.gather(*feed_reqs)
    
    rsss = []
    for response in responses:
        if response.status_code == 200:
            rss = parse_rss(response.text)
            rss.channel.item = [item for item in rss.channel.item if item.pubDate > until]
            rsss.append(rss)

    return rsss


@router.get("/tags")
async def rss_tags() -> list[str]:
    tags = set()
    for source in config.sources:
        tags.update(source.tags)
    return list(tags)

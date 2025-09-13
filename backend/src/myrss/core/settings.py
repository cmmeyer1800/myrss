from typing import List, Annotated

import yaml
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings


class RSSSource(BaseModel):
    name: str
    url: str
    tags: List[str]


class Settings(BaseSettings):
    config: str = Field("/conf.yaml", alias="RSS_CONFIG")


class Config(BaseSettings):
    sources: List[RSSSource]

    @classmethod
    def load(cls: type["Config"], path: str) -> "Config":
        return cls.parse_obj(yaml.safe_load(open(path)))

settings = Settings()  # type: ignore
config = Config.load(settings.config)

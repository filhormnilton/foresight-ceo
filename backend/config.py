from pydantic_settings import BaseSettings
from pathlib import Path
import os


class Settings(BaseSettings):
    openai_api_key: str = ""
    openai_model: str = "gpt-4o"
    memory_file: str = str(Path(__file__).parent / "data" / "memory.json")
    cors_origins: list[str] = ["http://localhost:5173", "http://localhost:3000"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()

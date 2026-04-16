import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any

from config import settings


def _ensure_file() -> None:
    path = Path(settings.memory_file)
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists():
        path.write_text(
            json.dumps(
                {"studies": [], "global_insights": [], "error_patterns": []},
                ensure_ascii=False,
                indent=2,
            )
        )


def load_memory() -> dict:
    _ensure_file()
    with open(settings.memory_file, "r", encoding="utf-8") as f:
        return json.load(f)


def save_memory(data: dict) -> None:
    _ensure_file()
    with open(settings.memory_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def append_study(study: dict) -> None:
    mem = load_memory()
    mem["studies"].append(study)
    # Keep global insights from each study
    payload = study.get("persistence_payload", {})
    learned = payload.get("learned_lessons", "")
    if learned:
        mem["global_insights"].append(
            {"timestamp": study.get("timestamp"), "insight": learned}
        )
    save_memory(mem)


def get_recent_studies(n: int = 5) -> list[dict]:
    mem = load_memory()
    studies = mem.get("studies", [])
    return studies[-n:]


def get_all_studies() -> list[dict]:
    mem = load_memory()
    return mem.get("studies", [])


def get_global_insights() -> list[dict]:
    mem = load_memory()
    return mem.get("global_insights", [])


def search_studies(query: str) -> list[dict]:
    """Simple keyword search over past studies."""
    mem = load_memory()
    studies = mem.get("studies", [])
    q = query.lower()
    results = []
    for s in studies:
        text = json.dumps(s, ensure_ascii=False).lower()
        if any(word in text for word in q.split()):
            results.append(s)
    return results[-5:]

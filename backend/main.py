import uuid
import json
from datetime import datetime

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from config import settings
from models.schemas import ChatRequest, MemoryResponse
from memory.store import (
    append_study,
    get_recent_studies,
    get_all_studies,
    get_global_insights,
    search_studies,
)
from agents.ceo import run_ceo_analysis

app = FastAPI(
    title="Architect CEO V.8 – Infinity Edition",
    description="Multi-agent foresight & financial intelligence platform",
    version="8.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "online", "system": "Architect CEO V.8 – Infinity Edition"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    """
    Main endpoint: receives the executive query, runs the full multi-agent
    pipeline, persists the result to memory, and returns the study JSON.
    """
    if not settings.openai_api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENAI_API_KEY not configured. Set it in the .env file.",
        )

    study_id = str(uuid.uuid4())[:8].upper()

    # Retrieve memory context
    past_studies = search_studies(request.query) or get_recent_studies(3)
    global_insights = get_global_insights()

    try:
        result = run_ceo_analysis(
            query=request.query,
            past_studies=past_studies,
            global_insights=global_insights,
            study_id=study_id,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"LLM error: {str(exc)}")

    # Ensure core fields
    result.setdefault("id_estudo", study_id)
    result.setdefault("timestamp", datetime.utcnow().isoformat())
    result.setdefault("query_original", request.query)

    # Persist to memory
    append_study(result)

    return JSONResponse(content=result)


@app.get("/api/studies")
def list_studies():
    """Returns all studies stored in memory."""
    studies = get_all_studies()
    return {"studies": studies, "total": len(studies)}


@app.get("/api/studies/{study_id}")
def get_study(study_id: str):
    """Returns a specific study by ID."""
    studies = get_all_studies()
    for s in studies:
        if s.get("id_estudo") == study_id:
            return s
    raise HTTPException(status_code=404, detail="Study not found")


@app.get("/api/memory")
def get_memory():
    """Returns full memory state: studies + global insights."""
    return MemoryResponse(
        studies=get_all_studies(),
        global_insights=get_global_insights(),
        total_studies=len(get_all_studies()),
    )


@app.delete("/api/memory")
def clear_memory():
    """Clears all stored memory (irreversible)."""
    from memory.store import save_memory

    save_memory({"studies": [], "global_insights": [], "error_patterns": []})
    return {"status": "cleared"}

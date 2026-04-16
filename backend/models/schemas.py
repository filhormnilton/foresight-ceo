from pydantic import BaseModel, Field
from typing import Any, Optional
import uuid
from datetime import datetime


class ChatRequest(BaseModel):
    query: str
    mode: str = "full"  # "full" | "fast"


class ScenarioRow(BaseModel):
    id_estudo: str
    categoria_steep: str
    cenario: str
    vpl_estimado: str
    acao_arbitragem: str
    status_memoria: str


class AgentReports(BaseModel):
    librarian: str = ""
    machine_learner: str = ""
    scanner_steep: dict = Field(default_factory=dict)
    morphologist: dict = Field(default_factory=dict)
    crawler: str = ""
    grounding_teacher: str = ""
    financial_bridge: str = ""
    quant_modeler: dict = Field(default_factory=dict)
    red_teamer: str = ""
    socrates: str = ""
    mentor_explainer: str = ""


class PersistencePayload(BaseModel):
    project: str = ""
    version: str = "1.0"
    ceo_insight: str = ""
    financial_impact: str = ""
    learned_lessons: str = ""


class StudyResult(BaseModel):
    id_estudo: str = Field(default_factory=lambda: str(uuid.uuid4())[:8].upper())
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    query_original: str = ""
    executive_summary: str = ""
    agent_reports: AgentReports = Field(default_factory=AgentReports)
    study_table: list[ScenarioRow] = Field(default_factory=list)
    persistence_payload: PersistencePayload = Field(default_factory=PersistencePayload)
    risk_matrix: dict = Field(default_factory=dict)


class MemoryResponse(BaseModel):
    studies: list[dict] = Field(default_factory=list)
    global_insights: list[dict] = Field(default_factory=list)
    total_studies: int = 0

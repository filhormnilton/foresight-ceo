# Architect CEO V.8 – Infinity Edition

> Multi-agent foresight & financial intelligence platform for **Future Equity Holding**

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Frontend (React / Vite)                │
│  ChatWindow │ AgentPipeline │ ResultPanel │ MemoryPanel  │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP  /api/*
┌───────────────────────▼─────────────────────────────────┐
│              Backend (FastAPI / Python)                  │
│                                                          │
│  CEO Orchestrator  ◄──────────────────────────────────┐ │
│       │                                               │ │
│  ┌────▼──────────────────────────────────────────┐   │ │
│  │  CDO Dept        Foresight     Intelligence   │   │ │
│  │  Librarian       Scanner(STEEP) Crawler       │   │ │
│  │  Machine-Learner Morphologist  Grounding-Tchr │   │ │
│  │  DB-Architect    Mentor-Explnr                │   │ │
│  │                                               │   │ │
│  │  Financial Eng   Governance & Risk            │   │ │
│  │  Financial-Bridge Red-Teamer                  │   │ │
│  │  Quant-Modeler    Socrates                    │   │ │
│  └───────────────────────────────────────────────┘   │ │
│                                                       │ │
│  Memory Store (JSON → Supabase/MongoDB compatible) ───┘ │
└─────────────────────────────────────────────────────────┘
```

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set your OPENAI_API_KEY
pip install -r requirements.txt
uvicorn main:app --reload
```

API docs available at `http://localhost:8000/docs`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

### Docker Compose (full stack)

```bash
cp backend/.env.example backend/.env
# Edit backend/.env
docker-compose up --build
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/chat` | Run full multi-agent analysis |
| `GET`  | `/api/studies` | List all studies in memory |
| `GET`  | `/api/studies/{id}` | Get specific study |
| `GET`  | `/api/memory` | Full memory state |
| `DELETE` | `/api/memory` | Clear memory |

### Chat Request

```json
{ "query": "Impacto da IA generativa no setor financeiro brasileiro" }
```

### Study Response (abbreviated)

```json
{
  "id_estudo": "A3F2B1C0",
  "executive_summary": "...",
  "agent_reports": { "scanner_steep": {...}, "quant_modeler": {...} },
  "study_table": [
    { "cenario": "Otimista — ...", "vpl_estimado": "R$ 42 MM", "acao_arbitragem": "..." },
    { "cenario": "Base — ...",     "vpl_estimado": "R$ 18 MM", "acao_arbitragem": "..." },
    { "cenario": "Pessimista — ...","vpl_estimado": "R$ -3 MM","acao_arbitragem": "..." }
  ],
  "persistence_payload": {
    "project": "IA Generativa Financeiro",
    "ceo_insight": "...",
    "learned_lessons": "Risco regulatório subestimado. Ajustado para 15%."
  }
}
```

## Agent Pipeline

| # | Agent | Department | Role |
|---|-------|------------|------|
| 1 | Librarian | CDO | Fetch memory context |
| 2 | Machine-Learner | CDO | Pattern analysis & self-correction |
| 3 | Scanner (STEEP) | Foresight | Social/Tech/Eco/Env/Political scan |
| 4 | Crawler | Intelligence | Market data signals |
| 5 | Grounding-Teacher | Intelligence | Anchor in verifiable data |
| 6 | Morphologist | Foresight | Generate 3 future scenarios |
| 7 | Financial-Bridge | Financial | Identify arbitrage opportunities |
| 8 | Quant-Modeler | Financial | NPV/VPL, IRR, Payback |
| 9 | Red-Teamer | Governance | Stress test & counter-arguments |
| 10 | Socrates | Governance | Question fundamental premises |
| 11 | Mentor-Explainer | Foresight | Executive note for human |
| 12 | DB-Architect | CDO | Structure persistence payload |

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | — | **Required** OpenAI API key |
| `OPENAI_MODEL` | `gpt-4o` | Model to use |
| `MEMORY_FILE` | `data/memory.json` | Persistence file path |
| `CORS_ORIGINS` | `["http://localhost:5173"]` | Allowed origins |

## Memory Persistence

Every study is saved to `backend/data/memory.json`. The structure is fully compatible with Supabase and MongoDB.
Use the **persistence payload** block returned with each analysis to upsert records into your database of choice.

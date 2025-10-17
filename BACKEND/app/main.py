from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import init_db
from .routers import tasks, tags


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database
    init_db()
    yield


def get_allowed_origins() -> list[str]:
    # Allow local dev and optionally a configured origin
    origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    env_origin = os.getenv("ALLOWED_ORIGIN")
    if env_origin:
        origins.append(env_origin)
    return origins


# Load .env before reading env variables
load_dotenv()

app = FastAPI(title="AIBOS Backend", version="1.0.0", lifespan=lifespan)

cors_allow_all = os.getenv("CORS_ALLOW_ALL", "false").lower() in {"1", "true", "yes", "on"}

if cors_allow_all:
    # Permissive dev mode: allow all origins (credentials disabled to satisfy CORS spec)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=get_allowed_origins(),
        # Also allow localhost/127.0.0.1 on any port for dev hot-reload convenience
        allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\\d+)?",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


app.include_router(tasks.router, prefix="/api/tasks", tags=["tasks"])
app.include_router(tags.router, prefix="/api/tags", tags=["tags"])

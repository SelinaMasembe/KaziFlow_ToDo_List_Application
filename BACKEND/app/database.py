import os
from typing import Generator
from sqlmodel import SQLModel, create_engine, Session


DB_URL = os.getenv("DATABASE_URL", "sqlite:///./aibos.db")
connect_args = {"check_same_thread": False} if DB_URL.startswith("sqlite") else {}
engine = create_engine(DB_URL, echo=False, connect_args=connect_args)


def init_db() -> None:
    # Import models to ensure they are registered
    from . import models  # noqa: F401
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

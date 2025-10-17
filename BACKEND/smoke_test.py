import os
from contextlib import contextmanager
from typing import Iterator

from fastapi.testclient import TestClient


@contextmanager
def use_test_db(db_path: str) -> Iterator[None]:
    prev = os.environ.get("DATABASE_URL")
    try:
        os.environ["DATABASE_URL"] = f"sqlite:///{db_path}"
        yield
    finally:
        if prev is not None:
            os.environ["DATABASE_URL"] = prev
        else:
            os.environ.pop("DATABASE_URL", None)


def main() -> None:
    db_file = os.path.abspath(os.path.join(os.path.dirname(__file__), "aibos_smoke.db"))
    # Ensure we start fresh each run
    try:
        os.remove(db_file)
    except FileNotFoundError:
        pass

    with use_test_db(db_file):
        # Import inside the context so app binds to the test DB
        from app.main import app

        # Use context manager so FastAPI lifespan (init_db) runs
        with TestClient(app) as client:
            # Health check
            r = client.get("/healthz")
            assert r.status_code == 200, r.text
            assert r.json().get("status") == "ok", r.json()

            # Create a task
            payload = {
                "title": "Smoke Test Task",
                "description": "Created by smoke test",
                "status": "backlog",
                "energyLevel": "medium",
                "tags": ["demo", "smoke"],
            }
            r = client.post("/api/tasks", json=payload)
            assert r.status_code == 201, r.text
            created = r.json()
            # id as string, tags as names
            assert isinstance(created.get("id"), str)
            assert sorted(created.get("tags", [])) == ["demo", "smoke"], created

            # List tasks
            r = client.get("/api/tasks")
            assert r.status_code == 200, r.text
            data = r.json()
            assert isinstance(data, list) and len(data) >= 1
            # Ensure serialization shape
            item = data[0]
            for key in ["id", "title", "status", "energyLevel", "createdAt", "updatedAt", "tags"]:
                assert key in item, f"missing key: {key} in {item}"

            # Patch task
            task_id = created["id"]
            r = client.patch(f"/api/tasks/{task_id}", json={"status": "today", "tags": ["demo"]})
            assert r.status_code == 200, r.text
            updated = r.json()
            assert updated["status"] == "today"
            assert updated["tags"] == ["demo"]

            # Delete task
            r = client.delete(f"/api/tasks/{task_id}")
            assert r.status_code == 204, r.text

    print("SMOKE TEST: PASS")


if __name__ == "__main__":
    main()

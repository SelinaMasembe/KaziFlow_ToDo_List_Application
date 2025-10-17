from typing import List
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload

from ..database import get_session
from ..models import Task, TaskRead, TaskCreate, TaskUpdate
from ..crud import list_tasks, create_task, update_task, delete_task


router = APIRouter()


@router.get("/", response_model=List[TaskRead])
def get_tasks(session: Session = Depends(get_session)):
    return [TaskRead.from_task(t) for t in list_tasks(session)]

# Accept no-trailing-slash variant to avoid redirects
@router.get("", response_model=List[TaskRead])
def get_tasks_noslash(session: Session = Depends(get_session)):
    return [TaskRead.from_task(t) for t in list_tasks(session)]


@router.post("/", response_model=TaskRead, status_code=201)
def post_task(payload: TaskCreate, session: Session = Depends(get_session)):
    task = create_task(session, payload)
    return TaskRead.from_task(task)

# Accept no-trailing-slash variant to avoid redirects
@router.post("", response_model=TaskRead, status_code=201)
def post_task_noslash(payload: TaskCreate, session: Session = Depends(get_session)):
    task = create_task(session, payload)
    return TaskRead.from_task(task)


def _get_task_or_404(task_id: int, session: Session) -> Task:
    # ensure tags are loaded
    task = session.exec(select(Task).options(selectinload(Task.tags)).where(Task.id == task_id)).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.get("/{task_id}", response_model=TaskRead)
def get_task(task_id: int = Path(..., ge=1), session: Session = Depends(get_session)):
    task = _get_task_or_404(task_id, session)
    return TaskRead.from_task(task)


@router.patch("/{task_id}", response_model=TaskRead)
def patch_task(
    payload: TaskUpdate,
    task_id: int = Path(..., ge=1),
    session: Session = Depends(get_session),
):
    task = _get_task_or_404(task_id, session)
    task = update_task(session, task, payload)
    return TaskRead.from_task(task)


@router.delete("/{task_id}", status_code=204)
def remove_task(task_id: int = Path(..., ge=1), session: Session = Depends(get_session)):
    task = _get_task_or_404(task_id, session)
    delete_task(session, task)
    return None

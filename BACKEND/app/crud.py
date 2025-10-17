from typing import Iterable, Sequence
from datetime import datetime
from sqlmodel import Session, select
from sqlalchemy.orm import selectinload
from .models import Task, Tag, TaskCreate, TaskUpdate


def get_or_create_tags(session: Session, names: Iterable[str]) -> list[Tag]:
    tags: list[Tag] = []
    for name in {n.strip() for n in names if n and n.strip()}:
        existing = session.exec(select(Tag).where(Tag.name == name)).first()
        if existing:
            tags.append(existing)
        else:
            t = Tag(name=name)
            session.add(t)
            session.flush()
            tags.append(t)
    return tags


def list_tasks(session: Session) -> Sequence[Task]:
    stmt = (
        select(Task)
        .options(selectinload(Task.tags))
        .order_by(Task.createdAt.desc())
    )
    return session.exec(stmt).all()


def create_task(session: Session, data: TaskCreate) -> Task:
    task = Task(
        title=data.title,
        description=data.description,
        status=data.status,
        energyLevel=data.energyLevel,
    )
    if data.tags:
        task.tags = get_or_create_tags(session, data.tags)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def update_task(session: Session, task: Task, data: TaskUpdate) -> Task:
    if data.title is not None:
        task.title = data.title
    if data.description is not None:
        task.description = data.description
    if data.status is not None:
        task.status = data.status
    if data.energyLevel is not None:
        task.energyLevel = data.energyLevel
    if data.tags is not None:
        task.tags = get_or_create_tags(session, data.tags)
    task.updatedAt = datetime.utcnow()
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


def delete_task(session: Session, task: Task) -> None:
    session.delete(task)
    session.commit()

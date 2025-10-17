from datetime import datetime
from enum import Enum
from typing import Optional, List
from sqlmodel import SQLModel, Field, Relationship


class TaskStatus(str, Enum):
    backlog = "backlog"
    today = "today"
    in_progress = "in-progress"
    review = "review"
    done = "done"


class EnergyLevel(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class TaskTagLink(SQLModel, table=True):
    task_id: Optional[int] = Field(default=None, foreign_key="task.id", primary_key=True)
    tag_id: Optional[int] = Field(default=None, foreign_key="tag.id", primary_key=True)


class TagBase(SQLModel):
    name: str = Field(index=True)


class Tag(TagBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    tasks: List["Task"] = Relationship(back_populates="tags", link_model=TaskTagLink)


class TaskBase(SQLModel):
    title: str
    description: Optional[str] = None
    status: TaskStatus = Field(default=TaskStatus.backlog)
    energyLevel: EnergyLevel = Field(default=EnergyLevel.medium)


class Task(TaskBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)
    tags: List["Tag"] = Relationship(back_populates="tasks", link_model=TaskTagLink)


# Response / request models
class TagRead(TagBase):
    id: int


class TagCreate(TagBase):
    pass


class TaskRead(TaskBase):
    id: str
    createdAt: datetime
    updatedAt: datetime
    tags: list[str] = Field(default_factory=list)

    @classmethod
    def from_task(cls, task: "Task") -> "TaskRead":
        return cls(
            id=str(task.id) if task.id is not None else "",
            title=task.title,
            description=task.description,
            status=task.status,
            energyLevel=task.energyLevel,
            createdAt=task.createdAt,
            updatedAt=task.updatedAt,
            tags=[t.name for t in (task.tags or [])],
        )


class TaskCreate(TaskBase):
    tags: list[str] = Field(default_factory=list)  # accept tag names


class TaskUpdate(SQLModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TaskStatus] = None
    energyLevel: Optional[EnergyLevel] = None
    tags: Optional[list[str]] = None

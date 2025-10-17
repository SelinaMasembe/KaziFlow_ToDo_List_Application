from typing import List
from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from ..database import get_session
from ..models import Tag, TagRead, TagCreate


router = APIRouter()


@router.get("/", response_model=List[TagRead])
def list_all(session: Session = Depends(get_session)):
    return session.exec(select(Tag).order_by(Tag.name.asc())).all()


@router.post("/", response_model=TagRead, status_code=201)
def create(payload: TagCreate, session: Session = Depends(get_session)):
    tag = Tag(name=payload.name)
    session.add(tag)
    session.commit()
    session.refresh(tag)
    return tag

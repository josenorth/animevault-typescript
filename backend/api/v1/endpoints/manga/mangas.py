from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database.db import get_db
from models.v1.manga.manga import Manga as MangaModel
from schemas.v1.manga.manga import Manga as MangaSchema

router = APIRouter()

@router.get("/{manga_id}", response_model=MangaSchema)
def get_manga(manga_id: int, db: Session = Depends(get_db)):
    """
    Obtener un manga por su ID
    """
    manga = db.query(MangaModel).filter(MangaModel.id == manga_id).first()
    if manga is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, 
            detail=f"Manga con id {manga_id} no encontrado"
        )
    return manga
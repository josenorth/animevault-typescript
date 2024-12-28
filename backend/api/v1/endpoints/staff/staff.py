from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.db import get_db
from models.v1.anime.staff import Staff
from schemas.v1.staff import StaffSchema
from schemas.v1.anime_character import StaffWorkSchema
from models.v1.anime.anime_character import AnimeCharacter
from models.v1.character.character import Character
from models.v1.anime import Anime
from typing import List

router = APIRouter()

@router.get("/{staff_id}", response_model=StaffSchema)
def get_staff_by_id(staff_id: int, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    return staff

@router.get("/{staff_id}/works", response_model=List[StaffWorkSchema])
def get_staff_works(staff_id: int, db: Session = Depends(get_db)):
    staff = db.query(Staff).filter(Staff.id == staff_id).first()
    if not staff:
        raise HTTPException(status_code=404, detail="Staff not found")
    
    works = db.query(AnimeCharacter).join(Character).join(Anime).filter(AnimeCharacter.staff_id == staff_id).all()
    result = []
    for work in works:
        result.append(StaffWorkSchema(
            character_name=work.character.name_full,
            character_image=work.character.image,
            anime_cover=work.anime.coverImage,
            anime_romaji=work.anime.title_romaji,
            anime_english=work.anime.title_english,
            seasonYear=work.anime.seasonYear,
            role=work.role  # Añadir role
        ))
    return result
from sqlalchemy.orm import Session
from models.v1.shared.relations import Relations
from typing import List


async def get_relations_by_anime_id(anime_id: int, db: Session) -> List[Relations]:
    return db.query(Relations).filter(Relations.anime_id == anime_id).all()
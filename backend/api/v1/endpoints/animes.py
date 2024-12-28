from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import get_db
from datetime import datetime

from models.v1.anime import Anime as AnimeModel
from models.v1.character.character import Character as CharacterModel
from models.v1.anime.staff import Staff as StaffModel
from models.v1.anime.anime_character import AnimeCharacter as AnimeCharacterModel
from schemas.v1.anime import Anime
from schemas.v1.anime_character import CharacterWithStaff, AnimeCharacters, StaffSchema
from models.v1.anime.anime_trend import AnimeTrend as AnimeTrendModel
from models.v1.anime.season import Season as SeasonModel
from models.v1.anime.anime_studios import anime_studios
from models.v1.anime.studio import Studio
from models.v1.anime.anime_trailer import AnimeTrailer as AnimeTrailerModel
from models.v1.anime.external_link import AnimeExternalLink
from schemas.v1.anime_details import AnimeDetails
from schemas.v1.anime_trailer import AnimeTrailer
from schemas.v1.external_link import ExternalLink

router = APIRouter()

def get_current_season():
    month = datetime.now().month
    if month in [1, 2, 3]:
        return 'WINTER'
    elif month in [4, 5, 6]:
        return 'SPRING'
    elif month in [7, 8, 9]:
        return 'SUMMER'
    elif month in [10, 11, 12]:
        return 'FALL'

def get_next_season():
    month = datetime.now().month
    if month in [1, 2, 3]:  # Winter
        return 'SPRING', datetime.now().year
    elif month in [4, 5, 6]:  # Spring
        return 'SUMMER', datetime.now().year
    elif month in [7, 8, 9]:  # Summer
        return 'FALL', datetime.now().year
    elif month in [10, 11, 12]:  # Fall
        return 'WINTER', datetime.now().year + 1

def map_anime_with_studios(anime, db):
    studios = db.query(
        Studio.id,
        Studio.name,
        anime_studios.c.isMain
    ).join(anime_studios, Studio.id == anime_studios.c.studio_id).filter(
        anime_studios.c.anime_id == anime.id
    ).all()

    season = db.query(SeasonModel).filter(SeasonModel.id == anime.season_id).first()

    return {
        "id": anime.id,
        "title_romaji": anime.title_romaji,
        "title_english": anime.title_english,
        "native": anime.native,
        "description": anime.description,
        "coverImage": anime.coverImage,
        "bannerImage": anime.bannerImage,
        "episode_count": anime.episode_count,
        "episode_duration": anime.episode_duration,
        "average_score": anime.average_score,
        "popularity": anime.popularity,
        "start_date": anime.start_date,
        "end_date": anime.end_date,
        "seasonYear": anime.seasonYear,
        "format": anime.format,
        "status": anime.status,
        "source": anime.source,
        "genres": anime.genres,
        "studios": [{"id": studio.id, "name": studio.name, "isMain": studio.isMain} for studio in studios],
        "season": season.name if season else None  # Modificado para devolver directamente el nombre de la temporada
    }

@router.get("/top-animes", response_model=List[Anime])
def get_top_animes(db: Session = Depends(get_db)):
    top_animes = db.query(AnimeModel).order_by(AnimeModel.average_score.desc()).limit(6).all()
    return [map_anime_with_studios(anime, db) for anime in top_animes]
    
@router.get("/count", response_model=int)
def get_anime_count(db: Session = Depends(get_db)):
    count = db.query(AnimeModel).count()
    return count

@router.get("/trending-now", response_model=List[Anime])
def get_trending_now(db: Session = Depends(get_db)):
    trending_animes = db.query(AnimeModel).join(AnimeTrendModel).order_by(AnimeTrendModel.trending.desc()).limit(6).all()
    return [map_anime_with_studios(anime, db) for anime in trending_animes]

@router.get("/popular-this-season", response_model=List[Anime])
def get_popular_this_season(db: Session = Depends(get_db)):
    current_season = get_current_season()
    current_year = datetime.now().year
    season = db.query(SeasonModel).filter_by(name=current_season).first()
    if not season:
        raise HTTPException(status_code=404, detail="Current season period not found")

    popular_animes = db.query(AnimeModel).join(AnimeTrendModel).filter(
        AnimeModel.season.has(id=season.id),
        AnimeModel.seasonYear == current_year
    ).order_by(AnimeTrendModel.popularity.desc()).limit(6).all()

    return [map_anime_with_studios(anime, db) for anime in popular_animes]

@router.get("/upcoming-next-season", response_model=List[Anime])
def get_upcoming_next_season(db: Session = Depends(get_db)):
    next_season, next_year = get_next_season()
    season = db.query(SeasonModel).filter_by(name=next_season).first()
    if not season:
        raise HTTPException(status_code=404, detail="Next season period not found")

    upcoming_animes = db.query(AnimeModel).join(AnimeTrendModel).filter(
        AnimeModel.season.has(id=season.id),
        AnimeModel.seasonYear == next_year
    ).order_by(AnimeTrendModel.trending.desc()).limit(6).all()

    return [map_anime_with_studios(anime, db) for anime in upcoming_animes]

@router.get("/{anime_id}", response_model=Anime)
def get_anime_by_id(anime_id: int, db: Session = Depends(get_db)):
    anime = db.query(AnimeModel).filter(AnimeModel.id == anime_id).first()
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")
    
    return map_anime_with_studios(anime, db)

@router.get("/{anime_id}/characters", response_model=AnimeCharacters, summary="Get Anime Characters", description="Retrieve the list of characters for a specific anime.")
def get_anime_details(anime_id: int, db: Session = Depends(get_db)):
    anime = db.query(AnimeModel).filter(AnimeModel.id == anime_id).first()
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")

    anime_characters = db.query(AnimeCharacterModel).filter(AnimeCharacterModel.anime_id == anime_id).all()
    
    characters = []
    for ac in anime_characters:
        character = db.query(CharacterModel).filter(CharacterModel.id == ac.character_id).first()
        staff = db.query(StaffModel).filter(StaffModel.id == ac.staff_id).first() if ac.staff_id else None
        
        character_pydantic = CharacterWithStaff(
            id=character.id,
            name_full=character.name_full,
            name_native=character.name_native,
            age=character.age,
            description=character.description,
            dateOfBirth=character.dateOfBirth,
            image=character.image,
            role=ac.role,
            languageV2=ac.languageV2,
            staff=[]
        )
        
        if staff:
            character_pydantic.staff.append(StaffSchema.model_validate(staff))
        
        characters.append(character_pydantic)

    def role_priority(role: Optional[str]) -> int:
        role_order = {
            "MAIN": 1,
            "SUPPORTING": 2,
            "BACKGROUND": 3
        }
        return role_order.get(role, 4)

    characters.sort(key=lambda char: role_priority(char.role))
    
    return AnimeCharacters(
        characters=characters
    )

@router.get("/{anime_id}/details", response_model=AnimeDetails, summary="Get Anime Details", description="Retrieve detailed information about a specific anime.")
def get_anime_details(anime_id: int, db: Session = Depends(get_db)):
    anime = db.query(AnimeModel).filter(AnimeModel.id == anime_id).first()
    if anime is None:
        raise HTTPException(status_code=404, detail="Anime not found")

    trailers = db.query(AnimeTrailerModel).filter(AnimeTrailerModel.anime_id == anime_id).all()
    external_links = db.query(AnimeExternalLink).filter(AnimeExternalLink.anime_id == anime_id).all()

    trailers_pydantic = [AnimeTrailer.model_validate(trailer) for trailer in trailers]
    external_links_pydantic = [ExternalLink.model_validate(link) for link in external_links]

    return AnimeDetails(
        trailers=trailers_pydantic,
        external_links=external_links_pydantic
    )
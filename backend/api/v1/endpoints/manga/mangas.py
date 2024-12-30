from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from database.db import get_db
from models.v1.manga.manga import Manga as MangaModel
from schemas.v1.manga.manga import Manga as MangaSchema
from schemas.v1.shared.relations import RelationSchema, RelatedAnimeSchema, RelatedMangaSchema
from models.v1.shared.relations import Relations as RelationModel
from models.v1.anime.anime import Anime as AnimeModel
from models.v1.manga.manga_genres import manga_genres
from models.v1.shared.genre import Genre
from models.v1.manga.manga_trend import MangaTrend as MangaTrendModel

router = APIRouter()

def map_manga_with_genres(manga, db):
    genres = db.query(
        Genre.id,
        Genre.name
    ).join(manga_genres, Genre.id == manga_genres.c.genre_id).filter(
        manga_genres.c.manga_id == manga.id
    ).all()

    return {
        "id": manga.id,
        "title_romaji": manga.title_romaji,
        "title_english": manga.title_english,
        "title_native": manga.title_native,
        "description": manga.description,
        "coverImage": manga.coverImage,
        "bannerImage": manga.bannerImage,
        "averageScore": manga.averageScore,
        "chapters": manga.chapters,
        "volumes": manga.volumes,
        "startDate": manga.startDate,
        "endDate": manga.endDate,
        "status": manga.status,
        "format": manga.format,
        "countryOfOrigin": manga.countryOfOrigin,
        "source": manga.source,
        "isAdult": manga.isAdult,
        "genres": [{"id": genre.id, "name": genre.name} for genre in genres]
    }

@router.get("/trending-now", response_model=List[MangaSchema])
def get_trending_now(db: Session = Depends(get_db)):
    trending_mangas = db.query(MangaModel).join(MangaTrendModel).order_by(MangaTrendModel.trending.desc()).limit(6).all()
    return [map_manga_with_genres(manga, db) for manga in trending_mangas]

@router.get("/all-time-popular", response_model=List[MangaSchema])
def get_all_time_popular(db: Session = Depends(get_db)):
    popular_mangas = db.query(MangaModel).join(MangaTrendModel).order_by(MangaTrendModel.popularity.desc()).limit(6).all()
    return [map_manga_with_genres(manga, db) for manga in popular_mangas]

@router.get("/popular-manwa", response_model=List[MangaSchema])
def get_popular_manwa(db: Session = Depends(get_db)):
    popular_manwas = db.query(MangaModel).filter(MangaModel.countryOfOrigin == 'KR').join(MangaTrendModel).order_by(MangaTrendModel.popularity.desc()).limit(6).all()
    return [map_manga_with_genres(manga, db) for manga in popular_manwas]


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

@router.get("/{manga_id}/relations", response_model=List[RelationSchema], summary="Get Manga Relations", description="Retrieve all relations for a specific manga")
def get_manga_relations(manga_id: int, db: Session = Depends(get_db)):
    manga = db.query(MangaModel).filter(MangaModel.id == manga_id).first()
    if manga is None:
        raise HTTPException(status_code=404, detail="Manga not found")

    relations = db.query(RelationModel).filter(RelationModel.manga_id == manga_id).all()
    if not relations:
        raise HTTPException(status_code=404, detail="Relations not found")

    result = []
    for relation in relations:
        related_anime = None
        related_manga = None

        # Obtener datos de related_anime
        if relation.related_anime_id:
            anime_data = db.query(AnimeModel).filter(AnimeModel.id == relation.related_anime_id).first()
            if anime_data:
                related_anime = RelatedAnimeSchema(
                    id=anime_data.id,
                    title_romaji=anime_data.title_romaji,
                    title_english=anime_data.title_english,
                    cover_image=anime_data.coverImage
                )

        # Obtener datos de related_manga
        if relation.related_manga_id:
            manga_data = db.query(MangaModel).filter(MangaModel.id == relation.related_manga_id).first()
            if manga_data:
                related_manga = RelatedMangaSchema(
                    id=manga_data.id,
                    title_romaji=manga_data.title_romaji,
                    title_english=manga_data.title_english,
                    cover_image=manga_data.coverImage
                )

        # Crear relación principal
        result.append(
            RelationSchema(
                id=relation.id,
                relation_type=relation.relation_type,
                related_anime=related_anime,
                related_manga=related_manga
            )
        )

    return result
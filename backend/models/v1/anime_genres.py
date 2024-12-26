from sqlalchemy import Table, Column, Integer, ForeignKey
from database.db import Base

anime_genres = Table('anime_genres', Base.metadata,
    Column('anime_id', Integer, ForeignKey('animevault.animes.id'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('animevault.genres.id'), primary_key=True)
)
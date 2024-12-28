from sqlalchemy import Table, Column, Integer, ForeignKey
from database.db import Base

manga_genres = Table('manga_genres', Base.metadata,
    Column('manga_id', Integer, ForeignKey('manga.mangas.id'), primary_key=True),
    Column('genre_id', Integer, ForeignKey('shared.genres.id', onupdate="CASCADE", ondelete="CASCADE"), primary_key=True),
    schema='manga'
)
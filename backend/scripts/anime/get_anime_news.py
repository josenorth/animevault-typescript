import sys
import os
import logging
import time
import argparse
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import requests
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.v1.anime.anime import Anime
from models.v1.anime.anime_news import AnimeNews
from database.db import engine

# Configuración del logger
logging.basicConfig(filename='anime_news.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')

Session = sessionmaker(bind=engine)
session = Session()

def get_anime_news(anime_id, limit=50, retries=5):
    url = f"https://api.jikan.moe/v4/anime/{anime_id}/news?limit={limit}"
    response = requests.get(url)
    if response.status_code == 200:
            logging.info(f"Noticias obtenidas para el anime_id {anime_id}")
            return response.json()
    elif response.status_code == 429:
            wait_time = 5 # Espera exponencial: 1, 2, 4, 8, 16 segundos
            logging.warning(f"Rate limit alcanzado para el anime_id {anime_id}. Reintentando en {wait_time} segundos.")
            time.sleep(wait_time)
    else:
            logging.error(f"Error al obtener noticias para el anime_id {anime_id}: {response.status_code} - {response.text}")
            return None
    logging.error(f"Error al obtener noticias para el anime_id {anime_id} después de {retries} intentos.")
    return None

def insert_or_update_anime_news(anime_id, news_data):
    for news in news_data:
        try:
            existing_news = session.query(AnimeNews).filter_by(anime_id=anime_id, mal_news_id=news['mal_id']).first()
            if existing_news:
                # Actualizar la noticia existente
                existing_news.url = news['url']
                existing_news.title = news['title']
                existing_news.date = news['date']
                existing_news.author_username = news.get('author_username')
                existing_news.author_url = news.get('author_url')
                existing_news.forum_url = news.get('forum_url')
                existing_news.image_url = news['images']['jpg']['image_url'] if 'images' in news and 'jpg' in news['images'] else None
                existing_news.comments = news['comments']
                existing_news.excerpt = news['excerpt']
                logging.info(f"Noticia actualizada para el anime_id {anime_id}, mal_news_id {news['mal_id']}")
            else:
                # Insertar nueva noticia
                anime_news = AnimeNews(
                    anime_id=anime_id,
                    mal_news_id=news['mal_id'],
                    url=news['url'],
                    title=news['title'],
                    date=news['date'],
                    author_username=news.get('author_username'),
                    author_url=news.get('author_url'),
                    forum_url=news.get('forum_url'),
                    image_url=news['images']['jpg']['image_url'] if 'images' in news and 'jpg' in news['images'] else None,
                    comments=news['comments'],
                    excerpt=news['excerpt']
                )
                session.add(anime_news)
                logging.info(f"Noticia insertada para el anime_id {anime_id}, mal_news_id {news['mal_id']}")
        except Exception as e:
            logging.error(f"Error al insertar o actualizar noticia para el anime_id {anime_id}, mal_news_id {news['mal_id']}: {e}")
    session.commit()

def main(start_id):
    # Obtener todos los id_mal de la tabla anime
    animes = session.query(Anime.id_mal).filter(Anime.id_mal >= start_id).all()
    for anime in animes:
        anime_id = anime.id_mal
        if anime_id is not None:
            news = get_anime_news(anime_id)
            if news and 'data' in news:
                insert_or_update_anime_news(anime_id, news['data'])
            # Pausar para evitar ser rate-limited
            time.sleep(0.34)  # 3 solicitudes por segundo
        else:
            logging.warning(f"Anime con id_mal None encontrado, saltando...")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Obtener noticias de animes desde un ID específico.')
    parser.add_argument('--start_id', type=int, required=True, help='ID de inicio del anime para obtener noticias')
    args = parser.parse_args()
    main(args.start_id)
import signal
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import argparse
import requests
import time
import logging
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.anime import Anime
from models.v1.genre import Genre
from models.v1.studio import Studio
from models.v1.anime_genres import anime_genres
from models.v1.character.character import Character
from models.v1.staff import Staff
from models.v1.season import Season
from models.v1.anime_character import AnimeCharacter
from models.v1.anime_studios import anime_studios
from models.v1.external_site import ExternalSite
from models.v1.external_link import ExternalLink
from models.v1.anime_trailer import AnimeTrailer

# Configurar el logger
logging.basicConfig(filename='anime_fetch.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()
total_response_size_kb = 0

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30  # Ajusta a 30 solicitudes por minuto
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE  # Delay entre solicitudes

Session = sessionmaker(bind=engine)
session = Session()

def fetch_anime_without_characters_and_voice_actors(startDate, endDate, page=1, perPage=50):
    query = '''
    query GetAnimes($startDate: FuzzyDateInt, $endDate: FuzzyDateInt, $page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            media(
                type: ANIME
                startDate_greater: $startDate
                endDate_lesser: $endDate
            ) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                coverImage {
                    extraLarge
                }
                bannerImage
                averageScore
                popularity
                startDate {
                    year
                    month
                    day
                }
                endDate {
                    year
                    month
                    day
                }
                seasonYear
                season
                externalLinks {
                    id
                    url
                    site
                    siteId
                    type
                    language
                    color
                    icon
                    notes
                    isDisabled
                }
                trailer {
                    id
                    site
                    thumbnail
                }
                format
                status
                episodes
                duration
                studios {
                    edges {
                        isMain
                        node {
                            id
                            name
                        }
                    }
                }
                genres
                source
            }
        }
    }
    '''
    variables = {
        "startDate": startDate,
        "endDate": endDate,
        "page": page,
        "perPage": perPage
    }
    try:
        response = requests.post(API_URL, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            # Calcular el tamaño de la respuesta en KB
            response_size_kb = len(response.content) / 1024
            logger.info(f"Tamaño de la respuesta para la página {page}: {response_size_kb:.2f} KB")
            return response.json(), response_size_kb
        else:
            logger.error(f"Error: {response.status_code}, Response: {response.text}")
            response.raise_for_status()
    except Exception as e:
        logger.error(f"Error fetching data: {e}")
        return None, 0

def insert_anime(data):
    try:
        for anime_data in data['data']['Page']['media']:
            studios = []

            for studio_edge in anime_data['studios']['edges']:
                studio_data = studio_edge['node']
                is_main = studio_edge['isMain']
                studios.append((studio_data, is_main))

            season = anime_data.get('season')
            period = None
            if season:
                period = session.query(Season).filter_by(name=season).first()
                if not period:
                    period = Season(name=season)
                    session.add(period)
                session.commit()

            existing_anime = session.query(Anime).filter_by(id=anime_data['id']).first()
            start_date = None
            if anime_data['startDate']['year']:
                start_date = f"{anime_data['startDate']['year']}-{anime_data['startDate']['month'] or 1}-{anime_data['startDate']['day'] or 1}"
            end_date = None
            if anime_data['endDate']['year']:
                end_date = f"{anime_data['endDate']['year']}-{anime_data['endDate']['month'] or 1}-{anime_data['endDate']['day'] or 1}"

            anime_format = anime_data.get('format')  # Proporcionar un valor predeterminado para 'format'

            if existing_anime:
                existing_anime.title_romaji = anime_data['title']['romaji']
                existing_anime.title_english = anime_data['title'].get('english')
                existing_anime.native = anime_data['title'].get('native')
                existing_anime.description = anime_data.get('description')
                existing_anime.coverImage = anime_data['coverImage']['extraLarge']
                existing_anime.bannerImage = anime_data.get('bannerImage')
                existing_anime.average_score = anime_data.get('averageScore')
                existing_anime.popularity = anime_data.get('popularity')
                existing_anime.start_date = start_date
                existing_anime.end_date = end_date
                existing_anime.seasonYear = anime_data.get('seasonYear')
                existing_anime.format = anime_format
                existing_anime.status = anime_data.get('status')
                existing_anime.source = anime_data.get('source')
                existing_anime.episode_count = anime_data.get('episodes')
                existing_anime.episode_duration = anime_data.get('duration')
                existing_anime.season_id = period.id if period else None
                logger.info(f"Actualizado anime: {existing_anime.title_romaji}")
            else:
                anime = Anime(
                    id=anime_data['id'],
                    title_romaji=anime_data['title']['romaji'],
                    title_english=anime_data['title'].get('english'),
                    native=anime_data['title'].get('native'),
                    description=anime_data.get('description'),
                    coverImage=anime_data['coverImage']['extraLarge'],
                    bannerImage=anime_data.get('bannerImage'),
                    average_score=anime_data.get('averageScore'),
                    popularity=anime_data.get('popularity'),
                    start_date=start_date,
                    end_date=end_date,
                    seasonYear=anime_data.get('seasonYear'),
                    format=anime_format,
                    status=anime_data.get('status'),
                    source=anime_data.get('source'),
                    episode_count=anime_data.get('episodes'),
                    episode_duration=anime_data.get('duration'),
                    season_id=period.id if period else None
                )
                session.add(anime)
                logger.info(f"Insertado nuevo anime: {anime.title_romaji}")
            session.commit()

            for genre_name in anime_data['genres']:
                genre = session.query(Genre).filter_by(name=genre_name).first()
                if not genre:
                    genre = Genre(name=genre_name)
                    session.add(genre)
                    session.commit()
                if existing_anime:
                    if genre not in existing_anime.genres:
                        existing_anime.genres.append(genre)
                else:
                    anime.genres.append(genre)
            session.commit()

            # Insertar estudios en anime_studios
            for studio_data, is_main in studios:
                studio = session.query(Studio).filter_by(id=studio_data['id']).first()
                if not studio:
                    existing_studio = session.query(Studio).filter_by(name=studio_data['name']).first()
                    if existing_studio:
                        logger.warning(f"El nombre del estudio '{studio_data['name']}' ya existe con un ID diferente.")
                        studio = existing_studio
                    else:
                        studio = Studio(id=studio_data['id'], name=studio_data['name'])
                        session.add(studio)
                        session.commit()
                        logger.info(f"Insertado nuevo studio: id={studio.id}, name={studio.name}")
                else:
                    if studio.name != studio_data['name']:
                        existing_studio = session.query(Studio).filter_by(name=studio_data['name']).first()
                        if existing_studio and existing_studio.id != studio.id:
                            logger.warning(f"El nombre del estudio '{studio_data['name']}' ya existe con un ID diferente.")
                            studio = existing_studio
                        else:
                            studio.name = studio_data['name']
                session.commit()

                # Verificar si la relación ya existe antes de insertarla
                existing_relation = session.query(anime_studios).filter_by(anime_id=anime_data['id'], studio_id=studio.id, isMain=is_main).first()
                if not existing_relation:
                    session.execute(anime_studios.insert().values(anime_id=anime_data['id'], studio_id=studio.id, isMain=is_main))
            session.commit()

            # Insertar external_links
            for external_link_data in anime_data['externalLinks']:
                site = session.query(ExternalSite).filter_by(id=external_link_data['siteId']).first()
                if not site:
                    site = session.query(ExternalSite).filter_by(name=external_link_data['site']).first()
                    if not site:
                        site = ExternalSite(
                            id=external_link_data['siteId'],
                            name=external_link_data['site'],
                            color=external_link_data.get('color'),
                            icon=external_link_data.get('icon')
                        )
                        logger.info(f"Insertado nuevo sitio externo: id={site.id}, name={site.name}")
                        session.add(site)
                        session.commit()

                existing_link = session.query(ExternalLink).filter_by(anime_id=anime_data['id'], site_id=site.id).first()
                if not existing_link:
                    external_link = ExternalLink(
                        anime_id=anime_data['id'],
                        site_id=site.id,
                        url=external_link_data['url'],
                        type=external_link_data.get('type'),
                        language=external_link_data.get('language'),
                        notes=external_link_data.get('notes'),
                        isDisabled=external_link_data.get('isDisabled', False)
                    )
                    logger.info(f"Insertado nuevo enlace externo: anime_id={external_link.anime_id}, site_id={external_link.site_id}")
                    session.add(external_link)
            session.commit()

            # Insertar trailer
            if anime_data['trailer']:
                existing_trailer = session.query(AnimeTrailer).filter_by(anime_id=anime_data['id'], trailer_id=anime_data['trailer']['id']).first()
                if not existing_trailer:
                    trailer_data = anime_data['trailer']
                    trailer = AnimeTrailer(
                        anime_id=anime_data['id'],
                        trailer_id=trailer_data['id'],
                        site=trailer_data['site'],
                        thumbnail=trailer_data.get('thumbnail')
                    )
                    logger.info(f"Insertado nuevo trailer: anime_id={trailer.anime_id}, trailer_id={trailer.trailer_id}")
                    session.add(trailer)
            session.commit()

    except Exception as e:
        logger.error(f"Error inserting anime data: {e}")
        session.rollback()

def handle_interrupt(signal, frame):
    global total_response_size_kb
    logger.info(f"Script interrumpido. Tamaño total procesado: {total_response_size_kb:.2f} KB")
    sys.exit(0)

def main(startDate, endDate, start_page=1):
    global total_response_size_kb
    page = start_page
    perPage = 50
    while True:
        data, response_size_kb = fetch_anime_without_characters_and_voice_actors(startDate, endDate, page, perPage)
        if data is None or 'data' not in data or 'Page' not in data['data'] or 'media' not in data['data']['Page']:
            logger.error(f"Error fetching data for page {page}. Retrying...")
            time.sleep(60)  # Esperar un minuto antes de reintentar
            continue
        if not data['data']['Page']['media']:
            break
        insert_anime(data)
        logger.info(f"Page {page} done. Tamaño de la página: {response_size_kb:.2f} KB")
        total_response_size_kb += response_size_kb  # Acumular el tamaño
        logger.info(f"Tamaño total procesado: {total_response_size_kb:.2f} KB")
        if not data['data']['Page']['pageInfo']['hasNextPage']:
            break
        time.sleep(DELAY_BETWEEN_REQUESTS)
        page += 1


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert anime data from AniList API")
    parser.add_argument('--start-date', type=int, required=True, help='The start date for fetching anime data (YYYYMMDD)')
    parser.add_argument('--end-date', type=int, required=True, help='The end date for fetching anime data (YYYYMMDD)')
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    # Manejador de interrupción
    signal.signal(signal.SIGINT, handle_interrupt)

    # Ejecutar el script principal
    main(args.start_date, args.end_date, args.start_page)
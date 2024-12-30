import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import argparse
import requests
import time
import logging
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.manga.manga import Manga
from models.v1.shared.genre import Genre
from models.v1.manga.manga_genres import manga_genres
from models.v1.character.character import Character
from models.v1.manga.manga_characters import MangaCharacter
from models.v1.manga.external_link import MangaExternalLink
from models.v1.shared.external_site import ExternalSite
from models.v1.manga.manga_trailer import MangaTrailer

from datetime import date
import calendar

total_response_size_kb = 0

# Configurar el logger
logging.basicConfig(filename='manga_fetch.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30  # Ajusta a 30 solicitudes por minuto
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE  # Delay entre solicitudes

Session = sessionmaker(bind=engine)
session = Session()

def convert_date_to_int(date_data):
    """
    Convierte fecha a formato integer basado en valores disponibles:
    - Con día: YYYYMMDD (20061125)
    - Sin día: YYYYMM (200611)
    - Solo año: YYYY (2006)
    """
    try:
        if not date_data or not date_data.get('year'):
            return None
            
        year = date_data['year']
        month = date_data.get('month')
        day = date_data.get('day')
        
        # Solo año disponible
        if month is None:
            return year
            
        # Año y mes disponibles, sin día
        if day is None:
            return year * 100 + month
            
        # Fecha completa disponible
        return year * 10000 + month * 100 + day
            
    except (ValueError, TypeError) as e:
        logger.error(f"Error al convertir fecha: {date_data} - {str(e)}")
        return None


def fetch_manga_with_characters(page=1, perPage=50):
    query = '''
query GetMangasWithCharacters($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            media(
                type: MANGA
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
                countryOfOrigin
                source(version: 3)
                format
                status(version: 2)
                chapters
                volumes
                isAdult
                genres
               
            }
        }
    }
    '''
    variables = {
        "page": page,
        "perPage": perPage,
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


def insert_manga(data):
    try:
        for manga_data in data['data']['Page']['media']:
            existing_manga = session.query(Manga).filter_by(id=manga_data['id']).first()
            start_date = None

            start_date = convert_date_to_int(manga_data['startDate'])
            end_date = convert_date_to_int(manga_data['endDate'])
            
            logger.info(f"Fechas convertidas - startDate: {start_date}, endDate: {end_date}")

            manga_format = manga_data.get('format')  # Proporcionar un valor predeterminado para 'format'

            if existing_manga:
                existing_manga.title_romaji = manga_data['title']['romaji']
                existing_manga.title_english = manga_data['title'].get('english')
                existing_manga.title_native = manga_data['title'].get('native')
                existing_manga.description = manga_data.get('description')
                existing_manga.coverImage = manga_data['coverImage']['extraLarge']
                existing_manga.bannerImage = manga_data.get('bannerImage')
                existing_manga.averageScore = manga_data.get('averageScore')
                existing_manga.startDate = start_date
                existing_manga.endDate = end_date
                existing_manga.format = manga_format
                existing_manga.countryOfOrigin = manga_data.get('countryOfOrigin')
                existing_manga.source = manga_data.get('source')
                existing_manga.status = manga_data.get('status')
                existing_manga.chapters = manga_data.get('chapters')
                existing_manga.volumes = manga_data.get('volumes')
                existing_manga.isAdult = manga_data.get('isAdult')
                logger.info(f"Actualizado manga: {existing_manga.title_romaji}")
            else:
                manga = Manga(
                    id=manga_data['id'],
                    title_romaji=manga_data['title']['romaji'],
                    title_english=manga_data['title'].get('english'),
                    title_native=manga_data['title'].get('native'),
                    description=manga_data.get('description'),
                    coverImage=manga_data['coverImage']['extraLarge'],
                    bannerImage=manga_data.get('bannerImage'),
                    averageScore=manga_data.get('averageScore'),
                    startDate=start_date,
                    endDate=end_date,
                    format=manga_format,
                    countryOfOrigin=manga_data.get('countryOfOrigin'),
                    source=manga_data.get('source'),
                    status=manga_data.get('status'),
                    chapters=manga_data.get('chapters'),
                    volumes=manga_data.get('volumes'),
                    isAdult=manga_data.get('isAdult')
                )
                session.add(manga)
                logger.info(f"Insertado nuevo manga: {manga.title_romaji}")
            session.commit()

            for genre_name in manga_data['genres']:
                genre = session.query(Genre).filter_by(name=genre_name).first()
                if not genre:
                    genre = Genre(name=genre_name)
                    session.add(genre)
                    session.commit()
                if existing_manga:
                    if genre not in existing_manga.genres:
                        existing_manga.genres.append(genre)
                else:
                    manga.genres.append(genre)
            session.commit()

        # Insertar external_links
            for external_link_data in manga_data['externalLinks']:
                site = session.query(ExternalSite).filter_by(id=external_link_data['siteId']).first()
                if not site:
                    site = session.query(ExternalSite).filter_by(name=external_link_data['site']).first()
                    if not site:
                        site = ExternalSite(
                            id=external_link_data['siteId'],
                            name=external_link_data['site'],
                            color=external_link_data.get('color'),
                            icon=external_link_data.get('icon'),
                            type=external_link_data.get('type'),
                            language=external_link_data.get('language'),
                            notes=external_link_data.get('notes'),
                            isDisabled=external_link_data.get('isDisabled', False)
                        )
                        logger.info(f"Insertado nuevo sitio externo: id={site.id}, name={site.name}")
                        session.add(site)
                        session.commit()

                existing_link = session.query(MangaExternalLink).filter_by(manga_id=manga_data['id'], site_id=site.id).first()
                if not existing_link:
                    external_link = MangaExternalLink(
                        manga_id=manga_data['id'],
                        site_id=site.id,
                        url=external_link_data['url'],
                    )
                    logger.info(f"Insertado nuevo enlace externo: manga_id={external_link.manga_id}, site_id={external_link.site_id}")
                    session.add(external_link)
            session.commit()

            # Insertar trailer
            if manga_data['trailer']:
                existing_trailer = session.query(MangaTrailer).filter_by(manga_id=manga_data['id'], trailer_id=manga_data['trailer']['id']).first()
                if not existing_trailer:
                    trailer_data = manga_data['trailer']
                    trailer = MangaTrailer(
                        manga_id=manga_data['id'],
                        trailer_id=trailer_data['id'],
                        site=trailer_data['site'],
                        thumbnail=trailer_data.get('thumbnail')
                    )
                    logger.info(f"Insertado nuevo trailer: manga_id={trailer.manga_id}, trailer_id={trailer.trailer_id}")
                    session.add(trailer)
            session.commit()


    except Exception as e:
        logger.error(f"Error inserting manga data: {e}")
        session.rollback()

def main(start_page=1):
    global total_response_size_kb
    page = start_page
    perPage = 50
    while True:
        data, response_size_kb = fetch_manga_with_characters(page, perPage)
        if data is None or 'data' not in data or 'Page' not in data['data'] or 'media' not in data['data']['Page']:
            logger.error(f"Error fetching data for page {page}. Retrying...")
            time.sleep(60)  # Esperar un minuto antes de reintentar
            continue
        if not data['data']['Page']['media']:
            break
        insert_manga(data)
        logger.info(f"Page {page} done. Tamaño de la página: {response_size_kb:.2f} KB")
        total_response_size_kb += response_size_kb  # Acumular el tamaño
        logger.info(f"Tamaño total procesado: {total_response_size_kb:.2f} KB")
        if not data['data']['Page']['pageInfo']['hasNextPage']:
            break
        time.sleep(DELAY_BETWEEN_REQUESTS)
        page += 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert manga data from AniList API")
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    main(args.start_page)
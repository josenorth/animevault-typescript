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

# Configurar el logger
logging.basicConfig(filename='manga_fetch.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30  # Ajusta a 30 solicitudes por minuto
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE  # Delay entre solicitudes

Session = sessionmaker(bind=engine)
session = Session()

def fetch_manga_with_characters(page=1, perPage=50, characterPage=1):
    query = '''
    query GetMangasWithCharacters($page: Int, $perPage: Int, $characterPage: Int) {
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
                countryOfOrigin
                source
                format
                status
                chapters
                volumes
                isAdult
                genres
                characters(page: $characterPage, perPage: 50) {
                    pageInfo {
                        currentPage
                        hasNextPage
                    }
                    edges {
                        role
                        node {
                            id
                            name {
                                userPreferred
                            }
                            image {
                                large
                            }
                        }
                    }
                }
            }
        }
    }
    '''
    variables = {
        "page": page,
        "perPage": perPage,
        "characterPage": characterPage
    }
    try:
        response = requests.post(API_URL, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            response_size_kb = len(response.content) / 1024
            logger.info(f"Tamaño de la respuesta para la página {page}: {response_size_kb:.2f} KB")
            return response.json(), response_size_kb
        else:
            logger.error(f"Error: {response.status_code}, Response: {response.text}")
            response.raise_for_status()
    except Exception as e:
        logger.error(f"Error fetching data: {e}")
        return None

def convert_date_to_int(date):
    if date['year']:
        year = date['year']
        month = date['month'] if date['month'] else 1
        day = date['day'] if date['day'] else 1
        return year * 10000 + month * 100 + day
    return None

def insert_manga(data):
    try:
        for manga_data in data['data']['Page']['media']:
            logger.info(f"Procesando manga: {manga_data['title']['romaji']}")
            logger.info(f"Datos recibidos - countryOfOrigin: {manga_data.get('countryOfOrigin')}, source: {manga_data.get('source')}")

            existing_manga = session.query(Manga).filter_by(id=manga_data['id']).first()
            start_date = convert_date_to_int(manga_data['startDate'])
            end_date = convert_date_to_int(manga_data['endDate'])

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

            for edge in manga_data['characters']['edges']:
                character_id = edge['node']['id']
                role = edge.get('role')

                existing_character = session.query(Character).filter_by(id=character_id).first()
                if not existing_character:
                    character = Character(
                        id=character_id,
                        name_full=edge['node']['name']['userPreferred'],
                        image=edge['node']['image']['large'] if edge['node']['image'] else None
                    )
                    session.add(character)
                    session.commit()
                    logger.info(f"Insertado nuevo character: id={character_id}, name_full={edge['node']['name']['userPreferred']}")

                existing_manga_character = session.query(MangaCharacter).filter_by(manga_id=manga_data['id'], character_id=character_id).first()
                if existing_manga_character:
                    existing_manga_character.role = role
                    logger.info(f"Actualizado manga_character: manga_id={manga_data['id']}, character_id={character_id}")
                else:
                    manga_character = MangaCharacter(
                        manga_id=manga_data['id'],
                        character_id=character_id,
                        role=role
                    )
                    session.add(manga_character)
                    logger.info(f"Insertado nuevo manga_character: manga_id={manga_data['id']}, character_id={character_id}")
                session.commit()
    except Exception as e:
        logger.error(f"Error inserting manga data: {e}")
        session.rollback()

def main(start_page=1):
    page = start_page
    perPage = 50
    while True:
        for character_page in range(1, 5):
            data, response_size_kb = fetch_manga_with_characters(page, perPage, character_page)
            if data is None or 'data' not in data or 'Page' not in data['data'] or 'media' not in data['data']['Page']:
                logger.error(f"Error fetching data for page {page}, character page {character_page}. Retrying...")
                time.sleep(60)  # Esperar un minuto antes de reintentar
                continue
            if not data['data']['Page']['media']:
                break
            insert_manga(data)
            logger.info(f"Page {page}, Character Page {character_page} done. Tamaño de la página: {response_size_kb:.2f} KB")
            if not data['data']['Page']['pageInfo']['hasNextPage']:
                break
            time.sleep(DELAY_BETWEEN_REQUESTS)
        page += 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert manga data from AniList API")
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    main(args.start_page)
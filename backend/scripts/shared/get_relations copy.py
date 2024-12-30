import sys
import os
import requests
import time
import logging
from datetime import datetime
import argparse

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.shared.relations import Relations
from models.v1.anime.anime import Anime
from models.v1.manga.manga import Manga
from scripts.utils.relations import fetch_anime_by_id, fetch_manga_by_id
from scripts.utils.date_func import convert_date_to_int

logging.basicConfig(filename='relations_fetch.log', level=logging.INFO,
                   format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE

Session = sessionmaker(bind=engine)
session = Session()

def fetch_relations(page=1, perPage=50):
    query = '''
    query GetMediaRelations($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            media {
                id
                type
                relations {
                    edges {
                        relationType(version:2)
                        node {
                            id
                            type
                        }
                    }
                }
            }
        }
    }
    '''
    
    variables = {
        "page": page,
        "perPage": perPage
    }
    
    try:
        response = requests.post(API_URL, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Error: {response.status_code}, Response: {response.text}")
            return None
    except Exception as e:
        logger.error(f"Error fetching data: {e}")
        return None

def exists_in_database(session, media_type, media_id):
    """Verifica si el media existe en la base de datos"""
    if media_type == 'ANIME':
        return session.query(Anime).filter(Anime.id == media_id).first() is not None
    elif media_type == 'MANGA':
        return session.query(Manga).filter(Manga.id == media_id).first() is not None
    return False

def relation_exists(session, anime_id=None, manga_id=None, related_anime_id=None, related_manga_id=None):
    """Verifica si la relación ya existe basándose solo en los IDs"""
    query = session.query(Relations)
    
    # Filtrar por los IDs proporcionados
    conditions = []
    if anime_id is not None:
        conditions.append(Relations.anime_id == anime_id)
    if manga_id is not None:
        conditions.append(Relations.manga_id == manga_id)
    if related_anime_id is not None:
        conditions.append(Relations.related_anime_id == related_anime_id)
    if related_manga_id is not None:
        conditions.append(Relations.related_manga_id == related_manga_id)
    
    # Aplicar todos los filtros
    for condition in conditions:
        query = query.filter(condition)
    
    return query.first() is not None

def insert_relations(data):
    try:
        relations_to_add = []
        for media in data['data']['Page']['media']:
            media_id = media['id']
            media_type = media['type']

            # Verificar y crear el media principal si es manga
            if media_type == 'MANGA' and not exists_in_database(session, 'MANGA', media_id):
                manga_data = fetch_manga_by_id(media_id)
                if manga_data:
                    insert_manga(session, manga_data)
                    session.commit()
            
            if 'relations' not in media or not media['relations']['edges']:
                continue

            for edge in media['relations']['edges']:
                related_id = edge['node']['id']
                relation_type = edge['relationType']
                related_type = edge['node']['type']

                # Verificar y crear el media relacionado si es manga
                if related_type == 'MANGA' and not exists_in_database(session, 'MANGA', related_id):
                    related_manga_data = fetch_manga_by_id(related_id)
                    if related_manga_data:
                        insert_manga(session, related_manga_data)
                        session.commit()

                check_params = {
                    'anime_id': None,
                    'manga_id': None,
                    'related_anime_id': None,
                    'related_manga_id': None
                }

                if media_type == 'ANIME':
                    check_params['anime_id'] = media_id
                    if related_type == 'ANIME':
                        check_params['related_anime_id'] = related_id
                    else:
                        check_params['related_manga_id'] = related_id
                else:  # MANGA
                    check_params['manga_id'] = media_id
                    if related_type == 'ANIME':
                        check_params['related_anime_id'] = related_id
                    else:
                        check_params['related_manga_id'] = related_id

                if not relation_exists(session, **check_params):
                    check_params['relation_type'] = relation_type
                    # Verificar que los IDs existan antes de agregar la relación
                    if id_exists(session, check_params):  # Removido el all()
                        relations_to_add.append(Relations(**check_params))
                        logger.info(f"Prepared relation: {media_id} ({media_type}) -> {related_id} ({related_type}) [{relation_type}]")

        if relations_to_add:
            session.bulk_save_objects(relations_to_add)
            session.commit()
            logger.info(f"Inserted {len(relations_to_add)} relations in batch")

    except Exception as e:
        logger.error(f"Error inserting relations: {e}")
        session.rollback()
        raise

def id_exists(session, params):
    """Verifica que los IDs referenciados existan en sus respectivas tablas"""
    try:
        if params['anime_id'] and not exists_in_database(session, 'ANIME', params['anime_id']):
            logger.warning(f"Anime ID {params['anime_id']} no existe en la base de datos")
            return False
        if params['manga_id'] and not exists_in_database(session, 'MANGA', params['manga_id']):
            logger.warning(f"Manga ID {params['manga_id']} no existe en la base de datos")
            return False
        if params['related_anime_id'] and not exists_in_database(session, 'ANIME', params['related_anime_id']):
            logger.warning(f"Related Anime ID {params['related_anime_id']} no existe en la base de datos")
            return False
        if params['related_manga_id'] and not exists_in_database(session, 'MANGA', params['related_manga_id']):
            logger.warning(f"Related Manga ID {params['related_manga_id']} no existe en la base de datos")
            return False
        return True
    except Exception as e:
        logger.error(f"Error verificando IDs: {e}")
        return False


def insert_anime(session, anime_data):
    media = anime_data.get('data', {}).get('Media', {})
    if not media:
        logger.error("Invalid anime data")
        return

    start_date = None
    if media['startDate']['year']:
        start_date = f"{media['startDate']['year']}-{media['startDate']['month'] or 1}-{media['startDate']['day'] or 1}"
    end_date = None
    if media['endDate']['year']:
        end_date = f"{media['endDate']['year']}-{media['endDate']['month'] or 1}-{media['endDate']['day'] or 1}"

    new_anime = Anime(
        id=media['id'],
        title_romaji=media['title']['romaji'],
        title_english=media['title']['english'],
        native=media['title']['native'],
        description=media['description'],
        coverImage=media['coverImage']['extraLarge'] if media['coverImage'] else None,
        bannerImage=media['bannerImage'],
        average_score=media['averageScore'],
        popularity=media['popularity'],
        start_date=start_date,
        end_date=end_date,
        seasonYear=media['seasonYear'],
        season=media['season'],
        format=media['format'],
        status=media['status'],
        episode_count=media['episodes'],
        episode_duration=media['duration'],
        source=media['source'],
        isAdult=media['isAdult']
    )
    session.add(new_anime)
    session.commit()
    logger.info(f"Inserted new anime: {media['id']}")

def insert_manga(session, manga_data):
    media = manga_data.get('data', {}).get('Media', {})
    if not media:
        logger.error("Invalid manga data")
        return

    start_date = convert_date_to_int(media['startDate'])
    end_date = convert_date_to_int(media['endDate'])

    new_manga = Manga(
        id=media['id'],
        title_romaji=media['title']['romaji'],
        title_english=media['title']['english'],
        title_native=media['title']['native'],
        description=media['description'],
        coverImage=media['coverImage']['extraLarge'] if media['coverImage'] else None,
        bannerImage=media['bannerImage'],
        averageScore=media['averageScore'],
        chapters=media['chapters'],
        volumes=media['volumes'],
        startDate=start_date,
        endDate=end_date,
        status=media['status'],
        format=media['format'],
        source=media['source'],
        isAdult=media['isAdult']
    )
    session.add(new_manga)
    session.commit()
    logger.info(f"Inserted new manga: {media['id']}")

def main(start_page=1):
    page = start_page
    while True:
        logger.info(f"Fetching page {page}")
        data = fetch_relations(page)
        
        if not data or 'data' not in data or 'Page' not in data['data']:
            logger.error(f"Invalid data received for page {page}")
            break

        if not data['data']['Page']['media']:
            logger.info("No more data to process")
            break

        insert_relations(data)
        
        if not data['data']['Page']['pageInfo']['hasNextPage']:
            logger.info("Reached last page")
            break
            
        page += 1
        time.sleep(DELAY_BETWEEN_REQUESTS)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert media relations from AniList API")
    parser.add_argument('--start-page', type=int, default=1, help='Starting page number')
    args = parser.parse_args()
    
    main(args.start_page)
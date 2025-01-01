import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import argparse
import requests
import time
import logging
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.anime.anime import Anime
from models.v1.anime.streaming_link import StreamingLink

logging.basicConfig(filename='anime_streaming.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE

Session = sessionmaker(bind=engine)
session = Session()

def fetch_anime_streaming(page=1, perPage=50):
    query = '''
    query GetAnimeStreaming($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            media(
                type: ANIME
            ) {
                id
                streamingEpisodes {
                    title
                    thumbnail
                    url
                    site
                }
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
            return response.json()
        else:
            logger.error(f"Error: {response.status_code}, Response: {response.text}")
            response.raise_for_status()
    except Exception as e:
        logger.error(f"Error fetching data: {e}")
        return None

def insert_streaming_links(data):
    try:
        for anime_data in data['data']['Page']['media']:
            anime_id = anime_data['id']
            streaming_episodes = anime_data.get('streamingEpisodes', [])

            # Eliminar enlaces de streaming existentes
            session.query(StreamingLink).filter_by(anime_id=anime_id).delete()

            for episode in streaming_episodes:
                streaming_link = StreamingLink(
                    anime_id=anime_id,
                    title=episode['title'],
                    thumbnail=episode['thumbnail'],
                    url=episode['url'],
                    site=episode['site']
                )
                session.add(streaming_link)
                logger.info(f"Insertado nuevo streaming link para anime ID {anime_id}: {episode['title']}")
            
            session.commit()
    except Exception as e:
        logger.error(f"Error inserting streaming data: {e}")
        session.rollback()

def main(start_page=1):
    page = start_page
    perPage = 50
    while True:
        data = fetch_anime_streaming(page, perPage)
        if data is None or 'data' not in data or 'Page' not in data['data']:
            logger.error(f"Error fetching data for page {page}. Retrying...")
            time.sleep(60)
            continue
            
        if not data['data']['Page']['media']:
            break
            
        insert_streaming_links(data)
        logger.info(f"Page {page} processed.")
        
        if not data['data']['Page']['pageInfo']['hasNextPage']:
            break
            
        page += 1
        time.sleep(DELAY_BETWEEN_REQUESTS)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert anime streaming data from AniList API")
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    
    main(args.start_page)
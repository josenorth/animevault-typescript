import os
import sys
import requests
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import time
import argparse
from sqlalchemy.orm import sessionmaker
from database.db_local import engine
from models.v1.anime.anime_trend import AnimeTrend
from models.v1.anime import Anime
from datetime import datetime

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE

Session = sessionmaker(bind=engine)
session = Session()

def fetch_trend(page=1, per_page=50):
    query = '''
  query GetAnimeTrends($page: Int, $perPage: Int, $sort: [MediaTrendSort]) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
            }
            media(
                type: ANIME,
                sort: POPULARITY_DESC
            ) {
                id
                title {
                    romaji
                }
                trends (sort: $sort) {
                    nodes {
                        trending
                        popularity
                        averageScore
                        date
                    }
                }
            }
        }
    }
    '''
    variables = {
        "page": page,
        "perPage": per_page,
        "sort": ["DATE_DESC"]
    }
    try:
        response = requests.post(API_URL, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code}, Response: {response.text}")
            response.raise_for_status()
    except Exception as e:
        print(f"Error fetching data: {e}")
        return None

def insert_trend(data):
    try:
        for anime_data in data['data']['Page']['media']:
            anime_id = anime_data['id']
            trends = anime_data['trends']['nodes']
            if trends:
                latest_trend = max(trends, key=lambda x: x['date'])
                updated_at = datetime.fromtimestamp(latest_trend['date'])
                existing_trend = session.query(AnimeTrend).filter_by(anime_id=anime_id).first()
                if existing_trend:
                    existing_trend.trending = latest_trend['trending']
                    existing_trend.popularity = latest_trend['popularity']
                    existing_trend.average_score = latest_trend['averageScore']
                    existing_trend.updated_at = updated_at

                    print(f"Updated trend for anime ID: {anime_id}")
                    print(f"{latest_trend['averageScore']}")
                else:
                    new_trend = AnimeTrend(
                        anime_id=anime_id,
                        trending=latest_trend['trending'],
                        popularity=latest_trend['popularity'],
                        average_score=latest_trend['averageScore'],
                        updated_at=updated_at
                    )
                    session.add(new_trend)
                    print(f"Inserted new trend for anime ID: {anime_id}")
                session.commit()
    except Exception as e:
        print(f"Error inserting trend data: {e}")
        session.rollback()

def main(start_page=1):
    page = start_page
    per_page = 50
    while True:
        data = fetch_trend(page, per_page)
        if data is None or 'data' not in data or 'Page' not in data['data'] or 'media' not in data['data']['Page']:
            print(f"Error fetching data for page {page}. Retrying...")
            time.sleep(60)
            continue
        if not data['data']['Page']['media']:
            break
        insert_trend(data)
        print(f"Page {page} processed.")
        if not data['data']['Page']['pageInfo']['hasNextPage']:
            break
        page += 1
        time.sleep(DELAY_BETWEEN_REQUESTS)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert anime trend data from AniList API")
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    main(args.start_page)
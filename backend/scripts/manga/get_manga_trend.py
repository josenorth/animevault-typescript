import os
import sys
import requests
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import time
import argparse
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.manga.manga_trend import MangaTrend
from models.v1.manga.manga import Manga
from datetime import datetime

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE

Session = sessionmaker(bind=engine)
session = Session()

def fetch_trend(startDate, page=1, per_page=50):
    query = '''
query GetMangaTrends(
  $startDate: FuzzyDateInt,
  $page: Int,
  $perPage: Int,
  $sort: [MediaTrendSort]
) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      currentPage
      hasNextPage
    }
    media(
      type: MANGA
      startDate_greater: $startDate
    ) {
      id
      title {
        romaji
      }
      trends(sort: $sort) {
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
        "startDate": startDate,
        "page": page,
        "perPage": per_page,
        "sort": ["TRENDING_DESC"]
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
        for manga_data in data['data']['Page']['media']:
            manga_id = manga_data['id']
            trends = manga_data['trends']['nodes']
            if trends:
                latest_trend = max(trends, key=lambda x: x['date'])
                updated_at = datetime.fromtimestamp(latest_trend['date'])
                
                existing_trend = session.query(MangaTrend).filter_by(manga_id=manga_id).first()
                if existing_trend:
                    existing_trend.average_score = latest_trend['averageScore']
                    existing_trend.trending = latest_trend['trending']
                    existing_trend.popularity = latest_trend['popularity']
                    existing_trend.update_at = updated_at

                    print(f"Updated trend for manga ID: {manga_id}")
                    print(f"Average Score: {latest_trend['averageScore']}")
                else:
                    new_trend = MangaTrend(
                        manga_id=manga_id,
                        average_score=latest_trend['averageScore'],
                        trending=latest_trend['trending'],
                        popularity=latest_trend['popularity'],
                        update_at=updated_at
                    )
                    session.add(new_trend)
                    print(f"Inserted new trend for manga ID: {manga_id}")
                session.commit()
    except Exception as e:
        print(f"Error inserting manga trend data: {e}")
        session.rollback()

def main(start_date, start_page=1):
    page = start_page
    per_page = 50
    while True:
        data = fetch_trend(start_date, page, per_page)
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
    parser.add_argument('--start-date', type=int, required=True, help='The start date for fetching anime trend data (YYYYMMDD)')
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    main(args.start_date, args.start_page)
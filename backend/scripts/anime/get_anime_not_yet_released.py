import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import requests
import time
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.anime import Anime
from models.v1.genre import Genre
from models.v1.studio import Studio
from backend.models.v1.season import Period
from models.v1.anime_genres import anime_genres
from datetime import datetime

API_URL = "https://graphql.anilist.co"
RATE_LIMIT = 30  # Ajustar a 30 solicitudes por minuto
RATE_LIMIT_REMAINING = 30
RATE_LIMIT_RESET = 0

VALID_ANIME_FORMATS = {"TV", "TV_SHORT", "MOVIE", "SPECIAL", "OVA", "ONA", "MUSIC"}

Session = sessionmaker(bind=engine)
session = Session()

def rate_limit_check(response):
    headers = response.headers
    rate_limit_limit = headers.get('X-RateLimit-Limit')
    rate_limit_remaining = headers.get('X-RateLimit-Remaining')
    retry_after = headers.get('Retry-After')
    rate_limit_reset = headers.get('X-RateLimit-Reset')

    print(f"Rate Limit: {rate_limit_limit}")
    print(f"Rate Limit Remaining: {rate_limit_remaining}")
    if retry_after:
        print(f"Retry After: {retry_after} seconds")
        for i in range(int(retry_after), 0, -1):
            sys.stdout.write(f"\rWaiting: {i} seconds")
            sys.stdout.flush()
            time.sleep(1)
        print("\nRetrying now...")
    elif rate_limit_remaining and int(rate_limit_remaining) == 0 and rate_limit_reset:
        reset_time = int(rate_limit_reset) - int(time.time())
        if reset_time > 0:
            print(f"Rate Limit Reset in: {reset_time} seconds")
            for i in range(reset_time, 0, -1):
                sys.stdout.write(f"\rWaiting: {i} seconds")
                sys.stdout.flush()
                time.sleep(1)
            print("\nRetrying now...")

def is_valid_date(year, month, day):
    try:
        datetime(year, month, day)
        return True
    except ValueError:
        return False

def fetch_anime_not_yet_released(page=1):
    query = '''
    query ($page: Int) {
        Page(page: $page, perPage: 50) {
            media(status: NOT_YET_RELEASED) {
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
                format
                status
                episodes
                duration
                studios {
                    nodes {
                        id
                        name
                    }
                }
                genres
                source
            }
        }
    }
    '''
    variables = {
        "page": page
    }
    while True:
        response = requests.post(API_URL, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            rate_limit_check(response)
            data = response.json()
            if 'errors' in data:
                print(f"GraphQL errors: {data['errors']}")
                return None
            return data
        elif response.status_code == 429:
            rate_limit_check(response)
        else:
            response.raise_for_status()

def insert_anime(data):
    for anime_data in data['data']['Page']['media']:
        studio_data = anime_data['studios']['nodes'][0] if anime_data['studios']['nodes'] else None
        studio = None
        if studio_data:
            studio = session.query(Studio).filter_by(id=studio_data['id']).first()
            if not studio:
                existing_studio = session.query(Studio).filter_by(name=studio_data['name']).first()
                if existing_studio:
                    print(f"El nombre del estudio '{studio_data['name']}' ya existe con un ID diferente.")
                else:
                    studio = Studio(id=studio_data['id'], name=studio_data['name'])
                    session.add(studio)
            else:
                if studio.name != studio_data['name']:
                    existing_studio = session.query(Studio).filter_by(name=studio_data['name']).first()
                    if existing_studio and existing_studio.id != studio.id:
                        print(f"El nombre del estudio '{studio_data['name']}' ya existe con un ID diferente.")
                    else:
                        studio.name = studio_data['name']
            session.commit()

        season = anime_data.get('season')
        period = None
        if season:
            period = session.query(Period).filter_by(name=season).first()
            if not period:
                period = Period(name=season)
                session.add(period)
            session.commit()

        existing_anime = session.query(Anime).filter_by(id=anime_data['id']).first()
        start_date = None
        if anime_data['startDate']['year'] and anime_data['startDate']['month'] and anime_data['startDate']['day']:
            if is_valid_date(anime_data['startDate']['year'], anime_data['startDate']['month'], anime_data['startDate']['day']):
                start_date = f"{anime_data['startDate']['year']}-{anime_data['startDate']['month']}-{anime_data['startDate']['day']}"
            else:
                print(f"Invalid start date for anime ID {anime_data['id']}: {anime_data['startDate']['year']}-{anime_data['startDate']['month']}-{anime_data['startDate']['day']}")
        end_date = None
        if anime_data['endDate']['year'] and anime_data['endDate']['month'] and anime_data['endDate']['day']:
            if is_valid_date(anime_data['endDate']['year'], anime_data['endDate']['month'], anime_data['endDate']['day']):
                end_date = f"{anime_data['endDate']['year']}-{anime_data['endDate']['month']}-{anime_data['endDate']['day']}"
            else:
                print(f"Invalid end date for anime ID {anime_data['id']}: {anime_data['endDate']['year']}-{anime_data['endDate']['month']}-{anime_data['endDate']['day']}")

        anime_format = anime_data.get('format')
        if anime_format not in VALID_ANIME_FORMATS:
            print(f"Skipping anime ID {anime_data['id']} due to invalid format: {anime_format}")
            continue

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
            existing_anime.studio_id = studio.id if studio else None
            existing_anime.period_id = period.id if period else None
            print(f"Actualizado anime: {existing_anime.title_romaji}")
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
                studio_id=studio.id if studio else None,
                period_id=period.id if period else None
            )
            session.add(anime)
            print(f"Insertado nuevo anime: {anime.title_romaji}")
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

def main():
    page = 1
    while True:
        data = fetch_anime_not_yet_released(page)
        if data is None or 'data' not in data or 'Page' not in data['data'] or 'media' not in data['data']['Page']:
            print(f"Error fetching data for page {page}. Retrying...")
            time.sleep(60)  # Esperar un minuto antes de reintentar
            continue
        if not data['data']['Page']['media']:
            break
        insert_anime(data)
        print(f"Page {page} done.")
        page += 1

if __name__ == "__main__":
    main()
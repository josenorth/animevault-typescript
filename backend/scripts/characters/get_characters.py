import sys
import os
import argparse
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import requests
import time
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.character.character import Character

API_URL = "https://graphql.anilist.co"
RATE_LIMIT = 30  # Ajustar a 30 solicitudes por minuto
RATE_LIMIT_REMAINING = 30
RATE_LIMIT_RESET = 0

Session = sessionmaker(bind=engine)
session = Session()

MAX_REQUESTS_PER_MINUTE = 30  # Ajusta a 30 solicitudes por minuto
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE  # Delay entre solicitudes

def fetch_characters_paginated(page=1, perPage=50):
    query = '''
    query GetCharactersPaginated($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            characters {
                id
                name {
                    full
                    native
                }
                age
                description
                dateOfBirth {
                    year
                    month
                    day
                }
                image {
                    large
                }
            }
        }
    }
    '''
    variables = {"page": page, "perPage": perPage}
    try:
        response = requests.post(API_URL, json={'query': query, 'variables': variables})
        if response.status_code == 200:
            return response.json()
        elif response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            print(f"Rate limit exceeded. Retrying in {retry_after} seconds...")
            time.sleep(retry_after)
            return None
        else:
            print(f"Error: {response.status_code}, Response: {response.text}")
            response.raise_for_status()
    except Exception as e:
        print(f"Error fetching page {page}: {e}")
        return None

def insert_characters(data):
    try:
        for character_data in data['data']['Page']['characters']:
            existing_character = session.query(Character).filter_by(id=character_data['id']).first()
            date_of_birth = None
            if character_data['dateOfBirth']['year']:
                date_of_birth = f"{character_data['dateOfBirth']['year']}-{character_data['dateOfBirth']['month'] or 1}-{character_data['dateOfBirth']['day'] or 1}"

            name_full = character_data['name']['full']
            name_native = character_data['name']['native']

            if existing_character:
                existing_character.name_full = name_full
                existing_character.name_native = name_native
                existing_character.age = character_data.get('age')
                existing_character.description = character_data.get('description')
                existing_character.dateOfBirth = date_of_birth
                existing_character.image = character_data.get('image', {}).get('large')
                print(f"Actualizado character: {name_full}")
            else:
                character = Character(
                    id=character_data['id'],
                    name_full=name_full,
                    name_native=name_native,
                    age=character_data.get('age'),
                    description=character_data.get('description'),
                    dateOfBirth=date_of_birth,
                    image=character_data.get('image', {}).get('large')
                )
                session.add(character)
                print(f"Insertado nuevo character: {name_full}")
            session.commit()
    except Exception as e:
        print(f"Error inserting character data: {e}")
        session.rollback()

def main(start_page):
    page = start_page
    perPage = 50
    while True:
        data = fetch_characters_paginated(page, perPage)
        if data is None or 'data' not in data or 'Page' not in data['data'] or 'characters' not in data['data']['Page']:
            print(f"Error fetching data for page {page}. Retrying...")
            time.sleep(60)  # Esperar un minuto antes de reintentar
            continue
        if not data['data']['Page']['characters']:
            break
        insert_characters(data)
        print(f"Page {page} done.")
        if not data['data']['Page']['pageInfo']['hasNextPage']:
            break
        page += 1
        time.sleep(DELAY_BETWEEN_REQUESTS)
        
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert character data from AniList API")
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    main(args.start_page)
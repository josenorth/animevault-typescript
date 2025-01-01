import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
import requests
import time
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.anime_character import AnimeCharacter
from models.v1.character.character import Character
from models.v1.staff import Staff
from models.v1.anime import Anime

API_URL = "https://graphql.anilist.co"
RATE_LIMIT = 30  # Ajustar a 30 solicitudes por minuto
RATE_LIMIT_REMAINING = 30
RATE_LIMIT_RESET = 0

Session = sessionmaker(bind=engine)
session = Session()

MAX_REQUESTS_PER_MINUTE = 30  # Ajusta a 30 solicitudes por minuto
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE  # Delay entre solicitudes

def fetch_anime_characters(anime_id):
    query = '''
    query ($id: Int) {
      Media(id: $id) {
        characters {
          edges {
            node {
              id
              name {
                full
                native
              }
            }
            voiceActors {
              id
              name {
                full
                native
              }
              languageV2
            }
          }
        }
      }
    }
    '''
    variables = {"id": anime_id}
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
        print(f"Error fetching anime characters for anime_id {anime_id}: {e}")
        return None

def insert_anime_characters(anime_id, data):
    try:
        for edge in data['data']['Media']['characters']['edges']:
            character_id = edge['node']['id']
            for voice_actor in edge['voiceActors']:
                staff_id = voice_actor['id']
                existing_character = session.query(Character).filter_by(id=character_id).first()
                existing_staff = session.query(Staff).filter_by(id=staff_id).first()
                if existing_character and existing_staff:
                    existing_anime_character = session.query(AnimeCharacter).filter_by(anime_id=anime_id, character_id=character_id).first()
                    if existing_anime_character:
                        existing_anime_character.staff_id = staff_id
                        print(f"Actualizado anime_character: anime_id={anime_id}, character_id={character_id}, staff_id={staff_id}")
                    else:
                        anime_character = AnimeCharacter(
                            anime_id=anime_id,
                            character_id=character_id,
                            staff_id=staff_id
                        )
                        session.add(anime_character)
                        print(f"Insertado nuevo anime_character: anime_id={anime_id}, character_id={character_id}, staff_id={staff_id}")
                    session.commit()
                else:
                    print(f"Character or Staff not found in database: character_id={character_id}, staff_id={staff_id}")
    except Exception as e:
        print(f"Error inserting anime characters data: {e}")
        session.rollback()

def main():
    anime_ids = session.query(Anime.id).all()
    for anime_id_tuple in anime_ids:
        anime_id = anime_id_tuple[0]
        data = fetch_anime_characters(anime_id)
        if data and 'data' in data and 'Media' in data['data'] and 'characters' in data['data']['Media']:
            insert_anime_characters(anime_id, data)
        else:
            print(f"Error fetching data for anime_id {anime_id}. Retrying...")
            time.sleep(60)  # Esperar un minuto antes de reintentar
        time.sleep(DELAY_BETWEEN_REQUESTS)

if __name__ == "__main__":
    main()
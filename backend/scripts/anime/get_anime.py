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
from models.v1.shared.genre import Genre
from models.v1.anime.studio import Studio
from models.v1.anime.anime_genres import anime_genres
from models.v1.character.character import Character
from models.v1.anime.staff import Staff
from models.v1.anime.anime_character import AnimeCharacter
from models.v1.anime.anime_studios import anime_studios
from models.v1.anime.season import Season

# Configurar el logger
logging.basicConfig(filename='anime_fetch.log', level=logging.INFO, 
                    format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

API_URL = "https://graphql.anilist.co"
MAX_REQUESTS_PER_MINUTE = 30  # Ajusta a 30 solicitudes por minuto
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE  # Delay entre solicitudes

Session = sessionmaker(bind=engine)
session = Session()

def fetch_anime_with_characters_and_voice_actors(seasonYear, page=1, perPage=50, characterPage=1):
    query = '''
    query GetAnimesWithCharactersAndVoiceActors($seasonYear: Int, $page: Int, $perPage: Int, $characterPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            media(
                type: ANIME
                seasonYear: $seasonYear
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
                        voiceActors(language: JAPANESE, sort: [RELEVANCE, ID]) {
                            id
                            name {
                                userPreferred
                            }
                            languageV2
                            image {
                                large
                            }
                            description
                            primaryOccupations
                            gender
                            dateOfBirth {
                                year
                                month
                                day
                            }
                            dateOfDeath {
                                year
                                month
                                day
                            }
                            age
                            yearsActive
                            homeTown
                        }
                    }
                }
            }
        }
    }
    '''
    variables = {
        "seasonYear": seasonYear,
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

            # Insertar relaciones anime-character y staff (voice actors)
            for edge in anime_data['characters']['edges']:
                character_id = edge['node']['id']
                role = edge.get('role')
                for voice_actor in edge['voiceActors']:
                    if voice_actor['languageV2'] == 'Japanese':
                        staff_id = voice_actor['id']

                        # Verificar si el character existe, si no, insertarlo
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

                        # Verificar si el staff existe, si no, insertarlo
                        existing_staff = session.query(Staff).filter_by(id=staff_id).first()
                        if not existing_staff:
                            staff = Staff(
                                id=staff_id,
                                name_full=voice_actor['name']['userPreferred'],
                                languageV2=voice_actor['languageV2'],
                                image=voice_actor['image']['large'] if voice_actor['image'] else None,
                                description=voice_actor.get('description'),
                                primaryOccupations=voice_actor.get('primaryOccupations'),
                                gender=voice_actor.get('gender'),
                                dateOfBirth=f"{voice_actor['dateOfBirth']['year']}-{voice_actor['dateOfBirth']['month'] or 1}-{voice_actor['dateOfBirth']['day'] or 1}" if voice_actor['dateOfBirth']['year'] else None,
                                dateOfDeath=f"{voice_actor['dateOfDeath']['year']}-{voice_actor['dateOfDeath']['month'] or 1}-{voice_actor['dateOfDeath']['day'] or 1}" if voice_actor['dateOfDeath']['year'] else None,
                                age=voice_actor.get('age'),
                                yearsActive=voice_actor.get('yearsActive'),
                                homeTown=voice_actor.get('homeTown')
                            )
                            session.add(staff)
                            session.commit()
                            logger.info(f"Insertado nuevo staff: id={staff_id}, name_full={voice_actor['name']['userPreferred']}")

                        existing_anime_character = session.query(AnimeCharacter).filter_by(anime_id=anime_data['id'], character_id=character_id).first()
                        if existing_anime_character:
                            existing_anime_character.staff_id = staff_id
                            existing_anime_character.role = role
                            existing_anime_character.languageV2 = voice_actor['languageV2']
                            logger.info(f"Actualizado anime_character: anime_id={anime_data['id']}, character_id={character_id}, staff_id={staff_id}")
                        else:
                            anime_character = AnimeCharacter(
                                anime_id=anime_data['id'],
                                character_id=character_id,
                                staff_id=staff_id,
                                role=role,
                                languageV2=voice_actor['languageV2']
                            )
                            session.add(anime_character)
                            logger.info(f"Insertado nuevo anime_character: anime_id={anime_data['id']}, character_id={character_id}, staff_id={staff_id}")
                        session.commit()
    except Exception as e:
        logger.error(f"Error inserting anime data: {e}")
        session.rollback()

def main(seasonYear, start_page=1):
    page = start_page
    perPage = 50
    while True:
        for character_page in range(1, 5):  # Cambiado de 5 a 9 para incluir characterPage 1
            data, response_size_kb = fetch_anime_with_characters_and_voice_actors(seasonYear, page, perPage, character_page)
            if data is None or 'data' not in data or 'Page' not in data['data'] or 'media' not in data['data']['Page']:
                logger.error(f"Error fetching data for page {page}, character page {character_page}. Retrying...")
                time.sleep(60)  # Esperar un minuto antes de reintentar
                continue
            if not data['data']['Page']['media']:
                break
            insert_anime(data)
            logger.info(f"Page {page}, Character Page {character_page} done. Tamaño de la página: {response_size_kb:.2f} KB")
            if not data['data']['Page']['pageInfo']['hasNextPage']:
                break
            time.sleep(DELAY_BETWEEN_REQUESTS)
        page += 1

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert anime data from AniList API")
    parser.add_argument('--season-year', type=int, required=True, help='The year for fetching anime data') 
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    main(args.season_year, args.start_page)
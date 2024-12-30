import logging
import requests

API_URL = "https://graphql.anilist.co"

# Configuración básica del logger (puedes personalizarla)
logging.basicConfig(filename='../shared/relations_fetch.log', level=logging.INFO,
                   format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

def fetch_anime_by_id(anime_id):
    query = '''
    query GetAnimeById($id: Int) {
        Media(id: $id, type: ANIME) {
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
            source
            isAdult
        }
    }
    '''
    
    try:
        response = requests.post(API_URL, json={
            'query': query,
            'variables': {'id': anime_id}
        })
        return response.json() if response.status_code == 200 else None
    except Exception as e:
        logger.error(f"Error fetching anime {anime_id}: {e}")
        return None

def fetch_manga_by_id(manga_id):
    query = '''
    query GetMangaById($id: Int) {
        Media(id: $id, type: MANGA) {
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
            chapters
            volumes
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
            status
            format
            source
            isAdult
        }
    }
    '''
    
    try:
        response = requests.post(API_URL, json={
            'query': query,
            'variables': {'id': manga_id}
        })
        return response.json() if response.status_code == 200 else None
    except Exception as e:
        logger.error(f"Error fetching manga {manga_id}: {e}")
        return None
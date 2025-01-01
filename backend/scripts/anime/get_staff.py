import sys
import os
import argparse
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

import requests
import time
from sqlalchemy.orm import sessionmaker
from database.db import engine
from models.v1.staff import Staff

API_URL = "https://graphql.anilist.co"
RATE_LIMIT = 30  # Ajustar a 30 solicitudes por minuto
RATE_LIMIT_REMAINING = 30
RATE_LIMIT_RESET = 0

Session = sessionmaker(bind=engine)
session = Session()

MAX_REQUESTS_PER_MINUTE = 30  # Ajusta a 30 solicitudes por minuto
DELAY_BETWEEN_REQUESTS = 60 / MAX_REQUESTS_PER_MINUTE  # Delay entre solicitudes

def fetch_staff_paginated(page=1, perPage=50):
    query = '''
    query GetStaffPaginated($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
            pageInfo {
                currentPage
                hasNextPage
                perPage
            }
            staff {
                id
                name {
                    full
                    native
                }
                languageV2
                image {
                    large
                    medium
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

def insert_staff(data):
    try:
        for staff_data in data['data']['Page']['staff']:
            existing_staff = session.query(Staff).filter_by(id=staff_data['id']).first()
            date_of_birth = None
            if staff_data['dateOfBirth']['year']:
                date_of_birth = f"{staff_data['dateOfBirth']['year']}-{staff_data['dateOfBirth']['month'] or 1}-{staff_data['dateOfBirth']['day'] or 1}"
            date_of_death = None
            if staff_data['dateOfDeath']['year']:
                date_of_death = f"{staff_data['dateOfDeath']['year']}-{staff_data['dateOfDeath']['month'] or 1}-{staff_data['dateOfDeath']['day'] or 1}"

            name_full = staff_data['name']['full']
            name_native = staff_data['name']['native']

            if existing_staff:
                existing_staff.name_full = name_full
                existing_staff.name_native = name_native
                existing_staff.languageV2 = staff_data.get('languageV2')
                existing_staff.image = staff_data.get('image', {}).get('large')
                existing_staff.description = staff_data.get('description')
                existing_staff.primaryOccupations = staff_data.get('primaryOccupations')
                existing_staff.gender = staff_data.get('gender')
                existing_staff.dateOfBirth = date_of_birth
                existing_staff.dateOfDeath = date_of_death
                existing_staff.age = staff_data.get('age')
                existing_staff.yearsActive = staff_data.get('yearsActive')
                existing_staff.homeTown = staff_data.get('homeTown')
                print(f"Actualizado staff: {name_full}")
            else:
                staff = Staff(
                    id=staff_data['id'],
                    name_full=name_full,
                    name_native=name_native,
                    languageV2=staff_data.get('languageV2'),
                    image=staff_data.get('image', {}).get('large'),
                    description=staff_data.get('description'),
                    primaryOccupations=staff_data.get('primaryOccupations'),
                    gender=staff_data.get('gender'),
                    dateOfBirth=date_of_birth,
                    dateOfDeath=date_of_death,
                    age=staff_data.get('age'),
                    yearsActive=staff_data.get('yearsActive'),
                    homeTown=staff_data.get('homeTown')
                )
                session.add(staff)
                print(f"Insertado nuevo staff: {name_full}")
            session.commit()
    except Exception as e:
        print(f"Error inserting staff data: {e}")
        session.rollback()

def main(start_page):
    page = start_page
    perPage = 50
    while True:
        data = fetch_staff_paginated(page, perPage)
        if data is None or 'data' not in data or 'Page' not in data['data'] or 'staff' not in data['data']['Page']:
            print(f"Error fetching data for page {page}. Retrying...")
            time.sleep(60)  # Esperar un minuto antes de reintentar
            continue
        if not data['data']['Page']['staff']:
            break
        insert_staff(data)
        print(f"Page {page} done.")
        if not data['data']['Page']['pageInfo']['hasNextPage']:
            break
        page += 1
        time.sleep(DELAY_BETWEEN_REQUESTS)
        
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Fetch and insert staff data from AniList API")
    parser.add_argument('--start-page', type=int, default=1, help='The page number to start fetching data from')
    args = parser.parse_args()
    main(args.start_page)
import requests

# URL de la API GraphQL
API_URL = "https://graphql.anilist.co"

# Consulta GraphQL con paginación
query = """
query GetAnimeById($id: Int, $page: Int) {
    Media(id: $id, type: ANIME) {
        id
        title {
            userPreferred
        }
        characters(page: $page, perPage: 50) {
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
                    language
                    image {
                        large
                    }
                }
            }
        }
    }
}
"""

# Función para realizar la consulta con paginación
def fetch_all_characters_and_voice_actors(anime_id):
    page = 1
    all_results = []
    
    while True:
        variables = {"id": anime_id, "page": page}
        
        # Realizar la solicitud a la API
        response = requests.post(
            API_URL,
            json={"query": query, "variables": variables}
        )
        
        # Verificar el estado de la solicitud
        if response.status_code != 200:
            raise Exception(f"Error en la solicitud: {response.status_code}")
        
        # Parsear la respuesta
        data = response.json()
        media_data = data["data"]["Media"]
        edges = media_data["characters"]["edges"]
        
        # Procesar los resultados actuales
        for edge in edges:
            character = edge["node"]
            role = edge["role"]
            japanese_voice_actors = edge["voiceActors"]
            for actor in japanese_voice_actors:
                all_results.append({
                    "character": {
                        "id": character["id"],
                        "name": character["name"]["userPreferred"],
                        "image": character["image"]["large"],
                    },
                    "role": role,
                    "voiceActor": {
                        "id": actor["id"],
                        "name": actor["name"]["userPreferred"],
                        "language": actor["language"],
                        "image": actor["image"]["large"],
                    }
                })
        
        # Verificar si hay más páginas
        page_info = media_data["characters"]["pageInfo"]
        if not page_info["hasNextPage"]:
            break
        
        # Incrementar el número de página
        page += 1
    
    return all_results

# Llamar a la función con el ID del anime
anime_id = 1735
results = fetch_all_characters_and_voice_actors(anime_id)

# Mostrar los resultados
print(f"Actores de voz en japonés, sus personajes y roles para el anime con ID {anime_id}:")
for result in results:
    character = result["character"]
    role = result["role"]
    voice_actor = result["voiceActor"]
    print(f"Personaje: {character['name']} (ID: {character['id']})")
    print(f"Rol: {role}")
    print(f"Actor de voz: {voice_actor['name']} ({voice_actor['language']})")
    print(f"Imagen del actor de voz: {voice_actor['image']}")
    print()

import requests

def get_anime_news(anime_id):
    url = f"https://api.jikan.moe/v4/anime/{anime_id}/news"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json()
    else:
        return None

def get_all_anime_news(start_id, end_id):
    all_news = []
    for anime_id in range(start_id, end_id + 1):
        news = get_anime_news(anime_id)
        if news:
            all_news.extend(news['data'])
    return all_news

def main():
    start_id = 1  # ID inicial del anime
    end_id = 100  # ID final del anime (ajusta según tus necesidades)
    all_news = get_all_anime_news(start_id, end_id)
    for news in all_news:
        print(news)

if __name__ == "__main__":
    main()
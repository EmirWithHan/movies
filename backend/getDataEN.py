import json
import imdb
import os

# IMDb'ye bağlan
ia = imdb.IMDb()

# Top 100 film listesini al
top_movies = ia.get_top250_movies()

# Dosyanın varsa sil
if os.path.exists("movies.json"):
    os.remove("movies.json")

# Filmleri JSON dosyasına kaydet
with open("movies.json", "w") as file:
    for i, movie in enumerate(top_movies[:100]):
        movie_id = movie.movieID
        movie_details = ia.get_movie(movie_id)

        title = movie_details.get('title')
        photo = movie_details.get('cover url')
        description = movie_details.get('plot outline')
        year = movie_details.get('year')
        genres = movie_details.get('genres')

        film = {
            "id": i + 1,
            "title": title,
            "photo": photo,
            "description": description,
            "year": year,
            "genres": genres
        }

        json.dump(film, file)
        file.write(",\n")

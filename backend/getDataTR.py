import json
import imdb
import os
from mtranslate import translate

# IMDb'ye bağlan
ia = imdb.IMDb()

# Hedef dil olarak Türkçe'yi belirt
target_lang = 'tr'

# Top 100 film listesini al
top_movies = ia.get_top250_movies()

# Dosyanın varsa sil
if os.path.exists("moviestr.json"):
    os.remove("moviestr.json")

# Filmleri JSON dosyasına kaydet
with open("moviestr.json", "w", encoding="utf-8") as dosya:
    for i, film in enumerate(top_movies[:100]):
        film_id = film.movieID
        film_detaylari = ia.get_movie(film_id)

        baslik = film_detaylari.get('title')
        foto = film_detaylari.get('cover url')
        aciklama = film_detaylari.get('plot outline')
        yil = film_detaylari.get('year')
        tur = film_detaylari.get('genres')

        # Açıklamayı Türkçe'ye çevir
        aciklama_turkce = translate(aciklama, target_lang)

        # Türleri Türkçe'ye çevir
        tur_turkce = [translate(t, target_lang) for t in tur]

        film = {
            "id": i + 1,
            "title": baslik,
            "photo": foto,
            "description": aciklama_turkce,
            "year": yil,
            "genres": tur_turkce
        }

        json.dump(film, dosya, ensure_ascii=False)
        dosya.write(",\n")

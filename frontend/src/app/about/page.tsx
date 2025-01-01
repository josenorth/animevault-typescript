'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Anime } from '@/types/anime/Anime'; // Importa el tipo Anime

export default function AnimePage() {
  const [animes, setAnimes] = useState<Anime[]>([]); // Usamos el tipo Anime para el estado
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchAnimes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/animes/popular-this-season');
        const data: Anime[] = await response.json(); // Tipamos los datos recibidos como Anime[]
        setAnimes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching animes:', error);
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []); // El array vacío asegura que el fetch se ejecute solo una vez al cargar la página

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mt-40'>
      <h1>Popular Animes This Season</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Go to Home Page</Link>
          </li>
        </ul>
      </nav>

      <ul>
        {animes.map((anime) => (
          <li key={anime.id}>
            <h2>{anime.title_english || anime.title_romaji}</h2>
            <p>{anime.description}</p>
            {/* Mostramos la imagen de portada */}
            <img src={anime.coverImage} alt={anime.title_english || anime.title_romaji} />
            <p>
              {/* Mostramos los nombres de los estudios */}
              {anime.studios.map((studio) => (
                <span key={studio.id}>{studio.name}</span>
              ))}
            </p>
            <p>
              {/* Mostramos los géneros */}
              {anime.genres.map((genre) => (
                <span key={genre.id}>{genre.name}</span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

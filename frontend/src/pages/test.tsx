import React from 'react';
import { useAnimeCharacters } from '@/services/anime/useAnimeCharactersById';


const PopularAnimeList: React.FC = () => {
  const id = 177709
  const { data, isLoading, isError } = useAnimeCharacters(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h2 className='text-red-400'>Popular Anime This Season</h2>
      <ul>
        {data?.map((anime) => (
          <li className='text-white' key={anime.id}>{anime.name_full}</li>
        ))}
      </ul>
    </div>
  );
};

export default PopularAnimeList;

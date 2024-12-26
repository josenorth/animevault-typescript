import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Anime {
  id: number;
  title: string;
  episode: number;
  totalEpisodes: number;
  imageUrl: string;
}

interface CurrentlyWatchingProps {
  animes: Anime[];
  loading: boolean; // Agrega el prop loading
}

const CurrentlyWatching: React.FC<CurrentlyWatchingProps> = ({ animes, loading }) => {
  return (
    <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
      <section className="bg-[#111827] p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#C084FC]">Currently Watching</h2>
        <div className="space-y-3">
          {loading ? (
            // Muestra el esqueleto si loading es true
            <>
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
            </>
          ) : (
            // Muestra los animes si loading es false
            animes.map((anime) => (
              <div key={anime.id} className="flex items-center space-x-3">
                <img
                  src={anime.imageUrl || '/path-to-placeholder.jpg'}
                  alt={`Currently watching anime ${anime.title}`}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-sm text-[#C084FC]">{anime.title}</h3>
                  <p className="text-xs text-gray-500 text-[#C084FC]">
                    Episode {anime.episode}/{anime.totalEpisodes}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </SkeletonTheme>
  );
};

export default CurrentlyWatching;

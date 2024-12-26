import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../../../css/AnimeDetails.css';
import AnimeActions from './AnimeAction';
import UserProgress from './UserProgress';

interface AnimeImageProps {
  src: string;
  alt: string;
}

const AnimeImage: React.FC<AnimeImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-auto rounded-lg shadow-lg" />
);

interface AnimeTitleProps {
  title: string;
  romaji: string;
}

const AnimeTitle: React.FC<AnimeTitleProps> = ({ title, romaji }) => (
  <div className="mb-4">
    <h1 className="text-3xl font-bold text-white">{title}</h1>
    <p className="text-lg text-gray-200">{romaji}</p>
  </div>
);

interface ExternalLinkProps {
  href: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, icon, color, children }) => (
  <a
    href={href}
    className="flex items-center space-x-3 p-3 rounded-md transition-colors duration-200"
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = color;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = '';
    }}
  >
    <span className="p-1 rounded-md" style={{ backgroundColor: color }}>
      {icon}
    </span>
    <span className="text-white font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {children}
    </span>
  </a>
);

interface ComponentLinksProps {
  externalLinks: { url: string; icon: string; site: string; color: string }[];
}

const ComponentLinks: React.FC<ComponentLinksProps> = ({ externalLinks }) => (
  <div className="bg-gray-900 rounded-lg max-w-md mx-auto">
    <h2 className="text-white text-xl font-bold mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
      External & Streaming links
    </h2>
    <div className="space-y-2">
      {externalLinks.map((link, index) => (
        <ExternalLink
          key={index}
          href={link.url}
          icon={<img src={link.icon} alt={link.site} className="w-6 h-6" />}
          color={link.color}
        >
          {link.site}
        </ExternalLink>
      ))}
    </div>
  </div>
);

interface AnimeDescriptionProps {
  description: string;
}

const AnimeDescription: React.FC<AnimeDescriptionProps> = ({ description }) => (
  <div className="text-gray-200 mb-6" dangerouslySetInnerHTML={{ __html: description }} />
);

const formatDuration = (duration: number, format: string): string => {
  if (format === 'MOVIE') {
    if (duration >= 60) {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;
      return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min${minutes > 1 ? 's' : ''}` : ''}`;
    }
    return `${duration} min${duration > 1 ? 's' : ''}`;
  }

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  let durationString = '';
  if (hours > 0) {
    durationString += `${hours} hour${hours > 1 ? 's' : ''}`;
  }
  if (minutes > 0) {
    if (durationString) durationString += ', ';
    durationString += `${minutes} min${minutes > 1 ? 's' : ''}`;
  }

  return `${durationString} per ep`;
};

interface AnimeMetadataProps {
  format: string;
  episodes: number;
  episodeDuration: number;
  startDate: string;
  endDate: string;
  season: string;
}

const AnimeMetadata: React.FC<AnimeMetadataProps> = ({ format, episodes, episodeDuration, startDate, endDate, season }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 text-sm text-white">
    <MetadataItem label="Format" value={format} />
    <MetadataItem label="Episodes" value={episodes.toString()} />
    <MetadataItem label="Duration" value={formatDuration(episodeDuration, format)} />
    <MetadataItem label="Start Date" value={startDate} />
    <MetadataItem label="End Date" value={endDate} />
    <MetadataItem label="Season" value={season} />
  </div>
);

interface MetadataItemProps {
  label: string;
  value: string;
}

const MetadataItem: React.FC<MetadataItemProps> = ({ label, value }) => (
  <div>
    <span className="font-semibold text-[#C084FC]">{label}:</span> {value}
  </div>
);

interface AnimeStatsProps {
  averageScore: number;
  popularity: number;
  favorites: number;
}

const AnimeStats: React.FC<AnimeStatsProps> = ({ averageScore, popularity, favorites }) => (
  <div className="flex justify-between mb-8 bg-gray-800 rounded-lg p-4">
    <StatItem label="Average Score" value={averageScore.toString()} />
    <StatItem label="Popularity" value={popularity.toString()} />
    <StatItem label="Favorites" value={favorites.toString()} />
  </div>
);

interface StatItemProps {
  label: string;
  value: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-indigo-600">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);


interface ProductionListProps {
  title: string;
  items: string[];
}

const ProductionList: React.FC<ProductionListProps> = ({ title, items }) => (
  <div>
    <h2 className="text-xl font-semibold mb-2 text-gray-200">{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="text-gray-400">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

interface AnimeProductionProps {
  studios: string[];
  producers: string[];
}

const AnimeProduction: React.FC<AnimeProductionProps> = ({ studios, producers }) => (
  <div className="mb-8">
    <div className="grid grid-cols-2 gap-4">
      <ProductionList title="Studios" items={studios} />
      <ProductionList title="Producers" items={producers} />
    </div>
  </div>
);

interface AnimeGenresProps {
  genres: string[];
}

const AnimeGenres: React.FC<AnimeGenresProps> = ({ genres }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-2 text-gray-200">Genres</h2>
    <div className="flex flex-wrap gap-2">
      {genres.map((genre, index) => (
        <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
          {genre}
        </span>
      ))}
    </div>
  </div>
);

interface AnimeTrailerProps {
  trailer: { site?: string; id?: string } | null;
}

const AnimeTrailer: React.FC<AnimeTrailerProps> = ({ trailer }) => {
  if (trailer?.site?.toLowerCase() === 'youtube') {
    const trailerUrl = `https://www.youtube.com/watch?v=${trailer.id}`;

    return (
      <div className="">
        <h2 className="text-xl font-semibold text-white mb-4">Watch Trailer</h2>
        <div className="video-container">
          <ReactPlayer url={trailerUrl} width="100%" height="100%" controls />
        </div>
      </div>
    );
  }

  return <p className="text-gray-400">Trailer no disponible</p>;
};

interface AnimeDetailsProps {
  animeId?: string; // Haz que sea opcional si no la necesitas explícitamente
}

interface UserProgressData {
  episodesWatched: number;
  score: number;
  status: string | null;
}
interface ExternalLink {
  color: string;
  icon: string;
  site: string;
  url: string;
}

interface Trailer {
  id: string;
  site: string;
  thumbnail: string;
}
interface Anime {
  id: number;
  title: string;
  description: string;
  averageScore: number;
  episodeDuration: number;
  episodes: number;
  format: string;
  genres: string[];
  image: string;
  popularity: number;
  producers: string[];
  romaji: string;
  season: string;
  startDate: string;
  endDate: string | null; // Puede ser null
  studios: string[];
  trailer: Trailer | null; // Agregar esta propiedad
  favorites?: number; // Si no siempre está presente
  externalLinks: ExternalLink[]; // Agregar esta propiedad
}

const AnimeDetails: React.FC<AnimeDetailsProps> = () => {
  const { id_anime } = useParams<{ id_anime: string }>();
  const animeId = parseInt(id_anime || '', 10);
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userProgress, setUserProgress] = useState<UserProgressData>({
    episodesWatched: 0,
    score: 0,
    status: null, // Aquí se define el tipo de status como string | null, compatible con UserProgressData
  });

  useEffect(() => {

    window.scrollTo(0, 0);

    const fetchAnimeData = async () => {
      try {
        const response = await fetch(`/api/v1/animes/${id_anime}`);
        if (!response.ok) throw new Error('Error al obtener datos del anime');

        const data = await response.json();
        setAnime(data);

        const formattedTitle = data.title.replace(/\s+/g, '-');
        window.history.replaceState(null, '', `/anime/${id_anime}/${formattedTitle}`);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [id_anime]);

  if (error) return <p>Error: {error}</p>;
  if (loading) {
    return (
      <SkeletonTheme baseColor="#1F2937" highlightColor="rgba(192, 132, 252, 0.2)">
        <div className="max-w-4xl mx-auto px-4 py-8 bg">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1">
              <Skeleton height={400} className="rounded-lg" />
            </div>
            <div className="md:col-span-2 space-y-4">
              <Skeleton width="80%" height={30} />
              <Skeleton count={3} />
            </div>
          </div>
          <Skeleton height={200} className="rounded-lg" />
        </div>
      </SkeletonTheme>
    );
  }

  if (anime) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 bg">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <AnimeImage src={anime.image} alt={anime.title} />
            <UserProgress
              totalEpisodes={anime.episodes}
              animeId={animeId}
              setUserProgress={setUserProgress}
            />
          </div>
          <div className="md:col-span-2">
            <AnimeTitle title={anime.title} romaji={anime.romaji} />
            <AnimeDescription description={anime.description} />
            <AnimeActions
              animeId={animeId}
              userProgress={userProgress}
            />
            <AnimeMetadata
              format={anime.format}
              episodes={anime.episodes}
              episodeDuration={anime.episodeDuration}
              startDate={anime.startDate}
              endDate={anime.endDate || 'N/A'}
              season={anime.season}
            />
            <AnimeProduction studios={anime.studios} producers={anime.producers} />
            <AnimeGenres genres={anime.genres} />
          </div>
        </div>
        <AnimeStats
          averageScore={anime.averageScore}
          popularity={anime.popularity}
          favorites={anime.favorites || 0} // Asignar un valor por defecto si favorites es opcional
        />
        <div className="flex justify-between">
          <div className="">
            <AnimeTrailer trailer={anime.trailer} />
          </div>
          <div className="">
            <ComponentLinks externalLinks={anime.externalLinks} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AnimeDetails;
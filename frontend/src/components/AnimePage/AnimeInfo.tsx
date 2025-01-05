import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Anime } from '@/types/anime/Anime'
import { Rank } from '@/types/anime/Rank'
import Image from 'next/image'

interface AnimeInfoProps {
  anime: Anime
  rank?: Rank
}

export function AnimeInfo({ anime, rank }: AnimeInfoProps) {
  const mainStudios = anime.studios.filter(studio => studio.isMain);
  const producers = anime.studios.filter(studio => !studio.isMain);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#065F46] dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start">
        <Image
          src={anime.coverImage || '/anime-cover-placeholder.png'}
          alt={anime.title_english || 'Anime Cover'}
          width={300}
          height={400}
          className="w-full md:w-48 h-72 object-cover rounded-md mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <h3 className="text-2xl font-semibold mb-2 font-poppins text-[#84CC16]">
                {anime.title_english}
              </h3>
              <p className="font-roboto mb-4 text-[#84CC16]">
                {anime.format} • {anime.episode_count} episodes • {anime.episode_duration} min
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="bg-[#84CC16] text-[#065F46] font-montserrat">
                  {anime.status}
                </Badge>
                <Badge variant="secondary" className="bg-[#84CC16] text-[#065F46] font-montserrat">
                  {anime.season} {anime.seasonYear}
                </Badge>
                <Badge variant="secondary" className="bg-[#84CC16] text-[#065F46] font-montserrat">
                  {anime.source}
                </Badge>
              </div>
              <p className="text-[#84CC16] mb-2 font-roboto">
                <span className="font-semibold font-poppins">Aired:</span> {anime.start_date} to {anime.end_date}
              </p>
              <p className="text-[#84CC16] mb-2 font-roboto">
                <span className="font-semibold font-poppins">Score:</span> {anime.average_score}%
              </p>
            </div>

            {/* Right Column */}
            <div className="md:text-right">
              {rank?.rank && (
                <p className="text-[#84CC16] mb-2 font-roboto">
                  <span className="font-semibold font-poppins">Ranked:</span> #{rank.rank}
                </p>
              )}
              {rank?.popularity_rank && (
                <p className="text-[#84CC16] mb-4 font-roboto">
                  <span className="font-semibold font-poppins">Popularity:</span> #{rank.popularity_rank}
                </p>
              )}
              {mainStudios.length > 0 && (
                <p className="text-[#84CC16] mb-2 font-roboto">
                  <span className="font-semibold font-poppins">Studios:</span>
                  <br />
                  {mainStudios.map(studio => studio.name).join(', ')}
                </p>
              )}
              {producers.length > 0 && (
                <p className="text-[#84CC16] font-roboto">
                  <span className="font-semibold font-poppins">Producers:</span>
                  <br />
                  {producers.map(studio => studio.name).join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

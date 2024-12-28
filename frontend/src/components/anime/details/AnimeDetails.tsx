import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAnimeById } from '@/services/anime/useAnimeById'
import { useAnimeDetails } from '@/services/anime/useAnimeDetailsById'
import { useAnimeCharacters } from '@/services/anime/useAnimeCharactersById'
import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayCircle, LinkIcon, Calendar, Clock, Star, Users, Film, Sun, Snowflake, Leaf, Flower2 } from 'lucide-react'
import { motion } from 'framer-motion'
import CharacterList from './CharacterList'
import "../../../css/anime.css";
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

const AnimeDetails: React.FC = () => {
  const { id_anime } = useParams<{ id_anime: string }>()
  const animeId = parseInt(id_anime!, 10)
  const { data: anime, isLoading: isAnimeLoading } = useAnimeById(animeId)
  const { data: details, isLoading: isDetailsLoading } = useAnimeDetails(animeId)
  const { data: characters, isLoading: isCharactersLoading } = useAnimeCharacters(animeId)


  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Esto se ejecutará cada vez que cambie la ruta
  }, [location.pathname]);


  if (isAnimeLoading || isDetailsLoading || isCharactersLoading) {
    return <AnimeDetailsSkeleton />
  }

  const getSeasonIcon = (season: string) => {
    switch (season.toLowerCase()) {
      case 'summer':
        return <Sun className="mr-2 text-yellow-300" />;
      case 'winter':
        return <Snowflake className="mr-2 text-cyan-300" />;
      case 'fall':
        return <Leaf className="mr-2 text-orange-400" />;
      case 'spring':
        return <Flower2 className="mr-2 text-pink-400" />;
      default:
        return null;
    }
  }
  const someValue = anime?.average_score; // Asegúrate de que 'anime' y 'someProperty' no sean null
  const formattedValue = someValue != null ? someValue.toFixed(2) : 'N/A';

  if (!anime || !details || !characters) {
    return <div className="text-center text-2xl text-red-500">Anime not found</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 bg-[#111827] text-white font-sans"
    >
      <div className="relative mb-8">
        <motion.img
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={anime.bannerImage || anime.coverImage}
          alt={anime.title_english || anime.title_romaji}
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] to-transparent"></div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute bottom-4 left-4 right-4 text-white"
        >
          <h1 className="text-4xl font-bold mb-2 font-heading">{anime.title_english || anime.title_romaji}</h1>
          <p className="text-lg font-poppins">{anime.native}</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="bg-[#1F2937]">
            <CardHeader>
              <CardTitle className="text-[#C084FC]">Synopsis</CardTitle>
            </CardHeader>
            <CardContent>
              <p
                className="text-gray-300 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: anime.description.replace(
                    /<br\s*\/?>/g,
                    '\n'
                  ),
                }}
              />
            </CardContent>
          </Card>

          <div className="mt-8">
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-2 bg-[#1F2937] mb-8">
                <TabsTrigger value="info" className="bg-[#1F2937] !text-white data-[state=active]:!bg-purple-400">Information</TabsTrigger>
                <TabsTrigger value="trailers" className="bg-[#1F2937] data-[state=active]:!bg-purple-400 !text-white">Trailers</TabsTrigger>
              </TabsList>
              <TabsContent value="info" className='mb-8'>
                <Card className="bg-[#1F2937]">
                  <CardContent className="pt-6">
                    <dl className="grid grid-cols-2 gap-4 text-white">
                      <InfoItem icon={<Calendar className="mr-2 text-purple-400" />} label="Aired" value={`${anime.start_date} to ${anime.end_date || 'Present'}`} />
                      <InfoItem icon={<Clock className="mr-2 text-purple-400" />} label="Duration" value={`${anime.episode_duration} min/ep`} />
                      <InfoItem icon={<Star className="mr-2 text-purple-400 " />} label="Score" value={formattedValue} />
                      <InfoItem icon={<Users className="mr-2 text-purple-400" />} label="Popularity" value={anime.popularity.toLocaleString()} />
                      <InfoItem icon={<Film className="mr-2 text-purple-400" />} label="Episodes" value={anime.episode_count?.toString() || 'N/A'} />
                      <InfoItem
                        icon={getSeasonIcon(anime.season)}
                        label="Season"
                        value={`${anime.season} ${anime.seasonYear}`}
                      />
                    </dl>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="trailers" className='mb-8'>
                <Card className="bg-[#1F2937]">
                  <CardContent className="pt-6">
                    {details.trailers.length > 0 ? (
                      <div className="sm:grid-cols-2 gap-4 justify-items-center">
                        {details.trailers.map((trailer) => (
                          <div key={trailer.trailer_id} className="w-full">
                            <div className="relative" style={{ paddingTop: '50%' }}> {/* Proporción 16:9 */}
                              <ReactPlayer
                                url={`https://www.youtube.com/watch?v=${trailer.trailer_id}`}
                                width="100%"
                                height="100%"
                                controls={true}
                                className="absolute top-0 left-0"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">No trailers available</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <CharacterList characters={characters} />
            </Tabs>
          </div>
        </div>

        <div>
          <Card className="bg-[#1F2937] text-white">
            <CardHeader>
              <CardTitle className="text-[#C084FC]">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                src={anime.coverImage}
                alt={anime.title_english || anime.title_romaji}
                className="w-full rounded-lg mb-4"
              />
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <motion.div
                        key={genre.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge key={genre.id} variant="secondary" className="bg-[#C084FC] text-white">{genre.name}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-2">Studios</h3>
                  <div className="space-y-2 font-sans">
                    {anime.studios
                      .sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0))
                      .map((studio) => (
                        <motion.div
                          key={studio.id}
                          className="flex items-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className={`w-2 h-2 rounded-full ${studio.isMain ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></span>
                          <span>{studio.name}</span>
                        </motion.div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-semibold mb-2">External Links</h3>
                  <div className="space-y-2">
                    {details.external_links.map((link, index) => (
                      <motion.a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#C084FC] hover:underline font-sans"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <LinkIcon className="mr-2 w-4 h-4" />
                        {link.site.name}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div>
    <dt className="flex items-center text-sm font-medium text-gray-200 dark:text-gray-400">
      {icon}
      {label}
    </dt>
    <dd className="mt-1 text-lg font-semibold">{value}</dd>
  </div>
)

const AnimeDetailsSkeleton: React.FC = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="w-full h-64 rounded-lg mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
        <div className="mt-8">
          <Skeleton className="h-10 w-full mb-4" />
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-1/2 mb-2" />
                    <Skeleton className="h-6 w-3/4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-1/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
)

export default AnimeDetails

import { motion } from 'framer-motion'
import { Anime } from '@/types/anime/Anime'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Genres } from './Genres'
import { Studios } from './Studios'
import { fadeIn, slideUp } from '../utils/animations'

export function AnimeDetails({ anime }: { anime: Anime }) {
  return (
    <motion.div
      className="container mx-auto px-4"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <Card className="overflow-hidden">
        <motion.div
          className="w-full h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${anime.bannerImage})` }}
          variants={fadeIn}
        />
        <CardHeader>
          <CardTitle className="text-3xl">{anime.title_english}</CardTitle>
          <p className="text-sm text-muted-foreground">{anime.title_romaji} / {anime.native}</p>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-4" variants={slideUp}>
            <p>{anime.description}</p>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Genres</h3>
                <Genres genres={anime.genres} />
              </div>
              <div>
                <h3 className="font-semibold">Studios</h3>
                <Studios studios={anime.studios} />
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <h3 className="font-semibold">Episodes</h3>
                <p>{anime.episode_count}</p>
              </div>
              <div>
                <h3 className="font-semibold">Duration</h3>
                <p>{anime.episode_duration} min</p>
              </div>
              <div>
                <h3 className="font-semibold">Score</h3>
                <p>{anime.average_score / 10}/10</p>
              </div>
              <div>
                <h3 className="font-semibold">Popularity</h3>
                <p>#{anime.popularity}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <h3 className="font-semibold">Start Date</h3>
                <p>{new Date(anime.start_date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">End Date</h3>
                <p>{anime.end_date ? new Date(anime.end_date).toLocaleDateString() : 'Ongoing'}</p>
              </div>
              <div>
                <h3 className="font-semibold">Season</h3>
                <p>{anime.season} {anime.seasonYear}</p>
              </div>
              <div>
                <h3 className="font-semibold">Format</h3>
                <p>{anime.format}</p>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


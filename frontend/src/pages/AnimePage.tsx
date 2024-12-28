import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Header } from './test/Header'
import { AnimeDetails } from './test/AnimeDetails'
import { Anime } from '@/types/anime/Anime'
import { fadeIn } from './utils/animations'

// Mock data for demonstration
const mockAnime: Anime = {
  id: 1,
  title_romaji: "Shingeki no Kyojin",
  title_english: "Attack on Titan",
  native: "進撃の巨人",
  description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide in fear behind enormous concentric walls. What makes these giants truly terrifying is that their taste for human flesh is not born out of hunger but what appears to be out of pleasure. To ensure their survival, the remnants of humanity began living within defensive barriers, resulting in one hundred years without a single titan encounter. However, that fragile calm is soon shattered when a colossal Titan manages to breach the supposedly impregnable outer wall, reigniting the fight for survival against the man-eating abominations.",
  coverImage: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-C6FPmWm59CyP.jpg",
  bannerImage: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
  cover_color_hex: "#e4a15d",
  studio_id: 858,
  episode_count: 25,
  episode_duration: 24,
  average_score: 84,
  popularity: 1,
  start_date: "2013-04-07",
  end_date: "2013-09-29",
  seasonYear: 2013,
  format: "TV",
  status: "FINISHED",
  source: "MANGA",
  season: "SPRING",
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Dark Fantasy" },
    { id: 3, name: "Post-apocalyptic" }
  ],
  studios: [
    { id: 858, name: "Wit Studio", isMain: true },
    { id: 10, name: "Production I.G", isMain: false }
  ]
}

export function AnimePage() {
  const { id } = useParams<{ id: string }>()
  // In a real application, you would fetch the anime data based on the id
  // For now, we'll use the mock data
  const anime = mockAnime

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <Header title={anime.title_english} />
      <AnimeDetails anime={anime} />
    </motion.div>
  )
}


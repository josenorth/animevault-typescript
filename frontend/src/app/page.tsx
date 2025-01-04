import Hero from '@/components/Home/Hero'
import Strengths from '@/components/Home/Strengths'
import Search from '@/components/Home/Search'
import PopularAnime from '@/components/Home/PopularAnime'
import PopularCharacters from '@/components/Home/PopularCharacters'
import AnimeCardHome from '@/components/Home/Card'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white font-poppins">
      <Hero />
      {/* <Strengths /> */}
      <Search />
      <PopularAnime />
      {/* <PopularCharacters /> */}
      <AnimeCardHome />
    </main>
  )
}


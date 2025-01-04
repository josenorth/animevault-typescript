import AboutHero from '@/components/AboutUs/AboutHero'
import Strengths from '@/components/AboutUs/Strengths'
import Team from '@/components/AboutUs/Team'
import Mission from '@/components/AboutUs/Mission'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#121212] text-white font-poppins">
      <AboutHero />
      <Strengths />
      <Mission />
      <Team />
    </main>
  )
}


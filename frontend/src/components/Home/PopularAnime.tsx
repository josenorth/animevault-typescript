import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'
import { Button } from "@/components/ui/button"

const popularAnime = [
  { title: "Attack on Titan", image: "/aot.jpg" },
  { title: "My Hero Academia", image: "/mha.jpg" },
  { title: "Demon Slayer", image: "/demon-slayer.jpg" },
  { title: "One Piece", image: "/one-piece.jpg" },
]

export default function PopularAnime() {
  return (
    <section className="py-16 bg-emerald-900">
      <div className="container mx-auto px-28">
        <h2 className="text-4xl font-bold mb-12 text-center font-montserrat">Popular Anime</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {popularAnime.map((anime, index) => (
            <Card key={index} className="bg-[#121212] border-lime-500 overflow-hidden">
              <Image src={anime.image} alt={anime.title} width={300} height={450} className="w-full h-64 object-cover" />
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{anime.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-lime-500 text-lime-500 hover:bg-lime-500 hover:text-emerald-900">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


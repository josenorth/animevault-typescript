import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from 'next/image'

const popularCharacters = [
  { name: "Levi Ackerman", anime: "Attack on Titan", image: "/levi.jpg" },
  { name: "Naruto Uzumaki", anime: "Naruto", image: "/naruto.jpg" },
  { name: "Mikasa Ackerman", anime: "Attack on Titan", image: "/mikasa.jpg" },
  { name: "Goku", anime: "Dragon Ball", image: "/goku.jpg" },
]

export default function PopularCharacters() {
  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-28">
        <h2 className="text-4xl font-bold mb-12 text-center font-montserrat">Popular Characters</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {popularCharacters.map((character, index) => (
              <Card key={index} className="bg-emerald-900 border-lime-500">
                <Image src={character.image} alt={character.name} width={300} height={300} className="w-full h-64 object-cover rounded-t-lg" />
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{character.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">{character.anime}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  )
}


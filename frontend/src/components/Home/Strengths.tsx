import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Users, TrendingUp } from 'lucide-react'

const strengths = [
  {
    title: "Extensive Database",
    description: "Access a vast collection of anime and manga titles, updated regularly.",
    icon: Database
  },
  {
    title: "Community-Driven",
    description: "Join discussions, rate titles, and contribute to our growing community.",
    icon: Users
  },
  {
    title: "Trending Analytics",
    description: "Stay up-to-date with the latest trends in anime and manga.",
    icon: TrendingUp
  }
]

export default function Strengths() {
  return (
    <section className="py-16 bg-emerald-900">
      <div className="container mx-auto px-28">
        <h2 className="text-4xl font-bold mb-12 text-center font-montserrat">Our Strengths</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {strengths.map((strength, index) => (
            <Card key={index} className="bg-[#121212] border-lime-500">
              <CardHeader>
                <strength.icon className="w-12 h-12 text-lime-500 mb-4" />
                <CardTitle className="text-2xl font-semibold">{strength.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{strength.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


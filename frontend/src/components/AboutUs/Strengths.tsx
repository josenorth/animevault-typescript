'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Users, TrendingUp, Star } from 'lucide-react'

const strengths = [
  {
    title: "Extensive Database",
    description: "Access a vast collection of anime and manga titles, updated regularly.",
    icon: Database,
    info: "Our database includes over 15,000 anime titles and 40,000 manga series, with new entries added daily."
  },
  {
    title: "Community-Driven",
    description: "Join discussions, rate titles, and contribute to our growing community.",
    icon: Users,
    info: "With over 1 million active users, our community contributes thousands of reviews and ratings every day."
  },
  {
    title: "Trending Analytics",
    description: "Stay up-to-date with the latest trends in anime and manga.",
    icon: TrendingUp,
    info: "Our advanced algorithms analyze user activity to predict upcoming trends and hidden gems in the anime world."
  },
  {
    title: "Personalized Recommendations",
    description: "Discover new anime and manga tailored to your tastes.",
    icon: Star,
    info: "Our AI-powered recommendation system learns from your preferences to suggest titles you're likely to enjoy."
  }
]

export default function Strengths() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-emerald-900">
      <div className="container mx-auto px-28">
        <h2 className="text-5xl font-bold mb-16 text-center font-montserrat text-white">Our Strengths</h2>
        <div className="space-y-24">
          {strengths.map((strength, index) => (
            <motion.div
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card 
                className="w-full md:w-1/2 bg-[#121212] border-lime-500 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/20"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader>
                  <strength.icon className={`w-16 h-16 ${hoveredIndex === index ? 'text-white' : 'text-lime-500'} mb-4 transition-colors duration-300`} />
                  <CardTitle className="text-3xl font-semibold text-white">{strength.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl text-gray-300">{strength.description}</p>
                </CardContent>
              </Card>
              <div className="w-full md:w-1/2 p-6">
                <motion.p 
                  className="text-lg text-gray-200 font-roboto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredIndex === index ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                >
                  {strength.info}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"

export default function Mission() {
  return (
    <section className="py-24 bg-[#121212]">
      <div className="container mx-auto px-28">
        <motion.h2 
          className="text-5xl font-bold mb-16 text-center font-montserrat text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Mission
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-emerald-900 border-lime-500">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 font-montserrat text-white">Connecting Fans</h3>
              <p className="text-lg text-gray-200 font-roboto">
                We strive to create a global community where anime and manga enthusiasts can connect, share their passion, and discover new content together.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-emerald-900 border-lime-500">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 font-montserrat text-white">Preserving Culture</h3>
              <p className="text-lg text-gray-200 font-roboto">
                Our mission is to preserve and promote the rich cultural heritage of anime and manga, ensuring its legacy for future generations.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}


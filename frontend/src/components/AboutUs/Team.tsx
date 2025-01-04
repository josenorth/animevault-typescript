'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const teamMembers = [
  { name: "José Sanchez", role: "Founder & CEO", image: "/img/team/jose.png" }
]

export default function Team() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-emerald-900">
      <div className="container mx-auto px-28">
        <motion.h2 
          className="text-5xl font-bold mb-4 text-center font-montserrat text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h2>
        <div className="flex justify-center items-center">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden rounded-lg aspect-w-3 aspect-h-4">
                <Image
                  src={member.image || "/team/placeholder.jpg"}
                  alt={member.name || "Team Member"}
                  width={300}
                  height={400}
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
              </div>
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 20 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold font-montserrat text-[#84CC16] drop-shadow-xl">{member.name}</h3>
                <p className="text-sm font-roboto">{member.role}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


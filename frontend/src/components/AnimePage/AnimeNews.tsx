'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarIcon, MessageCircleIcon, UserIcon } from 'lucide-react'
import { News } from '@/types/anime/News'

interface AnimeNewsProps {
  news: News[]
}

export function AnimeNews({ news }: AnimeNewsProps) {
  // Sort news by date in descending order
  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#151f2e] rounded-lg overflow-hidden shadow-lg"
    >
      <h2 className="text-2xl font-bold text-[#84CC16] p-6 border-b font-poppins border-gray-700">Latest News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700">
        {sortedNews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-4 hover:bg-[#1a2737] transition-colors duration-200"
          >
            <Link href={item.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
              <div className="flex flex-col h-full">
                <div className="w-full aspect-video relative rounded-lg overflow-hidden mb-3">
                  <Image
                    src={item.image_url || '/images/placeholder.jpg'}
                    alt={item.title || 'News Image'}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="flex-grow space-y-2">
                  <h3 className="text-lg font-semibold font-montserrat text-[#84CC16] group-hover:text-[#065F46] transition-colors duration-200 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 font-roboto">{item.excerpt}</p>
                </div>
                <div className="flex items-center text-xs text-gray-500 space-x-3 mt-3 font-roboto">
                  <div className="flex items-center">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <UserIcon className="w-3 h-3 mr-1" />
                    <span className="truncate">{item.author_username}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircleIcon className="w-3 h-3 mr-1" />
                    <span>{item.comments}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}


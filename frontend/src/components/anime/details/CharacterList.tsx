import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Character } from '@/types/anime/AnimeCharacter'
import Pagination from './Pagination'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link } from 'react-router-dom'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'

interface CharacterListProps {
  characters: Character[]
}

const CHARACTERS_PER_PAGE = 6

const CharacterList: React.FC<CharacterListProps> = ({ characters }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingImages, setLoadingImages] = useState<boolean[]>([])

  const indexOfLastCharacter = currentPage * CHARACTERS_PER_PAGE
  const indexOfFirstCharacter = indexOfLastCharacter - CHARACTERS_PER_PAGE
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    setLoadingImages(new Array(CHARACTERS_PER_PAGE).fill(true)) // Reset loading state
  }

  const handleImageLoad = (index: number) => {
    setLoadingImages((prev) => {
      const updated = [...prev]
      updated[index] = false
      return updated
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 font-heading text-white">Characters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <AnimatePresence mode="wait">
          {currentCharacters.map((character, index) => (
            <motion.div
              key={character.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card className="h-full bg-[#1F2937] text-white">
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    <div className="relative pb-[100%] mb-4">
                      {loadingImages[index] && (
                        <SkeletonTheme baseColor="#2d3748" highlightColor="#C084FC">
                          <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
                        </SkeletonTheme>
                      )}
                      <img
                        src={character.image}
                        alt={character.name_full}
                        className={`absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity ${loadingImages[index] ? 'opacity-0' : 'opacity-100'
                          }`}
                        onLoad={() => handleImageLoad(index)}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 font-heading">{character.name_full}</h3>
                    <p className="text-sm text-gray-300 mb-2 font-sans">{character.role}</p>
                    {character.staff.length > 0 && (
                      <div className="mt-auto">
                        <h4 className="text-sm font-semibold mb-1 font-heading">Voice Actor</h4>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={character.staff[0].image} alt={character.staff[0].name_full} />
                            <AvatarFallback>{character.staff[0].name_full.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <Link to={`/staff/${character.staff[0].id}`}>
                              <p className="text-sm font-medium font-sans text-purple hover:underline decoration-purple-400 hover:text-purple-400">{character.staff[0].name_full}</p>
                            </Link>
                            <p className="text-xs text-gray-400 font-sans">{character.staff[0].languageV2}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <Pagination
        charactersPerPage={CHARACTERS_PER_PAGE}
        totalCharacters={characters.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  )
}

export default CharacterList

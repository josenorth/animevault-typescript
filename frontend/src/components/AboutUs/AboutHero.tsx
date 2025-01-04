'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function AboutHero() {
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 1000], [1, 0])
  const [hasClicked, setHasClicked] = useState(false)

  const handleFirstClick = () => {
    if (!hasClicked && audioRef.current) {
      setHasClicked(true)
      audioRef.current.play()
      audioRef.current.volume = 0.2
      setIsMuted(false)
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
    }
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      if (!audioRef.current.muted) {
        audioRef.current.play()
        audioRef.current.volume = 0.2 // Volumen al 50%
      }
    }
    setIsMuted(!isMuted)
  }

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <motion.div style={{ opacity }} className="absolute inset-0">
        <video
          ref={videoRef}
          onClick={handleFirstClick}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="/videos/momo-dandadan.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
      
      {/* Audio Background */}
      <audio 
        ref={audioRef} 
        preload="auto"
        loop 
        muted={isMuted}
      >
        <source src="/audios/Creepy-Nuts.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      {/* Mute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-8 right-8 bg-lime-500 text-emerald-900 p-2 rounded-full hover:bg-lime-600 transition duration-300"
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </button>
    </div>
  )
}

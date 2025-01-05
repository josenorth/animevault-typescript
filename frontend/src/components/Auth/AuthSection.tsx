'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const images = [
  '/img/Dandadan-cover.png',
  '/img/wallpaperflare.com_wallpaper.jpg',
  '/img/wallpaperflare.com_wallpaper (1).jpg'
]

export default function AuthSection() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="h-[80rem] flex flex-col md:flex-row bg-[#121212]">
      {/* Left side - Welcome message, logo, and image carousel */}
     
      {/* Right side - Login/Registration form */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login" className="font-montserrat">Login</TabsTrigger>
              <TabsTrigger value="register" className="font-montserrat">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-roboto">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" className="bg-gray-800 text-white border-lime-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-roboto">Password</Label>
                  <Input id="password" type="password" placeholder="Enter your password" className="bg-gray-800 text-white border-lime-500" />
                </div>
                <Button type="submit" className="w-full bg-lime-500 text-emerald-900 hover:bg-lime-600 font-semibold py-2 px-4 rounded-md transition duration-300 font-poppins">
                  Log In
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username" className="text-white font-roboto">Username</Label>
                  <Input id="register-username" type="text" placeholder="Choose a username" className="bg-gray-800 text-white border-lime-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-white font-roboto">Email</Label>
                  <Input id="register-email" type="email" placeholder="Enter your email" className="bg-gray-800 text-white border-lime-500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white font-roboto">Password</Label>
                  <Input id="register-password" type="password" placeholder="Choose a password" className="bg-gray-800 text-white border-lime-500" />
                </div>
                <Button type="submit" className="w-full bg-lime-500 text-emerald-900 hover:bg-lime-600 font-semibold py-2 px-4 rounded-md transition duration-300 font-poppins">
                  Sign Up
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      <div className="md:w-1/2 bg-[#065F46] flex flex-col justify-center items-center p-8 text-white relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
              <Image
                src={images[currentImage]}
                alt="Background"
                width={1200}
                height={1200}
                className="z-0"
              />
            <div className="absolute inset-0 bg-emerald-900 opacity-50 z-10"></div>
          </motion.div>
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center relative z-20 flex flex-col items-center"
          >
            <Image
              src="/Logo.svg"
              alt="AnimeVerse Logo"
              width={150}
              height={150}
              className="mb-8"
            />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-montserrat">
            Welcome to <span className='text-[#84CC16]'>A</span>nime<span className='text-[#84CC16]'>V</span>ault
          </h1>
          <p className="text-xl font-roboto">
            Your gateway to the world of anime and manga
          </p>
        </motion.div>
      </div>

    </div>
  )
}


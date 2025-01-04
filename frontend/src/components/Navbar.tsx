'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const pathname = usePathname()
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const isDetailPage = () => {
    return /^\/(?:anime|manga)\/\d+\/[\w-]+$/.test(pathname || '')
  }
  const isAboutPage = () => {
    return pathname === '/about'
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10)
      setAtTop(currentScrollPos === 0)
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <nav
      className={`fixed w-full z-50 py-3 transition-all duration-300 ${visible ? 'top-0' : '-top-20'} ${
        isAboutPage() 
          ? 'bg-transparent' 
          : atTop && isDetailPage() 
            ? '!bg-opacity-50 bg-[#111827]' 
            : 'bg-[#121212]'
      }`}
      style={{ height: '80px' }}
    >
      <div className="container mx-auto px-4 md:px-28">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="" shallow={true}>
            <Logo className="w-14 h-auto mr-4 md:mr-24" />
          </Link>
          
          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-center">
            <div className="flex space-x-4 font-roboto font-semibold">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/search/anime">Anime</NavLink>
              <NavLink href="/manga">Manga</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-[#F9FAFB] hover:text-[#84CC16] transition duration-300 font-semibold">
              Login
            </Button>
            <Button className="bg-[#84CC16] font-semibold text-white transition-all duration-300 hover:bg-[#65a30d] hover:scale-105 hover:shadow-md hover:shadow-[#84CC16]/30">
              Sign up
            </Button>
          </div>

          {/* Botón Hamburguesa */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white mb-1.5 transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
        </div>

        {/* Menú Móvil */}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#121212] absolute left-0 right-0 px-4 py-5"
            >
              <div className="flex flex-col items-center space-y-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/search/anime">Anime</NavLink>
                <NavLink href="/manga">Manga</NavLink>
                <NavLink href="/about">About</NavLink>
                <Button variant="ghost" className="text-[#F9FAFB] hover:text-[#84CC16] transition duration-300 font-semibold w-full">
                  Login
                </Button>
                <Button className="bg-[#84CC16] font-semibold text-white transition-all duration-300 hover:bg-[#65a30d] w-full">
                  Sign up
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-[#F9FAFB] hover:text-[#84CC16] transition duration-300">
    {children}
  </Link>
)

export default Navbar

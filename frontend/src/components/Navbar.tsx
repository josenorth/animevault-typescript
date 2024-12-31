'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)
  const [atTop, setAtTop] = useState(true)

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
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${visible ? 'top-0' : '-top-20'} ${
          atTop ? '!bg-opacity-50 bg-[#111827]' : 'bg-[#065F46]'
        }`}
        style={{ height: '70px' }} // Altura del navbar
      >
        <div className="container mx-auto px-28">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold font-poppins text-[#84CC16]">
              AnimeVault
            </Link>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex space-x-4 font-roboto">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/search/anime">Anime</NavLink>
                <NavLink href="/manga">Manga</NavLink>
                <NavLink href="/about">About</NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-[#F9FAFB] hover:text-[#84CC16] transition duration-300">
    {children}
  </Link>
)

export default Navbar

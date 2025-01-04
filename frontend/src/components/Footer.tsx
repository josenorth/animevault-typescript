import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#065F46] text-[#84CC16] py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-8 sm:px-6 md:px-12 lg:px-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Primera columna */}
          <div className="space-y-4">
            <h3 className="text-[#F9FAFB] font-poppins font-bold text-xl md:text-2xl">AnimeVault</h3>
            <p className="font-open-sans text-sm text-[#D1D5DB]">Your ultimate source for anime and manga metadata. Discover, track, and explore your favorite series with ease.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Facebook size={18} className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Twitter size={18} className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Instagram size={18} className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Youtube size={18} className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
          </div>

          <div className="mt-8 sm:mt-0">
            <h4 className="font-poppins font-semibold text-[#F9FAFB] text-base md:text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 font-roboto text-sm md:text-base">
              <li><Link href="/" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Home</Link></li>
              <li><Link href="/anime" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Anime</Link></li>
              <li><Link href="/manga" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Manga</Link></li>
              <li><Link href="/about" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> About</Link></li>
              <li><Link href="/contact" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Contact</Link></li>
            </ul>
          </div>
          <div className="mt-8 sm:mt-0">
            <h4 className="font-poppins font-semibold text-[#F9FAFB] text-base md:text-lg mb-4">Legal</h4>
            <ul className="space-y-2 font-roboto text-sm md:text-base">
              <li><Link href="/terms" className="hover:text-[#F9FAFB] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#F9FAFB] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/copyright" className="hover:text-[#F9FAFB] transition-colors">Copyright</Link></li>
              <li><Link href="/dmca" className="hover:text-[#F9FAFB] transition-colors">DMCA</Link></li>
            </ul>
          </div>
          <div className="mt-8 lg:mt-0">
            <h4 className="font-poppins font-semibold text-[#F9FAFB] text-base md:text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 font-roboto text-sm md:text-base">
              <li className="flex items-center"><Mail size={16} className="mr-2 text-[#F9FAFB]" /> info@animevault.com</li>
              <li className="flex items-center"><Phone size={16} className="mr-2 text-[#F9FAFB]" /> +1 (123) 456-7890</li>
              <li className="flex items-center"><MapPin size={16} className="mr-2 text-[#F9FAFB]" /> 123 Anime Street, Tokyo, Japan</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[#F9FAFB]/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-open-sans text-xs md:text-sm text-[#D1D5DB] text-center md:text-left">
              © {new Date().getFullYear()} AnimeVault. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs md:text-sm">
              <Link href="/faq" className="text-[#D1D5DB] hover:text-[#F9FAFB] transition-colors">FAQ</Link>
              <Link href="/support" className="text-[#D1D5DB] hover:text-[#F9FAFB] transition-colors">Support</Link>
              <Link href="/sitemap" className="text-[#D1D5DB] hover:text-[#F9FAFB] transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

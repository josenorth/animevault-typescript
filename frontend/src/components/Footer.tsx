import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone, ExternalLink } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#065F46] text-[#84CC16] py-16">
      <div className="container mx-auto px-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-[#F9FAFB] font-poppins font-bold text-2xl">AnimeVault</h3>
            <p className="font-open-sans text-sm text-[#D1D5DB]">Your ultimate source for anime and manga metadata. Discover, track, and explore your favorite series with ease.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-[#F9FAFB] hover:text-[#84CC16] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 font-roboto">
              <li><Link href="/" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Home</Link></li>
              <li><Link href="/anime" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Anime</Link></li>
              <li><Link href="/manga" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Manga</Link></li>
              <li><Link href="/about" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> About</Link></li>
              <li><Link href="/contact" className="hover:text-[#F9FAFB] transition-colors flex items-center"><ExternalLink size={16} className="mr-2" /> Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 font-roboto">
              <li><Link href="/terms" className="hover:text-[#F9FAFB] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[#F9FAFB] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/copyright" className="hover:text-[#F9FAFB] transition-colors">Copyright</Link></li>
              <li><Link href="/dmca" className="hover:text-[#F9FAFB] transition-colors">DMCA</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-2 font-roboto">
              <li className="flex items-center"><Mail size={16} className="mr-2 text-[#F9FAFB]" /> info@animevault.com</li>
              <li className="flex items-center"><Phone size={16} className="mr-2 text-[#F9FAFB]" /> +1 (123) 456-7890</li>
              <li className="flex items-center"><MapPin size={16} className="mr-2 text-[#F9FAFB]" /> 123 Anime Street, Tokyo, Japan</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#F9FAFB]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-open-sans text-sm text-[#D1D5DB] mb-4 md:mb-0">
              © {new Date().getFullYear()} AnimeVault. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link href="/faq" className="text-sm text-[#D1D5DB] hover:text-[#F9FAFB] transition-colors">FAQ</Link>
              <Link href="/support" className="text-sm text-[#D1D5DB] hover:text-[#F9FAFB] transition-colors">Support</Link>
              <Link href="/sitemap" className="text-sm text-[#D1D5DB] hover:text-[#F9FAFB] transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

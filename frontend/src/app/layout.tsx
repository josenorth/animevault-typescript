import './globals.css'
import { Roboto, Poppins, Montserrat } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from './providers'

// agregar las fuentes de Google Fonts
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  weight: ['400', '600', '700', '800'],
  style: ['normal'],
  variable: '--font-montserrat',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})


const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata = {
  title: 'AnimeVault',
  description: 'Your ultimate source for anime and manga metadata',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${roboto.variable} ${montserrat.variable}`}>
      <body >
        <Navbar />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  )
}
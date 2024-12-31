import { AppProps } from 'next/app'
import TanstackProvider from '@/providers/TanstackProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import '../app/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TanstackProvider>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </TanstackProvider>
  )
}

export default MyApp
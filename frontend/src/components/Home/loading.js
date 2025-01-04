import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Button } from '@/components/ui/button'

export default function HeroLoading() {
  return (
    <section className="relative min-h-screen bg-[#121212] py-8 md:py-16 mt-16 lg:mt-2">
      <div className="container mx-auto px-4 md:px-28">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 md:mb-4 mt-8 md:mt-16 font-montserrat text-white">
            Discover Anime & Manga
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 font-roboto text-gray-300 px-4">
            Your ultimate guide to the world of Japanese animation and comics
          </p>
          <Button className="bg-lime-500 mb-2 text-emerald-900 font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full text-base md:text-lg hover:bg-lime-600 transition duration-300">
            Explore Now
          </Button>
        </div>

        <div className="w-full h-[400px] sm:h-[400px] md:h-[500px] relative rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex flex-col md:flex-row">
            <div className="w-full h-1/2 md:h-full md:w-2/3 relative"
            >
              <SkeletonTheme baseColor="#182432" highlightColor="#183C2A">
                <Skeleton height="100%" />
              </SkeletonTheme>
            </div>
            <div className="w-full md:w-1/3 bg-emerald-900 p-6 flex flex-col justify-center">
              <SkeletonTheme baseColor="#182432" highlightColor="#183C2A">
                <h2 className="mb-2">
                  <Skeleton width={250} height={40} />
                </h2>
                <div className="mb-4">
                  <Skeleton count={4} height={20} />
                </div>
                <div className="w-[120px]">
                  <Skeleton height={40} className="rounded-full" />
                </div>
              </SkeletonTheme>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ClientFiltersSkeleton from './ClientFiltersSkeleton';

const Loading = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className="min-h-screen bg-[#111827]">
        
      <ClientFiltersSkeleton />

        <div className="container mx-auto px-28 py-8">
          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">TRENDING NOW</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Skeleton height={250} />
                  <Skeleton height={20} style={{ marginTop: '10px' }} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">POPULAR THIS SEASON</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Skeleton height={200} />
                  <Skeleton height={20} style={{ marginTop: '10px' }} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">UPCOMING NEXT SEASON</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Skeleton height={200} />
                  <Skeleton height={20} style={{ marginTop: '10px' }} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-poppins text-xl font-bold text-[#84CC16]">ALL-TIME POPULAR</h2>
              <button className="text-sm text-[#84CC16] hover:underline font-roboto">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <Skeleton height={200} />
                  <Skeleton height={20} style={{ marginTop: '10px' }} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default Loading;
import Skeleton from 'react-loading-skeleton';

const ClientFiltersSkeleton = () => {
  return (
    <div className="z-40">
      <div className="container mx-auto px-12 pt-28">
        <div className="flex justify-center items-center gap-4">
          <div className="relative flex-grow md:flex-grow-0">
            <Skeleton height={40} width={200} />
          </div>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height={40} width={120} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientFiltersSkeleton;
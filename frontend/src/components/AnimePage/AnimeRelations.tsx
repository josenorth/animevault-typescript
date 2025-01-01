import { motion } from 'framer-motion';
import { Relation } from '@/types/anime/Relation';
import Image from 'next/image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnimeRelationsProps {
  relations?: Relation[]; // Puede ser undefined mientras se cargan los datos
  isLoading: boolean;     // Indica si los datos están cargando
}

export function AnimeRelations({ relations, isLoading }: AnimeRelationsProps) {
  return (
    <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-[#151f2e] rounded-lg shadow-md p-6 mb-8"
      >
        <h3 className="text-xl font-semibold mb-6 text-white">Relations</h3>
        <div className="flex flex-wrap -mx-2">
          {isLoading ? (
            // Renderizamos skeletons cuando los datos están cargando
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="w-1/3 px-2 mb-4">
                <Skeleton className="aspect-[3/4] rounded-md h-40" />
                <div className="mt-2">
                  <Skeleton width="60%" height={12} />
                  <Skeleton width="80%" height={16} />
                </div>
              </div>
            ))
          ) : (
            // Renderizamos las relaciones cuando los datos están disponibles
            relations?.map((relation) => (
              <div key={relation.id} className="w-1/3 px-2 mb-4">
                <div
                  className="group relative aspect-[3/4] rounded-md overflow-hidden cursor-pointer h-40"
                >
                  <Image
                    src={
                      relation.related_anime?.cover_image ||
                      relation.related_manga?.cover_image ||
                      '/default-image.jpg'
                    }
                    alt={
                      relation.related_anime?.title_english ||
                      relation.related_manga?.title_english ||
                      'Default Title'
                    }
                    width={100}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:opacity-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <span className="block text-xs text-gray-300 font-medium">
                      {relation.relation_type}
                    </span>
                    <h4 className="text-sm text-white font-medium line-clamp-2">
                      {relation.related_anime?.title_english ||
                        relation.related_manga?.title_english ||
                        'Untitled'}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </SkeletonTheme>
  );
}

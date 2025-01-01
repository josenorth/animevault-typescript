import { motion } from 'framer-motion';
import { RelatedMedia } from '@/types/manga/Relation';
import Image from 'next/image';
import Link from 'next/link';

interface MangaRelationsProps {
  relations: RelatedMedia[];
}

function formatTitleWithHyphen(title: string): string {
  return title.trim().replace(/\s+/g, '-');
}

export function MangaRelations({ relations }: MangaRelationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-[#151f2e] rounded-lg shadow-md p-6 mb-8"
    >
      <h3 className="text-xl font-semibold mb-6 text-white">Relations</h3>
      <div className="flex flex-wrap -mx-2">

        {relations && relations.map((relation) => {
          const isAnime = !!relation.related_anime;
          const related = isAnime ? relation.related_anime : relation.related_manga;
          const formattedTitle = formatTitleWithHyphen(related?.title_romaji || '');
          const url = isAnime
            ? `/anime/${related?.id}/${formattedTitle}`
            : `/manga/${related?.id}/${formattedTitle}`;

          return (
            <div key={`${relation.id}-${relation.relation_type}`} className="w-1/3 px-2 mb-4">
              <Link href={url}>
                <div className="group relative aspect-[3/4] rounded-md overflow-hidden cursor-pointer h-40">
                  <Image
                    src={related?.cover_image || '/default-image.jpg'}
                    alt={related?.title_english || 'Default Title'}
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
                      {related?.title_english || 'Untitled'}
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
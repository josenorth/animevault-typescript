'use client'

import { motion } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AnimeDescriptionProps {
  description?: string; // Puede ser undefined mientras se cargan los datos
  isLoading: boolean;   // Indica si los datos están cargando
}

export function AnimeDescription({ description, isLoading }: AnimeDescriptionProps) {
  return (
    <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="dark:bg-[#111827] rounded-lg shadow-md p-4"
      >
        <h3 className="text-[#84CC16] font-poppins font-semibold text-xl mb-4">
          Synopsis
        </h3>
        {isLoading ? (
          <Skeleton count={3} height={20} />
        ) : (
          <p
            className="text-[#d5d5d5] dark:text-[#D1D5DB] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          />
        )}
      </motion.div>
    </SkeletonTheme>
  );
}

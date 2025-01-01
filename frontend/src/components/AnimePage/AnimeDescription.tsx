'use client'

import { motion } from 'framer-motion';

interface AnimeDescriptionProps {
  description?: string; // Puede ser undefined mientras se cargan los datos
}

export function AnimeDescription({ description }: AnimeDescriptionProps) {
  return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="dark:bg-[#111827] rounded-lg shadow-md"
      >
        <h3 className="text-[#84CC16] font-poppins font-semibold text-xl mb-4">
          Synopsis
        </h3>
    
          <p
            className="text-[#d5d5d5] dark:text-[#D1D5DB] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description || '' }}
          />
   
      </motion.div>
  );
}

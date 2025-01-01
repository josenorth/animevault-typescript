import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ExternalLink as ExternalLinkType } from '@/types/shared/ExternalLink'
import Image from 'next/image'

interface AnimeExternalLinksProps {
  links: ExternalLinkType[];
}

export function AnimeExternalLinks({ links }: AnimeExternalLinksProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-transparent dark:bg-gray-800 rounded-lg shadow-md mt-8 mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-[#84CC16]">External Links</h3>
      <div className="grid grid-cols-2 gap-4">
        {links.map((link) => (
          <Button
            key={link.id}
            variant="outline"
            className={`w-full justify-start transition-colors duration-800 ease-in-out ${link.external_site.name === 'Official Site' ? '!bg-slate-600 hover:!text-[#84CC16]' : 'hover:bg-[var(--hover-color)]'}`}
            asChild
            style={{ '--hover-color': link.external_site.color } as React.CSSProperties}
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center transition-colors duration-800 ease-in-out !text-white bg-slate-600 border-none ${link.external_site.name === 'Official Site' ? 'hover:text-[var(--hover-color)]' : 'hover:bg-[var(--hover-color)]'}`}
              style={{ color: link.external_site.color }}
            >
              {link.external_site.icon && (
                <div
                  className={`mr-2 h-8 w-8 flex items-center justify-center rounded`}
                  style={{ backgroundColor: link.external_site.color }}
                >
                  <Image
                    src={link.external_site.icon}
                    alt={link.external_site.name}
                    width={16}
                    height={16}
                    className="h-4 w-4"
                  />
                </div>
              )}
              {link.external_site.name}
            </a>
          </Button>
        ))}
      </div>
    </motion.div>
  )
}
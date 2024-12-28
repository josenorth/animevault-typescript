import { motion } from 'framer-motion'
import { fadeIn } from '../utils/animations'

export function Header({ title }: { title: string }) {
  return (
    <motion.header
      className="py-6 mb-8 border-b"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-4xl font-bold text-center">{title}</h1>
    </motion.header>
  )
}


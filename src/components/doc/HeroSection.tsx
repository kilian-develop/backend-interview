import { motion } from 'framer-motion'

interface HeroSectionProps {
  tag: string
  title: React.ReactNode
  description: React.ReactNode
}

export default function HeroSection({ tag, title, description }: HeroSectionProps) {
  return (
    <div className="doc-hero">
      <motion.p
        className="doc-hero-tag"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {tag}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="doc-hero-desc"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {description}
      </motion.p>
    </div>
  )
}

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { Category } from '../data/categories'
import TopicCard from './TopicCard'

interface CategorySectionProps {
  category: Category
  isReviewed: (slug: string) => boolean
  onToggleReviewed: (slug: string) => void
}

export default function CategorySection({
  category,
  isReviewed,
  onToggleReviewed,
}: CategorySectionProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

  if (category.topics.length === 0) return null

  return (
    <motion.div
      ref={ref}
      style={{ marginBottom: '56px' }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          marginBottom: '24px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '6px',
            border: `1px solid ${category.color}4D`,
            background: `${category.color}14`,
            color: category.color,
          }}
        >
          {category.label}
        </span>
        <span style={{ fontSize: '18px', fontWeight: 700, color: category.color }}>
          {category.title}
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: 'linear-gradient(to right, var(--border), transparent)',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
          gap: '14px',
        }}
      >
        {category.topics.map((topic, i) => (
          <motion.div
            key={topic.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          >
            <TopicCard
              topic={topic}
              color={category.color}
              glow={category.glow}
              dim={category.dim}
              isReviewed={isReviewed(topic.slug)}
              onToggleReviewed={onToggleReviewed}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

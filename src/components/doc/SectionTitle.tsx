import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionTitleProps {
  children: React.ReactNode
  gradient?: [string, string]
}

export default function SectionTitle({ children, gradient }: SectionTitleProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })

  const style = gradient
    ? { '--sec-gradient': `linear-gradient(to bottom, ${gradient[0]}, ${gradient[1]})` } as React.CSSProperties
    : undefined

  return (
    <motion.div
      ref={ref}
      className="doc-sec-title"
      style={style}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

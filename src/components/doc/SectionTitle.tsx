import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface SectionTitleProps {
  children: React.ReactNode
  gradient?: [string, string]
}

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in node) {
    return extractText((node as React.ReactElement).props.children)
  }
  return ''
}

export default function SectionTitle({ children, gradient }: SectionTitleProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const id = extractText(children).trim().replace(/\s+/g, '-')

  const style = gradient
    ? { '--sec-gradient': `linear-gradient(to bottom, ${gradient[0]}, ${gradient[1]})` } as React.CSSProperties
    : undefined

  return (
    <motion.div
      ref={ref}
      id={id}
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

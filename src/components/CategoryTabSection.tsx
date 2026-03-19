import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface CategoryTabSectionProps {
  icon: string
  title: string
  color: string
  slug: string
  tabGroups: { label: string; tabs: { id: string; label: string }[] }[]
  isCategoryComplete: boolean
  onToggleCategory: () => void
  getCategoryProgress: (slug: string) => { done: number; total: number }
  isTabReviewed: (slug: string, tabId: string) => boolean
}

export default function CategoryTabSection({
  icon, title, color, slug, tabGroups,
  isCategoryComplete, onToggleCategory, getCategoryProgress, isTabReviewed,
}: CategoryTabSectionProps) {
  const navigate = useNavigate()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })
  const { done, total } = getCategoryProgress(slug)
  const pct = total > 0 ? (done / total) * 100 : 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderTop: `2px solid ${color}`,
        borderRadius: 'var(--card-radius)',
        padding: '24px',
      }}
    >
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <span style={{ fontSize: '22px' }}>{icon}</span>
        <span style={{ fontSize: '16px', fontWeight: 700, color }}>{title}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>
          {done}/{total}
        </span>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${color}33, transparent)` }} />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleCategory() }}
          style={{
            padding: '4px 12px', borderRadius: '6px', fontSize: '11px',
            fontFamily: 'var(--mono)', cursor: 'pointer', transition: 'all .2s',
            border: `1px solid ${isCategoryComplete ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
            background: isCategoryComplete ? 'rgba(34,197,94,0.12)' : 'transparent',
            color: isCategoryComplete ? 'var(--color-green)' : 'var(--muted)',
          }}
        >
          {isCategoryComplete ? '✓ 전체 완료' : '전체 완료'}
        </button>
      </div>

      {/* 진행률 바 */}
      <div style={{ height: '3px', borderRadius: '2px', background: 'var(--border)', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: '2px', background: color, transition: 'width 0.3s ease' }} />
      </div>

      {/* 탭 그룹들 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {tabGroups.map((group) => (
          <div key={group.label}>
            <span style={{ display: 'inline-block', fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '8px' }}>
              {group.label}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {group.tabs.map((tab) => {
                const reviewed = isTabReviewed(slug, tab.id)
                return (
                  <button
                    key={tab.id}
                    onClick={() => navigate(`/docs/${slug}#${tab.id}`)}
                    style={{
                      padding: '7px 14px', borderRadius: '8px', fontSize: '12px',
                      fontFamily: 'var(--mono)', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap',
                      border: `1px solid ${reviewed ? 'rgba(34,197,94,0.35)' : 'var(--border)'}`,
                      background: reviewed ? 'rgba(34,197,94,0.08)' : 'transparent',
                      color: reviewed ? 'var(--color-green)' : 'var(--dim)',
                    }}
                    onMouseEnter={(e) => {
                      if (!reviewed) {
                        e.currentTarget.style.borderColor = `${color}80`
                        e.currentTarget.style.background = `${color}14`
                        e.currentTarget.style.color = color
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!reviewed) {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--dim)'
                      }
                    }}
                  >
                    {reviewed && <span style={{ marginRight: '4px' }}>✓</span>}
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

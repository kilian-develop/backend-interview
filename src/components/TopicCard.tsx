import { useNavigate } from 'react-router-dom'
import type { Topic } from '../data/categories'

interface TopicCardProps {
  topic: Topic
  color: string
  glow: string
  dim: string
  isReviewed: boolean
  onToggleReviewed: (slug: string) => void
}

export default function TopicCard({
  topic,
  color,
  glow,
  dim,
  isReviewed,
  onToggleReviewed,
}: TopicCardProps) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/docs/${topic.slug}`)}
      style={{
        position: 'relative',
        background: 'var(--surface)',
        border: `1px solid var(--border)`,
        borderTop: `2px solid ${color}`,
        borderRadius: '14px',
        padding: '20px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        transition: 'transform .25s, box-shadow .25s, border-color .25s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = `0 0 32px ${glow}, 0 8px 24px rgba(0,0,0,.5)`
        el.style.borderColor = color
        el.style.borderTopColor = color
        const overlay = el.querySelector<HTMLDivElement>('.card-overlay')
        if (overlay) overlay.style.opacity = '1'
        const arrow = el.querySelector<HTMLDivElement>('.card-arrow')
        if (arrow) { arrow.style.color = color; arrow.style.gap = '10px' }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = ''
        el.style.boxShadow = ''
        el.style.borderColor = 'var(--border)'
        el.style.borderTopColor = color
        const overlay = el.querySelector<HTMLDivElement>('.card-overlay')
        if (overlay) overlay.style.opacity = '0'
        const arrow = el.querySelector<HTMLDivElement>('.card-arrow')
        if (arrow) { arrow.style.color = 'var(--muted)'; arrow.style.gap = '6px' }
      }}
    >
      {/* 배경 오버레이 */}
      <div
        className="card-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '14px',
          background: dim,
          opacity: 0,
          transition: 'opacity .25s',
          pointerEvents: 'none',
        }}
      />

      {/* 완료 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleReviewed(topic.slug)
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 1,
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: isReviewed ? color : 'transparent',
          border: `1px solid ${isReviewed ? color : 'var(--muted)'}`,
          cursor: 'pointer',
          transition: 'all .2s',
          fontSize: '10px',
          color: 'white',
        }}
        title={isReviewed ? '완료 취소' : '완료 표시'}
      >
        {isReviewed ? '✓' : ''}
      </button>

      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: 'var(--muted)',
        }}
      >
        {topic.tag}
      </span>
      <span style={{ fontSize: '22px', lineHeight: 1 }}>{topic.icon}</span>
      <div style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.4, paddingRight: '24px' }}>
        {topic.title}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--dim)', lineHeight: 1.7 }}>{topic.desc}</div>
      <div
        className="card-arrow"
        style={{
          marginTop: 'auto',
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          color: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'color .25s, gap .25s',
        }}
      >
        바로가기 <span>→</span>
      </div>
    </div>
  )
}

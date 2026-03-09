import { useNavigate } from 'react-router-dom'
import { ALL_TOPICS } from '../data/categories'
import { useProgress } from '../hooks/useProgress'

interface DocLayoutProps {
  slug: string
  children: React.ReactNode
}

export default function DocLayout({ slug, children }: DocLayoutProps) {
  const navigate = useNavigate()
  const { isReviewed, toggleReviewed } = useProgress()
  const reviewed = isReviewed(slug)

  const currentIndex = ALL_TOPICS.findIndex((t) => t.slug === slug)
  const prevTopic = currentIndex > 0 ? ALL_TOPICS[currentIndex - 1] : null
  const nextTopic = currentIndex < ALL_TOPICS.length - 1 ? ALL_TOPICS[currentIndex + 1] : null
  const current = ALL_TOPICS[currentIndex]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      {/* 상단 네비게이션 */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '10px 20px',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(5,7,15,0.85)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--dim)',
            fontSize: '12px',
            fontFamily: 'var(--mono)',
            cursor: 'pointer',
            transition: 'opacity .2s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.7')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          ← 목록으로
        </button>

        <span
          style={{
            flex: 1,
            fontSize: '13px',
            fontFamily: 'var(--mono)',
            color: 'var(--dim)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {current?.title ?? ''}
        </span>

        <button
          onClick={() => toggleReviewed(slug)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '8px',
            border: `1px solid ${reviewed ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
            background: reviewed ? 'rgba(34,197,94,0.12)' : 'var(--surface)',
            color: reviewed ? '#22c55e' : 'var(--dim)',
            fontSize: '12px',
            fontFamily: 'var(--mono)',
            cursor: 'pointer',
            transition: 'all .2s',
          }}
        >
          {reviewed ? '✓ 완료' : '완료 표시'}
        </button>
      </header>

      {/* 페이지 콘텐츠 */}
      <main>{children}</main>

      {/* 하단 네비게이션 */}
      <footer
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '12px 20px',
          borderTop: '1px solid var(--border)',
          background: 'rgba(5,7,15,0.85)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div style={{ flex: 1 }}>
          {prevTopic && (
            <button
              onClick={() => navigate(`/docs/${prevTopic.slug}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--dim)',
                fontSize: '12px',
                fontFamily: 'var(--mono)',
                cursor: 'pointer',
                transition: 'opacity .2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.6')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              ← {prevTopic.title}
            </button>
          )}
        </div>

        <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          {currentIndex + 1} / {ALL_TOPICS.length}
        </span>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {nextTopic && (
            <button
              onClick={() => navigate(`/docs/${nextTopic.slug}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: 'var(--dim)',
                fontSize: '12px',
                fontFamily: 'var(--mono)',
                cursor: 'pointer',
                transition: 'opacity .2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = '0.6')}
              onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
            >
              {nextTopic.title} →
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

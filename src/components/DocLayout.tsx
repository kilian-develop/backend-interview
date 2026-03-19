import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ALL_TOPICS } from '../data/categories'
import { useProgressStore } from '../stores/useProgressStore'
import { useInjectCSS } from '../hooks/useInjectCSS'

const LAYOUT_CSS = `
.doc-layout-header {
  position:sticky; top:0; z-index:50;
  display:flex; align-items:center; gap:12px;
  padding:10px 20px;
  border-bottom:none;
  background:rgba(5,7,15,0.85); backdrop-filter:blur(12px);
}
.doc-progress-bar {
  position:absolute; bottom:0; left:0; right:0;
  height:2px; background:var(--border);
}
.doc-progress-fill {
  height:100%; width:0%;
  background:linear-gradient(90deg, #3b82f6, #a855f7);
}
.doc-layout-header-back {
  flex-shrink:0; display:flex; align-items:center; gap:6px;
  padding:6px 14px; border-radius:8px;
  border:1px solid var(--border); background:var(--surface);
  color:var(--dim); font-size:12px; font-family:var(--mono);
  cursor:pointer; transition:opacity .2s; white-space:nowrap;
}
.doc-layout-header-back:hover { opacity:0.7; }
.doc-layout-header-title {
  flex:1; min-width:0;
  font-size:13px; font-family:var(--mono); color:var(--dim);
  overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}
.doc-layout-header-done {
  flex-shrink:0; display:flex; align-items:center; gap:6px;
  padding:6px 14px; border-radius:8px;
  font-size:12px; font-family:var(--mono);
  cursor:pointer; transition:all .2s; white-space:nowrap;
}
.doc-layout-footer {
  display:flex; align-items:center; justify-content:space-between;
  gap:16px; padding:12px 20px;
  border-top:1px solid var(--border);
  background:rgba(5,7,15,0.85); backdrop-filter:blur(12px);
}
.doc-layout-footer-btn {
  display:flex; align-items:center; gap:6px;
  background:none; border:none;
  color:var(--dim); font-size:12px; font-family:var(--mono);
  cursor:pointer; transition:opacity .2s;
  max-width:100%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
}
.doc-layout-footer-btn:hover { opacity:0.6; }

@media (max-width:480px) {
  .doc-layout-header { gap:8px; padding:8px 12px; }
  .doc-layout-header-back { padding:5px 8px; font-size:11px; gap:4px; }
  .doc-layout-header-title { font-size:11px; }
  .doc-layout-header-done { padding:5px 8px; font-size:11px; gap:4px; }
  .doc-layout-footer { gap:8px; padding:10px 12px; }
  .doc-layout-footer-btn { font-size:11px; }
}
`

interface DocLayoutProps {
  slug: string
  activeTab?: string
  children: React.ReactNode
}

export default function DocLayout({ slug, activeTab, children }: DocLayoutProps) {
  const navigate = useNavigate()
  const { isTabReviewed, toggleTab, getCategoryProgress } = useProgressStore()
  const reviewed = activeTab ? isTabReviewed(slug, activeTab) : false
  const { done, total } = getCategoryProgress(slug)
  const [progress, setProgress] = useState(0)
  useInjectCSS('style-doc-layout', LAYOUT_CSS)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const currentIndex = ALL_TOPICS.findIndex((t) => t.slug === slug)
  const prevTopic = currentIndex > 0 ? ALL_TOPICS[currentIndex - 1] : null
  const nextTopic = currentIndex < ALL_TOPICS.length - 1 ? ALL_TOPICS[currentIndex + 1] : null
  const current = ALL_TOPICS[currentIndex]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Helmet>
        <title>{current?.title ?? '면접 준비'} | 면접 준비 가이드</title>
        <meta name="description" content={current?.desc ?? ''} />
      </Helmet>
      {/* 상단 네비게이션 */}
      <header className="doc-layout-header">
        <button
          className="doc-layout-header-back"
          onClick={() => navigate('/')}
        >
          ← 목록으로
        </button>

        <span className="doc-layout-header-title">
          {current?.title ?? ''}
          <span style={{ marginLeft: '8px', fontSize: '11px', color: 'var(--muted)' }}>
            {done}/{total}
          </span>
        </span>

        {activeTab && (
          <button
            className="doc-layout-header-done"
            onClick={() => toggleTab(slug, activeTab)}
            style={{
              border: `1px solid ${reviewed ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
              background: reviewed ? 'rgba(34,197,94,0.12)' : 'var(--surface)',
              color: reviewed ? '#22c55e' : 'var(--dim)',
            }}
          >
            {reviewed ? '✓ 학습 완료' : '학습 완료'}
          </button>
        )}
        {/* 스크롤 프로그래스 바 */}
        <div className="doc-progress-bar">
          <div className="doc-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* 페이지 콘텐츠 */}
      <main>{children}</main>

      {/* 하단 네비게이션 */}
      <footer className="doc-layout-footer">
        <div style={{ flex: 1, minWidth: 0 }}>
          {prevTopic && (
            <button
              className="doc-layout-footer-btn"
              onClick={() => navigate(`/docs/${prevTopic.slug}`)}
            >
              ← {prevTopic.title}
            </button>
          )}
        </div>

        <span style={{ flexShrink: 0, fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          {currentIndex + 1} / {ALL_TOPICS.length}
        </span>

        <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}>
          {nextTopic && (
            <button
              className="doc-layout-footer-btn"
              onClick={() => navigate(`/docs/${nextTopic.slug}`)}
            >
              {nextTopic.title} →
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

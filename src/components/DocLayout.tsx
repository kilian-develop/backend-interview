import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ALL_TOPICS, ALL_TABS } from '../data/categories'
import { useProgressStore } from '../stores/useProgressStore'

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

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const current = ALL_TOPICS.find((t) => t.slug === slug)

  /* ── 탭 단위 이전/다음 계산 ── */
  const { prevTab, nextTab, tabIndex, tabTotal } = useMemo(() => {
    const currentIdx = ALL_TABS.findIndex(
      (t) => t.topicSlug === slug && t.tabId === activeTab,
    )
    return {
      prevTab: currentIdx > 0 ? ALL_TABS[currentIdx - 1] : null,
      nextTab: currentIdx < ALL_TABS.length - 1 ? ALL_TABS[currentIdx + 1] : null,
      tabIndex: currentIdx,
      tabTotal: ALL_TABS.length,
    }
  }, [slug, activeTab])

  const goToTab = (tab: typeof ALL_TABS[number]) => {
    if (tab.topicSlug === slug) {
      /* 같은 카테고리 → 해시만 변경 (페이지 전환 없음) */
      window.location.hash = tab.tabId
    } else {
      /* 다른 카테고리 → 라우트 이동 */
      navigate(`/docs/${tab.topicSlug}#${tab.tabId}`)
    }
    window.scrollTo({ top: 0 })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
      <Helmet>
        <title>{current?.title ?? '면접 준비'} | 면접 준비 가이드</title>
        <meta name="description" content={current?.desc ?? ''} />
      </Helmet>

      <header className="doc-layout-header">
        <button className="doc-layout-header-back" onClick={() => navigate('/')}>
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
              border: `1px solid ${reviewed ? 'var(--color-green-border-strong)' : 'var(--card-border)'}`,
              background: reviewed ? 'var(--color-green-bg-strong)' : 'var(--surface)',
              color: reviewed ? 'var(--color-green)' : 'var(--dim)',
            }}
          >
            {reviewed ? '✓ 학습 완료' : '학습 완료'}
          </button>
        )}

        <div className="doc-progress-bar">
          <div className="doc-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main>{children}</main>

      <footer className="doc-layout-footer">
        <div style={{ flex: 1, minWidth: 0 }}>
          {prevTab && (
            <button className="doc-layout-footer-btn" onClick={() => goToTab(prevTab)}>
              ← {prevTab.label}
            </button>
          )}
        </div>

        <span style={{ flexShrink: 0, fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          {tabIndex + 1} / {tabTotal}
        </span>

        <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}>
          {nextTab && (
            <button className="doc-layout-footer-btn" onClick={() => goToTab(nextTab)}>
              {nextTab.label} →
            </button>
          )}
        </div>
      </footer>
    </div>
  )
}

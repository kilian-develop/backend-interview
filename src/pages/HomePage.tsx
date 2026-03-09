import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { CATEGORIES, ALL_TOPICS } from '../data/categories'
import CategorySection from '../components/CategorySection'
import SearchBar from '../components/SearchBar'
import { useProgress } from '../hooks/useProgress'

const fuse = new Fuse(ALL_TOPICS, {
  keys: ['title', 'desc', 'tag'],
  threshold: 0.4,
})

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { isReviewed, toggleReviewed, reviewedCount } = useProgress()

  const totalTopics = ALL_TOPICS.length

  const filteredCategories = useMemo(() => {
    let cats = CATEGORIES

    if (activeCategory) {
      cats = cats.filter((c) => c.id === activeCategory)
    }

    if (!query.trim()) return cats

    const results = fuse.search(query)
    const matchedSlugs = new Set(results.map((r) => r.item.slug))

    return cats
      .map((cat) => ({
        ...cat,
        topics: cat.topics.filter((t) => matchedSlugs.has(t.slug)),
      }))
      .filter((cat) => cat.topics.length > 0)
  }, [query, activeCategory])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* 배경 그리드 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(59,130,246,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.025) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(ellipse 55% 45% at 15% 25%, rgba(59,130,246,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 75%, rgba(168,85,247,0.06) 0%, transparent 60%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '60px 22px 100px',
        }}
      >
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '5px',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '16px',
            }}
          >
            Interview Prep · 2026
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 5.5vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            백엔드 개발자
            <br />
            <span
              style={{
                background: 'linear-gradient(120deg, #06b6d4, #3b82f6, #a855f7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              면접 준비 가이드
            </span>
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--dim)',
              lineHeight: 1.9,
              maxWidth: '420px',
              margin: '0 auto',
            }}
          >
            핵심 개념을 카테고리별로 정리했습니다.
            <br />
            주제를 클릭해 상세 내용을 학습하세요.
          </p>
        </header>

        {/* 검색 */}
        <SearchBar onSearch={setQuery} />

        {/* 카테고리 필터 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              fontSize: '11px',
              fontFamily: 'var(--mono)',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all .2s',
              background: !activeCategory ? 'rgba(59,130,246,0.15)' : 'transparent',
              border: `1px solid ${!activeCategory ? 'rgba(59,130,246,0.4)' : 'var(--border)'}`,
              color: !activeCategory ? '#3b82f6' : 'var(--dim)',
            }}
          >
            ALL
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              style={{
                padding: '6px 16px',
                borderRadius: '8px',
                fontSize: '11px',
                fontFamily: 'var(--mono)',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all .2s',
                background: activeCategory === cat.id ? `${cat.color}26` : 'transparent',
                border: `1px solid ${activeCategory === cat.id ? `${cat.color}66` : 'var(--border)'}`,
                color: activeCategory === cat.id ? cat.color : 'var(--dim)',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 요약 통계 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginBottom: '56px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '26px',
                fontWeight: 700,
                color: '#3b82f6',
              }}
            >
              {totalTopics}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)' }}>
              전체 주제
            </span>
          </div>
          <div style={{ width: '1px', alignSelf: 'stretch', background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '26px',
                fontWeight: 700,
                color: '#22c55e',
              }}
            >
              {reviewedCount}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)' }}>
              완료한 주제
            </span>
          </div>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.id} style={{ display: 'contents' }}>
              <div
                style={{ width: '1px', alignSelf: 'stretch', background: 'var(--border)' }}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '26px',
                    fontWeight: 700,
                    color: cat.color,
                  }}
                >
                  {cat.topics.length}
                </span>
                <span
                  style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)' }}
                >
                  {cat.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 검색 결과 없음 */}
        {query && filteredCategories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '14px', marginBottom: '8px' }}>
              검색 결과가 없습니다.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--dim)' }}>다른 키워드로 검색해보세요.</p>
          </div>
        )}

        {/* 카테고리 섹션들 */}
        {filteredCategories.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat}
            isReviewed={isReviewed}
            onToggleReviewed={toggleReviewed}
          />
        ))}

        {/* 푸터 */}
        <footer
          style={{
            marginTop: '80px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>
            interview-prep / network · 총 {totalTopics}개 주제
          </span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            마지막 업데이트: 2026년 3월
          </span>
        </footer>
      </div>
    </div>
  )
}

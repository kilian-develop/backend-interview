import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Fuse from 'fuse.js'
import { CATEGORIES, ALL_TOPICS, ALL_TABS, type FlatTab } from '../data/categories'
import SearchBar from '../components/SearchBar'
import { useProgress } from '../hooks/useProgress'

const tabFuse = new Fuse(ALL_TABS, {
  keys: ['label', 'tabId', 'topicTitle'],
  threshold: 0.35,
})

export default function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { isReviewed, toggleReviewed, reviewedCount } = useProgress()

  const totalTopics = ALL_TOPICS.length

  const matchedTabIds = useMemo(() => {
    if (!query.trim()) return null
    const results = tabFuse.search(query)
    return new Set(results.map((r) => `${r.item.topicSlug}#${r.item.tabId}`))
  }, [query])

  const filteredCategories = useMemo(() => {
    let cats = CATEGORIES
    if (activeCategory) cats = cats.filter((c) => c.id === activeCategory)
    if (!matchedTabIds) return cats

    return cats
      .map((cat) => ({
        ...cat,
        topics: cat.topics
          .map((topic) => ({
            ...topic,
            tabGroups: topic.tabGroups
              .map((group) => ({
                ...group,
                tabs: group.tabs.filter((tab) => matchedTabIds.has(`${topic.slug}#${tab.id}`)),
              }))
              .filter((group) => group.tabs.length > 0),
          }))
          .filter((topic) => topic.tabGroups.length > 0),
      }))
      .filter((cat) => cat.topics.length > 0)
  }, [activeCategory, matchedTabIds])

  const noResults = query.trim() !== '' && filteredCategories.length === 0

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
          padding: 'clamp(32px, 8vw, 60px) clamp(14px, 4vw, 22px) 100px',
        }}
      >
        {/* Hero */}
        <header style={{ textAlign: 'center', marginBottom: '64px' }}>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
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
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
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
          </motion.p>
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
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 700, color: '#3b82f6' }}>
              {totalTopics}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)' }}>전체 주제</span>
          </div>
          <div style={{ width: '1px', alignSelf: 'stretch', background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 700, color: '#22c55e' }}>
              {reviewedCount}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)' }}>완료한 주제</span>
          </div>
        </div>

        {/* 검색 결과 없음 */}
        {noResults && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <p style={{ fontFamily: 'var(--mono)', fontSize: '14px', marginBottom: '8px' }}>
              검색 결과가 없습니다.
            </p>
            <p style={{ fontSize: '12px', color: 'var(--dim)' }}>다른 키워드로 검색해보세요.</p>
          </div>
        )}

        {/* 카테고리별 탭 목록 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '56px' }}>
          {filteredCategories.map((cat) =>
            cat.topics.map((topic) => (
              <CategoryTabSection
                key={topic.slug}
                icon={topic.icon}
                title={topic.title}
                color={cat.color}
                slug={topic.slug}
                tabGroups={topic.tabGroups}
                isReviewed={isReviewed(topic.slug)}
                onToggleReviewed={() => toggleReviewed(topic.slug)}
              />
            )),
          )}
        </div>

        {/* 푸터 */}
        <footer
          style={{
            marginTop: '80px',
            paddingTop: '32px',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px 16px',
            textAlign: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--muted)' }}>
            interview-prep · 총 {totalTopics}개 주제
          </span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            마지막 업데이트: 2026년 3월
          </span>
        </footer>
      </div>
    </div>
  )
}

function CategoryTabSection({
  icon,
  title,
  color,
  slug,
  tabGroups,
  isReviewed,
  onToggleReviewed,
}: {
  icon: string
  title: string
  color: string
  slug: string
  tabGroups: { label: string; tabs: { id: string; label: string }[] }[]
  isReviewed: boolean
  onToggleReviewed: () => void
}) {
  const navigate = useNavigate()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 })

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
        borderRadius: '14px',
        padding: '24px',
      }}
    >
      {/* 헤더 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontSize: '22px' }}>{icon}</span>
        <span style={{ fontSize: '16px', fontWeight: 700, color }}>{title}</span>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, ${color}33, transparent)` }} />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleReviewed() }}
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            fontSize: '11px',
            fontFamily: 'var(--mono)',
            cursor: 'pointer',
            transition: 'all .2s',
            border: `1px solid ${isReviewed ? 'rgba(34,197,94,0.4)' : 'var(--border)'}`,
            background: isReviewed ? 'rgba(34,197,94,0.12)' : 'transparent',
            color: isReviewed ? '#22c55e' : 'var(--muted)',
          }}
        >
          {isReviewed ? '✓ 완료' : '완료'}
        </button>
      </div>

      {/* 탭 그룹들 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {tabGroups.map((group) => (
          <div key={group.label}>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                marginBottom: '8px',
              }}
            >
              {group.label}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {group.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => navigate(`/docs/${slug}#${tab.id}`)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--dim)',
                    fontSize: '12px',
                    fontFamily: 'var(--mono)',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${color}80`
                    e.currentTarget.style.background = `${color}14`
                    e.currentTarget.style.color = color
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--dim)'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

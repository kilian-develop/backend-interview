import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Fuse from 'fuse.js'
import { CATEGORIES, ALL_TABS } from '../data/categories'
import SearchBar from '../components/SearchBar'
import CategoryTabSection from '../components/CategoryTabSection'
import { useProgressStore } from '../stores/useProgressStore'

const tabFuse = new Fuse(ALL_TABS, {
  keys: ['label', 'tabId', 'topicTitle'],
  threshold: 0.35,
})

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const { isTabReviewed, toggleCategory, isCategoryComplete, getCategoryProgress, totalReviewedTabs, totalTabs } = useProgressStore()

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
      <Helmet>
        <title>백엔드 개발자 면접 준비 가이드</title>
        <meta name="description" content="네트워크, 보안, Kafka, 데이터베이스 등 백엔드 개발자 면접 핵심 개념 정리" />
      </Helmet>
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
              {totalTabs()}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)' }}>전체 탭</span>
          </div>
          <div style={{ width: '1px', alignSelf: 'stretch', background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 'clamp(18px, 4vw, 26px)', fontWeight: 700, color: '#22c55e' }}>
              {totalReviewedTabs()}
            </span>
            <span style={{ fontSize: '11px', letterSpacing: '1px', color: 'var(--muted)' }}>학습 완료</span>
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
                isCategoryComplete={isCategoryComplete(topic.slug)}
                onToggleCategory={() => toggleCategory(topic.slug)}
                getCategoryProgress={getCategoryProgress}
                isTabReviewed={isTabReviewed}
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
            interview-prep · 총 {totalTabs()}개 탭
          </span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
            마지막 업데이트: 2026년 3월
          </span>
        </footer>
      </div>
    </div>
  )
}


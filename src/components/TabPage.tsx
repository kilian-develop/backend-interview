import { useState, useEffect, useCallback, useMemo, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DocLayout from './DocLayout'
import DocSkeleton from './DocSkeleton'
import TableOfContents from './doc/TableOfContents'
import ScrollToTopButton from './doc/ScrollToTopButton'
import { useInjectCSS } from '../hooks/useInjectCSS'
import { useProgressStore } from '../stores/useProgressStore'

interface Tab {
  id: string
  label: string
  icon: React.ReactNode
}

interface TabGroup {
  label: string
  tabs: Tab[]
}

interface TabPageProps {
  slug: string
  accentColor: string
  sections: Record<string, React.LazyExoticComponent<React.ComponentType>>
  tabGroups: TabGroup[]
  defaultTab: string
  preloadMap?: Record<string, () => Promise<unknown>>
}

const buildCSS = (color: string) => `
.tp-groups { padding:12px 20px 0; display:flex; flex-direction:column; gap:4px; }

/* ── 그룹 헤더 (접이식 라벨) ── */
.tp-group-header { display:flex; align-items:center; gap:8px; padding:6px 0; cursor:pointer; user-select:none; }
.tp-group-label { font-size:11px; font-weight:600; color:var(--text-muted); font-family:var(--mono); letter-spacing:0.5px; text-transform:uppercase; transition:color .2s; }
.tp-group-header:hover .tp-group-label { color:var(--dim); }
.tp-group-header.expanded .tp-group-label { color:${color}; }
.tp-group-badge { font-size:10px; font-family:var(--mono); color:var(--muted); background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:1px 7px; transition:all .2s; }
.tp-group-header.expanded .tp-group-badge { background:${color}15; border-color:${color}40; color:${color}; }
.tp-group-arrow { font-size:8px; color:var(--muted); transition:transform .2s; }
.tp-group-header.expanded .tp-group-arrow { transform:rotate(90deg); color:${color}; }
.tp-group-progress { flex:1; height:2px; border-radius:1px; background:var(--border); overflow:hidden; max-width:60px; }
.tp-group-progress-fill { height:100%; border-radius:1px; background:${color}; transition:width .3s ease; }

/* ── 탭 목록 (펼쳐진 상태) ── */
.tp-tabs { display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding:4px 0 8px; }
.tp-tab { flex-shrink:0; display:flex; align-items:center; gap:6px; padding:8px 14px; min-height:44px; border-radius:8px; border:1px solid var(--border); background:transparent; color:var(--dim); font-size:12px; font-family:var(--mono); cursor:pointer; transition:all .2s; white-space:nowrap; }
.tp-tab:hover, .tp-tab:focus-visible { border-color:${color}4D; background:${color}0D; }
.tp-tab.active { border-color:${color}80; background:${color}1A; color:${color}; }
.tp-tab.reviewed { border-color:var(--color-green-border); background:var(--color-green-bg); color:var(--color-green); }
.tp-tab.active.reviewed { border-color:${color}80; background:${color}1A; color:${color}; }
.tp-tab-icon { font-size:13px; }

@media (max-width:480px) {
  .tp-groups { padding:8px 10px 0; gap:3px; }
  .tp-tabs { flex-wrap:nowrap; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; gap:4px; padding-bottom:6px; }
  .tp-tabs::-webkit-scrollbar { display:none; }
  .tp-tab { padding:8px 12px; font-size:12px; gap:4px; min-height:44px; }
  .tp-tab-icon { font-size:12px; }
}
@media (min-width:481px) and (max-width:640px) {
  .tp-groups { padding:10px 14px 0; }
  .tp-tab { padding:8px 12px; font-size:12px; min-height:44px; }
  .tp-tab-icon { font-size:12px; }
}
`

const prefetched = new Set<string>()

/** 활성 탭이 속한 그룹의 label을 반환 */
function findGroupLabel(tabGroups: TabGroup[], tabId: string): string {
  for (const group of tabGroups) {
    if (group.tabs.some((t) => t.id === tabId)) return group.label
  }
  return tabGroups[0]?.label ?? ''
}

export default function TabPage({ slug, accentColor, sections, tabGroups, defaultTab, preloadMap }: TabPageProps) {
  const { isTabReviewed, getCategoryProgress } = useProgressStore()
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.slice(1)
    return hash && hash in sections ? hash : defaultTab
  })
  const [expandedGroup, setExpandedGroup] = useState(() => findGroupLabel(tabGroups, activeTab))

  useInjectCSS(`style-tab-page-${slug}`, buildCSS(accentColor))

  /* 탭이 바뀌면 해당 그룹 자동 펼침 */
  useEffect(() => {
    setExpandedGroup(findGroupLabel(tabGroups, activeTab))
  }, [activeTab, tabGroups])

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id)
    window.location.hash = id
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && hash in sections) setActiveTab(hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [sections])

  /* 그룹별 진행률 계산 */
  const groupProgress = useMemo(() => {
    const map: Record<string, { done: number; total: number }> = {}
    for (const group of tabGroups) {
      const done = group.tabs.filter((t) => isTabReviewed(slug, t.id)).length
      map[group.label] = { done, total: group.tabs.length }
    }
    return map
  }, [tabGroups, slug, isTabReviewed, getCategoryProgress])

  const ActiveSection = sections[activeTab]

  return (
    <DocLayout slug={slug} activeTab={activeTab}>
      <div className="tp-groups">
        {tabGroups.map((group) => {
          const isExpanded = expandedGroup === group.label
          const progress = groupProgress[group.label]
          const pct = progress ? (progress.done / progress.total) * 100 : 0

          return (
            <div key={group.label}>
              {/* 그룹 헤더 — 클릭으로 토글 */}
              <div
                className={`tp-group-header ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setExpandedGroup(isExpanded ? '' : group.label)}
              >
                <span className="tp-group-arrow">&#x25B6;</span>
                <span className="tp-group-label">{group.label}</span>
                <span className="tp-group-badge">
                  {progress?.done}/{progress?.total}
                </span>
                <div className="tp-group-progress">
                  <div className="tp-group-progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>

              {/* 탭 목록 — 펼쳐진 그룹만 표시 */}
              {isExpanded && (
                <div className="tp-tabs">
                  {group.tabs.map((tab) => {
                    const reviewed = isTabReviewed(slug, tab.id)
                    return (
                      <button
                        key={tab.id}
                        className={`tp-tab ${activeTab === tab.id ? 'active' : ''} ${reviewed ? 'reviewed' : ''}`}
                        onClick={() => handleTabChange(tab.id)}
                        onMouseEnter={() => {
                          if (preloadMap?.[tab.id] && !prefetched.has(tab.id)) {
                            prefetched.add(tab.id)
                            preloadMap[tab.id]()
                          }
                        }}
                      >
                        {reviewed && <span style={{ fontSize: '10px', marginRight: '2px' }}>✓</span>}
                        <span className="tp-tab-icon">{tab.icon}</span>
                        {tab.label}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Suspense fallback={<DocSkeleton />}>
            <ActiveSection />
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <TableOfContents accentColor={accentColor} activeTab={activeTab} />
      <ScrollToTopButton />
    </DocLayout>
  )
}

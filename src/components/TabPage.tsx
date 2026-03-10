import { useState, useEffect, useCallback, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DocLayout from './DocLayout'
import DocSkeleton from './DocSkeleton'
import { useInjectCSS } from '../hooks/useInjectCSS'

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
}

const buildCSS = (color: string) => `
.tp-groups { padding:12px 20px 0; display:flex; flex-direction:column; gap:8px; }
.tp-group { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.tp-group-label { flex-shrink:0; font-size:10px; font-weight:600; color:#475569; font-family:var(--mono); letter-spacing:0.5px; text-transform:uppercase; min-width:56px; }
.tp-tab { flex-shrink:0; display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:8px; border:1px solid var(--border); background:transparent; color:var(--dim); font-size:11px; font-family:var(--mono); cursor:pointer; transition:all .2s; white-space:nowrap; }
.tp-tab:hover { border-color:${color}4D; background:${color}0D; }
.tp-tab.active { border-color:${color}80; background:${color}1A; color:${color}; }
.tp-tab-icon { font-size:13px; }
@media (max-width:480px) {
  .tp-groups { padding:8px 10px 0; gap:6px; }
  .tp-group { flex-wrap:nowrap; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; gap:4px; padding-bottom:4px; }
  .tp-group::-webkit-scrollbar { display:none; }
  .tp-group-label { min-width:40px; font-size:9px; letter-spacing:0.3px; }
  .tp-tab { padding:5px 8px; font-size:10px; gap:4px; }
  .tp-tab-icon { font-size:11px; }
}
@media (min-width:481px) and (max-width:640px) {
  .tp-groups { padding:10px 14px 0; }
  .tp-tab { padding:5px 10px; font-size:10px; }
  .tp-tab-icon { font-size:12px; }
}
`

export default function TabPage({ slug, accentColor, sections, tabGroups, defaultTab }: TabPageProps) {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.slice(1)
    return hash && hash in sections ? hash : defaultTab
  })

  useInjectCSS(`style-tab-page-${slug}`, buildCSS(accentColor))

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

  const ActiveSection = sections[activeTab]

  return (
    <DocLayout slug={slug}>
      <div className="tp-groups">
        {tabGroups.map((group) => (
          <div key={group.label} className="tp-group">
            <span className="tp-group-label">{group.label}</span>
            {group.tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tp-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="tp-tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        ))}
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
    </DocLayout>
  )
}

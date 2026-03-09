import { useState, lazy, Suspense } from 'react'
import DocLayout from '../../components/DocLayout'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const TAB_CSS = `
.page-tabs { display:flex; gap:6px; padding:12px 20px 0; overflow-x:auto; -webkit-overflow-scrolling:touch; }
.page-tabs::-webkit-scrollbar { display:none; }
.page-tab { flex-shrink:0; display:flex; align-items:center; gap:6px; padding:8px 16px; border-radius:10px; border:1px solid var(--border); background:transparent; color:var(--dim); font-size:12px; font-family:var(--mono); cursor:pointer; transition:all .2s; white-space:nowrap; }
.page-tab:hover { border-color:rgba(168,85,247,0.3); background:rgba(168,85,247,0.05); }
.page-tab.active { border-color:rgba(168,85,247,0.5); background:rgba(168,85,247,0.1); color:#a855f7; }
.page-tab-icon { font-size:14px; }
`

const sections: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'jwt-deep-dive': lazy(() => import('./JwtDeepDive')),
  'session-jwt-storage': lazy(() => import('./SessionJwtStorage')),
  'cors-deep-dive': lazy(() => import('./CorsDeepDive')),
}

const tabs = [
  { id: 'jwt-deep-dive', label: 'JWT', icon: '🎫' },
  { id: 'session-jwt-storage', label: 'Session vs JWT 저장', icon: '💾' },
  { id: 'cors-deep-dive', label: 'CORS 심화', icon: '🚨' },
]

export default function SecurityPage() {
  const [activeTab, setActiveTab] = useState('jwt-deep-dive')
  useInjectCSS('style-page-tabs-security', TAB_CSS)

  const ActiveSection = sections[activeTab]

  return (
    <DocLayout slug="security">
      <div className="page-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`page-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="page-tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      <Suspense
        fallback={
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--dim)', fontFamily: 'var(--mono)', fontSize: '13px' }}>
            Loading...
          </div>
        }
      >
        <ActiveSection />
      </Suspense>
    </DocLayout>
  )
}

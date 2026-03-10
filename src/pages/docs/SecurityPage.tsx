import { lazy } from 'react'
import TabPage from '../../components/TabPage'

const sections = {
  'jwt-deep-dive': lazy(() => import('./JwtDeepDive')),
  'session-jwt-storage': lazy(() => import('./SessionJwtStorage')),
  'cors-deep-dive': lazy(() => import('./CorsDeepDive')),
}

const tabGroups = [
  {
    label: 'Security',
    tabs: [
      { id: 'jwt-deep-dive', label: 'JWT', icon: '🎫' },
      { id: 'session-jwt-storage', label: 'Session vs JWT 저장', icon: '💾' },
      { id: 'cors-deep-dive', label: 'CORS 심화', icon: '🚨' },
    ],
  },
]

export default function SecurityPage() {
  return (
    <TabPage
      slug="security"
      accentColor="#a855f7"
      sections={sections}
      tabGroups={tabGroups}
      defaultTab="jwt-deep-dive"
    />
  )
}

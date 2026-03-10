import { lazy } from 'react'
import { ClipboardList, ArrowRightLeft } from 'lucide-react'
import TabPage from '../../components/TabPage'

const sections = {
  'preprocessing': lazy(() => import('./PortfolioPreprocessing')),
  'migration': lazy(() => import('./PortfolioMigration')),
}

const tabGroups = [
  {
    label: '프로젝트',
    tabs: [
      { id: 'preprocessing', label: '문서 전처리 서비스', icon: <ClipboardList size={14} /> },
      { id: 'migration', label: '데이터 마이그레이션', icon: <ArrowRightLeft size={14} /> },
    ],
  },
]

export default function PortfolioPage() {
  return (
    <TabPage
      slug="portfolio"
      accentColor="#22c55e"
      sections={sections}
      tabGroups={tabGroups}
      defaultTab="preprocessing"
    />
  )
}

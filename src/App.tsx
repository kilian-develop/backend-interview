import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Toaster } from 'sonner'
import NProgress from 'nprogress'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import DocSkeleton from './components/DocSkeleton'

/** Suspense 내부에서 렌더링되어, lazy 컴포넌트 로드 완료 후 NProgress를 종료 */
function ProgressDone() {
  const { pathname } = useLocation()
  useEffect(() => {
    NProgress.done()
  }, [pathname])
  return null
}

const NetworkPage = lazy(() => import('./pages/docs/NetworkPage'))
const SecurityPage = lazy(() => import('./pages/docs/SecurityPage'))
const PortfolioPage = lazy(() => import('./pages/docs/PortfolioPage'))
const KafkaPage = lazy(() => import('./pages/docs/KafkaPage'))
const DatabasePage = lazy(() => import('./pages/docs/DatabasePage'))
const ElasticsearchPage = lazy(() => import('./pages/docs/ElasticsearchPage'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<DocSkeleton />}>
        <ProgressDone />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/network" element={<NetworkPage />} />
          <Route path="/docs/security" element={<SecurityPage />} />
          <Route path="/docs/portfolio" element={<PortfolioPage />} />
          <Route path="/docs/kafka" element={<KafkaPage />} />
          <Route path="/docs/database" element={<DatabasePage />} />
          <Route path="/docs/elasticsearch" element={<ElasticsearchPage />} />
        </Routes>
      </Suspense>
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#0e1118',
            border: '1px solid #1a2234',
            color: '#dde4f0',
            fontFamily: 'var(--mono)',
            fontSize: '12px',
          },
        }}
      />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

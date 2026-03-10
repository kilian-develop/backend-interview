import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'sonner'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import DocSkeleton from './components/DocSkeleton'

const NetworkPage = lazy(() => import('./pages/docs/NetworkPage'))
const SecurityPage = lazy(() => import('./pages/docs/SecurityPage'))
const PortfolioPage = lazy(() => import('./pages/docs/PortfolioPage'))
const KafkaPage = lazy(() => import('./pages/docs/KafkaPage'))

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<DocSkeleton />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs/network" element={<NetworkPage />} />
          <Route path="/docs/security" element={<SecurityPage />} />
          <Route path="/docs/portfolio" element={<PortfolioPage />} />
          <Route path="/docs/kafka" element={<KafkaPage />} />
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
    </>
  )
}

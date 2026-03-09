import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'

const NetworkPage = lazy(() => import('./pages/docs/NetworkPage'))
const SecurityPage = lazy(() => import('./pages/docs/SecurityPage'))

function LoadingFallback() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg)',
      color: 'var(--dim)',
      fontFamily: 'var(--mono)',
      fontSize: '13px',
    }}>
      Loading...
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs/network" element={<NetworkPage />} />
        <Route path="/docs/security" element={<SecurityPage />} />
      </Routes>
    </Suspense>
  )
}

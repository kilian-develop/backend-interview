import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DocSkeleton from './components/DocSkeleton'

const NetworkPage = lazy(() => import('./pages/docs/NetworkPage'))
const SecurityPage = lazy(() => import('./pages/docs/SecurityPage'))

export default function App() {
  return (
    <Suspense fallback={<DocSkeleton />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/docs/network" element={<NetworkPage />} />
        <Route path="/docs/security" element={<SecurityPage />} />
      </Routes>
    </Suspense>
  )
}

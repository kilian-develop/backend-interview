import { useInjectCSS } from '../hooks/useInjectCSS'

const SKELETON_CSS = `
@keyframes skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-bone {
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.8s ease-in-out infinite;
  border-radius: 8px;
}
`

export default function DocSkeleton() {
  useInjectCSS('style-doc-skeleton', SKELETON_CSS)

  return (
    <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', padding: '20px 0' }}>
        <div className="skeleton-bone" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
        <div className="skeleton-bone" style={{ width: '220px', height: '24px' }} />
        <div className="skeleton-bone" style={{ width: '300px', height: '14px' }} />
      </div>

      {/* Section title */}
      <div className="skeleton-bone" style={{ width: '180px', height: '20px' }} />

      {/* Text lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="skeleton-bone" style={{ width: '100%', height: '14px' }} />
        <div className="skeleton-bone" style={{ width: '92%', height: '14px' }} />
        <div className="skeleton-bone" style={{ width: '85%', height: '14px' }} />
      </div>

      {/* Card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton-bone" style={{ height: '100px' }} />
        ))}
      </div>

      {/* Another section */}
      <div className="skeleton-bone" style={{ width: '160px', height: '20px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className="skeleton-bone" style={{ width: '100%', height: '14px' }} />
        <div className="skeleton-bone" style={{ width: '78%', height: '14px' }} />
        <div className="skeleton-bone" style={{ width: '90%', height: '14px' }} />
      </div>

      {/* Table skeleton */}
      <div className="skeleton-bone" style={{ width: '100%', height: '140px' }} />
    </div>
  )
}

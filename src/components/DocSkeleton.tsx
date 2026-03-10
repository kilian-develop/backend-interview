import { useInjectCSS } from '../hooks/useInjectCSS'

const SKELETON_CSS = `
@keyframes skeleton-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.sk-bone {
  background: linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.03) 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.8s ease-in-out infinite;
  border-radius: 8px;
}
.sk-card {
  background: #0e1118;
  border: 1px solid #1a2234;
  border-radius: 14px;
  padding: 22px;
}
.sk-sec-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}
.sk-sec-bar {
  width: 4px;
  height: 18px;
  border-radius: 2px;
  background: linear-gradient(to bottom, rgba(59,130,246,0.4), rgba(168,85,247,0.4));
}
`

function Bone({ w, h, r, style }: { w?: string; h?: string; r?: string; style?: React.CSSProperties }) {
  return <div className="sk-bone" style={{ width: w, height: h, borderRadius: r, ...style }} />
}

function SectionTitleSkeleton({ width = '160px' }: { width?: string }) {
  return (
    <div className="sk-sec-title">
      <div className="sk-sec-bar" />
      <Bone w={width} h="17px" />
    </div>
  )
}

export default function DocSkeleton() {
  useInjectCSS('style-doc-skeleton', SKELETON_CSS)

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '56px 22px 80px' }}>
      {/* Hero - 태그 + 제목 + 설명 (가운데 정렬) */}
      <div style={{ textAlign: 'center', marginBottom: '56px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <Bone w="90px" h="10px" />
        <Bone w="min(320px, 70%)" h="36px" r="10px" />
        <Bone w="min(400px, 85%)" h="14px" />
      </div>

      {/* Section 1 - 카드 그리드 */}
      <div style={{ marginBottom: '48px' }}>
        <SectionTitleSkeleton width="140px" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="sk-card">
              <Bone w="48px" h="48px" r="12px" />
              <Bone w="70%" h="15px" style={{ marginTop: '14px' }} />
              <Bone w="100%" h="12px" style={{ marginTop: '10px' }} />
              <Bone w="85%" h="12px" style={{ marginTop: '6px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Section 2 - 애니메이션 박스 */}
      <div style={{ marginBottom: '48px' }}>
        <SectionTitleSkeleton width="180px" />
        <div className="sk-card" style={{ borderRadius: '16px', padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <Bone w="56px" h="56px" r="14px" />
            <Bone w="40%" h="2px" />
            <Bone w="56px" h="56px" r="14px" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Bone w="100%" h="36px" r="10px" />
            <Bone w="100%" h="36px" r="10px" />
            <Bone w="100%" h="36px" r="10px" />
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '18px' }}>
            <Bone w="80px" h="34px" r="8px" />
            <Bone w="80px" h="34px" r="8px" />
          </div>
        </div>
      </div>

      {/* Section 3 - HighlightBox + 텍스트 */}
      <div style={{ marginBottom: '48px' }}>
        <SectionTitleSkeleton width="120px" />
        <div style={{ borderRadius: '10px', padding: '16px 18px', border: '1px solid rgba(59,130,246,0.15)', background: 'rgba(59,130,246,0.03)' }}>
          <Bone w="100%" h="13px" />
          <Bone w="90%" h="13px" style={{ marginTop: '8px' }} />
          <Bone w="75%" h="13px" style={{ marginTop: '8px' }} />
        </div>
      </div>

      {/* Section 4 - 테이블 */}
      <div style={{ marginBottom: '48px' }}>
        <SectionTitleSkeleton width="150px" />
        <div className="sk-card" style={{ padding: '0', overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{ display: 'flex', gap: '16px', padding: '12px 16px', borderBottom: '1px solid #1a2234' }}>
            {[1, 2, 3, 4].map((i) => (
              <Bone key={i} w="80px" h="11px" />
            ))}
          </div>
          {/* Data rows */}
          {[1, 2, 3, 4].map((row) => (
            <div key={row} style={{ display: 'flex', gap: '16px', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              {[1, 2, 3, 4].map((col) => (
                <Bone key={col} w={col === 1 ? '60px' : '80px'} h="13px" />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Section 5 - 면접 질문 */}
      <div>
        <SectionTitleSkeleton width="130px" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2].map((i) => (
            <div key={i} className="sk-card">
              <Bone w="70%" h="14px" />
              <Bone w="100%" h="12px" style={{ marginTop: '12px' }} />
              <Bone w="95%" h="12px" style={{ marginTop: '6px' }} />
              <Bone w="80%" h="12px" style={{ marginTop: '6px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

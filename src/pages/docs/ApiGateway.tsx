import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.agw-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
@media(max-width:640px){ .agw-compare-grid{ grid-template-columns:1fr; } }
.agw-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.agw-card:hover { transform:translateY(-4px); }
.agw-card-title { font-size:16px; font-weight:900; margin-bottom:6px; display:flex; align-items:center; gap:10px; }
.agw-card-sub { font-size:12px; color:#5a6a85; margin-bottom:18px; font-family:'JetBrains Mono',monospace; }
.agw-feature-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; }
.agw-feature { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s, box-shadow .2s; }
.agw-feature:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(245,158,11,0.1); }
.agw-feature-icon { font-size:28px; margin-bottom:10px; }
.agw-feature-name { font-size:14px; font-weight:700; margin-bottom:6px; }
.agw-feature-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.agw-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.agw-anim-arena { display:flex; align-items:flex-start; justify-content:center; gap:8px; min-height:280px; position:relative; padding:16px 0; overflow-x:auto; }
.agw-anim-col { display:flex; flex-direction:column; align-items:center; gap:6px; }
.agw-anim-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:24px; border:2px solid #1a2234; }
.agw-anim-label { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; }
.agw-anim-sub { font-size:9px; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.03); }
.agw-anim-mid { display:flex; flex-direction:column; gap:8px; min-width:90px; justify-content:center; padding-top:20px; }
.agw-anim-arrow { display:flex; align-items:center; gap:6px; opacity:0; transform:translateX(-10px); transition:all .5s ease; }
.agw-anim-arrow.show { opacity:1; transform:translateX(0); }
.agw-anim-arrow.right { flex-direction:row; }
.agw-anim-arrow.left { flex-direction:row-reverse; transform:translateX(10px); }
.agw-anim-arrow.left.show { transform:translateX(0); }
.agw-anim-line { flex:1; height:2px; }
.agw-anim-tip { font-size:8px; font-weight:700; font-family:'JetBrains Mono',monospace; white-space:nowrap; padding:2px 6px; border-radius:4px; }
.agw-anim-arr-head { font-size:14px; line-height:1; }
.agw-gw-box { border:2px dashed rgba(245,158,11,0.3); border-radius:14px; padding:12px 16px; background:rgba(245,158,11,0.03); display:flex; flex-direction:column; gap:4px; margin-top:6px; }
.agw-gw-step { font-size:10px; font-family:'JetBrains Mono',monospace; padding:4px 8px; border-radius:6px; display:flex; align-items:center; gap:6px; opacity:0.3; transition:all .4s ease; }
.agw-gw-step.active { opacity:1; }
.agw-services { display:flex; flex-direction:column; gap:8px; padding-top:10px; }
.agw-svc { display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:8px; border:1px solid #1a2234; background:#0e1118; font-size:10px; font-family:'JetBrains Mono',monospace; }
.agw-pattern-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.agw-pattern { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.agw-pattern:hover { transform:translateY(-3px); }
.agw-pattern-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:12px; }
.agw-pattern-title { font-size:16px; font-weight:800; margin-bottom:8px; }
.agw-pattern-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:14px; }
.agw-pattern-diagram { font-size:11px; font-family:'JetBrains Mono',monospace; padding:12px 14px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); line-height:1.8; color:#94a3b8; }
.agw-impl-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.agw-impl { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; transition:transform .2s; }
.agw-impl:hover { transform:translateY(-3px); }
.agw-impl-name { font-size:16px; font-weight:800; margin-bottom:4px; }
.agw-impl-org { font-size:11px; color:#5a6a85; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.agw-impl-tags { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px; }
.agw-impl-tag { font-size:9px; padding:2px 7px; border-radius:5px; font-weight:600; }
.agw-impl-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.agw-cross-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.agw-cross { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; }
.agw-cross-icon { font-size:24px; margin-bottom:8px; }
.agw-cross-name { font-size:13px; font-weight:700; margin-bottom:6px; }
.agw-cross-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
`

export default function ApiGateway() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 API Gateway 요청 흐름을 확인해보세요', color: '#5a6a85' })
  useInjectCSS('style-api-gateway', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① 클라이언트가 API Gateway로 요청 전송', color: '#3b82f6' },
      { s: 2, delay: 1200, msg: '② 인증/인가 검증 (JWT 토큰 확인)', color: '#a855f7' },
      { s: 3, delay: 2000, msg: '③ Rate Limiting 체크 (요청 한도 확인)', color: '#ef4444' },
      { s: 4, delay: 2800, msg: '④ 요청 라우팅 — 적절한 백엔드 서비스로 전달', color: '#f59e0b' },
      { s: 5, delay: 3600, msg: '⑤ 서비스가 응답 → Gateway가 로깅 후 클라이언트에 반환', color: '#22c55e' },
    ]
    timeline.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: 'API Gateway가 인증, 제한, 라우팅을 모두 처리하여 백엔드 서비스를 보호합니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 4600)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 API Gateway 요청 흐름을 확인해보세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(245,158,11,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Microservices · Routing · Auth · Rate Limiting · 면접 필수"
          title={<><span style={{ color: '#f59e0b' }}>API Gateway</span> 패턴</>}
          description={<>마이크로서비스의 단일 진입점으로서 인증, 라우팅, 제한, 로깅을<br />중앙에서 처리하는 API Gateway의 역할과 패턴</>}
        />

        {/* API Gateway란? */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>API Gateway란?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#f59e0b' }}>API Gateway</strong>는 클라이언트와 백엔드 서비스 사이에 위치하는
              <strong style={{ color: '#94a3b8' }}> 단일 진입점(Single Entry Point)</strong>입니다.
              모든 API 요청을 받아 인증, 라우팅, 로깅 등 <strong style={{ color: '#f59e0b' }}>공통 관심사(Cross-Cutting Concerns)</strong>를
              중앙에서 처리한 뒤, 적절한 백엔드 서비스로 전달합니다.
            </div>
            <div style={{ fontSize: '12px', color: '#5a6a85', background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '10px', padding: '14px 18px', lineHeight: 1.7 }}>
              <strong style={{ color: '#f59e0b' }}>비유하자면:</strong> API Gateway는 건물의 <strong style={{ color: '#94a3b8' }}>로비 데스크</strong>와 같습니다. 방문자(클라이언트)가 바로 각 사무실(서비스)에 가지 않고, 로비에서 신분 확인(인증)을 받고, 안내(라우팅)를 받아 적절한 곳으로 이동하는 것입니다.
            </div>
          </div>
        </div>

        {/* 직접 통신 vs Gateway */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>직접 통신 vs API Gateway</SectionTitle>
          <div className="agw-compare-grid">
            <div className="agw-card" style={{ borderTop: '3px solid #ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.1)' }}>
              <div className="agw-card-title" style={{ color: '#ef4444' }}>직접 통신 (Without Gateway)</div>
              <div className="agw-card-sub">클라이언트가 각 서비스를 직접 호출</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '클라이언트 복잡도', val: '높음 — 각 서비스 주소를 모두 알아야 함', type: 'bad' },
                  { label: '인증 처리', val: '각 서비스에서 개별 구현', type: 'bad' },
                  { label: '서비스 변경 시', val: '클라이언트도 함께 수정 필요', type: 'bad' },
                  { label: 'CORS 관리', val: '서비스마다 개별 설정', type: 'bad' },
                  { label: '모니터링', val: '분산되어 추적 어려움', type: 'bad' },
                ].map(({ label, val, type }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', gap: '8px' }}>
                    <span style={{ color: '#5a6a85', whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontWeight: 700, color: type === 'bad' ? '#ef4444' : '#22c55e', textAlign: 'right', fontSize: '11px' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="agw-card" style={{ borderTop: '3px solid #22c55e', boxShadow: '0 0 30px rgba(34,197,94,0.1)' }}>
              <div className="agw-card-title" style={{ color: '#22c55e' }}>API Gateway (With Gateway)</div>
              <div className="agw-card-sub">Gateway를 통한 단일 진입점</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '클라이언트 복잡도', val: '낮음 — Gateway 주소만 알면 됨', type: 'good' },
                  { label: '인증 처리', val: 'Gateway에서 중앙 처리', type: 'good' },
                  { label: '서비스 변경 시', val: 'Gateway 라우팅만 수정', type: 'good' },
                  { label: 'CORS 관리', val: 'Gateway에서 일괄 설정', type: 'good' },
                  { label: '모니터링', val: '중앙 집중식 로깅/추적', type: 'good' },
                ].map(({ label, val, type }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', gap: '8px' }}>
                    <span style={{ color: '#5a6a85', whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontWeight: 700, color: type === 'bad' ? '#ef4444' : '#22c55e', textAlign: 'right', fontSize: '11px' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 기능 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>API Gateway 핵심 기능</SectionTitle>
          <div className="agw-feature-grid">
            {[
              { icon: '🔀', name: '요청 라우팅', desc: 'URL 경로, 헤더, 메서드 등을 기반으로 적절한 백엔드 서비스로 요청을 전달합니다.', color: '#f59e0b' },
              { icon: '🔐', name: '인증 / 인가', desc: 'JWT 검증, OAuth2, API Key 확인 등 인증을 중앙에서 처리하여 각 서비스의 부담을 줄입니다.', color: '#a855f7' },
              { icon: '🚦', name: 'Rate Limiting', desc: '클라이언트별 요청 한도를 제한하여 서비스 과부하와 API 남용을 방지합니다.', color: '#ef4444' },
              { icon: '⚖️', name: '로드 밸런싱', desc: '같은 서비스의 여러 인스턴스에 요청을 분배하여 부하를 균등하게 처리합니다.', color: '#3b82f6' },
              { icon: '📝', name: '로깅 / 모니터링', desc: '모든 API 요청·응답을 중앙에서 기록하고, 지연 시간·에러율 등 메트릭을 수집합니다.', color: '#22c55e' },
              { icon: '🔄', name: '요청/응답 변환', desc: '프로토콜 변환(REST↔gRPC), 헤더 추가/제거, 응답 형식 변환 등을 수행합니다.', color: '#06b6d4' },
              { icon: '💾', name: '응답 캐싱', desc: '자주 요청되는 응답을 캐싱하여 백엔드 서비스 호출을 줄이고 응답 속도를 높입니다.', color: '#f97316' },
              { icon: '🛡️', name: 'Circuit Breaker', desc: '장애가 발생한 서비스에 대한 요청을 차단하여 장애가 전파되지 않도록 보호합니다.', color: '#8b5cf6' },
            ].map((f) => (
              <div key={f.name} className="agw-feature" style={{ borderTop: `2px solid ${f.color}` }}>
                <div className="agw-feature-icon">{f.icon}</div>
                <div className="agw-feature-name" style={{ color: f.color }}>{f.name}</div>
                <div className="agw-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 요청 흐름 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>API Gateway 요청 흐름</SectionTitle>
          <div className="agw-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              클라이언트의 요청이 API Gateway를 거쳐 백엔드 서비스에 도달하는 과정입니다.
            </div>
            <div className="agw-anim-arena">
              {/* Client */}
              <div className="agw-anim-col">
                <div className="agw-anim-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>📱</div>
                <div className="agw-anim-label">Client</div>
                <div className="agw-anim-sub">Mobile / Web</div>
              </div>

              {/* Client → Gateway */}
              <div className="agw-anim-mid">
                <div className={`agw-anim-arrow right ${step >= 1 ? 'show' : ''}`}>
                  <div className="agw-anim-tip" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>HTTPS</div>
                  <div className="agw-anim-line" style={{ background: 'linear-gradient(90deg,#3b82f6,rgba(59,130,246,0.3))' }} />
                  <div className="agw-anim-arr-head" style={{ color: '#3b82f6' }}>{'→'}</div>
                </div>
                <div className={`agw-anim-arrow left ${step >= 5 ? 'show' : ''}`}>
                  <div className="agw-anim-tip" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>Response</div>
                  <div className="agw-anim-line" style={{ background: 'linear-gradient(90deg,rgba(34,197,94,0.3),#22c55e)' }} />
                  <div className="agw-anim-arr-head" style={{ color: '#22c55e' }}>{'←'}</div>
                </div>
              </div>

              {/* API Gateway */}
              <div className="agw-anim-col">
                <div className="agw-anim-icon" style={{ background: step >= 2 ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)', borderColor: '#f59e0b', transition: 'all .3s' }}>🚪</div>
                <div className="agw-anim-label" style={{ color: '#f59e0b' }}>API Gateway</div>
                <div className="agw-gw-box">
                  <div className={`agw-gw-step ${step >= 2 ? 'active' : ''}`} style={{ background: 'rgba(168,85,247,0.08)', color: '#a855f7' }}>🔐 인증 검증</div>
                  <div className={`agw-gw-step ${step >= 3 ? 'active' : ''}`} style={{ background: 'rgba(239,68,68,0.08)', color: '#ef4444' }}>🚦 Rate Limit</div>
                  <div className={`agw-gw-step ${step >= 4 ? 'active' : ''}`} style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>🔀 라우팅</div>
                  <div className={`agw-gw-step ${step >= 5 ? 'active' : ''}`} style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e' }}>📝 로깅</div>
                </div>
              </div>

              {/* Gateway → Services */}
              <div className="agw-anim-mid">
                <div className={`agw-anim-arrow right ${step >= 4 ? 'show' : ''}`}>
                  <div className="agw-anim-tip" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>Route</div>
                  <div className="agw-anim-line" style={{ background: 'linear-gradient(90deg,#f59e0b,rgba(245,158,11,0.3))' }} />
                  <div className="agw-anim-arr-head" style={{ color: '#f59e0b' }}>{'→'}</div>
                </div>
                <div className={`agw-anim-arrow left ${step >= 5 ? 'show' : ''}`}>
                  <div className="agw-anim-tip" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>Data</div>
                  <div className="agw-anim-line" style={{ background: 'linear-gradient(90deg,rgba(34,197,94,0.3),#22c55e)' }} />
                  <div className="agw-anim-arr-head" style={{ color: '#22c55e' }}>{'←'}</div>
                </div>
              </div>

              {/* Backend Services */}
              <div className="agw-anim-col">
                <div className="agw-services">
                  <div className="agw-svc" style={{ borderColor: step >= 4 ? '#f59e0b' : '#1a2234', transition: 'all .3s' }}>
                    <span style={{ fontSize: '16px' }}>👤</span>
                    <span style={{ color: '#94a3b8' }}>User Service</span>
                  </div>
                  <div className="agw-svc">
                    <span style={{ fontSize: '16px' }}>📦</span>
                    <span style={{ color: '#94a3b8' }}>Order Service</span>
                  </div>
                  <div className="agw-svc">
                    <span style={{ fontSize: '16px' }}>💳</span>
                    <span style={{ color: '#94a3b8' }}>Payment Service</span>
                  </div>
                </div>
              </div>
            </div>

            <AnimationControls color="#f59e0b" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '클라이언트가 API Gateway로 HTTPS 요청 전송', color: '#3b82f6' },
                  { num: '②', text: 'Gateway에서 JWT 토큰 등 인증/인가 검증', color: '#a855f7' },
                  { num: '③', text: 'Rate Limiting 체크 — 요청 한도 초과 시 429 반환', color: '#ef4444' },
                  { num: '④', text: 'URL 경로 기반으로 적절한 백엔드 서비스로 라우팅', color: '#f59e0b' },
                  { num: '⑤', text: '서비스 응답을 받아 로깅 후 클라이언트에 반환', color: '#22c55e' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', lineHeight: 1.6 }}>
                    <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.num}</span>
                    <span style={{ color: '#94a3b8' }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 공통 관심사 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>Cross-Cutting Concerns (공통 관심사)</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            API Gateway가 중앙에서 처리하면 각 마이크로서비스에서 <strong style={{ color: '#94a3b8' }}>중복 구현을 제거</strong>할 수 있는 공통 기능들입니다.
          </div>
          <div className="agw-cross-grid">
            {[
              { icon: '🔐', name: 'Authentication', desc: 'JWT, OAuth2, API Key 등 인증을 한 곳에서 처리합니다. 서비스는 이미 인증된 요청만 받습니다.', color: '#a855f7' },
              { icon: '🛡️', name: 'SSL Termination', desc: 'HTTPS 암/복호화를 Gateway에서 처리합니다. 내부 서비스 간에는 HTTP로 통신하여 성능을 높입니다.', color: '#3b82f6' },
              { icon: '📊', name: 'Request Logging', desc: '모든 요청의 경로, 응답 시간, 상태 코드를 기록합니다. 장애 분석과 사용량 추적에 활용합니다.', color: '#22c55e' },
              { icon: '🌐', name: 'CORS 처리', desc: '브라우저의 Cross-Origin 요청에 대한 헤더를 Gateway에서 일괄 관리합니다.', color: '#06b6d4' },
              { icon: '📦', name: '응답 압축', desc: 'gzip/Brotli 압축을 Gateway에서 처리하여 네트워크 대역폭을 절약합니다.', color: '#f97316' },
              { icon: '🔍', name: '분산 추적 (Tracing)', desc: '요청에 Trace ID를 부여하여 여러 서비스를 거치는 전체 흐름을 추적할 수 있게 합니다.', color: '#8b5cf6' },
            ].map((c) => (
              <div key={c.name} className="agw-cross" style={{ borderTop: `2px solid ${c.color}` }}>
                <div className="agw-cross-icon">{c.icon}</div>
                <div className="agw-cross-name" style={{ color: c.color }}>{c.name}</div>
                <div className="agw-cross-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* API Gateway 패턴들 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>API Gateway 패턴</SectionTitle>
          <div className="agw-pattern-grid">
            {[
              {
                badge: 'BFF', badgeColor: '#3b82f6', badgeBg: 'rgba(59,130,246,0.12)',
                title: 'Backend for Frontend (BFF)', color: '#3b82f6',
                desc: '클라이언트 유형(Web, Mobile, IoT)별로 전용 Gateway를 두는 패턴입니다. 각 클라이언트에 최적화된 API를 제공할 수 있습니다.',
                diagram: 'Web Client  → Web BFF Gateway  → Services\nMobile App  → Mobile BFF Gateway → Services\nIoT Device  → IoT BFF Gateway   → Services',
              },
              {
                badge: 'Gateway Aggregation', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.12)',
                title: 'Gateway Aggregation', color: '#22c55e',
                desc: 'Gateway가 여러 서비스의 응답을 모아서 하나의 응답으로 합쳐 반환합니다. 클라이언트의 다중 요청을 줄여 네트워크 효율을 높입니다.',
                diagram: 'Client → Gateway → User Service    ┐\n                 → Order Service   ├→ 합산 응답\n                 → Payment Service ┘',
              },
              {
                badge: 'Gateway Offloading', badgeColor: '#a855f7', badgeBg: 'rgba(168,85,247,0.12)',
                title: 'Gateway Offloading', color: '#a855f7',
                desc: '인증, SSL, 캐싱, 압축 등 공통 기능을 Gateway로 이전하여 각 서비스의 부담을 줄입니다. 서비스는 비즈니스 로직에만 집중합니다.',
                diagram: 'Before: 각 서비스에서 SSL + 인증 + 로깅\nAfter:  Gateway에서 SSL + 인증 + 로깅\n        서비스는 비즈니스 로직에만 집중',
              },
            ].map((p) => (
              <div key={p.badge} className="agw-pattern" style={{ borderTop: `2px solid ${p.color}` }}>
                <div className="agw-pattern-badge" style={{ color: p.badgeColor, background: p.badgeBg }}>{p.badge}</div>
                <div className="agw-pattern-title" style={{ color: p.color }}>{p.title}</div>
                <div className="agw-pattern-desc">{p.desc}</div>
                <div className="agw-pattern-diagram">
                  {p.diagram.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>
          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>면접 포인트:</strong> BFF 패턴은 Netflix, SoundCloud 등이 도입하여 유명해졌습니다. 모바일은 데이터 절약이 중요하고 웹은 풍부한 데이터가 필요한 등, 클라이언트마다 요구사항이 다를 때 효과적입니다. 다만 Gateway 수가 늘어나 관리 복잡도가 증가하는 트레이드오프가 있습니다.
          </HighlightBox>
        </div>

        {/* 주요 구현체 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>주요 API Gateway 구현체</SectionTitle>
          <div className="agw-impl-grid">
            {[
              {
                name: 'Kong', org: 'Kong Inc.', color: '#22c55e',
                tags: [{ label: 'Open Source', color: '#22c55e' }, { label: 'Nginx 기반', color: '#3b82f6' }, { label: 'Plugin 생태계', color: '#a855f7' }],
                desc: 'Nginx/OpenResty 기반의 오픈소스 Gateway. 풍부한 플러그인으로 인증, Rate Limiting, 로깅 등을 선언적으로 설정합니다.',
              },
              {
                name: 'AWS API Gateway', org: 'Amazon Web Services', color: '#f59e0b',
                tags: [{ label: 'Managed', color: '#f59e0b' }, { label: 'Serverless', color: '#3b82f6' }, { label: 'REST/HTTP/WS', color: '#a855f7' }],
                desc: 'AWS 관리형 서비스. Lambda와 통합하여 서버리스 API를 구축합니다. REST, HTTP, WebSocket API를 지원합니다.',
              },
              {
                name: 'Spring Cloud Gateway', org: 'VMware / Pivotal', color: '#22c55e',
                tags: [{ label: 'Java/Spring', color: '#22c55e' }, { label: 'Reactive', color: '#06b6d4' }, { label: 'Filter 체인', color: '#a855f7' }],
                desc: 'Spring 생태계의 API Gateway. WebFlux 기반 비동기 처리와 Predicate/Filter를 활용한 유연한 라우팅을 제공합니다.',
              },
              {
                name: 'Nginx', org: 'F5 Networks', color: '#06b6d4',
                tags: [{ label: 'High Performance', color: '#06b6d4' }, { label: 'Reverse Proxy', color: '#3b82f6' }, { label: '범용', color: '#f97316' }],
                desc: '고성능 웹 서버이자 리버스 프록시. 설정 기반으로 라우팅과 로드밸런싱을 처리하며, Plus 버전에서 API Gateway 기능을 강화합니다.',
              },
            ].map((impl) => (
              <div key={impl.name} className="agw-impl" style={{ borderTop: `2px solid ${impl.color}` }}>
                <div className="agw-impl-name" style={{ color: impl.color }}>{impl.name}</div>
                <div className="agw-impl-org">{impl.org}</div>
                <div className="agw-impl-tags">
                  {impl.tags.map((t) => (
                    <span key={t.label} className="agw-impl-tag" style={{ background: `${t.color}12`, border: `1px solid ${t.color}30`, color: t.color }}>{t.label}</span>
                  ))}
                </div>
                <div className="agw-impl-desc">{impl.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Gateway의 한계 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>API Gateway의 한계와 주의점</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px' }}>
            {[
              { icon: '⚠️', title: 'Single Point of Failure', desc: 'Gateway가 다운되면 모든 서비스에 접근 불가. 이중화(HA)와 장애 복구 전략이 필수입니다.', color: '#ef4444' },
              { icon: '⏱️', title: '추가 지연 (Latency)', desc: '모든 요청이 Gateway를 거치므로 네트워크 홉이 하나 추가됩니다. 캐싱과 최적화로 최소화해야 합니다.', color: '#f59e0b' },
              { icon: '🔧', title: '관리 복잡도', desc: '라우팅 규칙, 인증 정책, Rate Limit 등 Gateway 설정이 복잡해질 수 있습니다. IaC로 관리하는 것이 좋습니다.', color: '#3b82f6' },
              { icon: '🍝', title: 'God Gateway 안티패턴', desc: '비즈니스 로직을 Gateway에 넣으면 안됩니다. Gateway는 라우팅과 공통 관심사만 처리해야 합니다.', color: '#a855f7' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#0e1118', border: '1px solid #1a2234', borderLeft: `3px solid ${item.color}`, borderRadius: '12px', padding: '18px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 요약 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>구현체</th>
                  <th>유형</th>
                  <th>특징</th>
                  <th>적합한 환경</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Kong', '오픈소스 / 관리형', 'Nginx 기반, 플러그인 생태계, 선언적 설정', '범용, 멀티 클라우드', '#22c55e'],
                  ['AWS API Gateway', '관리형 (Managed)', 'Lambda 통합, 서버리스, 자동 스케일링', 'AWS 환경, 서버리스', '#f59e0b'],
                  ['Spring Cloud GW', '오픈소스', 'Spring 생태계, WebFlux, Predicate/Filter', 'Java/Spring 기반 MSA', '#22c55e'],
                  ['Nginx', '오픈소스 / 상용', '고성능, 설정 기반, 리버스 프록시 겸용', '범용, 고성능 요구', '#06b6d4'],
                ].map(([name, type, feature, env, color]) => (
                  <tr key={name}>
                    <td style={{ color, fontWeight: 700 }}>{name}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{type}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{feature}</td>
                    <td style={{ color: '#5a6a85', fontSize: '12px' }}>{env}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#f59e0b" items={[
            { q: 'API Gateway의 역할과 필요한 이유를 설명해주세요.', a: 'API Gateway는 마이크로서비스의 단일 진입점으로, 인증, 라우팅, Rate Limiting, 로깅 등 공통 관심사를 중앙에서 처리합니다. Gateway 없이는 클라이언트가 각 서비스 주소를 모두 알아야 하고, 인증·로깅 등이 서비스마다 중복 구현됩니다. Gateway를 통해 클라이언트 복잡도를 줄이고, 서비스 변경 시 클라이언트 영향을 최소화하며, 보안과 모니터링을 일관되게 관리할 수 있습니다.' },
            { q: 'BFF(Backend for Frontend) 패턴이란?', a: 'BFF는 클라이언트 유형(Web, Mobile, IoT)별로 전용 API Gateway를 두는 패턴입니다. 모바일은 데이터 절약이 중요하고 웹은 풍부한 데이터가 필요한 등 클라이언트마다 요구사항이 다를 때 효과적입니다. 각 BFF가 해당 클라이언트에 최적화된 API를 제공하므로, 하나의 범용 Gateway보다 유연합니다. 다만 Gateway 수가 늘어나 관리 복잡도가 증가하는 트레이드오프가 있습니다.' },
            { q: 'API Gateway의 SPOF(Single Point of Failure) 문제를 어떻게 해결하나요?', a: 'Gateway를 여러 인스턴스로 이중화(HA)하고 앞에 L4 로드밸런서를 배치합니다. 클라우드에서는 AWS API Gateway처럼 관리형 서비스를 사용하면 자동으로 다중 AZ에 배포됩니다. 또한 Gateway 자체에 Circuit Breaker를 적용하여 장애 서비스로의 요청을 차단하고, 헬스체크로 비정상 인스턴스를 자동 제거합니다.' },
            { q: 'API Gateway에 비즈니스 로직을 넣으면 안 되는 이유는?', a: 'Gateway에 비즈니스 로직을 넣으면 "God Gateway" 안티패턴이 됩니다. Gateway가 비대해져 배포·테스트가 어려워지고, 서비스 간 결합도가 높아집니다. Gateway는 라우팅, 인증, Rate Limiting 등 인프라 수준의 공통 관심사만 처리해야 하며, 비즈니스 로직은 반드시 각 마이크로서비스에 위치해야 합니다. 이를 통해 각 서비스가 독립적으로 배포·확장될 수 있습니다.' },
            { q: 'Spring Cloud Gateway와 Nginx의 차이는?', a: 'Spring Cloud Gateway는 Java/Spring 기반으로 Predicate와 Filter를 코드로 정의하고, WebFlux 기반 비동기 처리를 합니다. Spring 생태계(Eureka, Config Server 등)와 자연스럽게 통합됩니다. Nginx는 C 기반 고성능 서버로 설정 파일로 라우팅을 정의하며, 정적 파일 서빙과 리버스 프록시를 겸합니다. Java MSA 환경에서는 Spring Cloud Gateway가, 범용 고성능이 필요하면 Nginx가 적합합니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

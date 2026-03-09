import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.sm-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
@media(max-width:640px){ .sm-compare-grid{ grid-template-columns:1fr; } }
.sm-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.sm-card:hover { transform:translateY(-4px); }
.sm-card-title { font-size:16px; font-weight:900; margin-bottom:6px; display:flex; align-items:center; gap:10px; }
.sm-card-sub { font-size:12px; color:#5a6a85; margin-bottom:18px; font-family:'JetBrains Mono',monospace; }
.sm-feature-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px; }
.sm-feature { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s, box-shadow .2s; }
.sm-feature:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.1); }
.sm-feature-icon { font-size:28px; margin-bottom:10px; }
.sm-feature-name { font-size:14px; font-weight:700; margin-bottom:6px; }
.sm-feature-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.sm-feature-tags { display:flex; flex-wrap:wrap; gap:4px; margin-top:10px; }
.sm-feature-tag { font-size:9px; padding:2px 7px; border-radius:5px; font-weight:600; }
.sm-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.sm-anim-arena { display:flex; align-items:flex-start; justify-content:center; gap:8px; min-height:300px; position:relative; padding:16px 0; overflow-x:auto; }
.sm-anim-col { display:flex; flex-direction:column; align-items:center; gap:6px; }
.sm-anim-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:24px; border:2px solid #1a2234; transition:all .3s; }
.sm-anim-label { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; }
.sm-anim-sub { font-size:9px; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; padding:2px 6px; border-radius:4px; background:rgba(255,255,255,0.03); }
.sm-anim-mid { display:flex; flex-direction:column; gap:8px; min-width:80px; justify-content:center; padding-top:20px; }
.sm-anim-arrow { display:flex; align-items:center; gap:6px; opacity:0; transform:translateX(-10px); transition:all .5s ease; }
.sm-anim-arrow.show { opacity:1; transform:translateX(0); }
.sm-anim-arrow.right { flex-direction:row; }
.sm-anim-arrow.left { flex-direction:row-reverse; transform:translateX(10px); }
.sm-anim-arrow.left.show { transform:translateX(0); }
.sm-anim-line { flex:1; height:2px; }
.sm-anim-tip { font-size:8px; font-weight:700; font-family:'JetBrains Mono',monospace; white-space:nowrap; padding:2px 6px; border-radius:4px; }
.sm-anim-arr-head { font-size:14px; line-height:1; }
.sm-sidecar-box { border:2px dashed rgba(6,182,212,0.3); border-radius:14px; padding:12px 16px; background:rgba(6,182,212,0.03); display:flex; flex-direction:column; gap:4px; margin-top:6px; }
.sm-sidecar-step { font-size:10px; font-family:'JetBrains Mono',monospace; padding:4px 8px; border-radius:6px; display:flex; align-items:center; gap:6px; opacity:0.3; transition:all .4s ease; }
.sm-sidecar-step.active { opacity:1; }
.sm-plane-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .sm-plane-grid{ grid-template-columns:1fr; } }
.sm-impl-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.sm-impl { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; transition:transform .2s; }
.sm-impl:hover { transform:translateY(-3px); }
.sm-impl-name { font-size:16px; font-weight:800; margin-bottom:4px; }
.sm-impl-org { font-size:11px; color:#5a6a85; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.sm-impl-tags { display:flex; flex-wrap:wrap; gap:4px; margin-bottom:10px; }
.sm-impl-tag { font-size:9px; padding:2px 7px; border-radius:5px; font-weight:600; }
.sm-impl-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.sm-tradeoff-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .sm-tradeoff-grid{ grid-template-columns:1fr; } }
.sm-ctrl-box { border:2px dashed rgba(168,85,247,0.3); border-radius:14px; padding:12px 16px; background:rgba(168,85,247,0.03); display:flex; flex-direction:column; gap:4px; margin-top:6px; }
.sm-ctrl-step { font-size:10px; font-family:'JetBrains Mono',monospace; padding:4px 8px; border-radius:6px; display:flex; align-items:center; gap:6px; opacity:0.3; transition:all .4s ease; }
.sm-ctrl-step.active { opacity:1; }
.sm-istio-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; }
.sm-istio-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; transition:transform .2s; }
.sm-istio-card:hover { transform:translateY(-3px); }
`

export default function ServiceMesh() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 서비스 메시 트래픽 흐름을 확인해보세요', color: '#5a6a85' })
  useInjectCSS('style-service-mesh', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① App A가 App B로 요청 전송', color: '#3b82f6' },
      { s: 2, delay: 1400, msg: '② Sidecar A가 요청을 가로챔 — mTLS 적용, 트레이싱 헤더 주입', color: '#06b6d4' },
      { s: 3, delay: 2400, msg: '③ 암호화된 요청이 네트워크를 통해 전송', color: '#a855f7' },
      { s: 4, delay: 3400, msg: '④ Sidecar B가 수신 — 인증서 검증, 메트릭 기록', color: '#22c55e' },
      { s: 5, delay: 4400, msg: '⑤ 검증된 요청을 App B에 전달', color: '#3b82f6' },
      { s: 6, delay: 5400, msg: '⑥ 응답이 역방향으로 Sidecar를 거쳐 App A에 반환', color: '#f59e0b' },
      { s: 7, delay: 6400, msg: '⑦ 양쪽 Sidecar가 Control Plane에 텔레메트리 보고', color: '#a855f7' },
    ]
    timeline.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: '서비스 메시가 앱 코드 변경 없이 mTLS, 트레이싱, 메트릭 수집을 투명하게 처리합니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 7600)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 서비스 메시 트래픽 흐름을 확인해보세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Microservices · Infrastructure · 면접 필수"
          title={<><span style={{ color: '#06b6d4' }}>Service Mesh</span> — 서비스 메시</>}
          description={<>마이크로서비스 간 통신의 복잡성을 인프라 계층에서 해결하는<br />서비스 메시의 개념, 아키텍처, 그리고 핵심 원리</>}
        />

        {/* 서비스 메시란? */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>서비스 메시란?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#06b6d4' }}>서비스 메시(Service Mesh)</strong>는 마이크로서비스 아키텍처에서
              <strong style={{ color: '#94a3b8' }}> 서비스 간 통신(service-to-service communication)</strong>을 관리하는
              <strong style={{ color: '#06b6d4' }}> 전용 인프라 계층</strong>입니다.
              서비스가 수십~수백 개로 늘어나면 보안, 관측성, 트래픽 관리, 장애 복구 등 통신 관련 공통 관심사를 각 서비스에 직접 구현하는 것은
              비현실적이 됩니다. 서비스 메시는 이러한 네트워크 관심사를 <strong style={{ color: '#06b6d4' }}>비즈니스 로직에서 완전히 분리</strong>하여
              인프라 계층에서 투명하게 처리합니다.
            </div>
            <div style={{ fontSize: '12px', color: '#5a6a85', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px', padding: '14px 18px', lineHeight: 1.7 }}>
              <strong style={{ color: '#06b6d4' }}>핵심 철학:</strong> 각 마이크로서비스 개발자가 네트워크 통신 코드(재시도, 타임아웃, mTLS, 서킷브레이커 등)를 직접 구현하지 않아도 됩니다. 마치 TCP/IP가 앱에 투명하게 신뢰성 있는 전송을 제공하듯, 서비스 메시는 <strong style={{ color: '#94a3b8' }}>마이크로서비스 수준의 네트워킹 추상화</strong>를 제공합니다.
            </div>
          </div>

          {/* 서비스 메시 없이 vs 있을 때 */}
          <div className="sm-compare-grid">
            <div className="sm-card" style={{ borderTop: '3px solid #ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.1)' }}>
              <div className="sm-card-title" style={{ color: '#ef4444' }}>서비스 메시 없이 (Without Mesh)</div>
              <div className="sm-card-sub">각 서비스에 네트워크 로직 직접 구현</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'mTLS', val: '각 서비스에서 인증서 관리 코드 작성', type: 'bad' },
                  { label: '재시도/타임아웃', val: '서비스마다 개별 라이브러리로 구현', type: 'bad' },
                  { label: '관측성', val: '트레이싱·메트릭 코드를 서비스마다 삽입', type: 'bad' },
                  { label: '언어 종속성', val: 'Java, Go, Python 각각 다른 구현 필요', type: 'bad' },
                  { label: '정책 변경', val: '모든 서비스를 재배포해야 반영', type: 'bad' },
                ].map(({ label, val, type }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', gap: '8px' }}>
                    <span style={{ color: '#5a6a85', whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontWeight: 700, color: type === 'bad' ? '#ef4444' : '#22c55e', textAlign: 'right', fontSize: '11px' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm-card" style={{ borderTop: '3px solid #22c55e', boxShadow: '0 0 30px rgba(34,197,94,0.1)' }}>
              <div className="sm-card-title" style={{ color: '#22c55e' }}>서비스 메시 사용 (With Mesh)</div>
              <div className="sm-card-sub">인프라 계층에서 투명하게 처리</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'mTLS', val: 'Sidecar가 자동으로 인증서 발급/갱신', type: 'good' },
                  { label: '재시도/타임아웃', val: 'Sidecar 설정으로 일괄 적용', type: 'good' },
                  { label: '관측성', val: 'Sidecar가 자동으로 메트릭/트레이싱 수집', type: 'good' },
                  { label: '언어 종속성', val: '언어 무관 — Sidecar가 처리 (Polyglot)', type: 'good' },
                  { label: '정책 변경', val: 'Control Plane에서 실시간 배포', type: 'good' },
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

        {/* Sidecar 프록시 패턴 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>Sidecar 프록시 패턴</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              서비스 메시의 핵심 아키텍처는 <strong style={{ color: '#06b6d4' }}>Sidecar 프록시 패턴</strong>입니다.
              각 서비스 인스턴스(Pod) 옆에 <strong style={{ color: '#06b6d4' }}>프록시 컨테이너</strong>가 함께 배치되며,
              모든 <strong style={{ color: '#94a3b8' }}>인바운드/아웃바운드 트래픽</strong>이 반드시 이 Sidecar를 거칩니다.
              iptables 또는 eBPF를 사용해 트래픽을 투명하게 가로채므로, 애플리케이션 코드를 전혀 수정할 필요가 없습니다.
            </div>

            {/* ASCII Diagram */}
            <div style={{ margin: '12px 0', padding: '14px 16px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`┌─────── Pod A ───────┐              ┌─────── Pod B ───────┐
│                     │              │                     │
│  ┌──────────────┐   │              │   ┌──────────────┐  │
│  │   App A      │   │              │   │   App B      │  │
│  │  (Business)  │   │              │   │  (Business)  │  │
│  └──────┬───────┘   │              │   └──────▲───────┘  │
│         │ localhost  │              │          │ localhost │
│  ┌──────▼───────┐   │              │   ┌──────┴───────┐  │
│  │  Sidecar     │   │   Network    │   │  Sidecar     │  │
│  │  Proxy A     │──────────────────────│  Proxy B     │  │
│  │  (Envoy)     │   │   mTLS       │   │  (Envoy)     │  │
│  └──────────────┘   │              │   └──────────────┘  │
│                     │              │                     │
└─────────────────────┘              └─────────────────────┘

  iptables/eBPF가 트래픽을 투명하게 Sidecar로 리다이렉트`}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#06b6d4', marginBottom: '4px' }}>Sidecar가 담당하는 역할</div>
              {[
                { icon: '🔒', text: 'mTLS — 서비스 간 상호 인증 및 암호화 통신' },
                { icon: '⚖️', text: '로드밸런싱 — L7 기반 지능적 트래픽 분배' },
                { icon: '🛡️', text: '서킷 브레이커 — 장애 서비스 차단으로 장애 전파 방지' },
                { icon: '🔄', text: '자동 재시도 — 지수 백오프와 함께 실패 요청 재시도' },
                { icon: '⏱️', text: '타임아웃 — 요청별 타임아웃 설정 및 관리' },
                { icon: '📊', text: '메트릭 수집 — Latency, 요청 수, 에러율 등 자동 수집' },
                { icon: '🔍', text: '분산 트레이싱 — 트레이스 ID 주입 및 전파' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', color: '#94a3b8' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Plane vs Control Plane */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>Data Plane vs Control Plane</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            서비스 메시는 크게 <strong style={{ color: '#06b6d4' }}>Data Plane</strong>과 <strong style={{ color: '#a855f7' }}>Control Plane</strong> 두 영역으로 나뉩니다. 비유하자면 Data Plane은 도로 위의 차량이고, Control Plane은 신호등과 교통 관제 센터입니다.
          </div>
          <div className="sm-plane-grid">
            <div className="sm-card" style={{ borderTop: '3px solid #06b6d4', boxShadow: '0 0 30px rgba(6,182,212,0.1)' }}>
              <div className="sm-card-title" style={{ color: '#06b6d4' }}>Data Plane (데이터 플레인)</div>
              <div className="sm-card-sub">실제 트래픽 처리 — Sidecar 프록시 집합</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '구성 요소', val: 'Sidecar 프록시 (주로 Envoy)', color: '#06b6d4' },
                  { label: '역할', val: '실제 서비스 간 트래픽 처리', color: '#06b6d4' },
                  { label: 'L4/L7', val: 'TCP 및 HTTP/gRPC 수준 제어', color: '#06b6d4' },
                  { label: 'TLS 종료', val: 'mTLS 핸드셰이크 및 암/복호화', color: '#06b6d4' },
                  { label: '관측성', val: '메트릭, 로그, 트레이스 데이터 생성', color: '#06b6d4' },
                  { label: '표준', val: 'Envoy가 사실상 업계 표준 (CNCF)', color: '#06b6d4' },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', gap: '8px' }}>
                    <span style={{ color: '#5a6a85', whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontWeight: 700, color, textAlign: 'right', fontSize: '11px' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm-card" style={{ borderTop: '3px solid #a855f7', boxShadow: '0 0 30px rgba(168,85,247,0.1)' }}>
              <div className="sm-card-title" style={{ color: '#a855f7' }}>Control Plane (컨트롤 플레인)</div>
              <div className="sm-card-sub">정책/설정을 Data Plane에 전달</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '구성 요소', val: 'istiod, linkerd-control 등', color: '#a855f7' },
                  { label: '역할', val: 'Data Plane 구성 및 관리', color: '#a855f7' },
                  { label: '서비스 디스커버리', val: '서비스 레지스트리 자동 동기화', color: '#a855f7' },
                  { label: '인증서 관리', val: 'CA 역할, SPIFFE ID 기반 인증서 발급/갱신', color: '#a855f7' },
                  { label: '트래픽 규칙', val: '라우팅, 장애복구, 배포 전략 배포', color: '#a855f7' },
                  { label: '텔레메트리', val: 'Data Plane에서 수집된 데이터 집계', color: '#a855f7' },
                ].map(({ label, val, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', gap: '8px' }}>
                    <span style={{ color: '#5a6a85', whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontWeight: 700, color, textAlign: 'right', fontSize: '11px' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ASCII Diagram */}
          <div style={{ margin: '20px 0 0', padding: '14px 16px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`  ┌─────────────────────── Control Plane ───────────────────────┐
  │                                                             │
  │   ┌──────────┐    ┌──────────┐    ┌───────────────────┐     │
  │   │  Pilot   │    │ Citadel  │    │ Telemetry/Config  │     │
  │   │ (xDS API)│    │  (CA)    │    │   (Galley)        │     │
  │   └────┬─────┘    └────┬─────┘    └────────┬──────────┘     │
  │        │               │                   │                │
  └────────┼───────────────┼───────────────────┼────────────────┘
           │  config push  │ cert distribute   │ collect
  ┌────────┼───────────────┼───────────────────┼────────────────┐
  │        ▼               ▼                   ▲                │
  │   ┌─────────┐    ┌─────────┐    ┌─────────┐                │
  │   │Sidecar A│◄──►│Sidecar B│◄──►│Sidecar C│  Data Plane    │
  │   └────┬────┘    └────┬────┘    └────┬────┘                │
  │        │              │              │                      │
  │   ┌────┴────┐    ┌────┴────┐    ┌────┴────┐                │
  │   │ App  A  │    │ App  B  │    │ App  C  │                │
  │   └─────────┘    └─────────┘    └─────────┘                │
  └─────────────────────────────────────────────────────────────┘`}
          </div>
        </div>

        {/* 트래픽 흐름 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>서비스 메시 트래픽 흐름</SectionTitle>
          <div className="sm-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              Service A가 Service B에 요청을 보낼 때, 양쪽 Sidecar가 투명하게 처리하는 과정입니다.
            </div>
            <div className="sm-anim-arena">
              {/* App A */}
              <div className="sm-anim-col">
                <div className="sm-anim-icon" style={{ background: step >= 1 ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.08)', borderColor: '#3b82f6' }}>
                  📦
                </div>
                <div className="sm-anim-label" style={{ color: '#3b82f6' }}>App A</div>
                <div className="sm-anim-sub">Order Service</div>
              </div>

              {/* App A → Sidecar A */}
              <div className="sm-anim-mid">
                <div className={`sm-anim-arrow right ${step >= 1 ? 'show' : ''}`}>
                  <div className="sm-anim-tip" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>localhost</div>
                  <div className="sm-anim-line" style={{ background: 'linear-gradient(90deg,#3b82f6,rgba(59,130,246,0.3))' }} />
                  <div className="sm-anim-arr-head" style={{ color: '#3b82f6' }}>{'→'}</div>
                </div>
                <div className={`sm-anim-arrow left ${step >= 6 ? 'show' : ''}`}>
                  <div className="sm-anim-tip" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>Response</div>
                  <div className="sm-anim-line" style={{ background: 'linear-gradient(90deg,rgba(245,158,11,0.3),#f59e0b)' }} />
                  <div className="sm-anim-arr-head" style={{ color: '#f59e0b' }}>{'←'}</div>
                </div>
              </div>

              {/* Sidecar A */}
              <div className="sm-anim-col">
                <div className="sm-anim-icon" style={{ background: step >= 2 ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.08)', borderColor: '#06b6d4' }}>
                  🔀
                </div>
                <div className="sm-anim-label" style={{ color: '#06b6d4' }}>Sidecar A</div>
                <div className="sm-anim-sub">Envoy Proxy</div>
                <div className="sm-sidecar-box">
                  <div className={`sm-sidecar-step ${step >= 2 ? 'active' : ''}`} style={{ background: 'rgba(6,182,212,0.08)', color: '#06b6d4' }}>🔒 mTLS 적용</div>
                  <div className={`sm-sidecar-step ${step >= 2 ? 'active' : ''}`} style={{ background: 'rgba(168,85,247,0.08)', color: '#a855f7' }}>🔍 헤더 주입</div>
                  <div className={`sm-sidecar-step ${step >= 7 ? 'active' : ''}`} style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>📊 텔레메트리</div>
                </div>
              </div>

              {/* Sidecar A → Sidecar B */}
              <div className="sm-anim-mid">
                <div className={`sm-anim-arrow right ${step >= 3 ? 'show' : ''}`}>
                  <div className="sm-anim-tip" style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>mTLS</div>
                  <div className="sm-anim-line" style={{ background: 'linear-gradient(90deg,#a855f7,rgba(168,85,247,0.3))' }} />
                  <div className="sm-anim-arr-head" style={{ color: '#a855f7' }}>{'→'}</div>
                </div>
                <div className={`sm-anim-arrow left ${step >= 6 ? 'show' : ''}`}>
                  <div className="sm-anim-tip" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>mTLS</div>
                  <div className="sm-anim-line" style={{ background: 'linear-gradient(90deg,rgba(245,158,11,0.3),#f59e0b)' }} />
                  <div className="sm-anim-arr-head" style={{ color: '#f59e0b' }}>{'←'}</div>
                </div>
              </div>

              {/* Sidecar B */}
              <div className="sm-anim-col">
                <div className="sm-anim-icon" style={{ background: step >= 4 ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.08)', borderColor: '#22c55e' }}>
                  🔀
                </div>
                <div className="sm-anim-label" style={{ color: '#22c55e' }}>Sidecar B</div>
                <div className="sm-anim-sub">Envoy Proxy</div>
                <div className="sm-sidecar-box" style={{ borderColor: 'rgba(34,197,94,0.3)', background: 'rgba(34,197,94,0.03)' }}>
                  <div className={`sm-sidecar-step ${step >= 4 ? 'active' : ''}`} style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e' }}>🔐 인증 확인</div>
                  <div className={`sm-sidecar-step ${step >= 4 ? 'active' : ''}`} style={{ background: 'rgba(59,130,246,0.08)', color: '#3b82f6' }}>📊 메트릭 기록</div>
                  <div className={`sm-sidecar-step ${step >= 7 ? 'active' : ''}`} style={{ background: 'rgba(245,158,11,0.08)', color: '#f59e0b' }}>📊 텔레메트리</div>
                </div>
              </div>

              {/* Sidecar B → App B */}
              <div className="sm-anim-mid">
                <div className={`sm-anim-arrow right ${step >= 5 ? 'show' : ''}`}>
                  <div className="sm-anim-tip" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>localhost</div>
                  <div className="sm-anim-line" style={{ background: 'linear-gradient(90deg,#3b82f6,rgba(59,130,246,0.3))' }} />
                  <div className="sm-anim-arr-head" style={{ color: '#3b82f6' }}>{'→'}</div>
                </div>
                <div className={`sm-anim-arrow left ${step >= 6 ? 'show' : ''}`}>
                  <div className="sm-anim-tip" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>Response</div>
                  <div className="sm-anim-line" style={{ background: 'linear-gradient(90deg,rgba(245,158,11,0.3),#f59e0b)' }} />
                  <div className="sm-anim-arr-head" style={{ color: '#f59e0b' }}>{'←'}</div>
                </div>
              </div>

              {/* App B */}
              <div className="sm-anim-col">
                <div className="sm-anim-icon" style={{ background: step >= 5 ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.08)', borderColor: '#3b82f6' }}>
                  📦
                </div>
                <div className="sm-anim-label" style={{ color: '#3b82f6' }}>App B</div>
                <div className="sm-anim-sub">Payment Service</div>
              </div>
            </div>

            {/* Control Plane indicator */}
            <div style={{
              margin: '12px 0 0',
              padding: '10px 16px',
              background: step >= 7 ? 'rgba(168,85,247,0.06)' : 'rgba(168,85,247,0.02)',
              border: `1px solid ${step >= 7 ? 'rgba(168,85,247,0.3)' : '#1a2234'}`,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all .4s',
            }}>
              <span style={{ fontSize: '18px' }}>🎛️</span>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: step >= 7 ? '#a855f7' : '#5a6a85', fontFamily: "'JetBrains Mono',monospace" }}>Control Plane (istiod)</div>
                <div style={{ fontSize: '10px', color: '#5a6a85' }}>
                  {step >= 7 ? '텔레메트리 데이터 수신 중 — 메트릭, 트레이스, 액세스 로그 집계' : '대기 중 — 양쪽 Sidecar로부터 텔레메트리 보고를 기다리는 중'}
                </div>
              </div>
            </div>

            <AnimationControls color="#06b6d4" status={status} onPlay={play} onReset={handleReset} />

            {/* STEP-BY-STEP */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'App A(Order Service)가 App B(Payment Service)로 HTTP 요청 전송', color: '#3b82f6' },
                  { num: '②', text: 'Sidecar A(Envoy)가 요청을 가로챔 — mTLS 적용, 트레이싱 헤더(x-request-id) 주입', color: '#06b6d4' },
                  { num: '③', text: '암호화된 요청(mTLS)이 네트워크를 통해 Sidecar B로 전송', color: '#a855f7' },
                  { num: '④', text: 'Sidecar B가 수신 — 인증서 검증(SPIFFE ID), 메트릭 기록(요청 수, 레이턴시)', color: '#22c55e' },
                  { num: '⑤', text: '검증 완료된 요청을 localhost를 통해 App B에 전달', color: '#3b82f6' },
                  { num: '⑥', text: 'App B의 응답이 역방향으로 Sidecar B → Sidecar A → App A에 반환', color: '#f59e0b' },
                  { num: '⑦', text: '양쪽 Sidecar가 Control Plane에 텔레메트리(메트릭, 트레이스, 로그) 보고', color: '#a855f7' },
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

        {/* 핵심 기능 상세 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>핵심 기능 상세</SectionTitle>
          <div className="sm-feature-grid">
            {[
              {
                icon: '🔒', name: 'mTLS (상호 TLS)', color: '#06b6d4',
                desc: '서비스 간 통신을 자동으로 암호화하고 양방향 인증을 수행합니다. SPIFFE 기반 ID로 인증서를 자동 발급/갱신하여 제로 트러스트 네트워크를 구현합니다. 개발자가 인증서를 수동으로 관리할 필요가 없습니다.',
                tags: [{ label: 'SPIFFE', color: '#06b6d4' }, { label: 'Zero Trust', color: '#a855f7' }, { label: '자동 인증서', color: '#22c55e' }],
              },
              {
                icon: '🔀', name: '트래픽 관리', color: '#3b82f6',
                desc: '카나리 배포(90:10 트래픽 분할), A/B 테스트, Blue-Green 배포를 인프라 수준에서 지원합니다. 트래픽 미러링으로 프로덕션 트래픽을 복제해 새 버전을 테스트하고, 헤더 기반 라우팅으로 특정 사용자만 새 버전으로 안내할 수 있습니다.',
                tags: [{ label: 'Canary', color: '#3b82f6' }, { label: 'Blue-Green', color: '#22c55e' }, { label: 'Mirroring', color: '#f59e0b' }],
              },
              {
                icon: '📊', name: '관측성 (Observability)', color: '#22c55e',
                desc: '분산 트레이싱(Jaeger, Zipkin), 골든 시그널 메트릭(Latency, Traffic, Errors, Saturation), 액세스 로그를 앱 코드 수정 없이 자동 수집합니다. 서비스 간 의존성 맵과 실시간 트래픽 흐름을 시각화합니다.',
                tags: [{ label: 'Jaeger', color: '#f59e0b' }, { label: 'Prometheus', color: '#ef4444' }, { label: 'Golden Signals', color: '#22c55e' }],
              },
              {
                icon: '🛡️', name: '장애 복구 (Resilience)', color: '#ef4444',
                desc: '서킷 브레이커로 장애 서비스를 차단하고, 지수 백오프 기반 자동 재시도로 일시적 오류를 복구합니다. 타임아웃, Rate Limiting, Outlier Detection으로 비정상 인스턴스를 자동 제외합니다.',
                tags: [{ label: 'Circuit Breaker', color: '#ef4444' }, { label: 'Retry', color: '#f59e0b' }, { label: 'Outlier Detection', color: '#a855f7' }],
              },
              {
                icon: '🔍', name: '서비스 디스커버리', color: '#f59e0b',
                desc: 'Kubernetes 서비스 레지스트리와 자동 연동하여 새로운 서비스 인스턴스를 즉시 인식합니다. xDS API 또는 DNS 기반으로 동작하며, 헬스체크와 연동하여 비정상 인스턴스를 자동 제외합니다.',
                tags: [{ label: 'xDS API', color: '#f59e0b' }, { label: 'DNS', color: '#3b82f6' }, { label: 'Health Check', color: '#22c55e' }],
              },
              {
                icon: '🔐', name: '보안 정책', color: '#a855f7',
                desc: 'AuthorizationPolicy로 L4/L7 수준의 접근 제어를 적용합니다. RBAC, JWT 검증, 네임스페이스 격리를 설정 파일만으로 관리하며, 서비스 코드를 수정하지 않고도 세밀한 보안 정책을 적용할 수 있습니다.',
                tags: [{ label: 'RBAC', color: '#a855f7' }, { label: 'JWT', color: '#3b82f6' }, { label: 'Namespace 격리', color: '#06b6d4' }],
              },
            ].map((f) => (
              <div key={f.name} className="sm-feature" style={{ borderTop: `2px solid ${f.color}` }}>
                <div className="sm-feature-icon">{f.icon}</div>
                <div className="sm-feature-name" style={{ color: f.color }}>{f.name}</div>
                <div className="sm-feature-desc">{f.desc}</div>
                <div className="sm-feature-tags">
                  {f.tags.map((t) => (
                    <span key={t.label} className="sm-feature-tag" style={{ background: `${t.color}12`, border: `1px solid ${t.color}30`, color: t.color }}>{t.label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Istio 아키텍처 상세 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>Istio 아키텍처 상세</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#06b6d4' }}>Istio</strong>는 가장 널리 사용되는 서비스 메시 구현체입니다.
              v1.5 이후 <strong style={{ color: '#a855f7' }}>istiod</strong>로 컨트롤 플레인을 통합하여 운영을 단순화했습니다.
              기존의 Pilot, Citadel, Galley가 하나의 바이너리로 합쳐져
              <strong style={{ color: '#06b6d4' }}> 서비스 디스커버리, 인증서 관리, 설정 배포</strong>를 모두 담당합니다.
            </div>

            {/* istiod 구성요소 */}
            <div className="sm-istio-grid" style={{ marginBottom: '20px' }}>
              {[
                {
                  icon: '🧭', name: 'Pilot (서비스 디스커버리 + 트래픽 규칙)', color: '#3b82f6',
                  desc: 'Kubernetes 서비스 레지스트리를 감시하여 Envoy에 xDS API로 설정을 전달합니다. VirtualService, DestinationRule의 트래픽 규칙을 Envoy가 이해할 수 있는 형태로 변환합니다.',
                },
                {
                  icon: '🔐', name: 'Citadel (인증서 관리)', color: '#22c55e',
                  desc: 'CA(Certificate Authority) 역할을 수행합니다. 각 서비스에 SPIFFE ID 기반 X.509 인증서를 자동 발급하고 주기적으로 갱신합니다. mTLS의 핵심 인프라입니다.',
                },
                {
                  icon: '📦', name: 'Envoy Sidecar (데이터 플레인)', color: '#06b6d4',
                  desc: 'C++로 작성된 고성능 L7 프록시입니다. 실제 서비스 간 트래픽을 처리하며 mTLS, 로드밸런싱, 서킷브레이커, 메트릭 수집을 수행합니다. Istio의 Data Plane 전체를 구성합니다.',
                },
              ].map((item) => (
                <div key={item.name} className="sm-istio-card" style={{ borderTop: `2px solid ${item.color}` }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* 주요 CRD */}
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#06b6d4', marginBottom: '10px' }}>주요 Istio CRD (Custom Resource Definition)</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'VirtualService', desc: '트래픽 라우팅 규칙 정의 — 카나리 배포, 헤더 기반 라우팅, 재시도/타임아웃 설정', color: '#3b82f6' },
                { name: 'DestinationRule', desc: '목적지 서비스의 로드밸런싱 정책, 서킷브레이커, TLS 모드 설정', color: '#22c55e' },
                { name: 'Gateway', desc: '메시 외부에서 들어오는 트래픽의 진입점 — 인그레스/이그레스 게이트웨이 설정', color: '#f59e0b' },
                { name: 'PeerAuthentication', desc: 'mTLS 모드 설정 (STRICT, PERMISSIVE, DISABLE) — 네임스페이스/워크로드 단위 적용', color: '#a855f7' },
                { name: 'AuthorizationPolicy', desc: 'L4/L7 접근 제어 정책 — 소스, 경로, 메서드, 헤더 기반 ALLOW/DENY 규칙', color: '#ef4444' },
              ].map((crd) => (
                <div key={crd.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${crd.color}` }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: crd.color, fontFamily: "'JetBrains Mono',monospace", whiteSpace: 'nowrap', minWidth: '150px' }}>{crd.name}</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.6 }}>{crd.desc}</span>
                </div>
              ))}
            </div>

            {/* ASCII Diagram */}
            <div style={{ margin: '20px 0 0', padding: '14px 16px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`             ┌─────────────── istiod ──────────────┐
             │  ┌────────┐ ┌────────┐ ┌─────────┐  │
             │  │ Pilot  │ │Citadel │ │ Galley  │  │
             │  │(xDS)   │ │(CA)    │ │(Config) │  │
             │  └───┬────┘ └───┬────┘ └────┬────┘  │
             └──────┼──────────┼───────────┼────────┘
                    │          │           │
  ┌─────────────────┼──────────┼───────────┼──────────┐
  │     xDS push    │  cert    │  config   │          │
  │                 ▼          ▼           ▼          │
  │    ┌────────────────────────────────────┐         │
  │    │        Envoy Sidecar Proxy         │         │
  │    │  mTLS | LB | CB | Retry | Metrics │         │
  │    └─────────────────┬──────────────────┘         │
  │                      │ localhost                   │
  │    ┌─────────────────┴──────────────────┐         │
  │    │      Application Container         │         │
  │    │      (비즈니스 로직만 집중)          │         │
  │    └────────────────────────────────────┘         │
  │                 Kubernetes Pod                     │
  └───────────────────────────────────────────────────┘`}
            </div>
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop: '0' }}>
            <strong style={{ color: '#06b6d4' }}>면접 포인트:</strong> Istio v1.5 이전에는 Pilot, Citadel, Galley가 별도 프로세스로 운영되어 복잡했습니다. v1.5부터 istiod로 통합되면서 운영 부담이 크게 줄었습니다. 이는 "단순함이 최고의 기능"이라는 교훈을 보여줍니다.
          </HighlightBox>
        </div>

        {/* 서비스 메시 구현체 비교 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>서비스 메시 구현체 비교</SectionTitle>
          <div className="sm-impl-grid" style={{ marginBottom: '20px' }}>
            {[
              {
                name: 'Istio', org: 'Google · IBM · Lyft', color: '#3b82f6',
                tags: [{ label: 'Envoy 기반', color: '#3b82f6' }, { label: '가장 풍부한 기능', color: '#a855f7' }, { label: 'CNCF', color: '#06b6d4' }],
                desc: '가장 기능이 풍부한 서비스 메시. Envoy를 Data Plane으로 사용하며, 트래픽 관리, 보안, 관측성 모든 영역에서 강력한 기능을 제공합니다.',
              },
              {
                name: 'Linkerd', org: 'Buoyant · CNCF Graduated', color: '#22c55e',
                tags: [{ label: 'Rust 기반 프록시', color: '#22c55e' }, { label: '경량', color: '#f59e0b' }, { label: '간단한 운영', color: '#06b6d4' }],
                desc: 'Rust로 작성된 linkerd2-proxy를 사용하여 매우 경량입니다. Istio 대비 기능은 적지만, 설치와 운영이 단순하고 리소스 소비가 적습니다.',
              },
              {
                name: 'Consul Connect', org: 'HashiCorp', color: '#f59e0b',
                tags: [{ label: '멀티클라우드', color: '#f59e0b' }, { label: '서비스 디스커버리', color: '#3b82f6' }, { label: 'Envoy/Built-in', color: '#a855f7' }],
                desc: 'HashiCorp의 Consul에 내장된 서비스 메시 기능. 멀티클라우드와 하이브리드 환경에 강점이 있고, 기존 Consul 서비스 디스커버리와 자연스럽게 통합됩니다.',
              },
              {
                name: 'AWS App Mesh', org: 'Amazon Web Services', color: '#ef4444',
                tags: [{ label: 'AWS 네이티브', color: '#ef4444' }, { label: 'Envoy 기반', color: '#3b82f6' }, { label: 'Managed', color: '#22c55e' }],
                desc: 'AWS 환경에 최적화된 관리형 서비스 메시. ECS, EKS, EC2에서 동작하며, CloudWatch, X-Ray와 자연스럽게 연동됩니다.',
              },
            ].map((impl) => (
              <div key={impl.name} className="sm-impl" style={{ borderTop: `2px solid ${impl.color}` }}>
                <div className="sm-impl-name" style={{ color: impl.color }}>{impl.name}</div>
                <div className="sm-impl-org">{impl.org}</div>
                <div className="sm-impl-tags">
                  {impl.tags.map((t) => (
                    <span key={t.label} className="sm-impl-tag" style={{ background: `${t.color}12`, border: `1px solid ${t.color}30`, color: t.color }}>{t.label}</span>
                  ))}
                </div>
                <div className="sm-impl-desc">{impl.desc}</div>
              </div>
            ))}
          </div>

          {/* 비교 테이블 */}
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>항목</th>
                  <th>Istio</th>
                  <th>Linkerd</th>
                  <th>Consul Connect</th>
                  <th>AWS App Mesh</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['프록시', 'Envoy (C++)', 'linkerd2-proxy (Rust)', 'Envoy / Built-in', 'Envoy (C++)', '#06b6d4'],
                  ['레이턴시 오버헤드', '~2-3ms (2 hop)', '~1ms (경량)', '~2-3ms', '~2-3ms', '#f59e0b'],
                  ['메모리 (Sidecar)', '~50-100MB', '~10-20MB', '~30-50MB', '~50MB', '#a855f7'],
                  ['mTLS', '자동 (SPIFFE)', '자동 (기본 활성화)', '자동 (Connect CA)', '수동 설정', '#22c55e'],
                  ['관측성', '매우 풍부', '기본 제공', '기본 + Consul UI', 'CloudWatch/X-Ray', '#3b82f6'],
                  ['학습 곡선', '높음', '낮음', '중간', '중간 (AWS 친숙 시 낮음)', '#ef4444'],
                  ['복잡도', '높음', '낮음', '중간', '중간', '#5a6a85'],
                ].map(([label, istio, linkerd, consul, aws, color]) => (
                  <tr key={label}>
                    <td style={{ color, fontWeight: 700, fontSize: '12px' }}>{label}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{istio}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{linkerd}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{consul}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{aws}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 트레이드오프 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>서비스 메시의 트레이드오프</SectionTitle>
          <div className="sm-tradeoff-grid" style={{ marginBottom: '20px' }}>
            <div className="sm-card" style={{ borderTop: '3px solid #22c55e', boxShadow: '0 0 30px rgba(34,197,94,0.1)' }}>
              <div className="sm-card-title" style={{ color: '#22c55e' }}>장점</div>
              <div className="sm-card-sub">서비스 메시 도입의 이점</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: '🎯', text: '비즈니스 로직에서 네트워크 관심사 완전 분리' },
                  { icon: '🌍', text: '언어 무관(Polyglot) — Java, Go, Python 어떤 언어든 동일한 보안/관측성' },
                  { icon: '🔒', text: '일관된 보안 — mTLS, 접근제어가 인프라 수준에서 자동 적용' },
                  { icon: '📊', text: '통합된 관측성 — 분산 트레이싱, 메트릭이 코드 수정 없이 제공' },
                  { icon: '🚀', text: '점진적 도입 — 네임스페이스 단위로 단계적 적용 가능' },
                  { icon: '🔄', text: '카나리/B-G 배포 — 인프라 수준에서 안전한 배포 전략 지원' },
                ].map((item) => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', color: '#94a3b8' }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm-card" style={{ borderTop: '3px solid #ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.1)' }}>
              <div className="sm-card-title" style={{ color: '#ef4444' }}>단점</div>
              <div className="sm-card-sub">서비스 메시 도입 시 주의할 점</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: '⏱️', text: '레이턴시 오버헤드 — 요청/응답마다 2개의 프록시 홉 추가 (~2-3ms)' },
                  { icon: '💾', text: '리소스 소비 — Sidecar당 메모리(50-100MB)와 CPU 추가 사용' },
                  { icon: '🔧', text: '운영 복잡성 — Control Plane 관리, 업그레이드, 디버깅 부담 증가' },
                  { icon: '🐛', text: '디버깅 어려움 — 네트워크 이슈 시 Sidecar 로그까지 분석 필요' },
                  { icon: '📚', text: '학습 곡선 — CRD, 설정, 개념 이해에 상당한 시간 필요' },
                  { icon: '🔄', text: '업그레이드 복잡성 — Data Plane과 Control Plane 버전 호환성 관리' },
                ].map((item) => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', color: '#94a3b8' }}>
                    <span style={{ fontSize: '14px', flexShrink: 0 }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 도입 판단 기준 */}
          <HighlightBox color="#f59e0b">
            <strong style={{ color: '#f59e0b' }}>도입 판단 기준:</strong> 서비스 메시는 마이크로서비스가 <strong style={{ color: '#94a3b8' }}>10개 이상</strong>이고, <strong style={{ color: '#94a3b8' }}>보안(mTLS) 요구사항이 높으며</strong>, 다양한 프로그래밍 언어를 사용하는 <strong style={{ color: '#94a3b8' }}>Polyglot 환경</strong>일 때 효과적입니다. 서비스가 5개 미만이거나 단일 언어 환경이면 라이브러리 수준(예: Spring Cloud)으로 충분할 수 있습니다. 운영 팀의 Kubernetes 숙련도와 인프라 복잡성에 대한 감내 능력도 중요한 판단 요소입니다.
          </HighlightBox>
        </div>

        {/* 한눈에 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>관심사</th>
                  <th>서비스 메시 없이</th>
                  <th>서비스 메시 사용 시</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['암호화 (mTLS)', '각 서비스에 TLS 인증서 구현', 'Sidecar가 자동 암호화/인증', '#06b6d4'],
                  ['로드밸런싱', '클라이언트 라이브러리 사용', 'Sidecar가 L7 지능적 분배', '#3b82f6'],
                  ['서킷 브레이커', 'Resilience4j 등 개별 적용', 'DestinationRule 설정으로 일괄 적용', '#ef4444'],
                  ['관측성', '각 서비스에 트레이싱 코드 삽입', 'Sidecar가 자동 수집', '#22c55e'],
                  ['배포 전략', '배포 도구로 별도 관리', 'VirtualService로 카나리/B-G', '#a855f7'],
                  ['보안 정책', '서비스마다 인가 로직 구현', 'AuthorizationPolicy로 선언적 관리', '#f59e0b'],
                  ['언어 종속성', '언어별 라이브러리 각각 필요', '언어 무관 — Sidecar가 처리', '#06b6d4'],
                  ['정책 변경', '모든 서비스 재배포 필요', 'Control Plane에서 실시간 반영', '#a855f7'],
                ].map(([concern, without, withMesh, color]) => (
                  <tr key={concern}>
                    <td style={{ color, fontWeight: 700, fontSize: '12px' }}>{concern}</td>
                    <td style={{ color: '#ef4444', fontSize: '12px' }}>{without}</td>
                    <td style={{ color: '#22c55e', fontSize: '12px' }}>{withMesh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            {
              q: '서비스 메시가 무엇이고 왜 필요한가요?',
              a: '서비스 메시는 마이크로서비스 간 통신을 관리하는 전용 인프라 계층입니다. 서비스가 수십~수백 개로 늘어나면 mTLS, 재시도, 서킷브레이커, 관측성 등 통신 관련 공통 관심사를 각 서비스에 직접 구현하는 것은 비현실적입니다. 서비스 메시는 Sidecar 프록시를 통해 이러한 네트워크 관심사를 비즈니스 로직에서 분리하고, 언어에 무관하게 일관된 보안과 관측성을 제공합니다. TCP/IP가 앱에 투명하게 신뢰성 있는 전송을 제공하듯, 서비스 메시는 마이크로서비스 수준의 네트워킹 추상화를 제공하는 것이 핵심입니다.',
            },
            {
              q: 'Sidecar 패턴의 동작 원리와 장단점은?',
              a: 'Sidecar 패턴은 각 서비스 인스턴스(Pod) 옆에 프록시 컨테이너를 배치하여, iptables나 eBPF로 모든 인바운드/아웃바운드 트래픽을 투명하게 가로채는 방식입니다. 장점은 앱 코드를 수정하지 않아도 되고(언어 무관), 관심사가 완전히 분리되며, 프록시만 업데이트하면 됩니다. 단점으로는 요청마다 2개의 프록시 홉이 추가되어 레이턴시 오버헤드(~2-3ms)가 발생하고, Sidecar당 메모리(50-100MB)와 CPU를 추가로 소비합니다. 서비스 수가 늘어날수록 총 리소스 소비가 증가하는 점도 고려해야 합니다.',
            },
            {
              q: 'Data Plane과 Control Plane의 역할 차이는?',
              a: 'Data Plane은 Sidecar 프록시(Envoy)의 집합으로, 실제 서비스 간 트래픽을 처리합니다. mTLS, 로드밸런싱, 서킷브레이커, 메트릭 수집 등 실시간 트래픽 제어를 담당합니다. Control Plane(istiod 등)은 Data Plane을 관리하는 "두뇌"로, 서비스 디스커버리, 인증서 발급/갱신, 트래픽 규칙 배포, 텔레메트리 집계를 담당합니다. 비유하자면 Data Plane은 도로 위의 차량(실제 이동), Control Plane은 교통 관제 센터(신호등, 경로 안내)입니다.',
            },
            {
              q: 'mTLS가 어떻게 서비스 간 보안을 보장하나요?',
              a: 'mTLS(mutual TLS)는 클라이언트와 서버 모두 인증서를 제시하여 양방향 인증을 수행합니다. 서비스 메시에서는 Control Plane의 CA가 각 서비스에 SPIFFE ID 기반 X.509 인증서를 자동으로 발급하고 주기적으로 갱신합니다. Sidecar 프록시가 모든 통신에 TLS 핸드셰이크를 수행하므로, 앱 코드를 수정할 필요 없이 서비스 간 통신이 암호화되고 상호 인증됩니다. 이를 통해 제로 트러스트 네트워크를 구현할 수 있으며, 인증서 관리의 운영 부담도 자동화로 해결됩니다.',
            },
            {
              q: '서비스 메시의 레이턴시 오버헤드를 어떻게 최소화할 수 있나요?',
              a: '첫째, 경량 프록시를 선택합니다. Linkerd의 linkerd2-proxy(Rust)는 Envoy 대비 레이턴시가 낮습니다. 둘째, eBPF 기반 데이터 패스를 활용하여 커널 수준에서 패킷을 처리하면 userspace 프록시 오버헤드를 줄일 수 있습니다(Cilium 등). 셋째, 내부 통신에 mTLS가 불필요한 트래픽은 PERMISSIVE 모드로 설정합니다. 넷째, 프록시의 동시 연결 풀(connection pool)과 HTTP/2 멀티플렉싱을 활용하여 연결 생성 비용을 줄입니다. 마지막으로, 불필요한 텔레메트리 수집을 줄여 프록시 부하를 감소시킵니다.',
            },
            {
              q: 'Istio와 Linkerd의 핵심 차이는 무엇인가요?',
              a: 'Istio는 Envoy(C++) 기반으로 가장 풍부한 기능(트래픽 관리, 보안, 관측성 전 영역)을 제공하지만, 복잡도와 리소스 소비가 높습니다(Sidecar당 ~50-100MB). Linkerd는 Rust로 작성된 linkerd2-proxy를 사용하여 매우 경량(~10-20MB)이고 설치/운영이 간단합니다. Istio는 VirtualService, DestinationRule 등 풍부한 CRD로 세밀한 제어가 가능한 반면, Linkerd는 "합리적인 기본값"을 제공하여 설정 부담을 줄입니다. 소규모 팀이나 빠른 도입이 필요하면 Linkerd가, 대규모 엔터프라이즈 환경에서 세밀한 제어가 필요하면 Istio가 적합합니다.',
            },
          ]} />
        </div>
      </div>
    </>
  )
}

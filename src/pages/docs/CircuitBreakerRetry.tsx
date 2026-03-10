import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import HighlightBox from '../../components/doc/HighlightBox'
import { CodeBlock } from '../../components/doc/CodeBlock'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'

const CSS = `
.cb-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
@media(max-width:640px){ .cb-compare-grid{ grid-template-columns:1fr; } }
.cb-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.cb-card:hover { transform:translateY(-4px); }
.cb-card-title { font-size:16px; font-weight:900; margin-bottom:6px; display:flex; align-items:center; gap:10px; }
.cb-card-sub { font-size:12px; color:#5a6a85; margin-bottom:18px; font-family:'JetBrains Mono',monospace; }
.cb-feature-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.cb-feature { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s, box-shadow .2s; }
.cb-feature:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.1); }
.cb-feature-icon { font-size:28px; margin-bottom:10px; }
.cb-feature-name { font-size:14px; font-weight:700; margin-bottom:6px; }
.cb-feature-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.cb-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.cb-state-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:20px; }
@media(max-width:640px){ .cb-state-grid{ grid-template-columns:1fr; } }
.cb-state-card { border-radius:14px; padding:22px; border:1px solid #1a2234; background:#0e1118; text-align:center; transition:all .4s ease; }
.cb-state-card.active { transform:scale(1.05); }
.cb-state-icon { width:48px; height:48px; border-radius:50%; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; font-size:22px; border:2px solid #1a2234; transition:all .4s ease; }
.cb-state-label { font-size:14px; font-weight:800; margin-bottom:4px; transition:color .4s ease; }
.cb-state-desc { font-size:11px; color:#5a6a85; line-height:1.6; }
.cb-req-lane { display:flex; align-items:center; gap:6px; min-height:50px; margin:8px 0; }
.cb-req-dot { width:12px; height:12px; border-radius:50%; transition:all .3s ease; flex-shrink:0; }
.cb-req-label { font-size:10px; font-family:'JetBrains Mono',monospace; color:#5a6a85; }
.cb-counter { font-size:11px; font-family:'JetBrains Mono',monospace; padding:6px 12px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid #1a2234; display:inline-flex; align-items:center; gap:6px; margin:4px 2px; }
.cb-config-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px; }
.cb-config { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.cb-config:hover { transform:translateY(-3px); }
.cb-config-name { font-size:13px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.cb-config-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.cb-retry-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; }
.cb-retry-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.cb-retry-card:hover { transform:translateY(-3px); }
.cb-retry-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:12px; }
.cb-retry-title { font-size:15px; font-weight:800; margin-bottom:8px; }
.cb-retry-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:12px; }
.cb-fallback-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:14px; }
.cb-fallback { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.cb-fallback:hover { transform:translateY(-3px); }
.cb-fallback-icon { font-size:28px; margin-bottom:10px; }
.cb-fallback-name { font-size:14px; font-weight:700; margin-bottom:6px; }
.cb-fallback-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.cb-pattern-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.cb-pattern { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; }
.cb-pattern-icon { font-size:24px; margin-bottom:8px; }
.cb-pattern-name { font-size:13px; font-weight:700; margin-bottom:6px; }
.cb-pattern-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.cb-pattern-when { font-size:11px; color:#5a6a85; margin-top:8px; padding:6px 10px; background:rgba(255,255,255,0.02); border-radius:6px; line-height:1.6; }
`

export default function CircuitBreakerRetry() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 Circuit Breaker 상태 전이를 확인해보세요', color: '#5a6a85' })
  useInjectCSS('style-circuit-breaker-retry', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① CLOSED — 요청 성공 (1/3)', color: '#22c55e' },
      { s: 2, delay: 1000, msg: '② CLOSED — 요청 성공 (2/3)', color: '#22c55e' },
      { s: 3, delay: 1600, msg: '③ CLOSED — 요청 성공 (3/3)', color: '#22c55e' },
      { s: 4, delay: 2400, msg: '④ CLOSED — 요청 실패! 실패 카운터 +1', color: '#ef4444' },
      { s: 5, delay: 3200, msg: '⑤ CLOSED — 요청 실패! 실패 카운터 +2', color: '#ef4444' },
      { s: 6, delay: 4000, msg: '⑥ CLOSED — 요청 실패! 실패 카운터 +3 (임계값 도달)', color: '#ef4444' },
      { s: 7, delay: 5000, msg: '⑦ 실패율 임계값 초과 → OPEN 상태로 전환!', color: '#ef4444' },
      { s: 8, delay: 6000, msg: '⑧ OPEN — 요청 즉시 거부 (Fast Fail) ①', color: '#ef4444' },
      { s: 9, delay: 6800, msg: '⑨ OPEN — 요청 즉시 거부 (Fast Fail) ②', color: '#ef4444' },
      { s: 10, delay: 7800, msg: '⑩ timeout 경과 → HALF_OPEN 상태로 전환', color: '#f59e0b' },
      { s: 11, delay: 8800, msg: '⑪ HALF_OPEN — 시험 요청 성공!', color: '#f59e0b' },
      { s: 12, delay: 9800, msg: '⑫ 서비스 복구 확인 → CLOSED 상태로 복귀!', color: '#22c55e' },
    ]
    timeline.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: 'Circuit Breaker가 장애를 감지하고 차단한 뒤, 복구를 확인하여 정상 상태로 돌아왔습니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 11000)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 Circuit Breaker 상태 전이를 확인해보세요', color: '#5a6a85' })
  }

  // Determine current CB state based on step
  const cbState = step === 0 ? 'idle'
    : step <= 6 ? 'closed'
    : step <= 9 ? 'open'
    : step <= 11 ? 'half_open'
    : 'closed_again'

  const failCount = step >= 6 ? 3 : step >= 5 ? 2 : step >= 4 ? 1 : 0

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(239,68,68,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Resilience · Microservices · 면접 필수"
          title={<><span style={{ color: '#06b6d4' }}>Circuit Breaker</span> & <span style={{ color: '#f59e0b' }}>Retry</span> 패턴</>}
          description={<>마이크로서비스 환경에서 장애 전파를 차단하고 자동 복구하는<br />핵심 회복 탄력성(Resilience) 패턴</>}
        />

        {/* 왜 필요한가 — 장애 전파 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#ef4444']}>왜 필요한가? — 장애 전파 (Cascading Failure)</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              마이크로서비스 환경에서 하나의 서비스에 장애가 발생하면, 해당 서비스를 호출하는
              <strong style={{ color: '#ef4444' }}> 모든 상위 서비스로 장애가 연쇄적으로 전파</strong>됩니다.
              이를 <strong style={{ color: '#06b6d4' }}>Cascading Failure(장애 전파)</strong>라고 합니다.
            </div>

            {/* 장애 전파 시나리오 */}
            <div style={{ margin: '12px 0' }}>
              <DiagramContainer title="Cascading Failure 시나리오">
                <DiagramFlow>
                  <DiagramNode icon="📦" label="상품 서비스" color="#3b82f6" sub="요청" />
                  <DiagramArrow label="요청" color="#3b82f6" />
                  <DiagramNode icon="🛒" label="주문 서비스" color="#3b82f6" sub="응답 대기 → 스레드 고갈" />
                  <DiagramArrow label="요청" color="#3b82f6" />
                  <DiagramNode icon="⚠️" label="결제 서비스" color="#ef4444" sub="장애 발생!" />
                </DiagramFlow>
                <div style={{ textAlign: 'center', marginTop: '12px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#64748b' }}>
                  결제 서비스 장애 → 주문 서비스 스레드 고갈 → 상품 서비스까지 다운 = <span style={{ color: '#ef4444' }}>Cascading Failure</span>
                </div>
              </DiagramContainer>
            </div>

            <div style={{ fontSize: '12px', color: '#5a6a85', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px', padding: '14px 18px', lineHeight: 1.7, marginTop: '16px' }}>
              <strong style={{ color: '#ef4444' }}>구체적 시나리오:</strong> 결제 서비스가 DB 연결 풀이 고갈되어 응답 불가 → 주문 서비스가 결제 API 호출 후 응답을 무한 대기 → 주문 서비스의 스레드가 모두 점유 → 상품 서비스가 주문 서비스를 호출해도 응답 불가 → <strong style={{ color: '#ef4444' }}>전체 시스템 다운</strong>
            </div>
          </div>

          {/* 비교 카드: 장애 전파 있을 때 vs 없을 때 */}
          <div className="cb-compare-grid">
            <div className="cb-card" style={{ borderTop: '3px solid #ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.1)' }}>
              <div className="cb-card-title" style={{ color: '#ef4444' }}>❌ 회복 탄력성 없음</div>
              <div className="cb-card-sub">장애가 연쇄적으로 전파</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '하위 서비스 장애 시', val: '상위 서비스도 함께 다운', type: 'bad' },
                  { label: '응답 대기', val: '타임아웃까지 스레드 점유', type: 'bad' },
                  { label: '리소스 사용', val: '스레드/커넥션 고갈', type: 'bad' },
                  { label: '복구', val: '모든 서비스 수동 재시작 필요', type: 'bad' },
                  { label: '사용자 경험', val: '전체 시스템 응답 불가', type: 'bad' },
                ].map(({ label, val, type }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '12px', gap: '8px' }}>
                    <span style={{ color: '#5a6a85', whiteSpace: 'nowrap' }}>{label}</span>
                    <span style={{ fontWeight: 700, color: type === 'bad' ? '#ef4444' : '#22c55e', textAlign: 'right', fontSize: '11px' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cb-card" style={{ borderTop: '3px solid #22c55e', boxShadow: '0 0 30px rgba(34,197,94,0.1)' }}>
              <div className="cb-card-title" style={{ color: '#22c55e' }}>✅ Circuit Breaker 적용</div>
              <div className="cb-card-sub">장애를 격리하여 전파 차단</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: '하위 서비스 장애 시', val: '즉시 실패 반환 (Fast Fail)', type: 'good' },
                  { label: '응답 대기', val: '즉시 fallback 응답', type: 'good' },
                  { label: '리소스 사용', val: '스레드/커넥션 보존', type: 'good' },
                  { label: '복구', val: '자동 복구 감지 및 전환', type: 'good' },
                  { label: '사용자 경험', val: '다른 기능은 정상 동작', type: 'good' },
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

        {/* Circuit Breaker 상태 머신 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#ef4444']}>Circuit Breaker 패턴 — 상태 머신</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            Circuit Breaker는 전기 회로의 <strong style={{ color: '#94a3b8' }}>차단기(breaker)</strong>에서 이름을 따왔습니다. 과부하가 걸리면 회로를 차단하여 전체 시스템을 보호하듯, 장애가 감지되면 요청을 차단하여 장애 전파를 막습니다.
          </div>

          {/* 3가지 상태 카드 */}
          <div className="cb-state-grid">
            <div className="cb-card" style={{ borderTop: '3px solid #22c55e', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', background: 'rgba(34,197,94,0.12)', border: '2px solid #22c55e' }}>✅</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#22c55e', marginBottom: '4px' }}>CLOSED (정상)</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                모든 요청이 정상적으로 통과합니다. 실패율을 지속적으로 모니터링하며, 실패율이 <strong style={{ color: '#22c55e' }}>임계값(threshold)을 초과</strong>하면 OPEN 상태로 전환됩니다.
              </div>
            </div>

            <div className="cb-card" style={{ borderTop: '3px solid #ef4444', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', background: 'rgba(239,68,68,0.12)', border: '2px solid #ef4444' }}>🚫</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#ef4444', marginBottom: '4px' }}>OPEN (차단)</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                모든 요청을 <strong style={{ color: '#ef4444' }}>즉시 실패 처리 (Fast Fail)</strong>합니다. 실제 서비스를 호출하지 않아 장애 서비스에 추가 부하를 주지 않습니다. 일정 시간(timeout) 후 HALF_OPEN으로 전환합니다.
              </div>
            </div>

            <div className="cb-card" style={{ borderTop: '3px solid #f59e0b', textAlign: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', background: 'rgba(245,158,11,0.12)', border: '2px solid #f59e0b' }}>🔍</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#f59e0b', marginBottom: '4px' }}>HALF_OPEN (시험)</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                제한된 수의 요청만 통과시켜 <strong style={{ color: '#f59e0b' }}>서비스 복구를 확인</strong>합니다. 성공 시 CLOSED로 복귀하고, 실패 시 다시 OPEN으로 전환됩니다.
              </div>
            </div>
          </div>

          {/* 상태 전이 다이어그램 */}
          <div style={{ margin: '12px 0' }}>
            <DiagramContainer title="Circuit Breaker 상태 전이">
              <DiagramFlow>
                <DiagramNode icon="✅" label="CLOSED" color="#22c55e" sub="정상 통과 · 실패율 모니터링" />
                <DiagramArrow label="실패율 > 임계값" color="#ef4444" />
                <DiagramNode icon="🚫" label="OPEN" color="#ef4444" sub="즉시 거부 (Fast Fail) · timeout 대기" />
                <DiagramArrow label="timeout 경과" color="#f59e0b" />
                <DiagramNode icon="🔍" label="HALF_OPEN" color="#f59e0b" sub="시험 요청 · 복구 여부 판단" />
              </DiagramFlow>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px', fontSize: '10px', fontFamily: "'JetBrains Mono',monospace", color: '#64748b' }}>
                <span>시험 성공 → <span style={{ color: '#22c55e' }}>CLOSED</span></span>
                <span>시험 실패 → <span style={{ color: '#ef4444' }}>OPEN</span></span>
              </div>
            </DiagramContainer>
          </div>

          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>핵심 포인트:</strong> Circuit Breaker의 OPEN 상태는 "차단기가 열린 것" — 즉 전류(요청)가 흐르지 않는 상태입니다. 전기 회로에서 차단기가 열리면 전류가 끊기는 것과 같은 원리입니다. 이름과 직관이 반대이므로 면접에서 자주 혼동하는 포인트입니다.
          </HighlightBox>
        </div>

        {/* 애니메이션: Circuit Breaker 상태 전이 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#ef4444']}>Circuit Breaker 상태 전이 시뮬레이션</SectionTitle>
          <div className="cb-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              정상 요청 → 실패 누적 → OPEN 차단 → timeout 후 HALF_OPEN → 복구 확인 → CLOSED 복귀까지의 전체 흐름을 확인해보세요.
            </div>

            {/* 상태 표시기 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '24px' }}>
              {[
                { label: 'CLOSED', color: '#22c55e', active: cbState === 'closed' || cbState === 'closed_again' },
                { label: 'OPEN', color: '#ef4444', active: cbState === 'open' },
                { label: 'HALF_OPEN', color: '#f59e0b', active: cbState === 'half_open' },
              ].map((s) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: s.active ? 1 : 0.3, transition: 'all .4s ease' }}>
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%',
                    background: s.active ? s.color : 'transparent',
                    border: `2px solid ${s.color}`,
                    boxShadow: s.active ? `0 0 12px ${s.color}60` : 'none',
                    transition: 'all .4s ease',
                  }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: s.active ? s.color : '#5a6a85', fontFamily: "'JetBrains Mono',monospace", transition: 'color .4s ease' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* 실패 카운터 */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
              <div className="cb-counter">
                <span style={{ color: '#5a6a85' }}>실패 카운터:</span>
                <span style={{ color: failCount > 0 ? '#ef4444' : '#5a6a85', fontWeight: 700 }}>{failCount}/3</span>
              </div>
              <div className="cb-counter">
                <span style={{ color: '#5a6a85' }}>상태:</span>
                <span style={{
                  color: cbState === 'open' ? '#ef4444' : cbState === 'half_open' ? '#f59e0b' : cbState === 'idle' ? '#5a6a85' : '#22c55e',
                  fontWeight: 700,
                }}>
                  {cbState === 'idle' ? 'READY' : cbState === 'closed' ? 'CLOSED' : cbState === 'open' ? 'OPEN' : cbState === 'half_open' ? 'HALF_OPEN' : 'CLOSED'}
                </span>
              </div>
            </div>

            {/* 요청 시각화 */}
            <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '16px 20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#5a6a85', marginBottom: '12px', fontFamily: "'JetBrains Mono',monospace" }}>REQUEST FLOW</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                {/* Steps 1-3: successful requests */}
                {[1, 2, 3].map((s) => (
                  <div key={`s${s}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: step >= s ? 1 : 0.2, transition: 'all .4s ease' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: step >= s ? '#22c55e' : '#1a2234', transition: 'all .4s ease', boxShadow: step >= s ? '0 0 8px rgba(34,197,94,0.5)' : 'none' }} />
                    <span style={{ fontSize: '9px', color: step >= s ? '#22c55e' : '#5a6a85', fontFamily: "'JetBrains Mono',monospace" }}>OK</span>
                  </div>
                ))}
                {/* Steps 4-6: failed requests */}
                {[4, 5, 6].map((s) => (
                  <div key={`f${s}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: step >= s ? 1 : 0.2, transition: 'all .4s ease' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: step >= s ? '#ef4444' : '#1a2234', transition: 'all .4s ease', boxShadow: step >= s ? '0 0 8px rgba(239,68,68,0.5)' : 'none' }} />
                    <span style={{ fontSize: '9px', color: step >= s ? '#ef4444' : '#5a6a85', fontFamily: "'JetBrains Mono',monospace" }}>FAIL</span>
                  </div>
                ))}
                {/* Step 7: OPEN transition */}
                {step >= 7 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', background: 'rgba(239,68,68,0.1)', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.3)' }}>
                    <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>→ OPEN</span>
                  </div>
                )}
                {/* Steps 8-9: fast fail */}
                {[8, 9].map((s) => (
                  <div key={`ff${s}`} style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: step >= s ? 1 : 0.2, transition: 'all .4s ease' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: step >= s ? '#ef4444' : '#1a2234', transition: 'all .4s ease' }} />
                    <span style={{ fontSize: '9px', color: step >= s ? '#ef4444' : '#5a6a85', fontFamily: "'JetBrains Mono',monospace" }}>REJECT</span>
                  </div>
                ))}
                {/* Step 10: HALF_OPEN transition */}
                {step >= 10 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', background: 'rgba(245,158,11,0.1)', borderRadius: '4px', border: '1px solid rgba(245,158,11,0.3)' }}>
                    <span style={{ fontSize: '9px', color: '#f59e0b', fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>→ HALF_OPEN</span>
                  </div>
                )}
                {/* Step 11: test request success */}
                {step >= 11 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', opacity: 1, transition: 'all .4s ease' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', boxShadow: '0 0 8px rgba(245,158,11,0.5)' }} />
                    <span style={{ fontSize: '9px', color: '#f59e0b', fontFamily: "'JetBrains Mono',monospace" }}>TEST OK</span>
                  </div>
                )}
                {/* Step 12: CLOSED transition */}
                {step >= 12 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 8px', background: 'rgba(34,197,94,0.1)', borderRadius: '4px', border: '1px solid rgba(34,197,94,0.3)' }}>
                    <span style={{ fontSize: '9px', color: '#22c55e', fontWeight: 700, fontFamily: "'JetBrains Mono',monospace" }}>→ CLOSED</span>
                  </div>
                )}
              </div>
            </div>

            <AnimationControls color="#06b6d4" status={status} onPlay={play} onReset={handleReset} />

            {/* STEP-BY-STEP */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①②③', text: 'CLOSED 상태 — 요청이 정상적으로 통과하며 성공 응답 반환', color: '#22c55e' },
                  { num: '④⑤⑥', text: 'CLOSED 상태 — 요청 실패가 누적, 실패 카운터가 임계값(3/3)에 도달', color: '#ef4444' },
                  { num: '⑦', text: '실패율 임계값 초과 → Circuit Breaker가 OPEN 상태로 전환', color: '#ef4444' },
                  { num: '⑧⑨', text: 'OPEN 상태 — 모든 요청을 즉시 거부(Fast Fail), 실제 호출하지 않음', color: '#ef4444' },
                  { num: '⑩', text: 'waitDuration(timeout) 경과 → HALF_OPEN 상태로 전환', color: '#f59e0b' },
                  { num: '⑪', text: 'HALF_OPEN 상태 — 제한된 시험 요청을 통과시켜 서비스 복구 확인', color: '#f59e0b' },
                  { num: '⑫', text: '시험 요청 성공 → CLOSED 상태로 복귀, 정상 흐름 재개', color: '#22c55e' },
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

        {/* Circuit Breaker 핵심 설정값 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#ef4444']}>Circuit Breaker 핵심 설정값</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            Resilience4j의 CircuitBreaker 설정 항목입니다. 서비스 특성에 맞게 <strong style={{ color: '#94a3b8' }}>임계값, 윈도우 크기, 대기 시간</strong>을 조정해야 합니다.
          </div>
          <div className="cb-config-grid">
            {[
              { name: 'failureRateThreshold', desc: '실패율 임계값 (기본 50%). 슬라이딩 윈도우 내 실패율이 이 값을 초과하면 OPEN 상태로 전환합니다. 예: 50이면 호출의 50% 이상이 실패할 때 차단.', color: '#ef4444' },
              { name: 'slowCallRateThreshold', desc: '느린 호출 비율 임계값. 응답 시간이 slowCallDurationThreshold를 초과하는 호출의 비율이 이 값을 넘으면 OPEN으로 전환합니다.', color: '#f59e0b' },
              { name: 'slidingWindowSize', desc: '실패율 계산에 사용하는 윈도우 크기. COUNT_BASED(최근 N개 요청)와 TIME_BASED(최근 N초) 두 가지 타입을 지원합니다.', color: '#3b82f6' },
              { name: 'waitDurationInOpenState', desc: 'OPEN 상태 유지 시간 (기본 60초). 이 시간이 지나면 HALF_OPEN으로 자동 전환됩니다. 서비스 복구에 필요한 시간을 고려하여 설정합니다.', color: '#a855f7' },
              { name: 'permittedNumberOfCalls\nInHalfOpenState', desc: 'HALF_OPEN에서 허용할 시험 요청 수 (기본 10). 이 수만큼의 요청을 통과시켜 서비스 복구 여부를 판단합니다.', color: '#06b6d4' },
              { name: 'minimumNumberOfCalls', desc: '실패율 계산을 위한 최소 호출 수 (기본 100). 이 수 미만의 호출에서는 실패율을 계산하지 않습니다. 샘플이 너무 적으면 통계적 의미가 없기 때문입니다.', color: '#22c55e' },
            ].map((c) => (
              <div key={c.name} className="cb-config" style={{ borderLeft: `3px solid ${c.color}` }}>
                <div className="cb-config-name" style={{ color: c.color, whiteSpace: 'pre-wrap' }}>{c.name}</div>
                <div className="cb-config-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Retry 패턴 상세 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#22c55e']}>Retry 패턴 상세</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#f59e0b' }}>Retry 패턴</strong>은 일시적 오류(Transient Failure)에 대해
              <strong style={{ color: '#22c55e' }}> 자동으로 재시도</strong>하는 회복 탄력성 패턴입니다.
              네트워크 타임아웃, 503 Service Unavailable, 429 Too Many Requests 등
              <strong style={{ color: '#f59e0b' }}> 일시적인 오류</strong>에 적합합니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '14px', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>✅ 재시도 적합한 경우</div>
                <div style={{ fontSize: '11px', color: '#5a6a85', lineHeight: 1.7 }}>
                  {['네트워크 타임아웃', '503 Service Unavailable', '429 Too Many Requests', 'Connection Reset', 'DNS 해석 일시 실패'].map((t) => (
                    <div key={t} style={{ padding: '2px 0' }}>• {t}</div>
                  ))}
                </div>
              </div>
              <div style={{ padding: '14px', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '8px' }}>❌ 재시도 의미 없는 경우</div>
                <div style={{ fontSize: '11px', color: '#5a6a85', lineHeight: 1.7 }}>
                  {['400 Bad Request (잘못된 요청)', '401 Unauthorized (인증 실패)', '403 Forbidden (권한 없음)', '404 Not Found (리소스 없음)', '비즈니스 로직 오류 (잔액 부족 등)'].map((t) => (
                    <div key={t} style={{ padding: '2px 0' }}>• {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 재시도 전략 3가지 */}
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            재시도 전략은 <strong style={{ color: '#94a3b8' }}>재시도 간격을 어떻게 설정하느냐</strong>에 따라 크게 3가지로 나뉩니다.
          </div>
          <div className="cb-retry-grid">
            {[
              {
                badge: 'Immediate', badgeColor: '#3b82f6', badgeBg: 'rgba(59,130,246,0.12)',
                title: '즉시 재시도 (Immediate Retry)', color: '#3b82f6',
                desc: '간격 없이 바로 재시도합니다. 일시적 네트워크 글리치에 유용하지만, 서버가 과부하 상태라면 부하를 가중시킬 위험이 있습니다.',
                diagram: 'Request → FAIL → retry → FAIL → retry → OK',
              },
              {
                badge: 'Fixed Interval', badgeColor: '#a855f7', badgeBg: 'rgba(168,85,247,0.12)',
                title: '고정 간격 재시도 (Fixed Interval)', color: '#a855f7',
                desc: '일정 시간 간격(예: 1초)으로 재시도합니다. 구현이 단순하지만, 여러 클라이언트가 동시에 같은 간격으로 재시도하면 Thundering Herd 문제가 발생할 수 있습니다.',
                diagram: 'Request → FAIL ─1s─ retry → FAIL ─1s─ retry → OK',
              },
              {
                badge: 'Exponential Backoff', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.12)',
                title: '지수 백오프 + Jitter', color: '#22c55e',
                desc: '재시도 간격을 점점 늘리고(1s → 2s → 4s → 8s), Jitter(랜덤 변동)를 추가하여 동시 재시도를 분산시킵니다. 가장 권장되는 전략입니다.',
                diagram: 'FAIL ─1s─ retry\nFAIL ──2s+jitter── retry\nFAIL ────4s+jitter──── retry\nFAIL ────────8s+jitter──────── retry',
              },
            ].map((r) => (
              <div key={r.badge} className="cb-retry-card" style={{ borderTop: `2px solid ${r.color}` }}>
                <div className="cb-retry-badge" style={{ color: r.badgeColor, background: r.badgeBg }}>{r.badge}</div>
                <div className="cb-retry-title" style={{ color: r.color }}>{r.title}</div>
                <div className="cb-retry-desc">{r.desc}</div>
                <CodeBlock>{r.diagram}</CodeBlock>
              </div>
            ))}
          </div>

          {/* Exponential Backoff 다이어그램 */}
          <div style={{ margin: '20px 0 12px' }}>
            <DiagramContainer title="Exponential Backoff with Jitter">
              <DiagramGroup label="Backoff Flow" color="#3b82f6">
                <DiagramFlow wrap>
                  <DiagramNode icon="❌" label="FAIL" color="#ef4444" />
                  <DiagramArrow label="1s" color="#f59e0b" />
                  <DiagramNode icon="🔄" label="Retry 1" color="#3b82f6" />
                  <DiagramArrow label="2s + jitter" color="#f59e0b" />
                  <DiagramNode icon="🔄" label="Retry 2" color="#3b82f6" />
                  <DiagramArrow label="4s + jitter" color="#f59e0b" />
                  <DiagramNode icon="🔄" label="Retry 3" color="#3b82f6" />
                  <DiagramArrow label="8s + jitter" color="#f59e0b" />
                  <DiagramNode icon="🔄" label="Retry 4" color="#3b82f6" />
                  <DiagramArrow label="FAIL" color="#ef4444" />
                  <DiagramNode icon="🛑" label="Give up" color="#ef4444" sub="fallback 실행" />
                </DiagramFlow>
              </DiagramGroup>
              <div style={{ textAlign: 'center', marginTop: '12px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#64748b' }}>
                Jitter = random(0, backoff) → 동시 재시도 분산 효과 / <span style={{ color: '#f59e0b' }}>Thundering Herd 방지</span>
              </div>
            </DiagramContainer>
          </div>

          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>면접 포인트:</strong> Exponential Backoff에 Jitter를 추가하는 이유는 <strong style={{ color: '#94a3b8' }}>Thundering Herd(동시 요청 폭주)</strong>를 방지하기 위해서입니다. 100개의 클라이언트가 동시에 실패하면 2초 후 100개가 동시에 재시도합니다. Jitter를 추가하면 각 클라이언트의 재시도 시점이 분산되어 서버 부하를 균등하게 합니다.
          </HighlightBox>

          {/* Retry 핵심 설정 */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginBottom: '12px' }}>Retry 핵심 설정값</div>
            <div className="cb-config-grid">
              {[
                { name: 'maxRetries', desc: '최대 재시도 횟수. 초과하면 재시도를 중단하고 예외를 발생시키거나 fallback을 실행합니다.', color: '#ef4444' },
                { name: 'waitDuration', desc: '재시도 간격. 고정 간격 또는 지수 백오프로 설정할 수 있습니다.', color: '#f59e0b' },
                { name: 'retryOnResult', desc: '특정 응답 결과에 대해 재시도할지를 결정하는 Predicate. 예: HTTP 상태가 503이면 재시도.', color: '#3b82f6' },
                { name: 'retryExceptions', desc: '재시도를 수행할 예외 클래스 목록. 예: IOException, TimeoutException.', color: '#a855f7' },
                { name: 'ignoreExceptions', desc: '재시도하지 않을 예외 클래스 목록. 비즈니스 로직 예외는 재시도 의미 없음.', color: '#22c55e' },
              ].map((c) => (
                <div key={c.name} className="cb-config" style={{ borderLeft: `3px solid ${c.color}` }}>
                  <div className="cb-config-name" style={{ color: c.color }}>{c.name}</div>
                  <div className="cb-config-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Circuit Breaker + Retry 조합 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>Circuit Breaker + Retry 조합</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              Circuit Breaker와 Retry를 함께 사용할 때 <strong style={{ color: '#ef4444' }}>순서가 매우 중요</strong>합니다.
              Retry는 반드시 <strong style={{ color: '#06b6d4' }}>Circuit Breaker 안에 배치</strong>해야 합니다.
            </div>

            <div className="cb-compare-grid">
              <div className="cb-card" style={{ borderTop: '3px solid #22c55e', boxShadow: '0 0 30px rgba(34,197,94,0.1)' }}>
                <div className="cb-card-title" style={{ color: '#22c55e' }}>✅ 올바른 순서</div>
                <div className="cb-card-sub">CircuitBreaker → Retry → 실제 호출</div>
                <CodeBlock>
{`요청 → [CircuitBreaker 확인]
         ├─ OPEN → 즉시 실패 (재시도 X)
         └─ CLOSED → [Retry]
                      ├─ 호출 성공 → 응답
                      └─ 호출 실패 → 재시도
                           └─ 모두 실패 → CB 실패 기록`}
                </CodeBlock>
                <div style={{ fontSize: '11px', color: '#5a6a85', marginTop: '12px', lineHeight: 1.7 }}>
                  CB가 OPEN이면 재시도 자체를 하지 않아 불필요한 호출을 완전히 차단합니다.
                </div>
              </div>

              <div className="cb-card" style={{ borderTop: '3px solid #ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.1)' }}>
                <div className="cb-card-title" style={{ color: '#ef4444' }}>❌ 잘못된 순서</div>
                <div className="cb-card-sub">Retry → CircuitBreaker → 실제 호출</div>
                <CodeBlock>
{`요청 → [Retry]
         └─ [CircuitBreaker 확인]
              ├─ OPEN → 실패
              │   └─ Retry가 재시도! (의미 없음)
              └─ CLOSED → 호출
                  └─ 실패 → Retry가 또 재시도
                       └─ CB OPEN이어도 계속 재시도 😱`}
                </CodeBlock>
                <div style={{ fontSize: '11px', color: '#5a6a85', marginTop: '12px', lineHeight: 1.7 }}>
                  CB가 OPEN이어도 Retry가 계속 재시도하여 의미 없는 호출이 반복됩니다.
                </div>
              </div>
            </div>
          </div>

          {/* 조합 다이어그램 */}
          <div style={{ margin: '12px 0' }}>
            <DiagramContainer title="실무 권장 데코레이터 순서">
              <DiagramGroup label="Decorator Chain" color="#3b82f6">
                <DiagramFlow wrap>
                  <DiagramNode icon="📤" label="요청" color="#3b82f6" />
                  <DiagramArrow color="#06b6d4" />
                  <DiagramNode icon="🔌" label="CircuitBreaker" color="#06b6d4" sub="order=1" />
                  <DiagramArrow label="CLOSED" color="#f59e0b" />
                  <DiagramNode icon="🔄" label="Retry" color="#f59e0b" sub="order=2" />
                  <DiagramArrow color="#22c55e" />
                  <DiagramNode icon="🚦" label="RateLimiter" color="#22c55e" />
                  <DiagramArrow color="#a855f7" />
                  <DiagramNode icon="🧱" label="Bulkhead" color="#a855f7" />
                  <DiagramArrow color="#3b82f6" />
                  <DiagramNode icon="⚡" label="실제 호출" color="#3b82f6" />
                </DiagramFlow>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px', fontSize: '10px', fontFamily: "'JetBrains Mono',monospace", color: '#64748b' }}>
                  <span>CB OPEN → <span style={{ color: '#ef4444' }}>즉시 실패 (Retry 실행 안 함)</span></span>
                  <span>모든 재시도 실패 → <span style={{ color: '#ef4444' }}>CB에 실패 1회 기록</span></span>
                </div>
              </DiagramGroup>
            </DiagramContainer>
            <div style={{ padding: '8px 16px 12px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#64748b', textAlign: 'center', lineHeight: 1.7 }}>
              <span style={{ color: '#f59e0b' }}>Resilience4j 기본 순서는 Retry가 바깥</span>이지만, 실무에서는 CB를 바깥으로 커스터마이즈 권장
            </div>
          </div>

          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>주의:</strong> Resilience4j의 <strong style={{ color: '#94a3b8' }}>기본(default) 순서</strong>는 Retry가 바깥입니다 — 즉 CB가 실패하면 Retry가 재시도합니다. 하지만 이 경우 CB가 OPEN이어도 Retry가 의미 없는 재시도를 하게 됩니다. 실무에서는 <strong style={{ color: '#06b6d4' }}>@CircuitBreaker(order=1)</strong>, <strong style={{ color: '#06b6d4' }}>@Retry(order=2)</strong>로 <strong style={{ color: '#94a3b8' }}>CB를 바깥에 배치</strong>하여 OPEN 상태에서 재시도 자체를 차단하는 것을 권장합니다.
          </HighlightBox>
        </div>

        {/* Resilience4j 실무 적용 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>Resilience4j 실무 적용</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            Spring Boot 환경에서 <strong style={{ color: '#06b6d4' }}>Resilience4j</strong>를 사용한 Circuit Breaker + Retry 적용 예시입니다.
          </div>

          {/* Java 코드 예시 */}
          <CodeBlock title="어노테이션 기반 적용" lang="Java" style={{ marginBottom: '16px' }}>
{`@Service
public class PaymentService {

    private final PaymentClient paymentClient;

    @CircuitBreaker(name = "paymentService",
                    fallbackMethod = "paymentFallback")
    @Retry(name = "paymentService")
    public PaymentResult processPayment(PaymentRequest request) {
        return paymentClient.pay(request);
    }

    // Fallback 메서드 — 원본과 같은 파라미터 + Exception
    private PaymentResult paymentFallback(
            PaymentRequest request, Exception e) {
        log.warn("결제 서비스 장애, fallback 실행: {}",
                 e.getMessage());
        return PaymentResult.pending(
            "결제 서비스 일시 장애, 잠시 후 재시도합니다");
    }
}`}
          </CodeBlock>

          <CodeBlock title="설정 예시" lang="YAML">
{`resilience4j:
  circuitbreaker:
    instances:
      paymentService:
        failure-rate-threshold: 50          # 실패율 50% 초과 시 OPEN
        slow-call-rate-threshold: 80        # 느린 호출 80% 초과 시 OPEN
        slow-call-duration-threshold: 3s    # 3초 이상 → 느린 호출
        sliding-window-type: COUNT_BASED    # 요청 수 기반 윈도우
        sliding-window-size: 10             # 최근 10개 요청으로 판단
        minimum-number-of-calls: 5          # 최소 5개 호출 후 판단
        wait-duration-in-open-state: 30s    # 30초 후 HALF_OPEN
        permitted-number-of-calls-in-half-open-state: 3  # 시험 요청 3개

  retry:
    instances:
      paymentService:
        max-attempts: 3                     # 최대 3회 시도
        wait-duration: 1s                   # 재시도 간격 1초
        retry-exceptions:                   # 재시도할 예외
          - java.io.IOException
          - java.util.concurrent.TimeoutException
        ignore-exceptions:                  # 재시도하지 않을 예외
          - com.example.BusinessException`}
          </CodeBlock>
        </div>

        {/* Fallback 전략 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>Fallback 전략</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            Circuit Breaker가 OPEN 상태일 때, 또는 재시도가 모두 실패했을 때 실행하는 <strong style={{ color: '#94a3b8' }}>대체 로직</strong>입니다.
          </div>
          <div className="cb-fallback-grid">
            {[
              { icon: '📦', name: '기본값 반환', desc: '캐시된 데이터나 기본 추천 목록 등 미리 준비된 값을 반환합니다. 상품 추천 서비스 장애 시 인기 상품 목록을 캐시에서 제공하는 방식입니다.', color: '#3b82f6' },
              { icon: '🔄', name: '대체 서비스 호출', desc: 'Primary 서비스 실패 시 Secondary(백업) 서비스를 호출합니다. 결제 게이트웨이 장애 시 다른 결제 수단으로 자동 전환하는 패턴입니다.', color: '#22c55e' },
              { icon: '💬', name: '에러 응답', desc: '사용자에게 명확한 에러 메시지를 반환합니다. "결제 서비스 점검 중입니다. 잠시 후 다시 시도해주세요" 같은 사용자 친화적 응답입니다.', color: '#f59e0b' },
              { icon: '📥', name: '큐에 저장 (비동기)', desc: '요청을 메시지 큐에 넣고 나중에 처리합니다. 주문 확인 이메일 발송 실패 시 큐에 저장 후 서비스 복구되면 재처리하는 패턴입니다.', color: '#a855f7' },
            ].map((f) => (
              <div key={f.name} className="cb-fallback" style={{ borderTop: `2px solid ${f.color}` }}>
                <div className="cb-fallback-icon">{f.icon}</div>
                <div className="cb-fallback-name" style={{ color: f.color }}>{f.name}</div>
                <div className="cb-fallback-desc">{f.desc}</div>
              </div>
            ))}
          </div>

          <HighlightBox color="#a855f7" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#a855f7' }}>실무 팁:</strong> Fallback 전략은 서비스의 <strong style={{ color: '#94a3b8' }}>비즈니스 중요도</strong>에 따라 결정합니다. 결제처럼 정확성이 중요한 기능은 에러 응답을, 추천처럼 정확성보다 가용성이 중요한 기능은 캐시 데이터 반환을, 알림처럼 나중에 처리해도 되는 기능은 큐 저장을 사용합니다.
          </HighlightBox>
        </div>

        {/* 관련 패턴 비교 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>관련 Resilience 패턴 비교</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            마이크로서비스의 회복 탄력성을 높이는 다양한 패턴들입니다. 각 패턴은 서로 다른 문제를 해결하며, <strong style={{ color: '#94a3b8' }}>조합하여 사용</strong>할 때 가장 효과적입니다.
          </div>
          <div className="cb-pattern-grid">
            {[
              { icon: '🔌', name: 'Circuit Breaker', desc: '장애가 발생한 서비스로의 호출을 차단하여 장애 전파를 방지합니다. 빠른 실패(Fast Fail)로 리소스를 보존합니다.', when: '하위 서비스 장애가 지속될 때', color: '#06b6d4' },
              { icon: '🔄', name: 'Retry', desc: '일시적 오류에 대해 자동으로 재시도합니다. 지수 백오프와 Jitter를 함께 사용하는 것이 권장됩니다.', when: '네트워크 타임아웃, 일시적 503 등', color: '#f59e0b' },
              { icon: '⏱️', name: 'Timeout', desc: '호출에 대한 최대 대기 시간을 설정하여 무한 대기를 방지합니다. 스레드가 영원히 점유되는 것을 막습니다.', when: '응답 지연이 비정상적으로 길 때', color: '#ef4444' },
              { icon: '🧱', name: 'Bulkhead', desc: '리소스(스레드, 커넥션)를 격리하여 한 서비스의 장애가 전체 리소스를 고갈시키지 않도록 합니다.', when: '특정 서비스 호출이 리소스를 독점할 때', color: '#a855f7' },
              { icon: '🚦', name: 'Rate Limiter', desc: '일정 시간 내 허용할 요청 수를 제한하여 서비스 과부하를 방지합니다. 트래픽 급증으로부터 보호합니다.', when: '트래픽 급증, API 남용 방지', color: '#22c55e' },
            ].map((p) => (
              <div key={p.name} className="cb-pattern" style={{ borderTop: `2px solid ${p.color}` }}>
                <div className="cb-pattern-icon">{p.icon}</div>
                <div className="cb-pattern-name" style={{ color: p.color }}>{p.name}</div>
                <div className="cb-pattern-desc">{p.desc}</div>
                <div className="cb-pattern-when">
                  <strong style={{ color: p.color, fontSize: '10px' }}>사용 시점:</strong> {p.when}
                </div>
              </div>
            ))}
          </div>

          {/* 조합 예시 */}
          <div style={{ margin: '20px 0 12px' }}>
            <DiagramContainer title="Resilience 패턴 조합 (실행 순서)">
              <DiagramGroup label="Resilience Stack" color="#3b82f6">
                <DiagramFlow vertical>
                  <DiagramNode icon="📤" label="요청" color="#3b82f6" />
                  <DiagramArrow vertical color="#22c55e" />
                  <DiagramNode icon="🚦" label="Rate Limiter" color="#22c55e" sub="초과 시 429" />
                  <DiagramArrow vertical color="#ef4444" />
                  <DiagramNode icon="⏱️" label="Timeout" color="#ef4444" sub="시간 초과 시 예외" />
                  <DiagramArrow vertical color="#06b6d4" />
                  <DiagramNode icon="🔌" label="Circuit Breaker" color="#06b6d4" sub="OPEN 시 Fast Fail" />
                  <DiagramArrow vertical color="#a855f7" />
                  <DiagramNode icon="🧱" label="Bulkhead" color="#a855f7" sub="리소스 격리" />
                  <DiagramArrow vertical color="#f59e0b" />
                  <DiagramNode icon="🔄" label="Retry" color="#f59e0b" sub="일시적 실패 시 재시도" />
                  <DiagramArrow vertical color="#3b82f6" />
                  <DiagramNode icon="⚡" label="실제 서비스 호출" color="#3b82f6" />
                </DiagramFlow>
              </DiagramGroup>
              <div style={{ textAlign: 'center', marginTop: '12px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#64748b' }}>
                각 패턴이 서로 다른 레벨의 보호를 제공하여 전체 시스템의 회복 탄력성을 극대화합니다
              </div>
            </DiagramContainer>
          </div>
        </div>

        {/* 한눈에 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>한눈에 비교</SectionTitle>

          {/* CB 상태별 비교 */}
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginBottom: '12px' }}>Circuit Breaker 상태별 동작</div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '24px' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>상태</th>
                  <th>요청 처리</th>
                  <th>실패 기록</th>
                  <th>전환 조건</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CLOSED', '모든 요청 통과', '실패율 모니터링', '실패율 > 임계값 → OPEN', '#22c55e'],
                  ['OPEN', '즉시 거부 (Fast Fail)', '기록하지 않음', 'timeout 경과 → HALF_OPEN', '#ef4444'],
                  ['HALF_OPEN', '제한된 시험 요청만 통과', '성공/실패 판단', '성공 → CLOSED / 실패 → OPEN', '#f59e0b'],
                ].map(([state, handling, recording, condition, color]) => (
                  <tr key={state}>
                    <td style={{ color: color as string, fontWeight: 700 }}>{state}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{handling}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{recording}</td>
                    <td style={{ color: '#5a6a85', fontSize: '12px' }}>{condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resilience 패턴 비교 */}
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginBottom: '12px' }}>Resilience 패턴 비교</div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>패턴</th>
                  <th>목적</th>
                  <th>동작 방식</th>
                  <th>적용 시점</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Circuit Breaker', '장애 전파 차단', '실패율 기반 상태 전이, Fast Fail', '하위 서비스 장애 지속', '#06b6d4'],
                  ['Retry', '일시적 오류 복구', '실패 시 자동 재시도 (백오프)', '네트워크 글리치, 일시적 503', '#f59e0b'],
                  ['Timeout', '무한 대기 방지', '최대 대기 시간 설정', '응답 지연 비정상', '#ef4444'],
                  ['Bulkhead', '리소스 격리', '서비스별 스레드/커넥션 풀 분리', '리소스 독점 방지', '#a855f7'],
                  ['Rate Limiter', '요청량 제한', '시간당 최대 요청 수 제한', '트래픽 급증, API 남용', '#22c55e'],
                ].map(([pattern, purpose, behavior, timing, color]) => (
                  <tr key={pattern}>
                    <td style={{ color: color as string, fontWeight: 700 }}>{pattern}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{purpose}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{behavior}</td>
                    <td style={{ color: '#5a6a85', fontSize: '12px' }}>{timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            {
              q: 'Circuit Breaker의 3가지 상태와 전이 조건을 설명해주세요.',
              a: 'Circuit Breaker는 CLOSED, OPEN, HALF_OPEN 3가지 상태를 가집니다. CLOSED(정상)에서 실패율이 임계값을 초과하면 OPEN으로 전환됩니다. OPEN(차단)에서는 모든 요청을 즉시 거부(Fast Fail)하며, 설정된 timeout이 경과하면 HALF_OPEN으로 전환됩니다. HALF_OPEN(시험)에서는 제한된 수의 시험 요청을 통과시켜 서비스 복구를 확인하고, 성공하면 CLOSED로 복귀, 실패하면 다시 OPEN으로 전환됩니다.',
            },
            {
              q: 'Retry와 Circuit Breaker를 함께 사용할 때 순서가 중요한 이유는?',
              a: '실무에서는 CircuitBreaker를 바깥, Retry를 안쪽에 배치하는 것을 권장합니다. 이렇게 하면 CB가 OPEN 상태일 때 Retry 자체를 실행하지 않아 불필요한 재시도를 방지합니다. 반대로 Retry가 바깥이면(Resilience4j 기본 순서) CB가 OPEN이어도 Retry가 CallNotPermittedException을 받고 재시도하여 의미 없는 호출이 반복됩니다. Resilience4j에서는 @CircuitBreaker(order=1), @Retry(order=2)로 Spring AOP order를 명시하여 CB를 바깥으로 커스터마이즈할 수 있습니다.',
            },
            {
              q: 'Exponential Backoff에 Jitter를 추가하는 이유는?',
              a: 'Exponential Backoff만 사용하면 동시에 실패한 여러 클라이언트가 동일한 간격(2초, 4초, 8초...)으로 재시도하여 서버에 동시 요청이 몰리는 Thundering Herd 문제가 발생합니다. Jitter(랜덤 변동)를 추가하면 각 클라이언트의 재시도 시점이 분산되어 서버 부하를 고르게 분배할 수 있습니다. 예를 들어 기본 2초에 0~1초의 Jitter를 추가하면 2.0초~3.0초 사이에 분산됩니다.',
            },
            {
              q: 'Circuit Breaker의 fallback 전략에는 어떤 것들이 있는가?',
              a: '크게 4가지 전략이 있습니다. (1) 기본값 반환 — 캐시된 데이터나 기본 추천 목록을 반환합니다. (2) 대체 서비스 호출 — Primary 실패 시 Secondary 서비스를 호출합니다. (3) 에러 응답 — 사용자에게 명확한 에러 메시지를 반환합니다. (4) 큐에 저장 — 요청을 메시지 큐에 넣고 나중에 처리합니다. 서비스의 비즈니스 중요도와 특성에 따라 적절한 전략을 선택합니다.',
            },
            {
              q: '어떤 상황에서 Retry를 하면 안 되는가?',
              a: '비즈니스 로직 오류(400, 401, 403, 404)에는 재시도가 의미 없습니다. 요청 자체가 잘못되었거나 권한이 없는 경우 몇 번을 재시도해도 결과가 같기 때문입니다. 또한 멱등성이 보장되지 않는 요청(예: 결제 API에서 POST 요청)은 재시도 시 중복 처리 위험이 있습니다. 서버 과부하(503) 상황에서 Backoff 없이 즉시 재시도하면 오히려 서버 부하를 가중시킬 수 있으므로 주의해야 합니다.',
            },
            {
              q: 'Bulkhead 패턴이란 무엇이고 Circuit Breaker와 어떻게 다른가?',
              a: 'Bulkhead는 선박의 격벽(bulkhead)에서 유래한 패턴으로, 서비스별로 리소스(스레드, 커넥션 풀)를 격리하여 한 서비스의 장애가 전체 리소스를 고갈시키지 않도록 합니다. Circuit Breaker가 "장애 감지 후 차단"이라면, Bulkhead는 "장애 발생 전에 리소스를 미리 격리"하는 예방적 패턴입니다. 둘을 함께 사용하면 Bulkhead가 리소스 격리를, Circuit Breaker가 장애 서비스 차단을 담당하여 더 강력한 회복 탄력성을 확보할 수 있습니다.',
            },
            {
              q: 'Resilience4j에서 slidingWindow가 COUNT_BASED와 TIME_BASED일 때 차이는?',
              a: 'COUNT_BASED는 최근 N개의 호출 결과를 기반으로 실패율을 계산합니다. slidingWindowSize가 10이면 최근 10개 호출 중 실패 비율을 봅니다. TIME_BASED는 최근 N초 동안의 호출 결과를 기반으로 합니다. slidingWindowSize가 10이면 최근 10초간의 모든 호출 실패율을 계산합니다. COUNT_BASED는 트래픽이 적을 때도 일관되게 동작하고, TIME_BASED는 시간 기반으로 더 최신 상태를 반영합니다. 서비스 트래픽 패턴에 따라 선택합니다.',
            },
          ]} />
        </div>
      </div>
    </>
  )
}

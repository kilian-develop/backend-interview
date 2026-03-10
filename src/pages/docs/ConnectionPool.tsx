import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { CodeBlock } from '../../components/doc/CodeBlock'
import AnimationControls from '../../components/doc/AnimationControls'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup, DiagramGrid } from '../../components/doc/Diagram'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.cp-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.cp-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.cp-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.cp-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.cp-card-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.cp-card-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.cp-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.cp-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.cp-param:hover { transform:translateY(-3px); }
.cp-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.cp-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.cp-param-rec { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.cp-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.cp-anim-pool { display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin:16px 0; }
.cp-conn { width:56px; height:56px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; border:2px solid #1a2234; transition:all .4s ease; position:relative; }
.cp-conn.idle { background:rgba(34,197,94,0.08); border-color:#22c55e; color:#22c55e; }
.cp-conn.active { background:rgba(59,130,246,0.12); border-color:#3b82f6; color:#3b82f6; box-shadow:0 0 16px rgba(59,130,246,0.2); }
.cp-conn.waiting { background:rgba(245,158,11,0.08); border-color:#f59e0b; color:#f59e0b; animation:cp-pulse 1s infinite; }
.cp-conn.timeout { background:rgba(239,68,68,0.08); border-color:#ef4444; color:#ef4444; }
@keyframes cp-pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
.cp-requests { display:flex; flex-direction:column; gap:8px; margin:16px 0; }
.cp-req { display:flex; align-items:center; gap:10px; padding:8px 14px; border-radius:10px; border:1px solid #1a2234; background:#0e1118; font-size:11px; font-family:'JetBrains Mono',monospace; transition:all .4s ease; }
.cp-req.pending { border-color:#5a6a85; color:#5a6a85; }
.cp-req.assigned { border-color:#3b82f6; color:#3b82f6; }
.cp-req.done { border-color:#22c55e; color:#22c55e; }
.cp-req.wait { border-color:#f59e0b; color:#f59e0b; }
.cp-req.fail { border-color:#ef4444; color:#ef4444; }
.cp-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .cp-compare-grid{ grid-template-columns:1fr; } }
.cp-compare-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.cp-compare-card:hover { transform:translateY(-4px); }
.cp-prop-list { display:flex; flex-direction:column; gap:10px; }
.cp-prop-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.025); border-radius:8px; font-size:13px; gap:12px; }
.cp-prop-label { color:#5a6a85; font-size:12px; white-space:nowrap; }
.cp-prop-val { font-weight:700; font-size:12px; text-align:right; }
.cp-good { color:#22c55e; } .cp-bad { color:#ef4444; } .cp-neutral { color:#94a3b8; } .cp-blue { color:#3b82f6; } .cp-orange { color:#f97316; } .cp-cyan { color:#06b6d4; }
.cp-scenario-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.cp-scenario { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.cp-scenario:hover { transform:translateY(-3px); }
.cp-scenario-icon { font-size:28px; margin-bottom:10px; }
.cp-scenario-title { font-size:15px; font-weight:800; margin-bottom:8px; }
.cp-scenario-section { margin-bottom:10px; }
.cp-scenario-label { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:4px; }
.cp-scenario-text { font-size:12px; color:#5a6a85; line-height:1.7; }
.cp-feature-item { display:flex; align-items:flex-start; gap:10px; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; }
.cp-feature-icon { font-size:18px; flex-shrink:0; }
.cp-feature-text { font-size:12px; color:#94a3b8; line-height:1.7; }
.cp-feature-title { font-weight:700; margin-bottom:2px; }
.cp-hikari-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; }
.cp-hikari-item { padding:16px; border-radius:12px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); }
.cp-hikari-name { font-size:13px; font-weight:700; margin-bottom:6px; }
.cp-hikari-desc { font-size:11px; color:#5a6a85; line-height:1.7; }
`

export default function ConnectionPool() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 커넥션 풀 동작을 확인해보세요', color: '#5a6a85' })

  // 5개 커넥션 상태: 'idle' | 'active' | 'waiting' | 'timeout'
  const [conns, setConns] = useState<string[]>(['idle', 'idle', 'idle', 'idle', 'idle'])
  // 6개 요청 상태: 'hidden' | 'pending' | 'assigned' | 'done' | 'wait' | 'fail'
  const [reqs, setReqs] = useState<string[]>(['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'])

  useInjectCSS('style-connection-pool', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)

    const timeline: Array<{ s: number; delay: number; msg: string; mColor: string; c: string[]; r: string[] }> = [
      {
        s: 1, delay: 400,
        msg: '① Pool에 5개 커넥션이 미리 생성되어 대기 중 (idle)',
        mColor: '#22c55e',
        c: ['idle', 'idle', 'idle', 'idle', 'idle'],
        r: ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'],
      },
      {
        s: 2, delay: 1600,
        msg: '② 요청 1, 2, 3이 들어와 커넥션을 빌려감 (idle → active)',
        mColor: '#3b82f6',
        c: ['active', 'active', 'active', 'idle', 'idle'],
        r: ['assigned', 'assigned', 'assigned', 'hidden', 'hidden', 'hidden'],
      },
      {
        s: 3, delay: 3200,
        msg: '③ 요청 1 완료 → 커넥션 반납 (active → idle)',
        mColor: '#22c55e',
        c: ['idle', 'active', 'active', 'idle', 'idle'],
        r: ['done', 'assigned', 'assigned', 'hidden', 'hidden', 'hidden'],
      },
      {
        s: 4, delay: 4600,
        msg: '④ 요청 4 도착 → 반납된 커넥션 재사용!',
        mColor: '#06b6d4',
        c: ['active', 'active', 'active', 'idle', 'idle'],
        r: ['done', 'assigned', 'assigned', 'assigned', 'hidden', 'hidden'],
      },
      {
        s: 5, delay: 6000,
        msg: '⑤ 요청 5, 6 동시 도착 → 남은 idle 2개 할당, 풀 가득 참',
        mColor: '#3b82f6',
        c: ['active', 'active', 'active', 'active', 'active'],
        r: ['done', 'assigned', 'assigned', 'assigned', 'assigned', 'assigned'],
      },
      {
        s: 6, delay: 7400,
        msg: '⑥ 새 요청이 오면 대기(Wait Queue)에 들어감',
        mColor: '#f59e0b',
        c: ['active', 'active', 'active', 'active', 'active'],
        r: ['done', 'assigned', 'assigned', 'assigned', 'assigned', 'assigned'],
      },
      {
        s: 7, delay: 8800,
        msg: '⑦ 타임아웃 내 커넥션 확보 실패 시 → ConnectionTimeout 예외 발생',
        mColor: '#ef4444',
        c: ['active', 'active', 'active', 'active', 'active'],
        r: ['done', 'assigned', 'assigned', 'assigned', 'assigned', 'assigned'],
      },
    ]

    timeline.forEach(({ s, delay, msg, mColor, c, r }) => {
      schedule(() => {
        setStep(s)
        setStatus({ msg, color: mColor })
        setConns(c)
        setReqs(r)
      }, delay)
    })

    schedule(() => {
      setIsPlaying(false)
    }, 9600)
  }

  const handleReset = () => {
    reset()
    setConns(['idle', 'idle', 'idle', 'idle', 'idle'])
    setReqs(['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'])
    setStatus({ msg: '▶ 재생 버튼을 눌러 커넥션 풀 동작을 확인해보세요', color: '#5a6a85' })
  }

  const connLabels = ['C1', 'C2', 'C3', 'C4', 'C5']
  const reqLabels = ['Req 1', 'Req 2', 'Req 3', 'Req 4', 'Req 5', 'Req 6']

  const getConnStatusText = (s: string) => {
    switch (s) {
      case 'idle': return 'IDLE'
      case 'active': return 'ACTIVE'
      case 'waiting': return 'WAIT'
      case 'timeout': return 'FAIL'
      default: return ''
    }
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Backend · Performance · 면접 필수"
          title={<><span style={{ color: '#06b6d4' }}>Connection Pool</span></>}
          description={<>커넥션 생성 비용을 줄이고 성능을 극대화하는 커넥션 풀의 원리와 실무 설정 전략</>}
        />

        {/* ── 커넥션 풀이란? ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>커넥션 풀이란?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#06b6d4' }}>커넥션 풀(Connection Pool)</strong>은 미리 일정 수의 커넥션을
              생성해두고, 요청이 들어올 때 <strong style={{ color: '#3b82f6' }}>빌려주고</strong> 사용이 끝나면
              <strong style={{ color: '#22c55e' }}> 반납받아 재사용</strong>하는 방식입니다.
              매 요청마다 커넥션을 새로 생성하고 파괴하는 비용을 없애 성능을 극대화합니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px', marginBottom: '20px' }}>
              {[
                { icon: '🔄', title: '재사용', desc: '한 번 생성된 커넥션을 반복 사용하여 생성/파괴 비용 제거', color: '#06b6d4' },
                { icon: '⚡', title: '빠른 응답', desc: '미리 생성된 커넥션을 즉시 빌려 ~0.1ms만에 사용 가능', color: '#3b82f6' },
                { icon: '🛡️', title: '자원 보호', desc: 'DB 서버에 동시 접속 수를 제한하여 과부하 방지', color: '#22c55e' },
                { icon: '📊', title: '관리 용이', desc: '커넥션 수, 타임아웃, 누수 탐지 등 중앙 관리', color: '#a855f7' },
              ].map((item) => (
                <div key={item.title} style={{ padding: '16px', borderRadius: '12px', background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* 비교: 매번 생성 vs 풀 사용 */}
            <div className="cp-compare-grid" style={{ marginBottom: '20px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', marginBottom: '8px' }}>매번 커넥션 생성/종료</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                  요청마다 TCP Handshake + 인증 + 세션 초기화 반복<br/>
                  <strong style={{ color: '#ef4444' }}>~5-30ms</strong>의 오버헤드가 매번 발생<br/>
                  동시 요청 1000개 = 커넥션 1000개 시도 → DB 과부하
                </div>
              </div>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>커넥션 풀 사용</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                  미리 생성된 커넥션을 빌려서 사용 후 반납<br/>
                  <strong style={{ color: '#22c55e' }}>~0.1ms</strong>만에 커넥션 획득<br/>
                  동시 요청 1000개여도 풀 크기(예: 20개)로 DB 보호
                </div>
              </div>
            </div>

            {/* 커넥션 풀 구조 다이어그램 */}
            <DiagramContainer title="CONNECTION POOL 구조">
              <DiagramFlow vertical>
                <DiagramGroup label="Connection Pool" color="#3b82f6">
                  <DiagramFlow>
                    <DiagramNode label="Conn #1" sub="사용 중" color="#3b82f6" />
                    <DiagramNode label="Conn #2" sub="사용 중" color="#3b82f6" />
                    <DiagramNode label="Conn #3" sub="사용 중" color="#3b82f6" />
                    <DiagramNode label="Conn #4" sub="idle" color="#22c55e" />
                    <DiagramNode label="Conn #5" sub="idle" color="#22c55e" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramFlow>
                  <DiagramArrow vertical label="빌려줌" color="#3b82f6" />
                  <DiagramArrow vertical label="빌려줌" color="#3b82f6" />
                  <DiagramArrow vertical label="빌려줌" color="#3b82f6" />
                </DiagramFlow>
                <DiagramFlow>
                  <DiagramNode label="Req A" color="#3b82f6" />
                  <DiagramNode label="Req B" color="#3b82f6" />
                  <DiagramNode label="Req C" color="#3b82f6" />
                </DiagramFlow>
                <DiagramFlow style={{ marginTop: '12px', gap: '16px', justifyContent: 'center' }}>
                  <DiagramNode label="새 커넥션 생성" sub="TCP + Auth + Init = 5~30ms" color="#3b82f6" />
                  <DiagramNode label="풀에서 빌리기" sub="~0.1ms (300배 빠름)" color="#22c55e" />
                  <DiagramNode label="Req D → 재사용!" sub="완료 후 반납된 Conn 재사용" color="#06b6d4" />
                </DiagramFlow>
              </DiagramFlow>
            </DiagramContainer>
          </div>
        </div>

        {/* ── 커넥션 생성 비용 분석 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>커넥션 생성 비용 분석</SectionTitle>
          <div className="cp-compare-grid" style={{ marginBottom: '20px' }}>
            {/* DB 커넥션 */}
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', borderTop: '3px solid #06b6d4' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#06b6d4', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🗄️ DB 커넥션 생성
              </div>
              <div style={{ fontSize: '12px', color: '#5a6a85', marginBottom: '16px', fontFamily: "'JetBrains Mono',monospace" }}>MySQL, PostgreSQL 등</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { step: '1', label: 'TCP 3-Way Handshake', detail: '1 RTT (~1-5ms)', color: '#3b82f6' },
                  { step: '2', label: 'DB 인증', detail: '사용자/비밀번호 검증 (~2-5ms)', color: '#a855f7' },
                  { step: '3', label: '세션 초기화', detail: '인코딩, 타임존, 격리 수준 설정 (~1-3ms)', color: '#22c55e' },
                  { step: '4', label: '메모리 할당', detail: 'DB 서버 측 세션 메모리 (~5-10MB/conn)', color: '#f59e0b' },
                ].map((s) => (
                  <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.step}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>{s.label}</div>
                      <div style={{ fontSize: '11px', color: '#5a6a85' }}>{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '12px', color: '#ef4444', fontWeight: 700 }}>
                합계: ~5-30ms / 커넥션
              </div>
            </div>

            {/* HTTP 커넥션 */}
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', borderTop: '3px solid #3b82f6' }}>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#3b82f6', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🌐 HTTP 커넥션 생성
              </div>
              <div style={{ fontSize: '12px', color: '#5a6a85', marginBottom: '16px', fontFamily: "'JetBrains Mono',monospace" }}>외부 API 호출 시</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { step: '1', label: 'DNS 조회', detail: '도메인 → IP 변환 (~1-50ms)', color: '#06b6d4' },
                  { step: '2', label: 'TCP 3-Way Handshake', detail: '1 RTT (~1-5ms)', color: '#3b82f6' },
                  { step: '3', label: 'TLS 핸드셰이크 (HTTPS)', detail: '1-2 RTT (~5-30ms)', color: '#a855f7' },
                ].map((s) => (
                  <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, color: s.color, flexShrink: 0 }}>{s.step}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8' }}>{s.label}</div>
                      <div style={{ fontSize: '11px', color: '#5a6a85' }}>{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', fontSize: '12px', color: '#ef4444', fontWeight: 700 }}>
                합계: ~7-85ms / 커넥션 (HTTPS 기준)
              </div>
            </div>
          </div>

          {/* 실측 비교 */}
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '22px', marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#06b6d4', marginBottom: '12px' }}>실측 비교: 커넥션 생성 vs 풀에서 빌리기</div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontSize: '11px', color: '#5a6a85', marginBottom: '6px', fontFamily: "'JetBrains Mono',monospace" }}>새 커넥션 생성</div>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden', marginBottom: '4px' }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, #ef4444, #f59e0b)', borderRadius: '5px' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: 700 }}>~5-30ms</div>
              </div>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ fontSize: '11px', color: '#5a6a85', marginBottom: '6px', fontFamily: "'JetBrains Mono',monospace" }}>풀에서 빌리기</div>
                <div style={{ height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '5px', overflow: 'hidden', marginBottom: '4px' }}>
                  <div style={{ width: '1%', height: '100%', background: '#22c55e', borderRadius: '5px', minWidth: '4px' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 700 }}>~0.1ms (50~300배 빠름)</div>
              </div>
            </div>
          </div>

          <HighlightBox color="#06b6d4">
            <strong style={{ color: '#06b6d4' }}>핵심 포인트:</strong> 커넥션 생성은 단순히 "연결"만 하는 게 아니라 TCP 핸드셰이크, 인증, 세션 초기화, 메모리 할당까지 포함합니다. 초당 수백 건의 요청을 처리하는 서비스에서 매번 이 과정을 반복하면 심각한 성능 저하가 발생합니다.
          </HighlightBox>
        </div>

        {/* ── 커넥션 풀 동작 원리 (애니메이션) ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>커넥션 풀 동작 원리</SectionTitle>
          <div className="cp-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              풀에 <strong style={{ color: '#06b6d4' }}>5개의 커넥션</strong>이 미리 생성된 상태에서
              요청이 들어오고, 사용 후 반납되고, 재사용되고, 풀이 가득 차는 과정을 확인해보세요.
            </div>

            {/* 커넥션 풀 시각화 */}
            <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 700, color: '#5a6a85', fontFamily: "'JetBrains Mono',monospace" }}>CONNECTION POOL</div>
            <div className="cp-anim-pool">
              {connLabels.map((label, i) => (
                <div key={label} className={`cp-conn ${conns[i]}`}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '13px', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '8px', opacity: 0.7 }}>{getConnStatusText(conns[i])}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 대기 큐 표시 (step 6, 7) */}
            {step >= 6 && (
              <div style={{ textAlign: 'center', margin: '8px 0', padding: '8px 16px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', display: 'inline-flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: '#f59e0b', fontFamily: "'JetBrains Mono',monospace", width: '100%', justifyContent: 'center' }}>
                <span>⏳</span>
                <span>Wait Queue: 새 요청 대기 중{step >= 7 ? ' → ConnectionTimeout!' : '...'}</span>
                {step >= 7 && <span style={{ color: '#ef4444' }}>❌</span>}
              </div>
            )}

            {/* 요청 상태 */}
            <div style={{ marginTop: '16px', marginBottom: '8px', fontSize: '11px', fontWeight: 700, color: '#5a6a85', fontFamily: "'JetBrains Mono',monospace" }}>REQUESTS</div>
            <div className="cp-requests">
              {reqLabels.map((label, i) => {
                if (reqs[i] === 'hidden') return null
                return (
                  <div key={label} className={`cp-req ${reqs[i]}`}>
                    <span style={{ fontWeight: 700, minWidth: '50px' }}>{label}</span>
                    <span style={{ fontSize: '10px' }}>
                      {reqs[i] === 'pending' && '→ 대기 중...'}
                      {reqs[i] === 'assigned' && `→ ${connLabels[i < 3 ? i : i === 3 ? 0 : i - 2]} 사용 중`}
                      {reqs[i] === 'done' && '✓ 완료 (커넥션 반납)'}
                      {reqs[i] === 'wait' && '⏳ Wait Queue에서 대기 중'}
                      {reqs[i] === 'fail' && '✗ ConnectionTimeout 발생'}
                    </span>
                  </div>
                )
              })}
            </div>

            <AnimationControls color="#06b6d4" status={status} onPlay={play} onReset={handleReset} />

            {/* STEP-BY-STEP */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: "'JetBrains Mono',monospace" }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Pool 초기화: 5개 커넥션이 미리 생성되어 idle 상태로 대기', color: '#22c55e' },
                  { num: '②', text: '요청 1, 2, 3 도착 → 각각 C1, C2, C3 커넥션을 빌려감 (idle → active)', color: '#3b82f6' },
                  { num: '③', text: '요청 1 처리 완료 → C1 커넥션 반납 (active → idle)', color: '#22c55e' },
                  { num: '④', text: '요청 4 도착 → 반납된 C1 커넥션을 재사용 (새로 생성하지 않음!)', color: '#06b6d4' },
                  { num: '⑤', text: '요청 5, 6 동시 도착 → 남은 C4, C5 할당. 풀의 모든 커넥션이 active', color: '#3b82f6' },
                  { num: '⑥', text: '추가 요청이 오면 Wait Queue에 대기 (connectionTimeout 시간만큼)', color: '#f59e0b' },
                  { num: '⑦', text: '타임아웃 내 커넥션을 확보하지 못하면 ConnectionTimeout 예외 발생', color: '#ef4444' },
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

        {/* ── 핵심 설정 파라미터 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>핵심 설정 파라미터</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            HikariCP 기준 주요 설정 파라미터입니다. 각 값이 서로 연관되어 있으므로 <strong style={{ color: '#06b6d4' }}>전체적인 균형</strong>을 고려해 설정해야 합니다.
          </div>
          <div className="cp-param-grid">
            {[
              {
                name: 'maximumPoolSize',
                desc: '풀의 최대 커넥션 수. DB 서버의 max_connections, 서비스 수, 인스턴스 수를 함께 고려해야 합니다.',
                rec: '기본 10, 일반적으로 10~20',
                color: '#06b6d4',
              },
              {
                name: 'minimumIdle',
                desc: '풀에 유지할 최소 유휴 커넥션 수. HikariCP에서는 maximumPoolSize와 동일하게 설정하는 것을 권장합니다.',
                rec: 'maximumPoolSize와 동일 권장',
                color: '#3b82f6',
              },
              {
                name: 'connectionTimeout',
                desc: '풀에서 커넥션을 얻기까지 대기하는 최대 시간. 이 시간이 지나면 SQLException이 발생합니다.',
                rec: '기본 30초, 실무 3~5초 권장',
                color: '#a855f7',
              },
              {
                name: 'idleTimeout',
                desc: '사용하지 않는 유휴 커넥션을 풀에서 제거하기까지의 시간. minimumIdle 초과분에만 적용됩니다.',
                rec: '기본 600초 (10분)',
                color: '#22c55e',
              },
              {
                name: 'maxLifetime',
                desc: '커넥션의 최대 수명. DB의 wait_timeout보다 짧게 설정해야 stale connection을 방지할 수 있습니다.',
                rec: '기본 1800초, DB wait_timeout - 60초',
                color: '#f59e0b',
              },
              {
                name: 'validationTimeout',
                desc: '커넥션 유효성 검사(isValid()) 타임아웃. connectionTimeout보다 짧아야 합니다.',
                rec: '기본 5초',
                color: '#ef4444',
              },
              {
                name: 'leakDetectionThreshold',
                desc: '커넥션 누수 탐지 기준 시간. 이 시간 이상 반납되지 않으면 경고 로그를 출력합니다.',
                rec: '기본 0(비활성), 실무 2~5초',
                color: '#f97316',
              },
            ].map((p) => (
              <div key={p.name} className="cp-param" style={{ borderTop: `2px solid ${p.color}` }}>
                <div className="cp-param-name" style={{ color: p.color }}>{p.name}</div>
                <div className="cp-param-desc">{p.desc}</div>
                <span className="cp-param-rec" style={{ background: `${p.color}12`, border: `1px solid ${p.color}30`, color: p.color }}>{p.rec}</span>
              </div>
            ))}
          </div>

          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>주의:</strong> <code style={{ color: '#06b6d4' }}>maxLifetime</code>은 반드시 DB의 <code style={{ color: '#06b6d4' }}>wait_timeout</code>보다 짧게 설정해야 합니다. 그렇지 않으면 DB가 이미 닫은 커넥션을 풀에서 빌려주게 되어 <strong style={{ color: '#ef4444' }}>Stale Connection</strong> 오류가 발생합니다.
          </HighlightBox>
        </div>

        {/* ── Pool Sizing 전략 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>Pool Sizing 전략 — 얼마나 크게?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              HikariCP의 공식 권장 공식은 다음과 같습니다:
            </div>
            <div style={{ padding: '16px 20px', background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: '12px', marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#06b6d4', fontFamily: "'JetBrains Mono',monospace" }}>
                connections = (core_count × 2) + effective_spindle_count
              </div>
              <div style={{ fontSize: '11px', color: '#5a6a85', marginTop: '8px' }}>
                effective_spindle_count = HDD 스핀들 수 (SSD의 경우 0 또는 1로 계산)
              </div>
            </div>

            {/* 왜 많다고 좋지 않은가 */}
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', marginBottom: '12px' }}>커넥션이 많다고 좋은 게 아닌 이유</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {[
                { icon: '🔄', title: 'Context Switching 오버헤드', desc: 'DB 서버가 수백 개의 커넥션을 동시에 처리하면 CPU가 컨텍스트 스위칭에 대부분의 시간을 소비합니다.', color: '#ef4444' },
                { icon: '💾', title: '메모리 소비', desc: 'MySQL 기준 커넥션당 약 ~5-10MB의 메모리를 할당합니다. 커넥션 200개 = 최대 2GB 메모리 점유.', color: '#f59e0b' },
                { icon: '🔒', title: 'Lock Contention 증가', desc: '동시에 같은 데이터에 접근하는 트랜잭션이 많을수록 Lock 대기 시간이 증가하여 오히려 처리량(TPS)이 감소합니다.', color: '#a855f7' },
              ].map((item) => (
                <div key={item.title} className="cp-feature-item">
                  <div className="cp-feature-icon">{item.icon}</div>
                  <div>
                    <div className="cp-feature-title" style={{ color: item.color, fontSize: '13px' }}>{item.title}</div>
                    <div className="cp-feature-text">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* 실무 가이드라인 */}
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '12px' }}>실무 가이드라인</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'CPU 바운드 작업', value: '코어 수 근처', desc: '복잡한 연산 쿼리 위주', color: '#3b82f6' },
                { label: 'I/O 바운드 작업', value: '코어 수 × 2~4', desc: '단순 CRUD 위주', color: '#22c55e' },
                { label: '일반적 시작점', value: '10~20개', desc: '모니터링 후 조정', color: '#06b6d4' },
              ].map((g) => (
                <div key={g.label} style={{ padding: '14px', borderRadius: '10px', background: `${g.color}08`, border: `1px solid ${g.color}20` }}>
                  <div style={{ fontSize: '11px', color: '#5a6a85', marginBottom: '4px' }}>{g.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: g.color }}>{g.value}</div>
                  <div style={{ fontSize: '10px', color: '#5a6a85', marginTop: '4px' }}>{g.desc}</div>
                </div>
              ))}
            </div>

            {/* 멀티 서비스 환경 */}
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#a855f7', marginBottom: '12px' }}>여러 서비스가 하나의 DB를 공유하는 경우</div>
            <div style={{ padding: '16px 20px', background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: '12px', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 900, color: '#a855f7', fontFamily: "'JetBrains Mono',monospace" }}>
                서비스별 pool size = DB max_connections / 서비스 수 / 인스턴스 수
              </div>
            </div>

            {/* 멀티 서비스 풀 배분 다이어그램 */}
            <DiagramContainer title="멀티 서비스 커넥션 풀 배분">
              <DiagramFlow vertical>
                <DiagramNode icon="🗄" label="DB Server" sub="max_connections = 200 / 여유분 20 = 사용 가능 180" color="#3b82f6" />
                <DiagramFlow>
                  <DiagramArrow vertical color="#06b6d4" />
                  <DiagramArrow vertical color="#a855f7" />
                  <DiagramArrow vertical color="#22c55e" />
                </DiagramFlow>
                <DiagramGrid cols={3}>
                  <DiagramGroup label="Service A (pool_size=20)" color="#06b6d4">
                    <DiagramFlow vertical>
                      <DiagramNode label="Instance 1" sub="20 conn" color="#06b6d4" />
                      <DiagramNode label="Instance 2" sub="20 conn" color="#06b6d4" />
                      <DiagramNode label="Instance 3" sub="20 conn" color="#06b6d4" />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramGroup label="Service B (pool_size=20)" color="#a855f7">
                    <DiagramFlow vertical>
                      <DiagramNode label="Instance 1" sub="20 conn" color="#a855f7" />
                      <DiagramNode label="Instance 2" sub="20 conn" color="#a855f7" />
                      <DiagramNode label="Instance 3" sub="20 conn" color="#a855f7" />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramGroup label="Service C (pool_size=20)" color="#22c55e">
                    <DiagramFlow vertical>
                      <DiagramNode label="Instance 1" sub="20 conn" color="#22c55e" />
                      <DiagramNode label="Instance 2" sub="20 conn" color="#22c55e" />
                      <DiagramNode label="Instance 3" sub="20 conn" color="#22c55e" />
                    </DiagramFlow>
                  </DiagramGroup>
                </DiagramGrid>
                <DiagramNode label="총 사용 커넥션 = 20 x 3 x 3 = 180" sub="max_connections 이내" color="#3b82f6" />
              </DiagramFlow>
            </DiagramContainer>
          </div>

          <HighlightBox color="#22c55e">
            <strong style={{ color: '#22c55e' }}>면접 포인트:</strong> "커넥션 풀 크기는 크면 클수록 좋다"는 흔한 오해입니다. 4코어 서버에서 커넥션 풀을 10으로 설정한 것이 50으로 설정한 것보다 더 높은 TPS를 보이는 경우가 많습니다. 핵심은 <strong style={{ color: '#06b6d4' }}>DB가 동시에 효율적으로 처리할 수 있는 수</strong>만큼만 커넥션을 유지하는 것입니다.
          </HighlightBox>
        </div>

        {/* ── HikariCP 상세 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>DB Connection Pool — HikariCP 상세</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#06b6d4' }}>HikariCP</strong>는 Spring Boot 2+ 기본 커넥션 풀로,
              <strong style={{ color: '#22c55e' }}> 가장 빠르고 가벼운</strong> JDBC 커넥션 풀 라이브러리입니다.
              바이트코드 레벨의 최적화를 통해 다른 풀 대비 압도적인 성능을 제공합니다.
            </div>

            {/* 핵심 최적화 기법 */}
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#06b6d4', marginBottom: '12px' }}>핵심 최적화 기법</div>
            <div className="cp-hikari-grid" style={{ marginBottom: '20px' }}>
              {[
                { name: 'ConcurrentBag', desc: 'Lock-free 자료구조로 커넥션 관리. ThreadLocal을 활용해 동일 스레드가 이전에 사용한 커넥션을 우선 반환하여 캐시 히트율 극대화.', color: '#06b6d4' },
                { name: 'FastList', desc: 'ArrayList를 대체하는 커스텀 구현. range check를 제거하고, get()과 remove()를 최적화하여 ~30% 성능 향상.', color: '#3b82f6' },
                { name: 'Javassist 프록시', desc: '바이트코드 레벨에서 Connection, Statement 프록시를 생성. JDK Dynamic Proxy 대비 오버헤드 최소화.', color: '#a855f7' },
              ].map((h) => (
                <div key={h.name} className="cp-hikari-item" style={{ borderTop: `2px solid ${h.color}` }}>
                  <div className="cp-hikari-name" style={{ color: h.color }}>{h.name}</div>
                  <div className="cp-hikari-desc">{h.desc}</div>
                </div>
              ))}
            </div>

            {/* 실무 설정 예시 */}
            <CodeBlock title="실무 설정 예시" lang="YAML" style={{ marginBottom: '16px' }}>
{`spring:
  datasource:
    hikari:
      maximum-pool-size: 10        # 최대 커넥션 수
      minimum-idle: 10             # 최소 유휴 커넥션 (= max 권장)
      connection-timeout: 3000     # 커넥션 대기 타임아웃 (3초)
      idle-timeout: 600000         # 유휴 커넥션 제거 (10분)
      max-lifetime: 1800000        # 커넥션 최대 수명 (30분)
      leak-detection-threshold: 2000  # 누수 탐지 (2초)`}
            </CodeBlock>

            {/* 각 설정값 설명 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { param: 'maximum-pool-size: 10', desc: '동시에 유지할 최대 커넥션 수. DB max_connections, 서비스/인스턴스 수를 고려하여 산정합니다.', color: '#06b6d4' },
                { param: 'minimum-idle: 10', desc: 'HikariCP 공식 문서에서는 maximumPoolSize와 동일하게 설정하여 풀 크기를 고정하는 것을 권장합니다.', color: '#3b82f6' },
                { param: 'connection-timeout: 3000', desc: '기본값 30초는 너무 깁니다. 3~5초로 줄여 장애 상황에서 빠르게 실패(fail-fast)하도록 합니다.', color: '#a855f7' },
                { param: 'max-lifetime: 1800000', desc: 'MySQL wait_timeout(기본 28800초) 보다 충분히 짧게. 커넥션 재생성을 분산하기 위해 HikariCP가 내부적으로 ±2.5%의 jitter를 적용합니다.', color: '#f59e0b' },
                { param: 'leak-detection-threshold: 2000', desc: '2초 이상 반납되지 않은 커넥션의 스택 트레이스를 경고 로그로 출력합니다. 개발/스테이징에서 반드시 활성화하세요.', color: '#ef4444' },
              ].map((s) => (
                <div key={s.param} className="cp-feature-item">
                  <div style={{ fontSize: '11px', fontWeight: 700, color: s.color, fontFamily: "'JetBrains Mono',monospace", minWidth: '200px', flexShrink: 0 }}>{s.param}</div>
                  <div className="cp-feature-text">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HTTP Connection Pool ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>HTTP Connection Pool</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              DB 커넥션뿐 아니라 <strong style={{ color: '#3b82f6' }}>HTTP 커넥션도 풀링</strong>합니다.
              외부 API를 호출할 때마다 TCP + TLS 핸드셰이크를 반복하면 큰 오버헤드가 됩니다.
              <strong style={{ color: '#22c55e' }}> Keep-Alive</strong>와 함께 HTTP 커넥션 풀을 사용하면 기존 커넥션을 재사용할 수 있습니다.
            </div>

            {/* HTTP 클라이언트 비교 */}
            <div className="cp-grid" style={{ marginBottom: '20px' }}>
              {[
                {
                  name: 'RestTemplate',
                  badge: 'Deprecated',
                  badgeColor: '#ef4444',
                  desc: 'Spring 5 이전의 동기 HTTP 클라이언트. 기본적으로 매 요청마다 커넥션을 생성합니다. Apache HttpClient로 커넥션 풀링 가능.',
                  color: '#ef4444',
                },
                {
                  name: 'WebClient',
                  badge: 'Reactive',
                  badgeColor: '#a855f7',
                  desc: 'Spring WebFlux 기반 비동기 HTTP 클라이언트. Netty의 커넥션 풀을 내장하여 기본적으로 커넥션 재사용.',
                  color: '#a855f7',
                },
                {
                  name: 'RestClient',
                  badge: 'Spring 6.1+',
                  badgeColor: '#22c55e',
                  desc: 'Spring 6.1에서 추가된 동기 HTTP 클라이언트. RestTemplate의 대체. 내부적으로 HttpClient를 사용하여 풀링 지원.',
                  color: '#22c55e',
                },
                {
                  name: 'Apache HttpClient',
                  badge: 'Low-Level',
                  badgeColor: '#3b82f6',
                  desc: 'PoolingHttpClientConnectionManager로 상세한 풀 설정 가능. maxTotal, defaultMaxPerRoute 등 세밀한 제어.',
                  color: '#3b82f6',
                },
                {
                  name: 'OkHttp',
                  badge: 'Square',
                  badgeColor: '#06b6d4',
                  desc: 'ConnectionPool 클래스로 유휴 커넥션 수와 keep-alive 시간 설정. Android 및 서버 환경 모두 사용.',
                  color: '#06b6d4',
                },
              ].map((h) => (
                <div key={h.name} className="cp-card" style={{ borderTop: `2px solid ${h.color}` }}>
                  <div className="cp-card-badge" style={{ color: h.badgeColor, background: `${h.badgeColor}12` }}>{h.badge}</div>
                  <div className="cp-card-title" style={{ color: h.color }}>{h.name}</div>
                  <div className="cp-card-desc">{h.desc}</div>
                </div>
              ))}
            </div>

            {/* 설정 포인트 */}
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6', marginBottom: '12px' }}>주요 설정 포인트</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {[
                { param: 'maxConnections', desc: '전체 최대 커넥션 수. 모든 호스트에 대한 총 커넥션 제한.', color: '#3b82f6' },
                { param: 'maxConnectionsPerRoute', desc: '호스트(route)당 최대 커넥션 수. 특정 외부 서비스로의 동시 연결 제한.', color: '#06b6d4' },
                { param: 'keepAliveTimeout', desc: '유휴 커넥션의 keep-alive 유지 시간. 서버의 Keep-Alive 헤더와 맞춰야 함.', color: '#22c55e' },
                { param: 'connectionRequestTimeout', desc: '풀에서 커넥션을 얻기까지 대기 시간. DB 커넥션 풀의 connectionTimeout과 동일한 개념.', color: '#f59e0b' },
              ].map((s) => (
                <div key={s.param} className="cp-feature-item">
                  <div style={{ fontSize: '11px', fontWeight: 700, color: s.color, fontFamily: "'JetBrains Mono',monospace", minWidth: '180px', flexShrink: 0 }}>{s.param}</div>
                  <div className="cp-feature-text">{s.desc}</div>
                </div>
              ))}
            </div>

            {/* Keep-Alive 관계 */}
            <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>HTTP Keep-Alive와의 관계</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                <strong style={{ color: '#94a3b8' }}>Keep-Alive</strong>는 하나의 TCP 커넥션에서 여러 HTTP 요청을 처리하는 프로토콜 기능이고,
                <strong style={{ color: '#94a3b8' }}> Connection Pool</strong>은 이 Keep-Alive 커넥션들을 관리하는 구조입니다.
                HTTP/1.1에서는 Keep-Alive가 기본이며, 커넥션 풀은 이 유휴 커넥션들을 재사용하여 핸드셰이크 비용을 제거합니다.
              </div>
            </div>
          </div>
        </div>

        {/* ── 문제 상황과 해결 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>커넥션 풀 문제 상황과 해결</SectionTitle>
          <div className="cp-scenario-grid">
            {[
              {
                icon: '💥',
                title: '커넥션 고갈 (Pool Exhaustion)',
                color: '#ef4444',
                causes: '느린 쿼리가 커넥션을 오래 점유, 커넥션 미반납(누수), 풀 크기가 트래픽 대비 부족',
                solutions: 'connectionTimeout을 3~5초로 설정하여 빠르게 실패, 느린 쿼리 최적화(인덱스, 실행 계획 분석), 풀 크기 모니터링 후 조정',
              },
              {
                icon: '🚰',
                title: '커넥션 누수 (Connection Leak)',
                color: '#f59e0b',
                causes: 'try-with-resources 미사용, 예외 발생 시 close() 누락, @Transactional 없이 수동 커넥션 관리',
                solutions: 'leakDetectionThreshold 설정(2~5초), HikariCP 경고 로그 모니터링, try-with-resources 필수 사용',
              },
              {
                icon: '🧟',
                title: 'Stale Connection (좀비 커넥션)',
                color: '#a855f7',
                causes: 'DB 서버가 wait_timeout 초과 유휴 커넥션 종료, 방화벽이 유휴 TCP 커넥션 끊기, 네트워크 장애',
                solutions: 'maxLifetime < DB wait_timeout으로 설정, HikariCP가 자동으로 유효성 검사 수행(isValid()), keepalive 설정 활용',
              },
              {
                icon: '⚡',
                title: 'Thundering Herd (떼몰이)',
                color: '#3b82f6',
                causes: '서비스 재시작 시 모든 커넥션을 동시에 생성 시도, 장애 복구 후 대기 중이던 요청이 일시에 몰림',
                solutions: 'minimumIdle로 점진적 warm-up, HikariCP의 maxLifetime jitter(±2.5%) 활용, 서비스 시작 시 헬스체크 후 트래픽 투입',
              },
            ].map((s) => (
              <div key={s.title} className="cp-scenario" style={{ borderTop: `3px solid ${s.color}` }}>
                <div className="cp-scenario-icon">{s.icon}</div>
                <div className="cp-scenario-title" style={{ color: s.color }}>{s.title}</div>
                <div className="cp-scenario-section">
                  <div className="cp-scenario-label" style={{ color: '#ef4444' }}>CAUSE</div>
                  <div className="cp-scenario-text">{s.causes}</div>
                </div>
                <div className="cp-scenario-section">
                  <div className="cp-scenario-label" style={{ color: '#22c55e' }}>SOLUTION</div>
                  <div className="cp-scenario-text">{s.solutions}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DB Connection Pool vs Thread Pool ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>DB Connection Pool vs Thread Pool</SectionTitle>
          <div className="cp-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="cp-compare-card" style={{ borderTop: '3px solid #06b6d4', boxShadow: '0 0 30px rgba(6,182,212,0.1)' }}>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#06b6d4', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Connection Pool
              </div>
              <div style={{ fontSize: '12px', color: '#5a6a85', marginBottom: '20px', fontFamily: "'JetBrains Mono',monospace" }}>HikariCP, DBCP 등</div>
              <div className="cp-prop-list">
                {[
                  ['관리 대상', 'DB 커넥션', 'cyan'],
                  ['목적', '커넥션 생성 비용 절감', 'neutral'],
                  ['일반적 크기', '10~20개', 'good'],
                  ['병목 원인', '느린 쿼리, 커넥션 누수', 'bad'],
                  ['대표 구현', 'HikariCP, Druid, c3p0', 'neutral'],
                  ['설정 키워드', 'maximumPoolSize, connectionTimeout', 'cyan'],
                ].map(([label, val, type]) => (
                  <div key={label} className="cp-prop-row">
                    <span className="cp-prop-label">{label}</span>
                    <span className={`cp-prop-val cp-${type}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cp-compare-card" style={{ borderTop: '3px solid #a855f7', boxShadow: '0 0 30px rgba(168,85,247,0.1)' }}>
              <div style={{ fontSize: '20px', fontWeight: 900, color: '#a855f7', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                Thread Pool
              </div>
              <div style={{ fontSize: '12px', color: '#5a6a85', marginBottom: '20px', fontFamily: "'JetBrains Mono',monospace" }}>Tomcat, ExecutorService 등</div>
              <div className="cp-prop-list">
                {[
                  ['관리 대상', '스레드 (Thread)', 'orange'],
                  ['목적', '스레드 생성 비용 절감', 'neutral'],
                  ['일반적 크기', '100~200개', 'blue'],
                  ['병목 원인', 'CPU 과부하, 블로킹 I/O', 'bad'],
                  ['대표 구현', 'Tomcat Thread Pool, ForkJoinPool', 'neutral'],
                  ['설정 키워드', 'maxThreads, minSpareThreads', 'orange'],
                ].map(([label, val, type]) => (
                  <div key={label} className="cp-prop-row">
                    <span className="cp-prop-label">{label}</span>
                    <span className={`cp-prop-val cp-${type}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 둘의 관계 */}
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '28px', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginBottom: '16px' }}>둘의 관계: 스레드가 커넥션을 사용한다</div>
            <DiagramContainer title="THREAD POOL vs CONNECTION POOL">
              <DiagramFlow>
                <DiagramGroup label="Tomcat Thread Pool (200 threads)" color="#a855f7">
                  <DiagramFlow wrap>
                    <DiagramNode label="Thread-1" color="#a855f7" />
                    <DiagramNode label="Thread-2" color="#a855f7" />
                    <DiagramNode label="Thread-3" color="#a855f7" />
                    <DiagramNode label="..." color="#a855f7" />
                    <DiagramNode label="Thread-199" color="#a855f7" />
                    <DiagramNode label="Thread-200" color="#a855f7" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramArrow label="커넥션 획득" color="#3b82f6" />
                <DiagramGroup label="HikariCP Pool (10 connections)" color="#3b82f6">
                  <DiagramFlow vertical>
                    <DiagramNode label="Conn 1" color="#3b82f6" />
                    <DiagramNode label="Conn 2" color="#3b82f6" />
                    <DiagramNode label="..." color="#3b82f6" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramArrow label="쿼리 실행" color="#22c55e" />
                <DiagramNode icon="🗄" label="DB Server" color="#22c55e" />
              </DiagramFlow>
            </DiagramContainer>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px' }}>
              {[
                { label: 'Tomcat Thread Pool', value: '200개', desc: 'HTTP 요청을 동시에 처리할 수 있는 스레드 수', color: '#a855f7' },
                { label: 'HikariCP Pool', value: '10~20개', desc: '동시에 DB에 접근할 수 있는 커넥션 수', color: '#06b6d4' },
                { label: '핵심 포인트', value: '스레드 > 커넥션', desc: '모든 스레드가 동시에 DB를 사용하지는 않음', color: '#22c55e' },
              ].map((g) => (
                <div key={g.label} style={{ padding: '14px', borderRadius: '10px', background: `${g.color}08`, border: `1px solid ${g.color}20` }}>
                  <div style={{ fontSize: '11px', color: '#5a6a85', marginBottom: '4px' }}>{g.label}</div>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: g.color }}>{g.value}</div>
                  <div style={{ fontSize: '10px', color: '#5a6a85', marginTop: '4px' }}>{g.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <HighlightBox color="#a855f7">
            <strong style={{ color: '#a855f7' }}>핵심:</strong> 스레드 풀과 커넥션 풀은 <strong style={{ color: '#94a3b8' }}>1:1 관계가 아닙니다.</strong> 하나의 요청 처리 과정에서 DB에 접근하는 시간은 전체의 일부이므로, 스레드 200개에 커넥션 10~20개가 일반적인 조합입니다. 커넥션 풀이 너무 크면 DB 서버가 과부하되고, 너무 작으면 스레드가 커넥션 대기로 블로킹됩니다.
          </HighlightBox>
        </div>

        {/* ── 면접 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            {
              q: '커넥션 풀이 필요한 이유와 동작 원리를 설명해주세요.',
              a: 'DB 커넥션을 생성하려면 TCP 3-Way Handshake, 인증, 세션 초기화 등의 과정이 필요하여 ~5-30ms가 소요됩니다. 매 요청마다 이를 반복하면 큰 오버헤드입니다. 커넥션 풀은 미리 일정 수의 커넥션을 생성해두고, 요청이 오면 빌려주고, 사용 후 반납받아 재사용하는 방식입니다. 풀에서 빌리는 데는 ~0.1ms만 소요되어 50~300배 빠릅니다. 또한 DB에 동시 접속하는 커넥션 수를 제한하여 DB 서버를 보호하는 역할도 합니다.',
            },
            {
              q: 'HikariCP의 maximumPoolSize를 어떻게 결정하나요?',
              a: 'HikariCP 공식 공식은 connections = (core_count × 2) + effective_spindle_count입니다. 4코어 SSD 서버라면 ~9개 정도입니다. 핵심은 커넥션이 많다고 좋은 게 아니라는 것입니다. DB 서버에서 컨텍스트 스위칭 오버헤드, 메모리 소비, Lock Contention이 증가하여 오히려 TPS가 감소합니다. 일반적으로 10~20개로 시작하고, 모니터링(active connections, wait count)을 통해 조정합니다. 여러 서비스가 DB를 공유하면 max_connections / 서비스 수 / 인스턴스 수로 산정합니다.',
            },
            {
              q: '커넥션 누수란 무엇이고 어떻게 탐지하나요?',
              a: '커넥션 누수(Connection Leak)는 풀에서 빌린 커넥션을 사용 후 반납하지 않아 풀이 점점 고갈되는 현상입니다. 주로 try-with-resources 미사용, 예외 발생 시 close() 누락이 원인입니다. HikariCP의 leakDetectionThreshold를 설정하면 일정 시간(예: 2초) 이상 반납되지 않은 커넥션의 스택 트레이스를 경고 로그로 출력합니다. 이를 통해 어떤 코드에서 누수가 발생하는지 정확히 파악할 수 있습니다.',
            },
            {
              q: 'maxLifetime은 왜 DB의 wait_timeout보다 짧아야 하나요?',
              a: 'DB 서버는 wait_timeout(예: MySQL 기본 28800초) 동안 사용되지 않은 커넥션을 강제로 종료합니다. 만약 풀의 maxLifetime이 wait_timeout보다 길면, DB가 이미 닫은 커넥션을 풀에서 빌려주게 되어 "Stale Connection" 오류가 발생합니다. maxLifetime을 DB wait_timeout보다 충분히 짧게(예: 30분) 설정하면, HikariCP가 먼저 커넥션을 교체하여 이 문제를 방지합니다. HikariCP는 내부적으로 ±2.5%의 jitter를 적용하여 모든 커넥션이 동시에 재생성되는 것도 방지합니다.',
            },
            {
              q: '커넥션 풀 크기를 너무 크게 설정하면 어떤 문제가 발생하나요?',
              a: '세 가지 문제가 발생합니다. 첫째, DB 서버의 컨텍스트 스위칭 오버헤드가 증가합니다. 수백 개의 커넥션이 동시에 쿼리를 실행하면 CPU가 실제 작업보다 스위칭에 더 많은 시간을 씁니다. 둘째, 커넥션당 ~5-10MB의 메모리를 소비하여 DB 서버의 메모리가 부족해질 수 있습니다. 셋째, 동시에 같은 데이터에 접근하는 트랜잭션이 많아져 Lock Contention이 증가하고, 대기 시간이 늘어나 전체 TPS가 오히려 감소합니다.',
            },
            {
              q: 'Thread Pool과 Connection Pool의 관계를 설명해주세요.',
              a: 'Thread Pool은 HTTP 요청을 동시에 처리하는 스레드 관리, Connection Pool은 DB 커넥션 관리를 담당합니다. 스레드가 DB에 접근할 때 커넥션 풀에서 커넥션을 빌려 사용합니다. 모든 스레드가 동시에 DB를 사용하지는 않으므로, Tomcat 스레드 200개 + HikariCP 커넥션 10~20개가 일반적입니다. 스레드 수 > 커넥션 수이면 일부 스레드가 커넥션 대기(connectionTimeout)에 걸릴 수 있지만, 이는 정상적인 동작입니다.',
            },
            {
              q: '서비스가 여러 개일 때 커넥션 풀 크기를 어떻게 산정하나요?',
              a: '전체 사용 가능한 커넥션 수 = DB max_connections - 관리용 여유분(약 10~20%)입니다. 이를 서비스 수와 인스턴스 수로 나눕니다. 예를 들어 max_connections가 200이고 3개 서비스가 각 3개 인스턴스를 가진다면, 사용 가능 180 / 3 / 3 = 인스턴스당 20개입니다. Auto-scaling 환경에서는 최대 인스턴스 수를 기준으로 산정해야 합니다. 인스턴스가 늘어날 때 커넥션 총량이 max_connections를 초과하지 않도록 주의해야 합니다.',
            },
          ]} />
        </div>

        {/* ── 한눈에 비교 테이블 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '20px' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>파라미터</th>
                  <th style={{ width: '15%' }}>기본값</th>
                  <th style={{ width: '15%' }}>권장값</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['maximumPoolSize', '10', '10~20', '최대 커넥션 수. DB 서버 max_connections, 서비스/인스턴스 수 고려'],
                  ['minimumIdle', '= max', '= max', '최소 유휴 커넥션. HikariCP에서는 maximumPoolSize와 동일 권장'],
                  ['connectionTimeout', '30초', '3~5초', '커넥션 획득 대기 시간. 장애 시 빠른 실패를 위해 짧게 설정'],
                  ['idleTimeout', '10분', '10분', '유휴 커넥션 제거 시간. minimumIdle 초과분에만 적용'],
                  ['maxLifetime', '30분', 'DB wait_timeout - 60초', '커넥션 최대 수명. DB보다 짧게 설정하여 stale 방지'],
                  ['validationTimeout', '5초', '5초', '커넥션 유효성 검사 타임아웃. connectionTimeout보다 짧아야 함'],
                  ['leakDetectionThreshold', '0 (비활성)', '2~5초', '커넥션 누수 탐지. 개발/스테이징에서 필수 활성화'],
                ].map(([param, def, rec, desc]) => (
                  <tr key={param}>
                    <td style={{ color: '#06b6d4', fontWeight: 700, fontSize: '11px', fontFamily: "'JetBrains Mono',monospace" }}>{param}</td>
                    <td style={{ color: '#5a6a85', fontSize: '12px' }}>{def}</td>
                    <td style={{ color: '#22c55e', fontSize: '12px', fontWeight: 700 }}>{rec}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>비교 항목</th>
                  <th style={{ color: '#06b6d4' }}>Connection Pool</th>
                  <th style={{ color: '#a855f7' }}>Thread Pool</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['관리 대상', 'DB 커넥션', '스레드 (Thread)'],
                  ['목적', '커넥션 생성 비용 절감 + DB 보호', '스레드 생성 비용 절감 + 동시 처리'],
                  ['일반적 크기', '10~20개', '100~200개'],
                  ['관계', '스레드가 커넥션을 빌려 사용', '커넥션을 사용하는 주체'],
                  ['병목 원인', '느린 쿼리, 누수, 풀 부족', 'CPU 과부하, 블로킹 I/O'],
                  ['대표 구현', 'HikariCP, Druid', 'Tomcat, ForkJoinPool'],
                  ['Spring 설정', 'spring.datasource.hikari.*', 'server.tomcat.threads.*'],
                ].map(([label, cp, tp]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#67e8f9', fontSize: '12px' }}>{cp}</td>
                    <td style={{ color: '#c4b5fd', fontSize: '12px' }}>{tp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

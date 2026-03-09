import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.lb-algo-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.lb-algo { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.lb-algo:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(59,130,246,0.1); }
.lb-algo-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:12px; }
.lb-algo-title { font-size:16px; font-weight:800; margin-bottom:8px; }
.lb-algo-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:14px; }
.lb-algo-visual { font-size:11px; font-family:'JetBrains Mono',monospace; padding:12px 14px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); line-height:1.8; color:#94a3b8; }
.lb-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
@media(max-width:640px){ .lb-compare-grid{ grid-template-columns:1fr; } }
.lb-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.lb-card:hover { transform:translateY(-4px); }
.lb-card-title { font-size:20px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.lb-card-sub { font-size:12px; color:#5a6a85; margin-bottom:20px; font-family:'JetBrains Mono',monospace; }
.lb-prop-list { display:flex; flex-direction:column; gap:10px; }
.lb-prop-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.025); border-radius:8px; font-size:13px; gap:12px; }
.lb-prop-label { color:#5a6a85; font-size:12px; white-space:nowrap; }
.lb-prop-val { font-weight:700; font-size:12px; text-align:right; }
.lb-good { color:#22c55e; } .lb-bad { color:#ef4444; } .lb-neutral { color:#94a3b8; } .lb-blue { color:#3b82f6; } .lb-orange { color:#f97316; }
.lb-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.lb-anim-arena { display:flex; align-items:flex-start; justify-content:center; gap:8px; min-height:260px; position:relative; padding:16px 0; overflow-x:auto; }
.lb-anim-col { display:flex; flex-direction:column; align-items:center; gap:6px; }
.lb-anim-icon { width:52px; height:52px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; border:2px solid #1a2234; transition:all .3s; }
.lb-anim-label { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; }
.lb-anim-mid { display:flex; flex-direction:column; gap:8px; min-width:80px; justify-content:center; padding-top:16px; }
.lb-anim-arrow { display:flex; align-items:center; gap:6px; opacity:0; transform:translateX(-10px); transition:all .5s ease; }
.lb-anim-arrow.show { opacity:1; transform:translateX(0); }
.lb-anim-arrow.right { flex-direction:row; }
.lb-anim-arrow.left { flex-direction:row-reverse; transform:translateX(10px); }
.lb-anim-arrow.left.show { transform:translateX(0); }
.lb-anim-line { flex:1; height:2px; }
.lb-anim-tip { font-size:8px; font-weight:700; font-family:'JetBrains Mono',monospace; white-space:nowrap; padding:2px 6px; border-radius:4px; }
.lb-anim-arr-head { font-size:14px; line-height:1; }
.lb-servers { display:flex; flex-direction:column; gap:8px; padding-top:6px; }
.lb-server { display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:10px; border:1px solid #1a2234; background:#0e1118; font-size:10px; font-family:'JetBrains Mono',monospace; transition:all .4s ease; }
.lb-server.active { border-color:#22c55e; box-shadow:0 0 16px rgba(34,197,94,0.2); }
.lb-server-bar { height:6px; border-radius:3px; transition:width .5s ease; }
.lb-session-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; }
.lb-session { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.lb-session:hover { transform:translateY(-3px); }
.lb-session-title { font-size:15px; font-weight:800; margin-bottom:8px; }
.lb-session-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:12px; }
.lb-session-pros { display:flex; flex-direction:column; gap:4px; }
.lb-session-tag { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.lb-ha-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.lb-ha { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; }
.lb-ha-icon { font-size:28px; margin-bottom:8px; }
.lb-ha-name { font-size:14px; font-weight:700; margin-bottom:6px; }
.lb-ha-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
`

export default function LoadBalancing() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 로드밸런싱 흐름을 확인해보세요', color: '#5a6a85' })
  const [activeServer, setActiveServer] = useState(-1)
  const [loads, setLoads] = useState([0, 0, 0])
  useInjectCSS('style-load-balancing', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① 클라이언트 요청이 로드밸런서에 도착', color: '#3b82f6', srv: -1, ld: [0, 0, 0] },
      { s: 2, delay: 1200, msg: '② Round Robin — 첫 번째 요청 → Server A로 전달', color: '#22c55e', srv: 0, ld: [40, 0, 0] },
      { s: 3, delay: 2200, msg: '③ 두 번째 요청 → Server B로 전달', color: '#22c55e', srv: 1, ld: [40, 35, 0] },
      { s: 4, delay: 3200, msg: '④ 세 번째 요청 → Server C로 전달', color: '#22c55e', srv: 2, ld: [40, 35, 45] },
      { s: 5, delay: 4200, msg: '⑤ 네 번째 요청 → 다시 Server A (순환)', color: '#f59e0b', srv: 0, ld: [70, 35, 45] },
      { s: 6, delay: 5200, msg: '⑥ 모든 서버에 균등하게 분배 완료', color: '#22c55e', srv: -1, ld: [70, 65, 75] },
    ]
    timeline.forEach(({ s, delay, msg, color, srv, ld }) => {
      schedule(() => {
        setStep(s)
        setStatus({ msg, color })
        setActiveServer(srv)
        setLoads(ld)
      }, delay)
    })
    schedule(() => {
      setIsPlaying(false)
    }, 6000)
  }

  const handleReset = () => {
    reset()
    setActiveServer(-1)
    setLoads([0, 0, 0])
    setStatus({ msg: '▶ 재생 버튼을 눌러 로드밸런싱 흐름을 확인해보세요', color: '#5a6a85' })
  }

  const servers = [
    { name: 'Server A', emoji: '🖥️', color: '#3b82f6' },
    { name: 'Server B', emoji: '🖥️', color: '#22c55e' },
    { name: 'Server C', emoji: '🖥️', color: '#a855f7' },
  ]

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(34,197,94,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="High Availability · Scalability · L4/L7 · 면접 필수"
          title={<><span style={{ color: '#3b82f6' }}>로드밸런싱</span></>}
          description={<>트래픽을 여러 서버에 분산하여 가용성과 성능을 확보하는 핵심 기술 —<br />알고리즘, L4 vs L7, 세션 유지 전략까지</>}
        />

        {/* 로드밸런싱이란? */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>로드밸런싱이란?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#3b82f6' }}>로드밸런싱(Load Balancing)</strong>은 들어오는 네트워크 트래픽을
              <strong style={{ color: '#94a3b8' }}> 여러 서버에 균등하게 분배</strong>하는 기술입니다.
              한 서버에 트래픽이 집중되는 것을 방지하여 <strong style={{ color: '#22c55e' }}>고가용성(HA)</strong>과 <strong style={{ color: '#f59e0b' }}>확장성(Scalability)</strong>을 확보합니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px' }}>
              {[
                { icon: '⚖️', title: '부하 분산', desc: '트래픽을 여러 서버에 나눠 특정 서버의 과부하를 방지합니다.', color: '#3b82f6' },
                { icon: '🛡️', title: '고가용성 (HA)', desc: '서버 장애 시 다른 서버가 대신 처리하여 서비스 중단을 방지합니다.', color: '#22c55e' },
                { icon: '📈', title: '수평 확장', desc: '서버를 추가하는 것만으로 처리 용량을 늘릴 수 있습니다 (Scale-Out).', color: '#f59e0b' },
                { icon: '❤️', title: '헬스 체크', desc: '서버 상태를 주기적으로 확인하여 비정상 서버를 자동으로 제외합니다.', color: '#ef4444' },
              ].map((item) => (
                <div key={item.title} style={{ padding: '16px', borderRadius: '12px', background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* L4 vs L7 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>L4 vs L7 로드밸런서</SectionTitle>
          <div className="lb-compare-grid">
            <div className="lb-card" style={{ borderTop: '3px solid #3b82f6', boxShadow: '0 0 30px rgba(59,130,246,0.15)' }}>
              <div className="lb-card-title" style={{ color: '#3b82f6' }}>L4 로드밸런서</div>
              <div className="lb-card-sub">Transport Layer · TCP/UDP 기반</div>
              <div className="lb-prop-list">
                {[
                  ['동작 계층', 'OSI L4 (전송 계층)', 'blue'],
                  ['판단 기준', 'IP 주소 + 포트 번호', 'neutral'],
                  ['프로토콜 인식', '✗ 불가 (패킷 내용 모름)', 'bad'],
                  ['속도', '매우 빠름 (단순 포워딩)', 'good'],
                  ['SSL 처리', '✗ 불가', 'bad'],
                  ['헬스 체크', 'TCP 연결 확인 수준', 'neutral'],
                  ['대표 구현', 'NLB, HAProxy(TCP), LVS', 'neutral'],
                ].map(([label, val, type]) => (
                  <div key={label} className="lb-prop-row">
                    <span className="lb-prop-label">{label}</span>
                    <span className={`lb-prop-val lb-${type}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lb-card" style={{ borderTop: '3px solid #22c55e', boxShadow: '0 0 30px rgba(34,197,94,0.15)' }}>
              <div className="lb-card-title" style={{ color: '#22c55e' }}>L7 로드밸런서</div>
              <div className="lb-card-sub">Application Layer · HTTP/HTTPS 기반</div>
              <div className="lb-prop-list">
                {[
                  ['동작 계층', 'OSI L7 (응용 계층)', 'good'],
                  ['판단 기준', 'URL 경로, 헤더, 쿠키 등', 'good'],
                  ['프로토콜 인식', '✓ HTTP 내용 파악 가능', 'good'],
                  ['속도', '상대적으로 느림 (패킷 분석)', 'bad'],
                  ['SSL 처리', '✓ SSL Termination 가능', 'good'],
                  ['헬스 체크', 'HTTP 응답 코드 확인 가능', 'good'],
                  ['대표 구현', 'ALB, Nginx, HAProxy(HTTP)', 'neutral'],
                ].map(([label, val, type]) => (
                  <div key={label} className="lb-prop-row">
                    <span className="lb-prop-label">{label}</span>
                    <span className={`lb-prop-val lb-${type}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#3b82f6">
            <strong style={{ color: '#3b82f6' }}>선택 기준:</strong> 단순 TCP 포워딩과 고성능이 필요하면 L4, URL 기반 라우팅·SSL 처리·세밀한 제어가 필요하면 L7을 선택합니다. AWS에서는 NLB(L4)와 ALB(L7)로 구분됩니다.
          </HighlightBox>
        </div>

        {/* 로드밸런싱 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>Round Robin 로드밸런싱 시뮬레이션</SectionTitle>
          <div className="lb-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              가장 기본적인 <strong style={{ color: '#3b82f6' }}>Round Robin</strong> 방식으로 요청이 순차적으로 서버에 분배되는 과정입니다.
            </div>
            <div className="lb-anim-arena">
              {/* Clients */}
              <div className="lb-anim-col">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['📱', '💻', '🖥️'].map((e, i) => (
                    <div key={i} className="lb-anim-icon" style={{ background: 'rgba(59,130,246,0.08)', borderColor: step >= 1 ? '#3b82f6' : '#1a2234', width: '44px', height: '44px', fontSize: '18px' }}>{e}</div>
                  ))}
                </div>
                <div className="lb-anim-label">Clients</div>
              </div>

              {/* Client → LB */}
              <div className="lb-anim-mid">
                <div className={`lb-anim-arrow right ${step >= 1 ? 'show' : ''}`}>
                  <div className="lb-anim-tip" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>Requests</div>
                  <div className="lb-anim-line" style={{ background: 'linear-gradient(90deg,#3b82f6,rgba(59,130,246,0.3))' }} />
                  <div className="lb-anim-arr-head" style={{ color: '#3b82f6' }}>{'→'}</div>
                </div>
              </div>

              {/* Load Balancer */}
              <div className="lb-anim-col">
                <div className="lb-anim-icon" style={{ background: step >= 2 ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.06)', borderColor: '#f59e0b', width: '60px', height: '60px', fontSize: '28px' }}>⚖️</div>
                <div className="lb-anim-label" style={{ color: '#f59e0b' }}>Load Balancer</div>
                <div style={{ fontSize: '9px', color: '#5a6a85', fontFamily: 'JetBrains Mono,monospace', marginTop: '2px' }}>Round Robin</div>
              </div>

              {/* LB → Servers */}
              <div className="lb-anim-mid">
                <div className={`lb-anim-arrow right ${step >= 2 ? 'show' : ''}`}>
                  <div className="lb-anim-tip" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>Route</div>
                  <div className="lb-anim-line" style={{ background: 'linear-gradient(90deg,#22c55e,rgba(34,197,94,0.3))' }} />
                  <div className="lb-anim-arr-head" style={{ color: '#22c55e' }}>{'→'}</div>
                </div>
              </div>

              {/* Servers */}
              <div className="lb-anim-col">
                <div className="lb-servers">
                  {servers.map((srv, i) => (
                    <div key={srv.name} className={`lb-server ${activeServer === i ? 'active' : ''}`}>
                      <span style={{ fontSize: '16px' }}>{srv.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: srv.color, fontWeight: 700, marginBottom: '3px' }}>{srv.name}</div>
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '3px', height: '6px', width: '100%', overflow: 'hidden' }}>
                          <div className="lb-server-bar" style={{ width: `${loads[i]}%`, background: srv.color }} />
                        </div>
                      </div>
                      <span style={{ color: '#5a6a85', fontSize: '9px' }}>{loads[i]}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <AnimationControls color="#3b82f6" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '클라이언트 요청이 로드밸런서에 도착', color: '#3b82f6' },
                  { num: '②', text: '첫 번째 요청 → Server A로 전달', color: '#22c55e' },
                  { num: '③', text: '두 번째 요청 → Server B로 전달', color: '#22c55e' },
                  { num: '④', text: '세 번째 요청 → Server C로 전달', color: '#22c55e' },
                  { num: '⑤', text: '네 번째 요청 → 다시 Server A (순환 반복)', color: '#f59e0b' },
                  { num: '⑥', text: '모든 서버에 균등하게 부하 분산 완료', color: '#22c55e' },
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

        {/* 로드밸런싱 알고리즘 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>로드밸런싱 알고리즘</SectionTitle>
          <div className="lb-algo-grid">
            {[
              {
                badge: 'Static', badgeColor: '#3b82f6', badgeBg: 'rgba(59,130,246,0.12)',
                title: 'Round Robin', color: '#3b82f6',
                desc: '서버 목록을 순서대로 돌아가며 요청을 배분합니다. 가장 단순하고 서버 성능이 동일할 때 효과적입니다.',
                visual: 'Request 1 → Server A\nRequest 2 → Server B\nRequest 3 → Server C\nRequest 4 → Server A  (순환)',
              },
              {
                badge: 'Static', badgeColor: '#3b82f6', badgeBg: 'rgba(59,130,246,0.12)',
                title: 'Weighted Round Robin', color: '#06b6d4',
                desc: '서버에 가중치를 부여하여 성능이 좋은 서버에 더 많은 요청을 보냅니다. 서버 스펙이 다를 때 유용합니다.',
                visual: 'Server A (weight:3) → 3개 요청 처리\nServer B (weight:2) → 2개 요청 처리\nServer C (weight:1) → 1개 요청 처리',
              },
              {
                badge: 'Static', badgeColor: '#3b82f6', badgeBg: 'rgba(59,130,246,0.12)',
                title: 'IP Hash', color: '#a855f7',
                desc: '클라이언트 IP 주소를 해시하여 항상 같은 서버로 보냅니다. 별도 설정 없이 세션 일관성을 유지할 수 있습니다.',
                visual: 'hash(192.168.1.10) % 3 = 1 → Server B\nhash(10.0.0.5)     % 3 = 0 → Server A\n같은 IP는 항상 같은 서버로 전달',
              },
              {
                badge: 'Dynamic', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.12)',
                title: 'Least Connections', color: '#22c55e',
                desc: '현재 활성 연결(커넥션)이 가장 적은 서버에 요청을 보냅니다. 요청 처리 시간이 불균일할 때 효과적입니다.',
                visual: 'Server A: 12 connections ← 선택 안함\nServer B:  3 connections ← 선택!\nServer C:  8 connections ← 선택 안함',
              },
              {
                badge: 'Dynamic', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.12)',
                title: 'Least Response Time', color: '#f59e0b',
                desc: '응답 시간이 가장 빠른 서버에 요청을 보냅니다. 서버의 실시간 성능을 반영하여 가장 효율적입니다.',
                visual: 'Server A: avg 120ms ← 선택 안함\nServer B: avg  45ms ← 선택!\nServer C: avg  80ms ← 선택 안함',
              },
              {
                badge: 'Dynamic', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.12)',
                title: 'Resource Based', color: '#ef4444',
                desc: '서버의 CPU, 메모리 사용률 등 리소스 상태를 모니터링하여 여유가 있는 서버에 요청을 분배합니다.',
                visual: 'Server A: CPU 85%, MEM 70% ← 과부하\nServer B: CPU 30%, MEM 45% ← 선택!\nServer C: CPU 60%, MEM 55% ← 보통',
              },
            ].map((a) => (
              <div key={a.title} className="lb-algo" style={{ borderTop: `2px solid ${a.color}` }}>
                <div className="lb-algo-badge" style={{ color: a.badgeColor, background: a.badgeBg }}>{a.badge}</div>
                <div className="lb-algo-title" style={{ color: a.color }}>{a.title}</div>
                <div className="lb-algo-desc">{a.desc}</div>
                <div className="lb-algo-visual">
                  {a.visual.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>
          <HighlightBox color="#3b82f6" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#3b82f6' }}>면접 포인트:</strong> Static 알고리즘은 서버 상태를 고려하지 않아 구현이 단순하지만, 실시간 부하를 반영하지 못합니다. Dynamic 알고리즘은 서버 상태를 실시간으로 반영하지만 모니터링 오버헤드가 있습니다. 실무에서는 <strong style={{ color: '#22c55e' }}>Least Connections</strong>가 가장 많이 사용됩니다.
          </HighlightBox>
        </div>

        {/* 세션 유지 전략 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>세션 유지 전략 (Session Persistence)</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            로드밸런서가 요청을 분산하면 <strong style={{ color: '#94a3b8' }}>같은 사용자의 요청이 매번 다른 서버로 갈 수 있습니다.</strong>
            세션 기반 인증이나 장바구니처럼 상태가 필요한 경우 이를 해결해야 합니다.
          </div>
          <div className="lb-session-grid">
            {[
              {
                title: 'Sticky Session', color: '#f59e0b',
                desc: '쿠키나 IP로 사용자를 특정 서버에 고정합니다. 구현이 쉽지만 서버 장애 시 세션이 유실되고, 부하가 불균형해질 수 있습니다.',
                pros: [
                  { label: '구현 간단', color: '#22c55e' },
                  { label: '기존 코드 수정 불필요', color: '#22c55e' },
                ],
                cons: [
                  { label: '서버 장애 시 세션 유실', color: '#ef4444' },
                  { label: '부하 불균형 가능', color: '#ef4444' },
                ],
              },
              {
                title: 'Session 외부 저장소', color: '#3b82f6',
                desc: 'Redis, Memcached 등 외부 저장소에 세션을 저장합니다. 어떤 서버에 요청이 가도 동일한 세션을 조회할 수 있습니다.',
                pros: [
                  { label: '서버 장애에 강함', color: '#22c55e' },
                  { label: '균등한 부하 분산', color: '#22c55e' },
                ],
                cons: [
                  { label: '외부 저장소 의존성 추가', color: '#ef4444' },
                  { label: '네트워크 지연 발생', color: '#ef4444' },
                ],
              },
              {
                title: 'Stateless (JWT)', color: '#22c55e',
                desc: '서버에 세션을 저장하지 않고, JWT 토큰에 정보를 담아 클라이언트가 매 요청에 전달합니다. 가장 확장에 유리합니다.',
                pros: [
                  { label: '서버 완전 무상태', color: '#22c55e' },
                  { label: 'Scale-Out에 최적', color: '#22c55e' },
                ],
                cons: [
                  { label: '토큰 크기 증가', color: '#ef4444' },
                  { label: '토큰 강제 만료 어려움', color: '#ef4444' },
                ],
              },
            ].map((s) => (
              <div key={s.title} className="lb-session" style={{ borderTop: `2px solid ${s.color}` }}>
                <div className="lb-session-title" style={{ color: s.color }}>{s.title}</div>
                <div className="lb-session-desc">{s.desc}</div>
                <div className="lb-session-pros" style={{ gap: '4px', display: 'flex', flexWrap: 'wrap' }}>
                  {s.pros.map((p) => (
                    <span key={p.label} className="lb-session-tag" style={{ background: `${p.color}12`, border: `1px solid ${p.color}30`, color: p.color }}>{p.label}</span>
                  ))}
                  {s.cons.map((c) => (
                    <span key={c.label} className="lb-session-tag" style={{ background: `${c.color}12`, border: `1px solid ${c.color}30`, color: c.color }}>{c.label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>권장 방향:</strong> 마이크로서비스 환경에서는 <strong style={{ color: '#94a3b8' }}>Stateless(JWT)</strong> 방식이 가장 이상적입니다. 서버가 상태를 갖지 않으므로 자유롭게 Scale-Out할 수 있습니다. 세션이 반드시 필요한 경우에는 Redis 같은 외부 저장소를 사용하고, Sticky Session은 레거시 환경에서만 고려합니다.
          </HighlightBox>
        </div>

        {/* 헬스 체크 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>헬스 체크 (Health Check)</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            로드밸런서는 주기적으로 서버의 상태를 확인하여 <strong style={{ color: '#ef4444' }}>비정상 서버를 자동으로 풀(Pool)에서 제외</strong>합니다.
          </div>
          <div className="lb-ha-grid">
            {[
              { icon: '💓', name: 'TCP Health Check', desc: 'TCP 포트에 연결을 시도하여 응답 여부를 확인합니다. 가장 기본적인 방식으로 L4 로드밸런서에서 사용합니다.', color: '#3b82f6' },
              { icon: '🌐', name: 'HTTP Health Check', desc: '특정 URL(ex: /health)에 HTTP 요청을 보내 200 응답을 확인합니다. 애플리케이션 수준의 상태를 검증합니다.', color: '#22c55e' },
              { icon: '🔍', name: 'Deep Health Check', desc: 'DB 연결, 캐시 서버, 외부 API 등 의존성까지 확인합니다. 더 정확하지만 체크 비용이 높습니다.', color: '#a855f7' },
              { icon: '⚙️', name: 'Passive Health Check', desc: '별도 요청 없이 실제 트래픽의 응답 코드·지연 시간을 분석하여 비정상을 감지합니다. Nginx, Envoy에서 지원합니다.', color: '#f59e0b' },
            ].map((h) => (
              <div key={h.name} className="lb-ha" style={{ borderTop: `2px solid ${h.color}` }}>
                <div className="lb-ha-icon">{h.icon}</div>
                <div className="lb-ha-name" style={{ color: h.color }}>{h.name}</div>
                <div className="lb-ha-desc">{h.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 고가용성 구성 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>로드밸런서 고가용성 (HA) 구성</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              로드밸런서 자체가 SPOF(Single Point of Failure)가 되지 않도록
              <strong style={{ color: '#3b82f6' }}> Active-Standby</strong> 또는 <strong style={{ color: '#22c55e' }}>Active-Active</strong> 구성을 사용합니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6', marginBottom: '8px' }}>Active-Standby</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                  하나의 LB가 트래픽을 처리하고, 대기 LB가 장애를 감지하면 자동으로 전환(Failover)합니다. VRRP/Keepalived로 구현합니다.
                </div>
              </div>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>Active-Active</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>
                  여러 LB가 동시에 트래픽을 처리합니다. DNS Round Robin이나 Anycast로 트래픽을 분산합니다. 더 높은 처리량을 제공합니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 요약 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '20px' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>항목</th>
                  <th style={{ color: '#3b82f6' }}>L4 로드밸런서</th>
                  <th style={{ color: '#22c55e' }}>L7 로드밸런서</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['동작 계층', 'OSI L4 (전송)', 'OSI L7 (응용)'],
                  ['판단 기준', 'IP + Port', 'URL, Header, Cookie 등'],
                  ['속도', '매우 빠름', '상대적으로 느림'],
                  ['SSL 처리', '불가', 'SSL Termination 가능'],
                  ['콘텐츠 기반 라우팅', '불가', '가능 (/api → A, /web → B)'],
                  ['헬스 체크', 'TCP 연결 수준', 'HTTP 응답 코드 수준'],
                  ['AWS 서비스', 'NLB', 'ALB'],
                  ['사용 사례', '게임, IoT, TCP 서비스', '웹 서비스, API, MSA'],
                ].map(([label, l4, l7]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#93c5fd' }}>{l4}</td>
                    <td style={{ color: '#86efac' }}>{l7}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>알고리즘</th>
                  <th>유형</th>
                  <th>장점</th>
                  <th>단점</th>
                  <th>적합한 상황</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Round Robin', 'Static', '단순, 균등 분배', '서버 성능 차이 미반영', '동일 스펙 서버', '#3b82f6'],
                  ['Weighted RR', 'Static', '서버 성능 반영', '가중치 수동 관리', '서버 스펙이 다를 때', '#06b6d4'],
                  ['IP Hash', 'Static', '세션 일관성', '부하 불균형 가능', '세션 유지 필요 시', '#a855f7'],
                  ['Least Conn.', 'Dynamic', '실시간 부하 반영', '모니터링 오버헤드', '범용 (가장 많이 사용)', '#22c55e'],
                  ['Least Resp.', 'Dynamic', '가장 효율적 분배', '측정 비용 높음', '응답 시간 중요 서비스', '#f59e0b'],
                ].map(([name, type, pro, con, fit, color]) => (
                  <tr key={name}>
                    <td style={{ color, fontWeight: 700, fontSize: '12px' }}>{name}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{type}</td>
                    <td style={{ color: '#86efac', fontSize: '12px' }}>{pro}</td>
                    <td style={{ color: '#fca5a5', fontSize: '12px' }}>{con}</td>
                    <td style={{ color: '#5a6a85', fontSize: '12px' }}>{fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#22c55e']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#3b82f6" items={[
            { q: '로드밸런싱이 필요한 이유를 설명해주세요.', a: '하나의 서버로는 대량의 트래픽을 처리하기 어렵고, 서버 장애 시 서비스가 중단됩니다. 로드밸런싱은 트래픽을 여러 서버에 분산하여 성능과 가용성을 확보합니다. Scale-Out(서버 추가)으로 처리 용량을 선형적으로 늘릴 수 있고, 헬스 체크로 장애 서버를 자동 제외하여 무중단 서비스를 제공합니다.' },
            { q: 'L4와 L7 로드밸런서의 차이는?', a: 'L4는 OSI 전송 계층에서 IP와 Port 정보만으로 패킷을 포워딩합니다. 패킷 내용을 분석하지 않아 속도가 빠르지만 URL 기반 라우팅은 불가합니다. L7은 응용 계층에서 HTTP 헤더, URL 경로, 쿠키 등을 분석하여 세밀한 라우팅이 가능합니다. SSL Termination도 L7에서 처리합니다. AWS에서는 NLB(L4)와 ALB(L7)로 구분됩니다.' },
            { q: '로드밸런싱 환경에서 세션을 어떻게 유지하나요?', a: '세 가지 방식이 있습니다. Sticky Session은 쿠키로 사용자를 특정 서버에 고정하지만 장애 시 세션이 유실됩니다. 외부 저장소(Redis)에 세션을 저장하면 어떤 서버든 동일한 세션을 조회할 수 있습니다. 가장 권장되는 방식은 JWT 기반 Stateless 방식으로, 서버가 상태를 갖지 않아 자유롭게 Scale-Out할 수 있습니다.' },
            { q: 'Least Connection 알고리즘의 동작 원리와 장점은?', a: '현재 활성 연결(커넥션) 수가 가장 적은 서버에 새 요청을 보내는 방식입니다. Round Robin과 달리 서버의 실시간 부하를 반영하므로, 요청 처리 시간이 불균일한 환경에서 효과적입니다. 예를 들어 어떤 요청은 10ms, 어떤 요청은 500ms가 걸리는 API에서 Round Robin은 느린 요청을 처리 중인 서버에도 계속 요청을 보내지만, Least Connection은 여유 있는 서버에 보냅니다.' },
            { q: '로드밸런서의 헬스 체크 방식을 설명해주세요.', a: 'TCP Health Check는 포트 연결 가능 여부만 확인합니다. HTTP Health Check는 /health 같은 엔드포인트에 요청을 보내 200 응답을 확인합니다. Deep Health Check는 DB, 캐시 등 의존성까지 확인합니다. Passive Health Check는 실제 트래픽의 응답 코드와 지연 시간을 분석합니다. 비정상으로 판단되면 해당 서버를 풀에서 제외하고, 복구되면 다시 추가합니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

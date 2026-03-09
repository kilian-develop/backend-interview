import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.tcpudp-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:48px; }
@media(max-width:640px){ .tcpudp-compare-grid{ grid-template-columns:1fr; } }
.tcpudp-proto-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s, box-shadow .25s; }
.tcpudp-proto-card:hover { transform:translateY(-4px); }
.tcpudp-tcp-card { border-top:3px solid #3b82f6; box-shadow:0 0 40px rgba(59,130,246,0.25); }
.tcpudp-udp-card { border-top:3px solid #f97316; box-shadow:0 0 40px rgba(249,115,22,0.25); }
.tcpudp-card-title { font-size:22px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.tcpudp-card-sub { font-size:12px; color:#5a6a85; margin-bottom:22px; font-family:'JetBrains Mono',monospace; }
.tcpudp-prop-list { display:flex; flex-direction:column; gap:10px; }
.tcpudp-prop-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.025); border-radius:8px; font-size:13px; gap:12px; }
.tcpudp-prop-label { color:#5a6a85; font-size:12px; white-space:nowrap; }
.tcpudp-prop-val { font-weight:700; font-size:13px; text-align:right; }
.tcpudp-good { color:#22c55e; } .tcpudp-bad { color:#ef4444; } .tcpudp-neutral { color:#94a3b8; }
.tcpudp-hs-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.tcpudp-hs-arena { display:flex; justify-content:space-between; align-items:flex-start; position:relative; gap:16px; min-height:240px; }
.tcpudp-hs-peer { flex:0 0 110px; display:flex; flex-direction:column; align-items:center; gap:10px; padding-top:10px; }
.tcpudp-hs-icon { width:60px; height:60px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:28px; border:2px solid #1a2234; }
.tcpudp-hs-peer-name { font-size:12px; font-weight:700; color:#5a6a85; font-family:'JetBrains Mono',monospace; }
.tcpudp-hs-mid { flex:1; position:relative; display:flex; flex-direction:column; justify-content:space-around; padding:20px 0; }
.tcpudp-hs-arrow { display:flex; align-items:center; gap:10px; opacity:0; transform:translateX(-10px); transition:opacity .5s ease, transform .5s ease; }
.tcpudp-hs-arrow.right { flex-direction:row; }
.tcpudp-hs-arrow.left { flex-direction:row-reverse; transform:translateX(10px); }
.tcpudp-hs-arrow.show { opacity:1; transform:translateX(0); }
.tcpudp-hs-line { flex:1; height:2px; background:linear-gradient(90deg,#3b82f6,rgba(59,130,246,0.3)); }
.tcpudp-hs-arrow.left .tcpudp-hs-line { background:linear-gradient(90deg,rgba(59,130,246,0.3),#3b82f6); }
.tcpudp-hs-tip { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#3b82f6; white-space:nowrap; }
.tcpudp-hs-desc { font-size:11px; color:#5a6a85; }
.tcpudp-arr-head { color:#3b82f6; font-size:18px; line-height:1; }
.tcpudp-mechanisms { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
.tcpudp-mech { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s, box-shadow .2s; }
.tcpudp-mech:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(59,130,246,0.12); }
.tcpudp-mech-icon { font-size:26px; margin-bottom:10px; }
.tcpudp-mech-title { font-size:14px; font-weight:700; color:#3b82f6; margin-bottom:8px; }
.tcpudp-mech-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.tcpudp-quic-card { background:linear-gradient(135deg,rgba(168,85,247,0.08),rgba(59,130,246,0.05)); border:1px solid rgba(168,85,247,0.3); border-radius:18px; padding:32px; margin-bottom:48px; }
.tcpudp-quic-badge { display:inline-flex; align-items:center; gap:8px; background:rgba(168,85,247,0.15); border:1px solid rgba(168,85,247,0.4); border-radius:20px; padding:4px 14px; font-size:11px; font-weight:700; color:#a855f7; font-family:'JetBrains Mono',monospace; margin-bottom:16px; letter-spacing:1px; }
.tcpudp-quic-stack { display:flex; flex-direction:column; gap:6px; max-width:440px; }
.tcpudp-qs-layer { padding:11px 18px; border-radius:9px; font-size:12px; font-weight:700; font-family:'JetBrains Mono',monospace; display:flex; justify-content:space-between; align-items:center; }
.tcpudp-quic-features { display:grid; grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); gap:12px; margin-top:20px; }
.tcpudp-qf { background:rgba(168,85,247,0.06); border:1px solid rgba(168,85,247,0.15); border-radius:10px; padding:14px; }
.tcpudp-qf h5 { font-size:12px; color:#a855f7; margin-bottom:6px; }
.tcpudp-qf p { font-size:12px; color:#5a6a85; line-height:1.65; }
.tcpudp-usecase-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .tcpudp-usecase-grid{ grid-template-columns:1fr; } }
.tcpudp-usecase { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.tcpudp-usecase.tcp { border-left:3px solid #3b82f6; }
.tcpudp-usecase.udp { border-left:3px solid #f97316; }
.tcpudp-usecase h4 { font-size:14px; font-weight:700; margin-bottom:12px; }
.tcpudp-usecase.tcp h4 { color:#3b82f6; }
.tcpudp-usecase.udp h4 { color:#f97316; }
.tcpudp-usecase-items { display:flex; flex-direction:column; gap:8px; }
.tcpudp-ui-item { display:flex; align-items:center; gap:10px; font-size:13px; color:#94a3b8; padding:8px 12px; background:rgba(255,255,255,0.02); border-radius:7px; }
.tcpudp-sw-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.tcpudp-sw-packets { display:flex; gap:6px; align-items:flex-end; flex-wrap:wrap; margin-bottom:16px; position:relative; padding:16px 0; }
.tcpudp-sw-pkt { width:52px; height:52px; border-radius:10px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; border:2px solid; transition:all .35s ease; position:relative; }
.tcpudp-sw-pkt-idle { background:rgba(75,96,128,0.1); border-color:#4b6080; color:#4b6080; }
.tcpudp-sw-pkt-sent { background:rgba(59,130,246,0.15); border-color:#3b82f6; color:#3b82f6; }
.tcpudp-sw-pkt-acked { background:rgba(34,197,94,0.15); border-color:#22c55e; color:#22c55e; }
.tcpudp-sw-pkt-lost { background:rgba(239,68,68,0.15); border-color:#ef4444; color:#ef4444; }
.tcpudp-sw-pkt-retransmit { background:rgba(245,158,11,0.2); border-color:#f59e0b; color:#f59e0b; }
.tcpudp-sw-pkt-label { font-size:9px; font-weight:400; margin-top:2px; }
.tcpudp-sw-window { position:absolute; top:-4px; height:calc(100% + 8px); border:2px dashed #3b82f6; border-radius:12px; background:rgba(59,130,246,0.04); transition:left .4s ease, width .4s ease; pointer-events:none; display:flex; align-items:flex-start; justify-content:center; padding-top:2px; }
.tcpudp-sw-window-label { font-size:10px; font-weight:700; color:#3b82f6; font-family:'JetBrains Mono',monospace; background:#0e1118; padding:0 6px; position:absolute; top:-10px; }
.tcpudp-sw-legend { display:flex; gap:16px; flex-wrap:wrap; margin-top:12px; }
.tcpudp-sw-legend-item { display:flex; align-items:center; gap:6px; font-size:11px; color:#5a6a85; }
.tcpudp-sw-legend-dot { width:12px; height:12px; border-radius:3px; }
`

type PktState = 'idle' | 'sent' | 'acked' | 'lost' | 'retransmit'

export default function TcpVsUdp() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러보세요', color: '#5a6a85' })
  const [swPackets, setSwPackets] = useState<PktState[]>(Array(10).fill('idle'))
  const [swWindowStart, setSwWindowStart] = useState(0)
  const [swPlaying, setSwPlaying] = useState(false)
  const [swStatus, setSwStatus] = useState({ msg: '▶ 재생 버튼을 눌러 슬라이딩 윈도우를 확인해보세요', color: '#5a6a85' })
  useInjectCSS('style-tcp-vs-udp', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    ;[
      { s: 1, delay: 400, msg: '① Client → Server : SYN 전송 중...', color: '#3b82f6' },
      { s: 2, delay: 1100, msg: '② Server → Client : SYN+ACK 응답...', color: '#3b82f6' },
      { s: 3, delay: 1800, msg: '③ Client → Server : ACK 전송...', color: '#3b82f6' },
    ].forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: '✅ 연결 수립 완료! 이제 데이터를 주고받을 수 있습니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 2600)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러보세요', color: '#5a6a85' })
  }

  const resetSw = () => {
    setSwPackets(Array(10).fill('idle'))
    setSwWindowStart(0)
    setSwPlaying(false)
    setSwStatus({ msg: '▶ 재생 버튼을 눌러 슬라이딩 윈도우를 확인해보세요', color: '#5a6a85' })
  }

  const playSw = () => {
    if (swPlaying) return
    resetSw()
    setSwPlaying(true)

    // Timeline: send window [0-3], ack [0-3], slide to [4-7], send [4-7], pkt 4(index 4) lost, ack [5-7], retransmit [4], ack [4], slide to [8-9]
    const steps: Array<{ delay: number; fn: () => void; msg: string; color: string }> = [
      // Send packets 1-4 (index 0-3)
      { delay: 400, msg: '윈도우 내 패킷 1~4 전송 중...', color: '#3b82f6', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[0] = n[1] = n[2] = n[3] = 'sent'; return n })
      }},
      // ACK packets 1-4
      { delay: 1200, msg: 'ACK 수신 — 패킷 1~4 확인 완료', color: '#22c55e', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[0] = n[1] = n[2] = n[3] = 'acked'; return n })
      }},
      // Slide window to 4-7
      { delay: 1800, msg: '윈도우 슬라이드 → 패킷 5~8로 이동', color: '#3b82f6', fn: () => {
        setSwWindowStart(4)
      }},
      // Send packets 5-8 (index 4-7)
      { delay: 2400, msg: '패킷 5~8 전송 중...', color: '#3b82f6', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[4] = n[5] = n[6] = n[7] = 'sent'; return n })
      }},
      // Packet 5 (index 4) lost!
      { delay: 3200, msg: '패킷 5 손실 감지! 나머지 6~8은 ACK 수신', color: '#ef4444', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[4] = 'lost'; n[5] = n[6] = n[7] = 'acked'; return n })
      }},
      // Retransmit packet 5
      { delay: 4200, msg: '패킷 5 재전송 중...', color: '#f59e0b', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[4] = 'retransmit'; return n })
      }},
      // ACK packet 5
      { delay: 5000, msg: '패킷 5 재전송 성공 — ACK 수신', color: '#22c55e', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[4] = 'acked'; return n })
      }},
      // Slide window to 8-9
      { delay: 5600, msg: '윈도우 슬라이드 → 패킷 9~10', color: '#3b82f6', fn: () => {
        setSwWindowStart(8)
      }},
      // Send and ACK 9-10
      { delay: 6200, msg: '패킷 9~10 전송 및 ACK 완료', color: '#22c55e', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[8] = n[9] = 'sent'; return n })
      }},
      { delay: 6800, msg: '모든 패킷 전송 완료!', color: '#22c55e', fn: () => {
        setSwPackets(prev => { const n = [...prev]; n[8] = n[9] = 'acked'; return n })
        setSwPlaying(false)
      }},
    ]

    steps.forEach(({ delay, fn, msg, color }) => {
      schedule(() => { fn(); setSwStatus({ msg, color }) }, delay)
    })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(249,115,22,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Transport Layer · OSI L4 · 면접 필수"
          title={<><span style={{ color: '#3b82f6' }}>TCP</span> vs <span style={{ color: '#f97316' }}>UDP</span></>}
          description={<>연결 지향형 신뢰성의 TCP, 빠른 전송의 UDP —<br />그리고 둘의 장점을 합친 QUIC/HTTP3까지</>}
        />

        {/* 비교 카드 */}
        <div className="tcpudp-compare-grid">
          <div className="tcpudp-proto-card tcpudp-tcp-card">
            <div className="tcpudp-card-title" style={{ color: '#3b82f6' }}>
              TCP
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#5a6a85' }}>Transmission Control Protocol</span>
            </div>
            <div className="tcpudp-card-sub">연결 지향형 · 신뢰성 보장</div>
            <div className="tcpudp-prop-list">
              {[
                ['연결 방식', '연결형 (3-way handshake)', 'good'],
                ['신뢰성', '✓ 보장', 'good'],
                ['순서 보장', '✓ 보장', 'good'],
                ['흐름 제어', '✓ 있음', 'good'],
                ['혼잡 제어', '✓ 있음', 'good'],
                ['속도', '상대적으로 느림', 'bad'],
                ['헤더 크기', '20~60 bytes', 'neutral'],
                ['전송 단위', 'Segment', 'neutral'],
              ].map(([label, val, type]) => (
                <div key={label} className="tcpudp-prop-row">
                  <span className="tcpudp-prop-label">{label}</span>
                  <span className={`tcpudp-prop-val tcpudp-${type}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="tcpudp-proto-card tcpudp-udp-card">
            <div className="tcpudp-card-title" style={{ color: '#f97316' }}>
              UDP
              <span style={{ fontSize: '12px', fontWeight: 400, color: '#5a6a85' }}>User Datagram Protocol</span>
            </div>
            <div className="tcpudp-card-sub">비연결형 · 빠른 전송</div>
            <div className="tcpudp-prop-list">
              {[
                ['연결 방식', '비연결형', 'bad'],
                ['신뢰성', '✗ 미보장', 'bad'],
                ['순서 보장', '✗ 미보장', 'bad'],
                ['흐름 제어', '✗ 없음', 'bad'],
                ['혼잡 제어', '✗ 없음', 'bad'],
                ['속도', '빠름', 'good'],
                ['헤더 크기', '8 bytes (고정)', 'good'],
                ['전송 단위', 'Datagram', 'neutral'],
              ].map(([label, val, type]) => (
                <div key={label} className="tcpudp-prop-row">
                  <span className="tcpudp-prop-label">{label}</span>
                  <span className={`tcpudp-prop-val tcpudp-${type}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3-Way Handshake */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f97316']}>TCP — 3-way Handshake (연결 수립)</SectionTitle>
          <div className="tcpudp-hs-box">
            <div className="tcpudp-hs-arena">
              <div className="tcpudp-hs-peer">
                <div className="tcpudp-hs-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>🖥️</div>
                <div className="tcpudp-hs-peer-name">CLIENT</div>
              </div>
              <div className="tcpudp-hs-mid">
                <div className={`tcpudp-hs-arrow right ${step >= 1 ? 'show' : ''}`}>
                  <div><div className="tcpudp-hs-tip">SYN</div><div className="tcpudp-hs-desc">연결 요청</div></div>
                  <div className="tcpudp-hs-line" />
                  <div className="tcpudp-arr-head">→</div>
                </div>
                <div className={`tcpudp-hs-arrow left ${step >= 2 ? 'show' : ''}`}>
                  <div><div className="tcpudp-hs-tip">SYN + ACK</div><div className="tcpudp-hs-desc">요청 수락</div></div>
                  <div className="tcpudp-hs-line" />
                  <div className="tcpudp-arr-head">←</div>
                </div>
                <div className={`tcpudp-hs-arrow right ${step >= 3 ? 'show' : ''}`}>
                  <div><div className="tcpudp-hs-tip">ACK</div><div className="tcpudp-hs-desc">연결 확립</div></div>
                  <div className="tcpudp-hs-line" />
                  <div className="tcpudp-arr-head">→</div>
                </div>
              </div>
              <div className="tcpudp-hs-peer">
                <div className="tcpudp-hs-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>🖧</div>
                <div className="tcpudp-hs-peer-name">SERVER</div>
              </div>
            </div>
            <AnimationControls color="#3b82f6" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Client → Server: SYN 전송 — 연결 요청', color: '#3b82f6' },
                  { num: '②', text: 'Server → Client: SYN+ACK 응답 — 요청 수락', color: '#3b82f6' },
                  { num: '③', text: 'Client → Server: ACK 전송 — 연결 수립 완료, 데이터 전송 가능', color: '#22c55e' },
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

        {/* TCP 신뢰성 메커니즘 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f97316']}>TCP — 신뢰성 보장 메커니즘</SectionTitle>
          <div className="tcpudp-mechanisms">
            {[
              { icon: '🌊', title: '흐름 제어 (Flow Control)', desc: '수신측이 처리할 수 있는 양만큼만 데이터를 전송하도록 조절합니다. 수신 버퍼 오버플로를 방지하는 슬라이딩 윈도우 기반 메커니즘입니다.' },
              { icon: '🚦', title: '혼잡 제어 (Congestion Control)', desc: '네트워크 혼잡을 감지하여 전송량을 동적으로 조절합니다. 패킷 손실이 발생하면 전송 속도를 줄이고, 네트워크가 안정되면 점진적으로 속도를 올립니다.' },
              { icon: '🔁', title: '오류 제어 (Error Control)', desc: '패킷 손실 시 자동 재전송(ARQ)으로 복구합니다. 수신측이 ACK으로 정상 수신을 확인하고, 손실된 패킷만 선택적으로 재전송하여 데이터 완전성을 보장합니다.' },
              { icon: '🔢', title: '시퀀스 번호 (Sequence Number)', desc: '각 세그먼트에 번호를 붙여 순서를 보장합니다. 수신 측은 ACK 번호로 어디까지 받았는지 확인 응답을 보내며, 중복이나 누락을 감지합니다.' },
            ].map((m) => (
              <div key={m.title} className="tcpudp-mech">
                <div className="tcpudp-mech-icon">{m.icon}</div>
                <div className="tcpudp-mech-title">{m.title}</div>
                <div className="tcpudp-mech-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 슬라이딩 윈도우 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f97316']}>TCP — 슬라이딩 윈도우 시뮬레이션</SectionTitle>
          <div className="tcpudp-sw-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
              슬라이딩 윈도우는 <strong style={{ color: '#3b82f6' }}>ACK을 기다리지 않고 윈도우 크기만큼 연속 전송</strong>할 수 있게 합니다.
              패킷 손실 시 재전송이 이루어지는 과정을 확인해보세요.
            </div>
            <div className="tcpudp-sw-packets" style={{ position: 'relative' }}>
              {swPackets.map((st, i) => (
                <div
                  key={i}
                  className={`tcpudp-sw-pkt tcpudp-sw-pkt-${st}`}
                >
                  {i + 1}
                  <span className="tcpudp-sw-pkt-label">
                    {st === 'idle' ? '대기' : st === 'sent' ? '전송' : st === 'acked' ? 'ACK' : st === 'lost' ? '손실' : '재전송'}
                  </span>
                </div>
              ))}
              <div
                className="tcpudp-sw-window"
                style={{
                  left: `${swWindowStart * 58}px`,
                  width: `${Math.min(4, 10 - swWindowStart) * 58 - 6}px`,
                }}
              >
                <span className="tcpudp-sw-window-label">Window (size=4)</span>
              </div>
            </div>
            <div className="tcpudp-sw-legend">
              {[
                { color: '#4b6080', label: '대기' },
                { color: '#3b82f6', label: '전송됨' },
                { color: '#22c55e', label: 'ACK 수신' },
                { color: '#ef4444', label: '손실' },
                { color: '#f59e0b', label: '재전송' },
              ].map(l => (
                <div key={l.label} className="tcpudp-sw-legend-item">
                  <div className="tcpudp-sw-legend-dot" style={{ background: l.color }} />
                  {l.label}
                </div>
              ))}
            </div>
            <AnimationControls color="#3b82f6" status={swStatus} onPlay={playSw} onReset={resetSw} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '윈도우 내 패킷 1~4 전송 (ACK 없이 연속 전송)', color: '#3b82f6' },
                  { num: '②', text: 'ACK 수신 — 패킷 1~4 확인 완료', color: '#22c55e' },
                  { num: '③', text: '윈도우 슬라이드 → 패킷 5~8로 이동', color: '#3b82f6' },
                  { num: '④', text: '패킷 5~8 전송', color: '#3b82f6' },
                  { num: '⑤', text: '패킷 5 손실 감지! 나머지 6~8은 ACK 수신', color: '#ef4444' },
                  { num: '⑥', text: '패킷 5 재전송 → ACK 수신 성공', color: '#f59e0b' },
                  { num: '⑦', text: '윈도우 슬라이드 → 패킷 9~10 전송 및 ACK 완료', color: '#22c55e' },
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

        {/* UDP 데이터그램 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f97316']}>UDP — 데이터그램 단위 전송</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px' }}>각 패킷은 독립적으로 전송됩니다. 순서도 없고, 재전송도 없습니다.</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', overflowX: 'auto', padding: '16px 0' }}>
              {[
                { label: 'PKT 1', lost: false },
                { label: 'PKT 2', lost: false },
                { label: 'PKT 3', lost: true },
                { label: 'PKT 4', lost: false },
                { label: 'PKT 5', lost: false },
              ].map((pkt, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '52px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace',
                    border: `1.5px solid ${pkt.lost ? '#ef4444' : '#f97316'}`,
                    background: pkt.lost ? 'rgba(239,68,68,0.08)' : 'rgba(249,115,22,0.12)',
                    color: pkt.lost ? '#ef4444' : '#f97316',
                    opacity: pkt.lost ? 0.3 : 1,
                    position: 'relative',
                  }}>
                    {pkt.lost && <span style={{ position: 'absolute', fontSize: '20px', color: '#ef4444', opacity: 0.6 }}>✕</span>}
                    {pkt.label}
                  </div>
                  <div style={{ fontSize: '10px', color: pkt.lost ? '#ef4444' : '#5a6a85' }}>{pkt.lost ? '손실 ✗' : '전송 ✓'}</div>
                  {i < 4 && <div style={{ fontSize: '18px', color: '#5a6a85', position: 'absolute', marginLeft: '60px', marginTop: '-12px' }}></div>}
                </div>
              ))}
              <span style={{ color: '#5a6a85', fontSize: '18px' }}>→ 📺</span>
            </div>
            <div style={{ fontSize: '13px', color: '#5a6a85', background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: '8px', padding: '12px 16px', lineHeight: 1.7 }}>
              <strong style={{ color: '#f97316' }}>UDP는 PKT 3이 손실되어도 그냥 계속 전송합니다.</strong><br />
              스트리밍 영상에서 일부 프레임이 깨지거나 드롭되는 현상이 이 때문입니다. 연속성이 신뢰성보다 중요한 서비스에 적합합니다.
            </div>
          </div>
        </div>

        {/* QUIC */}
        <div className="tcpudp-quic-card">
          <div className="tcpudp-quic-badge">✨ Advanced — HTTP/3 & QUIC</div>
          <div style={{ fontSize: '22px', fontWeight: 900, color: '#a855f7', marginBottom: '10px' }}>UDP + 신뢰성 = QUIC</div>
          <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '24px' }}>
            UDP는 프로토콜 자체에 신뢰성이 없을 뿐, <strong style={{ color: '#c084fc' }}>개발자가 애플리케이션 레벨에서 직접 신뢰성을 구현</strong>할 수 있습니다.<br />
            Google이 만든 <strong style={{ color: '#c084fc' }}>QUIC</strong>은 UDP 위에 신뢰성·보안·멀티플렉싱을 구현하여 HTTP/3의 기반이 되었습니다.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'start' }}>
            <div className="tcpudp-quic-stack">
              {[
                { cls: 'background:rgba(168,85,247,0.18);border:1px solid rgba(168,85,247,0.4);color:#a855f7', label: 'HTTP/3', note: '응용 계층' },
                { cls: 'background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.25);color:#c084fc', label: 'QUIC (신뢰성 + TLS 내장)', note: '전송 계층' },
                { cls: 'background:rgba(249,115,22,0.15);border:1px solid rgba(249,115,22,0.4);color:#f97316', label: 'UDP', note: '전송 계층' },
                { cls: 'background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.3);color:#3b82f6', label: 'IP', note: '네트워크 계층' },
              ].map((l) => (
                <div key={l.label} className="tcpudp-qs-layer" style={{ ...Object.fromEntries(l.cls.split(';').map(s => s.split(':').map(v => v.trim())).filter(([k]) => k)) }}>
                  <span>{l.label}</span>
                  <span style={{ fontSize: '10px', fontWeight: 400, opacity: 0.7 }}>{l.note}</span>
                </div>
              ))}
            </div>
            <div className="tcpudp-quic-features">
              {[
                { title: '0-RTT / 1-RTT 연결', desc: 'TCP+TLS는 연결에 2~3 RTT 필요. QUIC은 첫 연결도 1 RTT, 재연결은 0 RTT로 가능합니다.' },
                { title: 'HOL Blocking 해결', desc: 'TCP는 하나의 패킷 손실이 전체를 블로킹. QUIC은 스트림 단위로 독립 처리하여 이 문제를 해결합니다.' },
                { title: 'TLS 1.3 내장', desc: '보안이 프로토콜에 내장되어 있어 별도 TLS Handshake 없이 암호화 통신이 가능합니다.' },
                { title: '연결 이동 (Migration)', desc: 'Wi-Fi → LTE 전환 시 TCP는 재연결 필요. QUIC은 Connection ID로 끊김 없이 유지합니다.' },
              ].map((f) => (
                <div key={f.title} className="tcpudp-qf">
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 사용 사례 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f97316']}>어떤 서비스에 쓰일까?</SectionTitle>
          <div className="tcpudp-usecase-grid">
            <div className="tcpudp-usecase tcp">
              <h4>TCP 사용 사례</h4>
              <div className="tcpudp-usecase-items">
                {[
                  ['📁', '파일 전송 (FTP, SFTP) — 데이터 무결성 필수'],
                  ['🌐', '웹 브라우징 (HTTP/1.1, HTTP/2)'],
                  ['📧', '이메일 (SMTP, IMAP, POP3)'],
                  ['💬', '채팅 / 메시징 앱'],
                  ['🏦', '금융 / 결제 서비스'],
                  ['🔐', 'SSH 원격 접속'],
                ].map(([emoji, text]) => (
                  <div key={text} className="tcpudp-ui-item"><span style={{ fontSize: '18px' }}>{emoji}</span>{text}</div>
                ))}
              </div>
            </div>
            <div className="tcpudp-usecase udp">
              <h4>UDP 사용 사례</h4>
              <div className="tcpudp-usecase-items">
                {[
                  ['📺', '실시간 스트리밍 (YouTube Live, Twitch)'],
                  ['📞', 'VoIP / 영상통화 (Zoom, WebRTC)'],
                  ['🎮', '온라인 게임 (레이턴시 민감)'],
                  ['📡', 'DNS 조회 (빠른 단일 요청)'],
                  ['🎵', 'RTP (실시간 미디어 전송)'],
                  ['⚡', 'HTTP/3 (QUIC 기반)'],
                ].map(([emoji, text]) => (
                  <div key={text} className="tcpudp-ui-item"><span style={{ fontSize: '18px' }}>{emoji}</span>{text}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 요약 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f97316']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>항목</th>
                  <th style={{ color: '#3b82f6' }}>TCP</th>
                  <th style={{ color: '#f97316' }}>UDP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['연결 방식', '연결 지향 (3-way handshake)', '비연결형'],
                  ['신뢰성', '보장 (재전송, ACK)', '미보장 (개발자가 구현 가능)'],
                  ['순서 보장', '시퀀스 번호로 보장', '미보장'],
                  ['속도', '상대적으로 느림', '빠름'],
                  ['헤더', '20~60 bytes (복잡)', '8 bytes (단순·고정)'],
                  ['흐름/혼잡 제어', '있음', '없음'],
                  ['전송 단위', 'Segment', 'Datagram'],
                  ['주요 사용처', '파일전송, 웹, 이메일', '스트리밍, 게임, DNS, QUIC'],
                ].map(([label, tcp, udp]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#93c5fd' }}>{tcp}</td>
                    <td style={{ color: '#fdba74' }}>{udp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f97316']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#3b82f6" items={[
            { q: 'TCP가 신뢰성을 보장하는 메커니즘을 설명해주세요.', a: 'TCP는 시퀀스 번호로 패킷 순서를 보장하고, ACK 응답으로 수신을 확인합니다. 패킷 손실 시 타임아웃 기반 재전송과 Fast Retransmit으로 복구합니다. 슬라이딩 윈도우로 흐름 제어를, Slow Start/AIMD 등으로 혼잡 제어를 수행합니다. 체크섬으로 데이터 무결성도 검증합니다.' },
            { q: 'UDP를 사용하면서 신뢰성을 확보하는 방법은?', a: '애플리케이션 레벨에서 직접 구현합니다. QUIC이 대표적인 예로, UDP 위에 시퀀스 번호, ACK, 재전송, 혼잡 제어를 직접 구현했습니다. 게임에서는 중요 패킷만 선택적으로 재전송하는 방식도 사용합니다. 이를 통해 TCP의 HOL Blocking 없이 신뢰성을 확보할 수 있습니다.' },
            { q: 'TCP의 3-way handshake가 필요한 이유는?', a: '양방향 통신이 가능한지 최소한의 단계로 확인하기 위해서입니다. SYN으로 클라이언트→서버 경로를, SYN+ACK으로 서버→클라이언트 경로를, 마지막 ACK으로 클라이언트의 수신 능력을 확인합니다. 2-way로는 서버가 클라이언트의 수신 가능 여부를 알 수 없습니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

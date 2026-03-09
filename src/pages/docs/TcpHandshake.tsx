import { useState, useRef, useEffect } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.hs-badge { font-size:11px; font-family:'JetBrains Mono',monospace; font-weight:700; padding:3px 10px; border-radius:20px; }
.hs-b3 { background:rgba(34,211,238,0.12); border:1px solid #22d3ee; color:#22d3ee; }
.hs-b4 { background:rgba(251,113,133,0.12); border:1px solid #fb7185; color:#fb7185; }
.hs-diagram-box { background:#0c1020; border:1px solid #1c2a40; border-radius:18px; padding:28px 24px; }
.hs-diagram-box.three { border-top:3px solid #22d3ee; }
.hs-diagram-box.four { border-top:3px solid #fb7185; }
.hs-peers { display:grid; grid-template-columns:130px 1fr 130px; align-items:start; gap:8px; margin-bottom:6px; }
.hs-peer { display:flex; flex-direction:column; align-items:center; gap:8px; padding-bottom:12px; border-bottom:2px dashed #1c2a40; }
.hs-peer-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; }
.hs-peer-name { font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; }
.hs-peer-state { font-size:10px; padding:3px 10px; border-radius:20px; font-family:'JetBrains Mono',monospace; font-weight:700; transition:all .4s ease; min-width:80px; text-align:center; }
.hs-timeline { display:grid; grid-template-columns:130px 1fr 130px; gap:0; position:relative; min-height:60px; }
.hs-tl-side { display:flex; flex-direction:column; align-items:center; position:relative; }
.hs-tl-side::after { content:''; position:absolute; left:50%; top:0; bottom:0; width:2px; background:linear-gradient(to bottom,#1c2a40,transparent); transform:translateX(-50%); }
.hs-tl-center { display:flex; flex-direction:column; gap:2px; padding:8px 0; }
.hs-arrow-row { display:flex; align-items:center; gap:8px; padding:10px 12px; opacity:0; transform:translateY(6px); transition:opacity .45s ease, transform .45s ease; border-radius:8px; }
.hs-arrow-row.show { opacity:1; transform:translateY(0); }
.hs-arrow-row.right { flex-direction:row; }
.hs-arrow-row.left { flex-direction:row-reverse; }
.hs-arrow-row:hover { background:rgba(255,255,255,0.025); }
.hs-ar-flag { font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; padding:4px 10px; border-radius:6px; white-space:nowrap; flex-shrink:0; }
.hs-ar-line { flex:1; height:2px; border-radius:2px; position:relative; }
.hs-ar-tip { font-size:18px; line-height:1; flex-shrink:0; }
.hs-ar-desc { position:absolute; font-size:10px; color:#4b6080; font-family:'JetBrains Mono',monospace; white-space:nowrap; bottom:-14px; left:50%; transform:translateX(-50%); }
.f-syn { background:rgba(34,211,238,.15); border:1px solid #22d3ee; color:#22d3ee; }
.f-ack { background:rgba(163,230,53,.12); border:1px solid #a3e635; color:#a3e635; }
.f-fin { background:rgba(251,113,133,.15); border:1px solid #fb7185; color:#fb7185; }
.f-synack { background:linear-gradient(90deg,rgba(34,211,238,.12),rgba(163,230,53,.1)); border:1px solid #a3e635; color:#7dd3fc; }
.l-syn { background:#22d3ee; }
.l-ack { background:#a3e635; }
.l-fin { background:#fb7185; }
.l-synack { background:linear-gradient(90deg,#22d3ee,#a3e635); }
.hs-seq-box { background:#0c1020; border:1px solid #1c2a40; border-radius:16px; padding:24px; }
.hs-seq-row { display:flex; align-items:center; gap:12px; font-size:13px; padding:10px 14px; background:rgba(255,255,255,.02); border-radius:8px; margin-bottom:10px; }
.hs-seq-code { font-family:'JetBrains Mono',monospace; font-size:12px; display:flex; gap:6px; flex-wrap:wrap; align-items:center; }
.hs-seq-tag { padding:2px 8px; border-radius:5px; font-size:11px; font-weight:700; }
.hs-timewait-box { background:#0c1020; border:1px solid #1c2a40; border-radius:16px; padding:24px; }
.hs-tw-row { display:flex; align-items:flex-start; gap:12px; font-size:13px; line-height:1.7; color:#94a3b8; margin-bottom:10px; }
.hs-tw-num { flex-shrink:0; width:24px; height:24px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; background:rgba(245,158,11,.15); border:1px solid #f59e0b; color:#f59e0b; }
.hs-tw-highlight { margin-top:16px; background:rgba(251,113,133,.06); border:1px solid rgba(251,113,133,.2); border-radius:8px; padding:14px 16px; font-size:13px; color:#94a3b8; line-height:1.8; }
.hs-state-flow { display:flex; gap:0; overflow-x:auto; padding:8px 0; flex-wrap:nowrap; }
.hs-sf-item { flex-shrink:0; text-align:center; display:flex; flex-direction:column; align-items:center; gap:6px; }
.hs-sf-state { padding:8px 14px; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; border:1px solid; }
.hs-sf-arrow { color:#4b6080; font-size:20px; display:flex; align-items:center; padding:0 4px; margin-top:12px; }
.hs-sf-label { font-size:10px; color:#4b6080; max-width:80px; }
@media(max-width:600px){ .hs-peers, .hs-timeline { grid-template-columns: 80px 1fr 80px; } .hs-peer-icon { width:44px; height:44px; font-size:20px; } }
.hs-flood-box { background:#0c1020; border:1px solid #1c2a40; border-radius:16px; padding:28px; }
.hs-flood-diagram { display:flex; align-items:flex-start; gap:20px; margin:20px 0; overflow-x:auto; padding:8px 0; }
@media(max-width:640px){ .hs-flood-diagram { flex-direction:column; align-items:stretch; } }
.hs-flood-entity { flex-shrink:0; text-align:center; display:flex; flex-direction:column; align-items:center; gap:8px; }
.hs-flood-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; border:2px solid; }
.hs-flood-name { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.hs-flood-flow { flex:1; display:flex; flex-direction:column; gap:8px; }
.hs-flood-arrow { display:flex; align-items:center; gap:8px; padding:8px 12px; border-radius:8px; font-size:12px; }
.hs-flood-arrow-line { flex:1; height:2px; border-radius:2px; }
.hs-flood-queue { flex-shrink:0; min-width:160px; }
.hs-flood-queue-title { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:8px; }
.hs-flood-slot { height:24px; border-radius:6px; margin-bottom:4px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; border:1px solid; transition:all .3s ease; }
.hs-flood-slot.filled { background:rgba(239,68,68,0.15); border-color:#ef4444; color:#ef4444; }
.hs-flood-slot.empty { background:rgba(75,96,128,0.1); border-color:#4b6080; color:#4b6080; }
.hs-flood-slot.denied { background:rgba(239,68,68,0.25); border-color:#ef4444; color:#ef4444; }
@keyframes hs-flood-pulse { 0%,100%{opacity:1;} 50%{opacity:0.4;} }
.hs-flood-anim { animation:hs-flood-pulse 0.8s ease-in-out infinite; }
.hs-flood-vs { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:20px; }
@media(max-width:560px){ .hs-flood-vs { grid-template-columns:1fr; } }
.hs-flood-vs-card { border-radius:14px; padding:20px; border:1px solid; }
.hs-flood-vs-card h5 { font-size:14px; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.hs-flood-vs-card p { font-size:12px; color:#5a6a85; line-height:1.75; }
.hs-flood-vs-card ul { list-style:none; padding:0; margin:8px 0 0; display:flex; flex-direction:column; gap:4px; }
.hs-flood-vs-card ul li { font-size:12px; color:#5a6a85; padding:6px 10px; background:rgba(255,255,255,0.02); border-radius:6px; line-height:1.6; }
.hs-cookie-flow { display:flex; flex-direction:column; gap:6px; margin-top:12px; }
.hs-cookie-step { display:flex; align-items:center; gap:10px; font-size:12px; color:#94a3b8; padding:8px 12px; background:rgba(34,197,94,0.04); border:1px solid rgba(34,197,94,0.15); border-radius:8px; }
.hs-cookie-step-num { flex-shrink:0; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; background:rgba(34,197,94,0.15); border:1px solid #22c55e; color:#22c55e; }
`

const c3States = [
  { c: 'SYN_SENT', s: 'LISTEN', msg: '① Client → Server : SYN(n) 전송 — 연결 요청, ISN = n (임의 난수)', cc: '#22d3ee', sc: '#94a3b8' },
  { c: 'SYN_SENT', s: 'SYN_RCVD', msg: '② Server → Client : SYN(m) + ACK(n+1) — 요청 수락, 서버 ISN = m', cc: '#22d3ee', sc: '#22d3ee' },
  { c: 'ESTABLISHED', s: 'ESTABLISHED', msg: '③ Client → Server : ACK(m+1) — 연결 수립 완료 ✅', cc: '#22c55e', sc: '#22c55e' },
]

const c4States = [
  { c: 'FIN_WAIT_1', s: 'CLOSE_WAIT', msg: '① Client → Server : FIN — 연결 종료 요청 (Active Close)', cc: '#fb7185', sc: '#fb7185' },
  { c: 'FIN_WAIT_2', s: 'CLOSE_WAIT', msg: '② Server → Client : ACK — FIN 수신 확인. 서버는 아직 데이터를 보낼 수 있음.', cc: '#fb7185', sc: '#f59e0b' },
  { c: 'FIN_WAIT_2', s: 'LAST_ACK', msg: '③ Server → Client : FIN — 서버 데이터 전송 완료. 종료 준비.', cc: '#fb7185', sc: '#fb7185' },
  { c: 'TIME_WAIT', s: 'CLOSED', msg: '④ Client → Server : ACK — 최종 확인. 클라이언트 TIME_WAIT 진입 (2×MSL 대기 후 CLOSED) ✅', cc: '#f59e0b', sc: '#4b6080' },
]

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}

interface PeerState { text: string; color: string; bg: string }

export default function TcpHandshake() {
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const [arrows3, setArrows3] = useState([false, false, false])
  const [arrows4, setArrows4] = useState([false, false, false, false])
  const [status3, setStatus3] = useState({ msg: '재생 버튼을 누르면 단계별로 확인할 수 있습니다.', color: '#4b6080' })
  const [status4, setStatus4] = useState({ msg: '재생 버튼을 누르면 단계별로 확인할 수 있습니다.', color: '#4b6080' })
  const [peer3C, setPeer3C] = useState<PeerState>({ text: 'CLOSED', color: '#4b6080', bg: 'rgba(75,96,128,.15)' })
  const [peer3S, setPeer3S] = useState<PeerState>({ text: 'LISTEN', color: '#4b6080', bg: 'rgba(75,96,128,.15)' })
  const [peer4C, setPeer4C] = useState<PeerState>({ text: 'ESTABLISHED', color: '#22d3ee', bg: 'rgba(34,211,238,.1)' })
  const [peer4S, setPeer4S] = useState<PeerState>({ text: 'ESTABLISHED', color: '#22d3ee', bg: 'rgba(34,211,238,.1)' })
  const playing3 = useRef(false)
  const playing4 = useRef(false)
  const playingFlood = useRef(false)
  const [floodSlots, setFloodSlots] = useState<('empty' | 'filled' | 'denied')[]>(Array(6).fill('empty'))
  const [floodStep, setFloodStep] = useState(0)
  const [floodStatus, setFloodStatus] = useState({ msg: '▶ 재생 버튼을 눌러 SYN Flood 공격을 시뮬레이션해보세요', color: '#4b6080' })
  useInjectCSS('style-tcp-handshake', CSS)

  useEffect(() => {
    return () => { timeoutsRef.current.forEach(clearTimeout) }
  }, [])

  function reset3() {
    playing3.current = false
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setArrows3([false, false, false])
    setStatus3({ msg: '재생 버튼을 누르면 단계별로 확인할 수 있습니다.', color: '#4b6080' })
    setPeer3C({ text: 'CLOSED', color: '#4b6080', bg: 'rgba(75,96,128,.15)' })
    setPeer3S({ text: 'LISTEN', color: '#4b6080', bg: 'rgba(75,96,128,.15)' })
  }

  function play3() {
    if (playing3.current) return
    playing3.current = true
    reset3()
    playing3.current = true
    c3States.forEach((s, i) => {
      const t = setTimeout(() => {
        setArrows3(prev => { const n = [...prev]; n[i] = true; return n })
        setStatus3({ msg: s.msg, color: '#e2e8f0' })
        setPeer3C({ text: s.c, color: s.cc, bg: `rgba(${hexToRgb(s.cc)},.12)` })
        setPeer3S({ text: s.s, color: s.sc, bg: `rgba(${hexToRgb(s.sc)},.12)` })
      }, 600 + i * 900)
      timeoutsRef.current.push(t)
    })
    const t = setTimeout(() => { playing3.current = false }, 600 + 2 * 900 + 100)
    timeoutsRef.current.push(t)
  }

  function reset4() {
    playing4.current = false
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setArrows4([false, false, false, false])
    setStatus4({ msg: '재생 버튼을 누르면 단계별로 확인할 수 있습니다.', color: '#4b6080' })
    setPeer4C({ text: 'ESTABLISHED', color: '#22d3ee', bg: 'rgba(34,211,238,.1)' })
    setPeer4S({ text: 'ESTABLISHED', color: '#22d3ee', bg: 'rgba(34,211,238,.1)' })
  }

  function play4() {
    if (playing4.current) return
    playing4.current = true
    reset4()
    playing4.current = true
    c4States.forEach((s, i) => {
      const t = setTimeout(() => {
        setArrows4(prev => { const n = [...prev]; n[i] = true; return n })
        setStatus4({ msg: s.msg, color: '#e2e8f0' })
        setPeer4C({ text: s.c, color: s.cc, bg: `rgba(${hexToRgb(s.cc)},.12)` })
        setPeer4S({ text: s.s, color: s.sc, bg: `rgba(${hexToRgb(s.sc)},.12)` })
      }, 600 + i * 900)
      timeoutsRef.current.push(t)
    })
    const t = setTimeout(() => { playing4.current = false }, 600 + 3 * 900 + 100)
    timeoutsRef.current.push(t)
  }

  function resetFlood() {
    playingFlood.current = false
    setFloodSlots(Array(6).fill('empty'))
    setFloodStep(0)
    setFloodStatus({ msg: '▶ 재생 버튼을 눌러 SYN Flood 공격을 시뮬레이션해보세요', color: '#4b6080' })
  }

  function playFlood() {
    if (playingFlood.current) return
    playingFlood.current = true
    resetFlood()
    playingFlood.current = true

    // Fill backlog queue one by one
    for (let i = 0; i < 6; i++) {
      const t = setTimeout(() => {
        setFloodStep(i + 1)
        setFloodSlots(prev => { const n = [...prev]; n[i] = 'filled'; return n })
        setFloodStatus({ msg: `위조 SYN ${i + 1}/6 수신 — Backlog Queue 채워지는 중...`, color: '#ef4444' })
      }, 500 + i * 500)
      timeoutsRef.current.push(t)
    }
    // Queue full - deny
    const t2 = setTimeout(() => {
      setFloodStep(7)
      setFloodStatus({ msg: 'Backlog Queue 가득 참! 정상 클라이언트 연결 거부됨', color: '#ef4444' })
    }, 500 + 6 * 500)
    timeoutsRef.current.push(t2)

    const t3 = setTimeout(() => { playingFlood.current = false }, 500 + 6 * 500 + 200)
    timeoutsRef.current.push(t3)
  }

  return (
    <>
      <div className="doc-wrap">
        <HeroSection
          tag="TCP Connection · OSI L4 · 면접 필수"
          title={<><span style={{ color: '#22d3ee' }}>3-Way</span> &amp; <span style={{ color: '#fb7185' }}>4-Way</span> Handshake</>}
          description="TCP 가상 회선의 수립과 해제 — SYN/ACK/FIN 패킷 교환부터 TIME_WAIT까지"
        />

        {/* 3-WAY */}
        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>
            TCP 3-Way Handshake — 연결 수립
            <span className="hs-badge hs-b3">Connection Establishment</span>
          </SectionTitle>
          <div className="hs-diagram-box three">
            <div className="hs-peers">
              <div className="hs-peer">
                <div className="hs-peer-icon" style={{ background: 'rgba(34,211,238,.1)', border: '2px solid #22d3ee' }}>🖥️</div>
                <div className="hs-peer-name" style={{ color: '#22d3ee' }}>CLIENT</div>
                <div className="hs-peer-state" style={{ background: peer3C.bg, borderColor: peer3C.color, color: peer3C.color }}>{peer3C.text}</div>
              </div>
              <div></div>
              <div className="hs-peer">
                <div className="hs-peer-icon" style={{ background: 'rgba(34,211,238,.1)', border: '2px solid #22d3ee' }}>🖧</div>
                <div className="hs-peer-name" style={{ color: '#22d3ee' }}>SERVER</div>
                <div className="hs-peer-state" style={{ background: peer3S.bg, borderColor: peer3S.color, color: peer3S.color }}>{peer3S.text}</div>
              </div>
            </div>
            <div className="hs-timeline">
              <div className="hs-tl-side"></div>
              <div className="hs-tl-center">
                <div className={`hs-arrow-row right${arrows3[0] ? ' show' : ''}`}>
                  <span className="hs-ar-flag f-syn">SYN (n)</span>
                  <div className="hs-ar-line l-syn"><span className="hs-ar-desc">연결 요청 · ISN = n (임의 난수)</span></div>
                  <span className="hs-ar-tip" style={{ color: '#22d3ee' }}>→</span>
                </div>
                <div className={`hs-arrow-row left${arrows3[1] ? ' show' : ''}`}>
                  <span className="hs-ar-flag f-synack">SYN (m) + ACK (n+1)</span>
                  <div className="hs-ar-line l-synack"><span className="hs-ar-desc">수락 · 서버 ISN = m · n+1 확인</span></div>
                  <span className="hs-ar-tip" style={{ color: '#a3e635' }}>←</span>
                </div>
                <div className={`hs-arrow-row right${arrows3[2] ? ' show' : ''}`}>
                  <span className="hs-ar-flag f-ack">ACK (m+1)</span>
                  <div className="hs-ar-line l-ack"><span className="hs-ar-desc">연결 확립 · m+1 확인</span></div>
                  <span className="hs-ar-tip" style={{ color: '#a3e635' }}>→</span>
                </div>
              </div>
              <div className="hs-tl-side"></div>
            </div>
            <AnimationControls color="#22d3ee" status={status3} onPlay={play3} onReset={reset3} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Client → Server: SYN(n) 전송 — 연결 요청, ISN = n (임의 난수)', color: '#22d3ee' },
                  { num: '②', text: 'Server → Client: SYN(m) + ACK(n+1) — 요청 수락, 서버 ISN = m', color: '#7dd3fc' },
                  { num: '③', text: 'Client → Server: ACK(m+1) — 연결 수립 완료 (ESTABLISHED)', color: '#22c55e' },
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

        {/* 시퀀스 번호 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>SYN에 임의 난수(ISN)를 쓰는 이유</SectionTitle>
          <div className="hs-seq-box">
            <div className="hs-seq-row">
              <span style={{ fontSize: '18px' }}>①</span>
              <div>
                <div className="hs-seq-code">
                  <span className="hs-seq-tag f-syn">SYN</span>
                  <span style={{ color: '#94a3b8' }}>seq =</span>
                  <span style={{ color: '#22d3ee', fontFamily: 'JetBrains Mono,monospace', fontWeight: 700 }}>n</span>
                  <span style={{ color: '#4b6080', fontSize: '11px' }}>(랜덤 초기 시퀀스 번호 ISN)</span>
                </div>
                <div style={{ fontSize: '12px', color: '#4b6080', marginTop: '4px' }}>클라이언트 → 서버 · 연결 요청</div>
              </div>
            </div>
            <div className="hs-seq-row">
              <span style={{ fontSize: '18px' }}>②</span>
              <div>
                <div className="hs-seq-code">
                  <span className="hs-seq-tag f-synack">SYN+ACK</span>
                  <span style={{ color: '#94a3b8' }}>seq =</span>
                  <span style={{ color: '#22d3ee', fontFamily: 'JetBrains Mono,monospace', fontWeight: 700 }}>m</span>
                  <span style={{ color: '#94a3b8' }}>, ack =</span>
                  <span style={{ color: '#a3e635', fontFamily: 'JetBrains Mono,monospace', fontWeight: 700 }}>n+1</span>
                </div>
                <div style={{ fontSize: '12px', color: '#4b6080', marginTop: '4px' }}>서버 → 클라이언트 · 자신의 ISN(m) 전송 + n 받았음을 n+1로 확인</div>
              </div>
            </div>
            <div className="hs-seq-row">
              <span style={{ fontSize: '18px' }}>③</span>
              <div>
                <div className="hs-seq-code">
                  <span className="hs-seq-tag f-ack">ACK</span>
                  <span style={{ color: '#94a3b8' }}>ack =</span>
                  <span style={{ color: '#a3e635', fontFamily: 'JetBrains Mono,monospace', fontWeight: 700 }}>m+1</span>
                </div>
                <div style={{ fontSize: '12px', color: '#4b6080', marginTop: '4px' }}>클라이언트 → 서버 · m 받았음을 m+1로 확인 → 연결 수립!</div>
              </div>
            </div>
            <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
              <strong style={{ color: '#f59e0b' }}>왜 임의의 난수(ISN, Initial Sequence Number)를 쓸까?</strong><br />
              단순히 0부터 시작하면 이전 연결의 패킷이 뒤늦게 도달했을 때 현재 연결의 데이터로 잘못 인식될 수 있습니다. 이를 <strong style={{ color: '#f59e0b' }}>지연 패킷 충돌</strong>이라 합니다.<br />
              ISN을 랜덤으로 지정하면 이전 연결과 현재 연결의 시퀀스 공간이 겹칠 가능성이 극히 낮아지므로, <strong style={{ color: '#f59e0b' }}>서로 다른 연결의 패킷을 안전하게 구분</strong>할 수 있습니다.<br />
              부가적으로 예측 가능한 시퀀스 번호는 <strong style={{ color: '#f59e0b' }}>TCP 시퀀스 번호 예측 공격</strong>의 표적이 되기 때문에 보안 측면에서도 랜덤 ISN이 필요합니다.
            </HighlightBox>
          </div>
        </div>

        {/* 4-WAY */}
        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>
            TCP 4-Way Handshake — 연결 해제
            <span className="hs-badge hs-b4">Connection Termination</span>
          </SectionTitle>
          <div className="hs-diagram-box four">
            <div className="hs-peers">
              <div className="hs-peer">
                <div className="hs-peer-icon" style={{ background: 'rgba(251,113,133,.1)', border: '2px solid #fb7185' }}>🖥️</div>
                <div className="hs-peer-name" style={{ color: '#fb7185' }}>CLIENT</div>
                <div className="hs-peer-state" style={{ background: peer4C.bg, borderColor: peer4C.color, color: peer4C.color }}>{peer4C.text}</div>
              </div>
              <div></div>
              <div className="hs-peer">
                <div className="hs-peer-icon" style={{ background: 'rgba(251,113,133,.1)', border: '2px solid #fb7185' }}>🖧</div>
                <div className="hs-peer-name" style={{ color: '#fb7185' }}>SERVER</div>
                <div className="hs-peer-state" style={{ background: peer4S.bg, borderColor: peer4S.color, color: peer4S.color }}>{peer4S.text}</div>
              </div>
            </div>
            <div className="hs-timeline">
              <div className="hs-tl-side"></div>
              <div className="hs-tl-center">
                <div className={`hs-arrow-row right${arrows4[0] ? ' show' : ''}`}>
                  <span className="hs-ar-flag f-fin">FIN</span>
                  <div className="hs-ar-line l-fin"><span className="hs-ar-desc">연결 종료 요청 (Active Close)</span></div>
                  <span className="hs-ar-tip" style={{ color: '#fb7185' }}>→</span>
                </div>
                <div className={`hs-arrow-row left${arrows4[1] ? ' show' : ''}`}>
                  <span className="hs-ar-flag f-ack">ACK</span>
                  <div className="hs-ar-line l-ack"><span className="hs-ar-desc">FIN 수신 확인 · 아직 데이터 남을 수 있음</span></div>
                  <span className="hs-ar-tip" style={{ color: '#a3e635' }}>←</span>
                </div>
                <div className={`hs-arrow-row left${arrows4[2] ? ' show' : ''}`}>
                  <span className="hs-ar-flag f-fin">FIN</span>
                  <div className="hs-ar-line l-fin"><span className="hs-ar-desc">서버 측 종료 준비 완료</span></div>
                  <span className="hs-ar-tip" style={{ color: '#fb7185' }}>←</span>
                </div>
                <div className={`hs-arrow-row right${arrows4[3] ? ' show' : ''}`}>
                  <span className="hs-ar-flag f-ack">ACK</span>
                  <div className="hs-ar-line l-ack"><span className="hs-ar-desc">최종 확인 · 클라이언트 TIME_WAIT 진입</span></div>
                  <span className="hs-ar-tip" style={{ color: '#a3e635' }}>→</span>
                </div>
              </div>
              <div className="hs-tl-side"></div>
            </div>
            <AnimationControls color="#fb7185" status={status4} onPlay={play4} onReset={reset4} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Client → Server: FIN — 연결 종료 요청 (Active Close)', color: '#fb7185' },
                  { num: '②', text: 'Server → Client: ACK — FIN 수신 확인, 서버는 아직 데이터 전송 가능', color: '#a3e635' },
                  { num: '③', text: 'Server → Client: FIN — 서버 데이터 전송 완료, 종료 준비', color: '#fb7185' },
                  { num: '④', text: 'Client → Server: ACK — 최종 확인, TIME_WAIT 진입 (2xMSL 대기 후 CLOSED)', color: '#f59e0b' },
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

        {/* TIME_WAIT */}
        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>TIME_WAIT — 왜 바로 닫지 않을까?</SectionTitle>
          <div className="hs-timewait-box">
            <div className="hs-tw-row">
              <div className="hs-tw-num">1</div>
              <div><strong style={{ color: '#fda4af' }}>지연 패킷 대비</strong> — 네트워크상에 아직 떠돌고 있는 패킷이 뒤늦게 도착할 수 있습니다. TIME_WAIT 없이 바로 새 연결을 맺으면 해당 패킷이 <em>새 연결의 데이터</em>로 오인될 수 있습니다.</div>
            </div>
            <div className="hs-tw-row">
              <div className="hs-tw-num">2</div>
              <div><strong style={{ color: '#fda4af' }}>마지막 ACK 유실 대비</strong> — 클라이언트가 보낸 마지막 ACK이 유실되면 서버는 FIN을 재전송합니다. 클라이언트가 이미 CLOSED 상태라면 이 FIN을 처리할 수 없습니다. TIME_WAIT 동안 재전송 FIN을 수신하면 다시 ACK을 보낼 수 있습니다.</div>
            </div>
            <div className="hs-tw-row">
              <div className="hs-tw-num">3</div>
              <div><strong style={{ color: '#fda4af' }}>대기 시간</strong> — 일반적으로 <strong style={{ fontFamily: 'JetBrains Mono,monospace' }}>2 × MSL(Maximum Segment Lifetime)</strong> 동안 대기합니다. MSL은 보통 60초이므로 TIME_WAIT는 최대 2분 정도입니다.</div>
            </div>
            <div className="hs-tw-highlight">
              <strong style={{ color: '#fb7185' }}>반절 닫힘 (Half-Close)</strong> — 4-way에서 서버가 ACK을 먼저 보내고 나중에 FIN을 보내는 이유는, ACK과 FIN 사이에 <strong>서버가 아직 전송할 데이터가 남아있을 수 있기 때문</strong>입니다. 서버는 ACK으로 FIN을 받았음을 알리고, 남은 데이터를 모두 보낸 뒤에야 FIN을 전송합니다.<br /><br />
              <strong style={{ color: '#fb7185' }}>CLOSE_WAIT 누적 문제:</strong> 서버에 CLOSE_WAIT이 대량으로 쌓이면 파일 디스크립터가 고갈되어 새 연결을 수용할 수 없게 됩니다. 주로 <strong>애플리케이션이 소켓을 명시적으로 close()하지 않는 코드 버그</strong>가 원인이며, Connection Pool 누수도 흔한 원인입니다.
            </div>
          </div>
        </div>

        {/* 상태 흐름 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>TCP 연결 상태 흐름</SectionTitle>
          <div style={{ background: '#0c1020', border: '1px solid #1c2a40', borderRadius: '16px', padding: '24px', overflowX: 'auto' }}>
            <div style={{ fontSize: '12px', color: '#4b6080', marginBottom: '16px', fontFamily: 'JetBrains Mono,monospace' }}>CLIENT 관점</div>
            <div className="hs-state-flow">
              {[
                { s: 'CLOSED', l: '초기 상태', bg: 'rgba(75,96,128,.15)', bc: '#4b6080', c: '#4b6080' },
                null,
                { s: 'SYN_SENT', l: 'SYN 전송', bg: 'rgba(34,211,238,0.12)', bc: '#22d3ee', c: '#22d3ee' },
                null,
                { s: 'ESTABLISHED', l: '연결 수립', bg: 'rgba(34,197,94,.1)', bc: '#22c55e', c: '#22c55e' },
                null,
                { s: 'FIN_WAIT_1', l: 'FIN 전송', bg: 'rgba(251,113,133,0.12)', bc: '#fb7185', c: '#fb7185' },
                null,
                { s: 'FIN_WAIT_2', l: 'ACK 수신', bg: 'rgba(251,113,133,0.12)', bc: '#fb7185', c: '#fb7185' },
                null,
                { s: 'TIME_WAIT', l: 'ACK 전송 후 대기', bg: 'rgba(245,158,11,.12)', bc: '#f59e0b', c: '#f59e0b' },
                null,
                { s: 'CLOSED', l: '연결 해제', bg: 'rgba(75,96,128,.15)', bc: '#4b6080', c: '#4b6080' },
              ].map((item, i) =>
                item === null ? (
                  <div key={i} className="hs-sf-arrow">→</div>
                ) : (
                  <div key={i} className="hs-sf-item">
                    <div className="hs-sf-state" style={{ background: item.bg, borderColor: item.bc, color: item.c }}>{item.s}</div>
                    <div className="hs-sf-label">{item.l}</div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* SYN Flood 공격 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>SYN Flood 공격과 방어</SectionTitle>
          <div className="hs-flood-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', lineHeight: 1.8, marginBottom: '16px' }}>
              <strong style={{ color: '#ef4444' }}>SYN Flood</strong>는 TCP 3-way handshake의 구조적 취약점을 노린 <strong style={{ color: '#ef4444' }}>DDoS 공격</strong>입니다.
              공격자가 출발지 IP를 위조한 SYN 패킷을 대량 전송하면 서버의 Backlog Queue가 가득 차 정상 연결을 처리할 수 없게 됩니다.
            </div>

            <div className="hs-flood-diagram">
              <div className="hs-flood-entity">
                <div className="hs-flood-icon" style={{ background: 'rgba(239,68,68,0.1)', borderColor: '#ef4444' }}>
                  {floodStep >= 1 ? <span className={floodStep < 7 ? 'hs-flood-anim' : ''}>👤</span> : '👤'}
                </div>
                <div className="hs-flood-name" style={{ color: '#ef4444' }}>ATTACKER</div>
                <div style={{ fontSize: '10px', color: '#5a6a85' }}>위조 IP</div>
              </div>

              <div className="hs-flood-flow">
                {[1, 2, 3].map(i => (
                  <div key={i} className="hs-flood-arrow" style={{ opacity: floodStep >= i ? 1 : 0.2, background: floodStep >= i ? 'rgba(239,68,68,0.06)' : 'transparent' }}>
                    <span style={{ color: '#ef4444', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', fontSize: '11px' }}>SYN (fake IP #{i})</span>
                    <div className="hs-flood-arrow-line" style={{ background: floodStep >= i ? '#ef4444' : '#1c2a40' }} />
                    <span style={{ color: '#ef4444' }}>→</span>
                  </div>
                ))}
                {floodStep >= 7 && (
                  <div className="hs-flood-arrow" style={{ background: 'rgba(239,68,68,0.08)' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', fontSize: '11px' }}>정상 SYN</span>
                    <div className="hs-flood-arrow-line" style={{ background: '#ef4444' }} />
                    <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '11px' }}>✕ 거부!</span>
                  </div>
                )}
              </div>

              <div className="hs-flood-queue">
                <div className="hs-flood-queue-title" style={{ color: '#fb7185' }}>Backlog Queue</div>
                {floodSlots.map((st, i) => (
                  <div key={i} className={`hs-flood-slot ${st}`}>
                    {st === 'filled' ? `SYN_RCVD #${i + 1}` : st === 'denied' ? 'FULL' : '—'}
                  </div>
                ))}
                {floodStep >= 7 && (
                  <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 700, textAlign: 'center', marginTop: '8px' }}>
                    Queue 가득 참!
                  </div>
                )}
              </div>

              <div className="hs-flood-entity">
                <div className="hs-flood-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>🖧</div>
                <div className="hs-flood-name" style={{ color: '#3b82f6' }}>SERVER</div>
                <div style={{ fontSize: '10px', color: '#5a6a85' }}>SYN+ACK 대기 중</div>
              </div>
            </div>
            <AnimationControls color="#ef4444" status={floodStatus} onPlay={playFlood} onReset={resetFlood} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '공격자가 위조 IP로 SYN 패킷을 대량 전송', color: '#ef4444' },
                  { num: '②', text: '서버가 SYN_RCVD 상태의 반개방 연결을 Backlog Queue에 저장', color: '#ef4444' },
                  { num: '③', text: '위조 IP로 보낸 SYN+ACK은 응답이 돌아오지 않음 — Queue 계속 누적', color: '#f59e0b' },
                  { num: '④', text: 'Backlog Queue가 가득 참 (6/6)', color: '#ef4444' },
                  { num: '⑤', text: '정상 클라이언트의 SYN 요청이 거부됨 — 서비스 거부(DoS) 발생', color: '#ef4444' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', lineHeight: 1.6 }}>
                    <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.num}</span>
                    <span style={{ color: '#94a3b8' }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hs-flood-vs" style={{ marginTop: '20px' }}>
            <div className="hs-flood-vs-card" style={{ borderColor: '#ef444440', background: 'rgba(239,68,68,0.04)' }}>
              <h5 style={{ color: '#ef4444' }}>공격 원리</h5>
              <ul>
                <li>공격자가 <strong style={{ color: '#fca5a5' }}>출발지 IP를 위조</strong>한 SYN 패킷을 대량 전송</li>
                <li>서버는 SYN_RCVD 상태의 <strong style={{ color: '#fca5a5' }}>반개방(half-open) 연결</strong>을 큐에 저장</li>
                <li>위조 IP로 보낸 SYN+ACK은 응답이 돌아오지 않음</li>
                <li>Backlog Queue가 가득 차면 <strong style={{ color: '#fca5a5' }}>정상 연결 요청 거부</strong></li>
              </ul>
            </div>
            <div className="hs-flood-vs-card" style={{ borderColor: '#22c55e40', background: 'rgba(34,197,94,0.04)' }}>
              <h5 style={{ color: '#22c55e' }}>SYN Cookie 방어</h5>
              <p style={{ marginBottom: '8px' }}>Backlog Queue를 사용하지 않고 연결을 검증하는 방법입니다.</p>
              <div className="hs-cookie-flow">
                <div className="hs-cookie-step">
                  <div className="hs-cookie-step-num">1</div>
                  <span>SYN 수신 시 큐에 저장하지 않고, 시퀀스 번호에 <strong style={{ color: '#22c55e' }}>암호화된 쿠키값</strong>을 포함하여 SYN+ACK 응답</span>
                </div>
                <div className="hs-cookie-step">
                  <div className="hs-cookie-step-num">2</div>
                  <span>정상 클라이언트는 ACK(쿠키+1)을 다시 전송 — 위조 IP는 응답 불가</span>
                </div>
                <div className="hs-cookie-step">
                  <div className="hs-cookie-step-num">3</div>
                  <span>ACK의 쿠키값을 검증하여 <strong style={{ color: '#22c55e' }}>정상 연결만 수립</strong> — Queue 없이 방어 가능</span>
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>기타 방어 방법:</strong> SYN Proxy (중간에서 핸드셰이크 대행), Rate Limiting (IP당 SYN 횟수 제한),
            방화벽/IDS 설정, Backlog Queue 크기 증가, <code style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono,monospace', fontSize: '12px' }}>tcp_syncookies</code> 커널 파라미터 활성화 등이 있습니다.
          </HighlightBox>
        </div>

        {/* 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>3-Way vs 4-Way — 한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1c2a40' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>항목</th>
                  <th style={{ color: '#22d3ee' }}>3-Way Handshake</th>
                  <th style={{ color: '#fb7185' }}>4-Way Handshake</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ color: '#4b6080', fontWeight: 600 }}>목적</td><td style={{ color: '#7dd3fc' }}>연결 수립 (가상 회선 생성)</td><td style={{ color: '#fda4af' }}>연결 해제 (가상 회선 제거)</td></tr>
                <tr><td style={{ color: '#4b6080', fontWeight: 600 }}>패킷 수</td><td style={{ color: '#7dd3fc' }}>3개 (SYN → SYN+ACK → ACK)</td><td style={{ color: '#fda4af' }}>4개 (FIN → ACK → FIN → ACK)</td></tr>
                <tr><td style={{ color: '#4b6080', fontWeight: 600 }}>왜 3단계?</td><td style={{ color: '#7dd3fc' }}>양방향 통신 가능 여부를 최소로 확인</td><td style={{ color: '#fda4af' }}>서버가 FIN과 ACK을 따로 보내야 하므로</td></tr>
                <tr><td style={{ color: '#4b6080', fontWeight: 600 }}>시퀀스 번호</td><td style={{ color: '#7dd3fc' }}>임의 ISN 교환으로 연결 구분</td><td style={{ color: '#fda4af' }}>사용하지 않음 (FIN/ACK만 교환)</td></tr>
                <tr><td style={{ color: '#4b6080', fontWeight: 600 }}>특이 사항</td><td style={{ color: '#7dd3fc' }}>SYN Flooding 공격의 표적</td><td style={{ color: '#fda4af' }}>클라이언트 TIME_WAIT 상태 발생</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#22d3ee', '#fb7185']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#22d3ee" items={[
            { q: 'TCP 연결에 2-way가 아닌 3-way handshake가 필요한 이유는?', a: '2-way만으로는 클라이언트가 서버의 SYN+ACK를 받았는지 서버가 확인할 수 없습니다. 3번째 ACK이 없으면 서버는 연결이 수립되었다고 착각할 수 있고, 클라이언트가 보낸 첫 SYN이 지연 도착한 경우 잘못된 연결이 생길 수 있습니다. 3-way는 양쪽 모두의 송수신 능력을 최소 단계로 검증합니다.' },
            { q: 'TIME_WAIT 상태가 서버에 미치는 영향과 해결 방법은?', a: '동시 접속이 많은 서버에서 TIME_WAIT 소켓이 대량 누적되면 포트가 고갈될 수 있습니다. 해결책으로 SO_REUSEADDR 옵션으로 TIME_WAIT 포트 재사용, tcp_tw_reuse 커널 파라미터 활성화, Connection Pooling 사용, Keep-Alive로 연결 재사용 등이 있습니다.' },
            { q: 'SYN Flooding 공격의 원리와 방어 방법은?', a: '공격자가 출발지 IP를 위조한 SYN 패킷을 대량 전송하면, 서버는 SYN_RCVD 상태의 반개방(half-open) 연결을 큐에 저장합니다. 큐가 가득 차면 정상 연결 요청을 처리할 수 없습니다. 방어법으로 SYN Cookie(큐 없이 연결 검증), SYN Proxy, rate limiting, 방화벽 설정 등이 있습니다.' },
            { q: 'CLOSE_WAIT 상태가 서버에 대량 발생하는 원인과 해결방법은?', a: 'CLOSE_WAIT은 상대방이 FIN을 보냈지만 자신은 아직 close()를 호출하지 않은 상태입니다. 서버에 대량 발생하는 주된 원인은 애플리케이션 코드에서 소켓을 명시적으로 닫지 않는 버그입니다. Connection Pool 누수, try-catch 블록에서 finally로 close를 보장하지 않는 경우, 비정상 종료 시 소켓 정리가 안 되는 경우 등이 있습니다. 해결방법으로는 코드 리뷰를 통한 소켓 close 보장(try-with-resources 등), Connection Pool의 idle timeout 설정, lsof나 netstat으로 CLOSE_WAIT 소켓을 모니터링하고 원인 프로세스를 추적하는 것이 있습니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

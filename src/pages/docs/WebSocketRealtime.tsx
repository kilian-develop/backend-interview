import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.ws-compare-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; margin-bottom:48px; }
.ws-card { background:#0e1118; border-radius:18px; padding:24px; border:1px solid #1a2234; transition:transform .25s, box-shadow .25s; }
.ws-card:hover { transform:translateY(-4px); }
.ws-card-title { font-size:16px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:8px; }
.ws-card-sub { font-size:11px; color:#5a6a85; margin-bottom:16px; font-family:'JetBrains Mono',monospace; }
.ws-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; margin-bottom:14px; }
.ws-card-props { display:flex; flex-direction:column; gap:8px; }
.ws-card-prop { display:flex; justify-content:space-between; align-items:center; padding:8px 12px; background:rgba(255,255,255,0.025); border-radius:7px; font-size:12px; gap:10px; }
.ws-card-prop-label { color:#5a6a85; font-size:11px; white-space:nowrap; }
.ws-card-prop-val { font-weight:700; font-size:12px; text-align:right; }
.ws-good { color:#22c55e; } .ws-bad { color:#ef4444; } .ws-neutral { color:#94a3b8; } .ws-warn { color:#f59e0b; }
.ws-hs-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.ws-hs-arena { display:flex; justify-content:space-between; align-items:flex-start; position:relative; gap:16px; min-height:220px; }
.ws-hs-peer { flex:0 0 100px; display:flex; flex-direction:column; align-items:center; gap:10px; padding-top:10px; }
.ws-hs-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; border:2px solid #1a2234; }
.ws-hs-peer-name { font-size:12px; font-weight:700; color:#5a6a85; font-family:'JetBrains Mono',monospace; }
.ws-hs-mid { flex:1; display:flex; flex-direction:column; justify-content:space-around; padding:20px 0; gap:8px; }
.ws-hs-arrow { display:flex; align-items:center; gap:8px; opacity:0; transform:translateY(6px); transition:opacity .5s ease, transform .5s ease; padding:10px 12px; border-radius:8px; }
.ws-hs-arrow.right { flex-direction:row; }
.ws-hs-arrow.left { flex-direction:row-reverse; }
.ws-hs-arrow.show { opacity:1; transform:translateY(0); }
.ws-hs-flag { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:4px 10px; border-radius:6px; white-space:nowrap; flex-shrink:0; }
.ws-hs-line { flex:1; height:2px; border-radius:2px; }
.ws-hs-tip { font-size:16px; line-height:1; flex-shrink:0; }
.ws-hs-desc { font-size:10px; color:#5a6a85; margin-top:2px; }
.ws-poll-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.ws-poll-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:16px; }
@media(max-width:640px){ .ws-poll-grid{ grid-template-columns:1fr; } }
.ws-poll-panel { background:#0a0d14; border:1px solid #1a2234; border-radius:14px; padding:20px; overflow:hidden; }
.ws-poll-panel h4 { font-size:14px; font-weight:900; margin-bottom:4px; font-family:'JetBrains Mono',monospace; }
.ws-poll-panel .ws-poll-sub { font-size:11px; color:#5a6a85; margin-bottom:16px; }
.ws-poll-timeline { display:flex; flex-direction:column; gap:4px; min-height:200px; }
.ws-poll-msg { display:flex; align-items:center; gap:6px; padding:5px 10px; border-radius:6px; font-size:10px; font-family:'JetBrains Mono',monospace; opacity:0; transform:translateX(-8px); transition:opacity .4s ease, transform .4s ease; }
.ws-poll-msg.show { opacity:1; transform:translateX(0); }
.ws-poll-msg.req { color:#3b82f6; background:rgba(59,130,246,0.06); }
.ws-poll-msg.res { color:#22c55e; background:rgba(34,197,94,0.06); }
.ws-poll-msg.res-empty { color:#5a6a85; background:rgba(75,96,128,0.06); }
.ws-poll-msg.ws-data { color:#a855f7; background:rgba(168,85,247,0.06); }
.ws-poll-counter { margin-top:12px; text-align:center; font-size:11px; font-family:'JetBrains Mono',monospace; padding:8px; background:rgba(255,255,255,0.02); border-radius:8px; }
.ws-usecase-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
.ws-usecase { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.ws-usecase:hover { transform:translateY(-3px); }
.ws-usecase-icon { font-size:28px; margin-bottom:10px; }
.ws-usecase-title { font-size:14px; font-weight:700; margin-bottom:6px; }
.ws-usecase-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.ws-usecase-tech { font-size:10px; font-family:'JetBrains Mono',monospace; margin-top:8px; padding:4px 10px; background:rgba(0,0,0,.3); border-radius:6px; color:#94a3b8; display:inline-block; }
.ws-lifecycle { display:flex; flex-wrap:wrap; gap:0; align-items:center; justify-content:center; margin-bottom:16px; }
.ws-lc-step { display:flex; flex-direction:column; align-items:center; gap:6px; padding:14px 16px; min-width:110px; }
.ws-lc-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:18px; border:2px solid; }
.ws-lc-name { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.ws-lc-desc { font-size:10px; color:#5a6a85; text-align:center; max-width:100px; line-height:1.5; }
.ws-lc-arrow { color:#5a6a85; font-size:20px; padding:0 2px; margin-top:-20px; }
.ws-frame-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.ws-frame-row { display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; margin-bottom:8px; }
.ws-frame-field { min-width:120px; font-size:12px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.ws-frame-desc { font-size:12px; color:#5a6a85; line-height:1.6; }
`

const hsSteps = [
  { dir: 'right' as const, flag: 'HTTP GET + Upgrade', flagBg: 'rgba(59,130,246,.15)', flagBorder: '#3b82f6', flagColor: '#3b82f6', line: '#3b82f6', desc: 'Upgrade: websocket, Connection: Upgrade 헤더 전송' },
  { dir: 'left' as const, flag: '101 Switching Protocols', flagBg: 'rgba(34,197,94,.12)', flagBorder: '#22c55e', flagColor: '#22c55e', line: '#22c55e', desc: '서버가 프로토콜 전환을 수락' },
  { dir: 'right' as const, flag: 'WebSocket Frame (양방향)', flagBg: 'rgba(168,85,247,.12)', flagBorder: '#a855f7', flagColor: '#a855f7', line: '#a855f7', desc: '이제 양방향 실시간 통신 시작!' },
]

export default function WebSocketRealtime() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '>> 재생 버튼을 눌러 WebSocket 핸드셰이크를 확인하세요', color: '#5a6a85' })

  // Polling vs WebSocket animation
  const [pollStep, setPollStep] = useState(0)
  const [pollPlaying, setPollPlaying] = useState(false)
  const pollTimeline = useAnimationTimeline()
  const [pollStatus, setPollStatus] = useState({ msg: '>> 재생 버튼을 눌러 Polling과 WebSocket의 차이를 비교하세요', color: '#5a6a85' })

  useInjectCSS('style-websocket-realtime', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    hsSteps.forEach((s, i) => {
      schedule(() => {
        setStep(i + 1)
        setStatus({ msg: `${i + 1}/${hsSteps.length} ${s.flag} -- ${s.desc}`, color: s.flagColor })
      }, 500 + i * 1000)
    })
    schedule(() => {
      setStatus({ msg: 'WebSocket 연결 수립 완료! HTTP에서 WebSocket으로 프로토콜이 전환되었습니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 500 + hsSteps.length * 1000 + 400)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '>> 재생 버튼을 눌러 WebSocket 핸드셰이크를 확인하세요', color: '#5a6a85' })
  }

  const playPoll = () => {
    if (pollPlaying) return
    handlePollReset()
    setPollPlaying(true)
    // Polling side: 8 request/response pairs (some empty)
    const pollMsgs = [
      { delay: 300, step: 1 },  // req 1
      { delay: 600, step: 2 },  // res empty
      { delay: 1200, step: 3 }, // req 2
      { delay: 1500, step: 4 }, // res empty
      { delay: 2100, step: 5 }, // req 3
      { delay: 2400, step: 6 }, // res: data!
      { delay: 3000, step: 7 }, // req 4
      { delay: 3300, step: 8 }, // res empty
    ]
    // WebSocket side: connect then push data
    const wsMsgs = [
      { delay: 300, step: 9 },   // upgrade
      { delay: 800, step: 10 },  // connected
      { delay: 2200, step: 11 }, // server push
      { delay: 2800, step: 12 }, // client msg
      { delay: 3400, step: 13 }, // server push
    ]

    ;[...pollMsgs, ...wsMsgs].forEach(({ delay, step: s }) => {
      pollTimeline.schedule(() => {
        setPollStep(s)
        if (s <= 8) {
          setPollStatus({ msg: `Polling: 요청 ${Math.ceil(s / 2)}/4 -- ${s % 2 === 0 ? '응답 수신' : '요청 전송'}`, color: '#3b82f6' })
        } else {
          setPollStatus({ msg: `WebSocket: ${s === 9 ? '연결 수립' : s === 10 ? '연결 완료' : '실시간 메시지 교환'}`, color: '#a855f7' })
        }
      }, delay)
    })

    pollTimeline.schedule(() => {
      setPollStatus({ msg: 'Polling은 4번 요청으로 1번 데이터 수신 vs WebSocket은 연결 1번으로 실시간 통신!', color: '#22c55e' })
      setPollPlaying(false)
    }, 3800)
  }

  const handlePollReset = () => {
    pollTimeline.reset()
    setPollStep(0)
    setPollPlaying(false)
    setPollStatus({ msg: '>> 재생 버튼을 눌러 Polling과 WebSocket의 차이를 비교하세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(168,85,247,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.05) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Application Layer . Real-time . WebSocket . 면접 필수"
          title={<><span style={{ color: '#a855f7' }}>WebSocket</span> & 실시간 통신</>}
          description={<>Polling, SSE, WebSocket -- 실시간 통신 방식의 진화와<br />각 기술의 동작 원리, 적합한 사용 사례를 비교합니다.</>}
        />

        {/* 4가지 실시간 통신 비교 카드 */}
        <div className="ws-compare-grid">
          <div className="ws-card" style={{ borderTop: '3px solid #94a3b8', boxShadow: '0 0 30px rgba(148,163,184,0.1)' }}>
            <div className="ws-card-title" style={{ color: '#94a3b8' }}>Short Polling</div>
            <div className="ws-card-sub">주기적 요청 방식</div>
            <div className="ws-card-desc">
              클라이언트가 <strong style={{ color: '#cbd5e1' }}>일정 간격으로 서버에 반복 요청</strong>하여 새 데이터가 있는지 확인합니다.
              가장 단순하지만 불필요한 요청이 많아 비효율적입니다.
            </div>
            <div className="ws-card-props">
              {[
                ['방향', '단방향 (클라이언트 -> 서버)', 'neutral'],
                ['실시간성', '낮음 (간격에 의존)', 'bad'],
                ['서버 부하', '높음 (빈 응답 다수)', 'bad'],
                ['구현 난이도', '매우 쉬움', 'good'],
                ['연결 방식', '매번 새 HTTP 요청', 'neutral'],
              ].map(([l, v, t]) => (
                <div key={l} className="ws-card-prop">
                  <span className="ws-card-prop-label">{l}</span>
                  <span className={`ws-card-prop-val ws-${t}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ws-card" style={{ borderTop: '3px solid #3b82f6', boxShadow: '0 0 30px rgba(59,130,246,0.15)' }}>
            <div className="ws-card-title" style={{ color: '#3b82f6' }}>Long Polling</div>
            <div className="ws-card-sub">대기 후 응답 방식</div>
            <div className="ws-card-desc">
              서버가 <strong style={{ color: '#93c5fd' }}>새 데이터가 생길 때까지 응답을 보류</strong>합니다.
              데이터 발생 시 즉시 응답 후 클라이언트가 다시 요청을 보냅니다.
            </div>
            <div className="ws-card-props">
              {[
                ['방향', '단방향 (서버 -> 클라이언트)', 'neutral'],
                ['실시간성', '보통 (이벤트 발생 시 즉시)', 'warn'],
                ['서버 부하', '보통 (연결 유지 비용)', 'warn'],
                ['구현 난이도', '쉬움', 'good'],
                ['연결 방식', '응답 후 재연결 필요', 'neutral'],
              ].map(([l, v, t]) => (
                <div key={l} className="ws-card-prop">
                  <span className="ws-card-prop-label">{l}</span>
                  <span className={`ws-card-prop-val ws-${t}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ws-card" style={{ borderTop: '3px solid #06b6d4', boxShadow: '0 0 30px rgba(6,182,212,0.15)' }}>
            <div className="ws-card-title" style={{ color: '#06b6d4' }}>SSE</div>
            <div className="ws-card-sub">Server-Sent Events</div>
            <div className="ws-card-desc">
              서버가 <strong style={{ color: '#67e8f9' }}>단방향으로 이벤트를 클라이언트에 푸시</strong>합니다.
              HTTP 기반이라 기존 인프라와 호환이 좋고, 자동 재연결을 지원합니다.
            </div>
            <div className="ws-card-props">
              {[
                ['방향', '단방향 (서버 -> 클라이언트)', 'neutral'],
                ['실시간성', '높음 (서버 푸시)', 'good'],
                ['서버 부하', '낮음 (HTTP 스트림)', 'good'],
                ['구현 난이도', '쉬움', 'good'],
                ['연결 방식', 'HTTP 연결 유지 (자동 재연결)', 'good'],
              ].map(([l, v, t]) => (
                <div key={l} className="ws-card-prop">
                  <span className="ws-card-prop-label">{l}</span>
                  <span className={`ws-card-prop-val ws-${t}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ws-card" style={{ borderTop: '3px solid #a855f7', boxShadow: '0 0 30px rgba(168,85,247,0.2)' }}>
            <div className="ws-card-title" style={{ color: '#a855f7' }}>WebSocket</div>
            <div className="ws-card-sub">Full-Duplex 양방향 통신</div>
            <div className="ws-card-desc">
              HTTP Upgrade를 통해 <strong style={{ color: '#c084fc' }}>양방향 전이중(Full-Duplex) 통신 채널</strong>을 수립합니다.
              클라이언트와 서버가 언제든 자유롭게 메시지를 주고받습니다.
            </div>
            <div className="ws-card-props">
              {[
                ['방향', '양방향 (Full-Duplex)', 'good'],
                ['실시간성', '매우 높음', 'good'],
                ['서버 부하', '연결 유지 비용 있음', 'warn'],
                ['구현 난이도', '보통', 'warn'],
                ['연결 방식', '지속 연결 (TCP 기반)', 'good'],
              ].map(([l, v, t]) => (
                <div key={l} className="ws-card-prop">
                  <span className="ws-card-prop-label">{l}</span>
                  <span className={`ws-card-prop-val ws-${t}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Polling vs WebSocket 비교 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>Short Polling vs WebSocket -- 통신 흐름 비교</SectionTitle>
          <div className="ws-poll-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
              같은 시간 동안 Short Polling과 WebSocket이 어떻게 다르게 동작하는지 비교해보세요.
            </div>
            <div className="ws-poll-grid">
              <div className="ws-poll-panel" style={{ borderTop: '3px solid #3b82f6' }}>
                <h4 style={{ color: '#3b82f6' }}>Short Polling</h4>
                <div className="ws-poll-sub">매번 새 HTTP 요청 필요</div>
                <div className="ws-poll-timeline">
                  {[
                    { step: 1, type: 'req', text: '-> GET /api/messages (요청 1)' },
                    { step: 2, type: 'res-empty', text: '<- 200 OK (변경 없음)' },
                    { step: 3, type: 'req', text: '-> GET /api/messages (요청 2)' },
                    { step: 4, type: 'res-empty', text: '<- 200 OK (변경 없음)' },
                    { step: 5, type: 'req', text: '-> GET /api/messages (요청 3)' },
                    { step: 6, type: 'res', text: '<- 200 OK { "msg": "안녕!" }' },
                    { step: 7, type: 'req', text: '-> GET /api/messages (요청 4)' },
                    { step: 8, type: 'res-empty', text: '<- 200 OK (변경 없음)' },
                  ].map((m) => (
                    <div key={m.step} className={`ws-poll-msg ${m.type} ${pollStep >= m.step ? 'show' : ''}`}>
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="ws-poll-counter" style={{ color: '#3b82f6' }}>
                  HTTP 요청: <strong>{Math.min(Math.ceil(Math.min(pollStep, 8) / 2 + 0.1), 4).toString()}/4</strong> | 실제 데이터: <strong>{pollStep >= 6 ? '1' : '0'}</strong>
                </div>
              </div>

              <div className="ws-poll-panel" style={{ borderTop: '3px solid #a855f7' }}>
                <h4 style={{ color: '#a855f7' }}>WebSocket</h4>
                <div className="ws-poll-sub">연결 1번으로 실시간 통신</div>
                <div className="ws-poll-timeline">
                  {[
                    { step: 9, type: 'req', text: '-> Upgrade: websocket' },
                    { step: 10, type: 'res', text: '<- 101 Switching Protocols' },
                    { step: 11, type: 'ws-data', text: '<- { "msg": "안녕!" } (서버 푸시)' },
                    { step: 12, type: 'ws-data', text: '-> { "msg": "반가워!" } (클라이언트)' },
                    { step: 13, type: 'ws-data', text: '<- { "msg": "새 알림!" } (서버 푸시)' },
                  ].map((m) => (
                    <div key={m.step} className={`ws-poll-msg ${m.type} ${pollStep >= m.step ? 'show' : ''}`}>
                      {m.text}
                    </div>
                  ))}
                </div>
                <div className="ws-poll-counter" style={{ color: '#a855f7' }}>
                  HTTP 요청: <strong>{pollStep >= 9 ? '1 (Upgrade)' : '0'}</strong> | 실시간 메시지: <strong>{Math.max(0, Math.min(pollStep, 13) - 10)}</strong>
                </div>
              </div>
            </div>
            <AnimationControls color="#a855f7" status={pollStatus} onPlay={playPoll} onReset={handlePollReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Polling: 클라이언트가 GET 요청 전송 (요청 1)', color: '#3b82f6' },
                  { num: '②', text: 'Polling: 서버 응답 200 OK — 변경 없음 (빈 응답)', color: '#5a6a85' },
                  { num: '③', text: 'Polling: 반복 요청 2~3 — 대부분 빈 응답', color: '#3b82f6' },
                  { num: '④', text: 'Polling: 요청 3에서 드디어 데이터 수신 (4번 중 1번 유효)', color: '#22c55e' },
                  { num: '⑤', text: 'WebSocket: Upgrade 요청 → 101 Switching Protocols 응답', color: '#a855f7' },
                  { num: '⑥', text: 'WebSocket: 서버 푸시 + 클라이언트 메시지 — 실시간 양방향 교환', color: '#a855f7' },
                  { num: '⑦', text: '결과: Polling은 4번 요청에 1번 유효 vs WebSocket은 연결 1번으로 실시간 통신', color: '#22c55e' },
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

        {/* WebSocket 핸드셰이크 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>WebSocket 핸드셰이크 (HTTP Upgrade)</SectionTitle>
          <div className="ws-hs-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
              WebSocket은 <strong style={{ color: '#a855f7' }}>HTTP 요청으로 시작</strong>하여 101 Switching Protocols 응답 후 프로토콜이 전환됩니다.
            </div>
            <div className="ws-hs-arena">
              <div className="ws-hs-peer">
                <div className="ws-hs-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>PC</div>
                <div className="ws-hs-peer-name">CLIENT</div>
              </div>
              <div className="ws-hs-mid">
                {hsSteps.map((s, i) => (
                  <div key={i} className={`ws-hs-arrow ${s.dir} ${step >= i + 1 ? 'show' : ''}`}>
                    <div>
                      <span className="ws-hs-flag" style={{ background: s.flagBg, border: `1px solid ${s.flagBorder}`, color: s.flagColor }}>{s.flag}</span>
                      <div className="ws-hs-desc">{s.desc}</div>
                    </div>
                    <div className="ws-hs-line" style={{ background: s.line }} />
                    <span className="ws-hs-tip" style={{ color: s.line }}>{s.dir === 'right' ? '->' : '<-'}</span>
                  </div>
                ))}
              </div>
              <div className="ws-hs-peer">
                <div className="ws-hs-icon" style={{ background: 'rgba(168,85,247,0.1)', borderColor: '#a855f7' }}>SV</div>
                <div className="ws-hs-peer-name">SERVER</div>
              </div>
            </div>
            <AnimationControls color="#a855f7" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Client → Server: HTTP GET + Upgrade: websocket 헤더 전송', color: '#3b82f6' },
                  { num: '②', text: 'Server → Client: 101 Switching Protocols 응답 — 프로토콜 전환 수락', color: '#22c55e' },
                  { num: '③', text: '양방향 WebSocket Frame 통신 시작 — HTTP에서 WS로 프로토콜 전환 완료', color: '#a855f7' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', lineHeight: 1.6 }}>
                    <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.num}</span>
                    <span style={{ color: '#94a3b8' }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 핸드셰이크 헤더 예시 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '18px', borderTop: '2px solid #3b82f6' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>Client Request</div>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', lineHeight: 1.9, color: '#94a3b8' }}>
                <span style={{ color: '#22c55e' }}>GET</span> /chat <span style={{ color: '#5a6a85' }}>HTTP/1.1</span><br />
                <span style={{ color: '#06b6d4' }}>Host:</span> example.com<br />
                <span style={{ color: '#06b6d4' }}>Upgrade:</span> <span style={{ color: '#a855f7' }}>websocket</span><br />
                <span style={{ color: '#06b6d4' }}>Connection:</span> Upgrade<br />
                <span style={{ color: '#06b6d4' }}>Sec-WebSocket-Key:</span> dGhlIH...<br />
                <span style={{ color: '#06b6d4' }}>Sec-WebSocket-Version:</span> 13
              </div>
            </div>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '18px', borderTop: '2px solid #22c55e' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>Server Response</div>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', lineHeight: 1.9, color: '#94a3b8' }}>
                <span style={{ color: '#5a6a85' }}>HTTP/1.1</span> <span style={{ color: '#22c55e', fontWeight: 700 }}>101 Switching Protocols</span><br />
                <span style={{ color: '#06b6d4' }}>Upgrade:</span> <span style={{ color: '#a855f7' }}>websocket</span><br />
                <span style={{ color: '#06b6d4' }}>Connection:</span> Upgrade<br />
                <span style={{ color: '#06b6d4' }}>Sec-WebSocket-Accept:</span> s3pPL...<br />
              </div>
            </div>
          </div>
          <HighlightBox color="#a855f7" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#a855f7' }}>Sec-WebSocket-Key/Accept:</strong> 클라이언트가 랜덤 키를 보내면 서버가 이를 GUID와 결합하여 SHA-1 해시 후 Base64로 인코딩한 값을 반환합니다. 이를 통해 <strong style={{ color: '#a855f7' }}>진짜 WebSocket 서버인지 검증</strong>합니다.
          </HighlightBox>
        </div>

        {/* WebSocket 연결 생명주기 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>WebSocket 연결 생명주기</SectionTitle>
          <div className="ws-lifecycle">
            {[
              { icon: 'HTTP', name: 'HTTP Upgrade', desc: '핸드셰이크 요청', color: '#3b82f6' },
              null,
              { icon: '101', name: '프로토콜 전환', desc: '101 응답', color: '#22c55e' },
              null,
              { icon: 'WS', name: '양방향 통신', desc: '메시지 교환', color: '#a855f7' },
              null,
              { icon: 'Ping', name: 'Heartbeat', desc: 'Ping/Pong', color: '#f59e0b' },
              null,
              { icon: 'FIN', name: '연결 종료', desc: 'Close Frame', color: '#ef4444' },
            ].map((item, i) =>
              item === null ? (
                <div key={i} className="ws-lc-arrow">{'→'}</div>
              ) : (
                <div key={i} className="ws-lc-step">
                  <div className="ws-lc-icon" style={{ background: `${item.color}15`, borderColor: item.color, color: item.color, fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace' }}>{item.icon}</div>
                  <div className="ws-lc-name" style={{ color: item.color }}>{item.name}</div>
                  <div className="ws-lc-desc">{item.desc}</div>
                </div>
              )
            )}
          </div>
          <HighlightBox color="#f59e0b">
            <strong style={{ color: '#f59e0b' }}>Ping/Pong Heartbeat:</strong> WebSocket은 연결이 살아있는지 확인하기 위해 주기적으로 Ping 프레임을 보내고, 상대방이 Pong으로 응답합니다. 응답이 없으면 연결이 끊어진 것으로 판단하여 정리합니다.
          </HighlightBox>
        </div>

        {/* SSE 상세 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>SSE (Server-Sent Events) -- 서버 단방향 푸시</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '22px', borderTop: '2px solid #06b6d4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#06b6d4', marginBottom: '12px' }}>SSE의 특징</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  'HTTP 기반 -- 기존 인프라(프록시, 로드밸런서)와 호환',
                  '단방향 -- 서버에서 클라이언트로만 데이터 전송',
                  '자동 재연결 -- 연결이 끊어지면 브라우저가 자동 재시도',
                  'EventSource API -- 브라우저 내장 API로 간단하게 구현',
                  'text/event-stream -- Content-Type으로 스트림 유지',
                ].map((t) => (
                  <div key={t} style={{ fontSize: '12px', color: '#94a3b8', padding: '8px 12px', background: 'rgba(6,182,212,0.04)', borderRadius: '6px', lineHeight: 1.6 }}>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '22px', borderTop: '2px solid #06b6d4' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#06b6d4', marginBottom: '12px' }}>SSE 메시지 형식</div>
              <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', lineHeight: 2, color: '#94a3b8', background: '#0a0d14', padding: '16px', borderRadius: '8px' }}>
                <span style={{ color: '#06b6d4' }}>event:</span> message<br />
                <span style={{ color: '#06b6d4' }}>data:</span> {`{"user":"Kim","text":"안녕!"}`}<br />
                <span style={{ color: '#06b6d4' }}>id:</span> 1234<br />
                <span style={{ color: '#06b6d4' }}>retry:</span> 5000<br />
                <br />
                <span style={{ color: '#5a6a85' }}>// 빈 줄로 메시지 구분</span><br />
                <span style={{ color: '#06b6d4' }}>event:</span> notification<br />
                <span style={{ color: '#06b6d4' }}>data:</span> {`{"type":"alert"}`}<br />
              </div>
            </div>
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>SSE vs WebSocket 선택 기준:</strong> 서버에서 클라이언트로의 단방향 푸시만 필요하다면(알림, 실시간 피드 등) SSE가 더 간단하고 효율적입니다. 양방향 통신이 필요하다면(채팅, 게임 등) WebSocket을 사용합니다.
          </HighlightBox>
        </div>

        {/* 사용 사례 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>기술별 적합한 사용 사례</SectionTitle>
          <div className="ws-usecase-grid">
            {[
              { icon: '💬', title: '실시간 채팅', desc: '양방향 메시지 교환이 필요. 타이핑 표시, 읽음 확인 등도 실시간 전송.', color: '#a855f7', tech: 'WebSocket' },
              { icon: '📊', title: '실시간 대시보드', desc: '서버에서 지표 데이터를 주기적으로 클라이언트에 푸시.', color: '#06b6d4', tech: 'SSE' },
              { icon: '🔔', title: '알림 시스템', desc: '서버에서 새 알림 발생 시 클라이언트에 즉시 전달.', color: '#06b6d4', tech: 'SSE / Long Polling' },
              { icon: '🎮', title: '온라인 게임', desc: '플레이어 위치, 상태 등 빠른 양방향 데이터 교환 필수.', color: '#a855f7', tech: 'WebSocket' },
              { icon: '📈', title: '주식/코인 시세', desc: '실시간 가격 변동을 서버에서 클라이언트로 스트리밍.', color: '#06b6d4', tech: 'SSE / WebSocket' },
              { icon: '📧', title: '이메일 확인', desc: '새 메일 도착 여부를 주기적으로 확인. 높은 실시간성 불필요.', color: '#94a3b8', tech: 'Short Polling' },
              { icon: '🤖', title: 'AI 스트리밍 응답', desc: 'LLM 토큰이 생성되는 대로 클라이언트에 스트리밍 전송.', color: '#06b6d4', tech: 'SSE' },
              { icon: '📝', title: '협업 에디터', desc: '여러 사용자의 편집 내용을 실시간 동기화.', color: '#a855f7', tech: 'WebSocket' },
            ].map((uc) => (
              <div key={uc.title} className="ws-usecase" style={{ borderTop: `3px solid ${uc.color}` }}>
                <div className="ws-usecase-icon">{uc.icon}</div>
                <div className="ws-usecase-title" style={{ color: uc.color }}>{uc.title}</div>
                <div className="ws-usecase-desc">{uc.desc}</div>
                <div className="ws-usecase-tech">{uc.tech}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 요약 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>항목</th>
                  <th style={{ color: '#94a3b8' }}>Short Polling</th>
                  <th style={{ color: '#3b82f6' }}>Long Polling</th>
                  <th style={{ color: '#06b6d4' }}>SSE</th>
                  <th style={{ color: '#a855f7' }}>WebSocket</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['프로토콜', 'HTTP', 'HTTP', 'HTTP', 'WS (HTTP Upgrade)'],
                  ['통신 방향', '클라이언트 -> 서버', '서버 -> 클라이언트', '서버 -> 클라이언트', '양방향 (Full-Duplex)'],
                  ['실시간성', '낮음', '보통', '높음', '매우 높음'],
                  ['서버 부하', '높음', '보통', '낮음', '연결 유지 비용'],
                  ['재연결', '불필요 (매번 새 요청)', '수동 재요청', '자동 재연결', '수동 구현 필요'],
                  ['바이너리', '가능', '가능', '텍스트만', '텍스트 + 바이너리'],
                  ['방화벽 호환', '좋음', '좋음', '좋음', '일부 제한 가능'],
                  ['대표 사례', '이메일 확인', '채팅 (과거)', '알림, AI 스트리밍', '채팅, 게임, 협업'],
                ].map(([label, sp, lp, sse, ws]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#cbd5e1' }}>{sp}</td>
                    <td style={{ color: '#93c5fd' }}>{lp}</td>
                    <td style={{ color: '#67e8f9' }}>{sse}</td>
                    <td style={{ color: '#c084fc' }}>{ws}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#a855f7" items={[
            { q: 'WebSocket과 HTTP의 차이점은?', a: 'HTTP는 요청-응답 기반의 단방향 프로토콜로, 클라이언트가 요청해야 서버가 응답합니다. WebSocket은 HTTP Upgrade를 통해 수립된 양방향(Full-Duplex) 프로토콜로, 연결 후에는 클라이언트와 서버 모두 자유롭게 메시지를 보낼 수 있습니다. WebSocket은 HTTP의 핸드셰이크로 시작하지만, 이후에는 독립적인 ws:// 프로토콜로 동작하며, 요청-응답 구조 없이 프레임 단위로 데이터를 교환합니다.' },
            { q: 'Short Polling, Long Polling, SSE, WebSocket을 비교해주세요.', a: 'Short Polling은 일정 간격으로 서버에 반복 요청하여 변경사항을 확인하는 방식으로, 구현은 간단하지만 불필요한 요청이 많습니다. Long Polling은 서버가 새 데이터가 생길 때까지 응답을 보류하여 Short Polling보다 효율적이지만, 응답 후 재연결이 필요합니다. SSE는 HTTP 기반으로 서버가 클라이언트에 단방향으로 이벤트를 푸시하며, 자동 재연결을 지원합니다. WebSocket은 유일한 양방향(Full-Duplex) 방식으로, 한 번 연결하면 양쪽 모두 자유롭게 메시지를 교환할 수 있어 실시간 채팅이나 게임에 적합합니다.' },
            { q: 'WebSocket 연결은 어떻게 수립되나요?', a: 'WebSocket은 HTTP GET 요청에 Upgrade: websocket, Connection: Upgrade 헤더를 포함하여 시작합니다. 서버가 WebSocket을 지원하면 101 Switching Protocols 응답을 보내고, 이 시점부터 HTTP 프로토콜이 WebSocket으로 전환됩니다. Sec-WebSocket-Key와 Sec-WebSocket-Accept 헤더를 통해 서버가 진짜 WebSocket 서버인지 검증합니다. 연결이 수립되면 TCP 연결 위에서 프레임 기반의 양방향 통신이 시작됩니다.' },
            { q: 'SSE가 WebSocket보다 적합한 경우는?', a: '서버에서 클라이언트로의 단방향 데이터 푸시만 필요한 경우 SSE가 더 적합합니다. 대표적으로 실시간 알림, 주식 시세 스트리밍, AI 모델의 스트리밍 응답(ChatGPT 등), 실시간 로그/대시보드 등이 있습니다. SSE는 HTTP 기반이라 프록시, 로드밸런서 등 기존 인프라와 호환이 좋고, 브라우저가 자동 재연결을 지원하며, EventSource API로 구현이 간단합니다.' },
            { q: 'WebSocket의 단점과 주의할 점은?', a: 'WebSocket은 지속적인 TCP 연결을 유지하므로 동시 접속자가 많을수록 서버의 메모리와 연결 자원이 증가합니다. HTTP와 달리 Stateful하므로 로드밸런싱 시 Sticky Session이 필요하고, 수평 확장이 복잡합니다. 연결이 끊어졌을 때의 재연결 로직을 직접 구현해야 하며, 일부 프록시나 방화벽이 WebSocket을 차단할 수 있습니다. 또한 HTTP/2 서버 푸시나 SSE로 해결 가능한 경우에 WebSocket을 사용하면 과도한 복잡성이 추가됩니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

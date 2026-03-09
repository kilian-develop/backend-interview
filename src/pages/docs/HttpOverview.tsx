import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import AnimationControls from '../../components/doc/AnimationControls'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.ho-char-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; }
.ho-char-card { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; transition:transform .2s, box-shadow .2s; }
.ho-char-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.ho-char-icon { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:14px; }
.ho-char-title { font-size:15px; font-weight:800; margin-bottom:8px; }
.ho-char-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.ho-char-example { margin-top:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; font-size:12px; color:#5a6a85; line-height:1.7; }
.ho-method-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.ho-idemp-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.ho-idemp-row { display:flex; align-items:flex-start; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; margin-bottom:8px; font-size:13px; color:#94a3b8; line-height:1.7; }
.ho-idemp-badge { flex-shrink:0; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:3px 10px; border-radius:6px; }
.ho-status-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.ho-status-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.ho-status-card-title { font-size:14px; font-weight:800; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.ho-status-items { display:flex; flex-direction:column; gap:6px; }
.ho-status-item { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:#5a6a85; line-height:1.6; padding:6px 10px; background:rgba(255,255,255,0.02); border-radius:6px; }
.ho-status-code { flex-shrink:0; font-family:'JetBrains Mono',monospace; font-weight:700; font-size:11px; }
.ho-header-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.ho-header-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.ho-header-card-title { font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.ho-header-items { display:flex; flex-direction:column; gap:6px; }
.ho-header-item { font-size:12px; color:#94a3b8; padding:8px 12px; background:rgba(255,255,255,0.02); border-radius:6px; line-height:1.6; }
.ho-header-name { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:11px; }
.ho-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.ho-anim-scene { display:grid; grid-template-columns:100px 1fr 100px; align-items:start; gap:12px; margin-bottom:16px; }
@media(max-width:560px){ .ho-anim-scene { grid-template-columns:70px 1fr 70px; } }
.ho-anim-entity { display:flex; flex-direction:column; align-items:center; gap:8px; }
.ho-anim-entity-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; }
.ho-anim-entity-name { font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; }
.ho-anim-flow { display:flex; flex-direction:column; gap:6px; }
.ho-anim-msg { display:flex; align-items:center; gap:8px; padding:10px 14px; border-radius:10px; opacity:0; transform:translateY(6px); transition:opacity .5s ease, transform .5s ease; font-size:12px; }
.ho-anim-msg.show { opacity:1; transform:translateY(0); }
.ho-anim-msg.right { flex-direction:row; }
.ho-anim-msg.left { flex-direction:row-reverse; }
.ho-anim-label { font-family:'JetBrains Mono',monospace; font-weight:700; font-size:11px; padding:4px 10px; border-radius:6px; white-space:nowrap; flex-shrink:0; }
.ho-anim-line { flex:1; height:2px; border-radius:2px; }
.ho-anim-tip { font-size:18px; line-height:1; flex-shrink:0; }
.ho-anim-thought { text-align:center; font-size:12px; padding:10px 16px; border-radius:10px; opacity:0; transform:scale(.95); transition:opacity .5s ease, transform .5s ease; line-height:1.7; margin-top:4px; }
.ho-anim-thought.show { opacity:1; transform:scale(1); }
.ho-mime-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.ho-def-features { display:flex; flex-direction:column; gap:8px; }
.ho-def-feat { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.6; }
.ho-def-feat-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
`

const animSteps = [
  { type: 'msg', dir: 'right', label: 'POST /login', labelBg: 'rgba(59,130,246,0.15)', labelBorder: '#3b82f6', labelColor: '#3b82f6', lineBg: '#3b82f6', tipColor: '#3b82f6', desc: '클라이언트가 로그인 요청 전송' },
  { type: 'thought', side: 'server', text: '로그인 처리 완료! 하지만 상태를 저장하지 않음 (Stateless)', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', border: '#f59e0b' },
  { type: 'msg', dir: 'left', label: '200 OK', labelBg: 'rgba(34,197,94,0.15)', labelBorder: '#22c55e', labelColor: '#22c55e', lineBg: '#22c55e', tipColor: '#22c55e', desc: '로그인 성공 응답' },
  { type: 'msg', dir: 'right', label: 'GET /mypage', labelBg: 'rgba(168,85,247,0.15)', labelBorder: '#a855f7', labelColor: '#a855f7', lineBg: '#a855f7', tipColor: '#a855f7', desc: '마이페이지 요청 (인증 정보 없음)' },
  { type: 'thought', side: 'server', text: '누구세요? 이전 요청의 상태를 기억하지 못합니다!', color: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: '#ef4444' },
  { type: 'msg', dir: 'left', label: '401 Unauthorized', labelBg: 'rgba(239,68,68,0.15)', labelBorder: '#ef4444', labelColor: '#ef4444', lineBg: '#ef4444', tipColor: '#ef4444', desc: '인증 실패 — 서버는 상태를 모름' },
  { type: 'msg', dir: 'right', label: 'GET /mypage + Token', labelBg: 'rgba(6,182,212,0.15)', labelBorder: '#06b6d4', labelColor: '#06b6d4', lineBg: '#06b6d4', tipColor: '#06b6d4', desc: '토큰을 포함한 마이페이지 재요청' },
  { type: 'thought', side: 'server', text: '토큰 검증 완료! 김철수님이군요. 마이페이지 데이터를 보내드립니다.', color: '#22c55e', bg: 'rgba(34,197,94,0.06)', border: '#22c55e' },
  { type: 'msg', dir: 'left', label: '200 OK + Data', labelBg: 'rgba(34,197,94,0.15)', labelBorder: '#22c55e', labelColor: '#22c55e', lineBg: '#22c55e', tipColor: '#22c55e', desc: '성공 — 토큰으로 상태를 보완' },
]

export default function HttpOverview() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 Stateless 동작 원리를 확인하세요', color: '#5a6a85' })
  useInjectCSS('style-http-overview', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    animSteps.forEach((_, i) => {
      schedule(() => {
        setStep(i + 1)
        const s = animSteps[i]
        if (s.type === 'msg') {
          setStatus({ msg: `${s.desc}`, color: (s as { tipColor: string }).tipColor })
        } else {
          setStatus({ msg: (s as { text: string }).text, color: (s as { color: string }).color })
        }
      }, 400 + i * 900)
    })
    schedule(() => {
      setStatus({ msg: 'Stateless 한계를 쿠키/세션/JWT로 보완하여 상태를 유지합니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 400 + animSteps.length * 900 + 500)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 Stateless 동작 원리를 확인하세요', color: '#5a6a85' })
  }

  // Build visible items for animation
  let msgIndex = 0
  const visibleItems = animSteps.map((s, i) => {
    const visible = step >= i + 1
    if (s.type === 'msg') {
      msgIndex++
      return { ...s, visible, msgIdx: msgIndex }
    }
    return { ...s, visible, msgIdx: -1 }
  })

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Application Layer · Protocol · 면접 필수"
          title={<><span style={{ color: '#06b6d4' }}>HTTP</span>란?</>}
          description="웹의 기반이 되는 HTTP 프로토콜의 핵심 개념, 특성, 그리고 동작 원리를 알아봅니다"
        />

        {/* HTTP의 정의 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>HTTP의 정의</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#06b6d4', marginBottom: '12px' }}>
              HyperText Transfer Protocol
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '16px' }}>
              클라이언트와 서버 간 <strong style={{ color: '#e2e8f0' }}>리소스를 주고받기 위한 애플리케이션 계층 프로토콜</strong>입니다.
              원래는 하이퍼텍스트(HTML) 전송 목적이었지만, 현재는 이미지, 영상, JSON, 파일 등 <strong style={{ color: '#e2e8f0' }}>거의 모든 형태의 데이터</strong>를 전송합니다.
            </div>

            <div className="ho-def-features">
              <div className="ho-def-feat">
                <span className="ho-def-feat-icon">🌐</span>
                <span><strong style={{ color: '#e2e8f0' }}>OSI 7계층:</strong> Application Layer (TCP/IP 모델에서도 Application Layer). 전송 계층(TCP/UDP) 위에서 동작합니다.</span>
              </div>
              <div className="ho-def-feat">
                <span className="ho-def-feat-icon">📡</span>
                <span><strong style={{ color: '#e2e8f0' }}>전송 대상:</strong> HTML, CSS, JavaScript, JSON, XML, 이미지, 영상, 파일 다운로드 등 — 사실상 인터넷에서 주고받는 거의 모든 것</span>
              </div>
              <div className="ho-def-feat">
                <span className="ho-def-feat-icon">📜</span>
                <span><strong style={{ color: '#e2e8f0' }}>표준 문서:</strong> RFC 2616 (HTTP/1.1 최초) → RFC 7230-7235 (개정) → RFC 9110 (HTTP Semantics, 최신)</span>
              </div>
            </div>

            <div style={{ margin: '16px 0 0', padding: '14px 16px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`OSI 7계층에서 HTTP의 위치:

  ┌──────────────────────────────┐
  │  7. Application Layer        │ ← HTTP, HTTPS, FTP, DNS, SMTP
  │  6. Presentation Layer       │
  │  5. Session Layer            │
  ├──────────────────────────────┤
  │  4. Transport Layer          │ ← TCP, UDP
  │  3. Network Layer            │ ← IP
  │  2. Data Link Layer          │ ← Ethernet, Wi-Fi
  │  1. Physical Layer           │ ← 전기 신호, 광 신호
  └──────────────────────────────┘

TCP/IP 4계층:
  Application  ← HTTP
  Transport    ← TCP (HTTP/1.x, 2) / UDP+QUIC (HTTP/3)
  Internet     ← IP
  Network Access`}
            </div>
          </div>
        </div>

        {/* HTTP의 핵심 특성 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>HTTP의 핵심 특성</SectionTitle>
          <div className="ho-char-grid">
            {/* 1. 클라이언트-서버 */}
            <div className="ho-char-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="ho-char-icon" style={{ background: 'rgba(59,130,246,0.1)', border: '2px solid #3b82f6' }}>🔄</div>
              <div className="ho-char-title" style={{ color: '#3b82f6' }}>클라이언트-서버 구조</div>
              <div className="ho-char-desc">
                <strong style={{ color: '#e2e8f0' }}>역할 분리:</strong> 클라이언트는 요청(Request)을 보내고, 서버는 응답(Response)을 반환합니다. 각각이 독립적으로 진화할 수 있어 프론트엔드/백엔드 분리의 기반이 됩니다.
              </div>
              <div className="ho-char-example">
                예: 브라우저(클라이언트)가 UI를 개선해도 서버는 변경 불필요. 서버가 DB를 교체해도 클라이언트는 영향 없음.
              </div>
            </div>

            {/* 2. 무상태 */}
            <div className="ho-char-card" style={{ borderTop: '3px solid #a855f7' }}>
              <div className="ho-char-icon" style={{ background: 'rgba(168,85,247,0.1)', border: '2px solid #a855f7' }}>🧊</div>
              <div className="ho-char-title" style={{ color: '#a855f7' }}>무상태 (Stateless)</div>
              <div className="ho-char-desc">
                <strong style={{ color: '#e2e8f0' }}>각 요청은 독립적</strong> — 서버가 이전 요청의 상태를 기억하지 않습니다.<br /><br />
                <strong style={{ color: '#22c55e' }}>장점:</strong> 서버 확장(스케일 아웃)이 용이. 어떤 서버가 처리해도 동일한 결과.<br />
                <strong style={{ color: '#ef4444' }}>한계:</strong> 로그인 상태 같은 정보 유지 불가 → 쿠키, 세션, JWT로 보완.
              </div>
              <div className="ho-char-example">
                예: 로그인 후 마이페이지를 요청하면 서버는 "누구세요?"라고 묻습니다. 매 요청마다 인증 정보(토큰)를 함께 보내야 합니다.
              </div>
            </div>

            {/* 3. 비연결성 */}
            <div className="ho-char-card" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="ho-char-icon" style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e' }}>⚡</div>
              <div className="ho-char-title" style={{ color: '#22c55e' }}>비연결성 (Connectionless)</div>
              <div className="ho-char-desc">
                <strong style={{ color: '#e2e8f0' }}>HTTP/1.0:</strong> 요청-응답 후 연결을 즉시 종료합니다.<br /><br />
                <strong style={{ color: '#22c55e' }}>장점:</strong> 서버 리소스 절약 (동시 연결 수 최소화)<br />
                <strong style={{ color: '#ef4444' }}>단점:</strong> 매번 TCP 핸드셰이크 반복 → Keep-Alive로 개선 (HTTP/1.1)
              </div>
              <div className="ho-char-example">
                현재는 Keep-Alive가 기본이므로 "원래의 설계 철학"으로 이해하면 됩니다. HTTP의 기본 성격은 비연결이지만, 실무에서는 연결을 재사용합니다.
              </div>
            </div>

            {/* 4. 단순/확장 */}
            <div className="ho-char-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="ho-char-icon" style={{ background: 'rgba(245,158,11,0.1)', border: '2px solid #f59e0b' }}>🧩</div>
              <div className="ho-char-title" style={{ color: '#f59e0b' }}>단순하고 확장 가능</div>
              <div className="ho-char-desc">
                <strong style={{ color: '#e2e8f0' }}>텍스트 기반 (HTTP/1.x)</strong>이라 사람이 읽기 쉽습니다. 메서드, 상태 코드, 헤더를 표준화하되 확장을 허용하는 구조입니다.
              </div>
              <div className="ho-char-example">
                예: 커스텀 헤더(X-Request-Id, X-Correlation-Id)를 자유롭게 추가하여 기능을 확장할 수 있습니다.
              </div>
            </div>
          </div>

          {/* Stateless vs Stateful */}
          <div style={{ marginTop: '20px', padding: '14px 16px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`Stateless vs Stateful 비교:

  Stateful (TCP 등):
    요청1: "로그인할게요"  → 서버: "OK, 기억해둘게요"
    요청2: "마이페이지"    → 서버: "아, 김철수님이군요!" ← 상태 기억

  Stateless (HTTP):
    요청1: "로그인할게요"  → 서버: "OK, 토큰 줄게요"
    요청2: "마이페이지"    → 서버: "누구세요?" ← 상태 없음!
    요청3: "마이페이지 + 토큰" → 서버: "토큰 확인! 김철수님!" ← 토큰으로 보완

  → Stateless 장점: 서버 A, B, C 중 어느 서버가 처리해도 동일한 결과
  → 스케일 아웃(서버 증설)이 매우 용이`}
          </div>
        </div>

        {/* Stateless 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>Stateless 동작 원리 시뮬레이션</SectionTitle>
          <div className="ho-anim-box">
            <div className="ho-anim-scene">
              <div className="ho-anim-entity">
                <div className="ho-anim-entity-icon" style={{ background: 'rgba(6,182,212,0.1)', border: '2px solid #06b6d4' }}>🖥️</div>
                <div className="ho-anim-entity-name" style={{ color: '#06b6d4' }}>CLIENT</div>
              </div>
              <div className="ho-anim-flow">
                {visibleItems.map((item, i) => {
                  if (item.type === 'msg') {
                    const m = item as typeof item & { dir: string; label: string; labelBg: string; labelBorder: string; labelColor: string; lineBg: string; tipColor: string }
                    return (
                      <div key={i} className={`ho-anim-msg ${m.dir}${item.visible ? ' show' : ''}`}>
                        <span className="ho-anim-label" style={{ background: m.labelBg, border: `1px solid ${m.labelBorder}`, color: m.labelColor }}>{m.label}</span>
                        <div className="ho-anim-line" style={{ background: m.lineBg }} />
                        <span className="ho-anim-tip" style={{ color: m.tipColor }}>{m.dir === 'right' ? '→' : '←'}</span>
                      </div>
                    )
                  } else {
                    const t = item as typeof item & { text: string; color: string; bg: string; border: string }
                    return (
                      <div key={i} className={`ho-anim-thought${item.visible ? ' show' : ''}`} style={{ background: t.bg, border: `1px solid ${t.border}33`, color: t.color }}>
                        💭 {t.text}
                      </div>
                    )
                  }
                })}
              </div>
              <div className="ho-anim-entity">
                <div className="ho-anim-entity-icon" style={{ background: 'rgba(168,85,247,0.1)', border: '2px solid #a855f7' }}>🖧</div>
                <div className="ho-anim-entity-name" style={{ color: '#a855f7' }}>SERVER</div>
              </div>
            </div>

            <AnimationControls color="#06b6d4" status={status} onPlay={play} onReset={handleReset} />

            {/* STEP-BY-STEP */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Client → Server: POST /login 요청 전송 (아이디/비밀번호)', color: '#3b82f6' },
                  { num: '②', text: 'Server: 로그인 처리 완료, 하지만 상태를 저장하지 않음 (Stateless)', color: '#f59e0b' },
                  { num: '③', text: 'Server → Client: 200 OK 응답 (토큰 발급)', color: '#22c55e' },
                  { num: '④', text: 'Client → Server: GET /mypage 요청 (인증 정보 없이)', color: '#a855f7' },
                  { num: '⑤', text: 'Server: "누구세요?" — 이전 로그인 상태를 기억하지 못함!', color: '#ef4444' },
                  { num: '⑥', text: 'Server → Client: 401 Unauthorized 응답', color: '#ef4444' },
                  { num: '⑦', text: 'Client → Server: GET /mypage + Authorization: Bearer {token}', color: '#06b6d4' },
                  { num: '⑧', text: 'Server: 토큰 검증 완료 → "김철수님!" 마이페이지 데이터 응답', color: '#22c55e' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', lineHeight: 1.6 }}>
                    <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.num}</span>
                    <span style={{ color: '#94a3b8' }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <HighlightBox color="#a855f7" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#a855f7' }}>핵심 포인트:</strong> HTTP는 Stateless이므로 매 요청이 독립적입니다.
            로그인 상태, 장바구니 등을 유지하려면 <strong style={{ color: '#a855f7' }}>쿠키(Cookie)</strong>, <strong style={{ color: '#a855f7' }}>세션(Session)</strong>, <strong style={{ color: '#a855f7' }}>JWT(JSON Web Token)</strong> 등의 보완 기술이 반드시 필요합니다.
            이것이 백엔드에서 인증/인가 메커니즘을 설계하는 근본적인 이유입니다.
          </HighlightBox>
        </div>

        {/* HTTP 메서드 상세 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>HTTP 메서드 상세</SectionTitle>
          <div className="ho-method-table-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>메서드</th>
                  <th>용도</th>
                  <th>멱등성</th>
                  <th>안전성</th>
                  <th>요청 본문</th>
                  <th>캐시 가능</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['GET', '리소스 조회', 'O', 'O', 'X', 'O', '#22c55e'],
                  ['POST', '리소스 생성, 처리', 'X', 'X', 'O', '△', '#3b82f6'],
                  ['PUT', '리소스 전체 교체', 'O', 'X', 'O', 'X', '#a855f7'],
                  ['PATCH', '리소스 부분 수정', 'X', 'X', 'O', 'X', '#f59e0b'],
                  ['DELETE', '리소스 삭제', 'O', 'X', '△', 'X', '#ef4444'],
                  ['HEAD', '헤더만 조회 (GET without body)', 'O', 'O', 'X', 'O', '#06b6d4'],
                  ['OPTIONS', '지원 메서드 확인 (CORS preflight)', 'O', 'O', 'X', 'X', '#64748b'],
                ].map(([method, desc, idemp, safe, body, cache, color]) => (
                  <tr key={method}>
                    <td style={{ color: color as string, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }}>{method}</td>
                    <td style={{ color: '#94a3b8' }}>{desc}</td>
                    <td style={{ color: idemp === 'O' ? '#22c55e' : '#ef4444', textAlign: 'center' }}>{idemp}</td>
                    <td style={{ color: safe === 'O' ? '#22c55e' : '#ef4444', textAlign: 'center' }}>{safe}</td>
                    <td style={{ color: body === 'O' ? '#22c55e' : body === '△' ? '#f59e0b' : '#5a6a85', textAlign: 'center' }}>{body}</td>
                    <td style={{ color: cache === 'O' ? '#22c55e' : cache === '△' ? '#f59e0b' : '#5a6a85', textAlign: 'center' }}>{cache}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 멱등성 설명 */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#06b6d4', marginBottom: '14px' }}>
              멱등성 (Idempotency) 이란?
            </div>
            <div className="ho-idemp-box">
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '16px' }}>
                <strong style={{ color: '#e2e8f0' }}>같은 요청을 여러 번 보내도 결과가 동일</strong>한 성질입니다. 네트워크 오류 시 <strong style={{ color: '#06b6d4' }}>재시도 가능 여부</strong>를 결정하는 핵심 기준이 됩니다.
              </div>
              <div className="ho-idemp-row">
                <span className="ho-idemp-badge" style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid #22c55e40', color: '#22c55e' }}>GET</span>
                <span>10번 조회해도 같은 결과 → <strong style={{ color: '#22c55e' }}>멱등 O</strong> — 안전하게 재시도 가능</span>
              </div>
              <div className="ho-idemp-row">
                <span className="ho-idemp-badge" style={{ background: 'rgba(168,85,247,0.12)', border: '1px solid #a855f740', color: '#a855f7' }}>PUT</span>
                <span>10번 교체해도 최종 상태 동일 → <strong style={{ color: '#22c55e' }}>멱등 O</strong> — "이름을 김철수로 바꿔줘" x10 = 김철수</span>
              </div>
              <div className="ho-idemp-row">
                <span className="ho-idemp-badge" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid #ef444440', color: '#ef4444' }}>DELETE</span>
                <span>10번 삭제해도 결과 동일 (이미 삭제됨) → <strong style={{ color: '#22c55e' }}>멱등 O</strong></span>
              </div>
              <div className="ho-idemp-row">
                <span className="ho-idemp-badge" style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid #3b82f640', color: '#3b82f6' }}>POST</span>
                <span>10번 보내면 10개 생성 → <strong style={{ color: '#ef4444' }}>멱등 X</strong> — 재시도 시 중복 생성 위험!</span>
              </div>
              <div className="ho-idemp-row">
                <span className="ho-idemp-badge" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid #f59e0b40', color: '#f59e0b' }}>PATCH</span>
                <span>구현에 따라 다름. "나이를 +1" 연산이면 10번 = +10 → <strong style={{ color: '#ef4444' }}>멱등 X</strong></span>
              </div>

              <div style={{ margin: '16px 0 0', padding: '14px 16px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`멱등성의 실무적 중요성:

  네트워크 타임아웃 발생 시:
    Client ── PUT /users/1 ──→ Server  (응답이 돌아오지 않음)
                    ↑
           "성공했는지 실패했는지 모른다"

  멱등한 요청 (PUT):
    → 그냥 다시 보내면 됨. 결과가 동일하므로 안전.

  멱등하지 않은 요청 (POST):
    → 다시 보내면 중복 생성 위험!
    → 별도의 중복 방지 메커니즘 필요 (Idempotency Key 등)`}
              </div>
            </div>
          </div>

          {/* 안전성 설명 */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#22c55e', marginBottom: '14px' }}>
              안전성 (Safety) 이란?
            </div>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '12px' }}>
                <strong style={{ color: '#e2e8f0' }}>서버의 상태를 변경하지 않는</strong> 메서드를 "안전하다"고 합니다.
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', padding: '14px', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>안전한 메서드 (조회만)</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#22c55e' }}>GET</span>, <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#22c55e' }}>HEAD</span>, <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#22c55e' }}>OPTIONS</span><br />
                    서버의 데이터를 변경하지 않음
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: '200px', padding: '14px', background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '8px' }}>안전하지 않은 메서드 (상태 변경)</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7 }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#ef4444' }}>POST</span>, <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#ef4444' }}>PUT</span>, <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#ef4444' }}>PATCH</span>, <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#ef4444' }}>DELETE</span><br />
                    서버의 데이터를 변경할 수 있음
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HTTP 상태 코드 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>HTTP 상태 코드</SectionTitle>
          <div className="ho-status-grid">
            {/* 1xx */}
            <div className="ho-status-card" style={{ borderTop: '3px solid #94a3b8' }}>
              <div className="ho-status-card-title" style={{ color: '#94a3b8' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>1xx</span> Informational
              </div>
              <div className="ho-status-items">
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#94a3b8' }}>100</span>
                  <span>Continue — 요청 헤더 수신 완료, 본문 보내도 됨</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#94a3b8' }}>101</span>
                  <span>Switching Protocols — WebSocket 업그레이드 등</span>
                </div>
              </div>
            </div>

            {/* 2xx */}
            <div className="ho-status-card" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="ho-status-card-title" style={{ color: '#22c55e' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>2xx</span> Success
              </div>
              <div className="ho-status-items">
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#22c55e' }}>200</span>
                  <span>OK — 요청 성공</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#22c55e' }}>201</span>
                  <span>Created — 리소스 생성 성공 (POST)</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#22c55e' }}>204</span>
                  <span>No Content — 성공했지만 응답 본문 없음 (DELETE)</span>
                </div>
              </div>
            </div>

            {/* 3xx */}
            <div className="ho-status-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="ho-status-card-title" style={{ color: '#3b82f6' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>3xx</span> Redirection
              </div>
              <div className="ho-status-items">
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#3b82f6' }}>301</span>
                  <span>Moved Permanently — 영구 이동 (SEO에 영향)</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#3b82f6' }}>302</span>
                  <span>Found — 임시 이동</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#3b82f6' }}>304</span>
                  <span>Not Modified — 캐시된 버전 사용</span>
                </div>
              </div>
            </div>

            {/* 4xx */}
            <div className="ho-status-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="ho-status-card-title" style={{ color: '#f59e0b' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>4xx</span> Client Error
              </div>
              <div className="ho-status-items">
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#f59e0b' }}>400</span>
                  <span>Bad Request — 잘못된 요청 (문법 오류 등)</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#f59e0b' }}>401</span>
                  <span>Unauthorized — 인증 필요 (로그인 안 됨)</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#f59e0b' }}>403</span>
                  <span>Forbidden — 권한 없음 (인증은 됐지만 권한 부족)</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#f59e0b' }}>404</span>
                  <span>Not Found — 리소스 없음</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#f59e0b' }}>405</span>
                  <span>Method Not Allowed — 허용되지 않은 메서드</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#f59e0b' }}>409</span>
                  <span>Conflict — 리소스 충돌 (동시 수정 등)</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#f59e0b' }}>429</span>
                  <span>Too Many Requests — Rate Limit 초과</span>
                </div>
              </div>
            </div>

            {/* 5xx */}
            <div className="ho-status-card" style={{ borderTop: '3px solid #ef4444' }}>
              <div className="ho-status-card-title" style={{ color: '#ef4444' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>5xx</span> Server Error
              </div>
              <div className="ho-status-items">
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#ef4444' }}>500</span>
                  <span>Internal Server Error — 서버 내부 오류</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#ef4444' }}>502</span>
                  <span>Bad Gateway — 게이트웨이/프록시 오류</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#ef4444' }}>503</span>
                  <span>Service Unavailable — 서비스 일시 중단</span>
                </div>
                <div className="ho-status-item">
                  <span className="ho-status-code" style={{ color: '#ef4444' }}>504</span>
                  <span>Gateway Timeout — 게이트웨이 타임아웃</span>
                </div>
              </div>
            </div>
          </div>

          {/* 401 vs 403 */}
          <HighlightBox color="#f59e0b" style={{ marginTop: '20px' }}>
            <strong style={{ color: '#f59e0b' }}>401 Unauthorized vs 403 Forbidden — 면접 단골 질문!</strong><br /><br />
            <strong style={{ color: '#f59e0b' }}>401 Unauthorized:</strong> 인증(Authentication)이 안 된 상태. "너 누구야?" → 로그인하면 해결.<br />
            <strong style={{ color: '#f59e0b' }}>403 Forbidden:</strong> 인증은 됐지만 인가(Authorization)가 안 된 상태. "너 누군지는 알지만, 권한이 없어." → 관리자 권한이 필요한 페이지에 일반 유저가 접근할 때.<br /><br />
            요약: <strong style={{ color: '#f59e0b' }}>401 = 인증 실패</strong> (로그인 필요), <strong style={{ color: '#f59e0b' }}>403 = 인가 실패</strong> (권한 부족)
          </HighlightBox>
        </div>

        {/* HTTP 헤더 주요 분류 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>HTTP 헤더 주요 분류</SectionTitle>
          <div className="ho-header-grid">
            {/* General */}
            <div className="ho-header-card" style={{ borderTop: '3px solid #94a3b8' }}>
              <div className="ho-header-card-title" style={{ color: '#94a3b8' }}>
                General Headers <span style={{ fontSize: '11px', fontWeight: 400 }}>— 요청/응답 공통</span>
              </div>
              <div className="ho-header-items">
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#94a3b8' }}>Connection</span> — 연결 관리 (keep-alive, close)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#94a3b8' }}>Date</span> — 메시지 생성 일시
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#94a3b8' }}>Cache-Control</span> — 캐싱 동작 제어 (no-cache, max-age 등)
                </div>
              </div>
            </div>

            {/* Request */}
            <div className="ho-header-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="ho-header-card-title" style={{ color: '#3b82f6' }}>
                Request Headers <span style={{ fontSize: '11px', fontWeight: 400 }}>— 클라이언트 → 서버</span>
              </div>
              <div className="ho-header-items">
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#3b82f6' }}>Host</span> — 요청 대상 도메인 (HTTP/1.1 필수)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#3b82f6' }}>User-Agent</span> — 클라이언트 정보 (브라우저, OS 등)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#3b82f6' }}>Accept</span> — 원하는 응답 형식 (application/json 등)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#3b82f6' }}>Authorization</span> — 인증 정보 (Bearer token 등)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#3b82f6' }}>Cookie</span> — 서버가 설정한 쿠키 전송
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#3b82f6' }}>Referer</span> — 이전 페이지 URL
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#3b82f6' }}>Origin</span> — 요청 출처 (CORS에서 중요)
                </div>
              </div>
            </div>

            {/* Response */}
            <div className="ho-header-card" style={{ borderTop: '3px solid #a855f7' }}>
              <div className="ho-header-card-title" style={{ color: '#a855f7' }}>
                Response Headers <span style={{ fontSize: '11px', fontWeight: 400 }}>— 서버 → 클라이언트</span>
              </div>
              <div className="ho-header-items">
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#a855f7' }}>Server</span> — 서버 소프트웨어 정보
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#a855f7' }}>Set-Cookie</span> — 클라이언트에 쿠키 설정
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#a855f7' }}>Location</span> — 리다이렉트 대상 URL (301, 302와 함께)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#a855f7' }}>WWW-Authenticate</span> — 인증 방식 안내 (401과 함께)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#a855f7' }}>Access-Control-*</span> — CORS 관련 헤더
                </div>
              </div>
            </div>

            {/* Entity / Representation */}
            <div className="ho-header-card" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="ho-header-card-title" style={{ color: '#22c55e' }}>
                Entity Headers <span style={{ fontSize: '11px', fontWeight: 400 }}>— 본문 관련</span>
              </div>
              <div className="ho-header-items">
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#22c55e' }}>Content-Type</span> — 본문의 MIME 타입 (application/json 등)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#22c55e' }}>Content-Length</span> — 본문 크기 (바이트)
                </div>
                <div className="ho-header-item">
                  <span className="ho-header-name" style={{ color: '#22c55e' }}>Content-Encoding</span> — 본문 압축 방식 (gzip, br 등)
                </div>
              </div>
            </div>
          </div>

          {/* Content Negotiation */}
          <div style={{ marginTop: '20px', background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#06b6d4', marginBottom: '12px' }}>
              Content Negotiation (콘텐츠 협상)
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '14px' }}>
              클라이언트와 서버가 <strong style={{ color: '#e2e8f0' }}>Accept / Content-Type</strong> 헤더를 통해 데이터 형식을 협상합니다.
            </div>
            <div style={{ margin: '0', padding: '14px 16px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`클라이언트가 JSON을 원하는 경우:

  요청:
    GET /api/users HTTP/1.1
    Accept: application/json         ← "JSON으로 보내주세요"
    Accept-Language: ko              ← "한국어로 보내주세요"
    Accept-Encoding: gzip, br        ← "gzip 또는 brotli 압축 가능"

  응답:
    HTTP/1.1 200 OK
    Content-Type: application/json   ← "JSON으로 보내드립니다"
    Content-Language: ko             ← "한국어 응답입니다"
    Content-Encoding: gzip           ← "gzip으로 압축했습니다"

    {"users": [{"name": "김철수"}, ...]}

→ 같은 리소스(/api/users)도 Accept 헤더에 따라
  JSON, XML, HTML 등 다른 형식으로 응답 가능`}
            </div>
          </div>
        </div>

        {/* Content-Type과 MIME 타입 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>Content-Type과 MIME 타입</SectionTitle>
          <div className="ho-mime-wrap">
            <table className="doc-table">
              <thead>
                <tr>
                  <th>MIME 타입</th>
                  <th>설명</th>
                  <th>사용 예시</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['application/json', 'JSON 데이터', 'REST API 요청/응답', '#22c55e'],
                  ['application/xml', 'XML 데이터', 'SOAP API, 레거시 시스템', '#3b82f6'],
                  ['application/x-www-form-urlencoded', 'URL 인코딩된 폼 데이터', 'HTML 폼 기본 전송 방식', '#a855f7'],
                  ['multipart/form-data', '멀티파트 폼 데이터', '파일 업로드', '#f59e0b'],
                  ['text/html', 'HTML 문서', '웹 페이지', '#06b6d4'],
                  ['text/plain', '일반 텍스트', '텍스트 파일', '#94a3b8'],
                  ['text/css', 'CSS 스타일시트', '스타일 시트', '#ec4899'],
                  ['image/png', 'PNG 이미지', '이미지 리소스', '#22c55e'],
                  ['image/jpeg', 'JPEG 이미지', '사진 등', '#3b82f6'],
                ].map(([type, desc, example, color]) => (
                  <tr key={type}>
                    <td style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', fontWeight: 700, color: color as string }}>{type}</td>
                    <td style={{ color: '#94a3b8' }}>{desc}</td>
                    <td style={{ color: '#5a6a85' }}>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* urlencoded vs multipart */}
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '3px solid #a855f7' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#a855f7', marginBottom: '10px' }}>
                application/x-www-form-urlencoded
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '10px' }}>
                HTML 폼의 <strong style={{ color: '#e2e8f0' }}>기본 전송 방식</strong>. 모든 데이터를 key=value&key=value 형태로 URL 인코딩합니다.
              </div>
              <div style={{ padding: '10px 14px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.8, color: '#64748b' }}>
                name=%EA%B9%80%EC%B2%A0%EC%88%98&age=25
              </div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#5a6a85', lineHeight: 1.6 }}>
                텍스트 데이터에 적합. 파일 업로드 불가.
              </div>
            </div>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '3px solid #f59e0b' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f59e0b', marginBottom: '10px' }}>
                multipart/form-data
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '10px' }}>
                <strong style={{ color: '#e2e8f0' }}>파일 업로드</strong>에 사용. 각 필드를 boundary로 구분하여 바이너리 데이터도 전송 가능합니다.
              </div>
              <div style={{ padding: '10px 14px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', lineHeight: 1.6, color: '#64748b', whiteSpace: 'pre', overflowX: 'auto' }}>
{`--boundary123
Content-Disposition: form-data; name="file"
Content-Type: image/png

[바이너리 데이터...]
--boundary123--`}
              </div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#5a6a85', lineHeight: 1.6 }}>
                텍스트 + 바이너리 혼합 전송 가능. 파일 업로드 시 필수.
              </div>
            </div>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            {
              q: 'HTTP의 Stateless 특성이란? 이를 어떻게 보완하는가?',
              a: 'HTTP는 각 요청이 독립적이며 서버가 이전 요청의 상태를 기억하지 않는 무상태(Stateless) 프로토콜입니다. 장점은 서버 스케일 아웃이 용이하고 어떤 서버가 처리해도 동일한 결과를 보장한다는 점입니다. 한계는 로그인 상태 같은 정보 유지가 불가능하다는 것이며, 이를 쿠키(Cookie), 서버 세션(Session), JWT(JSON Web Token)로 보완합니다. 쿠키는 서버가 Set-Cookie로 클라이언트에 저장하고 매 요청마다 자동 전송되며, 세션은 서버 메모리에 상태를 저장하고 세션 ID만 쿠키로 전달합니다. JWT는 토큰 자체에 정보를 담아 서버가 상태를 저장하지 않아도 되는 방식입니다.',
            },
            {
              q: 'GET과 POST의 차이는?',
              a: 'GET은 리소스 조회 목적으로 사용되며, 멱등하고 안전한 메서드입니다. 요청 데이터를 URL 쿼리 파라미터로 전달하며, 브라우저 캐싱이 가능하고, 브라우저 히스토리에 남습니다. POST는 리소스 생성/처리 목적으로 사용되며, 멱등하지 않고 안전하지 않은 메서드입니다. 요청 데이터를 HTTP Body에 담아 전달하며, 캐싱되지 않고, 히스토리에 남지 않습니다. GET은 URL 길이 제한이 있지만 POST는 Body를 사용하므로 대용량 데이터 전송이 가능합니다.',
            },
            {
              q: '멱등성(Idempotency)이란 무엇이고 왜 중요한가?',
              a: '멱등성은 같은 요청을 여러 번 보내도 결과가 동일한 성질입니다. GET, PUT, DELETE는 멱등하고, POST, PATCH는 멱등하지 않습니다. 네트워크 장애 시 재시도 가능 여부를 판단하는 핵심 기준이 됩니다. 예를 들어 PUT /users/1 요청이 타임아웃되면, 멱등하므로 같은 요청을 다시 보내도 안전합니다. 반면 POST /orders 요청이 타임아웃되면, 멱등하지 않으므로 재전송 시 주문이 중복 생성될 수 있어 별도의 Idempotency Key 등 중복 방지 메커니즘이 필요합니다.',
            },
            {
              q: 'PUT과 PATCH의 차이는?',
              a: 'PUT은 리소스의 전체를 교체(덮어쓰기)하는 메서드로, 멱등합니다. 요청에 포함되지 않은 필드는 기본값이나 null로 초기화됩니다. PATCH는 리소스의 일부만 수정하는 메서드로, 구현에 따라 멱등할 수도, 아닐 수도 있습니다. 예를 들어 사용자의 이름만 변경하고 싶을 때 PUT은 사용자 전체 정보를 보내야 하지만, PATCH는 변경할 이름 필드만 보내면 됩니다. 실무에서는 부분 수정 시 PATCH를, 전체 교체 시 PUT을 사용합니다.',
            },
            {
              q: '401 Unauthorized와 403 Forbidden의 차이는?',
              a: '401 Unauthorized는 인증(Authentication)이 되지 않은 상태를 의미합니다. 클라이언트가 자신이 누구인지 증명하지 못한 경우로, 로그인하면 해결됩니다. 403 Forbidden은 인증은 완료되었지만 인가(Authorization)가 되지 않은 상태입니다. 서버가 클라이언트가 누구인지는 알지만 해당 리소스에 접근할 권한이 없는 경우입니다. 예를 들어 일반 사용자가 관리자 전용 API를 호출하면 403이 반환됩니다. 요약하면 401은 "너 누구야?", 403은 "너 누군지는 알지만 권한 없어"입니다.',
            },
            {
              q: 'HTTP 헤더에서 Content-Type의 역할은?',
              a: 'Content-Type 헤더는 HTTP 메시지 본문의 MIME 타입을 명시합니다. 서버와 클라이언트가 본문 데이터를 올바르게 파싱하기 위해 필수적입니다. 예를 들어 Content-Type: application/json이면 본문을 JSON으로 파싱하고, multipart/form-data이면 파일 업로드 데이터로 처리합니다. 요청 시에는 클라이언트가 보내는 데이터 형식을 알리고, 응답 시에는 서버가 반환하는 데이터 형식을 알립니다. Content Negotiation에서 클라이언트의 Accept 헤더와 서버의 Content-Type이 짝을 이루어 데이터 형식을 협상합니다.',
            },
            {
              q: 'HTTP가 Connectionless라고 하는데, Keep-Alive와 모순되지 않는가?',
              a: 'HTTP의 원래 설계 철학은 비연결(Connectionless)입니다. HTTP/1.0에서는 실제로 매 요청마다 TCP 연결을 맺고 끊었습니다. 그러나 매번 3-Way Handshake를 수행하는 오버헤드가 커서, HTTP/1.1부터 Keep-Alive(Persistent Connection)가 기본 활성화되었습니다. 이는 HTTP 프로토콜 자체의 성격이 변한 것이 아니라, 성능 최적화를 위해 전송 계층(TCP)의 연결을 재사용하는 것입니다. HTTP 프로토콜 관점에서 각 요청은 여전히 독립적이며, Keep-Alive는 TCP 연결 관리의 최적화입니다. 따라서 모순이 아니라 "비연결이 기본 설계이지만, 성능을 위해 연결 재사용이 추가된 것"으로 이해하면 됩니다.',
            },
          ]} />
        </div>

        {/* 한눈에 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>HTTP 메서드 — 한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>항목</th>
                  <th style={{ color: '#22c55e' }}>GET</th>
                  <th style={{ color: '#3b82f6' }}>POST</th>
                  <th style={{ color: '#a855f7' }}>PUT</th>
                  <th style={{ color: '#f59e0b' }}>PATCH</th>
                  <th style={{ color: '#ef4444' }}>DELETE</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['용도', '조회', '생성/처리', '전체 교체', '부분 수정', '삭제'],
                  ['멱등성', 'O', 'X', 'O', 'X', 'O'],
                  ['안전성', 'O', 'X', 'X', 'X', 'X'],
                  ['요청 본문', 'X', 'O', 'O', 'O', '△'],
                  ['캐시 가능', 'O', '△', 'X', 'X', 'X'],
                  ['재시도 안전', 'O', 'X (중복 위험)', 'O', 'X', 'O'],
                  ['CRUD 매핑', 'Read', 'Create', 'Update (전체)', 'Update (부분)', 'Delete'],
                ].map(([label, ...vals]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{
                        color: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ef4444'][i],
                        textAlign: 'center',
                      }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>핵심 정리:</strong> HTTP는 <strong style={{ color: '#06b6d4' }}>클라이언트-서버 구조</strong>, <strong style={{ color: '#06b6d4' }}>무상태(Stateless)</strong>, <strong style={{ color: '#06b6d4' }}>비연결(Connectionless)</strong>, <strong style={{ color: '#06b6d4' }}>단순/확장 가능</strong>한 프로토콜입니다.
            이 특성들이 웹의 확장성과 범용성을 가능하게 하며, 한계는 쿠키/세션/JWT, Keep-Alive 등으로 보완합니다.
          </HighlightBox>
        </div>
      </div>
    </>
  )
}

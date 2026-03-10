import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'

const CSS = `
.hh-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:48px; }
@media(max-width:640px){ .hh-compare-grid{ grid-template-columns:1fr; } }
.hh-proto-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.hh-proto-card:hover { transform:translateY(-4px); }
.hh-http-card { border-top:3px solid #ef4444; box-shadow:0 0 40px rgba(239,68,68,0.15); }
.hh-https-card { border-top:3px solid #22c55e; box-shadow:0 0 40px rgba(34,197,94,0.15); }
.hh-card-title { font-size:22px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.hh-card-sub { font-size:12px; color:#5a6a85; margin-bottom:22px; font-family:'JetBrains Mono',monospace; }
.hh-prop-list { display:flex; flex-direction:column; gap:10px; }
.hh-prop-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.025); border-radius:8px; font-size:13px; gap:12px; }
.hh-prop-label { color:#5a6a85; font-size:12px; white-space:nowrap; }
.hh-prop-val { font-weight:700; font-size:13px; text-align:right; }
.hh-good { color:#22c55e; } .hh-bad { color:#ef4444; } .hh-neutral { color:#94a3b8; }
.hh-tls-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.hh-tls-arena { display:flex; justify-content:space-between; align-items:flex-start; position:relative; gap:16px; min-height:320px; }
.hh-tls-peer { flex:0 0 100px; display:flex; flex-direction:column; align-items:center; gap:10px; padding-top:10px; }
.hh-tls-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; border:2px solid #1a2234; }
.hh-tls-peer-name { font-size:12px; font-weight:700; color:#5a6a85; font-family:'JetBrains Mono',monospace; }
.hh-tls-mid { flex:1; display:flex; flex-direction:column; justify-content:space-around; padding:10px 0; gap:4px; }
.hh-tls-arrow { display:flex; align-items:center; gap:8px; opacity:0; transform:translateX(-10px); transition:opacity .5s ease, transform .5s ease; padding:6px 10px; border-radius:8px; }
.hh-tls-arrow.right { flex-direction:row; }
.hh-tls-arrow.left { flex-direction:row-reverse; transform:translateX(10px); }
.hh-tls-arrow.show { opacity:1; transform:translateX(0); }
.hh-tls-flag { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:3px 8px; border-radius:5px; white-space:nowrap; flex-shrink:0; }
.hh-tls-line { flex:1; height:2px; border-radius:2px; }
.hh-tls-tip { font-size:16px; line-height:1; flex-shrink:0; }
.hh-cert-flow { display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:center; }
.hh-cert-node { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:16px; text-align:center; min-width:140px; }
.hh-cert-arrow { color:#5a6a85; font-size:22px; }
.hh-enc-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .hh-enc-grid{ grid-template-columns:1fr; } }
.hh-enc-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.hh-enc-card h4 { font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.hh-enc-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.hh-mitm-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .hh-mitm-grid{ grid-template-columns:1fr; } }
.hh-mitm-scenario { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; position:relative; overflow:hidden; }
.hh-mitm-label { font-size:16px; font-weight:900; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
.hh-mitm-actors { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; gap:8px; }
.hh-mitm-actor { display:flex; flex-direction:column; align-items:center; gap:6px; flex-shrink:0; }
.hh-mitm-icon { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; border:2px solid #1a2234; }
.hh-mitm-name { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#5a6a85; }
.hh-mitm-wire { flex:1; display:flex; flex-direction:column; gap:6px; position:relative; }
.hh-mitm-packet { display:flex; align-items:center; gap:4px; font-size:10px; font-family:'JetBrains Mono',monospace; padding:4px 8px; border-radius:6px; opacity:0; transform:translateX(-20px); transition:opacity .5s ease, transform .5s ease; }
.hh-mitm-packet.show { opacity:1; transform:translateX(0); }
.hh-mitm-packet.from-right { transform:translateX(20px); }
.hh-mitm-packet.from-right.show { transform:translateX(0); }
.hh-mitm-result { margin-top:12px; padding:12px; border-radius:10px; font-size:12px; line-height:1.7; opacity:0; transition:opacity .5s ease; }
.hh-mitm-result.show { opacity:1; }
.hh-mitm-data-box { font-family:'JetBrains Mono',monospace; font-size:11px; padding:8px 12px; border-radius:8px; margin-top:8px; opacity:0; transition:opacity .5s ease; }
.hh-mitm-data-box.show { opacity:1; }
`

const tlsSteps = [
  { dir: 'right', flag: 'ClientHello', flagStyle: 'background:rgba(59,130,246,.15);border:1px solid #3b82f6;color:#3b82f6', line: '#3b82f6', desc: '지원하는 TLS 버전, 암호화 스위트, 랜덤 값 전송' },
  { dir: 'left', flag: 'ServerHello', flagStyle: 'background:rgba(168,85,247,.15);border:1px solid #a855f7;color:#a855f7', line: '#a855f7', desc: '선택한 암호화 스위트, 서버 인증서 전송' },
  { dir: 'left', flag: 'Certificate', flagStyle: 'background:rgba(34,197,94,.12);border:1px solid #22c55e;color:#22c55e', line: '#22c55e', desc: '서버의 공개키가 포함된 인증서 (CA 서명)' },
  { dir: 'right', flag: 'Key Exchange', flagStyle: 'background:rgba(245,158,11,.12);border:1px solid #f59e0b;color:#f59e0b', line: '#f59e0b', desc: 'Pre-Master Secret 생성 → 서버 공개키로 암호화 전송' },
  { dir: 'right', flag: 'ChangeCipherSpec', flagStyle: 'background:rgba(6,182,212,.12);border:1px solid #06b6d4;color:#06b6d4', line: '#06b6d4', desc: '이후 통신은 대칭키로 암호화하겠다고 알림' },
  { dir: 'left', flag: 'Finished', flagStyle: 'background:rgba(34,197,94,.15);border:1px solid #22c55e;color:#22c55e', line: '#22c55e', desc: '서버도 대칭키 생성 완료 → 암호화 통신 시작!' },
]

const mitmSteps = [
  { id: 'send', desc: '클라이언트가 데이터를 전송합니다.' },
  { id: 'intercept', desc: '공격자가 데이터를 가로챕니다.' },
  { id: 'result', desc: 'HTTP: 데이터 노출 / HTTPS: 암호문만 보임' },
]

export default function HttpVsHttps() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 TLS 핸드셰이크를 확인하세요', color: '#5a6a85' })
  const [mitmStep, setMitmStep] = useState(0)
  const [mitmPlaying, setMitmPlaying] = useState(false)
  const mitmTimeline = useAnimationTimeline()
  const [mitmStatus, setMitmStatus] = useState({ msg: '▶ 재생 버튼을 눌러 중간자 공격 시나리오를 확인하세요', color: '#5a6a85' })
  useInjectCSS('style-http-vs-https', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    tlsSteps.forEach((s, i) => {
      schedule(() => {
        setStep(i + 1)
        setStatus({ msg: `${i + 1}/${tlsSteps.length} ${s.flag} — ${s.desc}`, color: '#e2e8f0' })
      }, 500 + i * 800)
    })
    schedule(() => {
      setStatus({ msg: '✅ TLS 핸드셰이크 완료! 이후 모든 데이터는 대칭키로 암호화됩니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 500 + tlsSteps.length * 800 + 300)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 TLS 핸드셰이크를 확인하세요', color: '#5a6a85' })
  }

  const playMitm = () => {
    if (mitmPlaying) return
    handleMitmReset()
    setMitmPlaying(true)
    mitmSteps.forEach((s, i) => {
      mitmTimeline.schedule(() => {
        setMitmStep(i + 1)
        setMitmStatus({ msg: `${i + 1}/${mitmSteps.length} ${s.desc}`, color: '#e2e8f0' })
      }, 500 + i * 1200)
    })
    mitmTimeline.schedule(() => {
      setMitmStatus({ msg: 'HTTPS는 암호화로 중간자가 데이터를 읽거나 변조할 수 없게 만듭니다.', color: '#22c55e' })
      setMitmPlaying(false)
    }, 500 + mitmSteps.length * 1200 + 500)
  }

  const handleMitmReset = () => {
    mitmTimeline.reset()
    setMitmStep(0)
    setMitmPlaying(false)
    setMitmStatus({ msg: '▶ 재생 버튼을 눌러 중간자 공격 시나리오를 확인하세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(239,68,68,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(34,197,94,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="HTTP · Security · TLS · 면접 필수"
          title={<><span style={{ color: '#ef4444' }}>HTTP</span> vs <span style={{ color: '#22c55e' }}>HTTPS</span></>}
          description={<>TLS 핸드셰이크, 인증서 체인, 대칭/비대칭 암호화 —<br />안전한 통신이 어떻게 이루어지는지 살펴봅니다.</>}
        />

        {/* 비교 카드 */}
        <div className="hh-compare-grid">
          <div className="hh-proto-card hh-http-card">
            <div className="hh-card-title" style={{ color: '#ef4444' }}>HTTP</div>
            <div className="hh-card-sub">HyperText Transfer Protocol</div>
            <div className="hh-prop-list">
              {[
                ['포트', '80', 'neutral'], ['암호화', '없음 — 평문 전송', 'bad'],
                ['인증서', '불필요', 'bad'], ['데이터 무결성', '미보장', 'bad'],
                ['속도', '약간 빠름 (암호화 없음)', 'neutral'], ['SEO', '불이익', 'bad'],
              ].map(([l, v, t]) => (
                <div key={l} className="hh-prop-row"><span className="hh-prop-label">{l}</span><span className={`hh-prop-val hh-${t}`}>{v}</span></div>
              ))}
            </div>
          </div>
          <div className="hh-proto-card hh-https-card">
            <div className="hh-card-title" style={{ color: '#22c55e' }}>HTTPS</div>
            <div className="hh-card-sub">HTTP over TLS (Transport Layer Security)</div>
            <div className="hh-prop-list">
              {[
                ['포트', '443', 'neutral'], ['암호화', 'TLS로 전체 암호화', 'good'],
                ['인증서', 'CA 발급 인증서 필요', 'good'], ['데이터 무결성', 'MAC으로 보장', 'good'],
                ['속도', 'TLS 핸드셰이크 오버헤드 (미미)', 'neutral'], ['SEO', 'Google 우대', 'good'],
              ].map(([l, v, t]) => (
                <div key={l} className="hh-prop-row"><span className="hh-prop-label">{l}</span><span className={`hh-prop-val hh-${t}`}>{v}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* TLS 핸드셰이크 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>TLS 핸드셰이크 과정</SectionTitle>
          <div className="hh-tls-box">
            <div className="hh-tls-arena">
              <div className="hh-tls-peer">
                <div className="hh-tls-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>🌐</div>
                <div className="hh-tls-peer-name">CLIENT</div>
              </div>
              <div className="hh-tls-mid">
                {tlsSteps.map((s, i) => (
                  <div key={i} className={`hh-tls-arrow ${s.dir} ${step >= i + 1 ? 'show' : ''}`}>
                    <span className="hh-tls-flag" style={Object.fromEntries(s.flagStyle.split(';').map(p => p.split(':').map(v => v.trim())).filter(([k]) => k))}>{s.flag}</span>
                    <div className="hh-tls-line" style={{ background: s.line }} />
                    <span className="hh-tls-tip" style={{ color: s.line }}>{s.dir === 'right' ? '→' : '←'}</span>
                  </div>
                ))}
              </div>
              <div className="hh-tls-peer">
                <div className="hh-tls-icon" style={{ background: 'rgba(34,197,94,0.1)', borderColor: '#22c55e' }}>🖧</div>
                <div className="hh-tls-peer-name">SERVER</div>
              </div>
            </div>
            <AnimationControls color="#22c55e" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '\u2460', text: 'Client \u2192 Server: ClientHello \u2014 TLS 버전, 암호화 스위트, 랜덤 값 전송', color: '#3b82f6' },
                  { num: '\u2461', text: 'Server \u2192 Client: ServerHello \u2014 선택한 암호화 스위트, 서버 인증서 전송', color: '#a855f7' },
                  { num: '\u2462', text: 'Server \u2192 Client: Certificate \u2014 CA가 서명한 서버 공개키 인증서 전달', color: '#22c55e' },
                  { num: '\u2463', text: 'Client \u2192 Server: Key Exchange \u2014 Pre-Master Secret을 서버 공개키로 암호화하여 전송', color: '#f59e0b' },
                  { num: '\u2464', text: 'Client \u2192 Server: ChangeCipherSpec \u2014 이후 통신은 대칭키로 암호화하겠다고 알림', color: '#06b6d4' },
                  { num: '\u2465', text: 'Server \u2192 Client: Finished \u2014 서버도 대칭키 생성 완료, 암호화 통신 시작', color: '#22c55e' },
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

        {/* 인증서 체인 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>인증서 신뢰 체인 (Certificate Chain)</SectionTitle>
          <div className="hh-cert-flow">
            {[
              { icon: '🏛️', name: 'Root CA', desc: '최상위 인증기관', color: '#f59e0b', bg: 'rgba(245,158,11,.08)' },
              null,
              { icon: '🏢', name: 'Intermediate CA', desc: '중간 인증기관', color: '#a855f7', bg: 'rgba(168,85,247,.08)' },
              null,
              { icon: '🌐', name: '서버 인증서', desc: '도메인 인증서', color: '#22c55e', bg: 'rgba(34,197,94,.08)' },
            ].map((item, i) =>
              item === null ? (
                <div key={i} className="hh-cert-arrow">→</div>
              ) : (
                <div key={i} className="hh-cert-node" style={{ background: item.bg, borderColor: `${item.color}40` }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: '#5a6a85' }}>{item.desc}</div>
                </div>
              )
            )}
          </div>
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>브라우저는 Root CA 목록을 내장</strong>하고 있어서, 서버 인증서 → 중간 CA → Root CA 순으로 서명을 검증합니다.
            체인이 끊어지거나 Root CA를 신뢰할 수 없으면 <strong style={{ color: '#22c55e' }}>"이 사이트는 안전하지 않습니다"</strong> 경고가 표시됩니다.
          </HighlightBox>
        </div>

        {/* 중간자 공격 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>중간자 공격 (MITM) — HTTP가 위험한 이유</SectionTitle>
          <div className="hh-mitm-grid">
            {/* HTTP 시나리오 */}
            <div className="hh-mitm-scenario" style={{ borderTop: '3px solid #ef4444' }}>
              <div className="hh-mitm-label" style={{ color: '#ef4444' }}>HTTP — 평문 전송</div>
              <div className="hh-mitm-actors">
                <div className="hh-mitm-actor">
                  <div className="hh-mitm-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>PC</div>
                  <div className="hh-mitm-name">CLIENT</div>
                </div>
                <div className="hh-mitm-wire">
                  <div className={`hh-mitm-packet ${mitmStep >= 1 ? 'show' : ''}`} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444440', color: '#fca5a5' }}>
                    password: 1234 →
                  </div>
                </div>
                <div className="hh-mitm-actor">
                  <div className="hh-mitm-icon" style={{ background: 'rgba(239,68,68,0.1)', borderColor: '#ef4444' }}>!!</div>
                  <div className="hh-mitm-name">ATTACKER</div>
                </div>
                <div className="hh-mitm-wire">
                  <div className={`hh-mitm-packet from-right ${mitmStep >= 2 ? 'show' : ''}`} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444440', color: '#fca5a5' }}>
                    → password: 1234
                  </div>
                </div>
                <div className="hh-mitm-actor">
                  <div className="hh-mitm-icon" style={{ background: 'rgba(34,197,94,0.1)', borderColor: '#22c55e' }}>SV</div>
                  <div className="hh-mitm-name">SERVER</div>
                </div>
              </div>
              <div className={`hh-mitm-data-box ${mitmStep >= 2 ? 'show' : ''}`} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid #ef444430', color: '#fca5a5' }}>
                공격자가 본 데이터:<br />
                <span style={{ color: '#ef4444', fontWeight: 700 }}>password: 1234</span> ← 평문 그대로 노출
              </div>
              <div className={`hh-mitm-result ${mitmStep >= 3 ? 'show' : ''}`} style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid #ef444420', color: '#fca5a5' }}>
                <strong style={{ color: '#ef4444' }}>데이터 탈취 성공:</strong> 공격자가 평문 데이터를 그대로 읽고, 수정하여 서버에 전달할 수도 있습니다.
              </div>
            </div>

            {/* HTTPS 시나리오 */}
            <div className="hh-mitm-scenario" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="hh-mitm-label" style={{ color: '#22c55e' }}>HTTPS — TLS 암호화</div>
              <div className="hh-mitm-actors">
                <div className="hh-mitm-actor">
                  <div className="hh-mitm-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>PC</div>
                  <div className="hh-mitm-name">CLIENT</div>
                </div>
                <div className="hh-mitm-wire">
                  <div className={`hh-mitm-packet ${mitmStep >= 1 ? 'show' : ''}`} style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e40', color: '#86efac' }}>
                    x8#kL2$mQ9z... →
                  </div>
                </div>
                <div className="hh-mitm-actor">
                  <div className="hh-mitm-icon" style={{ background: 'rgba(239,68,68,0.1)', borderColor: '#ef4444' }}>!!</div>
                  <div className="hh-mitm-name">ATTACKER</div>
                </div>
                <div className="hh-mitm-wire">
                  <div className={`hh-mitm-packet from-right ${mitmStep >= 2 ? 'show' : ''}`} style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid #22c55e40', color: '#86efac' }}>
                    → x8#kL2$mQ9z...
                  </div>
                </div>
                <div className="hh-mitm-actor">
                  <div className="hh-mitm-icon" style={{ background: 'rgba(34,197,94,0.1)', borderColor: '#22c55e' }}>SV</div>
                  <div className="hh-mitm-name">SERVER</div>
                </div>
              </div>
              <div className={`hh-mitm-data-box ${mitmStep >= 2 ? 'show' : ''}`} style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid #22c55e30', color: '#86efac' }}>
                공격자가 본 데이터:<br />
                <span style={{ color: '#22c55e', fontWeight: 700 }}>x8#kL2$mQ9z&amp;Fp...</span> ← 암호문, 해독 불가
              </div>
              <div className={`hh-mitm-result ${mitmStep >= 3 ? 'show' : ''}`} style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid #22c55e20', color: '#86efac' }}>
                <strong style={{ color: '#22c55e' }}>데이터 보호 성공:</strong> 공격자는 암호화된 데이터만 볼 수 있어, 내용을 읽거나 변조할 수 없습니다.
              </div>
            </div>
          </div>
          <div style={{ marginTop: '16px' }}>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '12px', padding: '16px' }}>
              <AnimationControls color="#22c55e" status={mitmStatus} onPlay={playMitm} onReset={handleMitmReset} />
              {/* 단계별 흐름 */}
              <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { num: '\u2460', text: '클라이언트가 데이터를 전송 (HTTP: 평문 password:1234 / HTTPS: 암호문 x8#kL2$mQ9z...)', color: '#3b82f6' },
                    { num: '\u2461', text: '공격자가 중간에서 패킷을 가로챔 (HTTP: 평문 노출 / HTTPS: 암호문만 보임, 해독 불가)', color: '#ef4444' },
                    { num: '\u2462', text: '결과 \u2014 HTTP: 데이터 탈취 및 변조 가능 / HTTPS: 암호화로 읽기/변조 불가, 데이터 보호 성공', color: '#22c55e' },
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
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>HTTPS의 3중 방어:</strong> (1) TLS 암호화로 도청 방지, (2) CA 인증서로 서버 신원 확인, (3) MAC(Message Authentication Code)으로 데이터 변조 탐지.
            이 세 가지가 결합되어 중간자 공격을 효과적으로 차단합니다.
          </HighlightBox>
        </div>

        {/* 암호화 방식 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>대칭키 vs 비대칭키 암호화</SectionTitle>
          <div className="hh-enc-grid">
            <div className="hh-enc-card" style={{ borderTop: '2px solid #3b82f6' }}>
              <h4 style={{ color: '#3b82f6' }}>대칭키 암호화</h4>
              <div className="hh-enc-desc">
                <strong style={{ color: '#93c5fd' }}>하나의 키</strong>로 암호화/복호화를 수행합니다.<br /><br />
                • 속도가 빠름 → <strong style={{ color: '#93c5fd' }}>실제 데이터 전송</strong>에 사용<br />
                • AES, ChaCha20 등이 대표적<br />
                • 문제: 키를 안전하게 교환하는 방법이 필요
              </div>
            </div>
            <div className="hh-enc-card" style={{ borderTop: '2px solid #a855f7' }}>
              <h4 style={{ color: '#a855f7' }}>비대칭키 암호화</h4>
              <div className="hh-enc-desc">
                <strong style={{ color: '#c084fc' }}>공개키/개인키 쌍</strong>으로 동작합니다.<br /><br />
                • 속도가 느림 → <strong style={{ color: '#c084fc' }}>키 교환 단계</strong>에서만 사용<br />
                • RSA, ECDHE 등이 대표적<br />
                • 공개키로 암호화 → 개인키로만 복호화 가능
              </div>
            </div>
          </div>
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>HTTPS는 두 방식을 조합합니다.</strong> 핸드셰이크에서 비대칭키로 안전하게 대칭키를 교환한 뒤,
            실제 데이터는 빠른 대칭키로 암호화하여 전송합니다. 이를 <strong style={{ color: '#22c55e' }}>하이브리드 암호화</strong>라 합니다.
          </HighlightBox>
        </div>

        {/* HSTS */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>HSTS (HTTP Strict Transport Security)</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* HSTS 개요 */}
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#f59e0b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🛡️ HSTS란?
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8 }}>
                <strong style={{ color: '#f59e0b' }}>서버가 브라우저에게 "앞으로 이 도메인은 반드시 HTTPS로만 접속하라"고 지시하는 보안 메커니즘</strong>입니다.
                사용자가 <code style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>http://</code>로 접근하더라도
                브라우저가 자동으로 <code style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>https://</code>로 변환합니다.
              </div>
              <div style={{ margin: '16px 0', padding: '16px 18px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px' }}>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#5a6a85', marginBottom: '8px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>HTTP 응답 헤더</div>
                <div style={{ padding: '8px 12px', background: '#0f172a', borderRadius: '6px', fontFamily: 'var(--mono)', fontSize: '11px', color: '#94a3b8', overflowX: 'auto', marginBottom: '12px' }}>
                  Strict-Transport-Security: <span style={{ color: '#3b82f6' }}>max-age=31536000</span>; <span style={{ color: '#a855f7' }}>includeSubDomains</span>; <span style={{ color: '#22c55e' }}>preload</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { param: 'max-age=31536000', desc: '1년간 HTTPS 강제 (초 단위)', color: '#3b82f6' },
                    { param: 'includeSubDomains', desc: '모든 서브도메인에도 적용', color: '#a855f7' },
                    { param: 'preload', desc: '브라우저 Preload List 등록 요청', color: '#22c55e' },
                  ].map((item) => (
                    <div key={item.param} style={{ display: 'flex', alignItems: 'baseline', gap: '10px', fontSize: '11px' }}>
                      <code style={{ fontFamily: 'var(--mono)', color: item.color, fontWeight: 700, flexShrink: 0 }}>{item.param}</code>
                      <span style={{ color: '#94a3b8' }}>{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SSL Stripping 공격 */}
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px', borderLeft: '3px solid #ef4444' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚠️ HSTS가 방어하는 공격 — SSL Stripping
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '12px' }}>
                HTTPS 리다이렉트만으로는 <strong style={{ color: '#fca5a5' }}>SSL Stripping(다운그레이드 공격)</strong>에 취약합니다.
                공격자가 중간에서 HTTPS를 HTTP로 다운그레이드시켜 평문 통신을 유도하는 공격입니다.
              </div>
              <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '8px', fontFamily: "'JetBrains Mono',monospace" }}>
                  HSTS 없이 301 리다이렉트만 사용하는 경우:
                </div>
                <DiagramContainer title="SSL Stripping 공격 흐름">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#3b82f6" />
                      <DiagramArrow label="HTTP 요청" color="#ef4444" />
                      <DiagramNode icon="👤" label="Attacker" color="#ef4444" />
                      <DiagramArrow label="HTTP 전달" color="#ef4444" />
                      <DiagramNode icon="🖥️" label="Server" color="#22c55e" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="🖥️" label="Server" color="#22c55e" />
                      <DiagramArrow label="301 → HTTPS" color="#22c55e" dashed />
                      <DiagramNode icon="👤" label="Attacker" color="#ef4444" />
                      <DiagramArrow label="HTTP 평문 응답" color="#ef4444" dashed />
                      <DiagramNode icon="💻" label="Client" color="#3b82f6" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#3b82f6" />
                      <DiagramArrow label="HTTP 평문 데이터" color="#ef4444" />
                      <DiagramNode icon="👤" label="Attacker" color="#ef4444" sub="평문 데이터 탈취" />
                      <DiagramArrow label="HTTPS 암호화" color="#22c55e" />
                      <DiagramNode icon="🖥️" label="Server" color="#22c55e" />
                    </DiagramFlow>
                    <div style={{ fontSize: '10px', color: '#ef4444', fontFamily: 'var(--mono)', marginTop: '8px', textAlign: 'center', lineHeight: 1.6 }}>
                      Client는 HTTP로 통신 중 (암호화 없이 데이터 노출)<br />Attacker는 Server와 HTTPS 통신하며 중간에서 평문 데이터 탈취
                    </div>
                  </div>
                </DiagramContainer>
              </div>
              <div style={{ marginTop: '16px', marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', marginBottom: '8px', fontFamily: "'JetBrains Mono',monospace" }}>
                  HSTS가 적용된 경우:
                </div>
                <DiagramContainer title="HSTS 적용 시 — 안전한 흐름">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    <DiagramGroup label="HSTS 적용 도메인" color="#22c55e">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center', padding: '8px 0' }}>
                        <div style={{ fontSize: '10px', color: '#22c55e', fontFamily: 'var(--mono)', marginBottom: '4px' }}>브라우저: HSTS 확인 → HTTPS 자동 변환</div>
                        <DiagramFlow>
                          <DiagramNode icon="💻" label="Client" color="#3b82f6" sub="HTTPS 직접 연결" />
                          <DiagramArrow label="HTTPS" color="#22c55e" />
                          <DiagramNode icon="🖥️" label="Server" color="#22c55e" />
                        </DiagramFlow>
                        <DiagramFlow>
                          <DiagramNode icon="🖥️" label="Server" color="#22c55e" />
                          <DiagramArrow label="암호화된 응답" color="#22c55e" dashed />
                          <DiagramNode icon="💻" label="Client" color="#3b82f6" />
                        </DiagramFlow>
                      </div>
                    </DiagramGroup>
                    <div style={{ fontSize: '10px', color: '#22c55e', fontFamily: 'var(--mono)', marginTop: '4px' }}>
                      공격자가 끼어들 HTTP 구간이 존재하지 않음
                    </div>
                  </div>
                </DiagramContainer>
              </div>
            </div>

            {/* HSTS 동작 흐름 */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '2px solid #3b82f6' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#3b82f6', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  1️⃣ 첫 번째 방문
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    '사용자가 http://로 접속',
                    '서버가 301 → https://로 리다이렉트',
                    'HTTPS 응답에 HSTS 헤더 포함',
                    '브라우저가 HSTS 정책을 저장 (max-age 동안)',
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', lineHeight: 1.6 }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '2px solid #22c55e' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#22c55e', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  2️⃣ 이후 방문
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    '사용자가 http://로 접속 시도',
                    '브라우저가 네트워크 요청 전에 https://로 변환 (307 Internal Redirect)',
                    'HTTP 요청이 네트워크를 타지 않음',
                    '→ SSL Stripping 공격 불가능',
                  ].map((t, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', lineHeight: 1.6 }}>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TOFU 문제와 Preload */}
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px', borderLeft: '3px solid #a855f7' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#a855f7', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                💡 TOFU 문제와 Preload List
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '12px' }}>
                HSTS에는 <strong style={{ color: '#c084fc' }}>TOFU(Trust On First Use)</strong> 문제가 있습니다.
                <strong style={{ color: '#fca5a5' }}> 최초 방문 시에는 아직 HSTS 정책이 저장되지 않았으므로</strong>, 첫 번째 HTTP 요청은 여전히 공격에 노출될 수 있습니다.
              </div>
              <div style={{ margin: '12px 0', padding: '16px 18px', background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#e2e8f0', marginBottom: '12px', fontFamily: 'var(--mono)' }}>HSTS Preload List로 TOFU 문제 해결</div>
                <ol style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    서버 헤더에 <strong style={{ color: '#22c55e' }}>preload</strong> 디렉티브 추가
                    <div style={{ marginTop: '4px', padding: '6px 10px', background: '#0f172a', borderRadius: '6px', fontFamily: 'var(--mono)', fontSize: '10px', color: '#94a3b8', overflowX: 'auto' }}>
                      Strict-Transport-Security: max-age=63072000; includeSubDomains; <span style={{ color: '#22c55e', fontWeight: 700 }}>preload</span>
                    </div>
                  </li>
                  <li style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    <strong style={{ color: '#3b82f6' }}>hstspreload.org</strong>에 도메인 등록 신청
                  </li>
                  <li style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: 1.6 }}>
                    Chrome, Firefox, Safari 등 주요 브라우저에 <strong>하드코딩</strong>
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>→ 한 번도 방문하지 않은 사용자도 처음부터 HTTPS 강제</div>
                  </li>
                  <li style={{ fontSize: '12px', color: '#fca5a5', lineHeight: 1.6 }}>
                    주의: Preload List에서 <strong>제거하려면 수개월</strong> 소요
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>→ 등록 전에 HTTPS 전환이 완전히 완료되었는지 확인 필수</div>
                  </li>
                </ol>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                {[
                  { label: 'Google', color: '#3b82f6' },
                  { label: 'Facebook', color: '#a855f7' },
                  { label: 'Twitter', color: '#06b6d4' },
                  { label: 'GitHub', color: '#22c55e' },
                  { label: 'PayPal', color: '#f59e0b' },
                ].map((site) => (
                  <span key={site.label} style={{ fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', fontFamily: "'JetBrains Mono',monospace", background: `${site.color}15`, border: `1px solid ${site.color}40`, color: site.color }}>
                    {site.label}
                  </span>
                ))}
                <span style={{ fontSize: '11px', color: '#5a6a85', alignSelf: 'center' }}>등 주요 서비스가 Preload List에 등록됨</span>
              </div>
            </div>

            {/* 실무 설정 가이드 */}
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px', borderLeft: '3px solid #06b6d4' }}>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#06b6d4', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🔧 실무 적용 시 주의사항
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { icon: '⏱️', text: 'max-age는 점진적으로 늘리기 — 처음에 300(5분)으로 테스트 → 문제 없으면 604800(1주) → 최종 31536000(1년)' },
                  { icon: '🌐', text: 'includeSubDomains 주의 — 모든 서브도메인이 HTTPS를 지원하는지 확인 후 적용. 하나라도 HTTP만 지원하면 접근 불가' },
                  { icon: '⚠️', text: 'HSTS는 되돌리기 어려움 — max-age가 길면 그 기간 동안 HTTP로 돌아갈 수 없음. Preload는 수개월 소요' },
                  { icon: '🔐', text: 'HTTPS가 완벽히 동작하는지 먼저 확인 — Mixed Content, 인증서 만료 등의 이슈가 없는 상태에서 적용' },
                  { icon: '📋', text: 'CSP와 함께 사용 — Content-Security-Policy: upgrade-insecure-requests로 페이지 내 HTTP 리소스도 자동 업그레이드' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '12px', color: '#94a3b8', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0, fontSize: '14px' }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>핵심 정리:</strong> HTTPS 리다이렉트(301)만으로는 첫 HTTP 요청이 평문으로 노출됩니다.
            HSTS는 <strong style={{ color: '#f59e0b' }}>브라우저 레벨에서 HTTP 자체를 차단</strong>하여 SSL Stripping을 원천 방지하고,
            Preload List는 최초 방문의 취약점(TOFU)까지 해결합니다.
          </HighlightBox>
        </div>

        {/* 요약 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>항목</th>
                  <th style={{ color: '#ef4444' }}>HTTP</th>
                  <th style={{ color: '#22c55e' }}>HTTPS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['기본 포트', '80', '443'],
                  ['암호화', '없음 (평문)', 'TLS 암호화'],
                  ['인증서', '불필요', 'CA 발급 인증서'],
                  ['데이터 무결성', '미보장', 'MAC으로 보장'],
                  ['신원 확인', '불가', '서버 인증서로 확인'],
                  ['중간자 공격', '취약', '방어 가능'],
                  ['성능 오버헤드', '없음', '핸드셰이크 시 미미한 오버헤드'],
                  ['SEO', 'Google 불이익', 'Google 우대'],
                ].map(([label, http, https]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#fca5a5' }}>{http}</td>
                    <td style={{ color: '#86efac' }}>{https}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>자주 나오는 면접 질문</SectionTitle>
          <InterviewQuestions color="#22c55e" items={[
            { q: 'HTTPS는 어떻게 중간자 공격을 방지하나요?', a: 'HTTPS는 세 가지 메커니즘으로 방어합니다. 첫째, TLS 암호화로 데이터를 암호화하여 도청을 방지합니다. 둘째, CA 인증서로 서버의 신원을 확인하여 위장 서버를 감지합니다. 셋째, MAC(Message Authentication Code)으로 데이터 변조를 탐지합니다.' },
            { q: 'TLS 1.2와 TLS 1.3의 주요 차이점은?', a: 'TLS 1.3은 핸드셰이크를 1-RTT로 단축했고(1.2는 2-RTT), 0-RTT 재연결을 지원합니다. 안전하지 않은 암호화 스위트(RC4, DES, SHA-1 등)를 제거하고, 키 교환 알고리즘을 ECDHE로 통일하여 전방향 비밀성(Forward Secrecy)을 기본 보장합니다.' },
            { q: '인증서 투명성(Certificate Transparency)이란?', a: 'CA가 발급한 모든 인증서를 공개 로그에 기록하는 프레임워크입니다. 이를 통해 악의적이거나 잘못 발급된 인증서를 신속히 탐지할 수 있습니다. 브라우저는 CT 로그에 기록된 인증서만 신뢰하므로, 공격자가 위조 인증서를 사용하기 어렵게 만듭니다.' },
            { q: 'HSTS는 무엇이고 왜 필요한가요?', a: 'HSTS(HTTP Strict Transport Security)는 서버가 브라우저에게 해당 도메인은 반드시 HTTPS로만 접속하라고 지시하는 보안 정책입니다. 301 리다이렉트만으로는 첫 번째 HTTP 요청이 평문으로 전송되어 SSL Stripping(HTTPS→HTTP 다운그레이드) 공격에 취약합니다. HSTS가 적용되면 브라우저가 네트워크 요청 전에 자체적으로 HTTPS로 변환(307 Internal Redirect)하므로, HTTP 요청이 네트워크를 타지 않아 중간자가 끼어들 수 없습니다. 다만 최초 방문 시에는 HSTS 정책이 아직 저장되지 않은 TOFU(Trust On First Use) 문제가 있으며, 이를 해결하기 위해 주요 브라우저에 도메인을 하드코딩하는 HSTS Preload List가 사용됩니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

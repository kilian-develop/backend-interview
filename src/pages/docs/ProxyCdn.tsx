import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.pc-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:48px; }
@media(max-width:640px){ .pc-compare-grid{ grid-template-columns:1fr; } }
.pc-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s, box-shadow .25s; }
.pc-card:hover { transform:translateY(-4px); }
.pc-card-title { font-size:20px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.pc-card-sub { font-size:11px; color:#5a6a85; margin-bottom:18px; font-family:'JetBrains Mono',monospace; }
.pc-card-desc { font-size:13px; color:#94a3b8; line-height:1.8; margin-bottom:16px; }
.pc-card-features { display:flex; flex-direction:column; gap:8px; }
.pc-card-feat { display:flex; align-items:flex-start; gap:10px; font-size:12px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.6; }
.pc-card-feat-icon { flex-shrink:0; font-size:15px; margin-top:1px; }
.pc-flow-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.pc-flow-arena { display:flex; align-items:center; justify-content:center; gap:0; flex-wrap:wrap; min-height:120px; padding:16px 0; }
.pc-flow-node { display:flex; flex-direction:column; align-items:center; gap:8px; padding:14px 16px; min-width:100px; }
.pc-flow-icon { width:52px; height:52px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:22px; border:2px solid; transition:all .4s ease; }
.pc-flow-name { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; transition:color .4s ease; }
.pc-flow-desc { font-size:9px; color:#5a6a85; text-align:center; max-width:90px; line-height:1.5; }
.pc-flow-arrow { display:flex; flex-direction:column; align-items:center; gap:2px; padding:0 4px; opacity:0; transform:translateX(-6px); transition:opacity .4s ease, transform .4s ease; }
.pc-flow-arrow.show { opacity:1; transform:translateX(0); }
.pc-flow-arrow-line { font-size:18px; line-height:1; }
.pc-flow-arrow-label { font-size:8px; font-family:'JetBrains Mono',monospace; color:#5a6a85; white-space:nowrap; }
.pc-cdn-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
.pc-cdn-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.pc-cdn-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(34,197,94,0.1); }
.pc-cdn-icon { font-size:32px; margin-bottom:10px; }
.pc-cdn-title { font-size:14px; font-weight:700; margin-bottom:6px; }
.pc-cdn-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.pc-roles-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
.pc-role { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.pc-role-icon { font-size:26px; margin-bottom:10px; }
.pc-role-title { font-size:13px; font-weight:700; margin-bottom:8px; }
.pc-role-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.pc-cache-flow { display:flex; flex-direction:column; gap:0; }
.pc-cache-step { display:flex; align-items:flex-start; gap:14px; padding:14px 0; }
.pc-cache-num { flex-shrink:0; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.pc-cache-content { flex:1; }
.pc-cache-title { font-size:13px; font-weight:700; margin-bottom:4px; }
.pc-cache-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.pc-cache-connector { width:2px; height:10px; margin-left:15px; border-radius:2px; }
.pc-lb-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:640px){ .pc-lb-grid{ grid-template-columns:1fr; } }
.pc-lb-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; }
.pc-lb-card h4 { font-size:15px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.pc-lb-list { display:flex; flex-direction:column; gap:8px; }
.pc-lb-item { display:flex; align-items:flex-start; gap:10px; font-size:12px; color:#94a3b8; padding:8px 12px; background:rgba(255,255,255,0.02); border-radius:7px; line-height:1.6; }
`

export default function ProxyCdn() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 리버스 프록시 흐름을 확인하세요', color: '#5a6a85' })
  const cdnTimeline = useAnimationTimeline()
  const [cdnStep, setCdnStep] = useState(0)
  const [cdnPlaying, setCdnPlaying] = useState(false)
  const [cdnStatus, setCdnStatus] = useState({ msg: '▶ 재생 버튼을 눌러 CDN 캐시 흐름을 확인하세요', color: '#5a6a85' })
  useInjectCSS('style-proxy-cdn', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const steps = [
      { s: 1, delay: 400, msg: '① 클라이언트가 요청 전송', color: '#3b82f6' },
      { s: 2, delay: 1000, msg: '② 리버스 프록시가 요청 수신 (SSL 종료, 라우팅 결정)', color: '#a855f7' },
      { s: 3, delay: 1800, msg: '③ 백엔드 서버로 요청 전달', color: '#22c55e' },
      { s: 4, delay: 2600, msg: '④ 서버 응답 → 프록시 → 클라이언트 반환', color: '#22c55e' },
    ]
    steps.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: '✅ 클라이언트는 프록시 뒤의 실제 서버 구조를 알 수 없습니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 3400)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 리버스 프록시 흐름을 확인하세요', color: '#5a6a85' })
  }

  const playCdn = () => {
    if (cdnPlaying) return
    handleCdnReset()
    setCdnPlaying(true)
    const steps = [
      { s: 1, delay: 400, msg: '① 사용자가 리소스 요청 (서울)', color: '#3b82f6' },
      { s: 2, delay: 1100, msg: '② 가장 가까운 엣지 서버(서울 PoP)에 도착', color: '#f59e0b' },
      { s: 3, delay: 1800, msg: '③ 캐시 HIT! 엣지에서 즉시 응답 반환', color: '#22c55e' },
    ]
    steps.forEach(({ s, delay, msg, color }) => {
      cdnTimeline.schedule(() => { setCdnStep(s); setCdnStatus({ msg, color }) }, delay)
    })
    cdnTimeline.schedule(() => {
      setCdnStatus({ msg: '✅ 원본 서버(미국)까지 가지 않아 응답 속도가 크게 단축됩니다.', color: '#22c55e' })
      setCdnPlaying(false)
    }, 2600)
  }

  const handleCdnReset = () => {
    cdnTimeline.reset()
    setCdnStep(0)
    setCdnPlaying(false)
    setCdnStatus({ msg: '▶ 재생 버튼을 눌러 CDN 캐시 흐름을 확인하세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(168,85,247,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(34,197,94,0.05) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Network · Proxy · CDN · 면접 필수"
          title={<><span style={{ color: '#a855f7' }}>Proxy</span> & <span style={{ color: '#22c55e' }}>CDN</span></>}
          description={<>Forward/Reverse Proxy의 차이, 리버스 프록시의 역할,<br />CDN의 동작 원리와 캐싱 전략을 살펴봅니다.</>}
        />

        {/* Forward vs Reverse Proxy 비교 */}
        <div className="pc-compare-grid">
          <div className="pc-card" style={{ borderTop: '3px solid #3b82f6', boxShadow: '0 0 40px rgba(59,130,246,0.15)' }}>
            <div className="pc-card-title" style={{ color: '#3b82f6' }}>Forward Proxy</div>
            <div className="pc-card-sub">클라이언트 측 프록시</div>
            <div className="pc-card-desc">
              <strong style={{ color: '#93c5fd' }}>클라이언트를 대신하여</strong> 외부 서버에 요청을 보냅니다.
              서버는 실제 클라이언트가 누구인지 알 수 없습니다.
            </div>
            <div className="pc-card-features">
              {[
                ['🔒', '클라이언트 IP 숨김 — 서버에 프록시 IP만 노출'],
                ['🚫', '접근 제어 — 특정 사이트 차단/허용 (기업 네트워크)'],
                ['💾', '캐싱 — 자주 요청하는 리소스를 프록시에서 캐시'],
                ['🌐', '우회 — 지역 제한 콘텐츠 접근 (VPN과 유사)'],
              ].map(([icon, text]) => (
                <div key={text} className="pc-card-feat">
                  <span className="pc-card-feat-icon">{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pc-card" style={{ borderTop: '3px solid #a855f7', boxShadow: '0 0 40px rgba(168,85,247,0.15)' }}>
            <div className="pc-card-title" style={{ color: '#a855f7' }}>Reverse Proxy</div>
            <div className="pc-card-sub">서버 측 프록시</div>
            <div className="pc-card-desc">
              <strong style={{ color: '#c084fc' }}>서버를 대신하여</strong> 클라이언트의 요청을 받습니다.
              클라이언트는 실제 서버가 어디에 있는지 알 수 없습니다.
            </div>
            <div className="pc-card-features">
              {[
                ['⚖️', '로드밸런싱 — 여러 백엔드 서버에 트래픽 분산'],
                ['🔐', 'SSL 종료 — 프록시에서 HTTPS 처리, 백엔드는 HTTP'],
                ['💾', '캐싱 — 정적 파일을 프록시에서 직접 응답'],
                ['🛡️', '보안 — 백엔드 서버의 IP/구조를 외부에 숨김'],
              ].map(([icon, text]) => (
                <div key={text} className="pc-card-feat">
                  <span className="pc-card-feat-icon">{icon}</span><span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 리버스 프록시 흐름 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>리버스 프록시 요청 흐름</SectionTitle>
          <div className="pc-flow-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
              클라이언트는 리버스 프록시(Nginx, AWS ALB 등)에만 접근하며, 뒤에 있는 실제 서버 구조를 알 수 없습니다.
            </div>
            <div className="pc-flow-arena">
              <div className="pc-flow-node">
                <div className="pc-flow-icon" style={{ background: step >= 1 ? 'rgba(59,130,246,0.12)' : 'rgba(75,96,128,0.08)', borderColor: step >= 1 ? '#3b82f6' : '#4b6080', color: step >= 1 ? '#3b82f6' : '#4b6080' }}>
                  PC
                </div>
                <div className="pc-flow-name" style={{ color: step >= 1 ? '#3b82f6' : '#4b6080' }}>CLIENT</div>
              </div>

              <div className={`pc-flow-arrow ${step >= 1 ? 'show' : ''}`}>
                <div className="pc-flow-arrow-line" style={{ color: '#3b82f6' }}>{'→'}</div>
                <div className="pc-flow-arrow-label">HTTPS</div>
              </div>

              <div className="pc-flow-node">
                <div className="pc-flow-icon" style={{ background: step >= 2 ? 'rgba(168,85,247,0.12)' : 'rgba(75,96,128,0.08)', borderColor: step >= 2 ? '#a855f7' : '#4b6080', color: step >= 2 ? '#a855f7' : '#4b6080', fontSize: '14px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace' }}>
                  RP
                </div>
                <div className="pc-flow-name" style={{ color: step >= 2 ? '#a855f7' : '#4b6080' }}>REVERSE PROXY</div>
                <div className="pc-flow-desc">{step >= 2 ? 'SSL 종료 · 라우팅' : 'Nginx / ALB'}</div>
              </div>

              <div className={`pc-flow-arrow ${step >= 3 ? 'show' : ''}`}>
                <div className="pc-flow-arrow-line" style={{ color: '#a855f7' }}>{'→'}</div>
                <div className="pc-flow-arrow-label">HTTP (내부)</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {['Server A', 'Server B', 'Server C'].map((name, i) => (
                  <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace',
                      background: step >= 3 ? 'rgba(34,197,94,0.12)' : 'rgba(75,96,128,0.08)',
                      border: `2px solid ${step >= 3 ? '#22c55e' : '#4b6080'}`,
                      color: step >= 3 ? '#22c55e' : '#4b6080',
                      transition: 'all .4s ease',
                    }}>
                      {`S${i + 1}`}
                    </div>
                    <span style={{ fontSize: '10px', fontFamily: 'JetBrains Mono,monospace', color: step >= 3 ? '#22c55e' : '#4b6080', transition: 'color .4s ease' }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
            <AnimationControls color="#a855f7" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '클라이언트가 HTTPS 요청 전송', color: '#3b82f6' },
                  { num: '②', text: '리버스 프록시가 요청 수신 — SSL 종료, 라우팅 결정', color: '#a855f7' },
                  { num: '③', text: '내부 HTTP로 백엔드 서버(A/B/C)에 요청 전달', color: '#22c55e' },
                  { num: '④', text: '서버 응답 → 프록시 경유 → 클라이언트에 반환', color: '#22c55e' },
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

        {/* 리버스 프록시의 역할 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>리버스 프록시의 핵심 역할</SectionTitle>
          <div className="pc-roles-grid">
            {[
              { icon: '⚖️', title: '로드밸런싱', desc: '여러 백엔드 서버에 요청을 분산합니다. Round Robin, Least Connection, IP Hash 등의 알고리즘으로 트래픽을 균등하게 배분합니다.', color: '#3b82f6' },
              { icon: '🔐', title: 'SSL Termination', desc: 'HTTPS 암호화/복호화를 프록시에서 처리하고, 백엔드 서버와는 HTTP로 통신합니다. 서버의 암호화 부담을 줄여줍니다.', color: '#a855f7' },
              { icon: '💾', title: '정적 파일 캐싱', desc: '이미지, CSS, JS 등 정적 파일을 프록시에서 직접 응답하여 백엔드 서버 부하를 줄이고 응답 속도를 높입니다.', color: '#22c55e' },
              { icon: '🛡️', title: '보안 / WAF', desc: '백엔드 서버의 IP와 구조를 외부에 숨기고, DDoS 방어, Rate Limiting, WAF(웹 방화벽) 역할을 수행합니다.', color: '#ef4444' },
              { icon: '🗜️', title: '응답 압축', desc: 'gzip, Brotli 등으로 응답을 압축하여 전송 크기를 줄입니다. 백엔드 서버가 압축을 신경쓰지 않아도 됩니다.', color: '#f59e0b' },
              { icon: '📝', title: '로깅 / 모니터링', desc: '모든 요청이 프록시를 통과하므로 접근 로그, 응답 시간, 에러율 등을 중앙에서 수집하고 모니터링할 수 있습니다.', color: '#06b6d4' },
            ].map((r) => (
              <div key={r.title} className="pc-role" style={{ borderTop: `3px solid ${r.color}` }}>
                <div className="pc-role-icon">{r.icon}</div>
                <div className="pc-role-title" style={{ color: r.color }}>{r.title}</div>
                <div className="pc-role-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* L4 vs L7 로드밸런서 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>L4 vs L7 로드밸런서</SectionTitle>
          <div className="pc-lb-grid">
            <div className="pc-lb-card" style={{ borderTop: '2px solid #3b82f6' }}>
              <h4 style={{ color: '#3b82f6' }}>L4 로드밸런서 (전송 계층)</h4>
              <div className="pc-lb-list">
                {[
                  ['IP/Port 기반으로 트래픽을 분산합니다'],
                  ['패킷 내용을 확인하지 않아 매우 빠름'],
                  ['TCP/UDP 레벨에서 동작 (프로토콜 무관)'],
                  ['단순 분산에 적합 (게임 서버, DB 등)'],
                  ['예: AWS NLB, HAProxy (TCP mode)'],
                ].map(([text]) => (
                  <div key={text} className="pc-lb-item">
                    <span style={{ color: '#3b82f6' }}>{'•'}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pc-lb-card" style={{ borderTop: '2px solid #a855f7' }}>
              <h4 style={{ color: '#a855f7' }}>L7 로드밸런서 (응용 계층)</h4>
              <div className="pc-lb-list">
                {[
                  ['HTTP 헤더, URL, 쿠키 등 내용 기반으로 분산'],
                  ['경로별 라우팅 (/api → API 서버, /static → 파일 서버)'],
                  ['SSL 종료, 헤더 조작, 압축 등 부가 기능'],
                  ['웹 서비스에 적합 (URL 기반 라우팅 필요 시)'],
                  ['예: AWS ALB, Nginx, Envoy'],
                ].map(([text]) => (
                  <div key={text} className="pc-lb-item">
                    <span style={{ color: '#a855f7' }}>{'•'}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#3b82f6" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#3b82f6' }}>L4는 빠르고 단순, L7은 똑똑하고 유연합니다.</strong> 대부분의 웹 서비스는 URL/경로 기반 라우팅이 필요하므로 L7(ALB, Nginx)을 사용하며, 극도의 성능이 필요하거나 비-HTTP 프로토콜을 처리할 때 L4(NLB)를 사용합니다.
          </HighlightBox>
        </div>

        {/* CDN 섹션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>CDN (Content Delivery Network)</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              CDN은 전 세계에 분산된 <strong style={{ color: '#22c55e' }}>엣지 서버(Edge Server / PoP)</strong>에 콘텐츠를 캐시하여,
              사용자와 <strong style={{ color: '#22c55e' }}>지리적으로 가장 가까운 서버</strong>에서 콘텐츠를 제공합니다.
              원본 서버(Origin)의 부하를 줄이고 응답 속도를 크게 단축합니다.
            </div>
            <div className="pc-cdn-grid">
              {[
                { icon: '🌍', title: '글로벌 분산', desc: '전 세계 수십~수백 개의 엣지 서버(PoP)에 콘텐츠를 복제하여 사용자와 가까운 곳에서 응답합니다.', color: '#22c55e' },
                { icon: '💾', title: '캐싱', desc: '정적 파일(이미지, CSS, JS, 영상)을 엣지에 캐시하여 원본 서버 요청을 줄이고 빠르게 응답합니다.', color: '#3b82f6' },
                { icon: '🛡️', title: 'DDoS 방어', desc: '트래픽이 여러 엣지에 분산되어 DDoS 공격을 흡수합니다. 대부분의 CDN이 WAF 기능도 제공합니다.', color: '#ef4444' },
                { icon: '⚡', title: '성능 최적화', desc: '이미지 압축, HTTP/2·3 지원, TLS 최적화 등 다양한 성능 개선을 엣지에서 처리합니다.', color: '#f59e0b' },
              ].map((c) => (
                <div key={c.title} className="pc-cdn-card" style={{ borderTop: `3px solid ${c.color}` }}>
                  <div className="pc-cdn-icon">{c.icon}</div>
                  <div className="pc-cdn-title" style={{ color: c.color }}>{c.title}</div>
                  <div className="pc-cdn-desc">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CDN 캐시 동작 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>CDN 캐시 동작 흐름</SectionTitle>
          <div className="pc-flow-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
              캐시 HIT 시 원본 서버까지 가지 않고 <strong style={{ color: '#22c55e' }}>엣지 서버에서 즉시 응답</strong>합니다.
              캐시 MISS 시에만 원본에 요청 후 엣지에 저장합니다.
            </div>
            <div className="pc-flow-arena">
              <div className="pc-flow-node">
                <div className="pc-flow-icon" style={{ background: cdnStep >= 1 ? 'rgba(59,130,246,0.12)' : 'rgba(75,96,128,0.08)', borderColor: cdnStep >= 1 ? '#3b82f6' : '#4b6080', color: cdnStep >= 1 ? '#3b82f6' : '#4b6080' }}>
                  PC
                </div>
                <div className="pc-flow-name" style={{ color: cdnStep >= 1 ? '#3b82f6' : '#4b6080' }}>사용자 (서울)</div>
              </div>

              <div className={`pc-flow-arrow ${cdnStep >= 1 ? 'show' : ''}`}>
                <div className="pc-flow-arrow-line" style={{ color: '#3b82f6' }}>{'→'}</div>
                <div className="pc-flow-arrow-label">요청</div>
              </div>

              <div className="pc-flow-node">
                <div className="pc-flow-icon" style={{
                  background: cdnStep >= 2 ? 'rgba(34,197,94,0.12)' : 'rgba(75,96,128,0.08)',
                  borderColor: cdnStep >= 2 ? '#22c55e' : '#4b6080',
                  color: cdnStep >= 2 ? '#22c55e' : '#4b6080',
                  fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace',
                }}>
                  Edge
                </div>
                <div className="pc-flow-name" style={{ color: cdnStep >= 2 ? '#22c55e' : '#4b6080' }}>엣지 서버 (서울)</div>
                <div className="pc-flow-desc" style={{ color: cdnStep >= 3 ? '#22c55e' : '#5a6a85' }}>{cdnStep >= 3 ? 'Cache HIT!' : 'PoP'}</div>
              </div>

              <div className={`pc-flow-arrow ${cdnStep >= 3 ? 'show' : ''}`}>
                <div className="pc-flow-arrow-line" style={{ color: '#22c55e' }}>{'←'}</div>
                <div className="pc-flow-arrow-label">즉시 응답</div>
              </div>

              <div className="pc-flow-node" style={{ opacity: cdnStep >= 3 ? 0.3 : 1, transition: 'opacity .4s ease' }}>
                <div className="pc-flow-icon" style={{ background: 'rgba(75,96,128,0.08)', borderColor: '#4b6080', color: '#4b6080', fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace' }}>
                  SV
                </div>
                <div className="pc-flow-name" style={{ color: '#4b6080' }}>원본 서버 (미국)</div>
                <div className="pc-flow-desc">{cdnStep >= 3 ? '요청 안 감!' : 'Origin'}</div>
              </div>
            </div>
            <AnimationControls color="#22c55e" status={cdnStatus} onPlay={playCdn} onReset={handleCdnReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '사용자(서울)가 리소스 요청', color: '#3b82f6' },
                  { num: '②', text: '가장 가까운 엣지 서버(서울 PoP)에 요청 도착', color: '#f59e0b' },
                  { num: '③', text: '캐시 HIT — 엣지에서 즉시 응답 반환 (원본 서버 요청 없음)', color: '#22c55e' },
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

        {/* CDN 캐싱 전략 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>CDN 캐싱 전략</SectionTitle>
          <div className="pc-lb-grid">
            <div className="pc-lb-card" style={{ borderTop: '2px solid #22c55e' }}>
              <h4 style={{ color: '#22c55e' }}>Cache HIT vs MISS</h4>
              <div className="pc-lb-list">
                {[
                  ['Cache HIT — 엣지에 캐시된 콘텐츠가 있어 즉시 반환. 원본 요청 없음'],
                  ['Cache MISS — 엣지에 캐시가 없어 원본 서버에 요청 후 엣지에 저장'],
                  ['Cache STALE — 캐시 만료 후 원본에 재검증 (304 Not Modified 또는 새 데이터)'],
                  ['Cache Purge — 캐시를 수동으로 무효화. 긴급 업데이트 시 사용'],
                ].map(([text]) => (
                  <div key={text} className="pc-lb-item">
                    <span style={{ color: '#22c55e' }}>{'•'}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pc-lb-card" style={{ borderTop: '2px solid #f59e0b' }}>
              <h4 style={{ color: '#f59e0b' }}>캐시 제어 헤더</h4>
              <div className="pc-lb-list">
                {[
                  ['Cache-Control: public, max-age=31536000 — 1년간 CDN/브라우저 캐시'],
                  ['Cache-Control: s-maxage=3600 — CDN에만 적용되는 캐시 시간 (1시간)'],
                  ['Cache-Control: no-cache — 매번 재검증 필요 (ETag/Last-Modified)'],
                  ['Surrogate-Control — CDN 전용 캐시 헤더 (Fastly 등)'],
                ].map(([text]) => (
                  <div key={text} className="pc-lb-item">
                    <span style={{ color: '#f59e0b' }}>{'•'}</span><span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px' }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>정적 파일은 긴 TTL + 콘텐츠 해시 전략이 표준입니다.</strong> 파일명에 해시를 포함(app.a3b2c1.js)하면 내용이 바뀔 때 파일명도 바뀌므로 max-age를 1년으로 설정해도 안전합니다. 캐시 무효화 걱정 없이 최대한 캐시를 활용할 수 있습니다.
          </HighlightBox>
        </div>

        {/* Forward vs Reverse 흐름 비교 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>Forward Proxy vs Reverse Proxy — 위치 비교</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '22px', borderTop: '2px solid #3b82f6' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#3b82f6', marginBottom: '14px' }}>Forward Proxy</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 0', flexWrap: 'wrap' }}>
                {[
                  { label: 'Client A', color: '#3b82f6' },
                  { label: 'Client B', color: '#3b82f6' },
                ].map((c) => (
                  <div key={c.label} style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${c.color}40`, background: `${c.color}10`, fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: c.color }}>{c.label}</div>
                ))}
                <span style={{ color: '#5a6a85', fontSize: '16px' }}>{'→'}</span>
                <div style={{ padding: '10px 16px', borderRadius: '10px', border: '2px solid #3b82f6', background: 'rgba(59,130,246,0.1)', fontSize: '11px', fontWeight: 900, fontFamily: 'JetBrains Mono,monospace', color: '#3b82f6' }}>FWD PROXY</div>
                <span style={{ color: '#5a6a85', fontSize: '16px' }}>{'→'}</span>
                <div style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #4b608040', background: 'rgba(75,96,128,0.06)', fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: '#4b6080' }}>Internet</div>
              </div>
              <div style={{ fontSize: '11px', color: '#5a6a85', textAlign: 'center', lineHeight: 1.7 }}>
                클라이언트 측에 위치 — <strong style={{ color: '#93c5fd' }}>서버는 실제 클라이언트를 모름</strong>
              </div>
            </div>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '22px', borderTop: '2px solid #a855f7' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#a855f7', marginBottom: '14px' }}>Reverse Proxy</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 0', flexWrap: 'wrap' }}>
                <div style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #4b608040', background: 'rgba(75,96,128,0.06)', fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: '#4b6080' }}>Internet</div>
                <span style={{ color: '#5a6a85', fontSize: '16px' }}>{'→'}</span>
                <div style={{ padding: '10px 16px', borderRadius: '10px', border: '2px solid #a855f7', background: 'rgba(168,85,247,0.1)', fontSize: '11px', fontWeight: 900, fontFamily: 'JetBrains Mono,monospace', color: '#a855f7' }}>REV PROXY</div>
                <span style={{ color: '#5a6a85', fontSize: '16px' }}>{'→'}</span>
                {[
                  { label: 'Server A', color: '#22c55e' },
                  { label: 'Server B', color: '#22c55e' },
                ].map((s) => (
                  <div key={s.label} style={{ padding: '8px 12px', borderRadius: '8px', border: `1px solid ${s.color}40`, background: `${s.color}10`, fontSize: '10px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', color: s.color }}>{s.label}</div>
                ))}
              </div>
              <div style={{ fontSize: '11px', color: '#5a6a85', textAlign: 'center', lineHeight: 1.7 }}>
                서버 측에 위치 — <strong style={{ color: '#c084fc' }}>클라이언트는 실제 서버를 모름</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 요약 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>항목</th>
                  <th style={{ color: '#3b82f6' }}>Forward Proxy</th>
                  <th style={{ color: '#a855f7' }}>Reverse Proxy</th>
                  <th style={{ color: '#22c55e' }}>CDN</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['위치', '클라이언트 측', '서버 측', '전 세계 엣지 서버'],
                  ['보호 대상', '클라이언트 (IP 숨김)', '서버 (구조 숨김)', '원본 서버 (부하 분산)'],
                  ['주요 목적', '접근 제어, 우회', '로드밸런싱, 보안', '콘텐츠 캐싱, 속도'],
                  ['캐싱', '클라이언트 측 캐시', '서버 응답 캐시', '엣지 캐시 (글로벌)'],
                  ['SSL', '클라이언트 대신 처리', 'SSL 종료 (Termination)', '엣지에서 SSL 처리'],
                  ['대표 서비스', 'Squid, 사내 프록시', 'Nginx, HAProxy, ALB', 'CloudFront, Cloudflare'],
                ].map(([label, fp, rp, cdn]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#93c5fd' }}>{fp}</td>
                    <td style={{ color: '#c084fc' }}>{rp}</td>
                    <td style={{ color: '#86efac' }}>{cdn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#a855f7" items={[
            { q: 'Forward Proxy와 Reverse Proxy의 차이는?', a: 'Forward Proxy는 클라이언트 측에 위치하여 클라이언트를 대신해 외부 서버에 요청합니다. 서버는 실제 클라이언트 IP를 알 수 없습니다. 주로 접근 제어(사이트 차단), IP 우회에 사용됩니다. Reverse Proxy는 서버 측에 위치하여 클라이언트의 요청을 대신 받습니다. 클라이언트는 실제 서버 구조를 알 수 없습니다. 로드밸런싱, SSL 종료, 캐싱, 보안 등에 사용되며, Nginx, AWS ALB가 대표적입니다.' },
            { q: 'CDN은 어떻게 동작하나요?', a: 'CDN은 전 세계에 분산된 엣지 서버(PoP)에 콘텐츠를 캐시합니다. 사용자가 리소스를 요청하면 DNS가 지리적으로 가장 가까운 엣지 서버로 라우팅합니다. 엣지에 캐시가 있으면(HIT) 즉시 응답하고, 없으면(MISS) 원본 서버에서 가져와 엣지에 저장한 후 응답합니다. 이를 통해 원본 서버 부하 감소, 응답 지연 단축, 가용성 향상을 달성합니다.' },
            { q: 'L4 로드밸런서와 L7 로드밸런서의 차이는?', a: 'L4 로드밸런서는 전송 계층(TCP/UDP)에서 동작하며 IP와 Port 정보만으로 트래픽을 분산합니다. 패킷 내용을 확인하지 않아 매우 빠르지만, URL 기반 라우팅은 불가능합니다. L7 로드밸런서는 응용 계층(HTTP)에서 동작하며 URL 경로, 헤더, 쿠키 등을 기반으로 라우팅할 수 있습니다. SSL 종료, 압축, 헤더 조작 등 부가 기능도 제공합니다. 웹 서비스에는 주로 L7(AWS ALB, Nginx), 비-HTTP 프로토콜에는 L4(AWS NLB)를 사용합니다.' },
            { q: 'Nginx를 리버스 프록시로 사용하는 이유는?', a: 'Nginx는 이벤트 기반 비동기 아키텍처로 적은 메모리로 많은 동시 연결을 처리합니다. 리버스 프록시로서 로드밸런싱(Round Robin, Least Connection, IP Hash), SSL 종료, 정적 파일 서빙, gzip 압축, Rate Limiting, 캐싱 등을 하나의 서버에서 수행할 수 있습니다. 설정이 간단하고 성능이 뛰어나며 무료(오픈소스)라 실무에서 가장 널리 사용됩니다.' },
            { q: 'CDN 캐시 무효화(Cache Invalidation)는 어떻게 하나요?', a: '주로 세 가지 방법을 사용합니다. (1) 콘텐츠 해시 파일명: 파일명에 해시를 포함(app.a3b2c1.js)하여 내용이 바뀌면 파일명도 바뀌므로 자연스럽게 새 캐시가 생깁니다. (2) Cache Purge API: CDN 제공업체의 API를 호출하여 특정 URL의 캐시를 수동 삭제합니다. (3) TTL 기반 만료: Cache-Control의 max-age나 s-maxage로 자동 만료 시간을 설정합니다. 실무에서는 정적 파일에 콘텐츠 해시 + 긴 TTL, 동적 콘텐츠에 짧은 TTL이나 no-cache를 조합하는 전략이 일반적입니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

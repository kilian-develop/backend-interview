import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.hr-flow-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.hr-flow-steps { display:flex; flex-direction:column; gap:0; position:relative; }
.hr-flow-step { display:flex; align-items:flex-start; gap:16px; padding:16px 0; opacity:0; transform:translateY(8px); transition:opacity .5s ease, transform .5s ease; }
.hr-flow-step.show { opacity:1; transform:translateY(0); }
.hr-flow-num { flex-shrink:0; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.hr-flow-content { flex:1; }
.hr-flow-title { font-size:14px; font-weight:700; margin-bottom:6px; }
.hr-flow-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.hr-flow-connector { width:2px; height:16px; margin-left:17px; border-radius:2px; }
.hr-msg-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; overflow:hidden; }
.hr-msg-header { padding:12px 18px; font-family:'JetBrains Mono',monospace; font-size:12px; font-weight:700; border-bottom:1px solid #1a2234; }
.hr-msg-body { padding:16px 18px; font-family:'JetBrains Mono',monospace; font-size:12px; line-height:1.9; color:#94a3b8; overflow-x:auto; }
.hr-msg-line { display:flex; gap:4px; flex-wrap:wrap; }
.hr-msg-key { color:#06b6d4; }
.hr-msg-val { color:#94a3b8; }
.hr-msg-method { color:#22c55e; font-weight:700; }
.hr-msg-path { color:#f59e0b; }
.hr-msg-status { font-weight:700; }
.hr-methods-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:12px; }
.hr-method-card { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:16px; transition:transform .2s; }
.hr-method-card:hover { transform:translateY(-2px); }
.hr-method-name { font-family:'JetBrains Mono',monospace; font-size:16px; font-weight:900; margin-bottom:8px; }
.hr-method-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.hr-method-props { display:flex; gap:6px; flex-wrap:wrap; margin-top:8px; }
.hr-method-prop { font-size:10px; padding:2px 8px; border-radius:12px; font-family:'JetBrains Mono',monospace; }
.hr-codes-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; }
.hr-code-group { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; }
.hr-code-group h4 { font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.hr-code-list { display:flex; flex-direction:column; gap:6px; }
.hr-code-item { display:flex; gap:10px; font-size:12px; color:#94a3b8; padding:6px 10px; background:rgba(255,255,255,.02); border-radius:6px; }
.hr-code-num { font-family:'JetBrains Mono',monospace; font-weight:700; flex-shrink:0; width:36px; }
.hr-render-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.hr-render-pipeline { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:0; margin-bottom:16px; }
.hr-render-step { display:flex; flex-direction:column; align-items:center; gap:8px; padding:14px 10px; min-width:100px; border-radius:12px; border:2px solid #1a2234; background:#0a0d14; transition:border-color .4s ease, box-shadow .4s ease, transform .3s ease; }
.hr-render-step.active { transform:translateY(-3px); }
.hr-render-step-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; font-family:'JetBrains Mono',monospace; transition:background .4s ease; }
.hr-render-step-name { font-size:11px; font-weight:700; text-align:center; transition:color .4s ease; color:#5a6a85; }
.hr-render-step-desc { font-size:9px; color:#3a4a65; text-align:center; line-height:1.5; max-width:90px; }
.hr-render-connector { font-size:18px; color:#1a2234; padding:0 2px; transition:color .4s ease; }
.hr-render-connector.active { color:#5a6a85; }
.hr-render-trigger-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-top:16px; }
@media(max-width:640px){ .hr-render-trigger-grid{ grid-template-columns:1fr; } }
.hr-render-trigger { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:16px; }
.hr-render-trigger h4 { font-size:13px; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:6px; }
.hr-render-trigger-list { display:flex; flex-direction:column; gap:4px; }
.hr-render-trigger-item { font-size:11px; font-family:'JetBrains Mono',monospace; color:#94a3b8; padding:4px 8px; background:rgba(255,255,255,.02); border-radius:4px; }
`

const flowSteps = [
  { num: '1', title: '사용자가 URL 입력', desc: '브라우저 주소창에 URL을 입력하면 scheme(http/https), host, path 등으로 파싱합니다. HTTPS가 필요한 도메인이면 자동으로 리다이렉트됩니다.', color: '#3b82f6' },
  { num: '2', title: 'DNS 조회', desc: '도메인을 IP 주소로 변환합니다. 브라우저 캐시 → OS 캐시 → ISP의 Recursive Resolver → Root → TLD → Authoritative DNS 순으로 조회하며, 캐시 히트 시 즉시 반환합니다.', color: '#a855f7' },
  { num: '3', title: 'TCP 연결 수립', desc: '3-Way Handshake(SYN → SYN+ACK → ACK)로 TCP 연결을 수립합니다. HTTPS인 경우 TLS 핸드셰이크가 추가로 수행됩니다.', color: '#06b6d4' },
  { num: '4', title: 'HTTP 요청 전송', desc: '브라우저가 HTTP 요청 메시지를 구성하여 전송합니다. Start Line(메서드 + URI + HTTP 버전), Headers(Host, Accept 등), Body(POST/PUT 시)로 구성됩니다.', color: '#22c55e' },
  { num: '5', title: '서버 처리', desc: '리버스 프록시(Nginx 등)를 거쳐 WAS로 전달되며, 라우팅 → 인증/인가 → 비즈니스 로직 → DB 조회 순서로 처리됩니다.', color: '#f59e0b' },
  { num: '6', title: 'HTTP 응답 반환', desc: '서버는 Status Line(상태 코드), Response Headers(Content-Type, Cache-Control 등), Body(HTML/JSON 등)를 포함한 응답을 반환합니다.', color: '#ef4444' },
  { num: '7', title: '브라우저 렌더링', desc: 'HTML 파싱 → DOM 트리 → CSSOM → Render Tree → Layout → Paint → Composite 순서로 화면을 렌더링합니다. script 태그는 파싱을 차단하므로 defer/async 속성으로 제어합니다.', color: '#ec4899' },
]

const renderSteps = [
  { name: 'HTML Parsing', desc: 'HTML을 토큰화하고 파싱', color: '#3b82f6', icon: 'H' },
  { name: 'DOM Tree', desc: 'HTML 요소의 트리 구조 생성', color: '#a855f7', icon: 'D' },
  { name: 'CSSOM', desc: 'CSS 규칙을 파싱하여 스타일 트리 생성', color: '#ec4899', icon: 'C' },
  { name: 'Render Tree', desc: 'DOM + CSSOM 결합 (display:none 제외)', color: '#f59e0b', icon: 'R' },
  { name: 'Layout', desc: '각 요소의 위치와 크기 계산', color: '#22c55e', icon: 'L' },
  { name: 'Paint', desc: '픽셀 단위로 화면에 그리기', color: '#06b6d4', icon: 'P' },
  { name: 'Composite', desc: '레이어를 합성하여 최종 화면 출력', color: '#ef4444', icon: 'Co' },
]

export default function HttpRequestResponse() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 요청-응답 흐름을 확인하세요', color: '#5a6a85' })
  const [renderStep, setRenderStep] = useState(0)
  const [renderPlaying, setRenderPlaying] = useState(false)
  const renderTimeline = useAnimationTimeline()
  const [renderStatus, setRenderStatus] = useState({ msg: '▶ 재생 버튼을 눌러 렌더링 파이프라인을 확인하세요', color: '#5a6a85' })
  useInjectCSS('style-http-req-res', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    flowSteps.forEach((s, i) => {
      schedule(() => {
        setStep(i + 1)
        setStatus({ msg: `${s.num}/7 ${s.title} — ${s.desc.slice(0, 50)}...`, color: s.color })
      }, 400 + i * 700)
    })
    schedule(() => {
      setStatus({ msg: '✅ 요청-응답 흐름 완료! URL 입력부터 화면 렌더링까지의 전체 과정입니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 400 + flowSteps.length * 700 + 300)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 요청-응답 흐름을 확인하세요', color: '#5a6a85' })
  }

  const playRender = () => {
    if (renderPlaying) return
    handleRenderReset()
    setRenderPlaying(true)
    renderSteps.forEach((s, i) => {
      renderTimeline.schedule(() => {
        setRenderStep(i + 1)
        setRenderStatus({ msg: `${i + 1}/${renderSteps.length} ${s.name} — ${s.desc}`, color: s.color })
      }, 400 + i * 700)
    })
    renderTimeline.schedule(() => {
      setRenderStatus({ msg: '렌더링 파이프라인 완료! HTML 파싱부터 합성까지의 전체 과정입니다.', color: '#22c55e' })
      setRenderPlaying(false)
    }, 400 + renderSteps.length * 700 + 300)
  }

  const handleRenderReset = () => {
    renderTimeline.reset()
    setRenderStep(0)
    setRenderPlaying(false)
    setRenderStatus({ msg: '▶ 재생 버튼을 눌러 렌더링 파이프라인을 확인하세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,158,11,0.05) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="HTTP · Request & Response · 면접 필수"
          title={<>HTTP <span style={{ color: '#06b6d4' }}>요청</span>-<span style={{ color: '#f59e0b' }}>응답</span> 흐름</>}
          description={<>브라우저에 URL을 입력하면 무슨 일이 벌어질까?<br />DNS 조회부터 렌더링까지, 전체 흐름을 따라가 봅니다.</>}
        />

        {/* 전체 흐름 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>URL 입력부터 화면 렌더링까지</SectionTitle>
          <div className="hr-flow-box">
            <div className="hr-flow-steps">
              {flowSteps.map((s, i) => (
                <div key={i}>
                  <div className={`hr-flow-step ${step > i ? 'show' : ''}`}>
                    <div className="hr-flow-num" style={{ background: `${s.color}18`, border: `2px solid ${s.color}`, color: s.color }}>{s.num}</div>
                    <div className="hr-flow-content">
                      <div className="hr-flow-title" style={{ color: s.color }}>{s.title}</div>
                      <div className="hr-flow-desc">{s.desc}</div>
                    </div>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="hr-flow-connector" style={{ background: step > i ? `${s.color}40` : '#1a2234' }} />
                  )}
                </div>
              ))}
            </div>
            <AnimationControls color="#06b6d4" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '사용자가 URL 입력 — scheme, host, path 등으로 파싱', color: '#3b82f6' },
                  { num: '②', text: 'DNS 조회 — 도메인을 IP 주소로 변환 (캐시 → Resolver → Root → TLD → Auth)', color: '#a855f7' },
                  { num: '③', text: 'TCP 연결 수립 — 3-Way Handshake + TLS 핸드셰이크(HTTPS)', color: '#06b6d4' },
                  { num: '④', text: 'HTTP 요청 전송 — Start Line + Headers + Body 구성하여 서버로 전송', color: '#22c55e' },
                  { num: '⑤', text: '서버 처리 — 리버스 프록시 → WAS → 라우팅 → 인증/인가 → 비즈니스 로직 → DB', color: '#f59e0b' },
                  { num: '⑥', text: 'HTTP 응답 반환 — Status Line + Response Headers + Body 반환', color: '#ef4444' },
                  { num: '⑦', text: '브라우저 렌더링 — DOM → CSSOM → Render Tree → Layout → Paint → Composite', color: '#ec4899' },
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

        {/* HTTP 메시지 구조 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>HTTP 메시지 구조</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="hr-msg-box" style={{ borderTop: '3px solid #06b6d4' }}>
              <div className="hr-msg-header" style={{ color: '#06b6d4' }}>📤 요청 (Request)</div>
              <div className="hr-msg-body">
                <div className="hr-msg-line"><span className="hr-msg-method">GET</span> <span className="hr-msg-path">/api/users/1</span> <span>HTTP/1.1</span></div>
                <div className="hr-msg-line"><span className="hr-msg-key">Host:</span> <span className="hr-msg-val">example.com</span></div>
                <div className="hr-msg-line"><span className="hr-msg-key">Accept:</span> <span className="hr-msg-val">application/json</span></div>
                <div className="hr-msg-line"><span className="hr-msg-key">Authorization:</span> <span className="hr-msg-val">Bearer eyJhbGci...</span></div>
                <div className="hr-msg-line"><span className="hr-msg-key">User-Agent:</span> <span className="hr-msg-val">Mozilla/5.0</span></div>
                <div style={{ borderTop: '1px dashed #1a2234', margin: '8px 0', paddingTop: '8px', color: '#5a6a85' }}>(body — GET은 보통 비어있음)</div>
              </div>
            </div>
            <div className="hr-msg-box" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="hr-msg-header" style={{ color: '#f59e0b' }}>📥 응답 (Response)</div>
              <div className="hr-msg-body">
                <div className="hr-msg-line"><span>HTTP/1.1</span> <span className="hr-msg-status" style={{ color: '#22c55e' }}>200 OK</span></div>
                <div className="hr-msg-line"><span className="hr-msg-key">Content-Type:</span> <span className="hr-msg-val">application/json</span></div>
                <div className="hr-msg-line"><span className="hr-msg-key">Content-Length:</span> <span className="hr-msg-val">128</span></div>
                <div className="hr-msg-line"><span className="hr-msg-key">Cache-Control:</span> <span className="hr-msg-val">max-age=3600</span></div>
                <div style={{ borderTop: '1px dashed #1a2234', margin: '8px 0', paddingTop: '8px' }}>
                  <span style={{ color: '#5a6a85' }}>{'{'}</span><br />
                  <span style={{ color: '#06b6d4' }}>&nbsp;&nbsp;"id"</span>: 1,<br />
                  <span style={{ color: '#06b6d4' }}>&nbsp;&nbsp;"name"</span>: <span style={{ color: '#22c55e' }}>"홍길동"</span><br />
                  <span style={{ color: '#5a6a85' }}>{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* HTTP 메서드 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>주요 HTTP 메서드</SectionTitle>
          <div className="hr-methods-grid">
            {[
              { name: 'GET', color: '#22c55e', desc: '리소스 조회. 서버 상태를 변경하지 않음.', props: [{ l: '안전', c: '#22c55e' }, { l: '멱등', c: '#3b82f6' }, { l: '캐시 가능', c: '#a855f7' }] },
              { name: 'POST', color: '#f59e0b', desc: '리소스 생성. 요청마다 새로운 리소스가 생성될 수 있음.', props: [{ l: '비안전', c: '#ef4444' }, { l: '비멱등', c: '#ef4444' }] },
              { name: 'PUT', color: '#3b82f6', desc: '리소스 전체 수정. 해당 리소스를 완전히 대체.', props: [{ l: '비안전', c: '#ef4444' }, { l: '멱등', c: '#3b82f6' }] },
              { name: 'PATCH', color: '#a855f7', desc: '리소스 부분 수정. 변경할 필드만 전송.', props: [{ l: '비안전', c: '#ef4444' }, { l: '비멱등', c: '#ef4444' }] },
              { name: 'DELETE', color: '#ef4444', desc: '리소스 삭제. 해당 리소스를 제거.', props: [{ l: '비안전', c: '#ef4444' }, { l: '멱등', c: '#3b82f6' }] },
              { name: 'HEAD', color: '#06b6d4', desc: 'GET과 동일하지만 바디 없이 헤더만 반환.', props: [{ l: '안전', c: '#22c55e' }, { l: '멱등', c: '#3b82f6' }] },
            ].map((m) => (
              <div key={m.name} className="hr-method-card" style={{ borderLeft: `3px solid ${m.color}` }}>
                <div className="hr-method-name" style={{ color: m.color }}>{m.name}</div>
                <div className="hr-method-desc">{m.desc}</div>
                <div className="hr-method-props">
                  {m.props.map((p) => (
                    <span key={p.l} className="hr-method-prop" style={{ background: `${p.c}15`, border: `1px solid ${p.c}40`, color: p.c }}>{p.l}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>멱등성(Idempotency)이란?</strong> 같은 요청을 여러 번 보내도 결과가 동일한 성질입니다.
            GET, PUT, DELETE는 멱등하지만, POST와 PATCH는 멱등하지 않습니다.
            이는 <strong style={{ color: '#06b6d4' }}>재시도 정책과 캐싱 전략</strong>에 직접적인 영향을 줍니다.
          </HighlightBox>
        </div>

        {/* 상태 코드 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>주요 HTTP 상태 코드</SectionTitle>
          <div className="hr-codes-grid">
            {[
              { range: '2xx', title: '성공', color: '#22c55e', codes: [
                ['200', 'OK — 요청 성공'], ['201', 'Created — 리소스 생성 완료'], ['204', 'No Content — 성공, 바디 없음'],
              ] },
              { range: '3xx', title: '리다이렉션', color: '#3b82f6', codes: [
                ['301', 'Moved Permanently — 영구 이동'], ['302', 'Found — 임시 이동'], ['304', 'Not Modified — 캐시 사용'],
              ] },
              { range: '4xx', title: '클라이언트 오류', color: '#f59e0b', codes: [
                ['400', 'Bad Request — 잘못된 요청'], ['401', 'Unauthorized — 인증 필요'], ['403', 'Forbidden — 권한 없음'], ['404', 'Not Found — 리소스 없음'], ['409', 'Conflict — 충돌'],
              ] },
              { range: '5xx', title: '서버 오류', color: '#ef4444', codes: [
                ['500', 'Internal Server Error — 서버 내부 오류'], ['502', 'Bad Gateway — 게이트웨이 오류'], ['503', 'Service Unavailable — 서비스 이용 불가'],
              ] },
            ].map((g) => (
              <div key={g.range} className="hr-code-group" style={{ borderTop: `2px solid ${g.color}` }}>
                <h4 style={{ color: g.color }}>{g.range} {g.title}</h4>
                <div className="hr-code-list">
                  {g.codes.map(([code, desc]) => (
                    <div key={code} className="hr-code-item">
                      <span className="hr-code-num" style={{ color: g.color }}>{code}</span>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HTTP 캐싱 전략 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>HTTP 캐싱 전략</SectionTitle>
          <div className="hr-codes-grid">
            <div className="hr-code-group" style={{ borderTop: '2px solid #22c55e' }}>
              <h4 style={{ color: '#22c55e' }}>Cache-Control 디렉티브</h4>
              <div className="hr-code-list">
                {[
                  ['no-store', '캐시 자체를 하지 않음. 매 요청마다 서버에서 새로 받아옴. 민감한 데이터(개인정보, 결제 등)에 사용'],
                  ['no-cache', '캐시 저장은 하지만, 사용 전 반드시 서버에 재검증(Revalidation) 요청. 캐시하지 말라는 의미가 아님에 주의'],
                  ['max-age=N', 'N초 동안 캐시를 신선한(fresh) 상태로 간주. 이 기간 내에는 서버에 요청하지 않고 캐시를 바로 사용'],
                  ['public', 'CDN, 프록시 등 중간 캐시도 저장 가능. 공개 리소스(이미지, CSS, JS)에 적합'],
                  ['private', '브라우저 캐시에만 저장 가능. 프록시/CDN에서는 캐시하지 않음. 사용자별 데이터에 사용'],
                  ['must-revalidate', 'max-age 만료 후 반드시 서버에 재검증 필요. 만료된 캐시를 그냥 사용하는 것을 방지'],
                ].map(([directive, desc]) => (
                  <div key={directive} className="hr-code-item">
                    <span className="hr-code-num" style={{ color: '#22c55e', width: 'auto', marginRight: '8px' }}>{directive}</span>
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hr-code-group" style={{ borderTop: '2px solid #3b82f6' }}>
              <h4 style={{ color: '#3b82f6' }}>강한 캐싱 vs 조건부 요청</h4>
              <div className="hr-code-list">
                {[
                  ['강한 캐싱', 'Cache-Control: max-age 또는 Expires 헤더로 유효 기간 설정. 기간 내에는 서버에 요청 자체를 보내지 않음 (200 from cache)'],
                  ['ETag / If-None-Match', '서버가 리소스의 고유 해시값(ETag)을 응답. 재검증 시 클라이언트가 If-None-Match 헤더로 ETag 전송. 변경 없으면 304 Not Modified'],
                  ['Last-Modified / If-Modified-Since', '서버가 리소스의 마지막 수정 시간을 응답. 재검증 시 If-Modified-Since로 전송. 1초 미만의 변경은 감지 불가하여 ETag보다 부정확'],
                  ['캐시 무효화', '파일명에 콘텐츠 해시를 포함(app.a3b2c1.js)하거나, 버전 쿼리 파라미터(style.css?v=2)를 사용하여 캐시를 강제로 갱신'],
                ].map(([strategy, desc]) => (
                  <div key={strategy} className="hr-code-item">
                    <span className="hr-code-num" style={{ color: '#3b82f6', width: 'auto', marginRight: '8px' }}>{strategy}</span>
                    <span>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>Cache-Control: no-cache는 "캐시하지 마"가 아닙니다.</strong> 캐시 저장은 허용하되, 사용하기 전에 반드시 원본 서버에 재검증(ETag/Last-Modified)을 요청하라는 의미입니다. 캐시를 완전히 금지하려면 <strong style={{ color: '#22c55e' }}>no-store</strong>를 사용해야 합니다. 실무에서 자주 혼동되는 개념이므로 면접에서도 정확히 구분해서 답변해야 합니다.
          </HighlightBox>
        </div>

        {/* 브라우저 렌더링 파이프라인 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>브라우저 렌더링 파이프라인</SectionTitle>
          <div className="hr-render-box">
            <div className="hr-render-pipeline">
              {renderSteps.map((s, i) => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    className={`hr-render-step ${renderStep >= i + 1 ? 'active' : ''}`}
                    style={{
                      borderColor: renderStep >= i + 1 ? s.color : '#1a2234',
                      boxShadow: renderStep >= i + 1 ? `0 0 20px ${s.color}20` : 'none',
                    }}
                  >
                    <div
                      className="hr-render-step-icon"
                      style={{
                        background: renderStep >= i + 1 ? `${s.color}20` : 'rgba(255,255,255,0.03)',
                        color: renderStep >= i + 1 ? s.color : '#3a4a65',
                        border: `1px solid ${renderStep >= i + 1 ? s.color + '60' : '#1a2234'}`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <div className="hr-render-step-name" style={{ color: renderStep >= i + 1 ? s.color : '#5a6a85' }}>
                      {s.name}
                    </div>
                    <div className="hr-render-step-desc">{s.desc}</div>
                  </div>
                  {i < renderSteps.length - 1 && (
                    <div className={`hr-render-connector ${renderStep >= i + 1 ? 'active' : ''}`}>→</div>
                  )}
                </div>
              ))}
            </div>
            <AnimationControls color="#06b6d4" status={renderStatus} onPlay={playRender} onReset={handleRenderReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'HTML Parsing — HTML을 토큰화하고 파싱', color: '#3b82f6' },
                  { num: '②', text: 'DOM Tree — HTML 요소의 트리 구조 생성', color: '#a855f7' },
                  { num: '③', text: 'CSSOM — CSS 규칙을 파싱하여 스타일 트리 생성', color: '#ec4899' },
                  { num: '④', text: 'Render Tree — DOM + CSSOM 결합 (display:none 제외)', color: '#f59e0b' },
                  { num: '⑤', text: 'Layout — 각 요소의 위치와 크기 계산 (Reflow)', color: '#22c55e' },
                  { num: '⑥', text: 'Paint — 픽셀 단위로 화면에 그리기 (Repaint)', color: '#06b6d4' },
                  { num: '⑦', text: 'Composite — 레이어를 합성하여 최종 화면 출력 (GPU)', color: '#ef4444' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', lineHeight: 1.6 }}>
                    <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.num}</span>
                    <span style={{ color: '#94a3b8' }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="hr-render-trigger-grid">
            <div className="hr-render-trigger" style={{ borderTop: '2px solid #f59e0b' }}>
              <h4 style={{ color: '#f59e0b' }}>Layout 트리거 (Reflow)</h4>
              <div className="hr-render-trigger-list">
                {['width / height', 'margin / padding', 'display / position', 'font-size', 'window.resize'].map((p) => (
                  <div key={p} className="hr-render-trigger-item">{p}</div>
                ))}
              </div>
            </div>
            <div className="hr-render-trigger" style={{ borderTop: '2px solid #06b6d4' }}>
              <h4 style={{ color: '#06b6d4' }}>Paint 트리거 (Repaint)</h4>
              <div className="hr-render-trigger-list">
                {['color / background', 'border-radius', 'box-shadow', 'visibility', 'outline'].map((p) => (
                  <div key={p} className="hr-render-trigger-item">{p}</div>
                ))}
              </div>
            </div>
            <div className="hr-render-trigger" style={{ borderTop: '2px solid #22c55e' }}>
              <h4 style={{ color: '#22c55e' }}>Composite Only (GPU)</h4>
              <div className="hr-render-trigger-list">
                {['transform', 'opacity', 'will-change', 'filter', 'perspective'].map((p) => (
                  <div key={p} className="hr-render-trigger-item">{p}</div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>Reflow는 가장 비용이 높습니다.</strong> Layout이 변경되면 이후 Paint와 Composite도 다시 수행됩니다.
            성능 최적화 시 <strong style={{ color: '#06b6d4' }}>transform, opacity</strong> 등 Composite Only 속성을 사용하면 Layout/Paint를 건너뛰어 GPU로 처리할 수 있습니다.
          </HighlightBox>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>자주 나오는 면접 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            { q: '브라우저에 URL을 입력하면 무슨 일이 일어나나요?', a: 'URL 파싱(scheme, host, path, query 분리) → HSTS 확인(HTTPS 리다이렉트) → DNS 조회(브라우저/OS 캐시 → hosts 파일 → ISP Recursive Resolver → Root/TLD/Authoritative DNS) → TCP 3-Way Handshake(SYN → SYN+ACK → ACK) → TLS 1.3 Handshake(HTTPS일 경우, 1-RTT) → HTTP 요청 메시지 구성(Start Line + Headers + Body) 및 전송 → 서버 처리(리버스 프록시 → WAS → 비즈니스 로직 → DB) → HTTP 응답(Status Line + Headers + Body) → Critical Rendering Path(HTML 파싱 → DOM 트리 → CSSOM → Render Tree → Layout → Paint → Composite) 순서로 화면이 렌더링됩니다.' },
            { q: 'PUT과 PATCH의 차이를 멱등성 관점에서 설명해주세요.', a: 'PUT은 리소스를 완전히 대체하므로 같은 요청을 여러 번 보내도 결과가 동일합니다(멱등). PATCH는 부분 수정인데, 예를 들어 \'count를 1 증가\'같은 연산은 실행할 때마다 결과가 달라지므로 비멱등할 수 있습니다. 다만 PATCH도 \'name을 홍길동으로 변경\' 같이 멱등하게 설계할 수 있으며, 실무에서는 이렇게 멱등하게 설계하는 것이 재시도 정책이나 장애 복구에 안전합니다.' },
            { q: 'HTTP 캐시 전략에서 ETag와 Last-Modified의 차이는?', a: '둘 다 조건부 요청(Conditional Request)에 사용되는 검증 메커니즘입니다. Last-Modified는 리소스의 마지막 수정 시간(초 단위)을 기반으로 하여, 1초 미만의 변경을 감지할 수 없고, 내용 변경 없이 시간만 바뀌어도 재전송됩니다. ETag는 리소스 콘텐츠의 해시값(Strong) 또는 의미적 동등성(Weak, W/ 접두사)을 기반으로 정확히 판별합니다. ETag가 더 정밀하며, 실무에서는 두 가지를 함께 사용하되 ETag가 우선 적용됩니다.' },
            { q: 'HTTP 캐싱에서 no-cache와 no-store의 차이는?', a: 'no-cache는 캐시 저장은 허용하지만, 캐시된 리소스를 사용하기 전에 반드시 원본 서버에 ETag나 Last-Modified를 통해 재검증(Revalidation)을 요청합니다. 변경이 없으면 304 Not Modified로 빠르게 응답합니다. no-store는 캐시 자체를 완전히 금지하여, 매 요청마다 서버에서 전체 리소스를 새로 받아옵니다. 개인정보나 결제 정보 같은 민감한 데이터에는 no-store를, 항상 최신 데이터가 필요하지만 네트워크 비용을 줄이고 싶다면 no-cache를 사용합니다.' },
            { q: 'Connection: keep-alive의 역할과 HTTP/2에서 불필요한 이유는?', a: 'HTTP/1.0에서는 요청마다 TCP 연결을 새로 수립하고 종료했는데, keep-alive는 하나의 TCP 연결을 재사용하여 3-Way Handshake 비용을 절약합니다. HTTP/1.1에서는 기본 활성화되어 있습니다. HTTP/2에서는 하나의 TCP 연결 위에서 멀티플렉싱으로 모든 요청-응답을 동시 처리하므로, 연결 재사용이 프로토콜 자체에 내장되어 있어 keep-alive 헤더가 의미가 없습니다. HTTP/2 명세에서도 Connection 헤더는 사용하지 않도록 규정하고 있습니다.' },

          ]} />
        </div>
      </div>
    </>
  )
}

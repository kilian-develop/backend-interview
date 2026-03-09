import { useState, useRef, useEffect } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.co-origin-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.co-origin-url { font-family:'JetBrains Mono',monospace; font-size:15px; text-align:center; padding:16px; background:rgba(0,0,0,.3); border-radius:10px; margin-bottom:16px; line-height:1.8; }
.co-origin-parts { display:flex; justify-content:center; gap:20px; flex-wrap:wrap; }
.co-origin-part { text-align:center; }
.co-origin-part-label { font-size:10px; font-family:'JetBrains Mono',monospace; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px; }
.co-origin-part-val { font-family:'JetBrains Mono',monospace; font-size:14px; font-weight:700; padding:6px 14px; border-radius:8px; }
.co-same-grid { display:flex; flex-direction:column; gap:8px; margin-top:16px; }
.co-same-row { display:grid; grid-template-columns:1fr 120px 1fr; gap:12px; padding:10px 14px; background:rgba(255,255,255,.02); border-radius:8px; font-size:12px; font-family:'JetBrains Mono',monospace; align-items:center; }
@media(max-width:600px){ .co-same-row{ grid-template-columns:1fr; } }
.co-flow-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.co-flow-arena { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; min-height:200px; }
.co-flow-peer { flex:0 0 100px; display:flex; flex-direction:column; align-items:center; gap:10px; padding-top:10px; }
.co-flow-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; border:2px solid #1a2234; }
.co-flow-name { font-size:12px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.co-flow-mid { flex:1; display:flex; flex-direction:column; gap:6px; padding:10px 0; }
.co-flow-arrow { display:flex; align-items:center; gap:8px; opacity:0; transform:translateY(6px); transition:opacity .5s ease, transform .5s ease; padding:8px 12px; border-radius:8px; }
.co-flow-arrow.right { flex-direction:row; }
.co-flow-arrow.left { flex-direction:row-reverse; }
.co-flow-arrow.show { opacity:1; transform:translateY(0); }
.co-flow-flag { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:3px 8px; border-radius:5px; white-space:nowrap; flex-shrink:0; }
.co-flow-line { flex:1; height:2px; border-radius:2px; }
.co-flow-tip { font-size:16px; line-height:1; flex-shrink:0; }
.co-headers-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:12px; }
.co-header-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; transition:transform .2s; }
.co-header-card:hover { transform:translateY(-2px); }
.co-header-name { font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; margin-bottom:6px; }
.co-header-dir { font-size:10px; font-family:'JetBrains Mono',monospace; padding:2px 8px; border-radius:10px; display:inline-block; margin-bottom:8px; }
.co-header-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.co-header-example { font-family:'JetBrains Mono',monospace; font-size:11px; padding:8px 12px; background:rgba(0,0,0,.3); border-radius:6px; margin-top:8px; color:#94a3b8; }
.co-type-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .co-type-grid{ grid-template-columns:1fr; } }
.co-type { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; }
.co-type h4 { font-size:15px; font-weight:700; margin-bottom:14px; }
.co-type-items { display:flex; flex-direction:column; gap:8px; }
.co-type-item { font-size:12px; color:#94a3b8; padding:8px 12px; background:rgba(255,255,255,.02); border-radius:6px; line-height:1.6; }
.co-cred-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.co-cred-desc { font-size:13px; color:#94a3b8; line-height:1.8; margin-bottom:20px; }
.co-cred-desc code { font-family:'JetBrains Mono',monospace; font-size:12px; background:rgba(239,68,68,.1); color:#ef4444; padding:2px 6px; border-radius:4px; }
.co-cred-table { width:100%; border-collapse:collapse; margin-bottom:20px; }
.co-cred-table th, .co-cred-table td { padding:12px 16px; text-align:left; font-size:12px; border-bottom:1px solid #1a2234; }
.co-cred-table th { color:#5a6a85; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; background:rgba(0,0,0,.2); }
.co-cred-table td { color:#94a3b8; line-height:1.6; }
.co-cred-table th:first-child, .co-cred-table td:first-child { color:#e2e8f0; font-weight:600; white-space:nowrap; }
.co-cred-error { background:rgba(239,68,68,.06); border:1px solid rgba(239,68,68,.25); border-radius:12px; padding:18px; margin-bottom:20px; }
.co-cred-error-title { font-size:13px; font-weight:700; color:#ef4444; margin-bottom:8px; }
.co-cred-error-msg { font-family:'JetBrains Mono',monospace; font-size:11px; color:#fca5a5; background:rgba(0,0,0,.3); padding:10px 14px; border-radius:8px; line-height:1.7; }
.co-cred-examples { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:640px){ .co-cred-examples{ grid-template-columns:1fr; } }
.co-cred-example { border-radius:12px; padding:18px; }
.co-cred-example-title { font-size:13px; font-weight:700; margin-bottom:10px; }
.co-cred-example-code { font-family:'JetBrains Mono',monospace; font-size:11px; background:rgba(0,0,0,.3); padding:12px; border-radius:8px; line-height:1.8; overflow-x:auto; }
`

const simpleSteps = [
  { dir: 'right', flag: 'GET /api/data', style: 'background:rgba(59,130,246,.15);border:1px solid #3b82f6;color:#3b82f6', line: '#3b82f6', desc: 'Origin: https://client.com' },
  { dir: 'left', flag: '200 OK', style: 'background:rgba(34,197,94,.15);border:1px solid #22c55e;color:#22c55e', line: '#22c55e', desc: 'Access-Control-Allow-Origin: https://client.com' },
]

const preflightSteps = [
  { dir: 'right', flag: 'OPTIONS (Preflight)', style: 'background:rgba(245,158,11,.15);border:1px solid #f59e0b;color:#f59e0b', line: '#f59e0b', desc: 'Origin + Access-Control-Request-Method + Headers' },
  { dir: 'left', flag: '204 No Content', style: 'background:rgba(168,85,247,.15);border:1px solid #a855f7;color:#a855f7', line: '#a855f7', desc: 'Allow-Origin + Allow-Methods + Allow-Headers + Max-Age' },
  { dir: 'right', flag: 'PUT /api/data', style: 'background:rgba(59,130,246,.15);border:1px solid #3b82f6;color:#3b82f6', line: '#3b82f6', desc: '실제 요청 전송' },
  { dir: 'left', flag: '200 OK', style: 'background:rgba(34,197,94,.15);border:1px solid #22c55e;color:#22c55e', line: '#22c55e', desc: 'Access-Control-Allow-Origin 포함 응답' },
]

export default function CorsDeepDive() {
  const [simpleStep, setSimpleStep] = useState(0)
  const [preflightStep, setPreflightStep] = useState(0)
  const [simpleStatus, setSimpleStatus] = useState({ msg: '▶ 재생 버튼을 눌러 단순 요청 흐름을 확인하세요', color: '#5a6a85' })
  const [preflightStatus, setPreflightStatus] = useState({ msg: '▶ 재생 버튼을 눌러 Preflight 요청 흐름을 확인하세요', color: '#5a6a85' })
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  useInjectCSS('style-cors-deep-dive', CSS)

  useEffect(() => {
    return () => { timeoutsRef.current.forEach(clearTimeout) }
  }, [])

  const clearAll = () => { timeoutsRef.current.forEach(clearTimeout); timeoutsRef.current = [] }

  const playSimple = () => {
    clearAll(); setSimpleStep(0); setSimpleStatus({ msg: '요청 시작...', color: '#3b82f6' })
    simpleSteps.forEach((s, i) => {
      const t = setTimeout(() => {
        setSimpleStep(i + 1)
        setSimpleStatus({ msg: `${s.flag} — ${s.desc}`, color: '#e2e8f0' })
      }, 500 + i * 900)
      timeoutsRef.current.push(t)
    })
    const t = setTimeout(() => setSimpleStatus({ msg: '✅ 단순 요청 완료! Preflight 없이 바로 요청/응답.', color: '#22c55e' }), 500 + 2 * 900)
    timeoutsRef.current.push(t)
  }

  const playPreflight = () => {
    clearAll(); setPreflightStep(0); setPreflightStatus({ msg: 'Preflight 시작...', color: '#f59e0b' })
    preflightSteps.forEach((s, i) => {
      const t = setTimeout(() => {
        setPreflightStep(i + 1)
        setPreflightStatus({ msg: `${i + 1}/${preflightSteps.length} ${s.flag} — ${s.desc}`, color: '#e2e8f0' })
      }, 500 + i * 800)
      timeoutsRef.current.push(t)
    })
    const t = setTimeout(() => setPreflightStatus({ msg: '✅ Preflight 후 실제 요청 완료! OPTIONS로 허용 여부를 먼저 확인합니다.', color: '#22c55e' }), 500 + 4 * 800)
    timeoutsRef.current.push(t)
  }

  const renderFlow = (steps: typeof simpleSteps, currentStep: number, status: { msg: string; color: string }, onPlay: () => void, btnColor: string) => (
    <div className="co-flow-box">
      <div className="co-flow-arena">
        <div className="co-flow-peer">
          <div className="co-flow-icon" style={{ background: 'rgba(59,130,246,.1)', borderColor: '#3b82f6' }}>🌐</div>
          <div className="co-flow-name" style={{ color: '#3b82f6' }}>BROWSER</div>
        </div>
        <div className="co-flow-mid">
          {steps.map((s, i) => (
            <div key={i} className={`co-flow-arrow ${s.dir} ${currentStep >= i + 1 ? 'show' : ''}`}>
              <span className="co-flow-flag" style={Object.fromEntries(s.style.split(';').map(p => p.split(':').map(v => v.trim())).filter(([k]) => k))}>{s.flag}</span>
              <div className="co-flow-line" style={{ background: s.line }} />
              <span className="co-flow-tip" style={{ color: s.line }}>{s.dir === 'right' ? '→' : '←'}</span>
            </div>
          ))}
        </div>
        <div className="co-flow-peer">
          <div className="co-flow-icon" style={{ background: 'rgba(34,197,94,.1)', borderColor: '#22c55e' }}>🖧</div>
          <div className="co-flow-name" style={{ color: '#22c55e' }}>SERVER</div>
        </div>
      </div>
      <div className="doc-status-bar" style={{ color: status.color }}>{status.msg}</div>
      <div className="doc-btn-row">
        <button
          className="doc-btn"
          style={{ borderColor: btnColor, color: btnColor }}
          onClick={onPlay}
          onMouseOver={(e) => { e.currentTarget.style.background = `${btnColor}1F` }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          ▶ 재생
        </button>
      </div>
    </div>
  )

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(239,68,68,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(34,197,94,0.05) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Security · Same-Origin Policy · CORS · 면접 필수"
          title={<><span style={{ color: '#ef4444' }}>CORS</span> 심화</>}
          description={<>Same-Origin Policy, Preflight 요청, 허용 헤더 설정 —<br />프론트엔드 개발에서 가장 자주 마주치는 보안 정책을 깊이 파해칩니다.</>}
        />

        {/* Same-Origin Policy */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>Same-Origin Policy (동일 출처 정책)</SectionTitle>
          <div className="co-origin-box">
            <div className="co-origin-url">
              <span style={{ color: '#22c55e' }}>https</span>
              <span style={{ color: '#5a6a85' }}>://</span>
              <span style={{ color: '#3b82f6' }}>www.example.com</span>
              <span style={{ color: '#5a6a85' }}>:</span>
              <span style={{ color: '#f59e0b' }}>443</span>
              <span style={{ color: '#5a6a85' }}>/path/page</span>
            </div>
            <div className="co-origin-parts">
              {[
                { label: 'Protocol', val: 'https', color: '#22c55e' },
                { label: 'Host', val: 'www.example.com', color: '#3b82f6' },
                { label: 'Port', val: '443', color: '#f59e0b' },
              ].map((p) => (
                <div key={p.label} className="co-origin-part">
                  <div className="co-origin-part-label" style={{ color: p.color }}>{p.label}</div>
                  <div className="co-origin-part-val" style={{ background: `${p.color}15`, border: `1px solid ${p.color}40`, color: p.color }}>{p.val}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', margin: '16px 0 6px', fontSize: '12px', color: '#5a6a85' }}>
              Origin = <strong style={{ color: '#94a3b8' }}>Protocol + Host + Port</strong> — 셋 중 하나라도 다르면 Cross-Origin
            </div>
            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(245,158,11,.06)', border: '1px solid rgba(245,158,11,.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b', marginBottom: '10px' }}>SOP 예외 — Cross-Origin이어도 허용되는 리소스</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  ['<img>', '이미지 로딩은 Cross-Origin 허용 (픽셀 데이터 읽기는 차단)'],
                  ['<script>', 'CDN의 외부 JS 로딩 허용 — JSONP가 이를 악용'],
                  ['<link>', '외부 CSS 스타일시트 로딩 허용'],
                  ['<video>/<audio>', '미디어 재생은 허용되나 바이너리 데이터 접근은 차단'],
                  ['<iframe>', '렌더링은 허용되나 부모↔자식 DOM 접근은 차단 (X-Frame-Options로 제어)'],
                ].map(([tag, desc]) => (
                  <div key={tag} style={{ display: 'flex', gap: '10px', fontSize: '12px', padding: '6px 10px', background: 'rgba(0,0,0,.2)', borderRadius: '6px' }}>
                    <code style={{ fontFamily: 'JetBrains Mono,monospace', color: '#f59e0b', fontWeight: 700, minWidth: '110px', flexShrink: 0 }}>{tag}</code>
                    <span style={{ color: '#94a3b8' }}>{desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '14px', padding: '12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#a855f7', marginBottom: '6px' }}>JSONP (JSON with Padding)</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.75 }}>
                  {'<script> 태그는 SOP가 적용되지 않는 점을 이용하여, 콜백 함수로 감싼 JSON 데이터를 반환받는 기법입니다. '}
                  {'GET 요청만 가능하고, XSS 공격에 취약하며, 에러 핸들링이 어렵습니다. '}
                  {'현재는 CORS가 표준으로 자리잡아 JSONP는 레거시 시스템에서만 사용됩니다.'}
                </div>
              </div>
            </div>
            <div className="co-same-grid">
              {[
                ['https://example.com/page2', 'Same ✅', '같은 Origin', '#22c55e'],
                ['http://example.com', 'Cross ❌', '프로토콜 다름 (http)', '#ef4444'],
                ['https://api.example.com', 'Cross ❌', '호스트 다름 (서브도메인)', '#ef4444'],
                ['https://example.com:8080', 'Cross ❌', '포트 다름', '#ef4444'],
              ].map(([url, result, reason, color]) => (
                <div key={url} className="co-same-row">
                  <span style={{ color: '#94a3b8' }}>{url}</span>
                  <span style={{ color, fontWeight: 700, textAlign: 'center' }}>{result}</span>
                  <span style={{ color: '#5a6a85' }}>{reason}</span>
                </div>
              ))}
            </div>
          </div>
          <HighlightBox color="#ef4444" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#ef4444' }}>핵심 개념:</strong> SOP는 '읽기'를 차단하는 것이지 '쓰기'(요청 전송 자체)를 차단하는 것이 아닙니다. 서버에 요청은 도달하지만 브라우저가 응답 읽기를 차단합니다. 이것이 CSRF 공격이 가능한 근본 원인이기도 합니다.
          </HighlightBox>
        </div>

        {/* 단순 요청 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>Simple Request (단순 요청)</SectionTitle>
          {renderFlow(simpleSteps, simpleStep, simpleStatus, playSimple, '#22c55e')}
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>단순 요청 조건:</strong> GET/HEAD/POST 중 하나 + Content-Type이 application/x-www-form-urlencoded, multipart/form-data, text/plain 중 하나 + 커스텀 헤더 없음.
            이 조건을 모두 만족하면 <strong style={{ color: '#22c55e' }}>Preflight 없이</strong> 바로 요청합니다.
          </HighlightBox>
        </div>

        {/* Preflight 요청 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>Preflight Request (사전 요청)</SectionTitle>
          {renderFlow(preflightSteps, preflightStep, preflightStatus, playPreflight, '#f59e0b')}
          <HighlightBox color="#ef4444" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#ef4444' }}>Preflight가 발생하는 경우:</strong> PUT/DELETE/PATCH 메서드 사용, Content-Type: application/json, Authorization 등 커스텀 헤더 포함 시.
            브라우저가 <strong style={{ color: '#ef4444' }}>OPTIONS 메서드</strong>로 먼저 허용 여부를 확인합니다.
          </HighlightBox>
        </div>

        {/* CORS 헤더 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>주요 CORS 헤더</SectionTitle>
          <div className="co-headers-grid">
            {[
              { name: 'Access-Control-Allow-Origin', dir: 'Response', color: '#22c55e', desc: '허용할 출처를 지정합니다. * 또는 특정 도메인.', example: 'Access-Control-Allow-Origin: https://client.com' },
              { name: 'Access-Control-Allow-Methods', dir: 'Response', color: '#3b82f6', desc: '허용할 HTTP 메서드를 지정합니다.', example: 'Access-Control-Allow-Methods: GET, POST, PUT, DELETE' },
              { name: 'Access-Control-Allow-Headers', dir: 'Response', color: '#a855f7', desc: '허용할 요청 헤더를 지정합니다.', example: 'Access-Control-Allow-Headers: Content-Type, Authorization' },
              { name: 'Access-Control-Max-Age', dir: 'Response', color: '#f59e0b', desc: 'Preflight 결과를 캐시할 시간(초).', example: 'Access-Control-Max-Age: 86400' },
              { name: 'Access-Control-Allow-Credentials', dir: 'Response', color: '#ef4444', desc: 'Cookie 등 인증 정보 포함 허용 여부.', example: 'Access-Control-Allow-Credentials: true' },
              { name: 'Access-Control-Expose-Headers', dir: 'Response', color: '#06b6d4', desc: '브라우저 JS에서 접근 가능한 응답 헤더 지정.', example: 'Access-Control-Expose-Headers: X-Custom-Header' },
            ].map((h) => (
              <div key={h.name} className="co-header-card" style={{ borderLeft: `3px solid ${h.color}` }}>
                <div className="co-header-name" style={{ color: h.color }}>{h.name}</div>
                <div className="co-header-dir" style={{ background: `${h.color}15`, border: `1px solid ${h.color}30`, color: h.color }}>{h.dir}</div>
                <div className="co-header-desc">{h.desc}</div>
                <div className="co-header-example">{h.example}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Spring CORS 설정 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>Spring Boot CORS 설정 방법</SectionTitle>
          <div className="co-type-grid">
            <div className="co-type" style={{ borderTop: '2px solid #22c55e' }}>
              <h4 style={{ color: '#22c55e' }}>@CrossOrigin (컨트롤러 레벨)</h4>
              <div className="co-type-items">
                <div className="co-type-item">특정 컨트롤러나 메서드에 직접 적용</div>
                <div className="co-type-item">@CrossOrigin(origins = "https://client.com")</div>
                <div className="co-type-item">세밀한 제어가 가능하지만 반복 코드 발생</div>
              </div>
            </div>
            <div className="co-type" style={{ borderTop: '2px solid #3b82f6' }}>
              <h4 style={{ color: '#3b82f6' }}>WebMvcConfigurer (전역 설정)</h4>
              <div className="co-type-items">
                <div className="co-type-item">addCorsMappings()로 전역 CORS 정책 설정</div>
                <div className="co-type-item">allowedOrigins, allowedMethods, maxAge 등</div>
                <div className="co-type-item">애플리케이션 전체에 일관된 정책 적용</div>
              </div>
            </div>
          </div>
        </div>

        {/* Credentials 포함 요청 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>Credentials 포함 요청의 특수 규칙</SectionTitle>
          <div className="co-cred-box">
            <div className="co-cred-desc">
              <code>credentials: 'include'</code> 또는 <code>withCredentials: true</code>를 사용하면
              Cookie, Authorization 헤더 등 인증 정보가 Cross-Origin 요청에 포함됩니다.
              이 경우 일반 CORS보다 더 엄격한 규칙이 적용됩니다.
            </div>
            <div style={{ overflowX:'auto', borderRadius:'10px', border:'1px solid #1a2234', marginBottom:'20px' }}>
              <table className="co-cred-table">
                <thead>
                  <tr>
                    <th>항목</th>
                    <th style={{ color:'#22c55e' }}>Credentials 미포함</th>
                    <th style={{ color:'#ef4444' }}>Credentials 포함</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Allow-Origin</td>
                    <td style={{ color:'#22c55e' }}>* (와일드카드) 허용</td>
                    <td style={{ color:'#ef4444' }}>정확한 Origin 명시 필수</td>
                  </tr>
                  <tr>
                    <td>Allow-Methods</td>
                    <td style={{ color:'#22c55e' }}>* (와일드카드) 허용</td>
                    <td style={{ color:'#ef4444' }}>정확한 메서드 명시 필수</td>
                  </tr>
                  <tr>
                    <td>Allow-Headers</td>
                    <td style={{ color:'#22c55e' }}>* (와일드카드) 허용</td>
                    <td style={{ color:'#ef4444' }}>정확한 헤더 명시 필수</td>
                  </tr>
                  <tr>
                    <td>Allow-Credentials</td>
                    <td style={{ color:'#5a6a85' }}>불필요</td>
                    <td style={{ color:'#ef4444' }}>true 필수</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="co-cred-error">
              <div className="co-cred-error-title">자주 발생하는 에러</div>
              <div className="co-cred-error-msg">
                Access to fetch at 'https://api.example.com' from origin 'https://client.com'{'\n'}
                has been blocked by CORS policy: The value of the{'\n'}
                'Access-Control-Allow-Origin' header must not be the wildcard '*'{'\n'}
                when the request's credentials mode is 'include'.
              </div>
            </div>
            <div className="co-cred-examples">
              <div className="co-cred-example" style={{ background:'rgba(239,68,68,.06)', border:'1px solid rgba(239,68,68,.25)' }}>
                <div className="co-cred-example-title" style={{ color:'#ef4444' }}>잘못된 설정</div>
                <div className="co-cred-example-code" style={{ color:'#fca5a5' }}>
                  {'Access-Control-Allow-Origin: *\n'}
                  {'Access-Control-Allow-Credentials: true\n'}
                  {'\n'}
                  {'// Origin에 와일드카드(*)를 사용하면서\n'}
                  {'// Credentials를 true로 설정 → CORS 에러'}
                </div>
              </div>
              <div className="co-cred-example" style={{ background:'rgba(34,197,94,.06)', border:'1px solid rgba(34,197,94,.25)' }}>
                <div className="co-cred-example-title" style={{ color:'#22c55e' }}>올바른 설정</div>
                <div className="co-cred-example-code" style={{ color:'#86efac' }}>
                  {'Access-Control-Allow-Origin: https://client.com\n'}
                  {'Access-Control-Allow-Methods: GET, POST, PUT\n'}
                  {'Access-Control-Allow-Headers: Content-Type\n'}
                  {'Access-Control-Allow-Credentials: true\n'}
                  {'\n'}
                  {'// 정확한 Origin을 명시하고\n'}
                  {'// Credentials: true 설정'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CORS 보안 실수 Top 3 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>CORS 보안 실수 Top 3</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                num: '1',
                title: 'Access-Control-Allow-Origin: * 와 Credentials 함께 사용',
                color: '#ef4444',
                problem: 'credentials: include 사용 시 Allow-Origin에 와일드카드(*)를 설정하면 브라우저가 CORS 에러를 발생시킵니다. 스펙상 명시적으로 금지된 조합입니다.',
                fix: '허용할 Origin을 명시적으로 나열합니다. 동적으로 Origin을 허용해야 한다면 화이트리스트를 서버에서 관리하고, 요청의 Origin이 화이트리스트에 포함되면 해당 Origin을 응답 헤더에 설정합니다.',
              },
              {
                num: '2',
                title: 'Origin 헤더를 그대로 Allow-Origin에 반영 (Origin Reflection)',
                color: '#f59e0b',
                problem: '서버가 요청의 Origin 헤더 값을 검증 없이 그대로 Access-Control-Allow-Origin에 복사하면, 모든 도메인이 허용되는 것과 동일합니다. credentials: include와 결합하면 사실상 인증된 Cross-Origin 요청을 아무 도메인에서 보낼 수 있어 민감 데이터가 유출될 수 있습니다.',
                fix: '서버에 허용된 Origin 화이트리스트를 설정하고, 요청 Origin이 화이트리스트에 포함된 경우에만 해당 Origin을 응답 헤더에 설정합니다. 정규식 매칭 시 서브도메인 우회(예: evil-example.com)에 주의합니다.',
              },
              {
                num: '3',
                title: 'null Origin 허용',
                color: '#a855f7',
                problem: 'Access-Control-Allow-Origin: null을 설정하면 data: URI, sandboxed iframe, file:// 프로토콜에서 보내는 요청이 허용됩니다. 공격자가 sandboxed iframe에서 악의적인 요청을 보낼 수 있습니다.',
                fix: 'null Origin을 절대 허용하지 마세요. 테스트 환경에서 file:// 프로토콜로 개발 중 null Origin이 발생할 수 있는데, 이 경우 로컬 개발 서버(localhost)를 사용하는 것이 올바른 방법입니다.',
              },
            ].map((item) => (
              <div key={item.num} className="co-cred-box" style={{ borderLeft: `3px solid ${item.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '12px', fontWeight: 700, padding: '3px 10px', borderRadius: '20px', background: `${item.color}18`, border: `1px solid ${item.color}40`, color: item.color }}>실수 {item.num}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: item.color }}>{item.title}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '14px', background: 'rgba(239,68,68,.04)', border: '1px solid rgba(239,68,68,.15)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>문제</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.75 }}>{item.problem}</div>
                  </div>
                  <div style={{ padding: '14px', background: 'rgba(34,197,94,.04)', border: '1px solid rgba(34,197,94,.15)', borderRadius: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>올바른 대응</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.75 }}>{item.fix}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proxy를 이용한 CORS 우회 패턴 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>Proxy를 이용한 CORS 우회 패턴</SectionTitle>
          <div className="co-type-grid">
            <div className="co-type" style={{ borderTop: '2px solid #3b82f6' }}>
              <h4 style={{ color: '#3b82f6' }}>개발 환경 — Dev Server Proxy</h4>
              <div className="co-type-items">
                <div className="co-type-item">Vite의 <code style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', background: 'rgba(59,130,246,.1)', color: '#3b82f6', padding: '1px 5px', borderRadius: '3px' }}>server.proxy</code> 또는 Webpack의 <code style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', background: 'rgba(59,130,246,.1)', color: '#3b82f6', padding: '1px 5px', borderRadius: '3px' }}>devServer.proxy</code> 설정</div>
                <div className="co-type-item">프론트엔드 개발 서버가 API 요청을 받아 백엔드 서버로 프록시 — 브라우저 입장에서는 Same-Origin</div>
                <div className="co-type-item" style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', color: '#94a3b8', background: 'rgba(0,0,0,.3)' }}>
                  {'// vite.config.ts\n'}
                  {'server: {\n'}
                  {'  proxy: {\n'}
                  {'    "/api": { target: "http://localhost:8080", changeOrigin: true }\n'}
                  {'  }\n'}
                  {'}'}
                </div>
              </div>
            </div>
            <div className="co-type" style={{ borderTop: '2px solid #22c55e' }}>
              <h4 style={{ color: '#22c55e' }}>프로덕션 환경 — Reverse Proxy</h4>
              <div className="co-type-items">
                <div className="co-type-item">Nginx가 프론트엔드와 백엔드를 같은 도메인으로 서빙 — CORS 자체가 불필요</div>
                <div className="co-type-item">API Gateway(Kong, AWS API Gateway 등)에서 CORS 헤더를 중앙 관리</div>
                <div className="co-type-item">백엔드 서버에 CORS 설정 부담을 줄이고, 일관된 보안 정책 적용</div>
                <div className="co-type-item" style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', color: '#94a3b8', background: 'rgba(0,0,0,.3)' }}>
                  {'# nginx.conf\n'}
                  {'location /api/ {\n'}
                  {'  proxy_pass http://backend:8080/;\n'}
                  {'}'}
                </div>
              </div>
            </div>
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>핵심 원리:</strong> CORS는 브라우저 정책이므로 서버 간 통신(Server-to-Server)에서는 적용되지 않습니다. 프록시는 브라우저 → 프록시(Same-Origin) → 백엔드(서버 간 통신) 구조로 이 특성을 활용합니다.
          </HighlightBox>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>자주 나오는 면접 질문</SectionTitle>
          <InterviewQuestions color="#ef4444" items={[
            { q: 'CORS는 서버가 막는 건가요, 브라우저가 막는 건가요?', a: '브라우저가 막습니다. 서버는 응답 헤더로 허용 여부를 알려주고, 브라우저가 이를 확인하여 차단합니다. Postman 같은 도구에서는 CORS 에러가 발생하지 않는 이유가 이것입니다.' },
            { q: 'Access-Control-Allow-Origin: * 와 Credentials를 함께 쓸 수 있나요?', a: '아닙니다. credentials: true일 때 Allow-Origin에 와일드카드(*)를 사용할 수 없습니다. 반드시 구체적인 Origin을 명시해야 합니다.' },
            { q: 'Preflight 요청을 줄이는 방법은?', a: 'Access-Control-Max-Age 헤더로 Preflight 결과를 캐시하면 됩니다. 또한 단순 요청 조건(GET/POST + 기본 Content-Type + 커스텀 헤더 없음)을 만족시키면 Preflight 자체가 발생하지 않습니다.' },
            { q: 'Preflight 요청이 매번 발생하면 성능에 영향이 있나요?', a: '네, 모든 실제 요청 전에 OPTIONS 요청이 추가되므로 지연이 발생합니다. Access-Control-Max-Age 헤더로 Preflight 결과를 캐시하면 지정된 시간 동안 같은 요청에 대해 Preflight를 생략합니다. Chrome은 최대 2시간(7200초), Firefox는 24시간(86400초)까지 캐시 가능합니다.' },
            { q: 'CORS 에러가 발생했을 때 디버깅 방법은?', a: '브라우저 개발자 도구의 Network 탭에서 Preflight OPTIONS 요청과 응답 헤더를 확인합니다. Console의 CORS 에러 메시지에 원인이 구체적으로 명시됩니다. 서버 측 Access-Control-Allow-Origin, Methods, Headers 설정이 클라이언트의 요청과 일치하는지 확인하고, credentials 사용 시 와일드카드 제한을 점검합니다.' },
            { q: 'SOP는 요청 자체를 막나요, 응답을 막나요?', a: 'SOP는 요청 전송 자체를 차단하지 않습니다. Cross-Origin 요청은 서버에 정상적으로 도달하고 서버도 응답을 반환하지만, 브라우저가 응답의 읽기(Read)를 차단합니다. 이것이 CSRF 공격이 가능한 이유입니다 — 서버에 상태 변경 요청(POST 등)이 도달하기 때문입니다. 단, Preflight가 필요한 요청의 경우 OPTIONS 요청이 거부되면 실제 요청은 전송되지 않습니다.' },
            { q: '프론트엔드 개발 중 CORS 문제를 해결하는 방법들은?', a: '주요 방법은 다음과 같습니다: (1) 서버에서 적절한 CORS 헤더 설정이 가장 정석적인 방법입니다. (2) 개발 환경에서는 Vite/Webpack의 dev server proxy를 설정하여 Same-Origin처럼 동작하게 합니다. (3) 프로덕션에서는 Nginx 같은 리버스 프록시로 프론트엔드와 API를 같은 도메인에서 서빙하거나, API Gateway에서 CORS를 중앙 관리합니다. (4) 임시 방편으로 브라우저 CORS 비활성화 플래그가 있지만, 보안상 절대 프로덕션에서 사용하면 안 됩니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

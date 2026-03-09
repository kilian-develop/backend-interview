import { useState, useRef, useEffect } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.sj-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:48px; }
@media(max-width:640px){ .sj-compare-grid{ grid-template-columns:1fr; } }
.sj-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.sj-card:hover { transform:translateY(-4px); }
.sj-card-title { font-size:22px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.sj-card-sub { font-size:12px; color:#5a6a85; margin-bottom:22px; font-family:'JetBrains Mono',monospace; }
.sj-prop-list { display:flex; flex-direction:column; gap:10px; }
.sj-prop-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.025); border-radius:8px; font-size:13px; gap:12px; }
.sj-prop-label { color:#5a6a85; font-size:12px; white-space:nowrap; }
.sj-prop-val { font-weight:700; font-size:13px; text-align:right; }
.sj-good { color:#22c55e; } .sj-bad { color:#ef4444; } .sj-neutral { color:#94a3b8; } .sj-warn { color:#f59e0b; }
.sj-storage-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
@media(max-width:700px){ .sj-storage-grid{ grid-template-columns:1fr; } }
.sj-storage { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.sj-storage:hover { transform:translateY(-3px); }
.sj-storage-title { font-size:15px; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:8px; }
.sj-storage-sub { font-size:11px; color:#5a6a85; font-family:'JetBrains Mono',monospace; margin-bottom:14px; }
.sj-storage-props { display:flex; flex-direction:column; gap:8px; }
.sj-sp { display:flex; justify-content:space-between; font-size:12px; padding:6px 10px; background:rgba(255,255,255,.02); border-radius:6px; }
.sj-sp-label { color:#5a6a85; }
.sj-sp-val { font-weight:700; }
.sj-attack-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .sj-attack-grid{ grid-template-columns:1fr; } }
.sj-attack { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; }
.sj-attack h4 { font-size:15px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.sj-attack-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:14px; }
.sj-attack-flow { font-family:'JetBrains Mono',monospace; font-size:11px; line-height:2; padding:12px; background:rgba(0,0,0,.3); border-radius:8px; margin-bottom:14px; color:#94a3b8; }
.sj-defense-list { display:flex; flex-direction:column; gap:6px; }
.sj-defense { font-size:12px; padding:6px 10px; border-radius:6px; display:flex; align-items:flex-start; gap:8px; line-height:1.6; }
.sj-rec-box { background:linear-gradient(135deg,rgba(34,197,94,.06),rgba(59,130,246,.04)); border:1px solid rgba(34,197,94,.25); border-radius:16px; padding:24px; }
.sj-rec-title { font-size:16px; font-weight:700; color:#22c55e; margin-bottom:16px; display:flex; align-items:center; gap:8px; }
.sj-rec-items { display:flex; flex-direction:column; gap:10px; }
.sj-rec-item { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; line-height:1.7; padding:10px 14px; background:rgba(255,255,255,.02); border-radius:8px; }
.sj-refresh-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.sj-refresh-diagram { display:flex; justify-content:space-between; align-items:flex-start; gap:16px; min-height:320px; }
.sj-refresh-peer { flex:0 0 90px; display:flex; flex-direction:column; align-items:center; gap:10px; padding-top:10px; }
.sj-refresh-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; border:2px solid #1a2234; }
.sj-refresh-name { font-size:12px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.sj-refresh-mid { flex:1; display:flex; flex-direction:column; gap:6px; padding:10px 0; }
.sj-refresh-arrow { display:flex; align-items:center; gap:8px; opacity:0; transform:translateY(6px); transition:opacity .5s ease, transform .5s ease; padding:8px 12px; border-radius:8px; }
.sj-refresh-arrow.right { flex-direction:row; }
.sj-refresh-arrow.left { flex-direction:row-reverse; }
.sj-refresh-arrow.show { opacity:1; transform:translateY(0); }
.sj-refresh-flag { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:3px 8px; border-radius:5px; white-space:nowrap; flex-shrink:0; }
.sj-refresh-line { flex:1; height:2px; border-radius:2px; }
.sj-refresh-tip { font-size:16px; line-height:1; flex-shrink:0; }
.sj-refresh-desc { font-size:11px; color:#94a3b8; margin-top:2px; flex:1; }
`

const refreshSteps = [
  { dir: 'right', flag: 'GET /api/data', color: '#3b82f6', desc: '만료된 Access Token으로 API 요청' },
  { dir: 'left', flag: '401 Unauthorized', color: '#ef4444', desc: '서버가 토큰 만료를 감지하고 거부' },
  { dir: 'right', flag: 'POST /auth/refresh', color: '#f59e0b', desc: 'Refresh Token을 서버에 전송하여 갱신 요청' },
  { dir: 'left', flag: 'New AT + New RT', color: '#22c55e', desc: '새 Access Token + 새 Refresh Token 발급 (Rotation)' },
  { dir: 'right', flag: 'GET /api/data (retry)', color: '#a855f7', desc: '새 Access Token으로 원래 요청을 재시도' },
  { dir: 'left', flag: '200 OK', color: '#06b6d4', desc: '서버가 정상 응답 반환' },
]

export default function SessionJwtStorage() {
  const [refreshStep, setRefreshStep] = useState(0)
  const [refreshStatus, setRefreshStatus] = useState({ msg: '▶ 재생 버튼을 눌러 토큰 갱신 플로우를 확인하세요', color: '#5a6a85' })
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  useInjectCSS('style-session-jwt-storage', CSS)

  useEffect(() => {
    return () => { timeoutsRef.current.forEach(clearTimeout) }
  }, [])

  const playRefresh = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setRefreshStep(0)
    setRefreshStatus({ msg: '만료된 토큰으로 요청 시작...', color: '#3b82f6' })
    refreshSteps.forEach((s, i) => {
      const t = setTimeout(() => {
        setRefreshStep(i + 1)
        setRefreshStatus({ msg: `${i + 1}/${refreshSteps.length} ${s.flag} — ${s.desc}`, color: '#e2e8f0' })
      }, 500 + i * 900)
      timeoutsRef.current.push(t)
    })
    const t = setTimeout(() => setRefreshStatus({ msg: '토큰 갱신 완료! Refresh Token Rotation으로 보안을 강화합니다.', color: '#22c55e' }), 500 + refreshSteps.length * 900)
    timeoutsRef.current.push(t)
  }

  const resetRefresh = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
    setRefreshStep(0)
    setRefreshStatus({ msg: '▶ 재생 버튼을 눌러 토큰 갱신 플로우를 확인하세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background:'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,158,11,0.05) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position:'relative', zIndex:1 }}>
        <HeroSection
          tag="Auth · Session · JWT · Storage · 면접 필수"
          title={<><span style={{ color:'#3b82f6' }}>Session</span> vs <span style={{ color:'#f59e0b' }}>JWT</span> 저장</>}
          description={<>Cookie, LocalStorage, SessionStorage 저장 방식과<br />XSS/CSRF 공격 대응 전략을 비교합니다.</>}
        />

        <div className="sj-compare-grid">
          <div className="sj-card" style={{ borderTop:'3px solid #3b82f6', boxShadow:'0 0 40px rgba(59,130,246,0.15)' }}>
            <div className="sj-card-title" style={{ color:'#3b82f6' }}>🗄️ Session 기반</div>
            <div className="sj-card-sub">Stateful — 서버가 상태를 관리</div>
            <div className="sj-prop-list">
              {[
                ['상태 저장','서버 메모리/DB','neutral'],['확장성','Scale-Out 시 세션 동기화 필요','bad'],
                ['보안','서버 제어 가능 (즉시 무효화)','good'],['네트워크','Session ID만 전송 (작음)','good'],
                ['서버 부하','세션 저장소 필요','bad'],['로그아웃','서버에서 즉시 삭제','good'],
              ].map(([l,v,t]) => (
                <div key={l} className="sj-prop-row"><span className="sj-prop-label">{l}</span><span className={`sj-prop-val sj-${t}`}>{v}</span></div>
              ))}
            </div>
          </div>
          <div className="sj-card" style={{ borderTop:'3px solid #f59e0b', boxShadow:'0 0 40px rgba(245,158,11,0.15)' }}>
            <div className="sj-card-title" style={{ color:'#f59e0b' }}>🎫 JWT 기반</div>
            <div className="sj-card-sub">Stateless — 클라이언트가 토큰을 보유</div>
            <div className="sj-prop-list">
              {[
                ['상태 저장','클라이언트 (토큰 자체)','neutral'],['확장성','Stateless로 Scale-Out 용이','good'],
                ['보안','발급 후 제어 어려움','bad'],['네트워크','토큰 전체 전송 (상대적으로 큼)','warn'],
                ['서버 부하','세션 저장소 불필요','good'],['로그아웃','토큰 블랙리스트 필요','bad'],
              ].map(([l,v,t]) => (
                <div key={l} className="sj-prop-row"><span className="sj-prop-label">{l}</span><span className={`sj-prop-val sj-${t}`}>{v}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f59e0b']}>클라이언트 저장소 비교</SectionTitle>
          <div className="sj-storage-grid">
            {[
              { title:'Cookie', icon:'🍪', color:'#22c55e', sub:'document.cookie',
                props:[['용량','~4KB','warn'],['자동 전송','매 요청마다','good'],['만료','설정 가능','good'],['HttpOnly','설정 가능 → JS 접근 차단','good'],['XSS 방어','HttpOnly 시 안전','good'],['CSRF 방어','SameSite 필요','warn']] },
              { title:'LocalStorage', icon:'💾', color:'#3b82f6', sub:'window.localStorage',
                props:[['용량','~5~10MB','good'],['자동 전송','❌ 수동','bad'],['만료','영구 (수동 삭제)','neutral'],['HttpOnly','❌ 불가 — JS 접근 가능','bad'],['XSS 방어','취약','bad'],['CSRF 방어','자동 전송 없어 안전','good']] },
              { title:'SessionStorage', icon:'📋', color:'#a855f7', sub:'window.sessionStorage',
                props:[['용량','~5~10MB','good'],['자동 전송','❌ 수동','bad'],['만료','탭 닫으면 삭제','warn'],['HttpOnly','❌ 불가 — JS 접근 가능','bad'],['XSS 방어','취약','bad'],['CSRF 방어','자동 전송 없어 안전','good']] },
            ].map((s) => (
              <div key={s.title} className="sj-storage" style={{ borderTop:`2px solid ${s.color}` }}>
                <div className="sj-storage-title" style={{ color:s.color }}>{s.icon} {s.title}</div>
                <div className="sj-storage-sub">{s.sub}</div>
                <div className="sj-storage-props">
                  {s.props.map(([l,v,t]) => (
                    <div key={l} className="sj-sp"><span className="sj-sp-label">{l}</span><span className={`sj-sp-val sj-${t}`}>{v}</span></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>Cookie 보안 속성 상세:</strong><br /><br />
            <strong style={{ color: '#22c55e' }}>SameSite 속성 (3가지 값):</strong><br />
            &bull; <strong style={{ color: '#86efac' }}>Strict</strong> — 모든 크로스 사이트 요청에서 쿠키를 전송하지 않음. 가장 강력한 CSRF 방어. 외부 사이트에서 링크를 클릭해 들어올 때도 쿠키가 전송되지 않아 로그인 상태가 풀릴 수 있음<br />
            &bull; <strong style={{ color: '#86efac' }}>Lax</strong> — GET 등 안전한 HTTP 메서드의 Top-level Navigation에서만 쿠키 전송 허용. POST, iframe, AJAX 요청에는 전송하지 않음. Chrome 80부터 기본값<br />
            &bull; <strong style={{ color: '#86efac' }}>None</strong> — 모든 크로스 사이트 요청에 쿠키 전송. 반드시 Secure 속성과 함께 사용해야 함 (HTTPS 필수). 서드파티 쿠키가 필요한 경우에만 사용<br /><br />
            <strong style={{ color: '#22c55e' }}>기타 보안 속성:</strong><br />
            &bull; <strong style={{ color: '#86efac' }}>Secure</strong> — HTTPS 연결에서만 쿠키를 전송. HTTP에서는 쿠키가 포함되지 않아 네트워크 도청 방지<br />
            &bull; <strong style={{ color: '#86efac' }}>HttpOnly</strong> — JavaScript(document.cookie)로 쿠키에 접근 불가. XSS 공격으로 토큰 탈취를 방지<br />
            &bull; <strong style={{ color: '#86efac' }}>Domain</strong> — 쿠키가 전송될 도메인 범위 지정. 설정하지 않으면 발급한 도메인에서만 전송<br />
            &bull; <strong style={{ color: '#86efac' }}>Path</strong> — 쿠키가 전송될 URL 경로 범위 지정. /api로 설정하면 /api 하위 경로에서만 전송
          </HighlightBox>
          <HighlightBox color="#f59e0b" style={{ marginTop: '12px' }}>
            <strong style={{ color: '#f59e0b' }}>Chrome 80 이후 변화:</strong> Chrome 80(2020년 2월)부터 SameSite 속성의 기본값이 <strong style={{ color: '#f59e0b' }}>None에서 Lax로 변경</strong>되었습니다.
            이로 인해 별도 설정 없이도 CSRF 방어가 강화되었지만, 서드파티 쿠키가 필요한 서비스(OAuth 콜백, 결제 연동 등)는 명시적으로 SameSite=None; Secure를 설정해야 합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f59e0b']}>XSS vs CSRF 공격</SectionTitle>
          <div className="sj-attack-grid">
            <div className="sj-attack" style={{ borderTop:'2px solid #ef4444' }}>
              <h4 style={{ color:'#ef4444' }}>🕷️ XSS (Cross-Site Scripting)</h4>
              <div className="sj-attack-desc">
                악성 스크립트를 웹 페이지에 주입하여 사용자의 브라우저에서 실행시키는 공격.
                LocalStorage/SessionStorage의 토큰을 탈취할 수 있습니다.
              </div>
              <div className="sj-attack-flow">
                공격자 → 악성 JS 삽입<br/>
                → 피해자 브라우저에서 실행<br/>
                → document.cookie / localStorage 접근<br/>
                → 토큰 탈취 → 공격자 서버로 전송
              </div>
              <div className="sj-defense-list">
                {[['🔒','HttpOnly Cookie — JS에서 접근 불가'],['🧹','입력값 검증 및 이스케이프 처리'],['🛡️','Content Security Policy (CSP) 헤더'],['🔍','DOMPurify 등 라이브러리로 HTML sanitize']].map(([icon, text]) => (
                  <div key={text} className="sj-defense" style={{ background:'rgba(239,68,68,.04)' }}><span>{icon}</span><span style={{ color:'#fca5a5' }}>{text}</span></div>
                ))}
              </div>
            </div>
            <div className="sj-attack" style={{ borderTop:'2px solid #f59e0b' }}>
              <h4 style={{ color:'#f59e0b' }}>🎭 CSRF (Cross-Site Request Forgery)</h4>
              <div className="sj-attack-desc">
                사용자가 로그인된 상태에서 공격자의 사이트를 방문하면, 사용자 모르게
                인증된 요청을 서버에 전송하는 공격. Cookie의 자동 전송 특성을 악용합니다.
              </div>
              <div className="sj-attack-flow">
                피해자 → 정상 사이트 로그인 (Cookie 저장)<br/>
                → 공격자 사이트 방문<br/>
                → 숨겨진 form/img 태그로 요청 전송<br/>
                → Cookie 자동 포함 → 서버는 정상 요청으로 처리
              </div>
              <div className="sj-defense-list">
                {[['🍪','SameSite Cookie 속성 (Strict/Lax)'],['🎟️','CSRF Token — 서버가 발급한 토큰 검증'],['📋','Referer / Origin 헤더 검증'],['🔑','Double Submit Cookie 패턴']].map(([icon, text]) => (
                  <div key={text} className="sj-defense" style={{ background:'rgba(245,158,11,.04)' }}><span>{icon}</span><span style={{ color:'#fcd34d' }}>{text}</span></div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#ef4444" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#ef4444' }}>Session Fixation 공격:</strong> 공격자가 미리 알고 있는 세션 ID를 피해자에게 강제로 설정하는 공격입니다.
            공격자가 세션 ID를 발급받은 뒤, 피해자에게 해당 세션 ID가 포함된 URL이나 쿠키를 전달합니다.
            피해자가 그 세션 ID로 로그인하면, 공격자가 동일한 세션 ID로 인증된 세션에 접근할 수 있게 됩니다.<br /><br />
            <strong style={{ color: '#fca5a5' }}>방어 방법:</strong><br />
            &bull; <strong style={{ color: '#fca5a5' }}>로그인 성공 시 세션 ID 재발급</strong> — Java에서는 request.getSession().invalidate() 후 새 세션을 생성합니다. Spring Security는 기본적으로 이를 처리합니다 (sessionFixation().migrateSession())<br />
            &bull; <strong style={{ color: '#fca5a5' }}>URL 파라미터로 세션 ID를 전달하지 않음</strong> — Cookie 기반 세션만 사용하도록 설정합니다<br />
            &bull; <strong style={{ color: '#fca5a5' }}>로그인 전후 세션 ID가 반드시 달라야 함</strong> — 인증 상태 변경 시 항상 새로운 세션 ID를 부여합니다
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f59e0b']}>권장 토큰 저장 전략</SectionTitle>
          <div className="sj-rec-box">
            <div className="sj-rec-title">✅ 실무 권장 조합</div>
            <div className="sj-rec-items">
              {[
                ['🎟️', 'Access Token → 메모리(변수)에 저장. XSS로도 접근 어려움. 페이지 새로고침 시 Refresh Token으로 재발급.'],
                ['🔄', 'Refresh Token → HttpOnly + Secure + SameSite=Strict Cookie에 저장. JS 접근 불가 + CSRF 방어.'],
                ['⏱️', 'Access Token은 15분 이내 짧은 만료, Refresh Token은 7~14일.'],
                ['🔁', 'Refresh Token Rotation — 사용할 때마다 새 Refresh Token 발급.'],
                ['📋', 'Refresh Token은 서버 DB에 저장하여 강제 로그아웃 가능하게 유지.'],
              ].map(([icon, text]) => (
                <div key={text} className="sj-rec-item"><span style={{ fontSize:'18px' }}>{icon}</span><span>{text}</span></div>
              ))}
            </div>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f59e0b']}>토큰 갱신 플로우</SectionTitle>
          <div className="sj-refresh-box">
            <div className="sj-refresh-diagram">
              <div className="sj-refresh-peer">
                <div className="sj-refresh-icon" style={{ background:'rgba(59,130,246,.1)', borderColor:'#3b82f6' }}>🌐</div>
                <div className="sj-refresh-name" style={{ color:'#3b82f6' }}>CLIENT</div>
              </div>
              <div className="sj-refresh-mid">
                {refreshSteps.map((s, i) => (
                  <div key={i} className={`sj-refresh-arrow ${s.dir} ${refreshStep >= i + 1 ? 'show' : ''}`}>
                    <span className="sj-refresh-flag" style={{ background:`${s.color}18`, border:`1px solid ${s.color}`, color:s.color }}>{s.flag}</span>
                    <div className="sj-refresh-line" style={{ background:s.color }} />
                    <span className="sj-refresh-tip" style={{ color:s.color }}>{s.dir === 'right' ? '\u2192' : '\u2190'}</span>
                  </div>
                ))}
              </div>
              <div className="sj-refresh-peer">
                <div className="sj-refresh-icon" style={{ background:'rgba(34,197,94,.1)', borderColor:'#22c55e' }}>🖧</div>
                <div className="sj-refresh-name" style={{ color:'#22c55e' }}>SERVER</div>
              </div>
            </div>
            <AnimationControls
              color="#3b82f6"
              status={refreshStatus}
              onPlay={playRefresh}
              onReset={resetRefresh}
            />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '\u2460', text: 'Client \u2192 Server: GET /api/data \u2014 만료된 Access Token으로 API 요청', color: '#3b82f6' },
                  { num: '\u2461', text: 'Server \u2192 Client: 401 Unauthorized \u2014 서버가 토큰 만료를 감지하고 거부', color: '#ef4444' },
                  { num: '\u2462', text: 'Client \u2192 Server: POST /auth/refresh \u2014 Refresh Token을 서버에 전송하여 갱신 요청', color: '#f59e0b' },
                  { num: '\u2463', text: 'Server \u2192 Client: New AT + RT 발급 \u2014 새 Access Token과 Refresh Token 발급 (Rotation)', color: '#22c55e' },
                  { num: '\u2464', text: 'Client \u2192 Server: GET /api/data (재시도) \u2014 새 Access Token으로 원래 요청을 재시도', color: '#a855f7' },
                  { num: '\u2465', text: 'Server \u2192 Client: 200 OK \u2014 서버가 정상 응답 반환', color: '#06b6d4' },
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

        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f59e0b']}>저장소별 보안 비교 요약</SectionTitle>
          <div style={{ overflowX:'auto', borderRadius:'14px', border:'1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>항목</th>
                  <th style={{ color:'#22c55e' }}>HttpOnly Cookie</th>
                  <th style={{ color:'#3b82f6' }}>LocalStorage</th>
                  <th style={{ color:'#a855f7' }}>메모리 (변수)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['XSS 방어','✅ 안전 (JS 접근 불가)','❌ 취약','✅ 안전 (접근 어려움)'],
                  ['CSRF 방어','⚠️ SameSite 필요','✅ 자동 전송 없음','✅ 자동 전송 없음'],
                  ['새로고침 유지','✅ 유지','✅ 유지','❌ 소멸 (재발급 필요)'],
                  ['서버 간 공유','✅ 자동 전송','❌ 수동','❌ 수동'],
                  ['탈취 시 영향','세션 하이재킹','토큰 도용','탈취 자체가 어려움'],
                ].map(([label, ...vals]) => (
                  <tr key={label}>
                    <td style={{ color:'#5a6a85', fontWeight:600 }}>{label}</td>
                    {vals.map((v, i) => (
                      <td key={i} style={{ color: v.startsWith('✅') ? '#22c55e' : v.startsWith('❌') ? '#ef4444' : '#f59e0b' }}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#f59e0b']}>자주 나오는 면접 질문</SectionTitle>
          <InterviewQuestions color="#3b82f6" items={[
            { q: '세션 기반 인증에서 Scale-Out 문제를 해결하는 방법은?', a: '세 가지 방법이 있습니다. Sticky Session은 로드밸런서가 같은 서버로 라우팅하지만 서버 장애 시 세션 유실됩니다. Session Clustering은 서버 간 세션을 복제하지만 동기화 오버헤드가 있습니다. 외부 세션 저장소(Redis, Memcached)를 사용하면 모든 서버가 공유 저장소에 접근하여 가장 일반적인 해결책입니다.' },
            { q: 'XSS와 CSRF 공격을 동시에 방어하는 최적의 토큰 저장 전략은?', a: 'Access Token은 메모리(JavaScript 변수)에 저장하고, Refresh Token은 HttpOnly + Secure + SameSite=Strict Cookie에 저장합니다. 메모리 저장은 XSS로 접근이 어렵고, HttpOnly Cookie는 JavaScript 접근을 차단합니다. SameSite=Strict는 CSRF를 방지합니다. 페이지 새로고침 시에는 Refresh Token으로 Access Token을 재발급합니다.' },
            { q: 'Refresh Token Rotation의 동작 원리와 필요성은?', a: 'Refresh Token 사용 시 기존 토큰을 폐기하고 새 Refresh Token을 발급합니다. 만약 이미 사용된(폐기된) Refresh Token이 다시 사용되면, 토큰이 탈취되었다고 판단하여 해당 사용자의 모든 Refresh Token을 무효화합니다. 이를 통해 탈취된 Refresh Token의 남용을 탐지하고 차단할 수 있습니다.' },
            { q: 'SameSite Cookie의 Strict, Lax, None 차이를 설명해주세요.', a: 'Strict는 모든 크로스 사이트 요청에서 쿠키를 전송하지 않아 가장 강력한 CSRF 방어를 제공하지만, 외부 링크로 사이트에 접근할 때 로그인이 풀리는 불편함이 있습니다. Lax는 GET 등 안전한 Top-level Navigation에서만 쿠키를 허용하며 Chrome 80부터 기본값입니다. POST, iframe, AJAX에는 쿠키를 전송하지 않아 대부분의 CSRF를 방어합니다. None은 모든 요청에 쿠키를 전송하며, 반드시 Secure 속성과 함께 사용해야 합니다. OAuth 콜백이나 결제 연동 등 서드파티 쿠키가 필요한 경우에만 사용합니다.' },
            { q: 'Session Fixation 공격이란 무엇이고 어떻게 방어하나요?', a: 'Session Fixation은 공격자가 미리 알고 있는 세션 ID를 피해자에게 강제로 설정하여, 피해자가 로그인하면 공격자가 같은 세션 ID로 인증된 세션에 접근하는 공격입니다. 방어 방법의 핵심은 로그인 성공 시 기존 세션을 무효화하고 새로운 세션 ID를 발급하는 것입니다. Java에서는 session.invalidate() 후 새 세션을 생성하며, Spring Security는 기본적으로 sessionFixation().migrateSession()으로 이를 처리합니다. 추가로 URL 파라미터를 통한 세션 ID 전달을 비활성화하고, Cookie 기반 세션만 사용하도록 설정해야 합니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

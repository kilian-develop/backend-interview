import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.jw-struct-box { background:#0e1118; border:1px solid #1a2234; border-radius:18px; padding:28px; overflow:hidden; }
.jw-token-display { font-family:'JetBrains Mono',monospace; font-size:13px; line-height:1.8; word-break:break-all; padding:16px; background:rgba(0,0,0,.3); border-radius:10px; margin-bottom:20px; }
.jw-parts { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
@media(max-width:640px){ .jw-parts{ grid-template-columns:1fr; } }
.jw-part { border-radius:14px; padding:20px; cursor:pointer; transition:transform .2s, box-shadow .2s; }
.jw-part:hover { transform:translateY(-3px); }
.jw-part-title { font-size:15px; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:8px; }
.jw-part-sub { font-size:11px; font-family:'JetBrains Mono',monospace; margin-bottom:12px; }
.jw-part-code { font-family:'JetBrains Mono',monospace; font-size:11px; background:rgba(0,0,0,.3); border-radius:8px; padding:12px; line-height:1.8; overflow-x:auto; }
.jw-flow-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.jw-flow-steps { display:flex; flex-direction:column; gap:12px; }
.jw-flow-step { display:flex; align-items:flex-start; gap:14px; padding:14px; background:rgba(255,255,255,.02); border-radius:10px; }
.jw-flow-num { flex-shrink:0; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.jw-flow-content h5 { font-size:13px; font-weight:700; margin-bottom:4px; }
.jw-flow-content p { font-size:12px; color:#5a6a85; line-height:1.7; }
.jw-vuln-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.jw-vuln { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.jw-vuln:hover { transform:translateY(-3px); }
.jw-vuln-icon { font-size:26px; margin-bottom:10px; }
.jw-vuln-title { font-size:14px; font-weight:700; margin-bottom:8px; }
.jw-vuln-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.jw-vuln-fix { margin-top:10px; font-size:12px; padding:8px 12px; border-radius:8px; line-height:1.6; }
.jw-compare { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .jw-compare{ grid-template-columns:1fr; } }
.jw-cmp-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.jw-cmp-card h4 { font-size:14px; font-weight:700; margin-bottom:12px; }
.jw-cmp-list { display:flex; flex-direction:column; gap:8px; }
.jw-cmp-item { font-size:12px; color:#94a3b8; padding:8px 12px; background:rgba(255,255,255,.02); border-radius:6px; line-height:1.6; }
.jw-decode-box { background:#0e1118; border:1px solid #1a2234; border-radius:18px; padding:28px; overflow:hidden; }
.jw-decode-token { font-family:'JetBrains Mono',monospace; font-size:12px; line-height:1.8; word-break:break-all; padding:16px; background:rgba(0,0,0,.3); border-radius:10px; margin-bottom:20px; cursor:default; }
.jw-decode-token span { transition:opacity .2s, text-shadow .2s; padding:2px 0; }
.jw-decode-token span.jw-decode-dim { opacity:0.3; }
.jw-decode-toggle { display:flex; align-items:center; justify-content:center; gap:12px; margin-bottom:20px; }
.jw-decode-toggle-btn { font-size:13px; font-weight:700; padding:8px 20px; border-radius:8px; border:1px solid #a855f730; background:transparent; color:#94a3b8; cursor:pointer; transition:all .2s; font-family:'JetBrains Mono',monospace; }
.jw-decode-toggle-btn.active { background:#a855f718; border-color:#a855f7; color:#a855f7; }
.jw-decode-panels { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; }
@media(max-width:640px){ .jw-decode-panels{ grid-template-columns:1fr; } }
.jw-decode-panel { border-radius:14px; padding:18px; transition:transform .2s, box-shadow .2s; }
.jw-decode-panel.jw-decode-highlight { transform:translateY(-3px); }
.jw-decode-panel-title { font-size:14px; font-weight:700; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.jw-decode-panel-content { font-family:'JetBrains Mono',monospace; font-size:11px; background:rgba(0,0,0,.3); border-radius:8px; padding:12px; line-height:1.8; overflow-x:auto; white-space:pre; transition:opacity .3s, transform .3s; }
.jw-decode-panel-content .jw-decode-key { color:#f59e0b; }
.jw-decode-panel-content .jw-decode-str { color:#22c55e; }
.jw-decode-panel-content .jw-decode-num { color:#3b82f6; }
.jw-decode-panel-content .jw-decode-raw { color:#94a3b8; font-size:11px; word-break:break-all; white-space:pre-wrap; }
`

const parts = [
  { title:'Header', color:'#ef4444', sub:'Base64Url 인코딩', code:'{\n  "alg": "HS256",\n  "typ": "JWT"\n}', desc:'토큰 타입과 서명 알고리즘을 지정합니다.' },
  { title:'Payload', color:'#a855f7', sub:'Base64Url 인코딩 (암호화 아님!)', code:'{\n  "sub": "1234567890",\n  "name": "홍길동",\n  "role": "ADMIN",\n  "iat": 1709700000,\n  "exp": 1709703600\n}', desc:'클레임(Claims) — 사용자 정보와 메타데이터를 담습니다.' },
  { title:'Signature', color:'#3b82f6', sub:'서버만 알고 있는 Secret Key로 생성', code:'HMACSHA256(\n  base64Url(header) + "." +\n  base64Url(payload),\n  secret\n)', desc:'헤더와 페이로드가 변조되지 않았음을 검증합니다.' },
]

export default function JwtDeepDive() {
  const [activePart, setActivePart] = useState<number | null>(null)
  const [decodeMode, setDecodeMode] = useState<'decoded' | 'encoded'>('decoded')
  const [hoverPart, setHoverPart] = useState<number | null>(null)
  useInjectCSS('style-jwt-deep-dive', CSS)

  const jwtTokenParts = [
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Iu2Zjeq4uOuPmSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcwOTcwMDAwMCwiZXhwIjoxNzA5NzAzNjAwfQ',
    'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  ]
  const jwtPartColors = ['#ef4444', '#a855f7', '#3b82f6']
  const jwtPartLabels = ['Header', 'Payload', 'Signature']
  const jwtDecodedJson = [
    { alg: 'HS256', typ: 'JWT' },
    { sub: '1234567890', name: '홍길동', role: 'ADMIN', iat: 1709700000, exp: 1709703600 },
    null,
  ]

  const renderJsonSyntax = (obj: Record<string, unknown>) => {
    const entries = Object.entries(obj)
    return (
      <>
        {'{\n'}
        {entries.map(([key, val], i) => {
          const isStr = typeof val === 'string'
          return (
            <span key={key}>
              {'  '}<span className="jw-decode-key">"{key}"</span>: {isStr ? <span className="jw-decode-str">"{String(val)}"</span> : <span className="jw-decode-num">{String(val)}</span>}{i < entries.length - 1 ? ',' : ''}{'\n'}
            </span>
          )
        })}
        {'}'}
      </>
    )
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background:'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(168,85,247,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,158,11,0.05) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position:'relative', zIndex:1 }}>
        <HeroSection
          tag="Auth · JSON Web Token · 면접 필수"
          title={<><span style={{ color:'#a855f7' }}>JWT</span> Deep Dive</>}
          description={<>헤더 · 페이로드 · 서명 3파트 구조, 검증 흐름,<br />보안 취약점과 대응 방법까지 깊이 있게 살펴봅니다.</>}
        />

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>JWT 토큰 구조</SectionTitle>
          <div className="jw-struct-box">
            <div className="jw-token-display">
              <span style={{ color:'#ef4444' }}>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
              <span style={{ color:'#5a6a85' }}>.</span>
              <span style={{ color:'#a855f7' }}>eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Iu2Zjeq4uOuPmSJ9</span>
              <span style={{ color:'#5a6a85' }}>.</span>
              <span style={{ color:'#3b82f6' }}>SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
            </div>
            <div className="jw-parts">
              {parts.map((p, i) => (
                <div key={p.title} className="jw-part"
                  style={{ background:`${p.color}0a`, border:`1px solid ${activePart === i ? p.color : `${p.color}30`}`, boxShadow:activePart === i ? `0 0 20px ${p.color}20` : 'none' }}
                  onClick={() => setActivePart(activePart === i ? null : i)}>
                  <div className="jw-part-title" style={{ color:p.color }}>{['🏷️','📦','🔏'][i]} {p.title}</div>
                  <div className="jw-part-sub" style={{ color:`${p.color}99` }}>{p.sub}</div>
                  <div className="jw-part-code" style={{ color:p.color }}>{p.code}</div>
                  <div style={{ marginTop:'10px', fontSize:'12px', color:'#94a3b8', lineHeight:1.7 }}>{p.desc}</div>
                </div>
              ))}
            </div>
            <HighlightBox color="#a855f7" style={{ marginTop:'20px' }}>
              <strong style={{ color:'#a855f7' }}>주의: Payload는 Base64Url로 인코딩만 된 것이지 암호화된 것이 아닙니다.</strong>
              누구나 디코딩할 수 있으므로 비밀번호, 개인정보 등 민감한 정보를 절대 넣지 마세요.
            </HighlightBox>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>JWT 디코딩 체험</SectionTitle>
          <div className="jw-decode-box">
            <div
              className="jw-decode-token"
              onMouseLeave={() => setHoverPart(null)}
            >
              {jwtTokenParts.map((part, i) => (
                <span key={i}>
                  {i > 0 && <span style={{ color:'#5a6a85' }}>.</span>}
                  <span
                    style={{ color: jwtPartColors[i], textShadow: hoverPart === i ? `0 0 8px ${jwtPartColors[i]}60` : 'none' }}
                    className={hoverPart !== null && hoverPart !== i ? 'jw-decode-dim' : ''}
                    onMouseEnter={() => setHoverPart(i)}
                  >
                    {part}
                  </span>
                </span>
              ))}
            </div>
            <div className="jw-decode-toggle">
              <button
                className={`jw-decode-toggle-btn ${decodeMode === 'decoded' ? 'active' : ''}`}
                onClick={() => setDecodeMode('decoded')}
              >
                디코딩
              </button>
              <span style={{ color:'#5a6a85', fontSize:'14px' }}>↔</span>
              <button
                className={`jw-decode-toggle-btn ${decodeMode === 'encoded' ? 'active' : ''}`}
                onClick={() => setDecodeMode('encoded')}
              >
                인코딩
              </button>
            </div>
            <div className="jw-decode-panels">
              {jwtPartLabels.map((label, i) => (
                <div
                  key={label}
                  className={`jw-decode-panel ${hoverPart === i ? 'jw-decode-highlight' : ''}`}
                  style={{
                    background: `${jwtPartColors[i]}0a`,
                    border: `1px solid ${hoverPart === i ? jwtPartColors[i] : `${jwtPartColors[i]}30`}`,
                    boxShadow: hoverPart === i ? `0 0 20px ${jwtPartColors[i]}20` : 'none',
                  }}
                  onMouseEnter={() => setHoverPart(i)}
                  onMouseLeave={() => setHoverPart(null)}
                >
                  <div className="jw-decode-panel-title" style={{ color: jwtPartColors[i] }}>
                    {label}
                  </div>
                  <div className="jw-decode-panel-content">
                    {decodeMode === 'decoded' ? (
                      jwtDecodedJson[i] ? (
                        renderJsonSyntax(jwtDecodedJson[i] as Record<string, unknown>)
                      ) : (
                        <span style={{ color: jwtPartColors[i] }}>
                          {'HMACSHA256(\n  base64Url(header) + "." +\n  base64Url(payload),\n  secret\n)'}
                        </span>
                      )
                    ) : (
                      <span className="jw-decode-raw">{jwtTokenParts[i]}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <HighlightBox color="#a855f7" style={{ marginTop:'20px' }}>
              <strong style={{ color:'#a855f7' }}>토큰 위에 마우스를 올려보세요.</strong>{' '}
              각 파트(Header/Payload/Signature)에 해당하는 디코딩 결과가 하이라이트됩니다.
              상단 토글로 인코딩/디코딩 뷰를 전환할 수 있습니다.
            </HighlightBox>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>JWT 인증 흐름</SectionTitle>
          <div className="jw-flow-box">
            <div className="jw-flow-steps">
              {[
                { num:'1', title:'로그인 요청', desc:'클라이언트가 아이디/비밀번호로 로그인을 요청합니다.', color:'#3b82f6' },
                { num:'2', title:'토큰 발급', desc:'서버가 인증 확인 후 Access Token(+ Refresh Token)을 발급합니다.', color:'#22c55e' },
                { num:'3', title:'토큰 저장', desc:'클라이언트가 토큰을 저장합니다. (Cookie, LocalStorage 등)', color:'#f59e0b' },
                { num:'4', title:'API 요청', desc:'이후 요청마다 Authorization: Bearer <token> 헤더에 토큰을 포함합니다.', color:'#a855f7' },
                { num:'5', title:'토큰 검증', desc:'서버가 서명을 검증하고, 만료 시간(exp)과 클레임을 확인합니다.', color:'#06b6d4' },
                { num:'6', title:'응답 반환', desc:'검증 성공 시 요청을 처리하고 응답합니다. 실패 시 401 Unauthorized를 반환합니다.', color:'#ef4444' },
              ].map((s) => (
                <div key={s.num} className="jw-flow-step">
                  <div className="jw-flow-num" style={{ background:`${s.color}18`, border:`2px solid ${s.color}`, color:s.color }}>{s.num}</div>
                  <div className="jw-flow-content"><h5 style={{ color:s.color }}>{s.title}</h5><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>Access Token vs Refresh Token</SectionTitle>
          <div className="jw-compare">
            <div className="jw-cmp-card" style={{ borderTop:'2px solid #3b82f6' }}>
              <h4 style={{ color:'#3b82f6' }}>🎟️ Access Token</h4>
              <div className="jw-cmp-list">
                {['짧은 만료 시간 (15분 ~ 1시간)','API 요청 시 인증에 사용','탈취되어도 짧은 시간만 유효','Stateless — 서버에 저장하지 않음','매 요청마다 Authorization 헤더에 포함'].map((t) => <div key={t} className="jw-cmp-item">{t}</div>)}
              </div>
            </div>
            <div className="jw-cmp-card" style={{ borderTop:'2px solid #22c55e' }}>
              <h4 style={{ color:'#22c55e' }}>🔄 Refresh Token</h4>
              <div className="jw-cmp-list">
                {['긴 만료 시간 (7일 ~ 30일)','Access Token 재발급에만 사용','HttpOnly Cookie에 저장 (XSS 방어)','서버 DB에 저장하여 강제 만료 가능','Refresh Token Rotation으로 보안 강화'].map((t) => <div key={t} className="jw-cmp-item">{t}</div>)}
              </div>
            </div>
          </div>
          <HighlightBox color="#a855f7" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#a855f7' }}>Refresh Token Rotation:</strong> Refresh Token 사용 시 기존 토큰을 폐기하고 새 토큰을 발급합니다.
            이미 사용된 Refresh Token이 다시 사용되면 <strong style={{ color:'#a855f7' }}>토큰 탈취로 간주</strong>하고 해당 사용자의 모든 세션을 무효화합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>JWT vs Opaque Token</SectionTitle>
          <div className="jw-compare">
            <div className="jw-cmp-card" style={{ borderTop:'2px solid #a855f7' }}>
              <h4 style={{ color:'#a855f7' }}>JWT (Self-contained Token)</h4>
              <div className="jw-cmp-list">
                {[
                  '토큰 자체에 사용자 정보(클레임)를 포함 — 서버 조회 불필요',
                  'Base64Url 인코딩으로 크기가 상대적으로 큼 (수백 바이트~수 KB)',
                  '서명 기반 검증 — 서버가 Secret Key/공개키로 즉시 검증 가능',
                  '발급 후 즉시 무효화 어려움 (별도 블랙리스트 필요)',
                  'Stateless — 마이크로서비스 간 인증 정보 전달에 적합',
                  '디버깅 용이 — jwt.io 등에서 Payload를 바로 확인 가능',
                ].map((t) => <div key={t} className="jw-cmp-item">{t}</div>)}
              </div>
            </div>
            <div className="jw-cmp-card" style={{ borderTop:'2px solid #f59e0b' }}>
              <h4 style={{ color:'#f59e0b' }}>Opaque Token (불투명 토큰)</h4>
              <div className="jw-cmp-list">
                {[
                  '단순 랜덤 문자열 — 토큰 자체에 정보 없음',
                  '크기가 작음 (보통 32~64바이트의 랜덤 문자열)',
                  '서버 DB/캐시 조회 필수 — 토큰에 매핑된 세션 정보를 검색',
                  '즉시 무효화 가능 — DB에서 삭제하면 바로 효력 상실',
                  'Stateful — 중앙 저장소(Redis 등)에 의존',
                  '보안성 높음 — 토큰에서 사용자 정보를 추출할 수 없음',
                ].map((t) => <div key={t} className="jw-cmp-item">{t}</div>)}
              </div>
            </div>
          </div>
          <HighlightBox color="#a855f7" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#a855f7' }}>선택 기준:</strong> 마이크로서비스처럼 여러 서비스가 토큰을 독립적으로 검증해야 하고 Stateless가 중요하면 <strong style={{ color:'#a855f7' }}>JWT</strong>가 적합합니다.
            단일 서버 환경이거나 토큰 즉시 무효화가 중요한 경우(금융, 결제 등)에는 <strong style={{ color:'#a855f7' }}>Opaque Token</strong>이 더 적합합니다.
            실무에서는 Access Token을 JWT로, Refresh Token을 Opaque Token으로 사용하는 <strong style={{ color:'#a855f7' }}>하이브리드 방식</strong>도 많이 채택합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>보안 취약점과 대응</SectionTitle>
          <div className="jw-vuln-grid">
            {[
              { icon:'🕵️', title:'alg: none 공격', color:'#ef4444', desc:'Header의 alg를 "none"으로 변경하여 서명 검증을 우회하는 공격입니다.', fix:'서버에서 허용할 알고리즘을 명시적으로 지정하고, "none" 알고리즘을 절대 허용하지 마세요.' },
              { icon:'🔑', title:'약한 Secret Key', color:'#f59e0b', desc:'짧거나 예측 가능한 Secret Key는 브루트포스로 탈취될 수 있습니다.', fix:'최소 256비트 이상의 강력한 랜덤 키를 사용하세요. RS256(비대칭키) 사용도 고려하세요.' },
              { icon:'⏰', title:'토큰 만료 미설정', color:'#a855f7', desc:'exp 클레임 없이 발급하면 토큰이 영원히 유효하여 탈취 시 피해가 큽니다.', fix:'반드시 exp(만료), iat(발급시간), nbf(시작시간) 클레임을 설정하세요.' },
              { icon:'📦', title:'민감 정보 포함', color:'#06b6d4', desc:'Payload는 암호화되지 않으므로 비밀번호, 주민번호 등을 넣으면 노출됩니다.', fix:'Payload에는 최소한의 식별 정보(sub, role)만 포함하세요. 민감 정보가 필요하면 JWE(암호화)를 사용하세요.' },
              { icon:'🚫', title:'토큰 즉시 무효화 불가', color:'#ec4899', desc:'JWT는 Stateless이므로 발급 후 만료 전까지 서버에서 강제로 무효화할 수 없습니다. 사용자 계정 탈취, 권한 변경, 강제 로그아웃 시 문제가 됩니다.', fix:'Redis에 무효화할 JWT의 jti(토큰 고유 ID)를 블랙리스트로 저장하세요. TTL을 JWT의 남은 만료 시간으로 설정하면 만료 후 자동 정리됩니다. 매 요청 시 블랙리스트를 조회하여 무효화된 토큰을 거부합니다.' },
            ].map((v) => (
              <div key={v.title} className="jw-vuln" style={{ borderTop:`2px solid ${v.color}` }}>
                <div className="jw-vuln-icon">{v.icon}</div>
                <div className="jw-vuln-title" style={{ color:v.color }}>{v.title}</div>
                <div className="jw-vuln-desc">{v.desc}</div>
                <div className="jw-vuln-fix" style={{ background:`${v.color}08`, border:`1px solid ${v.color}20`, color:`${v.color}cc` }}>✅ {v.fix}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>JWT 표준 클레임 (Registered Claims)</SectionTitle>
          <div style={{ overflowX:'auto', borderRadius:'14px', border:'1px solid #1a2234' }}>
            <table className="doc-table">
              <thead><tr><th>클레임</th><th>전체 이름</th><th>설명</th></tr></thead>
              <tbody>
                {[
                  ['iss','Issuer','토큰 발급자','#3b82f6'],['sub','Subject','토큰 대상 (사용자 ID 등)','#22c55e'],
                  ['aud','Audience','토큰 수신자','#a855f7'],['exp','Expiration','만료 시간 (Unix timestamp)','#ef4444'],
                  ['nbf','Not Before','토큰 활성 시작 시간','#f59e0b'],['iat','Issued At','토큰 발급 시간','#06b6d4'],
                  ['jti','JWT ID','토큰 고유 식별자 (중복 방지)','#ec4899'],
                ].map(([claim, full, desc, color]) => (
                  <tr key={claim}>
                    <td style={{ fontFamily:'JetBrains Mono,monospace', fontWeight:700, color }}>{claim}</td>
                    <td style={{ color:'#94a3b8' }}>{full}</td>
                    <td style={{ color:'#5a6a85' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>자주 나오는 면접 질문</SectionTitle>
          <InterviewQuestions color="#a855f7" items={[
            { q: 'JWT의 장단점을 설명해주세요.', a: '장점: Stateless로 서버 확장성이 좋고, 별도 세션 저장소가 불필요하며, 마이크로서비스 간 인증 정보 전달이 용이합니다. 단점: 토큰 크기가 세션 ID보다 크고, 발급 후 즉시 무효화가 어려우며, Payload가 암호화되지 않아 민감 정보를 담을 수 없습니다. Refresh Token과 블랙리스트로 단점을 보완합니다.' },
            { q: 'JWT에서 HS256과 RS256의 차이와 사용 시나리오는?', a: 'HS256은 대칭키(HMAC)로 발급자와 검증자가 같은 Secret Key를 공유합니다. 단일 서버나 신뢰할 수 있는 내부 시스템에 적합합니다. RS256은 비대칭키(RSA)로 개인키로 서명하고 공개키로 검증합니다. 마이크로서비스처럼 여러 서비스가 토큰을 검증해야 할 때 적합합니다. Secret Key 노출 위험이 없어 더 안전합니다.' },
            { q: 'Access Token이 탈취되면 어떻게 대응하나요?', a: '짧은 만료 시간(15분 이내)으로 피해 범위를 제한합니다. 즉시 대응이 필요하면 토큰 블랙리스트(Redis 등)에 등록하거나, Refresh Token을 무효화하여 새 Access Token 발급을 차단합니다. 근본적으로는 HTTPS 필수 사용, HttpOnly Cookie 저장, Token Binding 등으로 탈취 자체를 방지해야 합니다.' },
            { q: 'JWT와 Opaque Token의 차이점과 선택 기준은?', a: 'JWT는 Self-contained 토큰으로 토큰 자체에 사용자 정보(클레임)를 포함하여 서버 조회 없이 검증 가능합니다. Opaque Token은 단순 랜덤 문자열로 서버 DB/캐시 조회가 필수입니다. JWT는 Stateless 특성이 필요한 마이크로서비스에 적합하고, Opaque Token은 즉시 무효화가 중요한 금융 시스템에 적합합니다. 실무에서는 Access Token을 JWT로, Refresh Token을 Opaque Token으로 사용하는 하이브리드 방식도 많이 활용합니다.' },
            { q: 'JWT를 즉시 무효화해야 할 때 어떻게 구현하나요?', a: 'JWT는 Stateless이므로 기본적으로 즉시 무효화가 불가능합니다. 가장 일반적인 방법은 Redis에 JWT 블랙리스트를 구현하는 것입니다. 무효화할 JWT의 jti(토큰 고유 ID)를 Redis에 저장하고, TTL을 해당 JWT의 남은 만료 시간으로 설정하면 만료 후 자동 정리됩니다. 매 요청 시 블랙리스트를 조회하여 등록된 토큰을 거부합니다. 추가로 Refresh Token을 서버 DB에 저장하여 삭제 시 새 Access Token 발급을 차단하는 방법도 병행합니다. 사용자 전체 로그아웃이 필요하면 사용자별 토큰 버전(token version)을 관리하는 방법도 있습니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

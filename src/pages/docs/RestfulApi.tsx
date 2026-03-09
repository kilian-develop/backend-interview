import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.ra-constraints { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.ra-cst { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.ra-cst:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(245,158,11,0.1); }
.ra-cst-num { font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; display:inline-block; margin-bottom:10px; }
.ra-cst-title { font-size:15px; font-weight:700; margin-bottom:8px; }
.ra-cst-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.ra-method { font-weight:700; padding:3px 8px; border-radius:5px; font-size:11px; }
.ra-good-bad { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .ra-good-bad{ grid-template-columns:1fr; } }
.ra-gb-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.ra-gb-card h4 { font-size:14px; font-weight:700; margin-bottom:14px; }
.ra-gb-list { display:flex; flex-direction:column; gap:8px; }
.ra-gb-item { display:flex; gap:8px; font-size:12px; font-family:'JetBrains Mono',monospace; padding:8px 12px; border-radius:8px; }
.ra-level-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
.ra-level { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; text-align:center; transition:transform .2s; }
.ra-level:hover { transform:translateY(-2px); }
.ra-level-num { font-size:28px; font-weight:900; font-family:'JetBrains Mono',monospace; }
.ra-level-name { font-size:13px; font-weight:700; margin:8px 0 6px; }
.ra-level-desc { font-size:11px; color:#5a6a85; line-height:1.65; }
.ra-ver-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.ra-ver-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.ra-ver-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(245,158,11,0.1); }
.ra-ver-label { font-size:12px; font-weight:700; padding:3px 10px; border-radius:20px; display:inline-block; margin-bottom:10px; }
.ra-ver-title { font-size:15px; font-weight:700; margin-bottom:6px; }
.ra-ver-example { font-family:'JetBrains Mono',monospace; font-size:12px; color:#94a3b8; background:rgba(255,255,255,.03); padding:8px 12px; border-radius:8px; margin-bottom:10px; line-height:1.6; }
.ra-ver-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:12px; }
.ra-ver-tags { display:flex; flex-wrap:wrap; gap:6px; }
.ra-ver-tag { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; }
.ra-pag-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.ra-pag-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.ra-pag-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(245,158,11,0.1); }
.ra-pag-title { font-size:14px; font-weight:700; margin-bottom:6px; }
.ra-pag-example { font-family:'JetBrains Mono',monospace; font-size:11px; color:#94a3b8; background:rgba(255,255,255,.03); padding:6px 10px; border-radius:8px; margin-bottom:10px; }
.ra-pag-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.ra-code-block { background:#0a0d14; border:1px solid #1a2234; border-radius:12px; padding:18px 20px; font-family:'JetBrains Mono',monospace; font-size:12px; color:#94a3b8; line-height:1.7; overflow-x:auto; white-space:pre; margin-top:16px; }
.ra-code-label { font-size:12px; font-weight:700; margin-bottom:10px; display:inline-block; padding:3px 10px; border-radius:20px; }
.ra-resp-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:700px){ .ra-resp-grid{ grid-template-columns:1fr; } }
`

export default function RestfulApi() {
  useInjectCSS('style-restful-api', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background:'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(245,158,11,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(239,68,68,0.04) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position:'relative', zIndex:1 }}>
        <HeroSection
          tag="HTTP · API Design · REST · 면접 필수"
          title={<><span style={{ color:'#f59e0b' }}>RESTful</span> API</>}
          description={<>REST 6가지 제약 조건, 리소스 중심 URI 설계,<br />HTTP 메서드와 상태 코드를 활용한 API 설계 원칙</>}
        />

        {/* REST란 무엇인가 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>REST란?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#f59e0b' }}>REST(Representational State Transfer)</strong>는 2000년 Roy Fielding의 박사 논문에서 제안된
              <strong style={{ color: '#94a3b8' }}> 네트워크 기반 소프트웨어 아키텍처 스타일</strong>입니다.
              프로토콜이나 표준이 아닌, <strong style={{ color: '#f59e0b' }}>웹의 기존 기술(HTTP)을 잘 활용하기 위한 설계 원칙</strong>의 모음입니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px', marginBottom: '20px' }}>
              {[
                { term: 'Resource (자원)', desc: '모든 것은 고유한 URI로 식별되는 자원입니다. 사용자, 주문, 상품 등 서버가 관리하는 모든 것이 자원이 됩니다.', color: '#3b82f6', example: '/users/1, /orders/42' },
                { term: 'Representation (표현)', desc: '자원의 상태를 JSON, XML 등의 형태로 표현합니다. 같은 자원도 요청에 따라 다른 형태로 제공될 수 있습니다.', color: '#22c55e', example: '{ "name": "홍길동" }' },
                { term: 'State Transfer (상태 전이)', desc: 'HTTP 메서드(GET, POST, PUT, DELETE)를 통해 자원의 상태를 변경합니다. 클라이언트가 서버 자원의 상태를 조작하는 것입니다.', color: '#a855f7', example: 'POST /users → 생성' },
              ].map((item) => (
                <div key={item.term} style={{ padding: '16px', borderRadius: '12px', background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.term}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7, marginBottom: '8px' }}>{item.desc}</div>
                  <code style={{ fontSize: '11px', fontFamily: 'JetBrains Mono,monospace', color: '#94a3b8', background: 'rgba(255,255,255,0.03)', padding: '3px 8px', borderRadius: '4px' }}>{item.example}</code>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '2px solid #f59e0b' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#f59e0b', marginBottom: '10px' }}>REST</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.75 }}>
                아키텍처 스타일(설계 원칙)을 의미합니다. 6가지 제약 조건을 정의한 <strong style={{ color: '#94a3b8' }}>이론적 개념</strong>입니다.
              </div>
            </div>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '2px solid #22c55e' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '10px' }}>RESTful</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.75 }}>
                REST 원칙을 잘 준수하여 구현한 <strong style={{ color: '#94a3b8' }}>상태</strong>를 의미합니다. "이 API는 RESTful하다" = REST 제약 조건을 따른다.
              </div>
            </div>
          </div>
          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>핵심:</strong> REST는 HTTP 위에서 자원(URI)을 정의하고, HTTP 메서드로 행위를 표현하며, JSON 등으로 자원의 상태를 주고받는 아키텍처 스타일입니다. 프로토콜이 아니라 <strong style={{ color: '#94a3b8' }}>설계 가이드라인</strong>이므로, 얼마나 잘 지키느냐에 따라 "RESTful한 정도"가 달라집니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>REST 6가지 제약 조건 (Constraints)</SectionTitle>
          <div className="ra-constraints">
            {[
              { num:'01', title:'Client-Server', desc:'클라이언트와 서버의 관심사를 분리합니다. 클라이언트는 UI에, 서버는 데이터 저장/비즈니스 로직에 집중하여 독립적으로 발전할 수 있습니다.', color:'#3b82f6' },
              { num:'02', title:'Stateless', desc:'서버는 클라이언트의 상태를 저장하지 않습니다. 각 요청은 처리에 필요한 모든 정보를 포함해야 합니다. 이로써 서버 확장(Scale-Out)이 용이해집니다.', color:'#22c55e' },
              { num:'03', title:'Cacheable', desc:'응답은 캐시 가능 여부를 명시해야 합니다. 적절한 캐싱은 클라이언트-서버 간 상호작용을 줄여 성능과 확장성을 향상시킵니다.', color:'#a855f7' },
              { num:'04', title:'Uniform Interface', desc:'일관된 인터페이스로 아키텍처를 단순화합니다. 리소스 식별(URI), 표현을 통한 조작, 자기 서술적 메시지, HATEOAS 4가지 원칙을 따릅니다.', color:'#f59e0b' },
              { num:'05', title:'Layered System', desc:'클라이언트는 중간 서버(로드 밸런서, 프록시, 게이트웨이)의 존재를 알 수 없습니다. 각 계층은 자신과 직접 상호작용하는 계층만 알면 됩니다.', color:'#06b6d4' },
              { num:'06', title:'Code on Demand (선택)', desc:'서버가 클라이언트에 실행 가능한 코드(JavaScript 등)를 전송할 수 있습니다. 유일한 선택적 제약 조건입니다.', color:'#64748b' },
            ].map((c) => (
              <div key={c.num} className="ra-cst" style={{ borderTop:`2px solid ${c.color}` }}>
                <span className="ra-cst-num" style={{ background:`${c.color}18`, border:`1px solid ${c.color}40`, color:c.color }}>{c.num}</span>
                <div className="ra-cst-title" style={{ color:c.color }}>{c.title}</div>
                <div className="ra-cst-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>RESTful URI 설계 원칙</SectionTitle>
          <div className="ra-good-bad">
            <div className="ra-gb-card" style={{ borderTop:'2px solid #22c55e' }}>
              <h4 style={{ color:'#22c55e' }}>✅ 좋은 설계</h4>
              <div className="ra-gb-list">
                {[
                  ['GET', '/users', '사용자 목록 조회'],
                  ['GET', '/users/1', '특정 사용자 조회'],
                  ['POST', '/users', '사용자 생성'],
                  ['PUT', '/users/1', '사용자 전체 수정'],
                  ['PATCH', '/users/1', '사용자 부분 수정'],
                  ['DELETE', '/users/1', '사용자 삭제'],
                  ['GET', '/users/1/orders', '사용자의 주문 목록'],
                ].map(([m, uri, desc]) => (
                  <div key={uri+m} className="ra-gb-item" style={{ background:'rgba(34,197,94,.04)' }}>
                    <span style={{ color:'#22c55e', fontWeight:700, width:'52px', flexShrink:0 }}>{m}</span>
                    <span style={{ color:'#94a3b8' }}>{uri}</span>
                    <span style={{ color:'#5a6a85', marginLeft:'auto', fontSize:'11px' }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="ra-gb-card" style={{ borderTop:'2px solid #ef4444' }}>
              <h4 style={{ color:'#ef4444' }}>❌ 나쁜 설계</h4>
              <div className="ra-gb-list">
                {[
                  ['/getUser', '동사 사용 — URI는 명사로'],
                  ['/users/delete/1', 'URI에 행위 포함'],
                  ['/Users/1', '대문자 사용 (소문자 권장)'],
                  ['/user_list', '스네이크 케이스 (하이픈 권장)'],
                  ['/users/1/', '마지막 슬래시 포함'],
                  ['/getOrdersByUserId?id=1', '행위 중심 설계'],
                  ['/api/v1/fetchData', '모호한 리소스명'],
                ].map(([uri, reason]) => (
                  <div key={uri} className="ra-gb-item" style={{ background:'rgba(239,68,68,.04)' }}>
                    <span style={{ color:'#fca5a5', flex:1 }}>{uri}</span>
                    <span style={{ color:'#5a6a85', fontSize:'11px' }}>{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#f59e0b" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#f59e0b' }}>핵심 원칙:</strong> URI는 리소스(명사)를 나타내고, HTTP 메서드(동사)로 행위를 표현합니다.
            <code style={{ background:'rgba(245,158,11,.1)', padding:'2px 6px', borderRadius:'4px', marginLeft:'4px' }}>GET /users</code>는
            "사용자 리소스를 조회한다"로 읽힙니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>Content Negotiation (콘텐츠 협상)</SectionTitle>
          <div style={{ overflowX:'auto', borderRadius:'14px', border:'1px solid #1a2234', marginBottom:'16px' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>요청 헤더 (클라이언트)</th><th>용도</th><th>응답 헤더 (서버)</th><th>예시</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Accept', '원하는 응답 포맷 지정', 'Content-Type', 'application/json, application/xml, text/csv', '#3b82f6'],
                  ['Accept-Language', '선호하는 언어 지정', 'Content-Language', 'ko-KR, en-US, ja-JP', '#22c55e'],
                  ['Accept-Encoding', '지원하는 압축 방식', 'Content-Encoding', 'gzip, br(Brotli), deflate', '#a855f7'],
                  ['Accept-Charset', '선호하는 문자 인코딩', 'Content-Type (charset)', 'utf-8, iso-8859-1', '#f59e0b'],
                ].map(([req, purpose, res, examples, color]) => (
                  <tr key={req}>
                    <td style={{ color, fontFamily:'JetBrains Mono,monospace', fontSize:'12px', fontWeight:700 }}>{req}</td>
                    <td style={{ color:'#94a3b8', fontSize:'12px' }}>{purpose}</td>
                    <td style={{ color, fontFamily:'JetBrains Mono,monospace', fontSize:'12px' }}>{res}</td>
                    <td style={{ color:'#5a6a85', fontFamily:'JetBrains Mono,monospace', fontSize:'11px' }}>{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ra-resp-grid">
            <div>
              <span className="ra-code-label" style={{ background:'rgba(59,130,246,.1)', border:'1px solid rgba(59,130,246,.3)', color:'#3b82f6' }}>요청 예시</span>
              <div className="ra-code-block">{`GET /api/users/1 HTTP/1.1
Accept: application/json
Accept-Language: ko-KR
Accept-Encoding: gzip, br`}</div>
            </div>
            <div>
              <span className="ra-code-label" style={{ background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.3)', color:'#22c55e' }}>응답 예시</span>
              <div className="ra-code-block">{`HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Content-Language: ko-KR
Content-Encoding: gzip
Vary: Accept, Accept-Language, Accept-Encoding`}</div>
            </div>
          </div>
          <HighlightBox color="#3b82f6" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#3b82f6' }}>핵심 개념:</strong> REST에서 같은 리소스를 다양한 표현(representation)으로 제공하는 것이 Content Negotiation입니다. 서버가 요청된 포맷을 지원하지 않으면 <code style={{ background:'rgba(59,130,246,.1)', padding:'2px 6px', borderRadius:'4px' }}>406 Not Acceptable</code>을 반환합니다. Vary 헤더를 설정하여 CDN/프록시 캐시가 올바르게 동작하도록 해야 합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>HTTP 메서드 ↔ CRUD 매핑</SectionTitle>
          <div style={{ overflowX:'auto', borderRadius:'14px', border:'1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>메서드</th><th>CRUD</th><th>URI 예시</th><th>요청 바디</th><th>응답 코드</th><th>멱등성</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['GET','Read','/users, /users/1','없음','200 OK','✓ 멱등','#22c55e'],
                  ['POST','Create','/users','{ name, email }','201 Created','✗ 비멱등','#f59e0b'],
                  ['PUT','Update (전체)','/users/1','{ name, email, age }','200 OK','✓ 멱등','#3b82f6'],
                  ['PATCH','Update (부분)','/users/1','{ name }','200 OK','✗ 비멱등','#a855f7'],
                  ['DELETE','Delete','/users/1','없음','204 No Content','✓ 멱등','#ef4444'],
                ].map(([method, crud, uri, body, code, idem, color]) => (
                  <tr key={method}>
                    <td><span className="ra-method" style={{ background:`${color}18`, border:`1px solid ${color}40`, color }}>{method}</span></td>
                    <td style={{ color:'#94a3b8', fontFamily:'JetBrains Mono,monospace', fontSize:'12px' }}>{crud}</td>
                    <td style={{ color:'#94a3b8', fontFamily:'JetBrains Mono,monospace', fontSize:'12px' }}>{uri}</td>
                    <td style={{ color:'#5a6a85', fontFamily:'JetBrains Mono,monospace', fontSize:'12px' }}>{body}</td>
                    <td style={{ color:'#22c55e', fontFamily:'JetBrains Mono,monospace', fontSize:'12px' }}>{code}</td>
                    <td style={{ color: idem.includes('✓') ? '#22c55e' : '#ef4444', fontFamily:'JetBrains Mono,monospace', fontSize:'12px' }}>{idem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>Richardson 성숙도 모델</SectionTitle>
          <div className="ra-level-grid">
            {[
              { level:'0', name:'The Swamp of POX', desc:'단일 URI에 모든 요청을 POST로 전송. RPC 스타일.', color:'#64748b' },
              { level:'1', name:'Resources', desc:'개별 리소스를 URI로 구분. /users, /orders 등. 하지만 메서드를 구분하지 않음.', color:'#f59e0b' },
              { level:'2', name:'HTTP Verbs', desc:'HTTP 메서드를 적절히 활용. GET/POST/PUT/DELETE로 행위 구분. 대부분의 REST API가 이 수준.', color:'#3b82f6' },
              { level:'3', name:'HATEOAS', desc:'응답에 다음 가능한 행위의 링크를 포함. 완전한 REST. 실무에서 구현은 드묾.', color:'#22c55e' },
            ].map((l) => (
              <div key={l.level} className="ra-level" style={{ borderTop:`3px solid ${l.color}` }}>
                <div className="ra-level-num" style={{ color:l.color }}>L{l.level}</div>
                <div className="ra-level-name" style={{ color:l.color }}>{l.name}</div>
                <div className="ra-level-desc">{l.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'20px' }}>
            <span className="ra-code-label" style={{ background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.3)', color:'#22c55e' }}>Level 3 — HATEOAS 응답 예시</span>
            <div className="ra-code-block">{`{
  "id": 1,
  "name": "홍길동",
  "email": "hong@example.com",
  "status": "active",
  "_links": {
    "self": { "href": "/api/users/1", "method": "GET" },
    "update": { "href": "/api/users/1", "method": "PUT" },
    "delete": { "href": "/api/users/1", "method": "DELETE" },
    "orders": { "href": "/api/users/1/orders", "method": "GET" },
    "deactivate": { "href": "/api/users/1/deactivate", "method": "POST" }
  }
}`}</div>
            <p style={{ fontSize:'12px', color:'#5a6a85', lineHeight:'1.75', marginTop:'10px' }}>
              HATEOAS(Hypermedia As The Engine Of Application State)는 응답에 <code style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'11px', background:'rgba(34,197,94,.1)', color:'#22c55e', padding:'1px 5px', borderRadius:'3px' }}>_links</code> 필드로 클라이언트가 수행할 수 있는 다음 행위를 명시합니다. 클라이언트는 URI를 하드코딩하지 않고 서버가 제공하는 링크를 따라가므로 서버 API 변경에 유연하게 대응할 수 있습니다. 다만 실무에서는 프론트엔드와 백엔드가 긴밀히 협력하는 환경에서 오버엔지니어링으로 여겨지는 경우가 많고, 클라이언트 구현 복잡도가 증가하여 채택률이 낮습니다.
            </p>
          </div>
          <HighlightBox color="#f59e0b" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#f59e0b' }}>면접 포인트:</strong> 대부분의 실무 API는 Level 2 수준입니다. Level 3(HATEOAS)는 이론적으로 완전한 REST이지만,
            프론트엔드와의 계약이 복잡해지고 오버헤드가 커서 실무에서는 잘 적용하지 않습니다. Spring에서는 Spring HATEOAS 라이브러리로 지원하며, HAL(Hypertext Application Language) 형식이 대표적입니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>API 버전 관리 전략</SectionTitle>
          <div className="ra-ver-grid">
            {[
              {
                label:'URI Path', color:'#3b82f6',
                examples:['/api/v1/users', '/api/v2/users'],
                desc:'URL 경로에 버전을 명시하는 방식입니다. 가장 직관적이고 널리 사용됩니다.',
                pros:['직관적이고 명확함', '캐싱이 용이', '브라우저에서 바로 테스트 가능'],
                cons:['URI가 변경됨', '리소스 자체는 같지만 URI가 달라짐'],
              },
              {
                label:'Query Parameter', color:'#22c55e',
                examples:['/api/users?version=1', '/api/users?version=2'],
                desc:'쿼리 파라미터로 버전을 전달하는 방식입니다. URI가 깔끔하고 기본 버전을 지정할 수 있습니다.',
                pros:['URI 경로가 깔끔함', '기본 버전 지정 가능', '선택적 파라미터로 처리 가능'],
                cons:['라우팅 처리가 복잡할 수 있음', '캐싱 키에 쿼리 포함 필요'],
              },
              {
                label:'Header', color:'#a855f7',
                examples:['Accept: application/vnd.api.v1+json', 'Accept: application/vnd.api.v2+json'],
                desc:'HTTP 헤더로 버전을 지정하는 방식입니다. URI 변경 없이 버전을 관리할 수 있지만 구현이 복잡합니다.',
                pros:['URI가 전혀 변경되지 않음', 'REST 원칙에 가장 부합', '콘텐츠 협상 활용 가능'],
                cons:['브라우저 테스트 어려움', '구현 복잡도 높음', '가시성이 낮음'],
              },
            ].map((v) => (
              <div key={v.label} className="ra-ver-card" style={{ borderTop:`2px solid ${v.color}` }}>
                <span className="ra-ver-label" style={{ background:`${v.color}18`, border:`1px solid ${v.color}40`, color:v.color }}>{v.label}</span>
                <div className="ra-ver-example">
                  {v.examples.map((ex, i) => <div key={i}>{ex}</div>)}
                </div>
                <div className="ra-ver-desc">{v.desc}</div>
                <div className="ra-ver-tags">
                  {v.pros.map((p) => (
                    <span key={p} className="ra-ver-tag" style={{ background:'rgba(34,197,94,.08)', border:'1px solid rgba(34,197,94,.25)', color:'#22c55e' }}>{p}</span>
                  ))}
                  {v.cons.map((c) => (
                    <span key={c} className="ra-ver-tag" style={{ background:'rgba(239,68,68,.08)', border:'1px solid rgba(239,68,68,.25)', color:'#ef4444' }}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <HighlightBox color="#f59e0b" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#f59e0b' }}>면접 포인트:</strong> 실무에서는 URI Path 방식이 가장 많이 사용됩니다. 하위 호환성을 유지하면서 점진적으로 새 버전을 배포하고,
            구 버전은 Deprecation 정책에 따라 충분한 유예기간을 두고 폐기하는 전략이 중요합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>API 응답 설계 패턴</SectionTitle>

          <h3 style={{ fontSize:'16px', fontWeight:700, color:'#f59e0b', marginBottom:'14px' }}>Pagination 패턴</h3>
          <div className="ra-pag-grid">
            {[
              {
                title:'Offset 기반', color:'#3b82f6',
                example:'GET /users?page=2&size=10',
                desc:'간단하지만 데이터 변경 시 중복/누락이 발생할 수 있습니다. 큰 OFFSET은 성능이 저하됩니다.',
              },
              {
                title:'Cursor 기반', color:'#22c55e',
                example:'GET /users?cursor=abc123&size=10',
                desc:'마지막 조회 위치를 기반으로 다음 데이터를 가져옵니다. 실시간 데이터에 적합하고 안정적입니다.',
              },
              {
                title:'Keyset 기반', color:'#a855f7',
                example:'GET /users?after_id=100&size=10',
                desc:'정렬 키(ID 등)를 기준으로 조회합니다. 대용량 데이터에 최적이며 DB 인덱스를 효율적으로 활용합니다.',
              },
            ].map((p) => (
              <div key={p.title} className="ra-pag-card" style={{ borderTop:`2px solid ${p.color}` }}>
                <div className="ra-pag-title" style={{ color:p.color }}>{p.title}</div>
                <div className="ra-pag-example">{p.example}</div>
                <div className="ra-pag-desc">{p.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'20px' }}>
            <span className="ra-code-label" style={{ background:'rgba(34,197,94,.1)', border:'1px solid rgba(34,197,94,.3)', color:'#22c55e' }}>Cursor 기반 응답 예시</span>
            <div className="ra-code-block">{`{
  "data": [...],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_next": true,
    "total_count": 1234
  }
}`}</div>
          </div>

          <h3 style={{ fontSize:'16px', fontWeight:700, color:'#06b6d4', marginTop:'32px', marginBottom:'14px' }}>필터링 / 정렬 / 검색 패턴</h3>
          <div className="ra-pag-grid">
            {[
              {
                title:'필터링 (Filtering)', color:'#3b82f6',
                example:'GET /users?status=active&role=admin',
                desc:'쿼리 파라미터로 리소스를 필터링합니다. 여러 조건은 & 로 연결하며, 서버에서 허용된 필터만 처리하고 나머지는 무시하는 것이 안전합니다.',
              },
              {
                title:'정렬 (Sorting)', color:'#22c55e',
                example:'GET /users?sort=created_at:desc,name:asc',
                desc:'sort 파라미터로 정렬 기준과 방향(asc/desc)을 지정합니다. 여러 필드 정렬은 쉼표로 구분합니다. GitHub API 스타일로 sort=created&direction=desc 도 일반적입니다.',
              },
              {
                title:'검색 (Search)', color:'#a855f7',
                example:'GET /users?q=홍길동',
                desc:'전문 검색(Full-text search)에는 q 파라미터가 관례입니다. 특정 필드 검색은 GET /users?name=홍길동 처럼 필터링과 유사하게 처리합니다.',
              },
              {
                title:'필드 선택 (Sparse Fieldsets)', color:'#f59e0b',
                example:'GET /users?fields=id,name,email',
                desc:'클라이언트가 필요한 필드만 응답에 포함하여 네트워크 대역폭을 절약합니다. GraphQL의 필드 선택과 유사한 개념이며, JSON:API 스펙에서 공식 지원합니다.',
              },
            ].map((p) => (
              <div key={p.title} className="ra-pag-card" style={{ borderTop:`2px solid ${p.color}` }}>
                <div className="ra-pag-title" style={{ color:p.color }}>{p.title}</div>
                <div className="ra-pag-example">{p.example}</div>
                <div className="ra-pag-desc">{p.desc}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize:'16px', fontWeight:700, color:'#ef4444', marginTop:'32px', marginBottom:'14px' }}>Error Response 패턴</h3>
          <div className="ra-resp-grid">
            <div>
              <p style={{ fontSize:'12px', color:'#5a6a85', lineHeight:'1.75', marginBottom:'14px' }}>
                일관된 에러 응답 형식은 클라이언트가 에러를 예측 가능하게 처리할 수 있도록 합니다.
                HTTP 상태 코드, 애플리케이션 에러 코드, 사용자 메시지, 필드별 상세 에러를 포함하는 것이 좋습니다.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {[
                  { field:'status', desc:'HTTP 상태 코드', color:'#ef4444' },
                  { field:'code', desc:'애플리케이션 에러 코드', color:'#f59e0b' },
                  { field:'message', desc:'사용자 친화적 메시지', color:'#3b82f6' },
                  { field:'errors[]', desc:'필드별 상세 에러 목록', color:'#a855f7' },
                  { field:'timestamp', desc:'에러 발생 시각', color:'#64748b' },
                ].map((f) => (
                  <div key={f.field} style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'12px' }}>
                    <code style={{ fontFamily:'JetBrains Mono,monospace', color:f.color, background:`${f.color}12`, padding:'2px 8px', borderRadius:'4px', minWidth:'90px' }}>{f.field}</code>
                    <span style={{ color:'#5a6a85' }}>{f.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="ra-code-label" style={{ background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)', color:'#ef4444' }}>표준 에러 응답 예시</span>
              <div className="ra-code-block">{`{
  "status": 400,
  "code": "INVALID_PARAMETER",
  "message": "이메일 형식이 올바르지 않습니다.",
  "errors": [
    {
      "field": "email",
      "value": "invalid",
      "reason": "올바른 이메일 형식이어야 합니다."
    }
  ],
  "timestamp": "2024-03-06T12:00:00Z"
}`}</div>
            </div>
          </div>
          <HighlightBox color="#ef4444" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#ef4444' }}>설계 원칙:</strong> 에러 응답은 클라이언트가 프로그래밍적으로 처리할 수 있는 구조여야 합니다.
            HTTP 상태 코드만으로 부족한 정보를 애플리케이션 에러 코드와 필드별 상세 에러로 보완합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>Rate Limiting (요청 제한)</SectionTitle>
          <div className="ra-resp-grid">
            <div>
              <p style={{ fontSize:'12px', color:'#5a6a85', lineHeight:'1.75', marginBottom:'14px' }}>
                Rate Limiting은 특정 시간 내 허용되는 API 요청 수를 제한하여 서버 과부하와 API 남용을 방지합니다.
                서버는 응답 헤더로 클라이언트에게 현재 제한 상태를 알려줍니다.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {[
                  { field:'X-RateLimit-Limit', desc:'허용된 최대 요청 수', example:'100', color:'#3b82f6' },
                  { field:'X-RateLimit-Remaining', desc:'남은 요청 수', example:'67', color:'#22c55e' },
                  { field:'X-RateLimit-Reset', desc:'제한이 초기화되는 시각 (Unix timestamp)', example:'1709740800', color:'#f59e0b' },
                  { field:'Retry-After', desc:'429 응답 시 재시도까지 대기 시간(초)', example:'30', color:'#ef4444' },
                ].map((f) => (
                  <div key={f.field} style={{ display:'flex', alignItems:'center', gap:'10px', fontSize:'12px' }}>
                    <code style={{ fontFamily:'JetBrains Mono,monospace', color:f.color, background:`${f.color}12`, padding:'2px 8px', borderRadius:'4px', minWidth:'200px' }}>{f.field}: {f.example}</code>
                    <span style={{ color:'#5a6a85' }}>{f.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'16px' }}>
                <div style={{ fontSize:'13px', fontWeight:700, color:'#a855f7', marginBottom:'8px' }}>주요 알고리즘</div>
                <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                  {[
                    { name:'Token Bucket', desc:'일정 속도로 토큰이 충전되며, 요청마다 토큰 1개 소비. 버스트 트래픽 허용. AWS API Gateway에서 사용.', color:'#3b82f6' },
                    { name:'Sliding Window', desc:'고정 윈도우의 경계 문제를 해결. 현재 시점 기준 이전 N초간 요청 수를 카운팅. Redis로 구현 가능.', color:'#22c55e' },
                    { name:'Fixed Window', desc:'고정 시간 윈도우(예: 1분)마다 카운터를 초기화. 구현이 간단하지만 윈도우 경계에서 2배 요청 가능.', color:'#f59e0b' },
                    { name:'Leaky Bucket', desc:'일정 속도로만 요청을 처리하는 큐. 버스트 트래픽을 균일하게 처리. Nginx에서 사용.', color:'#a855f7' },
                  ].map((alg) => (
                    <div key={alg.name} style={{ padding:'8px 12px', background:'rgba(255,255,255,.02)', borderRadius:'6px', borderLeft:`3px solid ${alg.color}` }}>
                      <span style={{ fontSize:'12px', fontWeight:700, color:alg.color }}>{alg.name}</span>
                      <span style={{ fontSize:'11px', color:'#94a3b8', marginLeft:'10px' }}>{alg.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <span className="ra-code-label" style={{ background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.3)', color:'#ef4444' }}>429 Too Many Requests 응답 예시</span>
              <div className="ra-code-block">{`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1709740800
Retry-After: 30

{
  "status": 429,
  "code": "RATE_LIMIT_EXCEEDED",
  "message": "요청 한도를 초과했습니다. 30초 후 재시도해주세요.",
  "timestamp": "2024-03-06T12:00:00Z"
}`}</div>
            </div>
          </div>
          <HighlightBox color="#a855f7" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#a855f7' }}>면접 포인트:</strong> Rate Limiting은 API 남용 방지와 서버 보호를 위해 필수입니다. API Gateway(Kong, AWS API Gateway)에서 중앙 처리하는 것이 일반적이며, 사용자별/IP별/API키별로 차등 제한을 적용할 수 있습니다. 클라이언트는 429 응답 시 Retry-After 헤더를 존중하고 지수 백오프(Exponential Backoff) 전략으로 재시도해야 합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>자주 나오는 면접 질문</SectionTitle>
          <InterviewQuestions
            color="#f59e0b"
            items={[
              { q:'REST와 RESTful의 차이는?', a:'REST는 아키텍처 스타일(제약 조건)이고, RESTful은 REST 원칙을 잘 준수하여 구현한 상태를 의미합니다. "RESTful API"는 REST 제약 조건을 따르는 API입니다.' },
              { q:'PUT과 PATCH의 차이는?', a:'PUT은 리소스를 완전히 대체(전체 수정)하고, PATCH는 일부 필드만 수정(부분 수정)합니다. PUT은 멱등하지만 PATCH는 멱등하지 않을 수 있습니다.' },
              { q:'Stateless의 의미와 장점은?', a:'서버가 클라이언트의 세션 상태를 저장하지 않는다는 의미입니다. 모든 정보는 요청에 포함되어야 하므로, 서버를 수평 확장(Scale-Out)하기 쉽고, 어느 서버가 처리해도 동일한 결과를 보장합니다.' },
              { q:'API 버전 관리는 어떻게 하나요?', a:'URI 경로(/api/v1/users), 쿼리 파라미터(?version=1), 헤더(Accept: application/vnd.api.v1+json) 세 가지 방식이 있습니다. URI 경로 방식이 가장 직관적이고 널리 사용됩니다. 하위 호환성을 유지하면서 점진적으로 새 버전을 배포하고, 구 버전은 Deprecation 정책에 따라 충분한 유예기간 후 폐기합니다.' },
              { q:'Offset 기반과 Cursor 기반 페이지네이션의 차이는?', a:'Offset 방식은 OFFSET/LIMIT으로 구현이 간단하지만, 데이터 삽입/삭제 시 중복이나 누락이 발생하고 큰 OFFSET은 성능이 저하됩니다. Cursor 방식은 마지막 조회 위치를 기반으로 다음 데이터를 가져와 데이터 변경에 안정적이고 성능도 일정합니다. 실시간 피드나 대용량 데이터에는 Cursor 방식이 적합합니다.' },
              { q:'REST API에서 Rate Limiting은 왜 필요하고 어떻게 구현하나요?', a:'Rate Limiting은 DDoS 공격, 크롤링, 버그로 인한 대량 요청 등으로부터 서버를 보호하고 모든 사용자에게 공정한 리소스를 제공하기 위해 필요합니다. 구현 방식으로는 Token Bucket(버스트 허용), Sliding Window(경계 문제 해결), Leaky Bucket(균일한 처리) 등의 알고리즘이 있습니다. 실무에서는 API Gateway(Kong, AWS API Gateway)에서 중앙 관리하며, Redis를 활용한 분산 카운팅으로 구현합니다. 429 상태 코드와 X-RateLimit-* 헤더, Retry-After 헤더로 클라이언트에 제한 상태를 알려줍니다.' },
              { q:'HATEOAS의 개념과 실무에서 잘 사용되지 않는 이유는?', a:'HATEOAS는 응답에 클라이언트가 수행 가능한 다음 행위의 링크를 포함하여, 클라이언트가 URI를 하드코딩하지 않고 서버가 안내하는 링크를 따라가도록 하는 개념입니다. 이론적으로는 서버 API 변경에 클라이언트가 유연하게 대응할 수 있습니다. 하지만 실무에서는 프론트엔드-백엔드가 긴밀히 협력하여 API 스펙을 공유하기 때문에 링크 탐색이 불필요하고, 응답 크기 증가와 클라이언트 구현 복잡도 증가, 하이퍼미디어 파싱 오버헤드 등의 이유로 채택률이 낮습니다. Spring에서는 Spring HATEOAS로 지원하며, HAL 형식이 대표적입니다.' },
              { q:'REST API에서 필터링과 검색을 설계하는 방법은?', a:'필터링은 쿼리 파라미터로 처리합니다(GET /users?status=active&role=admin). 정렬은 sort 파라미터에 필드와 방향을 지정합니다(sort=created_at:desc). 전문 검색은 q 파라미터를 관례적으로 사용합니다(GET /users?q=홍길동). 필드 선택(Sparse Fieldsets)은 fields 파라미터로 필요한 필드만 응답에 포함하여 대역폭을 절약합니다. 복잡한 필터가 필요하면 POST /users/search 같은 검색 전용 엔드포인트를 별도로 두기도 합니다. 이런 패턴들을 조합하면 GET /users?status=active&sort=name:asc&fields=id,name&page=1&size=20 같은 유연한 API를 설계할 수 있습니다.' },
            ]}
          />
        </div>
      </div>
    </>
  )
}

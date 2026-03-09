import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import AnimationControls from '../../components/doc/AnimationControls'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.dn-flow-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.dn-flow-steps { display:flex; flex-direction:column; gap:0; }
.dn-flow-step { display:flex; align-items:flex-start; gap:16px; padding:14px 0; opacity:0; transform:translateY(8px); transition:opacity .5s ease, transform .5s ease; }
.dn-flow-step.show { opacity:1; transform:translateY(0); }
.dn-flow-num { flex-shrink:0; width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.dn-flow-content { flex:1; }
.dn-flow-title { font-size:14px; font-weight:700; margin-bottom:4px; }
.dn-flow-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.dn-flow-connector { width:2px; height:12px; margin-left:17px; border-radius:2px; }
.dn-servers-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:16px; }
.dn-server { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; text-align:center; transition:transform .2s, box-shadow .2s; }
.dn-server:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(34,197,94,0.1); }
.dn-server-icon { font-size:36px; margin-bottom:10px; }
.dn-server-name { font-size:15px; font-weight:700; margin-bottom:6px; }
.dn-server-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.dn-server-example { font-family:'JetBrains Mono',monospace; font-size:11px; margin-top:8px; padding:6px 10px; background:rgba(0,0,0,.3); border-radius:6px; color:#94a3b8; }
.dn-cache-flow { display:flex; flex-wrap:wrap; gap:12px; align-items:center; justify-content:center; margin-bottom:16px; }
.dn-cache-node { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:16px; text-align:center; min-width:120px; }
.dn-cache-arrow { color:#5a6a85; font-size:22px; }
.dn-query-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .dn-query-grid{ grid-template-columns:1fr; } }
.dn-query { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; }
.dn-query h4 { font-size:15px; font-weight:700; margin-bottom:12px; }
.dn-query-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:14px; }
.dn-query-flow { display:flex; flex-direction:column; gap:6px; }
.dn-qf-item { display:flex; align-items:center; gap:8px; font-size:12px; color:#94a3b8; padding:6px 10px; background:rgba(255,255,255,.02); border-radius:6px; }
.dn-sec-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:640px){ .dn-sec-grid{ grid-template-columns:1fr; } }
.dn-sec-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.dn-sec-card:hover { transform:translateY(-3px); }
.dn-sec-card-header { display:flex; align-items:center; gap:10px; margin-bottom:12px; }
.dn-sec-card-icon { width:42px; height:42px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.dn-sec-card-title { font-size:15px; font-weight:800; }
.dn-sec-card-how { font-size:12px; color:#94a3b8; line-height:1.75; margin-bottom:10px; }
.dn-sec-card-defense { font-size:11px; padding:8px 12px; border-radius:8px; line-height:1.7; }
.dn-sec-chain { display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; margin-top:20px; margin-bottom:16px; }
.dn-sec-chain-node { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:14px 18px; text-align:center; min-width:130px; position:relative; }
.dn-sec-chain-arrow { color:#5a6a85; font-size:18px; display:flex; flex-direction:column; align-items:center; gap:2px; }
.dn-sec-chain-arrow-label { font-size:9px; font-family:'JetBrains Mono',monospace; color:#5a6a85; }
`

const dnsSteps = [
  { num: '1', title: '브라우저 캐시 확인', desc: '이전에 방문한 도메인이면 브라우저 캐시에서 IP를 찾습니다.', color: '#3b82f6' },
  { num: '2', title: 'OS 캐시 (hosts 파일)', desc: '브라우저 캐시에 없으면 OS의 DNS 캐시와 /etc/hosts 파일을 확인합니다.', color: '#a855f7' },
  { num: '3', title: 'Local DNS 서버 (ISP)', desc: 'OS 캐시에도 없으면 ISP의 DNS 서버(재귀 리졸버)에 질의합니다.', color: '#06b6d4' },
  { num: '4', title: 'Root DNS 서버', desc: '재귀 리졸버가 Root 네임서버에 질의 → TLD 서버 주소를 반환합니다. (전 세계 13개 루트 서버)', color: '#22c55e' },
  { num: '5', title: 'TLD DNS 서버', desc: '.com, .kr 등 최상위 도메인 서버에 질의 → 권한 네임서버 주소를 반환합니다.', color: '#f59e0b' },
  { num: '6', title: '권한(Authoritative) DNS 서버', desc: '해당 도메인의 실제 IP 주소를 보유한 서버. 최종 IP를 반환합니다.', color: '#ef4444' },
  { num: '7', title: 'IP 주소 반환 & 캐싱', desc: '찾은 IP를 클라이언트에 반환하고, 각 계층에서 TTL만큼 캐싱합니다.', color: '#ec4899' },
]

export default function Dns() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 DNS 조회 과정을 확인하세요', color: '#5a6a85' })
  useInjectCSS('style-dns', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    dnsSteps.forEach((s, i) => {
      schedule(() => {
        setStep(i + 1)
        setStatus({ msg: `${s.num}/7 ${s.title}`, color: s.color })
      }, 400 + i * 700)
    })
    schedule(() => {
      setStatus({ msg: '✅ DNS 조회 완료! 도메인 → IP 변환이 끝나면 TCP 연결을 시작합니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 400 + dnsSteps.length * 700 + 300)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 DNS 조회 과정을 확인하세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(34,197,94,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.05) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Network · DNS Resolution · 면접 필수"
          title={<><span style={{ color: '#22c55e' }}>DNS</span> 동작 원리</>}
          description={<>도메인 이름을 IP 주소로 변환하는 과정 —<br />재귀/반복 쿼리, 캐싱, Root/TLD/권한 네임서버의 역할</>}
        />

        {/* DNS 조회 흐름 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>DNS 조회 전체 흐름</SectionTitle>
          <div className="dn-flow-box">
            <div className="dn-flow-steps">
              {dnsSteps.map((s, i) => (
                <div key={i}>
                  <div className={`dn-flow-step ${step > i ? 'show' : ''}`}>
                    <div className="dn-flow-num" style={{ background: `${s.color}18`, border: `2px solid ${s.color}`, color: s.color }}>{s.num}</div>
                    <div className="dn-flow-content">
                      <div className="dn-flow-title" style={{ color: s.color }}>{s.title}</div>
                      <div className="dn-flow-desc">{s.desc}</div>
                    </div>
                  </div>
                  {i < dnsSteps.length - 1 && (
                    <div className="dn-flow-connector" style={{ background: step > i ? `${s.color}40` : '#1a2234' }} />
                  )}
                </div>
              ))}
            </div>
            <AnimationControls color="#22c55e" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '브라우저 캐시 확인 — 이전 방문 기록에서 IP 조회', color: '#3b82f6' },
                  { num: '②', text: 'OS 캐시 (hosts 파일) — OS DNS 캐시 및 /etc/hosts 확인', color: '#a855f7' },
                  { num: '③', text: 'Local DNS 서버 (ISP) — Recursive Resolver에 질의', color: '#06b6d4' },
                  { num: '④', text: 'Root DNS 서버 — TLD 서버 주소를 반환 (전 세계 13개)', color: '#22c55e' },
                  { num: '⑤', text: 'TLD DNS 서버 — .com, .kr 등 최상위 도메인에서 권한 서버 주소 반환', color: '#f59e0b' },
                  { num: '⑥', text: '권한(Authoritative) DNS 서버 — 최종 IP 주소 반환', color: '#ef4444' },
                  { num: '⑦', text: 'IP 주소 반환 & 캐싱 — 각 계층에서 TTL만큼 캐싱 후 클라이언트에 전달', color: '#ec4899' },
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

        {/* DNS 서버 종류 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>DNS 서버 계층 구조</SectionTitle>
          <div className="dn-servers-grid">
            {[
              { icon: '🌍', name: 'Root DNS', color: '#22c55e', desc: '전 세계 13개 루트 서버(A~M). TLD 서버 주소를 알려줍니다.', example: '. (루트)' },
              { icon: '🏢', name: 'TLD DNS', color: '#3b82f6', desc: '최상위 도메인(.com, .kr, .org 등)을 관리. 권한 서버 주소를 반환.', example: '.com / .kr / .io' },
              { icon: '🏠', name: 'Authoritative DNS', color: '#a855f7', desc: '실제 도메인의 DNS 레코드를 보유. 최종 IP를 반환합니다.', example: 'ns1.example.com' },
              { icon: '🔄', name: 'Recursive Resolver', color: '#f59e0b', desc: 'ISP가 제공하는 DNS 서버. 클라이언트 대신 계층을 순회하며 조회.', example: '8.8.8.8 (Google)' },
            ].map((s) => (
              <div key={s.name} className="dn-server" style={{ borderTop: `3px solid ${s.color}` }}>
                <div className="dn-server-icon">{s.icon}</div>
                <div className="dn-server-name" style={{ color: s.color }}>{s.name}</div>
                <div className="dn-server-desc">{s.desc}</div>
                <div className="dn-server-example">{s.example}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 재귀 vs 반복 쿼리 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>재귀 쿼리 vs 반복 쿼리</SectionTitle>
          <div className="dn-query-grid">
            <div className="dn-query" style={{ borderTop: '2px solid #22c55e' }}>
              <h4 style={{ color: '#22c55e' }}>재귀 쿼리 (Recursive)</h4>
              <div className="dn-query-desc">
                클라이언트가 Recursive Resolver에 질의하면, 리졸버가 <strong style={{ color: '#86efac' }}>최종 결과를 찾을 때까지</strong> 다른 DNS 서버에 대신 질의합니다.
              </div>
              <div className="dn-query-flow">
                {['클라이언트 → Resolver: "example.com의 IP?"', 'Resolver가 Root → TLD → Auth 순으로 대신 질의', 'Resolver → 클라이언트: "93.184.216.34"'].map((t) => (
                  <div key={t} className="dn-qf-item"><span style={{ color: '#22c55e' }}>→</span>{t}</div>
                ))}
              </div>
            </div>
            <div className="dn-query" style={{ borderTop: '2px solid #f59e0b' }}>
              <h4 style={{ color: '#f59e0b' }}>반복 쿼리 (Iterative)</h4>
              <div className="dn-query-desc">
                각 DNS 서버가 <strong style={{ color: '#fcd34d' }}>자신이 알고 있는 최선의 정보</strong>를 반환합니다. 리졸버가 직접 다음 서버에 질의합니다.
              </div>
              <div className="dn-query-flow">
                {['Resolver → Root: ".com은 여기서 물어봐"', 'Resolver → TLD: "example.com은 여기서 물어봐"', 'Resolver → Auth: "example.com = 93.184.216.34"'].map((t) => (
                  <div key={t} className="dn-qf-item"><span style={{ color: '#f59e0b' }}>→</span>{t}</div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#22c55e' }}>실제로는 혼합 사용:</strong> 클라이언트 → Resolver는 재귀 쿼리, Resolver → 각 DNS 서버 간에는 반복 쿼리를 사용합니다.
          </HighlightBox>
        </div>

        {/* 캐싱 계층 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>DNS 캐싱 계층</SectionTitle>
          <div className="dn-cache-flow">
            {[
              { icon: '🌐', name: '브라우저 캐시', color: '#3b82f6', ttl: '~1분' },
              null,
              { icon: '💻', name: 'OS 캐시', color: '#a855f7', ttl: '~수 분' },
              null,
              { icon: '🔄', name: 'Resolver 캐시', color: '#f59e0b', ttl: 'TTL 기반' },
              null,
              { icon: '🌍', name: 'DNS 서버', color: '#22c55e', ttl: 'TTL 설정값' },
            ].map((item, i) =>
              item === null ? (
                <div key={i} className="dn-cache-arrow">→</div>
              ) : (
                <div key={i} className="dn-cache-node" style={{ borderTop: `2px solid ${item.color}` }}>
                  <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.icon}</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: item.color, marginBottom: '4px' }}>{item.name}</div>
                  <div style={{ fontSize: '10px', color: '#5a6a85', fontFamily: 'JetBrains Mono,monospace' }}>TTL: {item.ttl}</div>
                </div>
              )
            )}
          </div>
          <HighlightBox color="#22c55e">
            <strong style={{ color: '#22c55e' }}>TTL (Time To Live):</strong> DNS 레코드의 캐시 유효 시간입니다. TTL이 길면 성능은 좋지만 IP 변경 시 전파가 느리고,
            짧으면 항상 최신이지만 DNS 서버 부하가 증가합니다.
          </HighlightBox>
        </div>

        {/* DNS 레코드 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>주요 DNS 레코드 타입</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>타입</th><th>이름</th><th>설명</th><th>예시</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['A', 'Address', '도메인 → IPv4 주소', 'example.com → 93.184.216.34', '#22c55e'],
                  ['AAAA', 'IPv6 Address', '도메인 → IPv6 주소', 'example.com → 2606:2800:...', '#3b82f6'],
                  ['CNAME', 'Canonical Name', '도메인 별칭. CDN 연결에 주로 사용 (www → CDN 도메인)', 'www.example.com → d1234.cloudfront.net', '#a855f7'],
                  ['MX', 'Mail Exchange', '메일 서버 지정. priority 값으로 우선순위 설정 (낮을수록 우선, failover 구성 가능)', '10 mail1.example.com, 20 mail2.example.com', '#f59e0b'],
                  ['NS', 'Name Server', '해당 도메인의 네임서버 지정', 'example.com → ns1.dns.com', '#ef4444'],
                  ['TXT', 'Text', '텍스트 정보. SPF/DKIM/DMARC 이메일 인증, 도메인 소유권 확인에 활용', 'v=spf1 include:_spf.google.com ~all', '#06b6d4'],
                  ['SOA', 'Start of Authority', '도메인 관리 정보 (Primary NS, 관리자, 시리얼번호 등)', 'ns1.example.com admin.example.com', '#64748b'],
                ].map(([type, name, desc, example, color]) => (
                  <tr key={type}>
                    <td style={{ fontFamily: 'JetBrains Mono,monospace', fontWeight: 700, color }}>{type}</td>
                    <td style={{ color: '#94a3b8' }}>{name}</td>
                    <td style={{ color: '#5a6a85' }}>{desc}</td>
                    <td style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '11px', color: '#5a6a85' }}>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DNS 보안 위협과 DNSSEC */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>DNS 보안 위협과 DNSSEC</SectionTitle>
          <div className="dn-sec-grid">
            <div className="dn-sec-card" style={{ borderTop: '2px solid #ef4444' }}>
              <div className="dn-sec-card-header">
                <div className="dn-sec-card-icon" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef444440', color: '#ef4444' }}>SP</div>
                <div className="dn-sec-card-title" style={{ color: '#ef4444' }}>DNS Spoofing</div>
              </div>
              <div className="dn-sec-card-how">
                공격자가 DNS 응답을 위조하여 사용자를 가짜 서버로 유도합니다. 사용자는 정상 도메인에 접속했다고 믿지만, 실제로는 공격자의 서버와 통신하게 됩니다.
              </div>
              <div className="dn-sec-card-defense" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid #22c55e20', color: '#86efac' }}>
                <strong style={{ color: '#22c55e' }}>방어:</strong> DNSSEC으로 응답의 디지털 서명을 검증하여 위조 여부를 판별합니다.
              </div>
            </div>
            <div className="dn-sec-card" style={{ borderTop: '2px solid #f59e0b' }}>
              <div className="dn-sec-card-header">
                <div className="dn-sec-card-icon" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid #f59e0b40', color: '#f59e0b' }}>CP</div>
                <div className="dn-sec-card-title" style={{ color: '#f59e0b' }}>DNS Cache Poisoning</div>
              </div>
              <div className="dn-sec-card-how">
                Recursive Resolver의 캐시에 위조된 레코드를 주입합니다. 캐시가 오염되면 해당 리졸버를 사용하는 모든 사용자가 가짜 IP로 연결됩니다.
              </div>
              <div className="dn-sec-card-defense" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid #22c55e20', color: '#86efac' }}>
                <strong style={{ color: '#22c55e' }}>방어:</strong> 소스 포트 랜덤화, DNSSEC 검증, DNS 쿼리 ID 무작위화로 공격 성공률을 낮춥니다.
              </div>
            </div>
            <div className="dn-sec-card" style={{ borderTop: '2px solid #a855f7' }}>
              <div className="dn-sec-card-header">
                <div className="dn-sec-card-icon" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid #a855f740', color: '#a855f7' }}>DA</div>
                <div className="dn-sec-card-title" style={{ color: '#a855f7' }}>DNS Amplification Attack</div>
              </div>
              <div className="dn-sec-card-how">
                공격자가 출발지 IP를 피해자 IP로 위조하여 DNS 서버에 대량의 쿼리를 전송합니다. DNS 응답은 쿼리보다 훨씬 크므로 피해자에게 증폭된 트래픽이 몰립니다 (DDoS).
              </div>
              <div className="dn-sec-card-defense" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid #22c55e20', color: '#86efac' }}>
                <strong style={{ color: '#22c55e' }}>방어:</strong> Response Rate Limiting(RRL), BCP38 소스 IP 검증, Open Resolver 제한으로 대응합니다.
              </div>
            </div>
            <div className="dn-sec-card" style={{ borderTop: '2px solid #06b6d4' }}>
              <div className="dn-sec-card-header">
                <div className="dn-sec-card-icon" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid #06b6d440', color: '#06b6d4' }}>TN</div>
                <div className="dn-sec-card-title" style={{ color: '#06b6d4' }}>DNS Tunneling</div>
              </div>
              <div className="dn-sec-card-how">
                DNS 프로토콜을 통해 데이터를 은밀히 전송하는 기법입니다. DNS 쿼리의 서브도메인에 데이터를 인코딩하여 방화벽을 우회하고, 내부 네트워크에서 데이터를 유출합니다.
              </div>
              <div className="dn-sec-card-defense" style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid #22c55e20', color: '#86efac' }}>
                <strong style={{ color: '#22c55e' }}>방어:</strong> DNS 트래픽 모니터링, 비정상적으로 긴 쿼리 탐지, DNS 방화벽(RPZ) 적용으로 차단합니다.
              </div>
            </div>
          </div>

          {/* DNSSEC 설명 */}
          <HighlightBox color="#22c55e" style={{ marginTop: '20px' }}>
            <strong style={{ color: '#22c55e' }}>DNSSEC (DNS Security Extensions)</strong>은 DNS 응답에 디지털 서명을 추가하여 응답의 출처와 무결성을 검증하는 확장 프로토콜입니다.
            각 DNS 영역(Zone)이 자신의 레코드에 서명하고, 상위 영역이 하위 영역의 공개키를 인증하는 <strong style={{ color: '#22c55e' }}>신뢰 체인(Chain of Trust)</strong>을 형성합니다.
          </HighlightBox>

          {/* DNSSEC 신뢰 체인 */}
          <div className="dn-sec-chain">
            <div className="dn-sec-chain-node" style={{ borderTop: '2px solid #f59e0b', background: 'rgba(245,158,11,0.04)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', marginBottom: '4px' }}>Root Zone (.)</div>
              <div style={{ fontSize: '10px', color: '#5a6a85' }}>Trust Anchor (KSK)</div>
              <div style={{ fontSize: '9px', color: '#3a4a65', fontFamily: 'JetBrains Mono,monospace', marginTop: '4px' }}>DNSKEY + RRSIG</div>
            </div>
            <div className="dn-sec-chain-arrow">
              <span>→</span>
              <span className="dn-sec-chain-arrow-label">DS 레코드로 서명</span>
            </div>
            <div className="dn-sec-chain-node" style={{ borderTop: '2px solid #3b82f6', background: 'rgba(59,130,246,0.04)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', marginBottom: '4px' }}>TLD Zone (.com)</div>
              <div style={{ fontSize: '10px', color: '#5a6a85' }}>Zone Signing Key</div>
              <div style={{ fontSize: '9px', color: '#3a4a65', fontFamily: 'JetBrains Mono,monospace', marginTop: '4px' }}>DNSKEY + RRSIG + DS</div>
            </div>
            <div className="dn-sec-chain-arrow">
              <span>→</span>
              <span className="dn-sec-chain-arrow-label">DS 레코드로 서명</span>
            </div>
            <div className="dn-sec-chain-node" style={{ borderTop: '2px solid #22c55e', background: 'rgba(34,197,94,0.04)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', marginBottom: '4px' }}>Domain (example.com)</div>
              <div style={{ fontSize: '10px', color: '#5a6a85' }}>레코드에 서명</div>
              <div style={{ fontSize: '9px', color: '#3a4a65', fontFamily: 'JetBrains Mono,monospace', marginTop: '4px' }}>A/AAAA + RRSIG</div>
            </div>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>자주 나오는 면접 질문</SectionTitle>
          <InterviewQuestions color="#22c55e" items={[
            { q: 'DNS가 주로 UDP를 사용하는 이유는?', a: 'DNS 질의/응답은 대부분 작은 패킷(512바이트 이내)이므로 TCP의 3-way handshake 오버헤드가 불필요합니다. 빠른 응답이 중요하기 때문에 UDP를 사용합니다. 단, 응답이 512바이트를 초과하거나 Zone Transfer 시에는 TCP를 사용합니다.' },
            { q: 'CNAME과 A 레코드의 차이는?', a: 'A 레코드는 도메인을 직접 IP 주소에 매핑하고, CNAME은 다른 도메인 이름을 가리키는 별칭입니다. CNAME은 한 번 더 조회가 필요하지만, IP 변경 시 원본만 수정하면 되어 관리가 편합니다.' },
            { q: 'DNS 캐시 포이즈닝(Cache Poisoning)이란?', a: '공격자가 위조된 DNS 응답을 캐시 서버에 주입하여, 사용자를 가짜 사이트로 유도하는 공격입니다. DNSSEC(DNS Security Extensions)으로 응답의 무결성을 검증하여 방어할 수 있습니다.' },
            { q: 'DNS Round Robin이란 무엇이고 한계점은?', a: '하나의 도메인에 여러 IP를 A 레코드로 등록하여 요청마다 다른 IP를 반환하는 로드 밸런싱 기법입니다. 구현이 간단하지만, 서버 상태(장애, 부하)를 고려하지 않고 균등 분배만 하므로 장애 서버로도 트래픽이 전달될 수 있습니다. 헬스 체크가 불가하여 실무에서는 L4/L7 로드 밸런서를 함께 사용합니다.' },
            { q: 'DNS over HTTPS(DoH)와 DNS over TLS(DoT)의 차이는?', a: '둘 다 DNS 조회를 암호화하여 프라이버시를 보호합니다. DoT는 전용 포트(853)를 사용하여 네트워크 관리자가 DNS 트래픽을 식별/차단할 수 있습니다. DoH는 HTTPS 포트(443)를 사용하여 일반 웹 트래픽과 구분이 어려워 검열 우회에 유리하지만, 네트워크 관리 측면에서는 불리할 수 있습니다.' },
            { q: 'DNS TTL을 너무 짧게 설정하면 어떤 문제가 있나요?', a: 'TTL이 짧으면 캐시가 빨리 만료되어 DNS 서버에 질의가 빈번하게 발생합니다. 이로 인해: (1) DNS 서버의 부하가 증가합니다. (2) 매 요청마다 DNS 조회가 필요하여 웹 페이지 로딩 시간이 늘어납니다. (3) DNS 서버 장애 시 캐시된 레코드가 빨리 소진되어 영향 범위가 커집니다. 반대로 TTL이 너무 길면 IP 변경이나 장애 시 DNS Failover가 느려집니다. 실무에서는 평상시 300~3600초를 사용하고, 마이그레이션 전에 TTL을 60초 등으로 낮추어 전환을 준비합니다.' },
            { q: '서브도메인과 CNAME의 관계, 그리고 CNAME을 루트 도메인에 사용할 수 없는 이유는?', a: 'CNAME은 도메인을 다른 도메인의 별칭으로 설정하는 레코드입니다. www.example.com 같은 서브도메인에는 자유롭게 사용할 수 있지만, 루트 도메인(example.com, Zone Apex)에는 RFC 규약상 CNAME을 설정할 수 없습니다. CNAME이 설정된 이름에는 다른 레코드(MX, NS, SOA 등)가 공존할 수 없는데, 루트 도메인에는 반드시 SOA와 NS 레코드가 존재해야 하므로 충돌합니다. 이 제약을 우회하기 위해 Route 53의 ALIAS 레코드, Cloudflare의 CNAME Flattening 같은 비표준 확장이 사용됩니다. 이들은 DNS 서버가 내부적으로 CNAME을 해석하여 A 레코드처럼 IP를 직접 반환합니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

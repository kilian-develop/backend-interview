import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.nat-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:48px; }
@media(max-width:640px){ .nat-compare-grid{ grid-template-columns:1fr; } }
.nat-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.nat-card:hover { transform:translateY(-4px); }
.nat-card-pub { border-top:3px solid #3b82f6; box-shadow:0 0 40px rgba(59,130,246,0.2); }
.nat-card-priv { border-top:3px solid #22c55e; box-shadow:0 0 40px rgba(34,197,94,0.2); }
.nat-card-title { font-size:22px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.nat-card-sub { font-size:12px; color:#5a6a85; margin-bottom:22px; font-family:'JetBrains Mono',monospace; }
.nat-prop-list { display:flex; flex-direction:column; gap:10px; }
.nat-prop-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.025); border-radius:8px; font-size:13px; gap:12px; }
.nat-prop-label { color:#5a6a85; font-size:12px; white-space:nowrap; }
.nat-prop-val { font-weight:700; font-size:13px; text-align:right; }
.nat-good { color:#22c55e; } .nat-bad { color:#ef4444; } .nat-neutral { color:#94a3b8; } .nat-blue { color:#3b82f6; }
.nat-range-table { width:100%; border-collapse:separate; border-spacing:0; }
.nat-range-table th, .nat-range-table td { padding:12px 16px; text-align:left; border-bottom:1px solid #1a2234; font-size:13px; }
.nat-range-table th { background:rgba(34,197,94,0.06); color:#22c55e; font-size:12px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.nat-range-table td { color:#94a3b8; }
.nat-range-table tr:last-child td { border-bottom:none; }
.nat-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.nat-anim-arena { display:flex; align-items:center; justify-content:space-between; gap:8px; min-height:200px; position:relative; overflow-x:auto; padding:16px 0; }
.nat-anim-node { flex:0 0 90px; display:flex; flex-direction:column; align-items:center; gap:8px; }
.nat-anim-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; border:2px solid #1a2234; }
.nat-anim-label { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; }
.nat-anim-ip { font-size:9px; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; margin-top:-4px; padding:3px 8px; border-radius:4px; background:rgba(255,255,255,0.03); }
.nat-anim-mid { flex:1; display:flex; flex-direction:column; gap:10px; min-width:80px; }
.nat-anim-arrow { display:flex; align-items:center; gap:8px; opacity:0; transform:translateX(-10px); transition:all .5s ease; }
.nat-anim-arrow.right { flex-direction:row; }
.nat-anim-arrow.left { flex-direction:row-reverse; transform:translateX(10px); }
.nat-anim-arrow.show { opacity:1; transform:translateX(0); }
.nat-anim-line { flex:1; height:2px; }
.nat-anim-tip { font-size:9px; font-weight:700; font-family:'JetBrains Mono',monospace; white-space:nowrap; padding:3px 8px; border-radius:4px; }
.nat-anim-arr-head { font-size:16px; line-height:1; }
.nat-type-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; }
.nat-type-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.nat-type-card:hover { transform:translateY(-3px); }
.nat-type-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:12px; }
.nat-type-title { font-size:16px; font-weight:800; margin-bottom:8px; }
.nat-type-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:14px; }
.nat-type-example { font-size:11px; font-family:'JetBrains Mono',monospace; padding:10px 14px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); line-height:1.8; }
.nat-table-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:20px; margin-bottom:16px; }
.nat-table-title { font-size:13px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.nat-cidr-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
.nat-cidr-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; }
.nat-cidr-mask { font-size:20px; font-weight:900; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.nat-cidr-info { font-size:12px; color:#5a6a85; line-height:1.7; }
.nat-cidr-info strong { color:#94a3b8; }
.nat-usecase-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.nat-usecase { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; transition:transform .2s; }
.nat-usecase:hover { transform:translateY(-3px); }
.nat-usecase-icon { font-size:28px; margin-bottom:8px; }
.nat-usecase-name { font-size:14px; font-weight:700; margin-bottom:6px; }
.nat-usecase-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
`

export default function NatIp() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 NAT 변환 과정을 확인해보세요', color: '#5a6a85' })
  useInjectCSS('style-nat-ip', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① PC(192.168.1.10:54321) → NAT 라우터로 패킷 전송', color: '#22c55e' },
      { s: 2, delay: 1400, msg: '② NAT 테이블에 매핑 기록: 사설IP:포트 ↔ 공인IP:포트', color: '#f59e0b' },
      { s: 3, delay: 2400, msg: '③ 출발지를 공인IP(203.0.113.1:10001)로 변환하여 서버로 전송', color: '#3b82f6' },
      { s: 4, delay: 3400, msg: '④ 서버가 공인IP로 응답 → NAT가 테이블 참조하여 사설IP로 복원', color: '#a855f7' },
      { s: 5, delay: 4400, msg: '⑤ 원래 PC(192.168.1.10:54321)로 응답 전달 완료', color: '#22c55e' },
    ]
    timeline.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: 'NAT 변환 완료! 사설 네트워크의 PC가 인터넷과 통신할 수 있게 됩니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 5400)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 NAT 변환 과정을 확인해보세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(34,197,94,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Network Address Translation · IP Address · 면접 필수"
          title={<><span style={{ color: '#22c55e' }}>NAT</span> & <span style={{ color: '#3b82f6' }}>공인IP / 사설IP</span></>}
          description={<>IPv4 주소 부족 문제를 해결하는 NAT의 동작 원리와<br />공인IP·사설IP의 차이, 서브넷팅까지</>}
        />

        {/* 공인IP vs 사설IP 비교 카드 */}
        <div className="nat-compare-grid">
          <div className="nat-card nat-card-pub">
            <div className="nat-card-title" style={{ color: '#3b82f6' }}>
              공인 IP (Public IP)
            </div>
            <div className="nat-card-sub">인터넷에서 직접 접근 가능한 고유 주소</div>
            <div className="nat-prop-list">
              {[
                ['할당 주체', 'ISP / IANA', 'blue'],
                ['유일성', '전 세계에서 유일', 'blue'],
                ['인터넷 접근', '직접 가능', 'good'],
                ['비용', '유료 (ISP 임대)', 'bad'],
                ['수량', '약 43억 개 (IPv4 한계)', 'bad'],
                ['예시', '203.0.113.1', 'neutral'],
              ].map(([label, val, type]) => (
                <div key={label} className="nat-prop-row">
                  <span className="nat-prop-label">{label}</span>
                  <span className={`nat-prop-val nat-${type}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="nat-card nat-card-priv">
            <div className="nat-card-title" style={{ color: '#22c55e' }}>
              사설 IP (Private IP)
            </div>
            <div className="nat-card-sub">내부 네트워크에서만 사용하는 주소</div>
            <div className="nat-prop-list">
              {[
                ['할당 주체', '라우터(DHCP) / 관리자', 'good'],
                ['유일성', '같은 네트워크 내에서만 유일', 'neutral'],
                ['인터넷 접근', 'NAT 필요', 'bad'],
                ['비용', '무료 (자유롭게 사용)', 'good'],
                ['수량', '네트워크마다 재사용 가능', 'good'],
                ['예시', '192.168.0.1', 'neutral'],
              ].map(([label, val, type]) => (
                <div key={label} className="nat-prop-row">
                  <span className="nat-prop-label">{label}</span>
                  <span className={`nat-prop-val nat-${type}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 사설 IP 대역 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>사설 IP 주소 대역 (RFC 1918)</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
            IANA가 <strong style={{ color: '#22c55e' }}>내부 네트워크 전용</strong>으로 예약한 IP 대역입니다. 이 범위의 IP는 인터넷 라우터가 전달하지 않으므로, 외부와 통신하려면 NAT가 필요합니다.
          </div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="nat-range-table">
              <thead>
                <tr>
                  <th>클래스</th>
                  <th>IP 대역</th>
                  <th>CIDR</th>
                  <th>호스트 수</th>
                  <th>주 용도</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Class A', '10.0.0.0 ~ 10.255.255.255', '10.0.0.0/8', '약 1,677만 개', '대기업, 클라우드(AWS VPC 등)'],
                  ['Class B', '172.16.0.0 ~ 172.31.255.255', '172.16.0.0/12', '약 104만 개', '중규모 네트워크'],
                  ['Class C', '192.168.0.0 ~ 192.168.255.255', '192.168.0.0/16', '약 65,000개', '가정, 소규모 사무실'],
                ].map(([cls, range, cidr, count, usage]) => (
                  <tr key={cls}>
                    <td style={{ color: '#22c55e', fontWeight: 700 }}>{cls}</td>
                    <td style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '12px' }}>{range}</td>
                    <td style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: '12px', color: '#22c55e' }}>{cidr}</td>
                    <td>{count}</td>
                    <td style={{ color: '#5a6a85' }}>{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: '12px', fontSize: '12px', color: '#5a6a85', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: '8px', padding: '12px 16px', lineHeight: 1.7 }}>
            <strong style={{ color: '#22c55e' }}>127.0.0.0/8</strong>은 루프백(Loopback) 주소 대역으로, <strong style={{ color: '#94a3b8' }}>127.0.0.1 = localhost</strong>입니다. 자기 자신과 통신할 때 사용합니다.
          </div>
        </div>

        {/* NAT 개요 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>NAT (Network Address Translation)</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              NAT는 <strong style={{ color: '#f59e0b' }}>사설 IP와 공인 IP를 상호 변환</strong>하는 기술입니다.
              IPv4 주소는 약 43억 개로 한정되어 있는데, 전 세계 기기 수가 이를 훨씬 초과하기 때문에 NAT가 필수적입니다.
              하나의 공인 IP를 여러 기기가 공유할 수 있게 해줍니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '12px' }}>
              {[
                { icon: '🔢', title: 'IP 주소 절약', desc: '여러 내부 기기가 하나의 공인 IP를 공유하여 IPv4 고갈 문제를 완화합니다.', color: '#3b82f6' },
                { icon: '🛡️', title: '보안 강화', desc: '내부 네트워크 구조를 외부에 숨겨 직접 접근을 차단합니다.', color: '#22c55e' },
                { icon: '🔄', title: '유연한 네트워크', desc: 'ISP 변경 시 내부 IP를 수정할 필요 없이 NAT 설정만 변경하면 됩니다.', color: '#f59e0b' },
              ].map((item) => (
                <div key={item.title} style={{ padding: '16px', borderRadius: '12px', background: `${item.color}08`, border: `1px solid ${item.color}20` }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.title}</div>
                  <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NAT 동작 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>NAT 동작 과정 (PAT)</SectionTitle>
          <div className="nat-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              가정의 PC가 웹 서버에 접속할 때, <strong style={{ color: '#f59e0b' }}>NAT 라우터(공유기)</strong>가 사설 IP를 공인 IP로 변환하는 과정입니다.
            </div>
            <div className="nat-anim-arena">
              {/* PC */}
              <div className="nat-anim-node">
                <div className="nat-anim-icon" style={{ background: 'rgba(34,197,94,0.1)', borderColor: '#22c55e' }}>🖥️</div>
                <div className="nat-anim-label">PC</div>
                <div className="nat-anim-ip">192.168.1.10</div>
              </div>

              {/* PC → NAT */}
              <div className="nat-anim-mid">
                <div className={`nat-anim-arrow right ${step >= 1 ? 'show' : ''}`}>
                  <div className="nat-anim-tip" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>192.168.1.10:54321</div>
                  <div className="nat-anim-line" style={{ background: 'linear-gradient(90deg,#22c55e,rgba(34,197,94,0.3))' }} />
                  <div className="nat-anim-arr-head" style={{ color: '#22c55e' }}>{'→'}</div>
                </div>
                <div className={`nat-anim-arrow left ${step >= 5 ? 'show' : ''}`}>
                  <div className="nat-anim-tip" style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>192.168.1.10:54321</div>
                  <div className="nat-anim-line" style={{ background: 'linear-gradient(90deg,rgba(168,85,247,0.3),#a855f7)' }} />
                  <div className="nat-anim-arr-head" style={{ color: '#a855f7' }}>{'←'}</div>
                </div>
              </div>

              {/* NAT Router */}
              <div className="nat-anim-node">
                <div className="nat-anim-icon" style={{ background: step >= 2 ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)', borderColor: '#f59e0b', transition: 'all .3s' }}>🔀</div>
                <div className="nat-anim-label" style={{ color: '#f59e0b' }}>NAT Router</div>
                <div className="nat-anim-ip">공유기</div>
              </div>

              {/* NAT → Server */}
              <div className="nat-anim-mid">
                <div className={`nat-anim-arrow right ${step >= 3 ? 'show' : ''}`}>
                  <div className="nat-anim-tip" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>203.0.113.1:10001</div>
                  <div className="nat-anim-line" style={{ background: 'linear-gradient(90deg,#3b82f6,rgba(59,130,246,0.3))' }} />
                  <div className="nat-anim-arr-head" style={{ color: '#3b82f6' }}>{'→'}</div>
                </div>
                <div className={`nat-anim-arrow left ${step >= 4 ? 'show' : ''}`}>
                  <div className="nat-anim-tip" style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>203.0.113.1:10001</div>
                  <div className="nat-anim-line" style={{ background: 'linear-gradient(90deg,rgba(168,85,247,0.3),#a855f7)' }} />
                  <div className="nat-anim-arr-head" style={{ color: '#a855f7' }}>{'←'}</div>
                </div>
              </div>

              {/* Server */}
              <div className="nat-anim-node">
                <div className="nat-anim-icon" style={{ background: 'rgba(59,130,246,0.1)', borderColor: '#3b82f6' }}>🌐</div>
                <div className="nat-anim-label">Web Server</div>
                <div className="nat-anim-ip">93.184.216.34</div>
              </div>
            </div>

            {/* NAT 테이블 */}
            <div style={{ margin: '20px 0', padding: '16px', background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '10px', opacity: step >= 2 ? 1 : 0.3, transition: 'opacity .5s' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#f59e0b', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>NAT Translation Table</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr', gap: '8px', alignItems: 'center', fontSize: '11px', fontFamily: 'JetBrains Mono,monospace' }}>
                <div style={{ color: '#22c55e', padding: '6px 10px', background: 'rgba(34,197,94,0.08)', borderRadius: '6px' }}>192.168.1.10:54321</div>
                <div style={{ textAlign: 'center', color: '#f59e0b' }}>{'↔'}</div>
                <div style={{ color: '#3b82f6', padding: '6px 10px', background: 'rgba(59,130,246,0.08)', borderRadius: '6px' }}>203.0.113.1:10001</div>
              </div>
            </div>

            <AnimationControls color="#f59e0b" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'PC(192.168.1.10:54321)가 NAT 라우터로 패킷 전송', color: '#22c55e' },
                  { num: '②', text: 'NAT 테이블에 매핑 기록 — 사설IP:포트 ↔ 공인IP:포트', color: '#f59e0b' },
                  { num: '③', text: '출발지를 공인IP(203.0.113.1:10001)로 변환하여 서버로 전송', color: '#3b82f6' },
                  { num: '④', text: '서버가 공인IP로 응답 → NAT가 테이블 참조하여 사설IP로 복원', color: '#a855f7' },
                  { num: '⑤', text: '원래 PC(192.168.1.10:54321)로 응답 전달 완료', color: '#22c55e' },
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

        {/* NAT 종류 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>NAT의 종류</SectionTitle>
          <div className="nat-type-grid">
            {[
              {
                badge: 'Static NAT', badgeColor: '#3b82f6', badgeBg: 'rgba(59,130,246,0.12)',
                title: 'Static NAT (1:1)', color: '#3b82f6',
                desc: '하나의 사설 IP에 하나의 공인 IP를 고정 매핑합니다. 외부에서 접근이 필요한 서버에 사용합니다.',
                example: '192.168.1.10 ↔ 203.0.113.10\n192.168.1.11 ↔ 203.0.113.11\n(항상 같은 공인 IP 사용)',
              },
              {
                badge: 'Dynamic NAT', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.12)',
                title: 'Dynamic NAT (N:M)', color: '#22c55e',
                desc: '사설 IP에 공인 IP 풀(Pool)에서 동적으로 할당합니다. 사용 후 반환하여 다른 기기가 재사용합니다.',
                example: '192.168.1.10 → 203.0.113.10 (사용 중)\n192.168.1.11 → 203.0.113.11 (사용 중)\n192.168.1.12 → (풀 소진 시 대기)',
              },
              {
                badge: 'PAT / NAPT', badgeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.12)',
                title: 'PAT (N:1) — 가장 일반적', color: '#f59e0b',
                desc: '여러 사설 IP가 하나의 공인 IP를 공유하면서, 포트 번호로 구분합니다. 가정용 공유기가 이 방식을 사용합니다.',
                example: '192.168.1.10:54321 → 203.0.113.1:10001\n192.168.1.11:54322 → 203.0.113.1:10002\n192.168.1.12:54323 → 203.0.113.1:10003\n(하나의 공인 IP, 포트로 구분)',
              },
            ].map((t) => (
              <div key={t.badge} className="nat-type-card" style={{ borderTop: `2px solid ${t.color}` }}>
                <div className="nat-type-badge" style={{ color: t.badgeColor, background: t.badgeBg }}>{t.badge}</div>
                <div className="nat-type-title" style={{ color: t.color }}>{t.title}</div>
                <div className="nat-type-desc">{t.desc}</div>
                <div className="nat-type-example" style={{ color: '#94a3b8' }}>
                  {t.example.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 포트포워딩 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>포트 포워딩 (Port Forwarding)</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '28px' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              NAT 뒤의 내부 서버에 <strong style={{ color: '#3b82f6' }}>외부에서 접근할 수 있게</strong> 하는 설정입니다.
              공인 IP의 특정 포트로 들어온 요청을 내부 사설 IP의 특정 포트로 전달합니다.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {[
                { ext: '203.0.113.1:80', arrow: '→', int: '192.168.1.100:80', label: '웹 서버', color: '#3b82f6' },
                { ext: '203.0.113.1:22', arrow: '→', int: '192.168.1.101:22', label: 'SSH 서버', color: '#22c55e' },
                { ext: '203.0.113.1:3306', arrow: '→', int: '192.168.1.102:3306', label: 'DB 서버', color: '#f59e0b' },
              ].map((r) => (
                <div key={r.ext} style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1fr auto', gap: '8px', alignItems: 'center', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '12px', fontFamily: 'JetBrains Mono,monospace', color: '#3b82f6' }}>{r.ext}</div>
                  <div style={{ textAlign: 'center', color: r.color, fontSize: '16px' }}>{r.arrow}</div>
                  <div style={{ fontSize: '12px', fontFamily: 'JetBrains Mono,monospace', color: '#22c55e' }}>{r.int}</div>
                  <div style={{ fontSize: '11px', color: '#5a6a85', padding: '3px 10px', background: `${r.color}10`, borderRadius: '6px', border: `1px solid ${r.color}25` }}>{r.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '12px', color: '#5a6a85', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', padding: '12px 16px', lineHeight: 1.7 }}>
              <strong style={{ color: '#3b82f6' }}>실무 활용:</strong> 개발 중인 서버를 외부에 잠시 노출하거나, 사내 서버에 VPN 없이 접근할 때 포트 포워딩을 설정합니다. 보안에 주의가 필요하며, 불필요한 포트는 반드시 닫아야 합니다.
            </div>
          </div>
        </div>

        {/* CIDR */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>서브넷 & CIDR 표기법</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
            <strong style={{ color: '#06b6d4' }}>CIDR(Classless Inter-Domain Routing)</strong>은 IP 대역을 유연하게 분할하는 표기법입니다.
            <strong style={{ color: '#94a3b8' }}> /숫자</strong>는 네트워크 부분의 비트 수를 의미하며, 나머지가 호스트 부분입니다.
          </div>
          <div className="nat-cidr-grid">
            {[
              { mask: '/8', binary: '255.0.0.0', hosts: '16,777,214', color: '#22c55e', desc: 'Class A 수준. 대규모 네트워크.' },
              { mask: '/16', binary: '255.255.0.0', hosts: '65,534', color: '#06b6d4', desc: 'Class B 수준. 중규모 네트워크.' },
              { mask: '/24', binary: '255.255.255.0', hosts: '254', color: '#3b82f6', desc: 'Class C 수준. 가장 흔히 사용.' },
              { mask: '/32', binary: '255.255.255.255', hosts: '1', color: '#a855f7', desc: '단일 호스트 지정. 방화벽 규칙 등.' },
            ].map((c) => (
              <div key={c.mask} className="nat-cidr-card" style={{ borderTop: `2px solid ${c.color}` }}>
                <div className="nat-cidr-mask" style={{ color: c.color }}>{c.mask}</div>
                <div className="nat-cidr-info">
                  <strong>서브넷 마스크:</strong> {c.binary}<br />
                  <strong>호스트 수:</strong> {c.hosts}개<br />
                  <span style={{ color: '#5a6a85' }}>{c.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px', padding: '14px 18px', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px', fontSize: '12px', color: '#5a6a85', lineHeight: 1.8 }}>
            <strong style={{ color: '#06b6d4' }}>예시:</strong> <code style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px' }}>192.168.1.0/24</code>는 192.168.1.0 ~ 192.168.1.255 범위이며, 실제 호스트에 사용 가능한 주소는 .1 ~ .254입니다. (.0은 네트워크 주소, .255는 브로드캐스트 주소)
          </div>
        </div>

        {/* IPv4 vs IPv6 간단 비교 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>IPv4 vs IPv6</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
            IPv4 주소 고갈 문제의 <strong style={{ color: '#a855f7' }}>근본적 해결책</strong>으로 등장한 IPv6. 아직 전환 중이지만 알아두면 좋습니다.
          </div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>항목</th>
                  <th style={{ color: '#3b82f6' }}>IPv4</th>
                  <th style={{ color: '#a855f7' }}>IPv6</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['주소 길이', '32비트 (4바이트)', '128비트 (16바이트)'],
                  ['주소 수', '약 43억 개', '약 3.4 x 10^38 개'],
                  ['표기법', '192.168.1.1 (10진수)', '2001:0db8::1 (16진수)'],
                  ['NAT 필요', '필수 (주소 부족)', '불필요 (주소 충분)'],
                  ['보안', 'IPsec 선택', 'IPsec 기본 내장'],
                  ['현재 상태', '주로 사용 중', '점진적 전환 중'],
                ].map(([label, v4, v6]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#93c5fd' }}>{v4}</td>
                    <td style={{ color: '#c4b5fd' }}>{v6}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NAT의 한계 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>NAT의 한계와 주의점</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px' }}>
            {[
              { icon: '🔗', title: 'P2P 통신 어려움', desc: '양쪽이 모두 NAT 뒤에 있으면 직접 연결이 어렵습니다. WebRTC의 STUN/TURN 서버가 이를 해결합니다.', color: '#ef4444' },
              { icon: '🏷️', title: 'End-to-End 원칙 위반', desc: '중간에 주소가 바뀌므로 IP 기반 추적이 어렵고, 일부 프로토콜(FTP 등)에서 문제가 생길 수 있습니다.', color: '#f59e0b' },
              { icon: '⚡', title: '성능 오버헤드', desc: '모든 패킷의 IP/포트를 변환하고 테이블을 관리해야 하므로, 대량 트래픽 시 라우터에 부하가 생깁니다.', color: '#3b82f6' },
              { icon: '🔍', title: '로깅/감사 복잡', desc: '여러 내부 기기가 같은 공인 IP를 사용하므로, 문제 발생 시 NAT 테이블 로그를 추가로 분석해야 합니다.', color: '#a855f7' },
            ].map((item) => (
              <div key={item.title} style={{ background: '#0e1118', border: '1px solid #1a2234', borderLeft: `3px solid ${item.color}`, borderRadius: '12px', padding: '18px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: item.color, marginBottom: '6px' }}>{item.title}</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 요약 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>항목</th>
                  <th style={{ color: '#3b82f6' }}>공인 IP</th>
                  <th style={{ color: '#22c55e' }}>사설 IP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['범위', '인터넷 전체', '내부 네트워크만'],
                  ['유일성', '전 세계 고유', '네트워크 내 고유'],
                  ['할당', 'ISP / IANA 관리', 'DHCP / 관리자 직접'],
                  ['비용', '유료', '무료'],
                  ['외부 접근', '직접 가능', 'NAT/포트포워딩 필요'],
                  ['보안', '직접 노출됨 (방화벽 필요)', 'NAT로 숨겨짐'],
                  ['주요 대역', '사설 IP 외 전부', '10.x / 172.16~31.x / 192.168.x'],
                ].map(([label, pub, priv]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#93c5fd' }}>{pub}</td>
                    <td style={{ color: '#86efac' }}>{priv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#22c55e" items={[
            { q: '공인 IP와 사설 IP의 차이를 설명해주세요.', a: '공인 IP는 인터넷에서 전 세계적으로 유일한 주소로 ISP가 할당합니다. 사설 IP는 RFC 1918에 정의된 내부 네트워크 전용 주소(10.x, 172.16~31.x, 192.168.x)로 인터넷에서 라우팅되지 않습니다. 사설 IP 기기가 인터넷과 통신하려면 NAT를 통해 공인 IP로 변환해야 합니다.' },
            { q: 'NAT가 필요한 이유와 동작 원리를 설명해주세요.', a: 'IPv4 주소가 약 43억 개로 한정되어 모든 기기에 공인 IP를 부여할 수 없기 때문입니다. NAT는 라우터에서 사설 IP를 공인 IP로 변환합니다. 가장 일반적인 PAT(NAPT) 방식은 하나의 공인 IP에 포트 번호를 달리하여 여러 내부 기기를 구분합니다. NAT 테이블에 매핑을 기록하여 응답을 원래 기기로 전달합니다.' },
            { q: 'NAT 환경에서 외부에서 내부 서버에 접근하려면?', a: '포트 포워딩(Port Forwarding)을 설정합니다. 공인 IP의 특정 포트(예: 80)로 들어온 요청을 내부 사설 IP의 해당 포트로 전달하도록 NAT 라우터에 규칙을 추가합니다. Static NAT로 1:1 고정 매핑을 사용하거나, 클라우드에서는 Elastic IP + 보안 그룹으로 유사하게 구현합니다.' },
            { q: 'CIDR 표기법에서 /24는 무엇을 의미하나요?', a: '32비트 IP 주소 중 앞의 24비트가 네트워크 부분이고, 나머지 8비트가 호스트 부분이라는 뜻입니다. 서브넷 마스크 255.255.255.0과 동일하며, 2^8 - 2 = 254개의 호스트를 사용할 수 있습니다. 2개를 빼는 이유는 네트워크 주소(.0)와 브로드캐스트 주소(.255)가 예약되어 있기 때문입니다.' },
            { q: 'IPv4 주소 고갈 문제의 해결책은?', a: '단기적으로는 NAT와 CIDR로 주소를 효율적으로 사용하고, 장기적으로는 128비트 주소 체계인 IPv6로 전환하는 것입니다. IPv6는 약 3.4x10^38개의 주소를 제공하여 NAT 없이도 모든 기기에 고유 주소를 부여할 수 있습니다. 현재는 IPv4와 IPv6를 병행하는 듀얼 스택 방식으로 점진적 전환 중입니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

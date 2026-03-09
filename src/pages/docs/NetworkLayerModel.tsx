import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.nlm-osi-stack { display:flex; flex-direction:column; gap:4px; margin-bottom:48px; }
.nlm-layer { display:grid; grid-template-columns:48px 160px 1fr 140px; align-items:center; gap:16px; padding:14px 20px; border-radius:12px; border:1px solid #1a2234; transition:transform .2s, box-shadow .2s; cursor:default; }
.nlm-layer:hover { transform:translateX(6px); }
@media(max-width:700px){ .nlm-layer{ grid-template-columns:40px 1fr; gap:8px; } .nlm-layer-proto,.nlm-layer-pdu{ display:none; } }
.nlm-layer-num { font-size:20px; font-weight:900; font-family:'JetBrains Mono',monospace; text-align:center; }
.nlm-layer-name { font-size:14px; font-weight:700; }
.nlm-layer-name small { display:block; font-size:11px; font-weight:400; color:#5a6a85; margin-top:2px; }
.nlm-layer-proto { display:flex; gap:6px; flex-wrap:wrap; }
.nlm-layer-proto span { font-size:10px; font-family:'JetBrains Mono',monospace; padding:3px 8px; border-radius:6px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.06); color:#94a3b8; }
.nlm-layer-pdu { font-size:11px; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:right; }
.nlm-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:48px; }
@media(max-width:640px){ .nlm-compare-grid{ grid-template-columns:1fr; } }
.nlm-model-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; }
.nlm-model-title { font-size:20px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.nlm-model-sub { font-size:12px; color:#5a6a85; margin-bottom:20px; font-family:'JetBrains Mono',monospace; }
.nlm-model-layers { display:flex; flex-direction:column; gap:4px; }
.nlm-ml { padding:12px 16px; border-radius:8px; font-size:13px; font-weight:600; display:flex; justify-content:space-between; align-items:center; }
.nlm-ml-sub { font-size:10px; font-weight:400; opacity:0.7; }
.nlm-mapping { background:#0e1118; border:1px solid #1a2234; border-radius:18px; padding:28px; margin-bottom:48px; }
.nlm-map-row { display:grid; grid-template-columns:1fr 80px 1fr; align-items:center; gap:0; margin-bottom:4px; }
.nlm-map-osi { padding:10px 16px; border-radius:8px 0 0 8px; font-size:12px; font-weight:600; text-align:right; }
.nlm-map-arrow { text-align:center; font-size:16px; color:#5a6a85; }
.nlm-map-tcp { padding:10px 16px; border-radius:0 8px 8px 0; font-size:12px; font-weight:600; }
.nlm-map-merged { display:flex; align-items:center; justify-content:flex-end; }
.nlm-map-brace { font-size:11px; color:#5a6a85; margin-right:8px; }
.nlm-encap-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.nlm-encap-visual { display:flex; flex-direction:column; align-items:center; gap:6px; margin-bottom:20px; padding:20px 0; }
.nlm-encap-row { display:flex; align-items:center; justify-content:center; gap:0; opacity:0; transform:translateY(-10px); transition:all .5s ease; }
.nlm-encap-row.show { opacity:1; transform:translateY(0); }
.nlm-encap-hdr { padding:8px 14px; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; border-radius:6px 0 0 6px; white-space:nowrap; }
.nlm-encap-data { padding:8px 14px; font-size:11px; font-family:'JetBrains Mono',monospace; color:#94a3b8; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); border-left:none; white-space:nowrap; }
.nlm-encap-tail { padding:8px 10px; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; border-radius:0 6px 6px 0; white-space:nowrap; }
.nlm-encap-label { font-size:11px; color:#5a6a85; width:80px; text-align:right; margin-right:12px; font-family:'JetBrains Mono',monospace; }
.nlm-encap-row-inner { display:flex; align-items:center; }
.nlm-device-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
.nlm-device { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:18px; transition:transform .2s; }
.nlm-device:hover { transform:translateY(-3px); }
.nlm-device-icon { font-size:28px; margin-bottom:8px; }
.nlm-device-name { font-size:14px; font-weight:700; margin-bottom:4px; }
.nlm-device-layer { font-size:10px; font-family:'JetBrains Mono',monospace; margin-bottom:8px; }
.nlm-device-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.nlm-flow-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.nlm-flow-visual { display:flex; align-items:flex-start; justify-content:space-between; gap:12px; position:relative; overflow-x:auto; padding:16px 0; }
.nlm-flow-node { flex:0 0 100px; display:flex; flex-direction:column; align-items:center; gap:8px; }
.nlm-flow-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:26px; border:2px solid #1a2234; }
.nlm-flow-label { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; }
.nlm-flow-layers { display:flex; flex-direction:column; gap:2px; width:100%; margin-top:4px; }
.nlm-flow-fl { padding:4px 6px; border-radius:4px; font-size:9px; font-family:'JetBrains Mono',monospace; text-align:center; font-weight:600; }
.nlm-flow-arrows { flex:1; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:4px; min-width:60px; padding-top:30px; }
.nlm-flow-arr { font-size:10px; font-family:'JetBrains Mono',monospace; color:#5a6a85; }
`

const osiLayers = [
  { num: 7, name: 'Application', kr: '응용 계층', protocols: ['HTTP', 'FTP', 'SMTP', 'DNS'], pdu: 'Data', color: '#a855f7', bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.25)' },
  { num: 6, name: 'Presentation', kr: '표현 계층', protocols: ['SSL/TLS', 'JPEG', 'MPEG'], pdu: 'Data', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.25)' },
  { num: 5, name: 'Session', kr: '세션 계층', protocols: ['NetBIOS', 'RPC'], pdu: 'Data', color: '#6366f1', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.25)' },
  { num: 4, name: 'Transport', kr: '전송 계층', protocols: ['TCP', 'UDP', 'QUIC'], pdu: 'Segment', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)' },
  { num: 3, name: 'Network', kr: '네트워크 계층', protocols: ['IP', 'ICMP', 'ARP'], pdu: 'Packet', color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.25)' },
  { num: 2, name: 'Data Link', kr: '데이터링크 계층', protocols: ['Ethernet', 'Wi-Fi', 'PPP'], pdu: 'Frame', color: '#22c55e', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.25)' },
  { num: 1, name: 'Physical', kr: '물리 계층', protocols: ['전기신호', '광신호', 'RS-232'], pdu: 'Bit', color: '#f97316', bg: 'rgba(249,115,22,0.08)', border: 'rgba(249,115,22,0.25)' },
]

const tcpipLayers = [
  { name: 'Application', kr: '응용 계층', protocols: 'HTTP, FTP, SMTP, DNS, SSH', color: '#a855f7', bg: 'rgba(168,85,247,0.12)' },
  { name: 'Transport', kr: '전송 계층', protocols: 'TCP, UDP', color: '#3b82f6', bg: 'rgba(59,130,246,0.12)' },
  { name: 'Internet', kr: '인터넷 계층', protocols: 'IP, ICMP, ARP', color: '#06b6d4', bg: 'rgba(6,182,212,0.12)' },
  { name: 'Network Access', kr: '네트워크 접근 계층', protocols: 'Ethernet, Wi-Fi', color: '#22c55e', bg: 'rgba(34,197,94,0.12)' },
]

export default function NetworkLayerModel() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 캡슐화 과정을 확인해보세요', color: '#5a6a85' })
  useInjectCSS('style-network-layer-model', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① Application — 사용자 데이터 생성', color: '#a855f7' },
      { s: 2, delay: 1200, msg: '② Transport — TCP/UDP 헤더 추가 (포트 번호, 시퀀스)', color: '#3b82f6' },
      { s: 3, delay: 2000, msg: '③ Network — IP 헤더 추가 (출발지/목적지 IP)', color: '#06b6d4' },
      { s: 4, delay: 2800, msg: '④ Data Link — 이더넷 헤더 + 트레일러 추가 (MAC 주소)', color: '#22c55e' },
      { s: 5, delay: 3600, msg: '⑤ Physical — 비트 스트림으로 변환하여 전송', color: '#f97316' },
    ]
    timeline.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: '캡슐화 완료! 수신 측에서는 역순으로 헤더를 제거합니다 (역캡슐화)', color: '#22c55e' })
      setIsPlaying(false)
    }, 4600)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 캡슐화 과정을 확인해보세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(168,85,247,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Network Model · OSI 7 Layer · TCP/IP 4 Layer · 면접 필수"
          title={<><span style={{ color: '#a855f7' }}>OSI 7계층</span> & <span style={{ color: '#3b82f6' }}>TCP/IP 4계층</span></>}
          description={<>네트워크 통신의 구조를 계층별로 나누어 이해하는 두 가지 참조 모델 —<br />면접에서 빠지지 않는 핵심 네트워크 기초</>}
        />

        {/* OSI 7계층 스택 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>OSI 7계층 모델</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
            <strong style={{ color: '#a855f7' }}>OSI(Open Systems Interconnection)</strong> 모델은 ISO에서 정의한 네트워크 통신의 표준 참조 모델입니다.
            실제 통신보다는 <strong style={{ color: '#94a3b8' }}>네트워크를 이해하고 설명하기 위한 이론적 프레임워크</strong>로 사용됩니다.
          </div>
          <div className="nlm-osi-stack">
            {osiLayers.map((l) => (
              <div key={l.num} className="nlm-layer" style={{ background: l.bg, borderColor: l.border }}>
                <div className="nlm-layer-num" style={{ color: l.color }}>L{l.num}</div>
                <div className="nlm-layer-name" style={{ color: l.color }}>
                  {l.name}
                  <small>{l.kr}</small>
                </div>
                <div className="nlm-layer-proto">
                  {l.protocols.map((p) => <span key={p}>{p}</span>)}
                </div>
                <div className="nlm-layer-pdu">PDU: {l.pdu}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 각 계층 역할 설명 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>각 계층의 역할</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { num: 7, name: 'Application (응용)', color: '#a855f7', desc: '사용자와 직접 상호작용하는 계층입니다. 웹 브라우저, 이메일 클라이언트 등 응용 프로그램이 네트워크 서비스를 사용할 수 있게 합니다.', example: 'HTTP로 웹 페이지 요청, SMTP로 이메일 전송' },
              { num: 6, name: 'Presentation (표현)', color: '#8b5cf6', desc: '데이터의 형식 변환, 암호화, 압축을 담당합니다. 서로 다른 시스템 간 데이터 표현 방식의 차이를 해결합니다.', example: 'JPEG/PNG 인코딩, SSL/TLS 암호화, 문자 인코딩(UTF-8)' },
              { num: 5, name: 'Session (세션)', color: '#6366f1', desc: '통신 세션의 설정, 유지, 종료를 관리합니다. 연결이 끊겼을 때 재개할 수 있는 체크포인트를 제공합니다.', example: '로그인 세션 유지, 대용량 파일 전송 시 중간 체크포인트' },
              { num: 4, name: 'Transport (전송)', color: '#3b82f6', desc: '종단 간(End-to-End) 신뢰성 있는 데이터 전송을 담당합니다. 포트 번호로 프로세스를 구분하고, 흐름 제어와 오류 제어를 수행합니다.', example: 'TCP의 3-way handshake, UDP의 빠른 전송' },
              { num: 3, name: 'Network (네트워크)', color: '#06b6d4', desc: '논리적 주소(IP)를 기반으로 패킷의 경로를 결정(라우팅)합니다. 서로 다른 네트워크 간 통신을 가능하게 합니다.', example: 'IP 주소 지정, 라우터의 경로 선택' },
              { num: 2, name: 'Data Link (데이터링크)', color: '#22c55e', desc: '물리적 주소(MAC)로 같은 네트워크 내 장치 간 통신을 담당합니다. 프레임 단위로 데이터를 전송하고 오류를 검출합니다.', example: 'MAC 주소 기반 통신, 이더넷 프레임, CRC 오류 검출' },
              { num: 1, name: 'Physical (물리)', color: '#f97316', desc: '실제 전기/광 신호로 비트를 전송하는 계층입니다. 케이블, 커넥터, 전압 등 물리적 사양을 정의합니다.', example: 'LAN 케이블(UTP), 광섬유, Wi-Fi 전파' },
            ].map((l) => (
              <div key={l.num} style={{ background: '#0e1118', border: '1px solid #1a2234', borderLeft: `3px solid ${l.color}`, borderRadius: '12px', padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 900, fontFamily: 'JetBrains Mono,monospace', color: l.color }}>L{l.num}</span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: l.color }}>{l.name}</span>
                </div>
                <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '8px' }}>{l.desc}</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', fontFamily: 'JetBrains Mono,monospace' }}>
                  ex) {l.example}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OSI vs TCP/IP 비교 카드 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>OSI vs TCP/IP 비교</SectionTitle>
          <div className="nlm-compare-grid">
            <div className="nlm-model-card" style={{ borderTop: '3px solid #a855f7', boxShadow: '0 0 40px rgba(168,85,247,0.15)' }}>
              <div className="nlm-model-title" style={{ color: '#a855f7' }}>OSI 7계층</div>
              <div className="nlm-model-sub">이론적 참조 모델 · ISO 표준</div>
              <div className="nlm-model-layers">
                {osiLayers.map((l) => (
                  <div key={l.num} className="nlm-ml" style={{ background: l.bg, color: l.color }}>
                    <span>L{l.num} {l.name}</span>
                    <span className="nlm-ml-sub">{l.pdu}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="nlm-model-card" style={{ borderTop: '3px solid #3b82f6', boxShadow: '0 0 40px rgba(59,130,246,0.15)' }}>
              <div className="nlm-model-title" style={{ color: '#3b82f6' }}>TCP/IP 4계층</div>
              <div className="nlm-model-sub">실용적 구현 모델 · 인터넷 표준</div>
              <div className="nlm-model-layers">
                {tcpipLayers.map((l) => (
                  <div key={l.name} className="nlm-ml" style={{ background: l.bg, color: l.color }}>
                    <span>{l.name}</span>
                    <span className="nlm-ml-sub">{l.protocols}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', fontSize: '12px', color: '#5a6a85', lineHeight: 1.7, padding: '12px', background: 'rgba(59,130,246,0.04)', borderRadius: '8px' }}>
                TCP/IP 모델은 OSI L5~L7을 하나의 Application 계층으로, L1~L2를 Network Access 계층으로 합쳐서 <strong style={{ color: '#3b82f6' }}>실제 인터넷 통신에 맞게 단순화</strong>한 모델입니다.
              </div>
            </div>
          </div>
        </div>

        {/* 계층 매핑 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>OSI ↔ TCP/IP 매핑</SectionTitle>
          <div className="nlm-mapping">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '0', marginBottom: '6px' }}>
              <div style={{ textAlign: 'right', fontSize: '11px', fontWeight: 700, color: '#a855f7', fontFamily: 'JetBrains Mono,monospace', padding: '8px 16px' }}>OSI 7계층</div>
              <div />
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', fontFamily: 'JetBrains Mono,monospace', padding: '8px 16px' }}>TCP/IP 4계층</div>
            </div>
            {[
              { osi: [{ name: 'L7 Application', color: '#a855f7' }, { name: 'L6 Presentation', color: '#8b5cf6' }, { name: 'L5 Session', color: '#6366f1' }], tcp: { name: 'Application', color: '#a855f7' } },
              { osi: [{ name: 'L4 Transport', color: '#3b82f6' }], tcp: { name: 'Transport', color: '#3b82f6' } },
              { osi: [{ name: 'L3 Network', color: '#06b6d4' }], tcp: { name: 'Internet', color: '#06b6d4' } },
              { osi: [{ name: 'L2 Data Link', color: '#22c55e' }, { name: 'L1 Physical', color: '#f97316' }], tcp: { name: 'Network Access', color: '#22c55e' } },
            ].map((row, ri) => (
              <div key={ri} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', gap: '0', marginBottom: '6px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end' }}>
                  {row.osi.map((o) => (
                    <div key={o.name} style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: o.color, background: `${o.color}15`, border: `1px solid ${o.color}30`, width: '100%', textAlign: 'right', fontFamily: 'JetBrains Mono,monospace' }}>
                      {o.name}
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '18px', color: '#5a6a85' }}>{'→'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, color: row.tcp.color, background: `${row.tcp.color}15`, border: `1px solid ${row.tcp.color}30`, width: '100%', fontFamily: 'JetBrains Mono,monospace', minHeight: row.osi.length > 1 ? `${row.osi.length * 36 + (row.osi.length - 1) * 3}px` : 'auto', display: 'flex', alignItems: 'center' }}>
                    {row.tcp.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 데이터 캡슐화 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>데이터 캡슐화 (Encapsulation)</SectionTitle>
          <div className="nlm-encap-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              송신 측에서 데이터가 각 계층을 거칠 때마다 <strong style={{ color: '#94a3b8' }}>헤더(Header)가 추가</strong>됩니다.
              수신 측에서는 역순으로 헤더를 제거하며 원본 데이터를 복원합니다.
            </div>
            <div className="nlm-encap-visual">
              {/* Step 1: Application Data */}
              <div className={`nlm-encap-row ${step >= 1 ? 'show' : ''}`}>
                <span className="nlm-encap-label" style={{ color: '#a855f7' }}>Application</span>
                <div className="nlm-encap-row-inner">
                  <div className="nlm-encap-data" style={{ borderRadius: '6px', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>Data</div>
                </div>
              </div>

              {/* Step 2: Transport Header */}
              <div className={`nlm-encap-row ${step >= 2 ? 'show' : ''}`}>
                <span className="nlm-encap-label" style={{ color: '#3b82f6' }}>Transport</span>
                <div className="nlm-encap-row-inner">
                  <div className="nlm-encap-hdr" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}>TCP/UDP H</div>
                  <div className="nlm-encap-data">Data</div>
                </div>
              </div>

              {/* Step 3: Network Header */}
              <div className={`nlm-encap-row ${step >= 3 ? 'show' : ''}`}>
                <span className="nlm-encap-label" style={{ color: '#06b6d4' }}>Network</span>
                <div className="nlm-encap-row-inner">
                  <div className="nlm-encap-hdr" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>IP H</div>
                  <div className="nlm-encap-data" style={{ borderRadius: 0 }}>TCP/UDP H</div>
                  <div className="nlm-encap-data">Data</div>
                </div>
              </div>

              {/* Step 4: Data Link Header + Trailer */}
              <div className={`nlm-encap-row ${step >= 4 ? 'show' : ''}`}>
                <span className="nlm-encap-label" style={{ color: '#22c55e' }}>Data Link</span>
                <div className="nlm-encap-row-inner">
                  <div className="nlm-encap-hdr" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}>ETH H</div>
                  <div className="nlm-encap-data" style={{ borderRadius: 0 }}>IP H</div>
                  <div className="nlm-encap-data" style={{ borderRadius: 0 }}>TCP/UDP H</div>
                  <div className="nlm-encap-data" style={{ borderRadius: 0 }}>Data</div>
                  <div className="nlm-encap-tail" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)' }}>FCS</div>
                </div>
              </div>

              {/* Step 5: Physical Bits */}
              <div className={`nlm-encap-row ${step >= 5 ? 'show' : ''}`}>
                <span className="nlm-encap-label" style={{ color: '#f97316' }}>Physical</span>
                <div className="nlm-encap-row-inner">
                  <div style={{ padding: '8px 20px', borderRadius: '6px', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316', fontSize: '11px', fontWeight: 700, fontFamily: 'JetBrains Mono,monospace', letterSpacing: '2px' }}>
                    0 1 1 0 1 0 0 1 1 0 1 1 0 1 0 0 ...
                  </div>
                </div>
              </div>
            </div>
            <AnimationControls color="#a855f7" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Application — 사용자 데이터(Data) 생성', color: '#a855f7' },
                  { num: '②', text: 'Transport — TCP/UDP 헤더 추가 (포트 번호, 시퀀스) → Segment', color: '#3b82f6' },
                  { num: '③', text: 'Network — IP 헤더 추가 (출발지/목적지 IP) → Packet', color: '#06b6d4' },
                  { num: '④', text: 'Data Link — 이더넷 헤더 + FCS 트레일러 추가 (MAC 주소) → Frame', color: '#22c55e' },
                  { num: '⑤', text: 'Physical — 비트 스트림(0/1)으로 변환하여 전기/광 신호로 전송', color: '#f97316' },
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

        {/* PDU 이름 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>계층별 PDU (Protocol Data Unit)</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
            각 계층에서 데이터를 부르는 이름이 다릅니다. 면접에서 <strong style={{ color: '#94a3b8' }}>"세그먼트, 패킷, 프레임"</strong>의 차이를 물어보는 경우가 많습니다.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { layer: 'L7~L5 Application', pdu: 'Data (Message)', color: '#a855f7', desc: '사용자가 생성한 원본 데이터' },
              { layer: 'L4 Transport', pdu: 'Segment (TCP) / Datagram (UDP)', color: '#3b82f6', desc: '포트 번호가 포함된 전송 단위' },
              { layer: 'L3 Network', pdu: 'Packet', color: '#06b6d4', desc: 'IP 주소가 포함된 라우팅 단위' },
              { layer: 'L2 Data Link', pdu: 'Frame', color: '#22c55e', desc: 'MAC 주소가 포함된 물리 전송 단위' },
              { layer: 'L1 Physical', pdu: 'Bit', color: '#f97316', desc: '전기/광 신호로 변환된 0과 1' },
            ].map((p) => (
              <div key={p.layer} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr', gap: '12px', padding: '12px 16px', background: '#0e1118', border: '1px solid #1a2234', borderRadius: '10px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: p.color, fontFamily: 'JetBrains Mono,monospace' }}>{p.layer}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>{p.pdu}</span>
                <span style={{ fontSize: '12px', color: '#5a6a85' }}>{p.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 계층별 네트워크 장비 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>계층별 네트워크 장비</SectionTitle>
          <div className="nlm-device-grid">
            {[
              { icon: '🌐', name: 'L7 스위치 / 로드밸런서', layer: 'L7 Application', color: '#a855f7', desc: 'HTTP 헤더, URL 경로 등 애플리케이션 레벨 정보를 기반으로 트래픽을 분배합니다.' },
              { icon: '🔥', name: '방화벽 (Firewall)', layer: 'L3~L7', color: '#8b5cf6', desc: 'IP, 포트, 프로토콜 등을 기반으로 트래픽을 필터링하여 네트워크를 보호합니다.' },
              { icon: '📡', name: '라우터 (Router)', layer: 'L3 Network', color: '#06b6d4', desc: 'IP 주소를 보고 패킷의 최적 경로를 결정합니다. 서로 다른 네트워크를 연결합니다.' },
              { icon: '🔀', name: 'L3 스위치', layer: 'L3 Network', color: '#06b6d4', desc: '스위치에 라우팅 기능을 추가한 장비. VLAN 간 라우팅을 하드웨어로 빠르게 처리합니다.' },
              { icon: '🔌', name: 'L2 스위치', layer: 'L2 Data Link', color: '#22c55e', desc: 'MAC 주소 테이블을 기반으로 프레임을 해당 포트로만 전달합니다. 콜리전 도메인을 분리합니다.' },
              { icon: '📶', name: 'AP (Access Point)', layer: 'L2 Data Link', color: '#22c55e', desc: '무선 기기를 유선 네트워크에 연결합니다. Wi-Fi 신호를 이더넷 프레임으로 변환합니다.' },
              { icon: '🔗', name: '허브 / 리피터', layer: 'L1 Physical', color: '#f97316', desc: '전기 신호를 증폭하여 재전송합니다. 모든 포트에 데이터를 브로드캐스트합니다 (비효율적).' },
              { icon: '🔧', name: '케이블 / NIC', layer: 'L1 Physical', color: '#f97316', desc: 'UTP, 광섬유 등 물리적 전송 매체와 네트워크 인터페이스 카드입니다.' },
            ].map((d) => (
              <div key={d.name} className="nlm-device" style={{ borderTop: `2px solid ${d.color}` }}>
                <div className="nlm-device-icon">{d.icon}</div>
                <div className="nlm-device-name" style={{ color: d.color }}>{d.name}</div>
                <div className="nlm-device-layer" style={{ color: d.color }}>{d.layer}</div>
                <div className="nlm-device-desc">{d.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 실제 통신 흐름 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>실제 통신 흐름 예시</SectionTitle>
          <div className="nlm-flow-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              웹 브라우저에서 <strong style={{ color: '#94a3b8' }}>https://example.com</strong>에 접속할 때 각 계층에서 일어나는 일을 살펴봅니다.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { layer: 'L7 Application', color: '#a855f7', action: 'HTTP GET 요청 생성', detail: 'GET / HTTP/1.1  Host: example.com' },
                { layer: 'L6 Presentation', color: '#8b5cf6', action: 'TLS 암호화', detail: 'HTTP 데이터를 TLS로 암호화하여 보안 전송 준비' },
                { layer: 'L5 Session', color: '#6366f1', action: 'TLS 세션 수립', detail: 'TLS Handshake로 암호화 세션 설정' },
                { layer: 'L4 Transport', color: '#3b82f6', action: 'TCP 세그먼트 생성', detail: 'Source Port: 54321, Dest Port: 443, SEQ/ACK 번호 부여' },
                { layer: 'L3 Network', color: '#06b6d4', action: 'IP 패킷 생성', detail: 'Source IP: 192.168.1.10, Dest IP: 93.184.216.34 (DNS 조회)' },
                { layer: 'L2 Data Link', color: '#22c55e', action: '이더넷 프레임 생성', detail: 'Source MAC → Gateway MAC (라우터), CRC 오류 검출 코드 추가' },
                { layer: 'L1 Physical', color: '#f97316', action: '비트 전송', detail: 'UTP 케이블 또는 Wi-Fi를 통해 전기/전파 신호로 전송' },
              ].map((s) => (
                <div key={s.layer} style={{ display: 'grid', gridTemplateColumns: '130px 180px 1fr', gap: '12px', padding: '12px 16px', background: '#0e1118', border: '1px solid #1a2234', borderLeft: `3px solid ${s.color}`, borderRadius: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: s.color, fontFamily: 'JetBrains Mono,monospace' }}>{s.layer}</span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#94a3b8' }}>{s.action}</span>
                  <span style={{ fontSize: '11px', color: '#5a6a85', fontFamily: 'JetBrains Mono,monospace' }}>{s.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 요약 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>항목</th>
                  <th style={{ color: '#a855f7' }}>OSI 7계층</th>
                  <th style={{ color: '#3b82f6' }}>TCP/IP 4계층</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['목적', '이론적 참조 모델 (교육·설명용)', '실제 구현 모델 (인터넷 프로토콜)'],
                  ['계층 수', '7개 계층', '4개 계층'],
                  ['제정 기관', 'ISO (국제표준화기구)', 'DARPA / IETF'],
                  ['개발 시기', '1984년', '1970년대 (OSI보다 먼저)'],
                  ['세션/표현 계층', '별도 계층으로 분리', 'Application에 통합'],
                  ['물리/데이터링크', '별도 계층으로 분리', 'Network Access로 통합'],
                  ['실무 활용', '네트워크 문제 분석·설명 시 사용', '실제 프로토콜 설계·구현에 사용'],
                  ['프로토콜 종속성', '프로토콜 독립적', '프로토콜 종속적 (TCP/IP 중심)'],
                ].map(([label, osi, tcp]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#c4b5fd' }}>{osi}</td>
                    <td style={{ color: '#93c5fd' }}>{tcp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#a855f7" items={[
            { q: 'OSI 7계층을 설명해주세요.', a: 'OSI 7계층은 네트워크 통신을 7단계로 나눈 참조 모델입니다. 물리(1) → 데이터링크(2) → 네트워크(3) → 전송(4) → 세션(5) → 표현(6) → 응용(7) 순서로, 각 계층은 독립적인 역할을 수행합니다. 하위 계층은 상위 계층에 서비스를 제공하며, 데이터 전송 시 각 계층에서 헤더를 추가하는 캡슐화가 일어납니다.' },
            { q: 'OSI 7계층과 TCP/IP 4계층의 차이는?', a: 'OSI는 이론적 참조 모델이고, TCP/IP는 실제 인터넷에서 사용되는 구현 모델입니다. OSI는 세션·표현 계층을 별도로 분리했지만, TCP/IP는 이를 Application 계층에 통합했습니다. 물리·데이터링크도 Network Access로 합쳤습니다. 실무에서는 TCP/IP를 기반으로 통신하되, 네트워크 문제를 분석·설명할 때 OSI 모델을 참조합니다.' },
            { q: '패킷, 프레임, 세그먼트의 차이는?', a: '각 계층에서 데이터를 부르는 이름(PDU)이 다릅니다. L4 전송 계층에서는 Segment(TCP) 또는 Datagram(UDP), L3 네트워크 계층에서는 Packet, L2 데이터링크 계층에서는 Frame이라 합니다. 상위 계층의 데이터에 해당 계층의 헤더가 추가될 때마다 PDU 이름이 바뀝니다.' },
            { q: '캡슐화(Encapsulation)란?', a: '송신 측에서 데이터가 상위 계층에서 하위 계층으로 내려가며 각 계층의 헤더가 추가되는 과정입니다. Application 데이터에 TCP 헤더(포트)가 붙어 Segment가 되고, IP 헤더(IP주소)가 붙어 Packet이 되고, Ethernet 헤더(MAC주소)가 붙어 Frame이 됩니다. 수신 측에서는 역순으로 헤더를 제거하는 역캡슐화(Decapsulation)를 수행합니다.' },
            { q: 'L2 스위치와 라우터(L3)의 차이는?', a: 'L2 스위치는 MAC 주소를 기반으로 같은 네트워크 내에서 프레임을 전달합니다. 라우터는 IP 주소를 기반으로 서로 다른 네트워크 간 패킷을 라우팅합니다. 스위치는 브로드캐스트 도메인을 분리하지 못하지만, 라우터는 분리할 수 있습니다. L3 스위치는 하드웨어 기반 라우팅으로 두 기능을 모두 수행합니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import AnimationControls from '../../components/doc/AnimationControls'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { CodeBlock } from '../../components/doc/CodeBlock'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.grpc-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px; }
@media(max-width:640px){ .grpc-compare-grid{ grid-template-columns:1fr; } }
.grpc-card { background:#0e1118; border-radius:18px; padding:28px; border:1px solid #1a2234; transition:transform .25s; }
.grpc-card:hover { transform:translateY(-4px); }
.grpc-card-title { font-size:20px; font-weight:900; margin-bottom:4px; display:flex; align-items:center; gap:10px; }
.grpc-card-sub { font-size:12px; color:#5a6a85; margin-bottom:20px; font-family:'JetBrains Mono',monospace; }
.grpc-prop-list { display:flex; flex-direction:column; gap:10px; }
.grpc-prop-row { display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:rgba(255,255,255,0.025); border-radius:8px; font-size:13px; gap:12px; }
.grpc-prop-label { color:#5a6a85; font-size:12px; white-space:nowrap; }
.grpc-prop-val { font-weight:700; font-size:12px; text-align:right; }
.grpc-good { color:#22c55e; } .grpc-bad { color:#ef4444; } .grpc-neutral { color:#94a3b8; } .grpc-blue { color:#3b82f6; } .grpc-orange { color:#f97316; }
.grpc-feature-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.grpc-feature { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.grpc-feature:hover { transform:translateY(-3px); }
.grpc-feature-icon { font-size:28px; margin-bottom:10px; }
.grpc-feature-name { font-size:14px; font-weight:700; margin-bottom:6px; }
.grpc-feature-desc { font-size:12px; color:#5a6a85; line-height:1.75; }
.grpc-code { background:#0a0d14; border:1px solid #1a2234; border-radius:12px; padding:18px 20px; font-family:'JetBrains Mono',monospace; font-size:12px; color:#94a3b8; line-height:1.7; overflow-x:auto; white-space:pre; }
.grpc-code-label { font-size:12px; font-weight:700; margin-bottom:10px; display:inline-block; padding:3px 10px; border-radius:20px; }
.grpc-stream-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:16px; }
.grpc-stream { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s; }
.grpc-stream:hover { transform:translateY(-3px); }
.grpc-stream-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:12px; }
.grpc-stream-title { font-size:15px; font-weight:800; margin-bottom:8px; }
.grpc-stream-desc { font-size:12px; color:#5a6a85; line-height:1.75; margin-bottom:14px; }
.grpc-stream-visual { font-size:11px; font-family:'JetBrains Mono',monospace; padding:12px 14px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); line-height:1.8; color:#94a3b8; }
.grpc-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.grpc-anim-arena { display:flex; align-items:flex-start; justify-content:center; gap:12px; min-height:220px; position:relative; padding:16px 0; overflow-x:auto; }
.grpc-anim-col { display:flex; flex-direction:column; align-items:center; gap:6px; }
.grpc-anim-icon { width:56px; height:56px; border-radius:14px; display:flex; align-items:center; justify-content:center; font-size:24px; border:2px solid #1a2234; transition:all .3s; }
.grpc-anim-label { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; }
.grpc-anim-sub { font-size:9px; font-family:'JetBrains Mono',monospace; color:#5a6a85; text-align:center; padding:2px 8px; border-radius:4px; background:rgba(255,255,255,0.03); }
.grpc-anim-mid { display:flex; flex-direction:column; gap:8px; min-width:100px; justify-content:center; padding-top:16px; }
.grpc-anim-arrow { display:flex; align-items:center; gap:6px; opacity:0; transform:translateX(-10px); transition:all .5s ease; }
.grpc-anim-arrow.show { opacity:1; transform:translateX(0); }
.grpc-anim-arrow.right { flex-direction:row; }
.grpc-anim-arrow.left { flex-direction:row-reverse; transform:translateX(10px); }
.grpc-anim-arrow.left.show { transform:translateX(0); }
.grpc-anim-line { flex:1; height:2px; }
.grpc-anim-tip { font-size:8px; font-weight:700; font-family:'JetBrains Mono',monospace; white-space:nowrap; padding:2px 8px; border-radius:4px; }
.grpc-anim-arr-head { font-size:14px; line-height:1; }
.grpc-usecase-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:560px){ .grpc-usecase-grid{ grid-template-columns:1fr; } }
.grpc-usecase { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.grpc-usecase h4 { font-size:14px; font-weight:700; margin-bottom:12px; }
.grpc-usecase-items { display:flex; flex-direction:column; gap:8px; }
.grpc-ui-item { display:flex; align-items:center; gap:10px; font-size:13px; color:#94a3b8; padding:8px 12px; background:rgba(255,255,255,0.02); border-radius:7px; }
`

export default function GrpcProtobuf() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 gRPC 통신 흐름을 확인해보세요', color: '#5a6a85' })
  useInjectCSS('style-grpc-protobuf', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① .proto 파일로 서비스와 메시지를 정의', color: '#06b6d4' },
      { s: 2, delay: 1400, msg: '② protoc 컴파일러가 클라이언트/서버 코드를 자동 생성', color: '#a855f7' },
      { s: 3, delay: 2400, msg: '③ 클라이언트가 Stub을 통해 메서드 호출 (로컬 함수처럼)', color: '#3b82f6' },
      { s: 4, delay: 3400, msg: '④ Protocol Buffers로 직렬화 → HTTP/2로 바이너리 전송', color: '#f59e0b' },
      { s: 5, delay: 4400, msg: '⑤ 서버가 역직렬화 후 처리 → 응답을 동일하게 반환', color: '#22c55e' },
    ]
    timeline.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStatus({ msg: 'gRPC 호출 완료! 클라이언트는 원격 서버의 메서드를 로컬처럼 호출할 수 있습니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 5400)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 gRPC 통신 흐름을 확인해보세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(245,158,11,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="RPC · HTTP/2 · Protocol Buffers · Microservices"
          title={<><span style={{ color: '#06b6d4' }}>gRPC</span> & <span style={{ color: '#f59e0b' }}>Protocol Buffers</span></>}
          description={<>Google이 만든 고성능 RPC 프레임워크와 바이너리 직렬화 포맷 —<br />마이크로서비스 간 통신의 핵심 기술</>}
        />

        {/* gRPC란? */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>gRPC란?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#06b6d4' }}>gRPC(Google Remote Procedure Call)</strong>는 Google이 개발한
              <strong style={{ color: '#94a3b8' }}> 고성능 오픈소스 RPC 프레임워크</strong>입니다.
              <strong style={{ color: '#f59e0b' }}> Protocol Buffers</strong>로 데이터를 직렬화하고,
              <strong style={{ color: '#3b82f6' }}> HTTP/2</strong>를 전송 프로토콜로 사용하여 빠르고 효율적인 서비스 간 통신을 제공합니다.
            </div>
            <div style={{ fontSize: '12px', color: '#5a6a85', background: 'rgba(6,182,212,0.04)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '10px', padding: '14px 18px', lineHeight: 1.7 }}>
              <strong style={{ color: '#06b6d4' }}>RPC(Remote Procedure Call)란?</strong> 원격 서버의 함수를 마치 로컬 함수를 호출하듯 사용하는 통신 방식입니다. 클라이언트는 네트워크 통신의 복잡한 세부사항을 신경 쓰지 않고, <strong style={{ color: '#94a3b8' }}>자동 생성된 Stub</strong>을 통해 서버 메서드를 직접 호출합니다.
            </div>
          </div>
        </div>

        {/* REST vs gRPC */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>REST vs gRPC</SectionTitle>
          <div className="grpc-compare-grid">
            <div className="grpc-card" style={{ borderTop: '3px solid #f59e0b', boxShadow: '0 0 30px rgba(245,158,11,0.15)' }}>
              <div className="grpc-card-title" style={{ color: '#f59e0b' }}>REST API</div>
              <div className="grpc-card-sub">리소스 중심 · JSON · HTTP/1.1</div>
              <div className="grpc-prop-list">
                {[
                  ['통신 방식', '리소스 중심 (CRUD)', 'orange'],
                  ['데이터 포맷', 'JSON (텍스트)', 'neutral'],
                  ['프로토콜', 'HTTP/1.1 (주로)', 'neutral'],
                  ['직렬화 크기', '큼 (텍스트 기반)', 'bad'],
                  ['속도', '상대적으로 느림', 'bad'],
                  ['스트리밍', '기본 미지원', 'bad'],
                  ['코드 생성', '수동 (Swagger/OpenAPI)', 'neutral'],
                  ['브라우저 지원', '✓ 네이티브 지원', 'good'],
                ].map(([label, val, type]) => (
                  <div key={label} className="grpc-prop-row">
                    <span className="grpc-prop-label">{label}</span>
                    <span className={`grpc-prop-val grpc-${type}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grpc-card" style={{ borderTop: '3px solid #06b6d4', boxShadow: '0 0 30px rgba(6,182,212,0.15)' }}>
              <div className="grpc-card-title" style={{ color: '#06b6d4' }}>gRPC</div>
              <div className="grpc-card-sub">메서드 중심 · Protobuf · HTTP/2</div>
              <div className="grpc-prop-list">
                {[
                  ['통신 방식', '메서드(함수) 중심 (RPC)', 'blue'],
                  ['데이터 포맷', 'Protocol Buffers (바이너리)', 'good'],
                  ['프로토콜', 'HTTP/2 (필수)', 'good'],
                  ['직렬화 크기', '작음 (바이너리, ~10x)', 'good'],
                  ['속도', '매우 빠름', 'good'],
                  ['스트리밍', '✓ 양방향 스트리밍', 'good'],
                  ['코드 생성', '자동 (protoc 컴파일러)', 'good'],
                  ['브라우저 지원', '✗ 직접 불가 (gRPC-Web)', 'bad'],
                ].map(([label, val, type]) => (
                  <div key={label} className="grpc-prop-row">
                    <span className="grpc-prop-label">{label}</span>
                    <span className={`grpc-prop-val grpc-${type}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#06b6d4">
            <strong style={{ color: '#06b6d4' }}>핵심 차이:</strong> REST는 리소스(URI)를 CRUD하는 방식이고, gRPC는 원격 메서드를 직접 호출하는 방식입니다. REST는 범용적이고 브라우저 친화적이며, gRPC는 서비스 간 내부 통신에서 성능이 압도적입니다.
          </HighlightBox>
        </div>

        {/* Protocol Buffers */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>Protocol Buffers (Protobuf)</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
            <strong style={{ color: '#f59e0b' }}>Protocol Buffers</strong>는 Google이 개발한 <strong style={{ color: '#94a3b8' }}>언어/플랫폼 독립적인 바이너리 직렬화 포맷</strong>입니다.
            <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>.proto</code> 파일에 스키마를 정의하면 다양한 언어의 코드가 자동 생성됩니다.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <CodeBlock title=".proto 파일 정의" lang="Proto">{`syntax = "proto3";

package user;

// 메시지(데이터 구조) 정의
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
  UserRole role = 4;
}

enum UserRole {
  UNKNOWN = 0;
  ADMIN = 1;
  USER = 2;
}

// 서비스(API) 정의
service UserService {
  rpc GetUser (GetUserRequest)
    returns (User);
  rpc ListUsers (ListUsersRequest)
    returns (stream User);
  rpc CreateUser (CreateUserRequest)
    returns (User);
}`}</CodeBlock>
            </div>
            <div>
              <CodeBlock title="JSON과 크기 비교" lang="Comparison">{`// JSON (텍스트) — 82 bytes
{
  "id": 12345,
  "name": "홍길동",
  "email": "hong@example.com",
  "role": "ADMIN"
}

// Protobuf (바이너리) — ~35 bytes
// 08 B9 60 12 09 ED 99 8D
// EA B8 B8 EB 8F 99 1A 10
// 68 6F 6E 67 40 65 78 61
// 6D 70 6C 65 2E 63 6F 6D
// 20 01

// → 약 57% 크기 절감`}</CodeBlock>
            </div>
          </div>
          <div className="grpc-feature-grid">
            {[
              { icon: '📦', name: '바이너리 인코딩', desc: 'JSON 대비 약 2~10배 작은 크기. 네트워크 대역폭을 절약하고 직렬화/역직렬화 속도가 빠릅니다.', color: '#f59e0b' },
              { icon: '📝', name: '스키마 기반', desc: '.proto 파일로 메시지 구조를 미리 정의합니다. 타입 안전성이 보장되고 문서 역할도 합니다.', color: '#3b82f6' },
              { icon: '🔧', name: '자동 코드 생성', desc: 'protoc 컴파일러가 Java, Go, Python, C++ 등 다양한 언어의 코드를 자동 생성합니다.', color: '#22c55e' },
              { icon: '🔄', name: '하위 호환성', desc: '필드 번호 기반이라 필드를 추가해도 기존 코드가 깨지지 않습니다. API 버전 관리에 유리합니다.', color: '#a855f7' },
            ].map((f) => (
              <div key={f.name} className="grpc-feature" style={{ borderTop: `2px solid ${f.color}` }}>
                <div className="grpc-feature-icon">{f.icon}</div>
                <div className="grpc-feature-name" style={{ color: f.color }}>{f.name}</div>
                <div className="grpc-feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* HTTP/2 기반 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>gRPC가 HTTP/2를 사용하는 이유</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px' }}>
            {[
              { icon: '🔀', title: '멀티플렉싱', desc: '하나의 TCP 연결에서 여러 요청/응답을 동시에 처리합니다. 연결 수립 오버헤드 없이 병렬 통신이 가능합니다.', color: '#3b82f6' },
              { icon: '📡', title: '양방향 스트리밍', desc: 'HTTP/2의 스트림 기능으로 클라이언트와 서버가 동시에 데이터를 주고받을 수 있습니다.', color: '#22c55e' },
              { icon: '🗜️', title: '헤더 압축 (HPACK)', desc: 'HTTP 헤더를 효율적으로 압축하여 반복 요청의 오버헤드를 줄입니다. 특히 메타데이터가 많은 gRPC에 유리합니다.', color: '#a855f7' },
              { icon: '⚡', title: '바이너리 프레이밍', desc: 'HTTP/2는 텍스트가 아닌 바이너리 프레임으로 데이터를 전송합니다. Protobuf의 바이너리 데이터와 자연스럽게 어울립니다.', color: '#f59e0b' },
            ].map((f) => (
              <div key={f.title} style={{ background: '#0e1118', border: '1px solid #1a2234', borderLeft: `3px solid ${f.color}`, borderRadius: '12px', padding: '18px' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{f.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: f.color, marginBottom: '6px' }}>{f.title}</div>
                <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* gRPC 통신 흐름 애니메이션 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>gRPC 통신 흐름</SectionTitle>
          <div className="grpc-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              <code style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.08)', padding: '2px 6px', borderRadius: '4px' }}>.proto</code> 정의부터 실제 RPC 호출까지의 전체 흐름입니다.
            </div>
            <div className="grpc-anim-arena">
              {/* Proto File */}
              <div className="grpc-anim-col">
                <div className="grpc-anim-icon" style={{ background: step >= 1 ? 'rgba(6,182,212,0.15)' : 'rgba(6,182,212,0.06)', borderColor: '#06b6d4' }}>📄</div>
                <div className="grpc-anim-label" style={{ color: '#06b6d4' }}>.proto</div>
                <div className="grpc-anim-sub">스키마 정의</div>
              </div>

              {/* Proto → Code Gen */}
              <div className="grpc-anim-mid">
                <div className={`grpc-anim-arrow right ${step >= 2 ? 'show' : ''}`}>
                  <div className="grpc-anim-tip" style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>protoc</div>
                  <div className="grpc-anim-line" style={{ background: 'linear-gradient(90deg,#a855f7,rgba(168,85,247,0.3))' }} />
                  <div className="grpc-anim-arr-head" style={{ color: '#a855f7' }}>{'→'}</div>
                </div>
              </div>

              {/* Client Stub */}
              <div className="grpc-anim-col">
                <div className="grpc-anim-icon" style={{ background: step >= 3 ? 'rgba(59,130,246,0.15)' : 'rgba(59,130,246,0.06)', borderColor: '#3b82f6' }}>📱</div>
                <div className="grpc-anim-label" style={{ color: '#3b82f6' }}>Client Stub</div>
                <div className="grpc-anim-sub">자동 생성 코드</div>
              </div>

              {/* Client → Server */}
              <div className="grpc-anim-mid">
                <div className={`grpc-anim-arrow right ${step >= 4 ? 'show' : ''}`}>
                  <div className="grpc-anim-tip" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>Protobuf/HTTP2</div>
                  <div className="grpc-anim-line" style={{ background: 'linear-gradient(90deg,#f59e0b,rgba(245,158,11,0.3))' }} />
                  <div className="grpc-anim-arr-head" style={{ color: '#f59e0b' }}>{'→'}</div>
                </div>
                <div className={`grpc-anim-arrow left ${step >= 5 ? 'show' : ''}`}>
                  <div className="grpc-anim-tip" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>Response</div>
                  <div className="grpc-anim-line" style={{ background: 'linear-gradient(90deg,rgba(34,197,94,0.3),#22c55e)' }} />
                  <div className="grpc-anim-arr-head" style={{ color: '#22c55e' }}>{'←'}</div>
                </div>
              </div>

              {/* Server */}
              <div className="grpc-anim-col">
                <div className="grpc-anim-icon" style={{ background: step >= 5 ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.06)', borderColor: '#22c55e' }}>🖧</div>
                <div className="grpc-anim-label" style={{ color: '#22c55e' }}>Server</div>
                <div className="grpc-anim-sub">비즈니스 로직</div>
              </div>
            </div>

            <AnimationControls color="#06b6d4" status={status} onPlay={play} onReset={handleReset} />
            {/* 단계별 흐름 */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: '.proto 파일에 서비스(RPC 메서드)와 메시지(데이터 구조) 정의', color: '#06b6d4' },
                  { num: '②', text: 'protoc 컴파일러로 클라이언트 Stub과 서버 인터페이스 코드 자동 생성', color: '#a855f7' },
                  { num: '③', text: '클라이언트가 Stub의 메서드를 로컬 함수처럼 호출', color: '#3b82f6' },
                  { num: '④', text: '요청 데이터를 Protobuf로 직렬화 → HTTP/2 바이너리 프레임으로 전송', color: '#f59e0b' },
                  { num: '⑤', text: '서버가 역직렬화 후 처리하고, 응답을 같은 방식으로 반환', color: '#22c55e' },
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

        {/* 4가지 스트리밍 패턴 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>gRPC 4가지 통신 패턴</SectionTitle>
          <div className="grpc-stream-grid">
            {[
              {
                badge: 'Unary', badgeColor: '#3b82f6', badgeBg: 'rgba(59,130,246,0.12)',
                title: 'Unary RPC', color: '#3b82f6',
                desc: '가장 기본적인 요청-응답 패턴입니다. REST의 일반적인 API 호출과 유사합니다.',
                visual: 'Client ──Request──→ Server\nClient ←──Response── Server',
              },
              {
                badge: 'Server Stream', badgeColor: '#22c55e', badgeBg: 'rgba(34,197,94,0.12)',
                title: 'Server Streaming', color: '#22c55e',
                desc: '클라이언트가 하나의 요청을 보내면, 서버가 여러 개의 응답을 스트림으로 보냅니다.',
                visual: 'Client ──Request──→ Server\nClient ←──Data 1─── Server\nClient ←──Data 2─── Server\nClient ←──Data N─── Server',
              },
              {
                badge: 'Client Stream', badgeColor: '#f59e0b', badgeBg: 'rgba(245,158,11,0.12)',
                title: 'Client Streaming', color: '#f59e0b',
                desc: '클라이언트가 여러 개의 메시지를 스트림으로 보내고, 서버가 하나의 응답을 반환합니다.',
                visual: 'Client ──Data 1──→ Server\nClient ──Data 2──→ Server\nClient ──Data N──→ Server\nClient ←──Response── Server',
              },
              {
                badge: 'Bidirectional', badgeColor: '#a855f7', badgeBg: 'rgba(168,85,247,0.12)',
                title: 'Bidirectional Streaming', color: '#a855f7',
                desc: '클라이언트와 서버가 동시에 스트림을 주고받습니다. 채팅, 실시간 게임 등에 적합합니다.',
                visual: 'Client ──Data──→ Server\nClient ←──Data── Server\nClient ──Data──→ Server\nClient ←──Data── Server\n(동시에 양방향 전송)',
              },
            ].map((s) => (
              <div key={s.badge} className="grpc-stream" style={{ borderTop: `2px solid ${s.color}` }}>
                <div className="grpc-stream-badge" style={{ color: s.badgeColor, background: s.badgeBg }}>{s.badge}</div>
                <div className="grpc-stream-title" style={{ color: s.color }}>{s.title}</div>
                <div className="grpc-stream-desc">{s.desc}</div>
                <div className="grpc-stream-visual">
                  {s.visual.split('\n').map((line, i) => <div key={i}>{line}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 사용 사례 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>언제 REST, 언제 gRPC?</SectionTitle>
          <div className="grpc-usecase-grid">
            <div className="grpc-usecase" style={{ borderLeft: '3px solid #f59e0b' }}>
              <h4 style={{ color: '#f59e0b' }}>REST가 적합한 경우</h4>
              <div className="grpc-usecase-items">
                {[
                  ['🌐', '브라우저 → 서버 통신 (프론트엔드 API)'],
                  ['📖', '공개 API (외부 개발자용)'],
                  ['🔍', 'CRUD 중심의 리소스 관리'],
                  ['🛠️', '간단한 요청-응답 패턴'],
                  ['📱', '모바일 앱 → 서버 (범용)'],
                  ['📝', '사람이 읽을 수 있는 응답이 필요할 때'],
                ].map(([emoji, text]) => (
                  <div key={text} className="grpc-ui-item"><span style={{ fontSize: '16px' }}>{emoji}</span><span style={{ fontSize: '12px' }}>{text}</span></div>
                ))}
              </div>
            </div>
            <div className="grpc-usecase" style={{ borderLeft: '3px solid #06b6d4' }}>
              <h4 style={{ color: '#06b6d4' }}>gRPC가 적합한 경우</h4>
              <div className="grpc-usecase-items">
                {[
                  ['🔗', '마이크로서비스 간 내부 통신'],
                  ['⚡', '저지연·고성능이 필요한 서비스'],
                  ['📡', '실시간 스트리밍 (양방향 데이터)'],
                  ['🌍', '다국어 서비스 (Java↔Go↔Python)'],
                  ['📊', '대량 데이터 전송 (바이너리 효율)'],
                  ['📋', '엄격한 API 계약이 필요할 때'],
                ].map(([emoji, text]) => (
                  <div key={text} className="grpc-ui-item"><span style={{ fontSize: '16px' }}>{emoji}</span><span style={{ fontSize: '12px' }}>{text}</span></div>
                ))}
              </div>
            </div>
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>실무 패턴:</strong> 많은 기업이 <strong style={{ color: '#94a3b8' }}>외부 API는 REST, 내부 서비스 간 통신은 gRPC</strong>를 사용합니다. API Gateway에서 REST 요청을 받아 내부적으로 gRPC로 변환하는 패턴이 일반적입니다. Netflix, Google, Uber 등이 이 방식을 채택하고 있습니다.
          </HighlightBox>
        </div>

        {/* gRPC의 한계 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>gRPC의 한계와 주의점</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '14px' }}>
            {[
              { icon: '🌐', title: '브라우저 직접 호출 불가', desc: '브라우저는 HTTP/2 프레이밍을 직접 제어할 수 없습니다. gRPC-Web이나 Envoy 프록시를 통해 우회해야 합니다.', color: '#ef4444' },
              { icon: '👁️', title: '사람이 읽기 어려움', desc: 'Protobuf는 바이너리라 curl이나 브라우저로 바로 확인할 수 없습니다. 디버깅 시 grpcurl 같은 전용 도구가 필요합니다.', color: '#f59e0b' },
              { icon: '📚', title: '학습 곡선', desc: '.proto 문법, protoc 빌드 파이프라인, 스트리밍 패턴 등 REST보다 초기 학습 비용이 높습니다.', color: '#3b82f6' },
              { icon: '🔄', title: '로드밸런싱 복잡', desc: 'HTTP/2의 영속 연결 때문에 L7 로드밸런싱이 까다롭습니다. gRPC 인식 가능한 LB(Envoy, Linkerd)가 필요합니다.', color: '#a855f7' },
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
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '22%' }}>항목</th>
                  <th style={{ color: '#f59e0b' }}>REST</th>
                  <th style={{ color: '#06b6d4' }}>gRPC</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['설계 철학', '리소스 중심 (URI + HTTP 메서드)', '서비스/메서드 중심 (RPC)'],
                  ['데이터 포맷', 'JSON (텍스트, 사람 읽기 가능)', 'Protocol Buffers (바이너리)'],
                  ['프로토콜', 'HTTP/1.1 또는 HTTP/2', 'HTTP/2 (필수)'],
                  ['성능', '보통', '빠름 (직렬화 2~10x, 네트워크 효율)'],
                  ['스트리밍', '기본 미지원 (SSE, WebSocket 별도)', '4가지 패턴 네이티브 지원'],
                  ['코드 생성', '수동 또는 Swagger/OpenAPI', '자동 (protoc → 다국어 Stub)'],
                  ['브라우저', '네이티브 지원', 'gRPC-Web 프록시 필요'],
                  ['디버깅', 'curl, Postman으로 쉽게', 'grpcurl, BloomRPC 등 전용 도구'],
                  ['주 사용처', '외부 API, 프론트엔드 통신', 'MSA 내부 통신, 고성능 서비스'],
                ].map(([label, rest, grpc]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#fcd34d' }}>{rest}</td>
                    <td style={{ color: '#67e8f9' }}>{grpc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            { q: 'gRPC와 REST의 차이를 설명해주세요.', a: 'REST는 리소스(URI)를 HTTP 메서드(GET/POST/PUT/DELETE)로 조작하는 아키텍처 스타일이고, gRPC는 원격 메서드를 직접 호출하는 RPC 프레임워크입니다. REST는 JSON 텍스트 기반으로 브라우저에서 바로 사용 가능하지만, gRPC는 Protocol Buffers 바이너리와 HTTP/2를 사용하여 2~10배 빠른 직렬화와 양방향 스트리밍을 지원합니다. 외부 API는 REST, 마이크로서비스 간 내부 통신은 gRPC가 일반적입니다.' },
            { q: 'Protocol Buffers가 JSON보다 빠른 이유는?', a: 'Protobuf는 필드 이름 대신 필드 번호(1, 2, 3)를 사용하고, 바이너리로 인코딩하여 JSON 대비 크기가 약 2~10배 작습니다. 직렬화/역직렬화 시 문자열 파싱이 필요 없고, 스키마가 미리 정의되어 있어 타입 체크도 빠릅니다. 네트워크 전송량이 줄어들고, CPU 사용량도 적습니다.' },
            { q: 'gRPC의 4가지 통신 패턴을 설명해주세요.', a: 'Unary는 1:1 요청-응답으로 REST와 유사합니다. Server Streaming은 하나의 요청에 서버가 여러 응답을 스트림으로 보냅니다(검색 결과 점진적 전송). Client Streaming은 클라이언트가 여러 데이터를 보내고 서버가 하나로 응답합니다(파일 업로드). Bidirectional Streaming은 양쪽이 동시에 스트림을 주고받습니다(채팅, 실시간 게임).' },
            { q: 'gRPC를 브라우저에서 사용할 수 없는 이유와 해결 방법은?', a: '브라우저의 Fetch/XHR API는 HTTP/2의 바이너리 프레이밍을 직접 제어할 수 없고, gRPC에 필요한 HTTP/2 트레일러를 지원하지 않습니다. 해결 방법으로는 gRPC-Web이 있습니다. Envoy 같은 프록시가 gRPC-Web 요청을 표준 gRPC로 변환합니다. 또는 API Gateway에서 REST→gRPC 변환을 수행하는 패턴도 널리 사용됩니다.' },
            { q: 'MSA 환경에서 gRPC 도입 시 고려사항은?', a: '먼저 .proto 파일 관리 전략이 필요합니다. 중앙 저장소(Proto Registry)에서 스키마를 관리하고 CI/CD로 배포합니다. 로드밸런싱은 HTTP/2 영속 연결 때문에 gRPC 인식 가능한 LB(Envoy, Linkerd)를 사용해야 합니다. 디버깅이 어려우므로 grpcurl, 분산 추적(Jaeger) 등 도구를 갖춰야 합니다. 하위 호환성을 위해 proto 필드 번호를 재사용하지 않고, deprecated 필드는 reserved로 처리합니다.' },
          ]} />
        </div>
      </div>
    </>
  )
}

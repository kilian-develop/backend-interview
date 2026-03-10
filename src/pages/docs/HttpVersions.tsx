import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import AnimationControls from '../../components/doc/AnimationControls'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup, DiagramGrid } from '../../components/doc/Diagram'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.hv-timeline { position:relative; padding-left:32px; }
.hv-timeline::before { content:''; position:absolute; left:11px; top:0; bottom:0; width:2px; background:linear-gradient(to bottom,#94a3b8,#06b6d4,#3b82f6,#a855f7,#22c55e); border-radius:2px; }
.hv-item { position:relative; margin-bottom:20px; }
.hv-dot { position:absolute; left:-32px; top:6px; width:22px; height:22px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.hv-card { background:#0e1118; border:1px solid #1a2234; border-radius:16px; overflow:hidden; transition:box-shadow .2s; }
.hv-card:hover { box-shadow:0 6px 24px rgba(6,182,212,0.08); }
.hv-card-toggle { width:100%; display:flex; align-items:center; gap:12px; padding:20px 24px; background:none; border:none; cursor:pointer; text-align:left; flex-wrap:wrap; }
.hv-card-toggle:hover { background:rgba(255,255,255,0.015); }
.hv-ver { font-size:20px; font-weight:900; font-family:'JetBrains Mono',monospace; }
.hv-year { font-size:11px; font-family:'JetBrains Mono',monospace; padding:3px 10px; border-radius:20px; }
.hv-card-summary { flex:1; font-size:12px; color:#5a6a85; line-height:1.6; min-width:200px; }
.hv-chevron { flex-shrink:0; font-size:16px; color:#5a6a85; transition:transform .25s ease; margin-left:auto; }
.hv-chevron.open { transform:rotate(180deg); }
.hv-card-body { max-height:0; overflow:hidden; transition:max-height .35s ease, opacity .25s ease; opacity:0; }
.hv-card-body.open { max-height:4000px; opacity:1; }
.hv-card-content { padding:0 24px 24px; border-top:1px solid #1a2234; }
.hv-card-desc { font-size:13px; color:#94a3b8; line-height:1.8; margin:16px 0; }
.hv-features { display:flex; flex-direction:column; gap:8px; }
.hv-feat { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.6; }
.hv-feat-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.hv-deep { margin-top:20px; display:flex; flex-direction:column; gap:14px; }
.hv-deep-card { background:rgba(255,255,255,0.015); border:1px solid #1a2234; border-radius:12px; padding:18px 20px; }
.hv-deep-title { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:10px; display:flex; align-items:center; gap:8px; }
.hv-deep-body { font-size:12px; color:#94a3b8; line-height:1.9; }
.hv-deep-body strong { color:#cbd5e1; font-weight:600; }
.hv-deep-diagram { margin:12px 0; padding:14px 16px; background:#080b11; border:1px solid #1a2234; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:11px; line-height:1.8; color:#64748b; white-space:pre; overflow-x:auto; }
.hv-deep-diagram .hl { font-weight:700; }
.hv-badge { display:inline-block; font-size:10px; font-weight:700; padding:2px 8px; border-radius:4px; font-family:'JetBrains Mono',monospace; margin-left:8px; }
.hv-expand-all { display:flex; justify-content:flex-end; margin-bottom:12px; }
.hv-expand-all button { background:rgba(255,255,255,0.03); border:1px solid #1a2234; border-radius:8px; padding:6px 14px; font-size:11px; color:#5a6a85; font-family:'JetBrains Mono',monospace; cursor:pointer; transition:all .2s; }
.hv-expand-all button:hover { border-color:rgba(59,130,246,0.3); color:#94a3b8; }
.hv-compare-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; margin-bottom:48px; }
.hv-cmp-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.hv-cmp-card h4 { font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.hv-cmp-list { display:flex; flex-direction:column; gap:6px; }
.hv-cmp-item { font-size:12px; color:#5a6a85; line-height:1.7; padding:6px 10px; background:rgba(255,255,255,0.02); border-radius:6px; }
.hv-mux-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:16px; }
@media(max-width:640px){ .hv-mux-grid{ grid-template-columns:1fr; } }
.hv-mux-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.hv-mux-box h4 { font-size:16px; font-weight:900; margin-bottom:6px; font-family:'JetBrains Mono',monospace; }
.hv-mux-box .hv-mux-sub { font-size:11px; color:#5a6a85; margin-bottom:20px; }
.hv-mux-timeline { display:flex; flex-direction:column; gap:14px; }
.hv-mux-row { display:flex; align-items:center; gap:10px; }
.hv-mux-label { flex-shrink:0; width:48px; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; text-align:right; }
.hv-mux-track { flex:1; height:28px; background:rgba(255,255,255,0.03); border-radius:6px; position:relative; overflow:hidden; }
.hv-mux-bar { position:absolute; top:0; left:0; height:100%; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; color:rgba(255,255,255,0.9); width:0%; transition:width 0.05s linear; }
.hv-mux-bar.hv-req { opacity:0.7; }
.hv-mux-bar.hv-res { opacity:1; }
.hv-mux-total { margin-top:16px; text-align:center; font-size:13px; font-family:'JetBrains Mono',monospace; padding:10px; background:rgba(255,255,255,0.02); border-radius:8px; }
.hv-mux-total span { font-weight:900; }
`

interface DeepDive {
  title: string
  color: string
  badge?: string
  badgeColor?: string
  body: React.ReactNode
}

interface VersionData {
  ver: string
  year: string
  color: string
  summary: string
  desc: string
  features: [string, string][]
  deepDives: DeepDive[]
}

const versions: VersionData[] = [
  {
    ver: 'HTTP/0.9', year: '1991', color: '#94a3b8',
    summary: '최초의 한 줄짜리 프로토콜',
    desc: '최초의 HTTP. 단 한 줄의 요청(GET /page)만 가능했던 극히 단순한 프로토콜입니다.',
    features: [
      ['📄', 'GET 메서드만 지원 — 리소스를 가져오는 것만 가능'],
      ['🚫', '헤더 없음 — Content-Type, Status Code 등 메타데이터 전달 불가'],
      ['📝', 'HTML만 응답 가능 — 이미지, CSS 등 다른 리소스 전송 불가'],
      ['🔌', '연결 즉시 종료 — 요청 1개당 TCP 연결 1개'],
    ],
    deepDives: [
      {
        title: '요청-응답 구조', color: '#94a3b8',
        body: (
          <>
            HTTP/0.9는 헤더도, 상태 코드도 없이 <strong>오직 GET만</strong> 가능한 프로토콜이었습니다.
            <CodeBlock title="HTTP/0.9 요청-응답" lang="http">{`Client → Server:  GET /index.html

Server → Client:  <html>Hello World</html>
                  (연결 즉시 종료)`}</CodeBlock>
            응답에는 상태 코드가 없으므로, 문서가 정상적으로 전달되었는지 클라이언트가 판단할 방법이 없었습니다. 오류 발생 시에도 HTML 형태의 에러 메시지를 본문에 포함하는 것이 유일한 방법이었습니다.
          </>
        ),
      },
    ],
  },
  {
    ver: 'HTTP/1.0', year: '1996', color: '#06b6d4',
    summary: '헤더와 상태 코드의 도입',
    desc: '헤더 개념이 도입되어 메타데이터를 주고받을 수 있게 되었고, 다양한 콘텐츠 타입을 지원하기 시작했습니다.',
    features: [
      ['📋', 'HTTP 헤더 도입 — Content-Type, Content-Length 등 메타데이터 전달'],
      ['🔢', '상태 코드 도입 — 200 OK, 404 Not Found 등 응답 상태 구분'],
      ['📦', 'POST, HEAD 메서드 추가'],
      ['🖼️', '다양한 콘텐츠 타입 — HTML 외에 이미지, 스타일시트 등 전송 가능'],
      ['🔌', '여전히 요청마다 TCP 연결 수립/종료 (비효율적)'],
    ],
    deepDives: [
      {
        title: 'Short-lived Connection 문제', color: '#06b6d4',
        badge: '성능 병목', badgeColor: '#ef4444',
        body: (
          <>
            하나의 웹 페이지를 로드하려면 HTML, CSS, JS, 이미지 등 <strong>수십 개의 리소스</strong>가 필요합니다. HTTP/1.0에서는 리소스마다 TCP 연결을 새로 수립해야 했습니다.
            <DiagramContainer title="HTTP/1.0 — 매 요청마다 새 TCP 연결">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                <DiagramGroup label="요청 1" color="#06b6d4">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#06b6d4" />
                      <DiagramArrow label="TCP 연결 (SYN/SYN-ACK/ACK)" color="#06b6d4" />
                      <DiagramNode icon="🖥️" label="Server" color="#06b6d4" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#06b6d4" />
                      <DiagramArrow label="GET /index.html" color="#06b6d4" />
                      <DiagramNode icon="🖥️" label="Server" color="#06b6d4" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="🖥️" label="Server" color="#06b6d4" />
                      <DiagramArrow label="응답 (HTML)" color="#06b6d4" dashed />
                      <DiagramNode icon="💻" label="Client" color="#06b6d4" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#ef4444" />
                      <DiagramArrow label="TCP 종료" color="#ef4444" dashed />
                      <DiagramNode icon="🖥️" label="Server" color="#ef4444" />
                    </DiagramFlow>
                  </div>
                </DiagramGroup>
                <DiagramGroup label="요청 2" color="#06b6d4">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#06b6d4" />
                      <DiagramArrow label="TCP 연결" color="#06b6d4" />
                      <DiagramNode icon="🖥️" label="Server" color="#06b6d4" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#06b6d4" />
                      <DiagramArrow label="GET /style.css" color="#06b6d4" />
                      <DiagramNode icon="🖥️" label="Server" color="#06b6d4" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="🖥️" label="Server" color="#06b6d4" />
                      <DiagramArrow label="응답 (CSS)" color="#06b6d4" dashed />
                      <DiagramNode icon="💻" label="Client" color="#06b6d4" />
                    </DiagramFlow>
                    <DiagramFlow>
                      <DiagramNode icon="💻" label="Client" color="#ef4444" />
                      <DiagramArrow label="TCP 종료" color="#ef4444" dashed />
                      <DiagramNode icon="🖥️" label="Server" color="#ef4444" />
                    </DiagramFlow>
                  </div>
                </DiagramGroup>
                <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--mono)', textAlign: 'center', padding: '4px 0' }}>
                  ... 10개 리소스마다 반복 / TCP 3-Way Handshake 10번 = RTT 누적 지연
                </div>
              </div>
            </DiagramContainer>
            TCP 연결 수립에는 <strong>3-Way Handshake</strong>(SYN → SYN-ACK → ACK)가 필요하고, 이것만으로 1 RTT가 소모됩니다. 리소스가 많을수록 이 오버헤드가 쌓여 페이지 로딩이 느려지는 근본 원인이 되었습니다.
          </>
        ),
      },
    ],
  },
  {
    ver: 'HTTP/1.1', year: '1997', color: '#3b82f6',
    summary: 'Keep-Alive, 파이프라이닝, 캐싱 — 현재까지 가장 널리 사용',
    desc: '현재까지도 가장 널리 사용되는 버전. 지속 연결과 파이프라이닝으로 성능이 크게 개선되었습니다.',
    features: [
      ['🔗', 'Keep-Alive 기본 활성화 — 하나의 TCP 연결로 여러 요청 처리 (Persistent Connection)'],
      ['📡', 'Pipelining 지원 — 응답을 기다리지 않고 여러 요청을 연속 전송'],
      ['🏷️', 'Host 헤더 필수 — 하나의 IP에 여러 도메인 호스팅 (가상 호스팅)'],
      ['📦', 'Chunked Transfer Encoding — 데이터를 청크 단위로 스트리밍 전송'],
      ['💾', 'Cache-Control, ETag 등 정교한 캐싱 메커니즘 도입'],
      ['⚠️', 'HOL(Head-of-Line) Blocking — 앞선 요청이 지연되면 뒤의 요청도 대기'],
    ],
    deepDives: [
      {
        title: 'Persistent Connection (Keep-Alive)', color: '#3b82f6',
        body: (
          <>
            HTTP/1.0의 Short-lived Connection 문제를 해결하기 위해, <strong>하나의 TCP 연결을 재사용</strong>하여 여러 요청-응답을 처리합니다.
            <DiagramGrid cols={2}>
              <DiagramContainer title="HTTP/1.0 (매번 새 연결)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  {['요청1', '요청2', '요청3'].map((req, i) => (
                    <DiagramGroup key={i} color="#06b6d4">
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                        <DiagramFlow>
                          <DiagramNode label="Client" color="#06b6d4" />
                          <DiagramArrow label={`TCP + ${req}`} color="#06b6d4" />
                          <DiagramNode label="Server" color="#06b6d4" />
                        </DiagramFlow>
                        <DiagramFlow>
                          <DiagramNode label="Server" color="#06b6d4" />
                          <DiagramArrow label={`응답${i + 1}`} color="#06b6d4" dashed />
                          <DiagramNode label="Client" color="#06b6d4" />
                        </DiagramFlow>
                        <div style={{ fontSize: '9px', color: '#ef4444', fontFamily: 'var(--mono)' }}>TCP 종료</div>
                      </div>
                    </DiagramGroup>
                  ))}
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--mono)' }}>핸드셰이크 3번</div>
                </div>
              </DiagramContainer>
              <DiagramContainer title="HTTP/1.1 (Keep-Alive)">
                <DiagramGroup label="TCP 연결 (1번만)" color="#3b82f6">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                    {[1, 2, 3].map((n) => (
                      <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                        <DiagramFlow>
                          <DiagramNode label="Client" color="#3b82f6" />
                          <DiagramArrow label={`요청${n}`} color="#3b82f6" />
                          <DiagramNode label="Server" color="#3b82f6" />
                        </DiagramFlow>
                        <DiagramFlow>
                          <DiagramNode label="Server" color="#3b82f6" />
                          <DiagramArrow label={`응답${n}`} color="#3b82f6" dashed />
                          <DiagramNode label="Client" color="#3b82f6" />
                        </DiagramFlow>
                      </div>
                    ))}
                    <div style={{ fontSize: '9px', color: '#64748b', fontFamily: 'var(--mono)' }}>일정 시간 후 TCP 종료</div>
                  </div>
                </DiagramGroup>
                <div style={{ fontSize: '10px', color: '#22c55e', fontFamily: 'var(--mono)', textAlign: 'center', marginTop: '8px' }}>핸드셰이크 1번</div>
              </DiagramContainer>
            </DiagramGrid>
            TCP 연결 수립 오버헤드를 줄여 성능을 크게 개선했지만, 하나의 연결에서 요청-응답이 <strong>여전히 순차적</strong>으로 처리된다는 한계가 있었습니다. 브라우저는 이를 보완하기 위해 <strong>도메인당 최대 6개의 TCP 연결</strong>을 동시에 열어 병렬성을 확보했습니다.
          </>
        ),
      },
      {
        title: 'Pipelining (파이프라이닝)', color: '#3b82f6',
        badge: '이론 vs 현실', badgeColor: '#f59e0b',
        body: (
          <>
            응답을 기다리지 않고 <strong>여러 요청을 연속으로 전송</strong>하는 기법입니다. 서버 입장에서는 요청을 미리 받아둘 수 있어 처리 효율이 높아져야 했습니다.
            <DiagramGrid cols={2}>
              <DiagramContainer title="Without Pipelining">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  {[1, 2, 3].map((n) => (
                    <div key={n} style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      <DiagramFlow>
                        <DiagramNode label="Client" color="#3b82f6" />
                        <DiagramArrow label={`Req${n}`} color="#3b82f6" />
                        <DiagramNode label="Server" color="#3b82f6" />
                      </DiagramFlow>
                      <DiagramFlow>
                        <DiagramNode label="Server" color="#3b82f6" />
                        <DiagramArrow label={`Res${n}`} color="#3b82f6" dashed />
                        <DiagramNode label="Client" color="#3b82f6" />
                      </DiagramFlow>
                    </div>
                  ))}
                  <div style={{ fontSize: '9px', color: '#64748b', fontFamily: 'var(--mono)' }}>응답을 받아야 다음 요청</div>
                </div>
              </DiagramContainer>
              <DiagramContainer title="With Pipelining">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <DiagramFlow>
                    <DiagramNode label="Client" color="#22c55e" />
                    <DiagramArrow label="Req1" color="#22c55e" />
                    <DiagramNode label="Server" color="#22c55e" />
                  </DiagramFlow>
                  <DiagramFlow>
                    <DiagramNode label="Client" color="#22c55e" />
                    <DiagramArrow label="Req2 (응답 안 기다림)" color="#22c55e" />
                    <DiagramNode label="Server" color="#22c55e" />
                  </DiagramFlow>
                  <DiagramFlow>
                    <DiagramNode label="Client" color="#22c55e" />
                    <DiagramArrow label="Req3" color="#22c55e" />
                    <DiagramNode label="Server" color="#22c55e" />
                  </DiagramFlow>
                  <DiagramFlow>
                    <DiagramNode label="Server" color="#22c55e" />
                    <DiagramArrow label="Res1" color="#22c55e" dashed />
                    <DiagramNode label="Client" color="#22c55e" />
                  </DiagramFlow>
                  <DiagramFlow>
                    <DiagramNode label="Server" color="#22c55e" />
                    <DiagramArrow label="Res2 (FIFO)" color="#22c55e" dashed />
                    <DiagramNode label="Client" color="#22c55e" />
                  </DiagramFlow>
                  <DiagramFlow>
                    <DiagramNode label="Server" color="#22c55e" />
                    <DiagramArrow label="Res3" color="#22c55e" dashed />
                    <DiagramNode label="Client" color="#22c55e" />
                  </DiagramFlow>
                  <div style={{ fontSize: '9px', color: '#64748b', fontFamily: 'var(--mono)' }}>응답은 요청 순서대로 (FIFO)</div>
                </div>
              </DiagramContainer>
            </DiagramGrid>
            <strong>그러나 현실에서는 거의 사용되지 않습니다.</strong> 핵심 문제는 응답이 반드시 <strong>요청 순서대로(FIFO)</strong> 돌아와야 한다는 점입니다. Req1의 처리가 느려지면 Req2, Req3의 응답이 이미 준비되어 있어도 대기해야 합니다 — 이것이 바로 <strong>HOL Blocking</strong>입니다. 또한 프록시 서버 호환성 문제, 구현 복잡성, 비멱등 요청(POST) 처리 문제 등으로 <strong>대부분의 브라우저에서 기본 비활성화</strong>되어 있습니다.
          </>
        ),
      },
      {
        title: 'HOL(Head-of-Line) Blocking', color: '#ef4444',
        badge: 'HTTP/2 등장 배경', badgeColor: '#a855f7',
        body: (
          <>
            <strong>"줄의 맨 앞(Head)이 막히면 뒤(Line)가 전부 대기"</strong>하는 현상입니다. 식당 줄에서 맨 앞 사람이 주문을 오래 고민하면 뒤 사람 모두가 기다려야 하는 것과 같습니다.
            <DiagramContainer title="HTTP/1.1 HOL Blocking 시나리오">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <DiagramFlow>
                  <DiagramNode icon="💻" label="Client" color="#3b82f6" />
                  <DiagramArrow label="Req1 (이미지 10MB)" color="#3b82f6" />
                  <DiagramNode icon="🖥️" label="Server" color="#3b82f6" />
                </DiagramFlow>
                <DiagramFlow>
                  <DiagramNode icon="💻" label="Client" color="#3b82f6" />
                  <DiagramArrow label="Req2 (CSS 2KB)" color="#3b82f6" />
                  <DiagramNode icon="🖥️" label="Server" color="#3b82f6" />
                </DiagramFlow>
                <DiagramFlow>
                  <DiagramNode icon="💻" label="Client" color="#3b82f6" />
                  <DiagramArrow label="Req3 (JS 5KB)" color="#3b82f6" />
                  <DiagramNode icon="🖥️" label="Server" color="#3b82f6" />
                </DiagramFlow>
                <DiagramGroup label="Res1: 10MB 전송중... (3초)" color="#ef4444">
                  <DiagramFlow>
                    <DiagramNode icon="🖥️" label="Server" color="#ef4444" />
                    <DiagramArrow label="Res1 (10MB, 3초)" color="#ef4444" dashed />
                    <DiagramNode icon="💻" label="Client" color="#ef4444" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramGroup label="즉시 가능하지만 Res1 대기" color="#ef4444">
                  <DiagramFlow>
                    <DiagramNode icon="🖥️" label="Server" color="#f59e0b" />
                    <DiagramArrow label="Res2 (2KB CSS)" color="#f59e0b" dashed />
                    <DiagramNode icon="💻" label="Client" color="#f59e0b" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramGroup label="Res1,Res2 완료까지 대기" color="#ef4444">
                  <DiagramFlow>
                    <DiagramNode icon="🖥️" label="Server" color="#f59e0b" />
                    <DiagramArrow label="Res3 (5KB JS)" color="#f59e0b" dashed />
                    <DiagramNode icon="💻" label="Client" color="#f59e0b" />
                  </DiagramFlow>
                </DiagramGroup>
                <div style={{ fontSize: '10px', color: '#ef4444', fontFamily: 'var(--mono)', textAlign: 'center' }}>
                  CSS/JS는 즉시 응답 가능했지만 큰 이미지 뒤에서 3초 대기
                </div>
              </div>
            </DiagramContainer>
            이 문제를 회피하기 위해 실무에서 사용된 기법들:
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                '도메인 샤딩 (Domain Sharding) — 리소스를 여러 도메인에 분산하여 브라우저의 도메인당 연결 제한(6개)을 우회',
                '이미지 스프라이트 — 여러 작은 이미지를 하나로 합쳐 요청 수 자체를 줄임',
                'CSS/JS 번들링 — 여러 파일을 하나로 합쳐 요청 수 최소화',
                'Inline 리소스 — 작은 CSS/JS를 HTML에 직접 삽입',
              ].map((t, i) => (
                <div key={i} style={{ fontSize: '11px', color: '#94a3b8', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', lineHeight: 1.6 }}>
                  • {t}
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#94a3b8', lineHeight: 1.8 }}>
              이런 <strong>워크어라운드</strong>들은 근본적 해결이 아니며, 오히려 코드 복잡성과 캐싱 비효율을 유발했습니다. HTTP/2는 <strong>멀티플렉싱</strong>으로 이 문제를 근본적으로 해결합니다.
            </div>
          </>
        ),
      },
      {
        title: 'Chunked Transfer Encoding', color: '#3b82f6',
        body: (
          <>
            전체 응답 크기를 미리 알 수 없는 경우, 데이터를 <strong>청크(chunk) 단위로 쪼개서 스트리밍</strong> 전송하는 방식입니다.
            <CodeBlock title="Chunked Transfer Encoding" lang="http">{`Transfer-Encoding: chunked

Server → Client:
  4\\r\\n        ← 청크 크기 (16진수, 4바이트)
  Wiki\\r\\n     ← 청크 데이터
  7\\r\\n
  pedia i\\r\\n
  B\\r\\n
  n chunks.\\r\\n
  0\\r\\n        ← 마지막 청크 (크기 0 = 종료)
  \\r\\n`}</CodeBlock>
            동적으로 생성되는 콘텐츠(검색 결과, 실시간 로그 등)에서 <strong>Content-Length를 미리 계산하지 않고도</strong> 즉시 전송을 시작할 수 있어, 서버가 전체 응답을 버퍼링할 필요가 없습니다. 이 개념은 이후 HTTP/2의 스트리밍 프레임 전송으로 자연스럽게 발전했습니다.
          </>
        ),
      },
    ],
  },
  {
    ver: 'HTTP/2', year: '2015', color: '#a855f7',
    summary: '바이너리 프레이밍, 멀티플렉싱, HPACK — SPDY 기반',
    desc: 'Google의 SPDY 프로토콜을 기반으로 만들어진 대규모 성능 개선 버전. 바이너리 프레이밍으로 전환되었습니다.',
    features: [
      ['🔀', '멀티플렉싱 — 하나의 TCP 연결에서 여러 스트림을 동시 처리'],
      ['🗜️', '헤더 압축 (HPACK) — 반복되는 헤더를 압축하여 크기 대폭 절감'],
      ['📌', '서버 푸시 — 클라이언트 요청 없이 관련 리소스를 선제 전송 (deprecated)'],
      ['🔢', '바이너리 프레이밍 — 텍스트에서 바이너리로 전환'],
      ['⚡', '스트림 우선순위 — 중요 리소스를 먼저 전송'],
      ['⚠️', 'TCP 레벨 HOL Blocking은 여전히 존재'],
    ],
    deepDives: [
      {
        title: '바이너리 프레이밍 (Binary Framing Layer)', color: '#a855f7',
        body: (
          <>
            HTTP/1.x는 <strong>텍스트 기반 프로토콜</strong>이라 줄바꿈(\r\n)으로 헤더와 본문을 구분했습니다. HTTP/2는 이를 <strong>바이너리 프레임</strong>이라는 구조화된 단위로 바꿨습니다.
            <DiagramGrid cols={2}>
              <DiagramContainer title="HTTP/1.1 (텍스트)">
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', lineHeight: 1.8, color: '#94a3b8' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div><span style={{ color: '#c084fc' }}>GET</span> /page HTTP/1.1<span style={{ color: '#475569' }}>\r\n</span></div>
                    <div><span style={{ color: '#7dd3fc' }}>Host:</span> example.com<span style={{ color: '#475569' }}>\r\n</span></div>
                    <div><span style={{ color: '#7dd3fc' }}>Accept:</span> text/html<span style={{ color: '#475569' }}>\r\n</span></div>
                    <div style={{ color: '#475569' }}>\r\n</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px' }}>
                    <div style={{ color: '#ef4444' }}>{">"} 파싱 복잡, 공백 처리 모호</div>
                    <div style={{ color: '#ef4444' }}>{">"} 프레임 경계 불분명</div>
                    <div style={{ color: '#ef4444' }}>{">"} 멀티플렉싱 불가능</div>
                  </div>
                </div>
              </DiagramContainer>
              <DiagramContainer title="HTTP/2 (바이너리 프레임)">
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', lineHeight: 1.8, color: '#94a3b8' }}>
                  <div style={{ border: '1px solid #a855f7', borderRadius: '8px', padding: '10px 14px', marginBottom: '12px', background: 'rgba(168,85,247,0.05)' }}>
                    <div style={{ color: '#a855f7', fontWeight: 700, marginBottom: '4px' }}>HEADERS Frame</div>
                    <div><span style={{ color: '#64748b' }}>Length:</span> 24 &nbsp;<span style={{ color: '#64748b' }}>Type:</span> HEADERS</div>
                    <div><span style={{ color: '#64748b' }}>Flags:</span> 0x4 &nbsp;<span style={{ color: '#64748b' }}>Stream ID:</span> <span style={{ color: '#fbbf24' }}>1</span></div>
                    <div style={{ borderTop: '1px solid #1a2234', marginTop: '6px', paddingTop: '6px' }}>
                      <div><span style={{ color: '#c084fc' }}>:method</span> = GET</div>
                      <div><span style={{ color: '#c084fc' }}>:path</span> = /page</div>
                      <div><span style={{ color: '#c084fc' }}>host</span> = example.com</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px' }}>
                    <div style={{ color: '#22c55e' }}>{">"} 파싱 빠르고 정확</div>
                    <div style={{ color: '#22c55e' }}>{">"} 프레임 단위로 명확히 분리</div>
                    <div style={{ color: '#22c55e' }}>{">"} 스트림 ID로 인터리빙 가능</div>
                  </div>
                </div>
              </DiagramContainer>
            </DiagramGrid>
            각 프레임에는 <strong>Stream ID</strong>가 포함되어, 하나의 TCP 연결에서 여러 스트림의 프레임이 <strong>인터리빙(interleaving)</strong>되어도 어떤 요청/응답에 속하는지 구분할 수 있습니다. 이것이 멀티플렉싱의 기반입니다.
          </>
        ),
      },
      {
        title: '멀티플렉싱 (Multiplexing)', color: '#a855f7',
        badge: '핵심 개선', badgeColor: '#22c55e',
        body: (
          <>
            하나의 TCP 연결 위에서 <strong>여러 스트림(요청-응답 쌍)이 동시에</strong> 프레임 단위로 인터리빙되어 전송됩니다.
            <DiagramGrid cols={2}>
              <DiagramContainer title="HTTP/1.1 (6개 TCP 연결)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { name: 'TCP 1: style.css', active: true },
                    { name: 'TCP 2: app.js', active: true },
                    { name: 'TCP 3: logo.png', active: true },
                    { name: 'TCP 4: font.woff', active: true },
                    { name: 'TCP 5: 대기', active: false },
                    { name: 'TCP 6: 대기', active: false },
                  ].map((t, i) => (
                    <DiagramFlow key={i}>
                      <DiagramNode label={t.name} color={t.active ? '#3b82f6' : '#64748b'} />
                      {t.active && <><DiagramArrow color="#3b82f6" /><DiagramNode label="응답" color="#3b82f6" /></>}
                    </DiagramFlow>
                  ))}
                </div>
              </DiagramContainer>
              <DiagramContainer title="HTTP/2 (단일 TCP 연결)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <DiagramNode icon="🔗" label="하나의 TCP" color="#a855f7" />
                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                    <DiagramArrow vertical color="#a855f7" />
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <DiagramNode label="Stream 1" sub="H1 D1 D1" color="#a855f7" />
                    <DiagramNode label="Stream 3" sub="H3 D3 D3" color="#a855f7" />
                    <DiagramNode label="Stream 5" sub="H5 D5 D5 D5" color="#a855f7" />
                    <DiagramNode label="Stream 7" sub="H7 D7" color="#a855f7" />
                  </div>
                </div>
              </DiagramContainer>
            </DiagramGrid>
            <strong>TCP 연결을 하나만 쓰는 이유:</strong> TCP의 혼잡 제어(Congestion Control)는 연결 단위로 동작합니다. 6개의 연결이 각각 독립적으로 혼잡 제어를 하면 네트워크를 비효율적으로 사용하지만, 하나의 연결이 전체 대역폭을 효율적으로 활용하면서 스트림 단위로 분배하는 것이 더 최적입니다.
          </>
        ),
      },
      {
        title: 'HPACK 헤더 압축', color: '#a855f7',
        body: (
          <>
            HTTP 요청에는 Cookie, User-Agent, Accept 등 <strong>매번 반복되는 헤더</strong>가 포함됩니다. HTTP/1.1에서는 이 헤더가 수백 바이트~수 KB에 달해 불필요한 오버헤드가 컸습니다.
            <div style={{ margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* 1) Static Table */}
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#a855f7', fontFamily: 'var(--mono)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: 'rgba(168,85,247,0.15)', padding: '2px 8px', borderRadius: '4px' }}>1</span>
                  정적 테이블 (Static Table) — 61개 사전 정의 헤더
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--mono)', fontSize: '11px' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', borderBottom: '1px solid #1a2234', fontWeight: 600 }}>idx</th>
                        <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', borderBottom: '1px solid #1a2234', fontWeight: 600 }}>Header Name</th>
                        <th style={{ padding: '6px 12px', textAlign: 'left', color: '#64748b', borderBottom: '1px solid #1a2234', fontWeight: 600 }}>Header Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { idx: '2', name: ':method', value: 'GET' },
                        { idx: '4', name: ':path', value: '/' },
                        { idx: '8', name: ':status', value: '200' },
                      ].map((row, i) => (
                        <tr key={i}>
                          <td style={{ padding: '5px 12px', color: '#fbbf24', borderBottom: '1px solid rgba(26,34,52,0.5)' }}>{row.idx}</td>
                          <td style={{ padding: '5px 12px', color: '#c084fc', borderBottom: '1px solid rgba(26,34,52,0.5)' }}>{row.name}</td>
                          <td style={{ padding: '5px 12px', color: '#94a3b8', borderBottom: '1px solid rgba(26,34,52,0.5)' }}>{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: '8px', fontSize: '10px', color: '#22c55e', fontFamily: 'var(--mono)' }}>
                  {">"} ":method: GET" 대신 인덱스 2만 전송 (1바이트)
                </div>
              </div>
              {/* 2) Dynamic Table */}
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#a855f7', fontFamily: 'var(--mono)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: 'rgba(168,85,247,0.15)', padding: '2px 8px', borderRadius: '4px' }}>2</span>
                  동적 테이블 (Dynamic Table) — 연결 중 학습
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#64748b' }}>첫 번째 요청:</span>
                    <span style={{ color: '#cbd5e1', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: '4px' }}>cookie: session=abc123</span>
                    <span style={{ color: '#64748b' }}>{"→"}</span>
                    <span style={{ color: '#ef4444' }}>풀 전송</span>
                    <span style={{ color: '#64748b' }}>+</span>
                    <span style={{ color: '#22c55e' }}>테이블 등록</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#64748b' }}>두 번째 요청:</span>
                    <span style={{ color: '#fbbf24', background: 'rgba(251,191,36,0.08)', padding: '2px 8px', borderRadius: '4px' }}>인덱스 62</span>
                    <span style={{ color: '#64748b' }}>{"→"}</span>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>1바이트만 전송</span>
                  </div>
                </div>
              </div>
              {/* 3) Huffman Encoding */}
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#a855f7', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: 'rgba(168,85,247,0.15)', padding: '2px 8px', borderRadius: '4px' }}>3</span>
                  허프만 인코딩 — 자주 쓰이는 문자를 짧은 비트로 인코딩
                </div>
              </div>
            </div>
            실측 데이터에 따르면 헤더 크기가 <strong>85~90% 감소</strong>합니다. 특히 쿠키가 큰 경우(인증 토큰 등) 효과가 극대화됩니다.
          </>
        ),
      },
      {
        title: 'TCP 레벨 HOL Blocking', color: '#ef4444',
        badge: 'HTTP/3 등장 배경', badgeColor: '#22c55e',
        body: (
          <>
            HTTP/2는 HTTP 레벨의 HOL Blocking은 해결했지만, <strong>TCP 자체의 순서 보장 특성</strong>에 의한 HOL Blocking이 여전히 남아 있습니다.
            <DiagramContainer title="HTTP/2 멀티플렉싱 중 패킷 손실 발생">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <DiagramFlow>
                  <DiagramNode icon="🖥️" label="Server" color="#a855f7" />
                  <DiagramArrow label="S1 패킷A" color="#a855f7" />
                  <DiagramNode label="TCP 스트림" color="#a855f7" />
                </DiagramFlow>
                <DiagramFlow>
                  <DiagramNode icon="🖥️" label="Server" color="#ef4444" />
                  <DiagramArrow label="S1 패킷B (손실!)" color="#ef4444" dashed />
                  <DiagramNode label="TCP 스트림" color="#ef4444" />
                </DiagramFlow>
                <DiagramFlow>
                  <DiagramNode icon="🖥️" label="Server" color="#a855f7" />
                  <DiagramArrow label="S3 패킷C, D" color="#a855f7" />
                  <DiagramNode label="TCP 스트림" color="#a855f7" />
                </DiagramFlow>
                <DiagramFlow>
                  <DiagramNode icon="🖥️" label="Server" color="#a855f7" />
                  <DiagramArrow label="S5 패킷E" color="#a855f7" />
                  <DiagramNode label="TCP 스트림" color="#a855f7" />
                </DiagramFlow>
                <DiagramGroup label="TCP 순서 보장: B가 없으므로 C, D, E도 전달 불가" color="#ef4444">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                    <DiagramFlow>
                      <DiagramNode label="TCP 스트림" color="#ef4444" />
                      <DiagramArrow label="패킷A만 전달 가능" color="#ef4444" dashed />
                      <DiagramNode icon="💻" label="Client" color="#ef4444" />
                    </DiagramFlow>
                    <div style={{ fontSize: '10px', color: '#ef4444', fontFamily: 'var(--mono)' }}>B 재전송 대기중... 전부 차단</div>
                  </div>
                </DiagramGroup>
                <DiagramFlow>
                  <DiagramNode icon="🖥️" label="Server" color="#22c55e" />
                  <DiagramArrow label="패킷B (재전송)" color="#22c55e" />
                  <DiagramNode label="TCP 스트림" color="#22c55e" />
                  <DiagramArrow label="A,B,C,D,E 일괄" color="#22c55e" />
                  <DiagramNode icon="💻" label="Client" color="#22c55e" />
                </DiagramFlow>
                <div style={{ fontSize: '10px', color: '#ef4444', fontFamily: 'var(--mono)', textAlign: 'center' }}>
                  Stream 3, 5는 패킷 손실과 무관하지만 함께 차단
                </div>
              </div>
            </DiagramContainer>
            이 문제는 <strong>TCP의 근본적 설계</strong>(순서 보장, 바이트 스트림 추상화) 때문에 TCP 위에서는 해결이 불가능합니다. 특히 <strong>모바일/무선 환경</strong>에서 패킷 손실률이 2%만 되어도 HTTP/2의 성능이 HTTP/1.1(6개 연결)보다 오히려 떨어질 수 있습니다. 이것이 HTTP/3가 <strong>TCP를 버리고 QUIC(UDP 기반)</strong>을 택한 핵심 동기입니다.
          </>
        ),
      },
      {
        title: '서버 푸시 (Server Push) — deprecated', color: '#64748b',
        body: (
          <>
            클라이언트가 요청하지 않은 리소스를 서버가 <strong>선제적으로 전송</strong>하는 기능입니다. HTML을 요청하면, HTML 안에 참조된 CSS/JS를 서버가 미리 보내는 방식이었습니다.
            <div style={{ margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Server Push Flow */}
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', lineHeight: 2, color: '#94a3b8' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={{ color: '#7dd3fc', fontWeight: 700 }}>Client:</span> <span style={{ color: '#c084fc' }}>GET</span> /index.html
                  </div>
                  <div style={{ color: '#64748b', fontWeight: 700, marginBottom: '4px' }}>Server:</div>
                  <div style={{ paddingLeft: '16px', borderLeft: '2px solid #a855f7', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div><span style={{ color: '#fbbf24' }}>PUSH_PROMISE</span> <span style={{ color: '#64748b' }}>(Stream 2:</span> <span style={{ color: '#86efac' }}>/style.css</span><span style={{ color: '#64748b' }}>)</span></div>
                    <div><span style={{ color: '#fbbf24' }}>PUSH_PROMISE</span> <span style={{ color: '#64748b' }}>(Stream 4:</span> <span style={{ color: '#86efac' }}>/app.js</span><span style={{ color: '#64748b' }}>)</span></div>
                    <div><span style={{ color: '#94a3b8' }}>Response:</span> /index.html <span style={{ color: '#64748b' }}>(Stream 1)</span></div>
                    <div><span style={{ color: '#94a3b8' }}>Response:</span> /style.css <span style={{ color: '#a855f7', fontSize: '10px' }}>(Stream 2, 요청 없이)</span></div>
                    <div><span style={{ color: '#94a3b8' }}>Response:</span> /app.js <span style={{ color: '#a855f7', fontSize: '10px' }}>(Stream 4, 요청 없이)</span></div>
                  </div>
                </div>
              </div>
              {/* Problems */}
              <div style={{ background: '#080b11', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', fontFamily: 'var(--mono)', marginBottom: '10px' }}>문제점</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    '브라우저가 이미 캐시한 리소스도 다시 전송 (대역폭 낭비)',
                    'CANCEL로 거부해도 이미 전송된 데이터는 돌려받을 수 없음',
                    '어떤 리소스를 푸시할지 서버가 판단하기 어려움',
                    '103 Early Hints가 더 간단한 대안으로 등장',
                  ].map((problem, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', fontFamily: 'var(--mono)', color: '#94a3b8', lineHeight: 1.6 }}>
                      <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
                      <span>{problem}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            Chrome 106(2022년)에서 제거되었습니다. 대안인 <strong>103 Early Hints</strong>는 서버가 HTML 파싱 전에 "이 리소스가 필요할 것"이라는 힌트만 보내고, 실제 요청/캐시 판단은 브라우저에 맡기는 방식으로, 서버 푸시의 문제를 깔끔하게 회피합니다.
          </>
        ),
      },
    ],
  },
  {
    ver: 'HTTP/3', year: '2022', color: '#22c55e',
    summary: 'QUIC(UDP 기반), TLS 1.3 내장, 독립 스트림',
    desc: 'TCP 대신 QUIC(UDP 기반) 프로토콜을 사용하여 TCP의 근본적 한계를 극복한 최신 버전입니다.',
    features: [
      ['🚀', 'QUIC 프로토콜 (UDP 기반) — TCP의 HOL Blocking을 근본적으로 해결'],
      ['🔒', 'TLS 1.3 내장 — 연결 수립과 암호화 협상이 1-RTT만에 동시 완료'],
      ['📦', '독립 스트림 — 한 스트림의 패킷 손실이 다른 스트림에 영향 없음'],
      ['🗜️', 'QPACK 헤더 압축 — QUIC의 독립 스트림에 최적화'],
      ['📱', '연결 마이그레이션 — Wi-Fi↔LTE 전환 시에도 끊김 없는 통신'],
      ['⚡', '0-RTT 연결 수립 — 재연결 시 즉시 데이터 전송 가능'],
    ],
    deepDives: [
      {
        title: 'QUIC 프로토콜 — TCP를 대체하는 이유', color: '#22c55e',
        badge: '핵심', badgeColor: '#22c55e',
        body: (
          <>
            QUIC은 <strong>UDP 위에 신뢰성을 자체 구현</strong>한 전송 계층 프로토콜입니다. "UDP라서 신뢰성이 없다"는 오해와 달리, TCP의 모든 기능(재전송, 흐름 제어, 혼잡 제어)을 <strong>사용자 공간(User Space)</strong>에서 구현합니다.
            <div style={{ margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {/* Question */}
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '14px 18px', fontSize: '12px', fontWeight: 700, color: '#e2e8f0', fontFamily: 'var(--mono)' }}>
                왜 TCP를 수정하지 않고 새로 만들었는가?
              </div>
              {/* TCP Limitations */}
              <div style={{ background: '#080b11', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', fontFamily: 'var(--mono)', marginBottom: '10px' }}>TCP의 한계</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { main: 'OS 커널에 구현', detail: '프로토콜 변경에 OS 업데이트 필요' },
                    { main: '미들박스(NAT, 방화벽)가 TCP 헤더를 검사/조작', detail: '새로운 TCP 옵션을 추가해도 미들박스가 차단' },
                    { main: '바이트 스트림 추상화', detail: '근본적으로 HOL Blocking 불가피' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>
                      <span style={{ color: '#ef4444', flexShrink: 0, marginTop: '1px' }}>✗</span>
                      <div>
                        <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{item.main}</span>
                        <span style={{ color: '#64748b' }}> {"→"} {item.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* QUIC Solutions */}
              <div style={{ background: '#080b11', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#22c55e', fontFamily: 'var(--mono)', marginBottom: '10px' }}>QUIC의 해결</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { main: 'UDP 위에 User Space 구현', detail: '앱 업데이트만으로 프로토콜 개선' },
                    { main: 'UDP 패킷은 미들박스가 내용을 검사하지 않음', detail: '' },
                    { main: '스트림별 독립적 순서 보장', detail: 'HOL Blocking 해결' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '11px', fontFamily: 'var(--mono)', lineHeight: 1.6 }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, marginTop: '1px' }}>✓</span>
                      <div>
                        <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{item.main}</span>
                        {item.detail && <span style={{ color: '#64748b' }}> {"→"} {item.detail}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Layer Comparison */}
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '16px 18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', fontFamily: 'var(--mono)', marginBottom: '10px' }}>계층 비교</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--mono)', fontSize: '11px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#a855f7', fontWeight: 700, minWidth: '52px' }}>HTTP/2</span>
                    {['HTTP/2', 'TLS 1.2+', 'TCP', 'IP'].map((layer, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {i > 0 && <span style={{ color: '#475569' }}>{"→"}</span>}
                        <span style={{ color: '#94a3b8', background: 'rgba(168,85,247,0.08)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(168,85,247,0.15)' }}>{layer}</span>
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--mono)', fontSize: '11px', flexWrap: 'wrap' }}>
                    <span style={{ color: '#22c55e', fontWeight: 700, minWidth: '52px' }}>HTTP/3</span>
                    {['HTTP/3', 'QUIC (TLS 1.3)', 'UDP', 'IP'].map((layer, i) => (
                      <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {i > 0 && <span style={{ color: '#475569' }}>{"→"}</span>}
                        <span style={{ color: '#94a3b8', background: 'rgba(34,197,94,0.08)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(34,197,94,0.15)' }}>{layer}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ),
      },
      {
        title: '독립 스트림 — TCP HOL Blocking 해결', color: '#22c55e',
        body: (
          <>
            QUIC에서는 각 스트림이 <strong>독립적으로 패킷 손실을 처리</strong>합니다. 한 스트림에서 패킷이 유실되어도 다른 스트림은 아무런 영향 없이 데이터를 수신합니다.
            <DiagramGrid cols={2}>
              <DiagramContainer title="HTTP/2 (TCP 위) - 패킷 손실 시">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <DiagramFlow wrap>
                    <DiagramNode label="S1 패킷" color="#a855f7" />
                    <DiagramArrow color="#a855f7" />
                    <DiagramNode label="S3 패킷" color="#a855f7" />
                    <DiagramArrow color="#ef4444" />
                    <DiagramNode label="S1 패킷 손실!" color="#ef4444" />
                    <DiagramArrow color="#a855f7" />
                    <DiagramNode label="S5 패킷" color="#a855f7" />
                  </DiagramFlow>
                  <DiagramArrow vertical color="#ef4444" />
                  <DiagramNode icon="🚫" label="전체 차단" sub="TCP가 순서 보장 / S3, S5 포함 대기" color="#ef4444" />
                </div>
              </DiagramContainer>
              <DiagramContainer title="HTTP/3 (QUIC 위) - 패킷 손실 시">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <DiagramNode label="Stream 1" sub="패킷B 손실 → 재전송 대기 (이 스트림만)" color="#ef4444" />
                  <DiagramNode label="Stream 3" sub="정상 수신, 즉시 처리" color="#22c55e" />
                  <DiagramNode label="Stream 5" sub="정상 수신, 즉시 처리" color="#22c55e" />
                </div>
              </DiagramContainer>
            </DiagramGrid>
          </>
        ),
      },
      {
        title: '연결 수립 — 1-RTT와 0-RTT', color: '#22c55e',
        body: (
          <>
            TCP+TLS 연결 수립에는 <strong>총 3 RTT</strong>(TCP 핸드셰이크 1 RTT + TLS 1.2 핸드셰이크 2 RTT)가 필요했습니다. QUIC은 이를 극적으로 줄입니다.
            <DiagramGrid cols={3}>
              <DiagramContainer title="TCP + TLS 1.2 (3 RTT)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <DiagramGroup label="1 RTT" color="#3b82f6">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      <DiagramFlow><DiagramNode label="C" color="#3b82f6" /><DiagramArrow label="SYN" color="#3b82f6" /><DiagramNode label="S" color="#3b82f6" /></DiagramFlow>
                      <DiagramFlow><DiagramNode label="S" color="#3b82f6" /><DiagramArrow label="SYN-ACK" color="#3b82f6" dashed /><DiagramNode label="C" color="#3b82f6" /></DiagramFlow>
                      <DiagramFlow><DiagramNode label="C" color="#3b82f6" /><DiagramArrow label="ACK" color="#3b82f6" /><DiagramNode label="S" color="#3b82f6" /></DiagramFlow>
                    </div>
                  </DiagramGroup>
                  <DiagramGroup label="2 RTT" color="#3b82f6">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      <DiagramFlow><DiagramNode label="C" color="#3b82f6" /><DiagramArrow label="ClientHello" color="#3b82f6" /><DiagramNode label="S" color="#3b82f6" /></DiagramFlow>
                      <DiagramFlow><DiagramNode label="S" color="#3b82f6" /><DiagramArrow label="ServerHello" color="#3b82f6" dashed /><DiagramNode label="C" color="#3b82f6" /></DiagramFlow>
                    </div>
                  </DiagramGroup>
                  <DiagramGroup label="3 RTT" color="#3b82f6">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      <DiagramFlow><DiagramNode label="C" color="#3b82f6" /><DiagramArrow label="Finished" color="#3b82f6" /><DiagramNode label="S" color="#3b82f6" /></DiagramFlow>
                      <DiagramFlow><DiagramNode label="S" color="#3b82f6" /><DiagramArrow label="Finished" color="#3b82f6" dashed /><DiagramNode label="C" color="#3b82f6" /></DiagramFlow>
                    </div>
                  </DiagramGroup>
                  <DiagramFlow><DiagramNode label="C" color="#3b82f6" /><DiagramArrow label="Request" color="#3b82f6" /><DiagramNode label="S" color="#3b82f6" /></DiagramFlow>
                </div>
              </DiagramContainer>
              <DiagramContainer title="QUIC 첫 연결 (1 RTT)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <DiagramGroup label="1 RTT" color="#22c55e">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      <DiagramFlow><DiagramNode label="C" color="#22c55e" /><DiagramArrow label="Initial" color="#22c55e" /><DiagramNode label="S" color="#22c55e" /></DiagramFlow>
                      <DiagramFlow><DiagramNode label="S" color="#22c55e" /><DiagramArrow label="Handshake" color="#22c55e" dashed /><DiagramNode label="C" color="#22c55e" /></DiagramFlow>
                    </div>
                  </DiagramGroup>
                  <DiagramFlow><DiagramNode label="C" color="#22c55e" /><DiagramArrow label="Request (즉시)" color="#22c55e" /><DiagramNode label="S" color="#22c55e" /></DiagramFlow>
                </div>
              </DiagramContainer>
              <DiagramContainer title="QUIC 재연결 (0 RTT)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                  <DiagramGroup label="0 RTT!" color="#22c55e">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                      <DiagramFlow><DiagramNode label="C" color="#22c55e" /><DiagramArrow label="0-RTT Data" color="#22c55e" /><DiagramNode label="S" color="#22c55e" /></DiagramFlow>
                      <DiagramFlow><DiagramNode label="S" color="#22c55e" /><DiagramArrow label="응답 시작" color="#22c55e" dashed /><DiagramNode label="C" color="#22c55e" /></DiagramFlow>
                    </div>
                  </DiagramGroup>
                  <div style={{ fontSize: '10px', color: '#22c55e', fontFamily: 'var(--mono)', textAlign: 'center' }}>핸드셰이크 없이 즉시 통신</div>
                </div>
              </DiagramContainer>
            </DiagramGrid>
            <strong>0-RTT의 보안 주의점:</strong> 0-RTT 데이터는 Forward Secrecy가 보장되지 않으며, 공격자가 패킷을 캡처 후 재전송(Replay Attack)할 수 있습니다. 따라서 0-RTT에는 <strong>멱등한 요청(GET 등)</strong>만 포함해야 하고, POST 같은 상태 변경 요청은 1-RTT 이후에 전송해야 합니다.
          </>
        ),
      },
      {
        title: '연결 마이그레이션 (Connection Migration)', color: '#22c55e',
        body: (
          <>
            TCP는 연결을 <strong>(출발지 IP, 출발지 포트, 목적지 IP, 목적지 포트)</strong> 4-tuple로 식별합니다. Wi-Fi에서 LTE로 전환되면 IP가 바뀌므로 TCP 연결이 끊어집니다.
            <DiagramGrid cols={2}>
              <DiagramContainer title="TCP (IP 기반 식별)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                  <DiagramFlow>
                    <DiagramNode icon="📶" label="Wi-Fi" sub="192.168.1.10:4321" color="#3b82f6" />
                    <DiagramArrow label="연결 A" color="#3b82f6" />
                    <DiagramNode icon="🖥️" label="Server:443" color="#3b82f6" />
                  </DiagramFlow>
                  <DiagramFlow>
                    <DiagramNode icon="📱" label="LTE" sub="10.0.0.50:5678" color="#3b82f6" />
                    <DiagramArrow label="새 연결 (A 끊김)" color="#ef4444" />
                    <DiagramNode icon="🖥️" label="Server:443" color="#3b82f6" />
                  </DiagramFlow>
                  <DiagramNode icon="🔄" label="TCP + TLS" sub="핸드셰이크 다시 수행" color="#ef4444" />
                </div>
              </DiagramContainer>
              <DiagramContainer title="QUIC (Connection ID 기반 식별)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                  <DiagramFlow>
                    <DiagramNode icon="📶" label="Wi-Fi" sub="192.168.1.10:4321" color="#22c55e" />
                    <DiagramArrow label="CID: 0xABCD" color="#22c55e" />
                    <DiagramNode icon="🖥️" label="Server:443" color="#22c55e" />
                  </DiagramFlow>
                  <DiagramFlow>
                    <DiagramNode icon="📱" label="LTE" sub="10.0.0.50:5678" color="#22c55e" />
                    <DiagramArrow label="CID: 0xABCD (동일)" color="#22c55e" />
                    <DiagramNode icon="🖥️" label="Server:443" color="#22c55e" />
                  </DiagramFlow>
                  <DiagramNode icon="✅" label="연결 유지" sub="즉시 통신 재개" color="#22c55e" />
                </div>
              </DiagramContainer>
            </DiagramGrid>
            모바일 환경에서 Wi-Fi ↔ LTE 전환, 엘리베이터 이동 등 <strong>IP가 자주 바뀌는 시나리오</strong>에서 사용자 경험을 크게 개선합니다. 영상 스트리밍, 화상 회의 등에서 특히 효과적입니다.
          </>
        ),
      },
    ],
  },
]

const muxResources = [
  { name: 'CSS', color: '#3b82f6' },
  { name: 'JS', color: '#a855f7' },
  { name: 'IMG', color: '#22c55e' },
]

export default function HttpVersions() {
  useInjectCSS('style-http-versions', CSS)
  const [openVersions, setOpenVersions] = useState<Set<string>>(new Set())
  const [muxState, setMuxState] = useState<'idle' | 'playing' | 'done'>('idle')
  const [h1Progress, setH1Progress] = useState<number[]>([0, 0, 0])
  const [h2Progress, setH2Progress] = useState<number[]>([0, 0, 0])
  const [muxStatus, setMuxStatus] = useState({ msg: '▶ 재생 버튼을 눌러 HTTP/1.1과 HTTP/2의 차이를 비교해보세요', color: '#5a6a85' })

  const toggleVersion = (ver: string) => {
    setOpenVersions(prev => {
      const next = new Set(prev)
      if (next.has(ver)) next.delete(ver)
      else next.add(ver)
      return next
    })
  }

  const toggleAll = () => {
    if (openVersions.size === versions.length) {
      setOpenVersions(new Set())
    } else {
      setOpenVersions(new Set(versions.map(v => v.ver)))
    }
  }

  const playMux = () => {
    if (muxState === 'playing') return
    resetMux()
    setMuxState('playing')
    setMuxStatus({ msg: '요청 전송 중...', color: '#3b82f6' })

    const h1Durations = [500, 700, 600]
    const h1Intervals: ReturnType<typeof setInterval>[] = []
    let h1Delay = 0

    h1Durations.forEach((dur, idx) => {
      const startDelay = setTimeout(() => {
        const startTime = Date.now()
        const interval = setInterval(() => {
          const elapsed = Date.now() - startTime
          const pct = Math.min(100, (elapsed / dur) * 100)
          setH1Progress(prev => { const n = [...prev]; n[idx] = pct; return n })
          if (pct >= 100) clearInterval(interval)
        }, 30)
        h1Intervals.push(interval)
      }, h1Delay)
      h1Delay += dur
      h1Intervals.push(startDelay as unknown as ReturnType<typeof setInterval>)
    })

    const h2Durations = [500, 700, 600]
    const h2StartTime = Date.now()
    const h2Interval = setInterval(() => {
      const elapsed = Date.now() - h2StartTime
      setH2Progress(h2Durations.map(dur => Math.min(100, (elapsed / dur) * 100)))
      if (h2Durations.every(dur => elapsed >= dur)) clearInterval(h2Interval)
    }, 30)

    const totalH1 = h1Durations.reduce((a, b) => a + b, 0)
    setTimeout(() => {
      setMuxState('done')
      setMuxStatus({ msg: 'HTTP/2는 멀티플렉싱으로 모든 리소스를 동시에 로드합니다!', color: '#22c55e' })
    }, totalH1 + 100)
  }

  const resetMux = () => {
    setMuxState('idle')
    setH1Progress([0, 0, 0])
    setH2Progress([0, 0, 0])
    setMuxStatus({ msg: '▶ 재생 버튼을 눌러 HTTP/1.1과 HTTP/2의 차이를 비교해보세요', color: '#5a6a85' })
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background:'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position:'relative', zIndex:1 }}>
        <HeroSection
          tag="Application Layer · HTTP Protocol · 면접 필수"
          title={<><span style={{ color:'#06b6d4' }}>HTTP</span> 버전별 특징</>}
          description={<>0.9의 한 줄짜리 프로토콜부터 HTTP/3의 QUIC까지 —<br />각 버전의 등장 배경과 핵심 개선 사항을 정리합니다.</>}
        />

        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>버전 타임라인</SectionTitle>
          <div className="hv-expand-all">
            <button onClick={toggleAll}>
              {openVersions.size === versions.length ? '모두 접기 ▲' : '모두 펼치기 ▼'}
            </button>
          </div>
          <div className="hv-timeline">
            {versions.map((v) => {
              const isOpen = openVersions.has(v.ver)
              return (
                <div key={v.ver} className="hv-item">
                  <div className="hv-dot" style={{ background:`${v.color}22`, border:`2px solid ${v.color}`, color:v.color }}>{v.year.slice(2)}</div>
                  <div className="hv-card" style={{ borderTop:`3px solid ${v.color}` }}>
                    <button className="hv-card-toggle" onClick={() => toggleVersion(v.ver)}>
                      <span className="hv-ver" style={{ color:v.color }}>{v.ver}</span>
                      <span className="hv-year" style={{ background:`${v.color}18`, border:`1px solid ${v.color}40`, color:v.color }}>{v.year}</span>
                      <span className="hv-card-summary">{v.summary}</span>
                      <span className={`hv-chevron ${isOpen ? 'open' : ''}`}>▼</span>
                    </button>
                    <div className={`hv-card-body ${isOpen ? 'open' : ''}`}>
                      <div className="hv-card-content">
                        <div className="hv-card-desc">{v.desc}</div>
                        <div className="hv-features">
                          {v.features.map(([icon, text]) => (
                            <div key={text} className="hv-feat"><span className="hv-feat-icon">{icon}</span><span>{text}</span></div>
                          ))}
                        </div>
                        {v.deepDives.length > 0 && (
                          <div className="hv-deep">
                            {v.deepDives.map((dd) => (
                              <div key={dd.title} className="hv-deep-card" style={{ borderLeft:`3px solid ${dd.color}` }}>
                                <div className="hv-deep-title" style={{ color: dd.color }}>
                                  💡 {dd.title}
                                  {dd.badge && (
                                    <span className="hv-badge" style={{ background:`${dd.badgeColor}20`, color:dd.badgeColor, border:`1px solid ${dd.badgeColor}40` }}>{dd.badge}</span>
                                  )}
                                </div>
                                <div className="hv-deep-body">{dd.body}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>HTTP/1.1 vs HTTP/2 — 멀티플렉싱 비교</SectionTitle>
          <div className="hv-mux-grid">
            <div className="hv-mux-box" style={{ borderTop: '3px solid #3b82f6' }}>
              <h4 style={{ color: '#3b82f6' }}>HTTP/1.1</h4>
              <div className="hv-mux-sub">순차 처리 — 요청 → 응답 → 다음 요청 → 다음 응답</div>
              <div className="hv-mux-timeline">
                {muxResources.map((res, i) => (
                  <div key={res.name} className="hv-mux-row">
                    <div className="hv-mux-label" style={{ color: res.color }}>{res.name}</div>
                    <div className="hv-mux-track">
                      <div
                        className="hv-mux-bar"
                        style={{
                          width: `${h1Progress[i]}%`,
                          background: `linear-gradient(90deg, ${res.color}88, ${res.color})`,
                        }}
                      >
                        {h1Progress[i] > 20 ? `${Math.round(h1Progress[i])}%` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hv-mux-total" style={{ color: '#3b82f6' }}>
                총 소요: <span>{muxState === 'done' ? '~1.8초 (순차)' : '—'}</span>
              </div>
            </div>
            <div className="hv-mux-box" style={{ borderTop: '3px solid #a855f7' }}>
              <h4 style={{ color: '#a855f7' }}>HTTP/2</h4>
              <div className="hv-mux-sub">멀티플렉싱 — 모든 요청을 동시에 전송, 응답도 병렬 수신</div>
              <div className="hv-mux-timeline">
                {muxResources.map((res, i) => (
                  <div key={res.name} className="hv-mux-row">
                    <div className="hv-mux-label" style={{ color: res.color }}>{res.name}</div>
                    <div className="hv-mux-track">
                      <div
                        className="hv-mux-bar"
                        style={{
                          width: `${h2Progress[i]}%`,
                          background: `linear-gradient(90deg, ${res.color}88, ${res.color})`,
                        }}
                      >
                        {h2Progress[i] > 20 ? `${Math.round(h2Progress[i])}%` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hv-mux-total" style={{ color: '#a855f7' }}>
                총 소요: <span>{muxState === 'done' ? '~0.7초 (병렬)' : '—'}</span>
              </div>
            </div>
          </div>
          <AnimationControls color="#a855f7" status={muxStatus} onPlay={playMux} onReset={resetMux} />
          {/* 단계별 흐름 */}
          <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { num: '①', text: 'HTTP/1.1 — CSS 요청 전송 및 응답 수신 (~500ms)', color: '#3b82f6' },
                { num: '②', text: 'HTTP/1.1 — CSS 완료 후 JS 요청 전송 및 응답 수신 (~700ms)', color: '#a855f7' },
                { num: '③', text: 'HTTP/1.1 — JS 완료 후 IMG 요청 전송 및 응답 수신 (~600ms)', color: '#22c55e' },
                { num: '④', text: 'HTTP/2 — CSS, JS, IMG 세 리소스를 동시에 병렬 전송 시작', color: '#a855f7' },
                { num: '⑤', text: 'HTTP/2 — 가장 오래 걸리는 리소스(JS ~700ms) 완료 시 전체 완료', color: '#a855f7' },
                { num: '⑥', text: '결과 비교: HTTP/1.1 ~1.8초(순차) vs HTTP/2 ~0.7초(병렬)', color: '#22c55e' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', lineHeight: 1.6 }}>
                  <span style={{ color: s.color, fontWeight: 700, flexShrink: 0 }}>{s.num}</span>
                  <span style={{ color: '#94a3b8' }}>{s.text}</span>
                </div>
              ))}
            </div>
          </div>
          <HighlightBox color="#a855f7" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#a855f7' }}>핵심 차이:</strong> HTTP/1.1은 하나의 요청이 완료되어야 다음 요청을 보낼 수 있지만 (HOL Blocking),
            HTTP/2는 하나의 TCP 연결에서 <strong style={{ color: '#a855f7' }}>여러 스트림을 동시에</strong> 처리하여 전체 로딩 시간을 크게 단축합니다.
          </HighlightBox>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>핵심 개선 포인트</SectionTitle>
          <div className="hv-compare-grid">
            {[
              { title:'연결 방식의 진화', color:'#06b6d4', items:['HTTP/0.9~1.0: 요청마다 TCP 연결 수립/종료 (Short-lived)','HTTP/1.1: Keep-Alive로 연결 재사용 (Persistent)','HTTP/2: 하나의 연결에서 멀티플렉싱','HTTP/3: UDP(QUIC) 기반으로 연결 자체를 혁신'] },
              { title:'HOL Blocking 해결 과정', color:'#a855f7', items:['HTTP/1.1: 파이프라이닝 시도했지만 HOL Blocking 여전','HTTP/2: HTTP 레벨 멀티플렉싱으로 해결','HTTP/2의 한계: TCP 레벨 HOL Blocking은 남아있음','HTTP/3: QUIC의 독립 스트림으로 근본적 해결'] },
              { title:'보안의 변화', color:'#22c55e', items:['HTTP/1.x: TLS는 선택사항 (별도 핸드셰이크)','HTTP/2: TLS 필수 (사실상 — 브라우저 강제)','HTTP/3: TLS 1.3이 QUIC에 내장','연결 수립과 보안 협상이 점점 통합되는 추세'] },
            ].map((card) => (
              <div key={card.title} className="hv-cmp-card" style={{ borderTop:`2px solid ${card.color}` }}>
                <h4 style={{ color:card.color }}>{card.title}</h4>
                <div className="hv-cmp-list">{card.items.map((item) => (<div key={item} className="hv-cmp-item">{item}</div>))}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            { q:'HTTP/1.1의 Keep-Alive와 HTTP/2의 멀티플렉싱의 차이는?', a:'Keep-Alive는 TCP 연결을 재사용하여 매번 3-Way Handshake를 하지 않아도 되지만, 하나의 연결에서 요청-응답이 여전히 순차적(직렬)으로 처리됩니다. 브라우저는 이를 보완하기 위해 도메인당 최대 6개의 TCP 연결을 동시에 열어 병렬성을 확보했습니다. 반면 HTTP/2의 멀티플렉싱은 단 하나의 TCP 연결에서 여러 스트림을 통해 요청-응답을 동시에(병렬로) 처리하므로, 연결 수를 늘리지 않고도 높은 병렬성을 달성합니다.' },
            { q:'HTTP/2에서도 HOL Blocking이 발생하는 이유는?', a:'HTTP/2는 HTTP 레벨의 HOL Blocking은 멀티플렉싱으로 해결했지만, 전송 계층인 TCP에서의 HOL Blocking은 해결하지 못했습니다. TCP는 바이트 스트림의 순서를 보장하므로, 하나의 TCP 패킷이 손실되면 뒤따르는 모든 패킷(다른 HTTP 스트림의 데이터 포함)이 해당 패킷의 재전송을 기다려야 합니다. 이는 패킷 손실률이 높은 모바일/무선 환경에서 특히 성능 저하를 유발하며, HTTP/3가 QUIC(UDP 기반)을 채택하게 된 핵심 동기입니다.' },
            { q:'HTTP/3가 UDP를 사용하는 이유는?', a:'TCP의 HOL Blocking을 근본적으로 해결하기 위해서입니다. TCP는 OS 커널에 구현되어 있어 프로토콜 수정이 어렵고, 순서 보장 특성으로 인한 HOL Blocking이 불가피합니다. QUIC은 UDP 위에 사용자 공간(User Space)에서 신뢰성(재전송, 흐름 제어, 혼잡 제어)을 직접 구현하여, 스트림별 독립적인 순서 보장이 가능합니다. 또한 UDP를 사용하면 기존 네트워크 인프라(NAT, 방화벽)를 별도 수정 없이 통과할 수 있고, OS 업데이트 없이 애플리케이션 레벨에서 프로토콜을 빠르게 발전시킬 수 있습니다.' },
            { q:'HTTP/2의 서버 푸시가 deprecated된 이유는?', a:'서버 푸시는 클라이언트가 요청하기 전에 필요한 리소스를 선제 전송하는 기능이었으나, 실질적인 성능 이점이 기대보다 크지 않았습니다. 주요 문제점은 (1) 브라우저가 이미 캐시하고 있는 리소스를 불필요하게 다시 전송하여 대역폭 낭비 발생, (2) CANCEL 프레임으로 푸시를 거부할 수 있지만 이미 전송된 데이터를 되돌릴 수 없음, (3) 서버 구현의 복잡성 증가, (4) 103 Early Hints 헤더와 같은 더 간단한 대안이 등장한 점입니다. Chrome 106(2022년)에서 제거되었고, 다른 브라우저도 점진적으로 지원을 축소하고 있습니다.' },
            { q:'HTTP/3의 0-RTT 연결에서 Replay Attack 위험은?', a:'0-RTT는 이전 연결에서 협상한 암호화 키를 재사용하여 핸드셰이크 없이 즉시 데이터를 전송하는 기능입니다. 그러나 이 0-RTT 데이터는 전방 비밀성(Forward Secrecy)이 보장되지 않으며, 공격자가 해당 패킷을 캡처한 후 서버에 그대로 재전송(Replay)할 수 있습니다. 따라서 0-RTT 데이터에는 멱등한 요청(GET 등 서버 상태를 변경하지 않는 요청)만 포함해야 하고, POST나 결제 요청 같은 비멱등 연산은 반드시 1-RTT 핸드셰이크가 완료된 후에 전송해야 합니다. 서버 측에서는 Anti-Replay 메커니즘(타임스탬프 기반 거부, 일회용 티켓 등)을 구현하여 추가 방어할 수 있습니다.' },
          ]} />
        </div>

        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>한눈에 비교</SectionTitle>
          <div style={{ overflowX:'auto', borderRadius:'14px', border:'1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>항목</th>
                  <th style={{ color:'#94a3b8' }}>0.9</th><th style={{ color:'#06b6d4' }}>1.0</th><th style={{ color:'#3b82f6' }}>1.1</th><th style={{ color:'#a855f7' }}>2</th><th style={{ color:'#22c55e' }}>3</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['연결 방식','비지속','비지속','Keep-Alive','멀티플렉싱','QUIC'],
                  ['전송 프로토콜','TCP','TCP','TCP','TCP','UDP (QUIC)'],
                  ['데이터 형식','텍스트','텍스트','텍스트','바이너리','바이너리'],
                  ['헤더 압축','없음','없음','없음','HPACK','QPACK'],
                  ['서버 푸시','없음','없음','없음','지원','지원'],
                  ['HOL Blocking','-','O','O','TCP 레벨','해결'],
                  ['TLS','없음','선택','선택','사실상 필수','내장 (1.3)'],
                ].map(([label, ...vals]) => (
                  <tr key={label}>
                    <td style={{ color:'#5a6a85', fontWeight:600 }}>{label}</td>
                    {vals.map((v, i) => (<td key={i} style={{ color:['#64748b','#06b6d4','#3b82f6','#a855f7','#22c55e'][i] }}>{v}</td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <HighlightBox color="#06b6d4" style={{ marginTop:'16px' }}>
            <strong style={{ color:'#06b6d4' }}>핵심 흐름:</strong> 요청마다 연결 (0.9/1.0) → 연결 재사용 (1.1) → 멀티플렉싱 (2) → TCP 한계 극복 (3).<br/>
            각 버전은 이전 버전의 <strong style={{ color:'#06b6d4' }}>병목 지점</strong>을 해결하기 위해 등장했습니다.
          </HighlightBox>
        </div>
      </div>
    </>
  )
}

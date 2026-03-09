import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import AnimationControls from '../../components/doc/AnimationControls'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { useAnimationTimeline } from '../../hooks/useAnimationTimeline'

const CSS = `
.nio-card { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; margin-bottom:20px; transition:transform .25s; }
.nio-card:hover { transform:translateY(-3px); }
.nio-card-head { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
.nio-card-badge { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:4px 10px; border-radius:6px; }
.nio-card-title { font-size:18px; font-weight:900; }
.nio-card-metaphor { font-size:12px; color:#5a6a85; font-style:italic; margin-bottom:14px; }
.nio-card-desc { font-size:13px; color:#94a3b8; line-height:1.8; margin-bottom:14px; }
.nio-diagram { background:#080b11; border:1px solid #1a2234; border-radius:8px; font-family:'JetBrains Mono',monospace; font-size:11px; line-height:1.8; color:#64748b; white-space:pre; overflow-x:auto; padding:14px 16px; margin:12px 0; }
.nio-pros-cons { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-top:14px; }
@media(max-width:560px){ .nio-pros-cons{ grid-template-columns:1fr; } }
.nio-pro, .nio-con { padding:12px 16px; border-radius:10px; font-size:12px; line-height:1.7; }
.nio-pro { background:rgba(34,197,94,0.04); border:1px solid rgba(34,197,94,0.15); }
.nio-con { background:rgba(239,68,68,0.04); border:1px solid rgba(239,68,68,0.15); }
.nio-pro-label { color:#22c55e; font-weight:700; font-size:11px; margin-bottom:6px; font-family:'JetBrains Mono',monospace; }
.nio-con-label { color:#ef4444; font-weight:700; font-size:11px; margin-bottom:6px; font-family:'JetBrains Mono',monospace; }
.nio-pro-list, .nio-con-list { display:flex; flex-direction:column; gap:4px; color:#94a3b8; }
.nio-matrix { display:grid; grid-template-columns:auto 1fr 1fr; gap:0; border:1px solid #1a2234; border-radius:14px; overflow:hidden; background:#0e1118; }
.nio-matrix-cell { padding:16px 20px; border:1px solid #1a2234; font-size:13px; line-height:1.7; }
.nio-matrix-header { background:rgba(255,255,255,0.03); font-weight:700; font-size:12px; font-family:'JetBrains Mono',monospace; text-align:center; }
.nio-matrix-label { background:rgba(255,255,255,0.02); font-weight:700; font-size:12px; font-family:'JetBrains Mono',monospace; display:flex; align-items:center; justify-content:center; }
.nio-anim-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.nio-anim-panels { display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px; min-height:260px; }
@media(max-width:768px){ .nio-anim-panels{ grid-template-columns:1fr; } }
.nio-anim-panel { background:rgba(255,255,255,0.02); border:1px solid #1a2234; border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:8px; }
.nio-anim-panel-title { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; text-align:center; padding:4px 0; margin-bottom:4px; }
.nio-anim-row { display:flex; align-items:center; gap:6px; font-size:10px; font-family:'JetBrains Mono',monospace; padding:4px 8px; border-radius:6px; transition:all .3s; }
.nio-anim-client { width:18px; height:18px; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:8px; flex-shrink:0; }
.nio-anim-bar { height:6px; border-radius:3px; transition:width .4s ease, background .3s; }
.nio-anim-status { font-size:9px; white-space:nowrap; }
.nio-epoll-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
.nio-epoll-card { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:18px; }
.nio-epoll-card h4 { font-size:14px; font-weight:700; margin-bottom:8px; }
.nio-pattern-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .nio-pattern-grid{ grid-template-columns:1fr; } }
.nio-pattern-card { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.nio-pattern-title { font-size:18px; font-weight:900; margin-bottom:4px; }
.nio-pattern-sub { font-size:11px; color:#5a6a85; margin-bottom:16px; font-family:'JetBrains Mono',monospace; }
.nio-pattern-desc { font-size:13px; color:#94a3b8; line-height:1.8; margin-bottom:14px; }
.nio-pattern-frameworks { display:flex; flex-wrap:wrap; gap:8px; }
.nio-pattern-fw { font-size:11px; font-weight:600; padding:4px 10px; border-radius:6px; font-family:'JetBrains Mono',monospace; }
.nio-feature-item { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.02); border-radius:8px; padding:10px 14px; font-size:13px; color:#94a3b8; }
.nio-feature-icon { font-size:18px; flex-shrink:0; }
.nio-stage-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px; }
@media(max-width:560px){ .nio-stage-grid{ grid-template-columns:1fr; } }
.nio-stage { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.nio-stage-num { font-size:28px; font-weight:900; margin-bottom:6px; }
.nio-stage-title { font-size:15px; font-weight:700; margin-bottom:8px; }
.nio-stage-desc { font-size:12px; color:#5a6a85; line-height:1.7; }
.nio-c10k-timeline { display:flex; flex-direction:column; gap:14px; position:relative; padding-left:24px; }
.nio-c10k-timeline::before { content:''; position:absolute; left:8px; top:4px; bottom:4px; width:2px; background:linear-gradient(180deg,#3b82f6,#a855f7,#22c55e); }
.nio-c10k-item { position:relative; }
.nio-c10k-dot { position:absolute; left:-20px; top:4px; width:12px; height:12px; border-radius:50%; border:2px solid; }
.nio-c10k-year { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:2px; }
.nio-c10k-text { font-size:12px; color:#94a3b8; line-height:1.7; }
`

export default function NetworkIoModel() {
  const { step, setStep, isPlaying, setIsPlaying, reset, schedule } = useAnimationTimeline()
  const [status, setStatus] = useState({ msg: '▶ 재생 버튼을 눌러 Blocking / Multiplexing / Async I/O를 비교해보세요', color: '#5a6a85' })
  useInjectCSS('style-network-io-model', CSS)

  const play = () => {
    if (isPlaying) return
    handleReset()
    setIsPlaying(true)
    const timeline = [
      { s: 1, delay: 400, msg: '① Blocking: 클라이언트 C1 요청 → 스레드 T1이 블로킹 대기 중...', color: '#94a3b8' },
      { s: 2, delay: 1200, msg: '② Blocking: C1 완료, C2 요청 → 스레드 T2 블로킹 대기...', color: '#94a3b8' },
      { s: 3, delay: 2000, msg: '③ Blocking: C2 완료, C3 요청 → 스레드 T3 블로킹 대기...', color: '#94a3b8' },
      { s: 4, delay: 2800, msg: '④ Multiplexing: epoll이 3개 fd를 동시에 감시 시작', color: '#3b82f6' },
      { s: 5, delay: 3600, msg: '⑤ Multiplexing: C1 준비 완료 → read() 호출하여 처리', color: '#3b82f6' },
      { s: 6, delay: 4400, msg: '⑥ Multiplexing: C2, C3 순서대로 준비되면 처리 (1 스레드)', color: '#3b82f6' },
      { s: 7, delay: 5200, msg: '⑦ Async: aio_read() 3개 동시 요청 → 즉시 반환', color: '#a855f7' },
      { s: 8, delay: 6000, msg: '⑧ Async: 커널이 데이터 준비+복사 모두 완료 후 콜백 알림', color: '#a855f7' },
    ]
    timeline.forEach(({ s, delay, msg, color }) => {
      schedule(() => { setStep(s); setStatus({ msg, color }) }, delay)
    })
    schedule(() => {
      setStep(9)
      setStatus({ msg: '비교 완료! Async I/O가 스레드 자원을 가장 효율적으로 사용합니다.', color: '#22c55e' })
      setIsPlaying(false)
    }, 7000)
  }

  const handleReset = () => {
    reset()
    setStatus({ msg: '▶ 재생 버튼을 눌러 Blocking / Multiplexing / Async I/O를 비교해보세요', color: '#5a6a85' })
  }

  const clients = ['C1', 'C2', 'C3']
  const clientColors = ['#06b6d4', '#f59e0b', '#a855f7']

  // Blocking animation state
  const getBlockingState = (idx: number) => {
    if (step >= 3 && idx === 2) return 'done'
    if (step >= 2 && idx === 1) return 'done'
    if (step >= 1 && idx === 0) return 'done'
    if (step >= 3 && idx === 2) return 'active'
    if (step >= 2 && idx === 1) return 'active'
    if (step >= 1 && idx === 0) return 'active'
    return 'wait'
  }
  const getBlockingWidth = (idx: number) => {
    if (idx === 0) return step >= 2 ? '100%' : step >= 1 ? '60%' : '0%'
    if (idx === 1) return step >= 3 ? '100%' : step >= 2 ? '60%' : '0%'
    return step >= 4 ? '100%' : step >= 3 ? '60%' : '0%'
  }
  const getBlockingLabel = (idx: number) => {
    const s = getBlockingState(idx)
    if (s === 'done') return '완료'
    if (idx === 0 && step >= 1) return '블로킹 중...'
    if (idx === 1 && step >= 2) return '블로킹 중...'
    if (idx === 2 && step >= 3) return '블로킹 중...'
    return '대기'
  }

  // Multiplexing animation state
  const getMuxWidth = (idx: number) => {
    if (step >= 6) return '100%'
    if (step >= 5 && idx === 0) return '100%'
    if (step >= 5 && idx > 0) return '50%'
    if (step >= 4) return '20%'
    return '0%'
  }
  const getMuxLabel = (idx: number) => {
    if (step >= 6) return '완료'
    if (step >= 5 && idx === 0) return '완료'
    if (step >= 5) return 'read()'
    if (step >= 4) return '감시 중'
    return '대기'
  }

  // Async animation state
  const getAsyncWidth = (_idx: number) => {
    if (step >= 8) return '100%'
    if (step >= 7) return '40%'
    return '0%'
  }
  const getAsyncLabel = (_idx: number) => {
    if (step >= 8) return '콜백 완료'
    if (step >= 7) return '커널 처리 중'
    return '대기'
  }

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(59,130,246,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="System Programming · I/O Model · 면접 필수"
          title={<><span style={{ color: '#3b82f6' }}>네트워크</span> <span style={{ color: '#a855f7' }}>I/O 모델</span></>}
          description={<>Blocking부터 Async까지 5가지 I/O 모델과<br />고성능 서버의 핵심 패턴을 완벽 정리</>}
        />

        {/* I/O 모델 개요 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>왜 I/O 모델을 이해해야 하는가?</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              서버가 클라이언트와 통신할 때, <strong style={{ color: '#3b82f6' }}>네트워크 I/O</strong>가 가장 큰 병목입니다.
              CPU 연산은 나노초 단위이지만, 네트워크 I/O는 <strong style={{ color: '#ef4444' }}>밀리초~초 단위</strong>로 수천 배 느립니다.
              이 대기 시간을 어떻게 처리하느냐에 따라 서버의 <strong style={{ color: '#a855f7' }}>동시 처리 성능</strong>이 결정됩니다.
            </div>
            <div style={{ fontSize: '12px', color: '#5a6a85', background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '10px', padding: '14px 18px', lineHeight: 1.7 }}>
              <strong style={{ color: '#3b82f6' }}>핵심 포인트:</strong> 네트워크 I/O의 성능 차이는 대부분 "데이터가 준비되지 않았을 때 스레드가 뭘 하느냐"에서 발생합니다. 블로킹하고 기다릴 것인가, 다른 일을 할 것인가가 모든 I/O 모델의 근본적인 차이입니다.
            </div>
          </div>

          {/* 네트워크 I/O의 2단계 */}
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            네트워크에서 데이터를 읽는 과정은 <strong style={{ color: '#94a3b8' }}>2단계</strong>로 나뉩니다. 5가지 I/O 모델은 이 2단계를 <strong style={{ color: '#94a3b8' }}>어떤 방식으로 처리하느냐</strong>에 따라 구분됩니다.
          </div>
          <div className="nio-stage-grid">
            <div className="nio-stage" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="nio-stage-num" style={{ color: '#3b82f6' }}>1</div>
              <div className="nio-stage-title" style={{ color: '#3b82f6' }}>데이터 준비 (Wait for data)</div>
              <div className="nio-stage-desc">
                네트워크로부터 패킷이 도착하여 <strong style={{ color: '#94a3b8' }}>커널 버퍼</strong>에 데이터가 준비될 때까지 대기하는 단계입니다.
                상대방이 데이터를 보내야 하므로 언제 완료될지 예측할 수 없습니다.
              </div>
            </div>
            <div className="nio-stage" style={{ borderTop: '3px solid #a855f7' }}>
              <div className="nio-stage-num" style={{ color: '#a855f7' }}>2</div>
              <div className="nio-stage-title" style={{ color: '#a855f7' }}>데이터 복사 (Copy data)</div>
              <div className="nio-stage-desc">
                커널 버퍼의 데이터를 <strong style={{ color: '#94a3b8' }}>유저 공간 버퍼</strong>로 복사하는 단계입니다.
                커널 모드 → 유저 모드 전환(context switch)이 발생하며, 1단계보다 짧지만 여전히 블로킹될 수 있습니다.
              </div>
            </div>
          </div>

          <div className="nio-diagram">{`   Application                    Kernel
   (유저 공간)                  (커널 공간)
       │                            │
       │   read() / recv()          │
       ├───────────────────────────→│
       │                            │  ① 데이터 준비 대기
       │   (여기서 블로킹?          │     NIC → 커널 버퍼
       │    폴링? 비동기?)          │
       │                            │  ② 데이터 복사
       │                            │     커널 버퍼 → 유저 버퍼
       │←───────────────────────────┤
       │   데이터 반환              │
       ▼                            ▼`}</div>

          <HighlightBox color="#3b82f6">
            <strong style={{ color: '#3b82f6' }}>5가지 I/O 모델 분류 기준:</strong> 1단계(데이터 준비)에서 블로킹하는가? 2단계(데이터 복사)에서 블로킹하는가? 이 두 질문에 대한 답이 각 모델의 특성을 결정합니다. <strong style={{ color: '#a855f7' }}>진정한 비동기 I/O만이 두 단계 모두 논블로킹</strong>입니다.
          </HighlightBox>
        </div>

        {/* 5가지 I/O 모델 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>5가지 I/O 모델</SectionTitle>

          {/* 1. Blocking I/O */}
          <div className="nio-card" style={{ borderTop: '3px solid #94a3b8' }}>
            <div className="nio-card-head">
              <span className="nio-card-badge" style={{ background: 'rgba(148,163,184,0.12)', color: '#94a3b8' }}>MODEL 1</span>
              <span className="nio-card-title" style={{ color: '#94a3b8' }}>Blocking I/O</span>
            </div>
            <div className="nio-card-metaphor">"줄 서서 기다리기" — 음식이 나올 때까지 카운터 앞에서 꼼짝 못함</div>
            <div className="nio-card-desc">
              가장 기본적인 I/O 모델입니다. <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>read()</code>를 호출하면
              데이터가 준비될 때까지 <strong style={{ color: '#94a3b8' }}>스레드가 완전히 블로킹</strong>됩니다.
              커널이 데이터를 준비하고 유저 공간으로 복사할 때까지 스레드는 아무것도 할 수 없습니다.
            </div>
            <div className="nio-diagram">{`  Application         Kernel
      │                  │
      │  read()          │
      ├─────────────────→│
      │                  │  데이터 준비 대기...
      │  [블로킹 ⏳]      │  (패킷 도착 대기)
      │                  │
      │                  │  데이터 복사
      │  [블로킹 ⏳]      │  (커널→유저)
      │←─────────────────┤
      │  데이터 반환      │
      ▼                  ▼`}</div>
            <div className="nio-card-desc" style={{ marginBottom: 0 }}>
              동시 접속을 처리하려면 <strong style={{ color: '#ef4444' }}>클라이언트 1개 = 스레드 1개</strong>가 필요합니다.
              1만 명이 접속하면 1만 개의 스레드가 필요하고, 각 스레드는 약 1MB의 스택 메모리를 소비합니다.
              이것이 바로 <strong style={{ color: '#ef4444' }}>C10K 문제</strong>의 배경입니다.
            </div>
            <div className="nio-pros-cons">
              <div className="nio-pro">
                <div className="nio-pro-label">PROS</div>
                <div className="nio-pro-list">
                  <span>• 구현이 가장 단순하고 직관적</span>
                  <span>• 코드 흐름이 순차적이라 디버깅 쉬움</span>
                  <span>• 저수준 동시성 지식 불필요</span>
                </div>
              </div>
              <div className="nio-con">
                <div className="nio-con-label">CONS</div>
                <div className="nio-con-list">
                  <span>• 스레드 1개 = 클라이언트 1개 (자원 낭비)</span>
                  <span>• 동시 접속 수 증가 시 스레드 폭발</span>
                  <span>• 컨텍스트 스위칭 오버헤드 심각</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Non-blocking I/O */}
          <div className="nio-card" style={{ borderTop: '3px solid #06b6d4' }}>
            <div className="nio-card-head">
              <span className="nio-card-badge" style={{ background: 'rgba(6,182,212,0.12)', color: '#06b6d4' }}>MODEL 2</span>
              <span className="nio-card-title" style={{ color: '#06b6d4' }}>Non-blocking I/O</span>
            </div>
            <div className="nio-card-metaphor">"계속 확인하기 (polling)" — 음식 됐어요? 아직요? 됐어요? 아직요?</div>
            <div className="nio-card-desc">
              소켓을 <strong style={{ color: '#06b6d4' }}>non-blocking 모드</strong>로 설정하면,
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#06b6d4' }}>read()</code> 호출 시 데이터가 준비되지 않았으면
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#f59e0b' }}>EAGAIN</code> /
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#f59e0b' }}>EWOULDBLOCK</code> 에러를 즉시 반환합니다.
              애플리케이션은 반복적으로 호출하여 데이터가 준비되었는지 확인합니다.
            </div>
            <div className="nio-diagram">{`  Application         Kernel
      │                  │
      │  read()          │
      ├─────────────────→│  아직 준비 안 됨
      │←── EAGAIN ───────┤
      │                  │
      │  read()          │
      ├─────────────────→│  아직 준비 안 됨
      │←── EAGAIN ───────┤
      │                  │
      │  read()  (반복)   │
      ├─────────────────→│  데이터 준비 완료!
      │  [블로킹 ⏳]      │  데이터 복사 (커널→유저)
      │←─────────────────┤
      │  데이터 반환      │
      ▼                  ▼`}</div>
            <div className="nio-card-desc" style={{ marginBottom: 0 }}>
              1단계(데이터 준비)는 논블로킹이지만, <strong style={{ color: '#ef4444' }}>2단계(데이터 복사)에서는 여전히 블로킹</strong>됩니다.
              또한 데이터가 언제 준비될지 모르기 때문에 <strong style={{ color: '#ef4444' }}>CPU를 지속적으로 소모</strong>(busy waiting)합니다.
              단독으로 사용하면 실용성이 매우 낮아, 보통 I/O Multiplexing과 함께 사용됩니다.
            </div>
            <div className="nio-pros-cons">
              <div className="nio-pro">
                <div className="nio-pro-label">PROS</div>
                <div className="nio-pro-list">
                  <span>• 스레드가 블로킹되지 않아 다른 작업 가능</span>
                  <span>• 타임아웃 구현이 자연스러움</span>
                </div>
              </div>
              <div className="nio-con">
                <div className="nio-con-label">CONS</div>
                <div className="nio-con-list">
                  <span>• CPU를 쉬지 않고 소모 (busy waiting)</span>
                  <span>• 폴링 간격에 따라 응답 지연 발생</span>
                  <span>• 단독으로는 거의 사용되지 않음</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. I/O Multiplexing */}
          <div className="nio-card" style={{ borderTop: '3px solid #3b82f6' }}>
            <div className="nio-card-head">
              <span className="nio-card-badge" style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}>MODEL 3</span>
              <span className="nio-card-title" style={{ color: '#3b82f6' }}>I/O Multiplexing</span>
            </div>
            <div className="nio-card-metaphor">"한 명이 여러 줄 감시" — 매니저가 여러 카운터를 동시에 관리하며, 준비된 곳만 처리</div>
            <div className="nio-card-desc">
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#3b82f6' }}>select</code> /
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#3b82f6' }}>poll</code> /
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#22c55e' }}>epoll</code> /
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#22c55e' }}>kqueue</code>를 사용하여
              <strong style={{ color: '#3b82f6' }}> 하나의 스레드가 여러 개의 파일 디스크립터(fd)를 동시에 감시</strong>합니다.
              준비된 fd에 대해서만 <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>read()</code>를 호출하므로 효율적입니다.
            </div>
            <div className="nio-diagram">{`  Application              Kernel
      │                       │
      │ epoll_wait(fds[])     │  여러 fd를 동시 감시
      ├──────────────────────→│
      │                       │  fd3 데이터 준비 완료!
      │←── fd3 ready ─────────┤
      │                       │
      │ read(fd3)             │
      ├──────────────────────→│  데이터 복사 (커널→유저)
      │←──────────────────────┤
      │ 데이터 반환            │
      │                       │
      │ epoll_wait(fds[])     │  다시 감시 시작...
      ├──────────────────────→│
      ▼                       ▼`}</div>
            <div className="nio-card-desc" style={{ marginBottom: 0 }}>
              이것이 <strong style={{ color: '#22c55e' }}>Nginx, Redis, Node.js, Netty</strong>의 핵심 원리입니다.
              하나의 스레드(이벤트 루프)가 수만 개의 연결을 효율적으로 관리할 수 있습니다.
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#3b82f6' }}>epoll_wait()</code> 자체에서 블로킹되지만,
              이는 "아무 일도 없을 때" 효율적으로 대기하는 것이므로 CPU 낭비가 아닙니다.
            </div>
            <div className="nio-pros-cons">
              <div className="nio-pro">
                <div className="nio-pro-label">PROS</div>
                <div className="nio-pro-list">
                  <span>• 1 스레드로 수만 개 연결 처리 가능</span>
                  <span>• CPU 효율적 (준비된 것만 처리)</span>
                  <span>• epoll은 O(1)로 대규모 연결에 탁월</span>
                </div>
              </div>
              <div className="nio-con">
                <div className="nio-con-label">CONS</div>
                <div className="nio-con-list">
                  <span>• 2단계(데이터 복사)는 여전히 블로킹</span>
                  <span>• 이벤트 루프 내 오래 걸리는 작업 주의</span>
                  <span>• 콜백 기반 코드 복잡도 증가</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Signal-driven I/O */}
          <div className="nio-card" style={{ borderTop: '3px solid #f59e0b' }}>
            <div className="nio-card-head">
              <span className="nio-card-badge" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>MODEL 4</span>
              <span className="nio-card-title" style={{ color: '#f59e0b' }}>Signal-driven I/O</span>
            </div>
            <div className="nio-card-metaphor">"알림 받고 처리" — 진동벨 울리면 가져가기</div>
            <div className="nio-card-desc">
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#f59e0b' }}>SIGIO</code> 시그널을 등록하면,
              데이터가 준비되었을 때 커널이 <strong style={{ color: '#f59e0b' }}>시그널로 알림</strong>을 보냅니다.
              시그널 핸들러에서 <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>read()</code>를 호출하여 데이터를 읽습니다.
            </div>
            <div className="nio-diagram">{`  Application              Kernel
      │                       │
      │ sigaction(SIGIO)      │  시그널 핸들러 등록
      ├──────────────────────→│
      │                       │
      │ (다른 작업 수행)        │  데이터 준비 대기...
      │                       │
      │←── SIGIO 시그널 ──────┤  데이터 준비 완료!
      │                       │
      │ read() (핸들러에서)    │
      ├──────────────────────→│  데이터 복사 (커널→유저)
      │←──────────────────────┤
      │ 데이터 반환            │
      ▼                       ▼`}</div>
            <div className="nio-card-desc" style={{ marginBottom: 0 }}>
              1단계는 비동기적이지만 2단계는 블로킹입니다. <strong style={{ color: '#ef4444' }}>실무에서는 거의 사용되지 않습니다.</strong>
              시그널 핸들러 내에서 할 수 있는 작업이 제한적이고(async-signal-safe 함수만 호출 가능),
              대량의 fd에 대해 시그널이 폭주하면 시그널이 누락될 수 있으며,
              epoll 같은 I/O Multiplexing이 훨씬 실용적이기 때문입니다.
            </div>
            <div className="nio-pros-cons">
              <div className="nio-pro">
                <div className="nio-pro-label">PROS</div>
                <div className="nio-pro-list">
                  <span>• 데이터 준비 대기 중 다른 작업 가능</span>
                  <span>• 폴링 없이 커널이 알려줌</span>
                </div>
              </div>
              <div className="nio-con">
                <div className="nio-con-label">CONS</div>
                <div className="nio-con-list">
                  <span>• 시그널 핸들러 내 제약 (안전한 함수만)</span>
                  <span>• 대량 fd 시 시그널 누락 가능</span>
                  <span>• epoll 대비 확장성 부족으로 실무 미사용</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Asynchronous I/O */}
          <div className="nio-card" style={{ borderTop: '3px solid #a855f7' }}>
            <div className="nio-card-head">
              <span className="nio-card-badge" style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>MODEL 5</span>
              <span className="nio-card-title" style={{ color: '#a855f7' }}>Asynchronous I/O</span>
            </div>
            <div className="nio-card-metaphor">"맡기고 끝나면 알려줘" — 배달 주문하고 벨 울리면 받기</div>
            <div className="nio-card-desc">
              <code style={{ background: 'rgba(255,255,255,0.04)', padding: '2px 6px', borderRadius: '4px', color: '#a855f7' }}>aio_read()</code>를 호출하면 <strong style={{ color: '#a855f7' }}>즉시 반환</strong>됩니다.
              커널이 <strong style={{ color: '#a855f7' }}>데이터 준비 + 유저 공간으로 복사까지 모두 완료</strong>한 후 알림(콜백/시그널/완료 큐)을 보냅니다.
              애플리케이션은 알림을 받으면 이미 유저 버퍼에 데이터가 있으므로 바로 사용할 수 있습니다.
            </div>
            <div className="nio-diagram">{`  Application              Kernel
      │                       │
      │ aio_read(buf)         │
      ├──────────────────────→│  즉시 반환!
      │←── OK ────────────────┤
      │                       │
      │ (다른 작업 수행)        │  ① 데이터 준비
      │ (완전히 자유!)          │  ② 데이터 복사 (커널→유저)
      │                       │     커널이 알아서 buf에 채움
      │                       │
      │←── 완료 알림 ──────────┤  모든 작업 완료!
      │                       │
      │ buf 바로 사용          │  (이미 복사 완료)
      ▼                       ▼`}</div>
            <div className="nio-card-desc">
              <strong style={{ color: '#a855f7' }}>진정한 비동기 I/O</strong>는 1단계, 2단계 모두 논블로킹입니다. 다른 4가지 모델과의 핵심 차이는
              <strong style={{ color: '#94a3b8' }}> 데이터 복사(2단계)까지 커널이 처리</strong>한다는 점입니다.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
              {[
                { icon: '🐧', text: 'Linux: io_uring (커널 5.1+) — 고성능 비동기 I/O의 미래', color: '#f59e0b' },
                { icon: '🪟', text: 'Windows: IOCP (I/O Completion Port) — 성숙한 비동기 I/O 구현', color: '#3b82f6' },
                { icon: '📝', text: 'POSIX: aio_read/aio_write — 오래된 표준이지만 실제 성능은 제한적', color: '#94a3b8' },
              ].map((item) => (
                <div key={item.text} className="nio-feature-item">
                  <span className="nio-feature-icon">{item.icon}</span>
                  <span><strong style={{ color: item.color }}>{item.text}</strong></span>
                </div>
              ))}
            </div>
            <div className="nio-pros-cons">
              <div className="nio-pro">
                <div className="nio-pro-label">PROS</div>
                <div className="nio-pro-list">
                  <span>• 2단계 모두 논블로킹 (진정한 비동기)</span>
                  <span>• 최고의 CPU 효율성</span>
                  <span>• io_uring은 시스템 콜 오버헤드도 최소화</span>
                </div>
              </div>
              <div className="nio-con">
                <div className="nio-con-label">CONS</div>
                <div className="nio-con-list">
                  <span>• 구현 복잡도가 가장 높음</span>
                  <span>• OS별 구현 차이 (Linux/Windows)</span>
                  <span>• io_uring은 비교적 최신 (커널 5.1+)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sync vs Async, Blocking vs Non-blocking 2x2 매트릭스 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>Sync/Async × Blocking/Non-blocking 매트릭스</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            면접에서 가장 많이 혼동하는 개념입니다. <strong style={{ color: '#94a3b8' }}>Blocking/Non-blocking</strong>은 "호출한 함수가 즉시 반환하는가?"이고,
            <strong style={{ color: '#94a3b8' }}> Sync/Async</strong>는 "결과를 누가 가져오는가(caller vs kernel)?"입니다.
          </div>
          <div className="nio-matrix">
            {/* Header row */}
            <div className="nio-matrix-cell nio-matrix-header" style={{ background: 'rgba(255,255,255,0.05)' }}></div>
            <div className="nio-matrix-cell nio-matrix-header" style={{ color: '#ef4444' }}>Blocking</div>
            <div className="nio-matrix-cell nio-matrix-header" style={{ color: '#22c55e' }}>Non-blocking</div>
            {/* Sync row */}
            <div className="nio-matrix-cell nio-matrix-label" style={{ color: '#f59e0b' }}>Synchronous</div>
            <div className="nio-matrix-cell">
              <div style={{ fontWeight: 700, color: '#94a3b8', marginBottom: '6px' }}>Blocking I/O</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.6 }}>
                read() 호출 → 데이터 준비될 때까지 블로킹<br />
                <span style={{ color: '#5a6a85' }}>ex) 전통적인 소켓 프로그래밍</span>
              </div>
            </div>
            <div className="nio-matrix-cell">
              <div style={{ fontWeight: 700, color: '#06b6d4', marginBottom: '6px' }}>Non-blocking I/O (Polling)</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.6 }}>
                read() → EAGAIN 반환 → 반복 호출<br />
                <span style={{ color: '#5a6a85' }}>ex) O_NONBLOCK 설정 후 polling</span>
              </div>
            </div>
            {/* Async row */}
            <div className="nio-matrix-cell nio-matrix-label" style={{ color: '#a855f7' }}>Asynchronous</div>
            <div className="nio-matrix-cell">
              <div style={{ fontWeight: 700, color: '#3b82f6', marginBottom: '6px' }}>I/O Multiplexing</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.6 }}>
                select/epoll에서 블로킹 대기<br />
                <span style={{ color: '#5a6a85' }}>ex) Nginx, Redis, Node.js</span>
              </div>
            </div>
            <div className="nio-matrix-cell">
              <div style={{ fontWeight: 700, color: '#a855f7', marginBottom: '6px' }}>Async I/O (AIO)</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', lineHeight: 1.6 }}>
                aio_read() → 즉시 반환 → 완료 콜백<br />
                <span style={{ color: '#5a6a85' }}>ex) io_uring, IOCP</span>
              </div>
            </div>
          </div>
          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>면접 포인트:</strong> I/O Multiplexing을 "Async + Blocking"으로 분류하는 것은 논란이 있습니다.
            select/epoll 자체는 블로킹 호출이지만, <strong style={{ color: '#94a3b8' }}>여러 fd를 동시에 감시</strong>한다는 점에서 비동기적 성격을 가집니다.
            Richard Stevens의 『UNIX Network Programming』에서는 이를 <strong style={{ color: '#94a3b8' }}>별도 카테고리(I/O Multiplexing)</strong>로 분류합니다.
            면접에서는 "I/O Multiplexing은 동기와 비동기의 중간 성격"이라고 답하면 깊은 이해를 보여줄 수 있습니다.
          </HighlightBox>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="nio-feature-item">
              <span className="nio-feature-icon">🔑</span>
              <span style={{ fontSize: '12px', lineHeight: 1.7 }}>
                <strong style={{ color: '#3b82f6' }}>Blocking vs Non-blocking:</strong> "호출된 함수"가 바로 리턴하느냐 마느냐.
                read()가 즉시 반환하면 Non-blocking, 데이터 올 때까지 기다리면 Blocking
              </span>
            </div>
            <div className="nio-feature-item">
              <span className="nio-feature-icon">🔑</span>
              <span style={{ fontSize: '12px', lineHeight: 1.7 }}>
                <strong style={{ color: '#a855f7' }}>Sync vs Async:</strong> "결과"를 누가 가져오느냐.
                호출자가 직접 결과를 확인하면 Sync, 커널이 완료 후 알려주면 Async
              </span>
            </div>
          </div>
        </div>

        {/* 애니메이션: Blocking vs Multiplexing vs Async */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>I/O 모델 동시 처리 비교</SectionTitle>
          <div className="nio-anim-box">
            <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
              3개의 클라이언트 요청을 각 I/O 모델이 어떻게 처리하는지 비교합니다.
            </div>

            <div className="nio-anim-panels">
              {/* Blocking Panel */}
              <div className="nio-anim-panel" style={{ borderTop: '2px solid #94a3b8' }}>
                <div className="nio-anim-panel-title" style={{ color: '#94a3b8' }}>Blocking I/O<br /><span style={{ fontSize: '9px', color: '#5a6a85' }}>3 threads needed</span></div>
                {clients.map((c, i) => (
                  <div key={c} className="nio-anim-row" style={{ background: getBlockingWidth(i) !== '0%' ? 'rgba(148,163,184,0.06)' : 'transparent' }}>
                    <div className="nio-anim-client" style={{ background: clientColors[i], color: '#0a0d14', fontWeight: 700 }}>{c}</div>
                    <div style={{ flex: 1 }}>
                      <div className="nio-anim-bar" style={{ width: getBlockingWidth(i), background: `linear-gradient(90deg, ${clientColors[i]}, ${clientColors[i]}88)` }} />
                    </div>
                    <div className="nio-anim-status" style={{ color: getBlockingLabel(i) === '완료' ? '#22c55e' : '#5a6a85' }}>{getBlockingLabel(i)}</div>
                  </div>
                ))}
                <div style={{ fontSize: '9px', color: '#5a6a85', textAlign: 'center', marginTop: '4px', fontFamily: 'JetBrains Mono,monospace' }}>
                  스레드: {step >= 1 ? Math.min(step, 3) : 0}개 사용 중
                </div>
              </div>

              {/* Multiplexing Panel */}
              <div className="nio-anim-panel" style={{ borderTop: '2px solid #3b82f6' }}>
                <div className="nio-anim-panel-title" style={{ color: '#3b82f6' }}>I/O Multiplexing<br /><span style={{ fontSize: '9px', color: '#5a6a85' }}>1 thread (epoll)</span></div>
                {clients.map((c, i) => (
                  <div key={c} className="nio-anim-row" style={{ background: getMuxWidth(i) !== '0%' ? 'rgba(59,130,246,0.06)' : 'transparent' }}>
                    <div className="nio-anim-client" style={{ background: clientColors[i], color: '#0a0d14', fontWeight: 700 }}>{c}</div>
                    <div style={{ flex: 1 }}>
                      <div className="nio-anim-bar" style={{ width: getMuxWidth(i), background: `linear-gradient(90deg, ${clientColors[i]}, ${clientColors[i]}88)` }} />
                    </div>
                    <div className="nio-anim-status" style={{ color: getMuxLabel(i) === '완료' ? '#22c55e' : '#5a6a85' }}>{getMuxLabel(i)}</div>
                  </div>
                ))}
                <div style={{ fontSize: '9px', color: '#5a6a85', textAlign: 'center', marginTop: '4px', fontFamily: 'JetBrains Mono,monospace' }}>
                  스레드: {step >= 4 ? 1 : 0}개 사용 중
                </div>
              </div>

              {/* Async Panel */}
              <div className="nio-anim-panel" style={{ borderTop: '2px solid #a855f7' }}>
                <div className="nio-anim-panel-title" style={{ color: '#a855f7' }}>Async I/O<br /><span style={{ fontSize: '9px', color: '#5a6a85' }}>1 thread (kernel)</span></div>
                {clients.map((c, i) => (
                  <div key={c} className="nio-anim-row" style={{ background: getAsyncWidth(i) !== '0%' ? 'rgba(168,85,247,0.06)' : 'transparent' }}>
                    <div className="nio-anim-client" style={{ background: clientColors[i], color: '#0a0d14', fontWeight: 700 }}>{c}</div>
                    <div style={{ flex: 1 }}>
                      <div className="nio-anim-bar" style={{ width: getAsyncWidth(i), background: `linear-gradient(90deg, ${clientColors[i]}, ${clientColors[i]}88)` }} />
                    </div>
                    <div className="nio-anim-status" style={{ color: getAsyncLabel(i) === '콜백 완료' ? '#22c55e' : '#5a6a85' }}>{getAsyncLabel(i)}</div>
                  </div>
                ))}
                <div style={{ fontSize: '9px', color: '#5a6a85', textAlign: 'center', marginTop: '4px', fontFamily: 'JetBrains Mono,monospace' }}>
                  스레드: {step >= 7 ? 1 : 0}개 (커널이 처리)
                </div>
              </div>
            </div>

            <AnimationControls color="#3b82f6" status={status} onPlay={play} onReset={handleReset} />

            {/* STEP-BY-STEP */}
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2234', borderRadius: '10px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'JetBrains Mono,monospace' }}>STEP-BY-STEP</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { num: '①', text: 'Blocking: 각 클라이언트마다 전용 스레드가 할당되어 순서대로 블로킹 대기', color: '#94a3b8' },
                  { num: '②', text: 'Blocking: 3개 클라이언트 → 3개 스레드 필요, 각각 독립적으로 대기', color: '#94a3b8' },
                  { num: '③', text: 'Multiplexing: epoll이 3개 fd를 동시에 감시, 이벤트 발생 시 1개 스레드가 순차 처리', color: '#3b82f6' },
                  { num: '④', text: 'Multiplexing: 준비된 fd만 처리하므로 1개 스레드로 3개 클라이언트 처리 완료', color: '#3b82f6' },
                  { num: '⑤', text: 'Async: aio_read() 3개를 동시 요청 후 즉시 반환, 커널이 모든 작업 수행', color: '#a855f7' },
                  { num: '⑥', text: 'Async: 커널이 데이터 준비+복사 완료 후 콜백으로 알림 → 유저 공간에서 즉시 사용', color: '#a855f7' },
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

        {/* select vs poll vs epoll */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>select vs poll vs epoll</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '16px', lineHeight: 1.7 }}>
            I/O Multiplexing의 3가지 시스템 콜입니다. <strong style={{ color: '#22c55e' }}>epoll</strong>이 현대 리눅스 고성능 서버의 표준입니다.
          </div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '20px' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>항목</th>
                  <th style={{ color: '#94a3b8' }}>select</th>
                  <th style={{ color: '#f59e0b' }}>poll</th>
                  <th style={{ color: '#22c55e' }}>epoll</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['fd 개수 제한', '1024개 (FD_SETSIZE)', '제한 없음 (배열)', '제한 없음'],
                  ['fd 전달 방식', '매번 전체 fd 집합 복사', '매번 전체 fd 배열 복사', 'epoll_ctl로 1회 등록'],
                  ['준비된 fd 탐색', 'O(n) 전체 스캔', 'O(n) 전체 스캔', 'O(1) 준비된 것만 반환'],
                  ['성능 (10K fd)', '매우 느림', '느림', '빠름 (거의 일정)'],
                  ['커널-유저 복사', '매번 전체 복사', '매번 전체 복사', '변경분만 전달'],
                  ['트리거 방식', '레벨 트리거', '레벨 트리거', '레벨 + 엣지 트리거'],
                  ['사용 OS', 'POSIX (범용)', 'POSIX (범용)', 'Linux 전용'],
                ].map(([label, sel, pol, epo]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600 }}>{label}</td>
                    <td style={{ color: '#c4c9d4' }}>{sel}</td>
                    <td style={{ color: '#fcd34d' }}>{pol}</td>
                    <td style={{ color: '#86efac' }}>{epo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* epoll 레벨/엣지 트리거 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '2px solid #3b82f6' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#3b82f6', marginBottom: '8px' }}>레벨 트리거 (Level-Triggered)</div>
              <div style={{ fontSize: '11px', color: '#5a6a85', fontFamily: 'JetBrains Mono,monospace', marginBottom: '10px' }}>기본 모드 · select/poll과 동일</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7 }}>
                버퍼에 데이터가 <strong style={{ color: '#3b82f6' }}>남아있는 동안 계속</strong> 이벤트를 발생시킵니다.
                read()로 일부만 읽어도 다음 epoll_wait()에서 다시 알려줍니다.
                구현이 쉽지만, 불필요한 이벤트가 반복될 수 있습니다.
              </div>
            </div>
            <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '14px', padding: '20px', borderTop: '2px solid #22c55e' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>엣지 트리거 (Edge-Triggered)</div>
              <div style={{ fontSize: '11px', color: '#5a6a85', fontFamily: 'JetBrains Mono,monospace', marginBottom: '10px' }}>EPOLLET 플래그 · 고성능 서버</div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.7 }}>
                <strong style={{ color: '#22c55e' }}>상태가 변할 때 한 번만</strong> 이벤트를 발생시킵니다.
                반드시 EAGAIN이 나올 때까지 모든 데이터를 읽어야 합니다.
                이벤트 수가 적어 성능이 좋지만, 구현 난이도가 높습니다.
              </div>
            </div>
          </div>

          <HighlightBox color="#22c55e">
            <strong style={{ color: '#22c55e' }}>epoll이 대규모 연결에서 압도적인 이유:</strong> select/poll은 매번 모든 fd를 커널에 복사하고, 커널이 모든 fd를 순회(O(n))합니다.
            반면 epoll은 <strong style={{ color: '#94a3b8' }}>fd를 커널에 1회 등록</strong>하고, <strong style={{ color: '#94a3b8' }}>이벤트가 발생한 fd만 반환</strong>(O(1))합니다.
            10만 개 연결 중 10개만 활성화되어도, select는 10만 개를 스캔하지만 epoll은 10개만 처리합니다.
          </HighlightBox>
        </div>

        {/* Reactor 패턴 & Proactor 패턴 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>Reactor 패턴 & Proactor 패턴</SectionTitle>
          <div style={{ fontSize: '13px', color: '#5a6a85', marginBottom: '20px', lineHeight: 1.7 }}>
            I/O 모델을 기반으로 고성능 서버를 설계하는 두 가지 대표적인 아키텍처 패턴입니다.
          </div>
          <div className="nio-pattern-grid">
            {/* Reactor */}
            <div className="nio-pattern-card" style={{ borderTop: '3px solid #3b82f6', boxShadow: '0 0 30px rgba(59,130,246,0.1)' }}>
              <div className="nio-pattern-title" style={{ color: '#3b82f6' }}>Reactor 패턴</div>
              <div className="nio-pattern-sub">I/O Multiplexing + 이벤트 루프</div>
              <div className="nio-pattern-desc">
                <strong style={{ color: '#3b82f6' }}>I/O 이벤트를 감지</strong>한 후, 해당 이벤트를 적절한 핸들러에 <strong style={{ color: '#94a3b8' }}>디스패치(dispatch)</strong>합니다.
                이벤트 루프가 epoll/kqueue로 fd를 감시하고, 준비된 fd에 대해 <strong style={{ color: '#94a3b8' }}>read()를 직접 호출</strong>합니다.
              </div>
              <div className="nio-diagram">{`  ┌─────────────────────────┐
  │     Event Loop           │
  │  (epoll_wait / kqueue)   │
  └──────────┬───────────────┘
             │ 이벤트 감지
      ┌──────┼──────┐
      ▼      ▼      ▼
   Handler Handler Handler
   read()  read()  read()
   처리     처리     처리`}</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', marginBottom: '14px', lineHeight: 1.7 }}>
                핵심: <strong style={{ color: '#3b82f6' }}>I/O 준비 완료를 감지 → 애플리케이션이 read()</strong> 호출.
                1단계(감시)는 Reactor가, 2단계(read + 처리)는 핸들러가 담당합니다.
              </div>
              <div className="nio-pattern-frameworks">
                {['Nginx', 'Redis', 'Node.js', 'Netty', 'libuv'].map((fw) => (
                  <span key={fw} className="nio-pattern-fw" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>{fw}</span>
                ))}
              </div>
            </div>

            {/* Proactor */}
            <div className="nio-pattern-card" style={{ borderTop: '3px solid #a855f7', boxShadow: '0 0 30px rgba(168,85,247,0.1)' }}>
              <div className="nio-pattern-title" style={{ color: '#a855f7' }}>Proactor 패턴</div>
              <div className="nio-pattern-sub">Async I/O + 완료 알림</div>
              <div className="nio-pattern-desc">
                <strong style={{ color: '#a855f7' }}>비동기 I/O 작업을 시작</strong>한 후, <strong style={{ color: '#94a3b8' }}>커널이 모든 작업을 완료</strong>하면 알림을 받아 처리합니다.
                애플리케이션은 read()를 호출하지 않고, 커널이 데이터를 유저 버퍼에 채운 후 콜백을 호출합니다.
              </div>
              <div className="nio-diagram">{`  ┌─────────────────────────┐
  │   Completion Handler     │
  │  (완료 큐 / 콜백)        │
  └──────────┬───────────────┘
             │ 완료 알림
      ┌──────┼──────┐
      ▼      ▼      ▼
   Handler Handler Handler
   (이미    (이미    (이미
   데이터   데이터   데이터
   준비됨)  준비됨)  준비됨)`}</div>
              <div style={{ fontSize: '12px', color: '#5a6a85', marginBottom: '14px', lineHeight: 1.7 }}>
                핵심: <strong style={{ color: '#a855f7' }}>커널이 I/O 완료(준비+복사) → 애플리케이션에 통보.</strong>
                애플리케이션은 데이터가 이미 유저 버퍼에 있으므로 바로 비즈니스 로직을 수행합니다.
              </div>
              <div className="nio-pattern-frameworks">
                {['Windows IOCP', 'io_uring', 'Boost.Asio'].map((fw) => (
                  <span key={fw} className="nio-pattern-fw" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7', border: '1px solid rgba(168,85,247,0.2)' }}>{fw}</span>
                ))}
              </div>
            </div>
          </div>

          <HighlightBox color="#a855f7" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#a855f7' }}>핵심 차이:</strong> Reactor는 "I/O 준비됐다"는 알림을 받고 <strong style={{ color: '#3b82f6' }}>직접 read()</strong>를 호출합니다.
            Proactor는 "I/O 다 끝났다"는 알림을 받고 <strong style={{ color: '#a855f7' }}>이미 복사된 데이터를 사용</strong>합니다.
            현재 대부분의 고성능 서버는 Reactor 패턴을 사용하지만, io_uring의 등장으로 Linux에서도 Proactor 패턴이 주목받고 있습니다.
          </HighlightBox>
        </div>

        {/* C10K 문제와 해결 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>C10K 문제와 해결</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '18px', padding: '28px', marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              <strong style={{ color: '#3b82f6' }}>C10K 문제</strong>는 1999년 Dan Kegel이 제기한 질문입니다:
              <strong style={{ color: '#f59e0b' }}> "하나의 서버에서 1만 개의 동시 접속을 어떻게 처리할 것인가?"</strong>
              당시 Thread-per-connection 모델로는 불가능에 가까웠고, 이 문제가 I/O Multiplexing과 이벤트 기반 서버 아키텍처의 발전을 촉발했습니다.
            </div>

            <div style={{ fontSize: '14px', fontWeight: 700, color: '#ef4444', marginBottom: '12px' }}>Thread-per-connection의 한계</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {[
                { icon: '💾', text: '메모리: 스레드당 ~1MB 스택 → 10K 스레드 = 10GB 메모리', color: '#ef4444' },
                { icon: '🔄', text: '컨텍스트 스위칭: 10K 스레드 간 전환 → CPU 시간 대부분 스위칭에 소비', color: '#ef4444' },
                { icon: '🔒', text: '동기화: 공유 자원 접근 시 Lock 경합 심화', color: '#ef4444' },
                { icon: '📉', text: '확장성: 스레드 수 증가 시 성능이 급격히 감소 (비선형)', color: '#ef4444' },
              ].map((item) => (
                <div key={item.text} className="nio-feature-item">
                  <span className="nio-feature-icon">{item.icon}</span>
                  <span style={{ fontSize: '12px' }}><strong style={{ color: item.color }}>{item.text}</strong></span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '14px', fontWeight: 700, color: '#22c55e', marginBottom: '12px' }}>해결: I/O Multiplexing + Event Loop</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {[
                { icon: '⚡', text: '1개의 이벤트 루프 스레드가 수만 개의 연결을 epoll로 감시', color: '#22c55e' },
                { icon: '🧵', text: '소수의 워커 스레드로 CPU 바운드 작업 처리 (필요시)', color: '#22c55e' },
                { icon: '📊', text: '메모리: 연결당 수 KB만 필요 (fd + 버퍼), 10K 연결 ≈ 수십 MB', color: '#22c55e' },
                { icon: '🚀', text: 'Nginx, Node.js, Redis 등이 이 방식으로 C10K 이상 처리', color: '#22c55e' },
              ].map((item) => (
                <div key={item.text} className="nio-feature-item">
                  <span className="nio-feature-icon">{item.icon}</span>
                  <span style={{ fontSize: '12px' }}><strong style={{ color: item.color }}>{item.text}</strong></span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '14px', fontWeight: 700, color: '#a855f7', marginBottom: '12px' }}>C10K → C10M → C100M 진화</div>
            <div className="nio-c10k-timeline">
              {[
                { year: '1999', text: 'C10K — Dan Kegel이 문제 제기. Thread-per-connection 한계', color: '#3b82f6' },
                { year: '2002', text: 'epoll 등장 (Linux 2.5.44). O(1) I/O Multiplexing', color: '#3b82f6' },
                { year: '2004', text: 'Nginx 공개. 이벤트 기반 아키텍처로 C10K 해결', color: '#22c55e' },
                { year: '2009', text: 'Node.js 공개. 이벤트 루프 + 논블로킹 I/O 대중화', color: '#22c55e' },
                { year: '2010+', text: 'C10M 도전. 커널 바이패스(DPDK, XDP), 유저 공간 네트워킹', color: '#a855f7' },
                { year: '2019+', text: 'io_uring 등장. 시스템 콜 오버헤드 최소화, Proactor 패턴 가능', color: '#a855f7' },
              ].map((item) => (
                <div key={item.year} className="nio-c10k-item">
                  <div className="nio-c10k-dot" style={{ borderColor: item.color, background: `${item.color}33` }} />
                  <div className="nio-c10k-year" style={{ color: item.color }}>{item.year}</div>
                  <div className="nio-c10k-text">{item.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 면접 질문 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#3b82f6" items={[
            {
              q: 'Blocking I/O와 Non-blocking I/O의 차이를 설명해주세요.',
              a: 'Blocking I/O는 read() 호출 시 데이터가 준비될 때까지 스레드가 멈춥니다. Non-blocking I/O는 데이터가 없으면 EAGAIN을 즉시 반환하고 스레드가 다른 작업을 할 수 있습니다. 단, Non-blocking도 2단계(데이터 복사)에서는 블로킹됩니다. Non-blocking 단독으로는 busy waiting 문제가 있어 실무에서는 epoll 같은 I/O Multiplexing과 함께 사용합니다.',
            },
            {
              q: 'select, poll, epoll의 차이와 epoll이 더 빠른 이유를 설명해주세요.',
              a: 'select는 fd 1024개 제한이 있고, poll은 제한이 없지만 둘 다 매번 전체 fd 집합을 커널에 복사하고 O(n)으로 순회합니다. epoll은 fd를 커널에 1회 등록(epoll_ctl)하고, 이벤트 발생 시 준비된 fd만 O(1)로 반환합니다. 10만 개 연결 중 10개만 활성화되어도 select는 10만 개를 스캔하지만, epoll은 10개만 처리합니다. 추가로 epoll은 엣지 트리거를 지원하여 이벤트 수를 더 줄일 수 있습니다.',
            },
            {
              q: 'Sync/Async와 Blocking/Non-blocking의 차이를 설명해주세요.',
              a: 'Blocking/Non-blocking은 "호출된 함수가 즉시 반환하느냐"의 관점입니다. read()가 데이터 없으면 기다리면 Blocking, EAGAIN을 반환하면 Non-blocking입니다. Sync/Async는 "결과를 누가 가져오느냐"의 관점입니다. 호출자가 직접 결과를 확인하면 Sync, 커널이 작업 완료 후 알려주면 Async입니다. Blocking I/O와 Non-blocking I/O는 둘 다 Sync입니다(호출자가 직접 read). 진정한 Async는 aio_read처럼 커널이 완료 후 알려주는 방식입니다.',
            },
            {
              q: 'Node.js가 싱글 스레드인데 어떻게 동시에 여러 요청을 처리하나요?',
              a: 'Node.js의 메인 스레드(이벤트 루프)는 싱글 스레드이지만, I/O Multiplexing(Linux에서 epoll)을 사용합니다. 이벤트 루프가 수만 개의 소켓을 동시에 감시하고, 데이터가 준비된 소켓만 처리합니다. I/O 대기 중에는 블로킹되지 않고 다른 요청을 처리할 수 있어 높은 동시성을 달성합니다. 단, CPU 집약적 작업은 이벤트 루프를 블로킹하므로 Worker Threads나 별도 프로세스로 분리해야 합니다. 파일 I/O 등은 내부적으로 libuv의 스레드 풀을 사용합니다.',
            },
            {
              q: 'Reactor 패턴과 Proactor 패턴의 차이를 설명해주세요.',
              a: 'Reactor는 "I/O 준비 완료" 이벤트를 감지한 후 애플리케이션이 직접 read()를 호출합니다. I/O Multiplexing 기반이며 Nginx, Redis, Netty가 사용합니다. Proactor는 비동기 I/O를 시작하고 "I/O 완료" 이벤트를 받습니다. 커널이 데이터 준비+복사를 모두 수행하고, 애플리케이션은 이미 준비된 데이터를 사용합니다. Windows IOCP, Linux io_uring이 대표적입니다. Reactor는 "준비됐으니 읽어라", Proactor는 "다 끝났으니 써라"의 차이입니다.',
            },
            {
              q: 'Java NIO와 Netty의 I/O 모델을 설명해주세요.',
              a: 'Java NIO는 Selector(I/O Multiplexing)를 제공합니다. Selector가 여러 Channel(fd)을 감시하고 준비된 Channel에 대해 read/write를 수행합니다. 내부적으로 Linux에서 epoll을 사용합니다. Netty는 Java NIO 위에 Reactor 패턴을 구현한 프레임워크입니다. Boss EventLoopGroup이 연결 수락을, Worker EventLoopGroup이 I/O 처리를 담당하는 Multi-Reactor 구조입니다. Channel Pipeline으로 요청 처리 단계를 체인으로 구성하여 높은 확장성을 제공합니다.',
            },
          ]} />
        </div>

        {/* 한눈에 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>5가지 I/O 모델 한눈에 비교</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '14%' }}>I/O 모델</th>
                  <th>1단계 (데이터 준비)</th>
                  <th>2단계 (데이터 복사)</th>
                  <th>복잡도</th>
                  <th>성능</th>
                  <th>대표 구현</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Blocking', '블로킹 ⏳', '블로킹 ⏳', '낮음', '낮음', 'Thread-per-conn'],
                  ['Non-blocking', '논블로킹 (폴링)', '블로킹 ⏳', '중간', '낮음', 'O_NONBLOCK'],
                  ['Multiplexing', '블로킹 (감시)', '블로킹 ⏳', '중간', '높음', 'select/epoll'],
                  ['Signal-driven', '논블로킹 (시그널)', '블로킹 ⏳', '높음', '중간', 'SIGIO'],
                  ['Async I/O', '논블로킹', '논블로킹', '매우 높음', '매우 높음', 'io_uring/IOCP'],
                ].map(([model, s1, s2, cmplx, perf, impl]) => {
                  const colors: Record<string, string> = {
                    'Blocking': '#94a3b8', 'Non-blocking': '#67e8f9', 'Multiplexing': '#93c5fd',
                    'Signal-driven': '#fcd34d', 'Async I/O': '#c4b5fd',
                  }
                  return (
                    <tr key={model}>
                      <td style={{ color: colors[model], fontWeight: 700 }}>{model}</td>
                      <td style={{ color: s1.includes('논블로킹') ? '#86efac' : '#fca5a5' }}>{s1}</td>
                      <td style={{ color: s2.includes('논블로킹') ? '#86efac' : '#fca5a5' }}>{s2}</td>
                      <td style={{ color: '#94a3b8' }}>{cmplx}</td>
                      <td style={{ color: perf === '매우 높음' ? '#86efac' : perf === '높음' ? '#93c5fd' : perf === '중간' ? '#fcd34d' : '#fca5a5' }}>{perf}</td>
                      <td style={{ color: '#5a6a85', fontFamily: 'JetBrains Mono,monospace', fontSize: '11px' }}>{impl}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import Timeline, { TimelineWait } from '../../components/doc/Timeline'
import StepByStep, { StepKey } from '../../components/doc/StepByStep'
import { DocGrid, DocCard, SectionBox, FeatureRow, DocTable } from '../../components/doc/DocPrimitives'
import { DiagramContainer } from '../../components/doc/Diagram'
import { useInjectCSS } from '../../hooks/useInjectCSS'

/* ── Page-specific CSS only ── */
const CSS = `
/* Lock compat matrix */
.lk-compat { display:grid; grid-template-columns:repeat(3,1fr); gap:0; border:1px solid #1a2234; border-radius:14px; overflow:hidden; }
.lk-compat-cell { padding:14px; text-align:center; font-size:12px; font-weight:700; border-right:1px solid rgba(26,34,52,0.3); border-bottom:1px solid rgba(26,34,52,0.3); }
.lk-compat-cell:nth-child(3n) { border-right:none; }
.lk-compat-cell:nth-last-child(-n+3) { border-bottom:none; }
.lk-compat-head { background:#0a0e17; color:#64748b; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; }
/* Deadlock diagram */
.lk-deadlock { display:flex; align-items:center; justify-content:center; gap:24px; padding:20px; flex-wrap:wrap; }
.lk-dl-node { background:#0e1118; border:1.5px solid #1a2234; border-radius:14px; padding:16px 24px; display:flex; flex-direction:column; align-items:center; gap:6px; min-width:120px; }
.lk-dl-label { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.lk-dl-sub { font-size:10px; color:#5a6a85; }
.lk-dl-arrows { display:flex; flex-direction:column; align-items:center; gap:4px; }
.lk-dl-arrow { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; }
/* Gap lock visual */
.lk-gap-bar { display:flex; align-items:stretch; gap:0; border-radius:10px; overflow:hidden; border:1px solid #1a2234; }
.lk-gap-cell { padding:14px 0; flex:1; text-align:center; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; border-right:1px solid rgba(26,34,52,0.3); position:relative; display:flex; flex-direction:column; align-items:center; gap:4px; }
.lk-gap-cell:last-child { border-right:none; }
.lk-gap-label { font-size:9px; color:#5a6a85; font-weight:600; }
/* Optimistic vs Pessimistic */
.lk-vs-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:640px){ .lk-vs-grid { grid-template-columns:1fr; } }
.lk-vs-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; }
.lk-vs-head { display:flex; align-items:center; gap:10px; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #1a2234; }
.lk-vs-icon { font-size:22px; }
.lk-vs-title { font-size:14px; font-weight:800; }
.lk-vs-tag { font-size:9px; font-weight:700; padding:2px 8px; border-radius:99px; }
.lk-vs-list { display:flex; flex-direction:column; gap:8px; }
.lk-vs-item { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:#94a3b8; line-height:1.7; }
.lk-vs-item-icon { flex-shrink:0; margin-top:2px; }
`

export default function LockConcurrency() {
  useInjectCSS('style-lock-concurrency', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(239,68,68,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Lock · S/X Lock · Gap Lock · Deadlock · 동시성 제어"
          title={<><span style={{ color: '#06b6d4' }}>락 &amp; 동시성 제어</span> 심화</>}
          description="공유 락과 배타 락, 비관적/낙관적 락 전략, Gap Lock, 데드락 발생과 해결 — 면접에서 정확히 답변하기 위한 가이드"
        />

        {/* ── S Lock vs X Lock ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>공유 락(S) vs 배타 락(X)</SectionTitle>

          <SectionBox subtitle="락(Lock)이란?" subtitleColor="#06b6d4" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="🔒">
                <strong style={{ color: '#e2e8f0' }}>동시성 제어의 핵심 수단:</strong> 여러 트랜잭션이 동시에 같은 데이터에 접근할 때, <strong style={{ color: '#06b6d4' }}>데이터 일관성</strong>을 보장하기 위해 접근을 제어하는 메커니즘입니다.
              </FeatureRow>
              <FeatureRow icon="📊">
                <strong style={{ color: '#e2e8f0' }}>락의 단위(Granularity):</strong> 테이블 락, 페이지 락, <strong style={{ color: '#22c55e' }}>행 락(Row Lock)</strong> 등이 있으며, InnoDB는 기본적으로 행 단위 락을 사용합니다. 락 범위가 좁을수록 동시성이 높지만 오버헤드가 증가합니다.
              </FeatureRow>
            </div>
          </SectionBox>

          <DocGrid style={{ marginBottom: '20px' }}>
            <DocCard title="S Lock — Shared Lock (공유 락)" titleColor="#3b82f6">
              <strong style={{ color: '#e2e8f0' }}>읽기 보호</strong>를 위한 락입니다. 여러 트랜잭션이 동시에 S Lock을 획득할 수 있습니다.
              다른 트랜잭션의 <strong style={{ color: '#22c55e' }}>읽기는 허용</strong>하되 <strong style={{ color: '#ef4444' }}>쓰기는 차단</strong>합니다.
            </DocCard>
            <DocCard title="X Lock — Exclusive Lock (배타 락)" titleColor="#ef4444">
              <strong style={{ color: '#e2e8f0' }}>쓰기 보호</strong>를 위한 락입니다. 하나의 트랜잭션만 X Lock을 획득할 수 있습니다.
              다른 트랜잭션의 <strong style={{ color: '#ef4444' }}>읽기(Locking Read)/쓰기 모두 차단</strong>합니다.
            </DocCard>
          </DocGrid>

          {/* 언제 S/X Lock이 걸리는가 */}
          <SectionBox subtitle="언제 S Lock / X Lock이 걸리는가?" subtitleColor="#06b6d4" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="👁️">
                <strong style={{ color: '#e2e8f0' }}>일반 SELECT — 락 없음:</strong> InnoDB의 MVCC 덕분에 일반 <code style={{ color: '#06b6d4' }}>SELECT</code>는 <strong style={{ color: '#22c55e' }}>어떤 락도 걸지 않습니다.</strong> 스냅샷(Read View)을 읽으므로 다른 트랜잭션의 쓰기를 방해하지 않습니다.
              </FeatureRow>
              <FeatureRow icon="🔵">
                <strong style={{ color: '#3b82f6' }}>SELECT ... FOR SHARE → S Lock:</strong> "이 데이터를 읽는 동안 다른 트랜잭션이 <strong style={{ color: '#ef4444' }}>수정하지 못하게</strong>" 할 때 사용합니다. 예: 주문 생성 전 상품 존재 여부를 확인하면서, 그 사이에 상품이 삭제되는 것을 방지.
              </FeatureRow>
              <FeatureRow icon="🔴">
                <strong style={{ color: '#ef4444' }}>SELECT ... FOR UPDATE → X Lock:</strong> "이 데이터를 읽고 <strong style={{ color: '#ef4444' }}>곧 수정할 예정</strong>이니 다른 트랜잭션의 읽기/쓰기 모두 차단" 할 때 사용합니다. 예: 계좌 잔액을 읽고 출금하기 전, 다른 출금이 끼어드는 것을 방지.
              </FeatureRow>
              <FeatureRow icon="✏️">
                <strong style={{ color: '#ef4444' }}>UPDATE / DELETE → 자동 X Lock:</strong> InnoDB가 변경 대상 행에 <strong style={{ color: '#ef4444' }}>자동으로 X Lock</strong>을 겁니다. 명시적 FOR UPDATE 없이도 쓰기 시 항상 배타 락이 걸립니다.
              </FeatureRow>
            </div>
          </SectionBox>

          {/* 실전 시나리오: S Lock */}
          <Timeline
            icon="🔵"
            title="S Lock 시나리오 — 읽는 동안 수정 차단"
            color="#3b82f6"
            subtitle="주문 생성 중 상품 삭제 방지"
            tx1Label="TX1 (주문 생성)"
            tx2Label="TX2 (상품 삭제)"
            dbLabel="상품 상태"
            dbInitial="존재"
            steps={[
              { time: 'T1', tx1: <span>SELECT product <strong style={{ color: '#3b82f6' }}>FOR SHARE</strong> → 🔒 S Lock</span>, tx1Type: 'ok' },
              { time: 'T2', tx2: <span>DELETE product → <TimelineWait><span style={{ color: '#f59e0b' }}>S Lock 대기...</span></TimelineWait></span>, tx2Type: 'warn' },
              { time: 'T3', tx1: 'INSERT INTO orders (...)', tx1Type: 'ok' },
              { time: 'T4', tx1: <span>COMMIT ✓ → <span style={{ color: '#22c55e' }}>🔓 S Lock 해제</span></span>, tx1Type: 'ok' },
              { time: 'T5', tx2: <span>DELETE 실행 (상품 삭제됨)</span>, tx2Type: 'ok', dbValue: '삭제됨' },
            ]}
            result={<>✅ S Lock 덕분에 주문이 완료될 때까지 상품이 삭제되지 않습니다. 주문의 FK 무결성이 보장됩니다.</>}
            resultColor="#22c55e"
          />

          <StepByStep
            title="📋 Step-by-Step 해설 — S Lock 시나리오"
            steps={[
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">TX1이 상품을 FOR SHARE로 조회 → S Lock 획득</StepKey> — 주문을 생성하기 전, 참조할 상품이 존재하는지 확인합니다. S Lock을 걸면 <strong style={{ color: '#e2e8f0' }}>다른 트랜잭션이 이 행을 수정/삭제할 수 없습니다.</strong> 하지만 다른 트랜잭션이 같은 행에 S Lock(FOR SHARE)을 거는 것은 허용됩니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">TX2가 DELETE 시도 → 대기</StepKey> — DELETE는 X Lock을 필요로 하는데, TX1이 S Lock을 보유하고 있으므로 <strong style={{ color: '#f59e0b' }}>S Lock과 X Lock은 호환되지 않아 대기</strong>합니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">TX1이 주문 INSERT 후 COMMIT</StepKey> — 주문이 성공적으로 생성되고, COMMIT 시 S Lock이 해제됩니다. 그제서야 TX2의 DELETE가 실행됩니다.</> },
            ]}
          />

          {/* 실전 시나리오: X Lock */}
          <Timeline
            icon="🔴"
            title="X Lock 시나리오 — 읽기부터 독점"
            color="#ef4444"
            subtitle="재고 차감 시 동시 접근 차단"
            tx1Label="TX1 (구매 1개)"
            tx2Label="TX2 (구매 1개)"
            dbLabel="재고(stock)"
            dbInitial="5"
            steps={[
              { time: 'T1', tx1: <span>SELECT stock <strong style={{ color: '#ef4444' }}>FOR UPDATE</strong> → 5 🔒 X Lock</span>, tx1Type: 'ok' },
              { time: 'T2', tx2: <span>SELECT stock <strong style={{ color: '#ef4444' }}>FOR UPDATE</strong> → <TimelineWait><span style={{ color: '#f59e0b' }}>X Lock 대기...</span></TimelineWait></span>, tx2Type: 'warn' },
              { time: 'T3', tx1: 'UPDATE stock = 4', tx1Type: 'ok', dbValue: '4' },
              { time: 'T4', tx1: <span>COMMIT ✓ → <span style={{ color: '#22c55e' }}>🔓 X Lock 해제</span></span>, tx1Type: 'ok' },
              { time: 'T5', tx2: <span>🔒 X Lock 획득 → stock = <strong style={{ color: '#22c55e' }}>4</strong></span>, tx2Type: 'ok', dbValue: '4' },
              { time: 'T6', tx2: 'UPDATE stock = 3, COMMIT ✓', tx2Type: 'ok', dbValue: '3' },
            ]}
            result={<>✅ 재고 5 → 4 → 3. X Lock으로 두 구매가 순차 처리되어 정확한 재고가 유지됩니다.</>}
            resultColor="#22c55e"
          />

          <StepByStep
            title="📋 Step-by-Step 해설 — X Lock 시나리오"
            steps={[
              { color: '#ef4444', content: <><StepKey color="#ef4444">TX1이 FOR UPDATE로 재고 조회 → X Lock</StepKey> — 재고를 읽는 시점에 <strong style={{ color: '#e2e8f0' }}>X Lock을 획득</strong>합니다. S Lock(FOR SHARE)과 달리, 다른 트랜잭션의 <strong style={{ color: '#ef4444' }}>Locking Read(FOR SHARE/FOR UPDATE)와 쓰기 모두 차단</strong>됩니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">TX2도 FOR UPDATE 시도 → 대기</StepKey> — X Lock은 다른 S Lock/X Lock 모두와 호환되지 않으므로, TX2는 TX1의 트랜잭션이 끝날 때까지 기다립니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">TX1 차감 후 COMMIT → TX2가 최신값으로 작업</StepKey> — TX1이 stock=4로 확정 후 락 해제. TX2는 <strong style={{ color: '#22c55e' }}>최신값 4</strong>를 읽고 3으로 차감합니다. 이것이 <code style={{ color: '#ef4444' }}>SELECT FOR UPDATE</code>가 실무에서 가장 많이 사용되는 패턴입니다.</> },
            ]}
          />

          {/* S Lock vs X Lock 선택 기준 */}
          <DocTable style={{ marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>SQL</th>
                <th>락 종류</th>
                <th>사용 시나리오</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code style={{ color: '#06b6d4' }}>SELECT</code></td>
                <td style={{ color: '#22c55e' }}>락 없음 (MVCC)</td>
                <td>단순 조회. 스냅샷을 읽으므로 락 불필요</td>
              </tr>
              <tr>
                <td><code style={{ color: '#3b82f6' }}>SELECT ... FOR SHARE</code></td>
                <td style={{ color: '#3b82f6' }}>S Lock</td>
                <td>읽은 데이터가 변경/삭제되면 안 될 때 (FK 참조 확인)</td>
              </tr>
              <tr>
                <td><code style={{ color: '#ef4444' }}>SELECT ... FOR UPDATE</code></td>
                <td style={{ color: '#ef4444' }}>X Lock</td>
                <td>읽고 바로 수정할 예정일 때 (잔액 차감, 재고 감소)</td>
              </tr>
              <tr>
                <td><code style={{ color: '#ef4444' }}>UPDATE / DELETE</code></td>
                <td style={{ color: '#ef4444' }}>X Lock (자동)</td>
                <td>데이터 변경 시 InnoDB가 자동으로 X Lock 설정</td>
              </tr>
              <tr>
                <td><code style={{ color: '#3b82f6' }}>INSERT</code></td>
                <td style={{ color: '#ef4444' }}>X Lock (자동)</td>
                <td>새 행에 X Lock. Gap Lock과 결합하여 중복 방지</td>
              </tr>
            </tbody>
          </DocTable>

          <DiagramContainer title="락 호환성 매트릭스">
            <div className="lk-compat">
              <div className="lk-compat-cell lk-compat-head"></div>
              <div className="lk-compat-cell lk-compat-head" style={{ color: '#3b82f6' }}>S Lock 보유</div>
              <div className="lk-compat-cell lk-compat-head" style={{ color: '#ef4444' }}>X Lock 보유</div>
              <div className="lk-compat-cell lk-compat-head" style={{ color: '#3b82f6' }}>S Lock 요청</div>
              <div className="lk-compat-cell" style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e' }}>✅ 허용</div>
              <div className="lk-compat-cell" style={{ background: 'rgba(239,68,68,0.06)', color: '#ef4444' }}>❌ 대기</div>
              <div className="lk-compat-cell lk-compat-head" style={{ color: '#ef4444' }}>X Lock 요청</div>
              <div className="lk-compat-cell" style={{ background: 'rgba(239,68,68,0.06)', color: '#ef4444' }}>❌ 대기</div>
              <div className="lk-compat-cell" style={{ background: 'rgba(239,68,68,0.06)', color: '#ef4444' }}>❌ 대기</div>
            </div>
          </DiagramContainer>

          <HighlightBox color="#06b6d4">
            S Lock끼리는 호환(읽기-읽기 동시 가능), X Lock은 모든 락과 배타적(쓰기는 독점). 이것이 <strong>"읽기는 공유, 쓰기는 독점"</strong>이라는 락의 기본 원리입니다.
          </HighlightBox>
        </div>

        {/* ── Lost Update ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>Lost Update — 락이 없으면 생기는 일</SectionTitle>

          <SectionBox subtitle="Lost Update란?" subtitleColor="#ef4444" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="💥">
                두 트랜잭션이 <strong style={{ color: '#e2e8f0' }}>같은 데이터를 동시에 읽고 수정</strong>할 때, 먼저 쓴 트랜잭션의 변경이 <strong style={{ color: '#ef4444' }}>덮어써져 사라지는</strong> 문제입니다. 대표적인 예: 계좌 잔액 동시 갱신, 재고 차감.
              </FeatureRow>
            </div>
          </SectionBox>

          <Timeline
            icon="💥"
            title="Lost Update"
            color="#ef4444"
            subtitle="두 트랜잭션이 동시에 잔액을 갱신"
            tx1Label="TX1 (출금 1000)"
            tx2Label="TX2 (출금 2000)"
            dbLabel="balance"
            dbInitial="10000"
            steps={[
              { time: 'T1', tx1: 'SELECT balance → 10000', tx1Type: 'ok', dbValue: '10000' },
              { time: 'T2', tx2: 'SELECT balance → 10000', tx2Type: 'ok' },
              { time: 'T3', tx1: 'UPDATE balance = 9000', tx1Type: 'warn', dbValue: '9000' },
              { time: 'T4', tx1: 'COMMIT ✓', tx1Type: 'ok' },
              { time: 'T5', tx2: 'UPDATE balance = 8000', tx2Type: 'danger', dbValue: '8000' },
              { time: 'T6', tx2: 'COMMIT ✓', tx2Type: 'danger' },
            ]}
            result={<>❌ 결과: balance = 8000 — TX1의 출금 1000이 사라짐! 정답은 7000이어야 함</>}
            resultColor="#ef4444"
          />

          <StepByStep
            title="📋 Step-by-Step 해설 — Lost Update"
            steps={[
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">TX1이 balance를 읽음 → 10000</StepKey> — 계좌 잔액 10000원을 조회합니다. 이 시점에 아무 락도 잡지 않는 일반 SELECT입니다.</> },
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX2도 balance를 읽음 → 10000</StepKey> — TX1과 동일한 10000원을 읽습니다. 두 트랜잭션 모두 <strong style={{ color: '#e2e8f0' }}>같은 스냅샷</strong>을 기반으로 계산합니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">TX1이 1000원 출금 → 9000 기록</StepKey> — TX1은 10000 - 1000 = 9000으로 UPDATE합니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">TX1 COMMIT</StepKey> — 9000원이 확정됩니다.</> },
              { color: '#ef4444', content: <><StepKey color="#ef4444">TX2가 2000원 출금 → 8000 기록</StepKey> — TX2는 처음 읽은 10000에서 2000을 빼서 8000으로 UPDATE합니다. TX1의 9000 기록이 <strong style={{ color: '#ef4444' }}>완전히 덮어써집니다.</strong></> },
              { color: '#ef4444', content: <><StepKey color="#ef4444">TX2 COMMIT → balance = 8000</StepKey> — 최종 잔액이 8000원. 총 3000원을 출금했는데 잔액은 2000만 줄었습니다. <strong style={{ color: '#e2e8f0' }}>TX1의 출금이 유실</strong>되었습니다.</> },
            ]}
          />

          <HighlightBox color="#ef4444">
            Lost Update는 <strong>SELECT → 계산 → UPDATE</strong> 패턴에서 발생합니다. 해결 방법: <strong>비관적 락(SELECT FOR UPDATE)</strong>으로 읽는 시점에 행을 잠그거나, <strong>낙관적 락(Version 컬럼)</strong>으로 충돌을 감지합니다.
          </HighlightBox>
        </div>

        {/* ── 비관적 락 vs 낙관적 락 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>비관적 락 vs 낙관적 락</SectionTitle>

          <div className="lk-vs-grid" style={{ marginBottom: '20px' }}>
            <div className="lk-vs-card">
              <div className="lk-vs-head">
                <span className="lk-vs-icon">🛡️</span>
                <div>
                  <div className="lk-vs-title" style={{ color: '#a855f7' }}>비관적 락 (Pessimistic Lock)</div>
                  <span className="lk-vs-tag" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>충돌이 자주 발생할 때</span>
                </div>
              </div>
              <div className="lk-vs-list">
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#a855f7' }}>●</span>
                  <span><strong style={{ color: '#e2e8f0' }}>SELECT ... FOR UPDATE</strong>로 읽는 시점에 행에 X Lock을 걸어 다른 트랜잭션의 접근을 차단</span>
                </div>
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#a855f7' }}>●</span>
                  <span><strong style={{ color: '#e2e8f0' }}>충돌 방지:</strong> 다른 트랜잭션은 락이 해제될 때까지 <strong style={{ color: '#f59e0b' }}>대기(Block)</strong></span>
                </div>
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#a855f7' }}>●</span>
                  <span><strong style={{ color: '#e2e8f0' }}>장점:</strong> 확실한 데이터 정합성 보장. 충돌이 잦은 환경에 적합</span>
                </div>
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#a855f7' }}>●</span>
                  <span><strong style={{ color: '#ef4444' }}>단점:</strong> 대기로 인한 처리량 저하, <strong style={{ color: '#ef4444' }}>데드락 위험</strong></span>
                </div>
              </div>
            </div>

            <div className="lk-vs-card">
              <div className="lk-vs-head">
                <span className="lk-vs-icon">⚡</span>
                <div>
                  <div className="lk-vs-title" style={{ color: '#f59e0b' }}>낙관적 락 (Optimistic Lock)</div>
                  <span className="lk-vs-tag" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>충돌이 드물 때</span>
                </div>
              </div>
              <div className="lk-vs-list">
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#f59e0b' }}>●</span>
                  <span><strong style={{ color: '#e2e8f0' }}>Version 컬럼</strong>을 이용해 UPDATE 시점에 충돌을 감지. 실제 DB 락을 사용하지 않음</span>
                </div>
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#f59e0b' }}>●</span>
                  <span><strong style={{ color: '#e2e8f0' }}>충돌 감지:</strong> <code style={{ color: '#f59e0b' }}>WHERE version = ?</code>로 UPDATE 후 affected rows가 0이면 충돌 → <strong style={{ color: '#ef4444' }}>재시도</strong></span>
                </div>
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#f59e0b' }}>●</span>
                  <span><strong style={{ color: '#e2e8f0' }}>장점:</strong> 락 대기 없이 높은 동시성. 읽기 비중이 높은 환경에 적합</span>
                </div>
                <div className="lk-vs-item">
                  <span className="lk-vs-item-icon" style={{ color: '#f59e0b' }}>●</span>
                  <span><strong style={{ color: '#ef4444' }}>단점:</strong> 충돌 시 재시도 비용. 충돌이 잦으면 오히려 성능 저하</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pessimistic Lock Timeline */}
          <Timeline
            icon="🛡️"
            title="비관적 락으로 Lost Update 방지"
            color="#a855f7"
            subtitle="SELECT FOR UPDATE로 행을 선점"
            tx1Label="TX1 (출금 1000)"
            tx2Label="TX2 (출금 2000)"
            dbLabel="balance"
            dbInitial="10000"
            steps={[
              { time: 'T1', tx1: <span>SELECT balance <strong style={{ color: '#a855f7' }}>FOR UPDATE</strong> → 10000 🔒</span>, tx1Type: 'ok', dbValue: '10000' },
              { time: 'T2', tx2: <span>SELECT balance <strong style={{ color: '#a855f7' }}>FOR UPDATE</strong> → <TimelineWait><span style={{ color: '#f59e0b' }}>대기중...</span></TimelineWait></span>, tx2Type: 'warn' },
              { time: 'T3', tx1: 'UPDATE balance = 9000', tx1Type: 'ok', dbValue: '9000' },
              { time: 'T4', tx1: <span>COMMIT ✓ → <span style={{ color: '#22c55e' }}>🔓 락 해제</span></span>, tx1Type: 'ok' },
              { time: 'T5', tx2: <span>🔒 락 획득 → SELECT balance = <strong style={{ color: '#22c55e' }}>9000</strong></span>, tx2Type: 'ok', dbValue: '9000' },
              { time: 'T6', tx2: 'UPDATE balance = 7000', tx2Type: 'ok', dbValue: '7000' },
              { time: 'T7', tx2: 'COMMIT ✓', tx2Type: 'ok' },
            ]}
            result={<>✅ 결과: balance = 7000 — 정확히 3000원 출금됨. 비관적 락으로 Lost Update 방지!</>}
            resultColor="#22c55e"
          />

          <StepByStep
            title="📋 Step-by-Step 해설 — 비관적 락"
            steps={[
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX1이 SELECT FOR UPDATE → X Lock 획득</StepKey> — 해당 행에 배타 락이 걸립니다. 다른 트랜잭션은 이 행을 수정하거나 FOR UPDATE로 읽을 수 없습니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">TX2도 SELECT FOR UPDATE → 대기</StepKey> — TX1이 같은 행에 X Lock을 보유하고 있으므로, TX2는 <strong style={{ color: '#f59e0b' }}>락이 해제될 때까지 Block</strong>됩니다.</> },
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX1이 UPDATE → COMMIT</StepKey> — balance를 9000으로 갱신하고 COMMIT합니다. COMMIT 시점에 X Lock이 해제됩니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">TX2가 락을 획득 → 최신값 9000을 읽음</StepKey> — TX2는 이제 TX1이 확정한 <strong style={{ color: '#22c55e' }}>최신값 9000</strong>을 기반으로 계산합니다. 9000 - 2000 = 7000이 정확한 결과입니다.</> },
            ]}
          />

          {/* Optimistic Lock Timeline */}
          <Timeline
            icon="⚡"
            title="낙관적 락으로 Lost Update 감지"
            color="#f59e0b"
            subtitle="Version 컬럼으로 충돌 감지"
            tx1Label="TX1 (출금 1000)"
            tx2Label="TX2 (출금 2000)"
            dbLabel="version"
            dbInitial="v1"
            steps={[
              { time: 'T1', tx1: 'SELECT balance=10000, version=1', tx1Type: 'ok' },
              { time: 'T2', tx2: 'SELECT balance=10000, version=1', tx2Type: 'ok' },
              { time: 'T3', tx1: <span>UPDATE SET balance=9000, version=2 <strong style={{ color: '#22c55e' }}>WHERE version=1</strong></span>, tx1Type: 'ok', dbValue: 'v2' },
              { time: 'T4', tx1: <span>affected rows = 1 → <strong style={{ color: '#22c55e' }}>성공!</strong></span>, tx1Type: 'ok' },
              { time: 'T5', tx2: <span>UPDATE SET balance=8000, version=2 <strong style={{ color: '#ef4444' }}>WHERE version=1</strong></span>, tx2Type: 'danger' },
              { time: 'T6', tx2: <span>affected rows = <strong style={{ color: '#ef4444' }}>0</strong> → 충돌 감지! <strong style={{ color: '#f59e0b' }}>재시도 필요</strong></span>, tx2Type: 'danger' },
            ]}
            result={<>⚡ TX2는 충돌을 감지하고 재시도합니다. 재시도 시 최신 balance=9000을 읽어 7000으로 갱신</>}
            resultColor="#f59e0b"
          />

          <StepByStep
            title="📋 Step-by-Step 해설 — 낙관적 락"
            steps={[
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">두 트랜잭션 모두 version=1로 읽음</StepKey> — 아무 락도 잡지 않습니다. 읽기 시점에는 충돌 가능성을 판단하지 않고, UPDATE 시점까지 낙관적으로 진행합니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">TX1이 WHERE version=1로 UPDATE → 성공</StepKey> — version이 아직 1이므로 조건이 일치합니다. balance=9000, version=2로 갱신됩니다.</> },
              { color: '#ef4444', content: <><StepKey color="#ef4444">TX2가 WHERE version=1로 UPDATE → 실패</StepKey> — 이미 version이 2로 변경되었으므로 WHERE 조건이 불일치합니다. <code style={{ color: '#ef4444' }}>affected rows = 0</code>으로 <strong style={{ color: '#e2e8f0' }}>충돌이 감지</strong>됩니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">TX2 재시도</StepKey> — 애플리케이션에서 예외를 잡아 다시 SELECT → 최신 balance=9000, version=2를 읽고 → 9000 - 2000 = 7000으로 UPDATE합니다.</> },
            ]}
          />

          {/* 비교 테이블 */}
          <DocTable style={{ marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>구분</th>
                <th style={{ color: '#a855f7' }}>비관적 락</th>
                <th style={{ color: '#f59e0b' }}>낙관적 락</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#cbd5e1' }}>방식</td>
                <td>SELECT FOR UPDATE (DB 락)</td>
                <td>Version 컬럼 (애플리케이션)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#cbd5e1' }}>충돌 처리</td>
                <td style={{ color: '#a855f7' }}>사전 방지 (Block)</td>
                <td style={{ color: '#f59e0b' }}>사후 감지 (Retry)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#cbd5e1' }}>적합한 상황</td>
                <td>충돌 빈번, 쓰기 비중 높음</td>
                <td>충돌 드묾, 읽기 비중 높음</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#cbd5e1' }}>동시성</td>
                <td style={{ color: '#ef4444' }}>낮음 (락 대기)</td>
                <td style={{ color: '#22c55e' }}>높음 (락 없음)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#cbd5e1' }}>데드락 위험</td>
                <td style={{ color: '#ef4444' }}>있음</td>
                <td style={{ color: '#22c55e' }}>없음</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#cbd5e1' }}>구현 위치</td>
                <td>DB 엔진 (InnoDB)</td>
                <td>애플리케이션 + DB</td>
              </tr>
            </tbody>
          </DocTable>

          <HighlightBox color="#a855f7">
            비관적 락은 <strong>"충돌할 것이다"</strong>라고 가정하고 미리 잠그고, 낙관적 락은 <strong>"충돌하지 않을 것이다"</strong>라고 가정하고 나중에 검증합니다. 선택 기준은 <strong>충돌 빈도와 읽기/쓰기 비율</strong>입니다.
          </HighlightBox>
        </div>

        {/* ── Gap Lock & Next-Key Lock ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>Gap Lock &amp; Next-Key Lock</SectionTitle>

          <SectionBox subtitle="왜 행 락만으로는 부족한가?" subtitleColor="#22c55e" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="👻">
                <strong style={{ color: '#e2e8f0' }}>Phantom Read 문제:</strong> 행 락(Record Lock)은 이미 존재하는 행만 잠급니다. 하지만 다른 트랜잭션이 <strong style={{ color: '#ef4444' }}>새로운 행을 INSERT</strong>하면, 같은 범위 조회에서 갑자기 새 행이 나타나는 <strong style={{ color: '#ef4444' }}>Phantom Read</strong>가 발생합니다.
              </FeatureRow>
              <FeatureRow icon="🔑">
                <strong style={{ color: '#e2e8f0' }}>InnoDB의 해결책:</strong> 행 사이의 <strong style={{ color: '#22c55e' }}>"간격(Gap)"</strong>도 함께 잠가서 새 행의 삽입을 차단합니다. 이것이 Gap Lock입니다.
              </FeatureRow>
            </div>
          </SectionBox>

          <DocGrid style={{ marginBottom: '20px' }}>
            <DocCard title="Record Lock" titleColor="#3b82f6">
              인덱스 레코드 <strong style={{ color: '#e2e8f0' }}>그 자체</strong>를 잠급니다. <code style={{ color: '#3b82f6' }}>WHERE id = 10</code> 같은 정확한 조건.
              가장 기본적인 행 수준 락입니다.
            </DocCard>
            <DocCard title="Gap Lock" titleColor="#22c55e">
              인덱스 레코드 <strong style={{ color: '#e2e8f0' }}>사이의 간격</strong>을 잠급니다. 해당 간격에 INSERT를 차단합니다.
              레코드 자체는 잠그지 않고 간격만 잠급니다.
            </DocCard>
            <DocCard title="Next-Key Lock" titleColor="#f59e0b">
              <strong style={{ color: '#e2e8f0' }}>Record Lock + Gap Lock</strong>의 조합입니다. 레코드 자체와 그 앞의 간격을 함께 잠급니다.
              InnoDB의 <strong style={{ color: '#f59e0b' }}>기본 락 방식</strong>입니다.
            </DocCard>
          </DocGrid>

          <DiagramContainer title="인덱스 레코드와 Gap Lock 범위 — age 컬럼 예시">
            <div style={{ marginBottom: '12px', fontSize: '11px', color: '#5a6a85', textAlign: 'center' }}>
              SELECT * FROM users WHERE age BETWEEN 20 AND 30 FOR UPDATE
            </div>
            <div className="lk-gap-bar">
              <div className="lk-gap-cell" style={{ background: 'rgba(100,116,139,0.04)' }}>
                <span style={{ color: '#64748b' }}>10</span>
                <span className="lk-gap-label">Record</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(34,197,94,0.06)' }}>
                <span style={{ color: '#22c55e' }}>⬤ Gap</span>
                <span className="lk-gap-label" style={{ color: '#22c55e' }}>INSERT 차단</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(245,158,11,0.08)', borderTop: '2px solid #f59e0b' }}>
                <span style={{ color: '#f59e0b' }}>20</span>
                <span className="lk-gap-label" style={{ color: '#f59e0b' }}>Next-Key Lock</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(34,197,94,0.06)' }}>
                <span style={{ color: '#22c55e' }}>⬤ Gap</span>
                <span className="lk-gap-label" style={{ color: '#22c55e' }}>INSERT 차단</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(245,158,11,0.08)', borderTop: '2px solid #f59e0b' }}>
                <span style={{ color: '#f59e0b' }}>25</span>
                <span className="lk-gap-label" style={{ color: '#f59e0b' }}>Next-Key Lock</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(34,197,94,0.06)' }}>
                <span style={{ color: '#22c55e' }}>⬤ Gap</span>
                <span className="lk-gap-label" style={{ color: '#22c55e' }}>INSERT 차단</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(245,158,11,0.08)', borderTop: '2px solid #f59e0b' }}>
                <span style={{ color: '#f59e0b' }}>30</span>
                <span className="lk-gap-label" style={{ color: '#f59e0b' }}>Next-Key Lock</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(34,197,94,0.06)' }}>
                <span style={{ color: '#22c55e' }}>⬤ Gap</span>
                <span className="lk-gap-label" style={{ color: '#22c55e' }}>INSERT 차단</span>
              </div>
              <div className="lk-gap-cell" style={{ background: 'rgba(100,116,139,0.04)' }}>
                <span style={{ color: '#64748b' }}>40</span>
                <span className="lk-gap-label">Record</span>
              </div>
            </div>
            <div style={{ marginTop: '10px', fontSize: '10px', color: '#5a6a85', textAlign: 'center' }}>
              Next-Key Lock = Record Lock(20, 25, 30) + Gap Lock(10~20, 20~25, 25~30, 30~40 사이 간격)
            </div>
          </DiagramContainer>

          <StepByStep
            title="📋 Step-by-Step 해설 — Next-Key Lock으로 Phantom 방지"
            steps={[
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">TX1이 범위 조회</StepKey> — <code style={{ color: '#06b6d4' }}>SELECT * FROM users WHERE age BETWEEN 20 AND 30 FOR UPDATE</code> 실행 시, InnoDB는 age=20, 25, 30 레코드에 Record Lock을 걸고, 그 사이 간격에 Gap Lock을 겁니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">Gap Lock이 간격을 보호</StepKey> — age=22인 새로운 행을 INSERT하려는 TX2는, 20~25 사이의 Gap Lock에 의해 <strong style={{ color: '#ef4444' }}>대기</strong>상태가 됩니다.</> },
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">TX1이 다시 조회해도 결과 동일</StepKey> — 같은 조건으로 재조회해도 새 행이 나타나지 않습니다. Gap Lock 덕분에 <strong style={{ color: '#22c55e' }}>Phantom Read가 방지</strong>됩니다.</> },
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX1 COMMIT → Gap Lock 해제</StepKey> — TX1이 커밋하면 모든 락이 해제되고, 그제서야 TX2의 INSERT가 실행됩니다.</> },
            ]}
          />

          <HighlightBox color="#22c55e">
            InnoDB의 <strong>Repeatable Read</strong> 격리 수준에서 Next-Key Lock은 기본 동작입니다. 이를 통해 MySQL/InnoDB는 RR 수준에서도 Phantom Read를 방지합니다 — 다른 DBMS에서는 Serializable에서만 가능한 것을 InnoDB는 <strong>Gap Lock으로 RR에서 해결</strong>합니다.
          </HighlightBox>
        </div>

        {/* ── 데드락 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#a855f7']}>데드락 (Deadlock)</SectionTitle>

          <SectionBox subtitle="데드락이란?" subtitleColor="#ef4444" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="🔄">
                두 개 이상의 트랜잭션이 서로 <strong style={{ color: '#ef4444' }}>상대방이 보유한 락을 기다리며 무한 대기</strong>하는 상태입니다. 어느 쪽도 진행할 수 없는 <strong style={{ color: '#e2e8f0' }}>교착 상태(Circular Wait)</strong>에 빠집니다.
              </FeatureRow>
            </div>
          </SectionBox>

          <DiagramContainer title="데드락 발생 구조 — 순환 대기">
            <div className="lk-deadlock">
              <div className="lk-dl-node" style={{ borderColor: '#3b82f6' }}>
                <span style={{ fontSize: '24px' }}>🔵</span>
                <div className="lk-dl-label" style={{ color: '#3b82f6' }}>TX1</div>
                <div className="lk-dl-sub">Row A 보유 🔒</div>
                <div className="lk-dl-sub" style={{ color: '#ef4444' }}>Row B 요청 ⏳</div>
              </div>

              <div className="lk-dl-arrows">
                <div className="lk-dl-arrow" style={{ color: '#ef4444' }}>← Row B 필요 ←</div>
                <div className="lk-dl-arrow" style={{ color: '#ef4444' }}>→ Row A 필요 →</div>
              </div>

              <div className="lk-dl-node" style={{ borderColor: '#a855f7' }}>
                <span style={{ fontSize: '24px' }}>🟣</span>
                <div className="lk-dl-label" style={{ color: '#a855f7' }}>TX2</div>
                <div className="lk-dl-sub">Row B 보유 🔒</div>
                <div className="lk-dl-sub" style={{ color: '#ef4444' }}>Row A 요청 ⏳</div>
              </div>
            </div>
          </DiagramContainer>

          <Timeline
            icon="🔄"
            title="데드락 발생 흐름"
            color="#ef4444"
            subtitle="TX1 ↔ TX2 순환 대기"
            tx1Label="TX1"
            tx2Label="TX2"
            dbLabel="상태"
            dbInitial="정상"
            steps={[
              { time: 'T1', tx1: <span>UPDATE Row A 🔒 → <strong style={{ color: '#3b82f6' }}>X Lock 획득</strong></span>, tx1Type: 'ok', dbValue: '정상' },
              { time: 'T2', tx2: <span>UPDATE Row B 🔒 → <strong style={{ color: '#a855f7' }}>X Lock 획득</strong></span>, tx2Type: 'ok' },
              { time: 'T3', tx1: <span>UPDATE Row B → <TimelineWait><span style={{ color: '#f59e0b' }}>TX2의 락 대기...</span></TimelineWait></span>, tx1Type: 'warn' },
              { time: 'T4', tx2: <span>UPDATE Row A → <TimelineWait><span style={{ color: '#f59e0b' }}>TX1의 락 대기...</span></TimelineWait></span>, tx2Type: 'danger' },
              { time: 'T5', tx1: <span style={{ color: '#ef4444' }}>💀 DEADLOCK 감지!</span>, tx1Type: 'danger', tx2: <span style={{ color: '#ef4444' }}>💀 DEADLOCK 감지!</span>, tx2Type: 'danger', dbValue: '💀' },
              { time: 'T6', tx2: <span style={{ color: '#ef4444' }}>ROLLBACK (victim)</span>, tx2Type: 'danger', tx1: <span style={{ color: '#22c55e' }}>락 획득 → 계속 진행</span>, tx1Type: 'ok', dbValue: '복구' },
            ]}
            result={<>💀 InnoDB가 데드락을 감지하고 비용이 적은 TX2를 ROLLBACK시킴 → TX1이 정상 진행</>}
            resultColor="#ef4444"
          />

          <StepByStep
            title="📋 Step-by-Step 해설 — 데드락"
            steps={[
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">TX1이 Row A에 X Lock 획득</StepKey> — TX1이 먼저 Row A를 UPDATE하여 배타 락을 잡습니다.</> },
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX2가 Row B에 X Lock 획득</StepKey> — TX2는 다른 행 Row B를 UPDATE하여 배타 락을 잡습니다. 여기까지는 문제없습니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">교차 요청 발생</StepKey> — TX1이 Row B를 요청(TX2 보유)하고, TX2가 Row A를 요청(TX1 보유)합니다. <strong style={{ color: '#ef4444' }}>순환 대기(Circular Wait)</strong>가 형성됩니다.</> },
              { color: '#ef4444', content: <><StepKey color="#ef4444">InnoDB 데드락 감지</StepKey> — InnoDB의 <strong style={{ color: '#e2e8f0' }}>Wait-for Graph</strong> 알고리즘이 순환을 감지합니다. 비용이 적은 트랜잭션(Undo가 적은 쪽)을 <strong style={{ color: '#ef4444' }}>victim으로 선택하여 ROLLBACK</strong>시킵니다.</> },
            ]}
          />

          {/* 데드락 발생 4가지 조건 */}
          <div style={{ marginBottom: '20px' }}>
            <div className="dp-section-subtitle" style={{ color: '#ef4444', marginBottom: '14px' }}>데드락 발생 4가지 필요 조건 (Coffman Conditions)</div>
            <DocGrid>
              <DocCard title="1. 상호 배제 (Mutual Exclusion)" titleColor="#ef4444">
                자원(락)은 한 번에 하나의 트랜잭션만 사용할 수 있다
              </DocCard>
              <DocCard title="2. 점유 대기 (Hold and Wait)" titleColor="#f59e0b">
                이미 자원을 보유한 채로 다른 자원을 추가로 기다린다
              </DocCard>
              <DocCard title="3. 비선점 (No Preemption)" titleColor="#a855f7">
                다른 트랜잭션이 보유한 자원을 강제로 빼앗을 수 없다
              </DocCard>
              <DocCard title="4. 순환 대기 (Circular Wait)" titleColor="#3b82f6">
                트랜잭션들이 원형으로 서로의 자원을 기다린다
              </DocCard>
            </DocGrid>
          </div>

          <SectionBox subtitle="데드락 예방 전략" subtitleColor="#22c55e" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="📏">
                <strong style={{ color: '#22c55e' }}>락 순서 통일:</strong> 모든 트랜잭션이 테이블/행을 <strong style={{ color: '#e2e8f0' }}>같은 순서</strong>로 접근하도록 규칙화합니다. 순환 대기를 원천 차단합니다.
              </FeatureRow>
              <FeatureRow icon="⏱️">
                <strong style={{ color: '#22c55e' }}>트랜잭션 짧게 유지:</strong> 락 보유 시간을 최소화합니다. 트랜잭션 내에서 <strong style={{ color: '#ef4444' }}>외부 API 호출이나 긴 처리를 피합니다.</strong>
              </FeatureRow>
              <FeatureRow icon="🔄">
                <strong style={{ color: '#22c55e' }}>재시도 로직:</strong> 데드락은 완전히 방지하기 어렵습니다. 애플리케이션에서 <strong style={{ color: '#e2e8f0' }}>데드락 예외를 잡아 자동 재시도</strong>하는 로직을 구현합니다.
              </FeatureRow>
              <FeatureRow icon="📊">
                <strong style={{ color: '#22c55e' }}>적절한 인덱스:</strong> 인덱스가 없으면 풀 스캔 시 넓은 범위에 락을 잡아 데드락 확률이 높아집니다. <strong style={{ color: '#e2e8f0' }}>인덱스로 락 범위를 좁힙니다.</strong>
              </FeatureRow>
            </div>
          </SectionBox>

          <HighlightBox color="#ef4444">
            InnoDB는 <strong>Wait-for Graph</strong>로 데드락을 즉시 감지하고, Undo 비용이 적은 트랜잭션을 victim으로 ROLLBACK합니다. 데드락은 완전히 방지하기보다 <strong>빠르게 감지하고 복구하는 것</strong>이 현실적 전략입니다.
          </HighlightBox>
        </div>

        {/* ── 정리: 락의 전체 구조 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>InnoDB 락 전체 구조 정리</SectionTitle>

          <DocTable style={{ marginBottom: '20px' }}>
            <thead>
              <tr>
                <th>락 종류</th>
                <th>대상</th>
                <th>목적</th>
                <th>언제 사용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#3b82f6' }}>Record Lock</td>
                <td>인덱스 레코드</td>
                <td>특정 행 보호</td>
                <td><code>WHERE id = 10</code></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#22c55e' }}>Gap Lock</td>
                <td>레코드 사이 간격</td>
                <td>INSERT 차단 (Phantom 방지)</td>
                <td>범위 조건 조회 시</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#f59e0b' }}>Next-Key Lock</td>
                <td>Record + Gap</td>
                <td>행 보호 + INSERT 차단</td>
                <td>InnoDB RR 기본 동작</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#a855f7' }}>S Lock</td>
                <td>행</td>
                <td>읽기 보호 (공유)</td>
                <td><code>SELECT ... FOR SHARE</code></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#ef4444' }}>X Lock</td>
                <td>행</td>
                <td>쓰기 보호 (배타)</td>
                <td><code>UPDATE / DELETE / FOR UPDATE</code></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#06b6d4' }}>Intent Lock (IS/IX)</td>
                <td>테이블</td>
                <td>행 락 의도를 테이블에 표시</td>
                <td>행 락 획득 전 자동 설정</td>
              </tr>
            </tbody>
          </DocTable>

          <HighlightBox color="#06b6d4">
            Intent Lock(IS/IX)은 행 수준 락과 테이블 수준 락의 <strong>호환성을 빠르게 판단</strong>하기 위한 메커니즘입니다. 행에 S Lock을 걸기 전 테이블에 IS Lock을, X Lock을 걸기 전 IX Lock을 설정하여, 테이블 전체 락 요청 시 행마다 확인하지 않아도 됩니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: 'S Lock과 X Lock의 차이와 호환성을 설명해주세요.',
                a: 'S Lock(Shared Lock)은 읽기용으로 여러 트랜잭션이 동시에 획득 가능합니다. X Lock(Exclusive Lock)은 쓰기용으로 하나의 트랜잭션만 획득 가능합니다. S Lock끼리는 호환되지만, X Lock은 S Lock이든 X Lock이든 모두 배타적입니다. 즉, "읽기-읽기는 허용, 쓰기가 포함되면 독점"이 핵심입니다.',
              },
              {
                q: '비관적 락과 낙관적 락의 차이를 설명하고, 각각 언제 사용하나요?',
                a: '비관적 락은 SELECT FOR UPDATE로 DB 레벨에서 행을 미리 잠가 충돌을 방지합니다. 충돌이 잦고 쓰기가 많은 환경에 적합합니다. 낙관적 락은 Version 컬럼으로 UPDATE 시점에 충돌을 감지하고, 실제 DB 락은 사용하지 않습니다. 충돌이 드물고 읽기가 많은 환경에 적합합니다. 비관적 락은 데드락 위험이 있고, 낙관적 락은 충돌 시 재시도 비용이 있습니다.',
              },
              {
                q: 'Gap Lock이 무엇이고 왜 필요한가요?',
                a: 'Gap Lock은 인덱스 레코드 사이의 간격을 잠가 새로운 행의 INSERT를 차단하는 락입니다. 행 락(Record Lock)만으로는 이미 존재하는 행만 보호할 수 있어, 범위 조회 시 새 행이 INSERT되는 Phantom Read를 방지할 수 없습니다. InnoDB는 Next-Key Lock(Record Lock + Gap Lock)을 기본으로 사용하여 Repeatable Read 수준에서도 Phantom Read를 방지합니다.',
              },
              {
                q: '데드락이 발생하는 조건과 해결 방법을 설명해주세요.',
                a: '데드락은 상호 배제, 점유 대기, 비선점, 순환 대기 4가지 조건이 모두 만족할 때 발생합니다. InnoDB는 Wait-for Graph 알고리즘으로 데드락을 즉시 감지하고, Undo 비용이 적은 트랜잭션을 ROLLBACK합니다. 예방 전략으로는 락 순서 통일, 트랜잭션 짧게 유지, 적절한 인덱스 사용, 애플리케이션에서 재시도 로직 구현이 있습니다.',
              },
              {
                q: 'Lost Update 문제를 비관적 락과 낙관적 락으로 각각 어떻게 해결하나요?',
                a: '비관적 락: SELECT FOR UPDATE로 읽는 시점에 X Lock을 잡아 다른 트랜잭션이 같은 행을 읽거나 수정하지 못하게 합니다. 늦게 온 트랜잭션은 락이 해제될 때까지 대기 후 최신값을 기반으로 작업합니다. 낙관적 락: version 컬럼을 추가하고 UPDATE ... WHERE version = ?으로 갱신합니다. version이 변경되었으면 affected rows = 0이므로 충돌을 감지하고, 최신값으로 재시도합니다.',
              },
              {
                q: 'InnoDB에서 Repeatable Read 격리 수준이 Phantom Read를 방지하는 원리는?',
                a: '일반 SELECT는 MVCC의 Consistent Read로 트랜잭션 시작 시점의 스냅샷을 읽어 Phantom Read를 방지합니다. Locking Read(FOR UPDATE, FOR SHARE)는 Next-Key Lock을 사용하여 범위 내 레코드와 간격에 락을 걸어 다른 트랜잭션의 INSERT를 차단합니다. 이는 다른 DBMS에서 Serializable에서만 가능한 것을 InnoDB는 RR 수준에서 해결하는 것입니다.',
              },
              {
                q: 'Intent Lock(IS/IX)은 무엇이고 왜 필요한가요?',
                a: 'Intent Lock은 행 수준 락을 걸기 전에 테이블 수준에 먼저 설정하는 "의도 락"입니다. IS는 행에 S Lock을 걸겠다는 의도, IX는 행에 X Lock을 걸겠다는 의도입니다. 다른 트랜잭션이 테이블 전체 락을 요청할 때, 행마다 락 상태를 확인하지 않고 Intent Lock만 확인하면 되므로 호환성 판단이 빠릅니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

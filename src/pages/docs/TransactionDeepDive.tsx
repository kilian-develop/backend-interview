import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import Timeline from '../../components/doc/Timeline'
import StepByStep, { StepKey } from '../../components/doc/StepByStep'
import { DocGrid, DocCard, SectionBox, FeatureRow, DocTable } from '../../components/doc/DocPrimitives'
import { DiagramContainer } from '../../components/doc/Diagram'
import { useInjectCSS } from '../../hooks/useInjectCSS'

/* ── Page-specific CSS only ── */
const CSS = `
/* MVCC */
.tx-mvcc-row { display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; font-size:12px; color:#94a3b8; line-height:1.7; }
.tx-mvcc-step { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
/* Isolation cards */
.tx-iso-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:14px; }
.tx-iso-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.tx-iso-card:hover { transform:translateY(-3px); }
.tx-iso-level { font-size:11px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:4px; }
.tx-iso-name { font-size:14px; font-weight:800; margin-bottom:8px; }
.tx-iso-desc { font-size:11px; color:#5a6a85; line-height:1.7; }
.tx-iso-tag { font-size:9px; font-weight:600; padding:2px 8px; border-radius:99px; display:inline-flex; margin-top:8px; }
/* Log flow diagram */
.tx-log-flow { display:flex; align-items:stretch; gap:0; position:relative; padding:16px 0; }
@media(max-width:700px){ .tx-log-flow { flex-direction:column; align-items:center; } }
.tx-log-node { background:#0e1118; border:1.5px solid #1a2234; border-radius:14px; padding:16px 18px; min-width:130px; position:relative; display:flex; flex-direction:column; align-items:center; gap:6px; z-index:2; flex:1; }
.tx-log-node-title { font-size:11px; font-weight:800; font-family:'JetBrains Mono',monospace; text-transform:uppercase; letter-spacing:.6px; }
.tx-log-node-desc { font-size:10px; color:#5a6a85; line-height:1.6; text-align:center; }
.tx-log-arrow { display:flex; align-items:center; justify-content:center; flex-shrink:0; width:48px; position:relative; z-index:1; }
@media(max-width:700px){ .tx-log-arrow { width:auto; height:36px; transform:rotate(90deg); } }
.tx-log-arrow-line { width:100%; height:2px; position:relative; }
.tx-log-arrow-line::after { content:''; position:absolute; right:-2px; top:50%; transform:translateY(-50%); width:0; height:0; border-left:6px solid currentColor; border-top:4px solid transparent; border-bottom:4px solid transparent; }
.tx-log-arrow-label { position:absolute; top:-14px; left:50%; transform:translateX(-50%); font-size:8px; font-weight:700; white-space:nowrap; font-family:'JetBrains Mono',monospace; letter-spacing:.3px; }
/* Log detail cards */
.tx-log-detail { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
@media(max-width:640px){ .tx-log-detail { grid-template-columns:1fr; } }
.tx-log-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; }
.tx-log-card-head { display:flex; align-items:center; gap:10px; margin-bottom:14px; padding-bottom:10px; border-bottom:1px solid #1a2234; }
.tx-log-card-icon { font-size:22px; }
.tx-log-card-title { font-size:14px; font-weight:800; }
.tx-log-card-tag { font-size:9px; font-weight:700; padding:2px 8px; border-radius:99px; }
.tx-log-list { display:flex; flex-direction:column; gap:8px; }
.tx-log-item { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:#94a3b8; line-height:1.7; }
.tx-log-item-icon { flex-shrink:0; margin-top:2px; }
`

export default function TransactionDeepDive() {
  useInjectCSS('style-transaction-deep-dive', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Transaction · ACID · Isolation · MVCC · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>트랜잭션</span> 심화</>}
          description="ACID 속성, 동시성 문제와 격리 수준, MVCC 동작 원리까지 — 면접에서 깊이 있는 답변을 위한 가이드"
        />

        {/* ── ACID ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>ACID 속성</SectionTitle>

          <SectionBox subtitle="트랜잭션이란?" subtitleColor="#06b6d4" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="📦">
                <strong style={{ color: '#e2e8f0' }}>하나의 논리적 작업 단위:</strong> 트랜잭션은 여러 SQL 문을 <strong style={{ color: '#06b6d4' }}>하나의 원자적 작업</strong>으로 묶는 것입니다. "계좌 이체"라면 출금 + 입금이 모두 성공하거나, 모두 실패해야 합니다.
              </FeatureRow>
              <FeatureRow icon="🔄">
                <strong style={{ color: '#e2e8f0' }}>BEGIN → SQL → COMMIT / ROLLBACK:</strong> 트랜잭션은 <code style={{ color: '#06b6d4' }}>BEGIN</code>으로 시작하고, 모든 작업이 성공하면 <code style={{ color: '#22c55e' }}>COMMIT</code>, 하나라도 실패하면 <code style={{ color: '#ef4444' }}>ROLLBACK</code>으로 전체를 취소합니다.
              </FeatureRow>
            </div>
          </SectionBox>

          <DocGrid style={{ marginBottom: '20px' }}>
            <DocCard title="A — Atomicity (원자성)" titleColor="#06b6d4">
              트랜잭션 내 모든 연산은 <strong style={{ color: '#e2e8f0' }}>전부 성공하거나 전부 실패</strong>합니다. 중간 상태는 존재하지 않습니다.
            </DocCard>
            <DocCard title="C — Consistency (일관성)" titleColor="#22c55e">
              트랜잭션 전후에 데이터베이스는 항상 <strong style={{ color: '#e2e8f0' }}>일관된 상태</strong>를 유지합니다. 제약조건을 위반하는 트랜잭션은 거부됩니다.
            </DocCard>
            <DocCard title="I — Isolation (격리성)" titleColor="#a855f7">
              동시에 실행되는 트랜잭션은 서로 <strong style={{ color: '#e2e8f0' }}>간섭하지 않는 것처럼</strong> 동작합니다. 격리 수준에 따라 보장 정도가 달라집니다.
            </DocCard>
            <DocCard title="D — Durability (지속성)" titleColor="#f59e0b">
              COMMIT된 트랜잭션의 결과는 <strong style={{ color: '#e2e8f0' }}>영구적으로 보존</strong>됩니다. WAL(Write-Ahead Log)을 통해 시스템 장애에도 복구됩니다.
            </DocCard>
          </DocGrid>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> ACID 중 가장 깊이 물어보는 것은 <strong>Isolation(격리성)</strong>입니다. "격리 수준에 따라 어떤 문제가 발생하고, 어떻게 해결하나요?"까지 대답할 수 있어야 합니다. 특히 InnoDB의 기본 격리 수준인 <strong>REPEATABLE READ</strong>에서 Phantom Read를 어떻게 방지하는지 설명하면 차별화됩니다.
          </HighlightBox>
        </div>

        {/* ── 동시성 문제 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>동시성 문제 — 격리가 부족하면 생기는 일</SectionTitle>

          <SectionBox subtitle="왜 동시성 문제가 발생하는가?" subtitleColor="#ef4444" style={{ marginBottom: '20px' }}>
            <FeatureRow icon="⚠️">
              여러 트랜잭션이 <strong style={{ color: '#e2e8f0' }}>같은 데이터에 동시에 접근</strong>하면 문제가 생깁니다. 격리 수준을 높이면 방지할 수 있지만, <strong style={{ color: '#f59e0b' }}>동시 처리 성능이 떨어집니다.</strong> 아래 4가지 문제의 흐름을 <strong style={{ color: '#e2e8f0' }}>▶ 재생</strong>으로 직접 확인해보세요.
            </FeatureRow>
          </SectionBox>

          <Timeline
            icon="💀" title="Dirty Read (오손 읽기)" color="#ef4444"
            subtitle="커밋되지 않은 데이터를 읽는 문제"
            tx1Label="TX1 (이체)" tx2Label="TX2 (조회)"
            dbLabel="salary" dbInitial="3000"
            steps={[
              { time: 't1', tx1: <span style={{ color: '#3b82f6' }}>BEGIN</span> },
              { time: 't2', tx1: <span style={{ color: '#3b82f6' }}>UPDATE salary = <strong style={{ color: '#e2e8f0' }}>5000</strong></span>, dbValue: '5000 (미커밋)' },
              { time: 't3', tx2: <span style={{ color: '#ef4444' }}>SELECT salary → <strong>5000</strong> 읽음 💀</span>, tx2Type: 'danger' },
              { time: 't4', tx1: <span style={{ color: '#ef4444' }}>ROLLBACK ❌</span>, dbValue: '3000' },
              { time: 't5', tx2: <span style={{ color: '#ef4444' }}>5000으로 로직 수행… (실제 값은 3000)</span>, tx2Type: 'danger' },
            ]}
            result="❌ TX1이 롤백했지만, TX2는 커밋되지 않은 5000을 읽어서 잘못된 결과를 사용했습니다."
            resultColor="#ef4444"
          />
          <StepByStep
            title="📋 Step-by-Step 해설 — Dirty Read"
            steps={[
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">TX1이 salary를 5000으로 변경</StepKey> — 아직 <strong style={{ color: '#ef4444' }}>COMMIT하지 않은 상태</strong>입니다. Buffer Pool의 메모리에서만 변경되었고, Undo Log에 원본 값(3000)이 보관됩니다.</> },
              { color: '#ef4444', content: <><StepKey color="#ef4444">TX2가 salary를 읽음 → 5000</StepKey> — <strong style={{ color: '#e2e8f0' }}>Read Uncommitted</strong> 격리 수준에서는 커밋되지 않은 Dirty Page도 읽을 수 있습니다. TX2는 아직 확정되지 않은 5000을 진짜 값으로 믿고 사용합니다.</> },
              { color: '#ef4444', content: <><StepKey color="#ef4444">TX1이 ROLLBACK</StepKey> — Undo Log를 따라 salary가 <strong style={{ color: '#e2e8f0' }}>3000으로 복원</strong>됩니다. 하지만 TX2는 이미 5000을 읽고 로직을 수행 중이므로 <strong style={{ color: '#ef4444' }}>데이터 불일치</strong>가 발생합니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">해결 방법</StepKey> — <strong style={{ color: '#f59e0b' }}>Read Committed</strong> 이상의 격리 수준을 사용하면 방지됩니다. MVCC를 통해 TX2는 <strong style={{ color: '#e2e8f0' }}>COMMIT된 데이터만</strong> 읽게 됩니다.</> },
            ]}
          />

          <Timeline
            icon="🔄" title="Non-Repeatable Read (반복 불가능 읽기)" color="#f59e0b"
            subtitle="같은 쿼리인데 결과가 다른 문제"
            tx1Label="TX1 (조회)" tx2Label="TX2 (수정)"
            dbLabel="salary" dbInitial="3000"
            steps={[
              { time: 't1', tx1: <span style={{ color: '#3b82f6' }}>BEGIN</span> },
              { time: 't2', tx1: <span style={{ color: '#22c55e' }}>SELECT salary → <strong>3000</strong> ✓</span>, tx1Type: 'ok' },
              { time: 't3', tx2: <span style={{ color: '#a855f7' }}>UPDATE salary = <strong style={{ color: '#e2e8f0' }}>5000</strong></span> },
              { time: 't4', tx2: <span style={{ color: '#a855f7' }}>COMMIT ✅</span>, dbValue: '5000' },
              { time: 't5', tx1: <span style={{ color: '#f59e0b' }}>SELECT salary → <strong>5000</strong> ⚠️ 값이 바뀜!</span>, tx1Type: 'warn' },
            ]}
            result="⚠️ TX1 안에서 같은 SELECT를 두 번 했는데, TX2의 커밋으로 인해 결과가 3000 → 5000으로 바뀌었습니다."
            resultColor="#f59e0b"
          />
          <StepByStep
            title="📋 Step-by-Step 해설 — Non-Repeatable Read"
            steps={[
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">TX1이 salary를 조회 → 3000</StepKey> — TX1의 첫 번째 SELECT가 실행됩니다. <strong style={{ color: '#f59e0b' }}>Read Committed</strong> 격리 수준에서는 이 시점의 커밋된 데이터를 읽습니다.</> },
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX2가 salary를 5000으로 UPDATE + COMMIT</StepKey> — TX2는 정상적으로 변경을 커밋했습니다. 이 시점부터 DB의 최신 커밋 데이터는 5000입니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">TX1이 같은 쿼리를 다시 실행 → 5000</StepKey> — Read Committed는 <strong style={{ color: '#e2e8f0' }}>매 SELECT마다 새 Read View</strong>를 생성하므로, TX2의 커밋 결과가 보입니다. 같은 TX1 안에서 같은 쿼리의 결과가 달라집니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">해결 방법</StepKey> — <strong style={{ color: '#06b6d4' }}>Repeatable Read</strong> 격리 수준을 사용합니다. <strong style={{ color: '#e2e8f0' }}>첫 SELECT 시점의 Read View를 트랜잭션 끝까지 재사용</strong>하므로, TX2의 변경이 보이지 않고 항상 3000을 읽습니다.</> },
            ]}
          />

          <Timeline
            icon="👻" title="Phantom Read (유령 읽기)" color="#a855f7"
            subtitle="없던 행이 갑자기 나타나는 문제"
            tx1Label="TX1 (범위 조회)" tx2Label="TX2 (삽입)"
            dbLabel="결과 행 수" dbInitial="3건"
            steps={[
              { time: 't1', tx1: <span style={{ color: '#3b82f6' }}>BEGIN</span> },
              { time: 't2', tx1: <span style={{ color: '#22c55e' }}>SELECT * WHERE age {'>'} 20 → <strong>3건</strong></span>, tx1Type: 'ok' },
              { time: 't3', tx2: <span style={{ color: '#a855f7' }}>INSERT (age=25) 새 행 추가</span> },
              { time: 't4', tx2: <span style={{ color: '#a855f7' }}>COMMIT ✅</span>, dbValue: '4건' },
              { time: 't5', tx1: <span style={{ color: '#a855f7' }}>SELECT * WHERE age {'>'} 20 → <strong>4건</strong> 👻</span>, tx1Type: 'warn' },
            ]}
            result={<>👻 TX1의 같은 범위 쿼리에서 TX2가 삽입한 "유령 행"이 나타났습니다. Non-Repeatable Read는 기존 행의 <strong>값</strong> 변경, Phantom Read는 <strong>행 개수</strong>의 변경입니다.</>}
            resultColor="#a855f7"
          />
          <StepByStep
            title="📋 Step-by-Step 해설 — Phantom Read"
            steps={[
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">TX1이 범위 조회 → 3건</StepKey> — <code style={{ color: '#06b6d4' }}>WHERE age {'>'} 20</code> 조건에 해당하는 행이 3건입니다. Repeatable Read에서 이 Read View가 고정됩니다.</> },
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX2가 새로운 행(age=25)을 INSERT + COMMIT</StepKey> — 기존에 <strong style={{ color: '#e2e8f0' }}>존재하지 않던 새로운 행</strong>이 추가되었습니다. Non-Repeatable Read와 달리 기존 행의 값 변경이 아니라 <strong style={{ color: '#a855f7' }}>행 자체가 새로 생긴</strong> 것입니다.</> },
              { color: '#a855f7', content: <><StepKey color="#a855f7">TX1이 같은 범위 조회 → 4건</StepKey> — 표준 SQL의 Repeatable Read에서는 MVCC가 기존 행의 값 변경만 감지합니다. <strong style={{ color: '#e2e8f0' }}>새로 INSERT된 행</strong>은 Undo Log에 "이전 버전"이 없으므로 MVCC만으로 걸러내기 어렵습니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">InnoDB의 해결</StepKey> — InnoDB는 <strong style={{ color: '#f59e0b' }}>Gap Lock(Next-Key Lock)</strong>을 사용합니다. 범위 조건의 인덱스 간격에 락을 걸어, 다른 트랜잭션이 해당 범위에 INSERT하는 것 자체를 <strong style={{ color: '#e2e8f0' }}>차단</strong>합니다. 이 덕분에 InnoDB의 RR에서는 Phantom Read가 방지됩니다.</> },
            ]}
          />

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> "Non-Repeatable Read와 Phantom Read의 차이"는 매우 빈출입니다. <strong>Non-Repeatable Read = 기존 행의 값이 변경</strong>됨, <strong>Phantom Read = 행의 개수가 변경</strong>(새 행 추가/삭제)됨으로 구분하면 명확합니다.
          </HighlightBox>
        </div>

        {/* ── 격리 수준 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>트랜잭션 격리 수준</SectionTitle>

          <div className="tx-iso-grid" style={{ marginBottom: '20px' }}>
            <div className="tx-iso-card">
              <div className="tx-iso-level" style={{ color: '#ef4444' }}>LEVEL 0</div>
              <div className="tx-iso-name" style={{ color: '#ef4444' }}>Read Uncommitted</div>
              <div className="tx-iso-desc">커밋되지 않은 데이터도 읽을 수 있음. <strong style={{ color: '#e2e8f0' }}>모든 동시성 문제가 발생</strong>합니다. 실무에서는 거의 사용하지 않습니다.</div>
              <div className="tx-iso-tag" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>가장 낮은 격리</div>
            </div>
            <div className="tx-iso-card">
              <div className="tx-iso-level" style={{ color: '#f59e0b' }}>LEVEL 1</div>
              <div className="tx-iso-name" style={{ color: '#f59e0b' }}>Read Committed</div>
              <div className="tx-iso-desc"><strong style={{ color: '#e2e8f0' }}>커밋된 데이터만</strong> 읽음. Dirty Read 방지. <strong style={{ color: '#f59e0b' }}>PostgreSQL, Oracle의 기본값</strong>입니다.</div>
              <div className="tx-iso-tag" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>PostgreSQL 기본</div>
            </div>
            <div className="tx-iso-card">
              <div className="tx-iso-level" style={{ color: '#06b6d4' }}>LEVEL 2</div>
              <div className="tx-iso-name" style={{ color: '#06b6d4' }}>Repeatable Read</div>
              <div className="tx-iso-desc">트랜잭션 시작 시점의 스냅샷을 계속 사용. <strong style={{ color: '#06b6d4' }}>MySQL InnoDB의 기본값</strong>. Gap Lock으로 Phantom Read도 방지합니다.</div>
              <div className="tx-iso-tag" style={{ background: 'rgba(6,182,212,0.12)', color: '#06b6d4' }}>MySQL 기본</div>
            </div>
            <div className="tx-iso-card">
              <div className="tx-iso-level" style={{ color: '#22c55e' }}>LEVEL 3</div>
              <div className="tx-iso-name" style={{ color: '#22c55e' }}>Serializable</div>
              <div className="tx-iso-desc">모든 트랜잭션이 <strong style={{ color: '#e2e8f0' }}>순차적으로 실행</strong>되는 것처럼 동작. 모든 문제 방지, <strong style={{ color: '#ef4444' }}>성능 크게 저하</strong>.</div>
              <div className="tx-iso-tag" style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e' }}>가장 높은 격리</div>
            </div>
          </div>

          <DocTable style={{ marginBottom: '20px' }}>
            <thead><tr>
              <th>격리 수준</th>
              <th style={{ color: '#ef4444' }}>Dirty Read</th>
              <th style={{ color: '#f59e0b' }}>Non-Repeatable Read</th>
              <th style={{ color: '#a855f7' }}>Phantom Read</th>
            </tr></thead>
            <tbody>
              <tr>
                <td><strong style={{ color: '#ef4444' }}>Read Uncommitted</strong></td>
                <td><strong style={{ color: '#ef4444' }}>O</strong></td>
                <td><strong style={{ color: '#ef4444' }}>O</strong></td>
                <td><strong style={{ color: '#ef4444' }}>O</strong></td>
              </tr>
              <tr>
                <td><strong style={{ color: '#f59e0b' }}>Read Committed</strong></td>
                <td><strong style={{ color: '#22c55e' }}>X</strong></td>
                <td><strong style={{ color: '#ef4444' }}>O</strong></td>
                <td><strong style={{ color: '#ef4444' }}>O</strong></td>
              </tr>
              <tr>
                <td><strong style={{ color: '#06b6d4' }}>Repeatable Read</strong></td>
                <td><strong style={{ color: '#22c55e' }}>X</strong></td>
                <td><strong style={{ color: '#22c55e' }}>X</strong></td>
                <td><strong style={{ color: '#f59e0b' }}>△</strong> <span style={{ fontSize: '10px', color: '#5a6a85' }}>(InnoDB는 방지)</span></td>
              </tr>
              <tr>
                <td><strong style={{ color: '#22c55e' }}>Serializable</strong></td>
                <td><strong style={{ color: '#22c55e' }}>X</strong></td>
                <td><strong style={{ color: '#22c55e' }}>X</strong></td>
                <td><strong style={{ color: '#22c55e' }}>X</strong></td>
              </tr>
            </tbody>
          </DocTable>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> MySQL InnoDB의 기본 격리 수준은 <strong>REPEATABLE READ</strong>이지만, 표준 SQL과 달리 <strong>Phantom Read도 방지</strong>합니다. 이는 MVCC + Gap Lock(넥스트 키 락)을 통해 구현됩니다.
          </HighlightBox>
        </div>

        {/* ── MVCC ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>MVCC — 격리 수준을 구현하는 핵심 메커니즘</SectionTitle>

          <SectionBox subtitle="MVCC란?" subtitleColor="#22c55e" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="📸">
                <strong style={{ color: '#e2e8f0' }}>스냅샷 기반 동시성 제어:</strong> 데이터를 변경할 때 기존 데이터를 덮어쓰지 않고 <strong style={{ color: '#22c55e' }}>이전 버전을 별도로 보관</strong>합니다. 각 트랜잭션은 자신의 시작 시점에 맞는 버전을 읽으므로, 읽기와 쓰기가 서로 블로킹하지 않습니다.
              </FeatureRow>
              <FeatureRow icon="🔓">
                <strong style={{ color: '#e2e8f0' }}>읽기는 락 없이, 쓰기만 락:</strong> SELECT는 락을 잡지 않고 자신의 스냅샷을 읽습니다. UPDATE/DELETE만 행 락을 필요로 합니다. 이 덕분에 <strong style={{ color: '#22c55e' }}>읽기 성능이 크게 향상</strong>됩니다.
              </FeatureRow>
              <FeatureRow icon="🔗">
                <strong style={{ color: '#e2e8f0' }}>그렇다면 이전 버전은 어디에?</strong> 바로 <strong style={{ color: '#f59e0b' }}>Undo Log</strong>입니다. MVCC의 "다중 버전"은 Undo Log에 보관된 이전 데이터를 통해 구현됩니다. 이 관계를 아래에서 자세히 살펴봅시다.
              </FeatureRow>
            </div>
          </SectionBox>

          <DiagramContainer title="InnoDB MVCC 동작 흐름 — Undo Log 기반 버전 관리">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '8px 0' }}>
              <div className="tx-mvcc-row">
                <div className="tx-mvcc-step" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>1</div>
                <span><strong style={{ color: '#3b82f6' }}>TX1 (id=100) 시작:</strong> salary=3000인 행을 읽습니다. 이 시점의 스냅샷이 TX1의 <strong style={{ color: '#e2e8f0' }}>Read View</strong>가 됩니다.</span>
              </div>
              <div className="tx-mvcc-row">
                <div className="tx-mvcc-step" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>2</div>
                <span><strong style={{ color: '#a855f7' }}>TX2 (id=101)</strong>가 salary를 <strong style={{ color: '#e2e8f0' }}>5000으로 UPDATE</strong>합니다. 원본 데이터(3000)는 <strong style={{ color: '#f59e0b' }}>Undo Log</strong>에 저장되고, 행의 현재 값은 5000으로 변경됩니다.</span>
              </div>
              <div className="tx-mvcc-row">
                <div className="tx-mvcc-step" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>3</div>
                <span><strong style={{ color: '#06b6d4' }}>TX1이 다시 SELECT:</strong> TX1의 Read View(id=100)에서 TX2(id=101)는 "아직 안 보이는" 트랜잭션입니다. InnoDB는 <strong style={{ color: '#f59e0b' }}>Undo Log를 따라가서</strong> TX1 시작 시점의 데이터(salary=3000)를 반환합니다.</span>
              </div>
              <div className="tx-mvcc-row">
                <div className="tx-mvcc-step" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>4</div>
                <span><strong style={{ color: '#22c55e' }}>결과:</strong> TX1은 TX2의 변경에 영향받지 않고 항상 3000을 읽습니다. <strong style={{ color: '#e2e8f0' }}>락 없이 Repeatable Read가 보장</strong>됩니다.</span>
              </div>
            </div>
          </DiagramContainer>

          <SectionBox subtitle="격리 수준별 MVCC 스냅샷 전략" subtitleColor="#06b6d4" style={{ marginBottom: '20px' }}>
            <DocTable>
              <thead><tr><th>격리 수준</th><th>Read View 생성 시점</th><th>결과</th></tr></thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#f59e0b' }}>Read Committed</strong></td>
                  <td>매 SELECT마다 새 Read View 생성</td>
                  <td>항상 최신 커밋 데이터를 읽음</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>Repeatable Read</strong></td>
                  <td>트랜잭션 첫 SELECT 시 Read View 생성</td>
                  <td>트랜잭션 내내 동일한 스냅샷 사용</td>
                </tr>
              </tbody>
            </DocTable>
          </SectionBox>

          <SectionBox subtitle="InnoDB의 Gap Lock — Phantom Read 방지" subtitleColor="#f59e0b" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="🔒">
                <strong style={{ color: '#e2e8f0' }}>Gap Lock이란?</strong> 인덱스 레코드 사이의 <strong style={{ color: '#f59e0b' }}>빈 공간(Gap)</strong>에도 락을 거는 것입니다. <code style={{ color: '#06b6d4' }}>{'WHERE age > 20'}</code> 범위에 Gap Lock이 걸립니다.
              </FeatureRow>
              <FeatureRow icon="🛡️">
                <strong style={{ color: '#e2e8f0' }}>Phantom Read 방지:</strong> 다른 트랜잭션이 이 범위에 INSERT하려 하면 Gap Lock에 의해 <strong style={{ color: '#f59e0b' }}>대기 상태</strong>가 됩니다.
              </FeatureRow>
              <FeatureRow icon="⚡">
                <strong style={{ color: '#e2e8f0' }}>Next-Key Lock:</strong> InnoDB는 <strong style={{ color: '#f59e0b' }}>Record Lock + Gap Lock = Next-Key Lock</strong>을 사용합니다. 이것이 InnoDB의 Repeatable Read에서 Phantom Read를 방지하는 핵심입니다.
              </FeatureRow>
            </div>
          </SectionBox>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> "MVCC가 뭔가요?"에는 ①Undo Log에 이전 버전 보관 ②각 트랜잭션은 Read View로 적절한 버전을 읽음 ③읽기-쓰기 간 블로킹 없음 — 세 가지를 설명하세요. Read Committed는 매 SELECT마다, Repeatable Read는 첫 SELECT 시 Read View를 만든다는 차이를 언급하면 완벽합니다.
          </HighlightBox>
        </div>

        {/* ── Redo Log & Undo Log ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>Redo Log & Undo Log — MVCC와 복구를 가능하게 하는 원리</SectionTitle>

          <SectionBox subtitle="왜 로그가 필요한가?" subtitleColor="#f59e0b" style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <FeatureRow icon="🔗">
                앞에서 MVCC가 <strong style={{ color: '#f59e0b' }}>Undo Log의 버전 체인</strong>을 따라가 이전 데이터를 읽는다고 했습니다. 그렇다면 Undo Log는 정확히 무엇이고, 함께 사용되는 <strong style={{ color: '#ef4444' }}>Redo Log</strong>는 어떤 역할을 할까요?
              </FeatureRow>
              <FeatureRow icon="💡">
                InnoDB는 디스크 I/O를 줄이기 위해 변경 사항을 바로 디스크에 쓰지 않고 <strong style={{ color: '#f59e0b' }}>메모리(Buffer Pool)</strong>에서 작업합니다. 그런데 메모리는 휘발성이므로 <strong style={{ color: '#ef4444' }}>서버 장애 시 데이터가 유실</strong>됩니다. 이 문제를 해결하는 것이 두 로그입니다.
              </FeatureRow>
              <FeatureRow icon="📝">
                <strong style={{ color: '#e2e8f0' }}>Redo Log → "무엇을 했는지" 기록</strong> — COMMIT된 변경을 복구(재실행). <strong style={{ color: '#06b6d4' }}>Durability</strong> 보장.
              </FeatureRow>
              <FeatureRow icon="↩️">
                <strong style={{ color: '#e2e8f0' }}>Undo Log → "무엇이었는지" 기록</strong> — ROLLBACK 시 원래 값 복원(<strong style={{ color: '#06b6d4' }}>Atomicity</strong>) + <strong style={{ color: '#22c55e' }}>MVCC의 버전 체인</strong> 제공.
              </FeatureRow>
            </div>
          </SectionBox>

          {/* InnoDB Write Flow Diagram */}
          <DiagramContainer title="InnoDB 트랜잭션 쓰기 흐름 — WAL(Write-Ahead Logging)">
            <div className="tx-log-flow">
              <div className="tx-log-node" style={{ borderColor: 'rgba(59,130,246,0.3)' }}>
                <div style={{ fontSize: '22px' }}>📝</div>
                <div className="tx-log-node-title" style={{ color: '#3b82f6' }}>① UPDATE 실행</div>
                <div className="tx-log-node-desc">클라이언트가 데이터 변경 요청</div>
              </div>

              <div className="tx-log-arrow">
                <div className="tx-log-arrow-line" style={{ background: '#f59e0b', color: '#f59e0b' }} />
                <div className="tx-log-arrow-label" style={{ color: '#f59e0b' }}>이전 값</div>
              </div>

              <div className="tx-log-node" style={{ borderColor: 'rgba(245,158,11,0.3)' }}>
                <div style={{ fontSize: '22px' }}>↩️</div>
                <div className="tx-log-node-title" style={{ color: '#f59e0b' }}>② Undo Log</div>
                <div className="tx-log-node-desc">변경 전 데이터 저장<br />(ROLLBACK + MVCC용)</div>
              </div>

              <div className="tx-log-arrow">
                <div className="tx-log-arrow-line" style={{ background: '#a855f7', color: '#a855f7' }} />
                <div className="tx-log-arrow-label" style={{ color: '#a855f7' }}>메모리 변경</div>
              </div>

              <div className="tx-log-node" style={{ borderColor: 'rgba(168,85,247,0.3)' }}>
                <div style={{ fontSize: '22px' }}>🧠</div>
                <div className="tx-log-node-title" style={{ color: '#a855f7' }}>③ Buffer Pool</div>
                <div className="tx-log-node-desc">메모리에서 페이지 변경<br />(Dirty Page 생성)</div>
              </div>

              <div className="tx-log-arrow">
                <div className="tx-log-arrow-line" style={{ background: '#ef4444', color: '#ef4444' }} />
                <div className="tx-log-arrow-label" style={{ color: '#ef4444' }}>WAL 기록</div>
              </div>

              <div className="tx-log-node" style={{ borderColor: 'rgba(239,68,68,0.3)' }}>
                <div style={{ fontSize: '22px' }}>📕</div>
                <div className="tx-log-node-title" style={{ color: '#ef4444' }}>④ Redo Log</div>
                <div className="tx-log-node-desc">변경 내용 디스크에 기록<br />(순차 쓰기 = 빠름)</div>
              </div>

              <div className="tx-log-arrow">
                <div className="tx-log-arrow-line" style={{ background: '#22c55e', color: '#22c55e' }} />
                <div className="tx-log-arrow-label" style={{ color: '#22c55e' }}>COMMIT!</div>
              </div>

              <div className="tx-log-node" style={{ borderColor: 'rgba(34,197,94,0.3)' }}>
                <div style={{ fontSize: '22px' }}>✅</div>
                <div className="tx-log-node-title" style={{ color: '#22c55e' }}>⑤ 응답</div>
                <div className="tx-log-node-desc">클라이언트에 성공 반환<br />(디스크 쓰기는 나중에)</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(6,182,212,0.04)', borderRadius: '8px', marginTop: '4px' }}>
              <span style={{ fontSize: '14px' }}>💾</span>
              <span style={{ fontSize: '11px', color: '#5a6a85', lineHeight: '1.7' }}>
                <strong style={{ color: '#06b6d4' }}>Checkpoint:</strong> Buffer Pool의 Dirty Page는 나중에 <strong style={{ color: '#e2e8f0' }}>비동기로</strong> 실제 데이터 파일(*.ibd)에 기록됩니다. 이를 Checkpoint라고 합니다. Redo Log에 이미 기록되어 있으므로 즉시 쓸 필요 없습니다.
              </span>
            </div>
          </DiagramContainer>

          {/* Redo Log & Undo Log Detail Cards */}
          <div className="tx-log-detail" style={{ marginBottom: '20px' }}>
            <div className="tx-log-card">
              <div className="tx-log-card-head">
                <span className="tx-log-card-icon">📕</span>
                <div>
                  <div className="tx-log-card-title" style={{ color: '#ef4444' }}>Redo Log</div>
                  <span className="tx-log-card-tag" style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}>Durability 보장</span>
                </div>
              </div>
              <div className="tx-log-list">
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#ef4444' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>WAL 원칙:</strong> 데이터 변경 전에 <strong style={{ color: '#ef4444' }}>로그를 먼저 디스크에 기록</strong>합니다. COMMIT 시 Redo Log만 디스크에 쓰면 되므로 빠릅니다.</span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#ef4444' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>물리적 로그:</strong> <code style={{ color: '#ef4444' }}>페이지 #5, 오프셋 120, 값 = 5000</code> 같이 <strong style={{ color: '#e2e8f0' }}>변경된 물리적 위치와 값</strong>을 기록합니다.</span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#ef4444' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>순차 쓰기:</strong> 랜덤 I/O가 아닌 <strong style={{ color: '#ef4444' }}>순차 I/O(Append)</strong>로 기록하므로 매우 빠릅니다. 실제 데이터 파일(*.ibd)에 랜덤 쓰기하는 것보다 훨씬 효율적입니다.</span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#ef4444' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>순환 버퍼:</strong> <code style={{ color: '#ef4444' }}>ib_logfile0</code>, <code style={{ color: '#ef4444' }}>ib_logfile1</code> 두 파일을 순환하며 기록합니다. Checkpoint 후 재사용됩니다.</span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#ef4444' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>Crash Recovery:</strong> 서버 장애 후 재시작 시, Redo Log를 <strong style={{ color: '#22c55e' }}>재실행(Redo)</strong>하여 COMMIT된 트랜잭션의 변경을 복원합니다.</span>
                </div>
              </div>
            </div>

            <div className="tx-log-card">
              <div className="tx-log-card-head">
                <span className="tx-log-card-icon">↩️</span>
                <div>
                  <div className="tx-log-card-title" style={{ color: '#f59e0b' }}>Undo Log</div>
                  <span className="tx-log-card-tag" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}>Atomicity + MVCC</span>
                </div>
              </div>
              <div className="tx-log-list">
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#f59e0b' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>변경 전 값 저장:</strong> UPDATE 시 변경 <strong style={{ color: '#f59e0b' }}>이전의 원본 데이터</strong>를 Undo Log에 보관합니다. 여러 번 수정되면 버전 체인이 생깁니다.</span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#f59e0b' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>논리적 로그:</strong> <code style={{ color: '#f59e0b' }}>salary: 3000 → 5000</code>처럼 <strong style={{ color: '#e2e8f0' }}>변경 전 값(역연산)</strong>을 기록합니다. Redo Log(물리적)와 대조적입니다.</span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#f59e0b' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>ROLLBACK 지원:</strong> 트랜잭션이 실패하면 Undo Log를 따라 <strong style={{ color: '#ef4444' }}>모든 변경을 역순으로 취소</strong>합니다. → <strong style={{ color: '#06b6d4' }}>Atomicity 보장</strong></span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#f59e0b' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>MVCC 버전 체인:</strong> 앞의 MVCC 섹션에서 본 것처럼, 다른 트랜잭션이 이전 버전을 읽어야 할 때 Undo Log의 버전 체인을 따라가 <strong style={{ color: '#22c55e' }}>자신의 Read View에 맞는 버전</strong>을 찾습니다.</span>
                </div>
                <div className="tx-log-item">
                  <span className="tx-log-item-icon" style={{ color: '#f59e0b' }}>▸</span>
                  <span><strong style={{ color: '#e2e8f0' }}>Purge:</strong> 더 이상 어떤 트랜잭션도 참조하지 않는 Undo Log는 <strong style={{ color: '#f59e0b' }}>Purge 스레드</strong>가 비동기로 정리합니다.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Crash Recovery Interactive Timeline */}
          <Timeline
            icon="🔥" title="Crash Recovery 시나리오" color="#ef4444"
            subtitle="서버 장애 후 Redo Log / Undo Log로 복구"
            tx1Label="TX1 (커밋됨)" tx2Label="TX2 (미커밋)"
            dbLabel="상태" dbInitial="정상"
            steps={[
              { time: 't1', tx1: <span style={{ color: '#3b82f6' }}>BEGIN → UPDATE salary = <strong>5000</strong></span>, tx2: <span style={{ color: '#a855f7' }}>BEGIN → UPDATE age = <strong>30</strong></span> },
              { time: 't2', tx1: <span style={{ color: '#22c55e' }}>COMMIT ✅ (Redo Log에 기록됨)</span>, tx1Type: 'ok', tx2: <span style={{ color: '#a855f7' }}>아직 작업 중… (미커밋)</span> },
              { time: 't3', tx1: <span style={{ color: '#ef4444' }}>💥 서버 장애 발생!</span>, tx1Type: 'danger', tx2: <span style={{ color: '#ef4444' }}>💥 서버 장애 발생!</span>, tx2Type: 'danger', dbValue: '장애!' },
              { time: 't4', tx1: <span style={{ color: '#22c55e' }}>📕 Redo: salary=5000 <strong>재실행</strong> ✅</span>, tx1Type: 'ok', tx2: <span style={{ color: '#f59e0b' }}>↩️ Undo: age 변경 <strong>롤백</strong> ↩️</span>, tx2Type: 'warn', dbValue: '복구 중' },
              { time: 't5', tx1: <span style={{ color: '#22c55e' }}>salary = 5000 복구 완료</span>, tx1Type: 'ok', tx2: <span style={{ color: '#22c55e' }}>age = 원래 값 복원 완료</span>, tx2Type: 'ok', dbValue: '정상' },
            ]}
            result={<>✅ <strong>COMMIT된 TX1</strong>은 Redo Log로 재실행(Redo)하여 복구하고, <strong>미커밋 TX2</strong>는 Undo Log로 롤백(Undo)하여 원래 상태로 되돌립니다. 이것이 InnoDB의 Crash Recovery입니다.</>}
            resultColor="#22c55e"
          />
          <StepByStep
            title="📋 Step-by-Step 해설 — Crash Recovery"
            steps={[
              { color: '#3b82f6', content: <><StepKey color="#3b82f6">장애 발생 시점의 상태 파악</StepKey> — TX1은 salary=5000으로 <strong style={{ color: '#22c55e' }}>COMMIT 완료</strong>(Redo Log에 기록됨). TX2는 age=30으로 변경했지만 <strong style={{ color: '#ef4444' }}>아직 COMMIT하지 않은 상태</strong>. 두 변경 모두 Buffer Pool(메모리)에만 있고, 실제 데이터 파일(*.ibd)에는 아직 반영되지 않았을 수 있습니다.</> },
              { color: '#ef4444', content: <><StepKey color="#ef4444">서버 재시작 → Recovery 시작</StepKey> — InnoDB가 시작되면 먼저 <strong style={{ color: '#ef4444' }}>Redo Log를 스캔</strong>합니다. Checkpoint 이후의 모든 Redo Log 엔트리를 찾아냅니다.</> },
              { color: '#22c55e', content: <><StepKey color="#22c55e">Redo 단계 (Roll Forward)</StepKey> — COMMIT 마커가 있는 TX1의 변경 사항을 Redo Log에서 읽어 <strong style={{ color: '#22c55e' }}>재실행</strong>합니다. salary=5000이 데이터 파일에 반영됩니다. 이로써 <strong style={{ color: '#06b6d4' }}>Durability</strong>가 보장됩니다.</> },
              { color: '#f59e0b', content: <><StepKey color="#f59e0b">Undo 단계 (Roll Back)</StepKey> — COMMIT 마커가 <strong style={{ color: '#ef4444' }}>없는</strong> TX2의 변경 사항은 Undo Log를 사용하여 <strong style={{ color: '#f59e0b' }}>롤백</strong>합니다. age는 원래 값으로 복원됩니다. 이로써 <strong style={{ color: '#06b6d4' }}>Atomicity</strong>가 보장됩니다.</> },
              { color: '#06b6d4', content: <><StepKey color="#06b6d4">Recovery 완료</StepKey> — DB가 장애 직전의 <strong style={{ color: '#e2e8f0' }}>일관된 상태</strong>로 복원되었습니다. COMMIT된 것만 남고, 미커밋은 깨끗하게 제거됩니다. 이 과정은 자동으로 수행되며, 애플리케이션은 Recovery 완료 후 정상적으로 접속할 수 있습니다.</> },
            ]}
          />

          <SectionBox subtitle="Redo Log vs Undo Log 비교 정리" subtitleColor="#06b6d4" style={{ marginBottom: '20px' }}>
            <DocTable>
              <thead><tr><th>구분</th><th style={{ color: '#ef4444' }}>Redo Log</th><th style={{ color: '#f59e0b' }}>Undo Log</th></tr></thead>
              <tbody>
                <tr><td>목적</td><td><strong style={{ color: '#ef4444' }}>COMMIT된 변경 복구</strong> (재실행)</td><td><strong style={{ color: '#f59e0b' }}>변경 취소</strong> (롤백) + MVCC</td></tr>
                <tr><td>기록 내용</td><td>변경 <strong style={{ color: '#e2e8f0' }}>후</strong> 데이터 (물리적)</td><td>변경 <strong style={{ color: '#e2e8f0' }}>전</strong> 데이터 (논리적)</td></tr>
                <tr><td>ACID 속성</td><td><strong style={{ color: '#06b6d4' }}>Durability</strong> 보장</td><td><strong style={{ color: '#06b6d4' }}>Atomicity</strong> 보장</td></tr>
                <tr><td>Crash Recovery</td><td>COMMIT된 TX를 <strong style={{ color: '#22c55e' }}>Redo</strong></td><td>미커밋 TX를 <strong style={{ color: '#ef4444' }}>Undo</strong></td></tr>
                <tr><td>쓰기 방식</td><td>순차 I/O (Append)</td><td>랜덤 I/O (Tablespace)</td></tr>
                <tr><td>파일</td><td><code style={{ color: '#ef4444' }}>ib_logfile0/1</code></td><td><code style={{ color: '#f59e0b' }}>undo tablespace</code></td></tr>
                <tr><td>수명</td><td>Checkpoint 후 재사용</td><td>Purge 스레드가 정리</td></tr>
              </tbody>
            </DocTable>
          </SectionBox>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> "InnoDB에서 COMMIT하면 데이터가 바로 디스크에 쓰이나요?"가 핵심 질문입니다. 답은 <strong>"아닙니다."</strong> COMMIT 시에는 <strong>Redo Log만 디스크에 기록</strong>(WAL)되고, 실제 데이터 파일(*.ibd)에는 Checkpoint 시점에 비동기로 쓰입니다. Redo Log는 순차 I/O라 빠르고, 장애 발생 시 Redo Log로 복구할 수 있으므로 Durability가 보장됩니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              { q: 'ACID 속성에 대해 설명해주세요.', a: 'Atomicity(원자성) — 전부 성공 또는 전부 실패. Consistency(일관성) — 트랜잭션 전후 DB 일관성 유지. Isolation(격리성) — 동시 실행 트랜잭션 간 간섭 방지. Durability(지속성) — 커밋된 데이터 영구 보존. 이 중 Isolation은 성능과의 트레이드오프로 격리 수준을 조절할 수 있습니다.' },
              { q: 'Dirty Read, Non-Repeatable Read, Phantom Read의 차이는?', a: 'Dirty Read는 커밋되지 않은 데이터를 읽는 것, Non-Repeatable Read는 같은 행을 두 번 읽었을 때 값이 변한 것, Phantom Read는 같은 범위 쿼리에서 행 수가 변한 것입니다. 핵심: Non-Repeatable Read는 기존 행의 "값" 변경, Phantom Read는 "행 수" 변경입니다.' },
              { q: 'MySQL InnoDB의 기본 격리 수준과 그 특징은?', a: 'REPEATABLE READ입니다. 표준 SQL과 달리 InnoDB는 MVCC + Gap Lock(Next-Key Lock)으로 Phantom Read도 방지합니다. MVCC로 트랜잭션 시작 시점의 스냅샷을 사용하고, Gap Lock으로 범위 내 새 행 삽입을 차단합니다.' },
              { q: 'MVCC의 동작 원리를 설명해주세요.', a: '변경 시 기존 값을 Undo Log에 보관하고, 각 트랜잭션은 Read View로 적절한 버전을 읽습니다. Read Committed는 매 SELECT마다 새 Read View, Repeatable Read는 첫 SELECT 시 Read View를 만들어 트랜잭션 끝까지 사용합니다. 읽기-쓰기 간 락 없이 동시성을 확보합니다.' },
              { q: 'Serializable 격리 수준은 왜 잘 사용하지 않나요?', a: '모든 동시성 문제를 방지하지만, 읽기에도 공유 락이 걸려 데드락 확률이 높고 TPS가 급격히 떨어집니다. 실무에서는 REPEATABLE READ + 필요한 곳에만 SELECT FOR UPDATE를 사용하는 것이 일반적입니다.' },
              { q: 'Redo Log와 Undo Log의 차이를 설명해주세요.', a: 'Redo Log는 변경 "후" 데이터를 물리적으로 기록하여 COMMIT된 트랜잭션의 Durability를 보장합니다. Undo Log는 변경 "전" 데이터를 논리적으로 기록하여 ROLLBACK 시 Atomicity를 보장하고, MVCC에서 이전 버전을 제공합니다. Crash Recovery 시 Redo Log로 커밋된 TX를 재실행하고, Undo Log로 미커밋 TX를 롤백합니다.' },
              { q: 'WAL(Write-Ahead Logging)이란 무엇이고, 왜 사용하나요?', a: '데이터를 변경하기 전에 로그를 먼저 디스크에 기록하는 원칙입니다. COMMIT 시 Redo Log(순차 I/O)만 디스크에 쓰고, 실제 데이터 파일에는 Checkpoint 시 비동기로 기록합니다. 순차 I/O가 랜덤 I/O보다 훨씬 빠르므로 성능과 안정성을 동시에 확보합니다.' },
            ]}
          />
        </div>
      </div>
    </>
  )
}

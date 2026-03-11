import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.qpo-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.qpo-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.qpo-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.qpo-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.qpo-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.qpo-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.qpo-param:hover { transform:translateY(-3px); }
.qpo-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.qpo-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.qpo-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.qpo-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.qpo-table { width:100%; border-collapse:collapse; font-size:12px; }
.qpo-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.qpo-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.qpo-table tr:last-child td { border-bottom:none; }
.qpo-step-list { display:flex; flex-direction:column; gap:10px; }
.qpo-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.qpo-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.qpo-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.qpo-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .qpo-compare-grid{ grid-template-columns:1fr; } }
.qpo-type-badge { display:inline-block; padding:2px 8px; border-radius:6px; font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; }
`

export default function QueryPlanOptimizer() {
  useInjectCSS('style-query-plan-optimizer', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="EXPLAIN · CBO · 통계 정보 · Hint · Cardinality · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>실행 계획</span> & 옵티마이저</>}
          description="Cost-Based Optimizer, EXPLAIN 실행 계획 읽기, 통계 정보와 카디널리티, 옵티마이저 힌트, PostgreSQL EXPLAIN ANALYZE"
        />

        {/* ── 옵티마이저 개요 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>쿼리 옵티마이저 (Query Optimizer)</SectionTitle>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#06b6d4' }}>옵티마이저란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">🧠</span>
                <span>SQL은 <strong style={{ color: '#e2e8f0' }}>"무엇(What)"을 원하는지</strong> 선언하지만, <strong style={{ color: '#06b6d4' }}>"어떻게(How)"</strong> 실행할지는 정하지 않습니다. <strong style={{ color: '#e2e8f0' }}>옵티마이저</strong>가 여러 실행 경로 중 <strong style={{ color: '#22c55e' }}>가장 비용이 낮은 계획</strong>을 선택하는 역할을 합니다.</span>
              </div>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">📊</span>
                <span>같은 결과를 반환하는 실행 방법이 수십~수백 가지 존재할 수 있습니다. 어떤 인덱스를 사용할지, 테이블 조인 순서는 어떻게 할지, Nested Loop vs Hash Join 중 어떤 것을 택할지를 옵티마이저가 결정합니다.</span>
              </div>
            </div>
          </div>

          {/* 쿼리 실행 흐름 다이어그램 */}
          <DiagramContainer title="SQL 쿼리 실행 흐름">
            <DiagramFlow>
              <DiagramNode icon="📝" label="SQL 파싱" sub="구문 분석 · AST 생성" color="#06b6d4" />
              <DiagramArrow label="파싱 트리" color="#06b6d4" animated />
              <DiagramGroup label="Optimizer" color="#f59e0b">
                <DiagramNode icon="🧠" label="실행 계획 생성" sub="여러 후보 경로 탐색" color="#f59e0b" />
                <DiagramNode icon="📊" label="비용 산정" sub="통계 정보 기반 Cost 계산" color="#a855f7" />
              </DiagramGroup>
              <DiagramArrow label="최적 계획" color="#22c55e" animated />
              <DiagramNode icon="⚡" label="실행 엔진" sub="선택된 계획대로 실행" color="#22c55e" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="qpo-compare-grid" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="qpo-section-box">
              <div className="qpo-section-subtitle"><span style={{ color: '#06b6d4' }}>CBO (Cost-Based Optimizer)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="qpo-feature-row">
                  <span className="qpo-feature-icon">📊</span>
                  <span><strong style={{ color: '#e2e8f0' }}>통계 정보(Statistics)</strong>를 기반으로 각 실행 계획의 <strong style={{ color: '#06b6d4' }}>비용(Cost)</strong>을 산정하여 가장 저렴한 계획을 선택</span>
                </div>
                <div className="qpo-feature-row">
                  <span className="qpo-feature-icon">✅</span>
                  <span><strong style={{ color: '#22c55e' }}>현대 RDBMS의 표준</strong> — MySQL, PostgreSQL, Oracle 모두 CBO 사용</span>
                </div>
                <div className="qpo-feature-row">
                  <span className="qpo-feature-icon">⚠️</span>
                  <span>통계가 <strong style={{ color: '#f59e0b' }}>부정확하면 잘못된 계획</strong>을 세울 수 있음 → ANALYZE TABLE 필요</span>
                </div>
              </div>
            </div>
            <div className="qpo-section-box">
              <div className="qpo-section-subtitle"><span style={{ color: '#a855f7' }}>RBO (Rule-Based Optimizer)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="qpo-feature-row">
                  <span className="qpo-feature-icon">📏</span>
                  <span>미리 정해진 <strong style={{ color: '#e2e8f0' }}>규칙(Rule)</strong>에 따라 실행 계획을 결정. "인덱스가 있으면 항상 사용" 같은 고정 규칙</span>
                </div>
                <div className="qpo-feature-row">
                  <span className="qpo-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>현대 RDBMS에서는 사용하지 않음</strong> — Oracle 10g 이후 제거</span>
                </div>
                <div className="qpo-feature-row">
                  <span className="qpo-feature-icon">⚠️</span>
                  <span>데이터 분포를 무시하므로 <strong style={{ color: '#ef4444' }}>최적이 아닌 계획</strong>을 세울 수 있음</span>
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> "옵티마이저가 무엇인가요?"에는 <strong>"SQL의 선언적 요청을 실제 실행 계획으로 변환하는 엔진"</strong>이라고 답합니다. 현대 RDBMS는 모두 <strong>CBO</strong>를 사용하며, 테이블/인덱스의 <strong>통계 정보(행 수, 카디널리티, 데이터 분포)</strong>를 기반으로 디스크 I/O, CPU, 메모리 비용을 산정합니다. 같은 쿼리라도 데이터 분포가 달라지면 실행 계획이 바뀔 수 있습니다.
          </HighlightBox>
        </div>

        {/* ── EXPLAIN 실행 계획 읽기 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>MySQL EXPLAIN 실행 계획 읽기</SectionTitle>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#3b82f6' }}>EXPLAIN 출력 컬럼</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">🔍</span>
                <span><code style={{ color: '#3b82f6' }}>EXPLAIN SELECT ...</code>를 실행하면 옵티마이저가 선택한 실행 계획을 테이블 형태로 보여줍니다. <strong style={{ color: '#e2e8f0' }}>실제로 쿼리를 실행하지 않고</strong> 계획만 확인합니다.</span>
              </div>
            </div>
          </div>

          <div className="qpo-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="qpo-table">
              <thead>
                <tr>
                  <th>컬럼</th>
                  <th>설명</th>
                  <th>주의할 값</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>id</strong></td>
                  <td>쿼리 내 SELECT의 순번. 서브쿼리마다 id 증가</td>
                  <td>같은 id는 JOIN으로 처리됨</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>select_type</strong></td>
                  <td>SELECT의 유형 (SIMPLE, PRIMARY, SUBQUERY, DERIVED 등)</td>
                  <td><strong style={{ color: '#ef4444' }}>DEPENDENT SUBQUERY</strong>는 성능 위험</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#22c55e' }}>type</strong></td>
                  <td>테이블 접근 방식 — <strong style={{ color: '#e2e8f0' }}>가장 중요한 컬럼</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>ALL</strong>은 Full Table Scan</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#a855f7' }}>possible_keys</strong></td>
                  <td>사용 가능한 인덱스 후보 목록</td>
                  <td>NULL이면 인덱스 후보 없음</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f59e0b' }}>key</strong></td>
                  <td>실제로 선택된 인덱스</td>
                  <td>NULL이면 인덱스 미사용</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#ef4444' }}>key_len</strong></td>
                  <td>사용된 인덱스의 바이트 길이</td>
                  <td>복합 인덱스에서 몇 개 컬럼까지 사용했는지 판단</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>rows</strong></td>
                  <td>옵티마이저가 예상하는 스캔 행 수</td>
                  <td>실제와 크게 다르면 통계 부정확</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>filtered</strong></td>
                  <td>WHERE 조건으로 필터링될 비율 (%)</td>
                  <td>rows × filtered/100 = 결과 행 수 추정</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#a855f7' }}>Extra</strong></td>
                  <td>추가 실행 정보</td>
                  <td><strong style={{ color: '#ef4444' }}>Using filesort, Using temporary</strong> 주의</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock title="EXPLAIN 실행 예시" lang="sql">{
`-- 기본 EXPLAIN
EXPLAIN SELECT * FROM orders WHERE user_id = 100 ORDER BY created_at DESC LIMIT 20;

-- EXPLAIN FORMAT=JSON (더 상세한 비용 정보)
EXPLAIN FORMAT=JSON SELECT * FROM orders WHERE user_id = 100;

-- EXPLAIN ANALYZE (MySQL 8.0.18+) — 실제 실행 후 계획 vs 실제 비교
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 100 ORDER BY created_at DESC;
-- → actual time=0.05..0.12, rows=20, loops=1`
          }</CodeBlock>

          <HighlightBox color="#3b82f6">
            <strong>면접 포인트:</strong> EXPLAIN에서 가장 먼저 확인할 컬럼은 <strong>type</strong>과 <strong>Extra</strong>입니다. type이 <strong>ALL</strong>이면 Full Table Scan, Extra에 <strong>Using filesort</strong>가 있으면 정렬을 위한 추가 작업, <strong>Using temporary</strong>가 있으면 임시 테이블 생성을 의미합니다. <code style={{ color: '#06b6d4' }}>rows</code>는 예상값이므로 <strong>EXPLAIN ANALYZE</strong>로 실제 실행 결과와 비교해야 정확한 진단이 가능합니다.
          </HighlightBox>
        </div>

        {/* ── type 컬럼 상세 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#f59e0b']}>type 컬럼 — 접근 방식 (성능 순)</SectionTitle>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#22c55e' }}>type 값의 성능 순서 (좋음 → 나쁨)</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">🏆</span>
                <span><span className="qpo-type-badge" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>system</span> → <span className="qpo-type-badge" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>const</span> → <span className="qpo-type-badge" style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4' }}>eq_ref</span> → <span className="qpo-type-badge" style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}>ref</span> → <span className="qpo-type-badge" style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7' }}>range</span> → <span className="qpo-type-badge" style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>index</span> → <span className="qpo-type-badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>ALL</span></span>
              </div>
            </div>
          </div>

          <div className="qpo-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="qpo-table">
              <thead>
                <tr>
                  <th>type</th>
                  <th>설명</th>
                  <th>예시</th>
                  <th>성능</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="qpo-type-badge" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>system</span></td>
                  <td>테이블에 행이 1개 (시스템 테이블)</td>
                  <td>const의 특수 케이스</td>
                  <td><strong style={{ color: '#22c55e' }}>최상</strong></td>
                </tr>
                <tr>
                  <td><span className="qpo-type-badge" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>const</span></td>
                  <td>PK 또는 UNIQUE 인덱스로 1행 조회</td>
                  <td><code style={{ fontSize: '11px' }}>WHERE id = 1</code></td>
                  <td><strong style={{ color: '#22c55e' }}>최상</strong></td>
                </tr>
                <tr>
                  <td><span className="qpo-type-badge" style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4' }}>eq_ref</span></td>
                  <td>JOIN에서 PK/UNIQUE로 1행씩 매칭</td>
                  <td>JOIN 시 PK 매칭</td>
                  <td><strong style={{ color: '#06b6d4' }}>매우 좋음</strong></td>
                </tr>
                <tr>
                  <td><span className="qpo-type-badge" style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}>ref</span></td>
                  <td>Non-unique 인덱스로 여러 행 조회</td>
                  <td><code style={{ fontSize: '11px' }}>WHERE user_id = 100</code></td>
                  <td><strong style={{ color: '#3b82f6' }}>좋음</strong></td>
                </tr>
                <tr>
                  <td><span className="qpo-type-badge" style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7' }}>range</span></td>
                  <td>인덱스 범위 스캔</td>
                  <td><code style={{ fontSize: '11px' }}>WHERE id BETWEEN 1 AND 100</code></td>
                  <td><strong style={{ color: '#a855f7' }}>보통</strong></td>
                </tr>
                <tr>
                  <td><span className="qpo-type-badge" style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>index</span></td>
                  <td>인덱스 전체 스캔 (Full Index Scan)</td>
                  <td>커버링 인덱스 + 조건 없음</td>
                  <td><strong style={{ color: '#f59e0b' }}>주의</strong></td>
                </tr>
                <tr>
                  <td><span className="qpo-type-badge" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>ALL</span></td>
                  <td>테이블 전체 스캔 (Full Table Scan)</td>
                  <td>인덱스 미사용</td>
                  <td><strong style={{ color: '#ef4444' }}>최악</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#ef4444' }}>Extra 컬럼 주요 값</span></div>
            <div className="qpo-param-grid">
              <div className="qpo-param">
                <div className="qpo-param-name" style={{ color: '#22c55e' }}>Using index</div>
                <div className="qpo-param-desc">
                  <strong style={{ color: '#22c55e' }}>커버링 인덱스</strong>로 처리됨. 데이터 페이지 접근 없이 인덱스만으로 결과를 반환합니다. <strong>좋은 신호입니다.</strong>
                </div>
                <div className="qpo-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>좋음</div>
              </div>
              <div className="qpo-param">
                <div className="qpo-param-name" style={{ color: '#06b6d4' }}>Using where</div>
                <div className="qpo-param-desc">
                  스토리지 엔진에서 가져온 후 <strong style={{ color: '#e2e8f0' }}>MySQL 서버 레벨에서 추가 필터링</strong>. 인덱스로 완전히 걸러지지 않았다는 의미입니다.
                </div>
                <div className="qpo-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>보통</div>
              </div>
              <div className="qpo-param">
                <div className="qpo-param-name" style={{ color: '#f59e0b' }}>Using filesort</div>
                <div className="qpo-param-desc">
                  인덱스로 정렬할 수 없어 <strong style={{ color: '#f59e0b' }}>추가 정렬 작업</strong>을 수행합니다. 데이터가 크면 디스크 기반 정렬로 느려질 수 있습니다.
                </div>
                <div className="qpo-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>주의</div>
              </div>
              <div className="qpo-param">
                <div className="qpo-param-name" style={{ color: '#ef4444' }}>Using temporary</div>
                <div className="qpo-param-desc">
                  <strong style={{ color: '#ef4444' }}>임시 테이블</strong>을 생성하여 결과를 처리합니다. GROUP BY, DISTINCT, UNION 등에서 인덱스를 활용하지 못할 때 발생합니다.
                </div>
                <div className="qpo-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>위험</div>
              </div>
              <div className="qpo-param">
                <div className="qpo-param-name" style={{ color: '#3b82f6' }}>Using index condition</div>
                <div className="qpo-param-desc">
                  <strong style={{ color: '#3b82f6' }}>ICP(Index Condition Pushdown)</strong>가 적용됨. WHERE 조건의 일부를 스토리지 엔진 레벨에서 평가하여 불필요한 행 접근을 줄입니다.
                </div>
                <div className="qpo-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>좋음</div>
              </div>
              <div className="qpo-param">
                <div className="qpo-param-name" style={{ color: '#a855f7' }}>Using MRR</div>
                <div className="qpo-param-desc">
                  <strong style={{ color: '#a855f7' }}>Multi-Range Read</strong> 최적화 적용. 인덱스 스캔 후 PK 순으로 정렬하여 데이터 페이지 접근을 순차적으로 만듭니다.
                </div>
                <div className="qpo-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>좋음</div>
              </div>
            </div>
          </div>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> "EXPLAIN 결과를 보고 어떤 것을 확인하나요?" → ①<strong>type</strong>이 ALL이면 Full Table Scan → 인덱스 추가 검토, ②<strong>Extra</strong>에 Using filesort/Using temporary가 있으면 인덱스로 정렬/그룹핑 가능한지 확인, ③<strong>rows</strong>가 예상보다 크면 WHERE 조건이 인덱스를 타지 못하는 것, ④<strong>key_len</strong>으로 복합 인덱스에서 몇 개 컬럼까지 활용되는지 확인합니다.
          </HighlightBox>
        </div>

        {/* ── 통계 정보 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>통계 정보 (Statistics)</SectionTitle>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#a855f7' }}>통계 정보가 중요한 이유</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">📊</span>
                <span>CBO는 <strong style={{ color: '#e2e8f0' }}>통계 정보를 기반으로 비용을 산정</strong>합니다. 통계가 실제 데이터와 크게 다르면 옵티마이저가 <strong style={{ color: '#ef4444' }}>잘못된 실행 계획</strong>을 세웁니다. 예를 들어 실제로는 10만 행이 매칭되는데 통계상 100행으로 예측하면, Full Table Scan이 더 효율적인데도 인덱스를 사용하는 비효율이 발생합니다.</span>
              </div>
            </div>
          </div>

          <div className="qpo-param-grid" style={{ marginBottom: '20px' }}>
            <div className="qpo-param">
              <div className="qpo-param-name" style={{ color: '#06b6d4' }}>카디널리티 (Cardinality)</div>
              <div className="qpo-param-desc">
                인덱스 컬럼의 <strong style={{ color: '#e2e8f0' }}>고유 값의 수</strong>입니다. 카디널리티가 높을수록(고유 값이 많을수록) 인덱스 선택도(Selectivity)가 높아 인덱스가 효과적입니다.
              </div>
              <div className="qpo-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>높을수록 좋음</div>
            </div>
            <div className="qpo-param">
              <div className="qpo-param-name" style={{ color: '#a855f7' }}>히스토그램 (Histogram)</div>
              <div className="qpo-param-desc">
                컬럼 값의 <strong style={{ color: '#e2e8f0' }}>분포 정보</strong>입니다. MySQL 8.0+에서 지원합니다. 데이터가 편중된 경우(예: status 컬럼의 99%가 'ACTIVE') 옵티마이저가 더 정확한 판단을 할 수 있게 합니다.
              </div>
              <div className="qpo-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>MySQL 8.0+</div>
            </div>
            <div className="qpo-param">
              <div className="qpo-param-name" style={{ color: '#f59e0b' }}>테이블 행 수</div>
              <div className="qpo-param-desc">
                InnoDB는 정확한 행 수를 저장하지 않고 <strong style={{ color: '#e2e8f0' }}>샘플링으로 추정</strong>합니다. 대규모 INSERT/DELETE 후 행 수 통계가 부정확해질 수 있습니다.
              </div>
              <div className="qpo-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>추정값 (샘플링)</div>
            </div>
          </div>

          <CodeBlock title="통계 정보 확인 및 갱신" lang="sql">{
`-- 테이블/인덱스 통계 확인 (MySQL)
SHOW INDEX FROM orders;
-- → Cardinality 컬럼으로 인덱스별 고유 값 수 확인

-- 상세 통계 확인
SELECT * FROM information_schema.STATISTICS
WHERE TABLE_NAME = 'orders';

-- 통계 갱신 (InnoDB)
ANALYZE TABLE orders;
-- → 인덱스 통계를 재수집하여 옵티마이저가 정확한 판단을 하도록 함

-- 히스토그램 생성 (MySQL 8.0+)
ANALYZE TABLE orders UPDATE HISTOGRAM ON status WITH 100 BUCKETS;

-- 히스토그램 확인
SELECT HISTOGRAM FROM information_schema.COLUMN_STATISTICS
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'status';

-- 히스토그램 삭제
ANALYZE TABLE orders DROP HISTOGRAM ON status;

-- PostgreSQL: 통계 갱신
-- ANALYZE orders;
-- 상세 통계: SELECT * FROM pg_stats WHERE tablename = 'orders';`
          }</CodeBlock>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> "쿼리가 갑자기 느려졌는데 쿼리는 변경하지 않았습니다. 원인이 뭘까요?" → 대표적인 원인이 <strong>통계 정보의 변화</strong>입니다. 대량 데이터 INSERT/DELETE 후 카디널리티가 변하면 옵티마이저가 다른 실행 계획을 선택할 수 있습니다. <code style={{ color: '#06b6d4' }}>ANALYZE TABLE</code>로 통계를 갱신하고, EXPLAIN으로 실행 계획이 바뀌었는지 확인해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 옵티마이저 힌트 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>옵티마이저 힌트 (Optimizer Hints)</SectionTitle>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#f59e0b' }}>힌트란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">💡</span>
                <span>옵티마이저가 <strong style={{ color: '#ef4444' }}>잘못된 실행 계획을 선택</strong>할 때, 개발자가 <strong style={{ color: '#e2e8f0' }}>명시적으로 실행 방식을 지시</strong>하는 기능입니다. "이 인덱스를 사용해라", "이 조인 순서를 따라라" 등을 지정할 수 있습니다.</span>
              </div>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">⚠️</span>
                <span>힌트는 <strong style={{ color: '#ef4444' }}>최후의 수단</strong>입니다. 먼저 인덱스 추가, 쿼리 리팩토링, 통계 갱신을 시도하고, 그래도 옵티마이저가 잘못된 계획을 고집할 때만 사용해야 합니다. 데이터가 변하면 힌트가 오히려 <strong style={{ color: '#ef4444' }}>역효과</strong>를 낼 수 있습니다.</span>
              </div>
            </div>
          </div>

          <CodeBlock title="MySQL 옵티마이저 힌트 예시" lang="sql">{
`-- MySQL 5.7+ 옵티마이저 힌트 (주석 형태)
-- 특정 인덱스 사용 강제
SELECT /*+ INDEX(orders idx_orders_user_id) */
  * FROM orders WHERE user_id = 100;

-- 특정 인덱스 사용 금지
SELECT /*+ NO_INDEX(orders idx_orders_created_at) */
  * FROM orders WHERE created_at > '2025-01-01';

-- JOIN 순서 고정
SELECT /*+ JOIN_ORDER(users, orders) */
  * FROM orders o JOIN users u ON o.user_id = u.id;

-- Nested Loop JOIN 강제 (Hash Join 방지)
SELECT /*+ NO_HASH_JOIN(orders) */
  * FROM orders o JOIN users u ON o.user_id = u.id;

-- 인덱스 힌트 (레거시 문법, MySQL 전용)
SELECT * FROM orders USE INDEX (idx_orders_user_id)
WHERE user_id = 100;

SELECT * FROM orders FORCE INDEX (idx_orders_created_at)
WHERE created_at > '2025-01-01' ORDER BY created_at;

SELECT * FROM orders IGNORE INDEX (idx_orders_status)
WHERE status = 'PENDING';

-- PostgreSQL: 힌트 없음 → 설정으로 제어
-- SET enable_seqscan = off;  -- Sequential Scan 비활성화 (테스트용)
-- SET enable_hashjoin = off; -- Hash Join 비활성화`
          }</CodeBlock>

          <div className="qpo-table-wrap" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <table className="qpo-table">
              <thead>
                <tr>
                  <th>힌트 종류</th>
                  <th>MySQL 문법</th>
                  <th>용도</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>인덱스 힌트</strong></td>
                  <td><code style={{ fontSize: '11px' }}>INDEX() / NO_INDEX()</code></td>
                  <td>특정 인덱스 사용/금지</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>조인 순서 힌트</strong></td>
                  <td><code style={{ fontSize: '11px' }}>JOIN_ORDER() / JOIN_PREFIX()</code></td>
                  <td>테이블 조인 순서 지정</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#a855f7' }}>조인 방식 힌트</strong></td>
                  <td><code style={{ fontSize: '11px' }}>NO_HASH_JOIN() / NO_BNL()</code></td>
                  <td>특정 조인 알고리즘 금지</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f59e0b' }}>서브쿼리 힌트</strong></td>
                  <td><code style={{ fontSize: '11px' }}>SEMIJOIN() / NO_SEMIJOIN()</code></td>
                  <td>서브쿼리 최적화 전략 지정</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#22c55e' }}>기타</strong></td>
                  <td><code style={{ fontSize: '11px' }}>MAX_EXECUTION_TIME()</code></td>
                  <td>쿼리 실행 시간 제한 (ms)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> "힌트를 사용해 본 경험이 있나요?"에는 <strong>"힌트는 최후의 수단으로만 사용합니다"</strong>라고 답해야 합니다. 먼저 ①인덱스 설계 점검 → ②통계 갱신(ANALYZE TABLE) → ③쿼리 리팩토링을 시도하고, 옵티마이저가 명백히 잘못된 계획을 고집할 때만 힌트를 사용합니다. 힌트를 남용하면 데이터 분포가 변할 때 <strong>오히려 성능이 저하</strong>될 수 있고, 유지보수가 어려워집니다.
          </HighlightBox>
        </div>

        {/* ── PostgreSQL EXPLAIN ANALYZE ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>PostgreSQL EXPLAIN ANALYZE</SectionTitle>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#06b6d4' }}>MySQL vs PostgreSQL 실행 계획 차이</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="qpo-feature-row">
                <span className="qpo-feature-icon">🔍</span>
                <span>PostgreSQL의 <code style={{ color: '#06b6d4' }}>EXPLAIN ANALYZE</code>는 <strong style={{ color: '#e2e8f0' }}>실제로 쿼리를 실행</strong>하고, 예상 비용(estimated)과 실제 결과(actual)를 함께 보여줍니다. MySQL의 기본 EXPLAIN은 예상값만 보여주지만, MySQL 8.0.18+의 EXPLAIN ANALYZE도 비슷한 기능을 제공합니다.</span>
              </div>
            </div>
          </div>

          <CodeBlock title="PostgreSQL EXPLAIN ANALYZE 읽기" lang="sql">{
`-- PostgreSQL: 실제 실행 결과 포함
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT o.*, u.name
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE o.status = 'PENDING'
ORDER BY o.created_at DESC
LIMIT 20;

-- 출력 예시:
-- Limit (cost=100.50..100.55 rows=20 width=120)
--        (actual time=0.521..0.534 rows=20 loops=1)
--   -> Sort (cost=100.50..102.00 rows=600 width=120)
--          (actual time=0.520..0.528 rows=20 loops=1)
--     Sort Key: o.created_at DESC
--     Sort Method: top-N heapsort  Memory: 30kB
--     -> Nested Loop (cost=0.85..85.50 rows=600 width=120)
--                    (actual time=0.025..0.380 rows=600 loops=1)
--       -> Index Scan using idx_orders_status on orders o
--              (cost=0.42..25.00 rows=600 width=100)
--              (actual time=0.015..0.120 rows=600 loops=1)
--            Index Cond: (status = 'PENDING')
--       -> Index Scan using users_pkey on users u
--              (cost=0.43..0.10 rows=1 width=20)
--              (actual time=0.001..0.001 rows=1 loops=600)
--            Index Cond: (id = o.user_id)
-- Planning Time: 0.250 ms
-- Execution Time: 0.580 ms
-- Buffers: shared hit=1850`
          }</CodeBlock>

          <div className="qpo-table-wrap" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <table className="qpo-table">
              <thead>
                <tr>
                  <th>비교 항목</th>
                  <th style={{ color: '#06b6d4' }}>MySQL EXPLAIN</th>
                  <th style={{ color: '#3b82f6' }}>PostgreSQL EXPLAIN ANALYZE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>실제 실행</strong></td>
                  <td>EXPLAIN은 실행 안 함 (ANALYZE는 실행)</td>
                  <td><strong style={{ color: '#22c55e' }}>실행 후 결과 비교</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>출력 형태</strong></td>
                  <td>테이블 형태 (행 1개 = 테이블 1개)</td>
                  <td>트리 형태 (들여쓰기로 계층 표현)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>비용 정보</strong></td>
                  <td>FORMAT=JSON으로 확인</td>
                  <td>기본 출력에 cost 포함</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>실제 행 수</strong></td>
                  <td>EXPLAIN ANALYZE (8.0.18+)</td>
                  <td><strong style={{ color: '#22c55e' }}>actual rows 기본 제공</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>버퍼 히트</strong></td>
                  <td>직접 확인 불가</td>
                  <td><strong style={{ color: '#22c55e' }}>BUFFERS 옵션으로 확인</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>조인 방식</strong></td>
                  <td>type 컬럼으로 간접 확인</td>
                  <td>Nested Loop / Hash Join / Merge Join 명시</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> PostgreSQL EXPLAIN ANALYZE에서 가장 중요한 확인 포인트는 <strong>estimated rows vs actual rows의 차이</strong>입니다. 예상 600행인데 실제 10만 행이면 통계가 부정확한 것이고, 옵티마이저가 잘못된 조인 방식을 선택했을 수 있습니다. <code style={{ color: '#06b6d4' }}>ANALYZE orders</code>로 통계를 갱신하면 해결되는 경우가 많습니다.
          </HighlightBox>
        </div>

        {/* ── 실행 계획 기반 최적화 사례 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#22c55e']}>실행 계획 기반 최적화 사례</SectionTitle>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#ef4444' }}>Case 1: Full Table Scan → 인덱스 활용</span></div>
            <div className="qpo-step-list">
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>❌</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#ef4444' }}>문제:</strong> <code style={{ color: '#ef4444' }}>type: ALL, rows: 5000000</code> — 500만 행 Full Table Scan<br />
                  <code style={{ color: '#94a3b8' }}>SELECT * FROM orders WHERE DATE(created_at) = '2025-03-01'</code>
                </div>
              </div>
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>🔍</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#f59e0b' }}>원인:</strong> <code style={{ color: '#f59e0b' }}>DATE(created_at)</code> 함수로 인해 인덱스가 <strong style={{ color: '#ef4444' }}>무효화</strong>됨. 컬럼에 함수를 적용하면 인덱스를 사용할 수 없음
                </div>
              </div>
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>✅</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#22c55e' }}>해결:</strong> 범위 조건으로 변경 → <code style={{ color: '#22c55e' }}>WHERE created_at {'>'}= '2025-03-01' AND created_at {'<'} '2025-03-02'</code><br />
                  결과: <code style={{ color: '#22c55e' }}>type: range, rows: 3200</code> — 인덱스 범위 스캔으로 개선
                </div>
              </div>
            </div>
          </div>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#f59e0b' }}>Case 2: Using filesort 제거</span></div>
            <div className="qpo-step-list">
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>❌</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#ef4444' }}>문제:</strong> <code style={{ color: '#ef4444' }}>Extra: Using filesort</code> — 10만 행 정렬 발생<br />
                  <code style={{ color: '#94a3b8' }}>SELECT * FROM orders WHERE user_id = 100 ORDER BY created_at DESC LIMIT 20</code><br />
                  인덱스: <code style={{ color: '#94a3b8' }}>idx_user_id(user_id)</code>만 존재
                </div>
              </div>
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>🔍</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#f59e0b' }}>원인:</strong> user_id 인덱스로 행을 찾은 후, created_at으로 <strong style={{ color: '#f59e0b' }}>별도 정렬</strong>이 필요함. 인덱스에 정렬 컬럼이 없어서 filesort 발생
                </div>
              </div>
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>✅</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#22c55e' }}>해결:</strong> 복합 인덱스 생성 → <code style={{ color: '#22c55e' }}>CREATE INDEX idx_user_created ON orders(user_id, created_at DESC)</code><br />
                  결과: <code style={{ color: '#22c55e' }}>Extra: Using index condition</code> — filesort 제거, 인덱스 순서대로 20건만 읽기
                </div>
              </div>
            </div>
          </div>

          <div className="qpo-section-box" style={{ marginBottom: '20px' }}>
            <div className="qpo-section-subtitle"><span style={{ color: '#a855f7' }}>Case 3: 통계 부정확으로 인한 잘못된 계획</span></div>
            <div className="qpo-step-list">
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>❌</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#ef4444' }}>문제:</strong> EXPLAIN에서 <code style={{ color: '#ef4444' }}>rows: 50</code>으로 예상했지만 실제로는 <strong style={{ color: '#ef4444' }}>50,000행</strong>이 반환됨. 옵티마이저가 Nested Loop Join을 선택했지만 실제로는 Hash Join이 효율적인 상황
                </div>
              </div>
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>🔍</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#f59e0b' }}>원인:</strong> 대량 DELETE 후 통계가 갱신되지 않아 <strong style={{ color: '#f59e0b' }}>카디널리티가 부정확</strong>. InnoDB의 자동 통계 갱신 주기를 넘어선 상황
                </div>
              </div>
              <div className="qpo-step">
                <div className="qpo-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>✅</div>
                <div className="qpo-step-content">
                  <strong style={{ color: '#22c55e' }}>해결:</strong> <code style={{ color: '#22c55e' }}>ANALYZE TABLE orders</code>로 통계 갱신 → 옵티마이저가 정확한 행 수를 인지하여 <strong style={{ color: '#22c55e' }}>Hash Join</strong>으로 전환. 히스토그램 추가도 고려
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> 실행 계획 기반 최적화의 핵심 패턴 3가지: ①<strong>컬럼에 함수 적용 금지</strong> — WHERE 조건에서 <code style={{ color: '#06b6d4' }}>DATE(col)</code>, <code style={{ color: '#06b6d4' }}>LOWER(col)</code> 등을 사용하면 인덱스 무효화, ②<strong>복합 인덱스로 filesort 제거</strong> — WHERE + ORDER BY 컬럼을 하나의 인덱스에 포함, ③<strong>통계 갱신</strong> — 대량 데이터 변경 후 ANALYZE TABLE로 옵티마이저에게 정확한 정보 제공.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: 'CBO(Cost-Based Optimizer)란 무엇이고 어떻게 동작하나요?',
                a: 'CBO는 테이블/인덱스의 통계 정보(행 수, 카디널리티, 데이터 분포)를 기반으로 각 실행 계획의 비용(디스크 I/O, CPU, 메모리)을 산정하여 가장 저렴한 계획을 선택하는 옵티마이저입니다. 같은 SQL이라도 데이터 분포에 따라 Full Table Scan이 인덱스 스캔보다 효율적일 수 있으므로, 고정 규칙이 아닌 비용 기반으로 동적으로 판단합니다.',
              },
              {
                q: 'EXPLAIN 결과에서 가장 먼저 확인하는 것은 무엇인가요?',
                a: '①type 컬럼 — ALL이면 Full Table Scan이므로 인덱스 추가를 검토합니다. const → eq_ref → ref → range → index → ALL 순으로 성능이 나빠집니다. ②Extra 컬럼 — Using filesort(추가 정렬), Using temporary(임시 테이블)가 있으면 인덱스로 대체 가능한지 확인합니다. ③rows 컬럼 — 예상 스캔 행 수가 비정상적으로 크면 WHERE 조건이 인덱스를 타지 못하는 것입니다.',
              },
              {
                q: 'type 컬럼의 eq_ref와 ref의 차이점은?',
                a: 'eq_ref는 JOIN에서 PK 또는 UNIQUE 인덱스로 정확히 1행만 매칭되는 경우이고, ref는 Non-unique 인덱스로 여러 행이 매칭될 수 있는 경우입니다. 예를 들어 users.id(PK)로 조인하면 eq_ref, orders.user_id(일반 인덱스)로 조건을 걸면 ref입니다. eq_ref가 더 효율적이며, 조인 성능의 핵심은 내부 테이블의 접근이 eq_ref인지 확인하는 것입니다.',
              },
              {
                q: '통계 정보가 부정확하면 어떤 문제가 발생하나요?',
                a: 'CBO는 통계를 기반으로 비용을 산정하므로, 통계가 부정확하면 옵티마이저가 잘못된 실행 계획을 세웁니다. 예를 들어 실제 10만 행이 매칭되는데 통계상 100행으로 예측하면, Nested Loop Join을 선택하여 극도로 느려집니다. 대량 INSERT/DELETE 후에는 ANALYZE TABLE로 통계를 갱신해야 합니다. MySQL 8.0+에서는 히스토그램으로 데이터 편향도 반영할 수 있습니다.',
              },
              {
                q: '옵티마이저 힌트는 언제 사용하나요?',
                a: '힌트는 최후의 수단입니다. 먼저 ①인덱스 설계 점검, ②ANALYZE TABLE로 통계 갱신, ③쿼리 리팩토링을 시도합니다. 그래도 옵티마이저가 명백히 잘못된 계획을 고집할 때만 USE INDEX, FORCE INDEX 또는 MySQL 5.7+의 /+ INDEX() +/ 힌트를 사용합니다. 힌트를 남용하면 데이터 분포가 변할 때 오히려 성능이 저하되고, SQL 유지보수가 어려워집니다.',
              },
              {
                q: 'Using filesort가 나타날 때 어떻게 해결하나요?',
                a: 'ORDER BY에 사용되는 컬럼이 인덱스에 포함되어 있지 않으면 Using filesort가 발생합니다. 해결 방법은 WHERE 조건 컬럼과 ORDER BY 컬럼을 포함하는 복합 인덱스를 생성하는 것입니다. 예를 들어 WHERE user_id = ? ORDER BY created_at DESC이면 (user_id, created_at DESC) 복합 인덱스를 만들면 인덱스 순서대로 읽어 정렬 없이 결과를 반환할 수 있습니다.',
              },
              {
                q: '쿼리는 변경하지 않았는데 갑자기 느려졌습니다. 원인이 뭘까요?',
                a: '대표적 원인은 ①통계 정보 변화 — 대량 INSERT/DELETE 후 카디널리티가 변하면 옵티마이저가 다른 실행 계획을 선택할 수 있습니다. ANALYZE TABLE로 통계를 갱신합니다. ②버퍼 풀 상태 — 다른 무거운 쿼리가 버퍼 풀을 오염시켜 캐시 히트율이 떨어진 경우, ③Lock 경합 — 다른 트랜잭션의 장시간 Lock으로 대기 시간이 추가된 경우입니다. EXPLAIN ANALYZE로 예상 vs 실제 행 수를 비교하면 원인을 좁힐 수 있습니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

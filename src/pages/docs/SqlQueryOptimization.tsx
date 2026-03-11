import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.sqo-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.sqo-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.sqo-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.sqo-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.sqo-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.sqo-card-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.sqo-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.sqo-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.sqo-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.sqo-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.sqo-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.sqo-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.sqo-param:hover { transform:translateY(-3px); }
.sqo-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.sqo-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.sqo-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.sqo-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.sqo-table { width:100%; border-collapse:collapse; font-size:12px; }
.sqo-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.sqo-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.sqo-table tr:last-child td { border-bottom:none; }
.sqo-step-list { display:flex; flex-direction:column; gap:10px; }
.sqo-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.sqo-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.sqo-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.sqo-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .sqo-compare-grid{ grid-template-columns:1fr; } }
`

export default function SqlQueryOptimization() {
  useInjectCSS('style-sql-query-optimization', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="EXPLAIN · Access Type · Extra · Query Tuning · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>SQL 쿼리</span> 최적화</>}
          description="실행 계획(EXPLAIN)의 각 컬럼 심화 분석, 쿼리 튜닝 전략과 최적화를 위한 핵심 고려사항"
        />

        {/* ── 실행 계획 (EXPLAIN) ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>실행 계획 (EXPLAIN)</SectionTitle>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#06b6d4' }}>EXPLAIN이란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">🔍</span>
                <span><strong style={{ color: '#e2e8f0' }}>EXPLAIN</strong>은 쿼리 옵티마이저가 수립한 <strong style={{ color: '#06b6d4' }}>실행 계획(Execution Plan)</strong>을 확인하는 명령어입니다. 쿼리가 실제로 실행되기 전에 어떤 경로로 데이터를 조회할지 미리 볼 수 있습니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📊</span>
                <span>느린 쿼리의 원인을 분석하는 <strong style={{ color: '#e2e8f0' }}>첫 번째 단계</strong>입니다. 인덱스를 타는지, Full Table Scan인지, 어떤 조인 방식을 사용하는지를 파악할 수 있습니다.</span>
              </div>
            </div>
          </div>

          <CodeBlock title="MySQL EXPLAIN 기본 사용법" lang="sql">{
`EXPLAIN SELECT u.name, o.total_price
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE u.status = 'ACTIVE'
  AND o.created_at >= '2024-01-01';`
          }</CodeBlock>

          {/* EXPLAIN 출력 컬럼 요약 테이블 */}
          <div className="sqo-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#22c55e' }}>EXPLAIN 출력 컬럼 전체 요약 (MySQL)</span></div>
            <div className="sqo-table-wrap">
              <table className="sqo-table">
                <thead>
                  <tr>
                    <th>컬럼</th>
                    <th>설명</th>
                    <th>주의해야 할 값</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#06b6d4' }}>id</strong></td>
                    <td>쿼리 내 SELECT의 식별 번호</td>
                    <td>서브쿼리/UNION 시 번호 증가</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#3b82f6' }}>select_type</strong></td>
                    <td>SELECT의 종류</td>
                    <td><code style={{ color: '#f59e0b' }}>DEPENDENT SUBQUERY</code> = 성능 주의</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#a855f7' }}>table</strong></td>
                    <td>접근하는 테이블명</td>
                    <td>{'<'}derived N{'>'} = 파생 테이블</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#ef4444' }}>type</strong></td>
                    <td>접근 방식 (Access Type)</td>
                    <td><code style={{ color: '#ef4444' }}>ALL</code> = Full Table Scan</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#f59e0b' }}>possible_keys</strong></td>
                    <td>사용 가능한 인덱스 후보</td>
                    <td><code style={{ color: '#ef4444' }}>NULL</code> = 인덱스 후보 없음</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#22c55e' }}>key</strong></td>
                    <td>실제 사용된 인덱스</td>
                    <td><code style={{ color: '#ef4444' }}>NULL</code> = 인덱스 미사용</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#06b6d4' }}>key_len</strong></td>
                    <td>사용된 인덱스 길이 (바이트)</td>
                    <td>복합 인덱스에서 몇 컬럼까지 활용했는지 판단</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#3b82f6' }}>ref</strong></td>
                    <td>인덱스 비교에 사용된 컬럼/상수</td>
                    <td><code style={{ color: '#22c55e' }}>const</code> = 상수 비교 (효율적)</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#a855f7' }}>rows</strong></td>
                    <td>스캔 예상 행 수</td>
                    <td>전체 행 수에 가까울수록 비효율</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#f59e0b' }}>filtered</strong></td>
                    <td>조건 필터링 후 남은 비율(%)</td>
                    <td>낮을수록 많은 행을 버리고 있음</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#ef4444' }}>Extra</strong></td>
                    <td>추가 실행 정보</td>
                    <td><code style={{ color: '#ef4444' }}>Using filesort</code>, <code style={{ color: '#ef4444' }}>Using temporary</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> EXPLAIN 결과를 볼 때는 <strong>type → key → rows → Extra</strong> 순서로 확인하는 습관을 들이세요. type이 ALL인지, key가 NULL인지, rows가 과도하게 큰지, Extra에 filesort/temporary가 있는지가 핵심 체크 포인트입니다.
          </HighlightBox>
        </div>

        {/* ── type (Access Type) 심화 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#06b6d4']}>type — 접근 방식 (Access Type)</SectionTitle>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#3b82f6' }}>type 컬럼이 중요한 이유</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">🎯</span>
                <span><strong style={{ color: '#e2e8f0' }}>type</strong>은 옵티마이저가 테이블에 어떤 방식으로 접근하는지를 나타냅니다. 쿼리 성능의 <strong style={{ color: '#06b6d4' }}>가장 핵심적인 지표</strong>이며, 이 값 하나로 인덱스 활용 여부와 스캔 범위를 즉시 판단할 수 있습니다.</span>
              </div>
            </div>
          </div>

          {/* Access Type 성능 순서 다이어그램 */}
          <DiagramContainer title="Access Type 성능 순서 (좋음 → 나쁨)">
            <DiagramFlow>
              <DiagramNode icon="🏆" label="const / system" sub="PK or UNIQUE 단일 행" color="#22c55e" />
              <DiagramArrow label="" color="#22c55e" animated />
              <DiagramNode icon="🔑" label="eq_ref" sub="조인 시 PK/UNIQUE 매칭" color="#06b6d4" />
              <DiagramArrow label="" color="#06b6d4" animated />
              <DiagramNode icon="📋" label="ref" sub="일반 인덱스 매칭" color="#3b82f6" />
              <DiagramArrow label="" color="#3b82f6" animated />
              <DiagramNode icon="📄" label="range" sub="인덱스 범위 스캔" color="#f59e0b" />
              <DiagramArrow label="" color="#f59e0b" animated />
              <DiagramNode icon="📑" label="index" sub="인덱스 풀 스캔" color="#ef4444" />
              <DiagramArrow label="" color="#ef4444" animated />
              <DiagramNode icon="🚨" label="ALL" sub="테이블 풀 스캔" color="#ef4444" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="sqo-param-grid" style={{ marginTop: '20px' }}>
            <div className="sqo-param">
              <div className="sqo-param-name" style={{ color: '#22c55e' }}>const / system</div>
              <div className="sqo-param-desc">
                PK 또는 UNIQUE 인덱스로 <strong style={{ color: '#e2e8f0' }}>단 하나의 행</strong>만 읽습니다. 옵티마이저가 상수로 치환하여 최고의 성능을 보입니다.
              </div>
              <div className="sqo-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>WHERE id = 1</div>
            </div>
            <div className="sqo-param">
              <div className="sqo-param-name" style={{ color: '#06b6d4' }}>eq_ref</div>
              <div className="sqo-param-desc">
                조인 시 내부 테이블의 PK/UNIQUE로 <strong style={{ color: '#e2e8f0' }}>정확히 1건</strong>을 매칭합니다. 1:1 또는 N:1 조인의 이상적인 접근 방식입니다.
              </div>
              <div className="sqo-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>JOIN ON a.id = b.pk_col</div>
            </div>
            <div className="sqo-param">
              <div className="sqo-param-name" style={{ color: '#3b82f6' }}>ref</div>
              <div className="sqo-param-desc">
                PK가 아닌 <strong style={{ color: '#e2e8f0' }}>일반 인덱스</strong>의 동등 조건(=)으로 여러 행을 매칭합니다. 대부분의 WHERE 조건에서 이 수준이면 양호합니다.
              </div>
              <div className="sqo-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>WHERE status = 'ACTIVE'</div>
            </div>
            <div className="sqo-param">
              <div className="sqo-param-name" style={{ color: '#a855f7' }}>ref_or_null</div>
              <div className="sqo-param-desc">
                ref와 동일하지만 <strong style={{ color: '#e2e8f0' }}>NULL 조건</strong>도 함께 검색합니다. <code style={{ color: '#a855f7' }}>WHERE col = 'x' OR col IS NULL</code>에서 발생합니다.
              </div>
              <div className="sqo-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>= 값 + IS NULL</div>
            </div>
            <div className="sqo-param">
              <div className="sqo-param-name" style={{ color: '#f59e0b' }}>range</div>
              <div className="sqo-param-desc">
                인덱스의 <strong style={{ color: '#e2e8f0' }}>특정 범위</strong>만 스캔합니다. BETWEEN, {'<'}, {'>'}, IN, LIKE 'prefix%' 등의 범위 조건에서 발생합니다.
              </div>
              <div className="sqo-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>WHERE age BETWEEN 20 AND 30</div>
            </div>
            <div className="sqo-param">
              <div className="sqo-param-name" style={{ color: '#ef4444' }}>index</div>
              <div className="sqo-param-desc">
                인덱스 <strong style={{ color: '#ef4444' }}>전체를 스캔</strong>합니다(Index Full Scan). ALL보다는 낫지만, 인덱스 전체를 읽으므로 대량 데이터에서 비효율적입니다.
              </div>
              <div className="sqo-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>인덱스 전체 스캔</div>
            </div>
            <div className="sqo-param">
              <div className="sqo-param-name" style={{ color: '#ef4444' }}>ALL</div>
              <div className="sqo-param-desc">
                테이블의 <strong style={{ color: '#ef4444' }}>모든 행을 처음부터 끝까지</strong> 읽습니다(Full Table Scan). 인덱스를 전혀 사용하지 못한 상태로, 대량 테이블에서 반드시 개선이 필요합니다.
              </div>
              <div className="sqo-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>Full Table Scan</div>
            </div>
          </div>

          <CodeBlock title="type별 실제 쿼리 예시" lang="sql">{
`-- const: PK로 단일 행 조회
EXPLAIN SELECT * FROM users WHERE id = 1;

-- eq_ref: 조인 시 PK 매칭
EXPLAIN SELECT * FROM orders o JOIN users u ON o.user_id = u.id;

-- ref: 일반 인덱스 동등 조건 (idx_status 인덱스 존재)
EXPLAIN SELECT * FROM users WHERE status = 'ACTIVE';

-- range: 인덱스 범위 스캔
EXPLAIN SELECT * FROM orders WHERE created_at >= '2024-01-01';

-- ALL: 인덱스 없는 컬럼 조건 → Full Table Scan
EXPLAIN SELECT * FROM users WHERE nickname = 'park';`
          }</CodeBlock>

          <HighlightBox color="#3b82f6">
            <strong>면접 포인트:</strong> 최소한 <strong>range 이상</strong>을 목표로 해야 합니다. <strong>ALL이 보이면 즉시 인덱스 추가를 검토</strong>하고, <strong>index(인덱스 풀 스캔)</strong>도 대량 데이터에서는 주의가 필요합니다. eq_ref는 조인 성능의 이상적인 상태이며, const는 PK 조회에서만 나타납니다.
          </HighlightBox>
        </div>

        {/* ── select_type 심화 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>select_type — SELECT 종류</SectionTitle>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#a855f7' }}>select_type이 알려주는 것</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📑</span>
                <span>현재 행이 <strong style={{ color: '#e2e8f0' }}>어떤 종류의 SELECT</strong>에 해당하는지 표시합니다. 서브쿼리, UNION 등 복잡한 쿼리에서 각 부분의 역할을 파악할 때 중요합니다.</span>
              </div>
            </div>
          </div>

          <div className="sqo-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="sqo-table">
              <thead>
                <tr>
                  <th>select_type</th>
                  <th>설명</th>
                  <th>성능 영향</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#22c55e' }}>SIMPLE</strong></td>
                  <td>서브쿼리나 UNION 없는 단순 SELECT</td>
                  <td>가장 기본적인 형태</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>PRIMARY</strong></td>
                  <td>가장 바깥쪽 SELECT (서브쿼리 포함 시)</td>
                  <td>메인 쿼리 역할</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>SUBQUERY</strong></td>
                  <td>WHERE절 등의 비상관 서브쿼리</td>
                  <td><strong style={{ color: '#22c55e' }}>한 번만 실행</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#ef4444' }}>DEPENDENT SUBQUERY</strong></td>
                  <td>외부 쿼리에 의존하는 상관 서브쿼리</td>
                  <td><strong style={{ color: '#ef4444' }}>외부 행마다 반복 실행 — 매우 주의</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#a855f7' }}>DERIVED</strong></td>
                  <td>FROM절의 서브쿼리 (파생 테이블)</td>
                  <td>임시 테이블 생성 가능</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f59e0b' }}>UNION</strong></td>
                  <td>UNION의 두 번째 이후 SELECT</td>
                  <td>결과 병합 비용 발생</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>MATERIALIZED</strong></td>
                  <td>서브쿼리 결과를 임시 테이블에 저장</td>
                  <td>반복 실행 방지 (MySQL 5.6+)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock title="DEPENDENT SUBQUERY — 성능 주의 예시" lang="sql">{
`-- DEPENDENT SUBQUERY: 외부 행마다 서브쿼리 반복 실행
EXPLAIN
SELECT u.name,
       (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count
FROM users u;
-- select_type: PRIMARY (users) + DEPENDENT SUBQUERY (orders)
-- users가 1000행이면 orders 서브쿼리도 1000번 실행

-- 개선: JOIN으로 변환하여 한 번에 처리
EXPLAIN
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name;
-- select_type: SIMPLE (한 번에 처리)`
          }</CodeBlock>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> <strong>DEPENDENT SUBQUERY</strong>는 가장 주의해야 할 select_type입니다. 외부 행마다 서브쿼리가 반복 실행되므로, 외부 테이블이 커질수록 기하급수적으로 느려집니다. 대부분 <strong>JOIN으로 전환</strong>하여 해결할 수 있습니다.
          </HighlightBox>
        </div>

        {/* ── Extra 컬럼 심화 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>Extra — 추가 실행 정보</SectionTitle>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#ef4444' }}>Extra 컬럼이 중요한 이유</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">⚙️</span>
                <span><strong style={{ color: '#e2e8f0' }}>Extra</strong>는 옵티마이저의 <strong style={{ color: '#06b6d4' }}>추가적인 동작</strong>을 알려줍니다. type과 key만으로는 알 수 없는 정렬, 임시 테이블, 인덱스 컨디션 푸시다운 등의 정보가 담겨 있어 <strong style={{ color: '#e2e8f0' }}>최적화의 핵심 단서</strong>를 제공합니다.</span>
              </div>
            </div>
          </div>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#22c55e' }}>긍정적인 Extra 값</span></div>
            <div className="sqo-param-grid">
              <div className="sqo-param">
                <div className="sqo-param-name" style={{ color: '#22c55e' }}>Using index</div>
                <div className="sqo-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>커버링 인덱스</strong>로 동작합니다. 테이블 데이터에 접근하지 않고 인덱스만으로 결과를 반환하여 디스크 I/O가 최소화됩니다.
                </div>
                <div className="sqo-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>최고의 상태</div>
              </div>
              <div className="sqo-param">
                <div className="sqo-param-name" style={{ color: '#06b6d4' }}>Using where</div>
                <div className="sqo-param-desc">
                  스토리지 엔진에서 읽은 후 <strong style={{ color: '#e2e8f0' }}>MySQL 엔진에서 추가 필터링</strong>을 수행합니다. 일반적인 동작이며, 단독으로는 문제가 되지 않습니다.
                </div>
                <div className="sqo-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>일반적</div>
              </div>
              <div className="sqo-param">
                <div className="sqo-param-name" style={{ color: '#3b82f6' }}>Using index condition</div>
                <div className="sqo-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>ICP(Index Condition Pushdown)</strong>으로 인덱스 수준에서 조건을 먼저 평가하여 불필요한 테이블 접근을 줄입니다.
                </div>
                <div className="sqo-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>MySQL 5.6+</div>
              </div>
            </div>
          </div>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#ef4444' }}>주의해야 할 Extra 값</span></div>
            <div className="sqo-param-grid">
              <div className="sqo-param">
                <div className="sqo-param-name" style={{ color: '#ef4444' }}>Using filesort</div>
                <div className="sqo-param-desc">
                  인덱스 순서로 정렬할 수 없어 <strong style={{ color: '#ef4444' }}>별도의 정렬 작업</strong>이 필요합니다. 메모리(sort_buffer) 또는 디스크를 사용하며, 대량 데이터에서 큰 병목이 됩니다.
                </div>
                <div className="sqo-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>ORDER BY 최적화 필요</div>
              </div>
              <div className="sqo-param">
                <div className="sqo-param-name" style={{ color: '#ef4444' }}>Using temporary</div>
                <div className="sqo-param-desc">
                  중간 결과를 저장하기 위해 <strong style={{ color: '#ef4444' }}>임시 테이블</strong>을 생성합니다. GROUP BY, DISTINCT, UNION 등에서 발생하며, 메모리 초과 시 디스크에 기록됩니다.
                </div>
                <div className="sqo-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>GROUP BY / DISTINCT 최적화 필요</div>
              </div>
              <div className="sqo-param">
                <div className="sqo-param-name" style={{ color: '#f59e0b' }}>Using join buffer</div>
                <div className="sqo-param-desc">
                  조인 시 내부 테이블에 적절한 인덱스가 없어 <strong style={{ color: '#f59e0b' }}>Block Nested Loop</strong> 방식을 사용합니다. 조인 컬럼에 인덱스 추가를 검토해야 합니다.
                </div>
                <div className="sqo-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>조인 인덱스 부재</div>
              </div>
            </div>
          </div>

          <CodeBlock title="Using filesort 해결 — ORDER BY 인덱스 활용" lang="sql">{
`-- BAD: Using filesort 발생 (created_at에 인덱스 없거나 활용 불가)
EXPLAIN SELECT * FROM orders WHERE status = 'COMPLETED'
ORDER BY created_at DESC;
-- Extra: Using filesort

-- GOOD: 복합 인덱스 (status, created_at)으로 정렬까지 인덱스 활용
-- CREATE INDEX idx_status_created ON orders(status, created_at);
EXPLAIN SELECT * FROM orders WHERE status = 'COMPLETED'
ORDER BY created_at DESC;
-- Extra: Using where (filesort 제거됨)

-- BAD: Using temporary + Using filesort (GROUP BY 순서와 인덱스 불일치)
EXPLAIN SELECT status, COUNT(*) FROM orders GROUP BY status;

-- GOOD: 인덱스와 GROUP BY 순서를 맞추면 임시 테이블 제거 가능`
          }</CodeBlock>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> Extra에 <strong>Using filesort</strong>가 나오면 ORDER BY 컬럼이 인덱스에 포함되어 있는지 확인하세요. <strong>Using temporary</strong>는 GROUP BY나 DISTINCT에서 인덱스를 활용하지 못할 때 발생합니다. 두 가지가 동시에 나오면 <strong>복합 인덱스 재설계</strong>가 필요합니다.
          </HighlightBox>
        </div>

        {/* ── key_len & rows & filtered 심화 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>key_len · rows · filtered 분석</SectionTitle>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#22c55e' }}>key_len — 복합 인덱스 활용도 판단</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📏</span>
                <span><strong style={{ color: '#e2e8f0' }}>key_len</strong>은 사용된 인덱스의 바이트 길이입니다. 복합 인덱스에서 <strong style={{ color: '#06b6d4' }}>몇 번째 컬럼까지 실제로 활용했는지</strong>를 판단하는 핵심 수단입니다.</span>
              </div>
            </div>
          </div>

          <div className="sqo-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="sqo-table">
              <thead>
                <tr>
                  <th>데이터 타입</th>
                  <th>바이트 수</th>
                  <th>NULL 허용 시</th>
                  <th>예시</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>INT</strong></td>
                  <td>4 bytes</td>
                  <td>+ 1 byte</td>
                  <td>NOT NULL INT = 4, NULL INT = 5</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>BIGINT</strong></td>
                  <td>8 bytes</td>
                  <td>+ 1 byte</td>
                  <td>NOT NULL BIGINT = 8</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#a855f7' }}>VARCHAR(N)</strong></td>
                  <td>N * 문자셋 + 2</td>
                  <td>+ 1 byte</td>
                  <td>VARCHAR(50) utf8mb4 = 50*4+2 = 202</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#22c55e' }}>DATE</strong></td>
                  <td>3 bytes</td>
                  <td>+ 1 byte</td>
                  <td>NOT NULL DATE = 3</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f59e0b' }}>DATETIME</strong></td>
                  <td>5 bytes (MySQL 5.6+)</td>
                  <td>+ 1 byte</td>
                  <td>NOT NULL DATETIME = 5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock title="key_len으로 복합 인덱스 활용도 분석" lang="sql">{
`-- 복합 인덱스: (status VARCHAR(20), created_at DATETIME) — 둘 다 NOT NULL
-- 예상 key_len: status(20*4+2=82) + created_at(5) = 87

-- 첫 번째 컬럼만 활용: key_len = 82
EXPLAIN SELECT * FROM orders WHERE status = 'COMPLETED';

-- 두 컬럼 모두 활용: key_len = 87
EXPLAIN SELECT * FROM orders
WHERE status = 'COMPLETED' AND created_at >= '2024-01-01';

-- key_len이 87이면 인덱스의 두 컬럼 모두 활용된 것
-- key_len이 82이면 status만 활용, created_at은 미활용`
          }</CodeBlock>

          <div className="sqo-compare-grid" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="sqo-section-box">
              <div className="sqo-section-subtitle"><span style={{ color: '#a855f7' }}>rows — 예상 스캔 행 수</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="sqo-feature-row">
                  <span className="sqo-feature-icon">📊</span>
                  <span>옵티마이저가 <strong style={{ color: '#e2e8f0' }}>스캔할 것으로 예상하는 행 수</strong>입니다. 통계(statistics) 기반의 <strong style={{ color: '#f59e0b' }}>추정치</strong>이므로 실제와 다를 수 있습니다.</span>
                </div>
                <div className="sqo-feature-row">
                  <span className="sqo-feature-icon">⚠️</span>
                  <span>테이블 전체 행 수에 가까우면 인덱스가 제대로 활용되지 않는 것입니다.</span>
                </div>
                <div className="sqo-feature-row">
                  <span className="sqo-feature-icon">💡</span>
                  <span>조인 시 <strong style={{ color: '#e2e8f0' }}>rows의 곱</strong>이 전체 비용을 좌우합니다. (rows1 × rows2 × ...)</span>
                </div>
              </div>
            </div>
            <div className="sqo-section-box">
              <div className="sqo-section-subtitle"><span style={{ color: '#f59e0b' }}>filtered — 필터링 비율</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="sqo-feature-row">
                  <span className="sqo-feature-icon">🔽</span>
                  <span>rows에서 <strong style={{ color: '#e2e8f0' }}>WHERE 조건으로 걸러진 후 남는 비율(%)</strong>입니다. 100%면 모든 행이 조건을 만족한다는 의미입니다.</span>
                </div>
                <div className="sqo-feature-row">
                  <span className="sqo-feature-icon">⚠️</span>
                  <span>filtered가 매우 낮으면(예: 1%) 많은 행을 읽고 대부분 버리고 있다는 뜻 → <strong style={{ color: '#ef4444' }}>인덱스 개선 필요</strong></span>
                </div>
                <div className="sqo-feature-row">
                  <span className="sqo-feature-icon">📐</span>
                  <span><strong style={{ color: '#e2e8f0' }}>실제 결과 행 수 ≈ rows × filtered / 100</strong></span>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock title="rows × filtered 분석 예시" lang="sql">{
`-- rows=10000, filtered=10.00 → 실제 결과 약 1000행
-- 10000행을 읽고 9000행을 버림 → 인덱스 개선 여지 있음
EXPLAIN SELECT * FROM orders
WHERE status = 'ACTIVE' AND total_price > 50000;

-- 개선: (status, total_price) 복합 인덱스 추가
-- rows=1200, filtered=100.00 → 인덱스가 모든 조건을 커버
-- 1200행만 정확히 읽음 → 효율적`
          }</CodeBlock>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> <strong>rows</strong>는 추정치이므로 EXPLAIN ANALYZE(PostgreSQL) 또는 쿼리 실행 후 실제 행 수와 비교해야 합니다. 통계가 오래되면 rows가 부정확해져 옵티마이저가 <strong>잘못된 실행 계획</strong>을 선택할 수 있으므로, <code style={{ color: '#06b6d4' }}>ANALYZE TABLE</code>(MySQL) / <code style={{ color: '#06b6d4' }}>ANALYZE</code>(PostgreSQL)로 통계를 최신 상태로 유지해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 쿼리 튜닝 전략 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#a855f7']}>쿼리 튜닝 전략</SectionTitle>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#f59e0b' }}>인덱스를 타지 않는 대표적 패턴</span></div>
            <div className="sqo-step-list">
              <div className="sqo-step">
                <div className="sqo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>1</div>
                <div className="sqo-step-content">
                  <strong style={{ color: '#ef4444' }}>인덱스 컬럼에 함수/연산 적용</strong><br />
                  <code style={{ color: '#ef4444' }}>WHERE YEAR(created_at) = 2024</code> → 인덱스를 탈 수 없음<br />
                  <code style={{ color: '#22c55e' }}>WHERE created_at {'>'}= '2024-01-01' AND created_at {'<'} '2025-01-01'</code> → 인덱스 범위 스캔 가능
                </div>
              </div>
              <div className="sqo-step">
                <div className="sqo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>2</div>
                <div className="sqo-step-content">
                  <strong style={{ color: '#ef4444' }}>암묵적 타입 변환</strong><br />
                  <code style={{ color: '#ef4444' }}>WHERE phone = 01012345678</code> (VARCHAR 컬럼에 숫자 비교) → 전체 행 변환 발생<br />
                  <code style={{ color: '#22c55e' }}>WHERE phone = '01012345678'</code> → 정상적으로 인덱스 사용
                </div>
              </div>
              <div className="sqo-step">
                <div className="sqo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>3</div>
                <div className="sqo-step-content">
                  <strong style={{ color: '#ef4444' }}>LIKE '%keyword%' (앞쪽 와일드카드)</strong><br />
                  <code style={{ color: '#ef4444' }}>WHERE name LIKE '%park%'</code> → 인덱스 사용 불가 (앞쪽이 불확정)<br />
                  <code style={{ color: '#22c55e' }}>WHERE name LIKE 'park%'</code> → 인덱스 범위 스캔 가능
                </div>
              </div>
              <div className="sqo-step">
                <div className="sqo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>4</div>
                <div className="sqo-step-content">
                  <strong style={{ color: '#ef4444' }}>복합 인덱스 선두 컬럼 누락</strong><br />
                  인덱스가 <code style={{ color: '#06b6d4' }}>(status, created_at)</code>인데 <code style={{ color: '#ef4444' }}>WHERE created_at = ...</code>만 사용 → 인덱스 미사용<br />
                  반드시 <strong style={{ color: '#e2e8f0' }}>선두 컬럼(status)</strong>이 조건에 포함되어야 함
                </div>
              </div>
              <div className="sqo-step">
                <div className="sqo-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>5</div>
                <div className="sqo-step-content">
                  <strong style={{ color: '#ef4444' }}>OR 조건의 비효율</strong><br />
                  <code style={{ color: '#ef4444' }}>WHERE status = 'A' OR name = 'park'</code> → 각각 다른 인덱스여서 풀스캔 가능<br />
                  <code style={{ color: '#22c55e' }}>UNION ALL</code>로 분리하거나 복합 인덱스 설계 필요
                </div>
              </div>
            </div>
          </div>

          <CodeBlock title="Bad vs Good — 인덱스 활용 비교" lang="sql">{
`-- BAD: 인덱스 컬럼에 함수 적용
SELECT * FROM orders
WHERE DATE_FORMAT(created_at, '%Y-%m') = '2024-03';

-- GOOD: 범위 조건으로 변환
SELECT * FROM orders
WHERE created_at >= '2024-03-01'
  AND created_at < '2024-04-01';

-- BAD: 불필요한 SELECT *
SELECT * FROM users WHERE status = 'ACTIVE';

-- GOOD: 필요한 컬럼만 조회 (커버링 인덱스 가능)
SELECT id, name, email FROM users WHERE status = 'ACTIVE';`
          }</CodeBlock>

          <div className="sqo-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#a855f7' }}>커버링 인덱스 (Covering Index)</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">⚡</span>
                <span><strong style={{ color: '#e2e8f0' }}>커버링 인덱스</strong>란 쿼리에 필요한 모든 컬럼이 인덱스에 포함되어, 테이블 데이터에 접근하지 않고 <strong style={{ color: '#06b6d4' }}>인덱스만으로 결과를 반환</strong>하는 것입니다. EXPLAIN의 Extra에 <code style={{ color: '#22c55e' }}>Using index</code>로 표시됩니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">💡</span>
                <span>디스크 I/O가 대폭 줄어들어 성능이 크게 향상됩니다. 자주 사용하는 조회 쿼리에 맞춰 인덱스를 설계하면 효과적입니다.</span>
              </div>
            </div>
          </div>

          <CodeBlock title="커버링 인덱스 예시" lang="sql">{
`-- 인덱스: CREATE INDEX idx_users_status_name ON users(status, name, email);

-- 커버링 인덱스로 동작 (인덱스만 읽음 → Using index)
SELECT name, email FROM users WHERE status = 'ACTIVE';

-- 커버링 인덱스 불가 (address가 인덱스에 없어 테이블 접근 필요)
SELECT name, email, address FROM users WHERE status = 'ACTIVE';`
          }</CodeBlock>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> "쿼리가 느립니다. 어떻게 최적화하나요?"라는 질문에는 <strong>①EXPLAIN으로 실행 계획 확인</strong> → <strong>②type이 ALL이면 인덱스 추가</strong> → <strong>③인덱스를 안 타는 패턴 수정</strong> → <strong>④Extra의 filesort/temporary 제거</strong> → <strong>⑤커버링 인덱스 고려</strong> 순서로 체계적으로 답변하면 좋습니다.
          </HighlightBox>
        </div>

        {/* ── 최적화를 위한 고려사항 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>최적화를 위한 고려사항</SectionTitle>

          <div className="sqo-section-box" style={{ marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#06b6d4' }}>1. 인덱스 설계 전략</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">🎯</span>
                <span><strong style={{ color: '#e2e8f0' }}>선택도(Selectivity)</strong>가 높은 컬럼을 인덱스 선두에 배치하세요. 선택도 = 고유값 수 / 전체 행 수. 예: email(높음) vs gender(낮음). 단, 실제 쿼리 패턴이 우선입니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📐</span>
                <span><strong style={{ color: '#e2e8f0' }}>복합 인덱스 컬럼 순서</strong>: 동등 조건(=) 컬럼 → 범위 조건({'>'}, {'<'}, BETWEEN) 컬럼 → 정렬(ORDER BY) 컬럼 순서로 구성하면 인덱스 활용을 극대화할 수 있습니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">⚠️</span>
                <span><strong style={{ color: '#ef4444' }}>인덱스는 공짜가 아닙니다.</strong> 인덱스가 많으면 INSERT/UPDATE/DELETE 시 인덱스 갱신 비용이 증가합니다. <strong style={{ color: '#e2e8f0' }}>읽기와 쓰기의 비율</strong>을 고려하여 적절한 수의 인덱스를 유지하세요.</span>
              </div>
            </div>
          </div>

          <CodeBlock title="복합 인덱스 설계 — 동등 → 범위 → 정렬" lang="sql">{
`-- 자주 실행되는 쿼리:
SELECT id, name FROM orders
WHERE status = 'COMPLETED'          -- 동등 조건 (=)
  AND created_at >= '2024-01-01'    -- 범위 조건 (>=)
ORDER BY total_price DESC;          -- 정렬

-- 최적 인덱스 순서: 동등 → 범위 → 정렬
CREATE INDEX idx_orders_opt ON orders(status, created_at, total_price);

-- 비효율 인덱스 순서 (범위가 먼저 → 이후 컬럼 인덱스 활용 불가)
CREATE INDEX idx_orders_bad ON orders(created_at, status, total_price);`
          }</CodeBlock>

          <div className="sqo-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#3b82f6' }}>2. 옵티마이저 판단과 통계</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">🧠</span>
                <span>옵티마이저는 <strong style={{ color: '#e2e8f0' }}>테이블 통계(statistics)</strong>를 기반으로 실행 계획을 수립합니다. 통계가 오래되면 rows 추정이 부정확해져 <strong style={{ color: '#ef4444' }}>잘못된 실행 계획</strong>(예: 인덱스 대신 풀스캔 선택)이 선택될 수 있습니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📊</span>
                <span><strong style={{ color: '#e2e8f0' }}>카디널리티(Cardinality)</strong>는 인덱스에서 고유한 값의 수입니다. 카디널리티가 높을수록 옵티마이저가 인덱스를 선택할 가능성이 높습니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">🔄</span>
                <span>대량 데이터 변경(벌크 INSERT, 대규모 DELETE) 후에는 <strong style={{ color: '#06b6d4' }}>통계 갱신</strong>을 수행하여 옵티마이저가 정확한 판단을 할 수 있도록 해야 합니다.</span>
              </div>
            </div>
          </div>

          <CodeBlock title="통계 갱신 및 확인" lang="sql">{
`-- MySQL: 테이블 통계 갱신
ANALYZE TABLE orders;

-- MySQL: 인덱스 카디널리티 확인
SHOW INDEX FROM orders;
-- Cardinality가 전체 행 수에 가까울수록 선택도가 높은 인덱스

-- PostgreSQL: 통계 갱신
ANALYZE orders;

-- PostgreSQL: 테이블 통계 확인
SELECT relname, n_live_tup, last_analyze, last_autoanalyze
FROM pg_stat_user_tables WHERE relname = 'orders';`
          }</CodeBlock>

          <div className="sqo-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#a855f7' }}>3. 조인 순서와 드라이빙 테이블</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">🔗</span>
                <span>옵티마이저는 조인 시 <strong style={{ color: '#e2e8f0' }}>드라이빙 테이블(Driving Table)</strong>을 먼저 스캔하고, 결과를 기준으로 내부 테이블을 탐색합니다. <strong style={{ color: '#06b6d4' }}>결과 행이 적은 테이블</strong>이 드라이빙 테이블이 되어야 효율적입니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">⚠️</span>
                <span>내부 테이블(조인 대상)의 <strong style={{ color: '#e2e8f0' }}>조인 컬럼에 인덱스</strong>가 있어야 eq_ref 또는 ref로 효율적으로 접근합니다. 인덱스가 없으면 <strong style={{ color: '#ef4444' }}>Using join buffer</strong>가 발생합니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">💡</span>
                <span>EXPLAIN 결과에서 <strong style={{ color: '#e2e8f0' }}>첫 번째 행</strong>이 드라이빙 테이블입니다. rows 값이 작은 테이블이 먼저 나오는지 확인하세요.</span>
              </div>
            </div>
          </div>

          <DiagramContainer title="드라이빙 테이블 선택에 따른 성능 차이">
            <DiagramFlow>
              <DiagramGroup label="효율적 (작은 테이블이 드라이빙)" color="#22c55e">
                <DiagramNode icon="👤" label="users (100행)" sub="WHERE status = 'VIP'" color="#22c55e" />
                <DiagramNode icon="📦" label="orders (100만행)" sub="eq_ref: PK로 정확히 매칭" color="#06b6d4" />
              </DiagramGroup>
              <DiagramArrow label="vs" color="#64748b" animated={false} />
              <DiagramGroup label="비효율적 (큰 테이블이 드라이빙)" color="#ef4444">
                <DiagramNode icon="📦" label="orders (100만행)" sub="전체 스캔 후" color="#ef4444" />
                <DiagramNode icon="👤" label="users (100행)" sub="100만번 탐색" color="#ef4444" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <div className="sqo-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#22c55e' }}>4. SELECT와 정렬 최적화</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📋</span>
                <span><strong style={{ color: '#e2e8f0' }}>SELECT *를 지양</strong>하세요. 필요한 컬럼만 조회하면 ①네트워크 전송량 감소, ②커버링 인덱스 가능성 증가, ③임시 테이블/정렬 시 메모리 사용 감소 효과가 있습니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📊</span>
                <span><strong style={{ color: '#e2e8f0' }}>ORDER BY</strong>가 인덱스 순서와 일치하면 filesort 없이 정렬됩니다. 복합 인덱스의 마지막 컬럼을 정렬에 활용하는 설계가 이상적입니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">⚠️</span>
                <span><strong style={{ color: '#e2e8f0' }}>GROUP BY</strong>도 인덱스 순서와 일치시키면 임시 테이블 없이 처리 가능합니다. GROUP BY와 ORDER BY 컬럼이 다르면 두 번의 정렬이 발생할 수 있습니다.</span>
              </div>
            </div>
          </div>

          <div className="sqo-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="sqo-section-subtitle"><span style={{ color: '#ef4444' }}>5. 슬로우 쿼리 모니터링</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">🕐</span>
                <span><strong style={{ color: '#e2e8f0' }}>슬로우 쿼리 로그</strong>를 활성화하여 실행 시간이 기준치를 초과하는 쿼리를 자동으로 기록하세요. 운영 환경에서 실제 병목이 되는 쿼리를 찾는 가장 효과적인 방법입니다.</span>
              </div>
              <div className="sqo-feature-row">
                <span className="sqo-feature-icon">📈</span>
                <span>MySQL의 <strong style={{ color: '#06b6d4' }}>Performance Schema</strong>, PostgreSQL의 <strong style={{ color: '#06b6d4' }}>pg_stat_statements</strong>를 활용하면 빈번하게 실행되는 쿼리와 평균 실행 시간을 모니터링할 수 있습니다.</span>
              </div>
            </div>
          </div>

          <CodeBlock title="슬로우 쿼리 로그 설정 (MySQL)" lang="sql">{
`-- 슬로우 쿼리 로그 활성화
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- 1초 이상 걸리는 쿼리 기록

-- 인덱스를 사용하지 않는 쿼리도 기록
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- PostgreSQL: pg_stat_statements로 상위 느린 쿼리 조회
SELECT query, calls, mean_exec_time, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;`
          }</CodeBlock>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> 쿼리 최적화는 단순히 인덱스를 추가하는 것이 아닙니다. <strong>①슬로우 쿼리 로그로 병목 발견</strong> → <strong>②EXPLAIN으로 원인 분석</strong> → <strong>③인덱스 설계 또는 쿼리 수정</strong> → <strong>④통계 갱신으로 옵티마이저 판단 개선</strong>의 체계적인 프로세스를 설명하면 실무 경험을 어필할 수 있습니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#22c55e']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: 'EXPLAIN 실행 계획에서 어떤 항목을 중점적으로 확인하나요?',
                a: '가장 먼저 type(접근 방식)을 확인합니다. ALL이면 Full Table Scan으로 인덱스 추가가 필요합니다. key 컬럼으로 실제 사용된 인덱스를, key_len으로 복합 인덱스에서 몇 컬럼까지 활용했는지 확인합니다. rows로 예상 스캔 행 수를, filtered로 필터링 효율을 봅니다. Extra의 Using filesort(정렬 병목)나 Using temporary(임시 테이블)가 나오면 인덱스 재설계를 검토합니다.',
              },
              {
                q: 'EXPLAIN의 type에서 ref와 eq_ref의 차이는 무엇인가요?',
                a: 'eq_ref는 조인 시 내부 테이블의 PK 또는 UNIQUE 인덱스로 정확히 1건만 매칭되는 최적의 조인 방식입니다. ref는 PK가 아닌 일반 인덱스의 동등 조건(=)으로 여러 행이 매칭될 수 있는 방식입니다. 예를 들어 orders.user_id에 일반 인덱스가 있으면 ref, users.id(PK)로 조인하면 eq_ref가 됩니다.',
              },
              {
                q: 'Extra에 Using filesort가 나옵니다. 어떻게 해결하나요?',
                a: 'Using filesort는 ORDER BY 컬럼이 인덱스 순서와 일치하지 않아 별도의 정렬 작업이 필요하다는 의미입니다. 해결 방법으로는 ①WHERE 조건 컬럼과 ORDER BY 컬럼을 하나의 복합 인덱스로 설계하거나, ②정렬 순서를 인덱스 순서에 맞추거나, ③불필요한 정렬을 제거합니다. 복합 인덱스 설계 시 동등 조건 → 범위 조건 → 정렬 컬럼 순서가 이상적입니다.',
              },
              {
                q: 'key_len으로 무엇을 알 수 있나요?',
                a: '복합 인덱스에서 실제로 몇 번째 컬럼까지 활용되었는지를 판단할 수 있습니다. 예를 들어 (status VARCHAR(20), created_at DATETIME) NOT NULL 복합 인덱스에서 key_len이 82(20×4+2)면 status만 활용된 것이고, 87(82+5)이면 두 컬럼 모두 활용된 것입니다. key_len이 예상보다 짧으면 인덱스의 뒤쪽 컬럼이 활용되지 않고 있다는 신호입니다.',
              },
              {
                q: '인덱스가 있는데도 쿼리가 인덱스를 타지 않는 경우는?',
                a: '대표적으로 ①인덱스 컬럼에 함수/연산 적용(WHERE YEAR(col)), ②암묵적 타입 변환(VARCHAR에 숫자 비교), ③앞쪽 와일드카드 LIKE(\'%keyword%\'), ④복합 인덱스의 선두 컬럼 누락, ⑤OR 조건으로 다른 인덱스가 섞인 경우가 있습니다. 또한 옵티마이저가 선택도가 낮다고 판단하면(대부분의 행이 조건을 만족) 인덱스 대신 Full Scan을 선택하기도 합니다.',
              },
              {
                q: '커버링 인덱스(Covering Index)란 무엇인가요?',
                a: '쿼리에 필요한 모든 컬럼이 인덱스에 포함되어, 테이블 데이터(힙)에 접근하지 않고 인덱스만으로 결과를 반환하는 것입니다. EXPLAIN의 Extra에 \'Using index\'로 표시됩니다. 디스크 I/O가 크게 줄어 성능이 향상되며, SELECT 컬럼을 최소화하고 적절한 복합 인덱스를 설계하면 활용할 수 있습니다.',
              },
              {
                q: '복합 인덱스 설계 시 컬럼 순서는 어떻게 정하나요?',
                a: '동등 조건(=) 컬럼을 선두에, 범위 조건(>, <, BETWEEN) 컬럼을 그 다음에, ORDER BY 컬럼을 마지막에 배치합니다. 범위 조건 이후의 컬럼은 인덱스 B-Tree 탐색에 활용되지 못하기 때문입니다. 또한 선택도가 높은(고유값이 많은) 컬럼이 앞에 오면 스캔 범위를 더 좁힐 수 있지만, 실제 쿼리 패턴을 우선으로 고려해야 합니다.',
              },
              {
                q: '테이블 통계(statistics)를 갱신해야 하는 이유는 무엇인가요?',
                a: '옵티마이저는 테이블 통계(행 수, 인덱스 카디널리티, 값 분포 등)를 기반으로 실행 계획을 수립합니다. 대량의 데이터 변경(벌크 INSERT, 대규모 DELETE) 후 통계가 오래되면, 옵티마이저가 rows를 잘못 추정하여 인덱스가 있는데도 Full Scan을 선택하거나, 비효율적인 조인 순서를 결정할 수 있습니다. MySQL은 ANALYZE TABLE, PostgreSQL은 ANALYZE 명령으로 갱신합니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

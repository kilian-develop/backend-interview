import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.pbd-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.pbd-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.pbd-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.pbd-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.pbd-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.pbd-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.pbd-param:hover { transform:translateY(-3px); }
.pbd-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.pbd-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.pbd-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.pbd-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.pbd-table { width:100%; border-collapse:collapse; font-size:12px; }
.pbd-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.pbd-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.pbd-table tr:last-child td { border-bottom:none; }
.pbd-step-list { display:flex; flex-direction:column; gap:10px; }
.pbd-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.pbd-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.pbd-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.pbd-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .pbd-compare-grid{ grid-template-columns:1fr; } }
.pbd-formula { background:#0a0e17; border:1px solid rgba(6,182,212,0.3); border-radius:12px; padding:20px; text-align:center; font-family:'JetBrains Mono',monospace; font-size:16px; color:#06b6d4; margin:16px 0; letter-spacing:0.5px; }
.pbd-formula-desc { font-size:11px; color:#5a6a85; margin-top:8px; font-family:inherit; letter-spacing:0; }
`

export default function PagingBulkData() {
  useInjectCSS('style-paging-bulk-data', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Offset · Cursor · Deferred Join · Batch · Bulk · Chunk · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>페이징</span> & 대량 데이터 처리</>}
          description="Offset vs Cursor 페이징, 지연 조인, 배치 처리, 벌크 연산, Chunk 전략까지 실무에서 필요한 대량 데이터 처리 기법"
        />

        {/* ── Offset 페이징 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>Offset 기반 페이징</SectionTitle>

          <div className="pbd-section-box" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#06b6d4' }}>Offset 페이징이란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="pbd-feature-row">
                <span className="pbd-feature-icon">📄</span>
                <span><strong style={{ color: '#e2e8f0' }}>OFFSET + LIMIT</strong>을 사용하여 페이지 번호 기반으로 데이터를 조회하는 가장 직관적인 방식입니다. <code style={{ color: '#06b6d4' }}>SELECT * FROM orders ORDER BY id LIMIT 20 OFFSET 40</code>은 3번째 페이지(21~40건 건너뛰고 20건 조회)를 의미합니다.</span>
              </div>
            </div>
          </div>

          <div className="pbd-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-box">
              <div className="pbd-section-subtitle"><span style={{ color: '#22c55e' }}>장점</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>구현 단순</strong> — 페이지 번호 × 페이지 크기로 OFFSET 계산</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>임의 페이지 접근</strong> — "5페이지로 이동" 같은 점프 가능</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>총 페이지 수 표시</strong> — COUNT(*)로 전체 건수를 구해 페이지네이션 UI 구성 가능</span>
                </div>
              </div>
            </div>
            <div className="pbd-section-box">
              <div className="pbd-section-subtitle"><span style={{ color: '#ef4444' }}>문제점</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>깊은 페이지 성능 저하</strong> — OFFSET 10만이면 10만 행을 스캔 후 버림. 페이지가 깊어질수록 점점 느려짐</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>데이터 변동 시 중복/누락</strong> — 페이지 이동 중 데이터가 삽입/삭제되면 같은 행이 반복되거나 빠질 수 있음</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>COUNT(*) 비용</strong> — 대용량 테이블에서 전체 건수 조회 자체가 무거울 수 있음</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pbd-formula">
            OFFSET = (page - 1) × pageSize
            <div className="pbd-formula-desc">
              OFFSET 10,000 이면 DB는 10,000행을 읽고 버린 뒤 다음 pageSize 만큼만 반환합니다
            </div>
          </div>

          <CodeBlock title="Offset 페이징 — 깊은 페이지의 성능 문제" lang="sql">{
`-- 1페이지: 빠름 (20건만 스캔)
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 0;

-- 5,000페이지: 느림 (100,000건 스캔 후 20건만 반환)
SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 99980;

-- 실행 계획을 보면 rows가 OFFSET + LIMIT 만큼 증가
EXPLAIN SELECT * FROM orders ORDER BY created_at DESC LIMIT 20 OFFSET 99980;
-- → type: ALL 또는 index, rows: ~100000`
          }</CodeBlock>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> Offset 페이징의 핵심 문제는 <strong>"OFFSET N은 N행을 스캔한 후 버린다"</strong>는 것입니다. 페이지 1과 페이지 5000의 응답 시간 차이가 수십~수백 배까지 벌어집니다. 관리자 페이지처럼 소량의 데이터에서 페이지 번호가 필요한 경우에는 적합하지만, <strong>수백만 건 이상의 대용량 데이터에서는 Cursor 기반을 고려</strong>해야 합니다.
          </HighlightBox>
        </div>

        {/* ── Cursor 페이징 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>Cursor 기반 페이징 (Keyset Pagination)</SectionTitle>

          <div className="pbd-section-box" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#3b82f6' }}>Cursor 페이징이란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="pbd-feature-row">
                <span className="pbd-feature-icon">🔖</span>
                <span>마지막으로 조회한 행의 <strong style={{ color: '#e2e8f0' }}>고유 값(Cursor)</strong>을 기준으로 다음 데이터를 가져오는 방식입니다. <code style={{ color: '#3b82f6' }}>WHERE id {'>'} :lastId ORDER BY id LIMIT 20</code>처럼 <strong style={{ color: '#3b82f6' }}>인덱스를 타고 바로 시작 위치로 이동</strong>하므로 OFFSET 스캔이 없습니다.</span>
              </div>
            </div>
          </div>

          {/* Cursor 동작 다이어그램 */}
          <DiagramContainer title="Cursor 기반 페이징 동작 흐름">
            <DiagramFlow>
              <DiagramNode icon="📱" label="Client" sub="cursor=1050" color="#f59e0b" />
              <DiagramArrow label="WHERE id > 1050" color="#3b82f6" animated />
              <DiagramGroup label="B-Tree Index" color="#3b82f6">
                <DiagramNode icon="🔍" label="인덱스 탐색" sub="id=1050 위치로 직접 이동" color="#3b82f6" />
                <DiagramNode icon="📦" label="LIMIT 20" sub="다음 20건만 읽기" color="#22c55e" />
              </DiagramGroup>
              <DiagramArrow label="20건 + next cursor" color="#22c55e" animated />
              <DiagramNode icon="📱" label="Client" sub="cursor=1070" color="#f59e0b" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="pbd-compare-grid" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="pbd-section-box">
              <div className="pbd-section-subtitle"><span style={{ color: '#22c55e' }}>장점</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>일정한 성능</strong> — 페이지 1이든 5000이든 항상 LIMIT만큼만 스캔</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>데이터 변동에 안전</strong> — 중간에 삽입/삭제가 발생해도 중복/누락 없음</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>인덱스 활용 극대화</strong> — WHERE 조건으로 인덱스를 바로 탐색</span>
                </div>
              </div>
            </div>
            <div className="pbd-section-box">
              <div className="pbd-section-subtitle"><span style={{ color: '#ef4444' }}>제약</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>임의 페이지 접근 불가</strong> — "5페이지로 점프"가 불가능, 순차 탐색만 가능</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>정렬 기준이 고유해야 함</strong> — Cursor 컬럼에 중복이 있으면 누락 발생 가능</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>총 페이지 수 표시 어려움</strong> — 전통적인 페이지 번호 UI에 부적합</span>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock title="Cursor 기반 페이징 — 복합 정렬 처리" lang="sql">{
`-- 기본: PK(id) 기반 Cursor
SELECT * FROM orders
WHERE id > :lastId
ORDER BY id ASC
LIMIT 20;

-- 복합 정렬: created_at DESC + id DESC (중복 값 대응)
SELECT * FROM orders
WHERE (created_at, id) < (:lastCreatedAt, :lastId)
ORDER BY created_at DESC, id DESC
LIMIT 20;

-- 응답에 다음 커서 포함
-- { "data": [...], "nextCursor": "2025-03-01T10:00:00_12345" }`
          }</CodeBlock>

          <HighlightBox color="#3b82f6">
            <strong>면접 포인트:</strong> Cursor 페이징에서 정렬 컬럼에 <strong>중복 값이 있을 때</strong>가 핵심 질문입니다. <code style={{ color: '#06b6d4' }}>created_at</code>이 같은 행이 여러 개면 <code style={{ color: '#06b6d4' }}>WHERE created_at {'<'} :cursor</code>만으로는 누락이 발생합니다. 해결책은 <strong>(created_at, id)</strong> 같은 <strong>복합 키</strong>를 Cursor로 사용하여 정렬 순서를 완전히 결정(tiebreaker)하는 것입니다.
          </HighlightBox>
        </div>

        {/* ── Offset vs Cursor 비교 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>Offset vs Cursor 비교</SectionTitle>

          <div className="pbd-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="pbd-table">
              <thead>
                <tr>
                  <th>비교 항목</th>
                  <th style={{ color: '#06b6d4' }}>Offset</th>
                  <th style={{ color: '#3b82f6' }}>Cursor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>성능 (깊은 페이지)</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>O(OFFSET + LIMIT)</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>O(LIMIT)</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>임의 페이지 접근</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>가능</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>불가능</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>데이터 변동 시</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>중복/누락 가능</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>안전</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>총 건수 표시</strong></td>
                  <td>COUNT(*)로 가능</td>
                  <td>별도 처리 필요</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>UI 패턴</strong></td>
                  <td>페이지 번호 (1,2,3...)</td>
                  <td>"더 보기" / 무한 스크롤</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>적합한 경우</strong></td>
                  <td>관리자 페이지, 소량 데이터</td>
                  <td>피드, 타임라인, 대용량 목록</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> "무조건 Cursor가 좋다"가 아니라 <strong>상황에 따른 선택</strong>을 설명해야 합니다. 관리자 페이지처럼 데이터가 적고 페이지 번호가 필요하면 <strong>Offset</strong>, SNS 피드나 검색 결과처럼 대용량 + 무한 스크롤이면 <strong>Cursor</strong>가 적합합니다. 두 가지를 모두 지원하는 API를 설계하는 것도 좋은 답변입니다.
          </HighlightBox>
        </div>

        {/* ── 지연 조인 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>지연 조인 (Deferred Join)</SectionTitle>

          <div className="pbd-section-box" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#22c55e' }}>지연 조인이란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="pbd-feature-row">
                <span className="pbd-feature-icon">🚀</span>
                <span><strong style={{ color: '#e2e8f0' }}>Offset 페이징의 성능을 개선</strong>하는 기법입니다. 먼저 <strong style={{ color: '#06b6d4' }}>커버링 인덱스</strong>로 필요한 PK만 빠르게 추출한 뒤, 그 PK 목록으로 실제 데이터를 조인합니다. OFFSET이 커도 인덱스만 스캔하므로 데이터 페이지 접근이 최소화됩니다.</span>
              </div>
            </div>
          </div>

          {/* 지연 조인 동작 다이어그램 */}
          <DiagramContainer title="지연 조인 동작 원리">
            <DiagramFlow>
              <DiagramGroup label="Step 1: 서브쿼리 (인덱스만)" color="#06b6d4">
                <DiagramNode icon="📇" label="커버링 인덱스" sub="PK만 빠르게 추출" color="#06b6d4" />
                <DiagramNode icon="⏩" label="OFFSET + LIMIT" sub="인덱스 스캔 (가벼움)" color="#3b82f6" />
              </DiagramGroup>
              <DiagramArrow label="PK 목록" color="#22c55e" animated />
              <DiagramGroup label="Step 2: JOIN (데이터)" color="#22c55e">
                <DiagramNode icon="🗄️" label="원본 테이블" sub="PK로 직접 접근" color="#22c55e" />
                <DiagramNode icon="📦" label="LIMIT건만" sub="필요한 데이터만 로드" color="#f59e0b" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <CodeBlock title="지연 조인 적용 — Before vs After" lang="sql">{
`-- ❌ Before: 일반 Offset (느림)
-- 10만 행을 풀 테이블 스캔 후 20건만 반환
SELECT o.id, o.user_id, o.total_price, o.created_at, o.status
FROM orders o
ORDER BY o.created_at DESC
LIMIT 20 OFFSET 100000;

-- ✅ After: 지연 조인 (빠름)
-- Step 1: 커버링 인덱스로 PK 20개만 추출
-- Step 2: PK로 원본 테이블 조인
SELECT o.id, o.user_id, o.total_price, o.created_at, o.status
FROM orders o
INNER JOIN (
    SELECT id FROM orders
    ORDER BY created_at DESC
    LIMIT 20 OFFSET 100000
) AS sub ON o.id = sub.id
ORDER BY o.created_at DESC;

-- 필요한 인덱스
CREATE INDEX idx_orders_created_at ON orders(created_at DESC, id);`
          }</CodeBlock>

          <div className="pbd-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#f59e0b' }}>왜 빨라지는가?</span></div>
            <div className="pbd-step-list">
              <div className="pbd-step">
                <div className="pbd-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="pbd-step-content">
                  <strong style={{ color: '#06b6d4' }}>서브쿼리는 커버링 인덱스만 스캔</strong> — SELECT id만 필요하므로 인덱스 페이지만 읽으면 됩니다. 데이터 페이지(실제 행)에 접근하지 않으므로 <strong style={{ color: '#e2e8f0' }}>디스크 Random I/O가 발생하지 않습니다.</strong>
                </div>
              </div>
              <div className="pbd-step">
                <div className="pbd-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>2</div>
                <div className="pbd-step-content">
                  <strong style={{ color: '#22c55e' }}>JOIN은 LIMIT건만 수행</strong> — 서브쿼리 결과인 20개 PK로만 원본 테이블을 조회합니다. <strong style={{ color: '#e2e8f0' }}>PK 기반 인덱스 접근은 O(log N)</strong>이므로 매우 빠릅니다.
                </div>
              </div>
              <div className="pbd-step">
                <div className="pbd-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>3</div>
                <div className="pbd-step-content">
                  <strong style={{ color: '#f59e0b' }}>일반 OFFSET은 데이터 페이지까지 스캔</strong> — SELECT *이면 OFFSET만큼의 모든 행 데이터를 읽어야 합니다. 컬럼이 많거나 TEXT/BLOB이 있으면 차이가 극적으로 커집니다.
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> 지연 조인은 <strong>"Offset 페이징을 완전히 포기할 수 없을 때"</strong>의 최적화 기법입니다. 핵심은 <strong>커버링 인덱스</strong>입니다. 서브쿼리가 인덱스만으로 처리 가능해야 효과가 있으며, <code style={{ color: '#06b6d4' }}>SELECT id FROM orders ORDER BY created_at</code>이 인덱스 온리 스캔(Using index)으로 실행되는지 EXPLAIN으로 확인해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 배치 처리 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>배치 처리 (Batch Processing)</SectionTitle>

          <div className="pbd-section-box" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#f59e0b' }}>배치 처리란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="pbd-feature-row">
                <span className="pbd-feature-icon">📦</span>
                <span><strong style={{ color: '#e2e8f0' }}>여러 건의 작업을 묶어서 한 번에 처리</strong>하는 방식입니다. 네트워크 왕복(round-trip)을 줄이고, DB 서버의 파싱/최적화 오버헤드를 공유하여 처리량(throughput)을 극대화합니다.</span>
              </div>
            </div>
          </div>

          <div className="pbd-param-grid" style={{ marginBottom: '20px' }}>
            <div className="pbd-param">
              <div className="pbd-param-name" style={{ color: '#f59e0b' }}>JDBC Batch</div>
              <div className="pbd-param-desc">
                <code style={{ color: '#f59e0b' }}>addBatch()</code>로 SQL을 모아서 <code style={{ color: '#f59e0b' }}>executeBatch()</code>로 한 번에 전송합니다. <strong style={{ color: '#e2e8f0' }}>네트워크 왕복을 1회로 줄이는</strong> 가장 기본적인 배치 기법입니다.
              </div>
              <div className="pbd-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>N회 → 1회 왕복</div>
            </div>
            <div className="pbd-param">
              <div className="pbd-param-name" style={{ color: '#06b6d4' }}>JPA Batch Insert</div>
              <div className="pbd-param-desc">
                <code style={{ color: '#06b6d4' }}>hibernate.jdbc.batch_size</code> 설정으로 persist 호출을 모아 배치 INSERT합니다. <strong style={{ color: '#ef4444' }}>IDENTITY 전략에서는 배치 불가</strong> — SEQUENCE 또는 TABLE 전략 필요.
              </div>
              <div className="pbd-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>batch_size 설정 필수</div>
            </div>
            <div className="pbd-param">
              <div className="pbd-param-name" style={{ color: '#a855f7' }}>Spring Batch</div>
              <div className="pbd-param-desc">
                대용량 데이터 처리를 위한 프레임워크입니다. <strong style={{ color: '#e2e8f0' }}>Reader → Processor → Writer</strong> 패턴으로 Chunk 단위 트랜잭션을 관리합니다.
              </div>
              <div className="pbd-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>Chunk 지향 처리</div>
            </div>
          </div>

          <CodeBlock title="JDBC Batch vs 건별 처리 성능 차이" lang="java">{
`// ❌ 건별 처리 — 10,000건이면 10,000번 네트워크 왕복
for (Order order : orders) {
    jdbcTemplate.update(
        "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
        order.getUserId(), order.getTotalPrice()
    );
}

// ✅ JDBC Batch — 1번 네트워크 왕복으로 10,000건 처리
jdbcTemplate.batchUpdate(
    "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
    new BatchPreparedStatementSetter() {
        public void setValues(PreparedStatement ps, int i) throws SQLException {
            ps.setLong(1, orders.get(i).getUserId());
            ps.setBigDecimal(2, orders.get(i).getTotalPrice());
        }
        public int getBatchSize() { return orders.size(); }
    }
);`
          }</CodeBlock>

          <CodeBlock title="JPA Batch Insert 설정 (application.yml)" lang="yaml">{
`spring:
  jpa:
    properties:
      hibernate:
        jdbc:
          batch_size: 50              # 50건씩 배치 INSERT
          batch_versioned_data: true  # @Version 엔티티도 배치 허용
        order_inserts: true           # INSERT 순서 정렬 (배치 효율↑)
        order_updates: true           # UPDATE 순서 정렬

# 주의: GenerationType.IDENTITY 사용 시 배치 INSERT 불가
# → SEQUENCE 전략으로 변경 필요
# @GeneratedValue(strategy = GenerationType.SEQUENCE)`
          }</CodeBlock>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> JPA에서 <strong>IDENTITY 전략(MySQL AUTO_INCREMENT)은 배치 INSERT가 불가능</strong>합니다. Hibernate가 INSERT 즉시 생성된 ID를 알아야 영속성 컨텍스트를 관리할 수 있는데, 배치로 묶으면 ID를 미리 알 수 없기 때문입니다. 배치 INSERT가 필요하면 <strong>SEQUENCE 전략</strong>(allocationSize로 ID를 미리 할당)이나 <strong>JDBC Template 직접 사용</strong>을 고려해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 벌크 연산 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#a855f7']}>벌크 연산 (Bulk Operations)</SectionTitle>

          <div className="pbd-section-box" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#ef4444' }}>벌크 연산이란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="pbd-feature-row">
                <span className="pbd-feature-icon">⚡</span>
                <span><strong style={{ color: '#e2e8f0' }}>단일 SQL로 대량의 데이터를 한 번에 UPDATE/DELETE</strong>하는 방식입니다. 엔티티를 하나씩 로딩하여 변경하는 것보다 <strong style={{ color: '#22c55e' }}>수십~수백 배 빠릅니다.</strong> JPA에서는 JPQL/Criteria의 벌크 연산, Spring Data의 <code style={{ color: '#ef4444' }}>@Modifying</code>이 해당됩니다.</span>
              </div>
            </div>
          </div>

          <div className="pbd-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-box">
              <div className="pbd-section-subtitle"><span style={{ color: '#ef4444' }}>건별 처리 (느림)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">1️⃣</span>
                  <span>10만 건 SELECT로 엔티티 로딩 (<strong style={{ color: '#ef4444' }}>메모리 폭증</strong>)</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">2️⃣</span>
                  <span>각 엔티티의 상태를 코드로 변경</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">3️⃣</span>
                  <span>Dirty Checking으로 10만 건 UPDATE 발생 (<strong style={{ color: '#ef4444' }}>10만 번 네트워크 왕복</strong>)</span>
                </div>
              </div>
            </div>
            <div className="pbd-section-box">
              <div className="pbd-section-subtitle"><span style={{ color: '#22c55e' }}>벌크 연산 (빠름)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">1️⃣</span>
                  <span><strong style={{ color: '#22c55e' }}>단일 SQL</strong>로 10만 건 한 번에 UPDATE</span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">2️⃣</span>
                  <span>네트워크 왕복 <strong style={{ color: '#22c55e' }}>1회</strong></span>
                </div>
                <div className="pbd-feature-row">
                  <span className="pbd-feature-icon">3️⃣</span>
                  <span>엔티티 로딩 없이 DB에서 직접 처리 (<strong style={{ color: '#22c55e' }}>메모리 절약</strong>)</span>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock title="JPA 벌크 연산 — @Modifying 사용" lang="java">{
`// Spring Data JPA — @Modifying + @Query
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 벌크 UPDATE: 7일 이상 된 PENDING 주문을 CANCELLED로 변경
    @Modifying(clearAutomatically = true)  // 영속성 컨텍스트 자동 초기화
    @Query("UPDATE Order o SET o.status = 'CANCELLED' " +
           "WHERE o.status = 'PENDING' AND o.createdAt < :cutoff")
    int cancelExpiredOrders(@Param("cutoff") LocalDateTime cutoff);

    // 벌크 DELETE: 1년 이상 된 로그 삭제
    @Modifying(clearAutomatically = true)
    @Query("DELETE FROM AuditLog a WHERE a.createdAt < :cutoff")
    int deleteOldLogs(@Param("cutoff") LocalDateTime cutoff);
}

// JPQL 벌크 연산 직접 실행
int updatedCount = entityManager.createQuery(
        "UPDATE Order o SET o.status = :newStatus " +
        "WHERE o.status = :oldStatus")
    .setParameter("newStatus", OrderStatus.CANCELLED)
    .setParameter("oldStatus", OrderStatus.PENDING)
    .executeUpdate();

// 주의: 벌크 연산 후 영속성 컨텍스트 초기화 필수!
entityManager.clear();`
          }</CodeBlock>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> JPA 벌크 연산의 가장 중요한 주의사항은 <strong>영속성 컨텍스트와의 불일치</strong>입니다. 벌크 연산은 DB에 직접 SQL을 실행하므로 영속성 컨텍스트의 1차 캐시에는 반영되지 않습니다. 벌크 연산 후 같은 트랜잭션에서 엔티티를 조회하면 <strong>변경 전 데이터가 반환</strong>됩니다. <code style={{ color: '#06b6d4' }}>@Modifying(clearAutomatically = true)</code> 또는 <code style={{ color: '#06b6d4' }}>em.clear()</code>로 영속성 컨텍스트를 초기화해야 합니다.
          </HighlightBox>
        </div>

        {/* ── Chunk 전략 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>Chunk 기반 처리 전략</SectionTitle>

          <div className="pbd-section-box" style={{ marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#06b6d4' }}>Chunk 처리란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="pbd-feature-row">
                <span className="pbd-feature-icon">🧩</span>
                <span>대량 데이터를 <strong style={{ color: '#e2e8f0' }}>일정 크기(Chunk)로 분할</strong>하여 처리하는 패턴입니다. 전체를 한 번에 메모리에 올리지 않고, <strong style={{ color: '#06b6d4' }}>Chunk 단위로 읽기 → 처리 → 쓰기</strong>를 반복합니다. 메모리 사용량을 일정하게 유지하면서 대용량 처리가 가능합니다.</span>
              </div>
            </div>
          </div>

          {/* Chunk 처리 흐름 다이어그램 */}
          <DiagramContainer title="Chunk 기반 처리 흐름 (Spring Batch)">
            <DiagramFlow>
              <DiagramNode icon="📖" label="ItemReader" sub="Chunk Size만큼 읽기" color="#06b6d4" />
              <DiagramArrow label="N건" color="#06b6d4" animated />
              <DiagramNode icon="⚙️" label="ItemProcessor" sub="비즈니스 로직 처리" color="#f59e0b" />
              <DiagramArrow label="변환된 N건" color="#f59e0b" animated />
              <DiagramNode icon="✏️" label="ItemWriter" sub="Chunk 단위 쓰기" color="#22c55e" />
              <DiagramArrow label="commit" color="#22c55e" animated />
              <DiagramNode icon="🔄" label="다음 Chunk" sub="Reader가 없을 때까지" color="#a855f7" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="pbd-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="pbd-section-subtitle"><span style={{ color: '#f59e0b' }}>Chunk Size 결정 기준</span></div>
            <div className="pbd-table-wrap">
              <table className="pbd-table">
                <thead>
                  <tr>
                    <th>고려 사항</th>
                    <th>작은 Chunk (100~500)</th>
                    <th>큰 Chunk (1000~5000)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>메모리 사용</strong></td>
                    <td><strong style={{ color: '#22c55e' }}>적음</strong></td>
                    <td><strong style={{ color: '#ef4444' }}>많음</strong></td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>커밋 빈도</strong></td>
                    <td>잦음 (오버헤드↑)</td>
                    <td>적음 (효율적)</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>실패 시 재처리</strong></td>
                    <td><strong style={{ color: '#22c55e' }}>적은 범위</strong> 재처리</td>
                    <td><strong style={{ color: '#ef4444' }}>넓은 범위</strong> 재처리</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>Lock 유지 시간</strong></td>
                    <td><strong style={{ color: '#22c55e' }}>짧음</strong></td>
                    <td><strong style={{ color: '#ef4444' }}>길어질 수 있음</strong></td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>총 처리 속도</strong></td>
                    <td>보통</td>
                    <td><strong style={{ color: '#22c55e' }}>빠름</strong> (왕복 횟수↓)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CodeBlock title="Chunk 기반 데이터 마이그레이션 예시" lang="java">{
`// Spring Batch Step 설정
@Bean
public Step migrationStep(JobRepository jobRepository,
                          PlatformTransactionManager txManager) {
    return new StepBuilder("migrationStep", jobRepository)
        .<OldOrder, NewOrder>chunk(500, txManager)  // 500건씩 처리
        .reader(oldOrderReader())      // Cursor 기반 Reader
        .processor(orderProcessor())   // 변환 로직
        .writer(newOrderWriter())      // Batch INSERT
        .faultTolerant()
        .retryLimit(3)                 // 실패 시 3회 재시도
        .retry(DeadlockLoserDataAccessException.class)
        .build();
}

// JpaCursorItemReader — 커서 기반으로 메모리 효율적 읽기
@Bean
public JpaCursorItemReader<OldOrder> oldOrderReader() {
    return new JpaCursorItemReaderBuilder<OldOrder>()
        .name("oldOrderReader")
        .entityManagerFactory(entityManagerFactory)
        .queryString("SELECT o FROM OldOrder o ORDER BY o.id")
        .build();
}

// 직접 구현 — JDBC 커서 기반 Chunk 처리
public void migrateInChunks(int chunkSize) {
    long lastId = 0;
    while (true) {
        List<Order> chunk = orderRepository
            .findByIdGreaterThanOrderById(lastId, PageRequest.of(0, chunkSize));

        if (chunk.isEmpty()) break;

        processAndSave(chunk);  // 변환 + 저장
        lastId = chunk.get(chunk.size() - 1).getId();

        entityManager.clear();  // 메모리 해제
    }
}`
          }</CodeBlock>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> Chunk 처리에서 가장 중요한 설계 포인트는 <strong>Reader의 구현 방식</strong>입니다. <code style={{ color: '#06b6d4' }}>JpaPagingItemReader</code>는 내부적으로 OFFSET 페이징을 사용하므로 대용량에서 느려집니다. <strong>JpaCursorItemReader</strong>나 직접 Cursor 기반 Reader를 구현하면 일정한 성능을 유지할 수 있습니다. 또한 <code style={{ color: '#06b6d4' }}>em.clear()</code>로 영속성 컨텍스트를 주기적으로 초기화하여 <strong>메모리 누수를 방지</strong>해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 실무 전략 정리 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>상황별 전략 선택 가이드</SectionTitle>

          <div className="pbd-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="pbd-table">
              <thead>
                <tr>
                  <th>상황</th>
                  <th>권장 전략</th>
                  <th>이유</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>관리자 페이지 목록</strong></td>
                  <td><strong style={{ color: '#06b6d4' }}>Offset + 지연 조인</strong></td>
                  <td>페이지 번호 필요, 지연 조인으로 성능 보완</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>SNS 피드 / 무한 스크롤</strong></td>
                  <td><strong style={{ color: '#3b82f6' }}>Cursor 페이징</strong></td>
                  <td>대용량 + 실시간 변동, 일정한 성능</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>대량 상태 변경</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>벌크 UPDATE</strong></td>
                  <td>단일 SQL로 즉시 처리, 엔티티 로딩 불필요</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>대량 INSERT (초기 데이터)</strong></td>
                  <td><strong style={{ color: '#f59e0b' }}>JDBC Batch</strong></td>
                  <td>네트워크 왕복 최소화, JPA 배치보다 빠름</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>데이터 마이그레이션</strong></td>
                  <td><strong style={{ color: '#a855f7' }}>Chunk + Cursor Reader</strong></td>
                  <td>메모리 일정, 실패 시 Chunk 단위 재처리</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>정기 배치 (정산, 집계)</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>Spring Batch Chunk</strong></td>
                  <td>트랜잭션 관리, 재시도, 모니터링 기능 내장</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> 대량 데이터 처리에서 가장 흔한 실수는 <strong>JPA 엔티티를 전부 메모리에 올려놓고 건별로 처리</strong>하는 것입니다. 10만 건을 <code style={{ color: '#06b6d4' }}>findAll()</code>로 조회하면 메모리가 폭발하고, Dirty Checking으로 10만 번 UPDATE가 발생합니다. 상황에 따라 <strong>벌크 SQL, JDBC Batch, Chunk 처리</strong>를 선택하고, JPA의 영속성 컨텍스트 관리(flush/clear)를 적절히 수행해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: 'Offset 페이징과 Cursor 페이징의 차이점과 각각의 적합한 상황을 설명해주세요.',
                a: 'Offset 페이징은 OFFSET + LIMIT으로 페이지 번호 기반 접근이 가능하지만, 깊은 페이지에서 O(OFFSET+LIMIT)만큼 스캔하여 느려집니다. Cursor 페이징은 마지막 조회 행의 고유 값을 기준으로 WHERE 조건으로 다음 데이터를 가져와 항상 O(LIMIT)의 성능을 보장합니다. 관리자 페이지처럼 페이지 번호가 필요하면 Offset, SNS 피드처럼 대용량 무한 스크롤이면 Cursor가 적합합니다.',
              },
              {
                q: 'Cursor 페이징에서 정렬 컬럼에 중복 값이 있으면 어떻게 해결하나요?',
                a: 'created_at 같은 컬럼에 중복 값이 있으면 WHERE created_at < :cursor만으로는 같은 시각의 행이 누락될 수 있습니다. 해결책은 (created_at, id) 같은 복합 키를 Cursor로 사용하는 것입니다. WHERE (created_at, id) < (:lastCreatedAt, :lastId)로 정렬 순서를 완전히 결정(tiebreaker)하면 누락 없이 정확한 페이징이 가능합니다.',
              },
              {
                q: '지연 조인(Deferred Join)이란 무엇이고, 왜 빨라지나요?',
                a: '지연 조인은 서브쿼리에서 커버링 인덱스로 PK만 빠르게 추출한 뒤, 그 PK로 원본 테이블을 조인하는 기법입니다. 일반 OFFSET은 데이터 페이지까지 모두 스캔하지만, 서브쿼리는 인덱스 페이지만 스캔하므로 디스크 Random I/O가 크게 줄어듭니다. 컬럼이 많거나 TEXT/BLOB이 있는 테이블에서 특히 효과적입니다.',
              },
              {
                q: 'JPA에서 IDENTITY 전략이 배치 INSERT를 불가능하게 만드는 이유는?',
                a: 'IDENTITY 전략(AUTO_INCREMENT)은 INSERT 실행 후에야 DB가 ID를 생성합니다. Hibernate는 영속성 컨텍스트 관리를 위해 INSERT 즉시 생성된 ID를 알아야 하므로 persist() 호출 시 곧바로 INSERT SQL을 실행합니다. 배치로 묶으면 ID를 미리 알 수 없어 배치가 불가능합니다. SEQUENCE 전략은 allocationSize로 ID를 미리 할당받아 배치 INSERT가 가능합니다.',
              },
              {
                q: 'JPA 벌크 연산 시 주의할 점은 무엇인가요?',
                a: '벌크 연산은 DB에 직접 SQL을 실행하므로 영속성 컨텍스트의 1차 캐시에 반영되지 않습니다. 벌크 연산 후 같은 트랜잭션에서 엔티티를 조회하면 변경 전 데이터가 반환되는 정합성 문제가 발생합니다. @Modifying(clearAutomatically = true)나 em.clear()로 영속성 컨텍스트를 초기화하거나, 벌크 연산을 트랜잭션의 맨 처음에 실행하여 캐시 불일치를 방지해야 합니다.',
              },
              {
                q: 'Spring Batch의 Chunk 지향 처리에서 Chunk Size는 어떻게 결정하나요?',
                a: '메모리 사용량, 커밋 빈도, 실패 시 재처리 범위를 고려합니다. Chunk가 작으면 메모리 절약과 실패 시 재처리 범위가 줄지만 커밋 오버헤드가 증가하고, 크면 처리 속도는 빠르지만 메모리와 Lock 유지 시간이 증가합니다. 일반적으로 500~1000에서 시작하여 부하 테스트로 조정합니다. 또한 Reader로 JpaCursorItemReader를 사용하면 OFFSET 없이 일정한 성능을 유지할 수 있습니다.',
              },
              {
                q: '10만 건의 주문 상태를 변경해야 합니다. 어떻게 처리하시겠습니까?',
                a: '즉시 처리가 가능하다면 벌크 UPDATE(@Modifying + JPQL)로 단일 SQL로 처리합니다. 변환 로직이 복잡하다면 Chunk 기반으로 500~1000건씩 나누어 처리하되, JpaCursorItemReader로 읽고 em.clear()로 메모리를 관리합니다. 핵심은 10만 건을 findAll()로 한 번에 로딩하지 않는 것입니다. 엔티티 전체를 메모리에 올리면 OOM이 발생하고, Dirty Checking으로 10만 번 UPDATE SQL이 발생하여 성능이 극도로 저하됩니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

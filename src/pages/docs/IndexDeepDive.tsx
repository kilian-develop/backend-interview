import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'

const CSS = `
.ix-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.ix-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.ix-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.ix-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.ix-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.ix-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.ix-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.ix-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.ix-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.ix-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.ix-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.ix-param:hover { transform:translateY(-3px); }
.ix-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.ix-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.ix-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.ix-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.ix-table { width:100%; border-collapse:collapse; font-size:12px; }
.ix-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.ix-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.ix-table tr:last-child td { border-bottom:none; }
.ix-step-list { display:flex; flex-direction:column; gap:10px; }
.ix-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.ix-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.ix-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.ix-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .ix-compare-grid{ grid-template-columns:1fr; } }
/* B+Tree visual — CSS-only, no SVG */
.ix-bt { display:flex; flex-direction:column; align-items:center; gap:0; padding:20px 12px; overflow-x:auto; }
.ix-bt-row { display:flex; justify-content:center; }
.ix-bt-node { display:inline-flex; border-radius:10px; overflow:hidden; }
.ix-bt-node span { padding:8px 14px; font-family:'JetBrains Mono',monospace; font-size:13px; font-weight:700; text-align:center; min-width:36px; }
.ix-bt-node span+span { border-left:1px solid rgba(255,255,255,0.08); }
.ix-bt-node.root { border:1.5px solid #06b6d4; background:rgba(6,182,212,0.08); }
.ix-bt-node.root span { color:#06b6d4; }
.ix-bt-node.int { border:1.5px solid #3b82f6; background:rgba(59,130,246,0.08); }
.ix-bt-node.int span { color:#3b82f6; }
.ix-bt-node.lf { border:1.5px solid #22c55e; background:rgba(34,197,94,0.08); }
.ix-bt-node.lf span { color:#22c55e; }
/* Fork: 1 parent → 3 children, auto-aligned */
.ix-bt-fork { display:flex; position:relative; padding-top:14px; width:100%; max-width:480px; }
.ix-bt-fork::before { content:''; position:absolute; top:0; left:50%; width:1.5px; height:14px; background:#334155; transform:translateX(-50%); }
.ix-bt-fork::after { content:''; position:absolute; top:13.5px; height:1.5px; background:#334155; left:calc(100%/6); right:calc(100%/6); }
.ix-bt-fork-ch { flex:1; display:flex; flex-direction:column; align-items:center; }
.ix-bt-fork-ch::before { content:''; width:1.5px; height:14px; background:#334155; flex-shrink:0; }
/* Internal → Leaf connector (inside fork-ch) */
.ix-bt-mid-conn { width:1.5px; height:20px; background:#334155; flex-shrink:0; }
/* Leaf wrapper for linked-list arrow positioning */
.ix-bt-leaf-wrap { position:relative; display:flex; justify-content:center; width:100%; }
.ix-bt-fork-ch:not(:last-child) .ix-bt-leaf-wrap::after { content:'→'; position:absolute; right:0; top:50%; transform:translate(50%,-50%); color:#a855f7; font-size:15px; font-weight:700; font-family:'JetBrains Mono',monospace; z-index:2; }
.ix-bt-ptr-group { display:flex; gap:8px; }
.ix-bt-ptr { display:flex; flex-direction:column; align-items:center; }
.ix-bt-ptr-line { width:1.5px; height:14px; background:#f59e0b; opacity:0.5; }
.ix-bt-ptr-dot { width:5px; height:5px; border-radius:50%; background:#f59e0b; margin-top:2px; }
.ix-bt-ptr-label { font-size:9px; font-family:'JetBrains Mono',monospace; color:#5a6a85; margin-top:6px; }
/* Legend */
.ix-bt-legend { display:flex; gap:16px; flex-wrap:wrap; justify-content:center; margin-top:14px; padding-top:12px; border-top:1px solid #1a2234; }
.ix-bt-legend-item { display:flex; align-items:center; gap:6px; font-size:10px; font-family:'JetBrains Mono',monospace; color:#5a6a85; }
.ix-bt-legend-dot { width:10px; height:10px; border-radius:3px; border:1.5px solid; }
@media(max-width:480px){
  .ix-bt-node span { padding:6px 10px; font-size:11px; min-width:28px; }
  .ix-bt-fork { max-width:340px; }
}
.ix-warn-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:12px; }
.ix-warn-card { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; background:rgba(255,255,255,0.02); border-radius:10px; border:1px solid #1a2234; }
.ix-warn-icon { flex-shrink:0; font-size:18px; margin-top:1px; }
.ix-warn-label { font-size:12px; font-weight:700; color:#e2e8f0; margin-bottom:2px; }
.ix-warn-desc { font-size:11px; color:#5a6a85; line-height:1.6; }
/* Clustered vs Non-Clustered Visual */
.ix-ci-wrap { display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:20px; }
@media(max-width:720px){ .ix-ci-wrap { grid-template-columns:1fr; } }
.ix-ci-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:20px 16px; display:flex; flex-direction:column; align-items:center; overflow:hidden; }
.ix-ci-title { font-size:13px; font-weight:800; margin-bottom:16px; text-align:center; }
.ix-ci-tree { display:flex; flex-direction:column; align-items:center; width:100%; }
.ix-ci-node { display:inline-flex; border-radius:8px; font-size:11px; font-family:'JetBrains Mono',monospace; font-weight:700; padding:6px 14px; text-align:center; gap:6px; }
.ix-ci-node span+span { padding-left:6px; border-left:1px solid rgba(255,255,255,0.08); }
.ix-ci-stem { width:1.5px; height:14px; background:#334155; }
.ix-ci-hbar { position:relative; height:1.5px; background:#334155; }
.ix-ci-branches { display:flex; width:100%; }
.ix-ci-branch { flex:1; display:flex; flex-direction:column; align-items:center; }
.ix-ci-branch::before { content:''; width:1.5px; height:14px; background:#334155; }
/* Data page (clustered leaf) */
.ix-ci-data { border:1.5px dashed; border-radius:10px; padding:10px; width:90%; max-width:130px; }
.ix-ci-data-label { font-size:9px; font-weight:700; text-align:center; margin-bottom:6px; letter-spacing:0.5px; }
.ix-ci-data-row { font-size:10px; font-family:'JetBrains Mono',monospace; padding:3px 6px; border-radius:4px; margin-bottom:2px; color:#94a3b8; line-height:1.5; background:rgba(255,255,255,0.02); }
.ix-ci-data-row:last-child { margin-bottom:0; }
.ix-ci-data-pk { font-weight:800; }
/* PK pointer leaf (non-clustered) */
.ix-ci-ptr { border:1.5px solid; border-radius:10px; padding:10px; width:90%; max-width:130px; }
.ix-ci-ptr-label { font-size:9px; font-weight:700; text-align:center; margin-bottom:6px; letter-spacing:0.5px; }
.ix-ci-ptr-row { font-size:10px; font-family:'JetBrains Mono',monospace; padding:3px 6px; border-radius:4px; margin-bottom:2px; display:flex; align-items:center; gap:4px; color:#94a3b8; background:rgba(255,255,255,0.02); }
.ix-ci-ptr-row:last-child { margin-bottom:0; }
.ix-ci-ptr-arrow { font-weight:700; flex-shrink:0; }
/* Lookup arrow between two trees */
.ix-ci-lookup { display:flex; align-items:center; justify-content:center; gap:8px; margin:10px 0; padding:6px 14px; border-radius:8px; background:rgba(245,158,11,0.06); border:1px dashed rgba(245,158,11,0.25); }
.ix-ci-lookup-text { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; }
.ix-ci-caption { font-size:10px; color:#5a6a85; text-align:center; margin-top:10px; font-style:italic; line-height:1.6; }
.ix-ci-badge { font-size:9px; font-weight:700; padding:2px 8px; border-radius:99px; display:inline-flex; margin-top:8px; }
`

export default function IndexDeepDive() {
  useInjectCSS('style-index-deep-dive', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Index · B+Tree · Clustered · Covering · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>인덱스</span> 심화</>}
          description="B+Tree 구조와 동작 원리, 클러스터드 vs 논클러스터드, 인덱스 설계 전략과 안티패턴"
        />

        {/* ── 인덱스란 무엇인가 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>인덱스란 무엇인가</SectionTitle>

          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#06b6d4' }}>정의와 목적</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">📖</span>
                <span><strong style={{ color: '#e2e8f0' }}>인덱스 = 책의 색인:</strong> 데이터베이스 테이블의 검색 속도를 향상시키기 위한 별도의 자료구조입니다. 책 뒤편의 색인(찾아보기)처럼, 원하는 데이터의 <strong style={{ color: '#06b6d4' }}>물리적 위치를 빠르게 찾아가는 포인터</strong> 역할을 합니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">⚡</span>
                <span><strong style={{ color: '#e2e8f0' }}>Full Table Scan → Index Scan:</strong> 인덱스가 없으면 테이블 전체를 순차 탐색(O(N))해야 하지만, 인덱스가 있으면 트리 탐색(O(log N))으로 훨씬 빠르게 데이터를 찾을 수 있습니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">💾</span>
                <span><strong style={{ color: '#e2e8f0' }}>트레이드오프:</strong> 인덱스는 <strong style={{ color: '#f59e0b' }}>추가 저장 공간</strong>을 사용하고, INSERT/UPDATE/DELETE 시 <strong style={{ color: '#f59e0b' }}>인덱스도 함께 갱신</strong>해야 하므로 쓰기 성능이 저하됩니다. 읽기 vs 쓰기 비율을 고려하여 설계해야 합니다.</span>
              </div>
            </div>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> "인덱스를 왜 무조건 다 걸면 안 되나요?"라는 질문에는 ①추가 저장 공간 비용 ②INSERT/UPDATE/DELETE 시 인덱스 갱신 오버헤드 ③옵티마이저가 오히려 Full Scan을 선택할 수 있음 — 세 가지를 설명하면 됩니다.
          </HighlightBox>
        </div>

        {/* ── B-Tree / B+Tree 구조 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#06b6d4']}>B-Tree / B+Tree 구조</SectionTitle>

          {/* B-Tree란 */}
          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#f59e0b' }}>B-Tree (Balanced Tree)란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">🌳</span>
                <span><strong style={{ color: '#e2e8f0' }}>자가 균형 다진 탐색 트리:</strong> B-Tree는 이진 탐색 트리(BST)를 일반화한 구조로, 하나의 노드에 <strong style={{ color: '#f59e0b' }}>여러 개의 키</strong>와 <strong style={{ color: '#f59e0b' }}>여러 개의 자식 포인터</strong>를 가질 수 있습니다. 삽입/삭제 시 자동으로 균형을 유지합니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">📏</span>
                <span><strong style={{ color: '#e2e8f0' }}>차수(Order) M:</strong> 각 노드가 최대 M개의 자식을 가질 수 있습니다. 내부 노드는 최소 ⌈M/2⌉개의 자식을 가져야 하므로, 트리가 한쪽으로 치우치지 않고 항상 <strong style={{ color: '#f59e0b' }}>균형(Balanced)</strong>을 유지합니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">💿</span>
                <span><strong style={{ color: '#e2e8f0' }}>디스크 I/O 최적화:</strong> 하나의 노드가 하나의 <strong style={{ color: '#f59e0b' }}>디스크 페이지(4KB~16KB)</strong>에 대응합니다. 이진 트리는 노드당 키 1개뿐이라 트리 높이가 높지만, B-Tree는 노드당 수백 개의 키를 담아 <strong style={{ color: '#e2e8f0' }}>트리 높이를 극적으로 낮춥니다.</strong></span>
              </div>
            </div>
          </div>

          {/* B+Tree란 */}
          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#06b6d4' }}>B+Tree — B-Tree의 진화</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">🌳</span>
                <span><strong style={{ color: '#e2e8f0' }}>B-Tree를 개량한 구조:</strong> B-Tree와 달리 <strong style={{ color: '#06b6d4' }}>데이터는 리프 노드에만</strong> 저장하고, 내부 노드에는 키(라우팅 정보)만 보관합니다. 리프 노드끼리는 <strong style={{ color: '#06b6d4' }}>연결 리스트</strong>로 이어져 있습니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">📦</span>
                <span><strong style={{ color: '#e2e8f0' }}>내부 노드가 더 많은 키를 저장:</strong> 데이터를 내부 노드에 저장하지 않으므로, 같은 페이지 크기에 <strong style={{ color: '#06b6d4' }}>더 많은 키</strong>를 담을 수 있습니다. 이는 트리의 <strong style={{ color: '#e2e8f0' }}>팬아웃(fan-out)</strong>을 높여 트리 높이를 더욱 낮춥니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">🔗</span>
                <span><strong style={{ color: '#e2e8f0' }}>범위 검색의 핵심 — 리프 연결 리스트:</strong> <code style={{ color: '#06b6d4' }}>WHERE price BETWEEN 100 AND 500</code> 같은 범위 쿼리 시, 시작 리프를 찾은 뒤 연결 리스트를 따라 <strong style={{ color: '#06b6d4' }}>순차 탐색</strong>만 하면 됩니다. B-Tree는 매번 트리를 다시 타야 합니다.</span>
              </div>
            </div>
          </div>

          {/* RDBMS에서 B+Tree를 표준으로 채택한 이유 */}
          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#22c55e' }}>왜 RDBMS는 B+Tree를 표준으로 선택했는가?</span></div>
            <div className="ix-param-grid">
              <div className="ix-param">
                <div className="ix-param-name" style={{ color: '#06b6d4' }}>낮은 트리 높이 = 적은 디스크 I/O</div>
                <div className="ix-param-desc">
                  InnoDB 페이지(16KB) 기준, 내부 노드 하나에 약 <strong style={{ color: '#e2e8f0' }}>1,000개 이상의 키</strong>를 저장합니다. 높이 3의 B+Tree로 <strong style={{ color: '#e2e8f0' }}>약 10억 건</strong>의 데이터를 커버할 수 있어, 어떤 데이터든 3~4번의 디스크 I/O로 찾습니다.
                </div>
                <div className="ix-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>높이 3~4</div>
              </div>
              <div className="ix-param">
                <div className="ix-param-name" style={{ color: '#3b82f6' }}>디스크 페이지 단위에 최적화</div>
                <div className="ix-param-desc">
                  디스크는 바이트 단위가 아닌 <strong style={{ color: '#e2e8f0' }}>페이지 단위(4KB~16KB)</strong>로 읽습니다. B+Tree 노드 크기를 디스크 페이지 크기에 맞추면, 한 번의 I/O로 노드 하나를 통째로 읽어 탐색합니다.
                </div>
                <div className="ix-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>페이지 정렬</div>
              </div>
              <div className="ix-param">
                <div className="ix-param-name" style={{ color: '#22c55e' }}>범위 검색 & ORDER BY 성능</div>
                <div className="ix-param-desc">
                  리프 노드 간 연결 리스트 덕분에 범위 검색, <strong style={{ color: '#e2e8f0' }}>정렬(ORDER BY), 그룹핑(GROUP BY)</strong>이 효율적입니다. SQL의 핵심 연산들이 B+Tree와 자연스럽게 맞아떨어집니다.
                </div>
                <div className="ix-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>순차 접근</div>
              </div>
              <div className="ix-param">
                <div className="ix-param-name" style={{ color: '#a855f7' }}>균일한 탐색 성능</div>
                <div className="ix-param-desc">
                  모든 데이터가 리프에 있으므로 <strong style={{ color: '#e2e8f0' }}>어떤 키를 검색해도 동일한 깊이</strong>를 탐색합니다. 성능 예측이 가능하여 옵티마이저가 정확한 비용 산정을 할 수 있습니다.
                </div>
                <div className="ix-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>O(log N) 보장</div>
              </div>
            </div>
          </div>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> "왜 Hash가 아니라 B+Tree인가요?"에 대한 답변 핵심: Hash 인덱스는 등호(=) 검색만 O(1)이고, <strong>범위 검색·정렬·부분 일치가 불가능</strong>합니다. DB 워크로드의 대부분은 범위 쿼리와 정렬을 포함하므로 B+Tree가 범용적으로 훨씬 유리합니다.
          </HighlightBox>

          {/* B+Tree 구조 시각화 */}
          <DiagramContainer title="B+Tree 구조 — 리프 노드만 실제 데이터 포인터 보유">
            <div className="ix-bt">
              {/* Root */}
              <div className="ix-bt-row">
                <div className="ix-bt-node root"><span>30</span><span>60</span><span>90</span></div>
              </div>

              {/* Root → Internal → Leaf (하나의 fork 안에 통합: 끊김 없는 연결) */}
              <div className="ix-bt-fork">
                <div className="ix-bt-fork-ch">
                  <div className="ix-bt-node int"><span>10</span><span>20</span></div>
                  <div className="ix-bt-mid-conn" />
                  <div className="ix-bt-leaf-wrap">
                    <div className="ix-bt-node lf"><span>10</span><span>20</span><span>30</span></div>
                  </div>
                  <div className="ix-bt-ptr-group" style={{ marginTop: '4px' }}>
                    {[0, 1, 2].map((j) => (
                      <div key={j} className="ix-bt-ptr">
                        <div className="ix-bt-ptr-line" />
                        <div className="ix-bt-ptr-dot" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ix-bt-fork-ch">
                  <div className="ix-bt-node int"><span>40</span><span>50</span></div>
                  <div className="ix-bt-mid-conn" />
                  <div className="ix-bt-leaf-wrap">
                    <div className="ix-bt-node lf"><span>40</span><span>50</span><span>60</span></div>
                  </div>
                  <div className="ix-bt-ptr-group" style={{ marginTop: '4px' }}>
                    {[0, 1, 2].map((j) => (
                      <div key={j} className="ix-bt-ptr">
                        <div className="ix-bt-ptr-line" />
                        <div className="ix-bt-ptr-dot" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ix-bt-fork-ch">
                  <div className="ix-bt-node int"><span>70</span><span>80</span></div>
                  <div className="ix-bt-mid-conn" />
                  <div className="ix-bt-leaf-wrap">
                    <div className="ix-bt-node lf"><span>70</span><span>80</span><span>90</span></div>
                  </div>
                  <div className="ix-bt-ptr-group" style={{ marginTop: '4px' }}>
                    {[0, 1, 2].map((j) => (
                      <div key={j} className="ix-bt-ptr">
                        <div className="ix-bt-ptr-line" />
                        <div className="ix-bt-ptr-dot" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="ix-bt-ptr-label">↑ 실제 데이터(행) 포인터</div>

              {/* 범례 */}
              <div className="ix-bt-legend">
                <div className="ix-bt-legend-item">
                  <div className="ix-bt-legend-dot" style={{ borderColor: '#06b6d4', background: 'rgba(6,182,212,0.15)' }} />
                  Root
                </div>
                <div className="ix-bt-legend-item">
                  <div className="ix-bt-legend-dot" style={{ borderColor: '#3b82f6', background: 'rgba(59,130,246,0.15)' }} />
                  내부 노드
                </div>
                <div className="ix-bt-legend-item">
                  <div className="ix-bt-legend-dot" style={{ borderColor: '#22c55e', background: 'rgba(34,197,94,0.15)' }} />
                  리프 노드
                </div>
                <div className="ix-bt-legend-item">
                  <span style={{ color: '#a855f7', fontWeight: 700 }}>→</span>
                  연결 리스트
                </div>
                <div className="ix-bt-legend-item">
                  <div className="ix-bt-legend-dot" style={{ borderColor: '#f59e0b', background: 'rgba(245,158,11,0.15)', borderRadius: '50%' }} />
                  데이터 포인터
                </div>
              </div>
            </div>
          </DiagramContainer>

          <div className="ix-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#06b6d4' }}>B+Tree vs B-Tree 핵심 차이</span></div>
            <div className="ix-table-wrap">
              <table className="ix-table">
                <thead>
                  <tr>
                    <th>구분</th>
                    <th style={{ color: '#f59e0b' }}>B-Tree</th>
                    <th style={{ color: '#06b6d4' }}>B+Tree</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>데이터 위치</strong></td>
                    <td>모든 노드에 데이터 저장</td>
                    <td>리프 노드에만 데이터 저장</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>리프 노드 연결</strong></td>
                    <td>연결 없음</td>
                    <td>연결 리스트로 연결 (Linked List)</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>범위 검색</strong></td>
                    <td>트리 재탐색 필요</td>
                    <td>리프 노드 순차 탐색 (매우 빠름)</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>내부 노드 크기</strong></td>
                    <td>데이터 포함으로 큼</td>
                    <td>키만 보유하여 작음 → 더 많은 키 저장 가능</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>탐색 성능</strong></td>
                    <td>불균일 (루트 근처 데이터가 빠름)</td>
                    <td>균일 (항상 리프까지 탐색)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* B+Tree 검색 과정 */}
          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#22c55e' }}>B+Tree 검색 과정 — WHERE id = 50</span></div>
            <div className="ix-step-list">
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>1</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#3b82f6' }}>Root 노드 탐색:</strong> 50은 30보다 크고 60보다 작으므로 → 두 번째 자식 포인터를 따라감
                </div>
              </div>
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>2</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#06b6d4' }}>내부 노드 탐색:</strong> 해당 내부 노드에서 다시 비교하여 리프 노드로 이동
                </div>
              </div>
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>3</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#22c55e' }}>리프 노드 도달:</strong> [40, 50, 60] 리프 노드에서 50을 찾고, 해당 데이터의 물리적 위치(Row Pointer)로 이동하여 데이터를 반환합니다. 총 <strong style={{ color: '#e2e8f0' }}>2~3번의 디스크 I/O</strong>로 완료.
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#3b82f6">
            <strong>면접 포인트:</strong> B+Tree의 높이는 보통 3~4 수준입니다. InnoDB의 페이지 크기(16KB) 기준, 3단계 B+Tree는 약 <strong>수억 건</strong>의 데이터를 커버할 수 있습니다. 즉, 어떤 데이터든 최대 3~4번의 디스크 I/O로 찾을 수 있다는 뜻입니다.
          </HighlightBox>
        </div>

        {/* ── 클러스터드 vs 논클러스터드 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>클러스터드 vs 논클러스터드 인덱스</SectionTitle>

          {/* InnoDB 인덱스 구조 설명 */}
          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#06b6d4' }}>InnoDB의 인덱스 구조</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">📦</span>
                <span><strong style={{ color: '#e2e8f0' }}>InnoDB에서는 모든 테이블이 곧 클러스터드 인덱스입니다:</strong> InnoDB는 테이블 데이터를 <strong style={{ color: '#06b6d4' }}>PK를 기준으로 정렬된 B+Tree</strong>로 저장합니다. 즉, 테이블 자체가 하나의 거대한 B+Tree이며, PK가 곧 클러스터드 인덱스입니다. PK를 명시하지 않으면 InnoDB가 내부적으로 숨겨진 <code style={{ color: '#06b6d4' }}>ROW_ID</code> 컬럼을 만들어 클러스터드 인덱스로 사용합니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">🔖</span>
                <span><strong style={{ color: '#e2e8f0' }}>세컨더리 인덱스(Secondary Index)란?</strong> PK 이외의 컬럼에 생성하는 <strong style={{ color: '#a855f7' }}>모든 인덱스</strong>를 세컨더리 인덱스라 부릅니다. <code style={{ color: '#a855f7' }}>CREATE INDEX idx_name ON users(name)</code>처럼 생성하며, 별도의 B+Tree를 만듭니다. 핵심은 <strong style={{ color: '#f59e0b' }}>세컨더리 인덱스의 리프 노드에는 행의 물리 주소가 아닌 PK 값이 저장</strong>된다는 점입니다.</span>
              </div>
              <div className="ix-feature-row">
                <span className="ix-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>왜 PK를 저장하는가?</strong> 만약 물리 주소를 저장하면 클러스터드 인덱스가 재정렬(페이지 분할 등)될 때마다 <strong style={{ color: '#f59e0b' }}>모든 세컨더리 인덱스의 포인터를 갱신</strong>해야 합니다. PK 값을 저장하면 물리 위치가 변해도 세컨더리 인덱스는 수정할 필요가 없습니다. 대신 조회 시 <strong style={{ color: '#e2e8f0' }}>PK로 클러스터드 인덱스를 한번 더 탐색</strong>하는 비용이 생깁니다.</span>
              </div>
            </div>
          </div>

          <div className="ix-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="ix-section-box">
              <div className="ix-section-subtitle"><span style={{ color: '#06b6d4' }}>클러스터드 인덱스 (Clustered)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">📚</span>
                  <span>데이터가 인덱스 키 순서대로 <strong style={{ color: '#e2e8f0' }}>물리적으로 정렬</strong>되어 저장됩니다. 사전처럼 ㄱ-ㅎ 순서대로 데이터 자체가 배열됩니다.</span>
                </div>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">1️⃣</span>
                  <span>테이블당 <strong style={{ color: '#06b6d4' }}>1개만</strong> 존재 가능 (물리적 정렬 순서는 하나뿐)</span>
                </div>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">🔑</span>
                  <span>PK 생성 시 <strong style={{ color: '#06b6d4' }}>자동 생성</strong> (InnoDB 기준)</span>
                </div>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">🚀</span>
                  <span>리프 노드 = <strong style={{ color: '#06b6d4' }}>데이터 페이지 자체</strong> → 별도 룩업 불필요</span>
                </div>
              </div>
            </div>
            <div className="ix-section-box">
              <div className="ix-section-subtitle"><span style={{ color: '#a855f7' }}>논클러스터드 인덱스 (Non-Clustered)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">🔖</span>
                  <span>인덱스와 데이터가 <strong style={{ color: '#e2e8f0' }}>별도 공간</strong>에 저장됩니다. 책 뒤편의 색인 페이지처럼 인덱스가 데이터 위치를 가리킵니다.</span>
                </div>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">♾️</span>
                  <span>테이블당 <strong style={{ color: '#a855f7' }}>여러 개</strong> 생성 가능</span>
                </div>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">🔗</span>
                  <span>리프 노드에 <strong style={{ color: '#a855f7' }}>PK 값(또는 Row Pointer)</strong>을 저장</span>
                </div>
                <div className="ix-feature-row">
                  <span className="ix-feature-icon">🔄</span>
                  <span>데이터 접근 시 <strong style={{ color: '#f59e0b' }}>클러스터드 인덱스를 한번 더 탐색</strong> (InnoDB 기준)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 클러스터드 vs 논클러스터드 구조 시각화 */}
          <div className="ix-ci-wrap">
            {/* ── 클러스터드 인덱스 ── */}
            <div className="ix-ci-box">
              <div className="ix-ci-title" style={{ color: '#06b6d4' }}>클러스터드 인덱스 (PK)</div>
              <div className="ix-ci-tree">
                {/* Root */}
                <div className="ix-ci-node" style={{ border: '1.5px solid #06b6d4', background: 'rgba(6,182,212,0.08)', color: '#06b6d4' }}>
                  <span>30</span><span>60</span>
                </div>
                <div className="ix-ci-stem" />
                {/* H-bar */}
                <div className="ix-ci-hbar" style={{ width: '60%' }} />
                {/* Branches → Data pages */}
                <div className="ix-ci-branches" style={{ width: '80%' }}>
                  <div className="ix-ci-branch">
                    <div className="ix-ci-data" style={{ borderColor: '#06b6d4' }}>
                      <div className="ix-ci-data-label" style={{ color: '#06b6d4' }}>데이터 페이지 1</div>
                      <div className="ix-ci-data-row"><span className="ix-ci-data-pk" style={{ color: '#06b6d4' }}>PK=10</span> 김철수</div>
                      <div className="ix-ci-data-row"><span className="ix-ci-data-pk" style={{ color: '#06b6d4' }}>PK=20</span> 이영희</div>
                      <div className="ix-ci-data-row"><span className="ix-ci-data-pk" style={{ color: '#06b6d4' }}>PK=30</span> 박지훈</div>
                    </div>
                  </div>
                  <div className="ix-ci-branch">
                    <div className="ix-ci-data" style={{ borderColor: '#06b6d4' }}>
                      <div className="ix-ci-data-label" style={{ color: '#06b6d4' }}>데이터 페이지 2</div>
                      <div className="ix-ci-data-row"><span className="ix-ci-data-pk" style={{ color: '#06b6d4' }}>PK=40</span> 박영희</div>
                      <div className="ix-ci-data-row"><span className="ix-ci-data-pk" style={{ color: '#06b6d4' }}>PK=50</span> 최민수</div>
                      <div className="ix-ci-data-row"><span className="ix-ci-data-pk" style={{ color: '#06b6d4' }}>PK=60</span> 정수진</div>
                    </div>
                  </div>
                </div>
                <div className="ix-ci-badge" style={{ background: 'rgba(6,182,212,0.12)', color: '#06b6d4' }}>리프 = 데이터 페이지</div>
                <div className="ix-ci-caption">
                  데이터가 PK 순서로 <strong style={{ color: '#06b6d4' }}>물리적으로 정렬</strong><br />
                  별도 룩업 없이 바로 데이터 접근
                </div>
              </div>
            </div>

            {/* ── 논클러스터드 인덱스 ── */}
            <div className="ix-ci-box">
              <div className="ix-ci-title" style={{ color: '#a855f7' }}>논클러스터드 인덱스 (name)</div>
              <div className="ix-ci-tree">
                {/* Root */}
                <div className="ix-ci-node" style={{ border: '1.5px solid #a855f7', background: 'rgba(168,85,247,0.08)', color: '#a855f7' }}>
                  <span>김</span><span>박</span>
                </div>
                <div className="ix-ci-stem" />
                <div className="ix-ci-hbar" style={{ width: '60%' }} />
                {/* Branches → PK pointer leaves */}
                <div className="ix-ci-branches" style={{ width: '80%' }}>
                  <div className="ix-ci-branch">
                    <div className="ix-ci-ptr" style={{ borderColor: '#a855f7' }}>
                      <div className="ix-ci-ptr-label" style={{ color: '#a855f7' }}>리프 노드</div>
                      <div className="ix-ci-ptr-row">김철수 <span className="ix-ci-ptr-arrow" style={{ color: '#f59e0b' }}>→</span> <span style={{ color: '#f59e0b' }}>PK:10</span></div>
                      <div className="ix-ci-ptr-row">김민재 <span className="ix-ci-ptr-arrow" style={{ color: '#f59e0b' }}>→</span> <span style={{ color: '#f59e0b' }}>PK:35</span></div>
                    </div>
                  </div>
                  <div className="ix-ci-branch">
                    <div className="ix-ci-ptr" style={{ borderColor: '#a855f7' }}>
                      <div className="ix-ci-ptr-label" style={{ color: '#a855f7' }}>리프 노드</div>
                      <div className="ix-ci-ptr-row">박영희 <span className="ix-ci-ptr-arrow" style={{ color: '#f59e0b' }}>→</span> <span style={{ color: '#f59e0b' }}>PK:40</span></div>
                      <div className="ix-ci-ptr-row">박지훈 <span className="ix-ci-ptr-arrow" style={{ color: '#f59e0b' }}>→</span> <span style={{ color: '#f59e0b' }}>PK:30</span></div>
                    </div>
                  </div>
                </div>
                {/* Lookup arrow */}
                <div className="ix-ci-lookup">
                  <span style={{ color: '#f59e0b', fontSize: '14px' }}>↓</span>
                  <span className="ix-ci-lookup-text" style={{ color: '#f59e0b' }}>PK로 클러스터드 인덱스 재탐색</span>
                  <span style={{ color: '#f59e0b', fontSize: '14px' }}>↓</span>
                </div>
                {/* Simplified clustered index target */}
                <div className="ix-ci-data" style={{ borderColor: '#06b6d4', maxWidth: '200px' }}>
                  <div className="ix-ci-data-label" style={{ color: '#06b6d4' }}>클러스터드 인덱스</div>
                  <div className="ix-ci-data-row"><span className="ix-ci-data-pk" style={{ color: '#06b6d4' }}>PK=40</span> 박영희 전체 행 데이터</div>
                </div>
                <div className="ix-ci-badge" style={{ background: 'rgba(168,85,247,0.12)', color: '#a855f7' }}>리프 = PK 포인터</div>
                <div className="ix-ci-caption">
                  리프에 <strong style={{ color: '#a855f7' }}>PK 값</strong>만 저장<br />
                  실제 데이터는 <strong style={{ color: '#f59e0b' }}>클러스터드 인덱스를 한번 더</strong> 탐색
                </div>
              </div>
            </div>
          </div>

          {/* 세컨더리 인덱스 룩업 다이어그램 */}
          <DiagramContainer title="InnoDB 세컨더리 인덱스 조회 흐름">
            <DiagramFlow>
              <DiagramNode icon="🔍" label="WHERE name='김철수'" sub="쿼리 실행" color="#3b82f6" />
              <DiagramArrow label="1. 세컨더리 인덱스 탐색" color="#a855f7" animated />
              <DiagramGroup label="세컨더리 인덱스 (name)" color="#a855f7">
                <DiagramNode icon="🔖" label="'김철수' → PK:3" sub="리프에 PK 저장" color="#a855f7" />
              </DiagramGroup>
              <DiagramArrow label="2. PK로 클러스터드 인덱스 재탐색" color="#06b6d4" animated />
              <DiagramGroup label="클러스터드 인덱스 (PK)" color="#06b6d4">
                <DiagramNode icon="📄" label="PK:3 → 실제 행 데이터" sub="리프 = 데이터" color="#06b6d4" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> InnoDB에서 세컨더리 인덱스의 리프 노드에는 행의 물리 주소가 아닌 <strong>PK 값</strong>이 저장됩니다. 따라서 세컨더리 인덱스로 조회하면 반드시 클러스터드 인덱스를 한번 더 타야 합니다. 이 추가 탐색을 피하려면 <strong>커버링 인덱스</strong>를 활용합니다.
          </HighlightBox>
        </div>

        {/* ── 인덱스 종류 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>인덱스 종류</SectionTitle>

          <div className="ix-param-grid" style={{ marginBottom: '20px' }}>
            <div className="ix-param">
              <div className="ix-param-name" style={{ color: '#06b6d4' }}>Unique Index</div>
              <div className="ix-param-desc">
                인덱스 키 값의 <strong style={{ color: '#e2e8f0' }}>중복을 허용하지 않는</strong> 인덱스. PK와 Unique 제약조건에 자동 생성됩니다. 등호(=) 검색 시 하나의 결과만 보장하므로 옵티마이저가 효율적 계획을 수립합니다.
              </div>
              <div className="ix-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>중복 불가</div>
            </div>
            <div className="ix-param">
              <div className="ix-param-name" style={{ color: '#3b82f6' }}>Composite Index (복합 인덱스)</div>
              <div className="ix-param-desc">
                <strong style={{ color: '#e2e8f0' }}>2개 이상의 컬럼</strong>을 묶어 하나의 인덱스로 생성합니다. 컬럼 순서가 매우 중요하며, <strong style={{ color: '#f59e0b' }}>왼쪽 컬럼부터 순서대로</strong> 사용해야 인덱스를 탈 수 있습니다 (Leftmost Prefix Rule).
              </div>
              <div className="ix-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>컬럼 순서 중요</div>
            </div>
            <div className="ix-param">
              <div className="ix-param-name" style={{ color: '#22c55e' }}>Covering Index (커버링 인덱스)</div>
              <div className="ix-param-desc">
                쿼리에 필요한 <strong style={{ color: '#e2e8f0' }}>모든 컬럼이 인덱스에 포함</strong>되어 테이블 데이터에 접근하지 않고 인덱스만으로 결과를 반환합니다. EXPLAIN에서 <code style={{ color: '#22c55e' }}>Using index</code>로 표시됩니다.
              </div>
              <div className="ix-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>테이블 접근 불필요</div>
            </div>
            <div className="ix-param">
              <div className="ix-param-name" style={{ color: '#a855f7' }}>Hash Index</div>
              <div className="ix-param-desc">
                해시 함수를 사용하여 <strong style={{ color: '#e2e8f0' }}>등호(=) 검색에 O(1)</strong> 성능을 제공합니다. 범위 검색, 정렬, 부분 일치 검색은 불가능합니다. Memory 엔진에서 주로 사용됩니다.
              </div>
              <div className="ix-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>등호 검색 전용</div>
            </div>
            <div className="ix-param">
              <div className="ix-param-name" style={{ color: '#f59e0b' }}>Full-Text Index</div>
              <div className="ix-param-desc">
                텍스트 검색에 특화된 인덱스. 역인덱스(Inverted Index) 구조를 사용하여 <strong style={{ color: '#e2e8f0' }}>단어 기반 검색</strong>을 수행합니다. LIKE '%keyword%' 대신 MATCH AGAINST를 사용합니다.
              </div>
              <div className="ix-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>텍스트 검색</div>
            </div>
            <div className="ix-param">
              <div className="ix-param-name" style={{ color: '#ef4444' }}>Partial Index (부분 인덱스)</div>
              <div className="ix-param-desc">
                테이블의 <strong style={{ color: '#e2e8f0' }}>일부 행에만</strong> 인덱스를 생성합니다. PostgreSQL의 WHERE 절 인덱스가 대표적이며, 인덱스 크기를 줄이고 쓰기 성능을 개선합니다.
              </div>
              <div className="ix-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>조건부 인덱스</div>
            </div>
          </div>

          {/* 복합 인덱스 Leftmost Prefix */}
          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-section-subtitle"><span style={{ color: '#3b82f6' }}>복합 인덱스 — Leftmost Prefix Rule</span></div>
            <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '16px' }}>
              복합 인덱스 <code style={{ color: '#3b82f6' }}>INDEX(a, b, c)</code>가 있을 때, 인덱스를 사용할 수 있는 경우:
            </p>
            <div className="ix-table-wrap">
              <table className="ix-table">
                <thead>
                  <tr>
                    <th>WHERE 조건</th>
                    <th>인덱스 사용</th>
                    <th>이유</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>WHERE a = 1</code></td>
                    <td><strong style={{ color: '#22c55e' }}>O</strong></td>
                    <td>첫 번째 컬럼 사용</td>
                  </tr>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>WHERE a = 1 AND b = 2</code></td>
                    <td><strong style={{ color: '#22c55e' }}>O</strong></td>
                    <td>왼쪽부터 순서대로</td>
                  </tr>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>WHERE a = 1 AND b = 2 AND c = 3</code></td>
                    <td><strong style={{ color: '#22c55e' }}>O</strong></td>
                    <td>전체 컬럼 사용</td>
                  </tr>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>WHERE b = 2</code></td>
                    <td><strong style={{ color: '#ef4444' }}>X</strong></td>
                    <td>첫 번째 컬럼(a) 누락</td>
                  </tr>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>WHERE a = 1 AND c = 3</code></td>
                    <td><strong style={{ color: '#f59e0b' }}>△</strong></td>
                    <td>a만 인덱스, c는 필터링</td>
                  </tr>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>WHERE b = 2 AND c = 3</code></td>
                    <td><strong style={{ color: '#ef4444' }}>X</strong></td>
                    <td>첫 번째 컬럼(a) 누락</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> 복합 인덱스 설계 시 <strong>카디널리티(선택도)가 높은 컬럼을 앞에</strong> 배치합니다. 또한 <strong>등호(=) 조건 컬럼을 앞에, 범위 조건 컬럼을 뒤에</strong> 놓아야 인덱스 활용도가 높아집니다. 예: INDEX(status, created_at)보다 INDEX(user_id, created_at)이 보통 더 효율적입니다.
          </HighlightBox>
        </div>

        {/* ── 인덱스가 동작하지 않는 경우 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>인덱스가 동작하지 않는 경우</SectionTitle>

          <div className="ix-warn-grid" style={{ marginBottom: '20px' }}>
            <div className="ix-warn-card">
              <span className="ix-warn-icon">🚫</span>
              <div>
                <div className="ix-warn-label">인덱스 컬럼에 함수/연산 적용</div>
                <div className="ix-warn-desc">
                  <code style={{ color: '#ef4444' }}>WHERE YEAR(created_at) = 2026</code><br />
                  → <code style={{ color: '#22c55e' }}>WHERE created_at {'>'}= '2026-01-01' AND created_at {'<'} '2027-01-01'</code>
                </div>
              </div>
            </div>
            <div className="ix-warn-card">
              <span className="ix-warn-icon">🚫</span>
              <div>
                <div className="ix-warn-label">암묵적 타입 변환</div>
                <div className="ix-warn-desc">
                  <code style={{ color: '#ef4444' }}>WHERE phone = 01012345678</code> (문자열 컬럼에 숫자 비교)<br />
                  → <code style={{ color: '#22c55e' }}>WHERE phone = '01012345678'</code>
                </div>
              </div>
            </div>
            <div className="ix-warn-card">
              <span className="ix-warn-icon">🚫</span>
              <div>
                <div className="ix-warn-label">LIKE '%패턴' (앞쪽 와일드카드)</div>
                <div className="ix-warn-desc">
                  <code style={{ color: '#ef4444' }}>WHERE name LIKE '%철수'</code><br />
                  → Full-Text Index 또는 역인덱스 활용 필요
                </div>
              </div>
            </div>
            <div className="ix-warn-card">
              <span className="ix-warn-icon">🚫</span>
              <div>
                <div className="ix-warn-label">OR 조건 (일부 경우)</div>
                <div className="ix-warn-desc">
                  <code style={{ color: '#ef4444' }}>WHERE a = 1 OR b = 2</code> (각각 다른 인덱스)<br />
                  → 각 조건별 인덱스 + UNION으로 분리 검토
                </div>
              </div>
            </div>
            <div className="ix-warn-card">
              <span className="ix-warn-icon">🚫</span>
              <div>
                <div className="ix-warn-label">NOT, {'!='}, IS NOT NULL</div>
                <div className="ix-warn-desc">
                  부정 조건은 대부분 인덱스를 활용하기 어렵습니다. 옵티마이저가 Full Scan이 더 효율적이라 판단할 수 있습니다.
                </div>
              </div>
            </div>
            <div className="ix-warn-card">
              <span className="ix-warn-icon">🚫</span>
              <div>
                <div className="ix-warn-label">낮은 카디널리티</div>
                <div className="ix-warn-desc">
                  <code style={{ color: '#ef4444' }}>WHERE gender = 'M'</code> (전체의 50%)<br />
                  → 옵티마이저가 Full Scan 선택 (인덱스 이득 없음)
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> "인덱스를 걸었는데 왜 안 타나요?"는 매우 빈출 질문입니다. 핵심은 <strong>인덱스 컬럼을 가공하면 안 된다</strong>는 것입니다. 함수 적용, 타입 불일치, 앞쪽 와일드카드가 대표적 원인이며, <code>EXPLAIN</code>으로 실행 계획을 확인하는 것이 첫 단계입니다.
          </HighlightBox>
        </div>

        {/* ── 인덱스 설계 전략 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#22c55e']}>인덱스 설계 전략</SectionTitle>

          <div className="ix-section-box" style={{ marginBottom: '20px' }}>
            <div className="ix-step-list">
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#06b6d4' }}>WHERE 절 기준으로 설계:</strong> 자주 사용하는 검색 조건의 컬럼에 인덱스를 생성합니다. SELECT 컬럼이 아닌 <strong style={{ color: '#e2e8f0' }}>WHERE, JOIN, ORDER BY</strong>에 사용되는 컬럼이 우선입니다.
                </div>
              </div>
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>2</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#3b82f6' }}>카디널리티 고려:</strong> 유니크한 값이 많은(카디널리티가 높은) 컬럼이 인덱스 효율이 좋습니다. <code style={{ color: '#3b82f6' }}>user_id</code>(높음) vs <code style={{ color: '#ef4444' }}>gender</code>(낮음).
                </div>
              </div>
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>3</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#a855f7' }}>복합 인덱스 활용:</strong> 여러 컬럼을 조합하여 하나의 복합 인덱스로 만들면 개별 인덱스 여러 개보다 효율적입니다. 등호 조건 → 범위 조건 순서로 배치합니다.
                </div>
              </div>
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>4</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#22c55e' }}>커버링 인덱스 검토:</strong> 자주 실행되는 쿼리에서 SELECT하는 컬럼까지 인덱스에 포함하면 테이블 접근 없이 결과를 반환할 수 있어 큰 성능 향상을 얻습니다.
                </div>
              </div>
              <div className="ix-step">
                <div className="ix-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>5</div>
                <div className="ix-step-content">
                  <strong style={{ color: '#f59e0b' }}>과도한 인덱스 지양:</strong> 테이블당 인덱스 개수는 쓰기 성능과 균형을 맞춰야 합니다. 사용하지 않는 인덱스는 주기적으로 정리합니다. <code style={{ color: '#f59e0b' }}>sys.schema_unused_indexes</code>(MySQL)로 확인 가능합니다.
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> 실무에서는 <strong>슬로우 쿼리 로그 → EXPLAIN 분석 → 인덱스 추가/변경 → 효과 측정</strong>의 사이클을 반복합니다. 인덱스 추가 전후의 실행 계획과 응답 시간을 비교하여 효과를 정량적으로 검증하는 과정을 설명할 수 있으면 좋습니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: '인덱스의 자료구조로 왜 B+Tree를 사용하나요? Hash나 이진 탐색 트리가 아닌 이유는?',
                a: 'Hash는 등호(=) 검색만 O(1)이고 범위 검색, 정렬이 불가능합니다. 이진 탐색 트리(BST)는 편향될 수 있고, 디스크 I/O 관점에서 노드 하나당 키가 하나뿐이라 트리 높이가 높아집니다. B+Tree는 하나의 노드에 다수의 키를 저장해 트리 높이를 낮추고, 리프 노드 간 연결 리스트로 범위 검색이 매우 빠르며, 디스크 페이지 단위 I/O에 최적화되어 있습니다.',
              },
              {
                q: '클러스터드 인덱스와 논클러스터드 인덱스의 차이를 설명해주세요.',
                a: '클러스터드 인덱스는 데이터가 인덱스 키 순서로 물리적으로 정렬되며, 리프 노드가 데이터 페이지 자체입니다. 테이블당 1개만 존재합니다(보통 PK). 논클러스터드 인덱스는 별도의 인덱스 구조에 키와 PK값(InnoDB)을 저장하며, 데이터 접근 시 클러스터드 인덱스를 한번 더 타야 합니다. 이 추가 탐색을 피하려면 커버링 인덱스를 활용합니다.',
              },
              {
                q: '복합 인덱스에서 컬럼 순서가 중요한 이유는?',
                a: 'B+Tree는 왼쪽 컬럼부터 정렬되므로 Leftmost Prefix Rule이 적용됩니다. INDEX(a, b, c)에서 a 없이 b만으로 검색하면 인덱스를 탈 수 없습니다. 설계 시 등호(=) 조건 컬럼을 앞에, 범위 조건 컬럼을 뒤에 배치하고, 카디널리티가 높은 컬럼을 우선 배치하는 것이 좋습니다.',
              },
              {
                q: '커버링 인덱스란 무엇이고, 왜 성능이 좋은가요?',
                a: '쿼리에 필요한 모든 컬럼이 인덱스에 포함되어 테이블 데이터 페이지에 접근하지 않고 인덱스만으로 결과를 반환하는 것입니다. InnoDB에서 세컨더리 인덱스 조회 시 발생하는 클러스터드 인덱스 재탐색(랜덤 I/O)을 완전히 제거하므로 큰 성능 향상이 있습니다. EXPLAIN에서 Extra 컬럼에 "Using index"로 확인할 수 있습니다.',
              },
              {
                q: '인덱스를 걸었는데 쿼리에서 사용되지 않는 이유는?',
                a: '대표적으로 ①인덱스 컬럼에 함수/연산 적용(WHERE YEAR(date)=2026), ②암묵적 타입 변환(문자열 컬럼에 숫자 비교), ③LIKE 앞쪽 와일드카드(%keyword), ④낮은 카디널리티로 옵티마이저가 Full Scan 선택, ⑤복합 인덱스에서 Leftmost Prefix 미충족 등이 있습니다. EXPLAIN으로 실행 계획을 확인하는 것이 진단의 첫 단계입니다.',
              },
              {
                q: '인덱스가 많으면 어떤 문제가 발생하나요?',
                a: '①INSERT/UPDATE/DELETE 시 모든 관련 인덱스를 갱신해야 하므로 쓰기 성능이 저하됩니다. ②인덱스마다 B+Tree를 유지하므로 디스크 공간이 증가합니다. ③옵티마이저가 여러 인덱스 중 최적 선택을 판단하는 비용이 증가합니다. 실무에서는 사용되지 않는 인덱스를 주기적으로 모니터링하고 정리해야 합니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

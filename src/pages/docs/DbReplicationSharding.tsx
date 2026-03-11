import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'

const CSS = `
.drs-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.drs-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.drs-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.drs-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.drs-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.drs-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.drs-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.drs-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.drs-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.drs-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.drs-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.drs-param:hover { transform:translateY(-3px); }
.drs-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.drs-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.drs-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.drs-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.drs-table { width:100%; border-collapse:collapse; font-size:12px; }
.drs-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.drs-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.drs-table tr:last-child td { border-bottom:none; }
.drs-step-list { display:flex; flex-direction:column; gap:10px; }
.drs-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.drs-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.drs-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.drs-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .drs-compare-grid{ grid-template-columns:1fr; } }
`

export default function DbReplicationSharding() {
  useInjectCSS('style-db-replication-sharding', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Replication · Sharding · Partitioning · 읽기/쓰기 분리 · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>DB 레플리케이션</span> & 샤딩</>}
          description="Master-Slave 복제, 읽기/쓰기 분리, 동기/비동기 복제, 수평·수직 파티셔닝, 샤딩 키 설계 전략"
        />

        {/* ── 레플리케이션이란 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>레플리케이션 (Replication)</SectionTitle>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#06b6d4' }}>정의</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>레플리케이션</strong>은 하나의 데이터베이스 서버(원본)의 데이터를 다른 서버(복제본)로 <strong style={{ color: '#06b6d4' }}>실시간 복제</strong>하는 기술입니다. 가용성, 읽기 성능, 장애 복구(Failover) 능력을 향상시킵니다.</span>
              </div>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">🎯</span>
                <span><strong style={{ color: '#e2e8f0' }}>핵심 목적</strong>: ①<strong style={{ color: '#22c55e' }}>고가용성(HA)</strong> — 장애 시 Replica가 승격하여 서비스 지속, ②<strong style={{ color: '#3b82f6' }}>읽기 성능 향상</strong> — 읽기 트래픽을 Replica에 분산, ③<strong style={{ color: '#a855f7' }}>데이터 백업</strong> — 복제본을 백업 용도로 활용</span>
              </div>
            </div>
          </div>

          <div className="drs-param-grid" style={{ marginBottom: '20px' }}>
            <div className="drs-param">
              <div className="drs-param-name" style={{ color: '#06b6d4' }}>Master (Source)</div>
              <div className="drs-param-desc">
                모든 <strong style={{ color: '#e2e8f0' }}>쓰기(INSERT/UPDATE/DELETE)</strong>를 처리하는 원본 서버입니다. 변경 사항을 바이너리 로그(Binlog)에 기록하고 Replica로 전달합니다.
              </div>
              <div className="drs-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>Write 담당</div>
            </div>
            <div className="drs-param">
              <div className="drs-param-name" style={{ color: '#22c55e' }}>Replica (Slave)</div>
              <div className="drs-param-desc">
                Master의 데이터를 복제받아 <strong style={{ color: '#e2e8f0' }}>읽기(SELECT)</strong> 트래픽을 처리합니다. 여러 대를 두어 읽기 부하를 분산할 수 있습니다.
              </div>
              <div className="drs-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Read 담당</div>
            </div>
          </div>

          {/* Master-Slave 아키텍처 다이어그램 */}
          <DiagramContainer title="Master-Slave 레플리케이션 아키텍처">
            <DiagramFlow>
              <DiagramNode icon="✏️" label="Application" sub="Write + Read" color="#f59e0b" />
              <DiagramArrow label="Write" color="#06b6d4" animated />
              <DiagramGroup label="Master" color="#06b6d4">
                <DiagramNode icon="🗄️" label="Primary DB" sub="INSERT / UPDATE / DELETE" color="#06b6d4" />
              </DiagramGroup>
              <DiagramArrow label="Binlog 복제" color="#22c55e" animated />
              <DiagramGroup label="Replicas" color="#22c55e">
                <DiagramNode icon="📖" label="Replica 1" sub="SELECT (읽기 전용)" color="#22c55e" />
                <DiagramNode icon="📖" label="Replica 2" sub="SELECT (읽기 전용)" color="#22c55e" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> 최근 MySQL 공식 문서에서는 Master/Slave 대신 <strong>Source/Replica</strong> 용어를 사용합니다. 면접에서는 두 용어 모두 알고 있음을 보여주되, 핵심은 "쓰기는 Source에서, 읽기는 Replica에서 처리하여 부하를 분산한다"는 개념을 명확히 설명하는 것입니다.
          </HighlightBox>
        </div>

        {/* ── 복제 방식 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>동기 vs 비동기 복제</SectionTitle>

          <div className="drs-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#3b82f6' }}>비동기 복제 (Asynchronous)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">⚡</span>
                  <span>Master가 Binlog에 기록 후 <strong style={{ color: '#e2e8f0' }}>Replica의 확인을 기다리지 않고</strong> 즉시 커밋 응답</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span><strong style={{ color: '#22c55e' }}>쓰기 성능 우수</strong> — Master에 지연 없음</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">⚠️</span>
                  <span>Master 장애 시 <strong style={{ color: '#ef4444' }}>아직 복제되지 않은 데이터 유실</strong> 가능 (Replication Lag)</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">📊</span>
                  <span>MySQL 기본 복제 방식, 대부분의 서비스에서 사용</span>
                </div>
              </div>
            </div>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#a855f7' }}>동기 복제 (Synchronous)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">🔒</span>
                  <span>Master가 <strong style={{ color: '#e2e8f0' }}>모든 Replica의 복제 완료를 확인</strong>한 후에야 커밋 응답</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span><strong style={{ color: '#22c55e' }}>데이터 유실 없음</strong> — 강한 일관성 보장</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>쓰기 성능 저하</strong> — Replica 응답까지 대기</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">📊</span>
                  <span>PostgreSQL Synchronous Replication, 금융 등 데이터 무결성 필수 환경</span>
                </div>
              </div>
            </div>
          </div>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#f59e0b' }}>반동기 복제 (Semi-synchronous)</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">⚖️</span>
                <span><strong style={{ color: '#e2e8f0' }}>최소 1대의 Replica</strong>가 Binlog를 수신했음을 확인(ACK)한 후 커밋 응답합니다. 모든 Replica를 기다리지 않으므로 동기보다 빠르고, 비동기보다 안전한 <strong style={{ color: '#f59e0b' }}>절충안</strong>입니다.</span>
              </div>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">📊</span>
                <span>MySQL의 <strong style={{ color: '#e2e8f0' }}>Semi-sync Replication</strong>이 대표적입니다. ACK 타임아웃 시 비동기로 자동 전환(Fallback)되어 가용성을 유지합니다.</span>
              </div>
            </div>
          </div>

          {/* 복제 방식 비교 다이어그램 */}
          <DiagramContainer title="복제 방식에 따른 커밋 흐름 비교">
            <DiagramFlow>
              <DiagramGroup label="비동기" color="#3b82f6">
                <DiagramNode icon="✏️" label="Master 커밋" sub="즉시 응답" color="#3b82f6" />
                <DiagramNode icon="📨" label="Binlog 전송" sub="백그라운드" color="#64748b" />
              </DiagramGroup>
              <DiagramArrow label="vs" color="#64748b" animated={false} />
              <DiagramGroup label="반동기" color="#f59e0b">
                <DiagramNode icon="✏️" label="Master 커밋" sub="ACK 대기" color="#f59e0b" />
                <DiagramNode icon="✅" label="1대 ACK" sub="후 응답" color="#f59e0b" />
              </DiagramGroup>
              <DiagramArrow label="vs" color="#64748b" animated={false} />
              <DiagramGroup label="동기" color="#a855f7">
                <DiagramNode icon="✏️" label="Master 커밋" sub="모든 Replica 대기" color="#a855f7" />
                <DiagramNode icon="✅" label="전체 ACK" sub="후 응답" color="#a855f7" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <div className="drs-table-wrap" style={{ marginTop: '20px' }}>
            <table className="drs-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th style={{ color: '#3b82f6' }}>비동기</th>
                  <th style={{ color: '#f59e0b' }}>반동기</th>
                  <th style={{ color: '#a855f7' }}>동기</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>쓰기 성능</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>높음</strong></td>
                  <td>보통</td>
                  <td><strong style={{ color: '#ef4444' }}>낮음</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>데이터 유실 가능성</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>있음</strong></td>
                  <td>매우 낮음</td>
                  <td><strong style={{ color: '#22c55e' }}>없음</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>Replication Lag</strong></td>
                  <td>있음 (수 ms~수 초)</td>
                  <td>최소화</td>
                  <td>없음</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>대표 사용</strong></td>
                  <td>MySQL 기본, 일반 서비스</td>
                  <td>MySQL Semi-sync</td>
                  <td>PostgreSQL Sync, 금융</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#3b82f6">
            <strong>면접 포인트:</strong> "레플리케이션 Lag이 발생하면 어떤 문제가 생기나요?"는 자주 나오는 질문입니다. 사용자가 데이터를 쓴 직후 읽으면 <strong>아직 복제되지 않은 상태</strong>에서 이전 데이터가 조회되는 문제(Read-after-Write Consistency)가 발생합니다. 해결 방법으로는 ①쓰기 직후에는 Master에서 읽기, ②Critical Read는 Master로 라우팅, ③반동기 복제 도입 등이 있습니다.
          </HighlightBox>
        </div>

        {/* ── 읽기/쓰기 분리 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>읽기/쓰기 분리 (Read/Write Splitting)</SectionTitle>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#22c55e' }}>왜 분리하는가?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">📊</span>
                <span>대부분의 서비스는 <strong style={{ color: '#e2e8f0' }}>읽기:쓰기 = 8:2 ~ 9:1</strong> 비율입니다. 읽기 트래픽을 Replica에 분산하면 Master의 부하를 크게 줄이고, Replica를 수평 확장(Scale-out)하여 읽기 처리량을 높일 수 있습니다.</span>
              </div>
            </div>
          </div>

          {/* 읽기/쓰기 분리 아키텍처 */}
          <DiagramContainer title="읽기/쓰기 분리 아키텍처">
            <DiagramFlow>
              <DiagramNode icon="📱" label="Application" sub="Write / Read 요청" color="#f59e0b" />
              <DiagramArrow label="라우팅" color="#f59e0b" animated />
              <DiagramNode icon="🔀" label="Proxy / Router" sub="ProxySQL, HAProxy 등" color="#a855f7" />
              <DiagramArrow label="Write →" color="#06b6d4" animated />
              <DiagramNode icon="✏️" label="Master" sub="INSERT / UPDATE / DELETE" color="#06b6d4" />
            </DiagramFlow>
          </DiagramContainer>
          <DiagramContainer title="">
            <DiagramFlow>
              <DiagramNode icon="🔀" label="Proxy / Router" sub="Read 요청 분배" color="#a855f7" />
              <DiagramArrow label="Read →" color="#22c55e" animated />
              <DiagramGroup label="Replica Pool" color="#22c55e">
                <DiagramNode icon="📖" label="Replica 1" sub="SELECT" color="#22c55e" />
                <DiagramNode icon="📖" label="Replica 2" sub="SELECT" color="#22c55e" />
                <DiagramNode icon="📖" label="Replica 3" sub="SELECT" color="#22c55e" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <div className="drs-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#06b6d4' }}>구현 방법</span></div>
            <div className="drs-param-grid">
              <div className="drs-param">
                <div className="drs-param-name" style={{ color: '#06b6d4' }}>애플리케이션 레벨</div>
                <div className="drs-param-desc">
                  코드에서 직접 <strong style={{ color: '#e2e8f0' }}>DataSource를 분리</strong>하여 트랜잭션 종류에 따라 라우팅합니다. Spring의 <code style={{ color: '#06b6d4' }}>AbstractRoutingDataSource</code>가 대표적입니다.
                </div>
                <div className="drs-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>Spring / JPA</div>
              </div>
              <div className="drs-param">
                <div className="drs-param-name" style={{ color: '#a855f7' }}>프록시 레벨</div>
                <div className="drs-param-desc">
                  DB 앞에 <strong style={{ color: '#e2e8f0' }}>프록시 서버</strong>를 두어 SQL 유형에 따라 자동 분배합니다. 애플리케이션 코드 변경이 불필요합니다.
                </div>
                <div className="drs-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>ProxySQL / MaxScale</div>
              </div>
              <div className="drs-param">
                <div className="drs-param-name" style={{ color: '#22c55e' }}>클라우드 매니지드</div>
                <div className="drs-param-desc">
                  AWS Aurora, GCP Cloud SQL 등에서 <strong style={{ color: '#e2e8f0' }}>Reader Endpoint</strong>를 제공합니다. 별도 설정 없이 읽기 분산이 가능합니다.
                </div>
                <div className="drs-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>AWS Aurora / GCP</div>
              </div>
            </div>
          </div>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> 읽기/쓰기 분리 시 가장 중요한 고려사항은 <strong>Replication Lag으로 인한 읽기 일관성</strong> 문제입니다. "방금 작성한 글이 목록에 안 보여요" 같은 현상이 대표적입니다. <strong>@Transactional(readOnly = true)</strong>로 읽기 전용 트랜잭션을 Replica로 라우팅하되, 쓰기 직후 조회 같은 Critical Read는 Master에서 읽는 전략이 필요합니다.
          </HighlightBox>
        </div>

        {/* ── Master-Master / Multi-Master ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#ef4444']}>Master-Master (Multi-Master)</SectionTitle>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#a855f7' }}>Master-Master 레플리케이션</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>두 대 이상의 Master</strong>가 서로 양방향 복제를 수행하여 모든 노드에서 읽기/쓰기가 가능합니다. 쓰기 부하 분산과 지역(Region)별 쓰기가 필요한 경우 고려합니다.</span>
              </div>
            </div>
          </div>

          <div className="drs-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#22c55e' }}>장점</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>쓰기 가용성</strong> — 한 Master 장애 시 다른 Master가 즉시 쓰기 처리</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>지역 분산</strong> — 글로벌 서비스에서 각 리전에 Master 배치 가능</span>
                </div>
              </div>
            </div>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#ef4444' }}>단점 & 주의사항</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>쓰기 충돌(Write Conflict)</strong> — 같은 행을 동시에 수정하면 충돌 해소가 필요</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>Auto Increment 충돌</strong> — 각 Master가 같은 PK를 생성할 수 있어 offset 전략 필요</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>운영 복잡도</strong> — 데이터 일관성 보장이 어렵고 디버깅이 까다로움</span>
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> Master-Master는 <strong>"쓰기 확장"이 아닌 "쓰기 가용성"</strong>을 위한 구조입니다. 쓰기 성능을 수평 확장하려면 <strong>샤딩</strong>이 올바른 접근입니다. 실무에서는 쓰기 충돌의 복잡성 때문에 대부분 <strong>Active-Passive</strong>(한 Master만 쓰기, 나머지는 대기) 형태로 운영합니다.
          </HighlightBox>
        </div>

        {/* ── 파티셔닝 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#22c55e']}>파티셔닝 (Partitioning)</SectionTitle>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#f59e0b' }}>파티셔닝이란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">📦</span>
                <span>하나의 <strong style={{ color: '#e2e8f0' }}>큰 테이블을 물리적으로 여러 조각</strong>으로 나누어 저장하는 기법입니다. 논리적으로는 하나의 테이블처럼 사용하지만, 내부적으로는 파티션 단위로 관리되어 <strong style={{ color: '#06b6d4' }}>쿼리 성능과 관리 효율</strong>이 향상됩니다.</span>
              </div>
            </div>
          </div>

          <div className="drs-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#06b6d4' }}>수직 파티셔닝 (Vertical)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">📊</span>
                  <span><strong style={{ color: '#e2e8f0' }}>컬럼 단위</strong>로 테이블을 분리합니다. 자주 사용하는 컬럼과 큰 텍스트/BLOB 컬럼을 분리하여 I/O를 줄입니다.</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">💡</span>
                  <span>예: <code style={{ color: '#06b6d4' }}>users</code> 테이블에서 <code style={{ color: '#06b6d4' }}>profile_image</code>(BLOB)를 별도 테이블로 분리</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">⚠️</span>
                  <span>분리된 테이블을 JOIN해야 하므로 <strong style={{ color: '#f59e0b' }}>쿼리 복잡도 증가</strong></span>
                </div>
              </div>
            </div>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#22c55e' }}>수평 파티셔닝 (Horizontal)</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">📊</span>
                  <span><strong style={{ color: '#e2e8f0' }}>행(Row) 단위</strong>로 테이블을 분리합니다. 같은 스키마를 가진 여러 파티션에 데이터를 분산 저장합니다.</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">💡</span>
                  <span>예: <code style={{ color: '#22c55e' }}>orders</code> 테이블을 <code style={{ color: '#22c55e' }}>created_at</code> 기준 월별 파티션으로 분리</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span>쿼리 시 해당 파티션만 스캔 (<strong style={{ color: '#22c55e' }}>Partition Pruning</strong>) → 성능 향상</span>
                </div>
              </div>
            </div>
          </div>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#a855f7' }}>수평 파티셔닝 전략</span></div>
            <div className="drs-table-wrap">
              <table className="drs-table">
                <thead>
                  <tr>
                    <th>전략</th>
                    <th>분배 기준</th>
                    <th>장점</th>
                    <th>적합한 경우</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#06b6d4' }}>Range</strong></td>
                    <td>날짜, ID 범위</td>
                    <td>범위 쿼리에 효율적</td>
                    <td>시계열 데이터 (로그, 주문)</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#3b82f6' }}>Hash</strong></td>
                    <td>해시 함수 결과</td>
                    <td>균등 분배</td>
                    <td>특정 패턴 없이 균일한 분산 필요 시</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#a855f7' }}>List</strong></td>
                    <td>특정 값 목록</td>
                    <td>명확한 그룹 분리</td>
                    <td>지역별, 카테고리별 분리</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#22c55e' }}>Composite</strong></td>
                    <td>Range + Hash 등 조합</td>
                    <td>유연한 분배</td>
                    <td>복합 조건이 필요한 대규모 테이블</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> <strong>파티셔닝 vs 샤딩</strong>을 구분해야 합니다. 파티셔닝은 <strong>단일 DB 서버 내부</strong>에서 테이블을 물리적으로 나누는 것이고, 샤딩은 <strong>여러 DB 서버에 데이터를 분산</strong>하는 것입니다. 파티셔닝은 DB 엔진이 자동 관리하지만, 샤딩은 애플리케이션 레벨의 라우팅 로직이 필요합니다.
          </HighlightBox>
        </div>

        {/* ── 샤딩 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>샤딩 (Sharding)</SectionTitle>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#ef4444' }}>샤딩이란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">🔀</span>
                <span><strong style={{ color: '#e2e8f0' }}>샤딩</strong>은 데이터를 <strong style={{ color: '#ef4444' }}>여러 독립적인 DB 서버(샤드)</strong>에 수평 분산하는 기법입니다. 단일 서버의 용량/성능 한계를 넘어 <strong style={{ color: '#06b6d4' }}>무한 수평 확장(Scale-out)</strong>이 가능해집니다.</span>
              </div>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">⚠️</span>
                <span>운영 복잡도가 매우 높으므로 레플리케이션, 캐싱, 쿼리 최적화 등을 먼저 시도하고, <strong style={{ color: '#e2e8f0' }}>마지막 수단으로 고려</strong>해야 합니다.</span>
              </div>
            </div>
          </div>

          {/* 샤딩 아키텍처 다이어그램 */}
          <DiagramContainer title="샤딩 아키텍처 — 사용자 ID 기반">
            <DiagramFlow>
              <DiagramNode icon="📱" label="Application" sub="user_id = 12345" color="#f59e0b" />
              <DiagramArrow label="샤딩 키로 라우팅" color="#f59e0b" animated />
              <DiagramNode icon="🔀" label="Shard Router" sub="user_id % 3" color="#a855f7" />
              <DiagramArrow label="Shard 0" color="#06b6d4" animated />
              <DiagramGroup label="Shards" color="#ef4444">
                <DiagramNode icon="🗄️" label="Shard 0" sub="user_id % 3 = 0" color="#06b6d4" />
                <DiagramNode icon="🗄️" label="Shard 1" sub="user_id % 3 = 1" color="#3b82f6" />
                <DiagramNode icon="🗄️" label="Shard 2" sub="user_id % 3 = 2" color="#a855f7" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <div className="drs-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#f59e0b' }}>샤딩 전략</span></div>
            <div className="drs-param-grid">
              <div className="drs-param">
                <div className="drs-param-name" style={{ color: '#06b6d4' }}>Hash 기반 샤딩</div>
                <div className="drs-param-desc">
                  샤딩 키의 해시값으로 샤드를 결정합니다. (<code style={{ color: '#06b6d4' }}>hash(key) % N</code>) <strong style={{ color: '#e2e8f0' }}>데이터 균등 분배</strong>에 유리하지만, 샤드 수 변경 시 대규모 리밸런싱이 필요합니다.
                </div>
                <div className="drs-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>균등 분배</div>
              </div>
              <div className="drs-param">
                <div className="drs-param-name" style={{ color: '#3b82f6' }}>Range 기반 샤딩</div>
                <div className="drs-param-desc">
                  샤딩 키의 범위로 샤드를 결정합니다. (예: ID 1~100만 → Shard 0) <strong style={{ color: '#e2e8f0' }}>범위 쿼리에 효율적</strong>이지만, 핫스팟(특정 샤드 집중)이 발생할 수 있습니다.
                </div>
                <div className="drs-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>범위 쿼리 유리</div>
              </div>
              <div className="drs-param">
                <div className="drs-param-name" style={{ color: '#a855f7' }}>Directory 기반 샤딩</div>
                <div className="drs-param-desc">
                  별도의 <strong style={{ color: '#e2e8f0' }}>매핑 테이블(lookup)</strong>로 어떤 키가 어느 샤드에 있는지 관리합니다. 유연하지만 매핑 테이블 자체가 병목/SPOF가 될 수 있습니다.
                </div>
                <div className="drs-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>유연한 분배</div>
              </div>
              <div className="drs-param">
                <div className="drs-param-name" style={{ color: '#22c55e' }}>Consistent Hashing</div>
                <div className="drs-param-desc">
                  해시 링 위에 노드를 배치하여 <strong style={{ color: '#e2e8f0' }}>샤드 추가/제거 시 최소한의 데이터만 이동</strong>합니다. DynamoDB, Cassandra 등에서 사용합니다.
                </div>
                <div className="drs-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>리밸런싱 최소화</div>
              </div>
            </div>
          </div>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> Hash 기반 샤딩의 가장 큰 문제는 <strong>샤드 수 변경 시 리밸런싱</strong>입니다. <code style={{ color: '#06b6d4' }}>hash(key) % 3</code>에서 <code style={{ color: '#06b6d4' }}>hash(key) % 4</code>로 변경하면 대부분의 데이터가 재배치됩니다. <strong>Consistent Hashing</strong>은 이 문제를 해결하여 약 1/N의 데이터만 이동시킵니다.
          </HighlightBox>
        </div>

        {/* ── 샤딩 키 설계 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>샤딩 키 설계</SectionTitle>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#06b6d4' }}>샤딩 키란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="drs-feature-row">
                <span className="drs-feature-icon">🔑</span>
                <span><strong style={{ color: '#e2e8f0' }}>샤딩 키(Shard Key)</strong>는 데이터를 어느 샤드에 저장할지 결정하는 기준 컬럼입니다. 샤딩의 성능과 확장성은 <strong style={{ color: '#06b6d4' }}>샤딩 키 설계에 80%</strong> 달려있을 만큼 가장 중요한 결정입니다.</span>
              </div>
            </div>
          </div>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#22c55e' }}>좋은 샤딩 키의 조건</span></div>
            <div className="drs-step-list">
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#06b6d4' }}>균등 분배 (Even Distribution)</strong><br />
                  모든 샤드에 데이터가 고르게 분산되어야 합니다. 특정 샤드에 데이터가 몰리면(핫스팟) 그 샤드가 병목이 됩니다. <strong style={{ color: '#e2e8f0' }}>카디널리티가 높은 컬럼</strong>이 적합합니다.
                </div>
              </div>
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>2</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#3b82f6' }}>쿼리 패턴 일치 (Query Locality)</strong><br />
                  대부분의 쿼리가 <strong style={{ color: '#e2e8f0' }}>단일 샤드 내에서 완결</strong>되어야 합니다. Cross-shard 쿼리(여러 샤드에 걸친 조인/집계)는 매우 비효율적입니다.
                </div>
              </div>
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>3</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#a855f7' }}>확장 용이성 (Scalability)</strong><br />
                  샤드 추가/제거 시 데이터 이동(리밸런싱)이 최소화되어야 합니다. <strong style={{ color: '#e2e8f0' }}>변경 가능성이 낮은 컬럼</strong>을 선택해야 합니다.
                </div>
              </div>
            </div>
          </div>

          <div className="drs-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="drs-table">
              <thead>
                <tr>
                  <th>샤딩 키 후보</th>
                  <th>균등 분배</th>
                  <th>쿼리 로컬리티</th>
                  <th>적합한 시나리오</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#06b6d4' }}>user_id</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>좋음</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>좋음</strong> (사용자별 데이터 조회)</td>
                  <td>SNS, 이커머스, SaaS</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>tenant_id</strong></td>
                  <td>보통 (대형 테넌트 편중 주의)</td>
                  <td><strong style={{ color: '#22c55e' }}>매우 좋음</strong></td>
                  <td>멀티 테넌트 B2B SaaS</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#a855f7' }}>created_at</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>나쁨</strong> (최신 샤드에 집중)</td>
                  <td>범위 쿼리에 좋음</td>
                  <td>시계열 데이터 (주의 필요)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#f59e0b' }}>region</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>나쁨</strong> (지역별 편중)</td>
                  <td><strong style={{ color: '#22c55e' }}>좋음</strong></td>
                  <td>지역별 격리가 필수인 서비스</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#22c55e' }}>order_id</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>좋음</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>나쁨</strong> (사용자별 조회 불가)</td>
                  <td>주문 단건 조회만 필요한 경우</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> "이커머스 서비스에서 주문 테이블을 샤딩한다면 어떤 키를 선택하나요?"라는 질문에는 <strong>user_id</strong>를 추천하되, 이유를 함께 설명해야 합니다. ①대부분의 쿼리가 "내 주문 목록"이므로 단일 샤드에서 완결되고, ②사용자 수에 비례하여 균등 분배가 가능합니다. 다만 <strong>Cross-shard JOIN이 불가</strong>하므로, 통계/집계 쿼리는 별도 분석 DB로 처리하는 전략이 필요합니다.
          </HighlightBox>
        </div>

        {/* ── 샤딩의 트레이드오프 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>샤딩의 트레이드오프</SectionTitle>

          <div className="drs-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#22c55e' }}>얻는 것</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>수평 확장(Scale-out)</strong> — 서버를 추가하여 무한 확장 가능</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>쓰기 성능 분산</strong> — 단일 DB의 쓰기 병목 해소</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>장애 격리</strong> — 한 샤드의 장애가 전체에 영향 미치지 않음</span>
                </div>
              </div>
            </div>
            <div className="drs-section-box">
              <div className="drs-section-subtitle"><span style={{ color: '#ef4444' }}>잃는 것</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>Cross-shard JOIN 불가</strong> — 여러 샤드에 걸친 조인/집계가 어렵거나 불가능</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>분산 트랜잭션</strong> — 2PC(Two-Phase Commit) 등 복잡한 일관성 보장 필요</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>운영 복잡도</strong> — 스키마 변경, 백업, 모니터링이 샤드 수만큼 복잡</span>
                </div>
                <div className="drs-feature-row">
                  <span className="drs-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>리밸런싱 비용</strong> — 샤드 추가/제거 시 데이터 마이그레이션 부담</span>
                </div>
              </div>
            </div>
          </div>

          <div className="drs-section-box" style={{ marginBottom: '20px' }}>
            <div className="drs-section-subtitle"><span style={{ color: '#f59e0b' }}>샤딩 전에 먼저 검토할 것들</span></div>
            <div className="drs-step-list">
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#06b6d4' }}>쿼리 최적화</strong> — EXPLAIN 분석, 인덱스 추가, 슬로우 쿼리 개선으로 해결 가능한지 확인
                </div>
              </div>
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>2</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#3b82f6' }}>수직 확장(Scale-up)</strong> — CPU, 메모리, SSD 업그레이드로 단일 서버 성능 향상
                </div>
              </div>
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>3</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#a855f7' }}>읽기 분리 (레플리케이션)</strong> — 읽기 트래픽이 병목이라면 Replica 추가로 해결
                </div>
              </div>
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>4</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#22c55e' }}>캐싱 (Redis 등)</strong> — 자주 읽는 데이터를 캐시에 저장하여 DB 부하 감소
                </div>
              </div>
              <div className="drs-step">
                <div className="drs-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>5</div>
                <div className="drs-step-content">
                  <strong style={{ color: '#f59e0b' }}>테이블 파티셔닝</strong> — 단일 서버 내에서 파티셔닝으로 성능 향상 시도
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> "데이터가 많아지면 바로 샤딩해야 하나요?"라는 질문에는 <strong>No</strong>입니다. 샤딩은 <strong>최후의 수단</strong>이며, 운영 복잡도가 극적으로 증가합니다. <strong>쿼리 최적화 → Scale-up → 레플리케이션 → 캐싱 → 파티셔닝 → 샤딩</strong> 순서로 단계적 접근을 설명하면 아키텍처 이해도를 어필할 수 있습니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#22c55e']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: 'DB 레플리케이션이란 무엇이며, 왜 사용하나요?',
                a: '레플리케이션은 원본 DB(Master)의 데이터를 복제본(Replica)으로 실시간 복제하는 기술입니다. ①고가용성 — Master 장애 시 Replica가 승격하여 서비스 지속, ②읽기 성능 향상 — 읽기 트래픽을 여러 Replica에 분산, ③데이터 백업 — 복제본을 백업 용도로 활용하기 위해 사용합니다.',
              },
              {
                q: '동기 복제와 비동기 복제의 차이점과 트레이드오프를 설명해주세요.',
                a: '비동기 복제는 Master가 Replica의 확인을 기다리지 않고 커밋하므로 쓰기 성능이 좋지만 장애 시 데이터 유실 가능성이 있습니다. 동기 복제는 모든 Replica의 복제 완료를 확인 후 커밋하므로 데이터 유실이 없지만 쓰기 성능이 저하됩니다. 반동기(Semi-sync)는 최소 1대의 ACK를 기다려 절충하며, MySQL에서 주로 사용합니다.',
              },
              {
                q: 'Replication Lag이 발생하면 어떤 문제가 생기고, 어떻게 해결하나요?',
                a: '사용자가 데이터를 쓴 직후 읽으면 아직 복제되지 않은 상태에서 이전 데이터가 조회되는 Read-after-Write Consistency 문제가 발생합니다. 해결 방법으로는 ①쓰기 직후 Critical Read는 Master에서 읽기, ②반동기 복제로 Lag 최소화, ③애플리케이션에서 쓰기 후 일정 시간 Master 라우팅, ④Lag 모니터링 및 임계치 초과 시 알림이 있습니다.',
              },
              {
                q: '파티셔닝과 샤딩의 차이점은 무엇인가요?',
                a: '파티셔닝은 단일 DB 서버 내부에서 하나의 큰 테이블을 물리적으로 여러 파티션으로 나누는 것으로, DB 엔진이 자동 관리하며 애플리케이션 코드 변경이 불필요합니다. 샤딩은 데이터를 여러 독립적인 DB 서버에 분산하는 것으로, 애플리케이션 레벨의 라우팅 로직이 필요하고 Cross-shard JOIN이 불가합니다.',
              },
              {
                q: '샤딩 키를 선택할 때 어떤 기준을 고려하나요?',
                a: '①균등 분배 — 모든 샤드에 데이터가 고르게 분산되어 핫스팟을 방지해야 합니다. ②쿼리 로컬리티 — 대부분의 쿼리가 단일 샤드 내에서 완결되어야 Cross-shard 쿼리를 최소화합니다. ③확장 용이성 — 샤드 추가 시 리밸런싱 비용이 적어야 합니다. 예를 들어 이커머스의 주문 테이블은 user_id가 적합한데, 대부분 "내 주문 조회"이므로 단일 샤드에서 처리 가능하기 때문입니다.',
              },
              {
                q: 'Hash 기반 샤딩에서 샤드 수를 변경하면 어떤 문제가 생기나요?',
                a: 'hash(key) % N에서 N이 변경되면 거의 모든 데이터의 샤드 위치가 바뀌어 대규모 데이터 마이그레이션이 필요합니다. 이를 해결하기 위해 Consistent Hashing을 사용하면 해시 링 위에 노드를 배치하여 샤드 추가/제거 시 약 1/N의 데이터만 이동시킬 수 있습니다. DynamoDB, Cassandra 등에서 이 방식을 사용합니다.',
              },
              {
                q: '데이터가 많아지면 바로 샤딩을 도입해야 하나요?',
                a: '아닙니다. 샤딩은 운영 복잡도가 극적으로 증가하므로 최후의 수단이어야 합니다. 먼저 ①쿼리 최적화(인덱스, EXPLAIN 분석), ②수직 확장(Scale-up), ③레플리케이션(읽기 분산), ④캐싱(Redis), ⑤테이블 파티셔닝을 순서대로 검토하고, 이 모든 방법으로도 해결이 안 될 때 샤딩을 도입해야 합니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

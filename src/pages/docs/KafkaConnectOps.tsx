import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.kf-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.kf-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.kf-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.kf-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.kf-card-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.kf-mono-box { background:#080b11; border:1px solid #1a2234; border-radius:10px; padding:18px 20px; font-family:'JetBrains Mono',monospace; font-size:11px; line-height:1.9; color:#64748b; white-space:pre; overflow-x:auto; }
.kf-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.kf-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.kf-param:hover { transform:translateY(-3px); }
.kf-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.kf-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.kf-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.kf-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.kf-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.kf-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.kf-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.kf-step-list { display:flex; flex-direction:column; gap:10px; }
.kf-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.kf-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.kf-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.kf-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .kf-compare-grid{ grid-template-columns:1fr; } }
`

export default function KafkaConnectOps() {
  useInjectCSS('style-kafka-connect-ops', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Kafka Connect · CDC · Operations · 면접 심화"
          title={<><span style={{ color: '#f59e0b' }}>Kafka Connect & 운영</span></>}
          description="CDC, Connect 아키텍처, 성능 튜닝과 모니터링 - Debezium, Broker 설정, 핵심 지표"
        />

        {/* ── Kafka Connect & CDC ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>Kafka Connect & CDC</SectionTitle>

          {/* 왜 Kafka Connect를 사용하는가? */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>왜 Kafka Connect를 사용하는가?</span></div>

            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '16px' }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>비교 항목</th>
                    <th style={{ width: '40%' }}>직접 Producer/Consumer 코드 작성</th>
                    <th style={{ width: '40%' }}>Kafka Connect 사용</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['개발 비용', '직접 연동 코드 작성, 에러 처리, 재시도 구현 필요', '설정(JSON)만으로 연동 가능, 코드 작성 불필요'],
                    ['확장성', '스케일 아웃 시 직접 분산 로직 구현', '분산 모드에서 Worker 추가만으로 자동 부하 분산'],
                    ['Offset 관리', '직접 offset 저장/복구 로직 구현', 'Connect가 자동으로 offset 추적 및 복구'],
                    ['데이터 변환', '코드 내 변환 로직 직접 구현', 'SMT(Single Message Transform)로 선언적 변환'],
                    ['운영 부담', '모니터링, 장애 복구 직접 구현', 'REST API로 커넥터 관리, 자동 Task 재배치'],
                    ['재사용성', '시스템마다 별도 코드 필요', '검증된 커넥터 플러그인 재사용'],
                  ].map(([item, direct, connect]) => (
                    <tr key={item}>
                      <td style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '12px' }}>{item}</td>
                      <td style={{ color: '#ef4444', fontSize: '12px' }}>{direct}</td>
                      <td style={{ color: '#22c55e', fontSize: '12px' }}>{connect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔌</span>
                <span><strong style={{ color: '#e2e8f0' }}>핵심 장점 요약:</strong> Kafka Connect는 데이터 파이프라인을 <strong style={{ color: '#22c55e' }}>코드 없이 설정만으로</strong> 구축할 수 있게 해줍니다. 분산 모드 지원, offset 자동 관리, SMT를 통한 선언적 데이터 변환 등 운영에 필요한 기능이 내장되어 있어 개발/운영 비용을 크게 줄일 수 있습니다.</span>
              </div>
            </div>
          </div>

          {/* Standalone vs Distributed 모드 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>Standalone 모드 vs Distributed 모드</span></div>

            <div className="kf-compare-grid" style={{ marginBottom: '16px' }}>
              <div className="kf-card" style={{ borderTop: '3px solid #3b82f6' }}>
                <div className="kf-card-badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>Standalone 모드</div>
                <div className="kf-card-title" style={{ color: '#3b82f6' }}>개발/테스트용</div>
                <div className="kf-card-desc">
                  단일 Worker 프로세스에서 모든 Connector와 Task를 실행합니다.<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>특징:</strong><br />
                  - 설정이 간단하고 빠르게 시작 가능<br />
                  - offset을 로컬 파일에 저장<br />
                  - Worker 장애 시 자동 복구 불가<br />
                  - 고가용성 미지원<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>사용 시점:</strong> 로컬 개발, PoC, 단일 파이프라인 테스트
                </div>
              </div>
              <div className="kf-card" style={{ borderTop: '3px solid #22c55e' }}>
                <div className="kf-card-badge" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Distributed 모드</div>
                <div className="kf-card-title" style={{ color: '#22c55e' }}>프로덕션용</div>
                <div className="kf-card-desc">
                  여러 Worker 프로세스가 클러스터를 구성하여 Connector와 Task를 분산 실행합니다.<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>특징:</strong><br />
                  - Worker 추가만으로 수평 확장 가능<br />
                  - offset, config, status를 <strong style={{ color: '#06b6d4' }}>Kafka 내부 Topic</strong>에 저장<br />
                  - Worker 장애 시 Task 자동 재배치 (Rebalancing)<br />
                  - REST API로 커넥터 관리 가능<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>사용 시점:</strong> 프로덕션 환경, 고가용성 필요, 다수 파이프라인 운영
                </div>
              </div>
            </div>

            <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '18px 20px', marginTop: '4px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1', marginBottom: '12px', fontFamily: 'var(--mono)' }}>Distributed 모드 내부 Topic</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { key: 'config.storage.topic', val: 'connect-configs', desc: 'Connector 설정 정보', color: '#f97316' },
                  { key: 'offset.storage.topic', val: 'connect-offsets', desc: 'Source Connector offset', color: '#22c55e' },
                  { key: 'status.storage.topic', val: 'connect-status', desc: 'Connector/Task 상태 정보', color: '#3b82f6' },
                ].map(item => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontFamily: 'var(--mono)', padding: '6px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
                    <span style={{ color: item.color, fontWeight: 700, minWidth: '180px' }}>{item.key}</span>
                    <span style={{ color: '#475569' }}>=</span>
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{item.val}</span>
                    <span style={{ color: '#475569', marginLeft: '4px' }}>//</span>
                    <span style={{ color: '#64748b' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '12px', paddingLeft: '10px', borderLeft: '2px solid #1a2234' }}>
                이 Topic들 덕분에 Worker 간 상태 공유 및 장애 복구가 가능합니다.
              </div>
            </div>
          </div>

          {/* 주요 Connector 종류 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>주요 Connector 종류</span></div>

            <div className="kf-compare-grid" style={{ marginBottom: '16px' }}>
              <div className="kf-card" style={{ borderLeft: '3px solid #06b6d4' }}>
                <div className="kf-card-badge" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>Source Connector</div>
                <div className="kf-card-title" style={{ color: '#06b6d4' }}>외부 → Kafka</div>
                <div className="kf-card-desc">
                  <strong style={{ color: '#e2e8f0' }}>Debezium (CDC)</strong><br />
                  - MySQL, PostgreSQL, MongoDB, SQL Server 등 지원<br />
                  - binlog/WAL 기반 실시간 변경 감지<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>JDBC Source</strong><br />
                  - Polling 방식으로 DB 테이블 변경 감지<br />
                  - timestamp/incrementing 컬럼 기반<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>FileStream Source</strong><br />
                  - 파일 데이터를 Kafka로 전송 (개발/테스트용)
                </div>
              </div>
              <div className="kf-card" style={{ borderLeft: '3px solid #a855f7' }}>
                <div className="kf-card-badge" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>Sink Connector</div>
                <div className="kf-card-title" style={{ color: '#a855f7' }}>Kafka → 외부</div>
                <div className="kf-card-desc">
                  <strong style={{ color: '#e2e8f0' }}>Elasticsearch Sink</strong><br />
                  - Kafka 데이터를 ES 인덱스로 적재<br />
                  - 검색/분석용 데이터 파이프라인에 활용<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>S3 Sink</strong><br />
                  - Kafka 데이터를 S3에 Parquet/JSON 형태로 저장<br />
                  - 데이터 레이크 구축에 활용<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>JDBC Sink / MongoDB Sink</strong><br />
                  - Kafka 데이터를 DB에 직접 적재
                </div>
              </div>
            </div>
          </div>

          {/* Kafka Connect 아키텍처 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>Kafka Connect 아키텍처</span></div>
            <DiagramContainer title="Kafka Connect Architecture">
              <DiagramFlow>
                <DiagramNode icon="🗄️" label="External System" sub="MySQL, MongoDB" color="#334155" />
                <DiagramArrow label="CDC / Poll" color="#06b6d4" />
                <DiagramGroup label="Kafka Connect Cluster" color="#f59e0b">
                  <DiagramFlow>
                    <DiagramGroup label="📥 Source Connector" color="#06b6d4">
                      <DiagramFlow vertical>
                        <DiagramNode label="Task 1" color="#06b6d4" />
                        <DiagramNode label="Task 2" color="#06b6d4" />
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramArrow label="Produce" color="#f97316" />
                    <DiagramNode icon="⚡" label="Kafka Topics" color="#f97316" />
                    <DiagramArrow label="Consume" color="#a855f7" />
                    <DiagramGroup label="📤 Sink Connector" color="#a855f7">
                      <DiagramFlow vertical>
                        <DiagramNode label="Task 1" color="#a855f7" />
                        <DiagramNode label="Task 2" color="#a855f7" />
                      </DiagramFlow>
                    </DiagramGroup>
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramArrow label="Write" color="#a855f7" />
                <DiagramNode icon="🗄️" label="External System" sub="ES, S3, JDBC" color="#334155" />
              </DiagramFlow>
            </DiagramContainer>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📥</span>
                <span><strong style={{ color: '#e2e8f0' }}>Source Connector:</strong> 외부 시스템에서 데이터를 읽어 Kafka Topic에 전달합니다. 예: Debezium (MySQL/PostgreSQL CDC), JDBC Source Connector.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📤</span>
                <span><strong style={{ color: '#e2e8f0' }}>Sink Connector:</strong> Kafka Topic의 데이터를 외부 시스템에 전달합니다. 예: Elasticsearch Sink, S3 Sink, JDBC Sink Connector.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>Offset 자동 관리:</strong> Kafka Connect는 Source의 읽기 위치와 Sink의 쓰기 위치를 자동으로 추적합니다. 장애 복구 시 마지막 처리 지점부터 재개합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚙️</span>
                <span><strong style={{ color: '#e2e8f0' }}>SMT (Single Message Transform):</strong> 메시지가 Connector를 통과할 때 변환(필드 추가/제거, 타입 변경 등)을 적용할 수 있습니다. 별도의 Stream 처리 없이 간단한 변환이 가능합니다.</span>
              </div>
            </div>
          </div>

          {/* Debezium CDC */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#ef4444' }}>Debezium CDC - binlog 기반 변경 감지</span></div>

            <div className="kf-step-list" style={{ marginBottom: '16px' }}>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>1</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>binlog 읽기:</strong> Debezium이 MySQL의 <strong style={{ color: '#e2e8f0' }}>binlog(Binary Log)</strong>를 실시간으로 읽습니다. MySQL Replication 프로토콜을 사용하여 Slave처럼 동작합니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>2</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>변경 이벤트 생성:</strong> INSERT, UPDATE, DELETE 각 변경사항을 구조화된 이벤트(before/after 스냅샷 포함)로 변환합니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>3</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>Kafka Topic으로 전달:</strong> 테이블별로 전용 Topic이 생성됩니다. 예: <code style={{ color: '#06b6d4', fontSize: '11px' }}>dbserver1.inventory.customers</code>. PK를 메시지 Key로 사용하여 같은 레코드의 변경사항이 같은 Partition에 순서대로 적재됩니다.
                </div>
              </div>
            </div>

            <CodeBlock title="Debezium CDC 이벤트 구조" lang="json" style={{ marginBottom: '16px' }}>
{`{
  "before": { "id": 1, "name": "Alice", "email": "old@mail.com" },
  "after":  { "id": 1, "name": "Alice", "email": "new@mail.com" },
  "source": {
    "connector": "mysql",
    "db": "mydb",
    "table": "users",
    "binlog_file": "mysql-bin.000003",
    "binlog_pos": 12345,
    "ts_ms": 1700000000000
  },
  "op": "u"  // c=create, u=update, d=delete, r=read(snapshot)
}`}
            </CodeBlock>

            {/* CDC vs Polling 비교 */}
            <div className="kf-section-subtitle" style={{ marginTop: '20px' }}><span style={{ color: '#ef4444' }}>CDC (binlog) vs Polling (주기적 조회) 비교</span></div>
            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '16px' }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>비교 항목</th>
                    <th style={{ width: '40%' }}>CDC (binlog)</th>
                    <th style={{ width: '40%' }}>Polling (주기적 조회)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['DB 부하', '매우 낮음 (binlog 스트림 읽기)', '높음 (주기적 SELECT 쿼리 실행)', '#22c55e', '#ef4444'],
                    ['실시간성', '밀리초 단위 지연', '폴링 주기에 의존 (초~분 단위)', '#22c55e', '#f59e0b'],
                    ['삭제 감지', '가능 (DELETE 이벤트 직접 감지)', '불가 (soft delete 컬럼 필요)', '#22c55e', '#ef4444'],
                    ['스키마 변경', '자동 감지 및 이벤트 반영', '수동 대응 필요', '#22c55e', '#ef4444'],
                    ['구현 복잡도', '커넥터 설정 + DB 권한 필요', '단순한 쿼리 기반', '#f59e0b', '#22c55e'],
                    ['데이터 정합성', '모든 변경 순서 보장', '폴링 사이 변경 유실 가능', '#22c55e', '#ef4444'],
                  ].map(([item, cdc, polling, cdcColor, pollingColor]) => (
                    <tr key={item}>
                      <td style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '12px' }}>{item}</td>
                      <td style={{ color: cdcColor as string, fontSize: '12px' }}>{cdc}</td>
                      <td style={{ color: pollingColor as string, fontSize: '12px' }}>{polling}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Snapshot 모드 */}
            <div className="kf-section-subtitle" style={{ marginTop: '20px' }}><span style={{ color: '#ef4444' }}>Debezium Snapshot 모드</span></div>
            <div className="kf-param-grid" style={{ marginBottom: '16px' }}>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#22c55e' }}>initial</div>
                <div className="kf-param-desc">
                  첫 실행 시 <strong style={{ color: '#e2e8f0' }}>전체 테이블 데이터를 스냅샷</strong>한 후 binlog 스트리밍으로 전환합니다. 기존 데이터와 이후 변경 모두 필요할 때 사용합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>가장 일반적</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>schema_only</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>스키마 정보만 스냅샷</strong>하고, 데이터는 binlog 시작 시점부터 스트리밍합니다. 과거 데이터가 불필요하고 변경분만 필요할 때 사용합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>변경분만 필요</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#f59e0b' }}>never</div>
                <div className="kf-param-desc">
                  스냅샷을 전혀 수행하지 않고 <strong style={{ color: '#e2e8f0' }}>binlog만 읽습니다.</strong> 이전에 중단된 Connector를 저장된 offset부터 재개할 때 사용합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>재개 전용</div>
              </div>
            </div>

            {/* binlog 주의사항 */}
            <div className="kf-section-subtitle" style={{ marginTop: '20px' }}><span style={{ color: '#ef4444' }}>binlog 사용 시 주의사항</span></div>
            <CodeBlock title="MySQL binlog 필수 설정" lang="ini" style={{ marginBottom: '16px' }}>
{`# my.cnf
server-id         = 1
log_bin            = mysql-bin
binlog_format      = ROW           # 필수! STATEMENT/MIXED는 불가
binlog_row_image   = FULL          # 권장. before/after 전체 컬럼 포함
expire_logs_days   = 7             # binlog 보관 기간 (너무 짧으면 offset 유실)`}
            </CodeBlock>
            <CodeBlock title="Debezium 전용 DB 계정 권한" lang="sql" style={{ marginBottom: '16px' }}>
{`GRANT SELECT, RELOAD, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT
  ON *.* TO 'debezium'@'%';`}
            </CodeBlock>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚠️</span>
                <span><strong style={{ color: '#ef4444' }}>binlog_format=ROW 필수:</strong> STATEMENT나 MIXED 포맷에서는 실제 데이터 변경값을 추출할 수 없습니다. ROW 포맷만이 변경 전/후 데이터를 정확히 기록합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚠️</span>
                <span><strong style={{ color: '#f59e0b' }}>binlog_row_image=FULL 권장:</strong> MINIMAL로 설정하면 변경된 컬럼만 기록되어, Debezium이 before 이미지를 완전하게 제공하지 못합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚠️</span>
                <span><strong style={{ color: '#f59e0b' }}>expire_logs_days 주의:</strong> binlog 보관 기간이 너무 짧으면, Connector가 장시간 중단된 후 재시작할 때 필요한 binlog가 삭제되어 offset을 찾을 수 없습니다. 이 경우 새로운 스냅샷이 필요합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔑</span>
                <span><strong style={{ color: '#e2e8f0' }}>DB 계정 권한:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>REPLICATION SLAVE</code>와 <code style={{ color: '#06b6d4', fontSize: '11px' }}>REPLICATION CLIENT</code> 권한이 필수입니다. 스냅샷 시에는 <code style={{ color: '#06b6d4', fontSize: '11px' }}>SELECT</code> 권한도 필요합니다.</span>
              </div>
            </div>
          </div>

          {/* Incremental Snapshot */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-card" style={{ borderLeft: '3px solid #f59e0b', marginBottom: '0' }}>
              <div className="kf-card-title" style={{ color: '#f59e0b', fontSize: '14px' }}>Incremental Snapshot</div>
              <div className="kf-card-desc">
                <strong style={{ color: '#e2e8f0' }}>초기 스냅샷의 문제:</strong> 대용량 테이블의 초기 스냅샷은 DB에 부하를 주고, 시간이 오래 걸립니다.<br /><br />
                <strong style={{ color: '#22c55e' }}>Incremental Snapshot (Debezium 1.6+):</strong> 테이블을 청크 단위로 나누어 점진적으로 스냅샷을 수행합니다.
                스냅샷 중에도 실시간 변경 감지가 중단되지 않으며, DB 부하를 분산시킵니다.
                시그널 테이블을 통해 스냅샷 시작/중지를 동적으로 제어할 수 있습니다.
              </div>
            </div>
          </div>

          {/* 포트폴리오 연결 - CDC */}
          <HighlightBox color="#f59e0b">
            <strong style={{ color: '#f59e0b' }}>포트폴리오 연결 - 마이그레이션 프로젝트:</strong><br /><br />
            <strong style={{ color: '#e2e8f0' }}>CDC를 선택한 이유:</strong> 레거시 DB에서 새로운 시스템으로 마이그레이션할 때, 애플리케이션 코드를 수정하지 않고 binlog 기반으로 실시간 변경을 감지할 수 있었습니다.<br /><br />
            Kafka Connect의 Debezium Source Connector를 사용하여 MySQL binlog를 읽고, 변경 이벤트를 Kafka Topic으로 전달한 뒤, Sink Connector 또는 Consumer 애플리케이션이 새로운 시스템에 반영하는 구조입니다.<br /><br />
            <strong style={{ color: '#e2e8f0' }}>장점:</strong> 레거시 시스템에 침투적 변경 없음, 실시간 동기화, offset 자동 관리로 장애 복구 용이. Polling 방식 대비 DB 부하가 적고, 변경 감지 지연이 밀리초 단위로 짧습니다.
          </HighlightBox>
        </div>

        {/* ── 성능 튜닝 & 운영 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>성능 튜닝 & 운영</SectionTitle>

          {/* Kafka 클러스터 사이징 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#a855f7' }}>Kafka 클러스터 사이징</span></div>

            <div className="kf-param-grid" style={{ marginBottom: '16px' }}>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>Broker 수 결정</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>기준:</strong> 목표 처리량, Replication Factor, 디스크 총 용량으로 결정합니다. RF=3이면 최소 3대, 장애 대응을 위해 4~5대 권장합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>최소 RF대 이상</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#22c55e' }}>디스크 (SSD vs HDD)</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>Kafka는 Sequential I/O 중심</strong>이므로 HDD로도 충분한 성능을 냅니다. 다만 Broker 수가 적고 파티션이 많으면 Random I/O가 증가하여 SSD가 유리할 수 있습니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>HDD도 충분</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#f59e0b' }}>메모리 (JVM Heap vs Page Cache)</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#ef4444' }}>JVM Heap은 6~8GB로 제한.</strong> 나머지 메모리는 OS의 Page Cache에 할당합니다. Kafka는 Page Cache를 적극 활용하여 디스크 I/O를 줄이므로, Heap보다 Page Cache가 더 중요합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Page Cache 우선</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#ef4444' }}>네트워크</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>Replication 트래픽을 반드시 고려.</strong> RF=3이면 Producer 트래픽의 2배가 Broker 간 복제에 추가로 발생합니다. 10Gbps 이상 네트워크를 권장합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>복제 트래픽 주의</div>
              </div>
            </div>
          </div>

          {/* Partition 수 결정 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>Partition 수 결정 기준</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📐</span>
                <span><strong style={{ color: '#e2e8f0' }}>공식:</strong> 목표 Throughput / 단일 Partition Throughput = 최소 Partition 수. 예: 목표 100MB/s, Partition당 10MB/s → 최소 10개.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚠️</span>
                <span><strong style={{ color: '#e2e8f0' }}>주의:</strong> Partition은 늘릴 수 있지만 <strong style={{ color: '#ef4444' }}>줄일 수 없습니다.</strong> Key 기반 파티셔닝 시 Partition 수가 변경되면 같은 Key의 메시지가 다른 Partition으로 갈 수 있어, 순서 보장이 깨집니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📊</span>
                <span><strong style={{ color: '#e2e8f0' }}>Consumer 관계:</strong> 한 Consumer Group 내에서 유효한 최대 Consumer 수 = Partition 수. Consumer를 더 추가해도 유휴 상태가 됩니다. 따라서 향후 확장을 고려하여 Partition 수를 넉넉하게 설정합니다.</span>
              </div>
            </div>
          </div>

          {/* Log Compaction */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>Log Compaction 동작 원리</span></div>

            <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '18px 20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1', marginBottom: '14px', fontFamily: 'var(--mono)' }}>Log Compaction - 같은 Key의 최신 값만 유지</div>

              <div style={{ fontSize: '11px', fontWeight: 600, color: '#f59e0b', marginBottom: '8px', fontFamily: 'var(--mono)' }}>Before Compaction:</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '16px' }}>
                {[
                  { k: 'A', v: '1', off: '0', dim: true },
                  { k: 'B', v: '1', off: '1', dim: true },
                  { k: 'A', v: '2', off: '2', dim: true },
                  { k: 'C', v: '1', off: '3', dim: true },
                  { k: 'B', v: '2', off: '4', color: '#3b82f6' },
                  { k: 'A', v: '3', off: '5', color: '#22c55e' },
                  { k: 'C', v: 'null', off: '6', color: '#ef4444' },
                ].map((item, i) => (
                  <div key={i} style={{ background: item.dim ? 'rgba(255,255,255,0.03)' : `${item.color}15`, border: `1px solid ${item.dim ? '#1a2234' : item.color}`, borderRadius: '6px', padding: '6px 10px', fontFamily: 'var(--mono)', fontSize: '10px', textAlign: 'center', minWidth: '64px', opacity: item.dim ? 0.5 : 1 }}>
                    <div style={{ color: item.dim ? '#64748b' : item.color, fontWeight: 700 }}>K:{item.k}</div>
                    <div style={{ color: item.dim ? '#475569' : '#e2e8f0' }}>V:{item.v}</div>
                    <div style={{ color: '#475569', fontSize: '9px' }}>off:{item.off}</div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '11px', fontWeight: 600, color: '#22c55e', marginBottom: '8px', fontFamily: 'var(--mono)' }}>After Compaction:</div>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {[
                  { k: 'A', v: '3', off: '5', color: '#22c55e' },
                  { k: 'B', v: '2', off: '4', color: '#3b82f6' },
                  { k: 'C', v: '(del)', off: '6', color: '#ef4444' },
                ].map((item, i) => (
                  <div key={i} style={{ background: `${item.color}15`, border: `1px solid ${item.color}`, borderRadius: '6px', padding: '6px 10px', fontFamily: 'var(--mono)', fontSize: '10px', textAlign: 'center', minWidth: '64px' }}>
                    <div style={{ color: item.color, fontWeight: 700 }}>K:{item.k}</div>
                    <div style={{ color: '#e2e8f0' }}>V:{item.v}</div>
                    <div style={{ color: '#475569', fontSize: '9px' }}>off:{item.off}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '10px', color: '#ef4444', fontFamily: 'var(--mono)', marginLeft: '8px' }}>
                  Key C는 tombstone(null) - 일정 시간 후 완전 삭제
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #1a2234', paddingTop: '10px' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: '#22c55e' }}>-&gt;</span> 각 Key의 최신 값만 유지, offset 순서는 보장
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: '#ef4444' }}>-&gt;</span> null 값 = tombstone (삭제 마커)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📌</span>
                <span><strong style={{ color: '#e2e8f0' }}>동작 원리:</strong> Kafka의 Log Cleaner 스레드가 백그라운드에서 동작하며, 같은 Key를 가진 메시지 중 <strong style={{ color: '#22c55e' }}>가장 최신 값만 유지</strong>하고 이전 값들은 제거합니다. offset 순서는 보존됩니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🗑️</span>
                <span><strong style={{ color: '#e2e8f0' }}>Tombstone (삭제 마커):</strong> 값이 <code style={{ color: '#ef4444', fontSize: '11px' }}>null</code>인 메시지를 Tombstone이라 합니다. Compaction 시 해당 Key의 이전 값들을 모두 제거하고, Tombstone 자체도 <code style={{ color: '#06b6d4', fontSize: '11px' }}>delete.retention.ms</code> 이후 삭제됩니다.</span>
              </div>
            </div>

            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>Log Compaction 사용 사례</span></div>
            <div className="kf-param-grid">
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>KTable (Kafka Streams)</div>
                <div className="kf-param-desc">
                  Kafka Streams의 KTable은 Compacted Topic을 상태 저장소로 사용합니다. 각 Key의 최신 상태만 유지하여 changelog로 활용합니다.
                </div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#f59e0b' }}>설정/프로필 저장</div>
                <div className="kf-param-desc">
                  사용자 설정, 프로필 정보 등 최신 상태만 필요한 데이터를 Compacted Topic에 저장합니다. Consumer가 처음부터 읽으면 최신 상태를 복원할 수 있습니다.
                </div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#a855f7' }}>CDC 상태 동기화</div>
                <div className="kf-param-desc">
                  Debezium CDC Topic을 Compaction으로 설정하면, 각 레코드의 최신 상태만 유지됩니다. 새로운 Consumer가 합류해도 전체 히스토리 없이 현재 상태를 파악할 수 있습니다.
                </div>
              </div>
            </div>
          </div>

          {/* Broker 설정 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>Broker 주요 설정</span></div>
            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '25%' }}>설정</th>
                    <th style={{ width: '20%' }}>기본값</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['log.retention.hours', '168 (7일)', '메시지 보관 기간. 비즈니스 요구사항에 따라 조정', '#06b6d4'],
                    ['log.retention.bytes', '-1 (무제한)', 'Partition당 최대 로그 크기. 디스크 용량 관리에 활용', '#3b82f6'],
                    ['log.segment.bytes', '1GB', 'Segment 파일 크기. 작게 설정하면 cleanup이 더 자주 발생', '#a855f7'],
                    ['cleanup.policy=delete', '-', '보관 기간/크기 초과 시 오래된 Segment 삭제. 일반적인 이벤트 토픽에 사용', '#ef4444'],
                    ['cleanup.policy=compact', '-', '같은 Key의 최신 값만 유지. 상태 저장 용도의 토픽에 사용 (예: user-profiles)', '#22c55e'],
                    ['num.partitions', '1', '토픽 자동 생성 시 기본 Partition 수. 프로덕션에서는 auto.create.topics.enable=false 권장', '#f59e0b'],
                  ].map(([setting, defaultVal, desc, color]) => (
                    <tr key={setting}>
                      <td style={{ color: color as string, fontWeight: 700, fontSize: '11px', fontFamily: "'JetBrains Mono',monospace" }}>{setting}</td>
                      <td style={{ color: '#5a6a85', fontSize: '12px' }}>{defaultVal}</td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kafka 장애 대응 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#ef4444' }}>Kafka 장애 대응</span></div>

            <div className="kf-param-grid" style={{ marginBottom: '16px' }}>
              <div className="kf-param" style={{ borderLeft: '3px solid #ef4444' }}>
                <div className="kf-param-name" style={{ color: '#ef4444' }}>Broker 장애</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>Leader Election:</strong> 장애 Broker가 Leader인 Partition은 ISR(In-Sync Replicas) 중 하나가 새로운 Leader로 선출됩니다.<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>ISR 기반 복구:</strong> ISR에 속한 Replica만 Leader가 될 수 있어 데이터 유실을 방지합니다. <code style={{ color: '#06b6d4', fontSize: '11px' }}>unclean.leader.election.enable=false</code>로 설정하면 ISR 외 Replica의 Leader 선출을 차단합니다.
                </div>
              </div>
              <div className="kf-param" style={{ borderLeft: '3px solid #f59e0b' }}>
                <div className="kf-param-name" style={{ color: '#f59e0b' }}>Consumer 장애</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>Rebalancing:</strong> Consumer가 장애로 탈퇴하면, 해당 Consumer의 Partition이 남은 Consumer에게 재배분됩니다.<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>Offset 기반 재처리:</strong> 커밋된 offset부터 재처리하므로, 중복 처리는 가능하지만 유실은 방지됩니다. 멱등성 처리가 중요합니다.
                </div>
              </div>
              <div className="kf-param" style={{ borderLeft: '3px solid #a855f7' }}>
                <div className="kf-param-name" style={{ color: '#a855f7' }}>네트워크 파티션</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>Split-brain 방지:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>min.insync.replicas</code> 설정으로 최소 동기화 Replica 수를 강제합니다.<br /><br />
                  예: <code style={{ color: '#06b6d4', fontSize: '11px' }}>acks=all</code> + <code style={{ color: '#06b6d4', fontSize: '11px' }}>min.insync.replicas=2</code>이면, 최소 2개 Replica에 쓰여야 성공으로 응답합니다.
                </div>
              </div>
              <div className="kf-param" style={{ borderLeft: '3px solid #06b6d4' }}>
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>디스크 풀 (Disk Full)</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>긴급 대응:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>log.retention.hours</code> / <code style={{ color: '#06b6d4', fontSize: '11px' }}>log.retention.bytes</code>를 줄여 오래된 데이터를 빠르게 삭제합니다.<br /><br />
                  <strong style={{ color: '#e2e8f0' }}>파티션 이동:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>kafka-reassign-partitions</code>로 여유 디스크가 있는 Broker로 Partition을 이동합니다.
                </div>
              </div>
            </div>
          </div>

          {/* 모니터링 지표 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>핵심 모니터링 지표</span></div>
            <div className="kf-param-grid">
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#ef4444' }}>Consumer Lag</div>
                <div className="kf-param-desc">
                  최신 offset - Consumer offset. 지속적 증가는 Consumer 처리량 부족을 의미합니다. <strong style={{ color: '#e2e8f0' }}>가장 중요한 지표.</strong>
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>Alert 필수</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>Throughput</div>
                <div className="kf-param-desc">
                  초당 메시지 수(messages/sec)와 바이트 수(bytes/sec). Producer/Consumer 양쪽 모두 모니터링합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>트렌드 분석</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#f59e0b' }}>Under-replicated Partitions</div>
                <div className="kf-param-desc">
                  ISR이 Replication Factor보다 적은 Partition 수. 0이 아니면 Broker 장애나 네트워크 문제를 의미합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>0 유지 필수</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#a855f7' }}>Request Latency</div>
                <div className="kf-param-desc">
                  Produce/Fetch 요청의 응답 시간. p99 기준으로 모니터링하여 성능 저하를 조기 감지합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>p99 추적</div>
              </div>
            </div>
          </div>

          {/* 모니터링 도구 비교 */}
          <div className="kf-section-box">
            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>모니터링 도구 비교</span></div>
            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '22%' }}>도구</th>
                    <th style={{ width: '18%' }}>유형</th>
                    <th>특징</th>
                  </tr>
                </thead>
                <tbody>
                  {([
                    ['Grafana + Prometheus', 'JMX 메트릭 수집', '범용 모니터링. JMX Exporter로 Kafka 메트릭을 수집하여 대시보드 구성. 가장 널리 사용됨', '#22c55e'],
                    ['Burrow', 'Consumer Lag 전문', 'LinkedIn에서 개발. Consumer Lag 추이를 분석하여 지연/정상/에러 상태를 자동 판별', '#06b6d4'],
                    ['CMAK (구 Kafka Manager)', 'Cluster 관리 UI', 'Yahoo에서 개발. Topic/Partition 관리, Consumer Group 모니터링, Broker 상태 확인', '#f59e0b'],
                    ['Confluent Control Center', '통합 관리 플랫폼', 'Confluent 상용 제품. Schema Registry, Connect, ksqlDB 등 통합 관리. 엔터프라이즈급 기능', '#a855f7'],
                    ['Kafdrop / UI for Kafka', '경량 Web UI', '오픈소스 Web UI. Topic 메시지 조회, Consumer Group 확인 등 간단한 관리에 적합', '#3b82f6'],
                  ] as const).map(([tool, type, desc, color]) => (
                    <tr key={tool}>
                      <td style={{ color: color, fontWeight: 700, fontSize: '12px' }}>{tool}</td>
                      <td style={{ color: '#5a6a85', fontSize: '12px' }}>{type}</td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#f59e0b" items={[
            {
              q: 'Kafka Connect CDC를 사용한 경험을 설명해주세요.',
              a: '마이그레이션 프로젝트에서 Debezium MySQL Source Connector를 사용하여 CDC를 구현했습니다. 레거시 DB의 변경사항을 애플리케이션 코드 수정 없이 binlog 기반으로 실시간 감지할 수 있었습니다. binlog에서 읽은 변경 이벤트는 테이블별 Kafka Topic으로 전달되고, PK를 메시지 Key로 사용하여 같은 레코드의 변경사항이 순서대로 처리되었습니다. Polling 방식 대비 DB 부하가 적고, 변경 감지 지연이 밀리초 단위로 짧다는 장점이 있었습니다. Kafka Connect의 offset 자동 관리 덕분에 Connector 재시작 시에도 마지막 처리 지점부터 자동으로 재개되어 운영이 편리했습니다. 다만 binlog 포맷 변경이나 스키마 변경 시 Connector 설정 업데이트가 필요한 점은 주의해야 합니다.',
            },
            {
              q: 'Kafka 클러스터에서 Broker 하나가 장애 나면 어떻게 되나요?',
              a: '장애가 발생한 Broker가 Leader인 Partition들에 대해 Leader Election이 발생합니다. ISR(In-Sync Replicas)에 속한 Follower 중 하나가 새로운 Leader로 선출되어 서비스를 계속합니다. Producer는 acks=all 설정 시 min.insync.replicas 수만큼의 Replica가 살아있어야 쓰기가 성공하므로, 데이터 유실을 방지할 수 있습니다. Consumer 입장에서는 새로운 Leader에서 Fetch를 계속하게 됩니다. 장애 Broker가 복구되면 ISR에 다시 합류하여 Leader로부터 데이터를 동기화합니다. unclean.leader.election.enable=false로 설정하면 ISR에 속하지 않은 Replica가 Leader가 되는 것을 방지하여 데이터 정합성을 보장할 수 있습니다.',
            },
            {
              q: 'Log Compaction이란 무엇이고, 언제 사용하나요?',
              a: 'Log Compaction은 같은 Key를 가진 메시지 중 가장 최신 값만 유지하고 이전 값들을 제거하는 cleanup 정책입니다. cleanup.policy=compact로 설정합니다. 값이 null인 메시지를 Tombstone이라 하며, 해당 Key를 삭제 표시하는 역할을 합니다. 주요 사용 사례는 Kafka Streams의 KTable(상태 저장소), 사용자 프로필/설정 정보 저장, CDC를 통한 테이블 현재 상태 동기화 등입니다. 새로운 Consumer가 Topic을 처음부터 읽으면 각 Key의 최신 상태를 복원할 수 있어, 전체 히스토리를 보관할 필요 없이 현재 상태를 효율적으로 관리할 수 있습니다.',
            },
            {
              q: 'CDC와 Polling 방식의 차이점은?',
              a: 'CDC(Change Data Capture)는 DB의 binlog(WAL)를 읽어 변경사항을 감지하는 방식이고, Polling은 주기적으로 SELECT 쿼리를 실행하여 변경을 감지하는 방식입니다. CDC는 DB에 거의 부하를 주지 않고 밀리초 단위의 실시간성을 제공하며, DELETE 이벤트도 직접 감지할 수 있습니다. 반면 Polling은 구현이 단순하지만, 폴링 주기에 의존하여 실시간성이 떨어지고, 주기적 쿼리가 DB에 부하를 줍니다. 특히 삭제 감지가 불가능하여 soft delete 컬럼이 필요합니다. 스키마 변경에 대해서도 CDC는 자동 감지가 가능하지만 Polling은 수동 대응이 필요합니다. 실시간성과 정합성이 중요한 환경에서는 CDC를, 단순하고 빠르게 구현해야 하는 경우에는 Polling을 선택합니다.',
            },
          ]} />
        </div>
      </div>
    </>
  )
}

import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup, DiagramGrid } from '../../components/doc/Diagram'

const CSS = `
.kf-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
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
.kf-usecase-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
.kf-usecase { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; background:rgba(255,255,255,0.02); border-radius:10px; border:1px solid #1a2234; }
.kf-usecase-icon { flex-shrink:0; font-size:18px; margin-top:1px; }
.kf-usecase-label { font-size:12px; font-weight:700; color:#e2e8f0; margin-bottom:2px; }
.kf-usecase-desc { font-size:11px; color:#5a6a85; line-height:1.6; }
.kf-hierarchy { display:flex; flex-direction:column; gap:6px; }
.kf-hierarchy-item { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:8px; font-size:12px; color:#94a3b8; }
.kf-hierarchy-arrow { color:#5a6a85; font-size:14px; text-align:center; padding-left:20px; }
.kf-scenario-table { width:100%; border-collapse:collapse; font-size:12px; }
.kf-scenario-table th { padding:10px 14px; text-align:left; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.kf-scenario-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; }
.kf-scenario-table tr:last-child td { border-bottom:none; }
.kf-scenario-ok { color:#22c55e; font-weight:700; }
.kf-scenario-warn { color:#f59e0b; font-weight:700; }
.kf-scenario-fail { color:#ef4444; font-weight:700; }
`

export default function KafkaOverview() {
  useInjectCSS('style-kafka-overview', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Architecture · Core Concepts · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>Apache Kafka</span> 개요</>}
          description="Kafka 아키텍처 핵심 개념과 구조 - Broker, Partition, Replication, Consumer Group의 동작 원리"
        />

        {/* ── Kafka란 무엇인가 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>Kafka란 무엇인가</SectionTitle>

          {/* 정의 & 배경 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>정의와 탄생 배경</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🌊</span>
                <span><strong style={{ color: '#e2e8f0' }}>분산 이벤트 스트리밍 플랫폼:</strong> Apache Kafka는 대용량의 실시간 데이터를 높은 처리량과 낮은 지연 시간으로 수집, 저장, 처리할 수 있는 오픈소스 분산 이벤트 스트리밍 플랫폼입니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🏢</span>
                <span><strong style={{ color: '#e2e8f0' }}>LinkedIn에서 시작:</strong> 2011년 LinkedIn에서 대규모 활동 데이터(activity data)와 운영 메트릭을 실시간으로 처리하기 위해 개발되었습니다. 이후 Apache Software Foundation에 기증되어 오픈소스 프로젝트로 발전했습니다.</span>
              </div>
            </div>
          </div>

          {/* 핵심 특징 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>핵심 특징</span></div>
            <div className="kf-param-grid">
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>높은 처리량</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>Sequential I/O</strong>로 디스크를 순차적으로 읽고 쓰며, <strong style={{ color: '#e2e8f0' }}>Page Cache</strong>를 활용해 OS 레벨에서 메모리 캐싱을 수행합니다. <strong style={{ color: '#e2e8f0' }}>Zero-Copy</strong> 기술로 커널에서 네트워크로 직접 전송하여 CPU 오버헤드를 최소화합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>수백만 msg/s</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#3b82f6' }}>수평 확장성</div>
                <div className="kf-param-desc">
                  Broker와 Partition을 추가하는 것만으로 처리량을 선형적으로 확장할 수 있습니다. 클러스터 규모를 서비스 중단 없이 증감할 수 있어 트래픽 변화에 유연하게 대응합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>Scale-out</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#a855f7' }}>내구성 (Durability)</div>
                <div className="kf-param-desc">
                  Replication Factor 설정으로 데이터를 여러 Broker에 복제합니다. Broker 장애 시에도 복제본을 통해 데이터 유실 없이 서비스를 지속할 수 있습니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>Replication</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#22c55e' }}>실시간 처리</div>
                <div className="kf-param-desc">
                  Producer가 보낸 메시지를 밀리초 단위의 지연 시간으로 Consumer에게 전달합니다. Kafka Streams, ksqlDB 등과 결합하여 실시간 스트림 처리 파이프라인을 구축할 수 있습니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>ms 단위 지연</div>
              </div>
            </div>
          </div>

          {/* 기존 메시지 큐와의 근본적 차이 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>기존 메시지 큐와의 근본적 차이 — "로그" 기반 아키텍처</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📜</span>
                <span><strong style={{ color: '#e2e8f0' }}>Append-only, Immutable Log:</strong> Kafka의 Partition은 끝에만 추가 가능하고 수정이 불가능한(immutable) 로그 파일입니다. 전통적인 메시지 큐가 "메시지 전달 파이프"라면, Kafka는 "분산 커밋 로그"에 가깝습니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔒</span>
                <span><strong style={{ color: '#e2e8f0' }}>소비 후에도 메시지가 삭제되지 않음:</strong> Consumer가 메시지를 읽어도 Kafka에서 삭제되지 않습니다. retention.ms(기본 7일) 또는 retention.bytes 정책에 따라 보관되며, 이 기간 내에 다른 Consumer Group이 같은 데이터를 독립적으로 읽거나, offset을 되돌려 재처리할 수 있습니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>다중 Consumer 독립 소비:</strong> 하나의 Topic에 여러 Consumer Group이 각자의 offset을 가지고 독립적으로 소비합니다. 메시지를 "소비"하는 것이 아니라 "읽는" 것이기 때문에, 같은 데이터를 실시간 처리, 배치 분석, 로그 저장 등 서로 다른 목적으로 동시에 활용할 수 있습니다.</span>
              </div>
            </div>

            <DiagramGrid cols={2}>
              <DiagramContainer title="Message Queue">
                <DiagramFlow vertical>
                  <DiagramNode icon="📨" label="msg3" color="#ef4444" />
                  <DiagramArrow vertical color="#ef4444" />
                  <DiagramNode icon="📨" label="msg2" color="#ef4444" />
                  <DiagramArrow vertical color="#ef4444" />
                  <DiagramNode icon="📨" label="msg1" color="#ef4444" />
                  <DiagramArrow vertical label="꺼내면 삭제" color="#ef4444" />
                  <DiagramNode icon="👤" label="Consumer" color="#ef4444" />
                </DiagramFlow>
              </DiagramContainer>
              <DiagramContainer title="Kafka Log - append-only">
                <DiagramFlow>
                  <DiagramNode label="0" color="#06b6d4" />
                  <DiagramArrow color="#06b6d4" animated={false} />
                  <DiagramNode label="1" color="#06b6d4" />
                  <DiagramArrow color="#06b6d4" animated={false} />
                  <DiagramNode label="2" color="#06b6d4" sub="Consumer A" />
                  <DiagramArrow color="#06b6d4" animated={false} />
                  <DiagramNode label="3" color="#06b6d4" />
                  <DiagramArrow color="#06b6d4" animated={false} />
                  <DiagramNode label="4" color="#22c55e" sub="Consumer B" />
                  <DiagramArrow color="#06b6d4" animated={false} />
                  <DiagramNode label="5" color="#06b6d4" />
                </DiagramFlow>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '12px' }}>
                  <DiagramNode icon="👤" label="Consumer A" sub="offset=2 (읽기)" color="#06b6d4" />
                  <DiagramNode icon="👤" label="Consumer B" sub="offset=4 (읽기)" color="#22c55e" />
                </div>
              </DiagramContainer>
            </DiagramGrid>
            <div style={{ fontSize: '11px', color: '#64748b', padding: '8px 20px', fontFamily: "'JetBrains Mono', monospace" }}>
              Message Queue: 소비 = 삭제, 1:1 전달 &nbsp;|&nbsp; Kafka: 소비 = 읽기, offset 기반 독립 소비, 재처리 가능
            </div>
          </div>

          {/* 사용 사례 */}
          <div className="kf-section-box">
            <div className="kf-section-subtitle"><span style={{ color: '#3b82f6' }}>주요 사용 사례</span></div>
            <div className="kf-usecase-grid">
              <div className="kf-usecase">
                <span className="kf-usecase-icon">📡</span>
                <div>
                  <div className="kf-usecase-label">이벤트 스트리밍</div>
                  <div className="kf-usecase-desc">사용자 행동, 클릭, 거래 이벤트를 실시간으로 수집하고 처리</div>
                </div>
              </div>
              <div className="kf-usecase">
                <span className="kf-usecase-icon">📊</span>
                <div>
                  <div className="kf-usecase-label">로그 수집</div>
                  <div className="kf-usecase-desc">분산 시스템의 로그를 중앙 집중화하여 모니터링 및 분석</div>
                </div>
              </div>
              <div className="kf-usecase">
                <span className="kf-usecase-icon">🔄</span>
                <div>
                  <div className="kf-usecase-label">CDC (Change Data Capture)</div>
                  <div className="kf-usecase-desc">데이터베이스 변경 이벤트를 실시간으로 캡처하여 다른 시스템에 전파</div>
                </div>
              </div>
              <div className="kf-usecase">
                <span className="kf-usecase-icon">🔗</span>
                <div>
                  <div className="kf-usecase-label">실시간 데이터 파이프라인</div>
                  <div className="kf-usecase-desc">ETL 파이프라인의 중심축으로 다양한 데이터 소스를 연결</div>
                </div>
              </div>
              <div className="kf-usecase">
                <span className="kf-usecase-icon">🧩</span>
                <div>
                  <div className="kf-usecase-label">마이크로서비스 통신</div>
                  <div className="kf-usecase-desc">서비스 간 비동기 이벤트 기반 통신으로 느슨한 결합 달성</div>
                </div>
              </div>
              <div className="kf-usecase">
                <span className="kf-usecase-icon">⏱️</span>
                <div>
                  <div className="kf-usecase-label">CQRS / Event Sourcing</div>
                  <div className="kf-usecase-desc">이벤트 로그를 Single Source of Truth로 활용하여 상태 복원</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Kafka 아키텍처 개요 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>Kafka 아키텍처 개요</SectionTitle>
          <div className="kf-grid">
            <div className="kf-card" style={{ borderTop: '3px solid #06b6d4' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>Broker</div>
              <div className="kf-card-title" style={{ color: '#06b6d4' }}>Broker</div>
              <div className="kf-card-desc">
                Kafka 클러스터의 개별 서버 노드입니다. 메시지를 수신하고 디스크에 기록하며, Consumer에게 전달합니다.
                일반적으로 3~5개의 Broker로 클러스터를 구성합니다.<br /><br />
                <strong style={{ color: '#06b6d4' }}>고성능의 비밀:</strong><br />
                • <strong style={{ color: '#e2e8f0' }}>Sequential I/O</strong> — 디스크를 순차적으로 읽고 쓰므로 랜덤 I/O 대비 수백 배 빠름<br />
                • <strong style={{ color: '#e2e8f0' }}>Page Cache</strong> — OS 커널의 페이지 캐시를 활용하여 JVM 힙 메모리 없이 데이터를 메모리에 캐싱<br />
                • <strong style={{ color: '#e2e8f0' }}>Zero-Copy</strong> — <code style={{ fontSize: '10px', color: '#06b6d4' }}>sendfile()</code> 시스템 콜로 커널 버퍼에서 네트워크 소켓으로 직접 전송, CPU 복사 오버헤드 제거
              </div>
            </div>
            <div className="kf-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>Topic & Partition</div>
              <div className="kf-card-title" style={{ color: '#3b82f6' }}>Topic & Partition</div>
              <div className="kf-card-desc">
                <strong style={{ color: '#e2e8f0' }}>Topic</strong>은 메시지의 논리적 카테고리이며, 내부적으로 여러 <strong style={{ color: '#e2e8f0' }}>Partition</strong>으로 나뉩니다.
                각 Partition은 순서가 보장되는 append-only 로그이며, 병렬 처리의 기본 단위입니다.
              </div>
            </div>
            <div className="kf-card" style={{ borderTop: '3px solid #a855f7' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>Segment</div>
              <div className="kf-card-title" style={{ color: '#a855f7' }}>Segment</div>
              <div className="kf-card-desc">
                각 Partition은 내부적으로 여러 <strong style={{ color: '#e2e8f0' }}>Segment 파일</strong>로 구성됩니다.
                활성 Segment에 쓰기가 이루어지며, 크기/시간 기준으로 롤오버됩니다. 오래된 Segment는 retention 정책에 따라 삭제 또는 compact됩니다.
              </div>
            </div>
            <div className="kf-card" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Consumer Group</div>
              <div className="kf-card-title" style={{ color: '#22c55e' }}>Consumer Group</div>
              <div className="kf-card-desc">
                같은 <strong style={{ color: '#e2e8f0' }}>group.id</strong>를 공유하는 Consumer들의 집합입니다.
                각 Partition은 그룹 내 하나의 Consumer에만 할당되어, 병렬 처리와 메시지 중복 방지를 동시에 달성합니다.
              </div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <DiagramContainer title="Kafka Cluster Architecture">
              <DiagramFlow>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                  <DiagramNode icon="📤" label="Producer 1" sub="App" color="#f97316" />
                  <DiagramNode icon="📤" label="Producer 2" sub="App" color="#f97316" />
                </div>
                <DiagramArrow label="send" color="#f97316" />
                <DiagramGroup label="Broker Cluster" color="#06b6d4">
                  <DiagramGrid cols={3}>
                    <DiagramGroup label="Broker 1" color="#3b82f6">
                      <DiagramFlow vertical>
                        <DiagramNode label="P0 (L)" color="#f97316" />
                        <DiagramNode label="P1 (F)" color="#475569" />
                        <DiagramNode label="P2 (F)" color="#475569" />
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramGroup label="Broker 2" color="#3b82f6">
                      <DiagramFlow vertical>
                        <DiagramNode label="P0 (F)" color="#475569" />
                        <DiagramNode label="P1 (L)" color="#f97316" />
                        <DiagramNode label="P2 (F)" color="#475569" />
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramGroup label="Broker 3" color="#3b82f6">
                      <DiagramFlow vertical>
                        <DiagramNode label="P0 (F)" color="#475569" />
                        <DiagramNode label="P1 (F)" color="#475569" />
                        <DiagramNode label="P2 (L)" color="#f97316" />
                      </DiagramFlow>
                    </DiagramGroup>
                  </DiagramGrid>
                </DiagramGroup>
                <DiagramArrow label="consume" color="#22c55e" />
                <DiagramGroup label="Consumer Group" color="#22c55e">
                  <DiagramFlow vertical>
                    <DiagramNode icon="👤" label="Consumer 1" color="#22c55e" />
                    <DiagramNode icon="👤" label="Consumer 2" color="#22c55e" />
                    <DiagramNode icon="👤" label="Consumer 3" color="#22c55e" />
                  </DiagramFlow>
                </DiagramGroup>
              </DiagramFlow>
            </DiagramContainer>
            <div style={{ fontSize: '11px', color: '#64748b', padding: '8px 20px', fontFamily: "'JetBrains Mono', monospace" }}>
              (L) = Leader Replica, (F) = Follower Replica — 각 Partition의 Leader가 다른 Broker에 분산되어 부하 분산
            </div>
          </div>

          {/* Topic → Partition → Segment → Index 파일 계층 구조 */}
          <div style={{ marginTop: '20px' }}>
            <div className="kf-section-box">
              <div className="kf-section-subtitle"><span style={{ color: '#a855f7' }}>데이터 저장 계층 구조</span></div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '14px' }}>
                Kafka의 데이터는 <strong style={{ color: '#e2e8f0' }}>Topic → Partition → Segment → Index</strong> 계층으로 구성됩니다. 이 구조가 Sequential I/O와 결합되어 높은 처리량을 만들어냅니다.
              </div>
              <DiagramContainer title="Topic → Partition → Segment → Index">
                <DiagramFlow vertical>
                  <DiagramNode icon="📁" label="Topic: orders" color="#a855f7" />
                  <DiagramArrow vertical color="#a855f7" />
                  <DiagramFlow>
                    <DiagramGroup label="Partition 0/" color="#3b82f6">
                      <DiagramFlow vertical>
                        <DiagramGroup label="Segment 0 (offset: 0)" color="#f97316">
                          <DiagramFlow>
                            <DiagramNode icon="📄" label=".log" sub="메시지 데이터" color="#22c55e" />
                            <DiagramNode icon="📑" label=".index" sub="Offset Index" color="#06b6d4" />
                            <DiagramNode icon="🕐" label=".timeindex" sub="Timestamp Index" color="#06b6d4" />
                          </DiagramFlow>
                        </DiagramGroup>
                        <DiagramGroup label="Segment 1 (offset: 65536)" color="#f97316" style={{ opacity: 0.7 }}>
                          <DiagramFlow>
                            <DiagramNode label=".log" color="#22c55e" />
                            <DiagramNode label=".index" color="#06b6d4" />
                            <DiagramNode label=".timeindex" color="#06b6d4" />
                          </DiagramFlow>
                        </DiagramGroup>
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramNode label="Partition 1/" sub="Segments ..." color="#475569" />
                    <DiagramNode label="Partition 2/" sub="Segments ..." color="#475569" />
                  </DiagramFlow>
                </DiagramFlow>
              </DiagramContainer>
              <div style={{ fontSize: '11px', color: '#64748b', padding: '8px 20px', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}>
                Segment 파일명 = 해당 Segment의 시작 offset (Base Offset)<br />
                log.segment.bytes (기본 1GB) 또는 log.roll.ms 기준으로 새 Segment 생성<br />
                Index 파일로 offset → 물리 위치를 O(1)로 조회 (Sparse Index)
              </div>
            </div>
          </div>

          {/* ZooKeeper vs KRaft */}
          <div style={{ marginTop: '20px' }}>
            <div className="kf-compare-grid">
              <div className="kf-card" style={{ borderTop: '3px solid #f59e0b' }}>
                <div className="kf-card-badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Legacy</div>
                <div className="kf-card-title" style={{ color: '#f59e0b' }}>ZooKeeper 모드</div>
                <div className="kf-card-desc">
                  Kafka 2.x 이하의 기본 메타데이터 관리 방식입니다. Broker 등록, Controller 선출, Topic/Partition 메타데이터를 ZooKeeper에 저장합니다.<br /><br />
                  <strong style={{ color: '#ef4444' }}>문제점:</strong> 별도의 ZooKeeper 클러스터 운영 필요, Partition 수 증가 시 메타데이터 갱신 지연, Controller 장애 복구 느림 (수분 소요)
                </div>
              </div>
              <div className="kf-card" style={{ borderTop: '3px solid #22c55e' }}>
                <div className="kf-card-badge" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Kafka 3.x+</div>
                <div className="kf-card-title" style={{ color: '#22c55e' }}>KRaft 모드</div>
                <div className="kf-card-desc">
                  Kafka 3.3부터 Production Ready. ZooKeeper 없이 <strong style={{ color: '#e2e8f0' }}>Raft 합의 알고리즘</strong> 기반으로 Broker 자체가 메타데이터를 관리합니다.<br /><br />
                  <strong style={{ color: '#22c55e' }}>장점:</strong> 운영 복잡도 감소, Controller 장애 복구 수초 내, Partition 수백만 개까지 확장 가능, 단일 프로세스 모델
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Partition & Replication ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>Partition & Replication</SectionTitle>

          {/* Partition 역할 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#3b82f6' }}>Partition의 역할</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚡</span>
                <span><strong style={{ color: '#e2e8f0' }}>병렬성:</strong> Partition 수만큼 Consumer를 병렬로 투입할 수 있어 처리량(Throughput)이 선형적으로 증가합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📋</span>
                <span><strong style={{ color: '#e2e8f0' }}>순서 보장 단위:</strong> 같은 Partition 내에서만 순서가 보장됩니다. 전체 Topic 수준의 순서 보장은 Partition이 1개일 때만 가능합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📍</span>
                <span><strong style={{ color: '#e2e8f0' }}>Offset:</strong> 각 Partition 내 메시지는 고유한 offset(순차 번호)을 가지며, Consumer는 이 offset을 기준으로 어디까지 읽었는지 추적합니다.</span>
              </div>
            </div>
          </div>

          {/* Partition 전략 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#a855f7' }}>Partition 전략</span></div>
            <div className="kf-param-grid">
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#3b82f6' }}>Key 기반 파티셔닝</div>
                <div className="kf-param-desc">
                  <strong style={{ color: '#e2e8f0' }}>같은 Key는 항상 같은 Partition으로.</strong> hash(key) % partitionCount 방식.
                  주문 ID를 Key로 사용하면 같은 주문의 모든 이벤트가 순서대로 처리됩니다.<br />
                  <span style={{ color: '#f59e0b', fontSize: '11px' }}>주의: Partition 수가 변경되면 해시 매핑이 달라져 같은 Key가 다른 Partition으로 갈 수 있습니다.</span>
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>가장 많이 사용</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#22c55e' }}>Round-Robin</div>
                <div className="kf-param-desc">
                  Key가 null일 때 기본 동작. Partition에 균등 분배합니다. 순서 보장이 필요 없는 로그성 데이터에 적합합니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Key 없을 때 기본</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#f59e0b' }}>Sticky Partitioner</div>
                <div className="kf-param-desc">
                  Kafka 2.4+. Key가 null일 때 배치가 꽉 찰 때까지 같은 Partition에 보내다가 다음 Partition으로 전환합니다. 네트워크 효율성이 크게 향상됩니다.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Kafka 2.4+ 기본</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#a855f7' }}>Custom Partitioner</div>
                <div className="kf-param-desc">
                  Partitioner 인터페이스를 구현하여 비즈니스 로직에 맞는 분배 전략을 적용할 수 있습니다. 예: VIP 고객 전용 Partition.
                </div>
                <div className="kf-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>특수 요구사항</div>
              </div>
            </div>
          </div>

          {/* Hot Partition 문제 */}
          <HighlightBox color="#f59e0b" style={{ marginBottom: '20px' }}>
            <strong style={{ color: '#f59e0b' }}>Hot Partition 문제:</strong> 특정 Key에 트래픽이 집중되면 해당 Partition만 과부하가 걸리는 "Hot Partition" 현상이 발생합니다.
            예를 들어 대형 쇼핑몰에서 인기 상품의 ID를 Key로 사용하면 해당 Partition의 Consumer만 병목이 됩니다.<br /><br />
            <strong style={{ color: '#e2e8f0' }}>해결 방법:</strong> (1) Key 설계 변경 — 복합 Key 사용(상품ID + 랜덤 suffix)으로 분산 (2) Custom Partitioner로 트래픽 비율에 따라 동적 분배 (3) 해당 Topic의 Partition 수를 충분히 늘리기
          </HighlightBox>

          {/* Replication */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>Replication & ISR</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔒</span>
                <span><strong style={{ color: '#e2e8f0' }}>Replication Factor:</strong> 각 Partition의 복제본 수. RF=3이면 원본 1개 + 복제본 2개. Broker 장애 시에도 데이터 유실을 방지합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">👑</span>
                <span><strong style={{ color: '#e2e8f0' }}>Leader/Follower:</strong> 각 Partition에는 하나의 Leader와 나머지 Follower가 있습니다. 모든 읽기/쓰기는 Leader를 통해 이루어지며, Follower는 Leader의 데이터를 복제합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>ISR (In-Sync Replicas):</strong> Leader와 동기화가 완료된 Replica 집합입니다. Follower가 <code style={{ color: '#06b6d4', fontSize: '11px' }}>replica.lag.time.max.ms</code>(기본값 <strong style={{ color: '#e2e8f0' }}>30초</strong>) 이내에 Fetch 요청을 보내지 못하면 ISR에서 제외됩니다. 이는 네트워크 지연, GC 일시 중지, 디스크 I/O 병목 등으로 발생할 수 있습니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚠️</span>
                <span><strong style={{ color: '#e2e8f0' }}>min.insync.replicas:</strong> Producer의 <code style={{ color: '#06b6d4', fontSize: '11px' }}>acks=all</code>일 때, 최소 이 수만큼의 ISR이 존재해야 쓰기 성공. RF=3, min.insync.replicas=2가 실무 표준입니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⭐</span>
                <span><strong style={{ color: '#e2e8f0' }}>Preferred Leader:</strong> 각 Partition이 최초 생성될 때 지정된 "선호 Leader" Broker입니다. 장애 복구 후 Leader가 다른 Broker에 편중될 수 있는데, <code style={{ color: '#06b6d4', fontSize: '11px' }}>auto.leader.rebalance.enable=true</code>(기본값)로 설정하면 주기적으로 Preferred Leader로 재선출하여 클러스터 부하를 균등하게 분산합니다.</span>
              </div>
            </div>

            <DiagramContainer title="Replication & ISR">
              <DiagramFlow>
                <DiagramGroup label="Broker 1" color="#22c55e">
                  <DiagramNode icon="👑" label="Partition 0 Leader" sub="offset: 0~99 | ISR ✓" color="#f97316" />
                </DiagramGroup>
                <DiagramArrow label="Replicate" color="#06b6d4" />
                <DiagramGroup label="Broker 2" color="#06b6d4">
                  <DiagramNode icon="📋" label="Partition 0 Follower" sub="offset: 0~99 | ISR ✓" color="#06b6d4" />
                </DiagramGroup>
                <DiagramArrow label="Replicate" color="#ef4444" dashed />
                <DiagramGroup label="Broker 3" color="#ef4444">
                  <DiagramNode icon="⚠️" label="Partition 0 Follower" sub="offset: 0~97 | ISR ✗ (Lag)" color="#ef4444" />
                </DiagramGroup>
              </DiagramFlow>
            </DiagramContainer>
            <div style={{ fontSize: '11px', color: '#64748b', padding: '8px 20px', fontFamily: "'JetBrains Mono', monospace" }}>
              min.insync.replicas=2 → ISR이 2개(B1, B2) 이므로 쓰기 정상 | Broker 3은 Lag 발생으로 ISR에서 제외
            </div>

            {/* min.insync.replicas 시나리오 표 */}
            <div style={{ marginTop: '16px', fontSize: '13px', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>min.insync.replicas 설정별 장애 시나리오 (acks=all 기준)</div>
            <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #1a2234' }}>
              <table className="kf-scenario-table">
                <thead>
                  <tr>
                    <th>RF</th>
                    <th>min.insync</th>
                    <th>장애 상황</th>
                    <th>ISR 수</th>
                    <th>결과</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#e2e8f0' }}>3</td>
                    <td style={{ fontWeight: 700, color: '#06b6d4' }}>2</td>
                    <td>Broker 1대 장애</td>
                    <td>2</td>
                    <td className="kf-scenario-ok">정상 운영</td>
                    <td>ISR 2 &ge; min.insync 2, 읽기/쓰기 모두 정상</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#e2e8f0' }}>3</td>
                    <td style={{ fontWeight: 700, color: '#06b6d4' }}>2</td>
                    <td>Broker 2대 장애</td>
                    <td>1</td>
                    <td className="kf-scenario-fail">쓰기 불가</td>
                    <td>ISR 1 &lt; min.insync 2, NotEnoughReplicasException 발생. 읽기는 가능</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#e2e8f0' }}>3</td>
                    <td style={{ fontWeight: 700, color: '#06b6d4' }}>1</td>
                    <td>Broker 2대 장애</td>
                    <td>1</td>
                    <td className="kf-scenario-warn">쓰기 가능 (위험)</td>
                    <td>ISR 1 &ge; min.insync 1이므로 쓰기 성공하지만, 남은 1대마저 장애 나면 데이터 유실</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#e2e8f0' }}>3</td>
                    <td style={{ fontWeight: 700, color: '#06b6d4' }}>3</td>
                    <td>Broker 1대 장애</td>
                    <td>2</td>
                    <td className="kf-scenario-fail">쓰기 불가</td>
                    <td>ISR 2 &lt; min.insync 3, 과도한 설정으로 가용성 저하. 실무에서 비권장</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Leader Election */}
          <div className="kf-section-box">
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>Leader Election</span></div>
            <div className="kf-step-list">
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>1</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>Leader 장애 감지:</strong> Controller Broker가 Leader Broker의 장애를 감지합니다 (ZooKeeper/KRaft를 통해).
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>2</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>ISR에서 새 Leader 선출:</strong> ISR 목록에서 새로운 Leader를 선출합니다. ISR에 속한 Replica만이 Leader가 될 수 있어 데이터 유실을 방지합니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>3</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>클라이언트 리다이렉트:</strong> 새로운 Leader 정보가 전파되고, Producer/Consumer는 자동으로 새 Leader에 연결합니다.
                </div>
              </div>
            </div>

            <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
              <strong style={{ color: '#f59e0b' }}>면접 포인트:</strong> <code style={{ fontSize: '11px' }}>unclean.leader.election.enable=true</code>이면 ISR 밖의 Replica도 Leader가 될 수 있어 가용성은 높아지지만, 데이터 유실 위험이 있습니다. 일반적으로 <code style={{ fontSize: '11px' }}>false</code>(기본값)로 두고 데이터 안정성을 우선시합니다.
            </HighlightBox>
          </div>
        </div>

        {/* ── 한눈에 비교 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>한눈에 비교</SectionTitle>

          {/* Kafka vs RabbitMQ */}
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginBottom: '12px' }}>Kafka vs RabbitMQ</div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '24px' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '20%' }}>비교 항목</th>
                  <th style={{ color: '#06b6d4' }}>Apache Kafka</th>
                  <th style={{ color: '#a855f7' }}>RabbitMQ</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['모델', '분산 로그 (Append-only Log)', '메시지 브로커 (Message Queue)'],
                  ['프로토콜', '자체 바이너리 프로토콜 (TCP)', 'AMQP (Advanced Message Queuing Protocol)'],
                  ['소비 방식', 'Pull (Consumer가 가져감)', 'Push (Broker가 보내줌)'],
                  ['메시지 보관', '설정된 기간/크기만큼 보관', '소비 후 삭제 (기본)'],
                  ['순서 보장', 'Partition 내 보장', 'Queue 내 보장'],
                  ['처리량', '매우 높음 (수백만 msg/s)', '보통 (수만 msg/s)'],
                  ['확장 방식', 'Partition 추가로 수평 확장', 'Queue 미러링, Shovel, Federation'],
                  ['Consumer Group', '네이티브 지원, Rebalancing', '경쟁 Consumer로 구현'],
                  ['재처리', 'offset 리셋으로 재처리 가능', '불가 (이미 삭제됨)'],
                  ['라우팅', 'Topic + Partition Key', 'Exchange (Direct/Topic/Fanout/Headers)'],
                  ['적합한 사례', '이벤트 스트리밍, 로그 수집, CDC', '작업 큐, RPC, 복잡한 라우팅'],
                ].map(([label, kafka, rabbit]) => (
                  <tr key={label}>
                    <td style={{ color: '#5a6a85', fontWeight: 600, fontSize: '12px' }}>{label}</td>
                    <td style={{ color: '#67e8f9', fontSize: '12px' }}>{kafka}</td>
                    <td style={{ color: '#c4b5fd', fontSize: '12px' }}>{rabbit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <HighlightBox color="#06b6d4" style={{ marginBottom: '24px' }}>
            <strong style={{ color: '#06b6d4' }}>Kafka의 높은 처리량을 가능하게 하는 4가지 핵심 기술:</strong><br /><br />
            <strong style={{ color: '#e2e8f0' }}>1. Sequential I/O</strong> — 디스크 헤드 이동 없이 순차 쓰기/읽기. HDD에서도 600MB/s 이상 달성 가능<br />
            <strong style={{ color: '#e2e8f0' }}>2. Page Cache</strong> — OS 커널의 파일 시스템 캐시를 활용. JVM GC 영향 없이 메모리 수준의 읽기 속도<br />
            <strong style={{ color: '#e2e8f0' }}>3. Zero-Copy</strong> — <code style={{ fontSize: '11px', color: '#06b6d4' }}>sendfile()</code> 시스템 콜로 유저 스페이스 복사 없이 커널 → NIC 직접 전송<br />
            <strong style={{ color: '#e2e8f0' }}>4. Batch 전송</strong> — 여러 메시지를 배치로 묶어 네트워크 왕복 횟수와 I/O 호출을 최소화
          </HighlightBox>

          {/* Producer 설정 요약 */}
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#94a3b8', marginBottom: '12px' }}>Producer 핵심 설정 요약</div>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '25%' }}>설정</th>
                  <th style={{ width: '15%' }}>신뢰성 우선</th>
                  <th style={{ width: '15%' }}>성능 우선</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['acks', 'all', '0 또는 1', '메시지 확인 수준'],
                  ['enable.idempotence', 'true', 'false', '중복 전송 방지'],
                  ['max.in.flight.requests', '5 (idempotent)', '5+', '동시 전송 요청 수'],
                  ['retries', 'MAX_VALUE', '0~3', '재시도 횟수'],
                  ['linger.ms', '5~20', '0', '배치 대기 시간'],
                  ['compression.type', 'lz4/zstd', 'none', '압축 방식'],
                  ['batch.size', '32~64KB', '16KB', '배치 크기'],
                ].map(([setting, reliable, fast, desc]) => (
                  <tr key={setting}>
                    <td style={{ color: '#06b6d4', fontWeight: 700, fontSize: '11px', fontFamily: "'JetBrains Mono',monospace" }}>{setting}</td>
                    <td style={{ color: '#22c55e', fontSize: '12px', fontWeight: 700 }}>{reliable}</td>
                    <td style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 700 }}>{fast}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#f59e0b']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            {
              q: 'Kafka에서 메시지 순서를 보장하려면 어떻게 해야 하나요?',
              a: 'Kafka는 Partition 단위로 순서를 보장합니다. 따라서 순서가 필요한 메시지는 같은 Partition으로 보내야 하며, 이를 위해 메시지 Key를 활용합니다. 예를 들어 주문 ID를 Key로 설정하면, 같은 주문의 모든 이벤트가 같은 Partition에 순서대로 적재됩니다. Producer 측에서는 enable.idempotence=true를 설정하면 max.in.flight.requests.per.connection=5까지도 순서가 보장됩니다. Broker가 Sequence Number를 기반으로 순서를 추적하기 때문입니다. 주의할 점은 Partition 수가 변경되면 Key의 해시값 매핑이 달라져 순서 보장이 깨질 수 있으므로, Partition 수 변경은 신중해야 합니다.',
            },
            {
              q: 'Kafka와 RabbitMQ의 차이점은?',
              a: 'Kafka는 분산 로그 시스템이고 RabbitMQ는 전통적인 메시지 브로커입니다. 핵심 차이는 세 가지입니다. 첫째, 소비 모델 - Kafka는 Consumer가 Pull하고 offset을 직접 관리하며, RabbitMQ는 Broker가 Push합니다. 둘째, 메시지 보관 - Kafka는 설정된 기간 동안 메시지를 보관하여 재처리가 가능하고, RabbitMQ는 소비 후 삭제합니다. 셋째, 처리량 - Kafka는 Sequential I/O와 Zero-Copy로 매우 높은 처리량(수백만 msg/s)을 제공하고, RabbitMQ는 복잡한 라우팅(Exchange 타입)에 강점이 있습니다. 이벤트 스트리밍, 로그 수집, CDC에는 Kafka가, 작업 큐나 복잡한 라우팅 패턴에는 RabbitMQ가 적합합니다.',
            },
            {
              q: 'acks=all과 min.insync.replicas의 관계는?',
              a: 'acks=all은 Producer가 ISR(In-Sync Replicas)의 모든 Replica에 메시지가 기록될 때까지 기다린다는 설정입니다. min.insync.replicas는 acks=all일 때 쓰기가 성공하려면 최소 몇 개의 ISR이 있어야 하는지를 정의합니다. 예를 들어 Replication Factor=3, min.insync.replicas=2이면, 최소 2개의 ISR이 있어야 쓰기가 성공합니다. Broker 1대가 장애 나도 ISR이 2개 남으므로 정상 운영됩니다. 만약 2대가 장애 나면 ISR이 1개뿐이므로 NotEnoughReplicasException이 발생하여 쓰기가 거부됩니다. 이는 데이터 안정성을 위한 의도적인 동작으로, 데이터 유실보다 가용성 일시 중단을 선택하는 것입니다.',
            },
            {
              q: 'Kafka가 높은 처리량을 달성하는 원리는?',
              a: 'Kafka의 높은 처리량은 4가지 핵심 기술의 조합입니다. 첫째, Sequential I/O — Partition이 append-only 로그 구조이므로 디스크를 순차적으로 읽고 씁니다. 랜덤 I/O 대비 수백 배 빠르며 HDD에서도 600MB/s 이상을 달성할 수 있습니다. 둘째, Page Cache — Kafka는 자체 캐시 대신 OS 커널의 페이지 캐시를 활용합니다. JVM 힙 메모리를 사용하지 않으므로 GC 오버헤드가 없고, Broker 재시작 시에도 OS 캐시가 유지되어 워밍업이 필요 없습니다. 셋째, Zero-Copy — Consumer가 데이터를 읽을 때 sendfile() 시스템 콜을 사용하여 커널 버퍼에서 네트워크 소켓으로 직접 전송합니다. 유저 스페이스로의 데이터 복사가 제거되어 CPU 사용률이 크게 감소합니다. 넷째, Batch 전송 — Producer는 여러 메시지를 배치로 묶어 한 번의 네트워크 요청으로 전송하고, 배치 단위로 압축(lz4, zstd)하여 네트워크 대역폭도 절약합니다.',
            },
            {
              q: 'Kafka에서 Hot Partition 문제가 발생하면 어떻게 해결하나요?',
              a: 'Hot Partition은 특정 Key에 트래픽이 집중되어 해당 Partition만 과부하가 걸리는 현상입니다. 예를 들어 대형 쇼핑몰에서 인기 상품 ID를 Key로 사용하면 소수의 Partition에 대부분의 트래픽이 몰립니다. 해결 방법은 크게 세 가지입니다. 첫째, Key 재설계 — 복합 Key를 사용합니다. 예를 들어 "상품ID-랜덤suffix"와 같이 Key를 구성하면 같은 상품의 이벤트가 여러 Partition으로 분산됩니다. 단, 순서 보장 범위가 좁아지는 트레이드오프가 있으므로 비즈니스 요구사항에 맞게 판단해야 합니다. 둘째, Custom Partitioner 구현 — Kafka의 Partitioner 인터페이스를 구현하여 트래픽 비율이나 Key 분포에 따라 동적으로 Partition을 할당하는 로직을 작성합니다. 셋째, Topic 설계 변경 — Partition 수를 충분히 늘리거나, 핫스팟이 되는 데이터를 별도 Topic으로 분리하여 처리합니다.',
            },
          ]} />
        </div>
      </div>
    </>
  )
}

import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup, DiagramGrid } from '../../components/doc/Diagram'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.kf-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.kf-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.kf-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.kf-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.kf-card-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.kf-mono-box { background:#080b11; border:1px solid #1a2234; border-radius:10px; padding:18px 20px; font-family:'JetBrains Mono',monospace; font-size:11px; line-height:1.9; color:#64748b; white-space:pre; overflow-x:auto; }
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
.kf-tag { display:inline-flex; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-right:6px; }
.kf-scenario-box { background:rgba(255,255,255,0.02); border:1px solid #1a2234; border-radius:10px; padding:16px 18px; margin-bottom:10px; }
.kf-scenario-title { font-size:13px; font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:8px; }
.kf-scenario-flow { font-size:11px; color:#64748b; line-height:1.8; font-family:'JetBrains Mono',monospace; }
.kf-compare-table { width:100%; border-collapse:collapse; font-size:12px; }
.kf-compare-table th { padding:10px 14px; text-align:left; color:#94a3b8; font-weight:700; border-bottom:1px solid #1a2234; background:rgba(255,255,255,0.02); }
.kf-compare-table td { padding:10px 14px; color:#94a3b8; border-bottom:1px solid rgba(26,34,52,0.5); }
.kf-compare-table tr:last-child td { border-bottom:none; }
.kf-sub-section { margin-top:20px; padding-top:18px; border-top:1px solid rgba(26,34,52,0.5); }
`

export default function KafkaDeliveryPatterns() {
  useInjectCSS('style-kafka-delivery-patterns', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Delivery Semantics · Design Patterns · 면접 심화"
          title={<><span style={{ color: '#22c55e' }}>전달 보장 & 설계 패턴</span></>}
          description="Delivery Semantics와 실무 Kafka 설계 패턴 - Exactly-once, Outbox, DLQ, Schema Registry"
        />

        {/* ── 전달 보장 수준 (Delivery Semantics) ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>전달 보장 수준 (Delivery Semantics)</SectionTitle>

          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234', marginBottom: '20px' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>보장 수준</th>
                  <th style={{ width: '25%' }}>설명</th>
                  <th style={{ width: '25%' }}>구현 방식</th>
                  <th style={{ width: '15%' }}>데이터 유실</th>
                  <th>중복 가능성</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: '#ef4444', fontWeight: 700 }}>At-most-once</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>최대 한 번 전달. 메시지가 유실될 수 있음</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>처리 전에 offset 커밋. acks=0</td>
                  <td style={{ color: '#ef4444', fontSize: '12px', fontWeight: 700 }}>가능</td>
                  <td style={{ color: '#22c55e', fontSize: '12px' }}>없음</td>
                </tr>
                <tr>
                  <td style={{ color: '#f59e0b', fontWeight: 700 }}>At-least-once</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>최소 한 번 전달. 중복이 발생할 수 있음</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>처리 후에 offset 커밋. acks=all + 재시도</td>
                  <td style={{ color: '#22c55e', fontSize: '12px' }}>없음</td>
                  <td style={{ color: '#f59e0b', fontSize: '12px', fontWeight: 700 }}>가능</td>
                </tr>
                <tr>
                  <td style={{ color: '#22c55e', fontWeight: 700 }}>Exactly-once</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>정확히 한 번 전달. 유실도 중복도 없음</td>
                  <td style={{ color: '#94a3b8', fontSize: '12px' }}>Idempotent Producer + Transactional API + Consumer read_committed</td>
                  <td style={{ color: '#22c55e', fontSize: '12px' }}>없음</td>
                  <td style={{ color: '#22c55e', fontSize: '12px' }}>없음</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 각 보장 수준별 시나리오 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>각 보장 수준의 실제 장애 시나리오</span></div>

            <div className="kf-scenario-box">
              <div className="kf-scenario-title">
                <span style={{ color: '#ef4444' }}>At-most-once: 메시지 유실 시나리오</span>
              </div>
              <div className="kf-scenario-flow">
{`Consumer poll() → offset 커밋 (처리 전) → 메시지 처리 시작
                                              ↓
                                         처리 중 크래시 발생!
                                              ↓
                                    Consumer 재시작 → 이미 커밋된 offset 이후부터 읽음
                                              ↓
                                    크래시 시점의 메시지는 영원히 유실됨`}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px', lineHeight: 1.7 }}>
                offset을 <strong style={{ color: '#e2e8f0' }}>처리 전에 먼저 커밋</strong>하기 때문에, 처리 도중 크래시가 발생하면 해당 메시지는 이미 "소비됨"으로 표시되어 재시작 후에도 다시 읽지 않습니다. 로그 수집이나 메트릭처럼 일부 유실이 허용되는 경우에 사용합니다.
              </div>
            </div>

            <div className="kf-scenario-box">
              <div className="kf-scenario-title">
                <span style={{ color: '#f59e0b' }}>At-least-once: 메시지 중복 시나리오</span>
              </div>
              <div className="kf-scenario-flow">
{`Consumer poll() → 메시지 처리 완료 → offset 커밋 시도
                                              ↓
                                         커밋 전 크래시 발생!
                                              ↓
                                    Consumer 재시작 → 마지막 커밋된 offset부터 읽음
                                              ↓
                                    이미 처리한 메시지를 다시 받아서 재처리 (중복)`}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px', lineHeight: 1.7 }}>
                메시지를 <strong style={{ color: '#e2e8f0' }}>처리 후에 offset을 커밋</strong>하므로 유실은 없지만, 커밋 전에 크래시가 나면 동일 메시지를 다시 받게 됩니다. 대부분의 실무 시스템에서 기본적으로 사용하며, Consumer 측에서 <strong style={{ color: '#e2e8f0' }}>멱등성 처리</strong>를 추가하여 중복 영향을 제거합니다.
              </div>
            </div>

            <div className="kf-scenario-box">
              <div className="kf-scenario-title">
                <span style={{ color: '#22c55e' }}>Exactly-once: 위 두 문제를 모두 해결</span>
              </div>
              <div className="kf-scenario-flow">
{`Producer: PID + Seq# → Broker가 중복 메시지 필터링 (유실 방지)
Transaction: 메시지 전송 + offset 커밋을 원자적 연산으로 묶음
Consumer: read_committed → 커밋된 트랜잭션 메시지만 읽음

→ 유실도 없고, 중복도 없는 정확히 한 번 전달 보장`}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px', lineHeight: 1.7 }}>
                Idempotent Producer가 유실을 방지하고, Transactional API가 "처리 + 커밋"을 원자적으로 묶어 중복을 방지합니다. 다만 <strong style={{ color: '#e2e8f0' }}>Kafka-to-Kafka 파이프라인</strong>에서만 완전하게 보장됩니다.
              </div>
            </div>
          </div>

          {/* Exactly-once 상세 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>Exactly-once Semantics (EOS) 구현</span></div>
            <div className="kf-step-list">
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>1</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>Idempotent Producer:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>enable.idempotence=true</code>로 Producer 측 중복 전송을 방지합니다. PID + Sequence Number로 Broker가 중복을 필터링합니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>2</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>Transactional API:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>beginTransaction()</code> → 메시지 전송 + offset 커밋 → <code style={{ color: '#06b6d4', fontSize: '11px' }}>commitTransaction()</code>. 메시지 전송과 offset 커밋을 하나의 원자적 연산으로 묶습니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>3</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>Consumer isolation.level=read_committed:</strong> 커밋된 트랜잭션의 메시지만 읽습니다. 아직 커밋/롤백되지 않은 메시지는 건너뜁니다.
                </div>
              </div>
            </div>

            {/* Transaction Coordinator & Transaction Log 내부 동작 */}
            <div className="kf-sub-section">
              <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>Transaction Coordinator & Transaction Log 내부 동작</span></div>
              <DiagramContainer title="TRANSACTION COORDINATOR & TRANSACTION LOG">
                <DiagramFlow vertical>
                  <DiagramGroup label="1. Producer 초기화" color="#a855f7">
                    <DiagramFlow>
                      <DiagramNode label="Producer" color="#a855f7" />
                      <DiagramArrow label="InitPidRequest" color="#a855f7" />
                      <DiagramNode label="Transaction Coordinator" sub="PID + Epoch 할당" color="#a855f7" />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramArrow vertical color="#475569" length={16} />
                  <DiagramGroup label="2. 트랜잭션 시작 & 메시지 전송" color="#06b6d4">
                    <DiagramFlow vertical>
                      <DiagramFlow>
                        <DiagramNode label="Producer" color="#06b6d4" />
                        <DiagramArrow label="beginTransaction()" color="#06b6d4" />
                        <DiagramNode label="TX Coordinator" sub="[TX Log] BEGUN" color="#06b6d4" />
                      </DiagramFlow>
                      <DiagramArrow vertical color="#06b6d4" length={16} />
                      <DiagramFlow>
                        <DiagramNode label="Producer" color="#f97316" />
                        <DiagramArrow label="send(topicA, msg)" color="#f97316" />
                        <DiagramNode label="TX Coordinator" sub="AddPartition(topicA)" color="#f97316" />
                        <DiagramArrow label="write" color="#f97316" />
                        <DiagramNode label="Broker Partitions" color="#f97316" />
                      </DiagramFlow>
                      <DiagramArrow vertical color="#06b6d4" length={16} />
                      <DiagramFlow>
                        <DiagramNode label="Producer" color="#06b6d4" />
                        <DiagramArrow label="sendOffsetsToTx()" color="#06b6d4" />
                        <DiagramNode label="TX Coordinator" sub="AddPartition(__offsets)" color="#06b6d4" />
                      </DiagramFlow>
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramArrow vertical color="#475569" length={16} />
                  <DiagramGroup label="3. 커밋" color="#22c55e">
                    <DiagramFlow>
                      <DiagramNode label="Producer" color="#22c55e" />
                      <DiagramArrow label="commitTransaction()" color="#22c55e" />
                      <DiagramNode label="TX Coordinator" sub="PREPARE_COMMIT → COMMITTED" color="#22c55e" />
                      <DiagramArrow label="WriteTxnMarker" color="#22c55e" />
                      <DiagramNode label="Broker Partitions" sub="COMMIT" color="#22c55e" />
                    </DiagramFlow>
                  </DiagramGroup>
                </DiagramFlow>
              </DiagramContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">📋</span>
                  <span><strong style={{ color: '#e2e8f0' }}>Transaction Coordinator:</strong> 각 transactional.id에 대해 할당되는 Broker. 트랜잭션의 시작, 참여 파티션 등록, 커밋/롤백 등 전체 생명주기를 관리합니다. <code style={{ color: '#06b6d4', fontSize: '11px' }}>__transaction_state</code> 내부 토픽의 특정 파티션 리더가 담당합니다.</span>
                </div>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">📝</span>
                  <span><strong style={{ color: '#e2e8f0' }}>Transaction Log:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>__transaction_state</code> 토픽에 트랜잭션 상태 변경을 기록합니다. BEGUN → PREPARE_COMMIT → COMMITTED (또는 PREPARE_ABORT → ABORTED). Coordinator 크래시 시 이 로그로 트랜잭션 복구가 가능합니다.</span>
                </div>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">🔖</span>
                  <span><strong style={{ color: '#e2e8f0' }}>Transaction Marker:</strong> 커밋/롤백 시 참여한 모든 파티션에 COMMIT 또는 ABORT 마커를 기록합니다. <code style={{ color: '#06b6d4', fontSize: '11px' }}>read_committed</code> Consumer는 이 마커를 확인하여 커밋된 메시지만 읽습니다.</span>
                </div>
              </div>
            </div>

            <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
              <strong style={{ color: '#f59e0b' }}>주의:</strong> Kafka의 EOS는 <strong style={{ color: '#e2e8f0' }}>Kafka-to-Kafka</strong> 파이프라인(Kafka Streams, Consumer → Producer)에서만 보장됩니다. Kafka에서 읽어서 외부 시스템(DB, API 등)에 쓰는 경우에는 EOS를 보장할 수 없으며, <strong style={{ color: '#e2e8f0' }}>At-least-once + 멱등성</strong>이 현실적인 선택입니다.
            </HighlightBox>
          </div>

          {/* 멱등성(Idempotency) 별도 섹션 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>멱등성 (Idempotency)</span></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📐</span>
                <span><strong style={{ color: '#e2e8f0' }}>정의:</strong> 같은 연산을 여러 번 수행해도 결과가 동일한 성질. 수학적으로 f(f(x)) = f(x). 예를 들어 "계좌 잔액을 10,000원으로 설정"은 멱등하지만, "계좌 잔액에 10,000원을 더함"은 멱등하지 않습니다.</span>
              </div>
            </div>

            <div className="kf-sub-section" style={{ marginTop: '14px', paddingTop: '14px' }}>
              <div className="kf-section-subtitle" style={{ fontSize: '13px' }}><span style={{ color: '#06b6d4' }}>HTTP 메서드의 멱등성 비유</span></div>
              <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #1a2234', marginBottom: '14px' }}>
                <table className="kf-compare-table">
                  <thead>
                    <tr>
                      <th>메서드</th>
                      <th>멱등성</th>
                      <th>설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code style={{ color: '#22c55e', fontSize: '11px' }}>GET</code></td>
                      <td style={{ color: '#22c55e', fontWeight: 700 }}>멱등</td>
                      <td>여러 번 조회해도 같은 결과 반환</td>
                    </tr>
                    <tr>
                      <td><code style={{ color: '#22c55e', fontSize: '11px' }}>PUT</code></td>
                      <td style={{ color: '#22c55e', fontWeight: 700 }}>멱등</td>
                      <td>같은 데이터로 여러 번 덮어써도 최종 상태 동일</td>
                    </tr>
                    <tr>
                      <td><code style={{ color: '#22c55e', fontSize: '11px' }}>DELETE</code></td>
                      <td style={{ color: '#22c55e', fontWeight: 700 }}>멱등</td>
                      <td>이미 삭제된 리소스를 다시 삭제해도 결과 동일 (404)</td>
                    </tr>
                    <tr>
                      <td><code style={{ color: '#ef4444', fontSize: '11px' }}>POST</code></td>
                      <td style={{ color: '#ef4444', fontWeight: 700 }}>비멱등</td>
                      <td>여러 번 요청하면 리소스가 중복 생성될 수 있음</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="kf-sub-section" style={{ marginTop: '14px', paddingTop: '14px' }}>
              <div className="kf-section-subtitle" style={{ fontSize: '13px' }}><span style={{ color: '#06b6d4' }}>DB에서 Consumer 멱등성 보장 방법</span></div>
              <div className="kf-step-list">
                <div className="kf-step">
                  <div className="kf-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                  <div className="kf-step-content">
                    <strong style={{ color: '#e2e8f0' }}>Unique Key 제약조건:</strong> 이벤트의 고유 식별자(event_id 등)를 DB의 Unique Key로 설정하여, 동일 이벤트의 중복 INSERT를 DB 레벨에서 차단합니다. 중복 시 <code style={{ color: '#06b6d4', fontSize: '11px' }}>DuplicateKeyException</code> 발생 → 무시 처리.
                  </div>
                </div>
                <div className="kf-step">
                  <div className="kf-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>2</div>
                  <div className="kf-step-content">
                    <strong style={{ color: '#e2e8f0' }}>UPSERT (INSERT ON CONFLICT UPDATE):</strong> 동일 키가 이미 존재하면 INSERT 대신 UPDATE를 수행하여, 몇 번 실행하든 최종 상태가 동일하게 됩니다. <code style={{ color: '#06b6d4', fontSize: '11px' }}>INSERT INTO ... ON CONFLICT DO UPDATE SET ...</code>
                  </div>
                </div>
                <div className="kf-step">
                  <div className="kf-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>3</div>
                  <div className="kf-step-content">
                    <strong style={{ color: '#e2e8f0' }}>이벤트 ID 기반 중복 체크 테이블:</strong> 처리 완료된 이벤트 ID를 별도 테이블에 저장하고, 처리 전에 이미 처리된 이벤트인지 조회합니다. 비즈니스 처리와 이벤트 ID 저장을 <strong style={{ color: '#e2e8f0' }}>같은 트랜잭션</strong>으로 묶어야 합니다.
                  </div>
                </div>
              </div>
            </div>

            <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
              <strong style={{ color: '#22c55e' }}>왜 At-least-once + 멱등성이 실무에서 가장 현실적인가?</strong><br /><br />
              Kafka의 Exactly-once는 <strong style={{ color: '#e2e8f0' }}>Kafka-to-Kafka 파이프라인</strong>에서만 보장됩니다. 실무에서는 대부분 Kafka에서 메시지를 읽어 DB에 저장하거나 외부 API를 호출하는 <strong style={{ color: '#e2e8f0' }}>Kafka-to-External</strong> 패턴이기 때문에 EOS를 적용할 수 없습니다.<br /><br />
              At-least-once는 메시지 유실이 없고, 중복만 발생할 수 있으므로 Consumer 측에서 멱등성을 보장하면 "사실상 Exactly-once"의 효과를 얻을 수 있습니다. 구현 복잡도도 Transactional API 대비 훨씬 낮고, 성능 오버헤드도 적습니다.<br /><br />
              <strong style={{ color: '#e2e8f0' }}>정리: At-least-once (Kafka) + 멱등 Consumer (Application) = 실질적 Exactly-once</strong>
            </HighlightBox>
          </div>

          {/* 포트폴리오 연결 */}
          <HighlightBox color="#a855f7">
            <strong style={{ color: '#a855f7' }}>포트폴리오 연결 - 문서 전처리 서비스:</strong><br /><br />
            프로젝트에서 <strong style={{ color: '#e2e8f0' }}>Outbox 패턴으로 At-least-once 전달을 보장</strong>하고, Consumer 측에서 <strong style={{ color: '#e2e8f0' }}>멱등성(Idempotency) 처리로 중복을 방지</strong>하는 전략을 채택했습니다.<br /><br />
            Kafka-to-External(DB) 파이프라인이므로 Exactly-once를 보장할 수 없어, 실무에서 가장 현실적인 <strong style={{ color: '#e2e8f0' }}>At-least-once + 멱등 Consumer</strong> 조합을 선택했습니다.
            이벤트 ID를 기반으로 이미 처리된 이벤트를 필터링하여, 재처리 시에도 동일한 결과를 보장합니다.
          </HighlightBox>
        </div>

        {/* ── 실무 설계 패턴 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#06b6d4']}>실무 설계 패턴</SectionTitle>

          {/* Outbox 패턴 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#a855f7' }}>Transactional Outbox 패턴</span></div>

            {/* 이중 쓰기 문제 설명 */}
            <div className="kf-section-subtitle" style={{ fontSize: '13px', marginTop: '4px' }}><span style={{ color: '#ef4444' }}>이중 쓰기 문제 (Dual Write Problem)</span></div>
            <DiagramContainer title="이중 쓰기 문제 (DUAL WRITE PROBLEM)">
              <DiagramGrid cols={3}>
                <DiagramGroup label="시나리오 1: DB 성공, Kafka 실패" color="#f97316">
                  <DiagramFlow vertical>
                    <DiagramNode label="1. DB에 주문 저장" color="#f97316" />
                    <DiagramArrow vertical label="성공" color="#f97316" />
                    <DiagramNode label="2. Kafka에 이벤트 발행" color="#ef4444" />
                    <DiagramArrow vertical label="실패" color="#ef4444" />
                    <DiagramNode label="DB에는 주문이 있지만 다른 서비스는 주문을 모름" color="#ef4444" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramGroup label="시나리오 2: Kafka 성공, DB 실패" color="#f97316">
                  <DiagramFlow vertical>
                    <DiagramNode label="1. Kafka에 이벤트 발행" color="#f97316" />
                    <DiagramArrow vertical label="성공" color="#f97316" />
                    <DiagramNode label="2. DB에 주문 저장" color="#ef4444" />
                    <DiagramArrow vertical label="실패" color="#ef4444" />
                    <DiagramNode label="다른 서비스는 주문을 알지만 DB에는 없음 (유령 이벤트)" color="#ef4444" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramGroup label="해결: Outbox 패턴" color="#22c55e">
                  <DiagramFlow vertical>
                    <DiagramNode label="BEGIN TX" color="#22c55e" />
                    <DiagramArrow vertical color="#a855f7" />
                    <DiagramNode label="INSERT order" sub="비즈니스 데이터" color="#a855f7" />
                    <DiagramArrow vertical color="#a855f7" />
                    <DiagramNode label="INSERT outbox_event" sub="이벤트" color="#a855f7" />
                    <DiagramArrow vertical color="#22c55e" />
                    <DiagramNode label="COMMIT TX" sub="둘 다 성공하거나 실패" color="#22c55e" />
                  </DiagramFlow>
                </DiagramGroup>
              </DiagramGrid>
            </DiagramContainer>

            <DiagramContainer title="OUTBOX 패턴 구현 방법 비교">
              <DiagramGrid cols={2}>
                <DiagramGroup label="방법 1: Polling Publisher" color="#06b6d4">
                  <DiagramFlow vertical>
                    <DiagramGroup label="Application" color="#f97316">
                      <DiagramFlow>
                        <DiagramNode label="BEGIN TX" color="#f97316" />
                        <DiagramArrow color="#f97316" />
                        <DiagramNode label="INSERT order" color="#f97316" />
                        <DiagramArrow color="#f97316" />
                        <DiagramNode label="INSERT outbox_event" color="#f97316" />
                        <DiagramArrow color="#f97316" />
                        <DiagramNode label="COMMIT TX" color="#f97316" />
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramArrow vertical label="outbox 테이블" color="#06b6d4" />
                    <DiagramGroup label="Scheduler (Polling)" color="#06b6d4">
                      <DiagramFlow>
                        <DiagramNode label="SELECT * FROM outbox" sub="WHERE sent=FALSE" color="#06b6d4" />
                        <DiagramArrow color="#06b6d4" />
                        <DiagramNode label="UPDATE sent=TRUE" color="#06b6d4" />
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramArrow vertical label="이벤트 전송" color="#22c55e" />
                    <DiagramNode label="Kafka Topic" color="#22c55e" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramGroup label="방법 2: CDC (Change Data Capture)" color="#a855f7">
                  <DiagramFlow vertical>
                    <DiagramGroup label="Application" color="#f97316">
                      <DiagramFlow>
                        <DiagramNode label="BEGIN TX" color="#f97316" />
                        <DiagramArrow color="#f97316" />
                        <DiagramNode label="INSERT order" color="#f97316" />
                        <DiagramArrow color="#f97316" />
                        <DiagramNode label="INSERT outbox_event" color="#f97316" />
                        <DiagramArrow color="#f97316" />
                        <DiagramNode label="COMMIT TX" color="#f97316" />
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramArrow vertical label="binlog" color="#a855f7" />
                    <DiagramGroup label="Debezium CDC" color="#a855f7">
                      <DiagramFlow>
                        <DiagramNode label="binlog 감지" color="#a855f7" />
                        <DiagramArrow color="#a855f7" />
                        <DiagramNode label="outbox 테이블 변경 캡처" color="#a855f7" />
                      </DiagramFlow>
                    </DiagramGroup>
                    <DiagramArrow vertical label="이벤트 전송" color="#22c55e" />
                    <DiagramNode label="Kafka Topic" color="#22c55e" />
                  </DiagramFlow>
                </DiagramGroup>
              </DiagramGrid>
            </DiagramContainer>

            {/* Outbox 테이블 스키마 */}
            <div className="kf-section-subtitle" style={{ fontSize: '13px' }}><span style={{ color: '#a855f7' }}>Outbox 테이블 스키마 예시</span></div>
            <CodeBlock title="Outbox 테이블 스키마" lang="sql" style={{ marginBottom: '16px' }}>
{`CREATE TABLE outbox_events (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    aggregate_type  VARCHAR(255) NOT NULL,    -- 예: "Order", "Payment"
    aggregate_id    VARCHAR(255) NOT NULL,    -- 예: 주문 ID, 결제 ID
    event_type      VARCHAR(255) NOT NULL,    -- 예: "OrderCreated", "PaymentCompleted"
    payload         JSON         NOT NULL,    -- 이벤트 데이터 (JSON)
    created_at      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    sent_at         TIMESTAMP    NULL         -- NULL이면 아직 미전송
);

-- Polling 방식에서 미전송 이벤트를 빠르게 조회하기 위한 인덱스
CREATE INDEX idx_outbox_unsent ON outbox_events(sent_at) WHERE sent_at IS NULL;`}
            </CodeBlock>

            {/* Polling vs CDC 비교 테이블 */}
            <div className="kf-section-subtitle" style={{ fontSize: '13px' }}><span style={{ color: '#a855f7' }}>Polling Publisher vs CDC 비교</span></div>
            <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #1a2234', marginBottom: '16px' }}>
              <table className="kf-compare-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>항목</th>
                    <th style={{ width: '40%' }}>Polling Publisher</th>
                    <th style={{ width: '40%' }}>CDC (Debezium)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>실시간성</td>
                    <td>폴링 주기에 의존 (수초~수분 지연)</td>
                    <td style={{ color: '#22c55e' }}>binlog 기반 거의 실시간</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>DB 부하</td>
                    <td style={{ color: '#ef4444' }}>주기적 SELECT 쿼리로 부하 발생</td>
                    <td style={{ color: '#22c55e' }}>binlog 읽기로 DB 부하 최소</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>구현 복잡도</td>
                    <td style={{ color: '#22c55e' }}>단순 (스케줄러 + SQL)</td>
                    <td style={{ color: '#ef4444' }}>Debezium, Kafka Connect 인프라 필요</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>운영 복잡도</td>
                    <td style={{ color: '#22c55e' }}>낮음</td>
                    <td style={{ color: '#ef4444' }}>Connector 모니터링, 장애 대응 필요</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>순서 보장</td>
                    <td>ORDER BY + LIMIT로 순서 보장</td>
                    <td style={{ color: '#22c55e' }}>binlog 순서 기반 자연스러운 보장</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>확장성</td>
                    <td>이벤트 증가 시 DB 부하 증가</td>
                    <td style={{ color: '#22c55e' }}>대량 이벤트 처리에 유리</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>추천 상황</td>
                    <td>소규모, 빠른 구현 필요 시</td>
                    <td>대규모, 실시간성 중요 시</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🎯</span>
                <span><strong style={{ color: '#e2e8f0' }}>핵심 원리:</strong> 비즈니스 데이터 저장과 이벤트 발행을 같은 DB 트랜잭션으로 묶어, "저장은 됐는데 이벤트는 발행 안 됨" 문제를 해결합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📊</span>
                <span><strong style={{ color: '#e2e8f0' }}>Polling vs CDC:</strong> Polling은 구현이 간단하지만 주기적 조회로 DB 부하 발생. CDC는 binlog를 감지하여 실시간성이 높고 DB 부하가 적지만, Debezium 인프라 운영이 필요합니다.</span>
              </div>
            </div>
          </div>

          {/* DLQ & Retry Topic */}
          <div className="kf-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="kf-card" style={{ borderTop: '3px solid #ef4444' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>Error Handling</div>
              <div className="kf-card-title" style={{ color: '#ef4444' }}>Dead Letter Queue (DLQ)</div>
              <div className="kf-card-desc">
                처리에 실패한 메시지를 별도의 <strong style={{ color: '#e2e8f0' }}>DLQ Topic</strong>으로 이동시킵니다. 원본 Topic의 처리를 차단하지 않고, 실패 메시지를 나중에 분석/재처리할 수 있습니다.<br /><br />
                <strong style={{ color: '#f59e0b' }}>구현:</strong> 메시지 처리 시 지정 횟수만큼 재시도 후 실패하면 DLQ Topic으로 전송. 실패 원인 헤더(에러 메시지, 스택 트레이스, 원본 토픽명 등)를 함께 저장합니다.<br /><br />
                <strong style={{ color: '#e2e8f0' }}>DLQ 처리 전략:</strong><br />
                <span style={{ color: '#06b6d4' }}>1)</span> <strong style={{ color: '#cbd5e1' }}>수동 재처리:</strong> 운영자가 DLQ 메시지를 확인 후 원인 분석, 수정 후 원본 토픽에 재발행<br />
                <span style={{ color: '#06b6d4' }}>2)</span> <strong style={{ color: '#cbd5e1' }}>자동 재처리:</strong> 별도 Consumer가 DLQ를 구독하여 주기적으로 재시도 (일시적 장애 복구 시 유효)<br />
                <span style={{ color: '#06b6d4' }}>3)</span> <strong style={{ color: '#cbd5e1' }}>알림 + 대시보드:</strong> DLQ 적재 시 Slack/PagerDuty 알림 발송, Grafana 대시보드로 실패 메시지 현황 모니터링
              </div>
            </div>
            <div className="kf-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>Retry Strategy</div>
              <div className="kf-card-title" style={{ color: '#f59e0b' }}>Retry Topic 패턴</div>
              <div className="kf-card-desc">
                재시도 대기 시간별로 별도의 Topic을 운영합니다.<br /><br />
                <code style={{ color: '#5a6a85', fontSize: '11px' }}>order-events → order-events-retry-1s → order-events-retry-30s → order-events-retry-5m → order-events-dlq</code><br /><br />
                <strong style={{ color: '#e2e8f0' }}>Exponential Backoff 패턴:</strong><br />
                재시도 간격을 지수적으로 늘려 일시적 장애 시 시스템 부하를 줄입니다. 예: 1초 → 2초 → 4초 → 8초 → ... → 최대 5분. 각 간격에 대응하는 Retry Topic을 두어 지연 시간을 제어합니다.<br /><br />
                <strong style={{ color: '#22c55e' }}>장점:</strong> 원본 Topic을 차단하지 않으면서 점진적으로 재시도 간격을 늘릴 수 있습니다. Spring Kafka에서 <code style={{ color: '#06b6d4', fontSize: '11px' }}>@RetryableTopic</code>으로 간편하게 구현 가능합니다.
              </div>
            </div>
          </div>

          {/* @RetryableTopic 설정 예시 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>Spring Kafka @RetryableTopic 설정 예시</span></div>
            <CodeBlock title="@RetryableTopic 설정" lang="java">
{`@RetryableTopic(
    attempts = "4",                              // 최초 1회 + 재시도 3회
    backoff = @Backoff(
        delay = 1000,                            // 첫 재시도 1초
        multiplier = 3.0,                        // 지수 배수
        maxDelay = 300000                         // 최대 5분
    ),
    autoCreateTopics = "true",
    topicSuffixingStrategy = TopicSuffixingStrategy.SUFFIX_WITH_DELAY_VALUE,
    dltStrategy = DltStrategy.FAIL_ON_ERROR      // 모든 재시도 실패 시 DLQ로
)
@KafkaListener(topics = "order-events")
public void handleOrderEvent(ConsumerRecord<String, String> record) {
    // 비즈니스 로직 처리
    orderService.process(record.value());
}

@DltHandler                                       // DLQ 핸들러
public void handleDlt(ConsumerRecord<String, String> record) {
    log.error("DLQ 메시지 수신: topic={}, key={}, value={}",
        record.topic(), record.key(), record.value());
    // 알림 발송, 모니터링 기록 등
    alertService.notifyDlqMessage(record);
}`}
            </CodeBlock>
            <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '14px 18px', marginTop: '10px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>생성되는 토픽 구조</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {[
                  { topic: 'order-events', desc: '원본', color: '#22c55e' },
                  { topic: 'order-events-retry-1000', desc: '1초 후 재시도', color: '#f59e0b' },
                  { topic: 'order-events-retry-3000', desc: '3초 후 재시도', color: '#f59e0b' },
                  { topic: 'order-events-retry-9000', desc: '9초 후 재시도', color: '#f59e0b' },
                  { topic: 'order-events-dlt', desc: '최종 실패 -> DLQ', color: '#ef4444' },
                ].map(item => (
                  <div key={item.topic} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontFamily: 'var(--mono)', padding: '4px 8px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px' }}>
                    <span style={{ color: item.color, fontWeight: 600, minWidth: '240px' }}>{item.topic}</span>
                    <span style={{ color: '#64748b' }}>{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Schema Registry & 토픽 설계 */}
          <div className="kf-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="kf-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>Schema</div>
              <div className="kf-card-title" style={{ color: '#3b82f6' }}>Schema Registry</div>
              <div className="kf-card-desc">
                <strong style={{ color: '#e2e8f0' }}>메시지 스키마를 중앙에서 관리</strong>하여 Producer/Consumer 간 호환성을 보장합니다.<br /><br />
                <strong style={{ color: '#06b6d4' }}>Avro:</strong> 바이너리 직렬화, 높은 압축률, 스키마 진화 지원. 가장 많이 사용.<br />
                <strong style={{ color: '#a855f7' }}>Protobuf:</strong> Google 표준, 높은 성능, 강타입.<br />
                <strong style={{ color: '#f59e0b' }}>JSON Schema:</strong> 가독성 좋지만 크기 큼.<br /><br />
                스키마 호환성 모드: BACKWARD (Consumer 먼저 업데이트), FORWARD (Producer 먼저), FULL (양방향)
              </div>
            </div>
            <div className="kf-card" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="kf-card-badge" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Design</div>
              <div className="kf-card-title" style={{ color: '#22c55e' }}>토픽 설계 원칙</div>
              <div className="kf-card-desc">
                <strong style={{ color: '#e2e8f0' }}>이벤트 vs 커맨드:</strong><br />
                <span className="kf-tag" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>Event</span> 과거에 일어난 사실. 예: <code style={{ fontSize: '11px' }}>order.created</code><br />
                <span className="kf-tag" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>Command</span> 수행해야 할 요청. 예: <code style={{ fontSize: '11px' }}>order.process</code><br /><br />
                <strong style={{ color: '#e2e8f0' }}>네이밍 컨벤션:</strong><br />
                <code style={{ color: '#5a6a85', fontSize: '11px' }}>&lt;domain&gt;.&lt;entity&gt;.&lt;event&gt;</code><br />
                예: <code style={{ color: '#06b6d4', fontSize: '11px' }}>payment.transaction.completed</code>
              </div>
            </div>
          </div>

          {/* Schema Evolution 상세 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#3b82f6' }}>스키마 진화 (Schema Evolution)</span></div>

            <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #1a2234', marginBottom: '16px' }}>
              <table className="kf-compare-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>변경 유형</th>
                    <th style={{ width: '20%' }}>호환성</th>
                    <th style={{ width: '30%' }}>설명</th>
                    <th style={{ width: '30%' }}>예시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#22c55e' }}>필드 추가 (with default)</td>
                    <td style={{ color: '#22c55e' }}>Backward Compatible</td>
                    <td>새 Consumer가 기존 메시지를 읽을 수 있음 (default 값 사용)</td>
                    <td style={{ fontSize: '11px' }}><code style={{ color: '#06b6d4' }}>email: string = ""</code> 추가</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#f59e0b' }}>필드 제거 (with default)</td>
                    <td style={{ color: '#f59e0b' }}>Forward Compatible</td>
                    <td>기존 Consumer가 새 메시지를 읽을 수 있음 (필드 무시)</td>
                    <td style={{ fontSize: '11px' }}><code style={{ color: '#06b6d4' }}>nickname</code> 필드 삭제</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#ef4444' }}>필드 타입 변경</td>
                    <td style={{ color: '#ef4444' }}>Breaking Change</td>
                    <td>기존/신규 모두 호환 불가. 새 토픽 생성 또는 버전 분리 필요</td>
                    <td style={{ fontSize: '11px' }}><code style={{ color: '#ef4444' }}>age: int → string</code></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#22c55e' }}>필드 추가 + 제거</td>
                    <td style={{ color: '#22c55e' }}>Full Compatible</td>
                    <td>양방향 호환. 가장 안전하지만 제약이 많음</td>
                    <td style={{ fontSize: '11px' }}>default 있는 필드만 추가/제거</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="kf-section-subtitle" style={{ fontSize: '13px' }}><span style={{ color: '#3b82f6' }}>호환성 모드별 업데이트 순서</span></div>
            <div className="kf-step-list">
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>B</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>BACKWARD:</strong> <strong style={{ color: '#3b82f6' }}>Consumer 먼저</strong> 업데이트 → Schema Registry에 새 스키마 등록 → Producer 업데이트. 새 Consumer가 기존 메시지를 읽을 수 있어야 합니다. 필드 추가 시 반드시 default 값 필요.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>F</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>FORWARD:</strong> <strong style={{ color: '#3b82f6' }}>Producer 먼저</strong> 업데이트 → Schema Registry에 새 스키마 등록 → Consumer 업데이트. 기존 Consumer가 새 메시지를 읽을 수 있어야 합니다. 필드 삭제 시 기존 Consumer가 무시 가능해야 함.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>FL</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>FULL:</strong> 양방향 호환. Producer와 Consumer를 <strong style={{ color: '#3b82f6' }}>어떤 순서로든</strong> 업데이트 가능합니다. 가장 안전하지만 default가 있는 필드의 추가/제거만 허용되어 제약이 큽니다.
                </div>
              </div>
            </div>
          </div>

          {/* 토픽 설계 심화 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>토픽 설계 심화</span></div>

            {/* 큰 토픽 vs 작은 토픽 */}
            <div className="kf-section-subtitle" style={{ fontSize: '13px', marginTop: '4px' }}><span style={{ color: '#22c55e' }}>하나의 큰 토픽 vs 여러 작은 토픽</span></div>
            <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #1a2234', marginBottom: '16px' }}>
              <table className="kf-compare-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>항목</th>
                    <th style={{ width: '40%' }}>하나의 큰 토픽</th>
                    <th style={{ width: '40%' }}>여러 작은 토픽</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>예시</td>
                    <td><code style={{ color: '#06b6d4', fontSize: '11px' }}>order-events</code> (모든 주문 이벤트)</td>
                    <td><code style={{ color: '#06b6d4', fontSize: '11px' }}>order.created</code>, <code style={{ color: '#06b6d4', fontSize: '11px' }}>order.paid</code>, <code style={{ color: '#06b6d4', fontSize: '11px' }}>order.shipped</code></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>관리 복잡도</td>
                    <td style={{ color: '#22c55e' }}>낮음 (토픽 수 적음)</td>
                    <td style={{ color: '#ef4444' }}>높음 (토픽 수 증가, 파티션 관리)</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>Consumer 선택성</td>
                    <td style={{ color: '#ef4444' }}>불필요한 이벤트도 수신 (필터링 필요)</td>
                    <td style={{ color: '#22c55e' }}>필요한 이벤트만 구독</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>순서 보장</td>
                    <td style={{ color: '#22c55e' }}>같은 Aggregate의 이벤트 순서 보장 용이</td>
                    <td style={{ color: '#ef4444' }}>토픽 간 순서 보장 불가</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>스키마 관리</td>
                    <td style={{ color: '#ef4444' }}>여러 이벤트 타입 → 스키마 복잡</td>
                    <td style={{ color: '#22c55e' }}>토픽별 단일 스키마</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#cbd5e1' }}>추천</td>
                    <td>같은 Aggregate의 이벤트, 순서 중요 시</td>
                    <td>이벤트 타입별 독립 처리 필요 시</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 파티션 키 설계 */}
            <div className="kf-sub-section">
              <div className="kf-section-subtitle" style={{ fontSize: '13px' }}><span style={{ color: '#22c55e' }}>파티션 키 설계 원칙</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">🔑</span>
                  <span><strong style={{ color: '#e2e8f0' }}>순서 보장 단위로 키 설정:</strong> 같은 키를 가진 메시지는 같은 파티션에 할당됩니다. 예를 들어 주문 이벤트는 <code style={{ color: '#06b6d4', fontSize: '11px' }}>orderId</code>를 키로 사용하면, 동일 주문의 생성→결제→배송 이벤트가 순서대로 처리됩니다.</span>
                </div>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">⚖️</span>
                  <span><strong style={{ color: '#e2e8f0' }}>균등 분배를 고려:</strong> 키의 카디널리티가 낮으면 특정 파티션에 메시지가 몰립니다 (Hot Partition). <code style={{ color: '#ef4444', fontSize: '11px' }}>country</code> (한국 90%)보다 <code style={{ color: '#22c55e', fontSize: '11px' }}>userId</code> (균등 분포)가 키로 적합합니다.</span>
                </div>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#e2e8f0' }}>파티션 수 변경 주의:</strong> 파티션 수를 변경하면 키→파티션 매핑이 달라집니다. 기존에 같은 파티션으로 가던 메시지가 다른 파티션으로 갈 수 있어 순서 보장이 깨집니다. 초기 설계 시 충분한 파티션 수를 확보하세요.</span>
                </div>
              </div>
            </div>

            {/* Compacted Topic */}
            <div className="kf-sub-section">
              <div className="kf-section-subtitle" style={{ fontSize: '13px' }}><span style={{ color: '#22c55e' }}>Compacted Topic</span></div>
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '18px 20px', marginBottom: '14px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#f59e0b', marginBottom: '8px', fontFamily: 'var(--mono)' }}>
                    일반 토픽 <span style={{ color: '#64748b' }}>(retention.ms 기반 삭제)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    {['A:1', 'B:1', 'A:2', 'C:1', 'A:3'].map((item, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1a2234', borderRadius: '4px', padding: '4px 10px', fontFamily: 'var(--mono)', fontSize: '10px', color: '#94a3b8' }}>
                        key={item.split(':')[0]}, v={item.split(':')[1]}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--mono)', paddingLeft: '4px' }}>
                    <span style={{ color: '#f59e0b' }}>-&gt;</span> 일정 시간 후 오래된 메시지부터 삭제
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#22c55e', marginBottom: '8px', fontFamily: 'var(--mono)' }}>
                    Compacted 토픽 <span style={{ color: '#64748b' }}>(cleanup.policy=compact)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    {[
                      { k: 'A', v: '1', dim: true }, { k: 'B', v: '1', dim: false, color: '#3b82f6' },
                      { k: 'A', v: '2', dim: true }, { k: 'C', v: '1', dim: false, color: '#a855f7' },
                      { k: 'A', v: '3', dim: false, color: '#22c55e' },
                    ].map((item, i) => (
                      <div key={i} style={{ background: item.dim ? 'rgba(255,255,255,0.02)' : `${item.color}10`, border: `1px solid ${item.dim ? '#1a2234' : item.color}`, borderRadius: '4px', padding: '4px 10px', fontFamily: 'var(--mono)', fontSize: '10px', color: item.dim ? '#475569' : item.color, opacity: item.dim ? 0.4 : 1, textDecoration: item.dim ? 'line-through' : 'none' }}>
                        key={item.k}, v={item.v}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--mono)', paddingLeft: '4px', marginBottom: '6px' }}>
                    <span style={{ color: '#22c55e' }}>-&gt;</span> Log Compaction 후: key별 최신 값만 유지
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {[
                      { k: 'B', v: '1', color: '#3b82f6' },
                      { k: 'C', v: '1', color: '#a855f7' },
                      { k: 'A', v: '3', color: '#22c55e' },
                    ].map((item, i) => (
                      <div key={i} style={{ background: `${item.color}15`, border: `1px solid ${item.color}`, borderRadius: '4px', padding: '4px 10px', fontFamily: 'var(--mono)', fontSize: '10px', color: item.color, fontWeight: 600 }}>
                        key={item.k}, v={item.v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">📦</span>
                  <span><strong style={{ color: '#e2e8f0' }}>사용 사례:</strong> 상태 저장 (사용자 프로필, 설정값 등), 최신 값만 유지하면 되는 경우. Kafka 내부적으로 <code style={{ color: '#06b6d4', fontSize: '11px' }}>__consumer_offsets</code>도 Compacted Topic입니다.</span>
                </div>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">🗑️</span>
                  <span><strong style={{ color: '#e2e8f0' }}>삭제:</strong> key에 대해 value를 <code style={{ color: '#06b6d4', fontSize: '11px' }}>null</code>로 보내면 (tombstone) 해당 키의 모든 이전 레코드가 Compaction 시 삭제됩니다.</span>
                </div>
                <div className="kf-feature-row">
                  <span className="kf-feature-icon">🔄</span>
                  <span><strong style={{ color: '#e2e8f0' }}>KTable과의 관계:</strong> Kafka Streams의 KTable은 Compacted Topic을 기반으로 동작합니다. 각 키의 최신 상태를 메모리에 유지하여 실시간 상태 조회가 가능합니다.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#22c55e" items={[
            {
              q: 'Exactly-once semantics를 Kafka에서 어떻게 달성하나요?',
              a: 'Kafka의 Exactly-once semantics(EOS)는 세 가지 구성 요소로 달성됩니다. 첫째, Idempotent Producer(enable.idempotence=true)로 네트워크 재시도 시 중복 전송을 방지합니다. 각 메시지에 Producer ID와 Sequence Number가 부여되어 Broker가 중복을 필터링합니다. 둘째, Transactional API로 여러 Partition에 걸친 원자적 쓰기를 보장합니다. 메시지 전송과 offset 커밋을 하나의 트랜잭션으로 묶습니다. 셋째, Consumer의 isolation.level=read_committed로 커밋된 트랜잭션의 메시지만 읽습니다. 다만 이 EOS는 Kafka-to-Kafka 파이프라인에서만 보장되며, 외부 시스템에 쓰는 경우에는 At-least-once + Consumer 멱등성이 현실적인 선택입니다.',
            },
            {
              q: '이중 쓰기 문제(Dual Write Problem)란 무엇이고 어떻게 해결하나요?',
              a: '이중 쓰기 문제는 하나의 비즈니스 로직에서 DB와 Kafka(또는 다른 외부 시스템) 두 곳에 동시에 쓸 때 발생하는 데이터 불일치 문제입니다. DB 저장은 성공했는데 Kafka 전송이 실패하면 다른 서비스는 해당 변경을 인지하지 못하고, 반대로 Kafka 전송은 성공했는데 DB 저장이 실패하면 유령 이벤트가 발생합니다. 이 문제의 가장 대표적인 해결책이 Transactional Outbox 패턴입니다. 비즈니스 데이터와 발행할 이벤트를 같은 DB 트랜잭션에서 저장하고, 별도 프로세스(Polling Publisher 또는 CDC)가 outbox 테이블에서 이벤트를 읽어 Kafka로 전송합니다. 이렇게 하면 DB 트랜잭션의 원자성을 활용하여 데이터와 이벤트의 일관성을 보장할 수 있습니다.',
            },
            {
              q: 'Kafka Consumer에서 멱등성을 어떻게 보장하나요?',
              a: '멱등성(Idempotency)이란 같은 연산을 여러 번 수행해도 결과가 동일한 성질입니다. Kafka Consumer에서 멱등성을 보장하는 대표적인 방법은 세 가지입니다. 첫째, DB의 Unique Key 제약조건을 활용하여 동일 이벤트의 중복 INSERT를 차단하고 DuplicateKeyException을 무시 처리합니다. 둘째, UPSERT(INSERT ON CONFLICT UPDATE)를 사용하여 같은 키가 있으면 UPDATE로 처리하여 최종 상태를 동일하게 유지합니다. 셋째, 이벤트 ID 기반 중복 체크 테이블을 별도로 운영하여, 처리 전에 이미 처리된 이벤트인지 확인합니다. 이때 비즈니스 처리와 이벤트 ID 저장을 같은 트랜잭션으로 묶어야 합니다. 실무에서는 At-least-once 전달과 Consumer 멱등성을 조합하여 사실상 Exactly-once의 효과를 얻는 것이 가장 현실적인 접근입니다.',
            },
            {
              q: 'Dead Letter Queue(DLQ)는 언제, 왜 사용하나요?',
              a: 'DLQ는 Consumer에서 처리에 반복적으로 실패하는 메시지를 별도의 토픽으로 격리하기 위해 사용합니다. 특정 메시지의 처리 실패가 전체 Consumer의 처리를 차단하는 것(poison pill)을 방지하는 것이 핵심 목적입니다. 일반적으로 지정된 횟수만큼 재시도 후에도 실패하면 DLQ로 보냅니다. 이때 Retry Topic 패턴과 함께 사용하면 Exponential Backoff로 재시도 간격을 점진적으로 늘릴 수 있습니다. DLQ에 쌓인 메시지는 운영자가 수동으로 분석 후 재처리하거나, 별도 Consumer가 자동 재처리하거나, 알림/대시보드로 모니터링하는 등의 전략으로 처리합니다. Spring Kafka에서는 @RetryableTopic과 @DltHandler로 간편하게 구현할 수 있습니다.',
            },
          ]} />
        </div>
      </div>
    </>
  )
}

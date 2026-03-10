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
.kf-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .kf-compare-grid{ grid-template-columns:1fr; } }
.kf-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.kf-step-num { flex-shrink:0; width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; }
.kf-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.kf-scenario { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:18px; transition:transform .2s; }
.kf-scenario:hover { transform:translateY(-2px); }
.kf-scenario-title { font-size:13px; font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:8px; }
.kf-scenario-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
`

export default function KafkaProducerConsumer() {
  useInjectCSS('style-kafka-producer-consumer', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Producer · Consumer · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>Producer & Consumer</span> 심화</>}
          description="Kafka Producer/Consumer의 핵심 설정과 동작 원리 - acks, Batching, Offset 관리, Rebalancing"
        />

        {/* ── Producer 심화 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>Producer 심화</SectionTitle>

          {/* Producer 내부 동작 흐름 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>Producer 내부 동작 흐름</span></div>
            <DiagramContainer title="PRODUCER INTERNAL FLOW">
              <DiagramGroup label="Application Thread" color="#f97316">
                <DiagramFlow vertical>
                  <DiagramNode label="send(ProducerRecord)" color="#f97316" />
                  <DiagramArrow vertical color="#f97316" />
                  <DiagramNode label="Serializer" sub="Key/Value" color="#f97316" />
                  <DiagramArrow vertical color="#f97316" />
                  <DiagramNode label="Partitioner" sub="파티션 결정" color="#f97316" />
                  <DiagramArrow vertical color="#f97316" />
                  <DiagramGroup label="RecordAccumulator (메모리 버퍼)" color="#a855f7">
                    <DiagramFlow>
                      <DiagramNode label="P0 Batch" color="#a855f7" />
                      <DiagramNode label="P1 Batch" color="#a855f7" />
                      <DiagramNode label="P2 Batch" color="#a855f7" />
                    </DiagramFlow>
                  </DiagramGroup>
                </DiagramFlow>
              </DiagramGroup>
              <DiagramArrow vertical color="#f97316" />
              <DiagramGroup label="Sender Thread (I/O Thread)" color="#06b6d4">
                <DiagramFlow vertical>
                  <DiagramNode label="batch.size 도달 OR linger.ms 경과 시 전송" color="#06b6d4" />
                  <DiagramArrow vertical color="#06b6d4" />
                  <DiagramNode label="InFlightRequests" sub="Broker 응답 대기 중 / max.in.flight.requests 만큼 동시 전송" color="#06b6d4" />
                </DiagramFlow>
              </DiagramGroup>
              <DiagramArrow vertical color="#f97316" />
              <DiagramNode label="Broker" sub="acks에 따라 응답" color="#f97316" />
            </DiagramContainer>
            <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '14px 18px', marginBottom: '16px', marginTop: '12px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: '#5a6a85', marginBottom: '10px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>흐름 요약</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                {[
                  { label: 'send()', color: '#f97316' },
                  { label: 'Serializer', color: '#06b6d4' },
                  { label: 'Partitioner', color: '#3b82f6' },
                  { label: 'RecordAccumulator(Buffer)', color: '#a855f7' },
                  { label: 'Sender Thread', color: '#22c55e' },
                  { label: 'Batch 전송', color: '#f59e0b' },
                  { label: 'Broker', color: '#f97316' },
                ].map((item, i, arr) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: item.color, fontWeight: 600, padding: '2px 8px', background: `${item.color}10`, borderRadius: '4px', border: `1px solid ${item.color}30` }}>{item.label}</span>
                    {i < arr.length - 1 && <span style={{ color: '#475569' }}>&rarr;</span>}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">1.</span>
                <span><strong style={{ color: '#e2e8f0' }}>Serializer:</strong> Key와 Value를 바이트 배열로 직렬화합니다. StringSerializer, JsonSerializer, AvroSerializer 등을 사용합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">2.</span>
                <span><strong style={{ color: '#e2e8f0' }}>Partitioner:</strong> 메시지를 어느 Partition에 보낼지 결정합니다. Key가 있으면 <code style={{ color: '#06b6d4', fontSize: '11px' }}>hash(key) % partition_count</code>, 없으면 Sticky Partitioner(Kafka 2.4+)로 배치 효율을 극대화합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">3.</span>
                <span><strong style={{ color: '#e2e8f0' }}>RecordAccumulator:</strong> Partition별로 배치(Batch)를 관리하는 메모리 버퍼입니다. <code style={{ color: '#06b6d4', fontSize: '11px' }}>buffer.memory</code>(기본 32MB) 크기의 버퍼 풀을 사용합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">4.</span>
                <span><strong style={{ color: '#e2e8f0' }}>Sender Thread:</strong> 별도의 I/O 스레드가 <code style={{ color: '#06b6d4', fontSize: '11px' }}>batch.size</code> 도달 또는 <code style={{ color: '#06b6d4', fontSize: '11px' }}>linger.ms</code> 경과 시 Batch를 Broker에 전송합니다.</span>
              </div>
            </div>
          </div>

          {/* acks 설정 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>acks 설정 - 신뢰성 vs 성능 트레이드오프</span></div>
            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '12%' }}>acks</th>
                    <th style={{ width: '25%' }}>동작</th>
                    <th style={{ width: '20%' }}>데이터 안전성</th>
                    <th style={{ width: '18%' }}>성능</th>
                    <th>사용 사례</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['0', 'Broker 응답을 기다리지 않음', '유실 가능성 높음', '최고 속도', '로그, 메트릭 (유실 허용)', '#ef4444'],
                    ['1', 'Leader만 기록 확인', 'Leader 장애 시 유실', '빠름', '일반적인 이벤트 로깅', '#f59e0b'],
                    ['all (-1)', '모든 ISR이 기록 확인', '유실 거의 불가', '느림 (네트워크 왕복)', '결제, 주문 등 핵심 데이터', '#22c55e'],
                  ].map(([acks, behavior, safety, perf, useCase, color]) => (
                    <tr key={acks}>
                      <td style={{ color: color as string, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace", fontSize: '13px' }}>{acks}</td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>{behavior}</td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>{safety}</td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>{perf}</td>
                      <td style={{ color: '#5a6a85', fontSize: '12px' }}>{useCase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 실제 지연시간 비교 */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>acks 설정별 실제 지연시간 비교</div>
              <DiagramContainer title="ACKS 설정별 지연시간 비교">
                <DiagramGrid cols={3}>
                  <DiagramGroup label="acks=0 (~0.5ms)" color="#ef4444">
                    <DiagramFlow vertical>
                      <DiagramNode label="Producer" color="#ef4444" />
                      <DiagramArrow vertical label="send" color="#ef4444" />
                      <DiagramNode label="Leader Broker" sub="응답 대기 없음 (fire-and-forget)" color="#ef4444" />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramGroup label="acks=1 (~3ms)" color="#f59e0b">
                    <DiagramFlow vertical>
                      <DiagramNode label="Producer" color="#f59e0b" />
                      <DiagramArrow vertical label="send" color="#f59e0b" />
                      <DiagramNode label="Leader Broker" color="#f59e0b" />
                      <DiagramArrow vertical label="ACK" color="#f59e0b" dashed />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramGroup label="acks=all (~10ms)" color="#22c55e">
                    <DiagramFlow vertical>
                      <DiagramNode label="Producer" color="#22c55e" />
                      <DiagramArrow vertical label="send" color="#22c55e" />
                      <DiagramNode label="Leader Broker" color="#22c55e" />
                      <DiagramArrow vertical label="복제" color="#22c55e" />
                      <DiagramNode label="Follower (ISR)" sub="복제 완료" color="#22c55e" />
                      <DiagramArrow vertical label="ACK (모든 ISR 확인)" color="#22c55e" dashed />
                    </DiagramFlow>
                  </DiagramGroup>
                </DiagramGrid>
              </DiagramContainer>
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', padding: '10px 16px', marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#f59e0b', fontSize: '12px', flexShrink: 0 }}>&#x26A0;</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                  크로스 리전(Cross-Region) 환경에서는 <span style={{ color: '#e2e8f0', fontWeight: 600 }}>acks=all</span> 시 네트워크 RTT로 인해 <span style={{ color: '#f59e0b', fontWeight: 600 }}>50~100ms 이상</span> 소요될 수 있음
                </span>
              </div>
            </div>

            <HighlightBox color="#22c55e" style={{ marginTop: '16px' }}>
              <strong style={{ color: '#22c55e' }}>실무 권장 조합:</strong> <code style={{ fontSize: '11px' }}>acks=all</code> + <code style={{ fontSize: '11px' }}>min.insync.replicas=2</code> + <code style={{ fontSize: '11px' }}>replication.factor=3</code>. 이 조합은 Broker 1대가 장애 나더라도 데이터 유실 없이 서비스가 지속됩니다.
            </HighlightBox>
          </div>

          {/* Idempotent & Transactional Producer */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#a855f7' }}>Idempotent & Transactional Producer</span></div>
            <div className="kf-compare-grid">
              <div className="kf-card" style={{ borderLeft: '3px solid #a855f7' }}>
                <div className="kf-card-title" style={{ color: '#a855f7', fontSize: '14px' }}>Idempotent Producer</div>
                <div className="kf-card-desc">
                  <code style={{ color: '#a855f7', fontSize: '11px' }}>enable.idempotence=true</code> (Kafka 3.0+ 기본값)<br /><br />
                  각 Producer에 <strong style={{ color: '#e2e8f0' }}>Producer ID(PID)</strong>와 <strong style={{ color: '#e2e8f0' }}>Sequence Number</strong>가 부여됩니다. Broker는 PID+Sequence를 추적하여 중복 메시지를 자동 필터링합니다.<br /><br />
                  <strong style={{ color: '#f59e0b' }}>범위:</strong> 단일 Partition 내 중복 방지 (네트워크 재시도로 인한 중복 제거)
                </div>
              </div>
              <div className="kf-card" style={{ borderLeft: '3px solid #3b82f6' }}>
                <div className="kf-card-title" style={{ color: '#3b82f6', fontSize: '14px' }}>Transactional Producer</div>
                <div className="kf-card-desc">
                  <code style={{ color: '#3b82f6', fontSize: '11px' }}>transactional.id</code> 설정 필요<br /><br />
                  여러 Partition에 걸친 <strong style={{ color: '#e2e8f0' }}>원자적 쓰기(Atomic Write)</strong>를 보장합니다. 트랜잭션 내 모든 메시지가 함께 성공하거나 함께 실패합니다.<br /><br />
                  <strong style={{ color: '#f59e0b' }}>범위:</strong> 여러 Topic/Partition에 걸친 원자적 쓰기. Exactly-once semantics의 핵심 구성 요소
                </div>
              </div>
            </div>

            {/* Idempotent Producer 상세 동작 원리 */}
            <div style={{ marginTop: '20px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>Idempotent Producer 중복 감지 원리</div>
              <DiagramContainer title="IDEMPOTENT PRODUCER 중복 감지 원리">
                <DiagramFlow vertical>
                  <DiagramGroup label="1. Producer 초기화" color="#a855f7">
                    <DiagramFlow>
                      <DiagramNode label="Producer" color="#a855f7" />
                      <DiagramArrow label="InitPidRequest" color="#a855f7" />
                      <DiagramNode label="Broker" sub="PID=1000 할당" color="#a855f7" />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramArrow vertical color="#475569" length={16} />
                  <DiagramGroup label="2. 정상 전송" color="#22c55e">
                    <DiagramFlow>
                      <DiagramNode label="Producer" color="#22c55e" />
                      <DiagramArrow label="[PID=1000, Seq=5]" color="#22c55e" />
                      <DiagramNode label="Broker" sub="Seq:5 기록 / ACK 반환" color="#22c55e" />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramArrow vertical color="#475569" length={16} />
                  <DiagramGroup label="3. 네트워크 재시도 (중복 감지)" color="#ef4444">
                    <DiagramFlow>
                      <DiagramNode label="Producer" color="#ef4444" />
                      <DiagramArrow label="[PID=1000, Seq=5] 재전송" color="#ef4444" />
                      <DiagramNode label="Broker" sub="Seq=5 이미 처리됨 → 중복 무시" color="#ef4444" />
                    </DiagramFlow>
                  </DiagramGroup>
                </DiagramFlow>
              </DiagramContainer>
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', padding: '10px 16px', marginBottom: '14px', marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#a855f7', fontSize: '12px', flexShrink: 0 }}>&#x2139;</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                  Broker는 각 <span style={{ color: '#a855f7', fontWeight: 600 }}>&lt;PID, Topic, Partition&gt;</span> 조합마다 마지막 <span style={{ color: '#e2e8f0', fontWeight: 600 }}>5개의 Sequence Number</span>를 메모리에 캐싱하여 비교
                </span>
              </div>
            </div>

            {/* Transactional Producer 사용 패턴 */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>Transactional Producer 코드 패턴</div>
              <CodeBlock title="Transactional Producer 사용 흐름" lang="java" style={{ marginBottom: '14px' }}>
{`// 1) Producer 초기화 (transactional.id 필수)
props.put("transactional.id", "order-tx-producer-1");
KafkaProducer<String, String> producer = new KafkaProducer<>(props);

// 2) 트랜잭션 초기화 (한 번만 호출)
producer.initTransactions();

try {
    // 3) 트랜잭션 시작
    producer.beginTransaction();

    // 4) 여러 Topic/Partition에 메시지 전송
    producer.send(new ProducerRecord<>("orders", orderEvent));
    producer.send(new ProducerRecord<>("payments", paymentEvent));
    producer.send(new ProducerRecord<>("inventory", inventoryEvent));

    // 5) Consumer offset도 트랜잭션에 포함 (Consume-Transform-Produce 패턴)
    producer.sendOffsetsToTransaction(offsets, consumerGroupMetadata);

    // 6) 트랜잭션 커밋 → 모든 메시지가 원자적으로 가시화
    producer.commitTransaction();

} catch (Exception e) {
    // 7) 실패 시 트랜잭션 롤백 → 모든 메시지 폐기
    producer.abortTransaction();
}`}
              </CodeBlock>
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '8px', padding: '10px 16px', marginBottom: '14px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{ color: '#f59e0b', fontSize: '12px', flexShrink: 0 }}>&#x26A0;</span>
                <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                  Consumer 측에서 <span style={{ color: '#3b82f6', fontWeight: 600 }}>isolation.level=read_committed</span> 설정 필요 &rarr; 커밋된 트랜잭션의 메시지만 읽을 수 있음
                </span>
              </div>
              <HighlightBox color="#3b82f6" style={{ marginTop: '0' }}>
                <strong style={{ color: '#3b82f6' }}>Consume-Transform-Produce 패턴:</strong> Consumer가 읽은 offset과 Producer가 보낸 메시지를 하나의 트랜잭션으로 묶어 <strong style={{ color: '#e2e8f0' }}>Exactly-once 스트림 처리</strong>를 구현합니다. Kafka Streams 내부에서 이 패턴을 자동으로 사용합니다.
              </HighlightBox>
            </div>
          </div>

          {/* Batching & 성능 설정 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#22c55e' }}>Batching & 성능 설정</span></div>
            <div className="kf-param-grid">
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>batch.size</div>
                <div className="kf-param-desc">배치 최대 크기 (바이트 단위). 배치가 이 크기에 도달하면 즉시 전송합니다.</div>
                <div className="kf-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>기본 16KB, 권장 32~64KB</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#3b82f6' }}>linger.ms</div>
                <div className="kf-param-desc">배치에 메시지가 더 쌓이길 기다리는 시간. 0이면 즉시 전송, 값이 클수록 배치 효율 증가 (지연 증가).</div>
                <div className="kf-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>기본 0ms, 권장 5~100ms</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#a855f7' }}>compression.type</div>
                <div className="kf-param-desc">메시지 압축 방식. gzip(높은 압축률), snappy(빠른 속도), lz4(균형), zstd(최신, 균형 우수).</div>
                <div className="kf-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>권장 lz4 또는 zstd</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#f59e0b' }}>buffer.memory</div>
                <div className="kf-param-desc">Producer가 사용하는 전체 버퍼 메모리 크기. 버퍼가 가득 차면 max.block.ms만큼 대기 후 예외 발생.</div>
                <div className="kf-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>기본 32MB</div>
              </div>
            </div>
          </div>

          {/* Retry & 순서 보장 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#ef4444' }}>Retry 전략 & 순서 보장</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔁</span>
                <span><strong style={{ color: '#e2e8f0' }}>retries:</strong> 전송 실패 시 재시도 횟수. Kafka 2.1+부터 기본값이 <code style={{ color: '#06b6d4', fontSize: '11px' }}>Integer.MAX_VALUE</code>이며, <code style={{ color: '#06b6d4', fontSize: '11px' }}>delivery.timeout.ms</code>(기본 120초)로 총 재시도 시간을 제한합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⏱️</span>
                <span><strong style={{ color: '#e2e8f0' }}>retry.backoff.ms:</strong> 재시도 간격. 기본 100ms. 너무 짧으면 Broker에 부하, 너무 길면 복구 지연.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📦</span>
                <span><strong style={{ color: '#e2e8f0' }}>max.in.flight.requests.per.connection:</strong> 응답을 기다리지 않고 보낼 수 있는 최대 요청 수. 1로 설정하면 완벽한 순서 보장이 가능하지만 처리량이 감소합니다.</span>
              </div>
            </div>

            {/* delivery.timeout.ms 관계 설명 */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>delivery.timeout.ms 타임아웃 관계</div>
              <DiagramContainer title="DELIVERY.TIMEOUT.MS 타임아웃 관계">
                <DiagramFlow>
                  <DiagramGroup label="delivery.timeout.ms (기본 120,000ms = 2분)" color="#f97316">
                    <DiagramFlow>
                      <DiagramNode label="linger.ms" sub="배치 대기" color="#06b6d4" />
                      <DiagramArrow color="#f97316" />
                      <DiagramNode label="실제 전송 + Broker 응답 대기" color="#f97316" />
                      <DiagramArrow label="실패 시 반복" color="#a855f7" />
                      <DiagramNode label="retry.backoff.ms" sub="x 재시도 횟수 (100ms x N)" color="#a855f7" />
                    </DiagramFlow>
                  </DiagramGroup>
                  <DiagramArrow label="timeout 초과" color="#ef4444" />
                  <DiagramNode label="TimeoutException" color="#ef4444" />
                </DiagramFlow>
              </DiagramContainer>
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '14px 18px', marginTop: '12px' }}>
                <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: '#e2e8f0', fontWeight: 600, marginBottom: '10px', padding: '6px 10px', background: 'rgba(249,115,22,0.08)', borderRadius: '6px', border: '1px solid rgba(249,115,22,0.2)' }}>
                  <span style={{ color: '#f97316' }}>delivery.timeout.ms</span>
                  <span style={{ color: '#64748b' }}> &ge; </span>
                  <span style={{ color: '#06b6d4' }}>linger.ms</span>
                  <span style={{ color: '#64748b' }}> + </span>
                  <span style={{ color: '#a855f7' }}>retry.backoff.ms</span>
                  <span style={{ color: '#64748b' }}> &times; </span>
                  <span style={{ color: '#a855f7' }}>retries</span>
                  <span style={{ color: '#64748b' }}> + </span>
                  <span style={{ color: '#94a3b8' }}>전송시간</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '12px', flexShrink: 0 }}>&#x26A0;</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 600 }}>실무 팁:</span> delivery.timeout.ms를 먼저 결정하고, 그 안에서 retry가 충분히 이루어질 수 있도록 retry.backoff.ms와 request.timeout.ms를 조정하세요.
                  </span>
                </div>
              </div>
            </div>

            <HighlightBox color="#06b6d4" style={{ marginTop: '0' }}>
              <strong style={{ color: '#06b6d4' }}>순서 보장의 핵심:</strong> Idempotent Producer(<code style={{ fontSize: '11px' }}>enable.idempotence=true</code>)를 사용하면 <code style={{ fontSize: '11px' }}>max.in.flight.requests.per.connection=5</code>까지도 순서가 보장됩니다. Broker가 Sequence Number를 기반으로 순서를 재정렬하기 때문입니다. 따라서 처리량을 유지하면서도 순서를 보장할 수 있습니다.
            </HighlightBox>
          </div>

          {/* Producer 장애 시나리오 */}
          <div className="kf-section-box">
            <div className="kf-section-subtitle"><span style={{ color: '#ef4444' }}>Producer 장애 시나리오</span></div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
              <div className="kf-scenario" style={{ borderLeft: '3px solid #ef4444' }}>
                <div className="kf-scenario-title"><span style={{ color: '#ef4444' }}>네트워크 단절</span></div>
                <div className="kf-scenario-desc">
                  Broker와의 연결이 끊기면 <code style={{ color: '#06b6d4', fontSize: '11px' }}>retries</code> 설정에 따라 재시도합니다. <code style={{ color: '#06b6d4', fontSize: '11px' }}>delivery.timeout.ms</code> 내에 복구되지 않으면 <strong style={{ color: '#ef4444' }}>TimeoutException</strong>이 발생하고, Callback에서 에러를 처리해야 합니다.<br /><br />
                  <strong style={{ color: '#f59e0b' }}>대응:</strong> Callback에서 DLQ(Dead Letter Queue)로 전송하거나, 로컬에 저장 후 재시도 로직 구현.
                </div>
              </div>
              <div className="kf-scenario" style={{ borderLeft: '3px solid #f59e0b' }}>
                <div className="kf-scenario-title"><span style={{ color: '#f59e0b' }}>Broker 장애 (Leader 교체)</span></div>
                <div className="kf-scenario-desc">
                  Leader Broker가 다운되면 Controller가 새 Leader를 선출합니다. Producer는 <strong style={{ color: '#e2e8f0' }}>metadata.max.age.ms</strong>(기본 5분) 또는 에러 응답 시 메타데이터를 갱신하여 새 Leader를 인식합니다.<br /><br />
                  <strong style={{ color: '#f59e0b' }}>대응:</strong> <code style={{ color: '#06b6d4', fontSize: '11px' }}>retries</code> + <code style={{ color: '#06b6d4', fontSize: '11px' }}>retry.backoff.ms</code>로 Leader 선출 동안 자동 재시도.
                </div>
              </div>
              <div className="kf-scenario" style={{ borderLeft: '3px solid #a855f7' }}>
                <div className="kf-scenario-title"><span style={{ color: '#a855f7' }}>버퍼 풀 소진 (BufferExhaustedException)</span></div>
                <div className="kf-scenario-desc">
                  Producer의 <code style={{ color: '#06b6d4', fontSize: '11px' }}>buffer.memory</code>(기본 32MB)가 가득 차면, <code style={{ color: '#06b6d4', fontSize: '11px' }}>max.block.ms</code>(기본 60초)만큼 대기합니다. 그래도 공간이 확보되지 않으면 <strong style={{ color: '#a855f7' }}>TimeoutException</strong>이 발생합니다.<br /><br />
                  <strong style={{ color: '#f59e0b' }}>대응:</strong> buffer.memory 증가, batch.size/linger.ms 조정, 또는 Producer 인스턴스 확장.
                </div>
              </div>
              <div className="kf-scenario" style={{ borderLeft: '3px solid #3b82f6' }}>
                <div className="kf-scenario-title"><span style={{ color: '#3b82f6' }}>직렬화 에러 (SerializationException)</span></div>
                <div className="kf-scenario-desc">
                  Key나 Value의 직렬화에 실패하면 <strong style={{ color: '#3b82f6' }}>SerializationException</strong>이 발생합니다. 이 에러는 <strong style={{ color: '#e2e8f0' }}>재시도 불가능(non-retriable)</strong>한 에러이므로, 재시도 없이 즉시 실패합니다.<br /><br />
                  <strong style={{ color: '#f59e0b' }}>대응:</strong> 직렬화 로직 사전 검증, Schema Registry 활용 시 호환성 체크 강화.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Consumer 심화 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>Consumer 심화</SectionTitle>

          {/* Consumer poll() 루프 동작 흐름 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#06b6d4' }}>Consumer poll() 루프 동작 흐름</span></div>
            <DiagramContainer title="CONSUMER POLL() 내부 동작">
              <DiagramGroup label="poll(timeout) 내부 동작" color="#f97316">
                <DiagramFlow vertical>
                  <DiagramNode icon="1" label="Coordinator에 Heartbeat 전송" sub="session.timeout.ms 내" color="#06b6d4" />
                  <DiagramArrow vertical color="#06b6d4" />
                  <DiagramNode icon="2" label="Rebalancing 필요 시 처리" sub="onPartitionsRevoked() → 새 Partition 할당 → onPartitionsAssigned()" color="#a855f7" />
                  <DiagramArrow vertical color="#a855f7" />
                  <DiagramNode icon="3" label="Broker에 Fetch 요청" sub="fetch.min.bytes 만큼 대기 / fetch.max.wait.ms 초과 시 즉시 응답" color="#f97316" />
                  <DiagramArrow vertical color="#f97316" />
                  <DiagramNode icon="4" label="max.poll.records만큼 레코드 반환" color="#06b6d4" />
                  <DiagramArrow vertical color="#06b6d4" />
                  <DiagramNode icon="5" label="Auto Commit 활성화 시 offset 커밋" sub="이전 poll의 offset / auto.commit.interval.ms 주기" color="#a855f7" />
                </DiagramFlow>
              </DiagramGroup>
              <DiagramArrow vertical color="#f97316" />
              <DiagramNode label="ConsumerRecords 반환" color="#f97316" />
            </DiagramContainer>
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 16px', marginBottom: '16px', marginTop: '12px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
              <span style={{ color: '#ef4444', fontSize: '12px', flexShrink: 0 }}>&#x26A0;</span>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>주의:</span> poll() 간격이 <span style={{ color: '#e2e8f0', fontWeight: 600 }}>max.poll.interval.ms</span><span style={{ color: '#64748b' }}>(기본 300초)</span>를 초과하면 Consumer가 "죽은 것"으로 판단 &rarr; <span style={{ color: '#ef4444', fontWeight: 600 }}>Rebalancing 발생!</span>
              </span>
            </div>
          </div>

          {/* Consumer Group & Partition 할당 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#a855f7' }}>Consumer Group & Partition 할당</span></div>
            <DiagramContainer title="CONSUMER GROUP & PARTITION 할당">
              <DiagramFlow vertical>
                <DiagramGroup label="Topic: order-events (Partition 4개)" color="#f97316">
                  <DiagramFlow>
                    <DiagramNode label="P0" color="#f97316" />
                    <DiagramNode label="P1" color="#f97316" />
                    <DiagramNode label="P2" color="#f97316" />
                    <DiagramNode label="P3" color="#f97316" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramFlow>
                  <DiagramArrow vertical color="#f97316" />
                  <DiagramArrow vertical color="#f97316" />
                  <DiagramArrow vertical color="#f97316" />
                  <DiagramArrow vertical color="#f97316" />
                </DiagramFlow>
                <DiagramGroup label="Consumer Group A" color="#06b6d4">
                  <DiagramFlow>
                    <DiagramNode label="Consumer 1" color="#06b6d4" />
                    <DiagramNode label="Consumer 2" color="#06b6d4" />
                    <DiagramNode label="Consumer 3" color="#06b6d4" />
                    <DiagramNode label="Consumer 4" color="#06b6d4" />
                  </DiagramFlow>
                </DiagramGroup>
              </DiagramFlow>
            </DiagramContainer>
            <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '18px 20px', marginBottom: '16px', marginTop: '12px' }}>
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#06b6d4', marginBottom: '8px', fontFamily: 'var(--mono)' }}>Consumer 2개일 때:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '8px' }}>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#06b6d4', fontWeight: 600 }}>Consumer1</span>
                    <span style={{ color: '#475569' }}>&rarr;</span>
                    <span style={{ color: '#f97316', fontWeight: 600 }}>P0, P1</span>
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#06b6d4', fontWeight: 600 }}>Consumer2</span>
                    <span style={{ color: '#475569' }}>&rarr;</span>
                    <span style={{ color: '#f97316', fontWeight: 600 }}>P2, P3</span>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#a855f7', marginBottom: '8px', fontFamily: 'var(--mono)' }}>Consumer 5개일 때 <span style={{ color: '#64748b', fontWeight: 400 }}>(Partition보다 많음)</span>:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '8px' }}>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#06b6d4', fontWeight: 600 }}>Consumer1~4</span>
                    <span style={{ color: '#475569' }}>&rarr;</span>
                    <span style={{ color: '#f97316', fontWeight: 600 }}>각각 P0~P3</span>
                  </div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#ef4444', fontWeight: 600 }}>Consumer5</span>
                    <span style={{ color: '#475569' }}>&rarr;</span>
                    <span style={{ color: '#ef4444' }}>유휴 상태 (할당받지 못함)</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', borderTop: '1px solid #1a2234', paddingTop: '10px' }}>
                <span style={{ color: '#f59e0b', fontSize: '12px', flexShrink: 0 }}>&#x26A0;</span>
                <span style={{ fontSize: '11px', color: '#f59e0b', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                  Consumer 수 &gt; Partition 수 &rarr; 초과 Consumer는 놀게 됨!
                </span>
              </div>
            </div>

            {/* 왜 Consumer 수가 Partition 수를 초과하면 안 되는가 */}
            <div className="kf-card" style={{ borderLeft: '3px solid #a855f7', marginBottom: '0' }}>
              <div className="kf-card-title" style={{ color: '#a855f7', fontSize: '14px' }}>왜 Consumer 수가 Partition 수를 초과하면 안 되는가?</div>
              <div className="kf-card-desc">
                Kafka의 핵심 설계 원칙은 <strong style={{ color: '#e2e8f0' }}>1 Partition = 1 Consumer의 배타적 소유</strong>입니다. 하나의 Partition은 Consumer Group 내에서 반드시 하나의 Consumer에만 할당됩니다.<br /><br />
                <strong style={{ color: '#06b6d4' }}>이유 1 - 순서 보장:</strong> Partition 내 메시지는 순서가 보장됩니다. 만약 하나의 Partition을 여러 Consumer가 동시에 읽으면, 메시지 처리 순서가 뒤섞여 <strong style={{ color: '#ef4444' }}>순서 보장이 깨집니다</strong>.<br /><br />
                <strong style={{ color: '#06b6d4' }}>이유 2 - Offset 관리:</strong> 각 Partition의 offset은 하나의 Consumer가 관리합니다. 여러 Consumer가 같은 Partition을 읽으면 offset 충돌이 발생하여 <strong style={{ color: '#ef4444' }}>중복 처리 또는 메시지 유실</strong>이 생깁니다.<br /><br />
                <strong style={{ color: '#06b6d4' }}>이유 3 - 자원 낭비:</strong> 초과된 Consumer는 Partition을 할당받지 못해 <strong style={{ color: '#ef4444' }}>완전히 유휴 상태</strong>가 됩니다. 메모리와 네트워크 연결만 소비하고 아무 일도 하지 않습니다.<br /><br />
                <strong style={{ color: '#22c55e' }}>결론:</strong> 처리량을 늘리려면 <strong style={{ color: '#e2e8f0' }}>Partition 수를 먼저 증가</strong>시킨 후 Consumer를 추가해야 합니다.
              </div>
            </div>
          </div>

          {/* Offset 관리 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#3b82f6' }}>Offset 관리</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">📌</span>
                <span><strong style={{ color: '#e2e8f0' }}>__consumer_offsets:</strong> Consumer Group의 offset은 Kafka 내부 토픽인 <code style={{ color: '#06b6d4', fontSize: '11px' }}>__consumer_offsets</code>에 저장됩니다. Consumer가 어디까지 읽었는지 추적합니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>auto.offset.reset:</strong> Consumer Group이 처음 연결되거나, 저장된 offset이 유효하지 않을 때의 동작. <code style={{ color: '#22c55e', fontSize: '11px' }}>earliest</code> = 처음부터, <code style={{ color: '#ef4444', fontSize: '11px' }}>latest</code> = 최신부터, <code style={{ color: '#f59e0b', fontSize: '11px' }}>none</code> = 에러 발생.</span>
              </div>
            </div>

            {/* Current Position vs Committed Offset */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>Current Position vs Committed Offset</div>
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '18px 20px', marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#cbd5e1', marginBottom: '14px', fontFamily: 'var(--mono)' }}>Offset 개념 비교</div>

                {/* Partition offset bar */}
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--mono)', marginBottom: '6px' }}>Partition의 메시지:</div>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '4px' }}>
                    {Array.from({ length: 10 }, (_, i) => {
                      let bg = 'rgba(255,255,255,0.03)'
                      let border = '#1a2234'
                      let color = '#64748b'
                      if (i <= 3) { bg = 'rgba(34,197,94,0.08)'; border = 'rgba(34,197,94,0.3)'; color = '#22c55e' }
                      else if (i <= 6) { bg = 'rgba(59,130,246,0.08)'; border = 'rgba(59,130,246,0.3)'; color = '#3b82f6' }
                      else { bg = 'rgba(255,255,255,0.03)'; color = '#475569' }
                      return (
                        <div key={i} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '4px', padding: '4px 8px', fontFamily: 'var(--mono)', fontSize: '10px', color, fontWeight: 600, textAlign: 'center', minWidth: '28px' }}>
                          {i}
                        </div>
                      )
                    })}
                  </div>
                  <div style={{ display: 'flex', gap: '2px', fontSize: '9px', fontFamily: 'var(--mono)' }}>
                    <div style={{ minWidth: '28px', textAlign: 'center', visibility: 'hidden' as const }}>0</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', visibility: 'hidden' as const }}>1</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', visibility: 'hidden' as const }}>2</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', color: '#22c55e', fontWeight: 600, borderLeft: '1px solid transparent', paddingLeft: '2px' }}>&#x25B2; Committed</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', visibility: 'hidden' as const }}>4</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', visibility: 'hidden' as const }}>5</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', color: '#3b82f6', fontWeight: 600 }}>&#x25B2; Current</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', visibility: 'hidden' as const }}>7</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', visibility: 'hidden' as const }}>8</div>
                    <div style={{ minWidth: '28px', textAlign: 'center', color: '#94a3b8', fontWeight: 600 }}>&#x25B2; LEO</div>
                  </div>
                </div>

                {/* Offset descriptions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  {[
                    { label: 'Committed Offset', val: '=3', color: '#22c55e', items: [
                      '__consumer_offsets에 저장된 마지막 커밋 위치',
                      'Consumer 재시작 시 이 위치부터 다시 읽음',
                      '"안전하게 처리 완료된" 지점',
                    ]},
                    { label: 'Current Position', val: '=6', color: '#3b82f6', items: [
                      'Consumer가 현재까지 fetch한 위치',
                      '메모리에만 존재, 아직 커밋되지 않음',
                      '"읽었지만 처리 완료가 보장되지 않은" 지점',
                    ]},
                    { label: 'Log-End Offset', val: '=9', color: '#94a3b8', items: [
                      'Partition에 기록된 마지막 메시지의 다음 offset',
                      'Consumer Lag = Log-End Offset - Committed Offset',
                    ]},
                  ].map(section => (
                    <div key={section.label} style={{ background: `${section.color}08`, border: `1px solid ${section.color}25`, borderRadius: '8px', padding: '10px 14px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: section.color, fontFamily: 'var(--mono)', marginBottom: '4px' }}>
                        {section.label} <span style={{ color: '#e2e8f0' }}>{section.val}</span>
                      </div>
                      {section.items.map((item, i) => (
                        <div key={i} style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.6, paddingLeft: '8px' }}>
                          &rarr; {item}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', borderTop: '1px solid #1a2234', paddingTop: '10px' }}>
                  <span style={{ color: '#ef4444', fontSize: '12px', flexShrink: 0 }}>&#x26A0;</span>
                  <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                    <span style={{ color: '#ef4444', fontWeight: 700 }}>핵심:</span> 크래시 시 Committed Offset부터 재처리 시작! Current Position - Committed Offset 사이의 메시지는 중복 처리될 수 있음 &rarr; <span style={{ color: '#e2e8f0', fontWeight: 600 }}>Consumer는 멱등성 보장 필요</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Commit 전략 */}
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>Commit 전략 비교</div>
            <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
              <table className="doc-table">
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>전략</th>
                    <th style={{ width: '30%' }}>동작</th>
                    <th style={{ width: '25%' }}>장점</th>
                    <th>단점</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Auto Commit', 'enable.auto.commit=true (기본). 주기적으로 자동 커밋 (auto.commit.interval.ms)', '구현 간단', '처리 완료 전 커밋 → 메시지 유실 가능', '#f59e0b'],
                    ['commitSync()', '동기 커밋. Broker 응답까지 대기', '가장 안전, 커밋 보장', '응답 대기로 처리량 감소', '#22c55e'],
                    ['commitAsync()', '비동기 커밋. 응답을 기다리지 않음', '높은 처리량', '커밋 실패 시 감지 어려움, 재시도 불가 (순서 문제)', '#3b82f6'],
                    ['Sync + Async 혼합', '평상시 commitAsync(), 셧다운/리밸런싱 시 commitSync()', '처리량 + 안전성 균형', '구현 복잡도 증가', '#a855f7'],
                  ].map(([strategy, behavior, pros, cons, color]) => (
                    <tr key={strategy}>
                      <td style={{ color: color as string, fontWeight: 700, fontSize: '12px' }}>{strategy}</td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>{behavior}</td>
                      <td style={{ color: '#94a3b8', fontSize: '12px' }}>{pros}</td>
                      <td style={{ color: '#5a6a85', fontSize: '12px' }}>{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Auto Commit 위험성 시나리오 */}
            <div style={{ marginTop: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>Auto Commit의 위험성 - 메시지 유실 시나리오</div>
              <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '18px 20px', marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '6px', fontFamily: 'var(--mono)' }}>
                  Auto Commit에서 메시지가 유실되는 시나리오
                </div>
                <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--mono)', marginBottom: '12px' }}>
                  auto.commit.interval.ms = <span style={{ color: '#e2e8f0' }}>5000</span> (5초마다 자동 커밋)
                </div>

                {/* Timeline - Loss scenario */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '12px', borderLeft: '2px solid #ef4444', paddingLeft: '12px' }}>
                  {[
                    { time: 'T+0s', event: 'poll() -> 메시지 10개 수신 (offset 0~9)', color: '#94a3b8' },
                    { time: 'T+1s', event: '메시지 0~4 처리 완료', color: '#22c55e' },
                    { time: 'T+2s', event: '메시지 5 처리 중...', color: '#f59e0b' },
                    { time: 'T+5s', event: 'auto commit 발생! -> offset=10 커밋됨 (아직 5~9번은 미처리)', color: '#ef4444', bold: true },
                    { time: 'T+6s', event: 'Consumer 크래시!', color: '#ef4444', bold: true },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '10px', fontFamily: 'var(--mono)', padding: '3px 0' }}>
                      <span style={{ color: '#5a6a85', minWidth: '45px', fontWeight: 600 }}>{row.time}</span>
                      <span style={{ color: row.color, fontWeight: row.bold ? 700 : 400 }}>{row.event}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '6px', padding: '8px 12px', marginBottom: '16px', fontSize: '10px', fontFamily: 'var(--mono)', color: '#ef4444' }}>
                  재시작 후: Committed Offset = 10부터 읽기 &rarr; 메시지 5~9번 영구 유실!
                </div>

                {/* Timeline - Duplicate scenario */}
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', marginBottom: '6px', fontFamily: 'var(--mono)' }}>
                  반대 시나리오 (중복 처리)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginBottom: '12px', borderLeft: '2px solid #f59e0b', paddingLeft: '12px' }}>
                  {[
                    { time: 'T+0s', event: 'poll() -> 메시지 10개 수신 (offset 0~9)', color: '#94a3b8' },
                    { time: 'T+3s', event: '메시지 0~9 모두 처리 완료', color: '#22c55e' },
                    { time: 'T+3.5s', event: 'Consumer 크래시! (아직 auto commit 안 됨)', color: '#f59e0b', bold: true },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '10px', fontFamily: 'var(--mono)', padding: '3px 0' }}>
                      <span style={{ color: '#5a6a85', minWidth: '45px', fontWeight: 600 }}>{row.time}</span>
                      <span style={{ color: row.color, fontWeight: row.bold ? 700 : 400 }}>{row.event}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '6px', padding: '8px 12px', marginBottom: '14px', fontSize: '10px', fontFamily: 'var(--mono)', color: '#f59e0b' }}>
                  재시작 후: 이전 Committed Offset부터 다시 읽기 &rarr; 메시지 0~9번 중복 처리!
                </div>

                {/* Solution */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', borderTop: '1px solid #1a2234', paddingTop: '10px' }}>
                  <span style={{ color: '#22c55e', fontSize: '12px', flexShrink: 0 }}>&#x2713;</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--mono)', lineHeight: 1.7 }}>
                    <span style={{ color: '#22c55e', fontWeight: 700 }}>해결:</span> <span style={{ color: '#e2e8f0' }}>enable.auto.commit=false</span> + 수동 커밋 &rarr; 메시지 처리 완료 후 명시적으로 <span style={{ color: '#e2e8f0' }}>commitSync()</span> 호출
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rebalancing */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#ef4444' }}>Rebalancing 문제 & 해결</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🚨</span>
                <span><strong style={{ color: '#e2e8f0' }}>Rebalancing이란?</strong> Consumer가 그룹에 합류/이탈할 때, Partition 소유권을 재분배하는 과정입니다. 이 동안 <strong style={{ color: '#ef4444' }}>모든 Consumer가 일시 중단(Stop-the-World)</strong>됩니다.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">⚡</span>
                <span><strong style={{ color: '#e2e8f0' }}>발생 원인:</strong> Consumer 추가/제거, Consumer 장애 (heartbeat 타임아웃), <code style={{ color: '#06b6d4', fontSize: '11px' }}>max.poll.interval.ms</code> 초과 (처리 시간이 너무 긴 경우), Topic의 Partition 수 변경.</span>
              </div>
              <div className="kf-feature-row">
                <span className="kf-feature-icon">🛡️</span>
                <span><strong style={{ color: '#e2e8f0' }}>Eager Rebalancing (기본):</strong> 모든 Partition 할당을 해제한 후 재분배. 전체 Consumer가 일시 정지되어 처리 지연이 발생합니다.</span>
              </div>
            </div>

            <div className="kf-compare-grid" style={{ marginBottom: '16px' }}>
              <div className="kf-card" style={{ borderLeft: '3px solid #22c55e', marginBottom: '0' }}>
                <div className="kf-card-title" style={{ color: '#22c55e', fontSize: '14px' }}>CooperativeStickyAssignor (권장)</div>
                <div className="kf-card-desc">
                  Kafka 2.4+. <strong style={{ color: '#e2e8f0' }}>점진적 리밸런싱(Incremental Rebalancing)</strong>을 수행합니다. 재할당이 필요한 Partition만 이동하고, 나머지 Consumer는 중단 없이 계속 처리합니다.<br /><br />
                  <code style={{ color: '#22c55e', fontSize: '11px' }}>partition.assignment.strategy=org.apache.kafka.clients.consumer.CooperativeStickyAssignor</code><br /><br />
                  <strong style={{ color: '#f59e0b' }}>효과:</strong> Rebalancing 시간 대폭 감소, 처리 중단 최소화, 실무에서 필수적으로 적용해야 할 설정.
                </div>
              </div>

              <div className="kf-card" style={{ borderLeft: '3px solid #3b82f6', marginBottom: '0' }}>
                <div className="kf-card-title" style={{ color: '#3b82f6', fontSize: '14px' }}>Static Group Membership</div>
                <div className="kf-card-desc">
                  <code style={{ color: '#3b82f6', fontSize: '11px' }}>group.instance.id</code> 설정으로 Consumer에 <strong style={{ color: '#e2e8f0' }}>고정 ID</strong>를 부여합니다.<br /><br />
                  일시적인 Consumer 재시작(배포, 롤링 업데이트) 시 <strong style={{ color: '#e2e8f0' }}>Rebalancing을 방지</strong>합니다. <code style={{ color: '#06b6d4', fontSize: '11px' }}>session.timeout.ms</code> 내에 동일한 instance.id로 재연결하면 기존 Partition 할당이 그대로 유지됩니다.<br /><br />
                  <strong style={{ color: '#f59e0b' }}>적용 시나리오:</strong> Kubernetes 환경에서 Pod 재시작, 롤링 배포, Consumer 코드 업데이트 시 불필요한 Rebalancing 제거.
                </div>
              </div>
            </div>

            <DiagramContainer title="STATIC GROUP MEMBERSHIP 비교">
              <DiagramGrid cols={2}>
                <DiagramGroup label="group.instance.id 미설정 (기본 동작)" color="#ef4444">
                  <DiagramFlow>
                    <DiagramNode label="Consumer" sub="(member-1)" color="#f97316" />
                    <DiagramArrow label="재시작" color="#ef4444" />
                    <DiagramNode label="연결 끊김" sub="Rebalance!" color="#ef4444" />
                    <DiagramArrow label="새 member.id" color="#ef4444" />
                    <DiagramNode label="새 연결" sub="(member-2)" color="#f97316" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramGroup label="group.instance.id 설정 시" color="#22c55e">
                  <DiagramFlow>
                    <DiagramNode label="Consumer" sub="(instance:c-1)" color="#06b6d4" />
                    <DiagramArrow label="재시작" color="#f59e0b" />
                    <DiagramNode label="연결 끊김" sub="대기 중..." color="#f59e0b" />
                    <DiagramArrow label="동일 instance.id" color="#22c55e" />
                    <DiagramNode label="Consumer" sub="(instance:c-1) 동일 Partition 유지!" color="#22c55e" />
                  </DiagramFlow>
                </DiagramGroup>
              </DiagramGrid>
            </DiagramContainer>
          </div>

          {/* 주요 Consumer 설정 */}
          <div className="kf-section-box" style={{ marginBottom: '20px' }}>
            <div className="kf-section-subtitle"><span style={{ color: '#f59e0b' }}>주요 Consumer 설정</span></div>
            <div className="kf-param-grid">
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#06b6d4' }}>max.poll.records</div>
                <div className="kf-param-desc">한 번의 poll()에서 가져오는 최대 레코드 수. 처리 시간이 max.poll.interval.ms를 초과하지 않도록 적절히 설정합니다.</div>
                <div className="kf-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>기본 500</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#ef4444' }}>max.poll.interval.ms</div>
                <div className="kf-param-desc">poll() 호출 간 최대 허용 시간. 초과하면 Consumer가 죽은 것으로 판단하고 리밸런싱을 트리거합니다.</div>
                <div className="kf-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>기본 300초</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#a855f7' }}>session.timeout.ms</div>
                <div className="kf-param-desc">Consumer heartbeat 타임아웃. 이 시간 동안 heartbeat가 없으면 Consumer가 제거됩니다.</div>
                <div className="kf-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>기본 45초</div>
              </div>
              <div className="kf-param">
                <div className="kf-param-name" style={{ color: '#22c55e' }}>fetch.min.bytes</div>
                <div className="kf-param-desc">Broker가 최소 이 크기만큼 데이터가 모일 때까지 응답을 지연합니다. 네트워크 왕복 횟수를 줄여 효율을 높입니다.</div>
                <div className="kf-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>기본 1 byte</div>
              </div>
            </div>

            <HighlightBox color="#a855f7" style={{ marginTop: '16px' }}>
              <strong style={{ color: '#a855f7' }}>Consumer Lag 모니터링:</strong> Consumer Lag = 최신 offset - Consumer의 현재 offset. Lag가 지속적으로 증가하면 Consumer 처리 속도가 생산 속도를 따라가지 못하는 것입니다. <code style={{ fontSize: '11px' }}>kafka-consumer-groups.sh --describe</code>로 확인하거나, Burrow/Grafana로 실시간 모니터링합니다.
            </HighlightBox>
          </div>

          {/* Consumer Lag 원인과 해결 전략 */}
          <div className="kf-section-box">
            <div className="kf-section-subtitle"><span style={{ color: '#ef4444' }}>Consumer Lag 원인과 해결 전략</span></div>
            <div style={{ background: '#080b11', border: '1px solid #1a2234', borderRadius: '10px', padding: '18px 20px', marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '12px', fontFamily: 'var(--mono)' }}>Consumer Lag이 쌓이는 상황</div>

              {/* Speed bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '10px', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: '#94a3b8', minWidth: '130px' }}>Producer 생산 속도:</span>
                  <div style={{ flex: 1, height: '12px', background: 'rgba(34,197,94,0.15)', borderRadius: '4px', position: 'relative' as const, border: '1px solid rgba(34,197,94,0.3)' }}>
                    <div style={{ width: '100%', height: '100%', background: 'rgba(34,197,94,0.3)', borderRadius: '3px' }} />
                  </div>
                  <span style={{ color: '#22c55e', fontWeight: 700, minWidth: '70px', textAlign: 'right' as const }}>1000 msg/s</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '10px', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: '#94a3b8', minWidth: '130px' }}>Consumer 처리 속도:</span>
                  <div style={{ flex: 1, height: '12px', background: 'rgba(239,68,68,0.08)', borderRadius: '4px', position: 'relative' as const, border: '1px solid rgba(239,68,68,0.2)' }}>
                    <div style={{ width: '60%', height: '100%', background: 'rgba(239,68,68,0.25)', borderRadius: '3px' }} />
                  </div>
                  <span style={{ color: '#ef4444', fontWeight: 700, minWidth: '70px', textAlign: 'right' as const }}>600 msg/s</span>
                </div>
              </div>

              {/* Lag growth */}
              <div style={{ fontSize: '10px', fontWeight: 600, color: '#cbd5e1', marginBottom: '8px', fontFamily: 'var(--mono)' }}>시간에 따른 Lag 변화:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px' }}>
                {[
                  { time: 'T+0s', lag: '0', pct: 0, color: '#22c55e' },
                  { time: 'T+10s', lag: '4,000', pct: 3, color: '#f59e0b' },
                  { time: 'T+60s', lag: '24,000', pct: 20, color: '#f97316' },
                  { time: 'T+300s', lag: '120,000', pct: 100, color: '#ef4444', danger: true },
                ].map(row => (
                  <div key={row.time} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '10px', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: '#5a6a85', minWidth: '50px' }}>{row.time}</span>
                    <span style={{ color: '#94a3b8', minWidth: '55px' }}>Lag: {row.lag}</span>
                    <div style={{ flex: 1, height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.max(row.pct, 1)}%`, height: '100%', background: row.color, borderRadius: '3px', transition: 'width 0.3s' }} />
                    </div>
                    {row.danger && <span style={{ color: '#ef4444', fontWeight: 700 }}>&larr; 위험!</span>}
                  </div>
                ))}
              </div>

              {/* Consequences */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #1a2234', paddingTop: '10px' }}>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: '#ef4444' }}>&rarr;</span> 메시지 처리 지연 증가 (실시간성 상실)
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: '#ef4444' }}>&rarr;</span> 메모리 부족 (대량 메시지 적체)
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--mono)' }}>
                  <span style={{ color: '#ef4444' }}>&rarr;</span> Broker 디스크 부족 (retention 초과 시 메시지 삭제 &rarr; 데이터 유실)
                </div>
              </div>
            </div>

            <div style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', marginBottom: '10px' }}>해결 전략</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(6,182,212,0.2)', color: '#06b6d4' }}>1</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>Partition 수 증가 + Consumer 수 증가 (스케일 아웃)</strong><br />
                  가장 직접적인 해결책입니다. Partition을 늘리고 그에 맞춰 Consumer를 추가하면 병렬 처리량이 선형적으로 증가합니다. 단, Partition 수는 한번 늘리면 줄일 수 없으므로 신중히 결정해야 합니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(168,85,247,0.2)', color: '#a855f7' }}>2</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>max.poll.records 조정</strong><br />
                  한 번에 가져오는 레코드 수를 줄여 <code style={{ color: '#06b6d4', fontSize: '11px' }}>max.poll.interval.ms</code> 초과로 인한 Rebalancing을 방지합니다. 반대로 처리가 빠르다면 늘려서 네트워크 왕복을 줄일 수 있습니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(34,197,94,0.2)', color: '#22c55e' }}>3</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>처리 로직 최적화</strong><br />
                  DB 쿼리 최적화, 외부 API 호출 개선, 불필요한 직렬화/역직렬화 제거 등 메시지 처리 자체의 성능을 개선합니다. 배치 처리(bulk insert 등)로 I/O 효율을 높이는 것도 효과적입니다.
                </div>
              </div>
              <div className="kf-step">
                <div className="kf-step-num" style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>4</div>
                <div className="kf-step-content">
                  <strong style={{ color: '#e2e8f0' }}>비동기 처리 도입</strong><br />
                  메시지를 poll()한 후 내부 큐에 넣고, 별도의 워커 스레드에서 실제 처리를 수행합니다. poll() 루프는 빠르게 돌면서 offset 관리에 집중하고, 무거운 작업은 비동기로 처리합니다. 단, offset 커밋 시점 관리에 주의가 필요합니다.
                </div>
              </div>
            </div>

            <HighlightBox color="#ef4444" style={{ marginTop: '16px' }}>
              <strong style={{ color: '#ef4444' }}>Lag 알림 기준 예시:</strong> Warning: Lag &gt; 10,000 (처리 지연 감지), Critical: Lag &gt; 100,000 또는 Lag 증가 속도 &gt; 500/s (즉시 대응 필요). Burrow, Kafka Exporter + Prometheus + Grafana 조합으로 실시간 모니터링과 알림을 구축하세요.
            </HighlightBox>
          </div>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>면접에서 자주 나오는 질문</SectionTitle>
          <InterviewQuestions color="#a855f7" items={[
            {
              q: 'Consumer Group의 Rebalancing이란 무엇이고, 어떤 문제가 있나요?',
              a: 'Rebalancing은 Consumer Group 내에서 Partition의 소유권을 재분배하는 과정입니다. Consumer가 합류/이탈하거나, max.poll.interval.ms를 초과하면 발생합니다. 기본 Eager Rebalancing에서는 모든 Partition 할당을 해제한 후 재분배하므로, 전체 Consumer가 일시적으로 처리를 중단하는 Stop-the-World 문제가 발생합니다. 이를 해결하기 위해 Kafka 2.4+의 CooperativeStickyAssignor를 사용하면, 이동이 필요한 Partition만 재할당하고 나머지 Consumer는 중단 없이 계속 처리할 수 있습니다. 또한 session.timeout.ms와 heartbeat.interval.ms를 적절히 설정하여 불필요한 Rebalancing을 방지해야 합니다.',
            },
            {
              q: 'Consumer에서 Auto Commit을 사용하면 어떤 문제가 생길 수 있나요?',
              a: 'Auto Commit(enable.auto.commit=true)은 auto.commit.interval.ms 주기로 poll() 시점에 이전 배치의 offset을 자동 커밋합니다. 두 가지 문제가 발생할 수 있습니다. 첫째, 메시지 유실: poll()로 10개 메시지를 받아 5개만 처리한 상태에서 auto commit이 발생하면 offset=10이 커밋됩니다. 이후 Consumer가 크래시하면 5~9번 메시지는 처리되지 않았지만 건너뛰게 됩니다. 둘째, 중복 처리: 모든 메시지를 처리했지만 auto commit 주기가 돌아오기 전에 크래시하면, 재시작 시 이전 committed offset부터 다시 읽어 중복 처리가 발생합니다. 해결책은 enable.auto.commit=false로 설정하고, 메시지 처리 완료 후 commitSync() 또는 commitAsync()를 명시적으로 호출하는 것입니다.',
            },
            {
              q: 'Consumer Lag이 지속적으로 증가하면 어떻게 대응하나요?',
              a: 'Consumer Lag가 지속 증가하면 Consumer 처리 속도가 Producer 생산 속도를 따라가지 못하는 것입니다. 단계별 대응: 1) 즉시 대응으로 max.poll.records를 줄여 Rebalancing을 방지하고, Consumer 인스턴스를 추가합니다. 2) 근본 원인 분석으로 처리 로직에서 병목(DB 쿼리, 외부 API, 직렬화 등)을 찾아 최적화합니다. 3) 구조적 개선으로 Partition 수를 증가시키고 Consumer를 그에 맞게 스케일 아웃합니다. 무거운 처리는 비동기로 전환하여 poll() 루프를 가볍게 유지합니다. 4) 모니터링 체계로 Burrow나 Prometheus + Grafana로 Lag을 실시간 추적하고, 임계값 초과 시 알림을 설정합니다. 주의할 점은 Partition 수는 한번 늘리면 줄일 수 없으므로, 처리 로직 최적화를 먼저 시도한 후 스케일 아웃을 고려해야 합니다.',
            },
            {
              q: 'Producer에서 메시지 전송이 실패하면 어떻게 처리하나요?',
              a: 'Producer 전송 실패는 크게 재시도 가능(retriable)과 재시도 불가(non-retriable) 에러로 나뉩니다. 재시도 가능한 에러(네트워크 단절, Leader 교체 등)는 retries와 delivery.timeout.ms 설정으로 자동 재시도됩니다. Idempotent Producer(enable.idempotence=true)를 사용하면 재시도로 인한 중복도 방지됩니다. 재시도 불가한 에러(SerializationException, 메시지 크기 초과 등)는 즉시 실패합니다. 실무에서는 send()의 Callback을 활용하여 실패한 메시지를 DLQ(Dead Letter Queue)에 기록하거나, 로컬 저장소에 저장 후 별도 재시도 프로세스를 구현합니다. 또한 buffer.memory가 가득 차면 max.block.ms만큼 대기 후 TimeoutException이 발생하므로, 버퍼 크기와 전송 속도의 균형을 맞추는 것도 중요합니다.',
            },
          ]} />
        </div>
      </div>
    </>
  )
}

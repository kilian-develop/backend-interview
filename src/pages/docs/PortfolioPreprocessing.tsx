import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramGroup } from '../../components/doc/Diagram'
// CodeBlock available for code/pseudocode blocks
// import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.pp-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.pp-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.pp-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.pp-card-icon { font-size:28px; margin-bottom:12px; }
.pp-card-title { font-size:15px; font-weight:800; margin-bottom:8px; }
.pp-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.pp-card-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.pp-arch-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; overflow-x:auto; }
.pp-arch-label { display:inline-block; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.pp-qa-list { display:flex; flex-direction:column; gap:12px; }
.pp-qa-item { background:#0e1118; border:1px solid #1a2234; border-radius:14px; overflow:hidden; transition:box-shadow .2s; }
.pp-qa-item:hover { box-shadow:0 4px 20px rgba(6,182,212,0.06); }
.pp-qa-header { display:flex; align-items:center; justify-content:space-between; padding:18px 22px; cursor:pointer; user-select:none; gap:12px; }
.pp-qa-header:hover { background:rgba(255,255,255,0.02); }
.pp-qa-q { font-size:14px; font-weight:700; color:#cbd5e1; line-height:1.6; flex:1; }
.pp-qa-toggle { font-size:18px; color:#5a6a85; transition:transform .3s; flex-shrink:0; width:24px; text-align:center; }
.pp-qa-toggle.open { transform:rotate(180deg); }
.pp-qa-body { padding:0 22px 20px 22px; display:none; }
.pp-qa-body.open { display:block; }
.pp-qa-section { margin-bottom:14px; }
.pp-qa-section:last-child { margin-bottom:0; }
.pp-qa-section-title { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:3px 8px; border-radius:4px; display:inline-flex; margin-bottom:8px; }
.pp-qa-section-content { font-size:12px; color:#94a3b8; line-height:1.9; }
.pp-qa-section-content li { margin-bottom:4px; padding-left:4px; }
.pp-qa-section-content ul { list-style:none; padding-left:0; }
.pp-qa-section-content ul li::before { content:'- '; color:#5a6a85; }
.pp-qa-warn { font-size:12px; color:#f59e0b; line-height:1.8; padding:10px 14px; background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:8px; }
.pp-perf-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
.pp-perf-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; text-align:center; transition:transform .2s; }
.pp-perf-card:hover { transform:translateY(-3px); }
.pp-perf-value { font-size:28px; font-weight:900; font-family:'JetBrains Mono',monospace; margin-bottom:4px; }
.pp-perf-label { font-size:12px; color:#5a6a85; margin-bottom:6px; }
.pp-perf-detail { font-size:10px; color:#5a6a85; font-family:'JetBrains Mono',monospace; }
.pp-keyword-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
.pp-keyword { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:16px; transition:transform .2s; }
.pp-keyword:hover { transform:translateY(-2px); }
.pp-keyword-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.pp-keyword-desc { font-size:11px; color:#5a6a85; line-height:1.7; }
.pp-followup-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(300px,1fr)); gap:14px; }
.pp-followup { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.pp-followup:hover { transform:translateY(-3px); }
.pp-followup-q { font-size:13px; font-weight:700; margin-bottom:8px; line-height:1.6; }
.pp-followup-hint { font-size:11px; color:#5a6a85; line-height:1.8; }
.pp-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.pp-problem-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:16px; }
.pp-problem { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; border-left:3px solid #ef4444; transition:transform .2s; }
.pp-problem:hover { transform:translateY(-3px); }
.pp-problem-title { font-size:14px; font-weight:800; color:#ef4444; margin-bottom:8px; }
.pp-problem-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.pp-solution-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.pp-solution { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; border-left:3px solid #22c55e; transition:transform .2s; }
.pp-solution:hover { transform:translateY(-3px); }
.pp-solution-num { font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; padding:3px 8px; border-radius:6px; display:inline-flex; margin-bottom:10px; }
.pp-solution-title { font-size:14px; font-weight:800; color:#22c55e; margin-bottom:8px; }
.pp-solution-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.pp-timeline { display:flex; flex-direction:column; gap:0; position:relative; padding-left:28px; }
.pp-timeline::before { content:''; position:absolute; left:11px; top:8px; bottom:8px; width:2px; background:#1a2234; }
.pp-timeline-item { position:relative; padding:14px 0; }
.pp-timeline-dot { position:absolute; left:-22px; top:18px; width:12px; height:12px; border-radius:50%; border:2px solid; background:#0a0d14; }
.pp-timeline-title { font-size:13px; font-weight:700; margin-bottom:4px; }
.pp-timeline-desc { font-size:11px; color:#5a6a85; line-height:1.7; }
`

interface QAItem {
  question: string
  keyPoints: string[]
  answerGuide: string
  caution: string
}

const qaItems: QAItem[] = [
  {
    question: '이 프로젝트에서 본인의 역할과 기여도는?',
    keyPoints: [
      '문서 전처리 파이프라인 전체 아키텍처 재설계 주도',
      '기존 동기 방식에서 이벤트 기반 비동기 아키텍처로 전환',
      'batchUpdate 최적화로 즉각적 성능 개선 달성',
      'Outbox 패턴 설계 및 구현',
    ],
    answerGuide: '카피킬러 서비스의 문서 전처리 파이프라인을 담당했습니다. 사용자가 업로드한 PDF, HWP, DOCS 문서에서 텍스트를 추출하고, OCR 처리 후 문장을 분할하여 100억건 이상의 문서와 비교할 수 있도록 준비하는 과정입니다. 처음에는 대용량 문서에서 빈번한 Read Timeout과 장애가 발생하여 CS 문의가 많았고, 이를 해결하기 위해 먼저 DB 쓰기 최적화(batchUpdate)로 급한 불을 끄고, 이후 Kafka 기반 이벤트 아키텍처로 전면 재설계했습니다. API 모듈, Batch 모듈(Outbox 발행), Worker 모듈(Kafka 컨슈밍)로 분리하여 각 과정의 독립성과 장애 격리를 확보했습니다.',
    caution: '역할을 과장하지 말고, 구체적인 기술 선택의 근거를 함께 설명하세요. "전부 다 했다"보다 "어떤 부분을 주도하고, 팀과 어떻게 협업했는지"를 명확히 하는 것이 좋습니다.',
  },
  {
    question: '왜 Kafka를 선택했나요? RabbitMQ와 비교하면?',
    keyPoints: [
      'Kafka: 이벤트 로그 보존 (재처리 가능)',
      'RabbitMQ: 메시지 소비 후 삭제',
      '문서 전처리 특성상 실패 시 재처리가 필수',
      'Kafka의 파티션 기반 수평 확장이 처리량 확보에 유리',
    ],
    answerGuide: 'Kafka를 선택한 핵심 이유는 이벤트 보존과 재처리 가능성입니다. 문서 전처리는 텍스트 추출, OCR, 문장 분할이라는 여러 단계를 거치는데, 어느 한 단계에서 실패하더라도 이벤트가 보존되어 해당 시점부터 재처리할 수 있어야 했습니다. RabbitMQ는 메시지가 소비되면 큐에서 삭제되기 때문에, 장애 시 메시지 유실 위험이 있습니다. 반면 Kafka는 로그 기반으로 메시지를 보존하므로 Consumer Offset을 조정하여 재처리가 가능합니다. 또한 파티션 기반 수평 확장으로 대량의 문서 처리 요청을 감당할 수 있었습니다.',
    caution: '"RabbitMQ가 안 좋아서"라고 단정하지 마세요. RabbitMQ도 Dead Letter Queue 등으로 재처리가 가능하지만, 우리 상황에서 Kafka가 더 적합했다는 맥락으로 설명하세요.',
  },
  {
    question: 'Outbox 패턴이란 무엇이고, 왜 사용했나요?',
    keyPoints: [
      'DB 트랜잭션과 메시지 발행의 원자성 보장',
      'Outbox 테이블에 이벤트를 저장 후 별도 프로세스가 Kafka로 발행',
      'DB 커밋 실패 시 메시지도 발행되지 않음 (데이터 일관성)',
      'At-least-once delivery 보장',
    ],
    answerGuide: 'Outbox 패턴은 DB 트랜잭션과 메시지 발행 사이의 원자성 문제를 해결하는 패턴입니다. 예를 들어, 문서 처리 요청을 DB에 저장하면서 동시에 Kafka에 이벤트를 발행해야 하는데, DB 커밋은 성공했지만 Kafka 발행이 실패하면 데이터 불일치가 발생합니다. Outbox 패턴에서는 비즈니스 로직과 함께 Outbox 테이블에 이벤트를 같은 트랜잭션으로 저장합니다. 별도의 Batch 모듈이 Outbox 테이블을 폴링하여 Kafka로 발행합니다. DB 트랜잭션이 실패하면 Outbox에도 저장되지 않으므로 유령 메시지가 발행되지 않고, Kafka 발행이 실패하면 Outbox에 남아 있어 재시도가 가능합니다.',
    caution: 'Outbox 패턴의 단점(폴링 지연, Outbox 테이블 관리 부담)도 인지하고 있어야 합니다. CDC(Change Data Capture) 방식과의 비교도 준비하세요.',
  },
  {
    question: 'At-least-once delivery에서 중복 처리는 어떻게 방지하나요?',
    keyPoints: [
      'At-least-once는 최소 1회 전달 보장 (중복 가능)',
      '멱등성(Idempotency) 키를 활용한 중복 처리 방지',
      '문서 ID 기반의 Upsert 또는 처리 상태 체크',
      'Consumer 측에서 이미 처리된 이벤트 식별 로직',
    ],
    answerGuide: 'At-least-once는 메시지가 최소 1번은 전달됨을 보장하지만, 네트워크 장애나 Consumer 재시작 시 같은 메시지가 중복 전달될 수 있습니다. 이를 방지하기 위해 Consumer 측에서 멱등성을 보장하는 설계를 했습니다. 각 문서 처리 요청에 고유한 처리 ID를 부여하고, Worker가 이벤트를 수신할 때 이미 처리된 ID인지 확인합니다. MongoDB에서는 문서 ID를 키로 Upsert를 수행하여, 같은 문서가 중복 처리되더라도 결과가 동일하게 유지됩니다. 핵심은 Producer 측이 아닌 Consumer 측에서 멱등성을 보장하는 것입니다.',
    caution: 'Exactly-once와의 차이를 정확히 이해하고 있어야 합니다. Kafka의 Exactly-once semantics(트랜잭션 기반)도 있지만, 현실적으로 Consumer 멱등성이 더 실용적인 이유를 설명할 수 있어야 합니다.',
  },
  {
    question: 'MongoDB를 선택한 이유는? RDBMS 대비 장점은?',
    keyPoints: [
      '문장 데이터는 Key 기반 조회가 대부분 (JOIN 불필요)',
      '스키마 유연성: 문서 타입별로 추출 결과 구조가 다름',
      '쓰기 성능: 대량 문장 데이터의 빠른 저장',
      '수평 확장(Sharding)이 용이',
    ],
    answerGuide: 'MongoDB를 선택한 이유는 문서 전처리 결과 데이터의 특성 때문입니다. 전처리된 문장 데이터는 문서 ID를 Key로 조회하는 패턴이 대부분이고, 다른 테이블과의 JOIN이 필요하지 않습니다. RDBMS에서 문서당 수백~수천 개의 문장을 개별 Row로 저장하면 대량 쓰기 시 인덱스 갱신 등으로 성능이 저하되지만, MongoDB는 문서 단위로 한 번에 저장할 수 있어 쓰기 성능이 우수합니다. 또한 PDF, HWP, DOCS 등 문서 타입에 따라 추출 결과의 구조가 다를 수 있는데, MongoDB의 유연한 스키마가 이를 자연스럽게 수용합니다.',
    caution: '"NoSQL이 무조건 좋다"는 식의 답변은 피하세요. RDBMS가 필요한 경우(트랜잭션 무결성, 복잡한 JOIN 등)와의 트레이드오프를 이해하고 있어야 합니다.',
  },
  {
    question: 'batchUpdate를 먼저 배포한 이유는?',
    keyPoints: [
      '아키텍처 전면 변경은 시간이 오래 걸림',
      '가장 큰 병목이었던 DB I/O를 즉시 개선 가능',
      '위험도가 낮고 효과가 즉각적인 개선',
      'Quick Win을 통한 팀 신뢰 확보',
    ],
    answerGuide: '당시 장애가 주 28건씩 발생하고 있었기 때문에, 근본적 해결인 아키텍처 재설계와 병행하여 즉시 효과를 볼 수 있는 개선을 먼저 배포했습니다. 문서 1건당 N개 문장을 개별 INSERT하던 것을 JdbcTemplate의 batchUpdate()로 변경하여 N번의 DB 왕복을 1번으로 줄였습니다. 1000문장 기준 8,890ms에서 1,182ms로, 5000문장 기준 37,391ms에서 5,155ms로 개선되었습니다. 이 변경은 기존 로직 수정 없이 DB 접근 방식만 바꾸는 것이어서 위험도가 낮았고, 배포 즉시 Read Timeout 발생률이 크게 감소했습니다. 이런 Quick Win이 이후 큰 아키텍처 변경에 대한 팀의 신뢰를 확보하는 데도 도움이 되었습니다.',
    caution: '"급한 불 끄기"라는 표현을 사용하되, 이것이 임시방편이 아니라 전략적 판단이었음을 강조하세요. 아키텍처 변경과 동시에 진행한 이유를 설명하세요.',
  },
  {
    question: '이벤트 기반 아키텍처의 단점은 무엇인가요?',
    keyPoints: [
      '디버깅 복잡성 증가 (분산 추적 필요)',
      '이벤트 순서 보장의 어려움',
      '최종 일관성(Eventual Consistency) 수용 필요',
      '운영 복잡도 증가 (Kafka 클러스터 관리)',
    ],
    answerGuide: '이벤트 기반 아키텍처의 가장 큰 단점은 복잡성 증가입니다. 첫째, 디버깅이 어려워집니다. 동기 방식에서는 콜스택을 따라가면 되지만, 비동기 이벤트 방식에서는 메시지가 어디서 발행되어 어디서 소비되는지 추적하기 위해 분산 추적(Distributed Tracing)이 필요합니다. 둘째, 최종 일관성(Eventual Consistency)을 수용해야 합니다. 이벤트가 전달되는 시간 동안 데이터 불일치가 발생할 수 있고, 이를 비즈니스 관점에서 허용 가능한지 판단해야 합니다. 셋째, Kafka 클러스터 자체의 운영 부담이 있습니다. 파티션 리밸런싱, Consumer Lag 모니터링, 브로커 장애 대응 등이 필요합니다. 문서 전처리 서비스에서는 비동기 처리가 자연스러운 도메인이었기 때문에 이러한 단점을 감수할 가치가 있었습니다.',
    caution: '단점을 나열만 하지 말고, 각 단점에 대해 어떻게 대응했는지(또는 왜 감수했는지)까지 설명해야 합니다. 단점을 인지하고 있다는 것 자체가 중요합니다.',
  },
  {
    question: 'Kafka Consumer가 장애 발생 시 어떻게 대응하나요?',
    keyPoints: [
      'Consumer Group의 리밸런싱으로 자동 페일오버',
      'Dead Letter Topic(DLT)으로 처리 실패 메시지 격리',
      'Consumer Lag 모니터링을 통한 조기 감지',
      '재시도 정책(Retry Policy) 설정',
    ],
    answerGuide: 'Kafka Consumer 장애 대응은 여러 계층에서 이루어집니다. 먼저 Consumer Group 내에서 한 Consumer가 다운되면, Kafka가 자동으로 파티션을 다른 Consumer에게 재할당(리밸런싱)합니다. 개별 메시지 처리 실패 시에는 재시도 정책을 적용하고, 일정 횟수 이상 실패하면 Dead Letter Topic(DLT)으로 격리하여 다른 메시지 처리를 막지 않도록 합니다. DLT에 쌓인 메시지는 별도로 분석하여 원인을 파악하고 수동 재처리합니다. 운영 측면에서는 Consumer Lag을 모니터링하여 처리 지연이 발생하면 알림을 받고, 필요 시 Consumer 인스턴스를 추가하여 처리량을 늘립니다.',
    caution: 'Consumer Lag, DLT, 리밸런싱 등의 개념을 정확히 이해하고 설명하세요. 실제 운영 경험이 있다면 구체적 수치(Lag 임계값, 재시도 횟수 등)를 언급하면 좋습니다.',
  },
  {
    question: '파티션 전략은 어떻게 구성했나요?',
    keyPoints: [
      '문서 ID를 파티션 키로 사용하여 같은 문서의 이벤트가 같은 파티션으로',
      '파티션 수 = Consumer 수의 배수로 설정하여 균등 분배',
      '순서 보장이 필요한 이벤트는 같은 파티션 내에서 처리',
      '파티션 수는 처리량에 따라 조정 가능',
    ],
    answerGuide: '파티션 키로 문서 ID를 사용했습니다. 이렇게 하면 같은 문서에 대한 이벤트(텍스트 추출 완료, OCR 완료, 문장 분할 완료)가 같은 파티션에 들어가므로, 한 문서의 처리 순서가 보장됩니다. 파티션 수는 예상 Consumer 수의 배수로 설정하여, Consumer 증감 시에도 균등 분배가 가능하도록 했습니다. 예를 들어 Worker가 3대라면 파티션을 6개나 9개로 설정합니다. 특정 문서가 특별히 크더라도 다른 파티션의 처리에 영향을 주지 않아 장애가 격리됩니다.',
    caution: '파티션 키 선택의 트레이드오프를 이해하세요. 문서 ID를 키로 하면 특정 문서에 이벤트가 몰려도 핫 파티션이 되지 않는 이유(문서별 이벤트 수가 제한적)까지 설명할 수 있어야 합니다.',
  },
  {
    question: '이 아키텍처에서 개선할 점이 있다면?',
    keyPoints: [
      'Outbox 폴링 방식을 CDC(Debezium)로 대체하여 지연 감소',
      'Schema Registry 도입으로 이벤트 스키마 관리',
      'Circuit Breaker 패턴 적용으로 외부 서비스 장애 전파 차단',
      '비동기 처리 상태를 사용자에게 실시간 전달 (WebSocket/SSE)',
    ],
    answerGuide: '몇 가지 개선 방향을 고려하고 있습니다. 첫째, Outbox 패턴의 폴링 방식은 배치 주기만큼 지연이 발생합니다. Debezium 같은 CDC 도구를 사용하면 DB 변경 로그를 실시간으로 캡처하여 Kafka로 전달할 수 있어 지연을 줄일 수 있습니다. 둘째, 이벤트 스키마가 변경될 때의 하위 호환성을 관리하기 위해 Schema Registry 도입을 검토할 수 있습니다. 셋째, OCR 같은 외부 서비스 연동 시 Circuit Breaker를 적용하여, 외부 서비스 장애가 전체 시스템으로 전파되는 것을 차단할 수 있습니다. 넷째, 현재 비동기 처리 결과를 Callback으로 전달하고 있지만, WebSocket이나 SSE를 통해 실시간으로 처리 상태를 사용자에게 보여주면 UX를 개선할 수 있습니다.',
    caution: '개선점을 말할 때 "현재 구조가 부족하다"는 뉘앙스보다, "현재 구조에서 더 발전시킬 수 있는 방향"으로 표현하세요. 현재 구조를 선택한 합리적 이유와 함께 향후 방향을 제시하는 것이 좋습니다.',
  },
]

export default function PortfolioPreprocessing() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  useInjectCSS('style-portfolio-preprocessing', CSS)

  const toggleItem = (index: number) => {
    setOpenItems(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const expandAll = () => {
    setOpenItems(new Set(qaItems.map((_, i) => i)))
  }

  const collapseAll = () => {
    setOpenItems(new Set())
  }

  return (
    <>
      <HeroSection
        tag="📋 포트폴리오 면접 준비"
        title={<>문서 전처리 서비스<br /><span style={{ fontSize: '0.55em', color: '#5a6a85' }}>카피킬러 · 무하유</span></>}
        description={<>대용량 문서 전처리 파이프라인의 아키텍처 재설계 경험을 바탕으로<br />예상 면접 질문과 답변 전략을 정리합니다</>}
      />

      <div className="doc-content">
        {/* 성과 지표 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>핵심 성과 지표</SectionTitle>
          <div className="pp-perf-grid">
            <div className="pp-perf-card" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="pp-perf-value" style={{ color: '#22c55e' }}>83%</div>
              <div className="pp-perf-label">평균 처리 시간 단축</div>
              <div className="pp-perf-detail">18초 → 3초</div>
            </div>
            <div className="pp-perf-card" style={{ borderTop: '3px solid #3b82f6' }}>
              <div className="pp-perf-value" style={{ color: '#3b82f6' }}>93%</div>
              <div className="pp-perf-label">주평균 장애 감소</div>
              <div className="pp-perf-detail">28건 → 2건</div>
            </div>
            <div className="pp-perf-card" style={{ borderTop: '3px solid #a855f7' }}>
              <div className="pp-perf-value" style={{ color: '#a855f7' }}>86%</div>
              <div className="pp-perf-label">batchUpdate 성능 개선</div>
              <div className="pp-perf-detail">5000문장: 37.4s → 5.2s</div>
            </div>
            <div className="pp-perf-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="pp-perf-value" style={{ color: '#f59e0b' }}>급감</div>
              <div className="pp-perf-label">대용량 문서 CS 문의</div>
              <div className="pp-perf-detail">Read Timeout 해소</div>
            </div>
          </div>
        </div>

        {/* 프로젝트 핵심 요약 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>프로젝트 핵심 요약</SectionTitle>
          <div className="pp-grid">
            <div className="pp-card" style={{ borderTop: '3px solid #06b6d4' }}>
              <div className="pp-card-icon">🔍</div>
              <div className="pp-card-badge" style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4' }}>SERVICE</div>
              <div className="pp-card-title" style={{ color: '#06b6d4' }}>카피킬러 표절 검사</div>
              <div className="pp-card-desc">
                사용자가 업로드한 문서(PDF, HWP, DOCS)를 <strong style={{ color: '#e2e8f0' }}>100억건 이상의 문서</strong>와 비교하여 표절률을 측정하는 서비스입니다.
                문서 전처리는 표절 검사의 첫 번째 단계로, 정확한 비교를 위해 문서에서 텍스트를 추출하고 문장으로 분할합니다.
              </div>
            </div>
            <div className="pp-card" style={{ borderTop: '3px solid #a855f7' }}>
              <div className="pp-card-icon">⚙️</div>
              <div className="pp-card-badge" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7' }}>PIPELINE</div>
              <div className="pp-card-title" style={{ color: '#a855f7' }}>전처리 파이프라인</div>
              <div className="pp-card-desc">
                <strong style={{ color: '#e2e8f0' }}>텍스트 추출 → OCR → 문장 분할</strong>의 3단계로 구성됩니다.
                각 단계는 이벤트 기반으로 분리되어 독립적으로 처리되며, 실패 시 해당 단계만 재시도할 수 있습니다.
              </div>
            </div>
            <div className="pp-card" style={{ borderTop: '3px solid #22c55e' }}>
              <div className="pp-card-icon">🏗️</div>
              <div className="pp-card-badge" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>ARCHITECTURE</div>
              <div className="pp-card-title" style={{ color: '#22c55e' }}>이벤트 기반 재설계</div>
              <div className="pp-card-desc">
                <strong style={{ color: '#e2e8f0' }}>API 모듈 + Batch 모듈(Outbox) + Worker 모듈(Kafka Consumer)</strong>로 분리.
                Outbox 패턴으로 At-least-once 보장, MongoDB로 문장 데이터 저장.
              </div>
            </div>
            <div className="pp-card" style={{ borderTop: '3px solid #f59e0b' }}>
              <div className="pp-card-icon">🛠️</div>
              <div className="pp-card-badge" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>TECH STACK</div>
              <div className="pp-card-title" style={{ color: '#f59e0b' }}>기술 스택</div>
              <div className="pp-card-desc">
                <strong style={{ color: '#e2e8f0' }}>Spring Boot, Kafka, MongoDB, JdbcTemplate</strong><br />
                Outbox 패턴, batchUpdate, Consumer Group, Dead Letter Topic 등 적용.
              </div>
            </div>
          </div>
        </div>

        {/* 문제 상황 */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>문제 상황</SectionTitle>
          <div className="pp-problem-grid">
            <div className="pp-problem">
              <div className="pp-problem-title">1. Read Timeout 빈발</div>
              <div className="pp-problem-desc">
                대용량 문서(수백 페이지) 처리 시 동기 방식의 긴 처리 시간으로 인해 <strong style={{ color: '#ef4444' }}>Read Timeout</strong>이 빈번하게 발생.
                사용자는 "처리 중"인지 "오류"인지 알 수 없어 CS 문의 급증.
              </div>
            </div>
            <div className="pp-problem">
              <div className="pp-problem-title">2. 과도한 DB I/O</div>
              <div className="pp-problem-desc">
                문서 1건에서 추출된 <strong style={{ color: '#ef4444' }}>N개 문장을 개별 INSERT</strong>하면서 DB 왕복이 N번 발생.
                5000문장 기준 37초 이상 소요되어 전체 파이프라인 병목.
              </div>
            </div>
            <div className="pp-problem">
              <div className="pp-problem-title">3. 동시 처리 한계</div>
              <div className="pp-problem-desc">
                동기 방식으로 인해 한 요청이 처리되는 동안 <strong style={{ color: '#ef4444' }}>스레드가 블로킹</strong>되어 동시 요청 처리 능력이 제한됨.
                피크 시간대 처리 대기열 급증.
              </div>
            </div>
            <div className="pp-problem">
              <div className="pp-problem-title">4. 단일 장애점(SPOF)</div>
              <div className="pp-problem-desc">
                텍스트 추출, OCR, 문장 분할이 <strong style={{ color: '#ef4444' }}>하나의 프로세스</strong>에서 순차 실행.
                어느 한 단계라도 실패하면 전체 파이프라인을 처음부터 재시작해야 함.
              </div>
            </div>
          </div>
        </div>

        {/* 해결 과정 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>해결 과정</SectionTitle>
          <div className="pp-solution-grid">
            <div className="pp-solution">
              <div className="pp-solution-num" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>STEP 1 - Quick Win</div>
              <div className="pp-solution-title" style={{ color: '#f59e0b' }}>JdbcTemplate batchUpdate()</div>
              <div className="pp-solution-desc">
                N번의 개별 INSERT를 <strong style={{ color: '#e2e8f0' }}>1번의 배치 INSERT</strong>로 통합.
                DB 왕복 횟수를 획기적으로 줄여 즉각적인 성능 개선 달성.
              </div>
              <div style={{ marginTop: '12px' }}>
                <div className="pp-table-wrap">
                  <table className="doc-table">
                    <thead>
                      <tr>
                        <th>문장 수</th>
                        <th style={{ color: '#ef4444' }}>Before</th>
                        <th style={{ color: '#22c55e' }}>After</th>
                        <th>개선율</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ color: '#94a3b8' }}>1,000</td>
                        <td style={{ color: '#ef4444', fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }}>8,890ms</td>
                        <td style={{ color: '#22c55e', fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }}>1,182ms</td>
                        <td style={{ color: '#06b6d4', fontWeight: 700 }}>87%</td>
                      </tr>
                      <tr>
                        <td style={{ color: '#94a3b8' }}>5,000</td>
                        <td style={{ color: '#ef4444', fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }}>37,391ms</td>
                        <td style={{ color: '#22c55e', fontFamily: "'JetBrains Mono',monospace", fontSize: '12px' }}>5,155ms</td>
                        <td style={{ color: '#06b6d4', fontWeight: 700 }}>86%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="pp-solution">
              <div className="pp-solution-num" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>STEP 2 - 아키텍처</div>
              <div className="pp-solution-title" style={{ color: '#3b82f6' }}>Kafka 기반 이벤트 분리</div>
              <div className="pp-solution-desc">
                각 처리 단계를 <strong style={{ color: '#e2e8f0' }}>독립적인 이벤트</strong>로 분리.
                텍스트 추출, OCR, 문장 분할이 각각의 Consumer로 처리되어 장애 격리 및 독립 확장 가능.
                이벤트 로그가 보존되어 실패 시 재처리 가능.
              </div>
            </div>
            <div className="pp-solution">
              <div className="pp-solution-num" style={{ background: 'rgba(168,85,247,0.1)', color: '#a855f7' }}>STEP 3 - 신뢰성</div>
              <div className="pp-solution-title" style={{ color: '#a855f7' }}>Outbox 패턴</div>
              <div className="pp-solution-desc">
                DB 트랜잭션과 이벤트 발행의 <strong style={{ color: '#e2e8f0' }}>원자성을 보장</strong>.
                Outbox 테이블에 이벤트 저장 → Batch 모듈이 폴링하여 Kafka 발행.
                At-least-once delivery 보장으로 메시지 유실 방지.
              </div>
            </div>
            <div className="pp-solution">
              <div className="pp-solution-num" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>STEP 4 - 데이터</div>
              <div className="pp-solution-title" style={{ color: '#22c55e' }}>MongoDB 채택</div>
              <div className="pp-solution-desc">
                Key 기반 문장 조회에 최적화된 <strong style={{ color: '#e2e8f0' }}>NoSQL</strong> 선택.
                문서 단위 저장으로 쓰기 성능 향상, 스키마 유연성 확보, 수평 확장 용이.
              </div>
            </div>
          </div>
        </div>

        {/* 아키텍처 다이어그램 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#ec4899']}>아키텍처 다이어그램</SectionTitle>
          <div className="pp-arch-box">
            <DiagramContainer title="문서 전처리 아키텍처">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <DiagramGroup label="Client" color="#334155">
                  <DiagramNode icon="👤" label="User" sub="문서 업로드" color="#22c55e" />
                </DiagramGroup>
                <DiagramArrow vertical label="문서 업로드" color="#22c55e" />
                <DiagramGroup label="API Module" color="#334155">
                  <DiagramNode icon="🖥️" label="API Server" color="#22c55e" />
                </DiagramGroup>
                <DiagramArrow vertical label="같은 TX" color="#22c55e" />
                <DiagramGroup label="Batch Module" color="#334155">
                  <DiagramNode icon="📋" label="Outbox Table" sub="(Polling)" color="#22c55e" />
                </DiagramGroup>
                <DiagramArrow vertical label="발행" color="#22c55e" />
                <DiagramGroup label="Message Broker" color="#334155">
                  <DiagramNode icon="📨" label="Kafka Topic" color="#22c55e" />
                </DiagramGroup>
                <DiagramArrow vertical label="컨슈밍" color="#22c55e" />
                <DiagramGroup label="Worker Module" color="#334155">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    <DiagramNode icon="⚙️" label="Worker" color="#22c55e" />
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                      <DiagramArrow vertical color="#22c55e" />
                      <DiagramArrow vertical color="#22c55e" />
                      <DiagramArrow vertical color="#22c55e" />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <DiagramNode label="텍스트 추출" sub="(PDF/HWP/DOCS)" color="#22c55e" />
                      <DiagramNode label="OCR" sub="(이미지 → 텍스트)" color="#22c55e" />
                      <DiagramNode label="문장 분할" sub="(NLP 기반)" color="#22c55e" />
                    </div>
                  </div>
                </DiagramGroup>
                <DiagramArrow vertical label="저장" color="#22c55e" />
                <DiagramGroup label="Storage" color="#334155">
                  <DiagramNode icon="🗄️" label="MongoDB" sub="문장 저장" color="#22c55e" />
                </DiagramGroup>
                <DiagramArrow vertical label="처리 완료" color="#22c55e" />
                <DiagramNode icon="📞" label="Callback" sub="처리 완료" color="#22c55e" />
              </div>
            </DiagramContainer>
          </div>

          <HighlightBox color="#a855f7" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#a855f7' }}>핵심 포인트:</strong> API 모듈은 요청 수신과 Outbox 저장만 담당하여 빠르게 응답하고,
            실제 처리는 Worker 모듈이 Kafka를 통해 비동기로 수행합니다.
            각 처리 단계가 독립적이므로, OCR 서비스에 장애가 발생해도 텍스트 추출은 정상 동작합니다.
          </HighlightBox>
        </div>

        {/* Outbox 패턴 흐름 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>Outbox 패턴 동작 흐름</SectionTitle>
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '28px' }}>
            <div className="pp-timeline">
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot" style={{ borderColor: '#3b82f6' }} />
                <div className="pp-timeline-title" style={{ color: '#3b82f6' }}>1. API Server가 요청 수신</div>
                <div className="pp-timeline-desc">클라이언트로부터 문서 전처리 요청을 수신합니다.</div>
              </div>
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot" style={{ borderColor: '#a855f7' }} />
                <div className="pp-timeline-title" style={{ color: '#a855f7' }}>2. 같은 트랜잭션 내에서 Outbox 저장</div>
                <div className="pp-timeline-desc">비즈니스 데이터 저장과 Outbox 테이블에 이벤트 저장을 하나의 DB 트랜잭션으로 처리합니다. 트랜잭션 실패 시 둘 다 롤백됩니다.</div>
              </div>
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot" style={{ borderColor: '#f59e0b' }} />
                <div className="pp-timeline-title" style={{ color: '#f59e0b' }}>3. Batch 모듈이 Outbox 폴링</div>
                <div className="pp-timeline-desc">별도의 Batch 프로세스가 주기적으로 Outbox 테이블을 조회하여 미발행 이벤트를 가져옵니다.</div>
              </div>
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot" style={{ borderColor: '#22c55e' }} />
                <div className="pp-timeline-title" style={{ color: '#22c55e' }}>4. Kafka로 이벤트 발행</div>
                <div className="pp-timeline-desc">Outbox에서 가져온 이벤트를 Kafka Topic으로 발행하고, 발행 성공 시 Outbox 레코드를 처리 완료로 표시합니다.</div>
              </div>
              <div className="pp-timeline-item">
                <div className="pp-timeline-dot" style={{ borderColor: '#06b6d4' }} />
                <div className="pp-timeline-title" style={{ color: '#06b6d4' }}>5. Worker가 이벤트 컨슈밍</div>
                <div className="pp-timeline-desc">Worker 모듈의 Kafka Consumer가 이벤트를 수신하여 실제 문서 전처리(텍스트 추출, OCR, 문장 분할)를 수행합니다.</div>
              </div>
            </div>
          </div>

          <HighlightBox color="#f59e0b" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>At-least-once 보장 원리:</strong> Kafka 발행이 실패하면 Outbox에 이벤트가 남아 있어 다음 폴링에서 재시도됩니다.
            따라서 메시지가 유실되지 않고 최소 1번은 전달됩니다. 단, 중복 전달이 가능하므로 Consumer 측 멱등성 보장이 필요합니다.
          </HighlightBox>
        </div>

        {/* 예상 면접 질문 & 답변 가이드 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>예상 면접 질문 & 답변 가이드</SectionTitle>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={expandAll}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #1a2234',
                background: '#0e1118',
                color: '#94a3b8',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              전체 펼치기
            </button>
            <button
              onClick={collapseAll}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #1a2234',
                background: '#0e1118',
                color: '#94a3b8',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              전체 접기
            </button>
          </div>

          <div className="pp-qa-list">
            {qaItems.map((item, index) => {
              const isOpen = openItems.has(index)
              return (
                <div key={index} className="pp-qa-item">
                  <div className="pp-qa-header" onClick={() => toggleItem(index)}>
                    <span style={{ color: '#06b6d4', fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                      Q{index + 1}.
                    </span>
                    <span className="pp-qa-q">{item.question}</span>
                    <span className={`pp-qa-toggle ${isOpen ? 'open' : ''}`}>&#9662;</span>
                  </div>
                  <div className={`pp-qa-body ${isOpen ? 'open' : ''}`}>
                    {/* 핵심 포인트 */}
                    <div className="pp-qa-section">
                      <div className="pp-qa-section-title" style={{ background: 'rgba(6,182,212,0.1)', color: '#06b6d4' }}>
                        핵심 포인트
                      </div>
                      <div className="pp-qa-section-content">
                        <ul>
                          {item.keyPoints.map((point, pi) => (
                            <li key={pi}><strong style={{ color: '#cbd5e1' }}>{point}</strong></li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 답변 가이드 */}
                    <div className="pp-qa-section">
                      <div className="pp-qa-section-title" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e' }}>
                        답변 가이드
                      </div>
                      <div className="pp-qa-section-content">
                        {item.answerGuide}
                      </div>
                    </div>

                    {/* 주의사항 */}
                    <div className="pp-qa-section">
                      <div className="pp-qa-section-title" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
                        주의사항
                      </div>
                      <div className="pp-qa-warn">
                        {item.caution}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 꼬리 질문 대비 */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>꼬리 질문 대비</SectionTitle>
          <HighlightBox color="#f59e0b" style={{ marginBottom: '16px' }}>
            <strong style={{ color: '#f59e0b' }}>면접관의 꼬리 질문은 "진짜 이해하고 있는가"를 확인하는 과정입니다.</strong><br />
            아래 질문들에 대해 핵심 키워드 중심으로 짧고 명확하게 답변할 수 있도록 준비하세요.
          </HighlightBox>
          <div className="pp-followup-grid">
            <div className="pp-followup" style={{ borderTop: '2px solid #06b6d4' }}>
              <div className="pp-followup-q" style={{ color: '#06b6d4' }}>Outbox 테이블이 계속 커지면 어떻게 관리하나요?</div>
              <div className="pp-followup-hint">
                <strong style={{ color: '#94a3b8' }}>힌트:</strong> 발행 완료된 레코드의 주기적 삭제(Batch Cleanup), 파티셔닝을 통한 아카이빙, 보관 기간 정책 설정.
                CDC 방식을 사용하면 Outbox 테이블 자체가 불필요해질 수 있음.
              </div>
            </div>
            <div className="pp-followup" style={{ borderTop: '2px solid #3b82f6' }}>
              <div className="pp-followup-q" style={{ color: '#3b82f6' }}>Kafka 브로커가 다운되면 어떻게 되나요?</div>
              <div className="pp-followup-hint">
                <strong style={{ color: '#94a3b8' }}>힌트:</strong> Kafka 클러스터는 다중 브로커로 구성되어 하나가 다운되어도 Leader Election을 통해 자동 복구.
                Outbox에 이벤트가 남아 있으므로 Kafka 복구 후 재발행 가능.
              </div>
            </div>
            <div className="pp-followup" style={{ borderTop: '2px solid #a855f7' }}>
              <div className="pp-followup-q" style={{ color: '#a855f7' }}>MongoDB의 Write Concern은 어떻게 설정했나요?</div>
              <div className="pp-followup-hint">
                <strong style={{ color: '#94a3b8' }}>힌트:</strong> w:1(Primary 확인)이 기본이지만, 데이터 안정성이 중요하면 w:majority 사용.
                성능과 안정성의 트레이드오프를 이해하고, 문서 전처리 데이터의 특성에 맞는 선택 근거 설명.
              </div>
            </div>
            <div className="pp-followup" style={{ borderTop: '2px solid #22c55e' }}>
              <div className="pp-followup-q" style={{ color: '#22c55e' }}>batchUpdate와 Bulk Insert의 차이는?</div>
              <div className="pp-followup-hint">
                <strong style={{ color: '#94a3b8' }}>힌트:</strong> JdbcTemplate batchUpdate()는 PreparedStatement를 재사용하여 N개 쿼리를 한 번에 전송.
                DB별 Bulk Insert(MySQL의 INSERT ... VALUES (...), (...))는 단일 SQL로 처리. 각각의 장단점과 적용 상황.
              </div>
            </div>
            <div className="pp-followup" style={{ borderTop: '2px solid #f59e0b' }}>
              <div className="pp-followup-q" style={{ color: '#f59e0b' }}>Consumer Lag이 계속 증가하면 어떻게 대응하나요?</div>
              <div className="pp-followup-hint">
                <strong style={{ color: '#94a3b8' }}>힌트:</strong> Consumer 인스턴스 수평 확장(파티션 수까지), 메시지 처리 로직 최적화, 비효율적인 외부 호출 개선.
                근본적으로는 처리 속도와 유입 속도의 균형을 맞추는 것이 중요.
              </div>
            </div>
            <div className="pp-followup" style={{ borderTop: '2px solid #ec4899' }}>
              <div className="pp-followup-q" style={{ color: '#ec4899' }}>Exactly-once가 아닌 At-least-once를 선택한 이유는?</div>
              <div className="pp-followup-hint">
                <strong style={{ color: '#94a3b8' }}>힌트:</strong> Exactly-once는 트랜잭션 기반으로 성능 오버헤드가 큼.
                문서 전처리는 멱등하게 설계할 수 있으므로 At-least-once + Consumer 멱등성이 더 실용적.
                Upsert를 활용하면 중복 처리해도 결과가 동일.
              </div>
            </div>
          </div>
        </div>

        {/* 핵심 키워드 정리 */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>핵심 키워드 정리</SectionTitle>
          <div className="pp-keyword-grid">
            {[
              { name: 'Outbox Pattern', desc: 'DB 트랜잭션과 메시지 발행의 원자성을 보장하는 패턴. 이벤트를 Outbox 테이블에 저장 후 별도 프로세스가 발행.', color: '#06b6d4' },
              { name: 'At-least-once', desc: '메시지가 최소 1번 전달됨을 보장. 중복 가능하므로 Consumer 멱등성 필요.', color: '#22c55e' },
              { name: 'Idempotency', desc: '같은 연산을 여러 번 수행해도 결과가 동일한 성질. Upsert, 처리 ID 기반 중복 체크 등으로 구현.', color: '#a855f7' },
              { name: 'Consumer Group', desc: 'Kafka Consumer들의 논리적 그룹. 파티션이 그룹 내 Consumer에게 분배되어 수평 확장 가능.', color: '#3b82f6' },
              { name: 'Dead Letter Topic', desc: '처리 실패한 메시지를 격리하는 별도 토픽. 정상 처리를 막지 않으면서 실패 원인 분석 가능.', color: '#ef4444' },
              { name: 'batchUpdate', desc: 'PreparedStatement를 재사용하여 N개 쿼리를 한 번의 네트워크 왕복으로 처리하는 최적화 기법.', color: '#f59e0b' },
              { name: 'Consumer Lag', desc: 'Kafka에서 Producer가 발행한 최신 Offset과 Consumer가 처리한 Offset의 차이. 처리 지연의 핵심 지표.', color: '#ec4899' },
              { name: 'Partition Key', desc: '같은 키의 메시지가 같은 파티션으로 전달되어 순서 보장. 문서 ID를 키로 사용.', color: '#94a3b8' },
              { name: 'CDC (Change Data Capture)', desc: 'DB 변경 로그를 실시간 캡처하여 다른 시스템에 전달. Debezium이 대표적. Outbox 폴링의 대안.', color: '#06b6d4' },
              { name: 'SPOF', desc: 'Single Point of Failure. 시스템의 단일 장애점. 이벤트 기반 분리로 각 컴포넌트를 독립적으로 만들어 해소.', color: '#ef4444' },
              { name: 'Schema Registry', desc: '이벤트 스키마의 버전 관리와 호환성 검증을 담당. 스키마 변경 시 하위 호환성 보장.', color: '#3b82f6' },
              { name: 'Eventual Consistency', desc: '최종 일관성. 일시적 불일치를 허용하되 최종적으로는 일관된 상태를 보장하는 모델.', color: '#f59e0b' },
            ].map((kw) => (
              <div key={kw.name} className="pp-keyword">
                <div className="pp-keyword-name" style={{ color: kw.color }}>{kw.name}</div>
                <div className="pp-keyword-desc">{kw.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 면접 연습 문제 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>면접 연습 문제</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            {
              q: '동기 방식의 문서 전처리에서 발생한 문제점과, 이를 이벤트 기반으로 전환한 이유를 설명해주세요.',
              a: '동기 방식에서는 대용량 문서 처리 시 긴 처리 시간으로 인해 Read Timeout이 빈번했고, 하나의 프로세스에서 텍스트 추출/OCR/문장 분할이 순차 실행되어 어느 한 단계의 실패가 전체 재시작을 요구하는 SPOF 문제가 있었습니다. 이벤트 기반으로 전환하면 각 단계가 독립적으로 동작하여 장애가 격리되고, Kafka의 이벤트 보존으로 실패 시 해당 단계만 재처리할 수 있습니다. 또한 API 서버는 Outbox에 이벤트만 저장하고 빠르게 응답하므로 Read Timeout이 해소되었고, Worker를 수평 확장하여 처리량을 늘릴 수 있게 되었습니다.',
            },
            {
              q: 'Outbox 패턴 없이 직접 Kafka에 발행하면 어떤 문제가 발생하나요?',
              a: 'DB 트랜잭션과 Kafka 발행이 별도의 연산이므로 원자성이 보장되지 않습니다. 1) DB 커밋 성공 후 Kafka 발행 실패 시: 데이터는 저장되었지만 이벤트가 유실되어 후속 처리가 누락됩니다. 2) Kafka 발행 성공 후 DB 커밋 실패 시: 이벤트는 발행되었지만 실제 데이터가 없는 유령 이벤트가 됩니다. Outbox 패턴은 이벤트 저장을 DB 트랜잭션 내에서 수행하므로, 트랜잭션 성공/실패에 따라 이벤트도 함께 커밋/롤백되어 원자성이 보장됩니다.',
            },
            {
              q: 'batchUpdate 최적화만으로 해결하지 않고 아키텍처까지 변경한 이유는?',
              a: 'batchUpdate는 DB I/O 병목만 해결할 뿐, 근본적인 동기 방식의 한계(Read Timeout, SPOF, 동시 처리 한계)는 여전히 남아 있었습니다. 대용량 문서의 OCR 처리는 수십 초가 걸릴 수 있어 batchUpdate만으로는 충분하지 않았고, 하나의 실패가 전체를 중단시키는 구조적 문제도 해결되지 않았습니다. 하지만 batchUpdate를 먼저 배포한 것은 전략적 판단이었습니다. 즉각적으로 장애를 줄여 운영 안정성을 확보한 뒤, 시간이 필요한 아키텍처 변경을 안정적으로 진행할 수 있었습니다.',
            },
            {
              q: 'Kafka의 파티션 수를 늘리면 항상 성능이 좋아지나요?',
              a: '아닙니다. 파티션 수를 늘리면 병렬 처리가 가능한 Consumer 수가 늘어나 처리량이 증가하지만, 단점도 있습니다. 파티션 수가 많으면 브로커의 메모리와 파일 핸들 사용량이 증가하고, Consumer Group 리밸런싱 시간이 길어집니다. 또한 파티션 수는 늘릴 수는 있지만 줄일 수는 없으므로 신중하게 결정해야 합니다. 적절한 파티션 수는 예상 처리량, Consumer 수, 메시지 크기 등을 고려하여 결정해야 합니다.',
            },
          ]} />
        </div>
      </div>
    </>
  )
}

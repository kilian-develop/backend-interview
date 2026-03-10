import { useState } from 'react'
import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const CSS = `
.pm-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.pm-card { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; transition:transform .2s, box-shadow .2s; }
.pm-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.pm-card-icon { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:24px; margin-bottom:14px; }
.pm-card-title { font-size:15px; font-weight:800; margin-bottom:8px; }
.pm-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.pm-card-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.pm-timeline { display:flex; flex-direction:column; gap:0; position:relative; padding-left:28px; }
.pm-timeline::before { content:''; position:absolute; left:10px; top:8px; bottom:8px; width:2px; background:linear-gradient(to bottom, #06b6d4, #3b82f6, #a855f7, #22c55e); border-radius:2px; }
.pm-timeline-item { position:relative; padding:16px 0; }
.pm-timeline-dot { position:absolute; left:-22px; top:20px; width:12px; height:12px; border-radius:50%; border:2px solid; background:#080b11; }
.pm-timeline-content { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:18px; }
.pm-timeline-label { font-size:11px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.pm-timeline-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.pm-qa-list { display:flex; flex-direction:column; gap:12px; }
.pm-qa-item { background:#0e1118; border:1px solid #1a2234; border-radius:14px; overflow:hidden; transition:box-shadow .2s; }
.pm-qa-item:hover { box-shadow:0 4px 20px rgba(6,182,212,0.06); }
.pm-qa-header { display:flex; align-items:center; gap:12px; padding:18px 20px; cursor:pointer; user-select:none; }
.pm-qa-header:hover { background:rgba(255,255,255,0.02); }
.pm-qa-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.pm-qa-question { font-size:14px; font-weight:700; flex:1; line-height:1.6; }
.pm-qa-toggle { flex-shrink:0; font-size:18px; transition:transform .3s; color:#5a6a85; }
.pm-qa-toggle.open { transform:rotate(180deg); }
.pm-qa-body { padding:0 20px 20px; display:none; }
.pm-qa-body.open { display:block; }
.pm-qa-section { margin-bottom:16px; }
.pm-qa-section:last-child { margin-bottom:0; }
.pm-qa-section-title { font-size:12px; font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:6px; }
.pm-qa-section-content { font-size:12px; color:#94a3b8; line-height:1.9; padding:12px 14px; background:rgba(255,255,255,0.02); border-radius:8px; }
.pm-qa-warn { font-size:11px; color:#f59e0b; line-height:1.7; padding:10px 14px; background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.15); border-radius:8px; }
.pm-keyword-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
.pm-keyword { background:#0e1118; border:1px solid #1a2234; border-radius:12px; padding:16px; transition:transform .2s; }
.pm-keyword:hover { transform:translateY(-2px); }
.pm-keyword-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.pm-keyword-desc { font-size:11px; color:#5a6a85; line-height:1.7; }
.pm-followup-grid { display:flex; flex-direction:column; gap:10px; }
.pm-followup-item { display:flex; align-items:flex-start; gap:10px; padding:12px 16px; background:#0e1118; border:1px solid #1a2234; border-radius:10px; font-size:12px; color:#94a3b8; line-height:1.7; }
.pm-followup-icon { flex-shrink:0; font-size:14px; margin-top:1px; }
.pm-followup-q { font-weight:700; margin-bottom:4px; }
.pm-followup-a { color:#5a6a85; }
.pm-arch-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:28px; }
.pm-impact-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); gap:14px; }
.pm-impact-card { padding:20px; border-radius:12px; text-align:center; }
.pm-impact-value { font-size:22px; font-weight:900; font-family:'JetBrains Mono',monospace; margin-bottom:4px; }
.pm-impact-label { font-size:11px; color:#5a6a85; line-height:1.5; }
.pm-problem-card { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; margin-bottom:16px; }
.pm-problem-title { font-size:15px; font-weight:800; margin-bottom:6px; display:flex; align-items:center; gap:8px; }
.pm-problem-desc { font-size:12px; color:#94a3b8; line-height:1.8; margin-bottom:14px; }
.pm-solution-box { padding:14px 16px; border-radius:10px; margin-bottom:10px; }
.pm-solution-title { font-size:12px; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:6px; }
.pm-solution-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
`

interface QAItem {
  question: string
  keyPoints: string[]
  answerGuide: string
  caution: string
  color: string
}

const qaItems: QAItem[] = [
  {
    question: 'Spring Batch를 선택한 이유는?',
    keyPoints: [
      'Chunk 기반 처리로 메모리 효율적 관리',
      '트랜잭션 단위 롤백 및 실패 지점 재시작',
      'Job/Step 실행 이력 자동 기록으로 운영 모니터링 가능',
    ],
    answerGuide: '2억건 이상의 대량 데이터를 이관해야 하는 상황에서, 메모리에 전체를 로드하는 방식은 불가능했습니다. Spring Batch의 Chunk 기반 처리를 활용하면 설정한 크기만큼만 읽어서 처리하고 커밋하기 때문에 메모리를 효율적으로 관리할 수 있었습니다. 또한 실패 시 해당 Chunk부터 재시작할 수 있어 2억건 중 일부에서 장애가 발생해도 처음부터 다시 돌릴 필요가 없었습니다. Job/Step 실행 이력이 자동으로 기록되어 운영 중 진행 상황 모니터링과 문제 추적에도 큰 도움이 되었습니다.',
    caution: '"대량 데이터라서 Batch를 썼다"는 너무 단순한 답변입니다. Chunk 처리의 메모리 효율성, 실패 복구 전략, 운영 모니터링 등 구체적인 이유를 설명해야 합니다.',
    color: '#06b6d4',
  },
  {
    question: 'CDC(Change Data Capture)란 무엇인가요?',
    keyPoints: [
      '데이터베이스 변경 이벤트를 실시간으로 캡처하는 기술',
      'binlog 기반으로 DB 부하 최소화',
      '폴링 방식 대비 실시간성과 효율성 우위',
    ],
    answerGuide: 'CDC는 데이터베이스에서 발생하는 변경(INSERT, UPDATE, DELETE)을 실시간으로 감지하고 캡처하는 기술입니다. MariaDB의 경우 binlog를 읽어서 변경 이벤트를 추출합니다. 기존의 폴링 방식은 주기적으로 SELECT 쿼리를 실행해야 하므로 DB에 부하를 주고 실시간성이 떨어지지만, CDC는 binlog를 읽기만 하므로 운영 DB에 추가적인 쿼리 부하를 주지 않습니다. 이 프로젝트에서는 2억건의 기존 데이터뿐 아니라 마이그레이션 중 신규 유입되는 데이터까지 누락 없이 캡처해야 했기 때문에 CDC를 도입했습니다.',
    caution: 'CDC를 단순히 "데이터 동기화 기술"이라고만 설명하지 마세요. binlog 기반의 동작 원리와 폴링 방식과의 차이를 반드시 언급해야 합니다.',
    color: '#3b82f6',
  },
  {
    question: 'Kafka Connect를 사용한 이유는? 직접 구현과 비교하면?',
    keyPoints: [
      'Debezium Connector로 CDC 파이프라인 구축',
      'offset 자동 관리로 중복/누락 방지',
      'Incremental Snapshot으로 기존 데이터와 신규 데이터를 동시에 처리',
    ],
    answerGuide: 'Kafka Connect + Debezium을 선택한 핵심 이유는 세 가지입니다. 첫째, offset을 Kafka가 자동으로 관리하므로 장애 발생 시에도 정확히 이전 위치부터 재개할 수 있어 데이터 누락이나 중복을 방지합니다. 둘째, Debezium의 Incremental Snapshot 기능으로 2억건의 기존 데이터와 실시간 신규 데이터를 하나의 파이프라인에서 처리할 수 있었습니다. 셋째, 직접 binlog parser를 구현할 경우 binlog 포맷 변경, 커넥션 관리, 장애 복구 등을 모두 직접 구현해야 하는데, Kafka Connect는 이를 이미 검증된 방식으로 제공합니다.',
    caution: '"Kafka Connect가 편리해서 사용했다"는 피해야 합니다. 직접 구현 대비 어떤 장점이 있는지 구체적으로 비교해서 설명하세요.',
    color: '#a855f7',
  },
  {
    question: 'Incremental Snapshot이란?',
    keyPoints: [
      '기존 데이터를 Chunk 단위로 스냅샷 + 실시간 변경 동시 캡처',
      '테이블 락 없이 진행 가능',
      'DB 서비스 중단 없는 초기 데이터 적재',
    ],
    answerGuide: 'Incremental Snapshot은 Debezium에서 제공하는 기능으로, 기존 데이터를 전체 테이블 락 없이 Chunk 단위로 점진적으로 읽어가면서 동시에 실시간 binlog 변경분도 캡처합니다. 일반적인 Initial Snapshot은 전체 테이블 락을 걸거나 트랜잭션 격리를 위해 스냅샷 시작 시점의 일관성을 유지해야 하지만, Incremental Snapshot은 Primary Key 범위를 기준으로 Chunk 단위로 읽으므로 운영 서비스에 영향을 주지 않습니다. 이 프로젝트에서는 2억건을 무중단으로 적재해야 했기 때문에 이 기능이 핵심이었습니다.',
    caution: 'Initial Snapshot과의 차이를 모르면 꼬리 질문에서 막힐 수 있습니다. 테이블 락 유무와 Chunk 기반 처리 방식을 반드시 이해하세요.',
    color: '#22c55e',
  },
  {
    question: 'JavaRx를 사용한 이유는? CompletableFuture와 비교하면?',
    keyPoints: [
      'Schedulers.io로 I/O 바운드에 최적화된 스레드 풀 활용',
      '기존 API 수정 없이 병렬 처리 적용',
      '단건 조회 유지로 응답 크기 예측 가능',
    ],
    answerGuide: '문서 1건당 API 호출 1회가 필요했고, 2억건을 순차적으로 처리하면 I/O 블로킹으로 인해 처리 시간이 과도하게 길어지는 문제가 있었습니다. JavaRx의 Schedulers.io를 사용한 이유는 I/O 바운드 작업에 최적화된 캐시형 스레드 풀을 제공하기 때문입니다. CompletableFuture도 비동기 처리가 가능하지만, 기본적으로 ForkJoinPool.commonPool()을 사용하여 CPU 바운드에 최적화되어 있습니다. 별도의 Executor를 지정할 수도 있지만, JavaRx는 Schedulers.io가 처음부터 I/O 작업을 위해 설계된 스레드 풀이라 의도가 더 명확합니다. 또한 Processor를 제거하고 Writer에서 병렬 처리함으로써 기존 API를 수정하지 않고 적용할 수 있었습니다.',
    caution: '"JavaRx가 비동기라서 사용했다"는 부족합니다. Schedulers.io의 특성과 CompletableFuture 대비 장점을 설명해야 합니다. 벌크 API로 변경하지 않은 이유도 준비하세요.',
    color: '#f59e0b',
  },
  {
    question: 'Schedulers.io의 특징은?',
    keyPoints: [
      '캐시형 스레드 풀 (필요 시 생성, 유휴 시 회수)',
      'I/O 바운드 작업(네트워크, 파일, DB)에 최적화',
      'Schedulers.computation()과의 차이 (CPU 바운드 vs I/O 바운드)',
    ],
    answerGuide: 'Schedulers.io는 RxJava에서 제공하는 I/O 바운드 작업 전용 스케줄러입니다. 내부적으로 캐시형 스레드 풀을 사용하여 필요할 때 스레드를 생성하고, 일정 시간 유휴 상태가 되면 자동으로 회수합니다. 네트워크 호출, 파일 I/O, 데이터베이스 조회 등 대기 시간이 긴 작업에 적합합니다. 반면 Schedulers.computation()은 코어 수만큼의 고정 크기 스레드 풀을 사용하여 CPU 바운드 작업에 적합합니다. 이 프로젝트에서는 외부 API 호출이 주된 작업이었으므로 Schedulers.io가 적합했습니다.',
    caution: 'Schedulers.io의 스레드 풀이 "무한 생성"되는 것은 아닙니다. 캐시 정책이 있고 유휴 스레드를 회수합니다. computation()과의 차이를 명확히 구분하세요.',
    color: '#ec4899',
  },
  {
    question: 'MongoDB 16MB 제한을 어떻게 해결했나요?',
    keyPoints: [
      'BsonMaximumSizeExceededException 발생 원인과 해결',
      'Spring Batch Skip 전략 활용',
      'Skip 시 Chunk 단건 재처리 특성 이용 + GridFS 저장',
    ],
    answerGuide: 'MongoDB는 단일 문서의 최대 크기가 16MB로 제한되어 있어, 일부 대용량 문서에서 BsonMaximumSizeExceededException이 발생했습니다. Spring Batch의 Skip 전략을 활용하여 해결했는데, 핵심은 Skip이 발생하면 해당 Chunk를 단건씩 재처리한다는 특성을 이용한 것입니다. 정상적인 Chunk 처리 중 16MB 초과 문서가 포함되어 있으면 해당 Chunk 전체가 실패하고, Skip 전략에 의해 한 건씩 재시도합니다. 이때 16MB 초과 문서는 GridFS로 저장하도록 예외 처리하여, 정상 문서는 일반 컬렉션에, 대용량 문서는 GridFS에 자동으로 분리 저장됩니다.',
    caution: '트레이드오프를 반드시 언급하세요. Skip 발생 시 해당 Chunk의 정상 데이터도 단건 처리되므로 일시적으로 성능이 저하됩니다. 이를 인지하고 수용한 판단 과정을 설명하면 좋습니다.',
    color: '#ef4444',
  },
  {
    question: 'Spring Batch Skip 전략의 동작 원리는?',
    keyPoints: [
      'Chunk 처리 실패 시 단건 재처리로 전환',
      'SkipPolicy를 통한 Skip 대상 예외 지정',
      '실패한 Item만 건너뛰고 나머지는 정상 처리',
    ],
    answerGuide: 'Spring Batch의 Skip 전략은 Chunk 처리 중 예외가 발생하면 해당 Chunk를 폐기하고, 같은 Chunk의 데이터를 한 건씩 다시 처리합니다. 이때 예외가 발생하는 특정 건만 Skip하고 나머지는 정상적으로 처리합니다. SkipPolicy나 skip() 메서드로 어떤 예외를 Skip할지, 최대 몇 건까지 Skip할지를 설정합니다. 이 프로젝트에서는 BsonMaximumSizeExceededException을 Skip 대상으로 지정하고, Skip된 문서는 GridFS로 저장하는 SkipListener를 구현했습니다. 단, Chunk가 단건 처리로 전환되면 해당 Chunk 내 모든 정상 데이터도 단건으로 처리되어 일시적인 성능 저하가 발생하는 트레이드오프가 있습니다.',
    caution: '"Skip하면 해당 건만 건너뛴다"고만 설명하면 부족합니다. Chunk → 단건 재처리 전환 메커니즘을 이해하고 있어야 꼬리 질문에 대응할 수 있습니다.',
    color: '#f97316',
  },
  {
    question: 'GridFS란 무엇인가요?',
    keyPoints: [
      'MongoDB에서 16MB 이상 파일을 저장하기 위한 스펙',
      '파일을 255KB 청크로 분할하여 저장',
      'fs.files (메타데이터) + fs.chunks (데이터) 컬렉션 구성',
    ],
    answerGuide: 'GridFS는 MongoDB에서 BSON 문서 16MB 제한을 초과하는 대용량 파일을 저장하기 위한 스펙입니다. 파일을 기본 255KB 크기의 청크로 분할하여 fs.chunks 컬렉션에 저장하고, 파일의 메타데이터(이름, 크기, 업로드 일시 등)는 fs.files 컬렉션에 저장합니다. 조회 시 fs.files에서 메타데이터를 찾고 fs.chunks에서 청크를 순서대로 조합하여 원본 파일을 복원합니다. 이 프로젝트에서는 16MB를 초과하는 문장 데이터를 GridFS에 저장함으로써 데이터 손실 없이 마이그레이션을 완료할 수 있었습니다.',
    caution: 'GridFS를 단순히 "파일 저장소"로만 설명하지 마세요. 청크 분할 방식과 컬렉션 구조를 설명해야 합니다. 또한 일반 컬렉션 조회와 성능 차이가 있다는 점도 인지하세요.',
    color: '#8b5cf6',
  },
  {
    question: '무중단 마이그레이션을 위해 어떤 전략을 사용했나요?',
    keyPoints: [
      'CDC로 실시간 변경 감지 → 신규 데이터 누락 방지',
      'Incremental Snapshot으로 테이블 락 없이 기존 데이터 적재',
      'Spring Batch로 단계별 마이그레이션 (읽기→변환→적재)',
    ],
    answerGuide: '무중단 마이그레이션의 핵심은 운영 서비스에 영향을 주지 않으면서 데이터 누락 없이 이관하는 것이었습니다. 첫째, Kafka Connect CDC로 MariaDB binlog를 읽어 실시간 변경분을 캡처함으로써 마이그레이션 중 신규 유입되는 데이터도 누락 없이 처리했습니다. 둘째, Debezium의 Incremental Snapshot을 사용하여 2억건의 기존 데이터를 테이블 락 없이 Chunk 단위로 점진적으로 읽었습니다. 셋째, Spring Batch에서 마이그레이션 전용 테이블에서 읽어 MongoDB로 적재하는 구조로 설계하여, 레거시 DB에 직접적인 부하를 주지 않았습니다. 이 세 가지 조합으로 운영 영향 없이 마이그레이션을 완료했습니다.',
    caution: '"무중단"이라는 단어만 쓰고 끝내지 마세요. 어떤 기술 조합으로 무중단을 달성했는지 단계별로 설명하는 것이 중요합니다.',
    color: '#06b6d4',
  },
  {
    question: '마이그레이션 중 데이터 정합성은 어떻게 보장했나요?',
    keyPoints: [
      'CDC binlog 기반으로 변경 이벤트 순서 보장',
      'Kafka offset 관리로 중복/누락 방지',
      'Spring Batch 트랜잭션으로 원자성 보장',
    ],
    answerGuide: '데이터 정합성은 세 가지 레이어에서 보장했습니다. 첫째, CDC가 binlog를 순서대로 읽으므로 변경 이벤트의 순서가 보장됩니다. 둘째, Kafka Connect가 offset을 자동으로 관리하여 장애 발생 시에도 정확히 이전 위치부터 재개하므로 데이터 누락이나 중복 처리를 방지합니다. 셋째, Spring Batch의 Chunk 단위 트랜잭션으로 원자성을 보장하여, Chunk 내 일부 데이터만 적재되는 상황을 방지했습니다. 추가로 마이그레이션 완료 후 원본 데이터와 이관된 데이터의 건수 및 샘플 데이터를 비교 검증하는 과정도 수행했습니다.',
    caution: '"Kafka가 보장해준다"고만 하면 부족합니다. binlog 순서, offset 관리, Batch 트랜잭션 등 각 레이어별 정합성 보장 방법을 구분해서 설명하세요.',
    color: '#22c55e',
  },
]

export default function PortfolioMigration() {
  const [openQA, setOpenQA] = useState<Set<number>>(new Set())
  useInjectCSS('style-portfolio-migration', CSS)

  const toggleQA = (idx: number) => {
    setOpenQA(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const expandAll = () => setOpenQA(new Set(qaItems.map((_, i) => i)))
  const collapseAll = () => setOpenQA(new Set())

  return (
    <>
      <HeroSection
        tag="Portfolio Migration"
        title={<>데이터 마이그레이션</>}
        description={<>2억건+ 문서 데이터를 MariaDB에서 MongoDB로 무중단 이관한 프로젝트의 면접 대비 가이드</>}
      />

      <div className="doc-content">
        {/* 프로젝트 핵심 요약 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>프로젝트 핵심 요약</SectionTitle>

          {/* 배경 */}
          <div style={{ background: '#0e1118', border: '1px solid #1a2234', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#94a3b8', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              프로젝트 배경
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.9, marginBottom: '16px' }}>
              이전 전처리 서비스의 아키텍처 변경 후, MariaDB에 저장된 <strong style={{ color: '#06b6d4' }}>2억건 이상의 문장 데이터</strong>를 MongoDB로 이관해야 하는 상황이었습니다.
              기존에는 <strong style={{ color: '#f59e0b' }}>MongoDB를 먼저 조회하고, 없으면 MariaDB로 Fallback</strong>하는 이중 조회 구조가 운영되고 있었으며,
              이로 인해 운영 복잡도가 증가하고 장애 포인트가 이중화되어 있었습니다.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '8px' }}>AS-IS (기존)</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8 }}>
                  MongoDB 조회 → 없으면 MariaDB Fallback<br />
                  2개 시스템 동시 운영 / 장애 포인트 이중화<br />
                  배포 복잡도 증가 / 인프라 비용 상승
                </div>
              </div>
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#22c55e', marginBottom: '8px' }}>TO-BE (목표)</div>
                <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.8 }}>
                  MongoDB 단일 조회로 통합<br />
                  프로세스 단일화 / 장애 포인트 단일화<br />
                  레거시 시스템 완전 제거 / 인프라 비용 절감
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 솔루션 카드 */}
          <div className="pm-grid">
            {[
              {
                icon: '🔄',
                title: 'Spring Batch',
                desc: 'Chunk 기반 처리로 메모리 효율적 관리. 트랜잭션 단위 롤백 및 실패 지점 재시작. Job/Step 실행 이력 자동 기록.',
                color: '#06b6d4',
                bgColor: 'rgba(6,182,212,0.1)',
              },
              {
                icon: '📡',
                title: 'Kafka Connect CDC',
                desc: 'binlog 기반 변경 감지로 DB 부하 최소화. Incremental Snapshot으로 무중단 기존 데이터 적재. offset 자동 관리.',
                color: '#3b82f6',
                bgColor: 'rgba(59,130,246,0.1)',
              },
              {
                icon: '⚡',
                title: 'JavaRx Schedulers.io',
                desc: 'I/O 바운드에 최적화된 병렬 처리. 기존 API 수정 없이 적용. 단건 조회 유지로 응답 크기 예측 가능.',
                color: '#a855f7',
                bgColor: 'rgba(168,85,247,0.1)',
              },
              {
                icon: '🛡️',
                title: 'Skip + GridFS',
                desc: 'MongoDB 16MB 초과 문서 자동 분리 저장. Spring Batch Skip 전략 활용. 데이터 손실 없는 예외 처리.',
                color: '#22c55e',
                bgColor: 'rgba(34,197,94,0.1)',
              },
            ].map((item) => (
              <div key={item.title} className="pm-card" style={{ borderTop: `3px solid ${item.color}` }}>
                <div className="pm-card-icon" style={{ background: item.bgColor }}>{item.icon}</div>
                <div className="pm-card-title" style={{ color: item.color }}>{item.title}</div>
                <div className="pm-card-desc">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Impact */}
          <div style={{ marginTop: '20px' }}>
            <div className="pm-impact-grid">
              {[
                { value: '2억건+', label: '무중단 마이그레이션 완료', color: '#06b6d4', bg: 'rgba(6,182,212,0.08)' },
                { value: 'ZERO', label: '운영 서비스 영향', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
                { value: '2 → 1', label: '시스템 단일화', color: '#a855f7', bg: 'rgba(168,85,247,0.08)' },
                { value: '↓ Cost', label: '인프라 비용 절감', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
              ].map((item) => (
                <div key={item.label} className="pm-impact-card" style={{ background: item.bg, border: `1px solid ${item.color}25`, borderRadius: '12px' }}>
                  <div className="pm-impact-value" style={{ color: item.color }}>{item.value}</div>
                  <div className="pm-impact-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 마이그레이션 아키텍처 */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>마이그레이션 아키텍처</SectionTitle>
          <div className="pm-arch-box">
            <div style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.8, marginBottom: '20px' }}>
              전체 데이터 흐름은 <strong style={{ color: '#06b6d4' }}>CDC로 변경 감지</strong> → <strong style={{ color: '#3b82f6' }}>Kafka 메시지 전달</strong> → <strong style={{ color: '#a855f7' }}>마이그레이션 테이블 적재</strong> → <strong style={{ color: '#22c55e' }}>Spring Batch에서 MongoDB로 이관</strong>하는 구조입니다.
            </div>
            <DiagramContainer title="마이그레이션 아키텍처">
              <DiagramFlow>
                <DiagramGroup label="Legacy DB" color="#22c55e">
                  <DiagramNode icon="🗄" label="MariaDB" sub="2억건+" color="#22c55e" />
                </DiagramGroup>
                <DiagramFlow vertical style={{ gap: '4px' }}>
                  <DiagramArrow label="binlog CDC 감지" color="#22c55e" />
                  <DiagramArrow label="Incremental Snapshot" color="#22c55e" dashed />
                </DiagramFlow>
                <DiagramGroup label="CDC Pipeline" color="#3b82f6">
                  <DiagramNode label="Kafka Connect" sub="(Debezium)" color="#3b82f6" />
                </DiagramGroup>
                <DiagramArrow label="메시지 전달" color="#3b82f6" />
                <DiagramGroup label="Message Broker" color="#a855f7">
                  <DiagramNode label="Kafka Topic" color="#a855f7" />
                </DiagramGroup>
                <DiagramArrow color="#a855f7" />
                <DiagramGroup label="Staging" color="#f97316">
                  <DiagramNode label="Migration Table" color="#f97316" />
                </DiagramGroup>
                <DiagramArrow label="Read" color="#f97316" />
                <DiagramGroup label="Spring Batch" color="#06b6d4">
                  <DiagramFlow vertical>
                    <DiagramNode label="Reader" color="#06b6d4" />
                    <DiagramArrow vertical color="#06b6d4" />
                    <DiagramNode label="Writer" sub="(JavaRx 병렬)" color="#06b6d4" />
                  </DiagramFlow>
                </DiagramGroup>
                <DiagramFlow vertical style={{ gap: '4px' }}>
                  <DiagramArrow label="정상 문서" color="#22c55e" />
                  <DiagramArrow label="Skip → 대용량" color="#ef4444" dashed />
                </DiagramFlow>
                <DiagramGroup label="Storage" color="#22c55e">
                  <DiagramFlow vertical>
                    <DiagramNode icon="🗃" label="MongoDB" sub="< 16MB" color="#22c55e" />
                    <DiagramNode icon="📦" label="GridFS" sub=">= 16MB" color="#ef4444" />
                  </DiagramFlow>
                </DiagramGroup>
              </DiagramFlow>
            </DiagramContainer>
          </div>

          {/* 문제와 해결 - 3가지 */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#cbd5e1', marginBottom: '16px' }}>핵심 문제와 해결 과정</div>

            {/* Problem 1 */}
            <div className="pm-problem-card" style={{ borderLeft: '3px solid #3b82f6' }}>
              <div className="pm-problem-title" style={{ color: '#3b82f6' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', padding: '2px 8px', background: 'rgba(59,130,246,0.12)', borderRadius: '4px' }}>Problem 1</span>
                마이그레이션 대상 테이블 적재
              </div>
              <div className="pm-problem-desc">
                2억건 이상의 데이터를 한 번에 조회하면 레거시 DB에 과도한 부하가 걸리고, 운영 서비스 성능이 저하될 수 있었습니다.
                또한 마이그레이션 진행 중에도 신규 데이터가 유입되므로 이를 누락 없이 캡처해야 했습니다.
              </div>
              <div className="pm-solution-box" style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
                <div className="pm-solution-title" style={{ color: '#3b82f6' }}>Solution: Kafka Connect CDC (Debezium)</div>
                <div className="pm-solution-desc">
                  <strong style={{ color: '#e2e8f0' }}>binlog 기반 CDC</strong>로 DB에 추가 쿼리 부하 없이 변경 이벤트를 캡처합니다.
                  <strong style={{ color: '#e2e8f0' }}> Incremental Snapshot</strong>으로 기존 2억건을 테이블 락 없이 Chunk 단위로 적재하고,
                  동시에 실시간 변경분도 캡처하여 데이터 누락을 방지합니다.
                  <strong style={{ color: '#e2e8f0' }}> offset 자동 관리</strong>로 장애 시에도 정확한 위치에서 재개 가능합니다.
                </div>
              </div>
            </div>

            {/* Problem 2 */}
            <div className="pm-problem-card" style={{ borderLeft: '3px solid #a855f7' }}>
              <div className="pm-problem-title" style={{ color: '#a855f7' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', padding: '2px 8px', background: 'rgba(168,85,247,0.12)', borderRadius: '4px' }}>Problem 2</span>
                과도한 I/O Blocking
              </div>
              <div className="pm-problem-desc">
                문서 1건당 API 호출 1회가 필요했고, 2억건을 동기적으로 순차 처리하면 스레드 블로킹으로 인해 처리 속도가 극도로 저하됩니다.
              </div>
              <div className="pm-solution-box" style={{ background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)' }}>
                <div className="pm-solution-title" style={{ color: '#a855f7' }}>Solution: Writer에서 JavaRx Schedulers.io 병렬 조회</div>
                <div className="pm-solution-desc">
                  Processor를 제거하고 Writer에서 <strong style={{ color: '#e2e8f0' }}>JavaRx Schedulers.io</strong>로 병렬 API 호출을 수행합니다.
                  <strong style={{ color: '#e2e8f0' }}> 단건 조회를 유지</strong>하여 응답 크기를 예측 가능하게 하고 네트워크 안정성을 확보합니다.
                  I/O 바운드에 최적화된 캐시형 스레드 풀을 활용하여 <strong style={{ color: '#e2e8f0' }}>기존 API 수정 없이</strong> 처리 속도를 개선했습니다.
                </div>
              </div>
            </div>

            {/* Problem 3 */}
            <div className="pm-problem-card" style={{ borderLeft: '3px solid #ef4444' }}>
              <div className="pm-problem-title" style={{ color: '#ef4444' }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', padding: '2px 8px', background: 'rgba(239,68,68,0.12)', borderRadius: '4px' }}>Problem 3</span>
                MongoDB 16MB 문서 크기 제한
              </div>
              <div className="pm-problem-desc">
                일부 문서가 MongoDB의 단일 문서 최대 크기(16MB)를 초과하여 <strong style={{ color: '#ef4444' }}>BsonMaximumSizeExceededException</strong>이 발생했습니다.
              </div>
              <div className="pm-solution-box" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
                <div className="pm-solution-title" style={{ color: '#ef4444' }}>Solution: Spring Batch Skip 전략 + GridFS</div>
                <div className="pm-solution-desc">
                  Skip 발생 시 <strong style={{ color: '#e2e8f0' }}>Chunk를 단건씩 재처리</strong>하는 Spring Batch의 특성을 활용합니다.
                  16MB 초과 문서는 <strong style={{ color: '#e2e8f0' }}>GridFS로 자동 분리 저장</strong>하여 데이터 손실 없이 처리합니다.
                  트레이드오프로 문제 Chunk의 정상 데이터도 일시적으로 단건 처리되지만, 전체 마이그레이션 대비 영향은 미미합니다.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 예상 면접 질문 & 답변 가이드 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>예상 면접 질문 & 답변 가이드</SectionTitle>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <button
              onClick={expandAll}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.25)',
                color: '#06b6d4', cursor: 'pointer', transition: 'background .2s',
              }}
            >
              전체 펼치기
            </button>
            <button
              onClick={collapseAll}
              style={{
                padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
                background: 'rgba(94,113,141,0.1)', border: '1px solid rgba(94,113,141,0.25)',
                color: '#5a6a85', cursor: 'pointer', transition: 'background .2s',
              }}
            >
              전체 접기
            </button>
          </div>

          <div className="pm-qa-list">
            {qaItems.map((item, idx) => {
              const isOpen = openQA.has(idx)
              return (
                <div key={idx} className="pm-qa-item" style={isOpen ? { borderColor: `${item.color}40` } : undefined}>
                  <div className="pm-qa-header" onClick={() => toggleQA(idx)}>
                    <div className="pm-qa-num" style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="pm-qa-question" style={{ color: isOpen ? item.color : '#cbd5e1' }}>
                      {item.question}
                    </div>
                    <div className={`pm-qa-toggle ${isOpen ? 'open' : ''}`}>
                      ▼
                    </div>
                  </div>
                  <div className={`pm-qa-body ${isOpen ? 'open' : ''}`}>
                    {/* 핵심 포인트 */}
                    <div className="pm-qa-section">
                      <div className="pm-qa-section-title" style={{ color: item.color }}>
                        <span>●</span> 핵심 포인트
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {item.keyPoints.map((point, pi) => (
                          <div key={pi} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '8px',
                            padding: '8px 12px', background: `${item.color}08`, border: `1px solid ${item.color}15`,
                            borderRadius: '8px', fontSize: '12px', color: '#94a3b8', lineHeight: 1.7,
                          }}>
                            <span style={{ color: item.color, flexShrink: 0, fontWeight: 700 }}>-</span>
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 답변 가이드 */}
                    <div className="pm-qa-section">
                      <div className="pm-qa-section-title" style={{ color: '#22c55e' }}>
                        <span>●</span> 답변 가이드
                      </div>
                      <div className="pm-qa-section-content">
                        {item.answerGuide}
                      </div>
                    </div>

                    {/* 주의사항 */}
                    <div className="pm-qa-section">
                      <div className="pm-qa-section-title" style={{ color: '#f59e0b' }}>
                        <span>●</span> 주의사항
                      </div>
                      <div className="pm-qa-warn">
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
            <strong style={{ color: '#f59e0b' }}>면접 팁:</strong> 포트폴리오 프로젝트에서는 초기 질문보다 <strong style={{ color: '#e2e8f0' }}>꼬리 질문</strong>에서 합/불이 갈립니다.
            각 기술을 "왜 선택했는지", "대안은 무엇이었는지", "트레이드오프는 무엇인지"를 반드시 준비하세요.
          </HighlightBox>

          <div className="pm-followup-grid">
            {[
              {
                q: '왜 벌크 API로 변경하지 않고 단건 조회를 유지했나요?',
                a: '벌크 API로 변경하면 기존 운영 중인 API의 수정이 필요하고, 대량 응답으로 인한 네트워크 불안정성과 메모리 이슈가 발생할 수 있습니다. 단건 조회를 유지하면 응답 크기를 예측할 수 있고 기존 API를 그대로 활용 가능합니다.',
                color: '#a855f7',
              },
              {
                q: 'CDC가 아닌 Dual Write 패턴은 고려하지 않았나요?',
                a: 'Dual Write는 애플리케이션 코드에서 MariaDB와 Kafka 양쪽에 동시 쓰기를 해야 하므로 트랜잭션 일관성 보장이 어렵습니다. 한쪽 쓰기가 실패했을 때의 보상 트랜잭션 처리가 복잡하고, 기존 코드 변경 범위도 넓어집니다.',
                color: '#3b82f6',
              },
              {
                q: 'Skip 전략 외에 16MB 문제를 해결하는 다른 방법은 없었나요?',
                a: '사전에 데이터 크기를 계산하여 분리하는 방법도 있지만, Reader 단계에서 모든 문서의 크기를 미리 확인하는 것은 추가적인 I/O 비용이 발생합니다. Skip 전략은 예외가 발생한 경우에만 대응하므로 정상 흐름에 영향을 주지 않는 장점이 있습니다.',
                color: '#ef4444',
              },
              {
                q: '마이그레이션 완료 후 레거시 시스템은 바로 제거했나요?',
                a: '즉시 제거하지 않고 일정 기간 Fallback 경로를 유지했습니다. MongoDB에서 조회 실패 시 MariaDB로 Fallback하는 기존 로직을 유지하면서, 모니터링을 통해 Fallback 발생 빈도가 0에 수렴하는 것을 확인한 후 레거시 시스템을 제거했습니다.',
                color: '#22c55e',
              },
              {
                q: 'Chunk 크기는 어떻게 결정했나요?',
                a: 'Chunk 크기가 너무 작으면 트랜잭션 오버헤드가 증가하고, 너무 크면 실패 시 재처리 비용이 커집니다. API 호출 응답 시간, Writer의 병렬 처리 용량, 트랜잭션 타임아웃 등을 고려하여 부하 테스트를 통해 최적값을 결정했습니다.',
                color: '#06b6d4',
              },
              {
                q: 'binlog 기반 CDC의 단점은 무엇인가요?',
                a: 'binlog 포맷이 STATEMENT일 경우 정확한 데이터 캡처가 어려워 ROW 포맷이어야 합니다. binlog가 과도하게 커질 수 있고, DB 서버의 디스크 I/O에 간접적인 영향을 줄 수 있습니다. 또한 DDL 변경 시 Debezium의 스키마 변경 처리가 필요합니다.',
                color: '#f59e0b',
              },
              {
                q: 'JavaRx의 에러 핸들링은 어떻게 처리했나요?',
                a: 'RxJava의 onErrorResumeNext 또는 retry 연산자를 활용하여 일시적인 네트워크 오류에 대한 재시도를 구현했습니다. 재시도 횟수를 초과하면 해당 건을 별도 에러 큐에 적재하여 나중에 수동으로 재처리할 수 있도록 했습니다.',
                color: '#a855f7',
              },
            ].map((item, idx) => (
              <div key={idx} className="pm-followup-item" style={{ borderLeft: `3px solid ${item.color}` }}>
                <div>
                  <div className="pm-followup-q" style={{ color: item.color }}>Q. {item.q}</div>
                  <div className="pm-followup-a">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 핵심 키워드 정리 */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#ec4899']}>핵심 키워드 정리</SectionTitle>
          <div className="pm-keyword-grid">
            {[
              { name: 'Spring Batch', desc: '대량 데이터 배치 처리 프레임워크. Chunk 기반 처리, 재시작, 실행 이력 관리.', color: '#06b6d4' },
              { name: 'CDC', desc: 'Change Data Capture. DB 변경을 실시간 캡처. binlog 기반으로 추가 부하 없이 동작.', color: '#3b82f6' },
              { name: 'Kafka Connect', desc: 'Kafka와 외부 시스템을 연결하는 프레임워크. Source/Sink Connector 제공.', color: '#22c55e' },
              { name: 'Debezium', desc: 'CDC 전용 Kafka Connect Source Connector. MySQL, PostgreSQL 등 지원.', color: '#a855f7' },
              { name: 'Incremental Snapshot', desc: '테이블 락 없이 Chunk 단위로 기존 데이터를 스냅샷. binlog 변경분과 동시 처리.', color: '#f59e0b' },
              { name: 'Schedulers.io', desc: 'RxJava I/O 바운드 전용 스케줄러. 캐시형 스레드 풀. 네트워크/파일 I/O에 최적화.', color: '#ec4899' },
              { name: 'GridFS', desc: 'MongoDB 대용량 파일 저장 스펙. 255KB 청크 분할. fs.files + fs.chunks 구성.', color: '#ef4444' },
              { name: 'Skip 전략', desc: 'Spring Batch 실패 건 Skip. Chunk → 단건 재처리 전환. SkipPolicy로 제어.', color: '#f97316' },
              { name: 'Chunk 처리', desc: 'Spring Batch의 데이터 처리 단위. 설정된 크기만큼 읽고 한 번에 쓰기. 트랜잭션 단위.', color: '#8b5cf6' },
              { name: 'binlog', desc: 'MySQL/MariaDB의 바이너리 로그. 모든 데이터 변경을 기록. 복제와 CDC에 활용.', color: '#06b6d4' },
              { name: 'offset 관리', desc: 'Kafka Connect가 처리 위치를 자동 추적. 장애 시 정확한 재개 지점 보장.', color: '#3b82f6' },
              { name: 'BSON', desc: 'Binary JSON. MongoDB의 문서 저장 형식. 단일 문서 최대 16MB 제한.', color: '#22c55e' },
            ].map((kw) => (
              <div key={kw.name} className="pm-keyword" style={{ borderTop: `2px solid ${kw.color}` }}>
                <div className="pm-keyword-name" style={{ color: kw.color }}>{kw.name}</div>
                <div className="pm-keyword-desc">{kw.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 면접 질문 (기존 컴포넌트) */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>빠르게 복습하는 핵심 Q&A</SectionTitle>
          <InterviewQuestions color="#06b6d4" items={[
            {
              q: '왜 MariaDB에서 MongoDB로 마이그레이션해야 했나요?',
              a: '전처리 서비스 아키텍처 변경으로 MongoDB가 주 저장소가 되었지만, 기존 2억건의 데이터가 MariaDB에 남아 있어 이중 조회(MongoDB → MariaDB Fallback) 구조가 유지되고 있었습니다. 이로 인한 운영 복잡도, 장애 포인트 이중화, 인프라 비용 증가를 해결하기 위해 데이터를 MongoDB로 완전 이관하고 레거시 시스템을 제거하는 마이그레이션이 필요했습니다.',
            },
            {
              q: 'Spring Batch에서 Processor를 제거하고 Writer에서 API 호출을 한 이유는?',
              a: 'Processor에서 단건씩 동기적으로 API를 호출하면 I/O 블로킹으로 처리 속도가 극도로 저하됩니다. Writer에서 JavaRx Schedulers.io를 활용하여 Chunk 단위의 데이터를 병렬로 API 호출하면, I/O 대기 시간을 스레드 간 공유하여 처리 효율을 크게 높일 수 있습니다. Spring Batch의 Processor는 단건 처리가 기본이지만, Writer는 Chunk 단위 리스트를 받으므로 병렬 처리에 적합합니다.',
            },
            {
              q: 'CDC를 사용하지 않았다면 어떤 방법이 있었나요?',
              a: '대안으로 주기적 폴링(SELECT 쿼리), Dual Write, 애플리케이션 레벨 이벤트 발행 등이 있었습니다. 폴링은 DB 부하가 크고 실시간성이 떨어지며, Dual Write는 트랜잭션 일관성 보장이 어렵고 코드 변경 범위가 넓습니다. CDC는 binlog를 읽기만 하므로 DB에 추가 부하 없이 실시간 변경 감지가 가능하여 가장 적합했습니다.',
            },
            {
              q: 'Skip 전략의 트레이드오프는 무엇인가요?',
              a: 'Skip이 발생하면 해당 Chunk 전체가 폐기되고 한 건씩 재처리됩니다. 이때 16MB 초과 문서뿐 아니라 같은 Chunk에 있던 정상 데이터도 단건 처리되어 일시적으로 성능이 저하됩니다. 하지만 16MB를 초과하는 문서의 비율이 전체 대비 매우 낮았기 때문에, 이 트레이드오프를 수용하고 구현 복잡도를 낮추는 것이 더 합리적인 판단이었습니다.',
            },
            {
              q: '이 프로젝트에서 가장 어려웠던 점과 배운 점은?',
              a: '가장 어려웠던 점은 무중단이라는 제약 조건 하에서 데이터 정합성을 보장하는 것이었습니다. CDC, Kafka offset, Spring Batch 트랜잭션 등 여러 레이어에서의 정합성 보장 전략을 설계하고 검증하는 과정이 복잡했습니다. 배운 점은 대량 데이터 처리에서 하나의 기술로 모든 문제를 해결할 수 없으며, 각 문제에 적합한 기술을 조합하고 트레이드오프를 인지한 상태에서 의사결정하는 것이 중요하다는 것입니다.',
            },
          ]} />
        </div>

        {/* 한눈에 비교 테이블 */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#3b82f6']}>기술 선택 근거 요약</SectionTitle>
          <div style={{ overflowX: 'auto', borderRadius: '14px', border: '1px solid #1a2234' }}>
            <table className="doc-table">
              <thead>
                <tr>
                  <th style={{ width: '18%' }}>문제</th>
                  <th style={{ width: '22%' }}>선택한 기술</th>
                  <th style={{ width: '25%' }}>선택 이유</th>
                  <th>대안 및 비교</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['대량 데이터 적재', 'Kafka Connect CDC', 'binlog 기반, DB 부하 없음, offset 자동 관리', '폴링: DB 부하 큼 / Dual Write: 코드 변경 범위 넓음', '#3b82f6'],
                  ['배치 처리', 'Spring Batch', 'Chunk 처리, 재시작, 운영 모니터링', '직접 구현: 실패 복구/모니터링 직접 개발 필요', '#06b6d4'],
                  ['I/O 블로킹', 'JavaRx Schedulers.io', 'I/O 최적화 스레드 풀, API 미수정', 'CompletableFuture: CPU 바운드 기본 풀', '#a855f7'],
                  ['16MB 제한', 'Skip + GridFS', '정상 흐름 영향 없음, 자동 분리', '사전 크기 계산: 추가 I/O 비용 발생', '#ef4444'],
                ].map(([problem, tech, reason, compare, color]) => (
                  <tr key={problem}>
                    <td style={{ color: '#cbd5e1', fontWeight: 600, fontSize: '12px' }}>{problem}</td>
                    <td style={{ color: color as string, fontWeight: 700, fontSize: '12px', fontFamily: "'JetBrains Mono',monospace" }}>{tech}</td>
                    <td style={{ color: '#94a3b8', fontSize: '12px' }}>{reason}</td>
                    <td style={{ color: '#5a6a85', fontSize: '12px' }}>{compare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <HighlightBox color="#06b6d4" style={{ marginTop: '16px' }}>
            <strong style={{ color: '#06b6d4' }}>면접 핵심 메시지:</strong> 이 프로젝트는 단순히 "데이터를 옮겼다"가 아니라,
            <strong style={{ color: '#e2e8f0' }}> 운영 영향 없이(무중단)</strong>,
            <strong style={{ color: '#e2e8f0' }}> 데이터 누락 없이(CDC + offset)</strong>,
            <strong style={{ color: '#e2e8f0' }}> 효율적으로(JavaRx 병렬 처리)</strong>,
            <strong style={{ color: '#e2e8f0' }}> 예외까지 대응하며(Skip + GridFS)</strong> 마이그레이션을 완료한 경험입니다.
            각 기술 선택의 이유와 트레이드오프를 명확히 설명할 수 있어야 합니다.
          </HighlightBox>
        </div>
      </div>
    </>
  )
}

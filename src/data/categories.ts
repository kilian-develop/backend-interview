export interface SubTab {
  id: string
  label: string
}

export interface TabGroup {
  label: string
  tabs: SubTab[]
}

export interface Topic {
  slug: string
  icon: string
  tag: string
  title: string
  desc: string
  tabGroups: TabGroup[]
}

export interface Category {
  id: string
  label: string
  title: string
  color: string
  glow: string
  dim: string
  topics: Topic[]
}

export const CATEGORIES: Category[] = [
  {
    id: 'network',
    label: 'Network',
    title: '네트워크',
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.22)',
    dim: 'rgba(59,130,246,0.08)',
    topics: [
      {
        slug: 'network',
        icon: '🌐',
        tag: 'Network · HTTP · TCP · DNS',
        title: '네트워크',
        desc: 'HTTP 버전, HTTPS, 요청-응답 흐름, RESTful API, TCP/UDP, Handshake, DNS까지',
        tabGroups: [
          {
            label: 'HTTP',
            tabs: [
              { id: 'http-overview', label: 'HTTP란?' },
              { id: 'http-versions', label: 'HTTP 버전' },
              { id: 'http-vs-https', label: 'HTTP vs HTTPS' },
              { id: 'http-request-response', label: '요청-응답' },
              { id: 'restful-api', label: 'RESTful API' },
              { id: 'grpc-protobuf', label: 'gRPC & Protobuf' },
            ],
          },
          {
            label: 'TCP/IP',
            tabs: [
              { id: 'tcp-vs-udp', label: 'TCP vs UDP' },
              { id: 'tcp-handshake', label: 'Handshake' },
              { id: 'dns', label: 'DNS' },
              { id: 'network-layer-model', label: 'OSI / TCP/IP 계층' },
              { id: 'nat-ip', label: 'NAT & IP' },
            ],
          },
          {
            label: 'Infra',
            tabs: [
              { id: 'websocket-realtime', label: 'WebSocket' },
              { id: 'proxy-cdn', label: 'Proxy & CDN' },
              { id: 'api-gateway', label: 'API Gateway' },
              { id: 'load-balancing', label: '로드밸런싱' },
              { id: 'network-io-model', label: 'I/O 모델' },
              { id: 'service-mesh', label: 'Service Mesh' },
              { id: 'connection-pool', label: 'Connection Pool' },
              { id: 'circuit-breaker-retry', label: 'CB & Retry' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'security',
    label: 'Security',
    title: '보안 & 인증',
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.22)',
    dim: 'rgba(168,85,247,0.08)',
    topics: [
      {
        slug: 'security',
        icon: '🔒',
        tag: 'Auth · JWT · Session · CORS',
        title: '보안 & 인증',
        desc: 'JWT 구조와 인증 흐름, Session vs JWT 저장 전략, CORS 정책과 Preflight 요청',
        tabGroups: [
          {
            label: 'Security',
            tabs: [
              { id: 'jwt-deep-dive', label: 'JWT' },
              { id: 'session-jwt-storage', label: 'Session vs JWT 저장' },
              { id: 'cors-deep-dive', label: 'CORS 심화' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kafka',
    label: 'Kafka',
    title: 'Apache Kafka',
    color: '#f97316',
    glow: 'rgba(249,115,22,0.22)',
    dim: 'rgba(249,115,22,0.08)',
    topics: [
      {
        slug: 'kafka',
        icon: '⚡',
        tag: 'Kafka · Producer · Consumer · Partition',
        title: 'Apache Kafka',
        desc: 'Kafka 아키텍처, Partition & Replication, 전달 보장, Consumer Group, Connect & CDC',
        tabGroups: [
          {
            label: 'Kafka',
            tabs: [
              { id: 'kafka-overview', label: 'Kafka 개요' },
              { id: 'kafka-producer-consumer', label: 'Producer & Consumer' },
              { id: 'kafka-delivery-patterns', label: '전달 보장 & 패턴' },
              { id: 'kafka-connect-ops', label: 'Connect & 운영' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    title: '데이터베이스',
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.22)',
    dim: 'rgba(6,182,212,0.08)',
    topics: [
      {
        slug: 'database',
        icon: '🗄️',
        tag: 'RDBMS · SQL · Index · Transaction',
        title: '데이터베이스',
        desc: 'RDBMS 핵심 개념, 인덱스, 트랜잭션, 정규화, 쿼리 최적화, 락과 동시성 제어',
        tabGroups: [
          {
            label: '기본 개념',
            tabs: [
              { id: 'rdbms-overview', label: 'RDBMS 개요' },
              { id: 'index-deep-dive', label: '인덱스 심화' },
              { id: 'transaction-deep-dive', label: '트랜잭션 심화' },
              { id: 'lock-concurrency', label: '락 & 동시성 제어' },
              { id: 'sql-query-optimization', label: 'SQL 쿼리 최적화' },
              { id: 'db-replication-sharding', label: '레플리케이션 & 샤딩' },
              { id: 'connection-pool-tuning', label: '커넥션 풀 & DB 튜닝' },
              { id: 'paging-bulk-data', label: '페이징 & 대량 데이터' },
              { id: 'db-migration-schema', label: 'DB 마이그레이션' },
              { id: 'query-plan-optimizer', label: '실행 계획 & 옵티마이저' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'portfolio',
    label: 'Portfolio',
    title: '포트폴리오 면접',
    color: '#22c55e',
    glow: 'rgba(34,197,94,0.22)',
    dim: 'rgba(34,197,94,0.08)',
    topics: [
      {
        slug: 'portfolio',
        icon: '💼',
        tag: 'Portfolio · Kafka · Batch · Migration',
        title: '포트폴리오 면접 준비',
        desc: '문서 전처리 서비스, 2억건+ 데이터 마이그레이션 프로젝트 기반 예상 질문과 답변 가이드',
        tabGroups: [
          {
            label: '프로젝트',
            tabs: [
              { id: 'preprocessing', label: '문서 전처리 서비스' },
              { id: 'migration', label: '데이터 마이그레이션' },
            ],
          },
        ],
      },
    ],
  },
]

export const ALL_TOPICS = CATEGORIES.flatMap((cat) =>
  cat.topics.map((topic) => ({
    ...topic,
    categoryId: cat.id,
    categoryTitle: cat.title,
    categoryColor: cat.color,
  })),
)

export interface FlatTab {
  tabId: string
  label: string
  topicSlug: string
  topicTitle: string
  categoryId: string
  categoryColor: string
}

export const ALL_TABS: FlatTab[] = CATEGORIES.flatMap((cat) =>
  cat.topics.flatMap((topic) =>
    topic.tabGroups.flatMap((group) =>
      group.tabs.map((tab) => ({
        tabId: tab.id,
        label: tab.label,
        topicSlug: topic.slug,
        topicTitle: topic.title,
        categoryId: cat.id,
        categoryColor: cat.color,
      })),
    ),
  ),
)

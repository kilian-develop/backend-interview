export interface Topic {
  slug: string
  icon: string
  tag: string
  title: string
  desc: string
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

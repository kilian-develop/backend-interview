/**
 * slug → 페이지 컴포넌트 동적 import 매핑.
 * TopicCard 호버 시 호출하여 해당 페이지 청크를 미리 로드합니다.
 * React.lazy와 동일한 import()를 사용하므로, 브라우저 캐시에 의해
 * 실제 네비게이션 시 즉시 로드됩니다.
 */
const PAGE_IMPORTS: Record<string, () => Promise<unknown>> = {
  network: () => import('../pages/docs/NetworkPage'),
  security: () => import('../pages/docs/SecurityPage'),
  kafka: () => import('../pages/docs/KafkaPage'),
  portfolio: () => import('../pages/docs/PortfolioPage'),
  database: () => import('../pages/docs/DatabasePage'),
  elasticsearch: () => import('../pages/docs/ElasticsearchPage'),
}

const prefetched = new Set<string>()

export function prefetchPage(slug: string) {
  if (prefetched.has(slug)) return
  prefetched.add(slug)

  const loader = PAGE_IMPORTS[slug]
  if (loader) loader()
}

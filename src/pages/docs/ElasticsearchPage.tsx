import { lazy } from 'react'
import {
  Search, Database, FileSearch, BarChart3, ScanLine, FolderCog,
  Layers, TrendingUp, Server, Gauge, Leaf,
  MonitorDot, GitBranch, Brain, Settings,
} from 'lucide-react'
import TabPage from '../../components/TabPage'

const I = 14

const sections = {
  'es-setup': lazy(() => import('./es/00-setup')),
  'es-what-is': lazy(() => import('./es/01-what-is-elasticsearch')),
  'es-crud-mapping': lazy(() => import('./es/02-crud-and-mapping')),
  'es-search-queries': lazy(() => import('./es/03-search-queries')),
  'es-aggregation': lazy(() => import('./es/04-aggregation')),
  'es-analyzer': lazy(() => import('./es/05-analyzer')),
  'es-index-management': lazy(() => import('./es/06-index-management')),
  'es-advanced-queries': lazy(() => import('./es/07-advanced-queries')),
  'es-pipeline-agg': lazy(() => import('./es/08-pipeline-agg')),
  'es-cluster': lazy(() => import('./es/09-cluster')),
  'es-performance': lazy(() => import('./es/10-performance')),
  'es-spring-data': lazy(() => import('./es/11-spring-data-es')),
  'es-elk-stack': lazy(() => import('./es/12-elk-stack')),
  'es-search-architecture': lazy(() => import('./es/13-search-architecture')),
  'es-vector-search': lazy(() => import('./es/14-vector-search')),
}

const tabGroups = [
  {
    label: '시작하기',
    tabs: [
      { id: 'es-setup', label: '학습환경 세팅', icon: <Settings size={I} /> },
    ],
  },
  {
    label: '입문',
    tabs: [
      { id: 'es-what-is', label: 'Elasticsearch란?', icon: <Search size={I} /> },
      { id: 'es-crud-mapping', label: 'CRUD와 매핑', icon: <Database size={I} /> },
      { id: 'es-search-queries', label: '검색 쿼리', icon: <FileSearch size={I} /> },
    ],
  },
  {
    label: '초급',
    tabs: [
      { id: 'es-aggregation', label: '집계', icon: <BarChart3 size={I} /> },
      { id: 'es-analyzer', label: '분석기 심화', icon: <ScanLine size={I} /> },
      { id: 'es-index-management', label: '인덱스 관리', icon: <FolderCog size={I} /> },
    ],
  },
  {
    label: '중급',
    tabs: [
      { id: 'es-advanced-queries', label: '복합 쿼리', icon: <Layers size={I} /> },
      { id: 'es-pipeline-agg', label: 'Pipeline Aggregation', icon: <TrendingUp size={I} /> },
    ],
  },
  {
    label: '고급',
    tabs: [
      { id: 'es-cluster', label: '클러스터 아키텍처', icon: <Server size={I} /> },
      { id: 'es-performance', label: '성능 튜닝', icon: <Gauge size={I} /> },
      { id: 'es-spring-data', label: 'Spring Data ES', icon: <Leaf size={I} /> },
    ],
  },
  {
    label: '심화',
    tabs: [
      { id: 'es-elk-stack', label: 'ELK Stack', icon: <MonitorDot size={I} /> },
      { id: 'es-search-architecture', label: '검색 서비스 아키텍처', icon: <GitBranch size={I} /> },
      { id: 'es-vector-search', label: 'Vector Search', icon: <Brain size={I} /> },
    ],
  },
]

export default function ElasticsearchPage() {
  return (
    <TabPage
      slug="elasticsearch"
      accentColor="#f0c040"
      sections={sections}
      tabGroups={tabGroups}
      defaultTab="es-setup"
    />
  )
}

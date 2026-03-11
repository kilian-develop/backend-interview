import { lazy } from 'react'
import { Database, Search, GitBranch, Lock, Gauge, Copy, Plug } from 'lucide-react'
import TabPage from '../../components/TabPage'

const I = 14

const sections = {
  'rdbms-overview': lazy(() => import('./RdbmsOverview')),
  'index-deep-dive': lazy(() => import('./IndexDeepDive')),
  'transaction-deep-dive': lazy(() => import('./TransactionDeepDive')),
  'lock-concurrency': lazy(() => import('./LockConcurrency')),
  'sql-query-optimization': lazy(() => import('./SqlQueryOptimization')),
  'db-replication-sharding': lazy(() => import('./DbReplicationSharding')),
  'connection-pool-tuning': lazy(() => import('./ConnectionPoolTuning')),
}

const tabGroups = [
  {
    label: '기본 개념',
    tabs: [
      { id: 'rdbms-overview', label: 'RDBMS 개요', icon: <Database size={I} /> },
      { id: 'index-deep-dive', label: '인덱스 심화', icon: <Search size={I} /> },
      { id: 'transaction-deep-dive', label: '트랜잭션 심화', icon: <GitBranch size={I} /> },
      { id: 'lock-concurrency', label: '락 & 동시성 제어', icon: <Lock size={I} /> },
      { id: 'sql-query-optimization', label: 'SQL 쿼리 최적화', icon: <Gauge size={I} /> },
      { id: 'db-replication-sharding', label: '레플리케이션 & 샤딩', icon: <Copy size={I} /> },
      { id: 'connection-pool-tuning', label: '커넥션 풀 & DB 튜닝', icon: <Plug size={I} /> },
    ],
  },
]

export default function DatabasePage() {
  return (
    <TabPage
      slug="database"
      accentColor="#06b6d4"
      sections={sections}
      tabGroups={tabGroups}
      defaultTab="rdbms-overview"
    />
  )
}

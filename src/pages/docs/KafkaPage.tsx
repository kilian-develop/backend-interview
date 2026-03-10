import { lazy } from 'react'
import { Radio, RefreshCw, Target, Settings } from 'lucide-react'
import TabPage from '../../components/TabPage'

const sections = {
  'kafka-overview': lazy(() => import('./KafkaOverview')),
  'kafka-producer-consumer': lazy(() => import('./KafkaProducerConsumer')),
  'kafka-delivery-patterns': lazy(() => import('./KafkaDeliveryPatterns')),
  'kafka-connect-ops': lazy(() => import('./KafkaConnectOps')),
}

const tabGroups = [
  {
    label: 'Kafka',
    tabs: [
      { id: 'kafka-overview', label: 'Kafka 개요', icon: <Radio size={14} /> },
      { id: 'kafka-producer-consumer', label: 'Producer & Consumer', icon: <RefreshCw size={14} /> },
      { id: 'kafka-delivery-patterns', label: '전달 보장 & 패턴', icon: <Target size={14} /> },
      { id: 'kafka-connect-ops', label: 'Connect & 운영', icon: <Settings size={14} /> },
    ],
  },
]

export default function KafkaPage() {
  return (
    <TabPage
      slug="kafka"
      accentColor="#f97316"
      sections={sections}
      tabGroups={tabGroups}
      defaultTab="kafka-overview"
    />
  )
}

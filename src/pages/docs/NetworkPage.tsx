import { lazy } from 'react'
import TabPage from '../../components/TabPage'

const sections = {
  'http-overview': lazy(() => import('./HttpOverview')),
  'http-versions': lazy(() => import('./HttpVersions')),
  'http-vs-https': lazy(() => import('./HttpVsHttps')),
  'http-request-response': lazy(() => import('./HttpRequestResponse')),
  'restful-api': lazy(() => import('./RestfulApi')),
  'tcp-vs-udp': lazy(() => import('./TcpVsUdp')),
  'tcp-handshake': lazy(() => import('./TcpHandshake')),
  'dns': lazy(() => import('./Dns')),
  'websocket-realtime': lazy(() => import('./WebSocketRealtime')),
  'proxy-cdn': lazy(() => import('./ProxyCdn')),
  'network-layer-model': lazy(() => import('./NetworkLayerModel')),
  'nat-ip': lazy(() => import('./NatIp')),
  'api-gateway': lazy(() => import('./ApiGateway')),
  'load-balancing': lazy(() => import('./LoadBalancing')),
  'grpc-protobuf': lazy(() => import('./GrpcProtobuf')),
  'network-io-model': lazy(() => import('./NetworkIoModel')),
  'service-mesh': lazy(() => import('./ServiceMesh')),
  'connection-pool': lazy(() => import('./ConnectionPool')),
  'circuit-breaker-retry': lazy(() => import('./CircuitBreakerRetry')),
}

const tabGroups = [
  {
    label: 'HTTP',
    tabs: [
      { id: 'http-overview', label: 'HTTP란?', icon: '📡' },
      { id: 'http-versions', label: 'HTTP 버전', icon: '📄' },
      { id: 'http-vs-https', label: 'HTTP vs HTTPS', icon: '🔒' },
      { id: 'http-request-response', label: '요청-응답', icon: '🔄' },
      { id: 'restful-api', label: 'RESTful API', icon: '🎯' },
      { id: 'grpc-protobuf', label: 'gRPC & Protobuf', icon: '⚡' },
    ],
  },
  {
    label: 'TCP/IP',
    tabs: [
      { id: 'tcp-vs-udp', label: 'TCP vs UDP', icon: '⚖️' },
      { id: 'tcp-handshake', label: 'Handshake', icon: '🤝' },
      { id: 'dns', label: 'DNS', icon: '📍' },
      { id: 'network-layer-model', label: 'OSI / TCP/IP 계층', icon: '🏗️' },
      { id: 'nat-ip', label: 'NAT & IP', icon: '🔢' },
    ],
  },
  {
    label: 'Infra',
    tabs: [
      { id: 'websocket-realtime', label: 'WebSocket', icon: '🔌' },
      { id: 'proxy-cdn', label: 'Proxy & CDN', icon: '🌐' },
      { id: 'api-gateway', label: 'API Gateway', icon: '🚪' },
      { id: 'load-balancing', label: '로드밸런싱', icon: '⚖️' },
      { id: 'network-io-model', label: 'I/O 모델', icon: '🔄' },
      { id: 'service-mesh', label: 'Service Mesh', icon: '🕸️' },
      { id: 'connection-pool', label: 'Connection Pool', icon: '🔗' },
      { id: 'circuit-breaker-retry', label: 'CB & Retry', icon: '🔌' },
    ],
  },
]

export default function NetworkPage() {
  return (
    <TabPage
      slug="network"
      accentColor="#3b82f6"
      sections={sections}
      tabGroups={tabGroups}
      defaultTab="http-overview"
    />
  )
}

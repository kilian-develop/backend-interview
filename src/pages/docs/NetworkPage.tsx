import { lazy } from 'react'
import { Globe, FileText, Lock, ArrowLeftRight, Target, Zap, Scale, Handshake, MapPin, Layers, Hash, Plug, Globe2, DoorOpen, RefreshCw, Network, Link, ShieldAlert } from 'lucide-react'
import TabPage from '../../components/TabPage'

const I = 14

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
      { id: 'http-overview', label: 'HTTP란?', icon: <Globe size={I} /> },
      { id: 'http-versions', label: 'HTTP 버전', icon: <FileText size={I} /> },
      { id: 'http-vs-https', label: 'HTTP vs HTTPS', icon: <Lock size={I} /> },
      { id: 'http-request-response', label: '요청-응답', icon: <ArrowLeftRight size={I} /> },
      { id: 'restful-api', label: 'RESTful API', icon: <Target size={I} /> },
      { id: 'grpc-protobuf', label: 'gRPC & Protobuf', icon: <Zap size={I} /> },
    ],
  },
  {
    label: 'TCP/IP',
    tabs: [
      { id: 'tcp-vs-udp', label: 'TCP vs UDP', icon: <Scale size={I} /> },
      { id: 'tcp-handshake', label: 'Handshake', icon: <Handshake size={I} /> },
      { id: 'dns', label: 'DNS', icon: <MapPin size={I} /> },
      { id: 'network-layer-model', label: 'OSI / TCP/IP 계층', icon: <Layers size={I} /> },
      { id: 'nat-ip', label: 'NAT & IP', icon: <Hash size={I} /> },
    ],
  },
  {
    label: 'Infra',
    tabs: [
      { id: 'websocket-realtime', label: 'WebSocket', icon: <Plug size={I} /> },
      { id: 'proxy-cdn', label: 'Proxy & CDN', icon: <Globe2 size={I} /> },
      { id: 'api-gateway', label: 'API Gateway', icon: <DoorOpen size={I} /> },
      { id: 'load-balancing', label: '로드밸런싱', icon: <Scale size={I} /> },
      { id: 'network-io-model', label: 'I/O 모델', icon: <RefreshCw size={I} /> },
      { id: 'service-mesh', label: 'Service Mesh', icon: <Network size={I} /> },
      { id: 'connection-pool', label: 'Connection Pool', icon: <Link size={I} /> },
      { id: 'circuit-breaker-retry', label: 'CB & Retry', icon: <ShieldAlert size={I} /> },
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

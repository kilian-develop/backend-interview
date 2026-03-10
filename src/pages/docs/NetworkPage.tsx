import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import DocLayout from '../../components/DocLayout'
import { useInjectCSS } from '../../hooks/useInjectCSS'

const TAB_CSS = `
.tab-groups { padding:12px 20px 0; display:flex; flex-direction:column; gap:8px; }
.tab-group { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
.tab-group-label { flex-shrink:0; font-size:10px; font-weight:600; color:#475569; font-family:var(--mono); letter-spacing:0.5px; text-transform:uppercase; min-width:56px; }
.page-tab { flex-shrink:0; display:flex; align-items:center; gap:6px; padding:6px 12px; border-radius:8px; border:1px solid var(--border); background:transparent; color:var(--dim); font-size:11px; font-family:var(--mono); cursor:pointer; transition:all .2s; white-space:nowrap; }
.page-tab:hover { border-color:rgba(59,130,246,0.3); background:rgba(59,130,246,0.05); }
.page-tab.active { border-color:rgba(59,130,246,0.5); background:rgba(59,130,246,0.1); color:#3b82f6; }
.page-tab-icon { font-size:13px; }

@media (max-width:480px) {
  .tab-groups { padding:8px 10px 0; gap:6px; }
  .tab-group { flex-wrap:nowrap; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; gap:4px; padding-bottom:4px; }
  .tab-group::-webkit-scrollbar { display:none; }
  .tab-group-label { min-width:40px; font-size:9px; letter-spacing:0.3px; }
  .page-tab { padding:5px 8px; font-size:10px; gap:4px; }
  .page-tab-icon { font-size:11px; }
}
@media (min-width:481px) and (max-width:640px) {
  .tab-groups { padding:10px 14px 0; }
  .page-tab { padding:5px 10px; font-size:10px; }
  .page-tab-icon { font-size:12px; }
}
`

const sections: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
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

function getInitialTab(): string {
  const hash = window.location.hash.slice(1)
  return hash && hash in sections ? hash : 'http-overview'
}

export default function NetworkPage() {
  const [activeTab, setActiveTab] = useState(getInitialTab)
  useInjectCSS('style-page-tabs-network', TAB_CSS)

  const handleTabChange = useCallback((id: string) => {
    setActiveTab(id)
    window.location.hash = id
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash && hash in sections) setActiveTab(hash)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const ActiveSection = sections[activeTab]

  return (
    <DocLayout slug="network">
      <div className="tab-groups">
        {tabGroups.map((group) => (
          <div key={group.label} className="tab-group">
            <span className="tab-group-label">{group.label}</span>
            {group.tabs.map((tab) => (
              <button
                key={tab.id}
                className={`page-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="page-tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        ))}
      </div>
      <Suspense
        fallback={
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--dim)', fontFamily: 'var(--mono)', fontSize: '13px' }}>
            Loading...
          </div>
        }
      >
        <ActiveSection />
      </Suspense>
    </DocLayout>
  )
}

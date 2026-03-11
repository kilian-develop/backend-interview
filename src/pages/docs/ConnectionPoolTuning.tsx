import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.cpt-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.cpt-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.cpt-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.cpt-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.cpt-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.cpt-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.cpt-param:hover { transform:translateY(-3px); }
.cpt-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.cpt-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.cpt-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.cpt-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.cpt-table { width:100%; border-collapse:collapse; font-size:12px; }
.cpt-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.cpt-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.cpt-table tr:last-child td { border-bottom:none; }
.cpt-step-list { display:flex; flex-direction:column; gap:10px; }
.cpt-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.cpt-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.cpt-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.cpt-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .cpt-compare-grid{ grid-template-columns:1fr; } }
.cpt-formula { background:#0a0e17; border:1px solid rgba(6,182,212,0.3); border-radius:12px; padding:20px; text-align:center; font-family:'JetBrains Mono',monospace; font-size:16px; color:#06b6d4; margin:16px 0; letter-spacing:0.5px; }
.cpt-formula-desc { font-size:11px; color:#5a6a85; margin-top:8px; font-family:inherit; letter-spacing:0; }
`

export default function ConnectionPoolTuning() {
  useInjectCSS('style-connection-pool-tuning', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Connection Pool · HikariCP · Buffer Pool · Slow Query · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>커넥션 풀</span> & DB 튜닝</>}
          description="커넥션 풀 동작 원리와 HikariCP, 풀 사이징 공식, 버퍼 풀 튜닝, 슬로우 쿼리 대응 전략"
        />

        {/* ── 커넥션 풀이란 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>커넥션 풀 (Connection Pool)</SectionTitle>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#06b6d4' }}>왜 커넥션 풀이 필요한가?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="cpt-feature-row">
                <span className="cpt-feature-icon">🔌</span>
                <span>DB 커넥션을 매 요청마다 생성하고 닫으면 <strong style={{ color: '#ef4444' }}>TCP 3-way Handshake + 인증 + 세션 초기화</strong>가 반복되어 매우 비효율적입니다. 커넥션 하나를 생성하는 데 약 <strong style={{ color: '#e2e8f0' }}>20~50ms</strong>가 소요됩니다.</span>
              </div>
              <div className="cpt-feature-row">
                <span className="cpt-feature-icon">♻️</span>
                <span><strong style={{ color: '#e2e8f0' }}>커넥션 풀</strong>은 미리 일정 수의 커넥션을 생성해 두고, 요청 시 <strong style={{ color: '#06b6d4' }}>빌려주고(Borrow) → 사용 후 반납(Return)</strong>하는 방식으로 재사용합니다. 커넥션 생성 비용을 제거하여 응답 시간이 수십 ms 단축됩니다.</span>
              </div>
            </div>
          </div>

          {/* 커넥션 풀 동작 흐름 */}
          <DiagramContainer title="커넥션 풀 동작 흐름">
            <DiagramFlow>
              <DiagramNode icon="📱" label="Application" sub="DB 작업 요청" color="#f59e0b" />
              <DiagramArrow label="1. getConnection()" color="#06b6d4" animated />
              <DiagramGroup label="Connection Pool" color="#06b6d4">
                <DiagramNode icon="🔌" label="Idle 커넥션" sub="사용 가능한 커넥션" color="#22c55e" />
                <DiagramNode icon="⚡" label="Active 커넥션" sub="사용 중인 커넥션" color="#f59e0b" />
              </DiagramGroup>
              <DiagramArrow label="2. SQL 실행" color="#a855f7" animated />
              <DiagramNode icon="🗄️" label="Database" sub="쿼리 처리" color="#a855f7" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="cpt-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#22c55e' }}>커넥션 라이프사이클</span></div>
            <div className="cpt-step-list">
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#06b6d4' }}>풀 초기화</strong> — 애플리케이션 시작 시 <code style={{ color: '#06b6d4' }}>minimumIdle</code>만큼 커넥션을 미리 생성합니다.
                </div>
              </div>
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>2</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#22c55e' }}>Borrow (대여)</strong> — 요청이 오면 Idle 커넥션을 하나 꺼내 반환합니다. Idle이 없으면 <code style={{ color: '#22c55e' }}>maximumPoolSize</code>까지 새로 생성합니다.
                </div>
              </div>
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>3</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#f59e0b' }}>사용</strong> — 커넥션으로 SQL 쿼리를 실행합니다. 트랜잭션 범위 내에서 동일 커넥션이 유지됩니다.
                </div>
              </div>
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>4</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#a855f7' }}>Return (반납)</strong> — 사용이 끝나면 커넥션을 풀에 돌려줍니다. 물리적으로 닫지 않고 Idle 상태로 전환합니다.
                </div>
              </div>
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>5</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#ef4444' }}>제거</strong> — <code style={{ color: '#ef4444' }}>maxLifetime</code>을 초과하거나, 유효성 검사(validation)에 실패한 커넥션은 폐기 후 새로 생성합니다.
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> 커넥션 풀이 없으면 매 요청마다 <strong>TCP Handshake + DB 인증</strong>이 반복됩니다. 풀을 사용하면 이 비용이 제거되어 실제 쿼리 실행 시간만 소요됩니다. 하지만 커넥션은 DB 서버의 <strong>메모리와 프로세스를 점유</strong>하므로, 무한히 늘릴 수 없습니다.
          </HighlightBox>
        </div>

        {/* ── HikariCP ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#06b6d4']}>HikariCP 동작 원리</SectionTitle>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#3b82f6' }}>HikariCP란?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="cpt-feature-row">
                <span className="cpt-feature-icon">⚡</span>
                <span><strong style={{ color: '#e2e8f0' }}>HikariCP</strong>는 Spring Boot 2.x부터 기본 커넥션 풀입니다. "光(빛)"이라는 이름답게 <strong style={{ color: '#06b6d4' }}>가장 빠른 JDBC 커넥션 풀</strong>로 알려져 있으며, 바이트코드 최적화와 ConcurrentBag 자료구조를 활용합니다.</span>
              </div>
            </div>
          </div>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#06b6d4' }}>HikariCP가 빠른 이유</span></div>
            <div className="cpt-param-grid">
              <div className="cpt-param">
                <div className="cpt-param-name" style={{ color: '#06b6d4' }}>ConcurrentBag</div>
                <div className="cpt-param-desc">
                  커넥션을 <strong style={{ color: '#e2e8f0' }}>ThreadLocal 우선 반환</strong>하는 자료구조입니다. 같은 스레드가 이전에 사용한 커넥션을 우선 돌려주어 CPU 캐시 히트율을 높입니다.
                </div>
                <div className="cpt-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>Lock-Free 설계</div>
              </div>
              <div className="cpt-param">
                <div className="cpt-param-name" style={{ color: '#3b82f6' }}>바이트코드 최적화</div>
                <div className="cpt-param-desc">
                  Javassist를 사용하여 <strong style={{ color: '#e2e8f0' }}>JDBC 프록시 객체를 최소화</strong>합니다. 다른 풀이 동적 프록시를 사용하는 것과 달리, 컴파일 시점에 최적화된 코드를 생성합니다.
                </div>
                <div className="cpt-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>Javassist</div>
              </div>
              <div className="cpt-param">
                <div className="cpt-param-name" style={{ color: '#22c55e' }}>FastList</div>
                <div className="cpt-param-desc">
                  ArrayList 대신 <strong style={{ color: '#e2e8f0' }}>범위 검사를 제거</strong>한 커스텀 리스트를 사용합니다. Statement 추적 등에서 미세한 성능 향상을 달성합니다.
                </div>
                <div className="cpt-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>미세 최적화</div>
              </div>
              <div className="cpt-param">
                <div className="cpt-param-name" style={{ color: '#a855f7' }}>최소한의 코드</div>
                <div className="cpt-param-desc">
                  전체 코드량이 약 <strong style={{ color: '#e2e8f0' }}>130KB</strong>로 매우 작습니다. 코드가 적으면 JIT 컴파일 최적화가 유리하고 버그 가능성이 줄어듭니다.
                </div>
                <div className="cpt-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>~130KB JAR</div>
              </div>
            </div>
          </div>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#f59e0b' }}>핵심 설정 파라미터</span></div>
            <div className="cpt-table-wrap">
              <table className="cpt-table">
                <thead>
                  <tr>
                    <th>파라미터</th>
                    <th>기본값</th>
                    <th>설명</th>
                    <th>설정 가이드</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#06b6d4' }}>maximumPoolSize</strong></td>
                    <td>10</td>
                    <td>풀의 최대 커넥션 수</td>
                    <td>풀 사이징 공식으로 산출</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#22c55e' }}>minimumIdle</strong></td>
                    <td>= maximumPoolSize</td>
                    <td>유지할 최소 Idle 커넥션 수</td>
                    <td>HikariCP 권장: maximumPoolSize와 동일</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#3b82f6' }}>connectionTimeout</strong></td>
                    <td>30000ms</td>
                    <td>풀에서 커넥션을 대기하는 최대 시간</td>
                    <td>서비스 SLA에 맞춰 설정 (보통 3~5초)</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#a855f7' }}>maxLifetime</strong></td>
                    <td>1800000ms</td>
                    <td>커넥션의 최대 수명</td>
                    <td>DB의 wait_timeout보다 <strong style={{ color: '#ef4444' }}>짧게</strong> 설정</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#f59e0b' }}>idleTimeout</strong></td>
                    <td>600000ms</td>
                    <td>Idle 커넥션 유지 시간</td>
                    <td>minimumIdle {'<'} maximumPoolSize일 때만 적용</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#ef4444' }}>leakDetectionThreshold</strong></td>
                    <td>0 (비활성)</td>
                    <td>커넥션 누수 감지 임계값</td>
                    <td>개발 환경에서 2000ms로 설정 권장</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CodeBlock title="Spring Boot HikariCP 설정 예시" lang="yaml">{
`spring:
  datasource:
    hikari:
      maximum-pool-size: 10
      minimum-idle: 10           # HikariCP 권장: maximumPoolSize와 동일
      connection-timeout: 3000   # 3초 대기 후 예외 발생
      max-lifetime: 1740000      # 29분 (MySQL wait_timeout 30분보다 짧게)
      idle-timeout: 600000       # 10분 (minimumIdle < maximumPoolSize일 때만)
      leak-detection-threshold: 2000  # 개발 환경: 2초 이상 반납 안 되면 경고
      pool-name: MyAppHikariPool
      connection-test-query: SELECT 1  # JDBC4 드라이버면 불필요`
          }</CodeBlock>

          <HighlightBox color="#3b82f6">
            <strong>면접 포인트:</strong> HikariCP는 <strong>minimumIdle = maximumPoolSize</strong>를 권장합니다. Idle 커넥션을 동적으로 조절하면 급증하는 트래픽에 커넥션 생성 지연이 발생할 수 있기 때문입니다. <strong>maxLifetime</strong>은 반드시 DB의 <code style={{ color: '#06b6d4' }}>wait_timeout</code>보다 짧게 설정하여, DB가 강제로 끊기 전에 풀이 먼저 교체해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 풀 사이징 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#f59e0b']}>커넥션 풀 사이징</SectionTitle>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#a855f7' }}>풀 사이즈가 중요한 이유</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="cpt-feature-row">
                <span className="cpt-feature-icon">📐</span>
                <span>풀이 <strong style={{ color: '#ef4444' }}>너무 작으면</strong> 커넥션을 기다리는 스레드가 많아져 응답 지연이 발생하고, <strong style={{ color: '#ef4444' }}>너무 크면</strong> DB 서버의 메모리/CPU가 과부하 되어 오히려 전체 성능이 저하됩니다.</span>
              </div>
            </div>
          </div>

          <div className="cpt-formula">
            Pool Size = (CPU 코어 수 × 2) + Disk 스핀들 수
            <div className="cpt-formula-desc">
              PostgreSQL Wiki 권장 공식 — 대부분의 경우 <strong>CPU 코어 × 2 + 1</strong>이 최적에 가깝습니다
            </div>
          </div>

          <div className="cpt-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-box">
              <div className="cpt-section-subtitle"><span style={{ color: '#ef4444' }}>풀이 너무 클 때</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="cpt-feature-row">
                  <span className="cpt-feature-icon">⚠️</span>
                  <span>DB 서버의 <strong style={{ color: '#ef4444' }}>컨텍스트 스위칭</strong> 증가 — 수백 개의 커넥션이 동시에 쿼리하면 CPU가 스위칭에 시간을 소비</span>
                </div>
                <div className="cpt-feature-row">
                  <span className="cpt-feature-icon">⚠️</span>
                  <span>DB <strong style={{ color: '#ef4444' }}>메모리 부족</strong> — 각 커넥션은 MySQL 기준 약 <strong style={{ color: '#e2e8f0' }}>4~10MB</strong>의 메모리를 점유</span>
                </div>
                <div className="cpt-feature-row">
                  <span className="cpt-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>디스크 I/O 경합</strong> — 동시 쿼리가 많으면 디스크 읽기 경합 발생</span>
                </div>
              </div>
            </div>
            <div className="cpt-section-box">
              <div className="cpt-section-subtitle"><span style={{ color: '#ef4444' }}>풀이 너무 작을 때</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="cpt-feature-row">
                  <span className="cpt-feature-icon">⚠️</span>
                  <span><strong style={{ color: '#ef4444' }}>커넥션 대기 (ConnectionTimeout)</strong> — 요청이 풀에서 커넥션을 기다리다 타임아웃 발생</span>
                </div>
                <div className="cpt-feature-row">
                  <span className="cpt-feature-icon">⚠️</span>
                  <span>응답 시간 <strong style={{ color: '#ef4444' }}>급격히 증가</strong> — 쿼리 실행 시간 + 대기 시간</span>
                </div>
                <div className="cpt-feature-row">
                  <span className="cpt-feature-icon">⚠️</span>
                  <span>트래픽 급증 시 <strong style={{ color: '#ef4444' }}>연쇄 장애</strong> 가능 — 대기 스레드 누적 → 스레드 풀 고갈</span>
                </div>
              </div>
            </div>
          </div>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#22c55e' }}>실무 사이징 가이드</span></div>
            <div className="cpt-table-wrap">
              <table className="cpt-table">
                <thead>
                  <tr>
                    <th>환경</th>
                    <th>DB 서버 스펙</th>
                    <th>권장 풀 사이즈</th>
                    <th>근거</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#06b6d4' }}>소규모</strong></td>
                    <td>4 Core / 8GB</td>
                    <td>10 ~ 15</td>
                    <td>4×2+1 = 9, 여유 포함</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#3b82f6' }}>중규모</strong></td>
                    <td>8 Core / 32GB</td>
                    <td>15 ~ 25</td>
                    <td>8×2+1 = 17, 서비스 복수 인스턴스 고려</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#a855f7' }}>대규모</strong></td>
                    <td>16+ Core / 64GB+</td>
                    <td>20 ~ 50</td>
                    <td>인스턴스 수 × 풀 사이즈 {'<'} DB max_connections</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CodeBlock title="풀 사이즈 계산 — 멀티 인스턴스 환경" lang="bash">{
`# DB max_connections = 200 (기본값에서 조정)
# 애플리케이션 인스턴스 = 4대
# 관리/모니터링 여유 = 20 커넥션

# 인스턴스당 풀 사이즈 = (200 - 20) / 4 = 45
# 공식 기반 검증: CPU 8 Core → 8×2+1 = 17
# → 17 ~ 45 범위에서 부하 테스트로 결정

# MySQL max_connections 확인
# SHOW VARIABLES LIKE 'max_connections';

# 현재 사용 중인 커넥션 확인
# SHOW STATUS LIKE 'Threads_connected';`
          }</CodeBlock>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> "커넥션 풀 사이즈를 어떻게 결정하나요?"에는 <strong>①공식(CPU×2+1)으로 시작점 산출</strong> → <strong>②인스턴스 수 × 풀 사이즈 {'<'} DB max_connections 확인</strong> → <strong>③부하 테스트로 최적값 결정</strong>의 과정을 설명하세요. 핵심은 "크다고 좋은 게 아니라, <strong>DB가 효율적으로 처리할 수 있는 동시 커넥션 수</strong>에 맞춰야 한다"입니다.
          </HighlightBox>
        </div>

        {/* ── 커넥션 풀 문제 진단 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>커넥션 풀 문제 진단</SectionTitle>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#ef4444' }}>자주 발생하는 문제</span></div>
            <div className="cpt-param-grid">
              <div className="cpt-param">
                <div className="cpt-param-name" style={{ color: '#ef4444' }}>커넥션 누수 (Leak)</div>
                <div className="cpt-param-desc">
                  커넥션을 빌린 후 <strong style={{ color: '#ef4444' }}>반납하지 않아</strong> Active 커넥션이 계속 증가하는 현상입니다. try-with-resources 미사용, 예외 발생 시 close 누락이 원인입니다.
                </div>
                <div className="cpt-param-val" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>leakDetectionThreshold로 감지</div>
              </div>
              <div className="cpt-param">
                <div className="cpt-param-name" style={{ color: '#f59e0b' }}>ConnectionTimeout</div>
                <div className="cpt-param-desc">
                  풀의 모든 커넥션이 Active 상태여서 <strong style={{ color: '#f59e0b' }}>대기 시간 초과</strong>가 발생합니다. 풀 사이즈 부족, 슬로우 쿼리, 커넥션 누수가 원인일 수 있습니다.
                </div>
                <div className="cpt-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>풀 사이즈 또는 쿼리 점검</div>
              </div>
              <div className="cpt-param">
                <div className="cpt-param-name" style={{ color: '#a855f7' }}>Broken Pipe / Connection Reset</div>
                <div className="cpt-param-desc">
                  DB가 <strong style={{ color: '#a855f7' }}>wait_timeout으로 커넥션을 끊었는데</strong> 풀이 이를 감지하지 못한 경우 발생합니다. maxLifetime 설정 미스가 원인입니다.
                </div>
                <div className="cpt-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>maxLifetime {'<'} DB wait_timeout</div>
              </div>
            </div>
          </div>

          <CodeBlock title="커넥션 누수 감지 및 모니터링" lang="java">{
`// Spring Boot에서 HikariCP 메트릭 활성화
// application.yml
// spring.datasource.hikari.register-mbeans: true

// Actuator + Micrometer로 모니터링
// hikaricp.connections.active    — 사용 중인 커넥션 수
// hikaricp.connections.idle      — 유휴 커넥션 수
// hikaricp.connections.pending   — 대기 중인 요청 수 ← 이 값이 0이 아니면 주의!
// hikaricp.connections.timeout   — 타임아웃 발생 횟수

// 커넥션 누수 방지: try-with-resources 필수
try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement(sql)) {
    // 쿼리 실행
} // 자동으로 close → 풀에 반납`
          }</CodeBlock>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> "커넥션 풀에서 ConnectionTimeout이 자주 발생합니다. 어떻게 해결하나요?" → <strong>①pending 메트릭 확인</strong>(대기 요청이 많은지) → <strong>②active 커넥션 수 확인</strong>(누수인지 풀 부족인지) → <strong>③슬로우 쿼리 확인</strong>(커넥션을 오래 잡고 있는 쿼리) → <strong>④풀 사이즈 조정</strong> 순서로 진단합니다.
          </HighlightBox>
        </div>

        {/* ── 버퍼 풀 튜닝 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#3b82f6']}>버퍼 풀 & DB 서버 튜닝</SectionTitle>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#22c55e' }}>InnoDB 버퍼 풀 (Buffer Pool)</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="cpt-feature-row">
                <span className="cpt-feature-icon">💾</span>
                <span><strong style={{ color: '#e2e8f0' }}>버퍼 풀</strong>은 InnoDB가 데이터와 인덱스 페이지를 <strong style={{ color: '#06b6d4' }}>메모리에 캐싱</strong>하는 영역입니다. 디스크 I/O를 줄이는 가장 핵심적인 요소이며, DB 성능의 80%는 버퍼 풀 히트율에 달려있습니다.</span>
              </div>
            </div>
          </div>

          <DiagramContainer title="버퍼 풀 동작 — 캐시 히트 vs 미스">
            <DiagramFlow>
              <DiagramNode icon="📝" label="SQL Query" sub="SELECT * FROM users" color="#f59e0b" />
              <DiagramArrow label="페이지 요청" color="#f59e0b" animated />
              <DiagramGroup label="Buffer Pool (메모리)" color="#22c55e">
                <DiagramNode icon="✅" label="Cache Hit" sub="메모리에서 즉시 반환" color="#22c55e" />
                <DiagramNode icon="❌" label="Cache Miss" sub="디스크에서 로드 필요" color="#ef4444" />
              </DiagramGroup>
              <DiagramArrow label="Miss 시" color="#ef4444" animated />
              <DiagramNode icon="💿" label="Disk I/O" sub="데이터 파일 읽기" color="#ef4444" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="cpt-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#06b6d4' }}>주요 DB 서버 튜닝 파라미터 (MySQL/InnoDB)</span></div>
            <div className="cpt-table-wrap">
              <table className="cpt-table">
                <thead>
                  <tr>
                    <th>파라미터</th>
                    <th>권장값</th>
                    <th>설명</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#22c55e' }}>innodb_buffer_pool_size</strong></td>
                    <td>전체 메모리의 70~80%</td>
                    <td>가장 중요한 튜닝 파라미터. 클수록 히트율 증가</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#06b6d4' }}>innodb_buffer_pool_instances</strong></td>
                    <td>8 (pool {'>'} 1GB일 때)</td>
                    <td>버퍼 풀을 여러 인스턴스로 분할하여 경합 감소</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#3b82f6' }}>innodb_log_file_size</strong></td>
                    <td>1~2GB</td>
                    <td>Redo Log 크기. 쓰기 부하가 많으면 크게 설정</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#a855f7' }}>max_connections</strong></td>
                    <td>서비스 규모에 맞게</td>
                    <td>총 커넥션 한도. 인스턴스 수 × 풀 사이즈 + 여유</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#f59e0b' }}>wait_timeout</strong></td>
                    <td>28800 (기본 8시간)</td>
                    <td>Idle 커넥션 자동 종료 시간. 풀 사용 시 줄일 수 있음</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#ef4444' }}>slow_query_log</strong></td>
                    <td>ON</td>
                    <td>슬로우 쿼리 기록 활성화</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <CodeBlock title="버퍼 풀 히트율 확인 (MySQL)" lang="sql">{
`-- 버퍼 풀 히트율 확인 (99% 이상이 이상적)
SHOW STATUS LIKE 'Innodb_buffer_pool_read%';

-- 히트율 계산:
-- Hit Rate = 1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests) × 100
-- Innodb_buffer_pool_read_requests: 논리적 읽기 (메모리 요청)
-- Innodb_buffer_pool_reads: 물리적 읽기 (디스크에서 로드)

-- 버퍼 풀 사용량 확인
SHOW STATUS LIKE 'Innodb_buffer_pool_pages%';
-- Innodb_buffer_pool_pages_total: 전체 페이지 수
-- Innodb_buffer_pool_pages_free: 여유 페이지 수 (0에 가까우면 사이즈 증가 필요)

-- PostgreSQL: 캐시 히트율 확인
-- SELECT sum(heap_blks_hit) / (sum(heap_blks_hit) + sum(heap_blks_read)) AS hit_rate
-- FROM pg_statio_user_tables;`
          }</CodeBlock>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> <strong>innodb_buffer_pool_size</strong>는 MySQL 튜닝의 가장 핵심 파라미터입니다. "DB가 느립니다"라는 문제의 첫 번째 점검 항목은 <strong>버퍼 풀 히트율</strong>입니다. 99% 이상이면 정상이고, 낮다면 버퍼 풀 크기를 늘리거나 비효율적인 쿼리(Full Table Scan)가 버퍼 풀을 오염시키는지 확인해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 슬로우 쿼리 대응 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>슬로우 쿼리 대응</SectionTitle>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#f59e0b' }}>슬로우 쿼리가 전체 성능에 미치는 영향</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="cpt-feature-row">
                <span className="cpt-feature-icon">🐌</span>
                <span>단 하나의 슬로우 쿼리가 <strong style={{ color: '#ef4444' }}>커넥션을 오래 점유</strong>하여 다른 요청이 커넥션을 얻지 못하게 만듭니다. 커넥션 풀 고갈 → 스레드 대기 → 전체 서비스 응답 지연의 <strong style={{ color: '#ef4444' }}>연쇄 장애(Cascading Failure)</strong>로 이어질 수 있습니다.</span>
              </div>
            </div>
          </div>

          <div className="cpt-section-box" style={{ marginBottom: '20px' }}>
            <div className="cpt-section-subtitle"><span style={{ color: '#ef4444' }}>대응 프로세스</span></div>
            <div className="cpt-step-list">
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#06b6d4' }}>발견 — 슬로우 쿼리 로그 활성화</strong><br />
                  <code style={{ color: '#06b6d4' }}>slow_query_log = ON</code>, <code style={{ color: '#06b6d4' }}>long_query_time = 1</code> (1초 이상)으로 설정합니다. <strong style={{ color: '#e2e8f0' }}>pg_stat_statements</strong>(PostgreSQL)로 빈도와 평균 실행 시간을 모니터링합니다.
                </div>
              </div>
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>2</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#3b82f6' }}>분석 — EXPLAIN으로 실행 계획 확인</strong><br />
                  Full Table Scan(type=ALL), filesort, temporary 여부를 확인합니다. <strong style={{ color: '#e2e8f0' }}>rows × 실행 빈도</strong>가 높은 쿼리를 우선 최적화합니다.
                </div>
              </div>
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>3</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#a855f7' }}>해결 — 인덱스 추가 또는 쿼리 수정</strong><br />
                  적절한 인덱스 추가, 쿼리 리팩토링(서브쿼리→JOIN, SELECT * 제거), 불필요한 데이터 조회 제거를 수행합니다.
                </div>
              </div>
              <div className="cpt-step">
                <div className="cpt-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>4</div>
                <div className="cpt-step-content">
                  <strong style={{ color: '#22c55e' }}>예방 — 쿼리 타임아웃 설정</strong><br />
                  <code style={{ color: '#22c55e' }}>statement_timeout</code>(PostgreSQL), <code style={{ color: '#22c55e' }}>max_execution_time</code>(MySQL 5.7+)로 장시간 쿼리를 자동 종료합니다.
                </div>
              </div>
            </div>
          </div>

          <CodeBlock title="슬로우 쿼리 설정 및 타임아웃" lang="sql">{
`-- MySQL: 슬로우 쿼리 로그 활성화
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;  -- 1초 이상
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- MySQL 5.7+: 쿼리 실행 시간 제한 (ms)
SET GLOBAL max_execution_time = 5000;  -- 5초

-- PostgreSQL: 쿼리 타임아웃
SET statement_timeout = '5s';

-- Spring Boot에서 쿼리 타임아웃 설정
-- spring.jpa.properties.javax.persistence.query.timeout=5000`
          }</CodeBlock>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> 슬로우 쿼리 대응의 핵심은 <strong>"발견 → 분석 → 해결 → 예방"</strong>의 체계적 프로세스입니다. 단순히 "인덱스를 추가합니다"가 아니라, <strong>슬로우 쿼리 로그로 빈번한 문제 쿼리를 찾고, EXPLAIN으로 원인을 분석한 뒤, 쿼리 타임아웃으로 장애를 예방</strong>하는 전체 흐름을 설명해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: '커넥션 풀이 왜 필요한가요?',
                a: 'DB 커넥션을 매번 생성하면 TCP Handshake + 인증 + 세션 초기화로 20~50ms가 소요됩니다. 커넥션 풀은 미리 커넥션을 생성해 두고 재사용하여 이 비용을 제거합니다. 요청이 오면 Idle 커넥션을 빌려주고, 사용 후 반납받아 다른 요청에 재사용합니다.',
              },
              {
                q: 'HikariCP가 다른 커넥션 풀보다 빠른 이유는?',
                a: '①ConcurrentBag 자료구조로 ThreadLocal 우선 반환하여 Lock 경합을 최소화하고, ②Javassist를 활용한 바이트코드 최적화로 JDBC 프록시 오버헤드를 줄이며, ③FastList로 범위 검사를 제거하고, ④전체 130KB의 최소한의 코드량으로 JIT 컴파일 최적화에 유리합니다.',
              },
              {
                q: '커넥션 풀 사이즈를 어떻게 결정하나요?',
                a: 'PostgreSQL Wiki 공식 "CPU 코어 × 2 + 1"을 시작점으로 합니다. 4코어 서버라면 약 10이 적정입니다. 멀티 인스턴스 환경에서는 "인스턴스 수 × 풀 사이즈 < DB max_connections"를 확인해야 합니다. 핵심은 풀이 너무 크면 DB 컨텍스트 스위칭과 메모리 부하가 증가하므로, 크다고 좋은 것이 아닙니다.',
              },
              {
                q: 'maxLifetime은 왜 DB wait_timeout보다 짧게 설정해야 하나요?',
                a: 'DB의 wait_timeout(기본 8시간)을 초과하면 DB가 커넥션을 강제 종료합니다. 풀이 이를 감지하지 못하면 이미 끊어진 커넥션을 반환하여 "Broken Pipe" 에러가 발생합니다. maxLifetime을 wait_timeout보다 수 분 짧게 설정하면 풀이 먼저 커넥션을 교체하여 이 문제를 방지합니다.',
              },
              {
                q: 'ConnectionTimeout 에러가 발생하면 어떻게 진단하나요?',
                a: '①HikariCP 메트릭에서 pending(대기 요청 수)과 active(사용 중 커넥션 수) 확인, ②active가 maximumPoolSize와 같고 pending이 증가하면 풀 고갈 상태, ③원인 분석: 커넥션 누수(leakDetectionThreshold로 감지), 슬로우 쿼리(커넥션 장시간 점유), 풀 사이즈 부족 중 판단, ④슬로우 쿼리가 원인이면 풀 확장보다 쿼리 최적화가 우선입니다.',
              },
              {
                q: 'innodb_buffer_pool_size는 왜 중요하고 어떻게 설정하나요?',
                a: 'InnoDB 버퍼 풀은 데이터와 인덱스 페이지를 메모리에 캐싱하여 디스크 I/O를 줄이는 핵심 요소입니다. 히트율이 99% 이상이면 대부분의 읽기가 메모리에서 처리됩니다. 보통 전체 메모리의 70~80%로 설정하며, free 페이지가 0에 가까우면 크기 증가가 필요합니다. 버퍼 풀이 1GB를 초과하면 innodb_buffer_pool_instances를 8로 설정하여 경합을 줄입니다.',
              },
              {
                q: '슬로우 쿼리가 전체 서비스에 미치는 영향을 설명해주세요.',
                a: '슬로우 쿼리가 커넥션을 오래 점유하면 풀의 Active 커넥션이 증가합니다. 풀이 고갈되면 다른 요청이 커넥션을 얻지 못해 ConnectionTimeout이 발생하고, 대기 스레드가 누적되어 스레드 풀까지 고갈됩니다. 결국 전체 서비스가 응답하지 못하는 Cascading Failure로 이어집니다. 대응으로는 슬로우 쿼리 로그 모니터링, EXPLAIN 분석, 쿼리 타임아웃 설정이 필요합니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

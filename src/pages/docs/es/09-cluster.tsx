
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from "@/components/doc/Diagram";

/* ─── Cluster Architecture Diagram ─── */

function ClusterArchitectureDiagram() {
  return (
    <DiagramContainer title="Elasticsearch Cluster Architecture">
      <DiagramFlow vertical>
        {/* Client */}
        <DiagramNode icon="💻" label="Client" sub="Application / API" color="#94a3b8" />

        <DiagramArrow label="HTTP REST" color="#94a3b8" vertical animated />

        {/* Coordinating */}
        <DiagramGroup label="Coordinating Layer" color="#3b82f6">
          <DiagramFlow>
            <DiagramNode icon="🔀" label="Coordinating" sub="요청 분배 & 결과 병합" color="#3b82f6" />
          </DiagramFlow>
        </DiagramGroup>

        <DiagramArrow label="scatter / gather" color="#3b82f6" vertical animated />

        {/* Cluster */}
        <DiagramGroup label="Elasticsearch Cluster" color="#f0c040" style={{ padding: '20px 16px 16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Master */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
              <DiagramGroup label="Master (Quorum)" color="#a855f7">
                <DiagramFlow>
                  <DiagramNode icon="👑" label="Master 1" sub="Active" color="#a855f7" />
                  <DiagramNode icon="👑" label="Master 2" sub="Standby" color="#a855f7" style={{ opacity: 0.6 }} />
                  <DiagramNode icon="👑" label="Master 3" sub="Standby" color="#a855f7" style={{ opacity: 0.6 }} />
                </DiagramFlow>
              </DiagramGroup>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DiagramArrow label="클러스터 상태 관리" color="#a855f7" vertical animated length={20} />
            </div>

            {/* Data Nodes */}
            <DiagramFlow wrap style={{ justifyContent: 'center', gap: '12px' }}>
              {/* Node 1 */}
              <DiagramGroup label="Data Node 1" color="#22c55e">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}>P0</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}>P1</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>R3</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>R4</span>
                  </div>
                </div>
              </DiagramGroup>

              {/* Node 2 */}
              <DiagramGroup label="Data Node 2" color="#22c55e">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}>P2</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}>P3</span>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>R0</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>R1</span>
                  </div>
                </div>
              </DiagramGroup>

              {/* Node 3 */}
              <DiagramGroup label="Data Node 3" color="#22c55e">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '120px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(59,130,246,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)' }}>P4</span>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>R2</span>
                  </div>
                </div>
              </DiagramGroup>
            </DiagramFlow>

            {/* Ingest */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4px' }}>
              <DiagramGroup label="Ingest Pipeline" color="#f59e0b">
                <DiagramFlow>
                  <DiagramNode icon="⚙️" label="Ingest Node" sub="전처리 · 변환 · 보강" color="#f59e0b" />
                </DiagramFlow>
              </DiagramGroup>
            </div>
          </div>
        </DiagramGroup>
      </DiagramFlow>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', flexWrap: 'wrap' }}>
        {[
          { label: 'Primary Shard', color: '#3b82f6' },
          { label: 'Replica Shard', color: '#f59e0b' },
          { label: 'Master Node', color: '#a855f7' },
          { label: 'Data Node', color: '#22c55e' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: `${item.color}30`, border: `1.5px solid ${item.color}` }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: '#64748b' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </DiagramContainer>
  )
}

/* ─── Inline visuals ─── */

function NodeRoleCards() {
  const nodes = [
    {
      role: "Master Node",
      color: "es-purple",
      gradient: "from-es-purple to-accent",
      desc: "클러스터의 두뇌 역할. 인덱스 생성/삭제, 샤드 할당, 노드 관리 등 클러스터 상태(Cluster State)를 관리합니다.",
      details: [
        "인덱스 메타데이터 관리",
        "샤드 할당 결정",
        "노드 참여/이탈 감지",
        "클러스터 상태 변경 전파",
      ],
      config: "node.roles: [ master ]",
      tip: "전용 Master 노드는 CPU/메모리를 적게 써도 됩니다. 데이터를 저장하지 않으므로 디스크도 작아도 괜찮아요.",
    },
    {
      role: "Data Node",
      color: "es-green",
      gradient: "from-es-green to-es-cyan",
      desc: "실제 데이터(샤드)를 저장하고, 검색과 집계를 실행하는 일꾼 노드입니다. 가장 리소스를 많이 사용합니다.",
      details: [
        "샤드 저장 (Primary + Replica)",
        "검색 쿼리 실행",
        "집계(Aggregation) 연산",
        "인덱싱(색인) 처리",
      ],
      config: "node.roles: [ data ]",
      tip: "디스크 I/O, 메모리, CPU 모두 중요합니다. 실무에서는 SSD 사용이 권장돼요.",
    },
    {
      role: "Coordinating Node",
      color: "es-blue",
      gradient: "from-es-blue to-es-purple",
      desc: "클라이언트 요청을 받아 적절한 Data 노드에 분배하고, 결과를 취합하여 반환하는 로드 밸런서 역할입니다.",
      details: [
        "클라이언트 요청 수신",
        "쿼리를 관련 샤드로 분배",
        "각 샤드의 결과 병합 (Reduce)",
        "최종 응답 반환",
      ],
      config: "node.roles: [ ] (빈 배열)",
      tip: "모든 노드는 기본적으로 Coordinating 역할을 겸합니다. 전용으로 두면 대규모 집계 시 유리합니다.",
    },
    {
      role: "Ingest Node",
      color: "es-orange",
      gradient: "from-es-orange to-es-red",
      desc: "문서가 인덱싱되기 전에 데이터를 변환하는 전처리 파이프라인을 실행합니다.",
      details: [
        "Ingest Pipeline 실행",
        "필드 변환/추출",
        "데이터 보강 (Enrichment)",
        "GeoIP, User-Agent 파싱",
      ],
      config: "node.roles: [ ingest ]",
      tip: "로그 수집 시 Logstash 대신 Ingest Pipeline을 사용하면 아키텍처를 단순화할 수 있습니다.",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
      {nodes.map((n) => (
        <div
          key={n.role}
          className={`bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-${n.color}`}
        >
          <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${n.gradient}`} />
          <h3 className={`font-mono text-lg mb-2 text-${n.color}`}>{n.role}</h3>
          <p className="text-[0.9rem] text-text-dim mb-4">{n.desc}</p>
          <ul className="text-sm text-text-dim space-y-1 mb-4">
            {n.details.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <span className={`text-${n.color} mt-1 shrink-0`}>&#x2022;</span>
                {d}
              </li>
            ))}
          </ul>
          <div className="font-mono text-xs bg-surface-2 rounded-lg px-4 py-2 border border-border mb-3">
            <span className="text-text-dim">{n.config}</span>
          </div>
          <p className="text-xs text-text-dim !mb-0">
            <strong className="text-text">Tip:</strong> {n.tip}
          </p>
        </div>
      ))}
    </div>
  );
}

function ShardVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">샤드(Shard) 구조 시각화</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1 mb-8">
        인덱스는 여러 개의 샤드로 나뉘어 분산 저장됩니다
      </div>

      {/* Index → Shards */}
      <div className="max-w-[750px] mx-auto">
        {/* Index label */}
        <div className="text-center mb-4">
          <span className="font-mono text-sm font-semibold bg-es-blue/15 text-es-blue px-4 py-1.5 rounded-lg border border-es-blue/20">
            products 인덱스 (5 Primary + 5 Replica)
          </span>
        </div>

        {/* Node containers */}
        <div className="grid grid-cols-3 gap-4 mt-6 max-md:grid-cols-1">
          {/* Node 1 */}
          <div className="bg-surface-2 border border-border rounded-xl p-5">
            <div className="font-mono text-xs font-semibold text-es-green mb-3 text-center">Node 1 (Data)</div>
            <div className="space-y-2">
              <div className="bg-es-blue/10 border border-es-blue/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-blue font-semibold">P0</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Primary</span>
              </div>
              <div className="bg-es-blue/10 border border-es-blue/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-blue font-semibold">P1</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Primary</span>
              </div>
              <div className="bg-es-orange/10 border border-es-orange/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-orange font-semibold">R3</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Replica</span>
              </div>
              <div className="bg-es-orange/10 border border-es-orange/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-orange font-semibold">R4</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Replica</span>
              </div>
            </div>
          </div>

          {/* Node 2 */}
          <div className="bg-surface-2 border border-border rounded-xl p-5">
            <div className="font-mono text-xs font-semibold text-es-green mb-3 text-center">Node 2 (Data)</div>
            <div className="space-y-2">
              <div className="bg-es-blue/10 border border-es-blue/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-blue font-semibold">P2</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Primary</span>
              </div>
              <div className="bg-es-blue/10 border border-es-blue/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-blue font-semibold">P3</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Primary</span>
              </div>
              <div className="bg-es-orange/10 border border-es-orange/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-orange font-semibold">R0</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Replica</span>
              </div>
              <div className="bg-es-orange/10 border border-es-orange/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-orange font-semibold">R1</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Replica</span>
              </div>
            </div>
          </div>

          {/* Node 3 */}
          <div className="bg-surface-2 border border-border rounded-xl p-5">
            <div className="font-mono text-xs font-semibold text-es-green mb-3 text-center">Node 3 (Data)</div>
            <div className="space-y-2">
              <div className="bg-es-blue/10 border border-es-blue/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-blue font-semibold">P4</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Primary</span>
              </div>
              <div className="bg-es-orange/10 border border-es-orange/20 rounded-lg px-3 py-2 text-center">
                <span className="font-mono text-xs text-es-orange font-semibold">R2</span>
                <span className="text-[0.7rem] text-text-dim ml-1">Replica</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 text-xs text-text-dim">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-es-blue/30 border border-es-blue/40" />
            <span>Primary Shard (원본)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-es-orange/30 border border-es-orange/40" />
            <span>Replica Shard (복제본)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function RoutingVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">샤드 라우팅 공식</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1 mb-6">
        문서가 어떤 샤드에 저장되는지 결정하는 방법
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Formula */}
        <div className="bg-surface-2 border border-border rounded-xl p-6 text-center mb-6">
          <div className="font-mono text-lg text-accent font-semibold">
            shard = hash(_routing) % number_of_primary_shards
          </div>
          <p className="text-sm text-text-dim mt-3 !mb-0">
            _routing의 기본값은 문서의 <strong className="text-text">_id</strong>입니다
          </p>
        </div>

        {/* Example */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-es-purple/[0.08] border border-es-purple/20 rounded-xl p-4">
            <div className="font-mono text-xs text-es-purple mb-1">Step 1</div>
            <div className="text-sm text-text-dim">
              _id = <strong className="text-text">&quot;abc123&quot;</strong>
            </div>
            <div className="text-xs text-text-dim mt-1">문서 ID 확인</div>
          </div>
          <div className="bg-es-blue/[0.08] border border-es-blue/20 rounded-xl p-4">
            <div className="font-mono text-xs text-es-blue mb-1">Step 2</div>
            <div className="text-sm text-text-dim">
              hash = <strong className="text-text">7</strong>
            </div>
            <div className="text-xs text-text-dim mt-1">해시 함수 적용</div>
          </div>
          <div className="bg-es-green/[0.08] border border-es-green/20 rounded-xl p-4">
            <div className="font-mono text-xs text-es-green mb-1">Step 3</div>
            <div className="text-sm text-text-dim">
              7 % 5 = <strong className="text-text">Shard 2</strong>
            </div>
            <div className="text-xs text-text-dim mt-1">샤드 번호 결정</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FailoverVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">노드 장애 시 Replica 승격 과정</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1 mb-8">
        Node 2가 다운되었을 때의 자동 복구 흐름
      </div>

      <div className="max-w-[700px] mx-auto space-y-6">
        {/* Step 1: Failure Detection */}
        <div className="flex items-start gap-4">
          <div className="font-mono text-sm font-semibold bg-es-red/15 text-es-red w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1">
            1
          </div>
          <div className="bg-es-red/[0.06] border border-es-red/20 rounded-xl p-5 flex-1">
            <h4 className="font-mono text-sm text-es-red mb-1">장애 감지</h4>
            <p className="text-sm text-text-dim !mb-0">
              Master 노드가 Node 2의 <strong className="text-text">heartbeat 응답 없음</strong>을 감지합니다.
              기본 타임아웃은 30초이며, Node 2에 있던 <strong className="text-text">P2, P3, R0, R1</strong> 샤드가 사라집니다.
            </p>
          </div>
        </div>

        {/* Step 2: Status Change */}
        <div className="flex items-start gap-4">
          <div className="font-mono text-sm font-semibold bg-es-orange/15 text-es-orange w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1">
            2
          </div>
          <div className="bg-es-orange/[0.06] border border-es-orange/20 rounded-xl p-5 flex-1">
            <h4 className="font-mono text-sm text-es-orange mb-1">클러스터 상태 변경: Red</h4>
            <p className="text-sm text-text-dim !mb-0">
              P2, P3 Primary 샤드가 유실되어 클러스터 상태가 <strong className="text-text">Red</strong>로 바뀝니다.
              해당 샤드에 속한 문서는 일시적으로 검색/인덱싱이 불가합니다.
            </p>
          </div>
        </div>

        {/* Step 3: Replica Promotion */}
        <div className="flex items-start gap-4">
          <div className="font-mono text-sm font-semibold bg-es-blue/15 text-es-blue w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1">
            3
          </div>
          <div className="bg-es-blue/[0.06] border border-es-blue/20 rounded-xl p-5 flex-1">
            <h4 className="font-mono text-sm text-es-blue mb-1">Replica를 Primary로 승격</h4>
            <p className="text-sm text-text-dim !mb-0">
              Master 노드가 다른 노드에 있는 R2, R3 Replica를 <strong className="text-text">Primary로 승격</strong>시킵니다.
              데이터 손실 없이 모든 Primary 샤드가 복구됩니다. 클러스터 상태가 <strong className="text-text">Yellow</strong>로 변경됩니다.
            </p>
          </div>
        </div>

        {/* Step 4: Replica Reallocation */}
        <div className="flex items-start gap-4">
          <div className="font-mono text-sm font-semibold bg-es-green/15 text-es-green w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1">
            4
          </div>
          <div className="bg-es-green/[0.06] border border-es-green/20 rounded-xl p-5 flex-1">
            <h4 className="font-mono text-sm text-es-green mb-1">새 Replica 생성 → Green 복구</h4>
            <p className="text-sm text-text-dim !mb-0">
              남은 노드에 <strong className="text-text">새로운 Replica 샤드</strong>가 자동으로 생성됩니다.
              모든 Primary와 Replica가 정상 배치되면 클러스터 상태가 <strong className="text-text">Green</strong>으로 돌아옵니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SplitBrainVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">Split Brain 문제와 해결</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1 mb-8">
        네트워크 분리 시 두 개의 Master가 생기는 문제
      </div>

      <div className="max-w-[700px] mx-auto">
        {/* Split Brain scenario */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-es-red/[0.06] border border-es-red/20 rounded-xl p-5 text-center">
            <div className="font-mono text-xs text-es-red mb-2">네트워크 파티션 A</div>
            <div className="space-y-2">
              <div className="bg-es-purple/10 border border-es-purple/20 rounded-lg px-3 py-1.5">
                <span className="font-mono text-xs text-es-purple">Node 1 (Master)</span>
              </div>
              <div className="bg-es-green/10 border border-es-green/20 rounded-lg px-3 py-1.5">
                <span className="font-mono text-xs text-es-green">Node 2 (Data)</span>
              </div>
            </div>
          </div>
          <div className="bg-es-red/[0.06] border border-es-red/20 rounded-xl p-5 text-center">
            <div className="font-mono text-xs text-es-red mb-2">네트워크 파티션 B</div>
            <div className="space-y-2">
              <div className="bg-es-purple/10 border border-es-purple/20 rounded-lg px-3 py-1.5">
                <span className="font-mono text-xs text-es-purple">Node 3 (새 Master?!)</span>
              </div>
              <div className="bg-es-green/10 border border-es-green/20 rounded-lg px-3 py-1.5">
                <span className="font-mono text-xs text-es-green">Node 4 (Data)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-es-red mb-6">
          Master가 2개 → 데이터 불일치 발생!
        </div>

        {/* Solution */}
        <div className="bg-es-green/[0.06] border border-es-green/20 rounded-xl p-6">
          <h4 className="font-mono text-sm text-es-green mb-3 text-center">해결: Quorum 기반 Master 선출</h4>
          <div className="text-sm text-text-dim space-y-2">
            <p className="!mb-0">
              ES 7.0부터 <strong className="text-text">자동 Quorum</strong>이 적용됩니다. Master 후보 노드의 과반수(majority)가 동의해야만 새 Master를 선출할 수 있습니다.
            </p>
            <div className="font-mono text-xs bg-surface-2 rounded-lg px-4 py-3 border border-border mt-3">
              <span className="text-text-dim">Quorum = (master_eligible 노드 수 / 2) + 1</span><br />
              <span className="text-text-dim">예: master 후보 3개 → 최소 2개가 합의해야 선출 가능</span>
            </div>
            <p className="!mb-0 mt-2">
              따라서 <strong className="text-text">Master 후보 노드를 홀수(3, 5, 7...)로 구성</strong>하는 것이 권장됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClusterStatusCards() {
  return (
    <div className="grid grid-cols-3 gap-4 my-8 max-md:grid-cols-1">
      <div className="bg-es-green/[0.06] border border-es-green/20 rounded-xl p-5 text-center">
        <div className="text-2xl mb-2">&#x1F7E2;</div>
        <h4 className="font-mono text-sm text-es-green mb-2">Green</h4>
        <p className="text-sm text-text-dim !mb-0">
          모든 Primary + Replica 샤드가 정상 할당됨. <strong className="text-text">완전히 건강한 상태</strong>.
        </p>
      </div>
      <div className="bg-es-orange/[0.06] border border-es-orange/20 rounded-xl p-5 text-center">
        <div className="text-2xl mb-2">&#x1F7E1;</div>
        <h4 className="font-mono text-sm text-es-orange mb-2">Yellow</h4>
        <p className="text-sm text-text-dim !mb-0">
          모든 Primary는 정상이지만 일부 Replica가 미할당. <strong className="text-text">데이터는 안전하지만 가용성이 낮음</strong>.
        </p>
      </div>
      <div className="bg-es-red/[0.06] border border-es-red/20 rounded-xl p-5 text-center">
        <div className="text-2xl mb-2">&#x1F534;</div>
        <h4 className="font-mono text-sm text-es-red mb-2">Red</h4>
        <p className="text-sm text-text-dim !mb-0">
          일부 Primary 샤드가 미할당. <strong className="text-text">데이터 유실 위험, 일부 인덱스 사용 불가</strong>.
        </p>
      </div>
    </div>
  );
}

/* ─── Main chapter content ─── */

export default function Chapter09() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: 노드 역할 ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>노드의 역할<br />— 클러스터를 구성하는 4가지 노드</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          Elasticsearch 클러스터는 여러 대의 <strong className="text-text">노드(Node)</strong>로 구성됩니다. 각 노드는 하나 이상의 <strong className="text-text">역할(Role)</strong>을 갖고 있으며, 역할에 따라 하는 일이 완전히 다릅니다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          소규모 클러스터에서는 한 노드가 여러 역할을 겸하지만, <span className="text-accent font-medium">프로덕션 환경</span>에서는 역할별로 전용 노드를 분리하는 것이 안정적입니다.
        </p>

        <ClusterArchitectureDiagram />

        <NodeRoleCards />

        <ExplainCallout title="실무 구성 패턴">
          <ul>
            <li><strong>개발/테스트</strong>: 단일 노드가 모든 역할 수행 (기본 설정)</li>
            <li><strong>소규모 프로덕션 (3노드)</strong>: 모든 노드가 Master + Data 겸임. 최소 3개로 Master 선출 안정성 확보</li>
            <li><strong>중규모 프로덕션</strong>: Master 전용 3대 + Data 노드 N대 + Coordinating 전용 2대</li>
            <li><strong>대규모 프로덕션</strong>: 역할별 완전 분리. Hot-Warm-Cold 티어링으로 Data 노드도 세분화</li>
          </ul>
        </ExplainCallout>

        <QaBox question="노드 하나에 역할을 여러 개 줘도 되나요?">
          <p>네, 가능합니다. 기본 설정에서는 모든 노드가 <strong>master + data + ingest + coordinating</strong> 역할을 모두 수행합니다.</p>
          <p>하지만 프로덕션에서는 역할을 분리하는 것이 좋습니다. 예를 들어, Data 노드에서 무거운 집계를 처리하는 동안 같은 노드의 Master 역할이 영향을 받으면 클러스터 전체가 불안정해질 수 있습니다.</p>
        </QaBox>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 이론: 샤드 전략 ═══════ */}
      <Section>
        <SectionLabel>Part 2 · Theory</SectionLabel>
        <SectionTitle>샤드 전략<br />— Primary vs Replica</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          Elasticsearch에서 데이터는 <strong className="text-text">샤드(Shard)</strong> 단위로 분산 저장됩니다. 인덱스를 만들면 데이터가 여러 조각(샤드)으로 나뉘어 여러 노드에 분배되는 것이죠.
        </p>

        <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
          <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all hover:-translate-y-1 hover:border-es-blue">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-cyan" />
            <div className="font-mono text-lg mb-2 text-es-blue">Primary Shard</div>
            <p className="text-sm text-text-dim mb-3">데이터의 <strong className="text-text">원본</strong>을 저장하는 샤드</p>
            <ul className="text-sm text-text-dim space-y-1">
              <li>&#x2022; 인덱싱(쓰기) 요청은 반드시 Primary에 먼저 기록</li>
              <li>&#x2022; 인덱스 생성 후 <strong className="text-text">수를 변경할 수 없음</strong></li>
              <li>&#x2022; 기본값: 1개 (ES 7.0 이후)</li>
            </ul>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all hover:-translate-y-1 hover:border-es-orange">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-orange to-es-red" />
            <div className="font-mono text-lg mb-2 text-es-orange">Replica Shard</div>
            <p className="text-sm text-text-dim mb-3">Primary의 <strong className="text-text">복제본</strong>을 저장하는 샤드</p>
            <ul className="text-sm text-text-dim space-y-1">
              <li>&#x2022; 읽기(검색) 요청을 분산 처리하여 성능 향상</li>
              <li>&#x2022; Primary 장애 시 자동으로 Primary로 <strong className="text-text">승격</strong></li>
              <li>&#x2022; 언제든 수를 동적으로 변경 가능</li>
            </ul>
          </div>
        </div>

        <ShardVisual />

        <ExplainCallout title="샤드 수 결정 기준">
          <ul>
            <li><strong>Primary 샤드 수</strong>: 데이터 크기와 노드 수를 고려합니다. 경험적으로 샤드 하나의 크기가 <strong>10~50GB</strong>가 되도록 설정하는 것이 권장됩니다.</li>
            <li><strong>Replica 수</strong>: 가용성 요구사항에 따라 결정합니다. 기본값 1이면 노드 1대 장애를 견딜 수 있습니다.</li>
            <li><strong>너무 많은 샤드</strong>: 각 샤드는 메모리와 파일 핸들을 소모합니다. 수천 개의 작은 샤드는 오히려 성능을 저하시킵니다.</li>
            <li><strong>너무 적은 샤드</strong>: 수평 확장이 어려워집니다. 노드를 추가해도 샤드가 분산되지 않을 수 있습니다.</li>
          </ul>
        </ExplainCallout>

        <RoutingVisual />

        <WarnCallout title="Primary 샤드 수는 변경 불가!">
          <p>인덱스를 생성한 후에는 Primary 샤드 수를 변경할 수 없습니다. 라우팅 공식에서 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">number_of_primary_shards</code>가 바뀌면 기존 문서의 위치가 달라지기 때문입니다. 변경이 필요하면 <strong className="text-text">Reindex API</strong>로 새 인덱스에 데이터를 복사해야 합니다.</p>
        </WarnCallout>

        <QaBox question="싱글 노드에서 Replica가 할당되지 않는 이유는?">
          <p>Primary와 Replica는 <strong>같은 노드에 배치할 수 없습니다.</strong> 같은 노드에 두면 그 노드가 죽었을 때 원본과 복제본이 함께 사라지기 때문이에요. 그래서 싱글 노드 환경에서는 Replica가 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">unassigned</code> 상태가 되고, 클러스터 상태가 <strong>Yellow</strong>로 표시됩니다.</p>
        </QaBox>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: _cat API로 클러스터 모니터링 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: _cat API로<br />클러스터 모니터링하기</SectionTitle>

        <LabBanner icon="&#x1F50D;" title="사전 조건">
          Elasticsearch가 실행 중이어야 합니다. 이전 챕터에서 만든 인덱스가 있으면 더 유용한 결과를 볼 수 있어요.
        </LabBanner>

        {/* Step 1: _cat/health */}
        <LabStep num={1} title="_cat/health — 클러스터 상태 확인" tags={["kibana"]}>
          <p>클러스터의 전반적인 건강 상태를 확인합니다. 가장 먼저 확인해야 할 API입니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /_cat/health?v`}>
            <Kw>GET</Kw> <Url>/_cat/health?v</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`epoch      timestamp cluster       status `}<Hl>node.total</Hl>{` node.data shards  pri relo init unassign
1710000000 12:00:00  elasticsearch `}<Hl>green</Hl>{`  1          1         10      5  0    0    0`}
          </ExpectedOutput>

          <ExplainCallout title="응답 필드 설명">
            <ul>
              <li><strong>status</strong>: 클러스터 상태 — green / yellow / red (아래 설명 참고)</li>
              <li><strong>node.total</strong>: 전체 노드 수</li>
              <li><strong>node.data</strong>: Data 노드 수</li>
              <li><strong>shards</strong>: 전체 샤드 수 (Primary + Replica)</li>
              <li><strong>pri</strong>: Primary 샤드 수</li>
              <li><strong>unassign</strong>: 미할당 샤드 수 (0이 아니면 주의!)</li>
              <li><strong>?v</strong>: verbose — 헤더를 포함하여 읽기 쉽게 출력</li>
            </ul>
          </ExplainCallout>

          <ClusterStatusCards />

          <QaBox question="싱글 노드에서 Yellow가 나오는데 문제인가요?">
            <p>개발 환경에서는 정상입니다. 싱글 노드에서는 Replica를 할당할 다른 노드가 없으므로 항상 Yellow가 됩니다. <strong>프로덕션에서 Yellow가 나오면</strong> 노드 장애나 디스크 부족 등을 확인해야 합니다.</p>
          </QaBox>

          <Checkpoint>status 컬럼에 green 또는 yellow가 보이면 성공! red면 문제가 있으니 확인이 필요합니다.</Checkpoint>
        </LabStep>

        {/* Step 2: _cat/nodes */}
        <LabStep num={2} title="_cat/nodes — 노드 목록과 리소스 사용량" tags={["kibana"]}>
          <p>클러스터를 구성하는 각 노드의 상세 정보를 확인합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /_cat/nodes?v&h=name,ip,role,heap.percent,ram.percent,cpu,load_1m,node.role`}>
            <Kw>GET</Kw> <Url>/_cat/nodes?v&amp;h=name,ip,role,heap.percent,ram.percent,cpu,load_1m,node.role</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`name          ip        role   heap.percent ram.percent cpu load_1m node.role
`}<Hl>es-node-1</Hl>{`     172.18.0.2 cdfhilmrstw `}<Hl>35</Hl>{`           72      8  0.45    cdfhilmrstw`}
          </ExpectedOutput>

          <ExplainCallout title="주요 컬럼 설명">
            <ul>
              <li><strong>name</strong>: 노드 이름</li>
              <li><strong>role</strong>: 노드 역할 약자 — <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">m</code>(master), <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">d</code>(data), <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">i</code>(ingest) 등</li>
              <li><strong>heap.percent</strong>: JVM 힙 메모리 사용률 (75% 이상이면 주의)</li>
              <li><strong>ram.percent</strong>: OS 메모리 사용률</li>
              <li><strong>cpu</strong>: CPU 사용률</li>
              <li><strong>load_1m</strong>: 1분 평균 부하</li>
              <li><strong>?h=...</strong>: 출력할 컬럼을 직접 선택하는 옵션</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>노드 이름, IP, 역할, 리소스 사용량이 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 3: _cat/indices */}
        <LabStep num={3} title="_cat/indices — 인덱스 목록과 상태" tags={["kibana"]}>
          <p>클러스터에 존재하는 모든 인덱스의 상태, 문서 수, 크기를 한눈에 확인합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /_cat/indices?v&s=index`}>
            <Kw>GET</Kw> <Url>/_cat/indices?v&amp;s=index</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`health status index    uuid                   pri rep docs.count docs.deleted store.size pri.store.size
`}<Hl>green</Hl>{`  open   products Ax1b2c3d4e5f6g7h8i9j0k 1   1   `}<Hl>5</Hl>{`          0            12.3kb     12.3kb
green  open   reviews  Bx1b2c3d4e5f6g7h8i9j0k 1   1   3          0            8.1kb      8.1kb`}
          </ExpectedOutput>

          <ExplainCallout title="주요 컬럼 설명">
            <ul>
              <li><strong>health</strong>: 해당 인덱스의 상태 (green/yellow/red)</li>
              <li><strong>status</strong>: open 또는 close</li>
              <li><strong>pri</strong>: Primary 샤드 수</li>
              <li><strong>rep</strong>: Replica 수</li>
              <li><strong>docs.count</strong>: 총 문서 수</li>
              <li><strong>store.size</strong>: 전체 저장 크기 (Primary + Replica)</li>
              <li><strong>?s=index</strong>: 인덱스 이름순으로 정렬</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>이전 챕터에서 만든 인덱스들(products, reviews 등)이 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 4: _cat/shards */}
        <LabStep num={4} title="_cat/shards — 샤드 분배 확인" tags={["kibana"]}>
          <p>각 인덱스의 샤드가 어느 노드에 분배되어 있는지 확인합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /_cat/shards?v&s=index`}>
            <Kw>GET</Kw> <Url>/_cat/shards?v&amp;s=index</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`index    shard prirep state   docs store ip         node
products `}<Hl>0</Hl>{`     `}<Hl>p</Hl>{`      STARTED `}<Hl>5</Hl>{`    12.3kb 172.18.0.2 es-node-1
products 0     r      STARTED 5    12.3kb 172.18.0.3 es-node-2`}
          </ExpectedOutput>

          <ExplainCallout title="주요 컬럼 설명">
            <ul>
              <li><strong>shard</strong>: 샤드 번호 (0부터 시작)</li>
              <li><strong>prirep</strong>: <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">p</code>(Primary) 또는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">r</code>(Replica)</li>
              <li><strong>state</strong>: STARTED(정상), RELOCATING(이동 중), INITIALIZING(초기화 중), UNASSIGNED(미할당)</li>
              <li><strong>node</strong>: 해당 샤드가 배치된 노드 이름</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="UNASSIGNED 샤드 발견 시">
            <p>state가 UNASSIGNED인 샤드가 있다면 할당에 문제가 있는 것입니다. <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">GET /_cluster/allocation/explain</code>으로 원인을 확인할 수 있습니다. 싱글 노드에서의 Replica UNASSIGNED는 정상이니 걱정하지 마세요.</p>
          </WarnCallout>

          <Checkpoint>각 샤드의 Primary/Replica 구분과 배치된 노드가 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 5: _cluster/stats */}
        <LabStep num={5} title="_cluster/stats — 클러스터 전체 통계" tags={["kibana"]}>
          <p>클러스터의 종합적인 통계를 JSON 형태로 확인합니다. _cat API보다 훨씬 상세한 정보를 제공합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /_cluster/stats?human&pretty`}>
            <Kw>GET</Kw> <Url>/_cluster/stats?human&amp;pretty</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심 부분)">
            {`{
  "cluster_name": "elasticsearch",
  "status": `}<Hl>&quot;green&quot;</Hl>{`,
  "indices": {
    "count": `}<Hl>2</Hl>{`,
    "shards": {
      "total": 4,
      "primaries": 2
    },
    "docs": {
      "count": `}<Hl>8</Hl>{`
    },
    "store": {
      "size": "20.4kb"
    }
  },
  "nodes": {
    "count": {
      "total": `}<Hl>1</Hl>{`,
      "data": 1,
      "master": 1,
      "ingest": 1
    }
  }
}`}
          </ExpectedOutput>

          <ExplainCallout title="_cat vs _cluster API 비교">
            <ul>
              <li><strong>_cat API</strong>: 사람이 읽기 좋은 텍스트 형태. 터미널에서 빠르게 확인할 때 유용합니다.</li>
              <li><strong>_cluster API</strong>: JSON 형태로 상세 정보 제공. 모니터링 도구나 스크립트에서 파싱하기 좋습니다.</li>
              <li><strong>?human</strong>: 바이트 수를 사람이 읽기 쉬운 형태(KB, MB)로 변환합니다.</li>
              <li><strong>?pretty</strong>: JSON을 보기 좋게 들여쓰기합니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="실무에서는 어떤 모니터링 도구를 쓰나요?">
            <p>_cat API는 빠른 확인에 유용하지만, 실무에서는 보통 전문 모니터링 도구를 함께 사용합니다:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li><strong>Kibana Stack Monitoring</strong>: Elastic Stack 기본 제공. 노드별 CPU, 메모리, 인덱싱 속도 등 시각화</li>
              <li><strong>Grafana + Prometheus</strong>: elasticsearch-exporter를 사용하여 메트릭 수집</li>
              <li><strong>Datadog, New Relic</strong>: 클라우드 기반 통합 모니터링</li>
            </ul>
          </QaBox>

          <Checkpoint>클러스터 이름, 상태, 인덱스/노드 통계가 JSON으로 보이면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 이론: 장애 복구 ═══════ */}
      <Section>
        <SectionLabel>Part 4 · Theory</SectionLabel>
        <SectionTitle>장애 복구<br />— Split Brain과 자동 복구</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          분산 시스템에서 가장 중요한 것은 <strong className="text-text">장애 상황에서의 대응</strong>입니다. Elasticsearch는 노드 장애 시 자동으로 샤드를 재배치하고, Replica를 Primary로 승격시켜 서비스를 유지합니다.
        </p>

        <FailoverVisual />

        <ExplainCallout title="자동 복구의 핵심 포인트">
          <ul>
            <li>Replica가 있으면 데이터 손실 <strong>없이</strong> 자동 복구됩니다</li>
            <li>복구 과정에서 클러스터 상태가 <strong>Red → Yellow → Green</strong>으로 변화합니다</li>
            <li>Replica가 없는 인덱스(number_of_replicas: 0)는 노드 장애 시 <strong>데이터가 유실</strong>됩니다</li>
            <li>새 Replica 생성 시 네트워크를 통해 데이터를 복제하므로 <strong>일시적으로 부하가 증가</strong>합니다</li>
          </ul>
        </ExplainCallout>

        <SplitBrainVisual />

        <ExplainCallout title="Split Brain 방지 실무 가이드">
          <ul>
            <li><strong>ES 7.0+</strong>에서는 자동 Quorum이 적용되어 별도 설정이 필요 없습니다</li>
            <li>Master 후보 노드는 <strong>최소 3대, 홀수</strong>로 구성하세요</li>
            <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">cluster.initial_master_nodes</code>는 최초 클러스터 부트스트랩에만 사용됩니다</li>
            <li>네트워크 파티션 발생 시, 과반수를 확보하지 못한 파티션의 노드들은 <strong>스스로 Master를 선출하지 않고</strong> 재연결을 기다립니다</li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="프로덕션 필수 설정">
          <p>운영 환경에서 반드시 확인해야 할 항목들입니다:</p>
          <ul className="list-disc pl-5 text-sm text-text-dim my-2">
            <li>Master 후보 노드 최소 3대 (네트워크 분리 대응)</li>
            <li>모든 인덱스에 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">number_of_replicas: 1</code> 이상 설정</li>
            <li>Primary와 Replica가 <strong>같은 랙/존에 배치되지 않도록</strong> Shard Allocation Awareness 설정</li>
            <li>정기적으로 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">_cat/health</code>와 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">_cat/shards</code>를 모니터링</li>
          </ul>
        </WarnCallout>

        <QaBox question="노드를 추가하면 기존 샤드가 자동으로 재배치되나요?">
          <p><strong>네, 자동으로 재배치(Rebalancing)됩니다.</strong> Elasticsearch는 클러스터에 새 노드가 합류하면 샤드를 균등하게 분배하려고 시도합니다. 이 과정에서 기존 노드의 샤드 일부가 새 노드로 이동하게 됩니다.</p>
          <p>다만, 대량의 데이터 이동은 네트워크와 디스크 I/O 부하를 일으키므로, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">cluster.routing.allocation.cluster_concurrent_rebalance</code> 설정으로 동시 이동 샤드 수를 제어할 수 있습니다.</p>
        </QaBox>

        <QaBox question="Shard Allocation Awareness가 뭔가요?">
          <p>클라우드 환경에서 <strong>같은 가용 영역(AZ)에 Primary와 Replica가 함께 있으면</strong>, 해당 AZ 전체가 다운될 때 데이터가 유실될 수 있습니다.</p>
          <p>Shard Allocation Awareness는 노드에 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">rack_id</code>나 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">zone</code> 같은 속성을 부여하고, <strong>Primary와 Replica가 서로 다른 영역에 배치되도록</strong> 강제하는 기능입니다. AWS, GCP 같은 멀티 AZ 환경에서는 필수 설정입니다.</p>
        </QaBox>
      </Section>
    </>
  );
}

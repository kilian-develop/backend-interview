
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal, Cm } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";
import CodeSnippet from "@/components/es/content/CodeSnippet";

/* ───────── Chapter-specific inline visuals ───────── */

function LifecycleDiagram() {
  const stages: {
    key: string;
    label: string;
    sub: string;
    color: string;
    bg: string;
    border: string;
  }[] = [
    { key: "create", label: "생성", sub: "Create Index\nMapping & Settings", color: "text-es-green", bg: "bg-es-green/10", border: "border-es-green/30" },
    { key: "operate", label: "운영", sub: "Alias & Template\nReindex", color: "text-es-blue", bg: "bg-es-blue/10", border: "border-es-blue/30" },
    { key: "shrink", label: "축소", sub: "Shrink & Rollover\nForce Merge", color: "text-es-orange", bg: "bg-es-orange/10", border: "border-es-orange/30" },
    { key: "delete", label: "삭제", sub: "Delete Index\nILM Policy", color: "text-es-red", bg: "bg-es-red/10", border: "border-es-red/30" },
  ];

  return (
    <div className="flex items-center justify-center gap-3 my-10 flex-wrap">
      {stages.map((s, i) => (
        <div key={s.key} className="flex items-center gap-3">
          <div className={`${s.bg} border ${s.border} rounded-2xl px-6 py-5 text-center min-w-[140px] transition-all hover:-translate-y-1`}>
            <div className={`font-mono text-xs font-semibold ${s.color} mb-1`}>STEP {i + 1}</div>
            <div className={`text-lg font-bold ${s.color} mb-2`}>{s.label}</div>
            <div className="text-xs text-text-dim whitespace-pre-line leading-relaxed">{s.sub}</div>
          </div>
          {i < stages.length - 1 && (
            <div className="text-text-dim text-xl font-light max-md:hidden">&rarr;</div>
          )}
        </div>
      ))}
    </div>
  );
}

function IlmDiagram() {
  const phases: {
    key: string;
    label: string;
    desc: string;
    color: string;
    bg: string;
    border: string;
    icon: string;
  }[] = [
    { key: "hot", label: "Hot", desc: "활발한 쓰기/읽기\n최신 데이터 저장\n고성능 SSD", color: "text-es-red", bg: "bg-es-red/10", border: "border-es-red/30", icon: "\uD83D\uDD25" },
    { key: "warm", label: "Warm", desc: "읽기 위주\n덜 자주 접근\nHDD로 이동 가능", color: "text-es-orange", bg: "bg-es-orange/10", border: "border-es-orange/30", icon: "\u2600\uFE0F" },
    { key: "cold", label: "Cold", desc: "거의 접근하지 않음\n최소 리소스\n압축 & 읽기전용", color: "text-es-blue", bg: "bg-es-blue/10", border: "border-es-blue/30", icon: "\u2744\uFE0F" },
    { key: "delete", label: "Delete", desc: "보관 기간 만료\n인덱스 완전 삭제\n스토리지 확보", color: "text-es-purple", bg: "bg-es-purple/10", border: "border-es-purple/30", icon: "\uD83D\uDDD1\uFE0F" },
  ];

  return (
    <div className="my-10">
      <div className="flex items-stretch justify-center gap-3 flex-wrap">
        {phases.map((p, i) => (
          <div key={p.key} className="flex items-center gap-3">
            <div className={`${p.bg} border ${p.border} rounded-2xl px-6 py-6 text-center min-w-[150px] transition-all hover:-translate-y-1`}>
              <div className="text-2xl mb-2">{p.icon}</div>
              <div className={`text-lg font-bold ${p.color} mb-2`}>{p.label}</div>
              <div className="text-xs text-text-dim whitespace-pre-line leading-relaxed">{p.desc}</div>
            </div>
            {i < phases.length - 1 && (
              <div className="text-text-dim text-xl font-light max-md:hidden">&rarr;</div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-6 text-sm text-text-dim">
        시간이 지남에 따라 데이터는 <strong className="text-text">Hot</strong>에서 <strong className="text-text">Delete</strong>로 자동 이동합니다
      </div>
    </div>
  );
}

export default function Chapter06() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: 인덱스 생명주기 개요 ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>인덱스 생명주기 개요<br />— 생성부터 삭제까지</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          지금까지 인덱스를 <strong className="text-text">생성</strong>하고 문서를 <strong className="text-text">검색</strong>하는 방법을 배웠습니다. 하지만 실제 운영 환경에서는 인덱스의 <span className="text-accent font-medium">전체 생명주기</span>를 관리해야 합니다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          매핑이 변경되면? 인덱스를 교체해야 하면? 오래된 데이터는 어떻게 정리하지? 이 챕터에서 <strong className="text-text">인덱스를 프로답게 관리하는 방법</strong>을 배워봅시다.
        </p>

        <LifecycleDiagram />

        <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-green">
            <div className="font-mono text-sm font-semibold text-es-green mb-2">Alias (별칭)</div>
            <p className="text-sm text-text-dim mb-0">인덱스에 별명을 붙여 <strong className="text-text">무중단으로 인덱스를 교체</strong>할 수 있습니다. 클라이언트는 항상 같은 이름으로 접근하죠.</p>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-blue">
            <div className="font-mono text-sm font-semibold text-es-blue mb-2">Index Template</div>
            <p className="text-sm text-text-dim mb-0">패턴에 맞는 인덱스가 생성될 때 <strong className="text-text">매핑과 설정을 자동 적용</strong>합니다. 로그 인덱스 관리에 필수입니다.</p>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-orange">
            <div className="font-mono text-sm font-semibold text-es-orange mb-2">Reindex API</div>
            <p className="text-sm text-text-dim mb-0">기존 인덱스의 데이터를 <strong className="text-text">새 인덱스로 복사/마이그레이션</strong>합니다. 매핑 변경이 필요할 때 필수입니다.</p>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-purple">
            <div className="font-mono text-sm font-semibold text-es-purple mb-2">ILM (Index Lifecycle Management)</div>
            <p className="text-sm text-text-dim mb-0"><strong className="text-text">시간 기반으로 인덱스를 자동 관리</strong>합니다. Hot → Warm → Cold → Delete 정책을 설정하죠.</p>
          </div>
        </div>

        <ExplainCallout title="왜 인덱스 관리가 중요할까?">
          <ul>
            <li>Elasticsearch는 <strong>매핑을 한번 설정하면 변경이 어렵습니다</strong> — 필드 타입을 바꾸려면 인덱스 재생성이 필요해요</li>
            <li>서비스 중단 없이 인덱스를 교체하려면 <strong>Alias</strong>가 필수입니다</li>
            <li>로그처럼 시간 기반 데이터는 <strong>Template</strong>과 <strong>ILM</strong>으로 자동화해야 합니다</li>
            <li>데이터가 계속 쌓이면 스토리지 비용이 기하급수적으로 늘어나요</li>
          </ul>
        </ExplainCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: Alias (인덱스 별칭) ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Alias<br />— 인덱스에 별명 붙이기</SectionTitle>

        <LabBanner icon="&#x1F3F7;&#xFE0F;" title="Alias란?">
          인덱스의 별칭(별명)입니다. 클라이언트는 실제 인덱스 이름 대신 Alias를 사용하여 접근합니다. 인덱스가 바뀌어도 Alias만 변경하면 클라이언트 코드를 수정할 필요가 없어요.
        </LabBanner>

        {/* Step 1: Alias 생성 및 사용 */}
        <LabStep num={1} title="Alias 생성 및 사용" tags={["kibana"]}>
          <p>먼저 이전 챕터에서 만든 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products</code> 인덱스를 삭제합니다. 이 챕터에서는 <strong>버전 관리된 인덱스 + Alias</strong> 방식으로 새로 구성할 것이기 때문입니다.</p>

          <WarnCallout title="기존 products 인덱스 삭제 필요">
            <p>Alias 이름과 동일한 인덱스가 이미 존재하면 충돌이 발생합니다. 아래 명령어로 기존 인덱스를 먼저 삭제하세요. (이전 챕터의 reviews 인덱스는 유지됩니다)</p>
          </WarnCallout>

          <CmdBlock label="KIBANA DEV TOOLS — 기존 인덱스 삭제" copyText="DELETE /products">
            <Kw>DELETE</Kw> <Url>/products</Url>
          </CmdBlock>

          <p>이제 테스트용 인덱스 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products_v1</code>을 생성하고, 여기에 <strong>products</strong>라는 Alias를 연결합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 인덱스 생성" copyText={`PUT /products_v1\n{\n  "mappings": {\n    "properties": {\n      "name": { "type": "text" },\n      "price": { "type": "integer" },\n      "category": { "type": "keyword" }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/products_v1</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;price&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;category&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>데이터를 넣어봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 문서 추가" copyText={`POST /products_v1/_doc/1\n{\n  "name": "맥북 프로 16",\n  "price": 3490000,\n  "category": "노트북"\n}`}>
            <Kw>POST</Kw> <Url>/products_v1/_doc/1</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;맥북 프로 16&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;price&quot;</JKey>: <JVal>3490000</JVal>,{"\n"}
            {"  "}<JKey>&quot;category&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <p>이제 <strong>Alias</strong>를 생성합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Alias 생성" copyText={`POST /_aliases\n{\n  "actions": [\n    {\n      "add": {\n        "index": "products_v1",\n        "alias": "products"\n      }\n    }\n  ]\n}`}>
            <Kw>POST</Kw> <Url>/_aliases</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;actions&quot;</JKey>: [{"\n"}
            {"    {"}{"\n"}
            {"      "}<JKey>&quot;add&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;index&quot;</JKey>: <JStr>&quot;products_v1&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;alias&quot;</JKey>: <JStr>&quot;products&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  ]"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>이제 <strong>Alias를 통해</strong> 검색해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Alias로 검색" copyText={`GET /products/_search`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": {
    "total": { "value": `}<Hl>1</Hl>{` },
    "hits": [
        {
            "_index": `}<Hl>&quot;products_v1&quot;</Hl>{`,
            "_id": "1",
            "_source": {
                "name": "맥북 프로 16",
                "price": 3490000,
                "category": "노트북"
            }
        }
    ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="Alias의 핵심 포인트">
            <ul>
              <li><strong>_index</strong>는 실제 인덱스인 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products_v1</code>을 보여줍니다</li>
              <li>하지만 요청은 <strong>products</strong>(Alias)로 했습니다 — 클라이언트는 실제 인덱스 이름을 몰라도 됩니다</li>
              <li>Alias는 <strong>가상의 포인터</strong>입니다 — 데이터를 복사하지 않아요</li>
              <li>하나의 Alias가 <strong>여러 인덱스를 가리킬 수도 있고</strong>, 하나의 인덱스에 <strong>여러 Alias를 붙일 수도</strong> 있습니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>GET /products/_search 로 products_v1의 문서가 검색되면 성공!</Checkpoint>
        </LabStep>

        {/* Step 2: 무중단 인덱스 교체 */}
        <LabStep num={2} title="무중단 인덱스 교체 (Alias 전환)" tags={["kibana"]}>
          <p>이제 핵심입니다. 매핑이 변경되어 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products_v2</code>를 새로 만들어야 하는 상황을 가정합시다. <strong>서비스 중단 없이</strong> Alias를 전환합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 새 인덱스 생성" copyText={`PUT /products_v2\n{\n  "mappings": {\n    "properties": {\n      "name": { "type": "text" },\n      "price": { "type": "integer" },\n      "category": { "type": "keyword" },\n      "brand": { "type": "keyword" }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/products_v2</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;price&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;category&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;brand&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"} <Cm>// 새로 추가된 필드</Cm>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>새 인덱스에 데이터를 넣습니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 새 인덱스에 문서 추가" copyText={`POST /products_v2/_doc/1\n{\n  "name": "맥북 프로 16",\n  "price": 3490000,\n  "category": "노트북",\n  "brand": "Apple"\n}`}>
            <Kw>POST</Kw> <Url>/products_v2/_doc/1</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;맥북 프로 16&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;price&quot;</JKey>: <JVal>3490000</JVal>,{"\n"}
            {"  "}<JKey>&quot;category&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;brand&quot;</JKey>: <JStr>&quot;Apple&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <WarnCallout title="Alias 전환은 데이터를 옮기지 않습니다">
            <p>Alias는 <strong>포인터만 전환</strong>하는 것입니다. products_v1의 데이터가 products_v2로 복사되지 않습니다. 실무에서는 <strong>_reindex로 데이터를 먼저 옮긴 뒤</strong> Alias를 전환합니다 (Step 5에서 다룹니다). 여기서는 Alias 전환 자체를 이해하기 위해 새 인덱스에 직접 데이터를 넣었습니다.</p>
          </WarnCallout>

          <p>이제 <strong>원자적(atomic)</strong>으로 Alias를 전환합니다. remove와 add가 <strong>하나의 요청</strong>에서 동시에 실행됩니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Alias 전환 (원자적)" copyText={`POST /_aliases\n{\n  "actions": [\n    { "remove": { "index": "products_v1", "alias": "products" } },\n    { "add":    { "index": "products_v2", "alias": "products" } }\n  ]\n}`}>
            <Kw>POST</Kw> <Url>/_aliases</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;actions&quot;</JKey>: [{"\n"}
            {"    "}{"{ "}<JKey>&quot;remove&quot;</JKey>: {"{ "}<JKey>&quot;index&quot;</JKey>: <JStr>&quot;products_v1&quot;</JStr>, <JKey>&quot;alias&quot;</JKey>: <JStr>&quot;products&quot;</JStr>{" } }"},{"\n"}
            {"    "}{"{ "}<JKey>&quot;add&quot;</JKey>:{"    { "}<JKey>&quot;index&quot;</JKey>: <JStr>&quot;products_v2&quot;</JStr>, <JKey>&quot;alias&quot;</JKey>: <JStr>&quot;products&quot;</JStr>{" } }"}{"\n"}
            {"  ]"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>전환 확인을 해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Alias 확인" copyText={`GET /_alias/products`}>
            <Kw>GET</Kw> <Url>/_alias/products</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`{
    `}<Hl>&quot;products_v2&quot;</Hl>{`: {
        "aliases": {
            "products": {}
        }
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="무중단 교체의 핵심">
            <ul>
              <li><strong>actions 배열 안의 모든 작업은 원자적으로 실행됩니다</strong> — 중간에 Alias가 끊기는 순간이 없어요</li>
              <li>클라이언트는 여전히 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">GET /products/_search</code>를 사용합니다 — 코드 변경이 없습니다</li>
              <li>문제가 생기면 다시 <strong>v1으로 롤백</strong>할 수 있습니다 — 같은 방식으로 Alias만 바꾸면 됩니다</li>
              <li>이것이 Elasticsearch에서 <strong>Blue-Green 배포</strong>를 구현하는 방법입니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="실무에서 Alias는 어떤 네이밍 컨벤션을 쓰나요?">
            <p>일반적으로 <strong>실제 인덱스</strong>에는 버전을 붙이고(<code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products_v1</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products_v2</code>), <strong>Alias</strong>에는 깔끔한 이름을 사용합니다(<code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products</code>).</p>
            <p>애플리케이션 코드에서는 항상 Alias 이름만 사용하고, 실제 인덱스 이름은 운영팀만 알면 됩니다.</p>
          </QaBox>

          <Checkpoint>GET /_alias/products 결과에서 products_v2가 보이면 성공! Alias가 성공적으로 전환되었습니다.</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: Index Template ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Index Template<br />— 자동 매핑 & 설정 적용</SectionTitle>

        <LabBanner icon="&#x1F4CB;" title="Index Template이란?">
          특정 패턴의 이름으로 인덱스가 생성될 때, 미리 정의한 매핑과 설정을 자동으로 적용하는 기능입니다. 매일 생성되는 로그 인덱스에 필수적이에요.
        </LabBanner>

        {/* Step 3: Index Template 생성 */}
        <LabStep num={3} title="Index Template 생성" tags={["kibana"]}>
          <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs-*</code> 패턴에 매칭되는 인덱스가 생성될 때 자동으로 매핑과 설정이 적용되도록 Template을 만들어봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Index Template 생성" copyText={`PUT /_index_template/logs_template\n{\n  "index_patterns": ["logs-*"],\n  "priority": 200,\n  "template": {\n    "settings": {\n      "number_of_shards": 1,\n      "number_of_replicas": 1\n    },\n    "mappings": {\n      "properties": {\n        "timestamp": { "type": "date" },\n        "level": { "type": "keyword" },\n        "message": { "type": "text" },\n        "service": { "type": "keyword" },\n        "host": { "type": "keyword" }\n      }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/_index_template/logs_template</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;index_patterns&quot;</JKey>: [<JStr>&quot;logs-*&quot;</JStr>],{"\n"}
            {"  "}<JKey>&quot;priority&quot;</JKey>: <JVal>200</JVal>,{"\n"}
            {"  "}<JKey>&quot;template&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;settings&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;number_of_shards&quot;</JKey>: <JVal>1</JVal>,{"\n"}
            {"      "}<JKey>&quot;number_of_replicas&quot;</JKey>: <JVal>1</JVal>{"\n"}
            {"    }"},{"\n"}
            {"    "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;timestamp&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;date&quot;</JStr>{" }"},{"\n"}
            {"        "}<JKey>&quot;level&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"},{"\n"}
            {"        "}<JKey>&quot;message&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" }"},{"\n"}
            {"        "}<JKey>&quot;service&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"},{"\n"}
            {"        "}<JKey>&quot;host&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`{
    "acknowledged": `}<Hl>true</Hl>{`
}`}
          </ExpectedOutput>

          <ExplainCallout title="Template 설정 해석">
            <ul>
              <li><strong>index_patterns</strong> — <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs-*</code> 패턴에 매칭되는 모든 인덱스에 적용됩니다 (logs-2026.03, logs-api 등)</li>
              <li><strong>priority: 200</strong> — 여러 Template이 같은 패턴에 매칭되면 우선순위가 높은 것이 적용됩니다</li>
              <li><strong>settings</strong> — 샤드 수, 레플리카 수 등 인덱스 설정</li>
              <li><strong>mappings</strong> — 필드 타입을 미리 정의해두면 데이터가 들어올 때 올바른 타입으로 인덱싱됩니다</li>
            </ul>
          </ExplainCallout>

          <ExplainCallout title="priority를 200으로 설정한 이유">
            <p>ES 8.x에는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs</code>라는 <strong>빌트인 index template</strong>이 priority 100으로 등록되어 있습니다. 이 템플릿의 패턴(<code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs-*-*</code>)이 우리의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs-*</code> 패턴과 겹칠 수 있어서, <strong>같은 priority면 충돌 에러</strong>가 발생합니다.</p>
            <p>priority를 200으로 높이면 우리 템플릿이 빌트인보다 우선 적용되어 충돌 없이 동작합니다. 실무에서도 커스텀 템플릿은 빌트인보다 높은 priority를 사용하는 것이 일반적입니다.</p>
          </ExplainCallout>

          <Checkpoint>acknowledged: true 응답이 나오면 Template 생성 성공!</Checkpoint>
        </LabStep>

        {/* Step 4: Template 적용 확인 */}
        <LabStep num={4} title="Template이 적용되는지 확인" tags={["kibana"]}>
          <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs-*</code> 패턴에 맞는 인덱스를 생성하면 Template이 자동으로 적용됩니다. 별도로 매핑을 지정할 필요가 없어요!</p>

          <CmdBlock label="KIBANA DEV TOOLS — 로그 문서 추가 (인덱스 자동 생성)" copyText={`POST /logs-2026.03/_doc\n{\n  "timestamp": "2026-03-16T10:30:00",\n  "level": "ERROR",\n  "message": "데이터베이스 연결 실패",\n  "service": "order-api",\n  "host": "server-01"\n}`}>
            <Kw>POST</Kw> <Url>/logs-2026.03/_doc</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;timestamp&quot;</JKey>: <JStr>&quot;2026-03-16T10:30:00&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;level&quot;</JKey>: <JStr>&quot;ERROR&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;message&quot;</JKey>: <JStr>&quot;데이터베이스 연결 실패&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;service&quot;</JKey>: <JStr>&quot;order-api&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;host&quot;</JKey>: <JStr>&quot;server-01&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <p>이제 매핑을 확인해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 매핑 확인" copyText={`GET /logs-2026.03/_mapping`}>
            <Kw>GET</Kw> <Url>/logs-2026.03/_mapping</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`{
    "logs-2026.03": {
        "mappings": {
            "properties": {
                "timestamp": { "type": `}<Hl>&quot;date&quot;</Hl>{` },
                "level":     { "type": `}<Hl>&quot;keyword&quot;</Hl>{` },
                "message":   { "type": `}<Hl>&quot;text&quot;</Hl>{` },
                "service":   { "type": `}<Hl>&quot;keyword&quot;</Hl>{` },
                "host":      { "type": `}<Hl>&quot;keyword&quot;</Hl>{` }
            }
        }
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="Template 자동 적용 확인">
            <ul>
              <li><strong>timestamp</strong>가 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">date</code> 타입으로 설정되었습니다 — Template 없이는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">text</code>로 잡혔을 거예요</li>
              <li><strong>level, service, host</strong>가 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">keyword</code> 타입입니다 — 필터링과 집계에 최적화되어 있어요</li>
              <li>앞으로 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs-2026.04</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">logs-2026.05</code> 등을 만들어도 같은 매핑이 자동 적용됩니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="Template과 매핑을 직접 지정하는 것의 차이는?">
            <p>인덱스 생성 시 매핑을 직접 지정하면 해당 인덱스에만 적용됩니다. Template은 <strong>패턴에 맞는 모든 미래의 인덱스</strong>에 자동 적용됩니다.</p>
            <p>로그 데이터처럼 <strong>매일/매주/매월 새 인덱스를 생성</strong>하는 경우, 매번 매핑을 지정하는 것은 비현실적입니다. Template으로 한번 정의해두면 끝이에요.</p>
            <p>만약 인덱스 생성 시 별도 매핑을 지정하면, Template의 매핑과 <strong>병합(merge)</strong>됩니다. 충돌이 나면 인덱스 생성 시 지정한 값이 우선합니다.</p>
          </QaBox>

          <Checkpoint>logs-2026.03의 매핑에서 timestamp: date, level: keyword 등 Template에서 정의한 타입이 보이면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: Reindex API ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Reindex API<br />— 인덱스 마이그레이션</SectionTitle>

        <LabBanner icon="&#x1F504;" title="Reindex가 필요한 상황">
          매핑을 변경해야 하는데, Elasticsearch는 기존 필드의 타입을 바꿀 수 없습니다. 새 인덱스를 만들고 데이터를 복사해야 해요. 이때 Reindex API를 사용합니다.
        </LabBanner>

        {/* Step 5: Reindex로 인덱스 복사/마이그레이션 */}
        <LabStep num={5} title="Reindex로 인덱스 마이그레이션" tags={["kibana"]}>
          <p>시나리오: <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">products_v1</code>의 <strong>price 필드를 integer에서 long으로 변경</strong>해야 합니다. 기존 인덱스는 타입 변경이 불가하므로, 새 인덱스를 만들고 Reindex합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 새 매핑으로 인덱스 생성" copyText={`PUT /products_v3\n{\n  "mappings": {\n    "properties": {\n      "name": { "type": "text" },\n      "price": { "type": "long" },\n      "category": { "type": "keyword" },\n      "brand": { "type": "keyword" },\n      "description": { "type": "text" }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/products_v3</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;price&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;long&quot;</JStr>{" }"}, <Cm>// integer → long으로 변경</Cm>{"\n"}
            {"      "}<JKey>&quot;category&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;brand&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"},{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" }"} <Cm>// 새 필드 추가</Cm>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>이제 <strong>Reindex API</strong>로 products_v2의 데이터를 products_v3로 복사합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Reindex 실행" copyText={`POST /_reindex\n{\n  "source": {\n    "index": "products_v2"\n  },\n  "dest": {\n    "index": "products_v3"\n  }\n}`}>
            <Kw>POST</Kw> <Url>/_reindex</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;source&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;index&quot;</JKey>: <JStr>&quot;products_v2&quot;</JStr>{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;dest&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;index&quot;</JKey>: <JStr>&quot;products_v3&quot;</JStr>{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`{
    "took": ...,
    "timed_out": false,
    "total": `}<Hl>1</Hl>{`,
    "updated": 0,
    "created": `}<Hl>1</Hl>{`,
    "deleted": 0,
    "failures": []
}`}
          </ExpectedOutput>

          <p>복사가 잘 되었는지 확인합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 복사 확인" copyText={`GET /products_v3/_search`}>
            <Kw>GET</Kw> <Url>/products_v3/_search</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": {
    "total": { "value": `}<Hl>1</Hl>{` },
    "hits": [
        {
            "_index": `}<Hl>&quot;products_v3&quot;</Hl>{`,
            "_source": {
                "name": "맥북 프로 16",
                "price": 3490000,
                "category": "노트북",
                "brand": "Apple"
            }
        }
    ]
}`}
          </ExpectedOutput>

          <p>마지막으로 Alias를 products_v3로 전환하면 마이그레이션 완료입니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Alias를 v3로 전환" copyText={`POST /_aliases\n{\n  "actions": [\n    { "remove": { "index": "products_v2", "alias": "products" } },\n    { "add":    { "index": "products_v3", "alias": "products" } }\n  ]\n}`}>
            <Kw>POST</Kw> <Url>/_aliases</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;actions&quot;</JKey>: [{"\n"}
            {"    "}{"{ "}<JKey>&quot;remove&quot;</JKey>: {"{ "}<JKey>&quot;index&quot;</JKey>: <JStr>&quot;products_v2&quot;</JStr>, <JKey>&quot;alias&quot;</JKey>: <JStr>&quot;products&quot;</JStr>{" } }"},{"\n"}
            {"    "}{"{ "}<JKey>&quot;add&quot;</JKey>:{"    { "}<JKey>&quot;index&quot;</JKey>: <JStr>&quot;products_v3&quot;</JStr>, <JKey>&quot;alias&quot;</JKey>: <JStr>&quot;products&quot;</JStr>{" } }"}{"\n"}
            {"  ]"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="Reindex + Alias 전환 = 완벽한 마이그레이션">
            <ul>
              <li><strong>1단계:</strong> 새 매핑으로 인덱스 생성 (products_v3)</li>
              <li><strong>2단계:</strong> Reindex로 기존 데이터 복사</li>
              <li><strong>3단계:</strong> Alias 전환으로 무중단 교체</li>
              <li>이 패턴은 실무에서 <strong>매핑 변경, 분석기 변경, 샤드 수 조정</strong> 등에 사용됩니다</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="대용량 데이터 Reindex 시 주의사항">
            <p>수백만 건 이상의 데이터를 Reindex할 때는 시간이 오래 걸릴 수 있습니다. <strong>wait_for_completion=false</strong> 파라미터를 사용하면 백그라운드에서 비동기 실행이 가능합니다. 또한 <strong>slices</strong> 옵션으로 병렬 처리하면 속도를 높일 수 있어요.</p>
          </WarnCallout>

          <QaBox question="Reindex 중에 원본 인덱스에 새 데이터가 들어오면 어떻게 되나요?">
            <p>Reindex는 실행 시점의 <strong>스냅샷 기반</strong>으로 동작합니다. Reindex 시작 이후에 원본에 추가/수정된 데이터는 복사되지 않습니다.</p>
            <p>이 문제를 해결하는 세 가지 전략이 있습니다:</p>

            <p><strong>전략 1. 원본을 읽기 전용으로 설정</strong></p>
            <p>가장 간단하고 안전합니다. Reindex 전에 원본 인덱스의 쓰기를 막아 데이터 유실을 원천 차단합니다.</p>
            <CodeSnippet code={`PUT /products_v2/_settings
{ "index.blocks.write": true }`} />
            <p>단, write를 막는 동안 <strong>쓰기 요청이 실패</strong>하므로 다운타임이 발생합니다. 야간 배치나 트래픽이 없는 시간대에 적합합니다.</p>

            <p><strong>전략 2. 변경분만 다시 동기화</strong></p>
            <p>원본에 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">updated_at</code> 같은 타임스탬프 필드가 있을 때 사용합니다. 전체 Reindex 후, 시작 시각 이후 변경된 데이터만 다시 복사합니다.</p>
            <CodeSnippet code={`POST /_reindex
{
  "source": {
    "index": "products_v2",
    "query": {
      "range": {
        "updated_at": { "gte": "2026-03-17T10:00:00" }
      }
    }
  },
  "dest": { "index": "products_v3" }
}`} />
            <p>변경분 동기화를 반복하면서 차이를 줄이고, 마지막에 아주 짧은 write block으로 마무리합니다. 삭제된 문서는 추적이 안 되는 점에 주의하세요.</p>

            <p><strong>전략 3. Alias로 쓰기 방향을 먼저 전환 (무중단)</strong></p>
            <p>다운타임 없이 마이그레이션하는 가장 강력한 방법입니다. 핵심은 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">is_write_index</code>로 쓰기 방향을 먼저 새 인덱스로 바꾸는 것입니다.</p>
            <CodeSnippet code={`// 1) 쓰기를 새 인덱스로 전환, 읽기는 양쪽 모두
POST /_aliases
{
  "actions": [
    { "remove": { "index": "products_v2", "alias": "products" } },
    { "add": { "index": "products_v2", "alias": "products", "is_write_index": false } },
    { "add": { "index": "products_v3", "alias": "products", "is_write_index": true  } }
  ]
}`} />
            <CodeSnippet code={`// 2) 기존 데이터 복사 (새로 들어온 문서와 충돌 시 건너뜀)
POST /_reindex
{
  "conflicts": "proceed",
  "source": { "index": "products_v2" },
  "dest": { "index": "products_v3" }
}`} />
            <CodeSnippet code={`// 3) 복사 완료 후 v2 제거
POST /_aliases
{
  "actions": [
    { "remove": { "index": "products_v2", "alias": "products" } }
  ]
}`} />
            <p>이 방식의 핵심은 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">conflicts: &quot;proceed&quot;</code>입니다. Reindex 중에 v3에 이미 들어온 최신 데이터를 덮어쓰지 않고 건너뛰므로 데이터 유실이 없습니다. 전환 중 양쪽 인덱스를 읽으므로 검색 성능이 일시적으로 저하될 수 있습니다.</p>
          </QaBox>

          <Checkpoint>products_v3에서 데이터가 검색되고, GET /_alias/products 에서 products_v3가 보이면 마이그레이션 완료!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 5 — 이론 + 실습: ILM ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 5 · Theory & Lab</SectionLabel>
        <SectionTitle>ILM (Index Lifecycle Management)<br />— 인덱스 자동 관리</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          로그 데이터는 끝없이 쌓입니다. 3개월 전 로그를 최신 로그와 같은 성능으로 유지할 필요가 있을까요? <strong className="text-text">ILM</strong>은 시간에 따라 인덱스를 자동으로 관리하는 정책입니다.
        </p>

        <IlmDiagram />

        <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
          <div className="bg-surface border border-border rounded-[14px] p-6">
            <div className="font-mono text-sm font-semibold text-es-red mb-2">Hot Phase</div>
            <p className="text-sm text-text-dim mb-3">활발하게 데이터를 쓰고 읽는 단계</p>
            <ul className="text-xs text-text-dim list-disc pl-4 space-y-1">
              <li>최신 데이터가 저장되는 단계</li>
              <li>고성능 SSD에 저장</li>
              <li>Rollover: 크기/시간 기준으로 새 인덱스 생성</li>
            </ul>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6">
            <div className="font-mono text-sm font-semibold text-es-orange mb-2">Warm Phase</div>
            <p className="text-sm text-text-dim mb-3">읽기 위주로 접근하는 단계</p>
            <ul className="text-xs text-text-dim list-disc pl-4 space-y-1">
              <li>더 이상 새 데이터가 쓰이지 않음</li>
              <li>레플리카 수 줄이기 가능</li>
              <li>Force Merge로 세그먼트 최적화</li>
            </ul>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6">
            <div className="font-mono text-sm font-semibold text-es-blue mb-2">Cold Phase</div>
            <p className="text-sm text-text-dim mb-3">거의 접근하지 않는 단계</p>
            <ul className="text-xs text-text-dim list-disc pl-4 space-y-1">
              <li>저비용 스토리지로 이동</li>
              <li>읽기 전용 설정</li>
              <li>검색 가능하지만 응답이 느림</li>
            </ul>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6">
            <div className="font-mono text-sm font-semibold text-es-purple mb-2">Delete Phase</div>
            <p className="text-sm text-text-dim mb-3">보관 기간이 만료된 단계</p>
            <ul className="text-xs text-text-dim list-disc pl-4 space-y-1">
              <li>인덱스를 완전히 삭제</li>
              <li>스토리지 공간 확보</li>
              <li>법적 보관 기간을 고려하여 설정</li>
            </ul>
          </div>
        </div>

        <ExplainCallout title="ILM이 해결하는 문제">
          <ul>
            <li><strong>스토리지 비용 절감</strong> — 오래된 데이터를 저비용 스토리지로 자동 이동</li>
            <li><strong>성능 최적화</strong> — Hot 노드에는 최신 데이터만 유지하여 검색 속도 보장</li>
            <li><strong>자동화</strong> — 수동으로 인덱스를 관리할 필요가 없어짐</li>
            <li><strong>규정 준수</strong> — 데이터 보관 기간 정책을 자동으로 적용</li>
          </ul>
        </ExplainCallout>

        {/* Step 6: ILM 정책 생성 */}
        <LabStep num={6} title="ILM 정책 생성" tags={["kibana"]}>
          <p><strong>30일 후 Warm, 90일 후 삭제</strong>되는 ILM 정책을 만들어봅시다. 이런 정책은 로그 데이터에 자주 사용됩니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — ILM 정책 생성" copyText={`PUT /_ilm/policy/logs_policy\n{\n  "policy": {\n    "phases": {\n      "hot": {\n        "min_age": "0ms",\n        "actions": {\n          "rollover": {\n            "max_age": "7d",\n            "max_primary_shard_size": "50gb"\n          }\n        }\n      },\n      "warm": {\n        "min_age": "30d",\n        "actions": {\n          "shrink": {\n            "number_of_shards": 1\n          },\n          "forcemerge": {\n            "max_num_segments": 1\n          }\n        }\n      },\n      "delete": {\n        "min_age": "90d",\n        "actions": {\n          "delete": {}\n        }\n      }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/_ilm/policy/logs_policy</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;policy&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;phases&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;hot&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;min_age&quot;</JKey>: <JStr>&quot;0ms&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;actions&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;rollover&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;max_age&quot;</JKey>: <JStr>&quot;7d&quot;</JStr>,{"\n"}
            {"            "}<JKey>&quot;max_primary_shard_size&quot;</JKey>: <JStr>&quot;50gb&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;warm&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;min_age&quot;</JKey>: <JStr>&quot;30d&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;actions&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;shrink&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;number_of_shards&quot;</JKey>: <JVal>1</JVal>{"\n"}
            {"          }"},{"\n"}
            {"          "}<JKey>&quot;forcemerge&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;max_num_segments&quot;</JKey>: <JVal>1</JVal>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;delete&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;min_age&quot;</JKey>: <JStr>&quot;90d&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;actions&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;delete&quot;</JKey>: {"{}"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`{
    "acknowledged": `}<Hl>true</Hl>{`
}`}
          </ExpectedOutput>

          <ExplainCallout title="ILM 정책 해석">
            <ul>
              <li><strong>Hot (0일~)</strong> — 인덱스가 7일이 지나거나 50GB를 초과하면 Rollover (새 인덱스 생성)</li>
              <li><strong>Warm (30일~)</strong> — 생성 후 30일이 지나면 샤드를 1개로 축소하고 세그먼트를 병합하여 최적화</li>
              <li><strong>Delete (90일~)</strong> — 생성 후 90일이 지나면 인덱스를 완전히 삭제</li>
              <li>이 정책을 Index Template에 연결하면, 새로 생성되는 모든 로그 인덱스에 자동 적용됩니다</li>
            </ul>
          </ExplainCallout>

          <p>생성한 ILM 정책을 확인해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — ILM 정책 조회" copyText={`GET /_ilm/policy/logs_policy`}>
            <Kw>GET</Kw> <Url>/_ilm/policy/logs_policy</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`{
    "logs_policy": {
        "policy": {
            "phases": {
                "hot":    { "min_age": "0ms",  "actions": { "rollover": { ... } } },
                "warm":   { "min_age": `}<Hl>&quot;30d&quot;</Hl>{`, "actions": { "shrink": { ... }, "forcemerge": { ... } } },
                "delete": { "min_age": `}<Hl>&quot;90d&quot;</Hl>{`, "actions": { "delete": {} } }
            }
        }
    }
}`}
          </ExpectedOutput>

          <WarnCallout title="실습 환경에서의 ILM">
            <p>ILM은 <strong>시간 기반</strong>으로 동작하므로 실습 환경에서 즉시 효과를 확인하기는 어렵습니다. 정책이 정상적으로 생성되었는지 확인하는 것만으로 충분합니다. 실제 운영 환경에서는 Elasticsearch가 주기적으로(기본 10분) ILM 정책을 확인하고 자동으로 적용합니다.</p>
          </WarnCallout>

          <QaBox question="ILM 정책을 인덱스에 적용하는 방법은?">
            <p><strong>방법 1. 기존 인덱스에 직접 적용</strong></p>
            <p>이미 존재하는 인덱스에 ILM 정책을 런타임에 바로 적용할 수 있습니다. <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">index.lifecycle.name</code>은 <strong>Dynamic Setting</strong>이라 서비스 중단 없이 즉시 반영됩니다.</p>
            <CodeSnippet code={`PUT /my-index/_settings
{
  "index.lifecycle.name": "logs_policy"
}`} />
            <p>적용 확인은 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">_ilm/explain</code> API로 할 수 있습니다.</p>
            <CodeSnippet code={`GET /my-index/_ilm/explain`} />
            <p>현재 어떤 ILM 정책이 적용되어 있고, 어느 phase에 있는지 확인할 수 있습니다. 정책을 해제하려면 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">null</code>을 넣으면 됩니다.</p>
            <CodeSnippet code={`PUT /my-index/_settings
{
  "index.lifecycle.name": null
}`} />

            <p><strong>방법 2. Index Template으로 자동 적용</strong></p>
            <p>새로 생성되는 인덱스에 자동으로 ILM이 붙도록 Template에 설정합니다. 로그처럼 시간 기반으로 인덱스가 계속 생성되는 패턴에서는 이 방식이 필수입니다.</p>
            <CodeSnippet code={`PUT /_index_template/logs_template
{
  "index_patterns": ["logs-*"],
  "template": {
    "settings": {
      "index.lifecycle.name": "logs_policy"
    }
  }
}`} />
            <p>이렇게 하면 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">logs-*</code> 패턴으로 생성되는 모든 인덱스에 logs_policy가 자동 적용됩니다.</p>
          </QaBox>

          <Checkpoint>GET /_ilm/policy/logs_policy 에서 hot, warm, delete 단계가 보이면 성공! ILM 정책이 정상적으로 생성되었습니다.</Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

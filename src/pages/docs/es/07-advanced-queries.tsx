
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

/* ─── Inline visuals ─── */

function RelationshipCards() {
  return (
    <div className="grid grid-cols-3 gap-6 my-10 max-md:grid-cols-1">
      {/* Object */}
      <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-blue group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-cyan" />
        <h3 className="font-mono text-lg mb-2 text-es-blue">Object</h3>
        <p className="text-[0.9rem] text-text-dim mb-3">
          <strong className="text-text font-medium">기본 내부 객체</strong>
        </p>
        <p className="text-[0.9rem] text-text-dim mb-3">
          JSON 객체를 평탄화(flatten)하여 저장합니다. 배열 안의 객체끼리 <strong className="text-text font-medium">경계가 사라져</strong> 교차 매칭이 발생합니다.
        </p>
        <div className="font-mono text-[0.78rem] bg-surface-2 rounded-lg px-4 py-3 mt-3 text-text-dim leading-relaxed">
          options.color: [<span className="text-es-blue">&quot;빨강&quot;</span>, <span className="text-es-blue">&quot;파랑&quot;</span>]<br />
          options.size: [<span className="text-es-blue">&quot;M&quot;</span>, <span className="text-es-blue">&quot;L&quot;</span>]<br />
          <span className="text-es-red">→ &quot;빨강+L&quot;도 매칭됨!</span>
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">빠름</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">단순 구조</span>
        </div>
      </div>

      {/* Nested */}
      <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-green group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-accent" />
        <h3 className="font-mono text-lg mb-2 text-es-green">Nested</h3>
        <p className="text-[0.9rem] text-text-dim mb-3">
          <strong className="text-text font-medium">독립 내부 문서</strong>
        </p>
        <p className="text-[0.9rem] text-text-dim mb-3">
          배열 안의 각 객체를 <strong className="text-text font-medium">별도의 숨겨진 문서</strong>로 저장합니다. 객체 내 필드 간 관계가 정확히 유지됩니다.
        </p>
        <div className="font-mono text-[0.78rem] bg-surface-2 rounded-lg px-4 py-3 mt-3 text-text-dim leading-relaxed">
          nested_doc_1: {"{"} color: <span className="text-es-green">&quot;빨강&quot;</span>, size: <span className="text-es-green">&quot;M&quot;</span> {"}"}<br />
          nested_doc_2: {"{"} color: <span className="text-es-green">&quot;파랑&quot;</span>, size: <span className="text-es-green">&quot;L&quot;</span> {"}"}<br />
          <span className="text-es-green">→ &quot;빨강+L&quot;은 매칭 안 됨!</span>
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">정확한 매칭</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">inner_hits</span>
        </div>
      </div>

      {/* Parent-Child (Join) */}
      <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-purple group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-purple to-es-orange" />
        <h3 className="font-mono text-lg mb-2 text-es-purple">Parent-Child (Join)</h3>
        <p className="text-[0.9rem] text-text-dim mb-3">
          <strong className="text-text font-medium">별도 문서 관계</strong>
        </p>
        <p className="text-[0.9rem] text-text-dim mb-3">
          부모와 자식이 <strong className="text-text font-medium">완전히 독립된 문서</strong>입니다. 자식만 추가/수정해도 부모를 다시 색인하지 않습니다.
        </p>
        <div className="font-mono text-[0.78rem] bg-surface-2 rounded-lg px-4 py-3 mt-3 text-text-dim leading-relaxed">
          부모: {"{"} name: <span className="text-es-purple">&quot;노트북&quot;</span> {"}"}<br />
          자식1: {"{"} color: <span className="text-es-purple">&quot;빨강&quot;</span>, size: <span className="text-es-purple">&quot;M&quot;</span> {"}"}<br />
          자식2: {"{"} color: <span className="text-es-purple">&quot;파랑&quot;</span>, size: <span className="text-es-purple">&quot;L&quot;</span> {"}"}
        </div>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">독립 수정</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">느림</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main chapter content ─── */

export default function Chapter07() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: 관계형 데이터 다루기 ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>ES에서 관계형 데이터 다루기<br />— Object vs Nested vs Parent-Child</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          RDB에서는 테이블 간 <strong className="text-text">JOIN</strong>으로 관계를 표현합니다. 하지만 Elasticsearch는 JOIN이 없습니다. 대신 <strong className="text-text">데이터를 문서 안에 포함</strong>시키는 세 가지 방법을 제공합니다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          예를 들어, 하나의 상품에 여러 옵션(색상+사이즈)이 있는 경우를 생각해봅시다. 각 옵션의 필드 간 관계가 <strong className="text-text">정확히 유지되느냐</strong>가 핵심입니다.
        </p>

        <RelationshipCards />

        <ExplainCallout title="어떤 걸 선택해야 할까?">
          <ul>
            <li><strong>Object</strong> — 내부 객체 간 교차 매칭이 상관없을 때 (태그 목록, 단순 메타데이터)</li>
            <li><strong>Nested</strong> — 내부 객체의 필드 관계가 중요할 때 (상품 옵션, 댓글+작성자, 주문 항목). <strong>가장 많이 사용</strong></li>
            <li><strong>Parent-Child</strong> — 자식 문서가 자주 변경되고, 부모를 재색인하고 싶지 않을 때 (게시글+댓글). 성능 비용이 큽니다</li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="Nested의 성능 주의사항">
          <p>Nested 객체는 내부적으로 <strong className="text-text font-medium">별도의 Lucene 문서</strong>로 저장됩니다. 상품 1개에 옵션 10개면, 실제로는 11개 문서(부모 1 + nested 10)가 생깁니다. 옵션이 수백 개씩 있는 경우에는 성능을 고려해야 합니다.</p>
        </WarnCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: Nested 쿼리 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Nested 쿼리<br />— 내부 객체를 정확하게 검색하기</SectionTitle>

        <LabBanner icon="&#x1F4E6;" title="이번 파트에서 배울 것">
          Nested 타입의 인덱스를 만들고, 내부 객체의 필드 관계를 유지한 채 검색하는 방법을 배웁니다. inner_hits로 매칭된 내부 객체만 골라내는 것까지 실습합니다.
        </LabBanner>

        {/* Step 1: Nested 타입 인덱스 생성 */}
        <LabStep num={1} title="Nested 타입 인덱스 생성" tags={["kibana"]}>
          <p>상품(product)에 여러 옵션(options 배열)이 있는 인덱스를 만듭니다. 각 옵션에는 <strong className="text-text font-medium">color, size, stock</strong> 필드가 있습니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 인덱스 생성" copyText={`PUT /products_nested\n{\n  "mappings": {\n    "properties": {\n      "name": { "type": "text" },\n      "category": { "type": "keyword" },\n      "price": { "type": "integer" },\n      "options": {\n        "type": "nested",\n        "properties": {\n          "color": { "type": "keyword" },\n          "size": { "type": "keyword" },\n          "stock": { "type": "integer" }\n        }\n      }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/products_nested</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;category&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;price&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;options&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;nested&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;color&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" },"}{"\n"}
            {"          "}<JKey>&quot;size&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" },"}{"\n"}
            {"          "}<JKey>&quot;stock&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>데이터를 넣어봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 상품 1" copyText={`POST /products_nested/_doc/1\n{\n  "name": "클래식 티셔츠",\n  "category": "의류",\n  "price": 29000,\n  "options": [\n    { "color": "빨강", "size": "M", "stock": 10 },\n    { "color": "빨강", "size": "L", "stock": 0 },\n    { "color": "파랑", "size": "M", "stock": 5 },\n    { "color": "파랑", "size": "L", "stock": 8 }\n  ]\n}`}>
            <Kw>POST</Kw> <Url>/products_nested/_doc/1</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;클래식 티셔츠&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;category&quot;</JKey>: <JStr>&quot;의류&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;price&quot;</JKey>: <JVal>29000</JVal>,{"\n"}
            {"  "}<JKey>&quot;options&quot;</JKey>: [{"\n"}
            {"    "}{"{ "}<JKey>&quot;color&quot;</JKey>: <JStr>&quot;빨강&quot;</JStr>, <JKey>&quot;size&quot;</JKey>: <JStr>&quot;M&quot;</JStr>, <JKey>&quot;stock&quot;</JKey>: <JVal>10</JVal>{" },"}{"\n"}
            {"    "}{"{ "}<JKey>&quot;color&quot;</JKey>: <JStr>&quot;빨강&quot;</JStr>, <JKey>&quot;size&quot;</JKey>: <JStr>&quot;L&quot;</JStr>, <JKey>&quot;stock&quot;</JKey>: <JVal>0</JVal>{" },"}{"\n"}
            {"    "}{"{ "}<JKey>&quot;color&quot;</JKey>: <JStr>&quot;파랑&quot;</JStr>, <JKey>&quot;size&quot;</JKey>: <JStr>&quot;M&quot;</JStr>, <JKey>&quot;stock&quot;</JKey>: <JVal>5</JVal>{" },"}{"\n"}
            {"    "}{"{ "}<JKey>&quot;color&quot;</JKey>: <JStr>&quot;파랑&quot;</JStr>, <JKey>&quot;size&quot;</JKey>: <JStr>&quot;L&quot;</JStr>, <JKey>&quot;stock&quot;</JKey>: <JVal>8</JVal>{" }"}{"\n"}
            {"  ]"}{"\n"}
            {"}"}
          </CmdBlock>

          <CmdBlock label="KIBANA DEV TOOLS — 상품 2" copyText={`POST /products_nested/_doc/2\n{\n  "name": "프리미엄 후드티",\n  "category": "의류",\n  "price": 59000,\n  "options": [\n    { "color": "검정", "size": "M", "stock": 3 },\n    { "color": "검정", "size": "L", "stock": 12 },\n    { "color": "회색", "size": "L", "stock": 0 }\n  ]\n}`}>
            <Kw>POST</Kw> <Url>/products_nested/_doc/2</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;프리미엄 후드티&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;category&quot;</JKey>: <JStr>&quot;의류&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;price&quot;</JKey>: <JVal>59000</JVal>,{"\n"}
            {"  "}<JKey>&quot;options&quot;</JKey>: [{"\n"}
            {"    "}{"{ "}<JKey>&quot;color&quot;</JKey>: <JStr>&quot;검정&quot;</JStr>, <JKey>&quot;size&quot;</JKey>: <JStr>&quot;M&quot;</JStr>, <JKey>&quot;stock&quot;</JKey>: <JVal>3</JVal>{" },"}{"\n"}
            {"    "}{"{ "}<JKey>&quot;color&quot;</JKey>: <JStr>&quot;검정&quot;</JStr>, <JKey>&quot;size&quot;</JKey>: <JStr>&quot;L&quot;</JStr>, <JKey>&quot;stock&quot;</JKey>: <JVal>12</JVal>{" },"}{"\n"}
            {"    "}{"{ "}<JKey>&quot;color&quot;</JKey>: <JStr>&quot;회색&quot;</JStr>, <JKey>&quot;size&quot;</JKey>: <JStr>&quot;L&quot;</JStr>, <JKey>&quot;stock&quot;</JKey>: <JVal>0</JVal>{" }"}{"\n"}
            {"  ]"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="핵심 포인트">
            <ul>
              <li><strong>&quot;type&quot;: &quot;nested&quot;</strong> — 이것이 핵심입니다. 이 설정이 없으면 기본 Object 타입으로 평탄화되어 저장됩니다.</li>
              <li>각 옵션 객체가 <strong>독립적인 Lucene 문서</strong>로 저장되어, color와 size 간의 관계가 유지됩니다.</li>
              <li>상품 1은 4개의 옵션(= 4개의 내부 문서), 상품 2는 3개의 옵션을 가집니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>products_nested 인덱스가 생성되고, 2개의 상품이 정상적으로 색인되면 성공!</Checkpoint>
        </LabStep>

        {/* Step 2: Nested 쿼리로 내부 객체 조건 검색 */}
        <LabStep num={2} title="Nested 쿼리로 내부 객체 조건 검색" tags={["kibana"]}>
          <p><strong className="text-text font-medium">&quot;빨강색이면서 L 사이즈인 옵션이 있는 상품&quot;</strong>을 찾아봅시다. Object 타입이었다면 교차 매칭으로 잘못된 결과가 나오겠지만, Nested 쿼리는 정확합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products_nested/_search\n{\n  "query": {\n    "nested": {\n      "path": "options",\n      "query": {\n        "bool": {\n          "must": [\n            { "term": { "options.color": "빨강" } },\n            { "term": { "options.size": "L" } }\n          ]\n        }\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products_nested/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;nested&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;path&quot;</JKey>: <JStr>&quot;options&quot;</JStr>,{"\n"}
            {"      "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;must&quot;</JKey>: [{"\n"}
            {"            "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;options.color&quot;</JKey>: <JStr>&quot;빨강&quot;</JStr>{" }"}{" },"}{"\n"}
            {"            "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;options.size&quot;</JKey>: <JStr>&quot;L&quot;</JStr>{" }"}{" }"}{"\n"}
            {"          ]"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": {
    "total": { "value": `}<Hl>1</Hl>{` },
    "hits": [
        {
            "_id": "1",
            "_source": {
                "name": `}<Hl>&quot;클래식 티셔츠&quot;</Hl>{`,
                ...
            }
        }
    ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="Nested 쿼리 구조 분석">
            <ul>
              <li><strong>&quot;nested&quot;</strong> — Nested 타입 필드를 검색할 때 반드시 사용해야 합니다.</li>
              <li><strong>&quot;path&quot;: &quot;options&quot;</strong> — 어떤 Nested 필드를 대상으로 할지 지정합니다.</li>
              <li><strong>query 안의 bool/must</strong> — 같은 내부 객체 안에서 color=빨강 AND size=L을 만족하는지 검사합니다.</li>
              <li>클래식 티셔츠만 나옵니다 — <strong>&quot;빨강+L&quot; 옵션이 실제로 존재하는 상품</strong>이기 때문입니다.</li>
              <li>프리미엄 후드티는 빨강 옵션 자체가 없으므로 당연히 제외됩니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="만약 Object 타입이었다면 어떤 결과가 나올까요?">
            <p>Object 타입은 내부 객체를 평탄화하여 저장합니다. 클래식 티셔츠의 경우:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">options.color</code>: [&quot;빨강&quot;, &quot;파랑&quot;]</li>
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">options.size</code>: [&quot;M&quot;, &quot;L&quot;]</li>
            </ul>
            <p>&quot;빨강&quot;이 color 배열에 있고, &quot;L&quot;이 size 배열에 있으니 매칭됩니다. 하지만 실제로 &quot;빨강+M&quot;, &quot;빨강+L&quot;, &quot;파랑+M&quot;, &quot;파랑+L&quot; 어떤 조합이든 다 매칭되어 버립니다. <strong>Nested 타입이 이 문제를 해결합니다.</strong></p>
          </QaBox>

          <Checkpoint>클래식 티셔츠(id=1)만 검색되면 성공! 교차 매칭 없이 정확한 결과입니다.</Checkpoint>
        </LabStep>

        {/* Step 3: inner_hits */}
        <LabStep num={3} title="inner_hits로 매칭된 내부 객체만 가져오기" tags={["kibana"]}>
          <p>상품이 검색되었는데, <strong className="text-text font-medium">어떤 옵션이 매칭되었는지</strong> 알고 싶다면? <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">inner_hits</code>를 사용합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products_nested/_search\n{\n  "query": {\n    "nested": {\n      "path": "options",\n      "query": {\n        "bool": {\n          "must": [\n            { "term": { "options.color": "파랑" } },\n            { "range": { "options.stock": { "gt": 0 } } }\n          ]\n        }\n      },\n      "inner_hits": {\n        "_source": ["options.color", "options.size", "options.stock"]\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products_nested/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;nested&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;path&quot;</JKey>: <JStr>&quot;options&quot;</JStr>,{"\n"}
            {"      "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;must&quot;</JKey>: [{"\n"}
            {"            "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;options.color&quot;</JKey>: <JStr>&quot;파랑&quot;</JStr>{" }"}{" },"}{"\n"}
            {"            "}{"{ "}<JKey>&quot;range&quot;</JKey>: {"{ "}<JKey>&quot;options.stock&quot;</JKey>: {"{ "}<JKey>&quot;gt&quot;</JKey>: <JVal>0</JVal>{" }"}{" }"}{" }"}{"\n"}
            {"          ]"}{"\n"}
            {"        }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;inner_hits&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;options.color&quot;</JStr>, <JStr>&quot;options.size&quot;</JStr>, <JStr>&quot;options.stock&quot;</JStr>]{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": [
    {
        "_id": "1",
        "_source": { "name": "클래식 티셔츠", ... },
        "inner_hits": {
            "options": {
                "hits": {
                    "hits": [
                        {
                            "_source": {
                                "color": `}<Hl>&quot;파랑&quot;</Hl>{`,
                                "size": `}<Hl>&quot;M&quot;</Hl>{`,
                                "stock": `}<Hl>5</Hl>{`
                            }
                        },
                        {
                            "_source": {
                                "color": `}<Hl>&quot;파랑&quot;</Hl>{`,
                                "size": `}<Hl>&quot;L&quot;</Hl>{`,
                                "stock": `}<Hl>8</Hl>{`
                            }
                        }
                    ]
                }
            }
        }
    }
]`}
          </ExpectedOutput>

          <ExplainCallout title="inner_hits가 유용한 이유">
            <ul>
              <li><strong>상품 전체</strong>가 아닌, <strong>매칭된 옵션만</strong> 별도로 확인할 수 있습니다.</li>
              <li>쇼핑몰에서 &quot;파랑색 재고 있는 옵션&quot;을 검색했을 때, 해당 옵션만 하이라이트하거나 먼저 보여줄 수 있어요.</li>
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">_source</code>로 inner_hits에 포함할 필드도 제어 가능합니다.</li>
              <li>빨강+L(stock=0)은 재고가 0이므로 inner_hits에 포함되지 않습니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>클래식 티셔츠가 검색되고, inner_hits에 파랑+M(stock=5)과 파랑+L(stock=8)만 나오면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: function_score ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: function_score<br />— 검색 점수를 커스터마이징하기</SectionTitle>

        <LabBanner icon="&#x1F3AF;" title="이번 파트에서 배울 것">
          기본 관련도(_score) 외에 날짜, 인기도 등 비즈니스 로직으로 검색 순위를 조정합니다. 실제 서비스에서 &quot;최신순 가중치&quot;나 &quot;인기도 반영&quot;을 구현하는 핵심 기법입니다.
        </LabBanner>

        {/* Step 4: function_score — decay 함수 */}
        <LabStep num={4} title="decay 함수로 최신 상품에 가중치 부여" tags={["kibana"]}>
          <p>먼저 날짜 필드가 있는 테스트 데이터를 준비합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 인덱스 생성" copyText={`PUT /products_scored\n{\n  "mappings": {\n    "properties": {\n      "name": { "type": "text" },\n      "description": { "type": "text" },\n      "price": { "type": "integer" },\n      "created_at": { "type": "date" },\n      "popularity": { "type": "integer" },\n      "in_stock": { "type": "boolean" }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/products_scored</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;price&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;created_at&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;date&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;popularity&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;in_stock&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;boolean&quot;</JStr>{" }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <CmdBlock label="KIBANA DEV TOOLS — 테스트 데이터" copyText={`POST /products_scored/_bulk\n{"index":{"_id":"1"}}\n{"name":"맥북 프로 16인치","description":"전문가를 위한 고성능 노트북","price":3490000,"created_at":"2026-03-01","popularity":95,"in_stock":true}\n{"index":{"_id":"2"}}\n{"name":"갤럭시북 프로","description":"가벼운 업무용 노트북","price":1790000,"created_at":"2026-01-15","popularity":80,"in_stock":true}\n{"index":{"_id":"3"}}\n{"name":"LG 그램","description":"초경량 휴대용 노트북","price":1890000,"created_at":"2025-06-01","popularity":60,"in_stock":true}\n{"index":{"_id":"4"}}\n{"name":"레노버 씽크패드","description":"기업용 비즈니스 노트북","price":1590000,"created_at":"2025-01-10","popularity":45,"in_stock":false}`}>
            <Kw>POST</Kw> <Url>/products_scored/_bulk</Url>{"\n"}
            {"{\"index\":{\"_id\":\"1\"}}"}{"\n"}
            {"{\"name\":\"맥북 프로 16인치\",\"description\":\"전문가를 위한 고성능 노트북\",\"price\":3490000,\"created_at\":\"2026-03-01\",\"popularity\":95,\"in_stock\":true}"}{"\n"}
            {"{\"index\":{\"_id\":\"2\"}}"}{"\n"}
            {"{\"name\":\"갤럭시북 프로\",\"description\":\"가벼운 업무용 노트북\",\"price\":1790000,\"created_at\":\"2026-01-15\",\"popularity\":80,\"in_stock\":true}"}{"\n"}
            {"{\"index\":{\"_id\":\"3\"}}"}{"\n"}
            {"{\"name\":\"LG 그램\",\"description\":\"초경량 휴대용 노트북\",\"price\":1890000,\"created_at\":\"2025-06-01\",\"popularity\":60,\"in_stock\":true}"}{"\n"}
            {"{\"index\":{\"_id\":\"4\"}}"}{"\n"}
            {"{\"name\":\"레노버 씽크패드\",\"description\":\"기업용 비즈니스 노트북\",\"price\":1590000,\"created_at\":\"2025-01-10\",\"popularity\":45,\"in_stock\":false}"}
          </CmdBlock>

          <p>이제 <strong className="text-text font-medium">&quot;노트북&quot;을 검색하되, 최근에 등록된 상품일수록 점수를 높여봅시다.</strong></p>

          <CmdBlock label="KIBANA DEV TOOLS — decay 함수" copyText={`GET /products_scored/_search\n{\n  "query": {\n    "function_score": {\n      "query": {\n        "match": { "description": "노트북" }\n      },\n      "functions": [\n        {\n          "gauss": {\n            "created_at": {\n              "origin": "2026-03-16",\n              "scale": "30d",\n              "offset": "7d",\n              "decay": 0.5\n            }\n          }\n        }\n      ],\n      "boost_mode": "multiply"\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products_scored/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;function_score&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;functions&quot;</JKey>: [{"\n"}
            {"        {"}{"\n"}
            {"          "}<JKey>&quot;gauss&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;created_at&quot;</JKey>: {"{"}{"\n"}
            {"              "}<JKey>&quot;origin&quot;</JKey>: <JStr>&quot;2026-03-16&quot;</JStr>,{"\n"}
            {"              "}<JKey>&quot;scale&quot;</JKey>: <JStr>&quot;30d&quot;</JStr>,{"\n"}
            {"              "}<JKey>&quot;offset&quot;</JKey>: <JStr>&quot;7d&quot;</JStr>,{"\n"}
            {"              "}<JKey>&quot;decay&quot;</JKey>: <JVal>0.5</JVal>{"\n"}
            {"            }"}{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      ],"}{"\n"}
            {"      "}<JKey>&quot;boost_mode&quot;</JKey>: <JStr>&quot;multiply&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (점수 비교)">
            {`"hits": [
    { "_id": "1", "name": `}<Hl>&quot;맥북 프로 16인치&quot;</Hl>{`, "_score": `}<Hl>높음</Hl>{` },   // 3월 1일 (최신)
    { "_id": "2", "name": "갤럭시북 프로", "_score": 중간 },   // 1월 15일
    { "_id": "3", "name": "LG 그램", "_score": 낮음 },         // 6월 1일 (오래됨)
    { "_id": "4", "name": "레노버 씽크패드", "_score": `}<Hl>매우 낮음</Hl>{` }  // 1월 10일 (가장 오래됨)
]`}
          </ExpectedOutput>

          <ExplainCallout title="decay 함수 파라미터 해석">
            <ul>
              <li><strong>gauss</strong> — 가우시안(종 모양) 감쇠 함수. <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">exp</code>(지수), <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">linear</code>(선형)도 사용 가능합니다.</li>
              <li><strong>origin</strong> — 기준점. 오늘 날짜(2026-03-16)로 설정했습니다.</li>
              <li><strong>scale: &quot;30d&quot;</strong> — origin에서 30일 떨어지면 decay 값(0.5)만큼 점수가 감소합니다.</li>
              <li><strong>offset: &quot;7d&quot;</strong> — origin에서 7일 이내는 감쇠 없이 만점입니다.</li>
              <li><strong>decay: 0.5</strong> — scale 거리에서의 감쇠율. 0.5면 점수가 절반으로 줄어듭니다.</li>
              <li><strong>boost_mode: &quot;multiply&quot;</strong> — 기존 _score에 decay 값을 곱합니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="decay 함수는 언제 쓰나요?">
            <p>실제 서비스에서 매우 자주 사용됩니다:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li><strong>뉴스/블로그</strong> — 최신 기사를 위로 올리되, 관련도도 고려</li>
              <li><strong>부동산</strong> — 현재 위치에서 가까운 매물을 우선 표시 (위치 기반 decay)</li>
              <li><strong>중고거래</strong> — 최근 등록된 상품에 가중치 부여</li>
              <li><strong>채용 공고</strong> — 최신 공고를 더 높은 순위로</li>
            </ul>
          </QaBox>

          <Checkpoint>맥북 프로(최신)가 가장 높은 _score로 1위에 나오고, 오래된 상품일수록 점수가 낮으면 성공!</Checkpoint>
        </LabStep>

        {/* Step 5: script_score */}
        <LabStep num={5} title="script_score로 커스텀 스코어링" tags={["kibana"]}>
          <p><strong className="text-text font-medium">&quot;인기도(popularity)와 관련도를 합산해서 최종 점수를 결정하고 싶다&quot;</strong> — Painless 스크립트를 사용합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products_scored/_search\n{\n  "query": {\n    "function_score": {\n      "query": {\n        "match": { "description": "노트북" }\n      },\n      "functions": [\n        {\n          "script_score": {\n            "script": {\n              "source": "_score * doc['popularity'].value / 10"\n            }\n          }\n        }\n      ],\n      "boost_mode": "replace"\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products_scored/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;function_score&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;functions&quot;</JKey>: [{"\n"}
            {"        {"}{"\n"}
            {"          "}<JKey>&quot;script_score&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;script&quot;</JKey>: {"{"}{"\n"}
            {"              "}<JKey>&quot;source&quot;</JKey>: <JStr>&quot;_score * doc[&apos;popularity&apos;].value / 10&quot;</JStr>{"\n"}
            {"            }"}{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      ],"}{"\n"}
            {"      "}<JKey>&quot;boost_mode&quot;</JKey>: <JStr>&quot;replace&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (점수 비교)">
            {`"hits": [
    { "_id": "1", "name": `}<Hl>&quot;맥북 프로 16인치&quot;</Hl>{`, "_score": `}<Hl>높음</Hl>{` },   // popularity: 95
    { "_id": "2", "name": "갤럭시북 프로", "_score": 중간 },   // popularity: 80
    { "_id": "3", "name": "LG 그램", "_score": 낮음 },         // popularity: 60
    { "_id": "4", "name": "레노버 씽크패드", "_score": `}<Hl>가장 낮음</Hl>{` }  // popularity: 45
]`}
          </ExpectedOutput>

          <ExplainCallout title="script_score 분석">
            <ul>
              <li><strong>_score</strong> — match 쿼리의 기본 관련도 점수입니다.</li>
              <li><strong>doc[&apos;popularity&apos;].value</strong> — 해당 문서의 popularity 필드 값에 접근합니다.</li>
              <li><strong>_score * popularity / 10</strong> — 관련도와 인기도를 곱합니다. popularity가 95면 점수가 9.5배, 45면 4.5배가 됩니다.</li>
              <li><strong>boost_mode: &quot;replace&quot;</strong> — 스크립트 결과가 최종 _score를 <strong>완전히 대체</strong>합니다.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="script_score 성능 주의">
            <p>Painless 스크립트는 <strong className="text-text font-medium">모든 매칭 문서에 대해 실행</strong>됩니다. 문서 수가 많아지면 성능에 영향을 줄 수 있으니, 가능하다면 내장 함수(decay, field_value_factor 등)를 먼저 고려하세요. 스크립트가 꼭 필요하다면 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">min_score</code>로 불필요한 계산을 줄이는 것도 방법입니다.</p>
          </WarnCallout>

          <Checkpoint>인기도가 높은 맥북 프로가 가장 높은 점수로 1위에 오면 성공! _score 값을 직접 비교해보세요.</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: Boosting 쿼리 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Boosting 쿼리<br />— 특정 조건의 점수를 낮추기</SectionTitle>

        <LabBanner icon="&#x2696;&#xFE0F;" title="이번 파트에서 배울 것">
          boosting 쿼리는 must_not과 다릅니다. must_not은 결과에서 완전히 제외하지만, boosting은 결과에 포함하되 점수만 낮춥니다. &quot;품절 상품을 숨기지 않고, 대신 아래로 밀어내기&quot; 같은 시나리오에 적합합니다.
        </LabBanner>

        {/* Step 6: boosting 쿼리 */}
        <LabStep num={6} title="boosting 쿼리 — 품절 상품 점수 낮추기" tags={["kibana"]}>
          <p>시나리오: <strong className="text-text font-medium">&quot;노트북을 검색하되, 품절 상품은 제거하지 말고 순위만 낮추자&quot;</strong></p>
          <p>쇼핑몰에서 품절 상품을 아예 안 보여주면 상품이 적어 보일 수 있습니다. 대신 &quot;품절&quot; 표시와 함께 아래쪽에 보여주는 것이 UX에 유리할 때가 있습니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products_scored/_search\n{\n  "query": {\n    "boosting": {\n      "positive": {\n        "match": { "description": "노트북" }\n      },\n      "negative": {\n        "term": { "in_stock": false }\n      },\n      "negative_boost": 0.2\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products_scored/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;boosting&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;positive&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;negative&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;in_stock&quot;</JKey>: <JVal>false</JVal>{" }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;negative_boost&quot;</JKey>: <JVal>0.2</JVal>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (점수 비교)">
            {`"hits": [
    { "_id": "1", "name": "맥북 프로 16인치", "_score": `}<Hl>0.xx</Hl>{`, "in_stock": true },
    { "_id": "2", "name": "갤럭시북 프로", "_score": 0.xx, "in_stock": true },
    { "_id": "3", "name": "LG 그램", "_score": 0.xx, "in_stock": true },
    { "_id": "4", "name": `}<Hl>&quot;레노버 씽크패드&quot;</Hl>{`, "_score": `}<Hl>매우 낮음</Hl>{`, "in_stock": `}<Hl>false</Hl>{` }
]`}
          </ExpectedOutput>

          <ExplainCallout title="boosting 쿼리 구조 분석">
            <ul>
              <li><strong>positive</strong> — 메인 검색 조건입니다. 이 조건에 매칭되는 문서가 결과에 포함됩니다.</li>
              <li><strong>negative</strong> — 점수를 <strong>깎을 조건</strong>입니다. 이 조건에도 매칭되면 점수가 줄어듭니다.</li>
              <li><strong>negative_boost: 0.2</strong> — negative 조건에 매칭된 문서의 점수에 0.2를 곱합니다. 즉 <strong>점수가 80% 감소</strong>합니다.</li>
              <li>레노버 씽크패드(품절)는 결과에 <strong>포함</strong>되지만, _score가 크게 낮아져 맨 아래에 위치합니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="boosting vs bool + must_not, 언제 어떤 걸 쓰나요?">
            <p>두 가지 시나리오를 비교해보세요:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li><strong>must_not</strong> — &quot;품절 상품은 절대 보여주지 마&quot; → 결과에서 <strong>완전히 제거</strong></li>
              <li><strong>boosting</strong> — &quot;품절 상품도 보여주되, 아래쪽에 배치해줘&quot; → 결과에 포함하되 <strong>순위만 하락</strong></li>
            </ul>
            <p>boosting은 검색 결과의 다양성을 유지하면서도, 비즈니스 우선순위를 반영하고 싶을 때 사용합니다. negative_boost 값이 0에 가까울수록 더 강하게 순위를 낮춥니다.</p>
          </QaBox>

          <QaBox question="function_score와 boosting의 차이는 뭔가요?">
            <p>둘 다 점수를 조정하는 쿼리이지만, <strong>복잡도와 유연성</strong>이 다릅니다:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li><strong>boosting</strong> — 단순합니다. &quot;이 조건이면 점수를 깎아줘&quot;만 가능합니다. 빠르고 직관적입니다.</li>
              <li><strong>function_score</strong> — 훨씬 유연합니다. decay 함수, 스크립트, 여러 함수 조합 등 <strong>복잡한 스코어링 로직</strong>을 구현할 수 있습니다.</li>
            </ul>
            <p>단순히 특정 조건의 점수를 낮추고 싶다면 boosting, 다양한 요소를 조합한 커스텀 스코어링이 필요하면 function_score를 선택하세요.</p>
          </QaBox>

          <Checkpoint>
            모든 노트북이 검색 결과에 나오되, 품절인 레노버 씽크패드의 _score가 다른 상품들보다 확연히 낮으면 성공! 이것이 &quot;숨기지 않되 순위를 낮추는&quot; 전략입니다.
          </Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

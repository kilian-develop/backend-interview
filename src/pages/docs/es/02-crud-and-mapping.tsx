
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

/* ───────── Chapter-specific inline visuals ───────── */

function CrudGrid() {
  const cards: {
    key: string;
    method: string;
    letter: string;
    desc: string;
    api: string;
    color: string;
    borderHover: string;
    barColor: string;
  }[] = [
    {
      key: "create",
      method: "POST / PUT",
      letter: "C",
      desc: "Create\n문서 생성",
      api: "POST /index/_doc",
      color: "text-es-green",
      borderHover: "hover:border-es-green",
      barColor: "bg-es-green",
    },
    {
      key: "read",
      method: "GET",
      letter: "R",
      desc: "Read\n문서 조회",
      api: "GET /index/_doc/id",
      color: "text-es-blue",
      borderHover: "hover:border-es-blue",
      barColor: "bg-es-blue",
    },
    {
      key: "update",
      method: "POST _update",
      letter: "U",
      desc: "Update\n문서 수정",
      api: "POST /index/_update/id",
      color: "text-es-orange",
      borderHover: "hover:border-es-orange",
      barColor: "bg-es-orange",
    },
    {
      key: "delete",
      method: "DELETE",
      letter: "D",
      desc: "Delete\n문서 삭제",
      api: "DELETE /index/_doc/id",
      color: "text-es-red",
      borderHover: "hover:border-es-red",
      barColor: "bg-es-red",
    },
  ];

  return (
    <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 my-10">
      {cards.map((c) => (
        <div
          key={c.key}
          className={`bg-surface border border-border rounded-[14px] p-6 text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${c.borderHover}`}
        >
          <div className={`absolute top-0 left-0 right-0 h-[3px] ${c.barColor}`} />
          <div className={`font-mono text-xs font-semibold tracking-wider mb-2 ${c.color}`}>{c.method}</div>
          <div className={`font-serif text-[2.5rem] font-black leading-none my-2 ${c.color}`}>{c.letter}</div>
          <div className="text-sm text-text-dim mt-1 whitespace-pre-line">{c.desc}</div>
          <div className="font-mono text-[0.7rem] text-text-dim bg-surface-2 px-2.5 py-1 rounded-md mt-3 inline-block">
            {c.api}
          </div>
        </div>
      ))}
    </div>
  );
}

function MappingVisual() {
  const rows: { field: string; fieldClass: string; type: string; typeClass: string }[] = [
    { field: "name", fieldClass: "bg-es-green/10 text-es-green", type: "text", typeClass: "bg-es-green/[0.08] text-es-green border border-es-green/20" },
    { field: "category", fieldClass: "bg-es-blue/10 text-es-blue", type: "keyword (+ text)", typeClass: "bg-es-blue/[0.08] text-es-blue border border-es-blue/20" },
    { field: "price", fieldClass: "bg-es-orange/10 text-es-orange", type: "long", typeClass: "bg-es-orange/[0.08] text-es-orange border border-es-orange/20" },
    { field: "brand", fieldClass: "bg-es-blue/10 text-es-blue", type: "keyword (+ text)", typeClass: "bg-es-blue/[0.08] text-es-blue border border-es-blue/20" },
    { field: "description", fieldClass: "bg-es-green/10 text-es-green", type: "text", typeClass: "bg-es-green/[0.08] text-es-green border border-es-green/20" },
    { field: "in_stock", fieldClass: "bg-es-purple/10 text-es-purple", type: "boolean", typeClass: "bg-es-purple/[0.08] text-es-purple border border-es-purple/20" },
  ];

  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-base text-text-dim mb-8">products 인덱스의 매핑 구조 (추정)</div>
      <div className="grid grid-cols-[1fr_auto_1fr] max-md:grid-cols-1 gap-3 items-center max-w-[650px] mx-auto">
        {rows.map((r) => (
          <div key={r.field} className="contents max-md:flex max-md:items-center max-md:gap-2">
            <div className={`font-mono text-[0.88rem] px-5 py-2.5 rounded-lg text-right max-md:text-left max-md:flex-1 ${r.fieldClass}`}>
              {r.field}
            </div>
            <div className="text-text-dim font-mono text-base text-center max-md:shrink-0">{"\u2192"}</div>
            <div className={`font-mono text-[0.85rem] px-5 py-2.5 rounded-lg max-md:flex-1 ${r.typeClass}`}>
              {r.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypeTable() {
  const rows: { type: string; color: string; search: string; desc: React.ReactNode }[] = [
    {
      type: "text",
      color: "text-es-green",
      search: "전문 검색 (Full-text)",
      desc: <>값이 분석기(Analyzer)를 거쳐 <strong>단어 단위로 쪼개져</strong> 역색인에 저장됩니다. &quot;삼성 갤럭시북 프로&quot; {"\u2192"} [&quot;삼성&quot;, &quot;갤럭시북&quot;, &quot;프로&quot;]</>,
    },
    {
      type: "keyword",
      color: "text-es-blue",
      search: "정확히 일치 (Exact match)",
      desc: <>값이 쪼개지지 않고 <strong>통째로</strong> 저장됩니다. 정렬, 필터링, 집계에 사용. &quot;삼성&quot; {"\u2192"} [&quot;삼성&quot;] 그대로</>,
    },
    {
      type: "long / integer",
      color: "text-es-orange",
      search: "범위 검색",
      desc: <>숫자 타입. 범위 조건(price &gt; 100만)이나 정렬에 사용됩니다.</>,
    },
    {
      type: "boolean",
      color: "text-es-purple",
      search: "참/거짓 필터",
      desc: <>true 또는 false. 필터링에 사용됩니다.</>,
    },
    {
      type: "date",
      color: "text-accent",
      search: "날짜 범위 검색",
      desc: <>날짜/시간 타입. 기간 검색이나 날짜별 집계에 사용됩니다.</>,
    },
  ];

  return (
    <table className="w-full border-collapse bg-surface rounded-xl overflow-hidden border border-border my-8">
      <thead>
        <tr>
          <th className="px-6 py-4 text-left font-semibold text-[0.82rem] tracking-wider uppercase border-b-2 border-border text-text-dim">타입</th>
          <th className="px-6 py-4 text-left font-semibold text-[0.82rem] tracking-wider uppercase border-b-2 border-border text-text-dim">검색 방식</th>
          <th className="px-6 py-4 text-left font-semibold text-[0.82rem] tracking-wider uppercase border-b-2 border-border text-text-dim">설명</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.type} className={i < rows.length - 1 ? "border-b border-border" : ""}>
            <td className={`px-6 py-3.5 font-mono font-medium text-[0.92rem] ${r.color}`}>{r.type}</td>
            <td className="px-6 py-3.5 text-[0.92rem]">{r.search}</td>
            <td className="px-6 py-3.5 text-[0.92rem] text-text-dim">{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ───────── Main content ───────── */

export default function Chapter02() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: CRUD 개요 ═══════ */}
      <Section>
        <SectionLabel>Part 1 &middot; Theory</SectionLabel>
        <SectionTitle>CRUD — 데이터의 생명주기</SectionTitle>

        <p>모든 데이터 시스템의 기본 동작은 네 가지입니다. Elasticsearch도 REST API를 통해 이 네 가지를 수행합니다.</p>

        <CrudGrid />

        <p>Chapter 1에서 Create(POST)와 Read(GET)를 해봤죠. 이번 챕터에서는 나머지를 포함해 <strong>전체 사이클</strong>을 완성합니다.</p>

        <ExplainCallout title="REST API란?">
          <p>Elasticsearch는 SQL이 아니라 <strong>HTTP 요청</strong>으로 동작합니다. 웹 브라우저가 서버와 통신하는 것과 같은 방식이에요.</p>
          <ul>
            <li><strong>GET</strong> — 데이터를 달라 (조회)</li>
            <li><strong>POST</strong> — 새 데이터를 보낸다 (생성)</li>
            <li><strong>PUT</strong> — 데이터를 통째로 교체한다 (덮어쓰기)</li>
            <li><strong>DELETE</strong> — 데이터를 지워라 (삭제)</li>
          </ul>
        </ExplainCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: Bulk로 데이터 넣기 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 &middot; Hands-on Lab</SectionLabel>
        <SectionTitle>{"실습: Bulk API로\n여러 문서를 한번에 넣기"}</SectionTitle>

        <LabBanner icon={"\uD83D\uDCE6"} title="사전 조건">
          {"Chapter 1에서 Docker로 ES + Kibana를 실행한 상태여야 합니다.\nChapter 1의 products 인덱스에 문서 1개가 있는 상태에서 시작합니다."}
        </LabBanner>

        {/* Step 1: Bulk */}
        <LabStep num={1} title="Bulk API로 상품 5개를 한번에 넣기" tags={["kibana"]}>
          <p>문서를 하나씩 넣는 것은 비효율적입니다. <strong>Bulk API</strong>를 사용하면 한 번의 요청으로 여러 문서를 넣을 수 있어요.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`POST /products/_bulk
{ "index": { "_id": "2" } }
{ "name": "애플 맥북 프로 14", "category": "노트북", "price": 2390000, "brand": "애플", "description": "크리에이터를 위한 프리미엄 노트북", "in_stock": true }
{ "index": { "_id": "3" } }
{ "name": "LG 그램 17", "category": "노트북", "price": 1890000, "brand": "LG", "description": "초경량 대화면 노트북", "in_stock": true }
{ "index": { "_id": "4" } }
{ "name": "삼성 갤럭시 버즈3 프로", "category": "이어폰", "price": 259000, "brand": "삼성", "description": "노이즈 캔슬링 무선 이어폰", "in_stock": true }
{ "index": { "_id": "5" } }
{ "name": "소니 WH-1000XM5", "category": "헤드폰", "price": 349000, "brand": "소니", "description": "최고의 노이즈 캔슬링 헤드폰", "in_stock": false }
{ "index": { "_id": "6" } }
{ "name": "레노버 씽크패드 X1 Carbon", "category": "노트북", "price": 2190000, "brand": "레노버", "description": "비즈니스 최강 내구성 노트북", "in_stock": true }
`}
          >
            <Kw>POST</Kw> <Url>/products/_bulk</Url>{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;2&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;name&quot;</JKey>{": "}<JStr>&quot;애플 맥북 프로 14&quot;</JStr>{", "}<JKey>&quot;category&quot;</JKey>{": "}<JStr>&quot;노트북&quot;</JStr>{", "}<JKey>&quot;price&quot;</JKey>{": "}<JVal>2390000</JVal>{", "}<JKey>&quot;brand&quot;</JKey>{": "}<JStr>&quot;애플&quot;</JStr>{", "}<JKey>&quot;description&quot;</JKey>{": "}<JStr>&quot;크리에이터를 위한 프리미엄 노트북&quot;</JStr>{", "}<JKey>&quot;in_stock&quot;</JKey>{": "}<JVal>true</JVal>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;3&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;name&quot;</JKey>{": "}<JStr>&quot;LG 그램 17&quot;</JStr>{", "}<JKey>&quot;category&quot;</JKey>{": "}<JStr>&quot;노트북&quot;</JStr>{", "}<JKey>&quot;price&quot;</JKey>{": "}<JVal>1890000</JVal>{", "}<JKey>&quot;brand&quot;</JKey>{": "}<JStr>&quot;LG&quot;</JStr>{", "}<JKey>&quot;description&quot;</JKey>{": "}<JStr>&quot;초경량 대화면 노트북&quot;</JStr>{", "}<JKey>&quot;in_stock&quot;</JKey>{": "}<JVal>true</JVal>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;4&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;name&quot;</JKey>{": "}<JStr>&quot;삼성 갤럭시 버즈3 프로&quot;</JStr>{", "}<JKey>&quot;category&quot;</JKey>{": "}<JStr>&quot;이어폰&quot;</JStr>{", "}<JKey>&quot;price&quot;</JKey>{": "}<JVal>259000</JVal>{", "}<JKey>&quot;brand&quot;</JKey>{": "}<JStr>&quot;삼성&quot;</JStr>{", "}<JKey>&quot;description&quot;</JKey>{": "}<JStr>&quot;노이즈 캔슬링 무선 이어폰&quot;</JStr>{", "}<JKey>&quot;in_stock&quot;</JKey>{": "}<JVal>true</JVal>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;5&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;name&quot;</JKey>{": "}<JStr>&quot;소니 WH-1000XM5&quot;</JStr>{", "}<JKey>&quot;category&quot;</JKey>{": "}<JStr>&quot;헤드폰&quot;</JStr>{", "}<JKey>&quot;price&quot;</JKey>{": "}<JVal>349000</JVal>{", "}<JKey>&quot;brand&quot;</JKey>{": "}<JStr>&quot;소니&quot;</JStr>{", "}<JKey>&quot;description&quot;</JKey>{": "}<JStr>&quot;최고의 노이즈 캔슬링 헤드폰&quot;</JStr>{", "}<JKey>&quot;in_stock&quot;</JKey>{": "}<JVal>false</JVal>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;6&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;name&quot;</JKey>{": "}<JStr>&quot;레노버 씽크패드 X1 Carbon&quot;</JStr>{", "}<JKey>&quot;category&quot;</JKey>{": "}<JStr>&quot;노트북&quot;</JStr>{", "}<JKey>&quot;price&quot;</JKey>{": "}<JVal>2190000</JVal>{", "}<JKey>&quot;brand&quot;</JKey>{": "}<JStr>&quot;레노버&quot;</JStr>{", "}<JKey>&quot;description&quot;</JKey>{": "}<JStr>&quot;비즈니스 최강 내구성 노트북&quot;</JStr>{", "}<JKey>&quot;in_stock&quot;</JKey>{": "}<JVal>true</JVal>{" }"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심 부분)">
{`{
    "`}<Hl>errors</Hl>{`": `}<Hl>false</Hl>{`,
    "items": [
        { "index": { "_id": "2", "result": "`}<Hl>created</Hl>{`", "status": 201 } },
        { "index": { "_id": "3", "result": "`}<Hl>created</Hl>{`", "status": 201 } },
        { "index": { "_id": "4", "result": "created", "status": 201 } },
        { "index": { "_id": "5", "result": "created", "status": 201 } },
        { "index": { "_id": "6", "result": "created", "status": 201 } }
    ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="Bulk API 형식 이해하기">
            <ul>
              <li>Bulk API는 <strong>두 줄이 한 쌍</strong>입니다 — 첫 줄은 &quot;어떤 동작을 할지(action)&quot;, 둘째 줄은 &quot;데이터(document)&quot;</li>
              <li><strong>{`{ "index": { "_id": "2" } }`}</strong> {"\u2192"} &quot;ID 2로 인덱싱해줘&quot;라는 동작 지시</li>
              <li>그 다음 줄의 JSON이 실제 저장될 문서 데이터</li>
              <li><strong>&quot;errors&quot;: false</strong> {"\u2192"} 전부 성공! true이면 일부 실패가 있다는 뜻이에요.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="주의: Bulk API의 독특한 형식">
            <p>Bulk API는 일반적인 JSON 배열이 <strong>아닙니다</strong>. 각 줄이 독립적인 JSON이고, 줄바꿈(<code>\n</code>)으로 구분됩니다. 이것을 <strong>NDJSON</strong>(Newline Delimited JSON) 형식이라 합니다. 마지막 줄 끝에도 반드시 줄바꿈이 있어야 합니다.</p>
          </WarnCallout>

          {/* Q&A: ID 자동 생성 */}
          <QaBox question="_id를 꼭 입력해야 하나요? RDB처럼 자동 생성은 안 되나요?">
            <p><strong>ID는 자동 생성이 가능합니다!</strong> _id를 생략하면 Elasticsearch가 자동으로 만들어줍니다.</p>

            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 my-5">
              <div className="bg-surface-2 border border-border rounded-[10px] p-5">
                <h5 className="font-mono text-sm mb-2.5 tracking-wide text-es-blue">ID 직접 지정</h5>
                <pre className="font-mono text-sm leading-relaxed text-text-dim">
                  <span className="text-es-purple">POST</span> <span className="text-es-cyan">/products/_doc/<b>1</b></span>{"\n"}{`{
  "name": "갤럭시북 프로",
  ...
}

`}{"\u2192"} _id: <b>&quot;1&quot;</b>
                </pre>
              </div>
              <div className="bg-surface-2 border border-border rounded-[10px] p-5">
                <h5 className="font-mono text-sm mb-2.5 tracking-wide text-es-green">ID 자동 생성 (생략)</h5>
                <pre className="font-mono text-sm leading-relaxed text-text-dim">
                  <span className="text-es-purple">POST</span> <span className="text-es-cyan">/products/_doc</span>{"\n"}{`{
  "name": "갤럭시북 프로",
  ...
}

`}{"\u2192"} _id: <b>&quot;aBcDeFgHiJk...&quot;</b>
                </pre>
              </div>
            </div>

            <p>Bulk API에서도 마찬가지입니다. <code>_id</code>를 빼면 자동 생성됩니다:</p>
            <div className="bg-surface-2 border border-border rounded-[10px] p-5 my-4">
              <h5 className="font-mono text-sm mb-2.5 tracking-wide text-es-green">Bulk에서 ID 생략</h5>
              <pre className="font-mono text-sm leading-relaxed text-text-dim">
{`{ "index": {} }                  `}<span className="text-[#555]">{"\u2190"} _id 생략!</span>{"\n"}{`{ "name": "자동 ID 상품", ... }`}
              </pre>
            </div>

            <p><strong>RDB와의 차이점:</strong> RDB는 1, 2, 3... 순차적 숫자(auto-increment)지만, ES는 <strong>UUID 기반 랜덤 문자열</strong>을 생성합니다. 분산 시스템에서 여러 노드가 동시에 문서를 넣을 때, 순차 번호는 충돌 위험이 있지만 랜덤 UUID는 충돌이 사실상 불가능하기 때문입니다.</p>

            <table className="w-full border-collapse rounded-lg overflow-hidden border border-border my-4">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-[0.78rem] text-text-dim tracking-wide bg-surface-2 border-b border-border">상황</th>
                  <th className="px-4 py-3 text-left text-[0.78rem] text-text-dim tracking-wide bg-surface-2 border-b border-border">ID 지정 방식</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 text-[0.85rem] font-medium text-text">외부 시스템의 ID가 있을 때 (DB의 PK 등)</td>
                  <td className="px-4 py-3 text-[0.85rem] text-text-dim">직접 지정</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 text-[0.85rem] font-medium text-text">같은 문서를 다시 넣으면 덮어쓰기 하고 싶을 때</td>
                  <td className="px-4 py-3 text-[0.85rem] text-text-dim">직접 지정</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[0.85rem] font-medium text-text">로그, 이벤트 같은 데이터를 그냥 쌓을 때</td>
                  <td className="px-4 py-3 text-[0.85rem] text-text-dim">자동 생성</td>
                </tr>
              </tbody>
            </table>
          </QaBox>

          <Checkpoint>
            <code>&quot;errors&quot;: false</code> 이고 모든 항목이 <code>&quot;result&quot;: &quot;created&quot;</code> 이면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 2: Verify */}
        <LabStep num={2} title="전체 문서 수 확인하기" tags={["kibana"]}>
          <p>데이터가 잘 들어갔는지, products 인덱스에 총 몇 개의 문서가 있는지 확인해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText="GET /products/_count">
            <Kw>GET</Kw> <Url>/products/_count</Url>
          </CmdBlock>

          <ExpectedOutput>
{`{
    "`}<Hl>count</Hl>{`": `}<Hl>6</Hl>{`,
    "_shards": { "total": 1, "successful": 1, "failed": 0 }
}`}
          </ExpectedOutput>

          <ExplainCallout title="_count API">
            <p>검색 조건 없이 <code>_count</code>를 호출하면 인덱스의 <strong>전체 문서 수</strong>를 돌려줍니다. Chapter 1에서 넣은 1개 + 방금 Bulk로 넣은 5개 = <strong>총 6개</strong>입니다.</p>
          </ExplainCallout>

          <Checkpoint>
            <code>&quot;count&quot;: 6</code> 이 보이면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 3: Search all */}
        <LabStep num={3} title="전체 문서를 한눈에 보기" tags={["kibana"]}>
          <p>모든 상품을 조회해봅시다. 검색 조건 없이 <code>_search</code>를 호출하면 전체 문서를 볼 수 있어요.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search
{
  "query": {
    "match_all": {}
  }
}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>{": {\n"}
            {"    "}<JKey>&quot;match_all&quot;</JKey>{": {}\n"}
            {"  }\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="match_all 쿼리">
            <ul>
              <li><strong>match_all</strong>은 &quot;모든 문서를 가져와&quot;라는 뜻입니다. SQL의 <code>SELECT * FROM products</code>와 같아요.</li>
              <li>기본적으로 <strong>최대 10건</strong>만 반환됩니다. 이것은 나중에 <code>size</code> 파라미터로 조절할 수 있어요.</li>
              <li>결과의 <code>hits.total.value</code>를 보면 전체 매칭 수를 알 수 있습니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            6개의 상품 문서가 모두 보이면 성공! 각 문서의 name, brand, price를 살펴보세요.
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: Update & Delete ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 &middot; Hands-on Lab</SectionLabel>
        <SectionTitle>실습: 문서 수정과 삭제</SectionTitle>

        <LabBanner icon={"\u270F\uFE0F"} title="이번 파트에서 배울 것">
          {"문서의 특정 필드만 수정하기, 문서 전체를 덮어쓰기, 그리고 삭제까지.\nElasticsearch에서 수정이 내부적으로 어떻게 동작하는지도 알아봅니다."}
        </LabBanner>

        {/* Step 4: Partial Update */}
        <LabStep num={4} title="특정 필드만 수정하기 (_update)" tags={["kibana"]}>
          <p>소니 헤드폰(ID: 5)이 재입고되었습니다. <code>in_stock</code> 필드만 <code>false</code>에서 <code>true</code>로 바꿔봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`POST /products/_update/5
{
  "doc": {
    "in_stock": true
  }
}`}
          >
            <Kw>POST</Kw> <Url>/products/_update/5</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;doc&quot;</JKey>{": {\n"}
            {"    "}<JKey>&quot;in_stock&quot;</JKey>{": "}<JVal>true</JVal>{"\n"}
            {"  }\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput>
{`{
    "_index": "products",
    "_id": "5",
    "_version": `}<Hl>2</Hl>{`,
    "result": "`}<Hl>updated</Hl>{`"
}`}
          </ExpectedOutput>

          <p>정말 바뀌었는지 확인해볼까요?</p>

          <CmdBlock label="KIBANA DEV TOOLS — 확인" copyText="GET /products/_doc/5">
            <Kw>GET</Kw> <Url>/products/_doc/5</Url>
          </CmdBlock>

          <ExplainCallout title="_update API 이해하기">
            <ul>
              <li><strong>&quot;doc&quot;</strong> 안에 바꾸고 싶은 필드만 넣으면 됩니다. 나머지 필드는 그대로 유지돼요.</li>
              <li><strong>_version: 2</strong> {"\u2192"} 이 문서가 수정되어 버전이 올라갔습니다.</li>
              <li><strong>존재하지 않는 필드</strong>를 넣으면? 새 필드가 추가됩니다! ES는 스키마가 유연해요.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title={`내부적으로는 "수정"이 아니라 "교체"`}>
            <p>Elasticsearch의 문서는 사실 <strong>불변(Immutable)</strong>입니다. _update를 호출하면 내부적으로는 기존 문서를 삭제하고 변경된 내용으로 새 문서를 만듭니다. 우리 눈에는 수정처럼 보이지만, 엔진 내부에서는 delete + reindex가 일어나는 거예요.</p>
          </WarnCallout>

          <Checkpoint>
            <code>&quot;result&quot;: &quot;updated&quot;</code> 가 보이고, GET으로 확인했을 때 <code>&quot;in_stock&quot;: true</code>이면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 5: Full Replace */}
        <LabStep num={5} title="문서 전체를 덮어쓰기 (PUT)" tags={["kibana"]}>
          <p>갤럭시북 프로(ID: 1)가 신모델로 교체되었습니다. 문서 전체를 새로운 내용으로 바꿔봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`PUT /products/_doc/1
{
  "name": "삼성 갤럭시북4 프로",
  "category": "노트북",
  "price": 1790000,
  "brand": "삼성",
  "description": "AI 기능이 탑재된 차세대 업무용 노트북",
  "in_stock": true
}`}
          >
            <Kw>PUT</Kw> <Url>/products/_doc/1</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;name&quot;</JKey>{": "}<JStr>&quot;삼성 갤럭시북4 프로&quot;</JStr>{",\n"}
            {"  "}<JKey>&quot;category&quot;</JKey>{": "}<JStr>&quot;노트북&quot;</JStr>{",\n"}
            {"  "}<JKey>&quot;price&quot;</JKey>{": "}<JVal>1790000</JVal>{",\n"}
            {"  "}<JKey>&quot;brand&quot;</JKey>{": "}<JStr>&quot;삼성&quot;</JStr>{",\n"}
            {"  "}<JKey>&quot;description&quot;</JKey>{": "}<JStr>&quot;AI 기능이 탑재된 차세대 업무용 노트북&quot;</JStr>{",\n"}
            {"  "}<JKey>&quot;in_stock&quot;</JKey>{": "}<JVal>true</JVal>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput>
{`{
    "_id": "1",
    "_version": `}<Hl>2</Hl>{`,
    "result": "`}<Hl>updated</Hl>{`"
}`}
          </ExpectedOutput>

          <ExplainCallout title="PUT vs POST _update 차이">
            <ul>
              <li><strong>PUT /products/_doc/1</strong> {"\u2192"} 문서 <strong>전체를 교체</strong>합니다. body에 넣지 않은 필드는 사라져요!</li>
              <li><strong>POST /products/_update/1</strong> {"\u2192"} 지정한 필드만 수정합니다. 나머지는 그대로 유지.</li>
              <li>PUT은 &quot;이 문서를 이걸로 통째로 바꿔줘&quot;, _update는 &quot;이 부분만 고쳐줘&quot;</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            <code>&quot;result&quot;: &quot;updated&quot;</code>가 보이면 성공! <code>GET /products/_doc/1</code>로 내용이 바뀌었는지 확인해보세요.
          </Checkpoint>
        </LabStep>

        {/* Step 6: Delete */}
        <LabStep num={6} title="문서 삭제하기" tags={["kibana"]}>
          <p>레노버 씽크패드(ID: 6)를 더 이상 판매하지 않기로 했습니다. 삭제해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText="DELETE /products/_doc/6">
            <Kw>DELETE</Kw> <Url>/products/_doc/6</Url>
          </CmdBlock>

          <ExpectedOutput>
{`{
    "_id": "6",
    "_version": 2,
    "result": "`}<Hl>deleted</Hl>{`"
}`}
          </ExpectedOutput>

          <p>정말 삭제되었는지 확인해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 확인" copyText="GET /products/_doc/6">
            <Kw>GET</Kw> <Url>/products/_doc/6</Url>
          </CmdBlock>

          <ExpectedOutput>
{`{
    "_index": "products",
    "_id": "6",
    "`}<Hl>found</Hl>{`": `}<Hl>false</Hl>{`
}`}
          </ExpectedOutput>

          <ExplainCallout title="삭제의 진실">
            <ul>
              <li><strong>&quot;found&quot;: false</strong> {"\u2192"} 문서가 없다는 뜻입니다.</li>
              <li>내부적으로 ES는 문서를 바로 지우지 않고 <strong>&quot;삭제됨&quot; 표시</strong>만 해둡니다.</li>
              <li>나중에 백그라운드에서 <strong>세그먼트 병합(segment merge)</strong> 시 실제로 제거됩니다.</li>
              <li>이 방식 덕분에 삭제가 매우 빠릅니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            <code>&quot;found&quot;: false</code>가 보이면 삭제 성공! <code>GET /products/_count</code>로 5개인지도 확인해보세요.
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 이론: 매핑(Mapping) ═══════ */}
      <Section>
        <SectionLabel>Part 4 &middot; Theory</SectionLabel>
        <SectionTitle>{"매핑(Mapping)\n— Elasticsearch가 데이터를 이해하는 방법"}</SectionTitle>

        <p>RDB에서 테이블을 만들 때 <code>CREATE TABLE products (name VARCHAR, price INT ...)</code> 이렇게 <strong>컬럼의 타입</strong>을 정의하죠?</p>

        <p>Elasticsearch에서도 마찬가지입니다. 각 필드가 <strong>어떤 타입인지</strong> 정의하는 것을 <span className="text-accent font-medium">매핑(Mapping)</span>이라 합니다.</p>

        <MappingVisual />

        <p>우리는 매핑을 직접 정의하지 않았는데, 어떻게 ES가 타입을 알까요? 바로 <strong>Dynamic Mapping</strong> 덕분입니다.</p>

        <ExplainCallout title="Dynamic Mapping (자동 매핑)">
          <p>Elasticsearch는 문서를 넣을 때 각 필드의 값을 보고 <strong>자동으로 타입을 추론</strong>합니다.</p>
          <ul>
            <li><code>&quot;삼성 갤럭시북 프로&quot;</code> {"\u2192"} 문자열이니까 <strong>text</strong> 타입</li>
            <li><code>1590000</code> {"\u2192"} 숫자니까 <strong>long</strong> 타입</li>
            <li><code>true</code> {"\u2192"} 불린이니까 <strong>boolean</strong> 타입</li>
            <li><code>&quot;2026-01-15&quot;</code> {"\u2192"} 날짜 형식이니까 <strong>date</strong> 타입</li>
          </ul>
        </ExplainCallout>

        <p>그렇다면 <strong>text</strong>와 <strong>keyword</strong>의 차이는 뭘까요? 이것이 매핑에서 가장 중요한 개념입니다.</p>

        <TypeTable />

        <WarnCallout title="text vs keyword — 가장 흔한 실수">
          <p>카테고리, 브랜드, 상태값 같은 필드를 <strong>text</strong> 타입으로 두면, &quot;노트북&quot;으로 정확히 필터링하거나 집계할 수 없습니다. 이런 필드는 <strong>keyword</strong> 타입이어야 해요. Dynamic Mapping은 문자열을 보면 text + keyword 둘 다 만들어주지만, 직접 매핑을 정의하면 더 효율적입니다.</p>
        </WarnCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 5 — 실습: 매핑 확인 & 직접 정의 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 5 &middot; Hands-on Lab</SectionLabel>
        <SectionTitle>{"실습: 매핑 확인하고\n직접 정의해보기"}</SectionTitle>

        <LabBanner icon={"\uD83D\uDD0D"} title="이번 파트에서 배울 것">
          ES가 자동으로 만든 매핑을 확인하고, 새 인덱스에 직접 매핑을 정의해봅니다.
        </LabBanner>

        {/* Step 7: Check mapping */}
        <LabStep num={7} title="자동 생성된 매핑 확인하기" tags={["kibana"]}>
          <p>ES가 products 인덱스에 어떤 매핑을 자동으로 만들었는지 확인해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText="GET /products/_mapping">
            <Kw>GET</Kw> <Url>/products/_mapping</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심 부분)">
{`{
  "products": {
    "mappings": {
      "properties": {
        "name": {
          "type": "`}<Hl>text</Hl>{`",
          "fields": {
            "keyword": { "type": "`}<Hl>keyword</Hl>{`" }
          }
        },
        "price": { "type": "`}<Hl>long</Hl>{`" },
        "in_stock": { "type": "`}<Hl>boolean</Hl>{`" },
        "brand": {
          "type": "text",
          "fields": {
            "keyword": { "type": "keyword" }
          }
        },
        ...
      }
    }
  }
}`}
          </ExpectedOutput>

          <ExplainCallout title="Dynamic Mapping 결과 분석">
            <ul>
              <li>문자열 필드(name, brand 등)는 <strong>text + keyword 둘 다</strong> 만들어졌습니다.</li>
              <li><code>name</code>은 전문 검색용(text), <code>name.keyword</code>는 정렬/필터용(keyword)</li>
              <li><code>price</code>는 <strong>long</strong>(정수), <code>in_stock</code>은 <strong>boolean</strong>으로 정확히 추론되었습니다.</li>
              <li>편리하지만 비효율적일 수 있어요 — text가 필요 없는 필드에도 text 타입이 붙으니까요.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            매핑 정보가 보이고, 각 필드의 타입이 확인되면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 8: Create index with mapping */}
        <LabStep num={8} title="직접 매핑을 정의한 새 인덱스 만들기" tags={["kibana"]}>
          <p>이번에는 Dynamic Mapping에 의존하지 않고, <strong>직접 매핑을 설계</strong>해봅시다. 리뷰(review) 데이터를 저장할 인덱스를 만듭니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`PUT /reviews
{
  "mappings": {
    "properties": {
      "product_id": { "type": "keyword" },
      "author":     { "type": "keyword" },
      "rating":     { "type": "integer" },
      "content":    { "type": "text" },
      "created_at": { "type": "date" }
    }
  }
}`}
          >
            <Kw>PUT</Kw> <Url>/reviews</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>{": {\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>{": {\n"}
            {"      "}<JKey>&quot;product_id&quot;</JKey>{": { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;keyword&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;author&quot;</JKey>{"    : { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;keyword&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;rating&quot;</JKey>{"    : { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;integer&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;content&quot;</JKey>{"   : { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;text&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;created_at&quot;</JKey>{": { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;date&quot;</JStr>{" }\n"}
            {"    }\n"}
            {"  }\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput>
{`{
    "acknowledged": `}<Hl>true</Hl>{`,
    "shards_acknowledged": true,
    "index": "`}<Hl>reviews</Hl>{`"
}`}
          </ExpectedOutput>

          <ExplainCallout title="매핑 설계 의도">
            <ul>
              <li><strong>product_id</strong> {"\u2192"} <code>keyword</code>: 정확한 값으로 필터링할 것이므로 (쪼갤 필요 없음)</li>
              <li><strong>author</strong> {"\u2192"} <code>keyword</code>: 작성자 이름은 통째로 비교 (&quot;홍길동&quot; 전체 일치)</li>
              <li><strong>rating</strong> {"\u2192"} <code>integer</code>: 평점은 정수(1~5)로 범위 검색/평균 계산에 사용</li>
              <li><strong>content</strong> {"\u2192"} <code>text</code>: 리뷰 내용은 전문 검색이 필요 (단어 단위로 쪼개야 함)</li>
              <li><strong>created_at</strong> {"\u2192"} <code>date</code>: 날짜별 정렬, 기간 검색에 사용</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            <code>&quot;acknowledged&quot;: true</code>가 보이면 성공! 인덱스가 생성되었습니다.
          </Checkpoint>
        </LabStep>

        {/* Step 9: Insert review */}
        <LabStep num={9} title="리뷰 데이터 넣고 검색해보기" tags={["kibana"]}>
          <p>방금 만든 reviews 인덱스에 리뷰를 넣고, 직접 정의한 매핑이 잘 동작하는지 확인해봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 리뷰 3개 넣기"
            copyText={`POST /reviews/_bulk
{ "index": { "_id": "1" } }
{ "product_id": "1", "author": "김개발", "rating": 5, "content": "가볍고 성능도 좋아서 개발할 때 정말 편합니다. 배터리도 오래가요.", "created_at": "2026-03-10" }
{ "index": { "_id": "2" } }
{ "product_id": "1", "author": "박디자인", "rating": 4, "content": "디자인은 예쁜데 화면이 조금 작은 느낌. 성능은 만족합니다.", "created_at": "2026-03-12" }
{ "index": { "_id": "3" } }
{ "product_id": "2", "author": "이영상", "rating": 5, "content": "영상 편집할 때 렌더링이 빠르고 화면 색감이 훌륭합니다.", "created_at": "2026-03-15" }
`}
          >
            <Kw>POST</Kw> <Url>/reviews/_bulk</Url>{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;1&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;product_id&quot;</JKey>{": "}<JStr>&quot;1&quot;</JStr>{", "}<JKey>&quot;author&quot;</JKey>{": "}<JStr>&quot;김개발&quot;</JStr>{", "}<JKey>&quot;rating&quot;</JKey>{": "}<JVal>5</JVal>{", "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;가볍고 성능도 좋아서 개발할 때 정말 편합니다. 배터리도 오래가요.&quot;</JStr>{", "}<JKey>&quot;created_at&quot;</JKey>{": "}<JStr>&quot;2026-03-10&quot;</JStr>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;2&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;product_id&quot;</JKey>{": "}<JStr>&quot;1&quot;</JStr>{", "}<JKey>&quot;author&quot;</JKey>{": "}<JStr>&quot;박디자인&quot;</JStr>{", "}<JKey>&quot;rating&quot;</JKey>{": "}<JVal>4</JVal>{", "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;디자인은 예쁜데 화면이 조금 작은 느낌. 성능은 만족합니다.&quot;</JStr>{", "}<JKey>&quot;created_at&quot;</JKey>{": "}<JStr>&quot;2026-03-12&quot;</JStr>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;3&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;product_id&quot;</JKey>{": "}<JStr>&quot;2&quot;</JStr>{", "}<JKey>&quot;author&quot;</JKey>{": "}<JStr>&quot;이영상&quot;</JStr>{", "}<JKey>&quot;rating&quot;</JKey>{": "}<JVal>5</JVal>{", "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;영상 편집할 때 렌더링이 빠르고 화면 색감이 훌륭합니다.&quot;</JStr>{", "}<JKey>&quot;created_at&quot;</JKey>{": "}<JStr>&quot;2026-03-15&quot;</JStr>{" }"}
          </CmdBlock>

          <p>이제 &quot;성능&quot; 키워드로 리뷰를 검색해봅시다:</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 검색"
            copyText={`GET /reviews/_search
{
  "query": {
    "match": {
      "content": "성능"
    }
  }
}`}
          >
            <Kw>GET</Kw> <Url>/reviews/_search</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>{": {\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>{": {\n"}
            {"      "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;성능&quot;</JStr>{"\n"}
            {"    }\n"}
            {"  }\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput>
{`"hits": {
    "total": { "value": `}<Hl>0</Hl>{` },    `}<span className="text-es-red">{"\u2190"} 검색 결과가 0건!</span>{`
    "hits": []
}`}
          </ExpectedOutput>

          <WarnCallout title="왜 0건일까? — 한글 형태소 분석의 한계">
            <p>리뷰에는 분명 &quot;성능&quot;이 들어있는데 왜 검색이 안 될까요? 기본 분석기(standard analyzer)가 한글을 어떻게 쪼개는지 직접 확인해봅시다:</p>
          </WarnCallout>

          <CmdBlock
            label="KIBANA DEV TOOLS — 분석기 테스트"
            copyText={`GET /reviews/_analyze
{
  "text": "가볍고 성능도 좋아서 개발할 때 정말 편합니다"
}`}
          >
            <Kw>GET</Kw> <Url>/reviews/_analyze</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>{": "}<JStr>&quot;가볍고 성능도 좋아서 개발할 때 정말 편합니다&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
{`"tokens": [
    { "token": "`}<Hl>가볍고</Hl>{`" },
    { "token": "`}<Hl>성능도</Hl>{`" },     `}<span className="text-es-red">{"\u2190"} &quot;성능&quot; + &quot;도&quot;가 분리되지 않음!</span>{`
    { "token": "`}<Hl>좋아서</Hl>{`" },
    { "token": "개발할" },
    { "token": "때" },
    { "token": "정말" },
    { "token": "편합니다" }
]`}
          </ExpectedOutput>

          <ExplainCallout title="문제의 원인">
            <ul>
              <li>기본 분석기(standard)는 <strong>띄어쓰기 기준</strong>으로만 단어를 쪼갭니다.</li>
              <li>&quot;성능<strong>도</strong>&quot; {"\u2192"} 하나의 토큰으로 저장됨. 검색어 &quot;성능&quot;과 일치하지 않습니다.</li>
              <li>&quot;성능<strong>은</strong>&quot; {"\u2192"} 마찬가지. 조사가 붙은 형태 그대로 저장되어 있어요.</li>
              <li>한국어는 <strong>조사(&quot;도&quot;, &quot;은&quot;, &quot;이&quot;, &quot;를&quot;...)</strong>가 단어에 붙기 때문에, 이걸 분리해주는 <strong>한글 형태소 분석기</strong>가 필요합니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint icon={"\u26A0\uFE0F"} title="예상된 실패입니다!">
            0건이 나와야 정상이에요. 이 문제를 다음 Step에서 nori 형태소 분석기로 해결합니다.
          </Checkpoint>
        </LabStep>

        {/* Step 10: Nori 해결 */}
        <LabStep num={10} title="nori 한글 형태소 분석기로 해결하기" tags={["kibana"]}>
          <p><strong>nori</strong>는 Elasticsearch의 공식 한국어 형태소 분석기입니다. &quot;성능도&quot;를 &quot;성능&quot; + &quot;도&quot;로 분리해줘요. 기존 인덱스를 삭제하고, nori를 적용한 새 인덱스를 만들어봅시다.</p>

          <p><strong>Step 10-1.</strong> 기존 reviews 인덱스 삭제:</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText="DELETE /reviews">
            <Kw>DELETE</Kw> <Url>/reviews</Url>
          </CmdBlock>

          <ExplainCallout title="왜 삭제해야 하나요?">
            <p>Elasticsearch는 <strong>이미 생성된 인덱스의 분석기(analyzer)를 변경할 수 없습니다.</strong> 매핑과 분석기는 인덱스 생성 시점에 결정되기 때문에, 분석기를 바꾸려면 인덱스를 삭제하고 다시 만들어야 합니다. (실무에서는 reindex API를 사용합니다.)</p>
          </ExplainCallout>

          <p><strong>Step 10-2.</strong> nori 분석기를 적용한 새 인덱스 생성:</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`PUT /reviews
{
  "settings": {
    "analysis": {
      "analyzer": {
        "korean": {
          "type": "custom",
          "tokenizer": "nori_tokenizer"
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "product_id": { "type": "keyword" },
      "author":     { "type": "keyword" },
      "rating":     { "type": "integer" },
      "content":    { "type": "text", "analyzer": "korean" },
      "created_at": { "type": "date" }
    }
  }
}`}
          >
            <Kw>PUT</Kw> <Url>/reviews</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;settings&quot;</JKey>{": {\n"}
            {"    "}<JKey>&quot;analysis&quot;</JKey>{": {\n"}
            {"      "}<JKey>&quot;analyzer&quot;</JKey>{": {\n"}
            {"        "}<JKey>&quot;korean&quot;</JKey>{": {\n"}
            {"          "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;custom&quot;</JStr>{",\n"}
            {"          "}<JKey>&quot;tokenizer&quot;</JKey>{": "}<JStr>&quot;nori_tokenizer&quot;</JStr>{"\n"}
            {"        }\n"}
            {"      }\n"}
            {"    }\n"}
            {"  },\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>{": {\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>{": {\n"}
            {"      "}<JKey>&quot;product_id&quot;</JKey>{": { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;keyword&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;author&quot;</JKey>{"    : { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;keyword&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;rating&quot;</JKey>{"    : { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;integer&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;content&quot;</JKey>{"   : { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;text&quot;</JStr>{", "}<JKey>&quot;analyzer&quot;</JKey>{": "}<JStr>&quot;korean&quot;</JStr>{" },\n"}
            {"      "}<JKey>&quot;created_at&quot;</JKey>{": { "}<JKey>&quot;type&quot;</JKey>{": "}<JStr>&quot;date&quot;</JStr>{" }\n"}
            {"    }\n"}
            {"  }\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="달라진 점">
            <ul>
              <li><strong>settings.analysis</strong>에 &quot;korean&quot;이라는 커스텀 분석기를 정의했습니다.</li>
              <li>이 분석기는 <strong>nori_tokenizer</strong>를 사용합니다 — 한국어 형태소를 분리해주는 토크나이저예요.</li>
              <li>content 필드에 <strong>&quot;analyzer&quot;: &quot;korean&quot;</strong>을 지정해서, 이 필드에 저장되는 텍스트는 nori로 분석됩니다.</li>
            </ul>
          </ExplainCallout>

          <p><strong>Step 10-3.</strong> 리뷰 데이터를 다시 넣습니다:</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 리뷰 다시 넣기"
            copyText={`POST /reviews/_bulk
{ "index": { "_id": "1" } }
{ "product_id": "1", "author": "김개발", "rating": 5, "content": "가볍고 성능도 좋아서 개발할 때 정말 편합니다. 배터리도 오래가요.", "created_at": "2026-03-10" }
{ "index": { "_id": "2" } }
{ "product_id": "1", "author": "박디자인", "rating": 4, "content": "디자인은 예쁜데 화면이 조금 작은 느낌. 성능은 만족합니다.", "created_at": "2026-03-12" }
{ "index": { "_id": "3" } }
{ "product_id": "2", "author": "이영상", "rating": 5, "content": "영상 편집할 때 렌더링이 빠르고 화면 색감이 훌륭합니다.", "created_at": "2026-03-15" }
`}
          >
            <Kw>POST</Kw> <Url>/reviews/_bulk</Url>{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;1&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;product_id&quot;</JKey>{": "}<JStr>&quot;1&quot;</JStr>{", "}<JKey>&quot;author&quot;</JKey>{": "}<JStr>&quot;김개발&quot;</JStr>{", "}<JKey>&quot;rating&quot;</JKey>{": "}<JVal>5</JVal>{", "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;가볍고 성능도 좋아서 개발할 때 정말 편합니다. 배터리도 오래가요.&quot;</JStr>{", "}<JKey>&quot;created_at&quot;</JKey>{": "}<JStr>&quot;2026-03-10&quot;</JStr>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;2&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;product_id&quot;</JKey>{": "}<JStr>&quot;1&quot;</JStr>{", "}<JKey>&quot;author&quot;</JKey>{": "}<JStr>&quot;박디자인&quot;</JStr>{", "}<JKey>&quot;rating&quot;</JKey>{": "}<JVal>4</JVal>{", "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;디자인은 예쁜데 화면이 조금 작은 느낌. 성능은 만족합니다.&quot;</JStr>{", "}<JKey>&quot;created_at&quot;</JKey>{": "}<JStr>&quot;2026-03-12&quot;</JStr>{" }"}{"\n"}
            {"{ "}<JKey>&quot;index&quot;</JKey>{": { "}<JKey>&quot;_id&quot;</JKey>{": "}<JStr>&quot;3&quot;</JStr>{" } }"}{"\n"}
            {"{ "}<JKey>&quot;product_id&quot;</JKey>{": "}<JStr>&quot;2&quot;</JStr>{", "}<JKey>&quot;author&quot;</JKey>{": "}<JStr>&quot;이영상&quot;</JStr>{", "}<JKey>&quot;rating&quot;</JKey>{": "}<JVal>5</JVal>{", "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;영상 편집할 때 렌더링이 빠르고 화면 색감이 훌륭합니다.&quot;</JStr>{", "}<JKey>&quot;created_at&quot;</JKey>{": "}<JStr>&quot;2026-03-15&quot;</JStr>{" }"}
          </CmdBlock>

          <p><strong>Step 10-4.</strong> nori가 데이터를 어떻게 쪼개서 저장했는지 확인해봅시다:</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — nori 분석 결과 확인"
            copyText={`GET /reviews/_analyze
{
  "analyzer": "korean",
  "text": "가볍고 성능도 좋아서 개발할 때 정말 편합니다"
}`}
          >
            <Kw>GET</Kw> <Url>/reviews/_analyze</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>{": "}<JStr>&quot;korean&quot;</JStr>{",\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>{": "}<JStr>&quot;가볍고 성능도 좋아서 개발할 때 정말 편합니다&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
{`"tokens": [
    { "token": "가볍" },
    { "token": "`}<Hl>성능</Hl>{`" },      `}<span className="text-es-green">{"\u2190"} &quot;성능도&quot;에서 어근 &quot;성능&quot;이 분리됨!</span>{`
    { "token": "좋" },
    { "token": "개발" },
    { "token": "때" },
    { "token": "정말" },
    { "token": "편하" }
]`}
          </ExpectedOutput>

          <ExplainCallout title="standard vs nori 비교">
            <ul>
              <li><strong>standard</strong>: &quot;성능도&quot; {"\u2192"} <code>[&quot;성능도&quot;]</code> (쪼개지 않음)</li>
              <li><strong>nori</strong>: &quot;성능도&quot; {"\u2192"} <code>[&quot;성능&quot;]</code> (어근만 추출, 조사 &quot;도&quot; 제거)</li>
              <li>nori는 &quot;편합니다&quot; {"\u2192"} &quot;편하&quot;, &quot;좋아서&quot; {"\u2192"} &quot;좋&quot; 처럼 <strong>어근(stem)</strong>을 추출합니다.</li>
              <li>이 덕분에 &quot;성능&quot;, &quot;성능도&quot;, &quot;성능이&quot;, &quot;성능은&quot; 모두 같은 토큰 &quot;성능&quot;으로 매칭됩니다!</li>
            </ul>
          </ExplainCallout>

          <p><strong>Step 10-5.</strong> 다시 &quot;성능&quot;으로 검색!</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 검색"
            copyText={`GET /reviews/_search
{
  "query": {
    "match": {
      "content": "성능"
    }
  }
}`}
          >
            <Kw>GET</Kw> <Url>/reviews/_search</Url>{"\n"}
            {"{\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>{": {\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>{": {\n"}
            {"      "}<JKey>&quot;content&quot;</JKey>{": "}<JStr>&quot;성능&quot;</JStr>{"\n"}
            {"    }\n"}
            {"  }\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput>
{`"hits": {
    "total": { "value": `}<Hl>2</Hl>{` },
    "hits": [
        { "_source": { "author": "`}<Hl>김개발</Hl>{`", "content": "가볍고 `}<Hl>성능도</Hl>{` 좋아서..." } },
        { "_source": { "author": "`}<Hl>박디자인</Hl>{`", "content": "...`}<Hl>성능은</Hl>{` 만족합니다." } }
    ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="정리: 한국어 검색을 위한 핵심 포인트">
            <ul>
              <li>한국어 텍스트를 검색하려면 <strong>nori 형태소 분석기</strong>가 필수입니다.</li>
              <li>nori는 조사, 어미를 분리하고 <strong>어근(stem)</strong>을 추출하여 역색인에 저장합니다.</li>
              <li>인덱스 생성 시 <strong>settings</strong>에 분석기를 정의하고, <strong>mappings</strong>에서 필드에 연결합니다.</li>
              <li>이미 생성된 인덱스의 분석기는 변경할 수 없으므로, <strong>설계 시점에</strong> 분석기를 결정하는 것이 중요합니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            &quot;성능&quot;으로 검색해서 <strong>2건</strong>이 나오면 성공! nori 형태소 분석기의 힘을 직접 체감했습니다.
          </Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

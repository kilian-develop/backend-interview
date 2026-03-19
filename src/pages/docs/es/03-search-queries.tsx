
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal, Cm } from "@/components/es/content/CmdBlock";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

/* ─── Inline visuals ─── */

function QueryGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
      {/* match card */}
      <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-green group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-es-cyan" />
        <h3 className="font-mono text-lg mb-3 text-es-green">match</h3>
        <p className="text-[0.9rem] text-text-dim mb-3"><strong className="text-text font-medium">전문 검색(Full-text Search)</strong></p>
        <p className="text-[0.9rem] text-text-dim mb-3">검색어를 분석기로 쪼갠 뒤, 역색인에서 매칭되는 문서를 찾습니다. 관련도(_score)가 계산됩니다.</p>
        <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg px-4 py-3 mt-3 text-text-dim leading-relaxed">
          <span className="text-es-green">&quot;업무용 노트북&quot;</span> 으로 검색하면<br />
          → &quot;업무용&quot;, &quot;노트북&quot; 각각 매칭<br />
          → 둘 다 포함하면 점수 높음
        </div>
        <p className="mt-4 text-[0.82rem] text-text-dim !mb-0">text 타입 필드에 사용</p>
      </div>

      {/* term card */}
      <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-blue group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-purple" />
        <h3 className="font-mono text-lg mb-3 text-es-blue">term</h3>
        <p className="text-[0.9rem] text-text-dim mb-3"><strong className="text-text font-medium">정확 일치(Exact Match)</strong></p>
        <p className="text-[0.9rem] text-text-dim mb-3">검색어를 분석하지 않고, 값이 <strong className="text-text font-medium">정확히 일치</strong>하는 문서만 찾습니다. 점수 계산 없이 Yes/No입니다.</p>
        <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg px-4 py-3 mt-3 text-text-dim leading-relaxed">
          <span className="text-es-blue">&quot;삼성&quot;</span> 으로 검색하면<br />
          → &quot;삼성&quot;과 정확히 일치하는 것만<br />
          → &quot;삼성전자&quot;는 매칭 안 됨
        </div>
        <p className="mt-4 text-[0.82rem] text-text-dim !mb-0">keyword, boolean, integer 등에 사용</p>
      </div>
    </div>
  );
}

function BoolVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">bool 쿼리의 4가지 절(clause)</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1">SQL로 치면 WHERE절의 AND, OR, NOT 조합</div>
      <div className="grid grid-cols-2 gap-5 max-w-[700px] mx-auto mt-6 max-md:grid-cols-1">
        {/* must */}
        <div className="rounded-xl p-5 text-center bg-es-green/[0.08] border border-es-green/20">
          <h4 className="font-mono text-[0.9rem] mb-1 text-es-green">must</h4>
          <p className="text-[0.82rem] text-text-dim !mb-0">반드시 포함해야 함<br /><strong className="text-text font-medium">AND 조건 + 점수 계산</strong></p>
          <p className="mt-2 text-[0.78rem] text-es-green !mb-0">검색 결과의 관련도에 영향</p>
        </div>
        {/* filter */}
        <div className="rounded-xl p-5 text-center bg-es-blue/[0.06] border border-es-blue/20">
          <h4 className="font-mono text-[0.9rem] mb-1 text-es-blue">filter</h4>
          <p className="text-[0.82rem] text-text-dim !mb-0">반드시 포함해야 함<br /><strong className="text-text font-medium">AND 조건 + 점수 무시</strong></p>
          <p className="mt-2 text-[0.78rem] text-es-blue !mb-0">캐싱되어 must보다 빠름</p>
        </div>
        {/* should */}
        <div className="rounded-xl p-5 text-center bg-accent/[0.06] border border-accent/20">
          <h4 className="font-mono text-[0.9rem] mb-1 text-accent">should</h4>
          <p className="text-[0.82rem] text-text-dim !mb-0">포함하면 점수 올라감<br /><strong className="text-text font-medium">OR / 보너스 조건</strong></p>
          <p className="mt-2 text-[0.78rem] text-accent !mb-0">있으면 좋지만 필수는 아님</p>
        </div>
        {/* must_not */}
        <div className="rounded-xl p-5 text-center bg-es-red/[0.06] border border-es-red/20">
          <h4 className="font-mono text-[0.9rem] mb-1 text-es-red">must_not</h4>
          <p className="text-[0.82rem] text-text-dim !mb-0">반드시 제외해야 함<br /><strong className="text-text font-medium">NOT 조건</strong></p>
          <p className="mt-2 text-[0.78rem] text-es-red !mb-0">점수 계산 없음</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main chapter content ─── */

export default function Chapter03() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: match vs term ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>
          두 가지 검색 방식<br />— match vs term
        </SectionTitle>

        <p className="text-text-dim text-[1.05rem] mb-6">
          Elasticsearch 검색의 출발점은 이 두 가지를 구분하는 것입니다. 검색하려는 필드의 <strong className="text-text font-medium">타입</strong>에 따라 사용할 쿼리가 달라져요.
        </p>

        <QueryGrid />

        <ExplainCallout title="언제 어떤 걸 쓸까?">
          <ul>
            <li>사용자가 <strong>자유롭게 입력하는 검색어</strong> (검색창) → <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">match</code></li>
            <li><strong>카테고리 필터</strong>, 브랜드 선택, 상태값 확인 → <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">term</code></li>
            <li>리뷰 내용에서 키워드 찾기 → <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">match</code></li>
            <li>특정 product_id의 리뷰만 가져오기 → <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">term</code></li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="가장 흔한 실수: text 필드에 term 쿼리">
          <p>
            <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">text</code> 타입 필드에 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">term</code> 쿼리를 쓰면 원하는 결과가 안 나옵니다. text 필드는 저장 시 분석기가 값을 소문자로 바꾸거나 쪼개기 때문에, 원본 그대로 비교하는 term은 매칭이 안 되는 거예요. 필터링에는 반드시 <strong className="text-text font-medium">keyword</strong> 타입(또는 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">.keyword</code> 서브필드)을 사용하세요.
          </p>
        </WarnCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: match & term ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>
          실습: match와 term<br />직접 비교해보기
        </SectionTitle>

        <LabBanner icon="&#x1F50D;" title="사전 조건">
          Chapter 2까지 완료한 상태여야 합니다. products 인덱스(5개)와 reviews 인덱스(nori 적용, 3개)가 있어야 해요.<br />
          없다면 Chapter 2를 먼저 진행해주세요.
        </LabBanner>

        {/* Step 1: match */}
        <LabStep num={1} title="match 쿼리 — 전문 검색" tags={["kibana"]}>
          <p>products 인덱스의 description 필드에서 <strong className="text-text font-medium">&quot;업무용 노트북&quot;</strong>을 검색해봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search\n{\n  "query": {\n    "match": {\n      "description": "업무용 노트북"\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;업무용 노트북&quot;</JStr>{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="match 쿼리의 동작 원리">
            <ul>
              <li>검색어 &quot;업무용 노트북&quot;을 분석기가 <strong>&quot;업무용&quot;, &quot;노트북&quot;</strong>으로 쪼갭니다.</li>
              <li>각 단어가 역색인에서 매칭되는 문서를 찾습니다.</li>
              <li>기본적으로 <strong>OR 조건</strong>입니다 — &quot;업무용&quot; 또는 &quot;노트북&quot; 중 하나만 포함해도 결과에 나옵니다.</li>
              <li>두 단어 모두 포함한 문서가 <strong>_score가 더 높습니다</strong>.</li>
            </ul>
          </ExplainCallout>

          <p>만약 두 단어가 <strong className="text-text font-medium">모두 포함</strong>된 문서만 찾고 싶다면?</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — AND 조건"
            copyText={`GET /products/_search\n{\n  "query": {\n    "match": {\n      "description": {\n        "query": "업무용 노트북",\n        "operator": "and"\n      }\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;query&quot;</JKey>: <JStr>&quot;업무용 노트북&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;operator&quot;</JKey>: <JStr>&quot;and&quot;</JStr>{"\n"}
            {"      "}{"}"}{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title='operator: "and"'>
            <p><code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;operator&quot;: &quot;and&quot;</code>를 추가하면 &quot;업무용&quot; <strong>그리고</strong> &quot;노트북&quot; 둘 다 포함된 문서만 나옵니다. 기본값은 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;or&quot;</code>입니다.</p>
          </ExplainCallout>

          <Checkpoint>
            OR 검색과 AND 검색의 결과 건수가 다른지 비교해보세요. OR이 더 많은 결과를 반환합니다.
          </Checkpoint>
        </LabStep>

        {/* Step 2: term */}
        <LabStep num={2} title="term 쿼리 — 정확 일치 검색" tags={["kibana"]}>
          <p>이번에는 <strong className="text-text font-medium">brand가 정확히 &quot;삼성&quot;인 상품</strong>만 찾아봅시다. 필터링에는 term을 사용합니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search\n{\n  "query": {\n    "term": {\n      "brand.keyword": "삼성"\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;term&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;brand.keyword&quot;</JKey>: <JStr>&quot;삼성&quot;</JStr>{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="왜 brand가 아니라 brand.keyword인가요?">
            <ul>
              <li>Chapter 2에서 본 것처럼, Dynamic Mapping은 문자열 필드에 <strong>text + keyword</strong> 둘 다 만듭니다.</li>
              <li><code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">brand</code> → text 타입 (분석됨, 검색용)</li>
              <li><code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">brand.keyword</code> → keyword 타입 (원본 그대로, 필터용)</li>
              <li>term 쿼리는 정확 일치이므로, <strong>분석되지 않은 keyword</strong> 필드를 써야 합니다.</li>
            </ul>
          </ExplainCallout>

          <p>만약 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">brand</code>(text 타입)에 term을 쓰면 어떻게 될까요? 직접 해봅시다:</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 잘못된 사용"
            copyText={`GET /products/_search\n{\n  "query": {\n    "term": {\n      "brand": "삼성"\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;term&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;brand&quot;</JKey>: <JStr>&quot;삼성&quot;</JStr>     <Cm>&larr; .keyword 없이!</Cm>{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="결과 비교">
            <p>한글의 경우 이 예시에서는 둘 다 결과가 나올 수 있지만, <strong>영문 데이터</strong>에서는 확실한 차이가 생깁니다. text 타입은 &quot;Samsung&quot;을 &quot;samsung&quot;(소문자)으로 저장하는데, term은 &quot;Samsung&quot;과 &quot;samsung&quot;을 다른 값으로 보기 때문입니다. <strong>습관적으로 keyword를 쓰는 것</strong>이 안전합니다.</p>
          </ExplainCallout>

          <Checkpoint>
            <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">brand.keyword</code>로 검색해서 삼성 상품만 나오면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 3: terms */}
        <LabStep num={3} title="terms 쿼리 — 여러 값 중 하나 일치" tags={["kibana"]}>
          <p>삼성 <strong className="text-text font-medium">또는</strong> 애플 상품을 한번에 찾고 싶다면? <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">terms</code>(복수형)를 사용합니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search\n{\n  "query": {\n    "terms": {\n      "brand.keyword": ["삼성", "애플"]\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;terms&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;brand.keyword&quot;</JKey>: [<JStr>&quot;삼성&quot;</JStr>, <JStr>&quot;애플&quot;</JStr>]{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="term vs terms">
            <ul>
              <li><strong>term</strong>: 하나의 값과 정확 일치 — SQL의 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">WHERE brand = &apos;삼성&apos;</code></li>
              <li><strong>terms</strong>: 여러 값 중 하나와 일치 — SQL의 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">WHERE brand IN (&apos;삼성&apos;, &apos;애플&apos;)</code></li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            삼성과 애플 상품이 함께 나오면 성공!
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 이론: bool 쿼리 ═══════ */}
      <Section>
        <SectionLabel>Part 3 · Theory</SectionLabel>
        <SectionTitle>
          bool 쿼리<br />— 조건을 조합하는 만능 도구
        </SectionTitle>

        <p className="text-text-dim text-[1.05rem] mb-6">
          실제 서비스에서는 하나의 조건으로 검색하는 경우가 거의 없습니다. <strong className="text-text font-medium">&quot;노트북이면서 삼성이고 100만원 이상&quot;</strong> 같은 복합 조건이 필요하죠. 이때 사용하는 것이 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">bool</code> 쿼리입니다.
        </p>

        <BoolVisual />

        <ExplainCallout title="must vs filter — 핵심 차이">
          <ul>
            <li>둘 다 <strong>AND 조건</strong>으로 동작합니다. 하지만 목적이 다릅니다.</li>
            <li><strong>must</strong>: &quot;이 조건에 얼마나 잘 맞는가?&quot;를 계산 → 검색 결과 <strong>정렬</strong>에 영향</li>
            <li><strong>filter</strong>: &quot;이 조건에 맞는가? YES/NO&quot; → <strong>캐싱</strong>되어 반복 검색 시 매우 빠름</li>
            <li>가격 범위, 카테고리 같은 단순 필터링은 <strong>filter</strong>를 쓰세요. 검색어 매칭은 <strong>must</strong>를 쓰세요.</li>
          </ul>
        </ExplainCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: bool 쿼리 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>
          실습: bool 쿼리로<br />복합 조건 검색하기
        </SectionTitle>

        <LabBanner icon="&#x1F9E9;" title="실전 시나리오">
          쇼핑몰에서 사용자가 이렇게 검색한다고 상상해보세요:<br />
          <strong className="text-text font-medium">&quot;노트북 카테고리에서, 설명에 &apos;노트북&apos;이 포함된, 200만원 이하 상품&quot;</strong>
        </LabBanner>

        {/* Step 4: 기본 bool */}
        <LabStep num={4} title="bool 쿼리 — must + filter 조합" tags={["kibana"]}>
          <p>위 시나리오를 쿼리로 만들어봅시다:</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search\n{\n  "query": {\n    "bool": {\n      "must": [\n        { "match": { "description": "노트북" } }\n      ],\n      "filter": [\n        { "term": { "category.keyword": "노트북" } },\n        { "range": { "price": { "lte": 2000000 } } }\n      ]\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;must&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}],{"\n"}
            {"      "}<JKey>&quot;filter&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;category.keyword&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"},{"\n"}
            {"        "}{"{ "}<JKey>&quot;range&quot;</JKey>: {"{ "}<JKey>&quot;price&quot;</JKey>: {"{ "}<JKey>&quot;lte&quot;</JKey>: <JVal>2000000</JVal>{" }"}{" }"}{" }"}{"\n"}
            {"      "}]{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="쿼리 구조 분석">
            <ul>
              <li><strong>must → match</strong>: description에서 &quot;노트북&quot; 전문 검색 (점수 계산됨 → 결과 정렬에 영향)</li>
              <li><strong>filter → term</strong>: category가 정확히 &quot;노트북&quot;인 것만 (캐싱됨, YES/NO)</li>
              <li><strong>filter → range</strong>: price가 200만원 이하 (<code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">lte</code> = Less Than or Equal)</li>
              <li>카테고리와 가격은 점수와 무관한 <strong>필터</strong>이므로 filter에 넣었습니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            노트북 카테고리이면서 200만원 이하인 상품만 나오면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 5: should + must_not */}
        <LabStep num={5} title="bool 쿼리 — should + must_not" tags={["kibana"]}>
          <p>이번에는 <strong className="text-text font-medium">&quot;노트북 중에서, 품절은 제외하고, &apos;가볍&apos;이란 단어가 있으면 보너스&quot;</strong>를 검색해봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search\n{\n  "query": {\n    "bool": {\n      "must": [\n        { "match": { "description": "노트북" } }\n      ],\n      "should": [\n        { "match": { "description": "가볍" } }\n      ],\n      "must_not": [\n        { "term": { "in_stock": false } }\n      ]\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;must&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}],{"\n"}
            {"      "}<JKey>&quot;should&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;가볍&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}],{"\n"}
            {"      "}<JKey>&quot;must_not&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;in_stock&quot;</JKey>: <JVal>false</JVal>{" }"}{" }"}{"\n"}
            {"      "}]{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="should의 역할">
            <ul>
              <li><strong>must</strong>가 있을 때 <strong>should</strong>는 필수가 아닙니다. 보너스 점수만 줍니다.</li>
              <li>&quot;가볍&quot;이 포함된 문서는 <strong>_score가 더 높아</strong> 검색 결과 위쪽에 나옵니다.</li>
              <li><strong>must_not</strong>으로 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">in_stock: false</code>(품절)인 문서를 제외했습니다.</li>
              <li>결과에서 각 문서의 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">_score</code>를 비교해보세요!</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            품절 상품이 제외되고, description에 &quot;가볍&quot;이 있는 상품의 _score가 더 높으면 성공!
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 5 — 실습: range, sort, pagination ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 5 · Hands-on Lab</SectionLabel>
        <SectionTitle>
          실습: 범위 검색, 정렬,<br />페이지네이션
        </SectionTitle>

        <LabBanner icon="&#x1F4CA;" title="이번 파트에서 배울 것">
          가격 범위로 필터링하고, 결과를 원하는 순서로 정렬하고, 페이지 단위로 나눠서 가져옵니다.
        </LabBanner>

        {/* Step 6: range */}
        <LabStep num={6} title="range 쿼리 — 범위 검색" tags={["kibana"]}>
          <p>가격이 <strong className="text-text font-medium">100만원 이상 200만원 이하</strong>인 상품을 찾아봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search\n{\n  "query": {\n    "range": {\n      "price": {\n        "gte": 1000000,\n        "lte": 2000000\n      }\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;range&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;price&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;gte&quot;</JKey>: <JVal>1000000</JVal>,{"\n"}
            {"        "}<JKey>&quot;lte&quot;</JKey>: <JVal>2000000</JVal>{"\n"}
            {"      "}{"}"}{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="range 연산자">
            <ul>
              <li><strong>gte</strong>: Greater Than or Equal (이상) — <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&gt;=</code></li>
              <li><strong>gt</strong>: Greater Than (초과) — <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&gt;</code></li>
              <li><strong>lte</strong>: Less Than or Equal (이하) — <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&lt;=</code></li>
              <li><strong>lt</strong>: Less Than (미만) — <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&lt;</code></li>
              <li>날짜 필드에도 사용 가능합니다: <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;gte&quot;: &quot;2026-01-01&quot;, &quot;lte&quot;: &quot;2026-03-31&quot;</code></li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            100만~200만원 사이의 상품만 나오면 성공! 각 상품의 price를 확인해보세요.
          </Checkpoint>
        </LabStep>

        {/* Step 7: sort */}
        <LabStep num={7} title="sort — 결과 정렬하기" tags={["kibana"]}>
          <p>기본적으로 검색 결과는 <strong className="text-text font-medium">_score(관련도) 내림차순</strong>으로 정렬됩니다. 가격 순으로 바꿔봅시다.</p>

          <QaBox question="match_all은 뭔가요?">
            <p><strong className="text-text font-medium">조건 없이 모든 문서를 가져오라</strong>는 뜻입니다. SQL로 치면 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">SELECT * FROM products</code>에서 WHERE 절이 없는 것과 같아요.</p>
            <p>아래 sort, from/size 실습에서 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">match_all</code>을 사용하는 이유는, 검색 조건 자체보다 <strong className="text-text font-medium">정렬이나 페이지네이션 기능에 집중</strong>하기 위해서입니다. &quot;일단 전부 가져온 다음&quot; 거기서 정렬하고 페이징하는 거예요.</p>
            <p>실제 서비스에서는 match_all 단독으로 쓰는 경우는 드물고, Step 9 종합 실습처럼 <strong className="text-text font-medium">bool 쿼리 안에 구체적인 조건</strong>을 넣는 것이 일반적입니다.</p>
          </QaBox>

          <CmdBlock
            label="KIBANA DEV TOOLS — 가격 낮은 순"
            copyText={`GET /products/_search\n{\n  "query": { "match_all": {} },\n  "sort": [\n    { "price": "asc" }\n  ]\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{ "}<JKey>&quot;match_all&quot;</JKey>: {"{}"}{" },"}{"\n"}
            {"  "}<JKey>&quot;sort&quot;</JKey>: [{"\n"}
            {"    "}{"{ "}<JKey>&quot;price&quot;</JKey>: <JStr>&quot;asc&quot;</JStr>{" }"}{"\n"}
            {"  "}]{"\n"}
            {"}"}
          </CmdBlock>

          <p>여러 기준으로 정렬하는 것도 가능합니다. <strong className="text-text font-medium">가격 낮은 순</strong>으로 먼저 정렬하고, 같은 가격이면 <strong className="text-text font-medium">브랜드 이름순</strong>으로:</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 복합 정렬"
            copyText={`GET /products/_search\n{\n  "query": { "match_all": {} },\n  "sort": [\n    { "price": "asc" },\n    { "brand.keyword": "asc" }\n  ]\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{ "}<JKey>&quot;match_all&quot;</JKey>: {"{}"}{" },"}{"\n"}
            {"  "}<JKey>&quot;sort&quot;</JKey>: [{"\n"}
            {"    "}{"{ "}<JKey>&quot;price&quot;</JKey>: <JStr>&quot;asc&quot;</JStr>{" },"}{"\n"}
            {"    "}{"{ "}<JKey>&quot;brand.keyword&quot;</JKey>: <JStr>&quot;asc&quot;</JStr>{" }"}{"\n"}
            {"  "}]{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="정렬 주의사항">
            <ul>
              <li><strong>asc</strong>: 오름차순 (가격 낮은 순, A→Z)</li>
              <li><strong>desc</strong>: 내림차순 (가격 높은 순, Z→A)</li>
              <li>문자열 정렬에는 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">.keyword</code>를 사용해야 합니다. text 필드는 분석되어 정렬이 불가능해요.</li>
              <li>sort를 지정하면 <strong>_score가 null</strong>이 됩니다 — 관련도 대신 지정한 기준으로 정렬했기 때문이에요.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            결과가 가격 낮은 순으로 나오면 성공! _score가 null인 것도 확인해보세요.
          </Checkpoint>
        </LabStep>

        {/* Step 8: pagination */}
        <LabStep num={8} title="from + size — 페이지네이션" tags={["kibana"]}>
          <p>검색 결과가 많을 때, 페이지 단위로 나눠서 가져옵니다. SQL의 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">LIMIT</code> + <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">OFFSET</code>과 같습니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 1페이지 (2개씩)"
            copyText={`GET /products/_search\n{\n  "query": { "match_all": {} },\n  "sort": [{ "price": "asc" }],\n  "from": 0,\n  "size": 2\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{ "}<JKey>&quot;match_all&quot;</JKey>: {"{}"}{" },"}{"\n"}
            {"  "}<JKey>&quot;sort&quot;</JKey>: [{"{ "}<JKey>&quot;price&quot;</JKey>: <JStr>&quot;asc&quot;</JStr>{" }"}],{"\n"}
            {"  "}<JKey>&quot;from&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>2</JVal>{"\n"}
            {"}"}
          </CmdBlock>

          <CmdBlock
            label="KIBANA DEV TOOLS — 2페이지"
            copyText={`GET /products/_search\n{\n  "query": { "match_all": {} },\n  "sort": [{ "price": "asc" }],\n  "from": 2,\n  "size": 2\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{ "}<JKey>&quot;match_all&quot;</JKey>: {"{}"}{" },"}{"\n"}
            {"  "}<JKey>&quot;sort&quot;</JKey>: [{"{ "}<JKey>&quot;price&quot;</JKey>: <JStr>&quot;asc&quot;</JStr>{" }"}],{"\n"}
            {"  "}<JKey>&quot;from&quot;</JKey>: <JVal>2</JVal>,       <Cm>&larr; 2개 건너뛰고</Cm>{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>2</JVal>        <Cm>&larr; 2개 가져오기</Cm>{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="from + size 이해하기">
            <ul>
              <li><strong>size</strong>: 한 번에 가져올 문서 수 (기본값: 10)</li>
              <li><strong>from</strong>: 건너뛸 문서 수 (기본값: 0)</li>
              <li>1페이지: <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">from=0, size=2</code> → 첫 2개</li>
              <li>2페이지: <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">from=2, size=2</code> → 3~4번째</li>
              <li>3페이지: <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">from=4, size=2</code> → 5~6번째</li>
              <li>공식: <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">from = (page - 1) * size</code></li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="from + size의 한계">
            <p>from + size는 <strong className="text-text font-medium">10,000건까지만</strong> 가능합니다. 더 깊은 페이지가 필요하면 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">search_after</code>를 사용해야 합니다. 이것은 나중에 심화 과정에서 다룹니다.</p>
          </WarnCallout>

          <Checkpoint>
            1페이지와 2페이지의 결과가 다르면 성공! 가격순으로 2개씩 나뉘어 나옵니다.
          </Checkpoint>
        </LabStep>

        {/* Step 9: 종합 실습 */}
        <LabStep num={9} title="종합 실습 — 실제 쇼핑몰 검색 쿼리" tags={["kibana"]}>
          <p>이번 챕터에서 배운 모든 것을 조합해봅시다. 실제 쇼핑몰에서 있을 법한 검색 시나리오입니다:</p>
          <p><strong className="text-text font-medium">&quot;노트북을 검색하되, 재고 있는 것만, 가격 낮은 순으로 2개씩, 1페이지&quot;</strong></p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 종합"
            copyText={`GET /products/_search\n{\n  "query": {\n    "bool": {\n      "must": [\n        { "match": { "description": "노트북" } }\n      ],\n      "filter": [\n        { "term": { "in_stock": true } },\n        { "term": { "category.keyword": "노트북" } }\n      ]\n    }\n  },\n  "sort": [{ "price": "asc" }],\n  "from": 0,\n  "size": 2,\n  "_source": ["name", "brand", "price", "in_stock"]\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;must&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}],{"\n"}
            {"      "}<JKey>&quot;filter&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;in_stock&quot;</JKey>: <JVal>true</JVal>{" }"}{" }"},{"\n"}
            {"        "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;category.keyword&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}]{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;sort&quot;</JKey>: [{"{ "}<JKey>&quot;price&quot;</JKey>: <JStr>&quot;asc&quot;</JStr>{" }"}],{"\n"}
            {"  "}<JKey>&quot;from&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>2</JVal>,{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;brand&quot;</JStr>, <JStr>&quot;price&quot;</JStr>, <JStr>&quot;in_stock&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="새로 등장한 _source">
            <ul>
              <li><strong>_source</strong>: 응답에 포함할 필드를 지정합니다. SQL의 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">SELECT name, brand, price</code>와 같아요.</li>
              <li>지정하지 않으면 모든 필드가 반환됩니다. 필요한 필드만 가져오면 <strong>네트워크 트래픽을 줄일</strong> 수 있어요.</li>
            </ul>
          </ExplainCallout>

          <ExplainCallout title="전체 구조 정리">
            <ul>
              <li><strong>query → bool → must</strong>: &quot;description에 &apos;노트북&apos;이 있는&quot; (점수 계산)</li>
              <li><strong>query → bool → filter</strong>: &quot;재고 있고, 카테고리가 노트북&quot; (필터링, 캐싱)</li>
              <li><strong>sort</strong>: 가격 낮은 순 정렬</li>
              <li><strong>from + size</strong>: 0번째부터 2개 (1페이지)</li>
              <li><strong>_source</strong>: 필요한 필드만 가져오기</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            재고 있는 노트북만, 가격 낮은 순으로, name/brand/price/in_stock 필드만 보이면 성공! 이것이 실제 서비스에서 쓰이는 검색 쿼리의 뼈대입니다.
          </Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

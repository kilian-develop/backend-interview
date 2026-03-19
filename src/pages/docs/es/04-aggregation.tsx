
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

export default function Chapter04() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: Aggregation이란? ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>Aggregation이란?<br />— 데이터를 분석하는 힘</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          지금까지는 문서를 <strong className="text-text">찾는</strong> 것에 집중했습니다. 하지만 실제 서비스에서는 <strong className="text-text">&quot;브랜드별 상품이 몇 개야?&quot;</strong>, <strong className="text-text">&quot;평균 가격은?&quot;</strong> 같은 <span className="text-accent font-medium">분석</span>이 필요합니다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          SQL에서는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">GROUP BY</code> + <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">COUNT, AVG, SUM</code>으로 하죠. Elasticsearch에서는 이것을 <strong className="text-text">Aggregation(집계)</strong>이라 합니다.
        </p>

        {/* SQL vs ES 비교 */}
        <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
          <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-purple" />
            <h3 className="font-mono text-lg mb-4 text-es-blue">SQL</h3>
            <div className="font-mono text-sm bg-surface-2 rounded-lg p-4 leading-relaxed">
              <span className="text-es-purple">SELECT</span> brand,<br />
              {"  "}<span className="text-es-purple">COUNT</span>(*) <span className="text-es-purple">AS</span> count,<br />
              {"  "}<span className="text-es-purple">AVG</span>(price) <span className="text-es-purple">AS</span> avg_price<br />
              <span className="text-es-purple">FROM</span> products<br />
              <span className="text-es-purple">GROUP BY</span> brand;
            </div>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-accent" />
            <h3 className="font-mono text-lg mb-4 text-es-green">Elasticsearch</h3>
            <div className="font-mono text-sm bg-surface-2 rounded-lg p-4 leading-relaxed">
              <span className="text-es-purple">GET</span> /products/_search<br />
              {"{"}<br />
              {"  "}<span className="text-es-blue">&quot;aggs&quot;</span>: {"{"}<br />
              {"    "}<span className="text-es-blue">&quot;brands&quot;</span>: {"{"}<br />
              {"      "}<span className="text-es-blue">&quot;terms&quot;</span>: {"{ ... }"}<br />
              {"    }"}<br />
              {"  }"}<br />
              {"}"}
            </div>
          </div>
        </div>

        {/* 두 가지 집계 타입 */}
        <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-orange">
            <div className="font-mono text-sm font-semibold text-es-orange mb-2">Bucket Aggregation</div>
            <p className="text-sm text-text-dim mb-3">문서를 <strong className="text-text">그룹으로 나누기</strong></p>
            <p className="text-sm text-text-dim mb-0">SQL의 GROUP BY와 같습니다. 브랜드별, 카테고리별, 가격 구간별 등으로 문서를 분류합니다.</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">terms</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">range</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">histogram</span>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-cyan">
            <div className="font-mono text-sm font-semibold text-es-cyan mb-2">Metric Aggregation</div>
            <p className="text-sm text-text-dim mb-3">그룹 안에서 <strong className="text-text">통계 계산하기</strong></p>
            <p className="text-sm text-text-dim mb-0">SQL의 AVG, SUM, MIN, MAX와 같습니다. 평균 가격, 최고가, 최저가, 합계 등을 계산합니다.</p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">avg</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">sum</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">min / max</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">stats</span>
            </div>
          </div>
        </div>

        <ExplainCallout title="핵심 포인트">
          <ul>
            <li><strong>Bucket</strong>은 &quot;나누기&quot;, <strong>Metric</strong>은 &quot;계산하기&quot;</li>
            <li>이 둘을 <strong>조합</strong>하면 강력합니다: &quot;브랜드별로 나누고(Bucket) → 각 브랜드의 평균 가격 계산(Metric)&quot;</li>
            <li>검색(query)과 집계(aggs)는 <strong>동시에 실행</strong>할 수 있습니다</li>
          </ul>
        </ExplainCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: Bucket Aggregation ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Bucket Aggregation<br />— 데이터를 그룹으로 나누기</SectionTitle>

        <LabBanner icon="&#x1F4CA;" title="사전 조건">
          Chapter 3까지 완료한 상태여야 합니다. products 인덱스에 5개의 상품이 있어야 해요.
        </LabBanner>

        {/* Step 1: terms agg */}
        <LabStep num={1} title="브랜드별 상품 수 집계" tags={["kibana"]}>
          <p>각 브랜드에 상품이 몇 개씩 있는지 알아봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products/_search\n{\n  "size": 0,\n  "aggs": {\n    "brand_count": {\n      "terms": {\n        "field": "brand.keyword"\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;brand_count&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;brand.keyword&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"aggregations": {
    "brand_count": {
        "buckets": [
            { "key": `}<Hl>&quot;삼성&quot;</Hl>{`, "doc_count": `}<Hl>2</Hl>{` },
            { "key": "LG", "doc_count": 1 },
            { "key": "소니", "doc_count": 1 },
            { "key": "애플", "doc_count": 1 }
        ]
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="하나씩 뜯어봅시다">
            <ul>
              <li><strong>&quot;size&quot;: 0</strong> — 검색 결과(hits)는 필요 없고 집계 결과만 원할 때 사용합니다. hits를 생략하면 응답이 훨씬 가벼워져요.</li>
              <li><strong>&quot;aggs&quot;</strong> — Aggregation의 약자. 이 안에 집계 요청을 넣습니다.</li>
              <li><strong>&quot;brand_count&quot;</strong> — 이 집계의 이름. 원하는 이름을 자유롭게 지정할 수 있어요.</li>
              <li><strong>&quot;terms&quot;</strong> — Bucket Aggregation의 한 종류. 필드의 고유 값별로 문서를 그룹핑합니다.</li>
              <li><strong>&quot;field&quot;: &quot;brand.keyword&quot;</strong> — keyword 필드를 사용해야 합니다. text 필드는 분석되어 쪼개져 있으므로 집계에 적합하지 않아요.</li>
              <li><strong>buckets</strong> — 각 그룹(버킷)의 key와 문서 수(doc_count)가 나옵니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="왜 size: 0을 넣나요?">
            <p>기본적으로 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">_search</code>는 매칭되는 문서(hits)도 함께 반환합니다. 집계만 필요한 경우 <strong>&quot;size&quot;: 0</strong>을 넣으면 hits를 생략하여 <strong>응답 크기를 줄이고 성능을 높일</strong> 수 있습니다.</p>
            <p>실제 서비스에서 &quot;브랜드 필터 목록&quot;을 보여줄 때 이 패턴을 자주 사용합니다.</p>
          </QaBox>

          <Checkpoint>브랜드별 상품 수가 보이고, 삼성이 2개로 가장 많으면 성공!</Checkpoint>
        </LabStep>

        {/* Step 2: category terms */}
        <LabStep num={2} title="카테고리별 상품 수 집계" tags={["kibana"]}>
          <p>이번에는 카테고리별로 집계해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products/_search\n{\n  "size": 0,\n  "aggs": {\n    "category_count": {\n      "terms": {\n        "field": "category.keyword"\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;category_count&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;category.keyword&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"buckets": [
    { "key": `}<Hl>&quot;노트북&quot;</Hl>{`, "doc_count": `}<Hl>3</Hl>{` },
    { "key": "이어폰", "doc_count": 1 },
    { "key": "헤드폰", "doc_count": 1 }
]`}
          </ExpectedOutput>

          <ExplainCallout title="결과 해석">
            <ul>
              <li>노트북이 3개로 가장 많고, 이어폰과 헤드폰이 각 1개</li>
              <li>결과는 기본적으로 <strong>doc_count 내림차순</strong>으로 정렬됩니다</li>
              <li>이 데이터로 쇼핑몰의 &quot;카테고리 필터&quot;를 만들 수 있어요: 노트북(3) | 이어폰(1) | 헤드폰(1)</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>노트북: 3, 이어폰: 1, 헤드폰: 1이 보이면 성공!</Checkpoint>

          <QaBox question="terms 쿼리에서 개수 집계를 의미하는 게 뭔가요? count를 따로 지정한 적이 없는데요.">
            <p><strong>doc_count는 모든 Bucket Aggregation에 자동으로 포함됩니다.</strong> 별도로 &quot;count를 세줘&quot;라고 지정한 게 아니에요.</p>
            <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">terms</code>가 하는 일은:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li>필드의 고유 값들을 찾는다 (노트북, 이어폰, 헤드폰)</li>
              <li>각 값에 해당하는 문서를 그룹으로 묶는다 (Bucket)</li>
              <li>각 그룹의 문서 수를 <strong>자동으로</strong> <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">doc_count</code>에 넣어준다</li>
            </ul>
            <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">terms</code>든 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">range</code>든 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">histogram</code>이든, <strong>버킷을 만들면 항상 그 안의 문서 수가 자동으로 따라옵니다.</strong> Bucket의 기본 속성인 거예요.</p>
          </QaBox>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: Metric Aggregation ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Metric Aggregation<br />— 통계 계산하기</SectionTitle>

        <LabBanner icon="&#x1F4C8;" title="이번 파트에서 배울 것">
          평균, 최고, 최저, 합계 등 숫자 필드의 통계를 계산합니다.
        </LabBanner>

        {/* Step 3: avg */}
        <LabStep num={3} title="전체 상품 평균 가격" tags={["kibana"]}>
          <p>모든 상품의 <strong>평균 가격</strong>을 구해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products/_search\n{\n  "size": 0,\n  "aggs": {\n    "avg_price": {\n      "avg": {\n        "field": "price"\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;avg_price&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;avg&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;price&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`"aggregations": {
    "avg_price": {
        "value": `}<Hl>1335600.0</Hl>{`
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="Metric Aggregation 종류">
            <ul>
              <li><strong>avg</strong> — 평균</li>
              <li><strong>sum</strong> — 합계</li>
              <li><strong>min</strong> — 최솟값</li>
              <li><strong>max</strong> — 최댓값</li>
              <li><strong>value_count</strong> — 값의 개수</li>
              <li><strong>stats</strong> — 위의 모든 것을 한번에!</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>평균 가격이 약 133만원으로 나오면 성공!</Checkpoint>
        </LabStep>

        {/* Step 4: stats */}
        <LabStep num={4} title="stats — 통계 한번에 보기" tags={["kibana"]}>
          <p>avg, min, max, sum, count를 한번에 구하는 <strong>stats</strong> 집계입니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products/_search\n{\n  "size": 0,\n  "aggs": {\n    "price_stats": {\n      "stats": {\n        "field": "price"\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;price_stats&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;stats&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;price&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`"price_stats": {
    "count": `}<Hl>5</Hl>{`,
    "min": `}<Hl>259000.0</Hl>{`,
    "max": `}<Hl>2390000.0</Hl>{`,
    "avg": `}<Hl>1335600.0</Hl>{`,
    "sum": `}<Hl>6678000.0</Hl>{`
}`}
          </ExpectedOutput>

          <ExplainCallout title="stats가 편리한 이유">
            <ul>
              <li>avg, min, max, sum, count를 각각 요청하면 <strong>5번의 집계</strong>가 필요합니다</li>
              <li><strong>stats 하나</strong>로 모든 기본 통계를 한번에 얻을 수 있어요</li>
              <li>상품 목록 상단에 &quot;총 5개 상품 | 최저 25.9만원 ~ 최고 239만원&quot; 같은 정보를 보여줄 때 유용합니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>count, min, max, avg, sum이 모두 보이면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: 복합 집계 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Bucket + Metric 조합<br />— 진짜 분석의 시작</SectionTitle>

        <LabBanner icon="&#x1F9E9;" title="이번 파트의 핵심">
          Bucket으로 그룹을 나누고, 각 그룹 안에서 Metric으로 통계를 계산합니다. 이것이 Aggregation의 진짜 힘입니다.
        </LabBanner>

        {/* Step 5: nested aggs */}
        <LabStep num={5} title="브랜드별 평균 가격" tags={["kibana"]}>
          <p><strong>&quot;각 브랜드의 평균 가격이 얼마인가?&quot;</strong> — Bucket 안에 Metric을 중첩합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products/_search\n{\n  "size": 0,\n  "aggs": {\n    "brands": {\n      "terms": {\n        "field": "brand.keyword"\n      },\n      "aggs": {\n        "avg_price": {\n          "avg": {\n            "field": "price"\n          }\n        }\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;brands&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;brand.keyword&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;avg_price&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;avg&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;price&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"buckets": [
    {
        "key": `}<Hl>&quot;삼성&quot;</Hl>{`,
        "doc_count": 2,
        "avg_price": { "value": `}<Hl>1024500.0</Hl>{` }
    },
    {
        "key": "LG",
        "doc_count": 1,
        "avg_price": { "value": 1890000.0 }
    },
    {
        "key": "애플",
        "doc_count": 1,
        "avg_price": { "value": 2390000.0 }
    },
    ...
]`}
          </ExpectedOutput>

          <ExplainCallout title="중첩 Aggregation 구조">
            <ul>
              <li>바깥 <strong>aggs</strong>: brands → terms로 브랜드별 그룹 생성 (Bucket)</li>
              <li>안쪽 <strong>aggs</strong>: avg_price → 각 버킷 안에서 평균 가격 계산 (Metric)</li>
              <li>삼성은 갤럭시북(179만) + 버즈(25.9만)의 평균 = 약 102만원</li>
              <li>이 패턴이 SQL의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">SELECT brand, AVG(price) FROM products GROUP BY brand</code>와 동일합니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>각 브랜드 버킷 안에 avg_price 값이 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 6: 카테고리별 가격 통계 */}
        <LabStep num={6} title="카테고리별 가격 통계 (stats)" tags={["kibana"]}>
          <p>카테고리별로 나누고, 각 카테고리의 전체 가격 통계를 봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products/_search\n{\n  "size": 0,\n  "aggs": {\n    "categories": {\n      "terms": {\n        "field": "category.keyword"\n      },\n      "aggs": {\n        "price_stats": {\n          "stats": {\n            "field": "price"\n          }\n        }\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;categories&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;category.keyword&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;price_stats&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;stats&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;price&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"buckets": [
    {
        "key": `}<Hl>&quot;노트북&quot;</Hl>{`,
        "doc_count": 3,
        "price_stats": {
            "count": 3,
            "min": `}<Hl>1790000.0</Hl>{`,
            "max": `}<Hl>2390000.0</Hl>{`,
            "avg": `}<Hl>2023333.3</Hl>{`,
            "sum": 6070000.0
        }
    },
    ...
]`}
          </ExpectedOutput>

          <ExplainCallout title="이걸로 뭘 할 수 있을까?">
            <ul>
              <li>쇼핑몰 카테고리 페이지에 &quot;노트북 — 179만원 ~ 239만원, 평균 202만원&quot; 표시</li>
              <li>관리자 대시보드에서 카테고리별 매출 분석</li>
              <li>가격대별 상품 분포 파악</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>노트북 카테고리의 min, max, avg 가격 통계가 보이면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 5 — 실습: 검색 + 집계 조합 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 5 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: 검색과 집계를<br />동시에 사용하기</SectionTitle>

        <LabBanner icon="&#x1F680;" title="실전 패턴">
          실제 서비스에서는 검색 결과와 함께 필터 옵션(집계)을 보여주는 것이 일반적입니다. 쿠팡에서 &quot;노트북&quot;을 검색하면 왼쪽에 브랜드 필터가 나오는 것처럼요.
        </LabBanner>

        {/* Step 7: query + aggs */}
        <LabStep num={7} title="검색 결과 + 브랜드 필터 동시에" tags={["kibana"]}>
          <p><strong>&quot;노트북을 검색하면서, 동시에 브랜드별 상품 수도 알려줘&quot;</strong></p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /products/_search\n{\n  "query": {\n    "match": {\n      "description": "노트북"\n    }\n  },\n  "aggs": {\n    "brands": {\n      "terms": {\n        "field": "brand.keyword"\n      }\n    },\n    "price_range": {\n      "stats": {\n        "field": "price"\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;brands&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;brand.keyword&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"},{"\n"}
            {"    "}<JKey>&quot;price_range&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;stats&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;price&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (구조)">
            {`{
    "hits": {
        "total": { "value": `}<Hl>N</Hl>{` },
        "hits": [ `}<Hl>... 검색된 상품 목록 ...</Hl>{` ]
    },
    "aggregations": {
        "brands": {
            "buckets": [ `}<Hl>... 브랜드별 상품 수 ...</Hl>{` ]
        },
        "price_range": {
            "count": ..., "min": ..., "max": ..., "avg": ...
        }
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="query + aggs 동시 사용의 핵심">
            <ul>
              <li><strong>query</strong>가 먼저 문서를 필터링합니다 (description에 &quot;노트북&quot; 포함)</li>
              <li><strong>aggs</strong>는 필터링된 문서들에 대해서만 집계합니다</li>
              <li>결과에 <strong>hits</strong>(검색 결과)와 <strong>aggregations</strong>(집계 결과)가 동시에 나옵니다</li>
              <li>이것으로 쇼핑몰의 &quot;검색 결과 + 왼쪽 필터 패널&quot;을 한번의 요청으로 구현할 수 있어요!</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>hits에 검색 결과가, aggregations에 브랜드 집계와 가격 통계가 함께 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 8: 종합 */}
        <LabStep num={8} title="종합 실습 — 쇼핑몰 검색 API" tags={["kibana"]}>
          <p>이번 챕터의 모든 것을 조합합니다: <strong>검색 + 필터 + 집계 + 정렬 + 페이징</strong></p>
          <p>시나리오: <strong>&quot;재고 있는 상품을 가격순으로 보여주면서, 카테고리별 상품 수와 전체 가격 통계도 함께&quot;</strong></p>

          <CmdBlock label="KIBANA DEV TOOLS — 종합" copyText={`GET /products/_search\n{\n  "query": {\n    "bool": {\n      "filter": [\n        { "term": { "in_stock": true } }\n      ]\n    }\n  },\n  "sort": [{ "price": "asc" }],\n  "from": 0,\n  "size": 10,\n  "_source": ["name", "brand", "price", "category"],\n  "aggs": {\n    "categories": {\n      "terms": { "field": "category.keyword" }\n    },\n    "brands": {\n      "terms": { "field": "brand.keyword" }\n    },\n    "price_stats": {\n      "stats": { "field": "price" }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;filter&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;in_stock&quot;</JKey>: <JVal>true</JVal>{" } }"}{"\n"}
            {"      ]"}{"\n"}
            {"    }"}{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;sort&quot;</JKey>: [{"{ "}<JKey>&quot;price&quot;</JKey>: <JStr>&quot;asc&quot;</JStr>{" }"}],{"\n"}
            {"  "}<JKey>&quot;from&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>10</JVal>,{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;brand&quot;</JStr>, <JStr>&quot;price&quot;</JStr>, <JStr>&quot;category&quot;</JStr>],{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;categories&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{ "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;category.keyword&quot;</JStr>{" }"}{"\n"}
            {"    }"},{"\n"}
            {"    "}<JKey>&quot;brands&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{ "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;brand.keyword&quot;</JStr>{" }"}{"\n"}
            {"    }"},{"\n"}
            {"    "}<JKey>&quot;price_stats&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;stats&quot;</JKey>: {"{ "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;price&quot;</JStr>{" }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="실제 쇼핑몰이라면 이 응답으로...">
            <ul>
              <li><strong>hits</strong> → 상품 목록 렌더링 (가격순)</li>
              <li><strong>aggregations.categories</strong> → 왼쪽 &quot;카테고리&quot; 필터 체크박스</li>
              <li><strong>aggregations.brands</strong> → 왼쪽 &quot;브랜드&quot; 필터 체크박스</li>
              <li><strong>aggregations.price_stats</strong> → 상단 &quot;가격 범위: 25.9만원 ~ 239만원&quot; 표시</li>
              <li>이 모든 것이 <strong>단 한 번의 API 호출</strong>로 가능합니다!</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="성능 팁">
            <p>집계는 검색보다 <strong>비용이 높은 연산</strong>입니다. 특히 cardinality(고유 값)가 매우 높은 필드(예: 사용자 ID)에 terms 집계를 하면 메모리를 많이 사용합니다. 실무에서는 집계 대상 필드와 버킷 수를 신중하게 결정하세요.</p>
          </WarnCallout>

          <Checkpoint>
            hits에 재고 있는 상품만 가격순으로 나오고, aggregations에 카테고리/브랜드 집계와 가격 통계가 함께 나오면 성공! 이것이 실제 검색 서비스의 기본 구조입니다.
          </Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

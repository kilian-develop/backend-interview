
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

/* ─── Inline visuals ─── */

function PipelineFlowVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">Pipeline Aggregation 흐름</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1 mb-8">집계 결과를 입력으로 받아 다시 집계하는 2차 집계</div>

      {/* Flow: Bucket → Metric → Pipeline */}
      <div className="flex items-center justify-center gap-3 flex-wrap max-w-[800px] mx-auto">
        {/* Step 1: Raw Data */}
        <div className="rounded-xl p-5 text-center bg-surface-2 border border-border min-w-[140px]">
          <div className="text-[0.78rem] text-text-dim mb-1">원본 데이터</div>
          <div className="font-mono text-sm text-text">Documents</div>
        </div>

        <div className="text-text-dim text-2xl">&#x2192;</div>

        {/* Step 2: Bucket */}
        <div className="rounded-xl p-5 text-center bg-es-orange/[0.08] border border-es-orange/20 min-w-[140px]">
          <div className="font-mono text-sm font-semibold text-es-orange mb-1">1단계</div>
          <div className="text-[0.82rem] text-text-dim">Bucket Agg</div>
          <div className="text-[0.78rem] text-es-orange mt-1">월별로 나누기</div>
        </div>

        <div className="text-text-dim text-2xl">&#x2192;</div>

        {/* Step 3: Metric */}
        <div className="rounded-xl p-5 text-center bg-es-cyan/[0.08] border border-es-cyan/20 min-w-[140px]">
          <div className="font-mono text-sm font-semibold text-es-cyan mb-1">2단계</div>
          <div className="text-[0.82rem] text-text-dim">Metric Agg</div>
          <div className="text-[0.78rem] text-es-cyan mt-1">월별 매출 합계</div>
        </div>

        <div className="text-text-dim text-2xl">&#x2192;</div>

        {/* Step 4: Pipeline */}
        <div className="rounded-xl p-5 text-center bg-es-purple/[0.08] border border-es-purple/20 min-w-[140px]">
          <div className="font-mono text-sm font-semibold text-es-purple mb-1">3단계</div>
          <div className="text-[0.82rem] text-text-dim">Pipeline Agg</div>
          <div className="text-[0.78rem] text-es-purple mt-1">월별 매출의 평균</div>
        </div>
      </div>

      {/* Example timeline */}
      <div className="mt-10 max-w-[700px] mx-auto">
        <div className="text-sm text-text-dim mb-4 text-center">예시: 월별 매출 데이터에서 전체 평균 매출 구하기</div>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="rounded-lg p-3 bg-es-orange/[0.06] border border-es-orange/15">
            <div className="font-mono text-xs text-es-orange">1월</div>
            <div className="text-sm text-text mt-1">120만</div>
          </div>
          <div className="rounded-lg p-3 bg-es-orange/[0.06] border border-es-orange/15">
            <div className="font-mono text-xs text-es-orange">2월</div>
            <div className="text-sm text-text mt-1">150만</div>
          </div>
          <div className="rounded-lg p-3 bg-es-orange/[0.06] border border-es-orange/15">
            <div className="font-mono text-xs text-es-orange">3월</div>
            <div className="text-sm text-text mt-1">180만</div>
          </div>
          <div className="rounded-lg p-3 bg-es-purple/[0.08] border border-es-purple/20">
            <div className="font-mono text-xs text-es-purple">Pipeline</div>
            <div className="text-sm text-text mt-1 font-semibold">평균 150만</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PipelineTypesVisual() {
  return (
    <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
      <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-purple">
        <div className="font-mono text-sm font-semibold text-es-purple mb-2">Parent Pipeline</div>
        <p className="text-sm text-text-dim mb-3"><strong className="text-text">부모 집계의 결과</strong>를 입력으로 사용</p>
        <p className="text-sm text-text-dim mb-0">현재 버킷 집계의 결과를 기반으로 계산합니다. derivative, cumulative_sum 등이 여기에 해당합니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">derivative</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">cumulative_sum</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">moving_avg</span>
        </div>
      </div>
      <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-cyan">
        <div className="font-mono text-sm font-semibold text-es-cyan mb-2">Sibling Pipeline</div>
        <p className="text-sm text-text-dim mb-3"><strong className="text-text">형제 집계의 결과</strong>를 입력으로 사용</p>
        <p className="text-sm text-text-dim mb-0">같은 레벨의 다른 집계 결과를 기반으로 계산합니다. avg_bucket, max_bucket 등이 여기에 해당합니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">avg_bucket</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">max_bucket</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">min_bucket</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">sum_bucket</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main chapter content ─── */

export default function Chapter08() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: Pipeline Aggregation ═══════ */}
      <Section>
        <SectionLabel>Part 1 &middot; Theory</SectionLabel>
        <SectionTitle>Pipeline Aggregation<br />— 집계 결과를 다시 집계하기</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          Chapter 4에서 Bucket Aggregation(그룹 나누기)과 Metric Aggregation(통계 계산)을 배웠습니다. 하지만 실무에서는 <strong className="text-text">&quot;월별 매출의 전체 평균은?&quot;</strong>, <strong className="text-text">&quot;전월 대비 증감률은?&quot;</strong> 같은 질문이 나옵니다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          이것은 <strong className="text-text">집계 결과를 다시 한번 집계</strong>하는 것입니다. Elasticsearch에서는 이것을 <span className="text-accent font-medium">Pipeline Aggregation</span>이라 부릅니다.
        </p>

        <PipelineFlowVisual />

        <PipelineTypesVisual />

        <ExplainCallout title="핵심 포인트">
          <ul>
            <li><strong>Pipeline Aggregation</strong>은 다른 집계의 <strong>결과(output)</strong>를 입력으로 받습니다</li>
            <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">buckets_path</code>로 어떤 집계 결과를 참조할지 지정합니다</li>
            <li><strong>Sibling</strong> Pipeline은 같은 레벨의 형제 집계를 참조 (avg_bucket, max_bucket)</li>
            <li><strong>Parent</strong> Pipeline은 부모 버킷 안에서 동작 (derivative, cumulative_sum)</li>
            <li>시계열 분석, 트렌드 파악, KPI 대시보드에 필수적인 기능입니다</li>
          </ul>
        </ExplainCallout>

        <QaBox question="buckets_path가 뭔가요?">
          <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">buckets_path</code>는 Pipeline Aggregation이 <strong>어떤 집계 결과를 참조할지</strong> 가리키는 경로입니다. 마치 파일 시스템의 경로처럼 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">&gt;</code>로 계층을 구분합니다.</p>
          <p>예를 들어 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">monthly_sales&gt;total_revenue</code>는 &quot;monthly_sales 버킷 안의 total_revenue 메트릭&quot;을 의미합니다.</p>
        </QaBox>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: 시계열 집계 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 &middot; Hands-on Lab</SectionLabel>
        <SectionTitle>실습: 시계열 집계<br />— date_histogram으로 시간 단위 분석</SectionTitle>

        <LabBanner icon="&#x1F4C5;" title="사전 준비">
          Pipeline Aggregation을 실습하려면 시계열 데이터가 필요합니다. 먼저 매출 데이터 인덱스를 만들고 샘플 데이터를 넣겠습니다.
        </LabBanner>

        {/* Step 1: 인덱스 생성 + 샘플 데이터 */}
        <LabStep num={1} title="매출 데이터 인덱스 생성 및 샘플 데이터 입력" tags={["kibana"]}>
          <p>월별 매출 분석을 위한 <strong>sales</strong> 인덱스를 만들고 12개월치 샘플 데이터를 넣겠습니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 인덱스 생성" copyText={`PUT /sales\n{\n  "mappings": {\n    "properties": {\n      "date": { "type": "date" },\n      "amount": { "type": "integer" },\n      "category": { "type": "keyword" },\n      "region": { "type": "keyword" }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/sales</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;date&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;date&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;amount&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;category&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;region&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>이제 12개월치 매출 데이터를 bulk API로 한번에 넣겠습니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 샘플 데이터" copyText={`POST /sales/_bulk\n{"index":{}}\n{"date":"2025-01-15","amount":1200000,"category":"전자제품","region":"서울"}\n{"index":{}}\n{"date":"2025-01-20","amount":800000,"category":"의류","region":"부산"}\n{"index":{}}\n{"date":"2025-02-10","amount":1500000,"category":"전자제품","region":"서울"}\n{"index":{}}\n{"date":"2025-02-25","amount":600000,"category":"식품","region":"대구"}\n{"index":{}}\n{"date":"2025-03-05","amount":1800000,"category":"전자제품","region":"서울"}\n{"index":{}}\n{"date":"2025-03-18","amount":900000,"category":"의류","region":"부산"}\n{"index":{}}\n{"date":"2025-04-08","amount":1100000,"category":"식품","region":"대구"}\n{"index":{}}\n{"date":"2025-04-22","amount":2000000,"category":"전자제품","region":"서울"}\n{"index":{}}\n{"date":"2025-05-12","amount":1600000,"category":"의류","region":"부산"}\n{"index":{}}\n{"date":"2025-05-28","amount":1300000,"category":"전자제품","region":"서울"}\n{"index":{}}\n{"date":"2025-06-03","amount":2200000,"category":"전자제품","region":"서울"}\n{"index":{}}\n{"date":"2025-06-19","amount":700000,"category":"식품","region":"대구"}`}>
            <Kw>POST</Kw> <Url>/sales/_bulk</Url>{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-01-15&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>1200000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;전자제품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;서울&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-01-20&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>800000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;의류&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;부산&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-02-10&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>1500000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;전자제품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;서울&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-02-25&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>600000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;식품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;대구&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-03-05&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>1800000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;전자제품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;서울&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-03-18&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>900000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;의류&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;부산&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-04-08&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>1100000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;식품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;대구&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-04-22&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>2000000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;전자제품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;서울&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-05-12&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>1600000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;의류&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;부산&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-05-28&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>1300000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;전자제품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;서울&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-06-03&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>2200000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;전자제품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;서울&quot;</JStr>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>:{"{}"}{"}"}{"  "}{"\n"}
            {"{"}<JKey>&quot;date&quot;</JKey>:<JStr>&quot;2025-06-19&quot;</JStr>,<JKey>&quot;amount&quot;</JKey>:<JVal>700000</JVal>,<JKey>&quot;category&quot;</JKey>:<JStr>&quot;식품&quot;</JStr>,<JKey>&quot;region&quot;</JKey>:<JStr>&quot;대구&quot;</JStr>{"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`{
    "took": ...,
    "errors": `}<Hl>false</Hl>{`,
    "items": [ ... `}<Hl>12개 항목</Hl>{` ... ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="샘플 데이터 구조">
            <ul>
              <li><strong>date</strong>: 2025년 1월~6월, 월 2건씩 총 12건</li>
              <li><strong>amount</strong>: 매출 금액 (60만~220만원)</li>
              <li><strong>category</strong>: 전자제품, 의류, 식품</li>
              <li><strong>region</strong>: 서울, 부산, 대구</li>
              <li>이 데이터로 월별 매출 추이, 전월 대비 증감, 누적 매출 등을 분석합니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>errors: false이고 12개 항목이 모두 생성되면 성공!</Checkpoint>
        </LabStep>

        {/* Step 2: date_histogram 및 interval 비교 */}
        <LabStep num={2} title="date_histogram — 월별 매출 집계" tags={["kibana"]}>
          <p><strong>date_histogram</strong>은 날짜 필드를 기준으로 시간 구간별 버킷을 만듭니다. 먼저 <strong>월별 매출 합계</strong>를 구해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 월별 매출" copyText={`GET /sales/_search\n{\n  "size": 0,\n  "aggs": {\n    "monthly_sales": {\n      "date_histogram": {\n        "field": "date",\n        "calendar_interval": "month"\n      },\n      "aggs": {\n        "total_revenue": {\n          "sum": {\n            "field": "amount"\n          }\n        }\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/sales/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;monthly_sales&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;date_histogram&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;date&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;calendar_interval&quot;</JKey>: <JStr>&quot;month&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;total_revenue&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;sum&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;amount&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"monthly_sales": {
    "buckets": [
        {
            "key_as_string": `}<Hl>&quot;2025-01-01T00:00:00.000Z&quot;</Hl>{`,
            "doc_count": 2,
            "total_revenue": { "value": `}<Hl>2000000.0</Hl>{` }
        },
        {
            "key_as_string": "2025-02-01T00:00:00.000Z",
            "doc_count": 2,
            "total_revenue": { "value": `}<Hl>2100000.0</Hl>{` }
        },
        {
            "key_as_string": "2025-03-01T00:00:00.000Z",
            "doc_count": 2,
            "total_revenue": { "value": 2700000.0 }
        },
        ...
    ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="calendar_interval vs fixed_interval">
            <ul>
              <li><strong>calendar_interval</strong>: 달력 기준 간격입니다. &quot;month&quot;는 28~31일로 가변적이고, &quot;week&quot;는 월요일 시작입니다.</li>
              <li><strong>fixed_interval</strong>: 고정 시간 간격입니다. &quot;30d&quot;는 정확히 30일, &quot;1h&quot;는 정확히 1시간입니다.</li>
              <li>월별, 분기별, 연도별 분석 &#x2192; <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">calendar_interval</code></li>
              <li>정확히 N일, N시간 간격 분석 &#x2192; <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">fixed_interval</code></li>
            </ul>
          </ExplainCallout>

          <p>주별 집계도 해봅시다. <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">calendar_interval</code>을 <strong>&quot;week&quot;</strong>로 바꾸면 됩니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 주별 매출" copyText={`GET /sales/_search\n{\n  "size": 0,\n  "aggs": {\n    "weekly_sales": {\n      "date_histogram": {\n        "field": "date",\n        "calendar_interval": "week"\n      },\n      "aggs": {\n        "total_revenue": {\n          "sum": {\n            "field": "amount"\n          }\n        }\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/sales/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;weekly_sales&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;date_histogram&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;date&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;calendar_interval&quot;</JKey>: <JStr>&quot;week&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;total_revenue&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;sum&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;amount&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <QaBox question="calendar_interval: &quot;month&quot;와 fixed_interval: &quot;30d&quot;는 뭐가 다른가요?">
            <p><strong>calendar_interval: &quot;month&quot;</strong>는 1월은 31일, 2월은 28일(또는 29일)처럼 실제 달력을 따릅니다. 버킷의 시작이 매월 1일이에요.</p>
            <p><strong>fixed_interval: &quot;30d&quot;</strong>는 무조건 30일 간격입니다. 1월 1일 시작이면 다음 버킷은 1월 31일이고, 그 다음은 3월 2일입니다. 달력의 &quot;월&quot; 개념과 맞지 않을 수 있어요.</p>
            <p>월별 리포트에는 <strong>calendar_interval</strong>을, 정밀한 시간 간격 분석(예: 24시간마다)에는 <strong>fixed_interval</strong>을 사용하세요.</p>
          </QaBox>

          <Checkpoint>월별 6개 버킷이 나오고, 각 버킷에 total_revenue가 보이면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: Pipeline Aggregation ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 &middot; Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Pipeline Aggregation<br />— 집계 위의 집계</SectionTitle>

        <LabBanner icon="&#x1F4C8;" title="이번 파트에서 배울 것">
          월별 매출 데이터를 기반으로 전체 평균, 최고 매출 월, 전월 대비 증감, 누적 합계를 계산합니다. 모두 Pipeline Aggregation입니다.
        </LabBanner>

        {/* Step 3: avg_bucket */}
        <LabStep num={3} title="avg_bucket — 월별 매출의 전체 평균" tags={["kibana"]}>
          <p><strong>&quot;6개월간 월 평균 매출은 얼마인가?&quot;</strong> — 월별 매출 합계(Metric)의 평균(Pipeline)을 구합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /sales/_search\n{\n  "size": 0,\n  "aggs": {\n    "monthly_sales": {\n      "date_histogram": {\n        "field": "date",\n        "calendar_interval": "month"\n      },\n      "aggs": {\n        "total_revenue": {\n          "sum": {\n            "field": "amount"\n          }\n        }\n      }\n    },\n    "avg_monthly_revenue": {\n      "avg_bucket": {\n        "buckets_path": "monthly_sales>total_revenue"\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/sales/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;monthly_sales&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;date_histogram&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;date&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;calendar_interval&quot;</JKey>: <JStr>&quot;month&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;total_revenue&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;sum&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;amount&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"},{"\n"}
            {"    "}<JKey>&quot;avg_monthly_revenue&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;avg_bucket&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;buckets_path&quot;</JKey>: <JStr>&quot;monthly_sales&gt;total_revenue&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"aggregations": {
    "monthly_sales": {
        "buckets": [
            { "key_as_string": "2025-01-01...", "total_revenue": { "value": 2000000.0 } },
            { "key_as_string": "2025-02-01...", "total_revenue": { "value": 2100000.0 } },
            { "key_as_string": "2025-03-01...", "total_revenue": { "value": 2700000.0 } },
            { "key_as_string": "2025-04-01...", "total_revenue": { "value": 3100000.0 } },
            { "key_as_string": "2025-05-01...", "total_revenue": { "value": 2900000.0 } },
            { "key_as_string": "2025-06-01...", "total_revenue": { "value": 2900000.0 } }
        ]
    },
    "avg_monthly_revenue": {
        "value": `}<Hl>2616666.6666666665</Hl>{`
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="avg_bucket 동작 원리">
            <ul>
              <li><strong>monthly_sales</strong>: date_histogram으로 월별 버킷 생성 (Bucket)</li>
              <li><strong>total_revenue</strong>: 각 월의 매출 합계 (Metric)</li>
              <li><strong>avg_monthly_revenue</strong>: 6개 월의 total_revenue 값들의 평균 (Pipeline)</li>
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">buckets_path: &quot;monthly_sales&gt;total_revenue&quot;</code>는 &quot;monthly_sales 버킷들의 total_revenue 값을 참조해라&quot;는 뜻입니다</li>
              <li>avg_monthly_revenue는 monthly_sales와 <strong>같은 레벨</strong>에 위치합니다 (Sibling Pipeline)</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>avg_monthly_revenue 값이 약 261만원으로 나오면 성공!</Checkpoint>
        </LabStep>

        {/* Step 4: max_bucket */}
        <LabStep num={4} title="max_bucket — 가장 매출이 높은 월 찾기" tags={["kibana"]}>
          <p><strong>&quot;어떤 달에 매출이 가장 높았나?&quot;</strong> — max_bucket은 값뿐 아니라 <strong>해당 버킷의 key</strong>도 알려줍니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /sales/_search\n{\n  "size": 0,\n  "aggs": {\n    "monthly_sales": {\n      "date_histogram": {\n        "field": "date",\n        "calendar_interval": "month"\n      },\n      "aggs": {\n        "total_revenue": {\n          "sum": {\n            "field": "amount"\n          }\n        }\n      }\n    },\n    "best_month": {\n      "max_bucket": {\n        "buckets_path": "monthly_sales>total_revenue"\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/sales/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;monthly_sales&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;date_histogram&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;date&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;calendar_interval&quot;</JKey>: <JStr>&quot;month&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;total_revenue&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;sum&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;amount&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"},{"\n"}
            {"    "}<JKey>&quot;best_month&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;max_bucket&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;buckets_path&quot;</JKey>: <JStr>&quot;monthly_sales&gt;total_revenue&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"best_month": {
    "value": `}<Hl>3100000.0</Hl>{`,
    "keys": [`}<Hl>&quot;2025-04-01T00:00:00.000Z&quot;</Hl>{`]
}`}
          </ExpectedOutput>

          <ExplainCallout title="max_bucket의 특별한 점">
            <ul>
              <li><strong>value</strong>: 가장 큰 값 (310만원)</li>
              <li><strong>keys</strong>: 그 값이 속한 버킷의 키 (2025년 4월)</li>
              <li>단순히 최댓값만 알려주는 게 아니라, <strong>언제(어느 버킷에서)</strong> 그 값이 나왔는지도 알려줍니다</li>
              <li>같은 방식으로 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">min_bucket</code>을 쓰면 가장 매출이 낮은 달을 찾을 수 있습니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>best_month가 4월이고 값이 310만원이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 5: derivative */}
        <LabStep num={5} title="derivative — 전월 대비 증감" tags={["kibana"]}>
          <p><strong>&quot;매출이 전월 대비 얼마나 올랐나/내렸나?&quot;</strong> — derivative는 연속된 버킷 사이의 <strong>변화량</strong>을 계산합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /sales/_search\n{\n  "size": 0,\n  "aggs": {\n    "monthly_sales": {\n      "date_histogram": {\n        "field": "date",\n        "calendar_interval": "month"\n      },\n      "aggs": {\n        "total_revenue": {\n          "sum": {\n            "field": "amount"\n          }\n        },\n        "revenue_change": {\n          "derivative": {\n            "buckets_path": "total_revenue"\n          }\n        }\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/sales/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;monthly_sales&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;date_histogram&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;date&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;calendar_interval&quot;</JKey>: <JStr>&quot;month&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;total_revenue&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;sum&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;amount&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"},{"\n"}
            {"        "}<JKey>&quot;revenue_change&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;derivative&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;buckets_path&quot;</JKey>: <JStr>&quot;total_revenue&quot;</JStr>{"\n"}
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
        "key_as_string": "2025-01-01...",
        "total_revenue": { "value": 2000000.0 }
        `}<Hl>// 1월: derivative 없음 (이전 달이 없으므로)</Hl>{`
    },
    {
        "key_as_string": "2025-02-01...",
        "total_revenue": { "value": 2100000.0 },
        "revenue_change": { "value": `}<Hl>100000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-03-01...",
        "total_revenue": { "value": 2700000.0 },
        "revenue_change": { "value": `}<Hl>600000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-04-01...",
        "total_revenue": { "value": 3100000.0 },
        "revenue_change": { "value": `}<Hl>400000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-05-01...",
        "total_revenue": { "value": 2900000.0 },
        "revenue_change": { "value": `}<Hl>-200000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-06-01...",
        "total_revenue": { "value": 2900000.0 },
        "revenue_change": { "value": `}<Hl>0.0</Hl>{` }
    }
]`}
          </ExpectedOutput>

          <ExplainCallout title="derivative 동작 원리">
            <ul>
              <li><strong>derivative</strong>는 현재 버킷의 값에서 이전 버킷의 값을 뺀 <strong>차이</strong>를 계산합니다</li>
              <li>2월: 210만 - 200만 = <strong>+10만</strong> (매출 증가)</li>
              <li>5월: 290만 - 310만 = <strong>-20만</strong> (매출 감소)</li>
              <li>첫 번째 버킷(1월)에는 이전 값이 없으므로 derivative가 없습니다</li>
              <li>derivative는 <strong>Parent Pipeline</strong>입니다 — monthly_sales 버킷 <strong>안에</strong>위치합니다</li>
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">buckets_path</code>가 <strong>&quot;total_revenue&quot;</strong>만 쓰는 이유: 같은 버킷 안에 있어서 상위 경로가 필요 없습니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="Sibling vs Parent Pipeline의 buckets_path가 다른 이유는?">
            <p><strong>Sibling Pipeline</strong>(avg_bucket, max_bucket)은 다른 집계의 결과를 참조하므로 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">monthly_sales&gt;total_revenue</code>처럼 전체 경로를 써야 합니다.</p>
            <p><strong>Parent Pipeline</strong>(derivative, cumulative_sum)은 같은 버킷 안에서 동작하므로 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">total_revenue</code>처럼 메트릭 이름만 쓰면 됩니다. 이미 부모 버킷 컨텍스트 안에 있기 때문이에요.</p>
          </QaBox>

          <Checkpoint>각 월의 revenue_change 값이 보이고, 5월이 -200000(감소)이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 6: cumulative_sum */}
        <LabStep num={6} title="cumulative_sum — 누적 매출 합계" tags={["kibana"]}>
          <p><strong>&quot;1월부터 지금까지 총 누적 매출은 얼마인가?&quot;</strong> — cumulative_sum은 버킷을 순서대로 순회하며 값을 <strong>누적 합산</strong>합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /sales/_search\n{\n  "size": 0,\n  "aggs": {\n    "monthly_sales": {\n      "date_histogram": {\n        "field": "date",\n        "calendar_interval": "month"\n      },\n      "aggs": {\n        "total_revenue": {\n          "sum": {\n            "field": "amount"\n          }\n        },\n        "cumulative_revenue": {\n          "cumulative_sum": {\n            "buckets_path": "total_revenue"\n          }\n        }\n      }\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/sales/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>0</JVal>,{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;monthly_sales&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;date_histogram&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;date&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;calendar_interval&quot;</JKey>: <JStr>&quot;month&quot;</JStr>{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;total_revenue&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;sum&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;amount&quot;</JStr>{"\n"}
            {"          }"}{"\n"}
            {"        }"},{"\n"}
            {"        "}<JKey>&quot;cumulative_revenue&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;cumulative_sum&quot;</JKey>: {"{"}{"\n"}
            {"            "}<JKey>&quot;buckets_path&quot;</JKey>: <JStr>&quot;total_revenue&quot;</JStr>{"\n"}
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
        "key_as_string": "2025-01-01...",
        "total_revenue": { "value": 2000000.0 },
        "cumulative_revenue": { "value": `}<Hl>2000000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-02-01...",
        "total_revenue": { "value": 2100000.0 },
        "cumulative_revenue": { "value": `}<Hl>4100000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-03-01...",
        "total_revenue": { "value": 2700000.0 },
        "cumulative_revenue": { "value": `}<Hl>6800000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-04-01...",
        "total_revenue": { "value": 3100000.0 },
        "cumulative_revenue": { "value": `}<Hl>9900000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-05-01...",
        "total_revenue": { "value": 2900000.0 },
        "cumulative_revenue": { "value": `}<Hl>12800000.0</Hl>{` }
    },
    {
        "key_as_string": "2025-06-01...",
        "total_revenue": { "value": 2900000.0 },
        "cumulative_revenue": { "value": `}<Hl>15700000.0</Hl>{` }
    }
]`}
          </ExpectedOutput>

          <ExplainCallout title="cumulative_sum 해석">
            <ul>
              <li>1월: 200만 (1월만의 매출)</li>
              <li>2월: 200만 + 210만 = <strong>410만</strong> (1~2월 누적)</li>
              <li>3월: 410만 + 270만 = <strong>680만</strong> (1~3월 누적)</li>
              <li>6월: <strong>1,570만</strong> (1~6월 총 누적 매출)</li>
              <li>KPI 대시보드에서 &quot;올해 누적 매출&quot;을 보여줄 때 사용합니다</li>
              <li>cumulative_sum도 <strong>Parent Pipeline</strong>이므로 버킷 안에 위치합니다</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="Pipeline 조합도 가능합니다">
            <p>derivative와 cumulative_sum을 <strong>동시에</strong> 사용할 수 있습니다. 같은 버킷 안에 여러 Pipeline을 넣으면 됩니다. 예를 들어 &quot;월별 매출 + 전월 대비 변화 + 누적 합계&quot;를 한 번의 쿼리로 구할 수 있어요.</p>
          </WarnCallout>

          <Checkpoint>6월의 cumulative_revenue가 1,570만원(15700000.0)이면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: Kibana 대시보드 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 &middot; Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Kibana 대시보드<br />— 데이터를 시각화하기</SectionTitle>

        <LabBanner icon="&#x1F4CA;" title="이번 파트에서 배울 것">
          지금까지 JSON으로 보던 집계 결과를 Kibana에서 차트와 대시보드로 시각화합니다. 코드 한 줄 없이 드래그 앤 드롭으로 만들 수 있어요.
        </LabBanner>

        {/* Step 7: Index Pattern 생성 */}
        <LabStep num={7} title="Kibana에서 Data View (Index Pattern) 생성" tags={["kibana"]}>
          <p>Kibana에서 데이터를 시각화하려면 먼저 <strong>Data View(구 Index Pattern)</strong>를 만들어야 합니다. Kibana에게 &quot;이 인덱스의 데이터를 사용할 거야&quot;라고 알려주는 것입니다.</p>

          <div className="bg-surface border border-border rounded-[14px] p-8 my-8">
            <h3 className="text-lg font-semibold text-text mb-6">Data View 생성 순서</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-es-blue/15 flex items-center justify-center shrink-0 mt-0.5 text-sm font-mono font-bold text-es-blue">1</div>
                <div>
                  <p className="text-text font-medium mb-1">Kibana 좌측 메뉴에서 Stack Management 클릭</p>
                  <p className="text-sm text-text-dim">좌측 하단의 톱니바퀴 아이콘 또는 햄버거 메뉴에서 찾을 수 있습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-es-blue/15 flex items-center justify-center shrink-0 mt-0.5 text-sm font-mono font-bold text-es-blue">2</div>
                <div>
                  <p className="text-text font-medium mb-1">Kibana &rarr; Data Views 클릭</p>
                  <p className="text-sm text-text-dim">왼쪽 사이드바의 Kibana 섹션 아래에 있습니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-es-blue/15 flex items-center justify-center shrink-0 mt-0.5 text-sm font-mono font-bold text-es-blue">3</div>
                <div>
                  <p className="text-text font-medium mb-1">&quot;Create data view&quot; 버튼 클릭</p>
                  <p className="text-sm text-text-dim">우측 상단의 파란색 버튼입니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-es-blue/15 flex items-center justify-center shrink-0 mt-0.5 text-sm font-mono font-bold text-es-blue">4</div>
                <div>
                  <p className="text-text font-medium mb-1">설정 입력</p>
                  <div className="bg-surface-2 rounded-lg p-4 mt-2">
                    <div className="grid grid-cols-2 gap-3 text-sm max-md:grid-cols-1">
                      <div>
                        <span className="text-text-dim">Name:</span>
                        <span className="font-mono text-es-green ml-2">sales</span>
                      </div>
                      <div>
                        <span className="text-text-dim">Index pattern:</span>
                        <span className="font-mono text-es-green ml-2">sales</span>
                      </div>
                      <div>
                        <span className="text-text-dim">Timestamp field:</span>
                        <span className="font-mono text-es-green ml-2">date</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-es-green/15 flex items-center justify-center shrink-0 mt-0.5 text-sm font-mono font-bold text-es-green">5</div>
                <div>
                  <p className="text-text font-medium mb-1">&quot;Save data view to Kibana&quot; 클릭</p>
                  <p className="text-sm text-text-dim">이제 Kibana에서 sales 인덱스의 데이터를 시각화할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>

          <ExplainCallout title="Data View란?">
            <ul>
              <li><strong>Data View</strong>는 Kibana가 Elasticsearch 인덱스를 인식하기 위한 설정입니다</li>
              <li>과거에는 &quot;Index Pattern&quot;이라 불렸는데, 최신 버전에서 &quot;Data View&quot;로 이름이 바뀌었습니다</li>
              <li><strong>Timestamp field</strong>를 지정하면 시간 기반 필터링이 가능해집니다</li>
              <li>와일드카드(<code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">sales*</code>)를 쓰면 여러 인덱스를 한번에 매칭할 수도 있습니다</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="시간 범위 설정 확인">
            <p>Kibana에서 데이터가 안 보이면 <strong>우측 상단의 시간 범위</strong>를 확인하세요. 기본값이 &quot;Last 15 minutes&quot;로 되어있으면 2025년 데이터가 보이지 않습니다. <strong>&quot;Last 1 year&quot;</strong> 또는 직접 날짜 범위를 <strong>2025-01-01 ~ 2025-06-30</strong>으로 설정해주세요.</p>
          </WarnCallout>

          <Checkpoint>Data View가 생성되고, 필드 목록에 date, amount, category, region이 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 8: Kibana Lens로 차트 만들기 */}
        <LabStep num={8} title="Kibana Lens로 차트 만들기" tags={["kibana"]}>
          <p>Kibana의 <strong>Lens</strong>는 드래그 앤 드롭으로 시각화를 만드는 도구입니다. Step 3~6에서 JSON으로 본 집계 결과를 차트로 만들어봅시다.</p>

          {/* Chart 1: 월별 매출 바 차트 */}
          <div className="bg-surface border border-border rounded-[14px] p-8 my-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-es-blue" />
              <h3 className="text-lg font-semibold text-text">차트 1: 월별 매출 추이 (Bar Chart)</h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-blue/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-blue">1</div>
                <div>
                  <p className="text-text text-sm"><strong>Visualize Library</strong>로 이동합니다. 좌측 메뉴에서 <strong>Visualize Library</strong>를 클릭하고, <strong>&quot;Create visualization&quot;</strong> 버튼을 누른 뒤 <strong>Lens</strong>를 선택하세요.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-blue/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-blue">2</div>
                <div>
                  <p className="text-text text-sm">좌측 필드 목록에서 <strong>date</strong> 필드를 <strong>Horizontal axis</strong>(가로축)로 드래그합니다.</p>
                  <p className="text-text-dim text-sm">자동으로 date_histogram이 적용됩니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-blue/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-blue">3</div>
                <div>
                  <p className="text-text text-sm"><strong>amount</strong> 필드를 <strong>Vertical axis</strong>(세로축)로 드래그합니다.</p>
                  <p className="text-text-dim text-sm">기본으로 Median이 선택될 수 있으니, 클릭해서 <strong>Sum</strong>으로 변경하세요.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-green/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-green">4</div>
                <div>
                  <p className="text-text text-sm">차트 타입이 <strong>Bar vertical</strong>인지 확인합니다. 상단의 차트 타입 아이콘에서 변경할 수 있어요.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-surface-2 rounded-lg p-4 text-sm text-text-dim">
              <strong className="text-text">결과:</strong> Step 2에서 JSON으로 본 월별 매출 합계가 막대 그래프로 시각화됩니다. 4월이 가장 높은 막대로 표시되어야 합니다.
            </div>
          </div>

          {/* Chart 2: 누적 매출 라인 차트 */}
          <div className="bg-surface border border-border rounded-[14px] p-8 my-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-es-purple" />
              <h3 className="text-lg font-semibold text-text">차트 2: 누적 매출 추이 (Line Chart)</h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-purple/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-purple">1</div>
                <div>
                  <p className="text-text text-sm">새 Lens 시각화를 만들고, 가로축에 <strong>date</strong>를 드래그합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-purple/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-purple">2</div>
                <div>
                  <p className="text-text text-sm">세로축에 <strong>amount</strong>를 드래그하고, <strong>Sum</strong>으로 설정합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-purple/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-purple">3</div>
                <div>
                  <p className="text-text text-sm">세로축의 Sum of amount를 클릭한 뒤 <strong>Cumulative sum</strong> 함수를 추가합니다.</p>
                  <p className="text-text-dim text-sm">Advanced 옵션에서 찾을 수 있습니다. &quot;Sum of amount&quot;를 선택한 뒤 &quot;Add advanced function&quot; &rarr; &quot;Cumulative sum&quot;을 선택하세요.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-green/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-green">4</div>
                <div>
                  <p className="text-text text-sm">차트 타입을 <strong>Line</strong>으로 변경합니다.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-surface-2 rounded-lg p-4 text-sm text-text-dim">
              <strong className="text-text">결과:</strong> Step 6에서 JSON으로 본 cumulative_sum이 꺾은선 그래프로 시각화됩니다. 1월 200만에서 시작하여 6월 1,570만까지 우상향하는 곡선이 보여야 합니다.
            </div>
          </div>

          {/* Chart 3: 카테고리별 매출 비율 도넛 차트 */}
          <div className="bg-surface border border-border rounded-[14px] p-8 my-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full bg-es-orange" />
              <h3 className="text-lg font-semibold text-text">차트 3: 카테고리별 매출 비율 (Donut Chart)</h3>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-orange/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-orange">1</div>
                <div>
                  <p className="text-text text-sm">새 Lens 시각화를 만들고, 차트 타입을 <strong>Donut</strong>으로 선택합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-orange/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-orange">2</div>
                <div>
                  <p className="text-text text-sm"><strong>category</strong> 필드를 <strong>Slice by</strong> 영역으로 드래그합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-es-orange/15 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold text-es-orange">3</div>
                <div>
                  <p className="text-text text-sm"><strong>amount</strong> 필드를 <strong>Size by</strong> 영역으로 드래그하고, <strong>Sum</strong>으로 설정합니다.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-surface-2 rounded-lg p-4 text-sm text-text-dim">
              <strong className="text-text">결과:</strong> 전자제품, 의류, 식품의 매출 비율이 도넛 차트로 표시됩니다. 전자제품이 가장 큰 비율을 차지해야 합니다.
            </div>
          </div>

          <ExplainCallout title="Kibana Lens의 장점">
            <ul>
              <li>복잡한 Aggregation 쿼리를 <strong>드래그 앤 드롭</strong>으로 만들 수 있습니다</li>
              <li>Lens가 내부적으로 Elasticsearch Aggregation 쿼리를 자동 생성합니다</li>
              <li>만든 시각화를 <strong>Dashboard</strong>에 모아서 실시간 모니터링 화면을 구성할 수 있습니다</li>
              <li>우측 상단 <strong>&quot;Save&quot;</strong>으로 저장한 뒤, <strong>Dashboard</strong> 메뉴에서 여러 차트를 한 화면에 배치하세요</li>
            </ul>
          </ExplainCallout>

          <QaBox question="Dashboard로 만들려면 어떻게 하나요?">
            <p>좌측 메뉴에서 <strong>Dashboard</strong>를 클릭하고 <strong>&quot;Create dashboard&quot;</strong>를 누르세요. 그런 다음 <strong>&quot;Add from library&quot;</strong>로 위에서 저장한 차트들을 추가합니다.</p>
            <p>차트를 드래그해서 크기와 위치를 자유롭게 조정할 수 있습니다. 하나의 대시보드에 월별 매출 바 차트, 누적 매출 라인 차트, 카테고리 도넛 차트를 모두 넣으면 <strong>매출 분석 대시보드</strong>가 완성됩니다.</p>
          </QaBox>

          <Checkpoint>
            Bar Chart에서 4월이 가장 높고, Line Chart에서 우상향 곡선이 보이고, Donut Chart에서 전자제품 비율이 가장 크면 성공! Kibana 대시보드 완성입니다.
          </Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

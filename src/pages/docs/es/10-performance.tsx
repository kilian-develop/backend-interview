
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal, Cm } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

export default function Chapter10() {
  return (
    <>
      {/* ═══════ PART 1 — 실습: Bulk 인덱싱 최적화 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 1 · Hands-on Lab</SectionLabel>
        <SectionTitle>Bulk 인덱싱 최적화<br />— 대량 데이터를 빠르게 넣는 법</SectionTitle>

        <LabBanner icon="&#x26A1;" title="왜 Bulk 최적화가 필요한가?">
          수백만 건의 데이터를 인덱싱할 때, 기본 설정 그대로 넣으면 시간이 오래 걸립니다. refresh, replica 같은 부가 작업이 매 문서마다 발생하기 때문이에요. 이 파트에서는 대량 인덱싱 시 성능을 극대화하는 3가지 핵심 전략을 실습합니다.
        </LabBanner>

        {/* Step 1: refresh_interval 조정 */}
        <LabStep num={1} title="refresh_interval 비활성화 후 Bulk 인덱싱" tags={["kibana"]}>
          <p>
            Elasticsearch는 기본적으로 <strong className="text-text">1초마다 refresh</strong>를 수행하여 새로 인덱싱된 문서를 검색 가능하게 만듭니다. 대량 인덱싱 중에는 이 주기적인 refresh가 불필요한 오버헤드를 만듭니다.
          </p>

          <p>먼저 테스트용 인덱스를 만들고, <strong className="text-text">refresh_interval을 -1로 설정</strong>하여 자동 refresh를 비활성화합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — refresh 비활성화" copyText={`PUT /bulk_test\n{\n  "settings": {\n    "refresh_interval": "-1"\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/bulk_test</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;settings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;refresh_interval&quot;</JKey>: <JStr>&quot;-1&quot;</JStr>{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`{
    "acknowledged": `}<Hl>true</Hl>{`,
    "shards_acknowledged": true,
    "index": "bulk_test"
}`}
          </ExpectedOutput>

          <p>이제 _bulk API로 데이터를 넣어봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — Bulk 인덱싱" copyText={`POST /bulk_test/_bulk\n{"index": {}}\n{"title": "문서 1", "value": 100}\n{"index": {}}\n{"title": "문서 2", "value": 200}\n{"index": {}}\n{"title": "문서 3", "value": 300}`}>
            <Kw>POST</Kw> <Url>/bulk_test/_bulk</Url>{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{}"}{"}"}     <Cm>&larr; 액션 라인</Cm>{"\n"}
            {"{"}<JKey>&quot;title&quot;</JKey>: <JStr>&quot;문서 1&quot;</JStr>, <JKey>&quot;value&quot;</JKey>: <JVal>100</JVal>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{}"}{"}"}     {"\n"}
            {"{"}<JKey>&quot;title&quot;</JKey>: <JStr>&quot;문서 2&quot;</JStr>, <JKey>&quot;value&quot;</JKey>: <JVal>200</JVal>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{}"}{"}"}     {"\n"}
            {"{"}<JKey>&quot;title&quot;</JKey>: <JStr>&quot;문서 3&quot;</JStr>, <JKey>&quot;value&quot;</JKey>: <JVal>300</JVal>{"}"}
          </CmdBlock>

          <p>Bulk 작업이 완료되면, <strong className="text-text">refresh_interval을 원래대로 복구</strong>합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — refresh 복구" copyText={`PUT /bulk_test/_settings\n{\n  "index": {\n    "refresh_interval": "1s"\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/bulk_test/_settings</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;index&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;refresh_interval&quot;</JKey>: <JStr>&quot;1s&quot;</JStr>{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>그리고 즉시 수동 refresh를 한 번 실행하여, 인덱싱된 문서를 검색 가능 상태로 만듭니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 수동 refresh" copyText={`POST /bulk_test/_refresh`}>
            <Kw>POST</Kw> <Url>/bulk_test/_refresh</Url>
          </CmdBlock>

          <ExplainCallout title="refresh_interval 전략 정리">
            <ul>
              <li><strong>&quot;-1&quot;</strong>로 설정하면 자동 refresh가 완전히 꺼집니다. 인덱싱된 문서는 검색에 즉시 반영되지 않습니다.</li>
              <li>대량 인덱싱이 끝나면 반드시 <strong>&quot;1s&quot;</strong>(또는 원하는 주기)로 다시 복구해야 합니다.</li>
              <li>복구 직후 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">POST /_refresh</code>를 호출하면 즉시 검색 가능해집니다.</li>
              <li>이 전략만으로도 대량 인덱싱 성능이 <strong>20~30% 이상</strong> 향상될 수 있습니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="refresh_interval을 -1로 두면 데이터가 유실되나요?">
            <p>아닙니다. refresh는 <strong>검색 가능 여부</strong>만 결정합니다. 데이터는 이미 translog에 안전하게 기록되어 있으므로, 노드 장애가 발생해도 유실되지 않습니다. refresh를 끈다고 데이터가 사라지는 것이 아니라, 단지 <strong>검색 결과에 즉시 나타나지 않을 뿐</strong>입니다.</p>
          </QaBox>

          <Checkpoint>refresh_interval을 -1로 설정 후 Bulk 인덱싱 → 다시 1s로 복구 → 수동 refresh 후 검색에 문서가 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 2: Bulk 배치 사이즈 가이드 */}
        <LabStep num={2} title="_bulk 배치 사이즈 가이드" tags={["kibana"]}>
          <p>
            _bulk API를 사용할 때 <strong className="text-text">한 번에 보내는 데이터의 크기</strong>가 성능에 큰 영향을 줍니다.
            너무 작으면 네트워크 오버헤드가 크고, 너무 크면 메모리 부담이 늘어납니다.
          </p>

          {/* 배치 사이즈 비교 */}
          <div className="grid grid-cols-3 gap-4 my-8 max-md:grid-cols-1">
            <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-red to-es-orange" />
              <div className="font-mono text-sm font-semibold text-es-red mb-2">너무 작은 배치</div>
              <div className="text-2xl font-bold text-text mb-1">{'< 1MB'}</div>
              <p className="text-sm text-text-dim mb-0">네트워크 왕복(round-trip)이 너무 많아 비효율적. HTTP 오버헤드가 인덱싱 시간의 대부분을 차지합니다.</p>
            </div>
            <div className="bg-surface border border-es-green/40 rounded-[14px] p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-es-cyan" />
              <div className="font-mono text-sm font-semibold text-es-green mb-2">권장 범위</div>
              <div className="text-2xl font-bold text-text mb-1">5 ~ 15MB</div>
              <p className="text-sm text-text-dim mb-0">네트워크 효율과 메모리 사용량의 최적 균형점. Elasticsearch 공식 문서에서도 이 범위를 권장합니다.</p>
            </div>
            <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-orange to-es-red" />
              <div className="font-mono text-sm font-semibold text-es-red mb-2">너무 큰 배치</div>
              <div className="text-2xl font-bold text-text mb-1">{'> 50MB'}</div>
              <p className="text-sm text-text-dim mb-0">노드 메모리에 과부하. GC가 자주 발생하고, 일부 문서 실패 시 재시도 비용도 커집니다.</p>
            </div>
          </div>

          <ExplainCallout title="배치 사이즈 튜닝 팁">
            <ul>
              <li><strong>문서 수가 아닌 바이트 기준</strong>으로 생각하세요. 문서 크기가 1KB라면 약 5,000~15,000개, 10KB라면 500~1,500개가 한 배치에 적합합니다.</li>
              <li>최적의 사이즈는 클러스터 환경에 따라 다르므로, <strong>5MB에서 시작</strong>하여 점진적으로 늘려가며 테스트하는 것이 좋습니다.</li>
              <li>_bulk 응답의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">took</code> 값(밀리초)을 비교하여 최적 사이즈를 찾으세요.</li>
              <li>HTTP 요청 본문의 최대 크기는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">http.max_content_length</code> (기본 100MB)으로 제한됩니다.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="주의: _bulk 에러 처리">
            <p>_bulk API는 일부 문서만 실패해도 <strong>전체 응답 코드는 200</strong>을 반환합니다. 반드시 응답의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">errors</code> 필드와 각 항목의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">status</code>를 확인하여 실패한 문서를 재시도해야 합니다.</p>
          </WarnCallout>

          <Checkpoint>배치 사이즈의 권장 범위(5~15MB)를 이해했으면 성공!</Checkpoint>
        </LabStep>

        {/* Step 3: number_of_replicas 조정 */}
        <LabStep num={3} title="number_of_replicas를 0으로 설정 후 인덱싱" tags={["kibana"]}>
          <p>
            인덱싱 시 Elasticsearch는 프라이머리 샤드와 레플리카 샤드에 <strong className="text-text">동시에 데이터를 기록</strong>합니다.
            대량 인덱싱 중에는 레플리카를 잠시 제거하면 쓰기 성능이 크게 향상됩니다.
          </p>

          <CmdBlock label="KIBANA DEV TOOLS — 레플리카 0으로 설정" copyText={`PUT /bulk_test/_settings\n{\n  "index": {\n    "number_of_replicas": 0\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/bulk_test/_settings</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;index&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;number_of_replicas&quot;</JKey>: <JVal>0</JVal>{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`{
    "acknowledged": `}<Hl>true</Hl>{`
}`}
          </ExpectedOutput>

          <p>이제 대량 인덱싱을 수행합니다. (여기서는 간단한 예시를 사용합니다.)</p>

          <CmdBlock label="KIBANA DEV TOOLS — Bulk 인덱싱" copyText={`POST /bulk_test/_bulk\n{"index": {}}\n{"title": "추가 문서 A", "value": 400}\n{"index": {}}\n{"title": "추가 문서 B", "value": 500}`}>
            <Kw>POST</Kw> <Url>/bulk_test/_bulk</Url>{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{}"}{"}"}     {"\n"}
            {"{"}<JKey>&quot;title&quot;</JKey>: <JStr>&quot;추가 문서 A&quot;</JStr>, <JKey>&quot;value&quot;</JKey>: <JVal>400</JVal>{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{}"}{"}"}     {"\n"}
            {"{"}<JKey>&quot;title&quot;</JKey>: <JStr>&quot;추가 문서 B&quot;</JStr>, <JKey>&quot;value&quot;</JKey>: <JVal>500</JVal>{"}"}
          </CmdBlock>

          <p>인덱싱이 끝나면 <strong className="text-text">레플리카를 원래대로 복구</strong>합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 레플리카 복구" copyText={`PUT /bulk_test/_settings\n{\n  "index": {\n    "number_of_replicas": 1\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/bulk_test/_settings</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;index&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;number_of_replicas&quot;</JKey>: <JVal>1</JVal>{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="레플리카 0 전략 정리">
            <ul>
              <li>레플리카가 0이면 프라이머리 샤드에만 기록하므로 <strong>쓰기 속도가 2배</strong> 가까이 향상될 수 있습니다.</li>
              <li>인덱싱 완료 후 레플리카를 복구하면, Elasticsearch가 자동으로 프라이머리에서 레플리카로 데이터를 복제합니다.</li>
              <li>복구 중에는 클러스터 상태가 잠시 <span className="text-es-orange font-medium">yellow</span>가 됩니다. 복제가 완료되면 <span className="text-es-green font-medium">green</span>으로 돌아옵니다.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="프로덕션에서의 주의점">
            <p>레플리카가 0인 동안에는 <strong>노드 장애 시 데이터 유실 위험</strong>이 있습니다. 프로덕션 환경에서는 반드시 인덱싱이 끝난 직후 레플리카를 복구하세요. 초기 데이터 로딩이나 재인덱싱 같은 <strong>일회성 대량 작업</strong>에서만 사용하는 것을 권장합니다.</p>
          </WarnCallout>

          <Checkpoint>레플리카를 0으로 설정 후 Bulk 인덱싱 → 레플리카 1로 복구까지 완료되면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: 쿼리 프로파일링 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>쿼리 프로파일링<br />— 느린 쿼리의 원인 찾기</SectionTitle>

        <LabBanner icon="&#x1F50D;" title="이번 파트에서 배울 것">
          쿼리가 느릴 때, &quot;어디서 시간이 걸리는지&quot;를 정확히 파악하는 도구들을 실습합니다. _profile API로 실행 계획을 분석하고, _explain API로 특정 문서의 스코어링 과정을 확인합니다.
        </LabBanner>

        {/* Step 4: _profile API */}
        <LabStep num={4} title="_profile API로 쿼리 실행 계획 분석" tags={["kibana"]}>
          <p>
            <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">profile: true</code>를 추가하면, Elasticsearch가 쿼리를 실행하면서 <strong className="text-text">각 단계별 소요 시간</strong>을 상세하게 알려줍니다.
          </p>

          <CmdBlock label="KIBANA DEV TOOLS — Profile 쿼리" copyText={`GET /products/_search\n{\n  "profile": true,\n  "query": {\n    "bool": {\n      "must": [\n        { "match": { "description": "노트북" } }\n      ],\n      "filter": [\n        { "term": { "category.keyword": "노트북" } }\n      ]\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;profile&quot;</JKey>: <JVal>true</JVal>,{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;must&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}],{"\n"}
            {"      "}<JKey>&quot;filter&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;category.keyword&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}]{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심 구조)">
            {`"profile": {
    "shards": [
        {
            "id": "[노드ID][products][0]",
            "searches": [
                {
                    "query": [
                        {
                            "type": `}<Hl>&quot;BooleanQuery&quot;</Hl>{`,
                            "description": "...",
                            "time_in_nanos": `}<Hl>123456</Hl>{`,
                            "children": [
                                {
                                    "type": "TermQuery",
                                    "description": "description:노트북",
                                    "time_in_nanos": ...
                                },
                                {
                                    "type": "TermQuery",
                                    "description": "category.keyword:노트북",
                                    "time_in_nanos": ...
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="_profile 응답 읽는 법">
            <ul>
              <li><strong>type</strong>: Lucene 레벨의 쿼리 타입 (BooleanQuery, TermQuery 등)</li>
              <li><strong>time_in_nanos</strong>: 해당 쿼리 단계에서 소요된 시간 (나노초). 이 값이 큰 부분이 병목입니다.</li>
              <li><strong>children</strong>: bool 쿼리의 하위 절들이 각각 얼마나 걸렸는지 보여줍니다.</li>
              <li>각 <strong>shard별로</strong> 프로파일 정보가 나옵니다. 특정 샤드만 느리다면 데이터 분포 문제일 수 있어요.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="프로덕션에서 profile 사용 시 주의">
            <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">profile: true</code>는 상당한 오버헤드를 추가합니다. <strong>디버깅 목적으로만</strong> 사용하고, 프로덕션 트래픽에는 절대 사용하지 마세요. 응답 크기도 매우 커질 수 있습니다.</p>
          </WarnCallout>

          <Checkpoint>응답에 profile.shards 배열이 보이고, 각 쿼리 단계별 time_in_nanos가 표시되면 성공!</Checkpoint>
        </LabStep>

        {/* Step 5: _explain API */}
        <LabStep num={5} title="_explain API로 스코어링 과정 확인" tags={["kibana"]}>
          <p>
            특정 문서가 <strong className="text-text">왜 이 점수를 받았는지</strong> 궁금할 때, _explain API를 사용합니다. 검색 결과의 순서가 기대와 다를 때 원인을 파악하는 데 매우 유용합니다.
          </p>

          <p>먼저 products 인덱스에서 문서 ID를 하나 확인합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 문서 ID 확인" copyText={`GET /products/_search\n{\n  "size": 1,\n  "_source": ["name"]\n}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>1</JVal>,{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <p>확인한 문서 ID를 사용하여 _explain을 호출합니다. (아래 예시에서 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">1</code>을 실제 문서 ID로 교체하세요.)</p>

          <CmdBlock label="KIBANA DEV TOOLS — Explain" copyText={`GET /products/_explain/1\n{\n  "query": {\n    "match": {\n      "description": "노트북"\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/products/_explain/1</Url>       <Cm>&larr; 실제 문서 ID로 교체</Cm>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심 구조)">
            {`{
    "_index": "products",
    "_id": "1",
    "matched": `}<Hl>true</Hl>{`,
    "explanation": {
        "value": `}<Hl>0.6931472</Hl>{`,
        "description": `}<Hl>"weight(description:노트북 in 0) [PerFieldSimilarity]"</Hl>{`,
        "details": [
            {
                "value": ...,
                "description": "idf, computed as ...",
                "details": [...]
            },
            {
                "value": ...,
                "description": "tf, computed as ...",
                "details": [...]
            }
        ]
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="_explain 응답 읽는 법">
            <ul>
              <li><strong>matched</strong>: 이 문서가 쿼리에 매칭되는지 여부 (true/false)</li>
              <li><strong>explanation.value</strong>: 최종 _score 값</li>
              <li><strong>explanation.description</strong>: 스코어 계산에 사용된 알고리즘 설명</li>
              <li><strong>details</strong>: 점수 계산의 세부 내역 (TF, IDF, field length 등)</li>
              <li><strong>TF (Term Frequency)</strong>: 해당 문서에서 검색어가 등장한 횟수 — 많을수록 점수 높음</li>
              <li><strong>IDF (Inverse Document Frequency)</strong>: 전체 문서에서 검색어가 희귀할수록 점수 높음</li>
            </ul>
          </ExplainCallout>

          <QaBox question="matched가 false인데 이유를 알고 싶을 때는요?">
            <p>matched가 false일 때도 <strong>explanation이 나옵니다</strong>. description을 보면 왜 매칭이 안 되는지 이유가 적혀 있어요. 예를 들어, &quot;no matching term&quot;이라면 해당 필드에 검색어가 없다는 뜻입니다. 이것은 매핑이나 분석기 설정 문제를 디버깅할 때 매우 유용합니다.</p>
          </QaBox>

          <Checkpoint>_explain 응답에서 matched, value, description이 보이고, 스코어 계산 과정을 확인할 수 있으면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: 슬로우 로그 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>슬로우 로그 설정<br />— 느린 쿼리를 자동으로 잡아내기</SectionTitle>

        <LabBanner icon="&#x1F4DD;" title="이번 파트에서 배울 것">
          일정 시간 이상 걸리는 쿼리를 자동으로 로그에 기록하는 슬로우 로그(Slow Log)를 설정합니다. 프로덕션 환경에서 성능 문제를 사전에 발견하는 핵심 도구입니다.
        </LabBanner>

        {/* Step 6: 슬로우 로그 설정 */}
        <LabStep num={6} title="슬로우 로그 설정" tags={["kibana"]}>
          <p>
            슬로우 로그는 <strong className="text-text">인덱스 단위</strong>로 설정합니다. 검색(search)과 인덱싱(indexing) 각각에 대해 임계값을 지정할 수 있습니다.
          </p>

          <CmdBlock label="KIBANA DEV TOOLS — 검색 슬로우 로그 설정" copyText={`PUT /products/_settings\n{\n  "index.search.slowlog.threshold.query.warn": "5s",\n  "index.search.slowlog.threshold.query.info": "2s",\n  "index.search.slowlog.threshold.query.debug": "500ms",\n  "index.search.slowlog.threshold.query.trace": "200ms",\n  "index.search.slowlog.threshold.fetch.warn": "1s",\n  "index.search.slowlog.threshold.fetch.info": "500ms"\n}`}>
            <Kw>PUT</Kw> <Url>/products/_settings</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;index.search.slowlog.threshold.query.warn&quot;</JKey>: <JStr>&quot;5s&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;index.search.slowlog.threshold.query.info&quot;</JKey>: <JStr>&quot;2s&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;index.search.slowlog.threshold.query.debug&quot;</JKey>: <JStr>&quot;500ms&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;index.search.slowlog.threshold.query.trace&quot;</JKey>: <JStr>&quot;200ms&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;index.search.slowlog.threshold.fetch.warn&quot;</JKey>: <JStr>&quot;1s&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;index.search.slowlog.threshold.fetch.info&quot;</JKey>: <JStr>&quot;500ms&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`{
    "acknowledged": `}<Hl>true</Hl>{`
}`}
          </ExpectedOutput>

          <p>인덱싱 슬로우 로그도 설정할 수 있습니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 인덱싱 슬로우 로그 설정" copyText={`PUT /products/_settings\n{\n  "index.indexing.slowlog.threshold.index.warn": "10s",\n  "index.indexing.slowlog.threshold.index.info": "5s",\n  "index.indexing.slowlog.threshold.index.debug": "2s"\n}`}>
            <Kw>PUT</Kw> <Url>/products/_settings</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;index.indexing.slowlog.threshold.index.warn&quot;</JKey>: <JStr>&quot;10s&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;index.indexing.slowlog.threshold.index.info&quot;</JKey>: <JStr>&quot;5s&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;index.indexing.slowlog.threshold.index.debug&quot;</JKey>: <JStr>&quot;2s&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="슬로우 로그 레벨 이해하기">
            <ul>
              <li><strong>warn (5s)</strong>: 5초 이상 걸린 쿼리 — 즉시 조치 필요. 알림 시스템과 연동 권장</li>
              <li><strong>info (2s)</strong>: 2초 이상 — 주기적 모니터링 대상</li>
              <li><strong>debug (500ms)</strong>: 500ms 이상 — 개발 환경에서 최적화 대상 파악 시 유용</li>
              <li><strong>trace (200ms)</strong>: 200ms 이상 — 매우 상세한 디버깅 용도</li>
              <li><strong>query vs fetch</strong>: query는 매칭 단계, fetch는 결과 문서를 가져오는 단계입니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="query와 fetch의 차이가 뭔가요?">
            <p>Elasticsearch 검색은 크게 <strong>두 단계</strong>로 나뉩니다.</p>
            <p><strong>Query 단계</strong>: 각 샤드에서 매칭되는 문서의 ID와 점수를 수집합니다. 어떤 문서가 검색 조건에 맞는지 판단하는 단계예요.</p>
            <p><strong>Fetch 단계</strong>: Query 단계에서 선별된 문서들의 실제 내용(_source)을 가져옵니다.</p>
            <p>query가 느리면 <strong>검색 조건 자체가 비효율적</strong>인 것이고, fetch가 느리면 <strong>반환할 문서가 너무 크거나 많은</strong> 것일 수 있습니다.</p>
          </QaBox>

          <Checkpoint>검색 및 인덱싱 슬로우 로그 설정이 acknowledged: true로 응답되면 성공!</Checkpoint>
        </LabStep>

        {/* Step 7: 슬로우 로그 확인 */}
        <LabStep num={7} title="슬로우 로그 확인 방법" tags={["terminal"]}>
          <p>
            슬로우 로그는 Elasticsearch 노드의 <strong className="text-text">로그 디렉토리</strong>에 파일로 기록됩니다.
          </p>

          <CmdBlock label="TERMINAL — Docker 환경에서 슬로우 로그 확인" copyText={`# 검색 슬로우 로그\ndocker exec -it elasticsearch cat /usr/share/elasticsearch/logs/*_index_search_slowlog.json\n\n# 인덱싱 슬로우 로그\ndocker exec -it elasticsearch cat /usr/share/elasticsearch/logs/*_index_indexing_slowlog.json`}>
            <Cm># 검색 슬로우 로그</Cm>{"\n"}
            docker exec -it elasticsearch cat{"\n"}
            {"  "}/usr/share/elasticsearch/logs/*_index_search_slowlog.json{"\n"}
            {"\n"}
            <Cm># 인덱싱 슬로우 로그</Cm>{"\n"}
            docker exec -it elasticsearch cat{"\n"}
            {"  "}/usr/share/elasticsearch/logs/*_index_indexing_slowlog.json
          </CmdBlock>

          <p>설정을 확인하고 싶다면 인덱스 settings를 조회합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 현재 슬로우 로그 설정 확인" copyText={`GET /products/_settings?include_defaults=true&filter_path=**.slowlog`}>
            <Kw>GET</Kw> <Url>/products/_settings?include_defaults=true&amp;filter_path=**.slowlog</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`{
    "products": {
        "settings": {
            "index": {
                "search": {
                    "slowlog": {
                        "threshold": {
                            "query": {
                                "warn": `}<Hl>&quot;5s&quot;</Hl>{`,
                                "info": "2s",
                                "debug": "500ms",
                                "trace": "200ms"
                            }
                        }
                    }
                }
            }
        }
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="슬로우 로그 활용 팁">
            <ul>
              <li>슬로우 로그 파일은 JSON 형식이므로, <strong>ELK 스택으로 수집</strong>하여 대시보드로 모니터링하는 것이 일반적입니다.</li>
              <li>프로덕션에서는 <strong>warn과 info 레벨만</strong> 활성화하는 것을 권장합니다. debug/trace는 로그 양이 많아질 수 있어요.</li>
              <li>슬로우 로그에는 실행된 쿼리의 전체 내용이 포함되므로, <strong>어떤 쿼리가 문제인지</strong> 정확히 파악할 수 있습니다.</li>
              <li>임계값을 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;0ms&quot;</code>로 설정하면 모든 쿼리가 기록됩니다. 단기간 전수 분석 시 유용합니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>슬로우 로그 설정을 조회하여 앞서 설정한 임계값이 정확히 나오면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 이론: 캐싱 전략 ═══════ */}
      <Section>
        <SectionLabel>Part 4 · Theory</SectionLabel>
        <SectionTitle>캐싱 전략<br />— Elasticsearch가 빠른 진짜 이유</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          Elasticsearch는 동일한 쿼리가 반복될 때 매번 처음부터 계산하지 않습니다. <strong className="text-text">3가지 레벨의 캐시</strong>를 활용하여 응답 속도를 극적으로 향상시킵니다.
        </p>

        {/* 3가지 캐시 카드 */}
        <div className="grid grid-cols-3 gap-6 my-10 max-md:grid-cols-1">
          {/* Node Query Cache */}
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-blue">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-cyan" />
            <div className="font-mono text-sm font-semibold text-es-blue mb-2">Node Query Cache</div>
            <p className="text-sm text-text-dim mb-3"><strong className="text-text">filter 컨텍스트의 결과를 캐싱</strong></p>
            <p className="text-sm text-text-dim mb-0">
              bool 쿼리의 filter 절, must_not 절처럼 <strong className="text-text">점수를 계산하지 않는 쿼리</strong>의 결과(매칭되는 문서 ID 비트셋)를 캐싱합니다. 노드 단위로 공유됩니다.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">filter</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">must_not</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">비트셋</span>
            </div>
          </div>

          {/* Shard Request Cache */}
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-green">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-accent" />
            <div className="font-mono text-sm font-semibold text-es-green mb-2">Shard Request Cache</div>
            <p className="text-sm text-text-dim mb-3"><strong className="text-text">size: 0인 집계 결과를 캐싱</strong></p>
            <p className="text-sm text-text-dim mb-0">
              <code className="font-mono text-xs bg-surface-2 px-1.5 py-0.5 rounded border border-border">size: 0</code>인 검색 요청(집계만 하는 경우)의 전체 결과를 샤드 단위로 캐싱합니다. refresh가 발생하면 캐시가 무효화됩니다.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">aggs</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">size: 0</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">샤드 단위</span>
            </div>
          </div>

          {/* Field Data Cache */}
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-purple">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-purple to-es-orange" />
            <div className="font-mono text-sm font-semibold text-es-purple mb-2">Field Data Cache</div>
            <p className="text-sm text-text-dim mb-3"><strong className="text-text">text 필드의 정렬/집계 데이터 캐싱</strong></p>
            <p className="text-sm text-text-dim mb-0">
              text 필드에 대한 정렬이나 집계 시 사용됩니다. 힙 메모리를 많이 사용하므로 주의가 필요합니다. 대부분의 경우 keyword 필드나 doc_values를 대신 사용하는 것이 좋습니다.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">text 정렬</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">힙 메모리</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">주의 필요</span>
            </div>
          </div>
        </div>

        {/* filter 컨텍스트의 캐싱 이점 */}
        <div className="bg-surface border border-border rounded-2xl p-10 my-10">
          <div className="text-center text-lg font-semibold text-text">filter 컨텍스트의 캐싱 이점</div>
          <div className="text-center text-[0.88rem] text-text-dim mt-1">같은 필터 조건은 두 번째부터 거의 즉시 응답합니다</div>
          <div className="grid grid-cols-2 gap-5 max-w-[700px] mx-auto mt-6 max-md:grid-cols-1">
            <div className="rounded-xl p-5 text-center bg-es-green/[0.08] border border-es-green/20">
              <h4 className="font-mono text-[0.9rem] mb-1 text-es-green">must (점수 계산)</h4>
              <p className="text-[0.82rem] text-text-dim !mb-0">매번 스코어 계산<br /><strong className="text-text font-medium">캐싱 불가</strong></p>
              <p className="mt-2 text-[0.78rem] text-es-orange !mb-0">문서 변경/추가 시마다 점수가 달라질 수 있음</p>
            </div>
            <div className="rounded-xl p-5 text-center bg-es-blue/[0.06] border border-es-blue/20">
              <h4 className="font-mono text-[0.9rem] mb-1 text-es-blue">filter (YES/NO)</h4>
              <p className="text-[0.82rem] text-text-dim !mb-0">결과를 비트셋으로 캐싱<br /><strong className="text-text font-medium">Node Query Cache에 저장</strong></p>
              <p className="mt-2 text-[0.78rem] text-es-green !mb-0">동일 조건 재요청 시 즉시 응답</p>
            </div>
          </div>
        </div>

        <ExplainCallout title="캐싱 전략 핵심 요약">
          <ul>
            <li><strong>점수가 필요 없는 조건은 반드시 filter에 넣으세요.</strong> 카테고리 필터, 가격 범위, 재고 여부 같은 조건은 filter가 최적입니다.</li>
            <li><strong>Node Query Cache</strong>는 자주 사용되는 filter 조건을 자동으로 캐싱합니다. 캐시 적중률이 높을수록 성능이 좋아집니다.</li>
            <li><strong>Shard Request Cache</strong>는 size: 0 집계에 자동 적용됩니다. 대시보드처럼 같은 집계를 반복 요청하는 패턴에 효과적입니다.</li>
            <li><strong>Field Data Cache</strong>는 가능하면 사용을 피하세요. text 필드 대신 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">keyword</code> 필드로 정렬/집계하는 것이 훨씬 효율적입니다.</li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="캐시 무효화에 대해">
          <p>
            Node Query Cache와 Shard Request Cache는 <strong>세그먼트가 변경</strong>(refresh, merge 등)되면 자동으로 무효화됩니다. 데이터가 자주 변경되는 인덱스에서는 캐시 효과가 줄어들 수 있습니다. 이럴 때 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">refresh_interval</code>을 늘리면 캐시 유지 시간이 길어져 성능이 향상될 수 있습니다.
          </p>
        </WarnCallout>

        {/* 캐시 모니터링 */}
        <div className="mt-8">
          <p className="text-text-dim text-lg mb-4">
            캐시 상태는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">_nodes/stats</code> API로 확인할 수 있습니다.
          </p>

          <CmdBlock label="KIBANA DEV TOOLS — 캐시 통계 확인" copyText={`GET /_nodes/stats/indices/query_cache,request_cache,fielddata`}>
            <Kw>GET</Kw> <Url>/_nodes/stats/indices/query_cache,request_cache,fielddata</Url>
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"query_cache": {
    "memory_size_in_bytes": ...,
    "total_count": ...,
    "hit_count": `}<Hl>150</Hl>{`,
    "miss_count": `}<Hl>30</Hl>{`,
    "evictions": 0
},
"request_cache": {
    "memory_size_in_bytes": ...,
    "hit_count": `}<Hl>45</Hl>{`,
    "miss_count": `}<Hl>10</Hl>{`,
    "evictions": 0
},
"fielddata": {
    "memory_size_in_bytes": `}<Hl>0</Hl>{`,
    "evictions": 0
}`}
          </ExpectedOutput>

          <ExplainCallout title="캐시 통계 읽는 법">
            <ul>
              <li><strong>hit_count / miss_count</strong>: 캐시 적중률을 계산할 수 있습니다. hit / (hit + miss)가 높을수록 좋습니다.</li>
              <li><strong>evictions</strong>: 메모리 부족으로 캐시가 밀려난 횟수. 이 수치가 높다면 캐시 크기를 늘리는 것을 고려하세요.</li>
              <li><strong>fielddata.memory_size_in_bytes</strong>: 0이면 text 필드에 대한 정렬/집계가 없다는 뜻입니다. 이상적인 상태에요.</li>
            </ul>
          </ExplainCallout>
        </div>

        <QaBox question="must 대신 filter를 쓰면 얼마나 빨라지나요?">
          <p>단순 비교는 어렵지만, filter 컨텍스트는 크게 <strong>두 가지 장점</strong>이 있습니다.</p>
          <p>첫째, <strong>스코어 계산을 건너뜁니다.</strong> BM25 점수 계산은 TF, IDF, field length 등을 모두 고려해야 하는 비용이 큰 연산입니다. filter는 이를 완전히 생략합니다.</p>
          <p>둘째, <strong>결과가 캐싱됩니다.</strong> 동일한 filter 조건이 반복되면 Node Query Cache에서 즉시 결과를 반환합니다. 쇼핑몰에서 &quot;카테고리: 노트북&quot; 필터를 여러 사용자가 사용하면, 두 번째 사용자부터는 캐시에서 바로 응답합니다.</p>
          <p>실무에서는 filter로 전환하는 것만으로도 <strong>2~5배</strong> 성능 향상을 경험하는 경우가 많습니다.</p>
        </QaBox>
      </Section>
    </>
  );
}

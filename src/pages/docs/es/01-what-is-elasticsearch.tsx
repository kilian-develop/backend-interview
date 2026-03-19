import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout } from "@/components/es/content/Callouts";
import InvertedIndexDemo from "@/components/es/interactive/InvertedIndexDemo";
import SearchSimulator from "@/components/es/interactive/SearchSimulator";

export default function Chapter01() {
  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/*  PART 1 — 이론: 왜 Elasticsearch인가?      */}
      {/* ═══════════════════════════════════════════ */}

      <Section>
        <SectionLabel>Part 1 &middot; Theory</SectionLabel>
        <SectionTitle>
          기존 데이터베이스로 검색하면
          <br />
          어떤 문제가 생길까?
        </SectionTitle>

        <p className="text-text-dim text-[1.05rem] mb-6">
          쇼핑몰에서 <strong className="text-text font-medium">&ldquo;노트북&rdquo;</strong>을 검색한다고 상상해보세요. MySQL에서는 이렇게 쿼리합니다:
        </p>

        {/* SQL Code Block */}
        <div className="bg-surface-2 border border-border rounded-xl p-6 my-6 font-mono text-[0.9rem] leading-relaxed overflow-x-auto relative">
          <span className="absolute top-3 right-4 text-[0.65rem] text-text-dim tracking-wider uppercase">SQL</span>
          <span className="text-es-purple">SELECT</span> * <span className="text-es-purple">FROM</span> products{"\n"}
          <span className="text-es-purple">WHERE</span> name <span className="text-es-purple">LIKE</span> <span className="text-es-green">&apos;%노트북%&apos;</span>;
        </div>

        <p className="text-text-dim text-[1.05rem] mb-6">
          작동은 합니다. 하지만 상품이 <strong className="text-text font-medium">100만 건, 1000만 건</strong>이 되면 어떨까요?
        </p>

        {/* Problem Card */}
        <div className="bg-surface border border-border rounded-2xl p-10 my-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-red to-es-orange" />
          <h3 className="text-xl mb-6 text-es-red font-bold">LIKE &apos;%keyword%&apos; 의 세 가지 한계</h3>

          <div className="flex items-start gap-4 py-3 border-b border-border">
            <div className="w-7 h-7 rounded-full bg-es-red/15 flex items-center justify-center shrink-0 mt-0.5 text-[0.85rem]">1</div>
            <div className="text-text-dim text-[0.95rem] leading-[1.7]">
              <strong className="text-text font-medium">느리다</strong> — 테이블의 모든 행을 처음부터 끝까지 훑어봅니다 (Full Table Scan). 데이터가 많아질수록 검색 시간이 선형으로 증가합니다.
            </div>
          </div>

          <div className="flex items-start gap-4 py-3 border-b border-border">
            <div className="w-7 h-7 rounded-full bg-es-red/15 flex items-center justify-center shrink-0 mt-0.5 text-[0.85rem]">2</div>
            <div className="text-text-dim text-[0.95rem] leading-[1.7]">
              <strong className="text-text font-medium">유연하지 않다</strong> — &ldquo;노트 북&rdquo;, &ldquo;notebook&rdquo;, &ldquo;랩탑&rdquo; 같은 유사 표현을 전혀 찾지 못합니다. 사용자가 정확한 글자를 입력해야만 합니다.
            </div>
          </div>

          <div className="flex items-start gap-4 py-3">
            <div className="w-7 h-7 rounded-full bg-es-red/15 flex items-center justify-center shrink-0 mt-0.5 text-[0.85rem]">3</div>
            <div className="text-text-dim text-[0.95rem] leading-[1.7]">
              <strong className="text-text font-medium">관련도 정렬 불가</strong> — 이름에 &ldquo;노트북&rdquo;이 들어간 결과와 설명에 &ldquo;노트북&rdquo;이 들어간 결과를 구분하지 못합니다. 구글처럼 &ldquo;가장 관련 있는 결과&rdquo;를 먼저 보여줄 수 없습니다.
            </div>
          </div>
        </div>

        <p className="text-text-dim text-[1.05rem] mb-6">
          <span className="text-accent font-medium">Elasticsearch</span>는 이 세 가지 문제를 모두 해결합니다. 그 핵심에는 <strong className="text-text font-medium">역색인(Inverted Index)</strong>이라는 구조가 있어요.
        </p>
      </Section>

      {/* ═══════════════════════════════════════════ */}
      {/*  PART 2 — 이론: 역색인                      */}
      {/* ═══════════════════════════════════════════ */}

      <Section>
        <SectionLabel>Part 2 &middot; Theory</SectionLabel>
        <SectionTitle>
          역색인(Inverted Index)
          <br />
          — 검색을 빠르게 만드는 마법
        </SectionTitle>

        <p className="text-text-dim text-[1.05rem] mb-6">
          일반 DB의 저장 방식과 역색인의 차이를 직접 비교해봅시다. <strong className="text-text font-medium">탭을 클릭</strong>해보세요.
        </p>

        <InvertedIndexDemo />

        <p className="text-text-dim text-[1.05rem] mb-6">
          이것은 마치 <strong className="text-text font-medium">책의 맨 뒤에 있는 색인(Index)</strong>과 같습니다.
          &ldquo;노트북 &rarr; p.12, p.45, p.78&rdquo;이라고 적혀있으면, 책 전체를 읽지 않고도 해당 페이지로 바로 갈 수 있죠.
        </p>
        <p className="text-text-dim text-[1.05rem] mb-6">
          이것이 Elasticsearch가 <strong className="text-text font-medium">수억 건의 데이터에서도 밀리초(ms) 단위로 검색</strong>할 수 있는 핵심 원리입니다.
        </p>
      </Section>

      {/* ═══════ Interactive Search ═══════ */}

      <Section>
        <SectionLabel>Try It &middot; Interactive</SectionLabel>
        <SectionTitle>역색인 검색을 체험해보세요</SectionTitle>
        <p className="text-text-dim text-[1.05rem] mb-6">
          아래 검색창에 단어를 입력하면, 역색인이 어떻게 동작하는지 단계별로 보여줍니다.
        </p>

        <SearchSimulator />
      </Section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════ */}
      {/*  PART 3 — 실습: 환경 확인                    */}
      {/* ═══════════════════════════════════════════ */}

      <LabSection>
        <SectionLabel lab>Part 3 &middot; Hands-on Lab</SectionLabel>
        <SectionTitle>
          실습: 내 Elasticsearch에
          <br />
          직접 말을 걸어보자
        </SectionTitle>

        <LabBanner icon="&#x1F9EA;" title="실습 환경">
          Docker로 Elasticsearch(9200 포트)와 Kibana(5601 포트)가 실행 중입니다.
          <br />
          아래 가이드를 <strong className="text-text font-medium">위에서부터 순서대로</strong> 따라해보세요.
        </LabBanner>

        {/* Step 1 */}
        <LabStep num={1} title="Elasticsearch가 살아있는지 확인하기" tags={["terminal"]}>
          <p>터미널을 열고 아래 명령어를 복사해서 실행해보세요. Elasticsearch에 &ldquo;안녕?&rdquo; 하고 인사하는 것과 같습니다.</p>

          <CmdBlock label="TERMINAL" copyText="curl -s http://localhost:9200 | python3 -m json.tool">
            <span className="text-es-green select-none">$ </span>curl -s <Url>http://localhost:9200</Url> | python3 -m json.tool
          </CmdBlock>

          <ExpectedOutput>
{`{
    "name": "e7fa1ce4d4a6",
    "cluster_name": "`}<Hl>docker-cluster</Hl>{`",
    "version": {
        "number": "`}<Hl>8.17.0</Hl>{`",
        ...
    },
    "tagline": "`}<Hl>You Know, for Search</Hl>{`"
}`}
          </ExpectedOutput>

          <ExplainCallout title="무슨 일이 일어났나요?">
            <ul>
              <li><strong>curl</strong>은 HTTP 요청을 보내는 명령어입니다. 웹 브라우저가 하는 일과 같아요.</li>
              <li><strong>localhost:9200</strong>은 내 컴퓨터에서 돌아가는 Elasticsearch의 주소입니다.</li>
              <li>ES는 <strong>REST API</strong>로 동작합니다. 즉, HTTP 요청(GET, POST, PUT, DELETE)으로 모든 것을 합니다.</li>
              <li><strong>&ldquo;You Know, for Search&rdquo;</strong> — 이 문구가 보이면 정상 작동 중입니다!</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            &ldquo;tagline&rdquo;: &ldquo;You Know, for Search&rdquo; 가 출력되면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 2 */}
        <LabStep num={2} title="Kibana Dev Tools 열기" tags={["browser"]}>
          <p>Kibana는 Elasticsearch를 시각적으로 다룰 수 있는 도구입니다. 그 안의 <strong className="text-text font-medium">Dev Tools</strong>는 쿼리를 편하게 작성하고 실행할 수 있는 콘솔이에요.</p>

          <CmdBlock label="BROWSER ADDRESS BAR" copyText="http://localhost:5601/app/dev_tools#/console">
            <Url>http://localhost:5601/app/dev_tools#/console</Url>
          </CmdBlock>

          <ExplainCallout title="Dev Tools가 뭔가요?">
            <p>터미널에서 curl 명령어를 일일이 치는 대신, Kibana Dev Tools에서 훨씬 편하게 쿼리를 실행할 수 있습니다. 앞으로의 실습에서는 <strong>두 가지 방법 모두</strong> 안내해드릴게요.</p>
            <ul>
              <li>왼쪽 패널에 쿼리를 입력하고 <strong>&#x25B6; (재생 버튼)</strong> 또는 <strong>Ctrl+Enter</strong>를 누르면 실행됩니다.</li>
              <li>오른쪽 패널에 결과가 표시됩니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            Kibana 화면이 열리고 왼쪽에 쿼리 입력 창이 보이면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 3 */}
        <LabStep num={3} title="첫 번째 문서를 저장해보기 (인덱싱)" tags={["terminal", "kibana"]}>
          <p>이제 Elasticsearch에 데이터를 넣어봅시다. 쇼핑몰의 <strong className="text-text font-medium">상품 하나</strong>를 저장하는 것입니다. Elasticsearch에서는 이것을 <strong className="text-text font-medium">&ldquo;인덱싱(Indexing)&rdquo;</strong>이라고 부릅니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`POST /products/_doc/1\n{\n  "name": "삼성 갤럭시북 프로",\n  "category": "노트북",\n  "price": 1590000,\n  "brand": "삼성",\n  "description": "가볍고 강력한 성능의 업무용 노트북",\n  "in_stock": true\n}`}
          >
            <Kw>POST</Kw> <Url>/products/_doc/1</Url>{"\n"}
{`{
  `}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;삼성 갤럭시북 프로&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;category&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;price&quot;</JKey>: <JVal>1590000</JVal>,{"\n"}
{"  "}<JKey>&quot;brand&quot;</JKey>: <JStr>&quot;삼성&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;가볍고 강력한 성능의 업무용 노트북&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;in_stock&quot;</JKey>: <JVal>true</JVal>{"\n"}
{`}`}
          </CmdBlock>

          <p className="text-[0.88rem] text-text-dim">터미널에서 하고 싶다면:</p>

          <CmdBlock
            label="TERMINAL"
            copyText={`curl -s -X POST "http://localhost:9200/products/_doc/1" -H 'Content-Type: application/json' -d '{\n  "name": "삼성 갤럭시북 프로",\n  "category": "노트북",\n  "price": 1590000,\n  "brand": "삼성",\n  "description": "가볍고 강력한 성능의 업무용 노트북",\n  "in_stock": true\n}' | python3 -m json.tool`}
          >
            <span className="text-es-green select-none">$ </span>curl -s -X POST <Url>&quot;http://localhost:9200/products/_doc/1&quot;</Url> \{"\n"}
{"  "}<Kw>-H</Kw> &apos;Content-Type: application/json&apos; \{"\n"}
{"  "}<Kw>-d</Kw> {"'{"}{"\n"}
{"  "}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;삼성 갤럭시북 프로&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;category&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;price&quot;</JKey>: <JVal>1590000</JVal>,{"\n"}
{"  "}<JKey>&quot;brand&quot;</JKey>: <JStr>&quot;삼성&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;가볍고 강력한 성능의 업무용 노트북&quot;</JStr>,{"\n"}
{"  "}<JKey>&quot;in_stock&quot;</JKey>: <JVal>true</JVal>{"\n"}
{"}'"} | python3 -m json.tool
          </CmdBlock>

          <ExpectedOutput>
{`{
    "_index": "`}<Hl>products</Hl>{`",
    "_id": "`}<Hl>1</Hl>{`",
    "_version": 1,
    "result": "`}<Hl>created</Hl>{`",
    ...
}`}
          </ExpectedOutput>

          <ExplainCallout title="하나씩 뜯어봅시다">
            <ul>
              <li><strong>POST</strong> — &ldquo;새 데이터를 보낸다&rdquo;는 HTTP 메서드입니다.</li>
              <li><strong>/products</strong> — 인덱스 이름입니다. 없으면 자동 생성됩니다. (RDB의 테이블에 해당)</li>
              <li><strong>/_doc/1</strong> — 문서(Document)를 뜻하며, <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">1</code>은 이 문서의 고유 ID입니다.</li>
              <li><strong>JSON body</strong> — 저장할 데이터입니다. RDB의 한 행(Row)에 해당해요.</li>
              <li><strong>&ldquo;result&rdquo;: &ldquo;created&rdquo;</strong> — 이 문구가 보이면 성공적으로 저장된 것입니다!</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;result&quot;: &quot;created&quot;</code> 가 출력되면 성공! 축하합니다, 첫 번째 문서를 Elasticsearch에 저장했어요.
          </Checkpoint>
        </LabStep>

        {/* Step 4 */}
        <LabStep num={4} title="저장한 문서를 조회해보기" tags={["terminal", "kibana"]}>
          <p>방금 넣은 데이터가 진짜 들어갔는지 확인해봅시다. ID가 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">1</code>인 문서를 꺼내볼게요.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText="GET /products/_doc/1">
            <Kw>GET</Kw> <Url>/products/_doc/1</Url>
          </CmdBlock>

          <CmdBlock label="TERMINAL" copyText="curl -s http://localhost:9200/products/_doc/1 | python3 -m json.tool">
            <span className="text-es-green select-none">$ </span>curl -s <Url>http://localhost:9200/products/_doc/1</Url> | python3 -m json.tool
          </CmdBlock>

          <ExpectedOutput>
{`{
    "_index": "products",
    "_id": "1",
    "`}<Hl>found</Hl>{`": `}<Hl>true</Hl>{`,
    "_source": {
        "name": "`}<Hl>삼성 갤럭시북 프로</Hl>{`",
        "category": "노트북",
        "price": 1590000,
        "brand": "삼성",
        "description": "가볍고 강력한 성능의 업무용 노트북",
        "in_stock": true
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="응답 구조 이해하기">
            <ul>
              <li><strong>_index</strong> — 이 문서가 속한 인덱스 이름</li>
              <li><strong>_id</strong> — 문서의 고유 식별자</li>
              <li><strong>found: true</strong> — 문서를 찾았다는 뜻</li>
              <li><strong>_source</strong> — 실제 저장된 데이터. 우리가 넣었던 JSON이 그대로 들어있습니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;found&quot;: true</code> 와 함께 _source 안에 상품 데이터가 보이면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 5 */}
        <LabStep num={5} title="첫 번째 검색을 해보기" tags={["terminal", "kibana"]}>
          <p>ID로 직접 꺼내는 것은 검색이 아닙니다. 이제 진짜로 <strong className="text-text font-medium">&ldquo;노트북&rdquo;이라는 키워드로 검색</strong>해봅시다. 이것이 역색인이 동작하는 순간입니다!</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`GET /products/_search\n{\n  "query": {\n    "match": {\n      "description": "노트북"\n    }\n  }\n}`}
          >
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
{`{
  `}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
{"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
{"      "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{"\n"}
{"    }"}{"\n"}
{"  }"}{"\n"}
{`}`}
          </CmdBlock>

          <CmdBlock
            label="TERMINAL"
            copyText={`curl -s -X GET "http://localhost:9200/products/_search" -H 'Content-Type: application/json' -d '{\n  "query": {\n    "match": {\n      "description": "노트북"\n    }\n  }\n}' | python3 -m json.tool`}
          >
            <span className="text-es-green select-none">$ </span>curl -s -X GET <Url>&quot;http://localhost:9200/products/_search&quot;</Url> \{"\n"}
{"  "}<Kw>-H</Kw> &apos;Content-Type: application/json&apos; \{"\n"}
{"  "}<Kw>-d</Kw> {"'{"}{"\n"}
{"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
{"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
{"      "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{"\n"}
{"    }"}{"\n"}
{"  }"}{"\n"}
{"}'"} | python3 -m json.tool
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심 부분)">
{`{
    "hits": {
        "total": { "value": `}<Hl>1</Hl>{` },
        "hits": [
            {
                "_id": "1",
                "`}<Hl>_score</Hl>{`": `}<Hl>0.5753642</Hl>{`,
                "_source": {
                    "name": "삼성 갤럭시북 프로",
                    "description": "`}<Hl>가볍고 강력한 성능의 업무용 노트북</Hl>{`"
                }
            }
        ]
    }
}`}
          </ExpectedOutput>

          <ExplainCallout title="이것이 바로 역색인 검색입니다!">
            <ul>
              <li><strong>_search</strong> — 검색 API의 엔드포인트</li>
              <li><strong>match 쿼리</strong> — &ldquo;이 필드에서 이 단어를 찾아줘&rdquo;라는 뜻. Elasticsearch가 역색인을 뒤져서 결과를 찾습니다.</li>
              <li><strong>_score: 0.57...</strong> — 이 문서가 검색어와 <strong>얼마나 관련 있는지</strong>를 나타내는 점수입니다. LIKE 검색에서는 불가능했던 것이죠!</li>
              <li><strong>hits.total.value: 1</strong> — 지금은 문서가 1개뿐이니 1건만 나옵니다. 더 넣어보면 여러 건이 점수 순으로 정렬되어 나와요.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            hits 안에 상품이 보이고 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">_score</code> 값이 있으면 성공! 첫 Elasticsearch 검색을 완료했습니다.
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════════════════════════════════════════ */}
      {/*  PART 4 — 이론: 핵심 용어                    */}
      {/* ═══════════════════════════════════════════ */}

      <Section>
        <SectionLabel>Part 4 &middot; Theory</SectionLabel>
        <SectionTitle>핵심 용어 — RDB와 비교하기</SectionTitle>
        <p className="text-text-dim text-[1.05rem] mb-6">
          방금 실습에서 사용한 개념들을, 이미 알고 있는 RDB와 비교하며 정리합시다.
        </p>

        {/* Comparison Table */}
        <div className="my-12">
          <table className="w-full border-collapse bg-surface rounded-xl overflow-hidden border border-border">
            <thead>
              <tr>
                <th className="px-6 py-5 text-left font-semibold text-[0.85rem] tracking-wider uppercase border-b-2 border-border text-es-blue bg-es-blue/5">
                  RDB
                </th>
                <th className="px-6 py-5 text-left font-semibold text-[0.85rem] tracking-wider uppercase border-b-2 border-border text-es-green bg-es-green/5">
                  Elasticsearch
                </th>
                <th className="px-6 py-5 text-left font-semibold text-[0.85rem] tracking-wider uppercase border-b-2 border-border text-text-dim">
                  설명
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-blue">Database</td>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-green">Index</td>
                <td className="px-6 py-4 border-b border-border text-[0.95rem] text-text-dim">
                  데이터를 담는 큰 그릇. 실습에서 만든 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border text-es-green">products</code>가 인덱스입니다.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-blue">Row</td>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-green">Document</td>
                <td className="px-6 py-4 border-b border-border text-[0.95rem] text-text-dim">
                  하나의 데이터 레코드. JSON 형식으로 저장. 실습에서 넣은 상품 1개가 문서입니다.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-blue">Column</td>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-green">Field</td>
                <td className="px-6 py-4 border-b border-border text-[0.95rem] text-text-dim">
                  데이터의 각 항목. name, price, brand 등이 필드입니다.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-blue">Schema</td>
                <td className="px-6 py-4 border-b border-border font-mono text-[0.9rem] text-es-green">Mapping</td>
                <td className="px-6 py-4 border-b border-border text-[0.95rem] text-text-dim">
                  데이터 구조와 타입을 정의. (Chapter 2에서 다룹니다)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-mono text-[0.9rem] text-es-blue">SQL</td>
                <td className="px-6 py-4 font-mono text-[0.9rem] text-es-green">Query DSL</td>
                <td className="px-6 py-4 text-[0.95rem] text-text-dim">
                  검색을 위한 JSON 기반 쿼리 언어. 실습에서 사용한 match 쿼리가 이것입니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Concept Cards */}
        <div className="grid grid-cols-2 gap-5 my-8 max-sm:grid-cols-1">
          <div className="bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-0.5">
            <div className="font-mono text-[0.9rem] font-semibold mb-2 text-accent">Index</div>
            <div className="text-[0.88rem] text-text-dim leading-[1.7]">
              관련된 문서(Document)의 모음. 예를 들어 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">products</code> 인덱스에는 모든 상품 데이터가 들어갑니다.
            </div>
            <div className="mt-3 pt-3 border-t border-border text-[0.82rem] text-es-purple italic">
              비유: 도서관에서 &ldquo;소설&rdquo; 코너 전체
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-0.5">
            <div className="font-mono text-[0.9rem] font-semibold mb-2 text-accent">Document</div>
            <div className="text-[0.88rem] text-text-dim leading-[1.7]">
              하나의 데이터 단위. JSON 형식으로 저장됩니다. RDB의 한 행(Row)에 해당합니다.
            </div>
            <div className="mt-3 pt-3 border-t border-border text-[0.82rem] text-es-purple italic">
              비유: 도서관에 있는 책 한 권
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-0.5">
            <div className="font-mono text-[0.9rem] font-semibold mb-2 text-accent">Shard</div>
            <div className="text-[0.88rem] text-text-dim leading-[1.7]">
              인덱스를 쪼개놓은 조각. 데이터가 많으면 여러 샤드에 나눠 저장하여 병렬 처리합니다.
            </div>
            <div className="mt-3 pt-3 border-t border-border text-[0.82rem] text-es-purple italic">
              비유: 피자를 여러 조각으로 나눈 것
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6 transition-all duration-300 hover:border-accent hover:-translate-y-0.5">
            <div className="font-mono text-[0.9rem] font-semibold mb-2 text-accent">Replica</div>
            <div className="text-[0.88rem] text-text-dim leading-[1.7]">
              샤드의 복사본. 원본(Primary)에 문제가 생기면 복사본이 대신합니다. 검색 성능도 높여줍니다.
            </div>
            <div className="mt-3 pt-3 border-t border-border text-[0.82rem] text-es-purple italic">
              비유: 중요한 파일의 백업 복사본
            </div>
          </div>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════ */}
      {/*  PART 5 — 이론: 클러스터 구조                 */}
      {/* ═══════════════════════════════════════════ */}

      <Section>
        <SectionLabel>Part 5 &middot; Theory</SectionLabel>
        <SectionTitle>Elasticsearch 클러스터 구조</SectionTitle>
        <p className="text-text-dim text-[1.05rem] mb-6">
          실제 운영 환경에서는 여러 노드(서버)가 모여 <strong className="text-text font-medium">클러스터</strong>를 이룹니다. 각 노드에 샤드가 분산 저장됩니다.
        </p>

        {/* Architecture Visual */}
        <div className="my-12 bg-surface border border-border rounded-2xl p-12">
          <div className="text-center text-base text-text-dim mb-10 font-normal">
            products 인덱스가 3개의 노드에 분산된 모습
          </div>
          <div className="max-w-[700px] mx-auto">
            <div className="text-center font-mono text-[0.75rem] text-accent tracking-[2px] mb-6">
              &mdash;&mdash; CLUSTER &mdash;&mdash;
            </div>
            <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {/* Node 1 */}
              <div className="bg-surface-2 border border-border rounded-xl p-6 text-center transition-all duration-400 hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(240,192,64,0.1)]">
                <div className="text-[2rem] mb-3">&#x1F5A5;</div>
                <div className="font-mono text-[0.85rem] font-semibold mb-1">Node 1</div>
                <div className="text-[0.78rem] text-text-dim leading-relaxed">Master 노드</div>
                <div className="flex gap-1.5 justify-center mt-3 flex-wrap">
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-es-blue/15 text-es-blue border border-es-blue/30">P0</span>
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-es-green/10 text-es-green border border-es-green/20">R1</span>
                </div>
              </div>

              {/* Node 2 */}
              <div className="bg-surface-2 border border-border rounded-xl p-6 text-center transition-all duration-400 hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(240,192,64,0.1)]">
                <div className="text-[2rem] mb-3">&#x1F5A5;</div>
                <div className="font-mono text-[0.85rem] font-semibold mb-1">Node 2</div>
                <div className="text-[0.78rem] text-text-dim leading-relaxed">Data 노드</div>
                <div className="flex gap-1.5 justify-center mt-3 flex-wrap">
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-es-blue/15 text-es-blue border border-es-blue/30">P1</span>
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-es-green/10 text-es-green border border-es-green/20">R2</span>
                </div>
              </div>

              {/* Node 3 */}
              <div className="bg-surface-2 border border-border rounded-xl p-6 text-center transition-all duration-400 hover:border-accent hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(240,192,64,0.1)]">
                <div className="text-[2rem] mb-3">&#x1F5A5;</div>
                <div className="font-mono text-[0.85rem] font-semibold mb-1">Node 3</div>
                <div className="text-[0.78rem] text-text-dim leading-relaxed">Data 노드</div>
                <div className="flex gap-1.5 justify-center mt-3 flex-wrap">
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-es-blue/15 text-es-blue border border-es-blue/30">P2</span>
                  <span className="font-mono text-[0.65rem] px-2 py-0.5 rounded bg-es-green/10 text-es-green border border-es-green/20">R0</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-8 mt-6 text-[0.8rem] text-text-dim">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-es-blue/50" /> Primary Shard
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm bg-es-green/40" /> Replica Shard
              </span>
            </div>
          </div>
        </div>

        <p className="text-text-dim text-[1.05rem] mb-6">
          지금 우리의 학습 환경은 <strong className="text-text font-medium">단일 노드(Single Node)</strong>입니다.
          클러스터 구성은 나중에 심화 단계에서 다뤄볼 거예요. 지금은 &ldquo;아, 여러 서버에 데이터를 나눠 저장하는구나&rdquo; 정도만 이해하면 됩니다.
        </p>
      </Section>
    </>
  );
}


import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

export default function Chapter05() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: Analyzer 파이프라인 ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>분석기(Analyzer)란?<br />— 텍스트를 토큰으로 바꾸는 파이프라인</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          Elasticsearch가 텍스트를 검색 가능하게 만드는 비밀은 <strong className="text-text">분석기(Analyzer)</strong>에 있습니다. 문서를 인덱싱할 때, 텍스트 필드는 분석기를 거쳐 <span className="text-accent font-medium">토큰(Token)</span>으로 쪼개지고, 이 토큰들이 역색인(Inverted Index)에 저장됩니다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          분석기는 항상 <strong className="text-text">3단계 파이프라인</strong>으로 구성됩니다. 각 단계가 텍스트를 어떻게 변환하는지 살펴봅시다.
        </p>

        {/* 파이프라인 다이어그램 */}
        <div className="my-12">
          {/* 원본 텍스트 */}
          <div className="text-center mb-6">
            <span className="font-mono text-xs text-text-dim tracking-wider">원본 텍스트</span>
            <div className="mt-2 inline-block bg-surface border border-border rounded-xl px-8 py-4">
              <span className="font-mono text-lg text-text">&quot;삼성 갤럭시북 프로&quot;</span>
            </div>
          </div>

          {/* 화살표 */}
          <div className="text-center text-text-dim text-2xl my-3">&#x25BC;</div>

          {/* Step 1: Character Filter */}
          <div className="bg-es-purple/5 border border-es-purple/20 rounded-2xl p-6 mb-4 max-w-[700px] mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold bg-es-purple/15 text-es-purple w-7 h-7 rounded-full flex items-center justify-center shrink-0">1</span>
              <span className="font-mono text-sm font-semibold text-es-purple">Character Filter</span>
              <span className="text-xs text-text-dim ml-auto">문자 단위 변환</span>
            </div>
            <p className="text-sm text-text-dim mb-3">토큰화 <strong className="text-text">전에</strong> 원본 문자열을 변환합니다. HTML 태그 제거, 특수문자 치환 등.</p>
            <div className="bg-surface-2 rounded-lg px-4 py-3 font-mono text-sm">
              <span className="text-text-dim">&quot;삼성 갤럭시북 프로&quot;</span> <span className="text-es-purple mx-2">&rarr;</span> <span className="text-text">&quot;삼성 갤럭시북 프로&quot;</span>
              <span className="text-text-dim text-xs ml-2">(변환 없음)</span>
            </div>
          </div>

          {/* 화살표 */}
          <div className="text-center text-text-dim text-2xl my-3">&#x25BC;</div>

          {/* Step 2: Tokenizer */}
          <div className="bg-es-blue/5 border border-es-blue/20 rounded-2xl p-6 mb-4 max-w-[700px] mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold bg-es-blue/15 text-es-blue w-7 h-7 rounded-full flex items-center justify-center shrink-0">2</span>
              <span className="font-mono text-sm font-semibold text-es-blue">Tokenizer</span>
              <span className="text-xs text-text-dim ml-auto">텍스트를 토큰으로 분리</span>
            </div>
            <p className="text-sm text-text-dim mb-3">텍스트를 <strong className="text-text">토큰(Token)</strong>으로 쪼갭니다. 분석기당 <strong className="text-text">정확히 1개</strong>만 지정합니다.</p>
            <div className="bg-surface-2 rounded-lg px-4 py-3 font-mono text-sm">
              <span className="text-text-dim">&quot;삼성 갤럭시북 프로&quot;</span> <span className="text-es-blue mx-2">&rarr;</span>
              <span className="inline-flex gap-2 flex-wrap">
                <span className="bg-es-blue/10 text-es-blue border border-es-blue/20 px-2 py-0.5 rounded">삼성</span>
                <span className="bg-es-blue/10 text-es-blue border border-es-blue/20 px-2 py-0.5 rounded">갤럭시북</span>
                <span className="bg-es-blue/10 text-es-blue border border-es-blue/20 px-2 py-0.5 rounded">프로</span>
              </span>
            </div>
          </div>

          {/* 화살표 */}
          <div className="text-center text-text-dim text-2xl my-3">&#x25BC;</div>

          {/* Step 3: Token Filter */}
          <div className="bg-es-green/5 border border-es-green/20 rounded-2xl p-6 mb-4 max-w-[700px] mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-xs font-bold bg-es-green/15 text-es-green w-7 h-7 rounded-full flex items-center justify-center shrink-0">3</span>
              <span className="font-mono text-sm font-semibold text-es-green">Token Filter</span>
              <span className="text-xs text-text-dim ml-auto">토큰을 가공/필터링</span>
            </div>
            <p className="text-sm text-text-dim mb-3">각 토큰을 <strong className="text-text">변환, 추가, 삭제</strong>합니다. 소문자 변환, 불용어 제거, 동의어 추가 등. <strong className="text-text">여러 개</strong>를 체인으로 연결할 수 있습니다.</p>
            <div className="bg-surface-2 rounded-lg px-4 py-3 font-mono text-sm">
              <span className="inline-flex gap-2 flex-wrap">
                <span className="bg-es-blue/10 text-es-blue border border-es-blue/20 px-2 py-0.5 rounded">삼성</span>
                <span className="bg-es-blue/10 text-es-blue border border-es-blue/20 px-2 py-0.5 rounded">갤럭시북</span>
                <span className="bg-es-blue/10 text-es-blue border border-es-blue/20 px-2 py-0.5 rounded">프로</span>
              </span>
              <span className="text-es-green mx-2">&rarr;</span>
              <span className="inline-flex gap-2 flex-wrap">
                <span className="bg-es-green/10 text-es-green border border-es-green/20 px-2 py-0.5 rounded">삼성</span>
                <span className="bg-es-green/10 text-es-green border border-es-green/20 px-2 py-0.5 rounded">갤럭시북</span>
                <span className="bg-es-green/10 text-es-green border border-es-green/20 px-2 py-0.5 rounded">프로</span>
              </span>
            </div>
          </div>

          {/* 화살표 */}
          <div className="text-center text-text-dim text-2xl my-3">&#x25BC;</div>

          {/* 결과: 역색인 */}
          <div className="text-center">
            <span className="font-mono text-xs text-text-dim tracking-wider">역색인(Inverted Index)에 저장</span>
            <div className="mt-2 inline-flex gap-3">
              <span className="bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-lg font-mono text-sm font-medium">삼성</span>
              <span className="bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-lg font-mono text-sm font-medium">갤럭시북</span>
              <span className="bg-accent/10 text-accent border border-accent/20 px-4 py-2 rounded-lg font-mono text-sm font-medium">프로</span>
            </div>
          </div>
        </div>

        {/* 3단계 요약 카드 */}
        <div className="grid grid-cols-3 gap-4 my-10 max-md:grid-cols-1">
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-purple">
            <div className="font-mono text-sm font-semibold text-es-purple mb-2">Character Filter</div>
            <p className="text-sm text-text-dim mb-3">토큰화 전 <strong className="text-text">문자열 전처리</strong></p>
            <div className="flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">html_strip</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">mapping</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">pattern_replace</span>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-blue">
            <div className="font-mono text-sm font-semibold text-es-blue mb-2">Tokenizer</div>
            <p className="text-sm text-text-dim mb-3">텍스트를 <strong className="text-text">토큰으로 분리</strong></p>
            <div className="flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">standard</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">whitespace</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">nori_tokenizer</span>
            </div>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-green">
            <div className="font-mono text-sm font-semibold text-es-green mb-2">Token Filter</div>
            <p className="text-sm text-text-dim mb-3">토큰을 <strong className="text-text">가공/필터링</strong></p>
            <div className="flex gap-2 flex-wrap">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">lowercase</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">stop</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">synonym</span>
            </div>
          </div>
        </div>

        <ExplainCallout title="핵심 포인트">
          <ul>
            <li><strong>Character Filter</strong>는 0개 이상 지정할 수 있습니다 (선택)</li>
            <li><strong>Tokenizer</strong>는 반드시 <strong>1개</strong>만 지정합니다 (필수)</li>
            <li><strong>Token Filter</strong>는 0개 이상 지정할 수 있습니다 (선택, 순서 중요!)</li>
            <li>검색할 때도 동일한 분석기가 검색어에 적용됩니다. 인덱싱 시점과 검색 시점의 분석기가 다르면 검색이 안 될 수 있어요!</li>
          </ul>
        </ExplainCallout>

        <QaBox question="분석기는 언제 동작하나요?">
          <p>분석기는 <strong>두 가지 시점</strong>에 동작합니다:</p>
          <ul className="list-disc pl-5 text-sm text-text-dim my-2">
            <li><strong>인덱싱 시점 (Index Time)</strong> — 문서를 저장할 때 text 필드의 값을 분석하여 역색인에 토큰을 저장</li>
            <li><strong>검색 시점 (Search Time)</strong> — match 쿼리 등에서 검색어를 분석하여 역색인과 비교</li>
          </ul>
          <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">keyword</code> 타입 필드는 분석기를 거치지 않고 원본 그대로 저장됩니다. 그래서 집계(aggregation)에서는 keyword 필드를 사용하는 거예요.</p>
        </QaBox>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: _analyze API로 분석기 비교 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: _analyze API로<br />분석기 비교하기</SectionTitle>

        <LabBanner icon="&#x1F50D;" title="사전 조건">
          Elasticsearch와 Kibana가 실행 중이어야 합니다. 이번 실습은 인덱스 없이 _analyze API만 사용합니다.
        </LabBanner>

        {/* Step 1: standard analyzer */}
        <LabStep num={1} title="standard 분석기로 한글/영문 분석" tags={["kibana"]}>
          <p>Elasticsearch의 <strong>기본 분석기</strong>인 standard analyzer가 텍스트를 어떻게 쪼개는지 확인합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 한글 분석" copyText={`GET /_analyze\n{\n  "analyzer": "standard",\n  "text": "삼성 갤럭시북 프로 16인치"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;standard&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성 갤럭시북 프로 16인치&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"tokens": [
    { "token": `}<Hl>&quot;삼성&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;갤럭시북&quot;</Hl>{`, "position": 1 },
    { "token": `}<Hl>&quot;프로&quot;</Hl>{`, "position": 2 },
    { "token": `}<Hl>&quot;16인치&quot;</Hl>{`, "position": 3 }
]`}
          </ExpectedOutput>

          <p>이번에는 <strong>영문</strong>으로 해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 영문 분석" copyText={`GET /_analyze\n{\n  "analyzer": "standard",\n  "text": "Samsung Galaxy Book Pro"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;standard&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;Samsung Galaxy Book Pro&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"tokens": [
    { "token": `}<Hl>&quot;samsung&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;galaxy&quot;</Hl>{`, "position": 1 },
    { "token": `}<Hl>&quot;book&quot;</Hl>{`, "position": 2 },
    { "token": `}<Hl>&quot;pro&quot;</Hl>{`, "position": 3 }
]`}
          </ExpectedOutput>

          <ExplainCallout title="standard 분석기의 특징">
            <ul>
              <li>공백과 구두점을 기준으로 토큰을 분리합니다</li>
              <li>영문은 <strong>소문자로 변환</strong>합니다 (Samsung &rarr; samsung)</li>
              <li>한글은 <strong>공백 기준으로만</strong> 쪼개고, 형태소 분석은 하지 않습니다</li>
              <li>&quot;갤럭시북&quot;이 하나의 토큰으로 남아있어요. &quot;갤럭시&quot;로 검색하면 매칭되지 않습니다!</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>한글은 공백 기준으로, 영문은 공백 기준 + 소문자 변환되어 토큰이 나오면 성공!</Checkpoint>
        </LabStep>

        {/* Step 2: whitespace vs standard */}
        <LabStep num={2} title="whitespace vs standard 비교" tags={["kibana"]}>
          <p><strong>whitespace</strong> 분석기는 오직 공백만으로 토큰을 나눕니다. standard와 어떻게 다른지 비교해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — whitespace" copyText={`GET /_analyze\n{\n  "analyzer": "whitespace",\n  "text": "Samsung Galaxy-Book Pro, 16-inch"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;whitespace&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;Samsung Galaxy-Book Pro, 16-inch&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`"tokens": [
    { "token": `}<Hl>&quot;Samsung&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;Galaxy-Book&quot;</Hl>{`, "position": 1 },
    { "token": `}<Hl>&quot;Pro,&quot;</Hl>{`, "position": 2 },
    { "token": `}<Hl>&quot;16-inch&quot;</Hl>{`, "position": 3 }
]`}
          </ExpectedOutput>

          <p>같은 텍스트를 <strong>standard</strong>로 분석하면:</p>

          <CmdBlock label="KIBANA DEV TOOLS — standard (비교)" copyText={`GET /_analyze\n{\n  "analyzer": "standard",\n  "text": "Samsung Galaxy-Book Pro, 16-inch"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;standard&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;Samsung Galaxy-Book Pro, 16-inch&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`"tokens": [
    { "token": `}<Hl>&quot;samsung&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;galaxy&quot;</Hl>{`, "position": 1 },
    { "token": `}<Hl>&quot;book&quot;</Hl>{`, "position": 2 },
    { "token": `}<Hl>&quot;pro&quot;</Hl>{`, "position": 3 },
    { "token": `}<Hl>&quot;16&quot;</Hl>{`, "position": 4 },
    { "token": `}<Hl>&quot;inch&quot;</Hl>{`, "position": 5 }
]`}
          </ExpectedOutput>

          <ExplainCallout title="whitespace vs standard 차이점">
            <ul>
              <li><strong>whitespace</strong>: 공백만 기준. 하이픈(-), 콤마(,) 등은 토큰에 포함됨. 대소문자 유지</li>
              <li><strong>standard</strong>: 공백 + 구두점/하이픈 등으로 분리. 소문자 변환 포함</li>
              <li>whitespace의 &quot;Pro,&quot;에는 콤마가 붙어있고, &quot;Galaxy-Book&quot;도 하나의 토큰입니다</li>
              <li>standard는 &quot;Galaxy-Book&quot;을 &quot;galaxy&quot;와 &quot;book&quot; 두 토큰으로 분리합니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>whitespace는 대소문자 유지 + 구두점 포함, standard는 소문자 변환 + 구두점 분리되는 차이를 확인하면 성공!</Checkpoint>
        </LabStep>

        {/* Step 3: keyword analyzer */}
        <LabStep num={3} title="keyword 분석기 — 분석 안 함" tags={["kibana"]}>
          <p><strong>keyword</strong> 분석기는 텍스트를 아예 쪼개지 않고 <strong>전체를 하나의 토큰</strong>으로 유지합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS" copyText={`GET /_analyze\n{\n  "analyzer": "keyword",\n  "text": "삼성 갤럭시북 프로 16인치"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성 갤럭시북 프로 16인치&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT">
            {`"tokens": [
    { "token": `}<Hl>&quot;삼성 갤럭시북 프로 16인치&quot;</Hl>{`, "position": 0 }
]`}
          </ExpectedOutput>

          <ExplainCallout title="keyword 분석기는 언제 쓸까?">
            <ul>
              <li>이메일 주소, URL, 상품 코드 등 <strong>정확히 일치해야 하는 값</strong>에 사용합니다</li>
              <li>매핑에서 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">keyword</code> 타입을 지정하면 내부적으로 이 분석기가 적용된 것과 같은 효과입니다</li>
              <li>집계(aggregation)와 정렬(sort)에는 분석되지 않은 원본 값이 필요하므로 keyword가 적합합니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="text 타입과 keyword 타입의 차이를 다시 정리해주세요">
            <p><strong>text</strong> 타입: 분석기를 거쳐 토큰으로 쪼개집니다. 부분 매칭(match) 검색에 사용합니다. &quot;갤럭시북&quot;만으로도 &quot;삼성 갤럭시북 프로&quot; 문서를 찾을 수 있어요.</p>
            <p><strong>keyword</strong> 타입: 분석 없이 원본 그대로 저장됩니다. 정확히 일치(term) 검색, 집계, 정렬에 사용합니다. &quot;삼성 갤럭시북 프로&quot; 전체가 일치해야 찾을 수 있어요.</p>
            <p>실무에서는 하나의 필드에 <strong>둘 다</strong> 사용하는 경우가 많습니다. 매핑에서 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">multi-fields</code>를 활용하면 됩니다 (예: name은 text, name.keyword는 keyword).</p>
          </QaBox>

          <Checkpoint>전체 텍스트가 하나의 토큰으로 나오면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: Custom Analyzer 만들기 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Custom Analyzer<br />— 나만의 분석기 만들기</SectionTitle>

        <LabBanner icon="&#x1F6E0;" title="이번 파트의 목표">
          내장 분석기가 아닌, 직접 조합한 Custom Analyzer를 만들어 실제 필드에 적용해봅니다.
        </LabBanner>

        {/* Step 4: custom analyzer 생성 */}
        <LabStep num={4} title="자동완성용 ngram 분석기 만들기" tags={["kibana"]}>
          <p><strong>목표:</strong> 사용자가 &quot;갤럭&quot;만 입력해도 &quot;갤럭시북&quot;을 찾을 수 있는 자동완성용 분석기를 만들어봅시다.</p>
          <p>이를 위해 <strong>ngram</strong> Token Filter를 사용합니다. ngram은 텍스트를 지정한 길이의 부분 문자열로 쪼갭니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 인덱스 + 커스텀 분석기 생성" copyText={`PUT /autocomplete_test\n{\n  "settings": {\n    "index.max_ngram_diff": 2,\n    "analysis": {\n      "filter": {\n        "my_ngram": {\n          "type": "ngram",\n          "min_gram": 2,\n          "max_gram": 4\n        }\n      },\n      "analyzer": {\n        "my_autocomplete": {\n          "type": "custom",\n          "tokenizer": "standard",\n          "filter": ["lowercase", "my_ngram"]\n        }\n      }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/autocomplete_test</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;settings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;index.max_ngram_diff&quot;</JKey>: <JVal>2</JVal>,{"\n"}
            {"    "}<JKey>&quot;analysis&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;filter&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;my_ngram&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;ngram&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;min_gram&quot;</JKey>: <JVal>2</JVal>,{"\n"}
            {"          "}<JKey>&quot;max_gram&quot;</JKey>: <JVal>4</JVal>{"\n"}
            {"        }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;analyzer&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;my_autocomplete&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;custom&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;tokenizer&quot;</JKey>: <JStr>&quot;standard&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;filter&quot;</JKey>: [<JStr>&quot;lowercase&quot;</JStr>, <JStr>&quot;my_ngram&quot;</JStr>]{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>인덱스가 생성되었으니, 커스텀 분석기를 테스트해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 분석기 테스트" copyText={`GET /autocomplete_test/_analyze\n{\n  "analyzer": "my_autocomplete",\n  "text": "갤럭시북"\n}`}>
            <Kw>GET</Kw> <Url>/autocomplete_test/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;my_autocomplete&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;갤럭시북&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"tokens": [
    { "token": `}<Hl>&quot;갤럭&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;갤럭시&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;갤럭시북&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;럭시&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;럭시북&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;시북&quot;</Hl>{`, "position": 0 }
]`}
          </ExpectedOutput>

          <ExplainCallout title="ngram이 하는 일">
            <ul>
              <li><strong>min_gram: 2, max_gram: 4</strong> — 2글자부터 4글자까지의 모든 부분 문자열을 생성합니다</li>
              <li>&quot;갤럭시북&quot;(4글자)에서: 갤럭(2), 갤럭시(3), 갤럭시북(4), 럭시(2), 럭시북(3), 시북(2)</li>
              <li><strong>lowercase</strong> 필터가 먼저 적용되고, 그 다음 <strong>ngram</strong> 필터가 적용됩니다 (순서 중요!)</li>
              <li>이렇게 하면 사용자가 &quot;갤럭&quot;, &quot;럭시&quot;, &quot;시북&quot; 등 부분 문자열로도 검색 가능합니다</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="ngram 사용 시 주의">
            <p>ngram은 토큰 수를 <strong>급격히 증가</strong>시킵니다. max_gram을 너무 크게 잡으면 인덱스 크기가 커지고 성능이 저하됩니다. 자동완성 용도라면 max_gram을 3~5 정도로 제한하는 것이 일반적입니다.</p>
          </WarnCallout>

          <Checkpoint>갤럭시북이 여러 부분 문자열 토큰으로 쪼개지면 성공!</Checkpoint>
        </LabStep>

        {/* Step 5: 필드에 적용하고 검색 테스트 */}
        <LabStep num={5} title="커스텀 분석기를 필드에 적용하고 검색" tags={["kibana"]}>
          <p>기존 인덱스를 삭제하고, 매핑까지 포함한 인덱스를 새로 만듭니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 인덱스 삭제 후 재생성" copyText={`DELETE /autocomplete_test\n\nPUT /autocomplete_test\n{\n  "settings": {\n    "index.max_ngram_diff": 2,\n    "analysis": {\n      "filter": {\n        "my_ngram": {\n          "type": "ngram",\n          "min_gram": 2,\n          "max_gram": 4\n        }\n      },\n      "analyzer": {\n        "my_autocomplete": {\n          "type": "custom",\n          "tokenizer": "standard",\n          "filter": ["lowercase", "my_ngram"]\n        }\n      }\n    }\n  },\n  "mappings": {\n    "properties": {\n      "name": {\n        "type": "text",\n        "analyzer": "my_autocomplete",\n        "search_analyzer": "standard"\n      }\n    }\n  }\n}`}>
            <Kw>DELETE</Kw> <Url>/autocomplete_test</Url>{"\n"}
            {"\n"}
            <Kw>PUT</Kw> <Url>/autocomplete_test</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;settings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;index.max_ngram_diff&quot;</JKey>: <JVal>2</JVal>,{"\n"}
            {"    "}<JKey>&quot;analysis&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;filter&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;my_ngram&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;ngram&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;min_gram&quot;</JKey>: <JVal>2</JVal>,{"\n"}
            {"          "}<JKey>&quot;max_gram&quot;</JKey>: <JVal>4</JVal>{"\n"}
            {"        }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;analyzer&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;my_autocomplete&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;custom&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;tokenizer&quot;</JKey>: <JStr>&quot;standard&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;filter&quot;</JKey>: [<JStr>&quot;lowercase&quot;</JStr>, <JStr>&quot;my_ngram&quot;</JStr>]{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;my_autocomplete&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;search_analyzer&quot;</JKey>: <JStr>&quot;standard&quot;</JStr>{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="analyzer vs search_analyzer">
            <ul>
              <li><strong>analyzer</strong> — 인덱싱할 때 사용하는 분석기. 여기서는 ngram으로 부분 문자열 토큰 생성</li>
              <li><strong>search_analyzer</strong> — 검색할 때 사용하는 분석기. standard로 검색어를 그대로 사용</li>
              <li>이렇게 분리하는 이유: 검색어에도 ngram을 적용하면 &quot;갤럭&quot;이 &quot;갤럭&quot;뿐 아니라 예상치 못한 토큰과 매칭될 수 있습니다</li>
            </ul>
          </ExplainCallout>

          <p>데이터를 넣고 검색해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 데이터 입력" copyText={`POST /autocomplete_test/_bulk\n{"index":{}}\n{"name":"삼성 갤럭시북 프로"}\n{"index":{}}\n{"name":"LG 그램 프로"}\n{"index":{}}\n{"name":"애플 맥북 프로"}`}>
            <Kw>POST</Kw> <Url>/autocomplete_test/_bulk</Url>{"\n"}
            {"{\"index\":{}}"}{"\n"}
            {"{\"name\":\"삼성 갤럭시북 프로\"}"}{"\n"}
            {"{\"index\":{}}"}{"\n"}
            {"{\"name\":\"LG 그램 프로\"}"}{"\n"}
            {"{\"index\":{}}"}{"\n"}
            {"{\"name\":\"애플 맥북 프로\"}"}
          </CmdBlock>

          <CmdBlock label="KIBANA DEV TOOLS — 부분 문자열 검색" copyText={`GET /autocomplete_test/_search\n{\n  "query": {\n    "match": {\n      "name": "갤럭"\n    }\n  }\n}`}>
            <Kw>GET</Kw> <Url>/autocomplete_test/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;갤럭&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": [
    {
        "_source": { "name": `}<Hl>&quot;삼성 갤럭시북 프로&quot;</Hl>{` }
    }
]`}
          </ExpectedOutput>

          <p>&quot;갤럭&quot; 두 글자만으로 &quot;갤럭시북&quot;을 찾았습니다! 기본 standard 분석기로는 불가능한 검색이었죠.</p>

          <Checkpoint>&quot;갤럭&quot;으로 검색해서 &quot;삼성 갤럭시북 프로&quot;가 나오면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: nori 옵션 튜닝 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Nori 분석기 튜닝<br />— 한국어 검색의 핵심</SectionTitle>

        <LabBanner icon="&#x1F1F0;&#x1F1F7;" title="사전 조건">
          nori 플러그인이 설치되어 있어야 합니다. Docker 환경이라면 Dockerfile에 analysis-nori 플러그인 설치가 필요합니다.
        </LabBanner>

        {/* Step 6: decompound_mode 비교 */}
        <LabStep num={6} title="decompound_mode — 복합어 분해 옵션 비교" tags={["kibana"]}>
          <p>nori_tokenizer는 한국어 형태소 분석기입니다. 핵심 옵션인 <strong>decompound_mode</strong>는 복합어를 어떻게 처리할지 결정합니다.</p>

          <p><strong>none</strong> — 복합어를 분해하지 않습니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — none" copyText={`GET /_analyze\n{\n  "tokenizer": {\n    "type": "nori_tokenizer",\n    "decompound_mode": "none"\n  },\n  "text": "삼성전자가 갤럭시북을 출시했다"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;tokenizer&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;decompound_mode&quot;</JKey>: <JStr>&quot;none&quot;</JStr>{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성전자가 갤럭시북을 출시했다&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"tokens": [
    { "token": `}<Hl>&quot;삼성전자&quot;</Hl>{`, "position": 0 },
    { "token": "가", "position": 1 },
    { "token": `}<Hl>&quot;갤럭시북&quot;</Hl>{`, "position": 2 },
    { "token": "을", "position": 3 },
    { "token": "출시", "position": 4 },
    { "token": "했", "position": 5 },
    { "token": "다", "position": 6 }
]`}
          </ExpectedOutput>

          <p><strong>discard</strong> — 복합어를 분해하고, 원본은 버립니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — discard" copyText={`GET /_analyze\n{\n  "tokenizer": {\n    "type": "nori_tokenizer",\n    "decompound_mode": "discard"\n  },\n  "text": "삼성전자가 갤럭시북을 출시했다"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;tokenizer&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;decompound_mode&quot;</JKey>: <JStr>&quot;discard&quot;</JStr>{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성전자가 갤럭시북을 출시했다&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"tokens": [
    { "token": `}<Hl>&quot;삼성&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;전자&quot;</Hl>{`, "position": 1 },
    { "token": "가", "position": 2 },
    { "token": `}<Hl>&quot;갤럭시&quot;</Hl>{`, "position": 3 },
    { "token": `}<Hl>&quot;북&quot;</Hl>{`, "position": 4 },
    { "token": "을", "position": 5 },
    { "token": "출시", "position": 6 },
    { "token": "했", "position": 7 },
    { "token": "다", "position": 8 }
]`}
          </ExpectedOutput>

          <p><strong>mixed</strong> — 복합어를 분해하면서, 원본도 유지합니다. (기본값)</p>

          <CmdBlock label="KIBANA DEV TOOLS — mixed" copyText={`GET /_analyze\n{\n  "tokenizer": {\n    "type": "nori_tokenizer",\n    "decompound_mode": "mixed"\n  },\n  "text": "삼성전자가 갤럭시북을 출시했다"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;tokenizer&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;decompound_mode&quot;</JKey>: <JStr>&quot;mixed&quot;</JStr>{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성전자가 갤럭시북을 출시했다&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"tokens": [
    { "token": `}<Hl>&quot;삼성전자&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;삼성&quot;</Hl>{`, "position": 0 },
    { "token": `}<Hl>&quot;전자&quot;</Hl>{`, "position": 1 },
    { "token": "가", "position": 2 },
    { "token": `}<Hl>&quot;갤럭시북&quot;</Hl>{`, "position": 3 },
    { "token": `}<Hl>&quot;갤럭시&quot;</Hl>{`, "position": 3 },
    { "token": `}<Hl>&quot;북&quot;</Hl>{`, "position": 4 },
    { "token": "을", "position": 5 },
    { "token": "출시", "position": 6 },
    { "token": "했", "position": 7 },
    { "token": "다", "position": 8 }
]`}
          </ExpectedOutput>

          {/* 비교 테이블 */}
          <div className="my-8 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-mono text-es-blue font-medium">모드</th>
                  <th className="text-left py-3 px-4 font-mono text-es-blue font-medium">&quot;삼성전자&quot; 결과</th>
                  <th className="text-left py-3 px-4 font-mono text-es-blue font-medium">설명</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-es-purple">none</td>
                  <td className="py-3 px-4 font-mono text-text-dim">삼성전자</td>
                  <td className="py-3 px-4 text-text-dim">분해하지 않음. &quot;삼성&quot;으로 검색 불가</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4 font-mono text-es-purple">discard</td>
                  <td className="py-3 px-4 font-mono text-text-dim">삼성 + 전자</td>
                  <td className="py-3 px-4 text-text-dim">분해 후 원본 삭제. &quot;삼성전자&quot;로 검색 불가</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-es-purple">mixed</td>
                  <td className="py-3 px-4 font-mono text-accent">삼성전자 + 삼성 + 전자</td>
                  <td className="py-3 px-4 text-text-dim">분해 + 원본 유지. 둘 다 검색 가능 (권장)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ExplainCallout title="어떤 모드를 선택해야 할까?">
            <ul>
              <li><strong>mixed (권장)</strong> — &quot;삼성&quot;으로도, &quot;삼성전자&quot;로도 검색 가능. 인덱스 크기가 다소 커지지만 검색 품질이 가장 좋습니다</li>
              <li><strong>discard</strong> — 인덱스 크기를 줄이고 싶을 때. 단, 원본 복합어로 검색이 안 될 수 있습니다</li>
              <li><strong>none</strong> — 복합어 분해가 필요 없는 경우. 브랜드명 등 고유명사 전용 필드에 적합</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>세 가지 모드에서 &quot;삼성전자&quot;의 토큰 결과가 다르게 나오면 성공!</Checkpoint>
        </LabStep>

        {/* Step 7: nori_part_of_speech */}
        <LabStep num={7} title="nori_part_of_speech — 조사와 접속사 제거" tags={["kibana"]}>
          <p>형태소 분석 후 <strong>&quot;가&quot;, &quot;을&quot;, &quot;다&quot;</strong> 같은 조사와 어미가 토큰에 포함됩니다. 이런 토큰은 검색에 불필요하므로 <strong>nori_part_of_speech</strong> Token Filter로 제거합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 조사 제거 전 (nori만 사용)" copyText={`GET /_analyze\n{\n  "tokenizer": "nori_tokenizer",\n  "text": "삼성전자가 새로운 노트북을 출시했다"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;tokenizer&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성전자가 새로운 노트북을 출시했다&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT — 조사 포함">
            {`"tokens": [
    { "token": "삼성전자", ... },
    { "token": "삼성", ... },
    { "token": "전자", ... },
    { "token": `}<Hl>&quot;가&quot;</Hl>{`, ... },
    { "token": "새롭", ... },
    { "token": `}<Hl>&quot;ᆫ&quot;</Hl>{`, ... },
    { "token": "노트북", ... },
    { "token": `}<Hl>&quot;을&quot;</Hl>{`, ... },
    { "token": "출시", ... },
    { "token": `}<Hl>&quot;했&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;다&quot;</Hl>{`, ... }
]`}
          </ExpectedOutput>

          <p>이제 <strong>nori_part_of_speech</strong>를 적용해서 조사, 어미 등을 제거해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 조사 제거 후" copyText={`GET /_analyze\n{\n  "tokenizer": "nori_tokenizer",\n  "filter": [\n    {\n      "type": "nori_part_of_speech",\n      "stoptags": [\n        "E", "IC", "J", "MAG", "MAJ",\n        "MM", "SP", "SSC", "SSO", "SC",\n        "SE", "XPN", "XSA", "XSN", "XSV",\n        "UNA", "NA", "VSV", "VCP", "VCN",\n        "VX"\n      ]\n    }\n  ],\n  "text": "삼성전자가 새로운 노트북을 출시했다"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;tokenizer&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;filter&quot;</JKey>: [{"\n"}
            {"    {"}{"\n"}
            {"      "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;nori_part_of_speech&quot;</JStr>,{"\n"}
            {"      "}<JKey>&quot;stoptags&quot;</JKey>: [{"\n"}
            {"        "}<JStr>&quot;E&quot;</JStr>, <JStr>&quot;IC&quot;</JStr>, <JStr>&quot;J&quot;</JStr>, <JStr>&quot;MAG&quot;</JStr>, <JStr>&quot;MAJ&quot;</JStr>,{"\n"}
            {"        "}<JStr>&quot;MM&quot;</JStr>, <JStr>&quot;SP&quot;</JStr>, <JStr>&quot;SSC&quot;</JStr>, <JStr>&quot;SSO&quot;</JStr>, <JStr>&quot;SC&quot;</JStr>,{"\n"}
            {"        "}<JStr>&quot;SE&quot;</JStr>, <JStr>&quot;XPN&quot;</JStr>, <JStr>&quot;XSA&quot;</JStr>, <JStr>&quot;XSN&quot;</JStr>, <JStr>&quot;XSV&quot;</JStr>,{"\n"}
            {"        "}<JStr>&quot;UNA&quot;</JStr>, <JStr>&quot;NA&quot;</JStr>, <JStr>&quot;VSV&quot;</JStr>, <JStr>&quot;VCP&quot;</JStr>, <JStr>&quot;VCN&quot;</JStr>,{"\n"}
            {"        "}<JStr>&quot;VX&quot;</JStr>{"\n"}
            {"      ]"}{"\n"}
            {"    }"}{"\n"}
            {"  ]"},{"\n"}{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성전자가 새로운 노트북을 출시했다&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT — 조사 제거됨">
            {`"tokens": [
    { "token": `}<Hl>&quot;삼성전자&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;삼성&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;전자&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;새롭&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;노트북&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;출시&quot;</Hl>{`, ... }
]`}
          </ExpectedOutput>

          <ExplainCallout title="stoptags 주요 태그 설명">
            <ul>
              <li><strong>J</strong> — 조사 (이/가, 은/는, 을/를, 에서 등)</li>
              <li><strong>E</strong> — 어미 (-다, -ㄴ, -았, -겠 등)</li>
              <li><strong>IC</strong> — 감탄사</li>
              <li><strong>MAG</strong> — 일반 부사</li>
              <li><strong>XSA, XSN, XSV</strong> — 접미사</li>
              <li><strong>VX</strong> — 보조 용언</li>
              <li>이 태그들은 <strong>한국어 품사 태그셋(세종 태그셋)</strong>을 기반으로 합니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="stoptags를 어떻게 커스터마이징 하나요?">
            <p>실무에서는 서비스 특성에 맞게 stoptags를 조정합니다. 예를 들어:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li>일반 검색 서비스: 조사(J) + 어미(E) + 감탄사(IC) 정도만 제거</li>
              <li>키워드 추출: 명사만 남기고 나머지 대부분 제거</li>
              <li>자연어 처리: 부사(MAG)는 남겨두는 경우도 있음</li>
            </ul>
            <p>처음에는 위 예시의 기본 stoptags를 사용하고, <strong>실제 검색 품질을 테스트하면서</strong> 조정하는 것을 권장합니다.</p>
          </QaBox>

          <Checkpoint>&quot;가&quot;, &quot;을&quot;, &quot;다&quot; 등 조사/어미가 사라지고 의미 있는 토큰만 남으면 성공!</Checkpoint>
        </LabStep>

        {/* Step 8: user_dictionary */}
        <LabStep num={8} title="사용자 정의 사전 (user_dictionary)" tags={["kibana"]}>
          <p>nori의 기본 사전에 없는 신조어, 브랜드명, 전문 용어는 <strong>사용자 정의 사전</strong>으로 등록할 수 있습니다.</p>

          <p>먼저 기본 사전으로 분석했을 때의 문제를 확인해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 기본 사전으로 분석" copyText={`GET /_analyze\n{\n  "tokenizer": "nori_tokenizer",\n  "text": "카카오페이로 결제하세요"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;tokenizer&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;카카오페이로 결제하세요&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT — 기본 사전">
            {`"tokens": [
    { "token": `}<Hl>&quot;카카오&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;페이&quot;</Hl>{`, ... },
    { "token": "로", ... },
    { "token": "결제", ... },
    { "token": "하", ... },
    { "token": "세요", ... }
]`}
          </ExpectedOutput>

          <p>&quot;카카오페이&quot;가 &quot;카카오&quot;와 &quot;페이&quot;로 분리되었습니다. 의도와 다르죠. 사용자 정의 사전으로 해결합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 사용자 사전 적용" copyText={`PUT /custom_dict_test\n{\n  "settings": {\n    "analysis": {\n      "tokenizer": {\n        "my_nori": {\n          "type": "nori_tokenizer",\n          "decompound_mode": "mixed",\n          "user_dictionary_rules": [\n            "카카오페이",\n            "삼성페이",\n            "네이버페이"\n          ]\n        }\n      },\n      "analyzer": {\n        "my_korean": {\n          "type": "custom",\n          "tokenizer": "my_nori",\n          "filter": ["nori_part_of_speech"]\n        }\n      }\n    }\n  }\n}`}>
            <Kw>PUT</Kw> <Url>/custom_dict_test</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;settings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;analysis&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;tokenizer&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;my_nori&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;decompound_mode&quot;</JKey>: <JStr>&quot;mixed&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;user_dictionary_rules&quot;</JKey>: [{"\n"}
            {"            "}<JStr>&quot;카카오페이&quot;</JStr>,{"\n"}
            {"            "}<JStr>&quot;삼성페이&quot;</JStr>,{"\n"}
            {"            "}<JStr>&quot;네이버페이&quot;</JStr>{"\n"}
            {"          ]"}{"\n"}
            {"        }"}{"\n"}
            {"      }"},{"\n"}
            {"      "}<JKey>&quot;analyzer&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;my_korean&quot;</JKey>: {"{"}{"\n"}
            {"          "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;custom&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;tokenizer&quot;</JKey>: <JStr>&quot;my_nori&quot;</JStr>,{"\n"}
            {"          "}<JKey>&quot;filter&quot;</JKey>: [<JStr>&quot;nori_part_of_speech&quot;</JStr>]{"\n"}
            {"        }"}{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <CmdBlock label="KIBANA DEV TOOLS — 테스트" copyText={`GET /custom_dict_test/_analyze\n{\n  "analyzer": "my_korean",\n  "text": "카카오페이로 결제하세요"\n}`}>
            <Kw>GET</Kw> <Url>/custom_dict_test/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;my_korean&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;카카오페이로 결제하세요&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT — 사용자 사전 적용 후">
            {`"tokens": [
    { "token": `}<Hl>&quot;카카오페이&quot;</Hl>{`, ... },
    { "token": `}<Hl>&quot;결제&quot;</Hl>{`, ... }
]`}
          </ExpectedOutput>

          <ExplainCallout title="사용자 정의 사전 옵션">
            <ul>
              <li><strong>user_dictionary_rules</strong> — 인덱스 설정에 직접 단어 목록을 넣는 방식 (위 예시)</li>
              <li><strong>user_dictionary</strong> — 외부 파일 경로를 지정하는 방식. 단어가 많을 때 사용합니다</li>
              <li>외부 파일은 Elasticsearch의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">config</code> 디렉토리에 위치해야 합니다</li>
              <li>사전 변경 후에는 인덱스를 <strong>close &rarr; open</strong>하거나 <strong>재생성</strong>해야 적용됩니다</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="사전 관리 팁">
            <p>실무에서 사용자 사전은 <strong>지속적으로 관리</strong>해야 합니다. 신제품명, 유행어, 브랜드명 등이 계속 추가되기 때문이죠. 사전 파일을 별도 저장소(Git)로 관리하고, CI/CD 파이프라인에서 자동으로 배포하는 방식을 권장합니다.</p>
          </WarnCallout>

          <QaBox question="user_dictionary_rules에 형태소 분해 규칙도 지정할 수 있나요?">
            <p>네! 단어만 등록하면 하나의 토큰으로 처리되지만, <strong>공백으로 분해 규칙</strong>을 지정할 수도 있습니다.</p>
            <p>예를 들어:</p>
            <ul className="list-disc pl-5 text-sm text-text-dim my-2">
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;카카오페이&quot;</code> — 하나의 토큰으로 유지</li>
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;카카오페이 카카오 페이&quot;</code> — &quot;카카오페이&quot;를 &quot;카카오&quot; + &quot;페이&quot;로 분해하되, 원본도 유지 (mixed 모드일 때)</li>
            </ul>
            <p>서비스 특성에 맞게 선택하세요. 보통은 단어를 통째로 등록하여 하나의 토큰으로 유지하는 것이 간단하고 예측 가능합니다.</p>
          </QaBox>

          <Checkpoint>&quot;카카오페이&quot;가 분리되지 않고 하나의 토큰으로 나오면 성공!</Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

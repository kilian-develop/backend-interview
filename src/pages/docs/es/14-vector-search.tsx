
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal, Cm } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

/* ─── Inline visuals ─── */

function KeywordLimitVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">키워드 검색의 한계</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1">같은 의미, 다른 단어 — 키워드로는 찾을 수 없다</div>
      <div className="grid grid-cols-3 gap-5 max-w-[750px] mx-auto mt-8 max-md:grid-cols-1">
        <div className="rounded-xl p-5 text-center bg-es-red/[0.06] border border-es-red/20">
          <div className="font-mono text-[0.9rem] mb-2 text-es-red">검색어</div>
          <p className="text-[0.88rem] text-text font-medium !mb-1">&quot;왕&quot;</p>
          <p className="text-[0.78rem] text-text-dim !mb-0">사용자가 입력</p>
        </div>
        <div className="rounded-xl p-5 text-center bg-es-green/[0.08] border border-es-green/20">
          <div className="font-mono text-[0.9rem] mb-2 text-es-green">키워드 매칭</div>
          <p className="text-[0.88rem] text-text font-medium !mb-1">&quot;왕&quot; 포함 문서</p>
          <p className="text-[0.78rem] text-text-dim !mb-0">정확히 일치하는 것만</p>
        </div>
        <div className="rounded-xl p-5 text-center bg-es-orange/[0.06] border border-es-orange/20">
          <div className="font-mono text-[0.9rem] mb-2 text-es-orange">놓치는 문서</div>
          <p className="text-[0.88rem] text-text font-medium !mb-1">&quot;임금&quot;, &quot;군주&quot;, &quot;국왕&quot;</p>
          <p className="text-[0.78rem] text-text-dim !mb-0">의미는 같지만 누락</p>
        </div>
      </div>
    </div>
  );
}

function EmbeddingVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">임베딩 벡터 — 텍스트를 숫자 배열로</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1">의미가 비슷한 단어는 벡터 공간에서 가까이 위치한다</div>
      <div className="grid grid-cols-2 gap-6 max-w-[700px] mx-auto mt-8 max-md:grid-cols-1">
        <div className="rounded-xl p-6 bg-es-blue/[0.06] border border-es-blue/20">
          <div className="font-mono text-sm text-es-blue mb-3">텍스트 → 벡터</div>
          <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg px-4 py-3 text-text-dim leading-relaxed">
            <span className="text-es-green">&quot;왕&quot;</span> → [0.91, 0.12, 0.85]<br />
            <span className="text-es-green">&quot;임금&quot;</span> → [0.89, 0.15, 0.82]<br />
            <span className="text-es-cyan">&quot;여왕&quot;</span> → [0.85, 0.62, 0.80]<br />
            <span className="text-es-orange">&quot;자동차&quot;</span> → [0.05, 0.11, 0.03]
          </div>
        </div>
        <div className="rounded-xl p-6 bg-es-purple/[0.06] border border-es-purple/20">
          <div className="font-mono text-sm text-es-purple mb-3">코사인 유사도</div>
          <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg px-4 py-3 text-text-dim leading-relaxed">
            왕 ↔ 임금: <span className="text-es-green font-semibold">0.98</span> (매우 유사)<br />
            왕 ↔ 여왕: <span className="text-es-cyan font-semibold">0.91</span> (유사)<br />
            왕 ↔ 자동차: <span className="text-es-red font-semibold">0.12</span> (무관)
          </div>
          <p className="text-[0.78rem] text-text-dim mt-3 !mb-0">1에 가까울수록 의미가 비슷</p>
        </div>
      </div>
    </div>
  );
}

function KnnComparisonVisual() {
  return (
    <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
      <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-green group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-es-cyan" />
        <h3 className="font-mono text-lg mb-3 text-es-green">Exact kNN</h3>
        <p className="text-[0.9rem] text-text-dim mb-3"><strong className="text-text font-medium">정확한 최근접 이웃 검색</strong></p>
        <p className="text-[0.9rem] text-text-dim mb-3">모든 벡터와 하나하나 비교합니다. 결과는 정확하지만 문서 수가 많을수록 느려집니다.</p>
        <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg px-4 py-3 mt-3 text-text-dim leading-relaxed">
          100만 문서 → 100만 번 계산<br />
          정확도: <span className="text-es-green">100%</span><br />
          속도: <span className="text-es-red">느림</span>
        </div>
        <p className="mt-4 text-[0.82rem] text-text-dim !mb-0">script_score 쿼리로 사용</p>
      </div>

      <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-blue group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-purple" />
        <h3 className="font-mono text-lg mb-3 text-es-blue">Approximate kNN (ANN)</h3>
        <p className="text-[0.9rem] text-text-dim mb-3"><strong className="text-text font-medium">근사 최근접 이웃 검색</strong></p>
        <p className="text-[0.9rem] text-text-dim mb-3">HNSW 그래프를 따라 가까운 후보군만 탐색합니다. 약간의 정확도를 희생하지만 훨씬 빠릅니다.</p>
        <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg px-4 py-3 mt-3 text-text-dim leading-relaxed">
          100만 문서 → 수천 번만 계산<br />
          정확도: <span className="text-es-cyan">~95%+</span><br />
          속도: <span className="text-es-green">매우 빠름</span>
        </div>
        <p className="mt-4 text-[0.82rem] text-text-dim !mb-0">knn 쿼리로 사용 (ES 8.x+)</p>
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">실무 벡터 검색 아키텍처</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1">인덱싱 파이프라인과 검색 파이프라인</div>

      {/* Indexing pipeline */}
      <div className="mt-8 mb-6">
        <div className="font-mono text-sm font-semibold text-es-green mb-4 text-center">인덱싱 파이프라인</div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="rounded-lg px-4 py-2 bg-es-green/[0.08] border border-es-green/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">원본 텍스트</div>
            <div className="text-text-dim text-[0.75rem]">&quot;무선 블루투스 이어폰&quot;</div>
          </div>
          <span className="text-text-dim text-lg">→</span>
          <div className="rounded-lg px-4 py-2 bg-es-blue/[0.06] border border-es-blue/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">임베딩 모델</div>
            <div className="text-text-dim text-[0.75rem]">OpenAI / BERT</div>
          </div>
          <span className="text-text-dim text-lg">→</span>
          <div className="rounded-lg px-4 py-2 bg-es-purple/[0.06] border border-es-purple/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">벡터 생성</div>
            <div className="text-text-dim text-[0.75rem]">[0.12, 0.85, ...]</div>
          </div>
          <span className="text-text-dim text-lg">→</span>
          <div className="rounded-lg px-4 py-2 bg-es-orange/[0.06] border border-es-orange/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">ES 저장</div>
            <div className="text-text-dim text-[0.75rem]">dense_vector 필드</div>
          </div>
        </div>
      </div>

      {/* Search pipeline */}
      <div className="mt-6">
        <div className="font-mono text-sm font-semibold text-es-cyan mb-4 text-center">검색 파이프라인</div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <div className="rounded-lg px-4 py-2 bg-es-cyan/[0.06] border border-es-cyan/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">검색 쿼리</div>
            <div className="text-text-dim text-[0.75rem]">&quot;에어팟 비슷한 제품&quot;</div>
          </div>
          <span className="text-text-dim text-lg">→</span>
          <div className="rounded-lg px-4 py-2 bg-es-blue/[0.06] border border-es-blue/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">임베딩 모델</div>
            <div className="text-text-dim text-[0.75rem]">동일한 모델 사용</div>
          </div>
          <span className="text-text-dim text-lg">→</span>
          <div className="rounded-lg px-4 py-2 bg-es-purple/[0.06] border border-es-purple/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">쿼리 벡터</div>
            <div className="text-text-dim text-[0.75rem]">[0.15, 0.80, ...]</div>
          </div>
          <span className="text-text-dim text-lg">→</span>
          <div className="rounded-lg px-4 py-2 bg-es-orange/[0.06] border border-es-orange/20 text-[0.82rem] text-text text-center">
            <div className="font-medium">kNN 검색</div>
            <div className="text-text-dim text-[0.75rem]">유사 벡터 탐색</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main chapter content ─── */

export default function Chapter14() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: 벡터 검색이란? ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>
          벡터 검색이란?<br />— 키워드를 넘어 의미를 찾다
        </SectionTitle>

        <p className="text-text-dim text-[1.05rem] mb-6">
          지금까지 배운 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">match</code> 쿼리는 <strong className="text-text font-medium">키워드 기반 검색</strong>입니다. 검색어와 문서에 동일한 단어가 있어야 매칭됩니다. 하지만 사람의 언어는 같은 의미를 다른 단어로 표현하는 경우가 많습니다.
        </p>

        <KeywordLimitVisual />

        <p className="text-text-dim text-[1.05rem] mb-6">
          <strong className="text-text font-medium">벡터 검색(Vector Search)</strong>은 텍스트를 <strong className="text-text font-medium">임베딩 벡터(숫자 배열)</strong>로 변환한 뒤, 벡터 간의 <strong className="text-text font-medium">거리(유사도)</strong>를 계산하여 의미적으로 비슷한 문서를 찾습니다. &quot;왕&quot;을 검색하면 &quot;임금&quot;, &quot;군주&quot;도 찾을 수 있는 거예요.
        </p>

        <EmbeddingVisual />

        <ExplainCallout title="핵심 개념 정리">
          <ul>
            <li><strong>임베딩(Embedding)</strong>: 텍스트, 이미지 등을 고정 길이의 숫자 배열로 변환하는 것</li>
            <li><strong>벡터(Vector)</strong>: 변환된 숫자 배열. 예: [0.91, 0.12, 0.85] (실제로는 수백~수천 차원)</li>
            <li><strong>코사인 유사도(Cosine Similarity)</strong>: 두 벡터가 같은 방향을 가리키는 정도. 1이면 동일, 0이면 무관</li>
            <li><strong>kNN (k-Nearest Neighbors)</strong>: 쿼리 벡터와 가장 가까운 k개의 벡터를 찾는 알고리즘</li>
          </ul>
        </ExplainCallout>

        <QaBox question="왜 &quot;왕&quot;과 &quot;임금&quot;이 비슷한 벡터를 갖나요?">
          <p>임베딩 모델은 <strong>대량의 텍스트 데이터</strong>로 학습됩니다. &quot;왕&quot;과 &quot;임금&quot;은 비슷한 문맥에서 등장하므로, 학습 결과 비슷한 벡터를 갖게 됩니다. 마치 &quot;이 두 단어가 비슷한 상황에서 쓰이네?&quot;를 AI가 학습한 결과인 셈이에요.</p>
          <p>반면 &quot;왕&quot;과 &quot;자동차&quot;는 함께 등장하는 문맥이 거의 없으므로, 벡터 공간에서 멀리 떨어져 있습니다.</p>
        </QaBox>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 이론: ES에서의 벡터 검색 ═══════ */}
      <Section>
        <SectionLabel>Part 2 · Theory</SectionLabel>
        <SectionTitle>
          Elasticsearch에서의 벡터 검색<br />— dense_vector와 kNN
        </SectionTitle>

        <p className="text-text-dim text-[1.05rem] mb-6">
          Elasticsearch 8.x부터 벡터 검색을 네이티브로 지원합니다. 핵심 구성요소는 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">dense_vector</code> 필드 타입과 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">knn</code> 쿼리입니다.
        </p>

        <div className="bg-surface border border-border rounded-[14px] p-8 my-10">
          <h3 className="font-mono text-lg mb-4 text-es-blue">dense_vector 필드 타입</h3>
          <p className="text-[0.9rem] text-text-dim mb-4">벡터(숫자 배열)를 저장하기 위한 전용 필드 타입입니다.</p>
          <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg px-4 py-3 text-text-dim leading-relaxed">
            <span className="text-es-blue">&quot;my_vector&quot;</span>: {"{"}<br />
            {"  "}<span className="text-es-blue">&quot;type&quot;</span>: <span className="text-es-green">&quot;dense_vector&quot;</span>,<br />
            {"  "}<span className="text-es-blue">&quot;dims&quot;</span>: <span className="text-accent">3</span>,{"          "}<span className="text-text-dim">// 벡터 차원 수</span><br />
            {"  "}<span className="text-es-blue">&quot;index&quot;</span>: <span className="text-accent">true</span>,{"      "}<span className="text-text-dim">// kNN 인덱스 생성</span><br />
            {"  "}<span className="text-es-blue">&quot;similarity&quot;</span>: <span className="text-es-green">&quot;cosine&quot;</span>{"  "}<span className="text-text-dim">// 유사도 측정 방식</span><br />
            {"}"}
          </div>
        </div>

        <ExplainCallout title="HNSW 알고리즘이란?">
          <ul>
            <li>Elasticsearch는 내부적으로 <strong>HNSW (Hierarchical Navigable Small World)</strong> 알고리즘을 사용합니다.</li>
            <li>모든 벡터를 일일이 비교하지 않고, <strong>그래프 구조</strong>를 만들어 가까운 이웃만 탐색합니다.</li>
            <li>도서관에서 책을 찾을 때 모든 책을 훑는 대신, 분류표를 따라 해당 구역으로 이동하는 것과 비슷합니다.</li>
            <li>인덱싱 시 그래프를 구축하고, 검색 시 그래프를 따라 빠르게 이동합니다.</li>
          </ul>
        </ExplainCallout>

        <KnnComparisonVisual />

        <ExplainCallout title="실무에서는 어떤 걸 쓸까?">
          <ul>
            <li><strong>Approximate kNN (권장)</strong>: 대부분의 실무 환경에서 사용. 수백만~수억 건의 문서에서도 밀리초 내에 검색 가능</li>
            <li><strong>Exact kNN</strong>: 문서 수가 적거나 (수천 건 이하), 100% 정확도가 필요한 경우에만 사용</li>
            <li>ES 8.x의 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">knn</code> 쿼리는 기본적으로 Approximate kNN입니다</li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="벡터 차원(dims)과 성능">
          <p>벡터 차원이 높을수록 더 풍부한 의미를 담을 수 있지만, <strong className="text-text font-medium">인덱스 크기와 검색 비용이 증가</strong>합니다. 실무에서 일반적으로 사용하는 차원은 384~1536입니다. 이번 실습에서는 개념 이해를 위해 3차원으로 진행합니다.</p>
        </WarnCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: dense_vector 매핑과 데이터 준비 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>
          실습: dense_vector 매핑과<br />데이터 준비
        </SectionTitle>

        <LabBanner icon="&#x1F9ED;" title="이번 실습의 목표">
          벡터 검색을 위한 인덱스를 만들고, 미리 계산된 벡터와 함께 상품 데이터를 넣어봅니다.<br />
          실제로는 임베딩 모델이 벡터를 생성하지만, 여기서는 3차원 벡터를 직접 지정하여 개념을 이해합니다.
        </LabBanner>

        {/* Step 1: 인덱스 생성 */}
        <LabStep num={1} title="dense_vector 필드가 포함된 인덱스 생성" tags={["kibana"]}>
          <p>벡터 검색을 위한 <strong className="text-text font-medium">semantic_products</strong> 인덱스를 만듭니다. 상품명, 카테고리와 함께 3차원 벡터 필드를 정의합니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`PUT /semantic_products\n{\n  "mappings": {\n    "properties": {\n      "name": { "type": "text" },\n      "category": { "type": "keyword" },\n      "description": { "type": "text" },\n      "price": { "type": "integer" },\n      "name_vector": {\n        "type": "dense_vector",\n        "dims": 3,\n        "index": true,\n        "similarity": "cosine"\n      }\n    }\n  }\n}`}
          >
            <Kw>PUT</Kw> <Url>/semantic_products</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;mappings&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;properties&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;name&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;category&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;keyword&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;text&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;price&quot;</JKey>: {"{ "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;integer&quot;</JStr>{" },"}{"\n"}
            {"      "}<JKey>&quot;name_vector&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;dense_vector&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;dims&quot;</JKey>: <JVal>3</JVal>,{"\n"}
            {"        "}<JKey>&quot;index&quot;</JKey>: <JVal>true</JVal>,{"\n"}
            {"        "}<JKey>&quot;similarity&quot;</JKey>: <JStr>&quot;cosine&quot;</JStr>{"\n"}
            {"      "}{"}"}{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="매핑 설정 해설">
            <ul>
              <li><strong>&quot;type&quot;: &quot;dense_vector&quot;</strong> — 벡터(숫자 배열)를 저장하는 필드 타입</li>
              <li><strong>&quot;dims&quot;: 3</strong> — 벡터 차원 수. 실습을 위해 3차원으로 설정 (실무에서는 384~1536차원)</li>
              <li><strong>&quot;index&quot;: true</strong> — HNSW 인덱스를 생성하여 Approximate kNN 검색 가능</li>
              <li><strong>&quot;similarity&quot;: &quot;cosine&quot;</strong> — 코사인 유사도로 벡터 간 거리 측정. 가장 널리 사용되는 방식</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">{`"acknowledged": true`}</code>가 나오면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 2: 데이터 삽입 */}
        <LabStep num={2} title="벡터와 함께 상품 데이터 삽입 (Bulk)" tags={["kibana"]}>
          <p>미리 계산된 3차원 벡터와 함께 상품 데이터를 넣습니다. 비슷한 카테고리의 상품은 벡터값도 비슷하게 설정했습니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`POST /_bulk\n{"index": {"_index": "semantic_products", "_id": "1"}}\n{"name": "무선 블루투스 이어폰", "category": "이어폰", "description": "고음질 무선 블루투스 이어폰, 노이즈 캔슬링 지원", "price": 89000, "name_vector": [0.85, 0.20, 0.15]}\n{"index": {"_index": "semantic_products", "_id": "2"}}\n{"name": "노이즈캔슬링 헤드폰", "category": "헤드폰", "description": "프리미엄 오버이어 헤드폰, ANC 탑재", "price": 350000, "name_vector": [0.80, 0.25, 0.18]}\n{"index": {"_index": "semantic_products", "_id": "3"}}\n{"name": "게이밍 노트북", "category": "노트북", "description": "고성능 GPU 탑재 게이밍 전용 노트북", "price": 1890000, "name_vector": [0.10, 0.85, 0.80]}\n{"index": {"_index": "semantic_products", "_id": "4"}}\n{"name": "업무용 울트라북", "category": "노트북", "description": "가볍고 슬림한 업무용 노트북, 긴 배터리", "price": 1590000, "name_vector": [0.12, 0.82, 0.78]}\n{"index": {"_index": "semantic_products", "_id": "5"}}\n{"name": "유선 이어폰", "category": "이어폰", "description": "고해상도 유선 이어폰, MMCX 커넥터", "price": 45000, "name_vector": [0.82, 0.18, 0.12]}\n{"index": {"_index": "semantic_products", "_id": "6"}}\n{"name": "스마트 워치", "category": "웨어러블", "description": "피트니스 트래킹, 심박수 모니터링", "price": 299000, "name_vector": [0.30, 0.40, 0.90]}\n{"index": {"_index": "semantic_products", "_id": "7"}}\n{"name": "피트니스 밴드", "category": "웨어러블", "description": "가벼운 운동 추적 밴드, 수면 분석", "price": 59000, "name_vector": [0.28, 0.38, 0.88]}`}
          >
            <Kw>POST</Kw> <Url>/_bulk</Url>{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{"}<JKey>&quot;_index&quot;</JKey>: <JStr>&quot;semantic_products&quot;</JStr>, <JKey>&quot;_id&quot;</JKey>: <JStr>&quot;1&quot;</JStr>{"}}"}{"\n"}
            {"{"}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;무선 블루투스 이어폰&quot;</JStr>, <JKey>&quot;category&quot;</JKey>: <JStr>&quot;이어폰&quot;</JStr>, <JKey>&quot;description&quot;</JKey>: <JStr>&quot;고음질 무선 블루투스 이어폰, 노이즈 캔슬링 지원&quot;</JStr>, <JKey>&quot;price&quot;</JKey>: <JVal>89000</JVal>, <JKey>&quot;name_vector&quot;</JKey>: [<JVal>0.85</JVal>, <JVal>0.20</JVal>, <JVal>0.15</JVal>]{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{"}<JKey>&quot;_index&quot;</JKey>: <JStr>&quot;semantic_products&quot;</JStr>, <JKey>&quot;_id&quot;</JKey>: <JStr>&quot;2&quot;</JStr>{"}}"}{"\n"}
            {"{"}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;노이즈캔슬링 헤드폰&quot;</JStr>, <JKey>&quot;category&quot;</JKey>: <JStr>&quot;헤드폰&quot;</JStr>, <JKey>&quot;description&quot;</JKey>: <JStr>&quot;프리미엄 오버이어 헤드폰, ANC 탑재&quot;</JStr>, <JKey>&quot;price&quot;</JKey>: <JVal>350000</JVal>, <JKey>&quot;name_vector&quot;</JKey>: [<JVal>0.80</JVal>, <JVal>0.25</JVal>, <JVal>0.18</JVal>]{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{"}<JKey>&quot;_index&quot;</JKey>: <JStr>&quot;semantic_products&quot;</JStr>, <JKey>&quot;_id&quot;</JKey>: <JStr>&quot;3&quot;</JStr>{"}}"}{"\n"}
            {"{"}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;게이밍 노트북&quot;</JStr>, <JKey>&quot;category&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>, <JKey>&quot;description&quot;</JKey>: <JStr>&quot;고성능 GPU 탑재 게이밍 전용 노트북&quot;</JStr>, <JKey>&quot;price&quot;</JKey>: <JVal>1890000</JVal>, <JKey>&quot;name_vector&quot;</JKey>: [<JVal>0.10</JVal>, <JVal>0.85</JVal>, <JVal>0.80</JVal>]{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{"}<JKey>&quot;_index&quot;</JKey>: <JStr>&quot;semantic_products&quot;</JStr>, <JKey>&quot;_id&quot;</JKey>: <JStr>&quot;4&quot;</JStr>{"}}"}{"\n"}
            {"{"}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;업무용 울트라북&quot;</JStr>, <JKey>&quot;category&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>, <JKey>&quot;description&quot;</JKey>: <JStr>&quot;가볍고 슬림한 업무용 노트북, 긴 배터리&quot;</JStr>, <JKey>&quot;price&quot;</JKey>: <JVal>1590000</JVal>, <JKey>&quot;name_vector&quot;</JKey>: [<JVal>0.12</JVal>, <JVal>0.82</JVal>, <JVal>0.78</JVal>]{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{"}<JKey>&quot;_index&quot;</JKey>: <JStr>&quot;semantic_products&quot;</JStr>, <JKey>&quot;_id&quot;</JKey>: <JStr>&quot;5&quot;</JStr>{"}}"}{"\n"}
            {"{"}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;유선 이어폰&quot;</JStr>, <JKey>&quot;category&quot;</JKey>: <JStr>&quot;이어폰&quot;</JStr>, <JKey>&quot;description&quot;</JKey>: <JStr>&quot;고해상도 유선 이어폰, MMCX 커넥터&quot;</JStr>, <JKey>&quot;price&quot;</JKey>: <JVal>45000</JVal>, <JKey>&quot;name_vector&quot;</JKey>: [<JVal>0.82</JVal>, <JVal>0.18</JVal>, <JVal>0.12</JVal>]{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{"}<JKey>&quot;_index&quot;</JKey>: <JStr>&quot;semantic_products&quot;</JStr>, <JKey>&quot;_id&quot;</JKey>: <JStr>&quot;6&quot;</JStr>{"}}"}{"\n"}
            {"{"}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;스마트 워치&quot;</JStr>, <JKey>&quot;category&quot;</JKey>: <JStr>&quot;웨어러블&quot;</JStr>, <JKey>&quot;description&quot;</JKey>: <JStr>&quot;피트니스 트래킹, 심박수 모니터링&quot;</JStr>, <JKey>&quot;price&quot;</JKey>: <JVal>299000</JVal>, <JKey>&quot;name_vector&quot;</JKey>: [<JVal>0.30</JVal>, <JVal>0.40</JVal>, <JVal>0.90</JVal>]{"}"}{"\n"}
            {"{"}<JKey>&quot;index&quot;</JKey>: {"{"}<JKey>&quot;_index&quot;</JKey>: <JStr>&quot;semantic_products&quot;</JStr>, <JKey>&quot;_id&quot;</JKey>: <JStr>&quot;7&quot;</JStr>{"}}"}{"\n"}
            {"{"}<JKey>&quot;name&quot;</JKey>: <JStr>&quot;피트니스 밴드&quot;</JStr>, <JKey>&quot;category&quot;</JKey>: <JStr>&quot;웨어러블&quot;</JStr>, <JKey>&quot;description&quot;</JKey>: <JStr>&quot;가벼운 운동 추적 밴드, 수면 분석&quot;</JStr>, <JKey>&quot;price&quot;</JKey>: <JVal>59000</JVal>, <JKey>&quot;name_vector&quot;</JKey>: [<JVal>0.28</JVal>, <JVal>0.38</JVal>, <JVal>0.88</JVal>]{"}"}
          </CmdBlock>

          <ExplainCallout title="벡터 데이터 설계 의도">
            <ul>
              <li><strong>이어폰/헤드폰</strong> (ID 1, 2, 5): 첫 번째 차원이 높음 → [0.8x, 0.2x, 0.1x]</li>
              <li><strong>노트북</strong> (ID 3, 4): 두 번째, 세 번째 차원이 높음 → [0.1x, 0.8x, 0.8x]</li>
              <li><strong>웨어러블</strong> (ID 6, 7): 세 번째 차원이 높음 → [0.3x, 0.4x, 0.9x]</li>
              <li>같은 카테고리 상품끼리 벡터가 비슷하므로, kNN 검색 시 유사 상품이 함께 나옵니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;errors&quot;: false</code>가 나오면 7개 상품이 모두 정상 삽입된 것입니다!
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: kNN 검색 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>
          실습: kNN 검색<br />— 벡터로 유사 상품 찾기
        </SectionTitle>

        <LabBanner icon="&#x1F50D;" title="이번 파트에서 배울 것">
          kNN 쿼리로 벡터 유사도 기반 검색을 수행하고, 파라미터를 조절하며, 필터와 결합하는 방법을 배웁니다.
        </LabBanner>

        {/* Step 3: 기본 kNN */}
        <LabStep num={3} title="kNN 쿼리로 유사 상품 검색" tags={["kibana"]}>
          <p>&quot;무선 블루투스 이어폰&quot;(ID 1)의 벡터 [0.85, 0.20, 0.15]와 비슷한 상품을 찾아봅시다. 이어폰과 비슷한 벡터를 쿼리 벡터로 사용합니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`POST /semantic_products/_search\n{\n  "knn": {\n    "field": "name_vector",\n    "query_vector": [0.85, 0.20, 0.15],\n    "k": 3,\n    "num_candidates": 7\n  },\n  "_source": ["name", "category", "price"]\n}`}
          >
            <Kw>POST</Kw> <Url>/semantic_products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;knn&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;name_vector&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;query_vector&quot;</JKey>: [<JVal>0.85</JVal>, <JVal>0.20</JVal>, <JVal>0.15</JVal>],{"\n"}
            {"    "}<JKey>&quot;k&quot;</JKey>: <JVal>3</JVal>,{"\n"}
            {"    "}<JKey>&quot;num_candidates&quot;</JKey>: <JVal>7</JVal>{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;category&quot;</JStr>, <JStr>&quot;price&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": [
    {
        "_id": "1",
        "_score": `}<Hl>1.0</Hl>{`,
        "_source": { "name": `}<Hl>"무선 블루투스 이어폰"</Hl>{`, "category": "이어폰", "price": 89000 }
    },
    {
        "_id": "5",
        "_score": `}<Hl>0.9998...</Hl>{`,
        "_source": { "name": `}<Hl>"유선 이어폰"</Hl>{`, "category": "이어폰", "price": 45000 }
    },
    {
        "_id": "2",
        "_score": `}<Hl>0.9993...</Hl>{`,
        "_source": { "name": `}<Hl>"노이즈캔슬링 헤드폰"</Hl>{`, "category": "헤드폰", "price": 350000 }
    }
]`}
          </ExpectedOutput>

          <ExplainCallout title="kNN 쿼리 파라미터 해설">
            <ul>
              <li><strong>&quot;field&quot;</strong>: 벡터가 저장된 필드 이름</li>
              <li><strong>&quot;query_vector&quot;</strong>: 검색할 벡터. 실무에서는 임베딩 모델이 생성한 벡터를 넣습니다</li>
              <li><strong>&quot;k&quot;: 3</strong>: 최종적으로 반환할 가장 가까운 이웃의 수</li>
              <li><strong>&quot;num_candidates&quot;: 7</strong>: 각 샤드에서 탐색할 후보 수. k보다 크거나 같아야 합니다</li>
              <li><strong>_score</strong>: 코사인 유사도 기반 점수. 1에 가까울수록 유사</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            이어폰 → 이어폰 → 헤드폰 순으로 결과가 나오면 성공! 같은 오디오 카테고리끼리 가까운 것을 확인하세요.
          </Checkpoint>
        </LabStep>

        {/* Step 4: num_candidates와 k 조절 */}
        <LabStep num={4} title="num_candidates와 k 파라미터 조절" tags={["kibana"]}>
          <p>k를 5로 늘려서 더 많은 유사 상품을 가져와봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — k=5"
            copyText={`POST /semantic_products/_search\n{\n  "knn": {\n    "field": "name_vector",\n    "query_vector": [0.85, 0.20, 0.15],\n    "k": 5,\n    "num_candidates": 7\n  },\n  "_source": ["name", "category", "price"]\n}`}
          >
            <Kw>POST</Kw> <Url>/semantic_products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;knn&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;name_vector&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;query_vector&quot;</JKey>: [<JVal>0.85</JVal>, <JVal>0.20</JVal>, <JVal>0.15</JVal>],{"\n"}
            {"    "}<JKey>&quot;k&quot;</JKey>: <JVal>5</JVal>,          <Cm>&larr; 3에서 5로 증가</Cm>{"\n"}
            {"    "}<JKey>&quot;num_candidates&quot;</JKey>: <JVal>7</JVal>{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;category&quot;</JStr>, <JStr>&quot;price&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="k와 num_candidates의 관계">
            <ul>
              <li><strong>k</strong>: 최종 반환할 결과 수. 사용자에게 보여줄 개수</li>
              <li><strong>num_candidates</strong>: HNSW 그래프에서 탐색할 후보 수. 이 값이 클수록 정확도는 올라가지만 속도는 느려짐</li>
              <li>일반적인 가이드: <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">num_candidates &gt;= k * 1.5</code> 이상을 권장</li>
              <li>데이터가 적은 이 실습에서는 차이가 크지 않지만, 수백만 건에서는 체감됩니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            k=3일 때보다 더 많은 결과가 나오고, _score가 낮은(덜 유사한) 상품도 포함되면 성공!
          </Checkpoint>
        </LabStep>

        {/* Step 5: 필터 + kNN 결합 */}
        <LabStep num={5} title="필터 + kNN 결합" tags={["kibana"]}>
          <p>벡터 유사도 검색에 <strong className="text-text font-medium">카테고리 필터</strong>를 추가해봅시다. &quot;이어폰 카테고리 내에서 가장 유사한 상품 2개&quot;를 찾습니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`POST /semantic_products/_search\n{\n  "knn": {\n    "field": "name_vector",\n    "query_vector": [0.85, 0.20, 0.15],\n    "k": 2,\n    "num_candidates": 5,\n    "filter": {\n      "term": { "category": "이어폰" }\n    }\n  },\n  "_source": ["name", "category", "price"]\n}`}
          >
            <Kw>POST</Kw> <Url>/semantic_products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;knn&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;name_vector&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;query_vector&quot;</JKey>: [<JVal>0.85</JVal>, <JVal>0.20</JVal>, <JVal>0.15</JVal>],{"\n"}
            {"    "}<JKey>&quot;k&quot;</JKey>: <JVal>2</JVal>,{"\n"}
            {"    "}<JKey>&quot;num_candidates&quot;</JKey>: <JVal>5</JVal>,{"\n"}
            {"    "}<JKey>&quot;filter&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;category&quot;</JKey>: <JStr>&quot;이어폰&quot;</JStr>{" }"}{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;category&quot;</JStr>, <JStr>&quot;price&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": [
    {
        "_id": "1",
        "_source": { "name": `}<Hl>"무선 블루투스 이어폰"</Hl>{`, "category": `}<Hl>"이어폰"</Hl>{` }
    },
    {
        "_id": "5",
        "_source": { "name": `}<Hl>"유선 이어폰"</Hl>{`, "category": `}<Hl>"이어폰"</Hl>{` }
    }
]`}
          </ExpectedOutput>

          <ExplainCallout title="kNN + filter의 동작 방식">
            <ul>
              <li><strong>filter</strong>는 kNN 검색 <strong>전에</strong> 적용됩니다 (Pre-filtering)</li>
              <li>먼저 &quot;이어폰&quot; 카테고리 문서만 걸러낸 뒤, 그 안에서 kNN 검색을 수행합니다</li>
              <li>이 방식으로 &quot;이어폰 중에서 가장 비슷한 것&quot;을 정확하게 찾을 수 있습니다</li>
              <li>헤드폰, 노트북 등 다른 카테고리는 아예 후보에서 제외됩니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            결과에 이어폰 카테고리만 나오면 성공! 헤드폰이나 노트북이 포함되지 않아야 합니다.
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 5 — 실습: Hybrid Search ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 5 · Hands-on Lab</SectionLabel>
        <SectionTitle>
          실습: Hybrid Search<br />— 키워드 + 벡터를 함께
        </SectionTitle>

        <LabBanner icon="&#x1F9E9;" title="하이브리드 검색이란?">
          키워드 검색(match)은 정확한 단어 매칭에 강하고, 벡터 검색(kNN)은 의미 유사성에 강합니다.<br />
          <strong className="text-text font-medium">둘을 합치면 두 장점을 모두 가져갈 수 있습니다.</strong> 이것이 Hybrid Search입니다.
        </LabBanner>

        {/* Step 6: 키워드 + 벡터 동시 사용 */}
        <LabStep num={6} title="키워드 검색(match) + 벡터 검색(knn) 동시 사용" tags={["kibana"]}>
          <p>description에서 &quot;노트북&quot;을 키워드 검색하면서, 동시에 노트북 벡터와 유사한 상품도 함께 찾아봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS"
            copyText={`POST /semantic_products/_search\n{\n  "query": {\n    "match": {\n      "description": "노트북"\n    }\n  },\n  "knn": {\n    "field": "name_vector",\n    "query_vector": [0.11, 0.83, 0.79],\n    "k": 3,\n    "num_candidates": 7\n  },\n  "_source": ["name", "category", "price"]\n}`}
          >
            <Kw>POST</Kw> <Url>/semantic_products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;knn&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;name_vector&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;query_vector&quot;</JKey>: [<JVal>0.11</JVal>, <JVal>0.83</JVal>, <JVal>0.79</JVal>],{"\n"}
            {"    "}<JKey>&quot;k&quot;</JKey>: <JVal>3</JVal>,{"\n"}
            {"    "}<JKey>&quot;num_candidates&quot;</JKey>: <JVal>7</JVal>{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;category&quot;</JStr>, <JStr>&quot;price&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="Hybrid Search의 동작 원리">
            <ul>
              <li><strong>query(match)</strong>와 <strong>knn</strong>이 <strong>각각 독립적으로</strong> 결과를 생성합니다</li>
              <li>두 결과를 합치고, 각 문서의 점수를 <strong>합산</strong>하여 최종 순위를 매깁니다</li>
              <li>키워드로만 찾는 문서, 벡터로만 찾는 문서, 둘 다로 찾는 문서가 모두 결과에 포함될 수 있습니다</li>
              <li>두 방식 모두에서 높은 점수를 받은 문서가 상위에 랭크됩니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            키워드(&quot;노트북&quot;)와 벡터 유사도를 모두 반영한 결과가 나오면 성공! 노트북 카테고리 상품이 상위에 올 것입니다.
          </Checkpoint>
        </LabStep>

        {/* Step 7: boost로 가중치 조절 */}
        <LabStep num={7} title="boost로 키워드/벡터 가중치 조절" tags={["kibana"]}>
          <p>키워드 검색과 벡터 검색의 <strong className="text-text font-medium">중요도를 조절</strong>할 수 있습니다. boost 값을 높이면 해당 검색의 점수 기여도가 올라갑니다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 벡터 가중치 높이기"
            copyText={`POST /semantic_products/_search\n{\n  "query": {\n    "match": {\n      "description": {\n        "query": "노트북",\n        "boost": 1\n      }\n    }\n  },\n  "knn": {\n    "field": "name_vector",\n    "query_vector": [0.11, 0.83, 0.79],\n    "k": 3,\n    "num_candidates": 7,\n    "boost": 5\n  },\n  "_source": ["name", "category", "price"]\n}`}
          >
            <Kw>POST</Kw> <Url>/semantic_products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;query&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;boost&quot;</JKey>: <JVal>1</JVal>          <Cm>&larr; 키워드 가중치: 1 (기본)</Cm>{"\n"}
            {"      "}{"}"}{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;knn&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;name_vector&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;query_vector&quot;</JKey>: [<JVal>0.11</JVal>, <JVal>0.83</JVal>, <JVal>0.79</JVal>],{"\n"}
            {"    "}<JKey>&quot;k&quot;</JKey>: <JVal>3</JVal>,{"\n"}
            {"    "}<JKey>&quot;num_candidates&quot;</JKey>: <JVal>7</JVal>,{"\n"}
            {"    "}<JKey>&quot;boost&quot;</JKey>: <JVal>5</JVal>             <Cm>&larr; 벡터 가중치: 5 (5배 강화)</Cm>{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;category&quot;</JStr>, <JStr>&quot;price&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <p className="mt-6">이번에는 반대로 <strong className="text-text font-medium">키워드 가중치를 높여</strong>봅시다.</p>

          <CmdBlock
            label="KIBANA DEV TOOLS — 키워드 가중치 높이기"
            copyText={`POST /semantic_products/_search\n{\n  "query": {\n    "match": {\n      "description": {\n        "query": "노트북",\n        "boost": 5\n      }\n    }\n  },\n  "knn": {\n    "field": "name_vector",\n    "query_vector": [0.11, 0.83, 0.79],\n    "k": 3,\n    "num_candidates": 7,\n    "boost": 1\n  },\n  "_source": ["name", "category", "price"]\n}`}
          >
            <Kw>POST</Kw> <Url>/semantic_products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;match&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;description&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;query&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;boost&quot;</JKey>: <JVal>5</JVal>          <Cm>&larr; 키워드 가중치: 5 (5배 강화)</Cm>{"\n"}
            {"      "}{"}"}{"\n"}
            {"    "}{"}"}{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;knn&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;name_vector&quot;</JStr>,{"\n"}
            {"    "}<JKey>&quot;query_vector&quot;</JKey>: [<JVal>0.11</JVal>, <JVal>0.83</JVal>, <JVal>0.79</JVal>],{"\n"}
            {"    "}<JKey>&quot;k&quot;</JKey>: <JVal>3</JVal>,{"\n"}
            {"    "}<JKey>&quot;num_candidates&quot;</JKey>: <JVal>7</JVal>,{"\n"}
            {"    "}<JKey>&quot;boost&quot;</JKey>: <JVal>1</JVal>             <Cm>&larr; 벡터 가중치: 1 (기본)</Cm>{"\n"}
            {"  "}{"}"},{"\n"}
            {"  "}<JKey>&quot;_source&quot;</JKey>: [<JStr>&quot;name&quot;</JStr>, <JStr>&quot;category&quot;</JStr>, <JStr>&quot;price&quot;</JStr>]{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="boost 가중치 조절 가이드">
            <ul>
              <li><strong>벡터 boost가 높으면</strong>: &quot;의미적으로 비슷한 상품&quot;이 상위에 랭크 (추천 시스템에 적합)</li>
              <li><strong>키워드 boost가 높으면</strong>: &quot;정확히 키워드가 포함된 상품&quot;이 상위에 랭크 (정보 검색에 적합)</li>
              <li>서비스 특성에 따라 비율을 조절하세요. 정답은 없고, A/B 테스트로 최적값을 찾는 것이 일반적입니다</li>
              <li>기본값은 둘 다 1.0입니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>
            두 쿼리의 _score와 결과 순서가 달라지는 것을 비교해보세요. boost 값에 따라 순위가 바뀌면 성공!
          </Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 6 — 이론: 실무 아키텍처 ═══════ */}
      <Section>
        <SectionLabel>Part 6 · Theory</SectionLabel>
        <SectionTitle>
          실무 아키텍처<br />— 벡터 검색을 서비스에 적용하기
        </SectionTitle>

        <p className="text-text-dim text-[1.05rem] mb-6">
          실습에서는 3차원 벡터를 직접 입력했지만, 실제 서비스에서는 <strong className="text-text font-medium">임베딩 모델</strong>이 자동으로 벡터를 생성합니다. 텍스트를 벡터로 변환하는 전체 파이프라인을 살펴봅시다.
        </p>

        <ArchitectureVisual />

        {/* 임베딩 모델 비교 */}
        <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-blue">
            <div className="font-mono text-sm font-semibold text-es-blue mb-2">API 기반 모델</div>
            <p className="text-sm text-text-dim mb-3"><strong className="text-text">OpenAI, Cohere, Google</strong> 등</p>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">고품질</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">간편</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">비용 발생</span>
            </div>
            <p className="text-[0.82rem] text-text-dim !mb-0">OpenAI text-embedding-3-small (1536차원), Cohere embed-v3 등. API 호출만으로 벡터 생성. 별도 인프라 불필요.</p>
          </div>
          <div className="bg-surface border border-border rounded-[14px] p-6 transition-all hover:-translate-y-1 hover:border-es-purple">
            <div className="font-mono text-sm font-semibold text-es-purple mb-2">자체 호스팅 모델</div>
            <p className="text-sm text-text-dim mb-3"><strong className="text-text">Sentence-BERT, E5, BGE</strong> 등</p>
            <div className="flex gap-2 flex-wrap mb-3">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">무료</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">데이터 보안</span>
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">인프라 필요</span>
            </div>
            <p className="text-[0.82rem] text-text-dim !mb-0">HuggingFace에서 다운받아 자체 서버에서 실행. GPU 서버가 필요하지만 API 비용 없음. 한국어는 KoSentence-BERT 등.</p>
          </div>
        </div>

        <ExplainCallout title="실무 도입 시 핵심 고려사항">
          <ul>
            <li><strong>인덱싱과 검색에 동일한 모델 사용</strong>: 문서와 쿼리가 같은 벡터 공간에 있어야 비교가 의미 있음</li>
            <li><strong>벡터 차원 선택</strong>: 높은 차원 = 더 정확하지만 비용 증가. 384~768차원이 일반적인 균형점</li>
            <li><strong>인덱스 크기</strong>: dense_vector는 일반 필드보다 저장 공간을 많이 차지. 100만 문서 x 768차원 = 약 3GB</li>
            <li><strong>Hybrid Search 권장</strong>: 벡터 검색만 쓰면 정확한 키워드 매칭을 놓칠 수 있음. 키워드 + 벡터 결합이 일반적</li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="벡터 검색의 한계">
          <p>벡터 검색은 만능이 아닙니다. 고유명사(상품명, 브랜드), 정확한 수치(가격, 날짜), 코드값 등은 <strong className="text-text font-medium">키워드 검색이 더 적합</strong>합니다. &quot;삼성 갤럭시 S24&quot;를 찾을 때 벡터 검색은 &quot;아이폰 15&quot;도 비슷하다고 할 수 있습니다. 목적에 맞는 검색 방식을 선택하세요.</p>
        </WarnCallout>

        <QaBox question="실무에서 벡터 검색은 언제 쓰나요?">
          <p>벡터 검색이 특히 효과적인 상황들이 있습니다:</p>
          <ul className="list-disc pl-5 text-sm text-text-dim my-2">
            <li><strong>유사 상품 추천</strong> — &quot;이 상품과 비슷한 상품&quot;을 찾을 때</li>
            <li><strong>자연어 질의응답</strong> — &quot;배터리 오래가는 가벼운 노트북&quot; 같은 자연어 검색</li>
            <li><strong>다국어 검색</strong> — 영어 쿼리로 한국어 문서도 찾을 수 있음 (다국어 모델 사용 시)</li>
            <li><strong>이미지/동영상 검색</strong> — 텍스트로 이미지를 검색하거나, 이미지로 유사 이미지를 찾을 때</li>
            <li><strong>RAG (검색 증강 생성)</strong> — LLM에게 관련 문서를 제공하기 위한 시맨틱 검색</li>
          </ul>
          <p>반대로, 상품 코드 조회, 카테고리 필터링, 가격 범위 검색 등 <strong>정확한 매칭이 필요한 경우</strong>에는 기존 키워드 검색이 더 적합합니다. 많은 실무 시스템이 <strong>Hybrid Search</strong>로 두 방식을 결합합니다.</p>
        </QaBox>
      </Section>
    </>
  );
}

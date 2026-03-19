
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal, Cm } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

/* ─── Inline visuals ─── */

function ELKArchitecture() {
  return (
    <div className="grid grid-cols-4 gap-5 my-10 max-md:grid-cols-2 max-sm:grid-cols-1">
      {/* Beats */}
      <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-cyan group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-cyan to-es-blue" />
        <div className="text-[2rem] mb-3">&#x1F4E1;</div>
        <h3 className="font-mono text-lg mb-2 text-es-cyan">Beats</h3>
        <p className="text-[0.85rem] text-text-dim mb-2"><strong className="text-text font-medium">경량 데이터 수집기</strong></p>
        <p className="text-[0.82rem] text-text-dim mb-0">서버, 컨테이너, 네트워크 등 다양한 소스에서 데이터를 수집하여 전송합니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">Filebeat</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-cyan/10 text-es-cyan border border-es-cyan/20">Metricbeat</span>
        </div>
      </div>

      {/* Logstash */}
      <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-orange group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-orange to-es-red" />
        <div className="text-[2rem] mb-3">&#x2699;&#xFE0F;</div>
        <h3 className="font-mono text-lg mb-2 text-es-orange">Logstash</h3>
        <p className="text-[0.85rem] text-text-dim mb-2"><strong className="text-text font-medium">데이터 변환 파이프라인</strong></p>
        <p className="text-[0.82rem] text-text-dim mb-0">수집된 데이터를 파싱, 변환, 필터링하여 원하는 형태로 가공합니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">Grok</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">Mutate</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-orange/10 text-es-orange border border-es-orange/20">GeoIP</span>
        </div>
      </div>

      {/* Elasticsearch */}
      <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-green group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-accent" />
        <div className="text-[2rem] mb-3">&#x1F50D;</div>
        <h3 className="font-mono text-lg mb-2 text-es-green">Elasticsearch</h3>
        <p className="text-[0.85rem] text-text-dim mb-2"><strong className="text-text font-medium">검색 및 저장 엔진</strong></p>
        <p className="text-[0.82rem] text-text-dim mb-0">가공된 데이터를 인덱싱하고 저장하며, 강력한 검색과 집계 기능을 제공합니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">Index</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">Search</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">Aggs</span>
        </div>
      </div>

      {/* Kibana */}
      <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-purple group">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-purple to-es-blue" />
        <div className="text-[2rem] mb-3">&#x1F4CA;</div>
        <h3 className="font-mono text-lg mb-2 text-es-purple">Kibana</h3>
        <p className="text-[0.85rem] text-text-dim mb-2"><strong className="text-text font-medium">시각화 대시보드</strong></p>
        <p className="text-[0.82rem] text-text-dim mb-0">Elasticsearch에 저장된 데이터를 차트, 그래프, 대시보드로 시각화합니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">Discover</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">Dashboard</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-purple/10 text-es-purple border border-es-purple/20">Lens</span>
        </div>
      </div>
    </div>
  );
}

function PipelineFlow() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">ELK Stack 데이터 흐름</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1">로그가 생성되어 시각화되기까지의 여정</div>
      <div className="flex items-center justify-center gap-3 mt-8 max-md:flex-col">
        <div className="rounded-xl px-5 py-4 text-center bg-es-cyan/[0.08] border border-es-cyan/20 min-w-[120px]">
          <h4 className="font-mono text-[0.85rem] mb-1 text-es-cyan">Beats</h4>
          <p className="text-[0.75rem] text-text-dim !mb-0">로그 파일 수집</p>
        </div>
        <div className="text-text-dim text-xl max-md:rotate-90">&#x2192;</div>
        <div className="rounded-xl px-5 py-4 text-center bg-es-orange/[0.08] border border-es-orange/20 min-w-[120px]">
          <h4 className="font-mono text-[0.85rem] mb-1 text-es-orange">Logstash</h4>
          <p className="text-[0.75rem] text-text-dim !mb-0">파싱 및 변환</p>
        </div>
        <div className="text-text-dim text-xl max-md:rotate-90">&#x2192;</div>
        <div className="rounded-xl px-5 py-4 text-center bg-es-green/[0.08] border border-es-green/20 min-w-[120px]">
          <h4 className="font-mono text-[0.85rem] mb-1 text-es-green">Elasticsearch</h4>
          <p className="text-[0.75rem] text-text-dim !mb-0">인덱싱 및 저장</p>
        </div>
        <div className="text-text-dim text-xl max-md:rotate-90">&#x2192;</div>
        <div className="rounded-xl px-5 py-4 text-center bg-es-purple/[0.08] border border-es-purple/20 min-w-[120px]">
          <h4 className="font-mono text-[0.85rem] mb-1 text-es-purple">Kibana</h4>
          <p className="text-[0.75rem] text-text-dim !mb-0">시각화 및 분석</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main chapter content ─── */

export default function Chapter12() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: ELK Stack 아키텍처 ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>ELK Stack 아키텍처<br />— 로그의 여정을 따라가다</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          서비스를 운영하다 보면 <strong className="text-text">로그</strong>가 쏟아집니다. 애플리케이션 로그, 접속 로그, 에러 로그... 이 로그들을 각 서버에 접속해서 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">tail -f</code>로 보고 있을 수는 없겠죠?
        </p>

        <p className="text-text-dim text-lg mb-6">
          <strong className="text-text">ELK Stack</strong>은 로그를 <span className="text-es-cyan font-medium">수집(Beats)</span>하고, <span className="text-es-orange font-medium">변환(Logstash)</span>하고, <span className="text-es-green font-medium">저장(Elasticsearch)</span>하고, <span className="text-es-purple font-medium">시각화(Kibana)</span>하는 오픈소스 플랫폼입니다. 각 컴포넌트가 파이프라인처럼 연결되어, 수백 대 서버의 로그를 한곳에서 검색하고 분석할 수 있게 해줍니다.
        </p>

        <ELKArchitecture />

        <PipelineFlow />

        <ExplainCallout title="왜 ELK Stack을 쓸까?">
          <ul>
            <li><strong>중앙 집중화</strong> — 수백 대 서버의 로그를 한곳에서 검색. 더 이상 각 서버에 SSH 접속할 필요가 없습니다.</li>
            <li><strong>실시간 모니터링</strong> — 로그가 발생하면 거의 실시간으로 Kibana에서 확인 가능합니다.</li>
            <li><strong>강력한 검색</strong> — Elasticsearch의 전문 검색으로 특정 에러, 사용자 요청 등을 빠르게 찾습니다.</li>
            <li><strong>시각화 및 알림</strong> — 에러율 급증, 응답 시간 증가 등을 대시보드와 알림으로 감지합니다.</li>
          </ul>
        </ExplainCallout>

        <QaBox question="Beats 없이 Logstash로 바로 수집하면 안 되나요?">
          <p>가능합니다. 하지만 <strong>Beats는 경량 에이전트</strong>로 설계되어, 서버 리소스를 거의 소모하지 않으면서 데이터를 수집합니다. Logstash는 필터링과 변환에 더 특화되어 있어 무겁습니다.</p>
          <p>실무에서는 <strong>Beats가 수집 → Logstash가 가공 → Elasticsearch가 저장</strong>하는 구조가 일반적입니다. 간단한 경우에는 Beats에서 직접 Elasticsearch로 보내기도 합니다.</p>
        </QaBox>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: Filebeat로 로그 수집 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Filebeat로 로그 수집<br />— 데이터의 시작점</SectionTitle>

        <LabBanner icon="&#x1F4E1;" title="이번 파트에서 배울 것">
          Filebeat를 Docker Compose로 구성하고, 로그 파일을 수집하여 Elasticsearch로 전송합니다.
        </LabBanner>

        {/* Step 1: docker-compose에 Filebeat 추가 */}
        <LabStep num={1} title="docker-compose에 Filebeat 추가" tags={["terminal"]}>
          <p>기존 docker-compose.yml에 Filebeat 서비스를 추가합니다. Filebeat가 로그 파일을 읽어서 Elasticsearch로 보내는 구조입니다.</p>

          <CmdBlock label="docker-compose.yml (Filebeat 서비스 추가)" copyText={`  filebeat:\n    image: docker.elastic.co/beats/filebeat:8.17.0\n    container_name: filebeat\n    user: root\n    volumes:\n      - ./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro\n      - ./logs:/var/log/app:ro\n    depends_on:\n      - elasticsearch\n    networks:\n      - elastic`}>
            <Cm># docker-compose.yml 에 아래 서비스를 추가하세요</Cm>{"\n"}
            {"\n"}
            {"  "}<JKey>filebeat</JKey>:{"\n"}
            {"    "}<JKey>image</JKey>: <JStr>docker.elastic.co/beats/filebeat:8.17.0</JStr>{"\n"}
            {"    "}<JKey>container_name</JKey>: <JStr>filebeat</JStr>{"\n"}
            {"    "}<JKey>user</JKey>: <JStr>root</JStr>{"\n"}
            {"    "}<JKey>volumes</JKey>:{"\n"}
            {"      "}- <JStr>./filebeat/filebeat.yml:/usr/share/filebeat/filebeat.yml:ro</JStr>{"\n"}
            {"      "}- <JStr>./logs:/var/log/app:ro</JStr>          <Cm>&larr; 호스트의 logs 폴더를 마운트</Cm>{"\n"}
            {"    "}<JKey>depends_on</JKey>:{"\n"}
            {"      "}- <JStr>elasticsearch</JStr>{"\n"}
            {"    "}<JKey>networks</JKey>:{"\n"}
            {"      "}- <JStr>elastic</JStr>
          </CmdBlock>

          <ExplainCallout title="설정 포인트">
            <ul>
              <li><strong>image</strong> — Elastic 공식 Filebeat 이미지를 사용합니다. Elasticsearch 버전과 맞춰주세요.</li>
              <li><strong>user: root</strong> — 로그 파일 읽기 권한을 위해 root로 실행합니다.</li>
              <li><strong>volumes</strong> — filebeat.yml 설정 파일과 수집할 로그 디렉토리를 마운트합니다.</li>
              <li><strong>:ro</strong> — Read-Only. Filebeat는 로그를 읽기만 하면 되므로 읽기 전용으로 마운트합니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>docker-compose.yml에 filebeat 서비스가 추가되었으면 다음 단계로!</Checkpoint>
        </LabStep>

        {/* Step 2: filebeat.yml 설정 */}
        <LabStep num={2} title="filebeat.yml 설정" tags={["terminal"]}>
          <p>Filebeat가 <strong>어떤 파일을 읽고</strong>, <strong>어디로 보낼지</strong> 설정합니다. <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">filebeat/filebeat.yml</code> 파일을 생성하세요.</p>

          <CmdBlock label="TERMINAL — 디렉토리 생성" copyText="mkdir -p filebeat logs">
            <Kw>mkdir</Kw> -p filebeat logs
          </CmdBlock>

          <CmdBlock label="filebeat/filebeat.yml" copyText={`filebeat.inputs:\n  - type: log\n    enabled: true\n    paths:\n      - /var/log/app/*.log\n    fields:\n      service: my-app\n    fields_under_root: true\n\noutput.elasticsearch:\n  hosts: ["http://elasticsearch:9200"]\n  index: "app-logs-%{+yyyy.MM.dd}"\n\nsetup.ilm.enabled: false\nsetup.template.name: app-logs\nsetup.template.pattern: "app-logs-*"`}>
            <JKey>filebeat.inputs</JKey>:{"\n"}
            {"  "}- <JKey>type</JKey>: <JStr>log</JStr>{"\n"}
            {"    "}<JKey>enabled</JKey>: <JVal>true</JVal>{"\n"}
            {"    "}<JKey>paths</JKey>:{"\n"}
            {"      "}- <JStr>/var/log/app/*.log</JStr>          <Cm>&larr; 수집할 로그 파일 경로</Cm>{"\n"}
            {"    "}<JKey>fields</JKey>:{"\n"}
            {"      "}<JKey>service</JKey>: <JStr>my-app</JStr>                <Cm>&larr; 커스텀 필드 추가</Cm>{"\n"}
            {"    "}<JKey>fields_under_root</JKey>: <JVal>true</JVal>{"\n"}
            {"\n"}
            <JKey>output.elasticsearch</JKey>:{"\n"}
            {"  "}<JKey>hosts</JKey>: [<JStr>&quot;http://elasticsearch:9200&quot;</JStr>]{"\n"}
            {"  "}<JKey>index</JKey>: <JStr>&quot;app-logs-%{"{"}+yyyy.MM.dd{"}"}&quot;</JStr>   <Cm>&larr; 날짜별 인덱스 생성</Cm>{"\n"}
            {"\n"}
            <JKey>setup.ilm.enabled</JKey>: <JVal>false</JVal>{"\n"}
            <JKey>setup.template.name</JKey>: <JStr>app-logs</JStr>{"\n"}
            <JKey>setup.template.pattern</JKey>: <JStr>&quot;app-logs-*&quot;</JStr>
          </CmdBlock>

          <ExplainCallout title="설정 하나씩 뜯어보기">
            <ul>
              <li><strong>filebeat.inputs</strong> — 어떤 데이터를 수집할지 정의합니다. type: log는 로그 파일을 한 줄씩 읽습니다.</li>
              <li><strong>paths</strong> — 수집할 파일 경로. 와일드카드(*)를 사용해 여러 파일을 한번에 지정할 수 있습니다.</li>
              <li><strong>fields</strong> — 수집된 로그에 추가 메타데이터를 붙입니다. 어떤 서비스의 로그인지 구분할 때 유용합니다.</li>
              <li><strong>output.elasticsearch</strong> — 수집한 데이터를 Elasticsearch로 전송합니다.</li>
              <li><strong>index</strong> — 날짜별로 인덱스를 나누면 오래된 로그를 쉽게 삭제할 수 있습니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="fields_under_root: true는 뭔가요?">
            <p>기본적으로 커스텀 필드는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">fields.service</code>처럼 중첩 구조로 저장됩니다. <strong>fields_under_root: true</strong>로 설정하면 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">service</code>가 문서의 최상위 필드로 저장되어 검색이 더 간편해집니다.</p>
          </QaBox>

          <Checkpoint>filebeat/filebeat.yml 파일이 생성되었으면 다음 단계로!</Checkpoint>
        </LabStep>

        {/* Step 3: 샘플 로그로 수집 테스트 */}
        <LabStep num={3} title="샘플 로그로 수집 테스트" tags={["terminal", "kibana"]}>
          <p>샘플 로그 파일을 만들고, Filebeat가 이를 수집하는지 확인합니다.</p>

          <CmdBlock label="TERMINAL — 샘플 로그 생성" copyText={`echo '2026-03-16 10:00:01 INFO  [main] Application started successfully' >> logs/app.log\necho '2026-03-16 10:00:05 WARN  [http-thread-1] Slow query detected: 3200ms' >> logs/app.log\necho '2026-03-16 10:00:12 ERROR [http-thread-3] NullPointerException at UserService.java:42' >> logs/app.log\necho '2026-03-16 10:00:15 INFO  [http-thread-2] GET /api/users 200 45ms' >> logs/app.log\necho '2026-03-16 10:00:20 ERROR [http-thread-1] Connection refused: Database unreachable' >> logs/app.log`}>
            <Cm># 샘플 로그 파일 생성</Cm>{"\n"}
            <Kw>echo</Kw> <JStr>&apos;2026-03-16 10:00:01 INFO  [main] Application started successfully&apos;</JStr> {">> logs/app.log"}{"\n"}
            <Kw>echo</Kw> <JStr>&apos;2026-03-16 10:00:05 WARN  [http-thread-1] Slow query detected: 3200ms&apos;</JStr> {">> logs/app.log"}{"\n"}
            <Kw>echo</Kw> <JStr>&apos;2026-03-16 10:00:12 ERROR [http-thread-3] NullPointerException at UserService.java:42&apos;</JStr> {">> logs/app.log"}{"\n"}
            <Kw>echo</Kw> <JStr>&apos;2026-03-16 10:00:15 INFO  [http-thread-2] GET /api/users 200 45ms&apos;</JStr> {">> logs/app.log"}{"\n"}
            <Kw>echo</Kw> <JStr>&apos;2026-03-16 10:00:20 ERROR [http-thread-1] Connection refused: Database unreachable&apos;</JStr> {">> logs/app.log"}
          </CmdBlock>

          <CmdBlock label="TERMINAL — Filebeat 실행" copyText="docker compose up -d filebeat">
            <Kw>docker compose</Kw> up -d filebeat
          </CmdBlock>

          <p>몇 초 후 Elasticsearch에서 수집된 로그를 확인합니다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — 수집 확인" copyText={`GET /app-logs-*/_search\n{\n  "size": 5,\n  "sort": [{ "@timestamp": "desc" }]\n}`}>
            <Kw>GET</Kw> <Url>/app-logs-*/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;size&quot;</JKey>: <JVal>5</JVal>,{"\n"}
            {"  "}<JKey>&quot;sort&quot;</JKey>: [{"{ "}<JKey>&quot;@timestamp&quot;</JKey>: <JStr>&quot;desc&quot;</JStr>{" }"}]{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="EXPECTED OUTPUT (핵심)">
            {`"hits": {
    "total": { "value": `}<Hl>5</Hl>{` },
    "hits": [
        {
            "_index": `}<Hl>&quot;app-logs-2026.03.16&quot;</Hl>{`,
            "_source": {
                "message": `}<Hl>&quot;2026-03-16 10:00:20 ERROR [http-thread-1] Connection refused...&quot;</Hl>{`,
                "service": "my-app",
                ...
            }
        },
        ...
    ]
}`}
          </ExpectedOutput>

          <ExplainCallout title="확인 포인트">
            <ul>
              <li><strong>_index</strong> — 날짜별 인덱스 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">app-logs-2026.03.16</code>이 자동 생성되었습니다.</li>
              <li><strong>message</strong> — 로그 한 줄이 그대로 message 필드에 저장됩니다.</li>
              <li><strong>service</strong> — filebeat.yml에서 설정한 커스텀 필드가 추가되었습니다.</li>
              <li>아직 로그가 <strong>파싱되지 않은 상태</strong>입니다. 날짜, 레벨, 메시지가 하나의 문자열로 들어와 있죠. 이것을 Logstash로 구조화합니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>app-logs-* 인덱스에서 5건의 로그가 검색되면 성공! message 필드에 로그 내용이 들어있는지 확인하세요.</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: Logstash 파이프라인 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Logstash 파이프라인<br />— 비정형 로그를 구조화하다</SectionTitle>

        <LabBanner icon="&#x2699;&#xFE0F;" title="이번 파트에서 배울 것">
          Logstash의 파이프라인 구조(input, filter, output)를 이해하고, Grok 패턴으로 로그를 파싱합니다.
        </LabBanner>

        {/* Step 4: Logstash 파이프라인 구조 */}
        <LabStep num={4} title="Logstash 파이프라인 구조 이해" tags={["terminal"]}>
          <p>Logstash는 <strong>3단계 파이프라인</strong>으로 동작합니다. 데이터가 들어오면(input), 가공하고(filter), 내보냅니다(output).</p>

          <div className="bg-surface border border-border rounded-2xl p-8 my-6">
            <div className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
              <div className="rounded-xl p-5 text-center bg-es-cyan/[0.08] border border-es-cyan/20">
                <h4 className="font-mono text-[0.9rem] mb-1 text-es-cyan">input</h4>
                <p className="text-[0.82rem] text-text-dim !mb-0">어디서 데이터를 <strong className="text-text font-medium">받을지</strong></p>
                <p className="mt-2 text-[0.72rem] text-text-dim !mb-0">beats, file, kafka, http...</p>
              </div>
              <div className="rounded-xl p-5 text-center bg-es-orange/[0.08] border border-es-orange/20">
                <h4 className="font-mono text-[0.9rem] mb-1 text-es-orange">filter</h4>
                <p className="text-[0.82rem] text-text-dim !mb-0">데이터를 어떻게 <strong className="text-text font-medium">가공할지</strong></p>
                <p className="mt-2 text-[0.72rem] text-text-dim !mb-0">grok, mutate, date, geoip...</p>
              </div>
              <div className="rounded-xl p-5 text-center bg-es-green/[0.08] border border-es-green/20">
                <h4 className="font-mono text-[0.9rem] mb-1 text-es-green">output</h4>
                <p className="text-[0.82rem] text-text-dim !mb-0">결과를 어디로 <strong className="text-text font-medium">보낼지</strong></p>
                <p className="mt-2 text-[0.72rem] text-text-dim !mb-0">elasticsearch, file, stdout...</p>
              </div>
            </div>
          </div>

          <p>먼저 docker-compose.yml에 Logstash 서비스를 추가합니다.</p>

          <CmdBlock label="docker-compose.yml (Logstash 서비스 추가)" copyText={`  logstash:\n    image: docker.elastic.co/logstash/logstash:8.17.0\n    container_name: logstash\n    volumes:\n      - ./logstash/pipeline:/usr/share/logstash/pipeline:ro\n    ports:\n      - "5044:5044"\n    depends_on:\n      - elasticsearch\n    networks:\n      - elastic`}>
            <Cm># docker-compose.yml 에 아래 서비스를 추가하세요</Cm>{"\n"}
            {"\n"}
            {"  "}<JKey>logstash</JKey>:{"\n"}
            {"    "}<JKey>image</JKey>: <JStr>docker.elastic.co/logstash/logstash:8.17.0</JStr>{"\n"}
            {"    "}<JKey>container_name</JKey>: <JStr>logstash</JStr>{"\n"}
            {"    "}<JKey>volumes</JKey>:{"\n"}
            {"      "}- <JStr>./logstash/pipeline:/usr/share/logstash/pipeline:ro</JStr>{"\n"}
            {"    "}<JKey>ports</JKey>:{"\n"}
            {"      "}- <JStr>&quot;5044:5044&quot;</JStr>          <Cm>&larr; Beats가 데이터를 보내는 포트</Cm>{"\n"}
            {"    "}<JKey>depends_on</JKey>:{"\n"}
            {"      "}- <JStr>elasticsearch</JStr>{"\n"}
            {"    "}<JKey>networks</JKey>:{"\n"}
            {"      "}- <JStr>elastic</JStr>
          </CmdBlock>

          <CmdBlock label="TERMINAL — 디렉토리 생성" copyText="mkdir -p logstash/pipeline">
            <Kw>mkdir</Kw> -p logstash/pipeline
          </CmdBlock>

          <ExplainCallout title="Logstash vs Filebeat">
            <ul>
              <li><strong>Filebeat</strong>는 로그를 &quot;읽어서 보내는&quot; 경량 수집기입니다. 변환 기능이 제한적입니다.</li>
              <li><strong>Logstash</strong>는 로그를 &quot;가공하는&quot; 강력한 변환 엔진입니다. 파싱, 필터링, 보강 등 다양한 처리가 가능합니다.</li>
              <li>실무에서는 <strong>Filebeat → Logstash → Elasticsearch</strong> 구조로 많이 사용합니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>logstash/pipeline 디렉토리가 생성되었으면 다음 단계로!</Checkpoint>
        </LabStep>

        {/* Step 5: Grok 패턴으로 Apache 로그 파싱 */}
        <LabStep num={5} title="Grok 패턴으로 Apache 로그 파싱" tags={["terminal"]}>
          <p>Grok은 <strong>비정형 로그를 정규식 패턴으로 파싱</strong>하는 Logstash의 핵심 필터입니다. Apache 액세스 로그를 구조화된 데이터로 변환해봅시다.</p>

          <CmdBlock label="logstash/pipeline/apache.conf" copyText={`input {\n  beats {\n    port => 5044\n  }\n}\n\nfilter {\n  grok {\n    match => {\n      "message" => "%{IPORHOST:client_ip} - - \\[%{HTTPDATE:timestamp}\\] \\"%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:http_version}\\" %{NUMBER:response_code} %{NUMBER:bytes}"\n    }\n  }\n}\n\noutput {\n  elasticsearch {\n    hosts => ["http://elasticsearch:9200"]\n    index => "apache-logs-%{+YYYY.MM.dd}"\n  }\n}`}>
            <JKey>input</JKey> {"{"}{"\n"}
            {"  "}<JKey>beats</JKey> {"{"}{"\n"}
            {"    "}<JKey>port</JKey> ={">"} <JVal>5044</JVal>              <Cm># Filebeat에서 데이터를 받는 포트</Cm>{"\n"}
            {"  }"}{"\n"}
            {"}"}{"\n"}
            {"\n"}
            <JKey>filter</JKey> {"{"}{"\n"}
            {"  "}<JKey>grok</JKey> {"{"}{"\n"}
            {"    "}<JKey>match</JKey> ={">"} {"{"}{"\n"}
            {"      "}<JStr>&quot;message&quot;</JStr> ={">"} <JStr>&quot;%{"{"}IPORHOST:client_ip{"}"} - - \[%{"{"}HTTPDATE:timestamp{"}"}\] \&quot;%{"{"}WORD:method{"}"} %{"{"}URIPATHPARAM:request{"}"} HTTP/%{"{"}NUMBER:http_version{"}"}\&quot; %{"{"}NUMBER:response_code{"}"} %{"{"}NUMBER:bytes{"}"}&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}{"\n"}
            {"\n"}
            <JKey>output</JKey> {"{"}{"\n"}
            {"  "}<JKey>elasticsearch</JKey> {"{"}{"\n"}
            {"    "}<JKey>hosts</JKey> ={">"} [<JStr>&quot;http://elasticsearch:9200&quot;</JStr>]{"\n"}
            {"    "}<JKey>index</JKey> ={">"} <JStr>&quot;apache-logs-%{"{"}+YYYY.MM.dd{"}"}&quot;</JStr>{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="Grok 패턴 뜯어보기">
            <ul>
              <li><strong>%{"{"}IPORHOST:client_ip{"}"}</strong> — IP 주소 또는 호스트명을 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">client_ip</code> 필드로 추출</li>
              <li><strong>%{"{"}HTTPDATE:timestamp{"}"}</strong> — Apache 날짜 형식을 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">timestamp</code>로 추출</li>
              <li><strong>%{"{"}WORD:method{"}"}</strong> — HTTP 메서드(GET, POST 등)를 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">method</code>로 추출</li>
              <li><strong>%{"{"}NUMBER:response_code{"}"}</strong> — 응답 코드(200, 404 등)를 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">response_code</code>로 추출</li>
              <li>Grok은 내부적으로 정규식을 사용합니다. <strong>%{"{"}패턴이름:필드명{"}"}</strong> 형식으로, 미리 정의된 패턴에 이름을 붙여주는 것입니다.</li>
            </ul>
          </ExplainCallout>

          <div className="bg-surface border border-border rounded-[14px] p-6 my-6">
            <h4 className="font-mono text-sm font-semibold text-es-orange mb-3">변환 전/후 비교</h4>
            <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <div>
                <p className="font-mono text-xs text-text-dim mb-2">변환 전 (비정형)</p>
                <div className="font-mono text-[0.78rem] bg-surface-2 rounded-lg p-4 leading-relaxed text-text-dim">
                  192.168.1.1 - - [16/Mar/2026:10:00:01 +0000] &quot;GET /api/users HTTP/1.1&quot; 200 1234
                </div>
              </div>
              <div>
                <p className="font-mono text-xs text-text-dim mb-2">변환 후 (구조화)</p>
                <div className="font-mono text-[0.78rem] bg-surface-2 rounded-lg p-4 leading-relaxed text-text-dim">
                  <span className="text-es-blue">client_ip</span>: <span className="text-es-green">&quot;192.168.1.1&quot;</span><br />
                  <span className="text-es-blue">method</span>: <span className="text-es-green">&quot;GET&quot;</span><br />
                  <span className="text-es-blue">request</span>: <span className="text-es-green">&quot;/api/users&quot;</span><br />
                  <span className="text-es-blue">response_code</span>: <span className="text-es-orange">200</span><br />
                  <span className="text-es-blue">bytes</span>: <span className="text-es-orange">1234</span>
                </div>
              </div>
            </div>
          </div>

          <QaBox question="Grok 패턴을 직접 만들기 어렵지 않나요?">
            <p>Kibana에 <strong>Grok Debugger</strong>가 내장되어 있습니다. Dev Tools 옆의 메뉴에서 찾을 수 있어요. 샘플 로그와 패턴을 입력하면 실시간으로 매칭 결과를 확인할 수 있습니다. 또한 Elasticsearch에서 자주 쓰이는 120개 이상의 <strong>기본 내장 패턴</strong>이 있어서, 대부분의 로그 형식은 조합만으로 처리 가능합니다.</p>
          </QaBox>

          <Checkpoint>apache.conf 파이프라인 파일이 생성되었으면 다음 단계로!</Checkpoint>
        </LabStep>

        {/* Step 6: mutate, date, geoip 필터 활용 */}
        <LabStep num={6} title="mutate, date, geoip 필터 활용" tags={["terminal"]}>
          <p>Grok으로 파싱한 후, 추가 필터로 데이터를 더 풍부하게 가공할 수 있습니다.</p>

          <CmdBlock label="logstash/pipeline/apache.conf (filter 확장)" copyText={`filter {\n  grok {\n    match => {\n      "message" => "%{IPORHOST:client_ip} - - \\[%{HTTPDATE:timestamp}\\] \\"%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:http_version}\\" %{NUMBER:response_code} %{NUMBER:bytes}"\n    }\n  }\n\n  date {\n    match => ["timestamp", "dd/MMM/yyyy:HH:mm:ss Z"]\n    target => "@timestamp"\n    remove_field => ["timestamp"]\n  }\n\n  mutate {\n    convert => {\n      "response_code" => "integer"\n      "bytes" => "integer"\n    }\n    remove_field => ["message", "http_version"]\n  }\n\n  if [client_ip] !~ /^(127|10|192\\.168)/ {\n    geoip {\n      source => "client_ip"\n      target => "geo"\n    }\n  }\n}`}>
            <JKey>filter</JKey> {"{"}{"\n"}
            {"  "}<JKey>grok</JKey> {"{"}{"\n"}
            {"    "}<JKey>match</JKey> ={">"} {"{"}{"\n"}
            {"      "}<JStr>&quot;message&quot;</JStr> ={">"} <JStr>&quot;%{"{"}IPORHOST:client_ip{"}"} - - \[%{"{"}HTTPDATE:timestamp{"}"}\] ...&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"\n"}
            {"  "}<Cm># 1. date 필터 — 로그 타임스탬프를 @timestamp로 변환</Cm>{"\n"}
            {"  "}<JKey>date</JKey> {"{"}{"\n"}
            {"    "}<JKey>match</JKey> ={">"} [<JStr>&quot;timestamp&quot;</JStr>, <JStr>&quot;dd/MMM/yyyy:HH:mm:ss Z&quot;</JStr>]{"\n"}
            {"    "}<JKey>target</JKey> ={">"} <JStr>&quot;@timestamp&quot;</JStr>     <Cm># Kibana 시간 축의 기준 필드</Cm>{"\n"}
            {"    "}<JKey>remove_field</JKey> ={">"} [<JStr>&quot;timestamp&quot;</JStr>]{"\n"}
            {"  }"}{"\n"}
            {"\n"}
            {"  "}<Cm># 2. mutate 필터 — 타입 변환 및 불필요 필드 제거</Cm>{"\n"}
            {"  "}<JKey>mutate</JKey> {"{"}{"\n"}
            {"    "}<JKey>convert</JKey> ={">"} {"{"}{"\n"}
            {"      "}<JStr>&quot;response_code&quot;</JStr> ={">"} <JStr>&quot;integer&quot;</JStr>   <Cm># 문자열 → 숫자</Cm>{"\n"}
            {"      "}<JStr>&quot;bytes&quot;</JStr> ={">"} <JStr>&quot;integer&quot;</JStr>{"\n"}
            {"    }"}{"\n"}
            {"    "}<JKey>remove_field</JKey> ={">"} [<JStr>&quot;message&quot;</JStr>, <JStr>&quot;http_version&quot;</JStr>]{"\n"}
            {"  }"}{"\n"}
            {"\n"}
            {"  "}<Cm># 3. geoip 필터 — IP 주소에서 지리 정보 추출</Cm>{"\n"}
            {"  "}<Kw>if</Kw> [client_ip] !~ <JStr>/^(127|10|192\\.168)/</JStr> {"{"}{"\n"}
            {"    "}<JKey>geoip</JKey> {"{"}{"\n"}
            {"      "}<JKey>source</JKey> ={">"} <JStr>&quot;client_ip&quot;</JStr>{"\n"}
            {"      "}<JKey>target</JKey> ={">"} <JStr>&quot;geo&quot;</JStr>            <Cm># geo.country_name, geo.city_name 등 생성</Cm>{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="각 필터의 역할">
            <ul>
              <li><strong>date</strong> — 로그에 기록된 시간 문자열을 Elasticsearch의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">@timestamp</code>로 변환합니다. 이 필드가 Kibana 시간 축의 기준이 됩니다.</li>
              <li><strong>mutate</strong> — 필드 타입 변환(문자열 → 숫자), 필드 이름 변경, 불필요한 필드 삭제 등 다양한 가공을 합니다.</li>
              <li><strong>geoip</strong> — IP 주소에서 국가, 도시, 좌표 등의 지리 정보를 추출합니다. Kibana의 지도 시각화에 활용할 수 있습니다.</li>
              <li><strong>조건문 (if)</strong> — 사설 IP(127.x, 10.x, 192.168.x)는 GeoIP 조회 대상에서 제외합니다.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="필터 순서가 중요합니다">
            <p>Logstash 필터는 <strong>위에서 아래로 순서대로 실행</strong>됩니다. grok으로 먼저 파싱한 후, date로 시간을 변환하고, mutate로 타입을 바꿔야 합니다. 순서가 뒤바뀌면 필드가 아직 존재하지 않아 에러가 발생할 수 있습니다.</p>
          </WarnCallout>

          <CmdBlock label="TERMINAL — Logstash 실행" copyText="docker compose up -d logstash">
            <Kw>docker compose</Kw> up -d logstash
          </CmdBlock>

          <Checkpoint>Logstash가 정상적으로 실행되고, Filebeat에서 보낸 데이터가 파싱되어 Elasticsearch에 구조화된 필드(client_ip, method, response_code 등)로 저장되면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: Kibana에서 로그 분석 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Kibana에서 로그 분석<br />— 데이터를 눈으로 보다</SectionTitle>

        <LabBanner icon="&#x1F4CA;" title="이번 파트에서 배울 것">
          Kibana에서 Data View를 생성하고, Discover로 로그를 탐색하고, Dashboard에서 시각화합니다.
        </LabBanner>

        {/* Step 7: Data View(Index Pattern) 생성 */}
        <LabStep num={7} title="Data View(Index Pattern) 생성" tags={["browser"]}>
          <p>Kibana에서 로그를 보려면, 먼저 <strong>어떤 인덱스의 데이터를 볼 것인지</strong> 알려줘야 합니다. 이것이 Data View(이전 버전에서는 Index Pattern)입니다.</p>

          <div className="bg-surface border border-border rounded-[14px] p-6 my-6">
            <h4 className="font-mono text-sm font-semibold text-es-purple mb-4">Data View 생성 순서</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p className="text-[0.88rem] text-text-dim !mb-0">Kibana 좌측 메뉴에서 <strong className="text-text font-medium">Stack Management</strong> 클릭</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</div>
                <p className="text-[0.88rem] text-text-dim !mb-0"><strong className="text-text font-medium">Data Views</strong> 메뉴 선택</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</div>
                <p className="text-[0.88rem] text-text-dim !mb-0"><strong className="text-text font-medium">Create data view</strong> 버튼 클릭</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">4</div>
                <div className="text-[0.88rem] text-text-dim !mb-0">
                  <p className="!mb-1">아래 정보를 입력:</p>
                  <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-3 mt-1">
                    <span className="text-es-blue">Name</span>: <span className="text-es-green">Apache Logs</span><br />
                    <span className="text-es-blue">Index pattern</span>: <span className="text-es-green">apache-logs-*</span><br />
                    <span className="text-es-blue">Timestamp field</span>: <span className="text-es-green">@timestamp</span>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">5</div>
                <p className="text-[0.88rem] text-text-dim !mb-0"><strong className="text-text font-medium">Save data view to Kibana</strong> 클릭</p>
              </div>
            </div>
          </div>

          <ExplainCallout title="Data View 이해하기">
            <ul>
              <li><strong>Index pattern: apache-logs-*</strong> — 와일드카드(*)로 날짜별 인덱스를 모두 포함합니다. apache-logs-2026.03.16, apache-logs-2026.03.17 등이 모두 매칭됩니다.</li>
              <li><strong>Timestamp field: @timestamp</strong> — Kibana의 시간 기반 필터링과 시각화의 기준이 되는 필드입니다.</li>
              <li>같은 방식으로 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">app-logs-*</code>에 대한 Data View도 만들어두면 좋습니다.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>Data View 목록에 &quot;Apache Logs&quot;가 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 8: Discover에서 로그 탐색 */}
        <LabStep num={8} title="Discover에서 로그 탐색" tags={["browser"]}>
          <p>Discover는 Kibana의 <strong>로그 탐색 도구</strong>입니다. 실시간으로 로그를 검색하고 필터링할 수 있습니다.</p>

          <div className="bg-surface border border-border rounded-[14px] p-6 my-6">
            <h4 className="font-mono text-sm font-semibold text-es-purple mb-4">Discover 사용법</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p className="text-[0.88rem] text-text-dim !mb-0">좌측 메뉴에서 <strong className="text-text font-medium">Discover</strong> 클릭</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</div>
                <p className="text-[0.88rem] text-text-dim !mb-0">상단에서 Data View를 <strong className="text-text font-medium">Apache Logs</strong>로 변경</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">3</div>
                <p className="text-[0.88rem] text-text-dim !mb-0">우측 상단의 시간 범위를 <strong className="text-text font-medium">Today</strong> 또는 <strong className="text-text font-medium">Last 24 hours</strong>로 설정</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">4</div>
                <p className="text-[0.88rem] text-text-dim !mb-0">검색 바에서 KQL(Kibana Query Language)로 검색해보세요</p>
              </div>
            </div>
          </div>

          <p>Discover의 검색 바에서 다양한 검색을 시도해봅시다.</p>

          <div className="grid grid-cols-2 gap-4 my-6 max-md:grid-cols-1">
            <div className="bg-surface border border-border rounded-[14px] p-5">
              <p className="font-mono text-xs text-es-cyan mb-2">에러 로그만 보기</p>
              <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-3 text-text-dim">
                <span className="text-es-blue">response_code</span> : <span className="text-es-orange">500</span>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-[14px] p-5">
              <p className="font-mono text-xs text-es-cyan mb-2">특정 API 요청 보기</p>
              <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-3 text-text-dim">
                <span className="text-es-blue">request</span> : <span className="text-es-green">&quot;/api/users*&quot;</span>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-[14px] p-5">
              <p className="font-mono text-xs text-es-cyan mb-2">GET 요청 중 4xx 에러</p>
              <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-3 text-text-dim">
                <span className="text-es-blue">method</span> : <span className="text-es-green">&quot;GET&quot;</span> <span className="text-es-purple">and</span> <span className="text-es-blue">response_code</span> {">="} <span className="text-es-orange">400</span>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-[14px] p-5">
              <p className="font-mono text-xs text-es-cyan mb-2">특정 IP에서 온 요청</p>
              <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-3 text-text-dim">
                <span className="text-es-blue">client_ip</span> : <span className="text-es-green">&quot;192.168.1.1&quot;</span>
              </div>
            </div>
          </div>

          <ExplainCallout title="Discover 핵심 기능">
            <ul>
              <li><strong>시간 히스토그램</strong> — 상단에 시간별 로그 건수 그래프가 나옵니다. 로그가 급증하는 시점을 한눈에 파악할 수 있어요.</li>
              <li><strong>필드 목록</strong> — 좌측에 사용 가능한 필드가 나옵니다. 필드를 클릭하면 상위 값 분포를 볼 수 있어요.</li>
              <li><strong>컬럼 추가</strong> — 필드를 테이블 컬럼으로 추가하면, 원하는 필드만 깔끔하게 볼 수 있습니다.</li>
              <li><strong>KQL</strong> — Kibana Query Language로 직관적인 검색이 가능합니다. Elasticsearch 쿼리 DSL보다 훨씬 간단해요.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>Discover에서 로그가 시간순으로 나열되고, KQL로 필터링이 되면 성공!</Checkpoint>
        </LabStep>

        {/* Step 9: Dashboard에서 로그 시각화 */}
        <LabStep num={9} title="Dashboard에서 로그 시각화" tags={["browser"]}>
          <p>이제 수집된 로그를 <strong>대시보드</strong>로 시각화해봅시다. 운영팀이 한눈에 서비스 상태를 파악할 수 있는 대시보드를 만듭니다.</p>

          <div className="bg-surface border border-border rounded-[14px] p-6 my-6">
            <h4 className="font-mono text-sm font-semibold text-es-purple mb-4">Dashboard 생성 순서</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p className="text-[0.88rem] text-text-dim !mb-0">좌측 메뉴에서 <strong className="text-text font-medium">Dashboard</strong> 클릭 → <strong className="text-text font-medium">Create dashboard</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="font-mono text-xs font-semibold bg-es-purple/15 text-es-purple w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">2</div>
                <p className="text-[0.88rem] text-text-dim !mb-0"><strong className="text-text font-medium">Create visualization</strong> 클릭 (Lens 에디터가 열립니다)</p>
              </div>
            </div>
          </div>

          <p>아래 3가지 시각화를 하나씩 만들어 대시보드에 추가합니다.</p>

          {/* 시각화 1: 응답 코드 분포 */}
          <div className="bg-surface border border-border rounded-[14px] p-6 my-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-red/10 text-es-red border border-es-red/20">시각화 1</span>
              <span className="font-semibold text-text">응답 코드별 분포 (Donut Chart)</span>
            </div>
            <div className="space-y-2 text-[0.88rem] text-text-dim">
              <p className="!mb-1">Lens에서 설정:</p>
              <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-4 leading-relaxed">
                <span className="text-es-blue">Chart type</span>: Donut<br />
                <span className="text-es-blue">Slice by</span>: response_code (Top values)<br />
                <span className="text-es-blue">Size</span>: Count of records
              </div>
              <p className="!mb-0 mt-2">200, 404, 500 등의 응답 코드 비율을 한눈에 파악할 수 있습니다.</p>
            </div>
          </div>

          {/* 시각화 2: 시간별 요청 수 */}
          <div className="bg-surface border border-border rounded-[14px] p-6 my-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">시각화 2</span>
              <span className="font-semibold text-text">시간별 요청 수 및 에러율 (Bar Chart)</span>
            </div>
            <div className="space-y-2 text-[0.88rem] text-text-dim">
              <p className="!mb-1">Lens에서 설정:</p>
              <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-4 leading-relaxed">
                <span className="text-es-blue">Chart type</span>: Bar (stacked)<br />
                <span className="text-es-blue">Horizontal axis</span>: @timestamp (Date histogram, 간격: auto)<br />
                <span className="text-es-blue">Vertical axis</span>: Count of records<br />
                <span className="text-es-blue">Break down by</span>: response_code (Top values)
              </div>
              <p className="!mb-0 mt-2">시간대별 트래픽 패턴과 에러 발생 추이를 확인할 수 있습니다.</p>
            </div>
          </div>

          {/* 시각화 3: 평균 응답 크기 */}
          <div className="bg-surface border border-border rounded-[14px] p-6 my-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">시각화 3</span>
              <span className="font-semibold text-text">API 엔드포인트별 트래픽 (Table)</span>
            </div>
            <div className="space-y-2 text-[0.88rem] text-text-dim">
              <p className="!mb-1">Lens에서 설정:</p>
              <div className="font-mono text-[0.82rem] bg-surface-2 rounded-lg p-4 leading-relaxed">
                <span className="text-es-blue">Chart type</span>: Table<br />
                <span className="text-es-blue">Rows</span>: request (Top values, 10개)<br />
                <span className="text-es-blue">Metrics</span>: Count / Average of bytes / Max of bytes
              </div>
              <p className="!mb-0 mt-2">어떤 API가 가장 많이 호출되고, 응답 크기가 큰지 파악할 수 있습니다.</p>
            </div>
          </div>

          <ExplainCallout title="대시보드 활용 팁">
            <ul>
              <li><strong>시간 범위 동기화</strong> — 대시보드 상단의 시간 선택기를 바꾸면, 모든 시각화가 동시에 업데이트됩니다.</li>
              <li><strong>필터 클릭</strong> — 차트에서 특정 값(예: 500 에러)을 클릭하면 전체 대시보드에 필터가 적용됩니다.</li>
              <li><strong>자동 새로고침</strong> — 시간 선택기 옆의 새로고침 버튼에서 간격(예: 10초)을 설정하면 실시간 모니터링이 가능합니다.</li>
              <li><strong>공유</strong> — 대시보드를 팀원과 공유하거나, iframe으로 외부 페이지에 임베드할 수 있습니다.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="실무 대시보드 설계 팁">
            <p>대시보드에 너무 많은 시각화를 넣으면 <strong>로딩이 느려지고 핵심을 놓치기 쉽습니다</strong>. 운영팀에게 정말 필요한 지표가 무엇인지 먼저 정의하고, 핵심 지표 5~7개로 시작하는 것을 권장합니다. <strong>에러율, 응답 시간(P95), 초당 요청 수(RPS)</strong>가 가장 기본적인 모니터링 지표입니다.</p>
          </WarnCallout>

          <QaBox question="Kibana 말고 Grafana를 쓰면 안 되나요?">
            <p><strong>가능합니다.</strong> Grafana도 Elasticsearch를 데이터 소스로 지원합니다. 다만 Kibana는 Elasticsearch와 같은 Elastic 사에서 만들어 <strong>통합도가 가장 높고</strong>, Discover 같은 로그 탐색 기능이 강력합니다. Grafana는 여러 데이터 소스(Prometheus, InfluxDB 등)를 한 대시보드에 모을 수 있다는 장점이 있어요. 팀의 기술 스택에 맞게 선택하면 됩니다.</p>
          </QaBox>

          <Checkpoint>
            대시보드에 응답 코드 분포, 시간별 요청 수, API별 트래픽 시각화가 모두 나오면 성공! 이것이 ELK Stack을 활용한 로그 모니터링의 기본 구조입니다.
          </Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

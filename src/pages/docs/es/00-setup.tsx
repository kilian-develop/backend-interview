
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal, Cm } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";

export default function SetupContent() {
  return (
    <>
      {/* ═══════ 사전 준비 ═══════ */}
      <Section>
        <SectionLabel>Prerequisites</SectionLabel>
        <SectionTitle>시작하기 전에 필요한 것</SectionTitle>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Docker Desktop', desc: '컨테이너로 ES와 Kibana를 실행합니다. Docker가 설치되어 있어야 합니다.', link: 'https://www.docker.com/products/docker-desktop/', linkText: 'Docker Desktop 다운로드', color: '#3b82f6' },
            { title: '터미널', desc: 'macOS Terminal, Windows PowerShell, 또는 Git Bash 등 아무거나 사용 가능합니다.', link: null, linkText: null, color: '#a855f7' },
          ].map((item) => (
            <div key={item.title} style={{ background: '#0e1118', border: '1px solid #1a2234', borderTop: `3px solid ${item.color}`, borderRadius: '14px', padding: '20px 22px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: item.color, marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '10px', lineHeight: 1.7 }}>{item.desc}</p>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', fontWeight: 600, color: item.color, textDecoration: 'none' }}>
                  {item.linkText} &rarr;
                </a>
              )}
            </div>
          ))}
        </div>

        <ExplainCallout title="왜 Docker인가요?">
          <ul>
            <li>Elasticsearch와 Kibana를 <strong>한 줄 명령어</strong>로 설치/실행할 수 있습니다</li>
            <li>버전 관리가 쉽고, 환경을 <strong>깨끗하게 격리</strong>할 수 있습니다</li>
            <li>학습이 끝나면 컨테이너를 삭제하면 되므로 PC에 <strong>찌꺼기가 남지 않습니다</strong></li>
          </ul>
        </ExplainCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ LAB ═══════ */}
      <LabSection>
        <SectionLabel lab>Lab</SectionLabel>
        <SectionTitle>환경 구축 실습</SectionTitle>

        <LabBanner icon="🐳" title="Docker 기반 환경 구축">
          Docker Desktop이 실행 중인 상태에서 시작하세요.<br />
          터미널을 열고 프로젝트 폴더(아무 곳이나 가능)에서 따라하시면 됩니다.
        </LabBanner>

        {/* Step 1: Docker 확인 */}
        <LabStep num={1} title="Docker 설치 확인" tags={["terminal"]}>
          <p>Docker가 제대로 설치되어 있는지 확인합니다.</p>

          <CmdBlock label="TERMINAL" copyText="docker --version">
            docker --version
          </CmdBlock>

          <ExpectedOutput>{`Docker version 27.x.x, build xxxxxxx`}</ExpectedOutput>

          <p>버전 번호가 출력되면 Docker가 정상 설치된 것입니다. Docker Compose도 확인합니다.</p>

          <CmdBlock label="TERMINAL" copyText="docker compose version">
            docker compose version
          </CmdBlock>

          <ExpectedOutput>{`Docker Compose version v2.x.x`}</ExpectedOutput>

          <WarnCallout title="Docker가 없다면?">
            <p><a href="https://www.docker.com/products/docker-desktop/" target="_blank" rel="noopener noreferrer" className="text-accent">Docker Desktop</a>을 설치하세요. macOS, Windows, Linux 모두 지원합니다. 설치 후 Docker Desktop을 실행해야 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">docker</code> 명령어가 동작합니다.</p>
          </WarnCallout>

          <Checkpoint>docker --version과 docker compose version이 모두 출력되면 성공!</Checkpoint>
        </LabStep>

        {/* Step 2: 프로젝트 파일 생성 */}
        <LabStep num={2} title="프로젝트 파일 만들기" tags={["terminal"]}>
          <p>Elasticsearch + Kibana + nori 플러그인을 한 번에 실행할 Docker 설정 파일을 만듭니다.</p>

          <p>먼저, <strong>Dockerfile.es</strong>를 만듭니다. nori(한국어 형태소 분석기) 플러그인이 포함된 커스텀 이미지입니다.</p>

          <CmdBlock label="Dockerfile.es" copyText={`FROM docker.elastic.co/elasticsearch/elasticsearch:8.17.0\nRUN bin/elasticsearch-plugin install analysis-nori`}>
            <Kw>FROM</Kw> docker.elastic.co/elasticsearch/elasticsearch:8.17.0{"\n"}
            <Kw>RUN</Kw> bin/elasticsearch-plugin install analysis-nori
          </CmdBlock>

          <ExplainCallout title="왜 Dockerfile을 따로 만드나요?">
            <ul>
              <li>공식 Elasticsearch 이미지에는 <strong>nori 플러그인이 포함되어 있지 않습니다</strong></li>
              <li>Dockerfile에서 플러그인을 설치한 <strong>커스텀 이미지</strong>를 빌드합니다</li>
              <li>이렇게 하면 컨테이너를 재생성해도 항상 nori가 포함된 상태로 시작합니다</li>
            </ul>
          </ExplainCallout>

          <p>다음으로, <strong>docker-compose.yml</strong>을 만듭니다.</p>

          <CmdBlock label="docker-compose.yml" copyText={`version: '3.8'\n\nservices:\n  elasticsearch:\n    build:\n      context: .\n      dockerfile: Dockerfile.es\n    container_name: es-study\n    environment:\n      - discovery.type=single-node\n      - xpack.security.enabled=false\n      - xpack.security.http.ssl.enabled=false\n      - ES_JAVA_OPTS=-Xms512m -Xmx512m\n    ports:\n      - "9200:9200"\n    volumes:\n      - es-data:/usr/share/elasticsearch/data\n\n  kibana:\n    image: docker.elastic.co/kibana/kibana:8.17.0\n    container_name: kibana-study\n    environment:\n      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200\n    ports:\n      - "5601:5601"\n    depends_on:\n      - elasticsearch\n\nvolumes:\n  es-data:`}>
            <Cm># docker-compose.yml</Cm>{"\n"}
            <JKey>version</JKey>: <JStr>&apos;3.8&apos;</JStr>{"\n"}
            {"\n"}
            <JKey>services</JKey>:{"\n"}
            {"  "}<JKey>elasticsearch</JKey>:{"\n"}
            {"    "}<JKey>build</JKey>:{"\n"}
            {"      "}<JKey>context</JKey>: .{"\n"}
            {"      "}<JKey>dockerfile</JKey>: Dockerfile.es{"\n"}
            {"    "}<JKey>container_name</JKey>: es-study{"\n"}
            {"    "}<JKey>environment</JKey>:{"\n"}
            {"      "}- <JStr>discovery.type=single-node</JStr>{"\n"}
            {"      "}- <JStr>xpack.security.enabled=false</JStr>{"\n"}
            {"      "}- <JStr>xpack.security.http.ssl.enabled=false</JStr>{"\n"}
            {"      "}- <JStr>ES_JAVA_OPTS=-Xms512m -Xmx512m</JStr>{"\n"}
            {"    "}<JKey>ports</JKey>:{"\n"}
            {"      "}- <JStr>&quot;9200:9200&quot;</JStr>{"\n"}
            {"    "}<JKey>volumes</JKey>:{"\n"}
            {"      "}- es-data:/usr/share/elasticsearch/data{"\n"}
            {"\n"}
            {"  "}<JKey>kibana</JKey>:{"\n"}
            {"    "}<JKey>image</JKey>: docker.elastic.co/kibana/kibana:<JVal>8.17.0</JVal>{"\n"}
            {"    "}<JKey>container_name</JKey>: kibana-study{"\n"}
            {"    "}<JKey>environment</JKey>:{"\n"}
            {"      "}- <JStr>ELASTICSEARCH_HOSTS=http://elasticsearch:9200</JStr>{"\n"}
            {"    "}<JKey>ports</JKey>:{"\n"}
            {"      "}- <JStr>&quot;5601:5601&quot;</JStr>{"\n"}
            {"    "}<JKey>depends_on</JKey>:{"\n"}
            {"      "}- elasticsearch{"\n"}
            {"\n"}
            <JKey>volumes</JKey>:{"\n"}
            {"  "}<JKey>es-data</JKey>:
          </CmdBlock>

          <ExplainCallout title="설정 항목 설명">
            <ul>
              <li><strong>discovery.type=single-node</strong> — 학습용 단일 노드 모드. 클러스터 구성 없이 바로 사용</li>
              <li><strong>xpack.security.enabled=false</strong> — 학습 편의를 위해 인증/보안 비활성화</li>
              <li><strong>ES_JAVA_OPTS=-Xms512m -Xmx512m</strong> — JVM 힙 메모리 512MB 할당</li>
              <li><strong>es-data 볼륨</strong> — 컨테이너를 재시작해도 데이터가 유지됩니다</li>
              <li><strong>포트 9200</strong> — Elasticsearch REST API</li>
              <li><strong>포트 5601</strong> — Kibana 웹 UI</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>두 파일(Dockerfile.es, docker-compose.yml)이 같은 폴더에 있으면 준비 완료!</Checkpoint>
        </LabStep>

        {/* Step 3: 실행 */}
        <LabStep num={3} title="Elasticsearch + Kibana 실행" tags={["terminal", "docker"]}>
          <p>두 파일이 있는 폴더에서 아래 명령어를 실행합니다.</p>

          <CmdBlock label="TERMINAL — 컨테이너 빌드 & 실행" copyText="docker compose up -d --build">
            docker compose up -d --build
          </CmdBlock>

          <p>처음 실행 시 이미지를 다운로드하고 nori 플러그인을 설치하므로 <strong>2~5분</strong> 정도 소요됩니다.</p>

          <ExpectedOutput>{`[+] Building 1/1
 ✓ elasticsearch  Built
[+] Running 3/3
 ✓ Network elastic-search_default  Created
 ✓ Container es-study              Started
 ✓ Container kibana-study          Started`}</ExpectedOutput>

          <p>컨테이너 상태를 확인합니다.</p>

          <CmdBlock label="TERMINAL — 상태 확인" copyText="docker compose ps">
            docker compose ps
          </CmdBlock>

          <ExpectedOutput>{`NAME            STATUS         PORTS
es-study        Up (healthy)   0.0.0.0:9200->9200/tcp
kibana-study    Up             0.0.0.0:5601->5601/tcp`}</ExpectedOutput>

          <WarnCallout title="포트 충돌이 발생하면?">
            <p>이미 9200이나 5601 포트를 사용하는 프로세스가 있으면 에러가 납니다. <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">lsof -i :9200</code>으로 확인하고, 해당 프로세스를 종료하거나 docker-compose.yml에서 포트를 변경하세요.</p>
          </WarnCallout>

          <Checkpoint>docker compose ps에서 두 컨테이너가 모두 Up 상태이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 4: ES 동작 확인 */}
        <LabStep num={4} title="Elasticsearch 동작 확인" tags={["terminal"]}>
          <p>Elasticsearch가 정상적으로 응답하는지 확인합니다.</p>

          <CmdBlock label="TERMINAL" copyText="curl -s localhost:9200 | python3 -m json.tool">
            curl -s localhost:9200 | python3 -m json.tool
          </CmdBlock>

          <ExpectedOutput>{`{
    "name": "xxxxxxxx",
    "cluster_name": "docker-cluster",
    "cluster_uuid": "...",
    "version": {
        "number": "8.17.0",
        ...
    },
    "tagline": "You Know, for Search"
}`}</ExpectedOutput>

          <p><Hl>&quot;You Know, for Search&quot;</Hl>가 보이면 Elasticsearch가 정상 동작하는 것입니다!</p>

          <p>nori 플러그인이 설치되었는지도 확인합니다.</p>

          <CmdBlock label="TERMINAL — nori 플러그인 확인" copyText="curl -s localhost:9200/_cat/plugins?v">
            curl -s localhost:9200/_cat/plugins?v
          </CmdBlock>

          <ExpectedOutput>{`name         component      version
xxxxxxxx     analysis-nori  8.17.0`}</ExpectedOutput>

          <Checkpoint>analysis-nori 플러그인이 목록에 보이면 성공!</Checkpoint>
        </LabStep>

        {/* Step 5: Kibana 접속 */}
        <LabStep num={5} title="Kibana 접속 확인" tags={["browser"]}>
          <p>브라우저에서 아래 주소로 접속합니다.</p>

          <CmdBlock label="BROWSER" copyText="http://localhost:5601">
            http://localhost:5601
          </CmdBlock>

          <p>Kibana 메인 화면이 나오면 성공입니다. 처음 로딩에 <strong>30초~1분</strong> 정도 걸릴 수 있습니다.</p>

          <ExplainCallout title="Kibana Dev Tools — 앞으로 자주 쓸 도구">
            <ul>
              <li>좌측 메뉴 → <strong>Management</strong> → <strong>Dev Tools</strong> (또는 상단 검색창에 &quot;Dev Tools&quot; 입력)</li>
              <li>이 콘솔에서 Elasticsearch API를 직접 실행할 수 있습니다</li>
              <li>curl 대신 <strong>Kibana Dev Tools</strong>를 사용하면 자동완성과 응답 포맷팅이 지원되어 훨씬 편합니다</li>
            </ul>
          </ExplainCallout>

          <p>Dev Tools에서 간단한 테스트를 해봅시다.</p>

          <CmdBlock label="KIBANA DEV TOOLS — nori 분석기 테스트" copyText={`GET /_analyze\n{\n  "analyzer": "nori",\n  "text": "삼성 갤럭시북 프로"\n}`}>
            <Kw>GET</Kw> <Url>/_analyze</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analyzer&quot;</JKey>: <JStr>&quot;nori&quot;</JStr>,{"\n"}
            {"  "}<JKey>&quot;text&quot;</JKey>: <JStr>&quot;삼성 갤럭시북 프로&quot;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput>{`{
  "tokens": [
    { "token": "삼성", ... },
    { "token": "갤럭시", ... },
    { "token": "북", ... },
    { "token": "프로", ... }
  ]
}`}</ExpectedOutput>

          <p>한국어 텍스트가 형태소 단위로 분리되면 <strong>nori 분석기가 정상 동작</strong>하는 것입니다!</p>

          <Checkpoint>Kibana Dev Tools에서 nori 분석 결과가 나오면 학습환경 구축 완료!</Checkpoint>
        </LabStep>

        {/* Step 6: 유용한 명령어 */}
        <LabStep num={6} title="자주 쓰는 Docker 명령어" tags={["terminal", "docker"]}>
          <p>학습 중 자주 사용하게 될 명령어들입니다.</p>

          <CmdBlock label="TERMINAL — 컨테이너 중지" copyText="docker compose stop">
            <Cm># 학습 중단 — 컨테이너 중지 (데이터 유지)</Cm>{"\n"}
            docker compose stop
          </CmdBlock>

          <CmdBlock label="TERMINAL — 컨테이너 재시작" copyText="docker compose start">
            <Cm># 학습 재개 — 컨테이너 다시 시작</Cm>{"\n"}
            docker compose start
          </CmdBlock>

          <CmdBlock label="TERMINAL — 컨테이너 삭제 (데이터 유지)" copyText="docker compose down">
            <Cm># 컨테이너 삭제 (볼륨 데이터는 유지)</Cm>{"\n"}
            docker compose down
          </CmdBlock>

          <CmdBlock label="TERMINAL — 완전 초기화" copyText="docker compose down -v">
            <Cm># 컨테이너 + 볼륨 모두 삭제 (데이터 초기화)</Cm>{"\n"}
            docker compose down -v
          </CmdBlock>

          <CmdBlock label="TERMINAL — 로그 확인" copyText="docker compose logs -f elasticsearch">
            <Cm># Elasticsearch 로그 실시간 확인</Cm>{"\n"}
            docker compose logs -f elasticsearch
          </CmdBlock>

          <ExplainCallout title="stop vs down 차이">
            <ul>
              <li><strong>stop</strong> — 컨테이너를 일시 정지합니다. 다시 <code className="font-mono text-[0.88em] bg-surface-2 px-2 py-0.5 rounded border border-border">start</code>하면 바로 재개됩니다</li>
              <li><strong>down</strong> — 컨테이너를 삭제합니다. 하지만 <strong>볼륨(es-data)</strong>은 남아있어서 데이터는 유지됩니다</li>
              <li><strong>down -v</strong> — 볼륨까지 삭제합니다. <strong>모든 인덱스 데이터가 사라집니다</strong>. 처음부터 다시 시작할 때 사용하세요</li>
            </ul>
          </ExplainCallout>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ 다음 단계 ═══════ */}
      <Section>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#22c55e', marginBottom: '12px' }}>READY TO GO</div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '12px' }}>환경 구축 완료!</h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
            이제 Elasticsearch와 Kibana가 준비되었습니다.<br />
            &ldquo;Elasticsearch란?&rdquo; 탭으로 이동해서 학습을 시작해보세요.
          </p>
        </div>
      </Section>
    </>
  );
}

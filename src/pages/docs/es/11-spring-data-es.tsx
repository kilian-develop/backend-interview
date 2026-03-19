
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Url, JKey, JStr, JVal, Cm } from "@/components/es/content/CmdBlock";
import ExpectedOutput, { Hl } from "@/components/es/content/ExpectedOutput";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

/* ─── Inline visuals ─── */

function ArchDiagram() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text">Spring Boot + Elasticsearch 아키텍처</div>
      <div className="text-center text-[0.88rem] text-text-dim mt-1 mb-8">애플리케이션에서 ES까지의 데이터 흐름</div>

      {/* Flow diagram */}
      <div className="flex flex-col items-center gap-3 max-w-[600px] mx-auto">
        <div className="rounded-xl px-8 py-4 text-center bg-es-purple/[0.08] border border-es-purple/20 w-full">
          <h4 className="font-mono text-[0.9rem] mb-1 text-es-purple">Controller / Service Layer</h4>
          <p className="text-[0.82rem] text-text-dim !mb-0">비즈니스 로직, 요청/응답 처리</p>
        </div>

        <div className="text-text-dim text-lg">&darr;</div>

        <div className="grid grid-cols-2 gap-4 w-full max-md:grid-cols-1">
          <div className="rounded-xl px-6 py-4 text-center bg-es-green/[0.08] border border-es-green/20">
            <h4 className="font-mono text-[0.85rem] mb-1 text-es-green">ElasticsearchRepository</h4>
            <p className="text-[0.78rem] text-text-dim !mb-0">Spring Data 방식<br />메서드 이름 기반 쿼리</p>
          </div>
          <div className="rounded-xl px-6 py-4 text-center bg-es-blue/[0.08] border border-es-blue/20">
            <h4 className="font-mono text-[0.85rem] mb-1 text-es-blue">ElasticsearchOperations</h4>
            <p className="text-[0.78rem] text-text-dim !mb-0">NativeQuery 방식<br />복잡한 쿼리 직접 작성</p>
          </div>
        </div>

        <div className="text-text-dim text-lg">&darr;</div>

        <div className="rounded-xl px-8 py-4 text-center bg-es-cyan/[0.08] border border-es-cyan/20 w-full">
          <h4 className="font-mono text-[0.9rem] mb-1 text-es-cyan">ElasticsearchClient (co.elastic.clients)</h4>
          <p className="text-[0.82rem] text-text-dim !mb-0">Elasticsearch Java API Client &mdash; HTTP 통신 담당</p>
        </div>

        <div className="text-text-dim text-lg">&darr;</div>

        <div className="rounded-xl px-8 py-4 text-center bg-accent/[0.08] border border-accent/20 w-full">
          <h4 className="font-mono text-[0.9rem] mb-1 text-accent">Elasticsearch Cluster</h4>
          <p className="text-[0.82rem] text-text-dim !mb-0">localhost:9200</p>
        </div>
      </div>
    </div>
  );
}

function ComparisonGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
      <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-green">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-es-cyan" />
        <h3 className="font-mono text-lg mb-3 text-es-green">Spring Data Elasticsearch</h3>
        <p className="text-[0.9rem] text-text-dim mb-3"><strong className="text-text font-medium">Repository 패턴</strong></p>
        <p className="text-[0.9rem] text-text-dim mb-3">JPA처럼 인터페이스만 정의하면 구현체가 자동으로 만들어집니다. 메서드 이름으로 쿼리를 생성하고, 도메인 객체 매핑도 자동입니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">CRUD 자동</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">메서드 이름 쿼리</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-green/10 text-es-green border border-es-green/20">도메인 매핑</span>
        </div>
        <p className="mt-4 text-[0.82rem] text-text-dim !mb-0">단순 CRUD, 빠른 개발에 적합</p>
      </div>

      <div className="bg-surface border border-border rounded-[14px] p-8 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-es-blue">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-purple" />
        <h3 className="font-mono text-lg mb-3 text-es-blue">ElasticsearchClient (직접)</h3>
        <p className="text-[0.9rem] text-text-dim mb-3"><strong className="text-text font-medium">Low-level API</strong></p>
        <p className="text-[0.9rem] text-text-dim mb-3">Elasticsearch의 모든 기능을 직접 사용할 수 있습니다. bool 쿼리, aggregation, highlight 등 복잡한 쿼리에 적합합니다.</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">완전한 제어</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">복잡한 쿼리</span>
          <span className="font-mono text-xs px-3 py-1 rounded-lg bg-es-blue/10 text-es-blue border border-es-blue/20">Aggregation</span>
        </div>
        <p className="mt-4 text-[0.82rem] text-text-dim !mb-0">검색 엔진 기능을 풀로 활용할 때 적합</p>
      </div>
    </div>
  );
}

function DependencyGuide() {
  return (
    <div className="bg-surface border border-border rounded-2xl p-10 my-10">
      <div className="text-center text-lg font-semibold text-text mb-2">의존성 선택 가이드</div>
      <div className="text-center text-[0.88rem] text-text-dim mb-8">프로젝트 성격에 따른 추천</div>

      <div className="grid grid-cols-3 gap-4 max-w-[700px] mx-auto max-md:grid-cols-1">
        <div className="rounded-xl p-5 text-center bg-es-green/[0.08] border border-es-green/20">
          <h4 className="font-mono text-[0.85rem] mb-2 text-es-green">간단한 CRUD</h4>
          <p className="text-[0.78rem] text-text-dim !mb-2">상품 저장/조회, 로그 저장</p>
          <div className="font-mono text-xs px-3 py-1.5 rounded-lg bg-es-green/15 text-es-green inline-block">Spring Data ES</div>
        </div>
        <div className="rounded-xl p-5 text-center bg-accent/[0.08] border border-accent/20">
          <h4 className="font-mono text-[0.85rem] mb-2 text-accent">CRUD + 검색</h4>
          <p className="text-[0.78rem] text-text-dim !mb-2">기본 CRUD + 복잡한 검색 쿼리</p>
          <div className="font-mono text-xs px-3 py-1.5 rounded-lg bg-accent/15 text-accent inline-block">둘 다 사용</div>
        </div>
        <div className="rounded-xl p-5 text-center bg-es-blue/[0.08] border border-es-blue/20">
          <h4 className="font-mono text-[0.85rem] mb-2 text-es-blue">검색 엔진 중심</h4>
          <p className="text-[0.78rem] text-text-dim !mb-2">Aggregation, 자동완성, 하이라이트</p>
          <div className="font-mono text-xs px-3 py-1.5 rounded-lg bg-es-blue/15 text-es-blue inline-block">ElasticsearchClient</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main chapter content ─── */

export default function Chapter11() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: Spring Boot + ES 아키텍처 ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>Spring Boot + Elasticsearch<br />— 아키텍처와 선택지</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          지금까지 Kibana Dev Tools에서 REST API로 Elasticsearch를 직접 다뤘습니다. 이제 <strong className="text-text">Spring Boot 애플리케이션</strong>에서 Elasticsearch를 사용하는 방법을 배워봅시다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          Spring에서 ES를 사용하는 방법은 크게 두 가지입니다: <strong className="text-text">Spring Data Elasticsearch</strong>(Repository 패턴)와 <strong className="text-text">ElasticsearchClient</strong>(직접 쿼리)입니다. 실제 프로젝트에서는 이 둘을 함께 사용하는 경우가 많습니다.
        </p>

        <ArchDiagram />
        <ComparisonGrid />

        <ExplainCallout title="핵심 포인트">
          <ul>
            <li><strong>Spring Data ES</strong>는 JPA처럼 동작합니다. 인터페이스만 만들면 CRUD가 자동으로 구현돼요.</li>
            <li><strong>ElasticsearchClient</strong>는 Kibana에서 작성하던 JSON 쿼리를 Java 코드로 옮기는 것과 같습니다.</li>
            <li>두 방식 모두 <strong>같은 의존성</strong>(spring-boot-starter-data-elasticsearch)으로 사용 가능합니다.</li>
            <li>실무에서는 <strong>간단한 CRUD는 Repository</strong>, <strong>복잡한 검색은 NativeQuery</strong>로 분리하는 패턴이 일반적입니다.</li>
          </ul>
        </ExplainCallout>

        <DependencyGuide />

        <QaBox question="기존 High Level REST Client(HLRC)는 어떻게 되었나요?">
          <p>Elasticsearch 7.x까지 사용되던 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">RestHighLevelClient</code>는 <strong>Deprecated</strong>되었습니다. 8.x부터는 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">ElasticsearchClient</code>(co.elastic.clients 패키지)가 공식 클라이언트입니다.</p>
          <p>Spring Data Elasticsearch 5.x(Spring Boot 3.x)도 내부적으로 이 새로운 클라이언트를 사용합니다. 인터넷의 오래된 글에서 HLRC를 사용하는 코드가 보이면, 최신 방식이 아닌 것이니 주의하세요.</p>
        </QaBox>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 실습: 프로젝트 설정 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 2 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: 프로젝트 설정<br />— Spring Boot + ES 연결하기</SectionTitle>

        <LabBanner icon="&#x1F6E0;" title="사전 조건">
          Elasticsearch가 localhost:9200에서 실행 중이어야 합니다. Spring Boot 3.x + Java 17 이상 프로젝트가 준비되어 있어야 해요.
        </LabBanner>

        {/* Step 1: build.gradle */}
        <LabStep num={1} title="build.gradle 의존성 추가" tags={["gradle"]}>
          <p>Spring Boot의 Elasticsearch 스타터 하나만 추가하면 됩니다. 이 의존성 안에 Spring Data ES와 ElasticsearchClient가 모두 포함되어 있어요.</p>

          <CmdBlock label="GRADLE — build.gradle" copyText={`dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-elasticsearch'
}`}>
            <Kw>dependencies</Kw> {"{"}{"\n"}
            {"    "}<Kw>implementation</Kw> <JStr>&apos;org.springframework.boot:spring-boot-starter-data-elasticsearch&apos;</JStr>{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="이 의존성이 가져오는 것들">
            <ul>
              <li><strong>spring-data-elasticsearch</strong> &mdash; Repository, 도메인 매핑(@Document, @Field 등)</li>
              <li><strong>elasticsearch-java</strong> &mdash; ElasticsearchClient (공식 Java API Client)</li>
              <li><strong>elasticsearch-rest-client</strong> &mdash; 저수준 HTTP 통신 (RestClient)</li>
              <li>별도로 elasticsearch-java를 추가할 필요가 없습니다. Spring Boot가 버전을 관리해줘요.</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="버전 호환성 주의">
            <p>Spring Boot와 Elasticsearch의 <strong>버전 호환성</strong>을 반드시 확인하세요. Spring Boot 3.2.x는 ES 8.11.x, Spring Boot 3.3.x는 ES 8.13.x와 호환됩니다. <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">spring-data-elasticsearch</code> 공식 문서의 호환성 매트릭스를 참고하세요.</p>
          </WarnCallout>

          <Checkpoint>build.gradle에 의존성을 추가하고, Gradle sync가 성공하면 완료!</Checkpoint>
        </LabStep>

        {/* Step 2: application.yml */}
        <LabStep num={2} title="application.yml 설정" tags={["spring"]}>
          <p>Elasticsearch 연결 정보를 설정합니다.</p>

          <CmdBlock label="YAML — application.yml" copyText={`spring:
  elasticsearch:
    uris: localhost:9200
    # username: elastic      # 인증이 필요한 경우
    # password: changeme     # 인증이 필요한 경우
    connection-timeout: 5s
    socket-timeout: 30s`}>
            <Kw>spring</Kw>:{"\n"}
            {"  "}<Kw>elasticsearch</Kw>:{"\n"}
            {"    "}<JKey>uris</JKey>: <JStr>localhost:9200</JStr>{"\n"}
            {"    "}<Cm># username: elastic      # 인증이 필요한 경우</Cm>{"\n"}
            {"    "}<Cm># password: changeme     # 인증이 필요한 경우</Cm>{"\n"}
            {"    "}<JKey>connection-timeout</JKey>: <JVal>5s</JVal>{"\n"}
            {"    "}<JKey>socket-timeout</JKey>: <JVal>30s</JVal>
          </CmdBlock>

          <ExplainCallout title="설정 해설">
            <ul>
              <li><strong>uris</strong> &mdash; ES 클러스터 주소. 여러 노드라면 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">localhost:9200,localhost:9201</code>처럼 콤마로 구분</li>
              <li><strong>connection-timeout</strong> &mdash; 연결 타임아웃. ES에 접속이 안 될 때 5초 후 실패 처리</li>
              <li><strong>socket-timeout</strong> &mdash; 응답 대기 타임아웃. 쿼리 실행이 30초 넘으면 타임아웃</li>
              <li>Spring Boot 3.x에서는 이 설정만으로 <strong>자동으로 ElasticsearchClient Bean</strong>이 생성됩니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>application.yml에 설정을 추가하고, 애플리케이션이 정상 기동되면 완료!</Checkpoint>
        </LabStep>

        {/* Step 3: ElasticsearchClient Bean */}
        <LabStep num={3} title="ElasticsearchClient Bean 설정 (커스텀)" tags={["spring"]}>
          <p>기본 Auto Configuration으로 충분하지만, SSL이나 인증 등 <strong>커스텀 설정</strong>이 필요한 경우 직접 Bean을 구성할 수 있습니다.</p>

          <CmdBlock label="JAVA" copyText={`@Configuration
public class ElasticsearchConfig extends ElasticsearchConfiguration {

    @Override
    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
            .connectedTo("localhost:9200")
            .withConnectTimeout(Duration.ofSeconds(5))
            .withSocketTimeout(Duration.ofSeconds(30))
            // .withBasicAuth("elastic", "changeme")  // 인증
            // .usingSsl()                              // SSL
            .build();
    }
}`}>
            <Kw>@Configuration</Kw>{"\n"}
            <Kw>public class</Kw> <JStr>ElasticsearchConfig</JStr> <Kw>extends</Kw> <JStr>ElasticsearchConfiguration</JStr> {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>@Override</Kw>{"\n"}
            {"    "}<Kw>public</Kw> ClientConfiguration <Kw>clientConfiguration</Kw>() {"{"}{"\n"}
            {"        "}<Kw>return</Kw> ClientConfiguration.builder(){"\n"}
            {"            "}.connectedTo(<JStr>&quot;localhost:9200&quot;</JStr>){"\n"}
            {"            "}.withConnectTimeout(Duration.ofSeconds(<JVal>5</JVal>)){"\n"}
            {"            "}.withSocketTimeout(Duration.ofSeconds(<JVal>30</JVal>)){"\n"}
            {"            "}<Cm>// .withBasicAuth(&quot;elastic&quot;, &quot;changeme&quot;)</Cm>{"\n"}
            {"            "}<Cm>// .usingSsl()</Cm>{"\n"}
            {"            "}.build();{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="ElasticsearchConfiguration 상속의 의미">
            <ul>
              <li><strong>ElasticsearchConfiguration</strong>을 상속하면 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">ElasticsearchClient</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">ElasticsearchOperations</code> Bean이 자동으로 등록됩니다</li>
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">clientConfiguration()</code>만 오버라이드하면 나머지는 Spring이 처리해줍니다</li>
              <li>운영 환경에서는 SSL + 인증이 필수이므로, 이 방식을 사용하는 경우가 많습니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="application.yml 설정과 @Configuration 둘 다 있으면 어떻게 되나요?">
            <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">ElasticsearchConfiguration</code>을 상속한 @Configuration 클래스가 있으면, <strong>yml의 auto configuration보다 우선</strong>합니다. 둘 중 하나만 사용하세요. 간단한 로컬 개발은 yml로, 운영 환경은 @Configuration으로 관리하는 것이 일반적입니다.</p>
          </QaBox>

          <Checkpoint>커스텀 Bean을 등록한 경우, 애플리케이션 기동 시 Elasticsearch에 정상 연결되면 완료!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: 도메인 매핑 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: 도메인 매핑<br />— Java 객체를 ES 문서로</SectionTitle>

        <LabBanner icon="&#x1F4E6;" title="이번 파트에서 배울 것">
          Java 도메인 객체에 어노테이션을 붙여서 Elasticsearch 인덱스의 매핑(스키마)을 정의합니다. JPA의 @Entity, @Column과 비슷한 개념입니다.
        </LabBanner>

        {/* Step 4: @Document, @Id, @Field */}
        <LabStep num={4} title="@Document, @Id, @Field — 기본 매핑" tags={["java"]}>
          <p>상품(Product) 도메인을 ES 문서로 매핑해봅시다.</p>

          <CmdBlock label="JAVA" copyText={`@Document(indexName = "products")
public class Product {

    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "standard")
    private String name;

    @Field(type = FieldType.Keyword)
    private String brand;

    @Field(type = FieldType.Keyword)
    private String category;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Integer)
    private int price;

    @Field(type = FieldType.Boolean)
    private boolean inStock;

    @Field(type = FieldType.Date, format = DateFormat.date_hour_minute_second)
    private LocalDateTime createdAt;

    // 생성자, getter, setter 생략
}`}>
            <Kw>@Document</Kw>(indexName = <JStr>&quot;products&quot;</JStr>){"\n"}
            <Kw>public class</Kw> <JStr>Product</JStr> {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>@Id</Kw>{"\n"}
            {"    "}<Kw>private</Kw> String id;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Text</JVal>, analyzer = <JStr>&quot;standard&quot;</JStr>){"\n"}
            {"    "}<Kw>private</Kw> String name;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Keyword</JVal>){"\n"}
            {"    "}<Kw>private</Kw> String brand;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Keyword</JVal>){"\n"}
            {"    "}<Kw>private</Kw> String category;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Text</JVal>){"\n"}
            {"    "}<Kw>private</Kw> String description;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Integer</JVal>){"\n"}
            {"    "}<Kw>private int</Kw> price;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Boolean</JVal>){"\n"}
            {"    "}<Kw>private boolean</Kw> inStock;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Date</JVal>, format = DateFormat.<JVal>date_hour_minute_second</JVal>){"\n"}
            {"    "}<Kw>private</Kw> LocalDateTime createdAt;{"\n"}
            {"\n"}
            {"    "}<Cm>// 생성자, getter, setter 생략</Cm>{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="어노테이션 해설">
            <ul>
              <li><strong>@Document(indexName)</strong> &mdash; 이 클래스가 어떤 ES 인덱스에 매핑되는지 지정합니다. JPA의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">@Entity</code> + <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">@Table</code>에 해당해요.</li>
              <li><strong>@Id</strong> &mdash; ES 문서의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">_id</code> 필드에 매핑. 미지정 시 ES가 자동 생성합니다.</li>
              <li><strong>@Field(type)</strong> &mdash; 필드의 ES 타입을 명시적으로 지정합니다.</li>
              <li><strong>FieldType.Text</strong> &mdash; 분석(Analyze)되는 필드. 전문 검색(match)에 사용.</li>
              <li><strong>FieldType.Keyword</strong> &mdash; 분석되지 않는 필드. 정확 일치(term), 정렬, 집계에 사용.</li>
              <li><strong>FieldType.Date + format</strong> &mdash; 날짜 필드의 형식을 지정합니다.</li>
            </ul>
          </ExplainCallout>

          <QaBox question="@Field를 안 붙이면 어떻게 되나요?">
            <p>@Field를 생략하면 Spring Data ES가 <strong>필드 이름과 Java 타입</strong>을 기반으로 자동 매핑합니다. String은 text + keyword, int는 integer 등으로요. 하지만 <strong>analyzer 지정이나 세밀한 제어</strong>가 필요하면 명시적으로 @Field를 붙이는 것이 좋습니다.</p>
          </QaBox>

          <Checkpoint>Product 클래스에 @Document, @Id, @Field 어노테이션을 붙이고, 컴파일이 성공하면 완료!</Checkpoint>
        </LabStep>

        {/* Step 5: @Setting — nori analyzer */}
        <LabStep num={5} title="@Setting으로 커스텀 Analyzer 지정 (nori)" tags={["java"]}>
          <p>한국어 검색을 위해 <strong>nori 분석기</strong>를 사용하려면 인덱스 설정을 함께 지정해야 합니다. JSON 설정 파일을 만들고 @Setting으로 연결합니다.</p>

          <p>먼저 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">src/main/resources/elasticsearch/</code> 디렉토리에 설정 파일을 만듭니다:</p>

          <CmdBlock label="JSON — elasticsearch/product-settings.json" copyText={`{
  "analysis": {
    "analyzer": {
      "nori_analyzer": {
        "type": "custom",
        "tokenizer": "nori_tokenizer",
        "filter": ["lowercase", "nori_readingform"]
      }
    }
  }
}`}>
            {"{"}{"\n"}
            {"  "}<JKey>&quot;analysis&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;analyzer&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;nori_analyzer&quot;</JKey>: {"{"}{"\n"}
            {"        "}<JKey>&quot;type&quot;</JKey>: <JStr>&quot;custom&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;tokenizer&quot;</JKey>: <JStr>&quot;nori_tokenizer&quot;</JStr>,{"\n"}
            {"        "}<JKey>&quot;filter&quot;</JKey>: [<JStr>&quot;lowercase&quot;</JStr>, <JStr>&quot;nori_readingform&quot;</JStr>]{"\n"}
            {"      }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>그리고 도메인 클래스에 @Setting을 추가합니다:</p>

          <CmdBlock label="JAVA" copyText={`@Document(indexName = "products")
@Setting(settingPath = "elasticsearch/product-settings.json")
public class Product {

    @Id
    private String id;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer")
    private String name;

    @Field(type = FieldType.Text, analyzer = "nori_analyzer")
    private String description;

    // ... 나머지 필드 동일
}`}>
            <Kw>@Document</Kw>(indexName = <JStr>&quot;products&quot;</JStr>){"\n"}
            <Kw>@Setting</Kw>(settingPath = <JStr>&quot;elasticsearch/product-settings.json&quot;</JStr>){"\n"}
            <Kw>public class</Kw> <JStr>Product</JStr> {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>@Id</Kw>{"\n"}
            {"    "}<Kw>private</Kw> String id;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Text</JVal>, analyzer = <JStr>&quot;nori_analyzer&quot;</JStr>){"\n"}
            {"    "}<Kw>private</Kw> String name;{"\n"}
            {"\n"}
            {"    "}<Kw>@Field</Kw>(type = FieldType.<JVal>Text</JVal>, analyzer = <JStr>&quot;nori_analyzer&quot;</JStr>){"\n"}
            {"    "}<Kw>private</Kw> String description;{"\n"}
            {"\n"}
            {"    "}<Cm>// ... 나머지 필드 동일</Cm>{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="@Setting 동작 방식">
            <ul>
              <li><strong>settingPath</strong> &mdash; classpath 기준으로 JSON 설정 파일 경로를 지정합니다</li>
              <li>이 설정은 <strong>인덱스가 생성될 때</strong> ES에 전달됩니다. Kibana에서 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">PUT /products</code>에 settings를 넣는 것과 동일해요.</li>
              <li><strong>nori_analyzer</strong>를 정의한 뒤, @Field의 analyzer에서 해당 이름을 참조합니다</li>
              <li>nori 플러그인이 ES에 설치되어 있어야 합니다 (<code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">elasticsearch-plugin install analysis-nori</code>)</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="인덱스가 이미 존재하는 경우">
            <p>@Setting은 <strong>인덱스 생성 시점</strong>에만 적용됩니다. 이미 인덱스가 존재하면 설정이 반영되지 않아요. 기존 인덱스를 삭제하고 다시 생성하거나, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">@Document(createIndex = true)</code>(기본값)로 자동 생성되게 해야 합니다.</p>
          </WarnCallout>

          <Checkpoint>애플리케이션 기동 시 products 인덱스가 nori_analyzer와 함께 생성되면 완료! Kibana에서 GET /products/_settings로 확인해보세요.</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: Repository CRUD ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Repository CRUD<br />— JPA처럼 ES 다루기</SectionTitle>

        <LabBanner icon="&#x1F4BE;" title="이번 파트에서 배울 것">
          ElasticsearchRepository 인터페이스로 CRUD 및 메서드 이름 기반 쿼리를 구현합니다. JPA의 JpaRepository와 사용법이 거의 동일합니다.
        </LabBanner>

        {/* Step 6: Repository 인터페이스 */}
        <LabStep num={6} title="ElasticsearchRepository 인터페이스 생성" tags={["java"]}>
          <p>JPA의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">JpaRepository</code>처럼, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">ElasticsearchRepository</code>를 상속하면 기본 CRUD 메서드가 자동으로 제공됩니다.</p>

          <CmdBlock label="JAVA" copyText={`public interface ProductRepository extends ElasticsearchRepository<Product, String> {
}`}>
            <Kw>public interface</Kw> <JStr>ProductRepository</JStr> <Kw>extends</Kw> ElasticsearchRepository{"<"}Product, String{">"} {"{"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="이것만으로 뭐가 되나요?">
            <ul>
              <li><strong>ElasticsearchRepository&lt;Product, String&gt;</strong> &mdash; 첫 번째 타입 파라미터는 도메인 클래스, 두 번째는 ID 타입</li>
              <li>상속만으로 다음 메서드가 자동 제공됩니다:</li>
              <li><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">save()</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">findById()</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">findAll()</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">delete()</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">count()</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">existsById()</code> 등</li>
              <li>별도의 구현 클래스를 만들 필요가 없습니다. Spring이 런타임에 프록시를 생성해요.</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>인터페이스 생성 후, 애플리케이션 기동이 정상이면 완료!</Checkpoint>
        </LabStep>

        {/* Step 7: 기본 CRUD */}
        <LabStep num={7} title="기본 CRUD 사용하기" tags={["java"]}>
          <p>Repository의 기본 메서드로 상품을 저장하고, 조회하고, 삭제해봅시다.</p>

          <CmdBlock label="JAVA" copyText={`@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    // 저장
    public Product save(Product product) {
        return productRepository.save(product);
    }

    // ID로 조회
    public Optional<Product> findById(String id) {
        return productRepository.findById(id);
    }

    // 전체 조회
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    // 삭제
    public void delete(String id) {
        productRepository.deleteById(id);
    }
}`}>
            <Kw>@Service</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>public class</Kw> <JStr>ProductService</JStr> {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>private final</Kw> ProductRepository productRepository;{"\n"}
            {"\n"}
            {"    "}<Cm>// 저장</Cm>{"\n"}
            {"    "}<Kw>public</Kw> Product <Kw>save</Kw>(Product product) {"{"}{"\n"}
            {"        "}<Kw>return</Kw> productRepository.save(product);{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Cm>// ID로 조회</Cm>{"\n"}
            {"    "}<Kw>public</Kw> Optional{"<"}Product{">"} <Kw>findById</Kw>(String id) {"{"}{"\n"}
            {"        "}<Kw>return</Kw> productRepository.findById(id);{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Cm>// 전체 조회</Cm>{"\n"}
            {"    "}<Kw>public</Kw> Iterable{"<"}Product{">"} <Kw>findAll</Kw>() {"{"}{"\n"}
            {"        "}<Kw>return</Kw> productRepository.findAll();{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Cm>// 삭제</Cm>{"\n"}
            {"    "}<Kw>public void</Kw> <Kw>delete</Kw>(String id) {"{"}{"\n"}
            {"        "}productRepository.deleteById(id);{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="JPA와 거의 동일합니다">
            <ul>
              <li><strong>save()</strong> &mdash; 문서 저장. ID가 있으면 업데이트, 없으면 신규 생성 (Upsert)</li>
              <li><strong>findById()</strong> &mdash; <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">GET /products/_doc/{"{id}"}</code>와 동일</li>
              <li><strong>findAll()</strong> &mdash; <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">GET /products/_search {"{ \"query\": { \"match_all\": {} } }"}</code>와 동일</li>
              <li><strong>deleteById()</strong> &mdash; <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">DELETE /products/_doc/{"{id}"}</code>와 동일</li>
              <li>JPA를 사용해본 적이 있다면 <strong>학습 비용이 거의 없습니다</strong></li>
            </ul>
          </ExplainCallout>

          <QaBox question="save()로 저장하면 ES에 바로 반영되나요?">
            <p>네, <strong>즉시 ES에 반영</strong>됩니다. JPA처럼 flush/commit 개념이 아닙니다. 다만 ES의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">refresh_interval</code>(기본 1초) 때문에, 저장 직후 검색(search)에는 바로 안 나타날 수 있습니다. <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">findById()</code>는 즉시 조회 가능하지만, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">findAll()</code>이나 검색 쿼리는 refresh 이후에 반영됩니다.</p>
          </QaBox>

          <Checkpoint>상품을 save하고, findById로 조회하여 동일한 데이터가 반환되면 완료! Kibana에서도 GET /products/_search로 확인해보세요.</Checkpoint>
        </LabStep>

        {/* Step 8: 메서드 이름 기반 쿼리 */}
        <LabStep num={8} title="메서드 이름 기반 쿼리" tags={["java"]}>
          <p>Spring Data의 핵심 기능! <strong>메서드 이름만으로</strong> ES 쿼리가 자동 생성됩니다.</p>

          <CmdBlock label="JAVA" copyText={`public interface ProductRepository extends ElasticsearchRepository<Product, String> {

    // brand.keyword = ? → term 쿼리
    List<Product> findByBrand(String brand);

    // price BETWEEN ? AND ? → range 쿼리
    List<Product> findByPriceBetween(int minPrice, int maxPrice);

    // category.keyword = ? AND inStock = true
    List<Product> findByCategoryAndInStock(String category, boolean inStock);

    // name LIKE %?% → match 쿼리
    List<Product> findByNameContaining(String keyword);

    // price >= ? 정렬
    List<Product> findByPriceGreaterThanEqualOrderByPriceAsc(int price);
}`}>
            <Kw>public interface</Kw> <JStr>ProductRepository</JStr> <Kw>extends</Kw> ElasticsearchRepository{"<"}Product, String{">"} {"{"}{"\n"}
            {"\n"}
            {"    "}<Cm>// brand.keyword = ? &rarr; term 쿼리</Cm>{"\n"}
            {"    "}List{"<"}Product{">"} <Kw>findByBrand</Kw>(String brand);{"\n"}
            {"\n"}
            {"    "}<Cm>// price BETWEEN ? AND ? &rarr; range 쿼리</Cm>{"\n"}
            {"    "}List{"<"}Product{">"} <Kw>findByPriceBetween</Kw>(<Kw>int</Kw> minPrice, <Kw>int</Kw> maxPrice);{"\n"}
            {"\n"}
            {"    "}<Cm>// category.keyword = ? AND inStock = true</Cm>{"\n"}
            {"    "}List{"<"}Product{">"} <Kw>findByCategoryAndInStock</Kw>(String category, <Kw>boolean</Kw> inStock);{"\n"}
            {"\n"}
            {"    "}<Cm>// name LIKE %?% &rarr; match 쿼리</Cm>{"\n"}
            {"    "}List{"<"}Product{">"} <Kw>findByNameContaining</Kw>(String keyword);{"\n"}
            {"\n"}
            {"    "}<Cm>// price &gt;= ? 정렬</Cm>{"\n"}
            {"    "}List{"<"}Product{">"} <Kw>findByPriceGreaterThanEqualOrderByPriceAsc</Kw>(<Kw>int</Kw> price);{"\n"}
            {"}"}
          </CmdBlock>

          <ExpectedOutput label="메서드 이름 → ES 쿼리 변환 규칙">
            {`findByBrand("삼성")
  → `}<Hl>{`{ "query": { "term": { "brand": "삼성" } } }`}</Hl>{`

findByPriceBetween(100000, 2000000)
  → `}<Hl>{`{ "query": { "range": { "price": { "gte": 100000, "lte": 2000000 } } } }`}</Hl>{`

findByCategoryAndInStock("노트북", true)
  → `}<Hl>{`{ "query": { "bool": { "must": [ { "term": { "category": "노트북" } }, { "term": { "inStock": true } } ] } } }`}</Hl>
          </ExpectedOutput>

          <ExplainCallout title="자주 쓰는 키워드 정리">
            <ul>
              <li><strong>findBy</strong> &mdash; 기본 조회 접두사</li>
              <li><strong>And / Or</strong> &mdash; 조건 결합 (bool must / should)</li>
              <li><strong>Between</strong> &mdash; 범위 검색 (range)</li>
              <li><strong>Containing</strong> &mdash; 텍스트 포함 여부 (match)</li>
              <li><strong>GreaterThanEqual / LessThanEqual</strong> &mdash; 이상/이하 (range gte/lte)</li>
              <li><strong>OrderBy...Asc/Desc</strong> &mdash; 정렬</li>
              <li><strong>Top / First</strong> &mdash; 결과 수 제한 (예: findTop5ByBrand)</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="메서드 이름 쿼리의 한계">
            <p>간단한 조건 검색에는 편리하지만, <strong>bool 쿼리의 filter/should 구분</strong>, <strong>Aggregation</strong>, <strong>Highlight</strong>, <strong>복잡한 중첩 쿼리</strong> 등은 메서드 이름으로 표현할 수 없습니다. 이런 경우에는 다음 파트에서 배울 <strong>NativeQuery</strong>를 사용해야 합니다.</p>
          </WarnCallout>

          <Checkpoint>findByBrand(&quot;삼성&quot;)을 호출하여 삼성 상품만 반환되면 완료! findByPriceBetween으로 가격 범위 검색도 테스트해보세요.</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 5 — 실습: NativeQuery ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 5 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: NativeQuery<br />— ES의 모든 힘을 Java로</SectionTitle>

        <LabBanner icon="&#x1F680;" title="이번 파트의 핵심">
          Kibana에서 작성하던 복잡한 JSON 쿼리를 Java 코드로 작성합니다. bool 쿼리, Aggregation 등 ES의 모든 기능을 사용할 수 있습니다.
        </LabBanner>

        {/* Step 9: NativeQuery로 bool + aggregation */}
        <LabStep num={9} title="NativeQuery — bool + aggregation 쿼리" tags={["java"]}>
          <p>Chapter 3-4에서 Kibana로 작성했던 <strong>&quot;재고 있는 노트북을 검색하면서, 브랜드별 집계도 함께&quot;</strong> 쿼리를 Java로 작성해봅시다.</p>

          <p>먼저 Kibana에서의 원본 쿼리를 떠올려보세요:</p>

          <CmdBlock label="KIBANA DEV TOOLS — 원본 쿼리" copyText={`GET /products/_search
{
  "query": {
    "bool": {
      "must": [
        { "match": { "description": "노트북" } }
      ],
      "filter": [
        { "term": { "in_stock": true } }
      ]
    }
  },
  "aggs": {
    "brands": {
      "terms": { "field": "brand.keyword" }
    },
    "avg_price": {
      "avg": { "field": "price" }
    }
  }
}`}>
            <Kw>GET</Kw> <Url>/products/_search</Url>{"\n"}
            {"{"}{"\n"}
            {"  "}<JKey>&quot;query&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;bool&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;must&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;match&quot;</JKey>: {"{ "}<JKey>&quot;description&quot;</JKey>: <JStr>&quot;노트북&quot;</JStr>{" }"}{" }"}{"\n"}
            {"      "}],{"\n"}
            {"      "}<JKey>&quot;filter&quot;</JKey>: [{"\n"}
            {"        "}{"{ "}<JKey>&quot;term&quot;</JKey>: {"{ "}<JKey>&quot;in_stock&quot;</JKey>: <JVal>true</JVal>{" }"}{" }"}{"\n"}
            {"      "}]{"\n"}
            {"    }"}{"\n"}
            {"  }"},{"\n"}
            {"  "}<JKey>&quot;aggs&quot;</JKey>: {"{"}{"\n"}
            {"    "}<JKey>&quot;brands&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;terms&quot;</JKey>: {"{ "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;brand.keyword&quot;</JStr>{" }"}{"\n"}
            {"    }"},{"\n"}
            {"    "}<JKey>&quot;avg_price&quot;</JKey>: {"{"}{"\n"}
            {"      "}<JKey>&quot;avg&quot;</JKey>: {"{ "}<JKey>&quot;field&quot;</JKey>: <JStr>&quot;price&quot;</JStr>{" }"}{"\n"}
            {"    }"}{"\n"}
            {"  }"}{"\n"}
            {"}"}
          </CmdBlock>

          <p>이것을 <strong>NativeQuery</strong>로 변환합니다:</p>

          <CmdBlock label="JAVA" copyText={`@Service
@RequiredArgsConstructor
public class ProductSearchService {

    private final ElasticsearchOperations operations;

    public SearchHits<Product> searchWithAggregation(String keyword) {
        NativeQuery query = NativeQuery.builder()
            .withQuery(q -> q
                .bool(b -> b
                    .must(m -> m
                        .match(mt -> mt
                            .field("description")
                            .query(keyword)
                        )
                    )
                    .filter(f -> f
                        .term(t -> t
                            .field("in_stock")
                            .value(true)
                        )
                    )
                )
            )
            .withAggregation("brands",
                Aggregation.of(a -> a
                    .terms(t -> t
                        .field("brand.keyword")
                    )
                )
            )
            .withAggregation("avg_price",
                Aggregation.of(a -> a
                    .avg(av -> av
                        .field("price")
                    )
                )
            )
            .build();

        return operations.search(query, Product.class);
    }
}`}>
            <Kw>@Service</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>public class</Kw> <JStr>ProductSearchService</JStr> {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>private final</Kw> ElasticsearchOperations operations;{"\n"}
            {"\n"}
            {"    "}<Kw>public</Kw> SearchHits{"<"}Product{">"} <Kw>searchWithAggregation</Kw>(String keyword) {"{"}{"\n"}
            {"        "}NativeQuery query = NativeQuery.builder(){"\n"}
            {"            "}.withQuery(q {"-> "}q{"\n"}
            {"                "}.bool(b {"-> "}b{"\n"}
            {"                    "}.must(m {"-> "}m{"\n"}
            {"                        "}.match(mt {"-> "}mt{"\n"}
            {"                            "}.field(<JStr>&quot;description&quot;</JStr>){"\n"}
            {"                            "}.query(keyword){"\n"}
            {"                        "}){"\n"}
            {"                    "}){"\n"}
            {"                    "}.filter(f {"-> "}f{"\n"}
            {"                        "}.term(t {"-> "}t{"\n"}
            {"                            "}.field(<JStr>&quot;in_stock&quot;</JStr>){"\n"}
            {"                            "}.value(<JVal>true</JVal>){"\n"}
            {"                        "}){"\n"}
            {"                    "}){"\n"}
            {"                "}){"\n"}
            {"            "}){"\n"}
            {"            "}.withAggregation(<JStr>&quot;brands&quot;</JStr>,{"\n"}
            {"                "}Aggregation.of(a {"-> "}a{"\n"}
            {"                    "}.terms(t {"-> "}t{"\n"}
            {"                        "}.field(<JStr>&quot;brand.keyword&quot;</JStr>){"\n"}
            {"                    "}){"\n"}
            {"                "}){"\n"}
            {"            "}){"\n"}
            {"            "}.withAggregation(<JStr>&quot;avg_price&quot;</JStr>,{"\n"}
            {"                "}Aggregation.of(a {"-> "}a{"\n"}
            {"                    "}.avg(av {"-> "}av{"\n"}
            {"                        "}.field(<JStr>&quot;price&quot;</JStr>){"\n"}
            {"                    "}){"\n"}
            {"                "}){"\n"}
            {"            "}){"\n"}
            {"            "}.build();{"\n"}
            {"\n"}
            {"        "}<Kw>return</Kw> operations.search(query, Product.class);{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="NativeQuery 구조 분석">
            <ul>
              <li><strong>NativeQuery.builder()</strong> &mdash; 빌더 패턴으로 쿼리를 구성합니다</li>
              <li><strong>withQuery()</strong> &mdash; Kibana의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;query&quot;</code> 부분에 해당</li>
              <li><strong>withAggregation()</strong> &mdash; Kibana의 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">&quot;aggs&quot;</code> 부분에 해당</li>
              <li><strong>Lambda 기반 API</strong> &mdash; <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">q -&gt; q.bool(b -&gt; b.must(...))</code> 형태로 JSON 구조를 Java로 표현합니다</li>
              <li><strong>ElasticsearchOperations</strong> &mdash; Spring Data ES가 제공하는 템플릿. NativeQuery를 실행하고 결과를 도메인 객체로 매핑해줍니다</li>
              <li><strong>SearchHits&lt;Product&gt;</strong> &mdash; 검색 결과를 감싸는 래퍼. hits, score, aggregation 결과 등이 모두 포함됩니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="Lambda 체이닝이 복잡해 보이는데, JSON이 더 낫지 않나요?">
            <p>처음에는 그렇게 느껴질 수 있습니다. 하지만 Lambda API는 <strong>컴파일 타임 타입 안전성</strong>을 제공합니다. JSON 문자열은 오타가 있어도 런타임에서야 발견되지만, Lambda API는 IDE의 자동완성과 컴파일러가 오류를 잡아줍니다.</p>
            <p>팁: Kibana에서 먼저 JSON 쿼리를 작성하고 검증한 뒤, 그것을 Java Lambda로 변환하는 순서로 작업하면 훨씬 수월합니다.</p>
          </QaBox>

          <Checkpoint>searchWithAggregation(&quot;노트북&quot;)을 호출하여 검색 결과와 함께 brands 집계 결과가 반환되면 완료!</Checkpoint>
        </LabStep>

        {/* Step 10: 서비스 레이어 활용 패턴 */}
        <LabStep num={10} title="서비스 레이어에서의 활용 패턴" tags={["java"]}>
          <p>실제 서비스에서는 <strong>Repository(간단한 CRUD)</strong>와 <strong>NativeQuery(복잡한 검색)</strong>를 함께 사용하는 것이 일반적입니다. 두 방식을 조합한 실전 패턴을 살펴봅시다.</p>

          <CmdBlock label="JAVA" copyText={`@Service
@RequiredArgsConstructor
public class ProductService {

    // 간단한 CRUD → Repository
    private final ProductRepository productRepository;

    // 복잡한 검색 → ElasticsearchOperations
    private final ElasticsearchOperations operations;

    // ── CRUD (Repository) ──

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> findById(String id) {
        return productRepository.findById(id);
    }

    public List<Product> findByBrand(String brand) {
        return productRepository.findByBrand(brand);
    }

    // ── 복잡한 검색 (NativeQuery) ──

    public SearchHits<Product> search(
            String keyword,
            String category,
            Integer minPrice,
            Integer maxPrice) {

        BoolQuery.Builder boolBuilder = new BoolQuery.Builder();

        // 키워드 검색 (must — 점수 계산)
        if (keyword != null && !keyword.isBlank()) {
            boolBuilder.must(m -> m
                .match(mt -> mt
                    .field("description")
                    .query(keyword)
                )
            );
        }

        // 카테고리 필터 (filter — 캐싱)
        if (category != null) {
            boolBuilder.filter(f -> f
                .term(t -> t
                    .field("category.keyword")
                    .value(category)
                )
            );
        }

        // 가격 범위 필터 (filter — 캐싱)
        if (minPrice != null || maxPrice != null) {
            boolBuilder.filter(f -> f
                .range(r -> {
                    var rangeQuery = r.field("price");
                    if (minPrice != null) rangeQuery.gte(JsonData.of(minPrice));
                    if (maxPrice != null) rangeQuery.lte(JsonData.of(maxPrice));
                    return rangeQuery;
                })
            );
        }

        NativeQuery query = NativeQuery.builder()
            .withQuery(q -> q.bool(boolBuilder.build()))
            .withSort(Sort.by(Sort.Order.asc("price")))
            .withPageable(PageRequest.of(0, 20))
            .build();

        return operations.search(query, Product.class);
    }
}`}>
            <Kw>@Service</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>public class</Kw> <JStr>ProductService</JStr> {"{"}{"\n"}
            {"\n"}
            {"    "}<Cm>// 간단한 CRUD &rarr; Repository</Cm>{"\n"}
            {"    "}<Kw>private final</Kw> ProductRepository productRepository;{"\n"}
            {"\n"}
            {"    "}<Cm>// 복잡한 검색 &rarr; ElasticsearchOperations</Cm>{"\n"}
            {"    "}<Kw>private final</Kw> ElasticsearchOperations operations;{"\n"}
            {"\n"}
            {"    "}<Cm>// &mdash;&mdash; CRUD (Repository) &mdash;&mdash;</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>public</Kw> Product <Kw>save</Kw>(Product product) {"{"}{"\n"}
            {"        "}<Kw>return</Kw> productRepository.save(product);{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Kw>public</Kw> Optional{"<"}Product{">"} <Kw>findById</Kw>(String id) {"{"}{"\n"}
            {"        "}<Kw>return</Kw> productRepository.findById(id);{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Kw>public</Kw> List{"<"}Product{">"} <Kw>findByBrand</Kw>(String brand) {"{"}{"\n"}
            {"        "}<Kw>return</Kw> productRepository.findByBrand(brand);{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Cm>// &mdash;&mdash; 복잡한 검색 (NativeQuery) &mdash;&mdash;</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>public</Kw> SearchHits{"<"}Product{">"} <Kw>search</Kw>({"\n"}
            {"            "}String keyword,{"\n"}
            {"            "}String category,{"\n"}
            {"            "}Integer minPrice,{"\n"}
            {"            "}Integer maxPrice) {"{"}{"\n"}
            {"\n"}
            {"        "}BoolQuery.Builder boolBuilder = <Kw>new</Kw> BoolQuery.Builder();{"\n"}
            {"\n"}
            {"        "}<Cm>// 키워드 검색 (must &mdash; 점수 계산)</Cm>{"\n"}
            {"        "}<Kw>if</Kw> (keyword != <JVal>null</JVal> && !keyword.isBlank()) {"{"}{"\n"}
            {"            "}boolBuilder.must(m {"-> "}m{"\n"}
            {"                "}.match(mt {"-> "}mt{"\n"}
            {"                    "}.field(<JStr>&quot;description&quot;</JStr>){"\n"}
            {"                    "}.query(keyword){"\n"}
            {"                "}){"\n"}
            {"            "});{"\n"}
            {"        }"}{"\n"}
            {"\n"}
            {"        "}<Cm>// 카테고리 필터 (filter &mdash; 캐싱)</Cm>{"\n"}
            {"        "}<Kw>if</Kw> (category != <JVal>null</JVal>) {"{"}{"\n"}
            {"            "}boolBuilder.filter(f {"-> "}f{"\n"}
            {"                "}.term(t {"-> "}t{"\n"}
            {"                    "}.field(<JStr>&quot;category.keyword&quot;</JStr>){"\n"}
            {"                    "}.value(category){"\n"}
            {"                "}){"\n"}
            {"            "});{"\n"}
            {"        }"}{"\n"}
            {"\n"}
            {"        "}<Cm>// 가격 범위 필터 (filter &mdash; 캐싱)</Cm>{"\n"}
            {"        "}<Kw>if</Kw> (minPrice != <JVal>null</JVal> || maxPrice != <JVal>null</JVal>) {"{"}{"\n"}
            {"            "}boolBuilder.filter(f {"-> "}f{"\n"}
            {"                "}.range(r {"-> "}{"{"}{"\n"}
            {"                    "}<Kw>var</Kw> rangeQuery = r.field(<JStr>&quot;price&quot;</JStr>);{"\n"}
            {"                    "}<Kw>if</Kw> (minPrice != <JVal>null</JVal>) rangeQuery.gte(JsonData.of(minPrice));{"\n"}
            {"                    "}<Kw>if</Kw> (maxPrice != <JVal>null</JVal>) rangeQuery.lte(JsonData.of(maxPrice));{"\n"}
            {"                    "}<Kw>return</Kw> rangeQuery;{"\n"}
            {"                })"}{"\n"}
            {"            "});{"\n"}
            {"        }"}{"\n"}
            {"\n"}
            {"        "}NativeQuery query = NativeQuery.builder(){"\n"}
            {"            "}.withQuery(q {"-> "}q.bool(boolBuilder.build())){"\n"}
            {"            "}.withSort(Sort.by(Sort.Order.asc(<JStr>&quot;price&quot;</JStr>))){"\n"}
            {"            "}.withPageable(PageRequest.of(<JVal>0</JVal>, <JVal>20</JVal>)){"\n"}
            {"            "}.build();{"\n"}
            {"\n"}
            {"        "}<Kw>return</Kw> operations.search(query, Product.class);{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="실전 패턴의 핵심">
            <ul>
              <li><strong>Repository + NativeQuery 조합</strong> &mdash; 간단한 건 Repository, 복잡한 건 NativeQuery로 역할 분리</li>
              <li><strong>동적 쿼리 빌딩</strong> &mdash; <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">BoolQuery.Builder</code>로 조건을 선택적으로 추가합니다. null인 파라미터는 쿼리에서 제외돼요.</li>
              <li><strong>must vs filter 분리</strong> &mdash; 키워드 검색은 점수 계산이 필요하므로 must, 카테고리/가격은 필터링만 하므로 filter에 배치</li>
              <li><strong>withSort / withPageable</strong> &mdash; 정렬과 페이지네이션을 Spring Data의 추상화로 처리합니다</li>
              <li><strong>SearchHits&lt;Product&gt;</strong> &mdash; 응답에서 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">getTotalHits()</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">getSearchHits()</code>, <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">getAggregations()</code> 등으로 결과를 꺼낼 수 있습니다</li>
            </ul>
          </ExplainCallout>

          <QaBox question="이 패턴이 클린 아키텍처에서는 어떻게 되나요?">
            <p>클린 아키텍처에서는 <strong>도메인 계층에 Port(인터페이스)</strong>를 정의하고, <strong>인프라 계층에서 ES 구현체(Adapter)</strong>를 작성합니다.</p>
            <p>예를 들어, 도메인에 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">ProductSearchPort</code> 인터페이스를 두고, 인프라에 <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">ElasticsearchProductSearchAdapter</code>를 구현하는 방식입니다. 서비스 계층은 Port에만 의존하므로, ES가 아닌 다른 검색 엔진으로 교체해도 도메인 로직에는 영향이 없습니다.</p>
          </QaBox>

          <WarnCallout title="주의: ES는 트랜잭션이 없습니다">
            <p>Elasticsearch는 RDBMS와 달리 <strong>트랜잭션을 지원하지 않습니다</strong>. <code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">@Transactional</code>을 붙여도 ES 연산에는 적용되지 않아요. 데이터 정합성이 중요한 경우, RDB를 주 저장소로 사용하고 ES는 검색 전용 저장소로 분리하는 것이 일반적인 패턴입니다. RDB에 저장 후 이벤트를 통해 ES에 동기화하는 방식이죠.</p>
          </WarnCallout>

          <Checkpoint>
            search(&quot;노트북&quot;, &quot;노트북&quot;, 1000000, 2000000)을 호출하여 조건에 맞는 상품이 가격순으로 반환되면 완료! 이것이 Spring Boot에서 Elasticsearch를 활용하는 기본 구조입니다.
          </Checkpoint>
        </LabStep>
      </LabSection>
    </>
  );
}

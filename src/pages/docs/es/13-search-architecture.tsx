
import { Section, LabSection, SectionLabel, SectionTitle, SectionDivider } from "@/components/es/layout/Section";
import CmdBlock, { Kw, Cm } from "@/components/es/content/CmdBlock";
import LabStep from "@/components/es/content/LabStep";
import LabBanner from "@/components/es/content/LabBanner";
import Checkpoint from "@/components/es/content/Checkpoint";
import { ExplainCallout, WarnCallout } from "@/components/es/content/Callouts";
import QaBox from "@/components/es/content/QaBox";

export default function Chapter13() {
  return (
    <>
      {/* ═══════ PART 1 — 이론: CQRS 패턴에서 ES 활용 ═══════ */}
      <Section>
        <SectionLabel>Part 1 · Theory</SectionLabel>
        <SectionTitle>CQRS 패턴에서 ES 활용<br />— Command와 Query의 분리</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          서비스가 커지면 <strong className="text-text">쓰기(Command)</strong>와 <strong className="text-text">읽기(Query)</strong>의 요구사항이 완전히 달라집니다.
          MySQL은 정규화된 데이터를 안전하게 저장하는 데 최적이지만, 복잡한 검색과 집계에서는 한계가 있습니다.
        </p>

        <p className="text-text-dim text-lg mb-6">
          <strong className="text-text">CQRS(Command Query Responsibility Segregation)</strong>는 이 둘을 분리하여 각각에 최적화된 저장소를 사용하는 패턴입니다.
          쓰기는 MySQL, 읽기(검색)는 Elasticsearch로 나누는 것이 대표적인 예입니다.
        </p>

        {/* 아키텍처 다이어그램 */}
        <div className="bg-surface border border-border rounded-2xl p-8 my-10 overflow-hidden">
          <h3 className="font-mono text-sm text-accent mb-6 tracking-wide">CQRS + Elasticsearch 아키텍처</h3>
          <div className="grid grid-cols-3 gap-4 items-center max-md:grid-cols-1 max-md:gap-6">
            {/* Command Side */}
            <div className="bg-es-purple/5 border border-es-purple/20 rounded-xl p-6 text-center">
              <div className="font-mono text-xs text-es-purple mb-3 tracking-wider">COMMAND SIDE</div>
              <div className="text-sm text-text-dim mb-4">생성 / 수정 / 삭제</div>
              <div className="bg-surface-2 rounded-lg p-3 mb-3">
                <div className="font-mono text-xs text-es-purple">Spring Boot</div>
                <div className="font-mono text-xs text-text-dim">ProductService</div>
              </div>
              <div className="text-text-dim text-lg mb-3">&darr;</div>
              <div className="bg-es-purple/10 rounded-lg p-3 border border-es-purple/20">
                <div className="font-mono text-sm font-semibold text-es-purple">MySQL</div>
                <div className="font-mono text-xs text-text-dim">정규화된 원본 데이터</div>
              </div>
            </div>

            {/* 동기화 화살표 */}
            <div className="flex flex-col items-center gap-3 max-md:rotate-90 max-md:my-2">
              <div className="font-mono text-xs text-es-orange tracking-wider">SYNC</div>
              <div className="w-full h-px bg-gradient-to-r from-es-purple via-es-orange to-es-green" />
              <div className="font-mono text-[0.65rem] text-text-dim text-center">
                CDC / Event /<br />Dual Write
              </div>
            </div>

            {/* Query Side */}
            <div className="bg-es-green/5 border border-es-green/20 rounded-xl p-6 text-center">
              <div className="font-mono text-xs text-es-green mb-3 tracking-wider">QUERY SIDE</div>
              <div className="text-sm text-text-dim mb-4">검색 / 자동완성 / 집계</div>
              <div className="bg-surface-2 rounded-lg p-3 mb-3">
                <div className="font-mono text-xs text-es-green">Spring Boot</div>
                <div className="font-mono text-xs text-text-dim">ProductSearchService</div>
              </div>
              <div className="text-text-dim text-lg mb-3">&darr;</div>
              <div className="bg-es-green/10 rounded-lg p-3 border border-es-green/20">
                <div className="font-mono text-sm font-semibold text-es-green">Elasticsearch</div>
                <div className="font-mono text-xs text-text-dim">비정규화된 검색 최적화 데이터</div>
              </div>
            </div>
          </div>
        </div>

        <ExplainCallout title="왜 분리하는가?">
          <ul>
            <li><strong>검색 성능</strong> — Elasticsearch는 역색인 기반으로 full-text 검색, 자동완성, 유사어 처리에 특화되어 있습니다</li>
            <li><strong>독립적 확장</strong> — 검색 트래픽이 급증해도 ES 클러스터만 Scale-out하면 됩니다. MySQL에 부하를 주지 않아요</li>
            <li><strong>비정규화</strong> — ES에는 조인 없이 한 문서에 필요한 데이터를 모두 담아 빠르게 응답할 수 있습니다</li>
            <li><strong>각자의 강점</strong> — MySQL은 트랜잭션과 정합성, ES는 검색과 집계에 집중합니다</li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="CQRS의 트레이드오프">
          <p>분리하면 <strong>데이터 동기화</strong>라는 새로운 과제가 생깁니다. MySQL에 저장한 데이터가 ES에 반영되기까지 약간의 지연(Eventual Consistency)이 있을 수 있고, 동기화 실패 시 데이터 불일치 위험이 있습니다. 이 문제를 어떻게 풀 것인지가 아키텍처의 핵심입니다.</p>
        </WarnCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 2 — 이론: DB-ES 동기화 전략 4가지 ═══════ */}
      <Section>
        <SectionLabel>Part 2 · Theory</SectionLabel>
        <SectionTitle>DB-ES 동기화 전략 비교<br />— 4가지 접근법</SectionTitle>

        <p className="text-text-dim text-lg mb-10">
          MySQL의 데이터를 Elasticsearch에 동기화하는 방법은 크게 4가지가 있습니다. 각각의 장단점을 이해하고, 상황에 맞는 전략을 선택하는 것이 중요합니다.
        </p>

        {/* 전략 카드 4개 */}
        <div className="grid grid-cols-2 gap-6 my-10 max-md:grid-cols-1">
          {/* 카드 1: Dual Write */}
          <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:border-es-orange">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-orange to-es-orange/50" />
            <div className="flex items-center gap-3 mb-4">
              <div className="font-mono text-xs font-bold bg-es-orange/15 text-es-orange w-7 h-7 rounded-full flex items-center justify-center shrink-0">1</div>
              <h3 className="font-mono text-lg text-es-orange">Dual Write</h3>
            </div>
            <p className="text-sm text-text-dim mb-3">애플리케이션 코드에서 MySQL과 ES에 <strong className="text-text">동시에 쓰기</strong></p>
            <div className="bg-surface-2 rounded-lg p-4 font-mono text-xs leading-relaxed text-text-dim mb-4">
              save(mysql);<br />
              save(elasticsearch); <span className="text-es-orange">// 여기서 실패하면?</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">구현 간단</span>
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">실시간</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">데이터 불일치 위험</span>
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">코드 침투 높음</span>
            </div>
          </div>

          {/* 카드 2: CDC (Debezium) */}
          <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:border-es-green">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-green to-es-green/50" />
            <div className="flex items-center gap-3 mb-4">
              <div className="font-mono text-xs font-bold bg-es-green/15 text-es-green w-7 h-7 rounded-full flex items-center justify-center shrink-0">2</div>
              <h3 className="font-mono text-lg text-es-green">CDC (Debezium)</h3>
            </div>
            <p className="text-sm text-text-dim mb-3">MySQL <strong className="text-text">binlog를 캡처</strong>하여 Kafka를 통해 ES에 반영</p>
            <div className="bg-surface-2 rounded-lg p-4 font-mono text-xs leading-relaxed text-text-dim mb-4">
              MySQL binlog &rarr; Debezium<br />
              &rarr; Kafka &rarr; ES Sink Connector
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">가장 안정적</span>
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">코드 침투 없음</span>
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">준실시간</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">인프라 복잡도 높음</span>
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">Kafka 필요</span>
            </div>
          </div>

          {/* 카드 3: Logstash JDBC */}
          <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:border-es-blue">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-blue to-es-blue/50" />
            <div className="flex items-center gap-3 mb-4">
              <div className="font-mono text-xs font-bold bg-es-blue/15 text-es-blue w-7 h-7 rounded-full flex items-center justify-center shrink-0">3</div>
              <h3 className="font-mono text-lg text-es-blue">Logstash JDBC</h3>
            </div>
            <p className="text-sm text-text-dim mb-3">Logstash가 <strong className="text-text">주기적으로 DB를 폴링</strong>하여 ES에 동기화</p>
            <div className="bg-surface-2 rounded-lg p-4 font-mono text-xs leading-relaxed text-text-dim mb-4">
              Logstash (cron: &quot;*/30 * * * *&quot;)<br />
              &rarr; SELECT * WHERE updated_at &gt; :last
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">설정 간단</span>
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">코드 침투 없음</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">실시간 X (폴링 주기)</span>
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">DB 부하</span>
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">삭제 감지 어려움</span>
            </div>
          </div>

          {/* 카드 4: Application Event */}
          <div className="bg-surface border border-border rounded-[14px] p-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:border-es-purple">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-es-purple to-es-purple/50" />
            <div className="flex items-center gap-3 mb-4">
              <div className="font-mono text-xs font-bold bg-es-purple/15 text-es-purple w-7 h-7 rounded-full flex items-center justify-center shrink-0">4</div>
              <h3 className="font-mono text-lg text-es-purple">Application Event</h3>
            </div>
            <p className="text-sm text-text-dim mb-3"><strong className="text-text">@TransactionalEventListener</strong>로 커밋 후 ES 반영</p>
            <div className="bg-surface-2 rounded-lg p-4 font-mono text-xs leading-relaxed text-text-dim mb-4">
              @Transactional save() &rarr; event<br />
              &rarr; @TransactionalEventListener<br />
              &rarr; ES 반영
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">준실시간</span>
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">Spring 통합</span>
              <span className="text-xs px-2 py-1 rounded bg-es-green/10 text-es-green border border-es-green/20">Outbox 패턴 확장 가능</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">이벤트 유실 가능</span>
              <span className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-400 border border-red-500/20">코드 침투 중간</span>
            </div>
          </div>
        </div>

        {/* 비교표 */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden my-10">
          <div className="px-6 py-4 bg-white/[0.02] border-b border-border">
            <h3 className="font-mono text-sm text-accent tracking-wide">전략 비교표</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-6 py-3 text-left font-mono text-xs text-text-dim tracking-wider">기준</th>
                  <th className="px-4 py-3 text-center font-mono text-xs text-es-orange tracking-wider">Dual Write</th>
                  <th className="px-4 py-3 text-center font-mono text-xs text-es-green tracking-wider">CDC</th>
                  <th className="px-4 py-3 text-center font-mono text-xs text-es-blue tracking-wider">Logstash</th>
                  <th className="px-4 py-3 text-center font-mono text-xs text-es-purple tracking-wider">App Event</th>
                </tr>
              </thead>
              <tbody className="text-text-dim">
                <tr className="border-b border-border/50">
                  <td className="px-6 py-3 font-medium text-text">실시간성</td>
                  <td className="px-4 py-3 text-center">&#9733;&#9733;&#9733;</td>
                  <td className="px-4 py-3 text-center">&#9733;&#9733;&#9734;</td>
                  <td className="px-4 py-3 text-center">&#9733;&#9734;&#9734;</td>
                  <td className="px-4 py-3 text-center">&#9733;&#9733;&#9734;</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-6 py-3 font-medium text-text">코드 침투도</td>
                  <td className="px-4 py-3 text-center text-red-400">높음</td>
                  <td className="px-4 py-3 text-center text-es-green">없음</td>
                  <td className="px-4 py-3 text-center text-es-green">없음</td>
                  <td className="px-4 py-3 text-center text-es-orange">중간</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-6 py-3 font-medium text-text">인프라 복잡도</td>
                  <td className="px-4 py-3 text-center text-es-green">낮음</td>
                  <td className="px-4 py-3 text-center text-red-400">높음</td>
                  <td className="px-4 py-3 text-center text-es-orange">중간</td>
                  <td className="px-4 py-3 text-center text-es-green">낮음</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-6 py-3 font-medium text-text">데이터 안정성</td>
                  <td className="px-4 py-3 text-center text-red-400">낮음</td>
                  <td className="px-4 py-3 text-center text-es-green">높음</td>
                  <td className="px-4 py-3 text-center text-es-orange">중간</td>
                  <td className="px-4 py-3 text-center text-es-orange">중간</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 font-medium text-text">추천 상황</td>
                  <td className="px-4 py-3 text-center text-xs">프로토타입,<br />소규모 서비스</td>
                  <td className="px-4 py-3 text-center text-xs">대규모 서비스,<br />MSA 환경</td>
                  <td className="px-4 py-3 text-center text-xs">배치 동기화,<br />데이터 마이그레이션</td>
                  <td className="px-4 py-3 text-center text-xs">중소규모 서비스,<br />Spring 기반</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <ExplainCallout title="핵심 포인트">
          <ul>
            <li><strong>완벽한 전략은 없습니다</strong> — 각 방식마다 트레이드오프가 있으며, 서비스 규모와 요구사항에 맞게 선택해야 합니다</li>
            <li><strong>시작은 간단하게</strong> — 처음에는 Dual Write나 Application Event로 시작하고, 서비스가 성장하면 CDC로 전환하는 것이 일반적입니다</li>
            <li><strong>Eventual Consistency</strong> — 어떤 방식을 쓰든 ES 데이터는 약간의 지연이 있을 수 있다는 점을 서비스에서 고려해야 합니다</li>
          </ul>
        </ExplainCallout>
      </Section>

      <SectionDivider />

      {/* ═══════ PART 3 — 실습: Dual Write 구현 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 3 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Dual Write 구현<br />— 가장 단순한 동기화</SectionTitle>

        <LabBanner icon="&#x1F4DD;" title="이번 파트에서 배울 것">
          애플리케이션 코드에서 MySQL과 ES에 동시에 저장하는 Dual Write를 구현하고, 그 한계를 직접 확인합니다.
        </LabBanner>

        {/* Step 1: Dual Write 코드 */}
        <LabStep num={1} title="ProductService — MySQL + ES 동시 저장" tags={["kibana"]}>
          <p>가장 직관적인 방법입니다. 서비스 레이어에서 두 저장소에 순차적으로 저장합니다.</p>

          <CmdBlock label="JAVA" copyText={`@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;          // MySQL (JPA)
    private final ProductSearchRepository productSearchRepository; // Elasticsearch

    @Transactional
    public ProductResponse createProduct(CreateProductCommand command) {
        // 1) MySQL에 저장
        Product product = Product.create(
            command.name(),
            command.description(),
            command.price(),
            command.brand(),
            command.category()
        );
        Product saved = productRepository.save(product);

        // 2) Elasticsearch에도 저장 (Dual Write)
        ProductDocument document = ProductDocument.from(saved);
        productSearchRepository.save(document);

        return ProductResponse.from(saved);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, UpdateProductCommand command) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));

        Product updated = product.update(
            command.name(),
            command.description(),
            command.price()
        );
        Product saved = productRepository.save(updated);

        // Elasticsearch도 업데이트
        ProductDocument document = ProductDocument.from(saved);
        productSearchRepository.save(document);

        return ProductResponse.from(saved);
    }
}`}>
            <Kw>@Service</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>public class</Kw> ProductService {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>private final</Kw> ProductRepository productRepository;          <Cm>// MySQL (JPA)</Cm>{"\n"}
            {"    "}<Kw>private final</Kw> ProductSearchRepository productSearchRepository; <Cm>// Elasticsearch</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>@Transactional</Kw>{"\n"}
            {"    "}<Kw>public</Kw> ProductResponse createProduct(CreateProductCommand command) {"{"}{"\n"}
            {"        "}<Cm>// 1) MySQL에 저장</Cm>{"\n"}
            {"        "}Product product = Product.create({"\n"}
            {"            "}command.name(),{"\n"}
            {"            "}command.description(),{"\n"}
            {"            "}command.price(),{"\n"}
            {"            "}command.brand(),{"\n"}
            {"            "}command.category(){"\n"}
            {"        "});{"\n"}
            {"        "}Product saved = productRepository.save(product);{"\n"}
            {"\n"}
            {"        "}<Cm>// 2) Elasticsearch에도 저장 (Dual Write)</Cm>{"\n"}
            {"        "}ProductDocument document = ProductDocument.from(saved);{"\n"}
            {"        "}productSearchRepository.save(document);{"\n"}
            {"\n"}
            {"        "}<Kw>return</Kw> ProductResponse.from(saved);{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Kw>@Transactional</Kw>{"\n"}
            {"    "}<Kw>public</Kw> ProductResponse updateProduct(Long id, UpdateProductCommand command) {"{"}{"\n"}
            {"        "}Product product = productRepository.findById(id){"\n"}
            {"            "}{".orElseThrow(() -> "}<Kw>new</Kw>{" ProductNotFoundException(id));"}{"\n"}
            {"\n"}
            {"        "}Product updated = product.update({"\n"}
            {"            "}command.name(),{"\n"}
            {"            "}command.description(),{"\n"}
            {"            "}command.price(){"\n"}
            {"        "});{"\n"}
            {"        "}Product saved = productRepository.save(updated);{"\n"}
            {"\n"}
            {"        "}<Cm>// Elasticsearch도 업데이트</Cm>{"\n"}
            {"        "}ProductDocument document = ProductDocument.from(saved);{"\n"}
            {"        "}productSearchRepository.save(document);{"\n"}
            {"\n"}
            {"        "}<Kw>return</Kw> ProductResponse.from(saved);{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="코드 구조 해석">
            <ul>
              <li><strong>ProductRepository</strong> — JPA를 통해 MySQL에 접근하는 인터페이스</li>
              <li><strong>ProductSearchRepository</strong> — Spring Data Elasticsearch를 통해 ES에 접근하는 인터페이스</li>
              <li><strong>ProductDocument.from()</strong> — MySQL 엔티티를 ES 문서로 변환하는 팩토리 메소드</li>
              <li>서비스의 모든 쓰기 메소드에 ES 저장 코드가 <strong>직접 들어가 있습니다</strong></li>
            </ul>
          </ExplainCallout>
        </LabStep>

        {/* Step 2: 문제점 시연 */}
        <LabStep num={2} title="Dual Write의 치명적 문제점" tags={["kibana"]}>
          <p>깔끔해 보이지만, 아래 시나리오에서 <strong>데이터 불일치</strong>가 발생합니다.</p>

          {/* 문제 시나리오 시각화 */}
          <div className="bg-surface border border-red-500/20 rounded-2xl p-6 my-6">
            <h4 className="font-mono text-sm text-red-400 mb-4">장애 시나리오: ES 저장 실패</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="font-mono text-xs bg-es-green/15 text-es-green px-3 py-1 rounded-lg shrink-0 w-20 text-center">Step 1</div>
                <div className="text-sm text-text-dim">MySQL 저장 <strong className="text-es-green">성공</strong> &mdash; product_id: 42 생성됨</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-mono text-xs bg-red-500/15 text-red-400 px-3 py-1 rounded-lg shrink-0 w-20 text-center">Step 2</div>
                <div className="text-sm text-text-dim">ES 저장 <strong className="text-red-400">실패</strong> &mdash; 네트워크 타임아웃, ES 클러스터 장애 등</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="font-mono text-xs bg-es-orange/15 text-es-orange px-3 py-1 rounded-lg shrink-0 w-20 text-center">결과</div>
                <div className="text-sm text-text-dim">MySQL에는 있지만 ES에는 <strong className="text-red-400">없는 상품</strong> &mdash; 검색해도 안 나옴!</div>
              </div>
            </div>
          </div>

          <CmdBlock label="JAVA" copyText={`@Transactional
public ProductResponse createProduct(CreateProductCommand command) {
    // MySQL 저장 - 성공
    Product saved = productRepository.save(product);

    // ES 저장 - 실패하면?
    try {
        productSearchRepository.save(document);
    } catch (Exception e) {
        // 방법 1: 예외를 던진다 → MySQL도 롤백 → 사용자 경험 저하
        // 방법 2: 예외를 삼킨다 → 데이터 불일치 발생
        // 방법 3: 재시도? → 몇 번? 계속 실패하면?
        log.error("ES 동기화 실패: productId={}", saved.getId(), e);
    }
}`}>
            <Kw>@Transactional</Kw>{"\n"}
            <Kw>public</Kw> ProductResponse createProduct(CreateProductCommand command) {"{"}{"\n"}
            {"    "}<Cm>// MySQL 저장 - 성공</Cm>{"\n"}
            {"    "}Product saved = productRepository.save(product);{"\n"}
            {"\n"}
            {"    "}<Cm>// ES 저장 - 실패하면?</Cm>{"\n"}
            {"    "}<Kw>try</Kw> {"{"}{"\n"}
            {"        "}productSearchRepository.save(document);{"\n"}
            {"    }"} <Kw>catch</Kw> (Exception e) {"{"}{"\n"}
            {"        "}<Cm>// 방법 1: 예외를 던진다 → MySQL도 롤백 → 사용자 경험 저하</Cm>{"\n"}
            {"        "}<Cm>// 방법 2: 예외를 삼킨다 → 데이터 불일치 발생</Cm>{"\n"}
            {"        "}<Cm>// 방법 3: 재시도? → 몇 번? 계속 실패하면?</Cm>{"\n"}
            {"        "}log.error(<Kw>&quot;ES 동기화 실패: productId={}&quot;</Kw>, saved.getId(), e);{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <WarnCallout title="Dual Write의 근본적 한계">
            <p>MySQL과 Elasticsearch는 <strong>분산 트랜잭션을 지원하지 않습니다</strong>. 두 저장소의 저장을 하나의 원자적 연산으로 묶을 수 없기 때문에, 어느 한쪽이 실패하면 반드시 불일치가 발생합니다. 프로토타입이나 소규모 서비스에서는 괜찮지만, 데이터 정합성이 중요한 서비스에서는 다른 전략이 필요합니다.</p>
          </WarnCallout>

          <Checkpoint>Dual Write의 코드 구조와 한계를 이해했으면 성공! 다음 스텝에서 이 문제를 해결하는 Application Event 패턴을 배웁니다.</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 4 — 실습: Application Event 패턴 ═══════ */}
      <LabSection>
        <SectionLabel lab>Part 4 · Hands-on Lab</SectionLabel>
        <SectionTitle>실습: Application Event 패턴<br />— 이벤트 기반 동기화</SectionTitle>

        <LabBanner icon="&#x1F4E8;" title="이번 파트에서 배울 것">
          도메인 이벤트와 @TransactionalEventListener를 활용하여 MySQL 커밋 이후에 ES를 동기화하는 패턴, 그리고 Outbox 패턴으로 신뢰성을 확보하는 방법을 배웁니다.
        </LabBanner>

        {/* Step 3: 도메인 이벤트 정의 */}
        <LabStep num={3} title="도메인 이벤트 정의 — ProductCreatedEvent" tags={["kibana"]}>
          <p>먼저 &quot;상품이 생성되었다&quot;는 사실을 표현하는 <strong>도메인 이벤트</strong>를 정의합니다.</p>

          <CmdBlock label="JAVA" copyText={`// 도메인 이벤트 정의
public record ProductCreatedEvent(
    Long productId,
    String name,
    String description,
    int price,
    String brand,
    String category,
    LocalDateTime createdAt
) {
    public static ProductCreatedEvent from(Product product) {
        return new ProductCreatedEvent(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getBrand(),
            product.getCategory(),
            product.getCreatedAt()
        );
    }
}

// 상품 수정 이벤트
public record ProductUpdatedEvent(
    Long productId,
    String name,
    String description,
    int price,
    LocalDateTime updatedAt
) {
    public static ProductUpdatedEvent from(Product product) {
        return new ProductUpdatedEvent(
            product.getId(),
            product.getName(),
            product.getDescription(),
            product.getPrice(),
            product.getUpdatedAt()
        );
    }
}`}>
            <Cm>// 도메인 이벤트 정의</Cm>{"\n"}
            <Kw>public record</Kw> ProductCreatedEvent({"\n"}
            {"    "}Long productId,{"\n"}
            {"    "}String name,{"\n"}
            {"    "}String description,{"\n"}
            {"    "}<Kw>int</Kw> price,{"\n"}
            {"    "}String brand,{"\n"}
            {"    "}String category,{"\n"}
            {"    "}LocalDateTime createdAt{"\n"}
            ) {"{"}{"\n"}
            {"    "}<Kw>public static</Kw> ProductCreatedEvent from(Product product) {"{"}{"\n"}
            {"        "}<Kw>return new</Kw> ProductCreatedEvent({"\n"}
            {"            "}product.getId(),{"\n"}
            {"            "}product.getName(),{"\n"}
            {"            "}product.getDescription(),{"\n"}
            {"            "}product.getPrice(),{"\n"}
            {"            "}product.getBrand(),{"\n"}
            {"            "}product.getCategory(),{"\n"}
            {"            "}product.getCreatedAt(){"\n"}
            {"        "});{"\n"}
            {"    }"}{"\n"}
            {"}"}{"\n"}
            {"\n"}
            <Cm>// 상품 수정 이벤트</Cm>{"\n"}
            <Kw>public record</Kw> ProductUpdatedEvent({"\n"}
            {"    "}Long productId,{"\n"}
            {"    "}String name,{"\n"}
            {"    "}String description,{"\n"}
            {"    "}<Kw>int</Kw> price,{"\n"}
            {"    "}LocalDateTime updatedAt{"\n"}
            ) {"{"}{"\n"}
            {"    "}<Kw>public static</Kw> ProductUpdatedEvent from(Product product) {"{"}{"\n"}
            {"        "}<Kw>return new</Kw> ProductUpdatedEvent({"\n"}
            {"            "}product.getId(),{"\n"}
            {"            "}product.getName(),{"\n"}
            {"            "}product.getDescription(),{"\n"}
            {"            "}product.getPrice(),{"\n"}
            {"            "}product.getUpdatedAt(){"\n"}
            {"        "});{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="도메인 이벤트를 Record로 정의하는 이유">
            <ul>
              <li><strong>불변성</strong> — 이벤트는 &quot;과거에 일어난 사실&quot;이므로 변경되면 안 됩니다. Record는 자동으로 불변을 보장합니다</li>
              <li><strong>간결함</strong> — getter, equals, hashCode, toString이 자동 생성됩니다</li>
              <li><strong>from() 팩토리 메소드</strong> — 도메인 엔티티에서 이벤트로의 변환을 캡슐화합니다</li>
              <li><strong>이벤트 = 과거형</strong> — &quot;Created&quot;, &quot;Updated&quot;처럼 과거형으로 이름을 짓습니다. 이미 일어난 사실이니까요</li>
            </ul>
          </ExplainCallout>
        </LabStep>

        {/* Step 4: @TransactionalEventListener */}
        <LabStep num={4} title="@TransactionalEventListener로 ES 동기화" tags={["kibana"]}>
          <p>이제 서비스에서 이벤트를 발행하고, 리스너에서 ES에 반영합니다.</p>

          <CmdBlock label="JAVA" copyText={`// 서비스 — 이벤트 발행
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public ProductResponse createProduct(CreateProductCommand command) {
        Product product = Product.create(
            command.name(), command.description(),
            command.price(), command.brand(), command.category()
        );
        Product saved = productRepository.save(product);

        // ES 코드가 사라졌다! 이벤트만 발행
        eventPublisher.publishEvent(ProductCreatedEvent.from(saved));

        return ProductResponse.from(saved);
    }
}`}>
            <Cm>// 서비스 — 이벤트 발행</Cm>{"\n"}
            <Kw>@Service</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>public class</Kw> ProductService {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>private final</Kw> ProductRepository productRepository;{"\n"}
            {"    "}<Kw>private final</Kw> ApplicationEventPublisher eventPublisher;{"\n"}
            {"\n"}
            {"    "}<Kw>@Transactional</Kw>{"\n"}
            {"    "}<Kw>public</Kw> ProductResponse createProduct(CreateProductCommand command) {"{"}{"\n"}
            {"        "}Product product = Product.create({"\n"}
            {"            "}command.name(), command.description(),{"\n"}
            {"            "}command.price(), command.brand(), command.category(){"\n"}
            {"        "});{"\n"}
            {"        "}Product saved = productRepository.save(product);{"\n"}
            {"\n"}
            {"        "}<Cm>// ES 코드가 사라졌다! 이벤트만 발행</Cm>{"\n"}
            {"        "}eventPublisher.publishEvent(ProductCreatedEvent.from(saved));{"\n"}
            {"\n"}
            {"        "}<Kw>return</Kw> ProductResponse.from(saved);{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <CmdBlock label="JAVA" copyText={`// 이벤트 리스너 — ES 동기화 담당
@Component
@RequiredArgsConstructor
@Slf4j
public class ProductSearchEventListener {

    private final ProductSearchRepository productSearchRepository;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleProductCreated(ProductCreatedEvent event) {
        try {
            ProductDocument document = ProductDocument.from(event);
            productSearchRepository.save(document);
            log.info("ES 동기화 완료: productId={}", event.productId());
        } catch (Exception e) {
            log.error("ES 동기화 실패: productId={}", event.productId(), e);
            // 실패 시 재시도 로직 or Dead Letter Queue
        }
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleProductUpdated(ProductUpdatedEvent event) {
        try {
            ProductDocument document = productSearchRepository
                .findById(String.valueOf(event.productId()))
                .orElseThrow();

            ProductDocument updated = document.applyUpdate(event);
            productSearchRepository.save(updated);
            log.info("ES 업데이트 완료: productId={}", event.productId());
        } catch (Exception e) {
            log.error("ES 업데이트 실패: productId={}", event.productId(), e);
        }
    }
}`}>
            <Cm>// 이벤트 리스너 — ES 동기화 담당</Cm>{"\n"}
            <Kw>@Component</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>@Slf4j</Kw>{"\n"}
            <Kw>public class</Kw> ProductSearchEventListener {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>private final</Kw> ProductSearchRepository productSearchRepository;{"\n"}
            {"\n"}
            {"    "}<Kw>@TransactionalEventListener</Kw>(phase = TransactionPhase.AFTER_COMMIT){"\n"}
            {"    "}<Kw>public void</Kw> handleProductCreated(ProductCreatedEvent event) {"{"}{"\n"}
            {"        "}<Kw>try</Kw> {"{"}{"\n"}
            {"            "}ProductDocument document = ProductDocument.from(event);{"\n"}
            {"            "}productSearchRepository.save(document);{"\n"}
            {"            "}log.info(<Kw>&quot;ES 동기화 완료: productId={}&quot;</Kw>, event.productId());{"\n"}
            {"        }"} <Kw>catch</Kw> (Exception e) {"{"}{"\n"}
            {"            "}log.error(<Kw>&quot;ES 동기화 실패: productId={}&quot;</Kw>, event.productId(), e);{"\n"}
            {"            "}<Cm>// 실패 시 재시도 로직 or Dead Letter Queue</Cm>{"\n"}
            {"        }"}{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Kw>@TransactionalEventListener</Kw>(phase = TransactionPhase.AFTER_COMMIT){"\n"}
            {"    "}<Kw>public void</Kw> handleProductUpdated(ProductUpdatedEvent event) {"{"}{"\n"}
            {"        "}<Kw>try</Kw> {"{"}{"\n"}
            {"            "}ProductDocument document = productSearchRepository{"\n"}
            {"                "}.findById(String.valueOf(event.productId())){"\n"}
            {"                "}.orElseThrow();{"\n"}
            {"\n"}
            {"            "}ProductDocument updated = document.applyUpdate(event);{"\n"}
            {"            "}productSearchRepository.save(updated);{"\n"}
            {"            "}log.info(<Kw>&quot;ES 업데이트 완료: productId={}&quot;</Kw>, event.productId());{"\n"}
            {"        }"} <Kw>catch</Kw> (Exception e) {"{"}{"\n"}
            {"            "}log.error(<Kw>&quot;ES 업데이트 실패: productId={}&quot;</Kw>, event.productId(), e);{"\n"}
            {"        }"}{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="Dual Write 대비 개선된 점">
            <ul>
              <li><strong>관심사 분리</strong> — ProductService는 MySQL 저장에만 집중. ES 동기화는 리스너가 담당합니다</li>
              <li><strong>AFTER_COMMIT</strong> — MySQL 트랜잭션이 <strong>커밋된 후</strong>에만 ES 동기화가 실행됩니다. MySQL 저장 실패 시 ES 동기화가 아예 실행되지 않아요</li>
              <li><strong>ES 실패 격리</strong> — ES 동기화가 실패해도 MySQL 트랜잭션에는 영향 없습니다. 사용자는 정상 응답을 받습니다</li>
              <li><strong>확장성</strong> — 이벤트 리스너를 추가하면 ES 외에 캐시, 알림 등도 쉽게 연동할 수 있습니다</li>
            </ul>
          </ExplainCallout>

          <WarnCallout title="아직 남은 문제">
            <p><code className="font-mono text-sm bg-surface-2 px-2 py-0.5 rounded border border-border">@TransactionalEventListener</code>는 <strong>애플리케이션 메모리 내 이벤트</strong>입니다. 만약 ES 동기화 도중 서버가 죽으면 이벤트가 유실됩니다. 이 문제를 해결하려면 <strong>Outbox 패턴</strong>이 필요합니다.</p>
          </WarnCallout>

          <Checkpoint>ProductService에서 ES 코드가 사라지고, 이벤트 리스너로 분리된 구조를 이해했으면 성공!</Checkpoint>
        </LabStep>

        {/* Step 5: Outbox 패턴 */}
        <LabStep num={5} title="Outbox 패턴으로 신뢰성 확보" tags={["kibana"]}>
          <p><strong>Outbox 패턴</strong>은 이벤트를 DB 테이블에 먼저 저장하여, 이벤트 유실을 방지하는 패턴입니다.</p>

          {/* Outbox 패턴 흐름 시각화 */}
          <div className="bg-surface border border-border rounded-2xl p-6 my-6">
            <h4 className="font-mono text-sm text-accent mb-5 tracking-wide">Outbox 패턴 흐름</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="font-mono text-xs bg-es-purple/15 text-es-purple px-3 py-1 rounded-lg shrink-0 w-20 text-center mt-0.5">Step A</div>
                <div>
                  <div className="text-sm font-medium text-text mb-1">하나의 트랜잭션으로 저장</div>
                  <div className="text-sm text-text-dim">Product 저장 + Outbox 테이블에 이벤트 저장을 <strong className="text-text">같은 트랜잭션</strong>으로 묶습니다</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="font-mono text-xs bg-es-blue/15 text-es-blue px-3 py-1 rounded-lg shrink-0 w-20 text-center mt-0.5">Step B</div>
                <div>
                  <div className="text-sm font-medium text-text mb-1">이벤트 발행 (비동기)</div>
                  <div className="text-sm text-text-dim">별도의 스케줄러가 Outbox 테이블에서 미처리 이벤트를 읽어 ES에 반영합니다</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="font-mono text-xs bg-es-green/15 text-es-green px-3 py-1 rounded-lg shrink-0 w-20 text-center mt-0.5">Step C</div>
                <div>
                  <div className="text-sm font-medium text-text mb-1">처리 완료 마킹</div>
                  <div className="text-sm text-text-dim">ES 반영이 성공하면 Outbox 레코드를 &quot;처리 완료&quot;로 업데이트합니다</div>
                </div>
              </div>
            </div>
          </div>

          <CmdBlock label="JAVA" copyText={`// Outbox 엔티티
@Entity
@Table(name = "outbox_event")
public class OutboxEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String aggregateType;    // "Product"

    @Column(nullable = false)
    private String aggregateId;      // "42"

    @Column(nullable = false)
    private String eventType;        // "ProductCreated"

    @Column(columnDefinition = "TEXT", nullable = false)
    private String payload;          // JSON 직렬화된 이벤트

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OutboxStatus status;     // PENDING, PROCESSED, FAILED

    @Column(nullable = false)
    private LocalDateTime createdAt;

    private LocalDateTime processedAt;

    // Factory Method
    public static OutboxEvent create(
        String aggregateType,
        String aggregateId,
        String eventType,
        String payload
    ) {
        OutboxEvent event = new OutboxEvent();
        event.aggregateType = aggregateType;
        event.aggregateId = aggregateId;
        event.eventType = eventType;
        event.payload = payload;
        event.status = OutboxStatus.PENDING;
        event.createdAt = LocalDateTime.now();
        return event;
    }

    public void markProcessed() {
        this.status = OutboxStatus.PROCESSED;
        this.processedAt = LocalDateTime.now();
    }

    public void markFailed() {
        this.status = OutboxStatus.FAILED;
    }
}`}>
            <Cm>// Outbox 엔티티</Cm>{"\n"}
            <Kw>@Entity</Kw>{"\n"}
            <Kw>@Table</Kw>(name = <Kw>&quot;outbox_event&quot;</Kw>){"\n"}
            <Kw>public class</Kw> OutboxEvent {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>@Id</Kw>{"\n"}
            {"    "}<Kw>@GeneratedValue</Kw>(strategy = GenerationType.IDENTITY){"\n"}
            {"    "}<Kw>private</Kw> Long id;{"\n"}
            {"\n"}
            {"    "}<Kw>@Column</Kw>(nullable = <Kw>false</Kw>){"\n"}
            {"    "}<Kw>private</Kw> String aggregateType;    <Cm>// &quot;Product&quot;</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>@Column</Kw>(nullable = <Kw>false</Kw>){"\n"}
            {"    "}<Kw>private</Kw> String aggregateId;      <Cm>// &quot;42&quot;</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>@Column</Kw>(nullable = <Kw>false</Kw>){"\n"}
            {"    "}<Kw>private</Kw> String eventType;        <Cm>// &quot;ProductCreated&quot;</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>@Column</Kw>(columnDefinition = <Kw>&quot;TEXT&quot;</Kw>, nullable = <Kw>false</Kw>){"\n"}
            {"    "}<Kw>private</Kw> String payload;          <Cm>// JSON 직렬화된 이벤트</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>@Column</Kw>(nullable = <Kw>false</Kw>){"\n"}
            {"    "}<Kw>@Enumerated</Kw>(EnumType.STRING){"\n"}
            {"    "}<Kw>private</Kw> OutboxStatus status;     <Cm>// PENDING, PROCESSED, FAILED</Cm>{"\n"}
            {"\n"}
            {"    "}<Kw>@Column</Kw>(nullable = <Kw>false</Kw>){"\n"}
            {"    "}<Kw>private</Kw> LocalDateTime createdAt;{"\n"}
            {"\n"}
            {"    "}<Kw>private</Kw> LocalDateTime processedAt;{"\n"}
            {"\n"}
            {"    "}<Cm>// Factory Method</Cm>{"\n"}
            {"    "}<Kw>public static</Kw> OutboxEvent create({"\n"}
            {"        "}String aggregateType,{"\n"}
            {"        "}String aggregateId,{"\n"}
            {"        "}String eventType,{"\n"}
            {"        "}String payload{"\n"}
            {"    "}) {"{"}{"\n"}
            {"        "}OutboxEvent event = <Kw>new</Kw> OutboxEvent();{"\n"}
            {"        "}event.aggregateType = aggregateType;{"\n"}
            {"        "}event.aggregateId = aggregateId;{"\n"}
            {"        "}event.eventType = eventType;{"\n"}
            {"        "}event.payload = payload;{"\n"}
            {"        "}event.status = OutboxStatus.PENDING;{"\n"}
            {"        "}event.createdAt = LocalDateTime.now();{"\n"}
            {"        "}<Kw>return</Kw> event;{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Kw>public void</Kw> markProcessed() {"{"}{"\n"}
            {"        "}<Kw>this</Kw>.status = OutboxStatus.PROCESSED;{"\n"}
            {"        "}<Kw>this</Kw>.processedAt = LocalDateTime.now();{"\n"}
            {"    }"}{"\n"}
            {"\n"}
            {"    "}<Kw>public void</Kw> markFailed() {"{"}{"\n"}
            {"        "}<Kw>this</Kw>.status = OutboxStatus.FAILED;{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <CmdBlock label="JAVA" copyText={`// 서비스 — 같은 트랜잭션에서 Outbox 저장
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final OutboxEventRepository outboxEventRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public ProductResponse createProduct(CreateProductCommand command) {
        Product product = Product.create(
            command.name(), command.description(),
            command.price(), command.brand(), command.category()
        );
        Product saved = productRepository.save(product);

        // 같은 트랜잭션에서 Outbox 이벤트 저장
        OutboxEvent outboxEvent = OutboxEvent.create(
            "Product",
            String.valueOf(saved.getId()),
            "ProductCreated",
            objectMapper.writeValueAsString(ProductCreatedEvent.from(saved))
        );
        outboxEventRepository.save(outboxEvent);

        return ProductResponse.from(saved);
    }
}

// 스케줄러 — 미처리 이벤트 발행
@Component
@RequiredArgsConstructor
@Slf4j
public class OutboxEventProcessor {

    private final OutboxEventRepository outboxEventRepository;
    private final ProductSearchRepository productSearchRepository;
    private final ObjectMapper objectMapper;

    @Scheduled(fixedDelay = 1000)  // 1초마다 실행
    @Transactional
    public void processOutboxEvents() {
        List<OutboxEvent> pendingEvents = outboxEventRepository
            .findByStatusOrderByCreatedAtAsc(OutboxStatus.PENDING);

        for (OutboxEvent event : pendingEvents) {
            try {
                if ("ProductCreated".equals(event.getEventType())) {
                    ProductCreatedEvent payload = objectMapper
                        .readValue(event.getPayload(), ProductCreatedEvent.class);
                    productSearchRepository.save(ProductDocument.from(payload));
                }
                event.markProcessed();
                log.info("Outbox 이벤트 처리 완료: id={}", event.getId());
            } catch (Exception e) {
                event.markFailed();
                log.error("Outbox 이벤트 처리 실패: id={}", event.getId(), e);
            }
        }
    }
}`}>
            <Cm>// 서비스 — 같은 트랜잭션에서 Outbox 저장</Cm>{"\n"}
            <Kw>@Service</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>public class</Kw> ProductService {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>private final</Kw> ProductRepository productRepository;{"\n"}
            {"    "}<Kw>private final</Kw> OutboxEventRepository outboxEventRepository;{"\n"}
            {"    "}<Kw>private final</Kw> ObjectMapper objectMapper;{"\n"}
            {"\n"}
            {"    "}<Kw>@Transactional</Kw>{"\n"}
            {"    "}<Kw>public</Kw> ProductResponse createProduct(CreateProductCommand command) {"{"}{"\n"}
            {"        "}Product product = Product.create({"\n"}
            {"            "}command.name(), command.description(),{"\n"}
            {"            "}command.price(), command.brand(), command.category(){"\n"}
            {"        "});{"\n"}
            {"        "}Product saved = productRepository.save(product);{"\n"}
            {"\n"}
            {"        "}<Cm>// 같은 트랜잭션에서 Outbox 이벤트 저장</Cm>{"\n"}
            {"        "}OutboxEvent outboxEvent = OutboxEvent.create({"\n"}
            {"            "}<Kw>&quot;Product&quot;</Kw>,{"\n"}
            {"            "}String.valueOf(saved.getId()),{"\n"}
            {"            "}<Kw>&quot;ProductCreated&quot;</Kw>,{"\n"}
            {"            "}objectMapper.writeValueAsString(ProductCreatedEvent.from(saved)){"\n"}
            {"        "});{"\n"}
            {"        "}outboxEventRepository.save(outboxEvent);{"\n"}
            {"\n"}
            {"        "}<Kw>return</Kw> ProductResponse.from(saved);{"\n"}
            {"    }"}{"\n"}
            {"}"}{"\n"}
            {"\n"}
            <Cm>// 스케줄러 — 미처리 이벤트 발행</Cm>{"\n"}
            <Kw>@Component</Kw>{"\n"}
            <Kw>@RequiredArgsConstructor</Kw>{"\n"}
            <Kw>@Slf4j</Kw>{"\n"}
            <Kw>public class</Kw> OutboxEventProcessor {"{"}{"\n"}
            {"\n"}
            {"    "}<Kw>private final</Kw> OutboxEventRepository outboxEventRepository;{"\n"}
            {"    "}<Kw>private final</Kw> ProductSearchRepository productSearchRepository;{"\n"}
            {"    "}<Kw>private final</Kw> ObjectMapper objectMapper;{"\n"}
            {"\n"}
            {"    "}<Kw>@Scheduled</Kw>(fixedDelay = 1000)  <Cm>// 1초마다 실행</Cm>{"\n"}
            {"    "}<Kw>@Transactional</Kw>{"\n"}
            {"    "}<Kw>public void</Kw> processOutboxEvents() {"{"}{"\n"}
            {"        "}List{`<`}OutboxEvent{`>`} pendingEvents = outboxEventRepository{"\n"}
            {"            "}.findByStatusOrderByCreatedAtAsc(OutboxStatus.PENDING);{"\n"}
            {"\n"}
            {"        "}<Kw>for</Kw> (OutboxEvent event : pendingEvents) {"{"}{"\n"}
            {"            "}<Kw>try</Kw> {"{"}{"\n"}
            {"                "}<Kw>if</Kw> (<Kw>&quot;ProductCreated&quot;</Kw>.equals(event.getEventType())) {"{"}{"\n"}
            {"                    "}ProductCreatedEvent payload = objectMapper{"\n"}
            {"                        "}.readValue(event.getPayload(), ProductCreatedEvent.class);{"\n"}
            {"                    "}productSearchRepository.save(ProductDocument.from(payload));{"\n"}
            {"                }"}{"\n"}
            {"                "}event.markProcessed();{"\n"}
            {"                "}log.info(<Kw>&quot;Outbox 이벤트 처리 완료: id={}&quot;</Kw>, event.getId());{"\n"}
            {"            }"} <Kw>catch</Kw> (Exception e) {"{"}{"\n"}
            {"                "}event.markFailed();{"\n"}
            {"                "}log.error(<Kw>&quot;Outbox 이벤트 처리 실패: id={}&quot;</Kw>, event.getId(), e);{"\n"}
            {"            }"}{"\n"}
            {"        }"}{"\n"}
            {"    }"}{"\n"}
            {"}"}
          </CmdBlock>

          <ExplainCallout title="Outbox 패턴이 신뢰성을 보장하는 이유">
            <ul>
              <li><strong>같은 트랜잭션</strong> — Product 저장과 Outbox 이벤트 저장이 하나의 MySQL 트랜잭션입니다. 둘 다 성공하거나 둘 다 실패합니다</li>
              <li><strong>이벤트 유실 방지</strong> — 서버가 죽어도 Outbox 테이블에 이벤트가 남아있으므로, 재시작 후 미처리 이벤트를 다시 처리할 수 있습니다</li>
              <li><strong>재시도 가능</strong> — FAILED 상태의 이벤트를 주기적으로 재시도할 수 있습니다</li>
              <li><strong>모니터링</strong> — Outbox 테이블을 조회하면 동기화 상태를 한눈에 파악할 수 있습니다</li>
            </ul>
          </ExplainCallout>

          <Checkpoint>Outbox 패턴의 핵심인 &quot;같은 트랜잭션에서 이벤트 저장 → 비동기로 ES 반영&quot; 흐름을 이해했으면 성공!</Checkpoint>
        </LabStep>
      </LabSection>

      <SectionDivider />

      {/* ═══════ PART 5 — 이론: CDC (Debezium) ═══════ */}
      <Section>
        <SectionLabel>Part 5 · Theory</SectionLabel>
        <SectionTitle>CDC (Debezium) 아키텍처<br />— 가장 안정적인 동기화</SectionTitle>

        <p className="text-text-dim text-lg mb-6">
          <strong className="text-text">CDC(Change Data Capture)</strong>는 데이터베이스의 변경 사항을 실시간으로 캡처하는 기술입니다. MySQL의 <strong className="text-text">binlog</strong>를 읽어서 데이터 변경을 감지하므로, 애플리케이션 코드를 전혀 수정하지 않아도 됩니다.
        </p>

        <p className="text-text-dim text-lg mb-10">
          <strong className="text-text">Debezium</strong>은 가장 널리 사용되는 오픈소스 CDC 플랫폼으로, Kafka Connect 기반으로 동작합니다.
        </p>

        {/* Step 6: Debezium 아키텍처 */}
        <div className="bg-surface border border-border rounded-2xl p-8 my-10 overflow-hidden">
          <h3 className="font-mono text-sm text-accent mb-6 tracking-wide">Debezium CDC 아키텍처</h3>

          {/* 파이프라인 시각화 */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 max-md:flex-col max-md:items-stretch">
            {/* MySQL */}
            <div className="bg-es-purple/10 border border-es-purple/20 rounded-xl p-5 text-center shrink-0 min-w-[140px]">
              <div className="font-mono text-sm font-semibold text-es-purple mb-1">MySQL</div>
              <div className="font-mono text-xs text-text-dim">binlog 활성화</div>
              <div className="font-mono text-[0.65rem] text-text-dim mt-2 bg-surface-2 rounded px-2 py-1">INSERT / UPDATE<br />/ DELETE</div>
            </div>

            <div className="text-text-dim text-xl shrink-0 max-md:text-center max-md:rotate-90">&rarr;</div>

            {/* Debezium */}
            <div className="bg-es-orange/10 border border-es-orange/20 rounded-xl p-5 text-center shrink-0 min-w-[140px]">
              <div className="font-mono text-sm font-semibold text-es-orange mb-1">Debezium</div>
              <div className="font-mono text-xs text-text-dim">Source Connector</div>
              <div className="font-mono text-[0.65rem] text-text-dim mt-2 bg-surface-2 rounded px-2 py-1">binlog 읽기<br />→ 이벤트 변환</div>
            </div>

            <div className="text-text-dim text-xl shrink-0 max-md:text-center max-md:rotate-90">&rarr;</div>

            {/* Kafka */}
            <div className="bg-es-blue/10 border border-es-blue/20 rounded-xl p-5 text-center shrink-0 min-w-[140px]">
              <div className="font-mono text-sm font-semibold text-es-blue mb-1">Kafka</div>
              <div className="font-mono text-xs text-text-dim">Topic: db.products</div>
              <div className="font-mono text-[0.65rem] text-text-dim mt-2 bg-surface-2 rounded px-2 py-1">이벤트 버퍼링<br />내구성 보장</div>
            </div>

            <div className="text-text-dim text-xl shrink-0 max-md:text-center max-md:rotate-90">&rarr;</div>

            {/* ES Sink Connector */}
            <div className="bg-es-green/10 border border-es-green/20 rounded-xl p-5 text-center shrink-0 min-w-[140px]">
              <div className="font-mono text-sm font-semibold text-es-green mb-1">ES Sink</div>
              <div className="font-mono text-xs text-text-dim">Connector</div>
              <div className="font-mono text-[0.65rem] text-text-dim mt-2 bg-surface-2 rounded px-2 py-1">Kafka 소비<br />→ ES 색인</div>
            </div>

            <div className="text-text-dim text-xl shrink-0 max-md:text-center max-md:rotate-90">&rarr;</div>

            {/* Elasticsearch */}
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 text-center shrink-0 min-w-[140px]">
              <div className="font-mono text-sm font-semibold text-accent mb-1">Elasticsearch</div>
              <div className="font-mono text-xs text-text-dim">검색용 인덱스</div>
              <div className="font-mono text-[0.65rem] text-text-dim mt-2 bg-surface-2 rounded px-2 py-1">실시간 검색<br />서비스 제공</div>
            </div>
          </div>
        </div>

        <ExplainCallout title="CDC(Debezium)의 핵심 특징">
          <ul>
            <li><strong>코드 침투 제로</strong> — 애플리케이션 코드를 전혀 수정하지 않아도 됩니다. MySQL binlog를 직접 읽으니까요</li>
            <li><strong>모든 변경 캡처</strong> — INSERT, UPDATE, DELETE를 모두 감지합니다. 직접 SQL로 데이터를 수정해도 캡처됩니다</li>
            <li><strong>Kafka의 내구성</strong> — Kafka가 이벤트를 버퍼링하므로, ES가 잠시 다운되어도 이벤트가 유실되지 않습니다</li>
            <li><strong>확장성</strong> — Kafka Consumer를 추가하면 ES 외에 Redis, 분석 시스템 등에도 동시에 동기화할 수 있습니다</li>
          </ul>
        </ExplainCallout>

        <WarnCallout title="CDC 도입 시 고려사항">
          <p>Debezium은 가장 안정적이지만, <strong>Kafka 클러스터</strong>와 <strong>Kafka Connect</strong> 인프라가 필요합니다. 소규모 서비스에서 처음부터 도입하기에는 인프라 운영 부담이 클 수 있습니다. 서비스 규모가 커지고, 여러 시스템 간 데이터 동기화가 필요할 때 도입을 검토하세요.</p>
        </WarnCallout>

        {/* 전략 선택 가이드 QaBox */}
        <QaBox question="어떤 전략을 선택해야 하나요?">
          <p>정답은 없지만, 상황에 따른 일반적인 추천은 다음과 같습니다.</p>

          <div className="space-y-4 mt-4">
            <div className="bg-surface-2 rounded-lg p-4 border border-border">
              <div className="font-mono text-xs text-es-orange mb-2">프로토타입 / MVP / 소규모 서비스</div>
              <p className="text-sm text-text-dim mb-0"><strong className="text-text">Dual Write</strong>로 시작하세요. 구현이 가장 간단하고, 데이터 양이 적으면 불일치 리스크도 낮습니다. 문제가 생기면 전체 재색인으로 복구하면 됩니다.</p>
            </div>

            <div className="bg-surface-2 rounded-lg p-4 border border-border">
              <div className="font-mono text-xs text-es-purple mb-2">중소규모 Spring 기반 서비스</div>
              <p className="text-sm text-text-dim mb-0"><strong className="text-text">Application Event + Outbox 패턴</strong>을 추천합니다. Spring 생태계와 자연스럽게 통합되고, 이벤트 유실도 방지할 수 있습니다. Kafka 없이도 충분히 안정적입니다.</p>
            </div>

            <div className="bg-surface-2 rounded-lg p-4 border border-border">
              <div className="font-mono text-xs text-es-green mb-2">대규모 서비스 / MSA 환경</div>
              <p className="text-sm text-text-dim mb-0"><strong className="text-text">CDC (Debezium)</strong>가 정답에 가깝습니다. 코드 침투가 없으므로 여러 서비스에서 동일한 파이프라인을 재사용할 수 있고, Kafka의 내구성으로 데이터 유실 걱정이 없습니다.</p>
            </div>

            <div className="bg-surface-2 rounded-lg p-4 border border-border">
              <div className="font-mono text-xs text-es-blue mb-2">배치 마이그레이션 / 초기 데이터 동기화</div>
              <p className="text-sm text-text-dim mb-0"><strong className="text-text">Logstash JDBC</strong>가 적합합니다. 기존에 쌓여 있는 대량 데이터를 ES로 옮길 때, 코드 변경 없이 설정만으로 동기화할 수 있습니다.</p>
            </div>
          </div>

          <p className="mt-4 text-sm text-text-dim">
            <strong className="text-text">실무 팁:</strong> 많은 팀이 <strong className="text-text">Application Event</strong>로 시작한 뒤, 서비스가 성장하면서 <strong className="text-text">CDC</strong>로 전환합니다. 처음부터 완벽한 구조를 만들려 하지 말고, 현재 규모에 맞는 전략을 선택한 후 점진적으로 개선하는 것이 좋습니다.
          </p>
        </QaBox>

        {/* 마무리 비교 다이어그램 */}
        <div className="bg-surface border border-border rounded-2xl p-8 my-10">
          <h3 className="font-mono text-sm text-accent mb-6 tracking-wide">발전 경로: 간단한 것에서 안정적인 것으로</h3>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            <div className="text-center shrink-0">
              <div className="bg-es-orange/10 border border-es-orange/20 rounded-lg px-4 py-3 mb-2">
                <div className="font-mono text-xs text-es-orange">Dual Write</div>
              </div>
              <div className="font-mono text-[0.6rem] text-text-dim">간단</div>
            </div>
            <div className="text-text-dim shrink-0">&rarr;</div>
            <div className="text-center shrink-0">
              <div className="bg-es-purple/10 border border-es-purple/20 rounded-lg px-4 py-3 mb-2">
                <div className="font-mono text-xs text-es-purple">App Event</div>
              </div>
              <div className="font-mono text-[0.6rem] text-text-dim">분리</div>
            </div>
            <div className="text-text-dim shrink-0">&rarr;</div>
            <div className="text-center shrink-0">
              <div className="bg-es-blue/10 border border-es-blue/20 rounded-lg px-4 py-3 mb-2">
                <div className="font-mono text-xs text-es-blue">+ Outbox</div>
              </div>
              <div className="font-mono text-[0.6rem] text-text-dim">신뢰성</div>
            </div>
            <div className="text-text-dim shrink-0">&rarr;</div>
            <div className="text-center shrink-0">
              <div className="bg-es-green/10 border border-es-green/20 rounded-lg px-4 py-3 mb-2">
                <div className="font-mono text-xs text-es-green">CDC</div>
              </div>
              <div className="font-mono text-[0.6rem] text-text-dim">엔터프라이즈</div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

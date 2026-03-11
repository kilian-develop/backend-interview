import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'
import { CodeBlock } from '../../components/doc/CodeBlock'

const CSS = `
.dms-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.dms-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.dms-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.dms-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.dms-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.dms-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.dms-param:hover { transform:translateY(-3px); }
.dms-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.dms-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.dms-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.dms-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.dms-table { width:100%; border-collapse:collapse; font-size:12px; }
.dms-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.dms-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.dms-table tr:last-child td { border-bottom:none; }
.dms-step-list { display:flex; flex-direction:column; gap:10px; }
.dms-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.dms-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.dms-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.dms-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .dms-compare-grid{ grid-template-columns:1fr; } }
`

export default function DbMigrationSchema() {
  useInjectCSS('style-db-migration-schema', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="Flyway · Liquibase · Online DDL · gh-ost · Expand & Contract · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>DB 마이그레이션</span> & 스키마 변경</>}
          description="스키마 마이그레이션 도구, Zero-downtime 스키마 변경, 대용량 ALTER TABLE 전략, 데이터 이관, 롤백 안전 장치"
        />

        {/* ── 스키마 마이그레이션이란 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>스키마 마이그레이션 (Schema Migration)</SectionTitle>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#06b6d4' }}>왜 마이그레이션 도구가 필요한가?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">📋</span>
                <span>애플리케이션 코드는 Git으로 버전 관리하면서 <strong style={{ color: '#ef4444' }}>DB 스키마는 수동 SQL로 관리</strong>하면 개발/스테이징/운영 환경 간 스키마가 불일치하고, 누가 언제 무엇을 변경했는지 추적이 불가능합니다.</span>
              </div>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">🔄</span>
                <span><strong style={{ color: '#e2e8f0' }}>스키마 마이그레이션 도구</strong>는 DB 변경 이력을 <strong style={{ color: '#06b6d4' }}>코드로 관리</strong>하고, 순서대로 자동 실행하며, 모든 환경에서 동일한 스키마를 보장합니다. "DB 스키마의 Git"이라고 이해하면 됩니다.</span>
              </div>
            </div>
          </div>

          {/* 마이그레이션 동작 흐름 다이어그램 */}
          <DiagramContainer title="스키마 마이그레이션 동작 흐름">
            <DiagramFlow>
              <DiagramGroup label="Migration Files" color="#06b6d4">
                <DiagramNode icon="📄" label="V1__init.sql" sub="테이블 생성" color="#06b6d4" />
                <DiagramNode icon="📄" label="V2__add_col.sql" sub="컬럼 추가" color="#3b82f6" />
                <DiagramNode icon="📄" label="V3__index.sql" sub="인덱스 생성" color="#a855f7" />
              </DiagramGroup>
              <DiagramArrow label="순서대로 실행" color="#f59e0b" animated />
              <DiagramGroup label="Database" color="#22c55e">
                <DiagramNode icon="🗄️" label="Schema" sub="현재 V2 적용 완료" color="#22c55e" />
                <DiagramNode icon="📊" label="History Table" sub="실행 이력 기록" color="#f59e0b" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <div className="dms-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#22c55e' }}>핵심 원칙</span></div>
            <div className="dms-step-list">
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#06b6d4' }}>버전 순서 보장</strong> — 마이그레이션 파일은 버전 번호 순으로 실행됩니다. V1 → V2 → V3 순서가 보장되므로 의존성 충돌이 없습니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>2</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#22c55e' }}>멱등성 (Idempotent)</strong> — 이미 실행된 마이그레이션은 재실행하지 않습니다. History 테이블에 실행 기록을 남겨 현재 버전을 추적합니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>3</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#f59e0b' }}>불변성</strong> — 한 번 실행된 마이그레이션 파일은 <strong style={{ color: '#ef4444' }}>절대 수정하지 않습니다.</strong> 변경이 필요하면 새 마이그레이션 파일을 추가합니다. Flyway는 체크섬으로 변경을 감지합니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>4</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#a855f7' }}>코드와 함께 배포</strong> — 마이그레이션 파일은 애플리케이션 코드와 같은 리포지토리에서 관리하고, 배포 시 자동 실행됩니다.
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> "DB 스키마 변경을 어떻게 관리하나요?"에는 <strong>"마이그레이션 도구로 코드 기반 버전 관리"</strong>라고 답해야 합니다. 핵심은 ①모든 환경에서 동일한 스키마 보장, ②변경 이력 추적 가능, ③배포 자동화와 통합, ④롤백 가능성 확보입니다. "운영 서버에 직접 ALTER TABLE을 실행합니다"는 위험한 답변입니다.
          </HighlightBox>
        </div>

        {/* ── Flyway vs Liquibase ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>Flyway vs Liquibase</SectionTitle>

          <div className="dms-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="dms-section-box">
              <div className="dms-section-subtitle"><span style={{ color: '#3b82f6' }}>Flyway</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">📝</span>
                  <span><strong style={{ color: '#e2e8f0' }}>SQL 파일 기반</strong> — 직접 SQL을 작성하므로 DB 네이티브 문법을 100% 활용 가능</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">🎯</span>
                  <span><strong style={{ color: '#e2e8f0' }}>단순한 철학</strong> — "SQL을 알면 사용할 수 있다". 학습 곡선이 낮고 설정이 간단</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">📂</span>
                  <span>파일명 규칙: <code style={{ color: '#3b82f6' }}>V1__Create_users.sql</code>, <code style={{ color: '#3b82f6' }}>V2__Add_email.sql</code></span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">⚙️</span>
                  <span>Spring Boot 기본 내장 (spring.flyway.* 설정)</span>
                </div>
              </div>
            </div>
            <div className="dms-section-box">
              <div className="dms-section-subtitle"><span style={{ color: '#a855f7' }}>Liquibase</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">📋</span>
                  <span><strong style={{ color: '#e2e8f0' }}>Changelog 기반</strong> — XML/YAML/JSON으로 변경 사항을 선언적으로 정의</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">🔄</span>
                  <span><strong style={{ color: '#e2e8f0' }}>DB 독립적</strong> — 같은 Changelog로 여러 DB 벤더 지원 (MySQL, PostgreSQL, Oracle 등)</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">↩️</span>
                  <span><strong style={{ color: '#22c55e' }}>자동 롤백 생성</strong> — 변경 타입에 따라 rollback SQL을 자동 생성</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">📊</span>
                  <span><strong style={{ color: '#a855f7' }}>diff 기능</strong> — 두 DB 간 스키마 차이를 자동 감지하여 Changelog 생성</span>
                </div>
              </div>
            </div>
          </div>

          <CodeBlock title="Flyway — SQL 기반 마이그레이션" lang="sql">{
`-- 파일: V1__Create_orders_table.sql
-- Flyway 버전 규칙: V{version}__{description}.sql

CREATE TABLE orders (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT       NOT NULL,
    total_price DECIMAL(12,2) NOT NULL,
    status      VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
    created_at  DATETIME(6)  NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    INDEX idx_orders_user_id (user_id),
    INDEX idx_orders_created_at (created_at)
);

-- 파일: V2__Add_shipping_address.sql
ALTER TABLE orders
ADD COLUMN shipping_address VARCHAR(500) NULL AFTER status;

-- 파일: V3__Add_cancelled_at.sql
ALTER TABLE orders
ADD COLUMN cancelled_at DATETIME(6) NULL;`
          }</CodeBlock>

          <CodeBlock title="Liquibase — YAML Changelog 기반" lang="yaml">{
`# 파일: db/changelog/changelog-master.yaml
databaseChangeLog:
  - changeSet:
      id: 1
      author: developer
      changes:
        - createTable:
            tableName: orders
            columns:
              - column:
                  name: id
                  type: BIGINT
                  autoIncrement: true
                  constraints:
                    primaryKey: true
              - column:
                  name: user_id
                  type: BIGINT
                  constraints:
                    nullable: false
              - column:
                  name: status
                  type: VARCHAR(20)
                  defaultValue: PENDING

  - changeSet:
      id: 2
      author: developer
      changes:
        - addColumn:
            tableName: orders
            columns:
              - column:
                  name: shipping_address
                  type: VARCHAR(500)
      rollback:
        - dropColumn:
            tableName: orders
            columnName: shipping_address`
          }</CodeBlock>

          <div className="dms-table-wrap" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <table className="dms-table">
              <thead>
                <tr>
                  <th>비교 항목</th>
                  <th style={{ color: '#3b82f6' }}>Flyway</th>
                  <th style={{ color: '#a855f7' }}>Liquibase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>정의 방식</strong></td>
                  <td>SQL 파일 (네이티브)</td>
                  <td>XML / YAML / JSON / SQL</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>학습 곡선</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>낮음</strong></td>
                  <td>보통</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>DB 독립성</strong></td>
                  <td><strong style={{ color: '#ef4444' }}>DB별 SQL 필요</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>추상화 제공</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>롤백</strong></td>
                  <td>수동 (별도 undo 파일)</td>
                  <td><strong style={{ color: '#22c55e' }}>자동 생성 가능</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>History 테이블</strong></td>
                  <td>flyway_schema_history</td>
                  <td>databasechangelog</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>Spring Boot 통합</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>기본 내장</strong></td>
                  <td>starter 추가 필요</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>적합한 상황</strong></td>
                  <td>단일 DB, SQL 직접 제어</td>
                  <td>멀티 DB 벤더, 엔터프라이즈</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#3b82f6">
            <strong>면접 포인트:</strong> "Flyway와 Liquibase 중 어떤 것을 선택하나요?"에는 <strong>프로젝트 상황에 따라 다르다</strong>고 답해야 합니다. ①단일 DB 벤더이고 SQL에 익숙하면 <strong>Flyway</strong>(단순, Spring Boot 기본), ②여러 DB를 지원해야 하거나 자동 롤백이 중요하면 <strong>Liquibase</strong>가 적합합니다. 가장 중요한 것은 "어떤 도구를 쓰든 <strong>스키마 변경을 코드로 관리</strong>하는 것" 자체입니다.
          </HighlightBox>
        </div>

        {/* ── Zero-downtime 스키마 변경 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>Zero-downtime 스키마 변경</SectionTitle>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#22c55e' }}>왜 무중단 변경이 어려운가?</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">⚠️</span>
                <span>전통적인 <code style={{ color: '#ef4444' }}>ALTER TABLE</code>은 테이블에 <strong style={{ color: '#ef4444' }}>메타데이터 락(MDL)</strong>을 잡아 DDL 실행 중 모든 DML(INSERT/UPDATE/SELECT)이 <strong style={{ color: '#ef4444' }}>블로킹</strong>됩니다. 대용량 테이블이면 수분~수시간 동안 서비스가 중단될 수 있습니다.</span>
              </div>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">🔄</span>
                <span>또한 <strong style={{ color: '#e2e8f0' }}>롤링 배포</strong> 중에는 <strong style={{ color: '#f59e0b' }}>구버전과 신버전 애플리케이션이 동시에 동작</strong>합니다. 컬럼 이름을 바꾸면 구버전이 오류를 일으키므로, 스키마 변경은 <strong style={{ color: '#06b6d4' }}>하위 호환성</strong>을 유지해야 합니다.</span>
              </div>
            </div>
          </div>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#06b6d4' }}>Expand & Contract 패턴</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">🎯</span>
                <span>스키마 변경을 <strong style={{ color: '#e2e8f0' }}>여러 단계로 나눠</strong> 배포하는 전략입니다. 각 단계에서 구버전 코드와 신버전 코드가 <strong style={{ color: '#22c55e' }}>동시에 동작 가능</strong>하도록 보장합니다.</span>
              </div>
            </div>
          </div>

          {/* Expand & Contract 다이어그램 */}
          <DiagramContainer title="Expand & Contract 패턴 — 컬럼 이름 변경 예시">
            <DiagramFlow>
              <DiagramGroup label="Phase 1: Expand" color="#22c55e">
                <DiagramNode icon="➕" label="새 컬럼 추가" sub="full_name 추가 (nullable)" color="#22c55e" />
                <DiagramNode icon="📝" label="양쪽 쓰기" sub="name + full_name 동시 기록" color="#3b82f6" />
              </DiagramGroup>
              <DiagramArrow label="데이터 이관" color="#f59e0b" animated />
              <DiagramGroup label="Phase 2: Migrate" color="#f59e0b">
                <DiagramNode icon="🔄" label="기존 데이터 복사" sub="name → full_name 배치 처리" color="#f59e0b" />
                <DiagramNode icon="🔀" label="코드 전환" sub="신버전: full_name만 사용" color="#a855f7" />
              </DiagramGroup>
              <DiagramArrow label="정리" color="#ef4444" animated />
              <DiagramGroup label="Phase 3: Contract" color="#ef4444">
                <DiagramNode icon="🗑️" label="이전 컬럼 제거" sub="name 컬럼 DROP" color="#ef4444" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <div className="dms-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#f59e0b' }}>단계별 상세</span></div>
            <div className="dms-step-list">
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>1</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#22c55e' }}>Expand (확장)</strong> — 새 컬럼/테이블을 <strong style={{ color: '#e2e8f0' }}>추가</strong>합니다. 기존 컬럼은 유지하고, 새 컬럼은 <strong style={{ color: '#e2e8f0' }}>NULL 허용</strong> 또는 기본값을 설정합니다. 이 단계에서 구버전 코드는 새 컬럼을 무시하면 되므로 안전합니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>2</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#3b82f6' }}>Dual Write (양쪽 쓰기)</strong> — 코드를 배포하여 <strong style={{ color: '#e2e8f0' }}>기존 컬럼과 새 컬럼 모두에 쓰기</strong>를 수행합니다. 이 단계에서 구버전은 기존 컬럼만, 신버전은 양쪽 모두 씁니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>3</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#f59e0b' }}>Migrate (이관)</strong> — 기존 데이터를 <strong style={{ color: '#e2e8f0' }}>배치로 새 컬럼에 복사</strong>합니다. 읽기도 새 컬럼으로 전환합니다. 모든 인스턴스가 신버전인지 확인합니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>4</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#ef4444' }}>Contract (축소)</strong> — 이전 컬럼/테이블을 <strong style={{ color: '#e2e8f0' }}>제거</strong>합니다. 모든 코드가 새 컬럼만 사용하는 것을 확인한 후 실행합니다. 이 단계는 보통 다음 배포 주기에 수행합니다.
                </div>
              </div>
            </div>
          </div>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#a855f7' }}>안전한 변경 vs 위험한 변경</span></div>
            <div className="dms-table-wrap">
              <table className="dms-table">
                <thead>
                  <tr>
                    <th>변경 유형</th>
                    <th style={{ color: '#22c55e' }}>안전 (하위 호환)</th>
                    <th style={{ color: '#ef4444' }}>위험 (서비스 영향)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>컬럼 추가</strong></td>
                    <td><strong style={{ color: '#22c55e' }}>NULL 허용 또는 기본값</strong></td>
                    <td><strong style={{ color: '#ef4444' }}>NOT NULL (기본값 없이)</strong></td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>컬럼 삭제</strong></td>
                    <td>코드에서 미사용 확인 후</td>
                    <td><strong style={{ color: '#ef4444' }}>사용 중인 컬럼 즉시 삭제</strong></td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>컬럼 이름 변경</strong></td>
                    <td>Expand & Contract로 단계적</td>
                    <td><strong style={{ color: '#ef4444' }}>RENAME COLUMN 직접</strong></td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>컬럼 타입 변경</strong></td>
                    <td>호환 가능한 확장 (VARCHAR 길이↑)</td>
                    <td><strong style={{ color: '#ef4444' }}>축소 (INT→SMALLINT)</strong></td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>인덱스 추가</strong></td>
                    <td><strong style={{ color: '#22c55e' }}>CREATE INDEX CONCURRENTLY</strong></td>
                    <td><strong style={{ color: '#ef4444' }}>일반 CREATE INDEX (락)</strong></td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#e2e8f0' }}>테이블 삭제</strong></td>
                    <td>코드 배포 후 다음 주기에</td>
                    <td><strong style={{ color: '#ef4444' }}>즉시 DROP TABLE</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> "운영 중인 테이블의 컬럼 이름을 바꿔야 합니다. 어떻게 하나요?"에 <strong>"RENAME COLUMN 한 줄이면 됩니다"</strong>는 위험한 답변입니다. 롤링 배포 환경에서는 구버전 코드가 이전 컬럼명을 사용하므로 즉시 오류가 발생합니다. <strong>Expand & Contract</strong>로 ①새 컬럼 추가 → ②양쪽 쓰기 → ③데이터 이관 → ④이전 컬럼 제거를 설명해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 대용량 ALTER TABLE ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>대용량 ALTER TABLE 전략</SectionTitle>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#ef4444' }}>대용량 테이블의 DDL 문제</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">⚠️</span>
                <span>수억 건의 테이블에 <code style={{ color: '#ef4444' }}>ALTER TABLE</code>을 실행하면 ①<strong style={{ color: '#ef4444' }}>테이블 복사(Table Copy)</strong>가 발생하여 디스크를 2배 사용하고, ②<strong style={{ color: '#ef4444' }}>MDL 락</strong>으로 DML이 블로킹되며, ③완료까지 <strong style={{ color: '#ef4444' }}>수시간</strong>이 걸릴 수 있습니다.</span>
              </div>
            </div>
          </div>

          <div className="dms-param-grid" style={{ marginBottom: '20px' }}>
            <div className="dms-param">
              <div className="dms-param-name" style={{ color: '#06b6d4' }}>MySQL Online DDL</div>
              <div className="dms-param-desc">
                MySQL 5.6+에서 지원. <code style={{ color: '#06b6d4' }}>ALGORITHM=INPLACE</code>로 테이블 복사 없이 변경 가능한 DDL이 있습니다. MySQL 8.0+의 <code style={{ color: '#06b6d4' }}>ALGORITHM=INSTANT</code>는 메타데이터만 변경하여 <strong style={{ color: '#e2e8f0' }}>즉시 완료</strong>됩니다.
              </div>
              <div className="dms-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>MySQL 내장</div>
            </div>
            <div className="dms-param">
              <div className="dms-param-name" style={{ color: '#f59e0b' }}>pt-online-schema-change</div>
              <div className="dms-param-desc">
                Percona Toolkit의 도구. <strong style={{ color: '#e2e8f0' }}>새 테이블 생성 → 트리거로 변경 캡처 → 데이터 복사 → 원본과 교체(RENAME)</strong>하는 방식. 복사 중에도 DML이 가능합니다.
              </div>
              <div className="dms-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>트리거 기반</div>
            </div>
            <div className="dms-param">
              <div className="dms-param-name" style={{ color: '#22c55e' }}>gh-ost (GitHub)</div>
              <div className="dms-param-desc">
                GitHub이 만든 도구. <strong style={{ color: '#e2e8f0' }}>Binlog를 읽어 변경을 캡처</strong>하는 방식으로 트리거가 불필요합니다. 실시간 트래픽 조절(throttling), 일시 중지/재개가 가능합니다.
              </div>
              <div className="dms-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Binlog 기반 · 트리거 없음</div>
            </div>
          </div>

          {/* gh-ost 동작 원리 다이어그램 */}
          <DiagramContainer title="gh-ost 동작 원리">
            <DiagramFlow>
              <DiagramNode icon="🗄️" label="원본 테이블" sub="orders (수억 건)" color="#06b6d4" />
              <DiagramArrow label="1. Ghost 테이블 생성" color="#22c55e" animated />
              <DiagramNode icon="🗄️" label="Ghost 테이블" sub="_orders_gho (새 스키마)" color="#22c55e" />
              <DiagramArrow label="2. 기존 데이터 복사" color="#f59e0b" animated />
              <DiagramNode icon="📋" label="Binlog 스트림" sub="실시간 변경 반영" color="#a855f7" />
              <DiagramArrow label="3. RENAME 교체" color="#ef4444" animated />
              <DiagramNode icon="✅" label="완료" sub="원본 ↔ Ghost 교체" color="#22c55e" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="dms-table-wrap" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <table className="dms-table">
              <thead>
                <tr>
                  <th>비교 항목</th>
                  <th style={{ color: '#06b6d4' }}>Online DDL</th>
                  <th style={{ color: '#f59e0b' }}>pt-osc</th>
                  <th style={{ color: '#22c55e' }}>gh-ost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>방식</strong></td>
                  <td>DB 엔진 내부</td>
                  <td>트리거 + 테이블 복사</td>
                  <td>Binlog + 테이블 복사</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>DML 블로킹</strong></td>
                  <td>INSTANT는 없음, INPLACE는 일부</td>
                  <td><strong style={{ color: '#22c55e' }}>없음</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>없음</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>트리거 필요</strong></td>
                  <td>아니오</td>
                  <td><strong style={{ color: '#ef4444' }}>예</strong></td>
                  <td><strong style={{ color: '#22c55e' }}>아니오</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>일시 중지/재개</strong></td>
                  <td>불가</td>
                  <td>불가</td>
                  <td><strong style={{ color: '#22c55e' }}>가능</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>트래픽 조절</strong></td>
                  <td>불가</td>
                  <td>제한적</td>
                  <td><strong style={{ color: '#22c55e' }}>실시간 조절</strong></td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>지원 DDL 범위</strong></td>
                  <td>INSTANT/INPLACE 가능한 것만</td>
                  <td>거의 모든 ALTER</td>
                  <td>거의 모든 ALTER</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>디스크 사용</strong></td>
                  <td>INSTANT: 0, INPLACE: 일부</td>
                  <td>테이블 크기만큼 추가</td>
                  <td>테이블 크기만큼 추가</td>
                </tr>
              </tbody>
            </table>
          </div>

          <CodeBlock title="MySQL Online DDL — ALGORITHM 선택" lang="sql">{
`-- INSTANT: 메타데이터만 변경, 즉시 완료 (MySQL 8.0+)
-- 지원: 컬럼 추가(마지막), 기본값 변경, ENUM 값 추가 등
ALTER TABLE orders ADD COLUMN memo VARCHAR(200) NULL, ALGORITHM=INSTANT;

-- INPLACE: 테이블 복사 없이 인플레이스 변경
-- 지원: 인덱스 추가/삭제, 컬럼 이름 변경 등
ALTER TABLE orders ADD INDEX idx_status (status), ALGORITHM=INPLACE, LOCK=NONE;

-- COPY: 테이블 전체 복사 (최후의 수단)
-- MDL 잠금으로 DML 블로킹 발생
ALTER TABLE orders MODIFY COLUMN status VARCHAR(50), ALGORITHM=COPY;

-- PostgreSQL: CREATE INDEX CONCURRENTLY (락 없이 인덱스 생성)
CREATE INDEX CONCURRENTLY idx_orders_status ON orders(status);`
          }</CodeBlock>

          <CodeBlock title="gh-ost 실행 예시" lang="bash">{
`# gh-ost로 대용량 테이블에 컬럼 추가 (무중단)
gh-ost \\
  --host=db-master.example.com \\
  --database=myapp \\
  --table=orders \\
  --alter="ADD COLUMN memo VARCHAR(200) NULL" \\
  --chunk-size=1000 \\               # 1000행씩 복사
  --max-load="Threads_running=25" \\ # DB 부하 임계치
  --critical-load="Threads_running=50" \\  # 초과 시 중단
  --throttle-control-replicas="replica1.example.com" \\
  --postpone-cut-over-flag-file=/tmp/ghost.postpone \\
  --execute

# 실행 중 일시 중지
# touch /tmp/ghost.postpone

# 실행 중 재개
# rm /tmp/ghost.postpone`
          }</CodeBlock>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> "수억 건 테이블에 컬럼을 추가해야 합니다. 어떻게 하나요?" → ①먼저 MySQL 8.0+의 <strong>ALGORITHM=INSTANT</strong>가 가능한지 확인 (NULL 허용 컬럼 추가는 INSTANT 가능), ②불가능하면 <strong>gh-ost</strong>를 사용하여 Binlog 기반 무중단 변경, ③트래픽이 높은 시간대를 피하고 <strong>max-load 설정으로 DB 부하를 모니터링</strong>하면서 실행합니다.
          </HighlightBox>
        </div>

        {/* ── 데이터 마이그레이션 전략 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#22c55e']}>데이터 마이그레이션 전략</SectionTitle>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#a855f7' }}>스키마 변경 + 데이터 이관</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">📦</span>
                <span>스키마 변경만으로 끝나지 않는 경우가 많습니다. 기존 데이터를 <strong style={{ color: '#e2e8f0' }}>새 형식으로 변환하여 채워넣는</strong> 데이터 마이그레이션이 함께 필요합니다. 대용량 데이터 이관은 단일 트랜잭션이 아닌 <strong style={{ color: '#06b6d4' }}>배치 단위</strong>로 처리해야 합니다.</span>
              </div>
            </div>
          </div>

          <div className="dms-param-grid" style={{ marginBottom: '20px' }}>
            <div className="dms-param">
              <div className="dms-param-name" style={{ color: '#06b6d4' }}>배치 이관 (Backfill)</div>
              <div className="dms-param-desc">
                Chunk 단위로 기존 데이터를 읽어 새 컬럼/테이블에 채우는 방식입니다. <strong style={{ color: '#e2e8f0' }}>WHERE id BETWEEN :start AND :end</strong>로 범위를 나누어 실행하고, 각 배치마다 커밋합니다.
              </div>
              <div className="dms-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>안전 · 제어 가능</div>
            </div>
            <div className="dms-param">
              <div className="dms-param-name" style={{ color: '#f59e0b' }}>듀얼 라이트 (Dual Write)</div>
              <div className="dms-param-desc">
                이관 기간 동안 <strong style={{ color: '#e2e8f0' }}>기존 + 신규 양쪽에 동시 쓰기</strong>를 수행합니다. 이관 완료 후 읽기를 전환하고, 최종적으로 기존 쪽을 제거합니다.
              </div>
              <div className="dms-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>무중단 전환</div>
            </div>
            <div className="dms-param">
              <div className="dms-param-name" style={{ color: '#a855f7' }}>CDC 기반 (Change Data Capture)</div>
              <div className="dms-param-desc">
                Debezium 등으로 DB 변경 이벤트를 <strong style={{ color: '#e2e8f0' }}>실시간 스트리밍</strong>하여 새 테이블/DB로 전파합니다. 초기 스냅샷 + 실시간 동기화로 다운타임 없이 이관합니다.
              </div>
              <div className="dms-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>실시간 · 대규모</div>
            </div>
          </div>

          <CodeBlock title="배치 Backfill — 안전한 데이터 이관" lang="java">{
`// Expand & Contract Phase 3: 기존 데이터를 새 컬럼으로 이관
// name → full_name 데이터 복사 (Chunk 단위)

public void backfillFullName(int chunkSize) {
    long lastId = 0;
    int totalUpdated = 0;

    while (true) {
        // Chunk 단위로 처리 (커넥션 장시간 점유 방지)
        int updated = jdbcTemplate.update(
            """
            UPDATE users
            SET full_name = name
            WHERE id > ? AND id <= ? AND full_name IS NULL
            """,
            lastId, lastId + chunkSize
        );

        totalUpdated += updated;
        lastId += chunkSize;

        // 더 이상 업데이트할 행이 없으면 종료
        if (updated == 0 && !hasMoreRows(lastId)) break;

        // DB 부하 조절을 위한 짧은 대기
        Thread.sleep(100);

        log.info("Backfill progress: {} rows updated, lastId={}", totalUpdated, lastId);
    }

    log.info("Backfill completed: {} total rows updated", totalUpdated);
}`
          }</CodeBlock>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> 데이터 마이그레이션에서 가장 중요한 원칙은 <strong>"한 번에 전부 하지 않는 것"</strong>입니다. 단일 UPDATE로 수억 건을 변경하면 ①<strong>긴 트랜잭션으로 Undo Log 폭증</strong>, ②레플리케이션 지연, ③Lock 경합이 발생합니다. <strong>Chunk 단위</strong>로 나누고, 각 배치 사이에 sleep을 넣어 DB 부하를 조절하며, <strong>진행 상황을 로깅</strong>하여 모니터링해야 합니다.
          </HighlightBox>
        </div>

        {/* ── 롤백 전략 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>롤백 전략 & 안전 장치</SectionTitle>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#f59e0b' }}>마이그레이션 롤백이 어려운 이유</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="dms-feature-row">
                <span className="dms-feature-icon">⚠️</span>
                <span>스키마 변경의 롤백은 코드 롤백보다 훨씬 어렵습니다. <strong style={{ color: '#ef4444' }}>DROP COLUMN은 되돌릴 수 없고</strong>, 데이터 타입 변경은 데이터 손실을 수반할 수 있으며, 대용량 테이블의 역방향 ALTER는 또 다시 긴 시간이 걸립니다.</span>
              </div>
            </div>
          </div>

          <div className="dms-section-box" style={{ marginBottom: '20px' }}>
            <div className="dms-section-subtitle"><span style={{ color: '#22c55e' }}>안전 장치 체크리스트</span></div>
            <div className="dms-step-list">
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>1</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#06b6d4' }}>항상 Forward-only 마이그레이션 설계</strong> — 롤백이 필요하면 "역방향 마이그레이션 파일"을 새로 추가합니다. 실행된 마이그레이션을 수정하거나 삭제하지 않습니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>2</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#22c55e' }}>스테이징 환경에서 먼저 실행</strong> — 운영과 동일한 데이터 규모의 스테이징에서 마이그레이션을 테스트합니다. 실행 시간, 락 영향, 디스크 사용량을 측정합니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>3</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#f59e0b' }}>백업 후 실행</strong> — DDL 실행 전 논리적 백업(mysqldump) 또는 스냅샷을 생성합니다. 최악의 경우 백업에서 복원할 수 있어야 합니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>4</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#a855f7' }}>피처 플래그와 병행</strong> — 스키마 변경에 의존하는 코드를 <strong style={{ color: '#e2e8f0' }}>피처 플래그</strong>로 제어합니다. 문제 발생 시 플래그만 끄면 이전 코드 경로로 즉시 전환됩니다.
                </div>
              </div>
              <div className="dms-step">
                <div className="dms-step-num" style={{ background: 'rgba(239,68,68,0.15)', color: '#ef4444' }}>5</div>
                <div className="dms-step-content">
                  <strong style={{ color: '#ef4444' }}>Contract 단계는 지연</strong> — 이전 컬럼/테이블 삭제(Contract)는 충분한 기간(1~2주) 대기 후 실행합니다. 문제가 발견되면 아직 이전 데이터가 남아 있으므로 롤백이 용이합니다.
                </div>
              </div>
            </div>
          </div>

          <div className="dms-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="dms-section-box">
              <div className="dms-section-subtitle"><span style={{ color: '#22c55e' }}>롤백 가능한 변경</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>컬럼 추가</strong> → DROP COLUMN으로 제거</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>인덱스 추가</strong> → DROP INDEX로 제거</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>테이블 생성</strong> → DROP TABLE로 제거</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>기본값 변경</strong> → ALTER COLUMN SET DEFAULT</span>
                </div>
              </div>
            </div>
            <div className="dms-section-box">
              <div className="dms-section-subtitle"><span style={{ color: '#ef4444' }}>롤백 불가/어려운 변경</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>컬럼 삭제</strong> → 데이터 복구 불가 (백업 필요)</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>타입 축소</strong> → 데이터 잘림 발생 가능</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>테이블 삭제</strong> → 전체 데이터 손실</span>
                </div>
                <div className="dms-feature-row">
                  <span className="dms-feature-icon">❌</span>
                  <span><strong style={{ color: '#ef4444' }}>NOT NULL 제약</strong> → NULL 데이터가 있으면 역 적용 복잡</span>
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> "마이그레이션이 실패하면 어떻게 롤백하나요?"에는 <strong>"롤백이 필요 없도록 설계하는 것이 최선"</strong>이라고 답합니다. Expand & Contract를 사용하면 각 단계가 <strong>하위 호환</strong>이므로 코드를 롤백하더라도 스키마는 문제없습니다. Contract(삭제) 단계를 충분히 지연시키면 롤백 기간 동안 이전 데이터가 보존됩니다.
          </HighlightBox>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: 'DB 스키마 변경을 어떻게 관리하나요?',
                a: 'Flyway나 Liquibase 같은 마이그레이션 도구를 사용하여 스키마 변경을 코드(SQL 파일)로 버전 관리합니다. 마이그레이션 파일은 버전 순으로 자동 실행되며, History 테이블에 실행 이력을 기록하여 멱등성을 보장합니다. 모든 환경(개발/스테이징/운영)에서 동일한 스키마를 유지할 수 있고, 변경 이력이 Git으로 추적됩니다.',
              },
              {
                q: 'Flyway와 Liquibase의 차이점은 무엇인가요?',
                a: 'Flyway는 SQL 파일 기반으로 DB 네이티브 문법을 직접 사용하며 학습 곡선이 낮고 Spring Boot에 기본 내장되어 있습니다. Liquibase는 XML/YAML로 선언적으로 정의하여 여러 DB 벤더를 동시 지원할 수 있고, 자동 롤백 생성과 DB 간 diff 기능을 제공합니다. 단일 DB면 Flyway, 멀티 DB 환경이면 Liquibase가 적합합니다.',
              },
              {
                q: '운영 중인 테이블의 컬럼 이름을 안전하게 변경하려면 어떻게 해야 하나요?',
                a: 'Expand & Contract 패턴을 사용합니다. ①Expand: 새 컬럼을 추가(NULL 허용)하고 코드에서 양쪽 모두에 쓰기, ②Migrate: 기존 데이터를 배치로 새 컬럼에 복사하고 읽기를 전환, ③Contract: 모든 인스턴스가 신버전인 것을 확인한 후 다음 배포 주기에 이전 컬럼을 삭제합니다. 롤링 배포 중 구버전과 신버전이 동시에 동작해도 안전합니다.',
              },
              {
                q: '수억 건 테이블에 컬럼을 추가해야 합니다. 어떻게 하나요?',
                a: '먼저 MySQL 8.0+의 ALGORITHM=INSTANT로 가능한지 확인합니다. NULL 허용 컬럼 추가는 INSTANT로 메타데이터만 변경하여 즉시 완료됩니다. 불가능한 DDL이라면 gh-ost를 사용합니다. gh-ost는 Binlog를 읽어 변경을 캡처하므로 트리거가 불필요하고, 실시간 트래픽 조절과 일시 중지/재개가 가능하여 운영 부하를 제어할 수 있습니다.',
              },
              {
                q: 'gh-ost와 pt-online-schema-change의 차이점은?',
                a: 'pt-osc는 원본 테이블에 트리거를 설치하여 변경을 캡처하는 반면, gh-ost는 Binlog 스트림을 읽어 변경을 반영합니다. gh-ost의 장점은 ①트리거로 인한 DML 성능 저하가 없고, ②실행 중 일시 중지/재개가 가능하며, ③max-load 설정으로 DB 부하를 실시간 모니터링하면서 자동 조절(throttling)할 수 있다는 점입니다.',
              },
              {
                q: '대량 데이터를 새 컬럼으로 이관(Backfill)할 때 주의할 점은?',
                a: '단일 UPDATE로 수억 건을 변경하면 안 됩니다. ①Chunk 단위(1000~5000건)로 나누어 배치 처리, ②각 배치 사이에 sleep으로 DB 부하 조절, ③WHERE id BETWEEN으로 범위 지정하여 Lock 범위 최소화, ④진행 상황 로깅으로 모니터링, ⑤레플리카 지연 모니터링하여 지연이 심하면 배치 간격 조절이 필요합니다.',
              },
              {
                q: '마이그레이션이 실패하면 어떻게 롤백하나요?',
                a: '가장 좋은 전략은 롤백이 필요 없도록 설계하는 것입니다. Expand & Contract 패턴으로 각 단계가 하위 호환을 유지하면, 코드를 롤백해도 스키마는 문제없습니다. Contract(삭제) 단계는 1~2주 지연시켜 롤백 기간을 확보합니다. 추가적으로 스테이징 환경에서 사전 테스트, 실행 전 백업, 피처 플래그를 통한 코드 경로 전환이 안전 장치가 됩니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

import HeroSection from '../../components/doc/HeroSection'
import SectionTitle from '../../components/doc/SectionTitle'
import HighlightBox from '../../components/doc/HighlightBox'
import InterviewQuestions from '../../components/doc/InterviewQuestions'
import { useInjectCSS } from '../../hooks/useInjectCSS'
import { DiagramContainer, DiagramNode, DiagramArrow, DiagramFlow, DiagramGroup } from '../../components/doc/Diagram'

const CSS = `
.rd-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:16px; }
.rd-card { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:22px; transition:transform .2s, box-shadow .2s; }
.rd-card:hover { transform:translateY(-3px); box-shadow:0 10px 30px rgba(6,182,212,0.08); }
.rd-card-title { font-size:15px; font-weight:800; margin-bottom:6px; }
.rd-card-desc { font-size:12px; color:#94a3b8; line-height:1.8; }
.rd-card-badge { display:inline-flex; padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700; font-family:'JetBrains Mono',monospace; margin-bottom:10px; }
.rd-section-box { background:#0e1118; border:1px solid #1a2234; border-radius:16px; padding:24px; }
.rd-section-subtitle { font-size:14px; font-weight:700; color:#cbd5e1; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
.rd-feature-row { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:#94a3b8; padding:10px 14px; background:rgba(255,255,255,0.02); border-radius:8px; line-height:1.7; }
.rd-feature-icon { flex-shrink:0; font-size:16px; margin-top:2px; }
.rd-param-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:14px; }
.rd-param { background:#0e1118; border:1px solid #1a2234; border-radius:14px; padding:20px; transition:transform .2s; }
.rd-param:hover { transform:translateY(-3px); }
.rd-param-name { font-size:13px; font-weight:800; font-family:'JetBrains Mono',monospace; margin-bottom:6px; }
.rd-param-desc { font-size:12px; color:#5a6a85; line-height:1.7; margin-bottom:8px; }
.rd-param-val { font-size:10px; padding:3px 8px; border-radius:6px; font-weight:600; display:inline-flex; }
.rd-table-wrap { overflow-x:auto; border-radius:14px; border:1px solid #1a2234; }
.rd-table { width:100%; border-collapse:collapse; font-size:12px; }
.rd-table th { padding:10px 14px; text-align:center; background:#0a0e17; color:#64748b; font-weight:700; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; border-bottom:1px solid #1a2234; }
.rd-table td { padding:10px 14px; border-bottom:1px solid rgba(26,34,52,0.5); color:#94a3b8; text-align:center; }
.rd-table tr:last-child td { border-bottom:none; }
.rd-step-list { display:flex; flex-direction:column; gap:10px; }
.rd-step { display:flex; align-items:flex-start; gap:12px; padding:12px 16px; background:rgba(255,255,255,0.02); border-radius:10px; }
.rd-step-num { flex-shrink:0; width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; font-family:'JetBrains Mono',monospace; }
.rd-step-content { font-size:12px; color:#94a3b8; line-height:1.8; }
.rd-compare-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
@media(max-width:640px){ .rd-compare-grid{ grid-template-columns:1fr; } }
.rd-rel-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; }
.rd-rel-card { display:flex; align-items:flex-start; gap:10px; padding:14px 16px; background:rgba(255,255,255,0.02); border-radius:10px; border:1px solid #1a2234; }
.rd-rel-icon { flex-shrink:0; font-size:18px; margin-top:1px; }
.rd-rel-label { font-size:12px; font-weight:700; color:#e2e8f0; margin-bottom:2px; }
.rd-rel-desc { font-size:11px; color:#5a6a85; line-height:1.6; }
`

export default function RdbmsOverview() {
  useInjectCSS('style-rdbms-overview', CSS)

  return (
    <>
      <div className="doc-bg-overlay" style={{ background: 'radial-gradient(ellipse 60% 40% at 20% 20%, rgba(6,182,212,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%)' }} />
      <div className="doc-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection
          tag="RDBMS · Relational Model · SQL · 면접 심화"
          title={<><span style={{ color: '#06b6d4' }}>RDBMS</span> 개요</>}
          description="관계형 데이터베이스의 핵심 개념 - 관계 모델, 키와 제약조건, 내부 아키텍처, SQL vs NoSQL 비교"
        />

        {/* ── RDBMS란 무엇인가 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#22c55e']}>RDBMS란 무엇인가</SectionTitle>

          <div className="rd-section-box" style={{ marginBottom: '20px' }}>
            <div className="rd-section-subtitle"><span style={{ color: '#06b6d4' }}>정의</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="rd-feature-row">
                <span className="rd-feature-icon">🗄️</span>
                <span><strong style={{ color: '#e2e8f0' }}>관계형 데이터베이스 관리 시스템 (RDBMS):</strong> 데이터를 행(Row)과 열(Column)로 구성된 테이블(Table) 형태로 저장하고, 테이블 간의 관계(Relation)를 통해 데이터를 구조적으로 관리하는 데이터베이스 시스템입니다.</span>
              </div>
              <div className="rd-feature-row">
                <span className="rd-feature-icon">📐</span>
                <span><strong style={{ color: '#e2e8f0' }}>E.F. Codd의 관계 모델:</strong> 1970년 IBM의 E.F. Codd가 제안한 관계 모델(Relational Model)을 기반으로 합니다. 수학적 집합론과 관계 대수(Relational Algebra)에 기초하여 데이터의 무결성과 일관성을 보장합니다.</span>
              </div>
            </div>
          </div>

          <div className="rd-section-box" style={{ marginBottom: '20px' }}>
            <div className="rd-section-subtitle"><span style={{ color: '#22c55e' }}>핵심 특성 — ACID</span></div>
            <div className="rd-param-grid">
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#06b6d4' }}>Atomicity (원자성)</div>
                <div className="rd-param-desc">
                  트랜잭션 내의 모든 연산은 <strong style={{ color: '#e2e8f0' }}>전부 성공하거나 전부 실패</strong>합니다. 중간 상태가 존재하지 않아 데이터 일관성을 보장합니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>All or Nothing</div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#3b82f6' }}>Consistency (일관성)</div>
                <div className="rd-param-desc">
                  트랜잭션 전후로 데이터베이스는 항상 <strong style={{ color: '#e2e8f0' }}>유효한 상태</strong>를 유지합니다. 제약조건, 트리거, 캐스케이드 등의 규칙이 항상 만족됩니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>Valid State</div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#a855f7' }}>Isolation (격리성)</div>
                <div className="rd-param-desc">
                  동시에 실행되는 트랜잭션들은 서로 <strong style={{ color: '#e2e8f0' }}>영향을 주지 않습니다</strong>. 격리 수준(Isolation Level)으로 동시성과 일관성 사이의 트레이드오프를 조절합니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>Concurrency Control</div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#22c55e' }}>Durability (지속성)</div>
                <div className="rd-param-desc">
                  커밋된 트랜잭션의 결과는 <strong style={{ color: '#e2e8f0' }}>영구적으로 저장</strong>됩니다. 시스템 장애가 발생해도 WAL(Write-Ahead Logging) 등을 통해 데이터가 보존됩니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>Persistent</div>
              </div>
            </div>
          </div>

          <HighlightBox color="#06b6d4">
            <strong>면접 포인트:</strong> ACID는 단순히 4가지 특성을 나열하는 것이 아니라, 각 특성이 <strong>어떤 문제를 해결하는지</strong>와 함께 설명해야 합니다. 예를 들어 "은행 계좌 이체 시 A 계좌에서 출금은 됐는데 B 계좌에 입금이 안 되는 상황을 원자성이 방지한다"와 같이 구체적 시나리오를 들어보세요.
          </HighlightBox>
        </div>

        {/* ── 관계 모델 핵심 구성 요소 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#06b6d4']}>관계 모델 핵심 구성 요소</SectionTitle>

          <div className="rd-section-box" style={{ marginBottom: '20px' }}>
            <div className="rd-section-subtitle"><span style={{ color: '#3b82f6' }}>테이블 구조</span></div>
            <div className="rd-param-grid">
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#06b6d4' }}>릴레이션 (Relation)</div>
                <div className="rd-param-desc">
                  수학적 관계를 표현하는 2차원 테이블. 관계형 모델에서 데이터를 저장하는 기본 단위입니다.
                </div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#3b82f6' }}>튜플 (Tuple) = 행 (Row)</div>
                <div className="rd-param-desc">
                  테이블의 한 레코드를 의미합니다. 각 튜플은 하나의 엔티티 인스턴스를 표현합니다.
                </div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#a855f7' }}>속성 (Attribute) = 열 (Column)</div>
                <div className="rd-param-desc">
                  엔티티의 특성을 정의합니다. 각 속성은 데이터 타입(Domain)이 정해져 있습니다.
                </div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#22c55e' }}>스키마 (Schema)</div>
                <div className="rd-param-desc">
                  테이블의 구조를 정의하는 메타데이터. 테이블명, 열 이름, 데이터 타입, 제약조건 등을 포함합니다.
                </div>
              </div>
            </div>
          </div>

          {/* 테이블 예시 다이어그램 */}
          <DiagramContainer title="릴레이션 구조 예시 — Users 테이블">
            <div className="rd-table-wrap">
              <table className="rd-table">
                <thead>
                  <tr>
                    <th style={{ color: '#06b6d4' }}>id (PK)</th>
                    <th style={{ color: '#3b82f6' }}>name</th>
                    <th style={{ color: '#a855f7' }}>email</th>
                    <th style={{ color: '#22c55e' }}>dept_id (FK)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>1</code></td>
                    <td>김철수</td>
                    <td>kim@mail.com</td>
                    <td><code style={{ color: '#22c55e' }}>101</code></td>
                  </tr>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>2</code></td>
                    <td>이영희</td>
                    <td>lee@mail.com</td>
                    <td><code style={{ color: '#22c55e' }}>102</code></td>
                  </tr>
                  <tr>
                    <td><code style={{ color: '#06b6d4' }}>3</code></td>
                    <td>박민수</td>
                    <td>park@mail.com</td>
                    <td><code style={{ color: '#22c55e' }}>101</code></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </DiagramContainer>
        </div>

        {/* ── 키 (Key)와 제약조건 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#a855f7', '#3b82f6']}>키와 제약조건</SectionTitle>

          <div className="rd-section-box" style={{ marginBottom: '20px' }}>
            <div className="rd-section-subtitle"><span style={{ color: '#a855f7' }}>키의 종류</span></div>
            <div className="rd-param-grid">
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#06b6d4' }}>Primary Key (PK)</div>
                <div className="rd-param-desc">
                  테이블 내에서 각 행을 <strong style={{ color: '#e2e8f0' }}>고유하게 식별</strong>하는 키. NULL을 허용하지 않으며, 테이블당 하나만 존재합니다. 내부적으로 <strong style={{ color: '#e2e8f0' }}>클러스터드 인덱스</strong>가 자동 생성됩니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(6,182,212,0.15)', color: '#06b6d4' }}>NOT NULL + UNIQUE</div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#22c55e' }}>Foreign Key (FK)</div>
                <div className="rd-param-desc">
                  다른 테이블의 PK를 참조하여 테이블 간의 <strong style={{ color: '#e2e8f0' }}>관계를 정의</strong>하는 키. 참조 무결성(Referential Integrity)을 보장합니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>REFERENCES</div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#f59e0b' }}>Unique Key (UK)</div>
                <div className="rd-param-desc">
                  열의 값이 <strong style={{ color: '#e2e8f0' }}>중복되지 않도록</strong> 보장하는 키. PK와 달리 NULL을 허용하며 테이블에 여러 개 생성 가능합니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>UNIQUE</div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#3b82f6' }}>Candidate Key</div>
                <div className="rd-param-desc">
                  PK가 될 수 있는 <strong style={{ color: '#e2e8f0' }}>후보 키</strong>. 유일성과 최소성을 만족하는 속성 또는 속성의 조합입니다. PK는 후보 키 중 하나를 선정한 것입니다.
                </div>
                <div className="rd-param-val" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>유일성 + 최소성</div>
              </div>
            </div>
          </div>

          {/* FK 관계 다이어그램 */}
          <DiagramContainer title="Foreign Key 참조 관계">
            <DiagramFlow>
              <DiagramGroup label="Users" color="#06b6d4">
                <DiagramNode icon="👤" label="user_id (PK)" sub="INT" color="#06b6d4" />
              </DiagramGroup>
              <DiagramArrow label="FK 참조" color="#22c55e" animated />
              <DiagramGroup label="Orders" color="#a855f7">
                <DiagramNode icon="📦" label="order_id (PK)" sub="INT" color="#a855f7" />
                <DiagramNode icon="🔗" label="user_id (FK)" sub="→ Users.user_id" color="#22c55e" />
              </DiagramGroup>
            </DiagramFlow>
          </DiagramContainer>

          <div className="rd-section-box" style={{ marginTop: '20px' }}>
            <div className="rd-section-subtitle"><span style={{ color: '#f59e0b' }}>주요 제약조건 (Constraints)</span></div>
            <div className="rd-table-wrap">
              <table className="rd-table">
                <thead>
                  <tr>
                    <th>제약조건</th>
                    <th>설명</th>
                    <th>예시</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong style={{ color: '#06b6d4' }}>NOT NULL</strong></td>
                    <td>NULL 값 불허</td>
                    <td>이름, 이메일 등 필수 필드</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#22c55e' }}>UNIQUE</strong></td>
                    <td>중복 값 불허</td>
                    <td>이메일, 주민번호</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#a855f7' }}>CHECK</strong></td>
                    <td>조건식 만족 강제</td>
                    <td>age {'>'} 0, status IN ('ACTIVE', 'INACTIVE')</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#f59e0b' }}>DEFAULT</strong></td>
                    <td>기본값 설정</td>
                    <td>created_at DEFAULT NOW()</td>
                  </tr>
                  <tr>
                    <td><strong style={{ color: '#ef4444' }}>CASCADE</strong></td>
                    <td>참조 행 변경 시 연쇄 적용</td>
                    <td>ON DELETE CASCADE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── 관계 (Relationships) ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#22c55e', '#06b6d4']}>테이블 간 관계</SectionTitle>

          <div className="rd-rel-grid" style={{ marginBottom: '20px' }}>
            <div className="rd-rel-card">
              <span className="rd-rel-icon">1️⃣</span>
              <div>
                <div className="rd-rel-label">1:1 (One-to-One)</div>
                <div className="rd-rel-desc">
                  한 행이 다른 테이블의 정확히 한 행과 매핑.<br />
                  <strong style={{ color: '#94a3b8' }}>예:</strong> User ↔ UserProfile
                </div>
              </div>
            </div>
            <div className="rd-rel-card">
              <span className="rd-rel-icon">🔢</span>
              <div>
                <div className="rd-rel-label">1:N (One-to-Many)</div>
                <div className="rd-rel-desc">
                  한 행이 다른 테이블의 여러 행과 매핑. 가장 흔한 관계.<br />
                  <strong style={{ color: '#94a3b8' }}>예:</strong> Department ↔ Employee
                </div>
              </div>
            </div>
            <div className="rd-rel-card">
              <span className="rd-rel-icon">🔗</span>
              <div>
                <div className="rd-rel-label">N:M (Many-to-Many)</div>
                <div className="rd-rel-desc">
                  양쪽 모두 여러 행과 매핑. 중간 테이블(Join Table)로 해소.<br />
                  <strong style={{ color: '#94a3b8' }}>예:</strong> Student ↔ Course → Enrollment
                </div>
              </div>
            </div>
          </div>

          {/* N:M 관계 해소 다이어그램 */}
          <DiagramContainer title="N:M 관계 해소 — 중간(조인) 테이블 활용">
            <DiagramFlow>
              <DiagramNode icon="🎓" label="Student" sub="student_id (PK)" color="#06b6d4" />
              <DiagramArrow label="1:N" color="#06b6d4" animated />
              <DiagramGroup label="Enrollment (조인 테이블)" color="#f59e0b">
                <DiagramNode icon="📋" label="student_id (FK)" sub="+ course_id (FK)" color="#f59e0b" />
              </DiagramGroup>
              <DiagramArrow label="N:1" color="#a855f7" animated />
              <DiagramNode icon="📚" label="Course" sub="course_id (PK)" color="#a855f7" />
            </DiagramFlow>
          </DiagramContainer>

          <HighlightBox color="#22c55e">
            <strong>면접 포인트:</strong> N:M 관계는 RDBMS에서 직접 표현할 수 없으므로 반드시 <strong>중간 테이블(Join Table)</strong>로 두 개의 1:N 관계로 분해해야 합니다. 중간 테이블에는 양쪽 FK를 복합 PK로 사용하거나, 별도의 surrogate PK를 둘 수 있습니다.
          </HighlightBox>
        </div>

        {/* ── RDBMS 내부 아키텍처 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#ef4444']}>RDBMS 내부 아키텍처</SectionTitle>

          {/* 쿼리 실행 흐름 */}
          <DiagramContainer title="SQL 쿼리 실행 흐름">
            <DiagramFlow>
              <DiagramNode icon="📝" label="SQL Query" sub="SELECT * FROM ..." color="#3b82f6" />
              <DiagramArrow label="1. 파싱" color="#3b82f6" animated />
              <DiagramNode icon="🔍" label="Parser" sub="구문 분석 · AST" color="#06b6d4" />
              <DiagramArrow label="2. 최적화" color="#06b6d4" animated />
              <DiagramNode icon="🧠" label="Optimizer" sub="실행 계획 수립" color="#a855f7" />
              <DiagramArrow label="3. 실행" color="#a855f7" animated />
              <DiagramNode icon="⚙️" label="Executor" sub="실행 엔진" color="#f59e0b" />
              <DiagramArrow label="4. I/O" color="#f59e0b" animated />
              <DiagramNode icon="💾" label="Storage" sub="디스크 / 버퍼 풀" color="#22c55e" />
            </DiagramFlow>
          </DiagramContainer>

          <div className="rd-section-box" style={{ marginTop: '20px', marginBottom: '20px' }}>
            <div className="rd-section-subtitle"><span style={{ color: '#f59e0b' }}>핵심 컴포넌트</span></div>
            <div className="rd-step-list">
              <div className="rd-step">
                <div className="rd-step-num" style={{ background: 'rgba(59,130,246,0.15)', color: '#3b82f6' }}>1</div>
                <div className="rd-step-content">
                  <strong style={{ color: '#3b82f6' }}>Parser (구문 분석기)</strong><br />
                  SQL 문자열을 토큰화하고 AST(Abstract Syntax Tree)로 변환합니다. 문법 오류를 감지하고, 참조하는 테이블/컬럼이 존재하는지 검증합니다.
                </div>
              </div>
              <div className="rd-step">
                <div className="rd-step-num" style={{ background: 'rgba(168,85,247,0.15)', color: '#a855f7' }}>2</div>
                <div className="rd-step-content">
                  <strong style={{ color: '#a855f7' }}>Query Optimizer (쿼리 최적화기)</strong><br />
                  여러 실행 계획(Execution Plan) 후보 중 <strong style={{ color: '#e2e8f0' }}>비용(Cost)</strong>이 가장 낮은 계획을 선택합니다. 테이블 통계, 인덱스 정보, 조인 순서 등을 고려하며, CBO(Cost-Based Optimizer)가 대표적입니다.
                </div>
              </div>
              <div className="rd-step">
                <div className="rd-step-num" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>3</div>
                <div className="rd-step-content">
                  <strong style={{ color: '#f59e0b' }}>Storage Engine (저장 엔진)</strong><br />
                  실제 데이터의 읽기/쓰기를 담당합니다. MySQL의 <strong style={{ color: '#e2e8f0' }}>InnoDB</strong>, PostgreSQL의 <strong style={{ color: '#e2e8f0' }}>MVCC 기반 힙 저장</strong> 등이 대표적입니다. 트랜잭션 관리, 잠금, 인덱스 관리 등을 처리합니다.
                </div>
              </div>
              <div className="rd-step">
                <div className="rd-step-num" style={{ background: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>4</div>
                <div className="rd-step-content">
                  <strong style={{ color: '#22c55e' }}>Buffer Pool (버퍼 풀)</strong><br />
                  디스크 I/O를 줄이기 위한 <strong style={{ color: '#e2e8f0' }}>메모리 캐시 영역</strong>입니다. 자주 접근하는 데이터 페이지를 메모리에 유지하며, LRU(Least Recently Used) 알고리즘으로 교체를 관리합니다.
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#f59e0b">
            <strong>면접 포인트:</strong> "쿼리가 느릴 때 어떻게 분석하나요?"라는 질문에는 <strong>EXPLAIN (실행 계획 확인)</strong> → 인덱스 사용 여부 확인 → Full Table Scan 여부 → 조인 순서와 방식 확인의 순서로 설명하면 좋습니다. Optimizer가 잘못된 실행 계획을 선택하는 경우, 힌트(Hint)를 통해 교정할 수 있습니다.
          </HighlightBox>
        </div>

        {/* ── SQL vs NoSQL ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#06b6d4', '#a855f7']}>SQL vs NoSQL</SectionTitle>

          <div className="rd-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="rd-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th style={{ color: '#06b6d4' }}>SQL (RDBMS)</th>
                  <th style={{ color: '#a855f7' }}>NoSQL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>데이터 모델</strong></td>
                  <td>테이블 (행 & 열)</td>
                  <td>문서, 키-값, 그래프, 컬럼 패밀리</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>스키마</strong></td>
                  <td>고정 스키마 (Schema-on-Write)</td>
                  <td>유연한 스키마 (Schema-on-Read)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>트랜잭션</strong></td>
                  <td>ACID 보장</td>
                  <td>BASE (Basically Available, Soft state, Eventually consistent)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>확장 방식</strong></td>
                  <td>수직 확장 (Scale-up) 중심</td>
                  <td>수평 확장 (Scale-out) 중심</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>쿼리 언어</strong></td>
                  <td>표준 SQL</td>
                  <td>DB마다 고유 API/쿼리 언어</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>조인</strong></td>
                  <td>강력한 JOIN 지원</td>
                  <td>조인 제한적 (비정규화 선호)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>대표 제품</strong></td>
                  <td>MySQL, PostgreSQL, Oracle</td>
                  <td>MongoDB, Redis, Cassandra, DynamoDB</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>적합한 경우</strong></td>
                  <td>관계가 복잡한 정형 데이터, 트랜잭션 필수</td>
                  <td>대용량 비정형 데이터, 빠른 개발/변경</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rd-compare-grid" style={{ marginBottom: '20px' }}>
            <div className="rd-section-box">
              <div className="rd-section-subtitle"><span style={{ color: '#06b6d4' }}>RDBMS를 선택할 때</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span>데이터 간 <strong style={{ color: '#e2e8f0' }}>관계(조인)</strong>가 빈번한 경우</span>
                </div>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>ACID 트랜잭션</strong>이 반드시 필요한 경우 (금융, 주문)</span>
                </div>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span>데이터 구조가 <strong style={{ color: '#e2e8f0' }}>명확하고 잘 변하지 않는</strong> 경우</span>
                </div>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>복잡한 쿼리</strong>(집계, 서브쿼리, 윈도우 함수)가 필요한 경우</span>
                </div>
              </div>
            </div>
            <div className="rd-section-box">
              <div className="rd-section-subtitle"><span style={{ color: '#a855f7' }}>NoSQL을 선택할 때</span></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span>스키마가 <strong style={{ color: '#e2e8f0' }}>자주 변경</strong>되거나 비정형 데이터인 경우</span>
                </div>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>대규모 수평 확장</strong>이 필요한 경우</span>
                </div>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span><strong style={{ color: '#e2e8f0' }}>낮은 지연 시간</strong>의 단순 읽기/쓰기가 중요한 경우</span>
                </div>
                <div className="rd-feature-row">
                  <span className="rd-feature-icon">✅</span>
                  <span>조인 없이 <strong style={{ color: '#e2e8f0' }}>비정규화된 데이터</strong>로 처리 가능한 경우</span>
                </div>
              </div>
            </div>
          </div>

          <HighlightBox color="#a855f7">
            <strong>면접 포인트:</strong> "SQL vs NoSQL 중 뭐가 더 좋은가요?"는 잘못된 질문입니다. <strong>문제의 특성에 따라 적합한 도구가 다릅니다.</strong> 실무에서는 하나의 서비스 내에서도 SQL과 NoSQL을 함께 사용하는 Polyglot Persistence가 일반적입니다.
          </HighlightBox>
        </div>

        {/* ── CAP 정리 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#ef4444', '#f59e0b']}>CAP 정리</SectionTitle>

          <div className="rd-section-box" style={{ marginBottom: '20px' }}>
            <div className="rd-section-subtitle"><span style={{ color: '#ef4444' }}>CAP Theorem — 분산 시스템의 트레이드오프</span></div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <div className="rd-feature-row">
                <span className="rd-feature-icon">📐</span>
                <span>분산 데이터 시스템은 <strong style={{ color: '#ef4444' }}>Consistency</strong>, <strong style={{ color: '#3b82f6' }}>Availability</strong>, <strong style={{ color: '#22c55e' }}>Partition Tolerance</strong> 세 가지 속성 중 <strong style={{ color: '#e2e8f0' }}>최대 두 가지만</strong> 동시에 만족할 수 있습니다.</span>
              </div>
            </div>

            <div className="rd-param-grid">
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#ef4444' }}>C — Consistency (일관성)</div>
                <div className="rd-param-desc">
                  모든 노드가 <strong style={{ color: '#e2e8f0' }}>같은 시점에 동일한 데이터</strong>를 볼 수 있어야 합니다. 하나의 노드에 쓰기가 발생하면 즉시 모든 노드에 반영됩니다.
                </div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#3b82f6' }}>A — Availability (가용성)</div>
                <div className="rd-param-desc">
                  모든 요청은 <strong style={{ color: '#e2e8f0' }}>항상 응답</strong>을 받아야 합니다. 일부 노드가 장애가 나더라도 시스템은 정상적으로 동작해야 합니다.
                </div>
              </div>
              <div className="rd-param">
                <div className="rd-param-name" style={{ color: '#22c55e' }}>P — Partition Tolerance (분할 내성)</div>
                <div className="rd-param-desc">
                  네트워크 <strong style={{ color: '#e2e8f0' }}>파티션(분할)</strong>이 발생해도 시스템이 계속 동작해야 합니다. 분산 시스템에서 네트워크 장애는 필연적이므로 P는 사실상 필수입니다.
                </div>
              </div>
            </div>
          </div>

          <div className="rd-table-wrap" style={{ marginBottom: '20px' }}>
            <table className="rd-table">
              <thead>
                <tr>
                  <th>조합</th>
                  <th>특성</th>
                  <th>대표 시스템</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#ef4444' }}>CP</strong></td>
                  <td>일관성 + 분할 내성</td>
                  <td>MongoDB, HBase, Redis Cluster</td>
                  <td>네트워크 분할 시 일부 요청 거부 (가용성 포기)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#3b82f6' }}>AP</strong></td>
                  <td>가용성 + 분할 내성</td>
                  <td>Cassandra, DynamoDB, CouchDB</td>
                  <td>네트워크 분할 시 오래된 데이터 반환 가능 (일관성 포기)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#22c55e' }}>CA</strong></td>
                  <td>일관성 + 가용성</td>
                  <td>단일 노드 RDBMS (MySQL, PostgreSQL)</td>
                  <td>네트워크 파티션이 없는 환경에서만 가능 (사실상 단일 노드)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <HighlightBox color="#ef4444">
            <strong>면접 포인트:</strong> 네트워크 파티션은 분산 환경에서 <strong>피할 수 없기 때문에</strong> 실질적으로 CP 또는 AP 중 선택해야 합니다. 단일 RDBMS는 파티션이 존재하지 않으므로 CA라 할 수 있지만, 이는 분산 시스템이 아니기 때문에 CAP 정리의 본래 범위를 벗어납니다.
          </HighlightBox>
        </div>

        {/* ── 주요 RDBMS 비교 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#3b82f6', '#a855f7']}>주요 RDBMS 비교</SectionTitle>

          <div className="rd-table-wrap">
            <table className="rd-table">
              <thead>
                <tr>
                  <th>구분</th>
                  <th style={{ color: '#06b6d4' }}>MySQL</th>
                  <th style={{ color: '#3b82f6' }}>PostgreSQL</th>
                  <th style={{ color: '#ef4444' }}>Oracle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>저장 엔진</strong></td>
                  <td>InnoDB (기본)</td>
                  <td>단일 (힙 기반 + MVCC)</td>
                  <td>Oracle Storage</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>동시성 제어</strong></td>
                  <td>MVCC (InnoDB)</td>
                  <td>MVCC (SSI 지원)</td>
                  <td>MVCC + 락 기반</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>인덱스</strong></td>
                  <td>B+Tree (클러스터드)</td>
                  <td>B-Tree, Hash, GIN, GiST, BRIN</td>
                  <td>B-Tree, Bitmap 등</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>JSON 지원</strong></td>
                  <td>JSON 타입 (제한적)</td>
                  <td>JSONB (인덱스 가능)</td>
                  <td>JSON 타입</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>확장성</strong></td>
                  <td>플러그인 기반</td>
                  <td>Extension (PostGIS 등)</td>
                  <td>Enterprise 기능</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>라이선스</strong></td>
                  <td>GPL (오픈소스)</td>
                  <td>PostgreSQL License (오픈소스)</td>
                  <td>상용 (유료)</td>
                </tr>
                <tr>
                  <td><strong style={{ color: '#e2e8f0' }}>주요 특징</strong></td>
                  <td>가볍고 빠름, 웹 서비스에 최적</td>
                  <td>표준 SQL 준수, 고급 기능 풍부</td>
                  <td>엔터프라이즈 안정성, RAC</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 면접 예상 질문 ── */}
        <div className="doc-section">
          <SectionTitle gradient={['#f59e0b', '#22c55e']}>면접 예상 질문</SectionTitle>
          <InterviewQuestions
            color="#06b6d4"
            items={[
              {
                q: 'RDBMS에서 ACID란 무엇이며, 각각 어떤 문제를 해결하나요?',
                a: 'Atomicity(원자성)는 트랜잭션의 All-or-Nothing을 보장하여 중간 상태를 방지하고, Consistency(일관성)는 제약조건이 항상 만족되도록 보장합니다. Isolation(격리성)은 동시 트랜잭션 간 간섭을 방지하며, Durability(지속성)는 커밋된 데이터가 장애 시에도 보존되도록 합니다. 예를 들어 은행 이체 시, 원자성이 출금만 되고 입금이 안 되는 상황을 방지합니다.',
              },
              {
                q: 'Primary Key와 Unique Key의 차이점은 무엇인가요?',
                a: 'PK는 NULL을 허용하지 않으며 테이블당 하나만 존재합니다. 클러스터드 인덱스가 자동 생성되어 데이터의 물리적 정렬 순서를 결정합니다. UK는 NULL을 허용하며(DBMS에 따라 여러 NULL 가능), 테이블에 여러 개 생성할 수 있고, 논클러스터드 인덱스가 생성됩니다.',
              },
              {
                q: 'N:M 관계를 RDBMS에서 어떻게 구현하나요?',
                a: '중간 테이블(조인 테이블, 연결 테이블)을 생성하여 양쪽 테이블의 PK를 FK로 참조합니다. 예를 들어 학생(Student)과 수강과목(Course)의 N:M 관계는 수강신청(Enrollment) 테이블로 해소하며, student_id와 course_id를 FK로 갖습니다.',
              },
              {
                q: 'SQL과 NoSQL의 차이점과 각각의 사용 시나리오를 설명해주세요.',
                a: 'SQL(RDBMS)은 고정 스키마, ACID 트랜잭션, 강력한 조인을 제공하여 관계가 복잡한 정형 데이터와 트랜잭션이 중요한 시스템(금융, ERP)에 적합합니다. NoSQL은 유연한 스키마, 수평 확장, 높은 처리량을 제공하여 대용량 비정형 데이터와 빠른 변경이 필요한 시스템(로그, 실시간 분석)에 적합합니다. 실무에서는 Polyglot Persistence로 용도에 맞는 DB를 혼합 사용합니다.',
              },
              {
                q: 'CAP 정리에서 왜 세 가지를 동시에 만족할 수 없나요?',
                a: '네트워크 파티션(P) 발생 시, 노드 간 통신이 불가능해지면 일관성(C)을 유지하려면 응답을 거부해야 하고(가용성 포기 → CP), 가용성(A)을 유지하려면 오래된 데이터라도 응답해야 합니다(일관성 포기 → AP). 분산 환경에서 네트워크 장애는 필연적이므로 P는 사실상 필수이며, 결국 C와 A 중 하나를 트레이드오프해야 합니다.',
              },
              {
                q: 'RDBMS의 쿼리 실행 과정을 설명해주세요.',
                a: 'SQL이 입력되면 ①Parser가 구문 분석 및 AST 변환을 수행하고, ②Optimizer가 통계 정보를 기반으로 최적의 실행 계획(조인 순서, 인덱스 사용 여부 등)을 수립합니다. ③Executor가 실행 계획에 따라 데이터를 처리하며, ④Storage Engine이 Buffer Pool(메모리 캐시)과 디스크에서 데이터를 읽고 씁니다. 느린 쿼리는 EXPLAIN으로 실행 계획을 확인하여 분석합니다.',
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

---
name: create-doc-page
description: 면접 준비 문서 페이지(.tsx)를 생성하고, 요구사항 변경 시 이 스킬 자체도 업데이트
user-invocable: true
---

# 문서 페이지 생성 스킬

면접 준비 사이트에 새로운 문서 탭 페이지를 생성합니다.

## 자기 업데이트 규칙

**이 스킬 파일은 살아있는 규칙 문서입니다.**

사용자가 페이지 생성 과정에서 새로운 요구사항이나 피드백을 주면:
1. 해당 요구사항을 이 스킬 파일(`.claude/skills/create-doc-page.md`)에 즉시 반영
2. 어떤 규칙이 추가/변경되었는지 사용자에게 알림
3. 이후 모든 페이지 생성에 해당 규칙이 자동 적용됨

예시: "면접 질문 7개 이상으로 해줘" → 아래 필수 섹션 구성의 면접 질문 최소 개수를 수정

## 사용법

```
/create-doc-page <주제> <카테고리>
```

자연어로 편하게 입력합니다. 탭ID나 slug를 외울 필요 없습니다.

예시:
- `/create-doc-page 인덱스 데이터베이스`
- `/create-doc-page 트랜잭션 DB`
- `/create-doc-page CORS 보안`
- `/create-doc-page 컨슈머그룹 카프카`

## 실행 절차

### 1단계: 입력 해석 및 사용자 확인

사용자가 입력한 자연어를 분석하여:
1. **카테고리 매칭**: 아래 카테고리별 설정 테이블에서 가장 가까운 카테고리를 찾음 (한글, 영어, 약어 모두 허용)
2. **탭ID 생성**: 주제를 kebab-case 영문 탭ID로 변환 (예: "인덱스" → `index-deep-dive`)
3. **페이지 제목 결정**: 한글 제목 생성 (예: "인덱스 심화")

사용자에게 다음을 확인합니다:
- 변환된 카테고리, 탭ID, 페이지 제목이 맞는지
- 다루고 싶은 핵심 주제 목록
- 확인 후 진행

**카테고리 매칭 규칙:**
| 입력 예시 | 매칭 카테고리 |
|-----------|--------------|
| 네트워크, network, 넷 | network |
| 보안, security, 시큐리티, 인증 | security |
| 카프카, kafka, 카프카 | kafka |
| 데이터베이스, database, DB, 디비 | database |
| 포트폴리오, portfolio, 포폴 | portfolio |

### 2단계: React 컴포넌트 생성

`src/pages/docs/{PascalCase탭이름}.tsx` 파일을 생성합니다.

**반드시 따를 패턴:**
- 기존 페이지들(KafkaOverview.tsx, RdbmsOverview.tsx 등)의 구조를 따름
- 필수 import: `HeroSection`, `SectionTitle`, `HighlightBox`, `InterviewQuestions`, `useInjectCSS`
- 선택 import: `DiagramContainer`, `DiagramNode`, `DiagramArrow`, `DiagramFlow`, `DiagramGroup` (다이어그램 필요 시)
- 선택 import: `CodeBlock` (코드 예시 필요 시)
- CSS 클래스 접두사: 탭ID에서 파생된 2~3글자 약어 사용 (예: `idx-`, `tx-`)
- 색상: 카테고리의 accentColor 계열 사용

**필수 섹션 구성:**
1. `HeroSection` — 태그, 제목(accentColor 적용), 설명
2. 핵심 개념 정의 섹션 — `SectionTitle` + 설명 카드/리스트
3. 구조/아키텍처 다이어그램 — `DiagramContainer` 활용
4. 비교 테이블 또는 분류 — 테이블/그리드 카드
5. `HighlightBox` — 면접 포인트 (각 주요 섹션마다 1개)
6. 면접 예상 질문 — `InterviewQuestions` 컴포넌트 (최소 5개)

**컴포넌트 prop 주의사항:**
- `DiagramNode`: `icon`, `label`, `sub`, `color` (borderColor 아님)
- `DiagramGroup`: `label`, `color` (labelColor 아님)
- `DiagramArrow`: `label`, `color`, `animated`
- `InterviewQuestions`: `color`, `items: { q: string, a: string }[]`
- `HighlightBox`: `color`, `children`
- `SectionTitle`: `children`, `gradient: [string, string]`

### 3단계: 카테고리 페이지 업데이트

`src/pages/docs/{Category}Page.tsx`에 새 탭을 추가합니다:
- `sections` 객체에 lazy import 추가
- `tabGroups`의 적절한 그룹에 탭 항목 추가
- 아이콘은 `lucide-react`에서 적절한 것 선택

### 4단계: categories.ts 업데이트

`src/data/categories.ts`의 해당 카테고리 `tabGroups`에 새 탭 추가:
```typescript
{ id: '<탭ID>', label: '<한글 라벨>' }
```

### 5단계: 빌드 검증

- `npx tsc --noEmit`으로 타입 에러 확인
- 에러 발생 시 즉시 수정

### 6단계: 결과 보고

생성/수정된 파일 목록과 다음에 추가하면 좋을 관련 주제를 제안합니다.

## 카테고리별 설정

| 카테고리 | slug | accentColor | 아이콘 소스 |
|----------|------|-------------|------------|
| 네트워크 | network | #3b82f6 | lucide-react |
| 보안 | security | #a855f7 | lucide-react |
| Kafka | kafka | #f97316 | lucide-react |
| 데이터베이스 | database | #06b6d4 | lucide-react |
| 포트폴리오 | portfolio | #22c55e | lucide-react |

## 새 카테고리가 필요한 경우

탭ID의 카테고리가 아직 없으면 추가로:
1. `src/pages/docs/{Category}Page.tsx` 신규 생성
2. `src/App.tsx`에 lazy import + Route 추가
3. `src/lib/prefetch.ts`에 프리페치 매핑 추가
4. `src/data/categories.ts`에 카테고리 객체 추가 (portfolio 위에 배치)

## 변경 이력

- 2026-03-11: 스킬 생성, 마크다운 요약 생성 제거 (tsx에 콘텐츠가 이미 포함되므로 불필요)
- 2026-03-11: 자연어 입력 지원 — 탭ID/slug 대신 한글 주제+카테고리로 입력 가능하도록 변경

# RealityCheck - Project Instructions

## Project Overview

"내 아이디어가 시장에서 얼마나 포화됐는지" 점수/리포트로 즉시 보여주고, 결과를 스크린샷/공유(OG 이미지)하여 바이럴을 유도하는 웹 서비스.
핵심 KPI: 공유/유입/이메일 수집 (결제 전환 X)
MVP 원칙: 완벽한 정확도보다 "그럴듯하고 납득되는 근거 + 강한 결과 화면"

## Tech Stack

- **Framework**: Next.js 16 App Router (React 19)
- **Language**: TypeScript (strict mode)
- **Package Manager**: pnpm
- **UI**: shadcn/ui + Tailwind CSS v4
- **Animation**: Framer Motion + GSAP
- **Charts**: Recharts (Radial/Radar)
- **LLM**: Google Gemini API (Server Actions)
- **Search API**: SerpAPI 또는 Tavily Search API
- **Storage**: Vercel KV (optional, TTL 7~30일)
- **Validation**: zod
- **Deploy**: Vercel

## Project Structure

```
reality-check/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing + input CTA
│   ├── globals.css             # Global styles (Tailwind)
│   ├── analyze/
│   │   ├── page.tsx            # Input form page
│   │   └── actions.ts          # Server Action: analyzeIdea()
│   ├── result/
│   │   └── [id]/
│   │       ├── page.tsx        # Result page
│   │       └── opengraph-image.tsx  # Dynamic OG image (1200x630)
│   ├── api/
│   │   ├── search/route.ts     # Search API proxy
│   │   └── save-email/route.ts # Email collection (optional)
│   └── fonts/                  # Local fonts if needed
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── landing/                # Landing page components
│   ├── analyze/                # Analysis stepper, progress UI
│   ├── result/                 # Score cards, charts, verdict
│   └── share/                  # Share buttons, OG card
├── lib/
│   ├── gemini.ts               # Gemini client & prompt
│   ├── search.ts               # Search API client (SerpAPI/Tavily)
│   ├── scoring.ts              # Score calculation logic
│   ├── schemas.ts              # Zod schemas (input, LLM output)
│   └── utils.ts                # Shared utilities
├── types/
│   └── index.ts                # Shared TypeScript types
├── public/                     # Static assets
├── plan.md                     # Product plan document
└── CLAUDE.md                   # This file
```

## Coding Conventions

### General
- 한국어 주석 OK, 코드/변수명은 영어
- Named export 사용 (default export는 page/layout만)
- Barrel export (index.ts) 사용하지 않음
- Import alias: `@/*` (프로젝트 루트 기준)

### TypeScript
- `strict: true` 유지
- `any` 사용 금지 - `unknown` 후 타입 가드
- Interface보다 `type` 선호 (확장 필요한 경우만 interface)
- Zod schema에서 타입 추론: `z.infer<typeof schema>`

### React / Next.js
- Server Component 기본, 클라이언트 필요 시만 `"use client"`
- Server Actions은 `app/*/actions.ts`에 모아둠
- `useEffect` 최소화 - 가능하면 서버에서 처리
- Event handler 네이밍: `handleXxx` (e.g., `handleSubmit`, `handleShare`)
- Component Props 타입은 컴포넌트 파일 내 상단에 정의

### Styling
- Tailwind CSS v4 유틸리티 클래스 사용
- 커스텀 CSS는 `globals.css`에서 CSS 변수로 관리
- shadcn/ui 컴포넌트 커스텀 시 cn() 유틸리티 사용
- Dark mode 지원 필수 (Tailwind `dark:` prefix)
- 반응형: mobile-first (`sm:`, `md:`, `lg:`)

### File Naming
- Components: PascalCase (e.g., `ScoreCard.tsx`)
- Utilities/hooks: camelCase (e.g., `useAnalysis.ts`)
- Route files: kebab-case directories (Next.js convention)

## Key Data Models

### Input (사용자 입력)
```typescript
type AnalyzeInput = {
  idea: string                    // 필수
  targetCustomer?: string
  pricingModel?: 'free' | 'subscription' | 'one-time' | 'usage-based'
  category?: 'marketing' | 'devtools' | 'creator' | 'b2b' | 'productivity' | 'finance' | 'other'
  differentiator?: string
}
```

### LLM Output (Gemini 응답, zod 검증)
```typescript
type LLMAnalysis = {
  extractedKeywords: string[]
  similarProducts: { name: string; url?: string; reason: string; confidence: number }[]
  saturationSignals: string[]
  differentiationSignals: string[]
  risks: { type: 'market' | 'competition' | 'execution' | 'distribution'; detail: string; severity: number }[]
  verdictOneLiner: string
  suggestions: string[]
}
```

### Scores (계산 결과)
```typescript
type Scores = {
  saturation: number       // 0~100, 높을수록 포화(나쁨)
  differentiation: number  // 0~100, 높을수록 차별화(좋음)
  survivalOdds: number     // 0~100, 높을수록 생존(좋음)
  label: 'Undervalued' | 'Competitive but possible' | 'Crowded' | 'Red Ocean'
}
```

## Score Calculation Logic

```
saturation:
  - 일반 키워드(SaaS/tool/platform/ai) 많으면 +10~20
  - 유사 제품 confidence 평균 높으면 +20~40
  - 유사 제품 개수 많으면 +10~30

differentiation:
  - targetCustomer 구체적이면 +10~20
  - differentiator 존재+구체적이면 +10~30
  - competition severity 평균 낮으면 +10

survivalOdds:
  - 100 - (saturation * 0.6 + avgRiskSeverity * 8) + (differentiation * 0.4)
  - clamp 0~100

label:
  - 80~100: "Undervalued"
  - 60~79: "Competitive but possible"
  - 40~59: "Crowded"
  - 0~39: "Red Ocean"
```

## Environment Variables

```bash
# Required
GEMINI_API_KEY=           # Google Gemini API key
TAVILY_API_KEY=           # Tavily Search API key

# Optional (Vercel KV)
KV_REST_API_URL=
KV_REST_API_TOKEN=
```

**API 키는 반드시 서버 사이드에서만 사용.** 절대 클라이언트에 노출하지 않는다.

## Development Commands

```bash
pnpm dev          # 개발 서버 (http://localhost:3000)
pnpm build        # 프로덕션 빌드
pnpm start        # 프로덕션 서버
pnpm lint         # ESLint
```

## Security Rules

- 검색 API 키: 서버에서만 사용 (`/api/search` Route Handler)
- LLM 결과: zod로 검증 후 fallback 처리 (파싱 실패 시 에러 UI)
- Rate limit: IP 당 분당 N회 (Vercel Edge middleware or KV counter)
- 사용자 입력: sanitize 필수 (XSS 방지)
- `.env*` 파일은 절대 커밋하지 않음

## Animation Guidelines

- 분석 진행 Stepper: GSAP으로 텍스트/아이콘 슬라이드 (좌->우)
- Progress bar: 부드러운 ease
- 숫자(%): 카운트업 애니메이션 (0 -> 최종값)
- 결과 카드: Framer Motion으로 stagger 등장
- 성능: `will-change`, `transform` 기반 애니메이션 사용 (layout thrashing 방지)

## Streaming Strategy (MVP)

MVP에서는 "가짜 step progress + 실제 요청 1회" 방식 채택:
1. 클라이언트에서 4단계 stepper UI를 시간차로 보여줌
2. 백그라운드에서 Server Action 1회 호출
3. 응답 도착 시 stepper 즉시 완료 -> 결과 페이지 전환

## OG Image

- Route: `app/result/[id]/opengraph-image.tsx`
- Size: 1200x630
- 점수 3개 + verdict 한 줄 + 브랜드명
- 텍스트는 짧고 강렬하게

## Commit Convention

- `feat:` 새 기능
- `fix:` 버그 수정
- `style:` UI/스타일 변경
- `refactor:` 리팩토링
- `chore:` 설정/의존성 변경
- 커밋 메시지는 영어로 작성

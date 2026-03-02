# RealityCheck (가칭) — Plan (plan.md)

## 0. 목표
- **목표:** “내 아이디어, 시장에서 이미 얼마나 포화됐는지”를 **점수/리포트로 즉시 보여주고** 결과를 **스크린샷/공유(OG 이미지)** 하게 만들어 바이럴을 만든다.
- **우선순위:** 결제 전환 X → **공유/유입/이메일 수집**이 핵심 KPI
- **MVP 원칙:** 완벽한 정확도보다 **그럴듯하고 납득되는 근거 + 강한 결과 화면**이 더 중요

---

## 1. 핵심 사용자 플로우
1) 랜딩 진입 → “아이디어 입력” CTA
2) 아이디어 입력 (텍스트) + 선택 옵션(타겟/가격모델 등)
3) “분석 시작” 클릭
4) **분석 진행 UI (Streaming)**: Step 1~4 단계가 순차적으로 진행되는 느낌
5) 결과 페이지:
   - Market Saturation (%)
   - Differentiation (%)
   - Survival Odds (%)
   - Key Reasons (3~5개)
   - “Top similar products” (5~10개)
   - **공유 카드 생성 + X 공유 버튼**
6) (선택) “상세 리포트 이메일로 받기” → 이메일 입력 → 결과 저장/전송(초기엔 저장만)

---

## 2. MVP 기능 범위
### Must-have (MVP)
- 아이디어 입력 폼 (텍스트 + 옵션)
- 시장 포화도/차별화/생존확률 점수 산출
- 유사 제품/검색 결과 기반 근거 출력 (5~10개)
- 결과 페이지 UI + 공유 버튼
- **Dynamic OG Image 생성** (공유 시 결과 점수 이미지 자동 노출)

### Nice-to-have (MVP+)
- 이메일 입력 시 결과 저장 (Vercel KV)
- 결과 히스토리 “내 리포트” 페이지(토큰/링크 기반)
- “더 매운(독설) 모드” 토글

---

## 3. 기술 스택
- **Next.js 16 App Router**
- UI: **shadcn/ui**, Tailwind
- Motion: **Framer Motion + GSAP**
- Charts: Recharts(또는 Radial/Radar 직접 구현)
- LLM: Google Gemini API (Server Actions에서 호출)
- 외부 검색(유사 제품 탐색):
  - 1순위: **SerpAPI** 또는 **Tavily Search API** (키워드/링크/스니펫 얻기 쉬움)
  - 2순위: Product Hunt API(가능하면), 또는 PH 검색 페이지 스크래핑은 MVP에선 지양
- 저장(옵션): **Vercel KV** (이메일/결과 저장)
- 배포: Vercel

> MVP는 “LLM + 검색 API” 조합만으로 충분. DB 없이도 가능.

---

## 4. 정보 설계 & 점수 모델
### 4.1 입력값
- idea: string (필수)
- targetCustomer: string (선택)
- pricingModel: enum (Free, Subscription, One-time, Usage-based) (선택)
- category: enum (Marketing, DevTools, Creator, B2B, Productivity, Finance, etc.) (선택)
- differentiator: string (선택) — “무엇이 다른가?”

### 4.2 외부 검색에서 가져오는 것 (최소)
- query: idea 요약 키워드 2~4개
- results: [{ title, url, snippet, domain }] 10개 내외
- counts: (가능하면) 결과 수/유사 결과 수(API에서 제공 시)

### 4.3 LLM 분석 산출물 (구조화)
LLM은 반드시 JSON 형태로 리턴(서버에서 zod로 검증)

- extractedKeywords: string[]
- similarProducts: { name, url?, reason, confidence 0-1 }[]
- saturationSignals: string[] (ex: “already many chrome extensions”, “PH clones”, etc.)
- differentiationSignals: string[] (ex: “niche target”, “workflow integration”, etc.)
- risks: { type: "market"|"competition"|"execution"|"distribution", detail, severity 1-5 }[]
- suggestions: string[] (ex: “narrow ICP”, “change wedge”, etc.)

### 4.4 점수 계산 (MVP용)
- SaturationScore (0~100): 높을수록 포화(나쁨)
- DifferentiationScore (0~100): 높을수록 차별화(좋음)
- SurvivalOdds (0~100): 높을수록 생존(좋음)

예시 로직(단순 + 납득 가능):
- baseSaturation:
  - 검색 결과에 “SaaS / tool / platform / ai” 같은 일반 키워드가 많으면 +10~20
  - 유사 제품 confidence 평균이 높으면 +20~40
  - 유사 제품 개수 많으면 +10~30
- baseDifferentiation:
  - targetCustomer가 구체적이면 +10~20
  - differentiator가 존재하고 구체적이면 +10~30
  - risks 중 competition severity 평균이 낮으면 +10
- survival:
  - 100 - (SaturationScore * 0.6 + avgRiskSeverity*8)
  - + (DifferentiationScore * 0.4)
  - 0~100 클램프

최종 레이블:
- 80~100: “Undervalued”
- 60~79: “Competitive but possible”
- 40~59: “Crowded”
- 0~39: “Red Ocean”

---

## 5. UX/모션 설계 (바이럴 중심)
### 5.1 분석 진행(Streaming) 연출
- Stepper UI:
  1) “Extracting keywords…”
  2) “Scanning similar products…”
  3) “Calculating saturation…”
  4) “Generating verdict…”
- 각 step:
  - GSAP로 텍스트/아이콘이 좌→우로 슬라이드
  - Progress bar는 부드러운 ease
  - 숫자(%)는 카운트업(0→최종)

### 5.2 결과 화면(스크린샷 각)
- 히어로: 큰 숫자 3개 (Saturation, Differentiation, Survival)
- Radar chart로 리스크 시각화
- “Most similar” 카드 리스트(로고는 MVP에선 도메인 파비콘 정도)
- “Final Verdict”는 한 줄로 강하게:
  - 예: “You’re entering a red ocean — but there’s a wedge.”

### 5.3 공유 엔진
- 버튼:
  - “Share on X” (미리 작성된 텍스트 + 결과 링크)
  - “Copy image” (선택: html-to-image로 PNG 복사)
- OG 이미지:
  - `/result/[id]` 페이지 공유 시 점수 카드가 OG 이미지로 표시되게

---

## 6. Next.js 16 구현 설계
### 6.1 라우팅
- `/` : Landing + input CTA
- `/analyze` : 입력 폼 (또는 모달)
- `/result/[id]` : 결과 페이지 (id 기반)
- `/api/search` : 검색 API 프록시(서버에서만 키 사용)
- `/api/save-email` : 이메일 저장(옵션)

### 6.2 서버 액션 & 스트리밍
- `app/analyze/actions.ts`
  - `analyzeIdea(formData)`:
    1) 입력 정규화
    2) 검색 API 호출
    3) LLM 분석 호출 (JSON 스키마)
    4) 점수 계산
    5) 결과 객체 반환
- Streaming 방식:
  - 간단 MVP: 클라이언트에서 “가짜 step progress” + 실제 요청 1회
  - 더 진짜같이: Route Handler에서 SSE/ReadableStream으로 단계별 이벤트 전송

> 7일 MVP에서는 “가짜 step progress + 실제 요청 1회”가 속도/안정성 최고.

### 6.3 데이터 저장 (옵션)
- 결과 공유 링크를 위해:
  - **저장 없이도 가능**: 결과를 URL에 넣으면 길어짐/노출 위험
  - 추천: `resultId` 생성 후 **KV에 결과 저장** (TTL 7~30일)
- 이메일 수집:
  - `email -> resultId -> timestamp` 저장

### 6.4 OG 이미지
- `app/result/[id]/opengraph-image.tsx`
  - KV에서 result fetch → 점수 카드 렌더
  - 텍스트는 짧고 강하게, 1200x630

---

## 7. 환경 변수
- `GEMINI_API_KEY`
- `TAVILY_API_KEY`
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` (Vercel KV 사용 시)

---

## 8. 프롬프트 설계 (MVP)
### 시스템/지시 요약
- 목적: “시장 포화도/유사 제품/리스크/차별화”를 구조화 JSON으로 생성
- 입력: 사용자 아이디어 + 검색 결과(top 10)
- 출력: JSON only
- 톤: 냉정하지만 근거 기반, 결과는 자극적 한 줄 포함

### 출력 JSON 스키마 (예)
- extractedKeywords: string[]
- similarProducts: [{ name, url, reason, confidence }]
- saturationSignals: string[]
- differentiationSignals: string[]
- risks: [{ type, detail, severity }]
- verdictOneLiner: string
- suggestions: string[]

---

## 9. 보안/안정성
- 검색 API 키는 반드시 서버에서만 사용
- LLM 결과는 zod로 검증 후 fallback 처리
- rate limit(간단): IP 당 분당 N회 (Vercel Edge middleware or KV 카운터)

---

## 10. 7일 MVP 일정
### Day 1: 제품 골격
- 라우팅/레이아웃
- 입력 폼 UI (shadcn)
- 결과 카드 컴포넌트 설계

### Day 2: 검색 API 연결
- `/api/search` 구현
- 결과 리스트 UI 표시

### Day 3: LLM 분석 + JSON 스키마
- 프롬프트 작성
- zod 검증
- 에러/리트라이 최소 구현

### Day 4: 점수 로직 + 결과 페이지
- Saturation/Diff/Survival 계산
- Radar/Chart 추가
- verdict/suggestions 출력

### Day 5: 모션/연출
- 분석 stepper + 카운트업 + 카드 등장 애니메이션
- 결과 페이지 스크린샷 각 잡기

### Day 6: 공유 시스템
- X 공유 버튼(프리필 텍스트)
- OG 이미지 구현
- (옵션) 결과 KV 저장 + `/result/[id]`

### Day 7: 폴리싱 & 배포
- 모바일 최적화
- SEO(메타/OG)
- 공개용 샘플 결과 3개 만들기
- 런칭 문구/짧은 데모 GIF

---

## 11. 런칭 체크리스트
- 결과 페이지에 “Try yours” CTA 고정
- 공유 문구 템플릿 3종 제공(유저가 선택)
- 랜딩에 “샘플 결과” 섹션 추가(바로 신뢰 확보)
- 크레딧: “Data is indicative, not absolute” (과장 방어)

---

## 12. MVP 완료 정의(DoD)
- 아이디어 입력 → 10~20초 내 결과 출력
- 유사 제품 5개 이상 + 근거 스니펫 노출
- 점수 3개 + verdict 1줄 + suggestion 3개
- `/result/[id]` 공유 링크 열면 OG 이미지가 점수 카드로 보임
- X 공유 버튼 작동

---

## 13. 후속(바이럴 강화) 아이디어
- “Spicy Mode” 토글 (독설 강도)
- “Compare 2 ideas” (A vs B 대결)
- “Leaderboard: Most crowded ideas today” (익명 집계)
- “Remix: 더 niche하게 재작성” 버튼

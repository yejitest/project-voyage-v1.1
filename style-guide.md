# Voyagé — Tailwind CSS Style Guide
> PRD v1.1 기반 · Looper 컬러 × 에어비앤비 레이아웃 × Mistral 픽셀 아트 그래픽
> 
> **폰트:** Nunito (UI 전체) + IBM Plex Mono (데이터·날짜·환율)  
> **디자인 철학:** 에어비앤비의 레이아웃 강약 구조 + Looper의 Purple/Green 브랜드 + Mistral 픽셀 아트 (카테고리 아이콘·섹션 타이틀 전용)

---

## 목차

1. [색상 팔레트](#1-색상-팔레트)
2. [타이포그래피](#2-타이포그래피)
3. [간격 시스템](#3-간격-시스템)
4. [Border Radius](#4-border-radius)
5. [Shadow](#5-shadow)
6. [버튼 컴포넌트](#6-버튼-컴포넌트)
7. [카드 컴포넌트](#7-카드-컴포넌트)
8. [인풋 & 폼 컴포넌트](#8-인풋--폼-컴포넌트)
9. [캘린더 UI](#9-캘린더-ui)
10. [지도 UI](#10-지도-ui)
11. [필터 탭](#11-필터-탭)
12. [모달 레이아웃](#12-모달-레이아웃)
13. [픽셀 아트 그래픽 규칙](#13-픽셀-아트-그래픽-규칙)
14. [tailwind.config.js 전체](#14-tailwindconfigjs-전체)

---

## 1. 색상 팔레트

### 1.1 Primary — Purple (브랜드 메인 · 신뢰 · CTA)

| Token | Hex | Tailwind class | 용도 |
|---|---|---|---|
| `purple-50` | `#F3EDFF` | `bg-purple-50` | 배경 틴트, 뱃지 배경 |
| `purple-200` | `#C4A8F8` | `bg-purple-200` | 호버 보더, 선택 범위 |
| `purple-600` | `#6C3FD6` | `bg-purple-600` | **Primary CTA 버튼** ★ |
| `purple-800` | `#4A2499` | `bg-purple-800` | 호버 상태, 픽셀 아트 딥 |
| `purple-950` | `#2D1566` | `bg-purple-950` | 최다크, Day 카드 헤더 보조 |

```js
// tailwind.config.js
purple: {
  50:  '#F3EDFF',
  200: '#C4A8F8',
  600: '#6C3FD6', // ★ Primary
  800: '#4A2499',
  950: '#2D1566',
},
```

### 1.2 Neutral — Ink & Gray (에어비앤비 텍스트 시스템)

| Token | Hex | Tailwind class | 용도 |
|---|---|---|---|
| `white` | `#FFFFFF` | `bg-white` | 메인 배경, 카드 배경 |
| `gray-50` | `#F7F7F7` | `bg-gray-50` | 페이지 서피스, 스켈레톤 |
| `gray-200` | `#EBEBEB` | `border-gray-200` | 구분선, 카드 보더 |
| `gray-400` | `#DDDDDD` | `border-gray-400` | 인풋 보더, 버튼 보더 |
| `gray-500` | `#717171` | `text-gray-500` | 서브 텍스트, 날짜 보조 |
| `gray-700` | `#484848` | `text-gray-700` | 본문 텍스트 |
| `ink` | `#222222` | `text-ink` | **기본 텍스트** ★ |

```js
// tailwind.config.js
ink: '#222222',
gray: {
  50:  '#F7F7F7',
  200: '#EBEBEB',
  400: '#DDDDDD',
  500: '#717171',
  700: '#484848',
},
```

### 1.3 Accent — Green (혁신 · 성공 · 무비자 · 가성비)

| Token | Hex | Tailwind class | 용도 |
|---|---|---|---|
| `green-50` | `#F0FDF4` | `bg-green-50` | 성공 배지 배경 |
| `green-300` | `#86EFAC` | `bg-green-300` | 라이트 액센트 |
| `green-500` | `#22C55E` | `bg-green-500` | **Success / 일정 생성 CTA** ★ |
| `green-700` | `#16A34A` | `bg-green-700` | 호버, 진한 성공 |

```js
// tailwind.config.js
green: {
  50:  '#F0FDF4',
  300: '#86EFAC',
  500: '#22C55E', // ★ Accent
  700: '#16A34A',
},
```

### 1.4 Semantic — 상태 색상

| 상태 | Color | Hex | 사용 위치 |
|---|---|---|---|
| Action / Primary | Purple | `#6C3FD6` | CTA 버튼, 포커스 링, 탭 언더라인, 날짜 선택 |
| Success | Green | `#22C55E` | 무비자 확인, 예약 완료, 가성비 배지 |
| Warning | Orange | `#EA580C` | 우기 주의, 성수기 가격, Day 카드 저녁 타임 |
| Error | Red | `#DC2626` | 날짜 오류, 입력값 검증 실패 |

---

## 2. 타이포그래피

### 2.1 폰트 패밀리

```html
<!-- Google Fonts 임포트 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| 폰트 | 용도 | Tailwind |
|---|---|---|
| **Nunito** | UI 전체 — 에어비앤비 Circular Std 대체 | `font-sans` |
| **IBM Plex Mono** | 날짜, 환율, 코드 등 데이터 | `font-mono` |

```js
// tailwind.config.js
fontFamily: {
  sans: ['Nunito', 'sans-serif'],
  mono: ['IBM Plex Mono', 'monospace'],
},
```

### 2.2 타이포그래피 스케일

| 역할 | 크기 | Weight | Letter-spacing | 사용 위치 | Tailwind |
|---|---|---|---|---|---|
| `hero` | 30px | 800 | -0.03em | 여행지명 히어로 타이틀 | `text-[30px] font-extrabold tracking-tighter` |
| `h1` | 22px | 700 | -0.02em | 섹션 메인 헤딩 | `text-[22px] font-bold tracking-tight` |
| `h2` | 18px | 700 | 0 | 서브 섹션 헤딩 + 픽셀 아이콘 | `text-lg font-bold` |
| `h3` | 15px | 600 | 0 | 카드 타이틀, Day 헤딩 | `text-[15px] font-semibold` |
| `body` | 14px | 400 | 0 | 본문 텍스트 | `text-sm font-normal leading-relaxed` |
| `small` | 12px | 400 | 0 | 메타 정보, 보조 설명 | `text-xs font-normal` |
| `label` | 11px | 700 | +0.08em | 폼 레이블, 카드 뱃지 | `text-[11px] font-bold uppercase tracking-wider` |
| `mono` | 12px | 400–500 | 0 | 환율, 날짜, 코드 | `text-xs font-mono` |

### 2.3 픽셀 아트 섹션 타이틀 패턴

카테고리 섹션 타이틀(h2)에는 반드시 픽셀 아트 SVG 아이콘을 왼쪽에 배치한다.

```html
<!-- h2 섹션 타이틀 패턴 -->
<div class="flex items-center gap-2.5 text-lg font-bold text-ink">
  <!-- 픽셀 아트 아이콘 (24×24, image-rendering: pixelated) -->
  <svg width="22" height="22" viewBox="0 0 14 14"
       xmlns="http://www.w3.org/2000/svg"
       style="image-rendering: pixelated">
    <!-- 역사·문화 아이콘 예시 -->
    <rect x="0" y="12" width="14" height="2" fill="#6C3FD6"/>
    <rect x="6" y="6" width="2" height="4" fill="#22C55E"/>
    <!-- ... -->
  </svg>
  추천 관광지
</div>
```

---

## 3. 간격 시스템

8px 베이스 그리드 기반. 에어비앤비 컴포넌트 패딩 기준을 따른다.

| px | Tailwind | 용도 |
|---|---|---|
| 4px | `p-1` / `gap-1` | 아이콘 gap, 뱃지 내부 패딩 |
| 8px | `p-2` / `gap-2` | 인라인 요소 gap, 태그 간격 |
| 12px | `p-3` / `gap-3` | 버튼 y패딩, 카드 바디 내부 gap |
| 16px | `p-4` / `gap-4` | 카드 바디 패딩 (기본), 섹션 내 gap |
| 20px | `p-5` / `gap-5` | 모달 바디 패딩, 정보 카드 x패딩 |
| 24px | `p-6` / `gap-6` | 사이드 예약 카드 내부, 섹션 x패딩 |
| 32px | `p-8` / `gap-8` | 섹션 간 분리, 2-col 컬럼 gap |
| 48px | `pt-12` | 섹션 상단 여백, 페이지 수직 리듬 |

---

## 4. Border Radius

| 값 | Tailwind | 용도 |
|---|---|---|
| `0` | `rounded-none` | 없음 |
| `4px` | `rounded` | 소형 뱃지 |
| `8px` | `rounded-lg` ★ | **버튼, 인풋, 날짜 셀** 기본값 |
| `12px` | `rounded-xl` | 코드 블록, 소형 카드 |
| `16px` | `rounded-2xl` ★ | **카드 이미지, 모달, 정보 카드** 기본값 |
| `24px` | `rounded-3xl` | 대형 모달 |
| `9999px` | `rounded-full` | **검색 필, 필터 칩, 뱃지 pill** |

```js
// tailwind.config.js
borderRadius: {
  DEFAULT: '8px',   // 버튼·인풋
  '2xl':  '16px',   // ★ 카드·모달 기본
  '3xl':  '24px',   // 모달 대형
  full:   '9999px', // 검색 필·필터 칩
},
```

---

## 5. Shadow

```js
// tailwind.config.js
boxShadow: {
  card:    '0 1px 2px rgba(0,0,0,0.08)',
  booking: '0 6px 20px rgba(0,0,0,0.10)',
  search:  '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
  modal:   '0 8px 40px rgba(0,0,0,0.12)',
},
```

| Token | 용도 |
|---|---|
| `shadow-card` | 일반 카드 hover 효과 |
| `shadow-booking` | 우측 sticky 예약 카드 |
| `shadow-search` | 상단 검색 필 |
| `shadow-modal` | 모달 오버레이 |

---

## 6. 버튼 컴포넌트

### 6.1 Primary — 여행지 추천, 핵심 액션

```html
<button class="bg-purple-600 text-white text-sm font-bold
               px-[22px] py-3 rounded-lg
               hover:bg-purple-800 active:scale-[0.98]
               transition-colors duration-150">
  여행지 추천받기
</button>
```

### 6.2 Primary Green — 일정 생성, 성공 액션

```html
<button class="bg-green-500 text-white text-sm font-bold
               px-[22px] py-3 rounded-lg
               hover:bg-green-700
               transition-colors duration-150">
  일정 생성
</button>
```

### 6.3 Secondary — 상세 보기, 보조 액션

```html
<button class="bg-white text-ink text-sm font-bold
               border border-gray-400 px-[22px] py-[11px] rounded-lg
               hover:border-ink
               transition-colors duration-150">
  상세 보기
</button>
```

### 6.4 Ghost — 다시 생성, 취소

```html
<button class="bg-transparent text-purple-600 text-sm font-bold
               border border-purple-600 px-[22px] py-[11px] rounded-lg
               hover:bg-purple-50
               transition-colors duration-150">
  다시 생성
</button>
```

### 6.5 Text — 더 보기, PDF 내보내기

```html
<button class="bg-transparent border-none text-ink text-sm font-bold
               underline underline-offset-[3px] py-2 cursor-pointer">
  PDF 내보내기 →
</button>
```

### 6.6 Icon Round — 찜하기, 공유

```html
<button class="w-10 h-10 rounded-full bg-white
               border border-gray-400
               flex items-center justify-center text-[15px]
               hover:border-ink transition-colors">
  ♡
</button>
```

### 6.7 비활성화 (Disabled)

```html
<button class="bg-purple-600 text-white ... opacity-40 cursor-not-allowed"
        disabled>
  비활성화
</button>
```

---

## 7. 카드 컴포넌트

### 7.1 Destination Card — 여행지 추천 카드 (에어비앤비 1:1)

```html
<div class="cursor-pointer group">
  <!-- 이미지 영역 -->
  <div class="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-[10px]">
    <img src="..." alt="방콕" class="w-full h-full object-cover
         group-hover:scale-[1.02] transition-transform duration-300"/>

    <!-- 찜하기 버튼 -->
    <button class="absolute top-[10px] right-[10px] text-[22px]
                   text-white/90 drop-shadow-sm bg-transparent border-none">
      ♡
    </button>

    <!-- 게스트 추천 배지 -->
    <div class="absolute top-[10px] left-[10px] bg-white rounded
                px-[9px] py-1 text-[11px] font-bold text-ink
                flex items-center gap-1 shadow-sm">
      <!-- 픽셀 아트 스타 아이콘 (10×10) -->
      <svg width="10" height="10" viewBox="0 0 8 8"
           xmlns="http://www.w3.org/2000/svg"
           style="image-rendering: pixelated">
        <rect x="3" y="0" width="2" height="2" fill="#EA580C"/>
        <rect x="1" y="2" width="6" height="2" fill="#EA580C"/>
        <rect x="0" y="4" width="8" height="2" fill="#EA580C"/>
        <rect x="2" y="6" width="4" height="2" fill="#EA580C"/>
      </svg>
      게스트 추천
    </div>
  </div>

  <!-- 텍스트 영역 -->
  <div class="px-0.5">
    <div class="flex justify-between items-start">
      <span class="text-sm font-bold text-ink">방콕, 태국</span>
      <span class="text-[13px] font-medium flex items-center gap-1">★ 4.92</span>
    </div>
    <p class="text-[13px] text-gray-500 mt-0.5">겨울 탈출 · 무비자 · 2박 3일</p>
    <p class="text-[13px] text-gray-500">12월 27일 – 29일</p>
    <p class="text-sm mt-1">
      <strong class="font-bold text-ink">₩280,000</strong>
      <span class="text-ink font-normal"> / 박 예상</span>
    </p>
  </div>
</div>
```

**카드 그리드:**
```html
<div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
  <!-- Destination Cards -->
</div>
```

### 7.2 Skeleton Card

```html
<div>
  <div class="w-full aspect-square rounded-2xl mb-[10px]
              bg-gradient-to-r from-gray-50 via-gray-200 to-gray-50
              bg-[length:400%_100%] animate-[shimmer_1.5s_infinite]">
  </div>
  <div class="h-[14px] rounded-md bg-gray-50 mb-1.5 w-[70%]
              animate-[shimmer_1.5s_infinite]"></div>
  <div class="h-[14px] rounded-md bg-gray-50 mb-1.5 w-1/2
              animate-[shimmer_1.5s_infinite]"></div>
</div>
```

```js
// tailwind.config.js — shimmer keyframe 추가
keyframes: {
  shimmer: {
    '0%':   { backgroundPosition: '100% 0' },
    '100%': { backgroundPosition: '-100% 0' },
  },
},
animation: {
  shimmer: 'shimmer 1.5s infinite',
},
```

### 7.3 Info Card — 환율·날씨 (모달 탭1)

```html
<div class="border border-gray-200 rounded-2xl overflow-hidden">
  <!-- 헤더 -->
  <div class="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
    <div class="w-9 h-9 rounded-lg bg-purple-50
                flex items-center justify-center">
      <!-- 픽셀 아트 아이콘 (20×20) -->
      <svg width="20" height="20" ...></svg>
    </div>
    <span class="text-[15px] font-bold text-ink">환율 · 시차</span>
  </div>

  <!-- 데이터 행 -->
  <div class="flex justify-between items-center px-5 py-3 border-b border-gray-50">
    <span class="text-[13px] text-gray-500">1 THB</span>
    <span class="font-mono text-[13px] font-semibold text-ink">38.2 KRW</span>
  </div>
  <div class="flex justify-between items-center px-5 py-3 border-b border-gray-50">
    <span class="text-[13px] text-gray-500">비자</span>
    <span class="font-mono text-[13px] font-semibold text-green-700">무비자 ✓</span>
  </div>
  <!-- ... 추가 행 반복 -->
</div>
```

### 7.4 Day-by-Day 일정 카드 (모달 탭3)

```html
<div class="border border-gray-200 rounded-2xl overflow-hidden mb-3">
  <!-- 헤더 -->
  <div class="bg-[#1A1A2E] px-5 py-3.5
              flex justify-between items-center">
    <span class="text-sm font-bold text-white flex items-center gap-2">
      <!-- 픽셀 아트 Day 마커 (16×16) -->
      <svg width="16" height="16" viewBox="0 0 8 8"
           xmlns="http://www.w3.org/2000/svg"
           style="image-rendering: pixelated">
        <rect x="0" y="0" width="8" height="8" fill="#6C3FD6"/>
        <rect x="2" y="2" width="4" height="4" fill="#F3EDFF"/>
      </svg>
      Day 1
    </span>
    <span class="font-mono text-xs text-white/55">12월 27일 (토) · 입국일</span>
  </div>

  <!-- 일정 행 -->
  <div class="flex gap-3.5 px-5 py-3.5 border-b border-gray-50 items-start">
    <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full
                 bg-purple-50 text-purple-600 flex-shrink-0 mt-0.5">
      오전
    </span>
    <div>
      <p class="text-sm font-semibold text-ink">수완나품 공항 입국</p>
      <p class="text-[13px] text-gray-500 mt-0.5">→ 호텔 체크인 (실롬 / 수쿰빗 추천)</p>
    </div>
  </div>

  <div class="flex gap-3.5 px-5 py-3.5 border-b border-gray-50 items-start">
    <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full
                 bg-orange-50 text-orange-600 flex-shrink-0 mt-0.5">
      오후
    </span>
    <div>
      <p class="text-sm font-semibold text-ink">왓 포 사원 방문 (약 2시간)</p>
      <p class="text-[13px] text-gray-500 mt-0.5">→ 카오산 로드 주변 탐방</p>
    </div>
  </div>

  <div class="flex gap-3.5 px-5 py-3.5 items-start">
    <span class="text-[11px] font-bold px-2.5 py-0.5 rounded-full
                 bg-[#1A1A2E] text-white/80 flex-shrink-0 mt-0.5">
      저녁
    </span>
    <div>
      <p class="text-sm font-semibold text-ink">짜오프라야강 야경 디너 크루즈</p>
    </div>
  </div>
</div>
```

### 7.5 Booking Card — 우측 Sticky 예약 카드

```html
<div class="border border-gray-400 rounded-2xl p-6 shadow-booking sticky top-20">
  <p class="text-[22px] font-bold text-ink mb-4">
    ₩280,000 <span class="text-sm font-normal text-gray-500">/ 박 예상</span>
  </p>

  <!-- 날짜 선택 -->
  <div class="grid grid-cols-2 border border-ink rounded-lg overflow-hidden mb-3">
    <div class="px-3.5 py-2.5 border-r border-gray-400 cursor-pointer hover:bg-gray-50">
      <p class="text-[10px] font-bold uppercase tracking-wider text-ink">체크인</p>
      <p class="text-[13px] text-gray-700 mt-0.5">12월 27일</p>
    </div>
    <div class="px-3.5 py-2.5 cursor-pointer hover:bg-gray-50">
      <p class="text-[10px] font-bold uppercase tracking-wider text-ink">체크아웃</p>
      <p class="text-[13px] text-gray-700 mt-0.5">12월 29일</p>
    </div>
  </div>

  <!-- 여행자 -->
  <div class="border border-gray-400 rounded-lg px-3.5 py-3 mb-4
              flex justify-between items-center cursor-pointer hover:border-ink">
    <div>
      <p class="text-[10px] font-bold uppercase tracking-wider text-ink">여행자</p>
      <p class="text-[13px] text-gray-700 mt-0.5">성인 2명</p>
    </div>
    <span class="text-gray-500 text-sm">∨</span>
  </div>

  <!-- CTA 버튼 -->
  <button class="w-full bg-purple-600 text-white text-[15px] font-bold
                 py-3.5 rounded-lg mb-3 hover:bg-purple-800 transition-colors">
    일정 생성하기
  </button>

  <!-- 가격 내역 -->
  <div class="flex flex-col gap-2.5">
    <div class="flex justify-between text-sm text-gray-700">
      <span>₩280,000 × 2박</span><span>₩560,000</span>
    </div>
    <div class="flex justify-between text-sm text-gray-700">
      <span>항공 예상 (직항)</span><span>₩420,000</span>
    </div>
    <div class="flex justify-between text-sm text-gray-700">
      <span>서비스 수수료</span><span>무료</span>
    </div>
    <div class="flex justify-between text-sm font-bold text-ink
                border-t border-gray-200 pt-2.5">
      <span>총 예상 비용</span><span>₩980,000</span>
    </div>
  </div>
</div>
```

---

## 8. 인풋 & 폼 컴포넌트

### 8.1 기본 Input

```html
<!-- 레이블 -->
<label class="text-[13px] font-bold text-ink block mb-1.5">여행지 검색</label>

<!-- 인풋 -->
<input
  type="text"
  placeholder="도시명 또는 국가 입력"
  class="w-full px-4 py-[13px] border border-gray-400 rounded-lg
         font-sans text-sm text-ink placeholder:text-[#B0B0B0]
         outline-none
         focus:border-ink focus:ring-2 focus:ring-ink/[0.08]
         transition-shadow duration-150"
/>
```

### 8.2 Select

```html
<select class="w-full px-4 py-[13px] pr-10
               border border-gray-400 rounded-lg
               font-sans text-sm text-ink
               outline-none appearance-none cursor-pointer
               bg-white bg-[url('data:image/svg+xml,...')] bg-no-repeat bg-[right_14px_center]
               focus:border-ink">
  <option>전체 지역</option>
  <option>🌏 아시아</option>
  <option>🌍 유럽</option>
</select>
```

### 8.3 날짜 분할 Input (에어비앤비 패턴)

```html
<div class="grid grid-cols-2 border-[1.5px] border-ink rounded-lg overflow-hidden">
  <div class="px-4 py-3 border-r border-gray-400 cursor-pointer hover:bg-gray-50">
    <p class="text-[10px] font-bold uppercase tracking-wider text-ink">체크인</p>
    <p class="text-[13px] text-gray-700 mt-0.5">12월 27일</p>
  </div>
  <div class="px-4 py-3 cursor-pointer hover:bg-gray-50">
    <p class="text-[10px] font-bold uppercase tracking-wider text-ink">체크아웃</p>
    <p class="text-[13px] text-gray-700 mt-0.5">12월 29일</p>
  </div>
</div>
```

### 8.4 검색 필 (에어비앤비 중앙 검색바)

```html
<div class="flex items-center border border-gray-400 rounded-full
            shadow-search overflow-hidden max-w-[480px]
            hover:shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-shadow cursor-pointer">

  <div class="flex-1 px-[18px] py-[10px] border-r border-gray-200 hover:bg-gray-50">
    <p class="text-[11px] font-bold text-ink">여행지</p>
    <p class="text-xs text-gray-500">어디로 가시나요?</p>
  </div>

  <div class="flex-1 px-[18px] py-[10px] border-r border-gray-200 hover:bg-gray-50">
    <p class="text-[11px] font-bold text-ink">체크인</p>
    <p class="text-xs text-gray-500 whitespace-nowrap">날짜 추가</p>
  </div>

  <div class="flex-1 px-[18px] py-[10px] hover:bg-gray-50">
    <p class="text-[11px] font-bold text-ink">체크아웃</p>
    <p class="text-xs text-gray-500 whitespace-nowrap">날짜 추가</p>
  </div>

  <button class="bg-purple-600 text-white w-9 h-9 rounded-full m-1.5
                 flex items-center justify-center text-sm flex-shrink-0
                 hover:bg-purple-800 transition-colors">
    🔍
  </button>
</div>
```

---

## 9. 캘린더 UI

에어비앤비 체크인/체크아웃 달력. 날짜 범위 선택 시 Purple 강조.

```html
<div class="border border-gray-200 rounded-2xl overflow-hidden">
  <!-- 헤더 -->
  <div class="flex justify-between items-center px-5 py-4 border-b border-gray-50">
    <span class="text-[15px] font-bold text-ink">2025년 12월</span>
    <div class="flex gap-2">
      <button class="w-8 h-8 rounded-full bg-white border border-gray-400
                     flex items-center justify-center text-xs text-ink">‹</button>
      <button class="w-8 h-8 rounded-full bg-white border border-gray-400
                     flex items-center justify-center text-xs text-ink">›</button>
    </div>
  </div>

  <!-- 달력 본체 -->
  <div class="p-4">
    <!-- 요일 헤더 -->
    <div class="grid grid-cols-7 gap-0.5 mb-2">
      <div class="text-center text-[11px] font-bold text-gray-500 py-1">일</div>
      <!-- 월 화 수 목 금 토 반복 -->
    </div>

    <!-- 날짜 그리드 -->
    <div class="grid grid-cols-7 gap-0.5">

      <!-- 빈 칸 -->
      <div></div>

      <!-- 일반 날짜 -->
      <div class="aspect-square flex items-center justify-center
                  text-[13px] font-medium text-ink rounded-full
                  cursor-pointer hover:bg-gray-50">
        1
      </div>

      <!-- 선택 범위 시작 (27일) -->
      <div class="aspect-square flex items-center justify-center
                  text-[13px] font-medium text-white
                  bg-purple-600 rounded-[50%_0_0_50%] cursor-pointer">
        27
      </div>

      <!-- 선택 범위 중간 (28일) -->
      <div class="aspect-square flex items-center justify-center
                  text-[13px] font-medium text-ink
                  bg-purple-50 rounded-none cursor-pointer">
        28
      </div>

      <!-- 선택 범위 끝 (29일) -->
      <div class="aspect-square flex items-center justify-center
                  text-[13px] font-medium text-white
                  bg-purple-600 rounded-[0_50%_50%_0] cursor-pointer">
        29
      </div>

      <!-- 비활성 날짜 -->
      <div class="aspect-square flex items-center justify-center
                  text-[13px] text-gray-400 line-through cursor-not-allowed">
        1
      </div>
    </div>

    <!-- 선택 박 수 -->
    <p class="text-center text-[13px] text-gray-500 mt-3">
      <strong class="text-ink font-bold">2박</strong> 선택됨 · 12월 27일 → 12월 29일
    </p>
  </div>
</div>
```

**2달 나란히 레이아웃:**
```html
<div class="grid grid-cols-2 gap-4">
  <!-- 이번 달 캘린더 -->
  <!-- 다음 달 캘린더 -->
</div>
```

---

## 10. 지도 UI

에어비앤비식 지도 핀 카드. 흰 배경 = 선택됨, 검정 배경 = 미선택.

```html
<div class="relative rounded-2xl overflow-hidden border border-gray-200" style="height: 280px">
  <!-- 지도 배경 (실제 구현 시 Google Maps / Mapbox 교체) -->
  <div class="w-full h-full bg-[#E8E0D4]">
    <!-- 지도 컴포넌트 -->
  </div>

  <!-- 지역 레이블 (픽셀 아트 느낌의 작은 레이블) -->
  <div class="absolute top-10 left-[140px]
              bg-white/90 backdrop-blur-sm rounded
              px-2 py-0.5 text-[11px] font-semibold text-gray-700
              border border-black/[0.08]">
    수쿰빗
  </div>

  <!-- 가격 핀 — 미선택 (검정 배경) -->
  <div class="absolute cursor-pointer
              bg-[#222222] text-white rounded-[20px]
              px-3.5 py-[7px] text-[13px] font-bold
              shadow-[0_3px_10px_rgba(0,0,0,0.25)] whitespace-nowrap
              after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2
              after:-translate-x-1/2 after:border-[6px] after:border-transparent
              after:border-t-[#222222] after:border-b-0"
       style="left: 32%; top: 55%; transform: translate(-50%, -110%)">
    ₩280,000
  </div>

  <!-- 장소 핀 — 선택됨 (흰 배경) -->
  <div class="absolute cursor-pointer
              bg-white text-ink border border-ink rounded-[20px]
              px-3.5 py-[7px] text-[13px] font-bold
              shadow-[0_3px_10px_rgba(0,0,0,0.25)] whitespace-nowrap"
       style="left: 55%; top: 45%; transform: translate(-50%, -110%)">
    왓 포 사원
  </div>
</div>
```

---

## 11. 필터 탭

에어비앤비 카테고리 탭. 픽셀 아트 아이콘 + 텍스트 세로 배치. 선택 시 `border-b-2 border-ink`.

```html
<div class="flex overflow-x-auto border-b border-gray-200 px-6 -mx-6">

  <!-- 활성 탭 -->
  <button class="flex flex-col items-center gap-1.5
                 px-5 py-3 flex-shrink-0
                 text-xs font-semibold text-ink
                 border-b-2 border-ink
                 transition-all duration-150">
    <!-- 픽셀 아트 아이콘 (24×24) -->
    <svg class="w-6 h-6" viewBox="0 0 14 14"
         xmlns="http://www.w3.org/2000/svg"
         style="image-rendering: pixelated">
      <!-- 아시아 아이콘 픽셀 데이터 -->
      <rect x="5" y="0" width="4" height="2" fill="#222222"/>
      <rect x="3" y="2" width="8" height="2" fill="#222222"/>
      <rect x="1" y="4" width="12" height="2" fill="#222222"/>
      <rect x="3" y="6" width="4" height="2" fill="#222222"/>
      <rect x="8" y="6" width="2" height="2" fill="#222222"/>
      <rect x="3" y="10" width="8" height="2" fill="#222222"/>
      <rect x="5" y="12" width="4" height="2" fill="#222222"/>
    </svg>
    아시아
  </button>

  <!-- 비활성 탭 -->
  <button class="flex flex-col items-center gap-1.5
                 px-5 py-3 flex-shrink-0
                 text-xs font-semibold text-gray-500
                 border-b-2 border-transparent
                 hover:text-ink transition-all duration-150">
    <svg class="w-6 h-6" viewBox="0 0 14 14"
         xmlns="http://www.w3.org/2000/svg"
         style="image-rendering: pixelated">
      <!-- 유럽 아이콘 픽셀 데이터 -->
      <rect x="0" y="4" width="14" height="2" fill="#717171"/>
      <rect x="0" y="4" width="2" height="6" fill="#717171"/>
      <rect x="12" y="4" width="2" height="6" fill="#717171"/>
      <rect x="0" y="10" width="14" height="2" fill="#717171"/>
      <rect x="4" y="2" width="2" height="2" fill="#717171"/>
      <rect x="8" y="2" width="2" height="2" fill="#717171"/>
      <rect x="4" y="6" width="2" height="2" fill="#EBEBEB"/>
      <rect x="8" y="6" width="2" height="2" fill="#EBEBEB"/>
      <rect x="6" y="12" width="2" height="2" fill="#717171"/>
    </svg>
    유럽
  </button>

  <!-- 나머지 탭 반복: 아메리카, 오세아니아 -->
</div>
```

---

## 12. 모달 레이아웃

### 12.1 여행지 상세 모달 (에어비앤비 상세 페이지 2-Column 패턴)

```html
<!-- 포토 그리드 (5장) -->
<div class="grid grid-cols-2 grid-rows-2 gap-2 rounded-xl overflow-hidden"
     style="grid-template-rows: 200px 200px">

  <!-- 메인 사진 (세로 2칸) -->
  <div class="row-span-2 bg-gray-50 relative overflow-hidden rounded-l-xl">
    <img src="..." class="w-full h-full object-cover"/>
    <button class="absolute bottom-3.5 right-3.5 bg-white border border-ink
                   rounded-lg px-3.5 py-[7px] text-[13px] font-bold text-ink
                   flex items-center gap-1.5">
      사진 모두 보기
    </button>
  </div>

  <!-- 우측 작은 사진 4장 -->
  <div class="bg-gray-50 overflow-hidden rounded-tr-xl"><img .../></div>
  <div class="bg-gray-50 overflow-hidden"><img .../></div>
  <div class="bg-gray-50 overflow-hidden"><img .../></div>
  <div class="bg-gray-50 overflow-hidden rounded-br-xl"><img .../></div>
</div>

<!-- 2-Column 상세 레이아웃 -->
<div class="grid grid-cols-[1fr_340px] gap-12 pt-8">

  <!-- 왼쪽: 여행지 정보 -->
  <div>
    <!-- 도시 헤딩 -->
    <div class="pb-6 border-b border-gray-200 mb-6">
      <h1 class="text-[26px] font-bold text-ink tracking-tight mb-1">방콕 Bangkok</h1>
      <div class="flex flex-wrap gap-1 items-center text-sm text-gray-700">
        <span>⭐ 4.92</span>
        <span class="text-gray-400"> · </span>
        <span class="underline underline-offset-[3px] cursor-pointer font-semibold">후기 127개</span>
        <span class="text-gray-400"> · </span>
        <span>태국 · 2박 3일</span>
      </div>
      <div class="flex gap-1.5 flex-wrap mt-2.5">
        <span class="text-xs font-semibold text-gray-700 border border-gray-200 rounded-full px-3 py-1">🌡 28°C</span>
        <span class="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 rounded-full px-3 py-1">무비자 ✓</span>
        <span class="text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-200 rounded-full px-3 py-1">게스트 추천</span>
      </div>
    </div>

    <!-- 탭 바 -->
    <div class="flex border-b border-gray-200 mb-5">
      <button class="text-sm font-bold text-ink px-[18px] py-3.5
                     border-b-2 border-ink whitespace-nowrap">기본 정보</button>
      <button class="text-sm font-medium text-gray-500 px-[18px] py-3.5
                     border-b-2 border-transparent hover:text-ink
                     whitespace-nowrap transition-all">추천 관광지</button>
      <button class="text-sm font-medium text-gray-500 px-[18px] py-3.5
                     border-b-2 border-transparent hover:text-ink
                     whitespace-nowrap transition-all">Day-by-Day 일정</button>
    </div>

    <!-- 탭 콘텐츠 영역 -->
    <!-- ... -->
  </div>

  <!-- 오른쪽: Sticky 예약 카드 -->
  <!-- (7.5 Booking Card 참고) -->
</div>
```

---

## 13. 픽셀 아트 그래픽 규칙

픽셀 아트는 **카테고리 아이콘, 섹션 타이틀 데코, 로고 마크, 카드 배지 내 아이콘**에만 적용한다. UI 본체(카드, 버튼, 인풋, 레이아웃)에는 사용하지 않는다.

### 적용 규칙

| 규칙 | 내용 |
|---|---|
| `image-rendering` | 반드시 `pixelated` 적용 |
| 크기 | 카테고리 필터 탭: 24×24px / 섹션 타이틀: 22×22px / 배지: 10×10px |
| viewBox | 14×14 또는 8×8 그리드 기반 |
| 컬러 | Purple(`#6C3FD6`, `#4A2499`, `#2D1566`) + Green(`#22C55E`, `#16A34A`) + White(`#F3EDFF`) |
| 배경 | 투명 (`fill="none"`) |

### 픽셀 아트 SVG 아이콘 모음

```html
<!-- 아시아 (지구 모양) -->
<svg width="24" height="24" viewBox="0 0 14 14"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated">
  <rect x="5" y="0" width="4" height="2" fill="#6C3FD6"/>
  <rect x="3" y="2" width="8" height="2" fill="#6C3FD6"/>
  <rect x="1" y="4" width="12" height="2" fill="#6C3FD6"/>
  <rect x="3" y="6" width="4" height="2" fill="#6C3FD6"/>
  <rect x="8" y="6" width="2" height="2" fill="#6C3FD6"/>
  <rect x="4" y="8" width="2" height="2" fill="#6C3FD6"/>
  <rect x="8" y="8" width="3" height="2" fill="#6C3FD6"/>
  <rect x="3" y="10" width="8" height="2" fill="#22C55E"/>
  <rect x="5" y="12" width="4" height="2" fill="#22C55E"/>
</svg>

<!-- 유럽 (창문/건물) -->
<svg width="24" height="24" viewBox="0 0 14 14"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated">
  <rect x="0" y="4" width="14" height="2" fill="#6C3FD6"/>
  <rect x="0" y="4" width="2" height="6" fill="#6C3FD6"/>
  <rect x="12" y="4" width="2" height="6" fill="#6C3FD6"/>
  <rect x="0" y="10" width="14" height="2" fill="#6C3FD6"/>
  <rect x="4" y="2" width="2" height="2" fill="#6C3FD6"/>
  <rect x="8" y="2" width="2" height="2" fill="#6C3FD6"/>
  <rect x="4" y="6" width="2" height="2" fill="#4A2499"/>
  <rect x="8" y="6" width="2" height="2" fill="#4A2499"/>
  <rect x="6" y="12" width="2" height="2" fill="#22C55E"/>
</svg>

<!-- 역사·문화 (사원/기둥) -->
<svg width="24" height="24" viewBox="0 0 14 14"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated">
  <rect x="0" y="12" width="14" height="2" fill="#6C3FD6"/>
  <rect x="0" y="10" width="14" height="2" fill="#4A2499"/>
  <rect x="2" y="4" width="2" height="6" fill="#6C3FD6"/>
  <rect x="6" y="2" width="2" height="8" fill="#6C3FD6"/>
  <rect x="10" y="4" width="2" height="6" fill="#6C3FD6"/>
  <rect x="0" y="2" width="14" height="2" fill="#6C3FD6"/>
  <rect x="4" y="0" width="6" height="2" fill="#6C3FD6"/>
  <rect x="6" y="6" width="2" height="4" fill="#22C55E"/>
</svg>

<!-- 자연·휴양 (나무) -->
<svg width="24" height="24" viewBox="0 0 14 14"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated">
  <rect x="6" y="0" width="2" height="2" fill="#22C55E"/>
  <rect x="4" y="2" width="6" height="2" fill="#22C55E"/>
  <rect x="2" y="4" width="10" height="2" fill="#22C55E"/>
  <rect x="0" y="6" width="14" height="2" fill="#22C55E"/>
  <rect x="2" y="8" width="10" height="2" fill="#16A34A"/>
  <rect x="6" y="8" width="2" height="6" fill="#6C3FD6"/>
  <rect x="4" y="12" width="6" height="2" fill="#6C3FD6"/>
</svg>

<!-- 미식·야시장 (냄비/그릇) -->
<svg width="24" height="24" viewBox="0 0 14 14"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated">
  <rect x="2" y="0" width="2" height="6" fill="#EA580C"/>
  <rect x="6" y="0" width="2" height="6" fill="#EA580C"/>
  <rect x="10" y="0" width="2" height="6" fill="#EA580C"/>
  <rect x="0" y="6" width="14" height="2" fill="#6C3FD6"/>
  <rect x="2" y="8" width="10" height="4" fill="#6C3FD6"/>
  <rect x="4" y="12" width="6" height="2" fill="#4A2499"/>
  <rect x="4" y="10" width="6" height="2" fill="#F3EDFF"/>
</svg>

<!-- 쇼핑 (쇼핑백) -->
<svg width="24" height="24" viewBox="0 0 14 14"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated">
  <rect x="4" y="0" width="6" height="2" fill="#6C3FD6"/>
  <rect x="2" y="2" width="2" height="2" fill="#6C3FD6"/>
  <rect x="10" y="2" width="2" height="2" fill="#6C3FD6"/>
  <rect x="0" y="4" width="14" height="8" fill="#6C3FD6"/>
  <rect x="2" y="6" width="4" height="4" fill="#F3EDFF"/>
  <rect x="8" y="6" width="4" height="4" fill="#F3EDFF"/>
  <rect x="0" y="12" width="14" height="2" fill="#4A2499"/>
  <rect x="6" y="7" width="2" height="4" fill="#22C55E"/>
</svg>

<!-- 브랜드 로고 마크 -->
<svg width="28" height="28" viewBox="0 0 16 16"
     xmlns="http://www.w3.org/2000/svg" style="image-rendering: pixelated">
  <rect x="6" y="0" width="4" height="2" fill="#6C3FD6"/>
  <rect x="4" y="2" width="8" height="2" fill="#6C3FD6"/>
  <rect x="2" y="4" width="12" height="2" fill="#6C3FD6"/>
  <rect x="0" y="6" width="16" height="2" fill="#6C3FD6"/>
  <rect x="2" y="8" width="5" height="2" fill="#6C3FD6"/>
  <rect x="9" y="8" width="5" height="2" fill="#6C3FD6"/>
  <rect x="4" y="10" width="3" height="2" fill="#6C3FD6"/>
  <rect x="9" y="10" width="3" height="2" fill="#6C3FD6"/>
  <rect x="6" y="10" width="4" height="4" fill="#22C55E"/>
  <rect x="7" y="12" width="2" height="2" fill="#16A34A"/>
</svg>
```

---

## 14. tailwind.config.js 전체

```js
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {

      // ── 컬러 ──────────────────────────────────
      colors: {
        // 에어비앤비 기본 텍스트
        ink: '#222222',

        // Looper 브랜드 Primary
        purple: {
          50:  '#F3EDFF',
          200: '#C4A8F8',
          600: '#6C3FD6', // ★ Primary CTA
          800: '#4A2499',
          950: '#2D1566',
        },

        // Accent — 성공·무비자·가성비
        green: {
          50:  '#F0FDF4',
          300: '#86EFAC',
          500: '#22C55E', // ★ Success CTA
          700: '#16A34A',
        },

        // 에어비앤비 그레이 시스템
        gray: {
          50:  '#F7F7F7',
          200: '#EBEBEB',
          400: '#DDDDDD',
          500: '#717171',
          700: '#484848',
        },
      },

      // ── 폰트 ──────────────────────────────────
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },

      // ── Border Radius ─────────────────────────
      borderRadius: {
        DEFAULT: '8px',   // 버튼·인풋 기본
        '2xl':   '16px',  // ★ 카드·정보카드 기본
        '3xl':   '24px',  // 대형 모달
        full:    '9999px', // 검색 필·필터 칩
      },

      // ── Shadow ────────────────────────────────
      boxShadow: {
        card:    '0 1px 2px rgba(0,0,0,0.08)',
        booking: '0 6px 20px rgba(0,0,0,0.10)',
        search:  '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
        modal:   '0 8px 40px rgba(0,0,0,0.12)',
      },

      // ── 추가 키프레임 (스켈레톤 shimmer) ──────
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },

    },
  },
  plugins: [],
};
```

---

## 컴포넌트 사용 요약표

| 컴포넌트 | 핵심 클래스 | 비고 |
|---|---|---|
| Primary 버튼 | `bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-800` | |
| Success 버튼 | `bg-green-500 text-white rounded-lg font-bold hover:bg-green-700` | 일정 생성 전용 |
| Secondary 버튼 | `bg-white border border-gray-400 rounded-lg hover:border-ink` | |
| 인풋 | `border border-gray-400 rounded-lg focus:border-ink focus:ring-2 focus:ring-ink/[0.08]` | |
| 카드 | `rounded-2xl overflow-hidden border border-gray-200` | |
| 카드 이미지 | `aspect-square rounded-2xl overflow-hidden` | |
| 모달 | `rounded-2xl shadow-modal` | |
| 검색 필 | `rounded-full border border-gray-400 shadow-search` | |
| 필터 탭 | `border-b-2 border-ink text-ink` (active) | 픽셀 아트 아이콘 24×24 |
| 섹션 eyebrow | `text-xs font-bold text-purple-600 uppercase tracking-wider` | 픽셀 아트 gem 아이콘 12×12 |
| 날짜 범위 시작/끝 | `bg-purple-600 text-white rounded-[50%_0_0_50%]` | |
| 날짜 범위 중간 | `bg-purple-50 text-ink rounded-none` | |
| 지도 선택 핀 | `bg-white text-ink border border-ink rounded-[20px]` | |
| 지도 미선택 핀 | `bg-[#222222] text-white rounded-[20px]` | |
| Day 카드 헤더 | `bg-[#1A1A2E] text-white` | 픽셀 아트 Day 마커 16×16 |
| 오전 타임 뱃지 | `bg-purple-50 text-purple-600 rounded-full` | |
| 오후 타임 뱃지 | `bg-orange-50 text-orange-600 rounded-full` | |
| 저녁 타임 뱃지 | `bg-[#1A1A2E] text-white/80 rounded-full` | |
| 성공 뱃지 | `bg-green-50 text-green-700 border border-green-200 rounded-full` | |
| 모노 데이터 | `font-mono text-purple-600` | 환율·날짜 |

---

*Voyagé Style Guide v1.0 · PRD v1.1 기준 · Tailwind CSS*

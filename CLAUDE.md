# CLAUDE.md

이 파일은 이 저장소의 코드를 작업할 때 Claude Code(claude.ai/code)를 위한 지침을 제공합니다.

## 프로젝트 개요

이 프로젝트는 **홈앤쇼핑 통합 포탈**로, 직원들이 하나의 대시보드에서 매출 분석, 시스템 링크, AI 기반 검색/채팅 기능을 모두 이용할 수 있는 내부 포탈입니다.

**대상 사용자**: 홈앤쇼핑 전 직원 (영업팀, MD팀, 경영진)

**MVP 목표**: 목업 데이터로 1일 안에 완성 및 배포; 실제 데이터는 v2에서 연동

## 아키텍처

정적 웹 애플리케이션(HTML + CSS + JavaScript)으로 구성되며, 필요시 현대적 프레임워크(React/Vue) 지원 가능:

### 프론트엔드 스택
- **HTML5 + CSS3 + Vanilla JavaScript** (MVP 필수)
- 선택사항: React 또는 Vue.js (복잡한 상태 관리가 필요한 경우)
- **인증 없음** (v1: 모든 직원이 동일한 데이터 조회)
- LocalStorage로 사용자 설정 및 목표 저장

### 데이터 관리
- **목업 데이터** (v1: JavaScript 배열로 하드코딩)
- **LocalStorage**: 목표/선호도 저장 (세션 유지)
- **Claude API**: 질문/검색 기능
- **외부 링크**: 기존 회사 시스템 연동 (BOS, 그룹웨어 등)
- v2: 실제 DB 연동 (OLAP, REST API)

### 핵심 섹션
1. **대시보드 (메인 페이지)** — 진입 페이지, 모든 기능 네비게이션
2. **매출 분석 (상세 페이지)** — 일별/월별/년도별 데이터 및 목표 관리
3. **시스템 링크** — 회사 시스템으로의 버튼/카드 (카테고리별 정렬)
4. **Claude 챗** — 업무 관련 질문 Q&A
5. **설정** — 사용자 프로필 및 목표 설정

## 파일 구조

```
project-root/
├── index.html              # 메인 대시보드 (A형 레이아웃)
├── index2.html             # B형 레이아웃 (선택사항)
├── analysis.html           # 매출 분석 상세 페이지
├── styles.css              # 전체 스타일
├── assets/
│   ├── logo.png
│   └── icons/
├── js/
│   ├── app.js              # 메인 로직 (데이터, 렌더링, 이벤트 핸들러)
│   ├── claude-api.js       # Claude API 래퍼 함수
│   ├── sales-analytics.js  # 매출 계산 및 포맷팅
│   └── constants.js        # 시스템 링크, 설정, 목업 데이터
└── prd.md                  # 요구사항 문서
```

## 개발 워크플로우

### 초기 설정
정적 웹사이트 프로젝트로, MVP에는 빌드 도구가 불필요하지만 추후 추가 가능:

```powershell
# 방법 1: 빌드 도구 없이 직접 서빙
python -m http.server 8000
# 또는 live-server 사용
npx live-server

# 방법 2: npm 사용 (선택사항)
npm init -y
npm install --save-dev vite
```

## 📋 개발 단계별 가이드 (8 Phases)

한 번에 하지 않고 단계별로 개발하여 각 단계마다 검증하고 진행합니다.

---

### **Phase 1: 프로젝트 초기화 및 기본 구조** (약 30분)

**목표**: 프로젝트 폴더 구조 생성, 기본 파일 생성

**주요 작업**:
- 폴더 구조 생성 (`js/`, `assets/` 등)
- `index.html` 기본 템플릿 작성
- `styles.css` 초기화 (리셋 + 기본 변수)
- `js/app.js` 빈 파일 생성
- `js/constants.js` 빈 파일 생성
- `.gitignore` 작성 (`.env*`, `node_modules/`)
- `.env.example` 작성 (API 키 템플릿)

**생성 파일**:
```
project-root/
├── index.html
├── styles.css
├── .gitignore
├── .env.example
└── js/
    ├── app.js
    └── constants.js
```

**완료 기준**:
- [ ] 폴더 구조 모두 생성
- [ ] HTML 파일 생성 후 브라우저에서 열 수 있음
- [ ] 콘솔 오류 없음

**테스트**:
```bash
# 브라우저에서 index.html 열기
python -m http.server 8000
# 또는 npx live-server
```

---

### **Phase 2: HTML 레이아웃 및 구조** (약 1시간)

**목표**: 메인 대시보드 전체 HTML 구조 완성

**주요 작업**:
- 헤더 영역 (로고, 현재 시간)
- 메인 콘텐츠 영역 (카드/버튼 그룹)
  - 📊 매출 분석 (가장 크게 강조)
  - 🔗 시스템 링크 (카테고리별 버튼)
  - 💬 Claude 챗 (입력 폼)
  - ⚙️ 설정 (버튼)
- 푸터 (저작권)
- `analysis.html` 템플릿 (매출 분석 상세 페이지)

**index.html 구조**:
```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>홈앤쇼핑 통합 포탈</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- 헤더 -->
  <header class="header">
    <h1>🏠 홈앤쇼핑 포탈</h1>
    <div id="current-time"></div>
  </header>

  <!-- 메인 콘텐츠 -->
  <main class="container">
    <!-- 매출 분석 카드 -->
    <section class="card card-large">
      <h2>📊 매출 분석</h2>
      <p>최신 매출 실적 확인</p>
      <a href="analysis.html" class="btn btn-primary">상세 분석 보기</a>
    </section>

    <!-- 시스템 링크 -->
    <section class="card">
      <h2>🔗 시스템 링크</h2>
      <div class="link-group" id="system-links"></div>
    </section>

    <!-- Claude 챗 -->
    <section class="card">
      <h2>💬 Claude 챗</h2>
      <form id="claude-form">
        <input type="text" id="claude-question" placeholder="질문을 입력하세요...">
        <button type="submit" class="btn">검색</button>
      </form>
      <div id="claude-response"></div>
    </section>

    <!-- 설정 -->
    <section class="card">
      <h2>⚙️ 설정</h2>
      <button class="btn" onclick="window.location.href='settings.html'">설정 열기</button>
    </section>
  </main>

  <!-- 푸터 -->
  <footer class="footer">
    <p>&copy; 2026 홈앤쇼핑 · 내부 포탈</p>
  </footer>

  <script src="js/constants.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

**analysis.html 기본 구조**:
```html
<!-- 매출 분석 상세 페이지 -->
<!-- 일별 실적 테이블 -->
<!-- 월별 실적 및 목표 -->
<!-- 년도 목표 현황 -->
<!-- [뒤로 가기] 버튼 -->
```

**완료 기준**:
- [ ] HTML 구조 완성
- [ ] 모든 섹션이 시각적으로 구분됨
- [ ] 링크/버튼이 클릭 가능 (기능 없음)

**테스트**:
```bash
# 브라우저에서 화면 레이아웃 확인
# 모든 텍스트와 버튼이 보이는지 확인
```

---

### **Phase 3: 목업 데이터 및 기본 함수** (약 1시간)

**목표**: 매출 데이터 정의, 계산 함수 작성

**주요 작업**:
- `constants.js`에 목록 매출 데이터 정의
- `app.js`에 계산 함수 작성 (달성률, 증감률 등)
- 현재 시간 표시 함수
- 시스템 링크 데이터 정의

**constants.js 예시**:
```javascript
// 목록 매출 데이터
const salesData = {
  daily: [
    { date: "2026-06-11", sales: 52000000, growth: 8.5 },
    { date: "2026-06-10", sales: 48000000, growth: -3.2 },
    // ... 5일 더
  ],
  monthly: [
    { month: "6월", sales: 125000000, goal: 150000000 },
    { month: "5월", sales: 135000000, goal: 145000000 },
    { month: "4월", sales: 120000000, goal: 130000000 },
  ],
  yearly: {
    goal: 15000000000,
    accumulated: 7500000000,
  }
};

// 시스템 링크
const systemLinks = [
  { category: "영업/주문", links: [
    { name: "BOS", url: "https://bos.example.com", icon: "📊" },
    { name: "콜판", url: "https://callpan.example.com", icon: "☎️" },
  ]},
  // ... 다른 카테고리
];
```

**app.js 함수**:
```javascript
// 달성률 계산
function calculateAchievement(actual, goal) {
  return ((actual / goal) * 100).toFixed(1);
}

// 현재 시간 표시
function updateCurrentTime() {
  const now = new Date();
  document.getElementById('current-time').textContent = now.toLocaleString('ko-KR');
}

// 1초마다 시간 업데이트
setInterval(updateCurrentTime, 1000);
```

**완료 기준**:
- [ ] 목록 데이터 constants.js에 정의
- [ ] 계산 함수 작성 완료
- [ ] 브라우저 콘솔에서 함수 호출 테스트 성공

**테스트**:
```javascript
// 브라우저 콘솔에서 테스트
calculateAchievement(125000000, 150000000); // 83.3
```

---

### **Phase 4: 매출 분석 페이지 (analysis.html) 개발** (약 1.5시간)

**목표**: 매출 분석 상세 페이지 완성 (기능 O)

**주요 작업**:
- analysis.html 완전한 HTML 작성
- 일별 실적 테이블 렌더링
- 월별 실적 및 목표 표시
- 년도 목표 현황 및 필요 월평균 계산
- 프로그레스 바 표시
- 목표 입력 폼 추가

**analysis.html 구조**:
```html
<body>
  <header>
    <a href="index.html">← 뒤로 가기</a>
    <h1>📊 매출 분석</h1>
  </header>

  <main>
    <!-- 일별 실적 -->
    <section class="analysis-section">
      <h2>▶ 일별 실적 (최근 7일)</h2>
      <table id="daily-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>매출액</th>
            <th>증감률</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>

    <!-- 월별 실적 -->
    <section class="analysis-section">
      <h2>▶ 월별 실적 & 목표</h2>
      <div id="monthly-summary"></div>
      <table id="monthly-table"></table>
    </section>

    <!-- 년도 목표 -->
    <section class="analysis-section">
      <h2>▶ 년도 목표 현황</h2>
      <div id="yearly-summary"></div>
    </section>

    <button class="btn" onclick="location.href='index.html'">메인으로</button>
  </main>
</body>
```

**js/sales-analytics.js 작성**:
```javascript
// 테이블 렌더링 함수들
function renderDailyTable() {
  // dailyData를 테이블 형식으로 렌더링
}

function renderMonthlyTable() {
  // monthlyData를 테이블 형식으로 렌더링
}

function renderYearlySummary() {
  // 년도 목표, 누적, 달성률, 필요 월평균 표시
}
```

**완료 기준**:
- [ ] analysis.html 페이지 로드 시 모든 데이터 표시
- [ ] 테이블 포맷 명확함
- [ ] 프로그레스 바 시각화
- [ ] 뒤로 가기 버튼 작동

**테스트**:
```bash
# 브라우저: index.html → [상세 분석 보기] 클릭
# → analysis.html 페이지에서 모든 데이터 표시 확인
# → [뒤로 가기] 클릭 → index.html 돌아옴
```

---

### **Phase 5: 목표 관리 및 LocalStorage** (약 1시간)

**목표**: 사용자가 목표를 설정하면 LocalStorage에 저장하고 복구

**주요 작업**:
- settings.html 작성 (목표 입력 폼)
- LocalStorage 저장/로드 함수 작성
- analysis.html에 목표 입력 폼 추가
- 목표 변경 시 즉시 달성률 재계산

**settings.html**:
```html
<form id="goal-form">
  <label>월 목표액 (원)</label>
  <input type="number" id="monthly-goal" placeholder="150000000">
  
  <label>년도 목표액 (원)</label>
  <input type="number" id="yearly-goal" placeholder="15000000000">
  
  <button type="submit" class="btn">저장</button>
</form>
<div id="goal-status"></div>
```

**js/app.js에 추가**:
```javascript
// 목표 저장
function saveGoals() {
  const monthlyGoal = document.getElementById('monthly-goal').value;
  const yearlyGoal = document.getElementById('yearly-goal').value;
  
  localStorage.setItem('goalData', JSON.stringify({
    monthlyGoal: parseInt(monthlyGoal),
    yearlyGoal: parseInt(yearlyGoal),
    lastUpdated: new Date().toISOString()
  }));
}

// 목표 로드
function loadGoals() {
  const stored = localStorage.getItem('goalData');
  return stored ? JSON.parse(stored) : { monthlyGoal: 0, yearlyGoal: 0 };
}

// 페이지 로드 시 목표 복구
window.addEventListener('load', () => {
  const goals = loadGoals();
  if (document.getElementById('monthly-goal')) {
    document.getElementById('monthly-goal').value = goals.monthlyGoal;
  }
});
```

**완료 기준**:
- [ ] settings.html에서 목표 입력 가능
- [ ] [저장] 클릭 후 새로고침 → 목표 유지
- [ ] analysis.html에서 입력한 목표로 달성률 계산

**테스트**:
```bash
# 1. settings.html에서 목표액 입력 후 [저장]
# 2. 페이지 새로고침 → 목표액 그대로 표시됨
# 3. analysis.html 달성률이 입력한 목표로 계산됨
```

---

### **Phase 6: 시스템 링크 렌더링** (약 45분)

**목표**: 시스템 링크를 동적으로 렌더링하고 네비게이션 작동

**주요 작업**:
- index.html의 시스템 링크 섹션 동적 렌더링
- 카테고리별 그룹화
- 외부 링크 (새 탭 열기)
- 링크 클릭 테스트

**js/app.js 함수**:
```javascript
function renderSystemLinks() {
  const container = document.getElementById('system-links');
  
  systemLinks.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category.category;
    categoryDiv.appendChild(categoryTitle);
    
    const linkGroup = document.createElement('div');
    linkGroup.className = 'link-group';
    
    category.links.forEach(link => {
      const btn = document.createElement('a');
      btn.href = link.url;
      btn.target = '_blank';
      btn.className = 'btn btn-link';
      btn.textContent = `${link.icon} ${link.name}`;
      linkGroup.appendChild(btn);
    });
    
    categoryDiv.appendChild(linkGroup);
    container.appendChild(categoryDiv);
  });
}

// 페이지 로드 시 실행
window.addEventListener('load', renderSystemLinks);
```

**완료 기준**:
- [ ] index.html에서 모든 시스템 링크 표시
- [ ] 카테고리별로 그룹화됨
- [ ] 링크 클릭 시 새 탭 열림

**테스트**:
```bash
# index.html에서 각 링크 클릭 → 새 탭에서 열림
```

---

### **Phase 7: Claude API 연동 (선택사항, 나중에)** (약 1시간)

**목표**: Claude 챗 기능 구현

**주요 작업**:
- `.env` 파일에 Claude API 키 설정
- Claude API 호출 함수 작성
- 질문 입력 폼 기능 구현
- 응답 표시

**js/claude-api.js**:
```javascript
const CLAUDE_API_KEY = 'your-api-key'; // .env에서 로드

async function askClaude(question) {
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus',
        max_tokens: 500,
        messages: [{ role: 'user', content: question }]
      })
    });
    
    if (!response.ok) throw new Error(`API 오류: ${response.status}`);
    
    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Claude API 오류:', error);
    return '죄송합니다. 오류가 발생했습니다.';
  }
}
```

**index.html에 추가**:
```javascript
document.getElementById('claude-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const question = document.getElementById('claude-question').value;
  const responseDiv = document.getElementById('claude-response');
  
  responseDiv.textContent = '로딩 중...';
  const response = await askClaude(question);
  responseDiv.textContent = response;
});
```

**완료 기준**:
- [ ] API 키 설정
- [ ] 질문 입력 가능
- [ ] Claude 응답 표시됨

**테스트**:
```bash
# 질문 입력 후 [검색] → Claude 응답 표시
```

---

### **Phase 8: CSS 스타일링 및 최종 테스트** (약 1.5시간)

**목표**: 전체 UI 스타일 완성, 최종 테스트

**주요 작업**:
- CSS 기본 스타일 (폰트, 색상, 레이아웃)
- 카드/버튼 스타일
- 테이블 스타일
- 프로그레스 바 CSS
- 반응형 디자인 (선택)
- 전체 UI 검증

**styles.css 기본 구조**:
```css
/* 변수 정의 */
:root {
  --primary-color: #0066cc;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --bg-color: #f8f9fa;
  --text-color: #333;
}

/* 레이아웃 */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 카드 */
.card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-large {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* 버튼 */
.btn {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn:hover {
  opacity: 0.9;
}

/* 프로그레스 바 */
.progress {
  width: 100%;
  height: 20px;
  background-color: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--success-color);
  transition: width 0.3s ease;
}

/* 테이블 */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f0f0f0;
  font-weight: 600;
}

/* 색상 코딩 */
.positive { color: var(--success-color); }
.negative { color: var(--danger-color); }
```

**완료 기준**:
- [ ] 전체 페이지 스타일 일관성 있음
- [ ] 모든 요소가 시각적으로 명확함
- [ ] 호버 효과 등 인터랙션 추가됨
- [ ] 모바일 기본 반응형 (선택)

**최종 테스트**:
```bash
# 1. 모든 페이지 렌더링 확인
# 2. 모든 버튼/링크 작동 확인
# 3. LocalStorage 저장/로드 확인
# 4. 계산 정확성 확인
# 5. 콘솔 오류 없음 확인
```

---

### **Phase 9: 배포** (약 30분)

**목표**: GitHub Pages 또는 내부 서버에 배포

**주요 작업**:
- GitHub에 푸시
- GitHub Pages 활성화
- 배포된 사이트 테스트

```bash
# 1. Git 초기화
git init
git add .
git commit -m "Initial commit: MVP 포탈"

# 2. GitHub에 푸시
git remote add origin https://github.com/[사용자]/hnstest003.git
git branch -M main
git push -u origin main

# 3. GitHub Pages 설정 (저장소 Settings)
# → Pages → Source: main branch → Save
# → 사이트 URL 확인

# 4. 배포된 사이트 테스트
# https://[사용자].github.io/hnstest003
```

---

## 📝 개발 체크리스트

전체 개발 완료를 위한 최종 체크리스트:

- [ ] **Phase 1**: 프로젝트 초기화 ✓
- [ ] **Phase 2**: HTML 레이아웃 ✓
- [ ] **Phase 3**: 목록 데이터 & 함수 ✓
- [ ] **Phase 4**: 매출 분석 페이지 ✓
- [ ] **Phase 5**: 목표 관리 & LocalStorage ✓
- [ ] **Phase 6**: 시스템 링크 렌더링 ✓
- [ ] **Phase 7**: Claude API (선택) ✓
- [ ] **Phase 8**: CSS 스타일링 ✓
- [ ] **Phase 9**: 배포 ✓

각 phase별로 완료하면서 체크해 나가세요!

### 환경 설정

`.env` 파일 (또는 `config.js`)을 다음과 같이 작성:

```javascript
// API 키는 절대 커밋하지 마시오! 환경변수 사용
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || "your-key-here";
const API_ENDPOINT = "https://api.anthropic.com/v1/messages";
```

로컬 개발용으로 `.env.local` 또는 `env-local.js` 사용하고 `.gitignore`에 추가.

## 기능 가이드

### 매출 분석 (⭐⭐⭐ 최우선)
- **일별 조회**: 최근 7일 매출액 및 전날 대비 증감률 표시
- **월별 조회**: 현재월 누적 매출, 목표, 달성률(%) 및 지난 3개월 비교
- **년도별 조회**: 년도 목표, 누적 매출, 달성률(%), 남은 기간의 필요 월평균
- **목표 관리**: 월/년도 목표 입력 → 자동 달성률 계산
- **데이터 저장**: LocalStorage에 목표 저장, 페이지 로드 시 복구
- **목업 데이터**: v1은 목업 데이터 사용, 실제 DB 연동은 v2에서

### 시스템 링크
- 6개 카테고리에 약 15~20개 링크
- 간단한 카드/버튼 형식 (아이콘 + 레이블)
- 외부 링크 (target="_blank" 또는 window.open)
- 카테고리별 헤더로 정렬

### Claude 챗
- 질문 입력 필드 + 전송 버튼
- Claude API로 질문 전송 (v1은 대화 이력 없음)
- 인라인 응답 표시
- 예시: "이번 달 목표는?", "최근 매출 추이는?"
- 응답은 간결하게 (최대 500 토큰)

### 설정 페이지 (MVP 선택사항)
- 사용자명, 부서, 직급 (표시 또는 편집)
- 월 목표액 입력 + [저장] 버튼
- 년도 목표액 입력 + [저장] 버튼
- LocalStorage에 JSON으로 저장

## 코드 패턴 & 컨벤션

### 데이터 구조

매출 데이터 형식:

```javascript
const salesData = {
  daily: [
    { date: "2026-06-11", sales: 52000000, growth: 8.5 },  // 계산용 숫자
    // ... 7일치
  ],
  monthly: [
    { month: "6월", sales: 125000000, goal: 150000000, achievement: 83.3 },
    // ... 지난 3개월
  ],
  yearly: {
    goal: 15000000000,
    accumulated: 7500000000,
    achievement: 50
  }
};
```

사용자 목표 저장:

```javascript
const goalData = {
  monthlyGoal: 150000000,
  yearlyGoal: 15000000000,
  lastUpdated: "2026-06-11"
};
```

### 계산 함수

```javascript
// 달성률(%) = (실적 / 목표) * 100
function calculateAchievement(actual, goal) {
  return ((actual / goal) * 100).toFixed(1);
}

// 전일 대비 증감률(%) = ((오늘 - 어제) / 어제) * 100
function calculateGrowth(today, yesterday) {
  return (((today - yesterday) / yesterday) * 100).toFixed(1);
}

// 년도별 필요 월평균 = (년도 목표 - 누적) / 남은 개월
function requiredMonthlyAverage(yearlyGoal, accumulated, monthsRemaining) {
  return Math.ceil((yearlyGoal - accumulated) / monthsRemaining);
}
```

### LocalStorage 사용

```javascript
// 목표 저장
function saveGoals(monthlyGoal, yearlyGoal) {
  localStorage.setItem('goalData', JSON.stringify({
    monthlyGoal,
    yearlyGoal,
    lastUpdated: new Date().toISOString()
  }));
}

// 목표 로드 (기본값 포함)
function loadGoals() {
  const stored = localStorage.getItem('goalData');
  return stored ? JSON.parse(stored) : { monthlyGoal: 0, yearlyGoal: 0 };
}

// 페이지 초기화 시 로드: const goals = loadGoals();
```

### Claude API 호출

```javascript
async function askClaude(question) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-opus',
      max_tokens: 500,
      messages: [{ role: 'user', content: question }]
    })
  });
  
  if (!response.ok) {
    throw new Error(`API 오류: ${response.status}`);
  }
  
  const data = await response.json();
  return data.content[0].text;
}
```

## 디자인 & 레이아웃

### 레이아웃 원칙
- **카드/버튼 그룹**: 명확한 레이블이 있는 시각적 섹션으로 구성
- **매출 분석 강조**: 가장 큰 카드, 눈에 띄는 위치 (상단 좌측 또는 전체 폭)
- **프로그레스 바**: CSS로 목표 달성도 시각화 (차트 라이브러리 불필요)
- **색상 코딩**: 증가(초록), 감소(빨강)
- **타이포그래피**: 단순하고 읽기 쉬운 폰트 (시스템 폰트 가능)
- **여백**: 명확함을 위해 충분한 padding/margin

### 반응형 디자인 (MVP 선택사항)
- MVP는 데스크톱 중심, 모바일은 v2
- 추가 시: 모바일 우선 접근, 휴대폰 화면 테스트

## 테스트 체크리스트

기능 완성 전 확인:
- [ ] **대시보드 로드** (브라우저 콘솔 오류 없음)
- [ ] **매출 분석 페이지** 세 가지 조회 모두 표시 (일별/월별/년도별)
- [ ] **목표 입력** 즉시 달성률 재계산
- [ ] **목표 저장** → 새로고침 → 목표 유지 (LocalStorage 작동)
- [ ] **시스템 링크** 새 탭/창에서 올바르게 열림
- [ ] **Claude 챗** API 호출 성공 (간단한 질문 테스트)
- [ ] **API 키 노출 없음** (.env 사용, 소스코드에 하드코딩 금지)
- [ ] **테이블 렌더링** 목업 데이터 올바르게 표시

## 배포

### GitHub Pages (MVP 권장)

```powershell
# GitHub에 푸시
git add .
git commit -m "초기 커밋: MVP 포탈 (매출 분석 포함)"
git push

# 저장소 설정에서 GitHub Pages 활성화 → main 브랜치 → /root
# 사이트: https://[사용자명].github.io/hnstest003
```

### 회사 내부 서버 (대안)
- 파일을 내부 웹 서버 디렉토리에 복사
- Claude API 키를 서버 설정 또는 .env에서 설정

## 주의사항 & 팁

1. **API 키 보안**: `.env` 절대 커밋 금지, 환경변수 사용
2. **CORS**: Claude API가 브라우저 CORS 처리; 문제 시 백엔드 프록시 구현
3. **목업 데이터**: 회사 맥락에 맞는 현실적인 매출액 사용
4. **날짜 포맷**: 내부는 "2026-06-11", 화면은 "6월 11일" 사용
5. **LocalStorage 제한**: ~5~10MB/도메인; 목표 데이터는 무시할 수준
6. **인증 없음** (v1): 모든 사용자가 동일 데이터 조회
7. **외부 링크**: BOS, 그룹웨어 등 회사 네트워크에서 접근 가능 확인

## 향후 개선 (v2+)

- 실제 DB 연동 (OLAP, REST API)
- 카테고리/상품별 분석 (드릴다운)
- 사용자별 목표 추적 (인증 + 권한)
- 자동 리포트 생성 (주간/월간 이메일)
- 모바일 반응형 / PWA
- 다크 모드
- 실시간 데이터 갱신 (polling/WebSocket)
- 고급 분석 (예측, 이상 탐지)
- 방송 편성표 연동 (Beta Live API)

## 참고 자료

- **PRD**: `prd.md` (프로젝트 루트)
- **Claude API 문서**: https://docs.anthropic.com/
- **Anthropic 모델**: 최신 모델은 Claude Opus 사용
- **GitHub Pages**: https://docs.github.com/en/pages

---

**최종 수정**: 2026-06-11  
**프로젝트 상태**: MVP 개발 중  
**담당팀**: 홈앤쇼핑 통합 포탈 팀

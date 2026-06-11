# 🏠 홈앤쇼핑 통합 포탈 (HNS All-in-One)

정적 웹 애플리케이션 + Streamlit 대시보드로 구성된 홈앤쇼핑 직원 통합 포탈입니다.

## 📊 주요 기능

### 1. **매출 분석 대시보드**
- 📈 일별/월별/년도별 매출 현황
- 🎯 목표 달성률 시각화
- 📊 인터랙티브 차트 (Plotly)
- 💾 LocalStorage 기반 목표 저장

### 2. **Claude AI 챗**
- 💬 실시간 스트리밍 응답
- 🔐 안전한 API 키 관리
- 🌐 HTTPS 암호화 통신
- 📱 반응형 디자인

### 3. **시스템 링크**
- 🔗 카테고리별 시스템 연동
- 6개 카테고리 × 15+ 링크
- 아이콘 기반 빠른 접근

### 4. **Streamlit 대시보드**
- 📊 매출 현황 시각화
- 🎯 목표 관리
- 📈 Plotly 차트
- ⚙️ 설정 패널

---

## 🚀 빠른 시작

### 1. **저장소 클론**
```bash
git clone https://github.com/prettykbk81/hnsallinone.git
cd hnsallinone
```

### 2. **웹 앱 실행 (HTML/CSS/JavaScript)**
```bash
# 방법 1: Python 웹 서버
python -m http.server 8000

# 방법 2: npm live-server
npx live-server

# 방법 3: 브라우저에서 직접
# index.html을 웹 브라우저에서 열기
```

**접속:** http://localhost:8000

### 3. **Streamlit 대시보드 실행** (Python 3.11+)
```bash
# 가상환경 생성
python -m venv .venv
.venv\Scripts\activate  # Windows
source .venv/bin/activate  # Mac/Linux

# 패키지 설치
pip install -r requirements.txt

# Streamlit 실행
streamlit run app.py
```

**접속:** http://localhost:8501

---

## 📁 프로젝트 구조

```
hnsallinone/
│
├── 🌐 웹 애플리케이션 (정적)
│   ├── index.html              # 메인 대시보드
│   ├── analysis.html           # 매출 분석 상세
│   ├── settings.html           # 사용자 설정
│   ├── styles.css              # 전체 스타일
│   └── js/
│       ├── app.js              # 메인 로직
│       ├── claude-api.js       # Claude API 스트리밍
│       ├── constants.js        # 데이터 및 설정
│       ├── sales-analytics.js  # 계산 함수
│       └── supabase.js         # Supabase 연동 (선택)
│
├── 🐍 백엔드 (Streamlit)
│   ├── app.py                  # Streamlit 대시보드
│   └── requirements.txt         # 패키지 목록
│
├── 📚 문서
│   ├── README.md               # 이 파일
│   ├── CLAUDE.md               # 프로젝트 상세 가이드
│   ├── API_KEY_SETUP.md        # API 키 안전 설정
│   ├── SECURITY_CHECKLIST.md   # 보안 체크리스트
│   ├── PYTHON_SETUP_ERROR.md   # Python 설정 문제 해결
│   ├── API_DEBUG_GUIDE.md      # 디버깅 가이드
│   ├── GITHUB_SETUP.md         # GitHub 협업 가이드
│   └── prd.md                  # 제품 요구사항 문서
│
└── ⚙️ 설정
    ├── .gitignore              # Git 제외 파일
    ├── .env.json.example       # 환경변수 예제
    └── .env                    # 환경변수 (비밀정보 제외)
```

---

## 🔐 보안

### ✅ 포함된 항목 (안전)
- HTML, CSS, JavaScript 소스
- Streamlit 앱 (app.py)
- 문서 및 가이드
- 설정 예제 (.example)

### ❌ 제외된 항목 (비밀정보)
- `.env` - 실제 환경변수
- `.env.json` - 실제 API 키
- `.venv/` - Python 가상환경
- `__pycache__/` - Python 캐시

**API 키 관리:**
- 3가지 안전한 방법 제공 (브라우저 입력, .env.json, 환경변수)
- LocalStorage에만 저장됨
- HTTPS 암호화 통신
- 코드에 절대 하드코딩 안 함

---

## 💻 API 키 설정

### 방법 1: 브라우저 입력 (추천) ⭐
1. 앱 접속
2. Claude 챗 → "검색" 클릭
3. 팝업에 API 키 입력 (sk-ant-...)
4. 자동 저장됨

### 방법 2: .env.json (로컬 개발)
```json
{
  "CLAUDE_API_KEY": "sk-ant-your-key-here"
}
```

### 방법 3: 환경변수 (프로덕션)
```bash
export CLAUDE_API_KEY=sk-ant-...
streamlit run app.py
```

더 자세한 내용: [`API_KEY_SETUP.md`](API_KEY_SETUP.md)

---

## 🤝 협업 가이드

### 다른 PC에서 개발 이어가기

```bash
# 1. 클론
git clone https://github.com/prettykbk81/hnsallinone.git
cd hnsallinone

# 2. 가상환경 설정 (첫 번째만)
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

# 3. 개발 시작
# index.html, app.py 등 수정...

# 4. 커밋 및 푸시
git add .
git commit -m "기능 설명"
git push origin main
```

### PC A에서 최신 코드 받기

```bash
git pull origin main
```

---

## 📋 개발 단계 (Phase별)

자세한 개발 가이드는 [`CLAUDE.md`](CLAUDE.md) 참고

1. **Phase 1**: 프로젝트 초기화 ✅
2. **Phase 2**: HTML 레이아웃 ✅
3. **Phase 3**: 목업 데이터 및 함수 ✅
4. **Phase 4**: 매출 분석 페이지 ✅
5. **Phase 5**: 목표 관리 (LocalStorage) ✅
6. **Phase 6**: 시스템 링크 렌더링 ✅
7. **Phase 7**: Claude API (스트리밍) ✅
8. **Phase 8**: CSS 스타일링 ✅
9. **Phase 9**: Streamlit 대시보드 ✅

---

## 🛠️ 기술 스택

### 프론트엔드
- **HTML5** + **CSS3** + **Vanilla JavaScript**
- **Plotly.js** - 인터랙티브 차트
- **LocalStorage** - 데이터 저장
- **Claude API** - AI 챗

### 백엔드 (Streamlit)
- **Streamlit** - 웹 프레임워크
- **Pandas** - 데이터 처리
- **Plotly** - 시각화
- **Python 3.11+**

### 인프라
- **GitHub** - 버전 관리 (Private)
- **HTTP Server** - 정적 파일 제공
- **Streamlit Cloud** - 배포 (선택사항)

---

## 📞 자주 묻는 질문

### Q: API 키를 어디서 얻나요?
A: https://console.anthropic.com 에서 발급받으세요.

### Q: Python이 없으면?
A: 다음 중 하나 선택:
- [Python 공식 설치](https://www.python.org/downloads/)
- [Anaconda 설치](https://www.anaconda.com/)
- [Docker 사용](PYTHON_SETUP_ERROR.md)

### Q: Port 8000/8501이 이미 사용 중이면?
```bash
# 다른 포트 사용
python -m http.server 9000
streamlit run app.py --server.port=8502
```

### Q: 저장소가 Private인데 팀원과 협업하려면?
GitHub: Settings → Collaborators → "Add people"

더 자세한 내용: [`GITHUB_SETUP.md`](GITHUB_SETUP.md)

---

## 🚀 배포

### GitHub Pages (정적 웹만)
```bash
git push origin main
# Settings → Pages → Deploy from main
# → https://prettykbk81.github.io/hnsallinone/
```

### Streamlit Cloud (대시보드)
1. GitHub에 푸시
2. https://streamlit.io/cloud 방문
3. 저장소 연결
4. 자동 배포 완료

### Docker (로컬)
```bash
docker build -t hnsallinone .
docker run -p 8000:8000 -p 8501:8501 hnsallinone
```

---

## 📝 커밋 히스토리

```
df02652 docs: GitHub 저장소 설정 가이드 추가
c964165 Initial commit: 홈앤쇼핑 통합 포탈 MVP
```

---

## 📄 라이선스

이 프로젝트는 내부 사용 목적으로 만들어졌습니다.

---

## 👤 작성자

- **개발**: Claude Code (Anthropic)
- **주소**: https://github.com/prettykbk81/hnsallinone
- **이메일**: prettykbk81@gmail.com

---

## 🎯 향후 계획

- [ ] 실제 DB 연동 (OLAP, REST API)
- [ ] 사용자 인증 (회사 SSO)
- [ ] 모바일 앱 (React Native)
- [ ] 다크 모드
- [ ] 실시간 데이터 갱신 (WebSocket)
- [ ] 고급 분석 (예측, 이상 탐지)
- [ ] 방송 편성표 연동

---

**프로젝트를 시작하려면:** `python -m http.server 8000` 또는 `streamlit run app.py` 🚀

**문제가 있으면:** 각 단계별 가이드 파일 참고 📚

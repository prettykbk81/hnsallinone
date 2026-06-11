# 🚀 GitHub 저장소 설정 가이드

## ✅ 현재 상태

- ✓ Git 저장소 초기화됨
- ✓ 모든 파일 Commit됨 (22개 파일)
- ✓ API 키 등 비밀정보 제외됨
- ⏳ GitHub 저장소 생성 및 푸시 필요

---

## 📋 GitHub에 업로드하기

### Step 1️⃣: GitHub에서 저장소 생성

1. https://github.com/new 방문
2. 다음과 같이 입력:

| 항목 | 값 |
|------|-----|
| **Repository name** | `hnstest003` |
| **Description** | `홈앤쇼핑 통합 포탈 - HTML/CSS/JS + Streamlit` |
| **Visibility** | 🔒 **Private** (선택) |
| **Add .gitignore** | × (이미 있음) |
| **Add LICENSE** | × (선택사항) |

3. **"Create repository"** 클릭

---

### Step 2️⃣: Local에서 Remote 추가 및 푸시

저장소 생성 후 GitHub에서 제시하는 명령어를 따릅니다:

**옵션 A: 새 저장소일 경우**
```powershell
cd c:\hnstest003

# GitHub에서 제시하는 remote 추가 (예)
git remote add origin https://github.com/YOUR_USERNAME/hnstest003.git
git branch -M main
git push -u origin main
```

**옵션 B: (간단) 아래 명령어 실행**
```powershell
cd c:\hnstest003

# YOUR_USERNAME을 자신의 GitHub 계정명으로 바꾸세요
git remote add origin https://github.com/YOUR_USERNAME/hnstest003.git
git branch -M main
git push -u origin main
```

---

## 🔑 GitHub 인증

### PowerShell에서 Push 시

**처음 푸시할 때:**
```powershell
git push -u origin main
```

**인증 방법 선택:**

#### 방법 1: Personal Access Token (권장)
1. https://github.com/settings/tokens 방문
2. **"Generate new token"** → **"Generate new token (classic)"**
3. 다음 권한 선택:
   - ✓ `repo` (모든 권한)
4. **"Generate token"** 클릭
5. 토큰 복사
6. PowerShell에서 Push:
   ```powershell
   git push -u origin main
   # Username: YOUR_USERNAME
   # Password: (위에서 복사한 토큰 붙여넣기)
   ```

#### 방법 2: SSH Key (고급)
```powershell
# SSH 키 생성
ssh-keygen -t ed25519 -C "prettykbk81@gmail.com"

# 공개키 복사
cat ~/.ssh/id_ed25519.pub | clip

# GitHub Settings → SSH and GPG keys → New SSH key
# 위에서 복사한 키 붙여넣기

# 이제 사용 가능
git remote add origin git@github.com:YOUR_USERNAME/hnstest003.git
git push -u origin main
```

---

## ✅ Push 완료 확인

Push가 완료되면:

1. https://github.com/YOUR_USERNAME/hnstest003 방문
2. 다음을 확인:
   - ✓ 저장소명: hnstest003
   - ✓ Visibility: **Private** 🔒
   - ✓ 파일 22개 표시
   - ✓ 브랜치: `main`

---

## 📁 저장소 구조

```
hnstest003/
├── 📄 프론트엔드 (정적 웹)
│   ├── index.html          # 메인 대시보드
│   ├── analysis.html       # 매출 분석 상세
│   ├── settings.html       # 사용자 설정
│   ├── styles.css          # 스타일
│   └── js/
│       ├── app.js          # 메인 로직
│       ├── claude-api.js   # Claude API (스트리밍)
│       ├── constants.js    # 데이터 및 설정
│       └── ...
│
├── 🐍 백엔드 (Streamlit)
│   ├── app.py              # Streamlit 대시보드
│   └── requirements.txt     # 패키지 목록
│
├── 📚 문서
│   ├── CLAUDE.md           # 프로젝트 가이드
│   ├── API_KEY_SETUP.md    # API 키 안전 설정
│   ├── SECURITY_CHECKLIST.md  # 보안 체크리스트
│   ├── PYTHON_SETUP_ERROR.md  # Python 설정 문제 해결
│   └── ...
│
└── ⚙️ 설정
    ├── .gitignore          # Git 제외 파일
    ├── .env.json.example   # 환경변수 예제
    └── .env                # 환경변수 (예시)
```

---

## 🔐 보안 체크

### ✅ 다음은 푸시되었습니다 (안전):
- HTML, CSS, JavaScript 소스
- 문서 파일 (.md)
- 설정 예제 파일 (.example)
- Streamlit 앱 (app.py)
- 패키지 목록 (requirements.txt)

### ❌ 다음은 푸시되지 않습니다 (비밀정보):
- `.env` (실제 환경변수)
- `.env.json` (실제 API 키)
- `.venv/` (가상환경)
- `__pycache__/` (Python 캐시)

---

## 🤝 팀 협업 설정

저장소가 Private이므로, 팀원을 추가하려면:

1. GitHub: **Settings** → **Collaborators**
2. **Add people** 클릭
3. 팀원의 GitHub 계정명 입력
4. 권한 선택 (일반적으로 **Write**)
5. 팀원에게 저장소 URL 공유

---

## 💻 다른 PC에서 개발 이어가기

### PC B에서 처음 시작할 때:

```powershell
# 1. 저장소 클론
git clone https://github.com/YOUR_USERNAME/hnstest003.git
cd hnstest003

# 2. 가상환경 설정 (Python이 설치되어 있다면)
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt

# 3. 개발 시작
# HTML/CSS/JS 수정: index.html 등
# Streamlit 수정: app.py
```

### 변경사항 업로드:

```powershell
git add .
git commit -m "설명"
git push origin main
```

### PC A로 돌아가서 최신 코드 받기:

```powershell
cd c:\hnstest003
git pull origin main
```

---

## 📝 향후 개발 흐름

```
PC A          GitHub           PC B
  ↓             ↑                ↓
[개발]  →  push  ✓  ←  pull  [개발]
  ↓                            ↓
[커밋]  →  push  ✓  ←  pull  [커밋]
```

---

## 🆘 문제 해결

### "Permission denied" 오류
```powershell
# Personal Access Token 또는 SSH 키 설정 확인
# 위의 "방법 1" 또는 "방법 2" 참고
```

### "Repository not found" 오류
```powershell
# 저장소명 확인: hnstest003
# 계정명 확인: YOUR_USERNAME
# Private 저장소 접근 권한 확인
```

### 이미 푸시된 API 키 발견 시
```powershell
# 1. 해당 키는 즉시 폐기
# 2. Git 히스토리에서 제거 (고급)
git filter-branch --tree-filter 'rm -f .env' HEAD
git push -f origin main
```

---

## ✨ 축하합니다! 🎉

프로젝트가 GitHub에 안전하게 백업되고,
팀원과 함께 언제든지 계속 개발할 수 있습니다!

**저장소 URL:** `https://github.com/YOUR_USERNAME/hnstest003`

(YOUR_USERNAME을 자신의 GitHub 계정명으로 바꾸세요)

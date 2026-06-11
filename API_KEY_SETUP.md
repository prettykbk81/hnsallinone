# 🔐 API 키 안전 설정 가이드

## ⚠️ 절대 금지 사항
```
❌ .env 파일에 실제 API 키 저장
❌ 소스 코드에 API 키 하드코딩
❌ 공개 저장소에 API 키 커밋
```

## ✅ 안전한 3가지 방법

### 방법 1️⃣: 브라우저 LocalStorage 사용 (추천) 🌟

**가장 간단하고 안전합니다**

1. http://localhost:8000 에서 앱 실행
2. **Claude 챗** 섹션에서 "검색" 버튼 클릭
3. "Claude API 키를 입력하세요" 팝업 표시
4. API 키 입력 (sk-ant-...로 시작)
5. 자동으로 LocalStorage에 저장

**장점:**
- 코드에 키가 노출되지 않음
- 이 브라우저/기기에만 저장됨
- 언제든 재설정 가능

**LocalStorage 확인:**
```javascript
// F12 → Console에서 실행
localStorage.getItem('claude_api_key')  // API 키 확인
localStorage.removeItem('claude_api_key')  // 키 삭제
```

---

### 방법 2️⃣: .env.json 파일 사용 (로컬 개발용)

**프로젝트 루트에 `.env.json` 파일 생성:**

```json
{
  "CLAUDE_API_KEY": "sk-ant-your-api-key-here"
}
```

**중요:**
- `.env.json`은 .gitignore에 이미 포함됨
- 로컬 개발 전용
- 공개 저장소에 절대 푸시하지 말기

**동작 원리:**
1. 페이지 로드 시 자동으로 `.env.json` 읽기
2. API 키를 메모리에 로드
3. LocalStorage에 저장

---

### 방법 3️⃣: 환경변수 사용 (프로덕션)

**서버 환경에서 환경변수 설정:**

```bash
# Linux/Mac
export CLAUDE_API_KEY=sk-ant-...
npm run start

# Windows PowerShell
$env:CLAUDE_API_KEY="sk-ant-..."
npm run start

# Docker
docker run -e CLAUDE_API_KEY=sk-ant-... myapp
```

**프록시 서버 구성 예 (Node.js/Express):**
```javascript
// server.js
app.get('/api/env', (req, res) => {
  res.json({
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY
  });
});
```

---

## 📋 현재 앱의 보안 구조

```
페이지 로드
    ↓
.env.json 읽기 시도 → 성공하면 메모리 로드
    ↓
localStorage 읽기 → 있으면 사용
    ↓
없으면 사용자에게 입력 요청 → LocalStorage 저장
    ↓
Claude API 호출 (HTTPS 암호화)
```

**특징:**
- ✅ API 키는 절대 코드에 없음
- ✅ 모든 API 통신은 HTTPS 암호화
- ✅ LocalStorage는 같은 도메인/프로토콜에서만 접근 가능
- ✅ 키가 없으면 앱이 멈추지 않고 친절히 안내

---

## 🔄 API 키 변경 방법

### 1. LocalStorage에서 삭제
```javascript
// F12 → Console
localStorage.removeItem('claude_api_key');
// 페이지 새로고침
```

### 2. 새로운 키 입력
- "Claude 챗" → "검색" 버튼 클릭
- 팝업에서 새로운 키 입력

### 3. .env.json 수정
```json
{
  "CLAUDE_API_KEY": "sk-ant-new-key-here"
}
```

---

## ✅ 보안 체크리스트

- [ ] .env 파일에 실제 키가 없음
- [ ] .env.json은 .gitignore에 포함됨
- [ ] 소스 코드에 API 키 하드코딩 없음
- [ ] git 커밋 전에 `git status` 확인
- [ ] .env.json을 실수로 커밋하지 않음
  ```bash
  # 확인 방법
  git ls-files | grep -E '\.(env|secrets)'
  # 결과: 파일 없어야 함
  ```

---

## 🚨 만약 API 키가 노출된 경우?

1. **즉시 키 폐기:**
   - https://console.anthropic.com → API Keys
   - 해당 키 삭제

2. **새로운 키 발급:**
   - 새로운 키 생성
   - 앱에서 새 키로 업데이트

3. **Git 히스토리 정리:**
   ```bash
   # 이전 커밋에서 민감한 정보 제거 (고급)
   git filter-branch --tree-filter 'rm -f .env' HEAD
   ```

---

## 📞 FAQ

**Q: 여러 기기에서 같은 API 키를 사용하려면?**
A: 각 기기에서 LocalStorage에 같은 키를 입력하세요. 또는 .env.json을 각 기기에 설정합니다.

**Q: 팀원과 작업할 때는?**
A: .env.json.example을 공유하되, 실제 .env.json은 각자 로컬에서 생성합니다. .gitignore 확인: ✓

**Q: API 키를 안전하게 백업하려면?**
A: 비밀번호 관리자(1Password, LastPass 등)에 저장하세요. 절대 평문 파일로 저장하지 말 것!

**Q: 서버에 배포할 때는?**
A: 호스팅 플랫폼의 환경변수 설정 사용 (Heroku, Vercel, GitHub Pages 등)

---

## 🔗 참고 자료
- [Anthropic API 보안 가이드](https://docs.anthropic.com/security)
- [OWASP: 환경변수 보안](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Git 민감정보 관리](https://git-scm.com/book/en/v2/Git-Tools-Credentials-Storage)

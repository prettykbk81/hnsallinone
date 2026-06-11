# API 연결 디버깅 가이드

## 🔍 브라우저 콘솔에서 확인하는 방법 (F12 → Console 탭)

### 1️⃣ API 키 로드 상태 확인
```javascript
// 콘솔에 이 명령어를 입력하세요
CLAUDE_API_KEY
```
- ✅ 결과: `sk-ant-...` (API 키가 표시됨) → **정상**
- ❌ 결과: 빈 문자열 또는 undefined → **API 키 미설정**

### 2️⃣ hasAPIKey() 함수 테스트
```javascript
hasAPIKey()
```
- ✅ 결과: `true` → **API 키 설정됨**
- ❌ 결과: `false` → **API 키 설정 필요**

### 3️⃣ LocalStorage 확인
```javascript
localStorage.getItem('claude_api_key')
```
- ✅ 결과: `sk-ant-...` → **LocalStorage에 저장됨**
- ❌ 결과: `null` → **저장되지 않음**

## 🧪 실제 요청 테스트

### 4️⃣ 간단한 질문으로 테스트
1. 입력창에 "안녕" 같은 간단한 질문 입력
2. 검색 버튼 클릭
3. 다음 중 어떤 일이 발생하는지 확인:

**Case A: 정상 작동** ✅
- 버튼이 "처리 중..."으로 변함
- 파란색 박스에 응답이 한 글자씩 나타남
- 처리 완료 후 버튼이 다시 "검색"으로 변함

**Case B: API 키 입력 팝업** 🔑
- "Claude API 키를 입력하세요" 팝업 표시
- 키를 입력하면 LocalStorage에 저장됨

**Case C: 오류 메시지**
- 파란색 박스에 오류 메시지 표시
- 콘솔에 상세 오류 로그 표시

## 📋 일반적인 오류 및 해결책

### ❌ "API 키가 올바르지 않습니다" 오류
**원인**: 잘못된 API 키 또는 만료된 키
**해결책**:
1. https://console.anthropic.com 방문
2. 새로운 API 키 생성
3. LocalStorage에서 기존 키 삭제:
```javascript
localStorage.removeItem('claude_api_key');
```
4. 페이지 새로고침 후 새 키 입력

### ❌ "요청이 너무 많습니다" (429 오류)
**원인**: API 호출 제한 초과
**해결책**: 5분 정도 기다린 후 다시 시도

### ❌ 응답이 아예 나오지 않음
**원인**: 네트워크 오류 또는 CORS 문제
**해결책**:
1. 인터넷 연결 확인
2. 브라우저 캐시 삭제 (Ctrl+Shift+Delete)
3. 페이지 새로고침 (Ctrl+F5)

## 🛠️ 콘솔 명령어 모음

```javascript
// API 상태 완전 확인
console.log('CLAUDE_API_KEY:', CLAUDE_API_KEY);
console.log('hasAPIKey():', hasAPIKey());
console.log('localStorage:', localStorage.getItem('claude_api_key'));

// API 키 재설정
setAPIKey('sk-ant-your-new-key-here');

// 기존 키 삭제 (초기화)
localStorage.removeItem('claude_api_key');

// 전체 로컬스토리지 확인
console.table(localStorage);
```

## 📞 추가 지원

콘솔 오류 메시지 전체를 복사해서 제공하면 더 정확한 진단이 가능합니다!

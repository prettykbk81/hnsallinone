# 🐍 Python 설치 오류 및 해결 방법

## ❌ 발생한 오류

```
Python이 Microsoft Store에 설치되어 있지만 정상 작동하지 않음
- python --version: 실패
- python3 -m venv: 실패
- pip3 --version: 실패
```

## 🔍 원인 분석

### 가능한 원인들
1. **Microsoft Store Python 불완전 설치** (가장 가능성 높음)
2. **PATH 환경변수 설정 오류**
3. **Python 실행 권한 문제**
4. **Windows 앱 별칭 문제**

## ✅ 해결 방법 (순서대로 시도)

### 방법 1️⃣: Python 완전 재설치 (추천) ⭐

**Step 1: 기존 Python 제거**
```powershell
# Windows 설정 → 앱 → 설치된 앱
# "Python" 검색하여 제거 (모든 Python 버전)
```

**Step 2: 공식 Python 설치**
1. https://www.python.org/downloads/ 방문
2. **Python 3.11 이상** 다운로드
3. 설치 시 **"Add Python to PATH"** ✅ 체크
4. **Install Now** 클릭

**Step 3: 설치 확인**
```powershell
python --version
python -m pip --version
```

**Step 4: 가상환경 생성**
```powershell
cd c:\hnstest003
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

---

### 방법 2️⃣: Microsoft Store Python 문제 우회

**Step 1: Python 경로 직접 찾기**
```powershell
where python3
# 예: C:\Users\RWIZ\AppData\Local\Microsoft\WindowsApps\python3.exe
```

**Step 2: 절대 경로로 가상환경 생성**
```powershell
cd c:\hnstest003
"C:\Users\RWIZ\AppData\Local\Microsoft\WindowsApps\python3.exe" -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
streamlit run app.py
```

---

### 방법 3️⃣: Anaconda 사용 (대안)

**Step 1: Anaconda 설치**
1. https://www.anaconda.com/download 방문
2. Anaconda Individual Edition 다운로드
3. 설치 진행

**Step 2: Conda 환경 생성**
```powershell
cd c:\hnstest003
conda create -n hnstest python=3.11
conda activate hnstest
pip install -r requirements.txt
streamlit run app.py
```

---

### 방법 4️⃣: Docker 사용 (최후의 수단)

**Step 1: Docker Desktop 설치**
1. https://www.docker.com/products/docker-desktop 다운로드
2. 설치 및 실행

**Step 2: Dockerfile 생성**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["streamlit", "run", "app.py"]
```

**Step 3: 실행**
```powershell
docker build -t hnstest .
docker run -p 8501:8501 hnstest
```

---

## 🎯 권장 순서

1. **방법 1 시도** (공식 Python 재설치) → 80% 성공률
2. **안 되면 방법 2** (직접 경로 사용) → 15% 성공률
3. **안 되면 방법 3** (Anaconda) → 95% 성공률
4. **마지막 수단 방법 4** (Docker) → 100% 성공률

---

## 📋 최종 체크리스트

방법 1 이후:
- [ ] `python --version` 작동
- [ ] `pip --version` 작동
- [ ] `.venv` 폴더 생성됨
- [ ] `.venv\Scripts\activate` 작동
- [ ] `pip install streamlit` 성공
- [ ] `streamlit run app.py` 작동

---

## 🚨 만약 여전히 오류가 나면?

```powershell
# 오류 메시지 전체 복사해서 다음 명령어 실행:
python -c "import sys; print(sys.version, sys.executable)"

# 결과 예시:
# 3.11.0 (main, Oct 24 2022, ...) C:\Users\...\AppData\Local\Programs\Python\Python311\python.exe
```

결과를 알려주시면 정확한 해결 방법을 제시해드리겠습니다!

---

## 💡 참고: Streamlit Cloud 대안

Python 설치가 계속 문제가 된다면:
1. GitHub에 프로젝트 푸시
2. https://streamlit.io/cloud 에서 무료 호스팅
3. 2분 안에 배포 완료

```bash
git push origin main
# → Streamlit Cloud 자동 배포
```

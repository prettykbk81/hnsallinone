# Supabase 연결 가이드

홈앤쇼핑 포탈을 Supabase와 연결하는 방법입니다.

## 1️⃣ Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속
2. 새 프로젝트 생성
3. 프로젝트 URL과 API Key 복사

## 2️⃣ 필요한 테이블 생성

Supabase 대시보드에서 아래 SQL을 실행하여 테이블을 생성하세요.

### **daily_sales 테이블 (일별 실적)**

```sql
CREATE TABLE daily_sales (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  sales BIGINT NOT NULL,
  growth DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RLS 정책 (선택사항)
ALTER TABLE daily_sales ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 읽기 가능
CREATE POLICY "Enable read access for all users" ON daily_sales
  FOR SELECT USING (true);

-- 인증된 사용자만 쓰기 가능
CREATE POLICY "Enable insert for authenticated users only" ON daily_sales
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 인증된 사용자만 수정 가능
CREATE POLICY "Enable update for authenticated users only" ON daily_sales
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### **monthly_sales 테이블 (월별 실적)**

```sql
CREATE TABLE monthly_sales (
  id BIGSERIAL PRIMARY KEY,
  month VARCHAR(20) NOT NULL UNIQUE,
  sales BIGINT NOT NULL,
  goal BIGINT,
  achievement_rate DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RLS 정책
ALTER TABLE monthly_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON monthly_sales
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON monthly_sales
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON monthly_sales
  FOR UPDATE USING (auth.role() = 'authenticated');
```

### **sales_goals 테이블 (목표 설정)**

```sql
CREATE TABLE sales_goals (
  id BIGSERIAL PRIMARY KEY,
  monthly_goal BIGINT NOT NULL,
  yearly_goal BIGINT NOT NULL,
  yearly_accumulated BIGINT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RLS 정책
ALTER TABLE sales_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON sales_goals
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON sales_goals
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON sales_goals
  FOR UPDATE USING (auth.role() = 'authenticated');
```

## 3️⃣ 테스트 데이터 삽입

아래 SQL을 실행하여 테스트 데이터를 추가하세요.

```sql
-- 일별 실적 데이터
INSERT INTO daily_sales (date, sales, growth) VALUES
  ('2026-06-11', 52000000, 8.5),
  ('2026-06-10', 48000000, -3.2),
  ('2026-06-09', 49500000, 2.1),
  ('2026-06-08', 48500000, 1.1),
  ('2026-06-07', 48000000, -2.0),
  ('2026-06-06', 49000000, 3.3),
  ('2026-06-05', 47500000, -1.0);

-- 월별 실적 데이터
INSERT INTO monthly_sales (month, sales, goal, achievement_rate) VALUES
  ('2026년 6월', 125000000, 150000000, 83.3),
  ('2026년 5월', 135000000, 145000000, 93.1),
  ('2026년 4월', 120000000, 130000000, 92.3);

-- 목표 설정 데이터
INSERT INTO sales_goals (monthly_goal, yearly_goal, yearly_accumulated) VALUES
  (150000000, 15000000000, 7500000000);
```

## 4️⃣ Supabase 설정 입력

### **방법 1: 프롬프트로 입력**

1. 매출 분석 페이지로 이동
2. "Supabase 설정하기" 클릭
3. Project URL 입력
4. API Key 입력

### **방법 2: .env 파일로 설정**

`.env` 파일을 생성하고 다음을 입력:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_API_KEY=your-anon-public-api-key-here
```

## 5️⃣ API Key 찾기

Supabase 대시보드에서:
1. **Settings** → **API**
2. **Project URL** 복사
3. **Project API Keys** → **anon public** 복사

## 🔒 보안 주의사항

⚠️ **중요**: 

- `.env` 파일을 `.gitignore`에 추가하여 Git에 커밋되지 않도록 하세요
- API Key는 절대 코드에 하드코딩하지 마세요
- RLS(Row Level Security) 정책을 설정하여 보안을 강화하세요
- 프로덕션 환경에서는 Supabase의 인증 기능을 사용하세요

## 📊 데이터 구조

### **daily_sales**
```
{
  id: number,
  date: string (YYYY-MM-DD),
  sales: number (원),
  growth: number (%), 
  created_at: timestamp,
  updated_at: timestamp
}
```

### **monthly_sales**
```
{
  id: number,
  month: string (예: "2026년 6월"),
  sales: number (원),
  goal: number (원),
  achievement_rate: number (%),
  created_at: timestamp,
  updated_at: timestamp
}
```

### **sales_goals**
```
{
  id: number,
  monthly_goal: number (원),
  yearly_goal: number (원),
  yearly_accumulated: number (원),
  created_at: timestamp,
  updated_at: timestamp
}
```

## ✅ 확인 체크리스트

- [ ] Supabase 프로젝트 생성 완료
- [ ] 3개 테이블 생성 완료
- [ ] 테스트 데이터 삽입 완료
- [ ] Project URL 복사 완료
- [ ] API Key 복사 완료
- [ ] .env 파일에 설정 저장 완료
- [ ] 매출 분석 페이지에서 데이터 확인 완료

## 🆘 문제 해결

### "Supabase가 초기화되지 않았습니다"
- → Supabase 라이브러리가 로드되지 않음
- → 브라우저의 개발자 도구(F12)에서 Console 확인
- → 네트워크 연결 확인

### "데이터가 없습니다"
- → 테이블에 데이터가 없음
- → Supabase 대시보드에서 테스트 데이터 삽입
- → API Key 권한 확인

### "API 인증 오류"
- → API Key가 잘못되었음
- → Supabase 대시보드에서 올바른 Key 복사
- → .env 파일 재설정

---

더 자세한 정보는 [Supabase 공식 문서](https://supabase.com/docs)를 참고하세요.

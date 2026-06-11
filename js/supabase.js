// ========================================
// Supabase 연결 설정 (새로운 테이블 구조)
// ========================================

// Supabase URL과 API Key
const SUPABASE_URL = 'https://ishipuyszpeeayvnhehb.supabase.co';
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzaGlwdXlzeHBlZWFheXZuaGVoYiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzE3NDI1Mjc5LCJleHAiOjE4NzUwOTEyNzl9.qG8vHVfhEkVkYKLMd7N-4hBHqALVUPqnZMfhEUKLQ_0';

let supabaseClient = null;

// Supabase 초기화
async function initSupabase() {
  try {
    if (typeof supabase === 'undefined') {
      console.error('❌ Supabase 라이브러리가 로드되지 않았습니다.');
      return false;
    }

    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_API_KEY);
    console.log('✓ Supabase 연결 성공');
    return true;
  } catch (error) {
    console.error('❌ Supabase 초기화 오류:', error);
    return false;
  }
}

// ========================================
// daily_sales 테이블 조회
// ========================================

// 일별 실적 조회 (2026년, 최근 7일)
async function getDailySales() {
  try {
    if (!supabaseClient) {
      console.error('Supabase가 초기화되지 않았습니다.');
      return null;
    }

    const { data, error } = await supabaseClient
      .from('daily_sales')
      .select('*')
      .eq('year', 2026)
      .order('sale_date', { ascending: false })
      .limit(14); // TV/Mobile 각 7일

    if (error) {
      console.error('일별 실적 조회 오류:', error);
      return null;
    }

    console.log('✓ 일별 실적 조회 완료:', data.length, '개');
    return data;
  } catch (error) {
    console.error('일별 실적 조회 오류:', error);
    return null;
  }
}

// 전년도 일별 실적 조회 (2025년, 동일 기간)
async function getPreviousYearDailySales() {
  try {
    if (!supabaseClient) {
      console.error('Supabase가 초기화되지 않았습니다.');
      return null;
    }

    const { data, error } = await supabaseClient
      .from('daily_sales')
      .select('*')
      .eq('year', 2025)
      .order('sale_date', { ascending: false })
      .limit(14);

    if (error) {
      console.error('전년도 일별 실적 조회 오류:', error);
      return null;
    }

    console.log('✓ 전년도 일별 실적 조회 완료:', data.length, '개');
    return data;
  } catch (error) {
    console.error('전년도 일별 실적 조회 오류:', error);
    return null;
  }
}

// 매체별 일별 매출 조회 (2026년)
async function getDailySalesByChannel() {
  try {
    if (!supabaseClient) {
      console.error('Supabase가 초기화되지 않았습니다.');
      return null;
    }

    const { data, error } = await supabaseClient
      .from('daily_sales')
      .select('*')
      .eq('year', 2026)
      .in('order_channel', ['TV', 'Mobile'])
      .order('sale_date', { ascending: false })
      .limit(28); // TV/Mobile 각 14일

    if (error) {
      console.error('매체별 일별 매출 조회 오류:', error);
      return null;
    }

    console.log('✓ 매체별 일별 매출 조회 완료:', data.length, '개');
    return data;
  } catch (error) {
    console.error('매체별 일별 매출 조회 오류:', error);
    return null;
  }
}

// ========================================
// monthly_sales 테이블 조회
// ========================================

// 월별 실적 조회 (2026년)
async function getMonthlySales() {
  try {
    if (!supabaseClient) {
      console.error('Supabase가 초기화되지 않았습니다.');
      return null;
    }

    const { data, error } = await supabaseClient
      .from('monthly_sales')
      .select('*')
      .eq('sale_year', 2026)
      .order('sale_month', { ascending: false });

    if (error) {
      console.error('월별 실적 조회 오류:', error);
      return null;
    }

    console.log('✓ 월별 실적 조회 완료:', data.length, '개');
    return data;
  } catch (error) {
    console.error('월별 실적 조회 오류:', error);
    return null;
  }
}

// 전년도 월별 실적 조회 (2025년)
async function getPreviousYearMonthlySales() {
  try {
    if (!supabaseClient) {
      console.error('Supabase가 초기화되지 않았습니다.');
      return null;
    }

    const { data, error } = await supabaseClient
      .from('monthly_sales')
      .select('*')
      .eq('sale_year', 2025)
      .order('sale_month', { ascending: false });

    if (error) {
      console.error('전년도 월별 실적 조회 오류:', error);
      return null;
    }

    console.log('✓ 전년도 월별 실적 조회 완료:', data.length, '개');
    return data;
  } catch (error) {
    console.error('전년도 월별 실적 조회 오류:', error);
    return null;
  }
}

// ========================================
// yearly_goals 테이블 조회
// ========================================

// 연간 목표 조회 (2026년)
async function getYearlyGoals() {
  try {
    if (!supabaseClient) {
      console.error('Supabase가 초기화되지 않았습니다.');
      return null;
    }

    const { data, error } = await supabaseClient
      .from('yearly_goals')
      .select('*')
      .eq('goal_year', 2026)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('연간 목표 조회 오류:', error);
      return null;
    }

    console.log('✓ 연간 목표 조회 완료');
    return data;
  } catch (error) {
    console.error('연간 목표 조회 오류:', error);
    return null;
  }
}

// 기존 함수 (호환성 유지)
async function getGoals() {
  return await getYearlyGoals();
}

// Supabase 연결 상태 확인
function isSupabaseConnected() {
  return supabaseClient !== null;
}

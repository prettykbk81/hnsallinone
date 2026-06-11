// ========================================
// 메인 앱 로직 (Phase 3+)
// ========================================

// ========================================
// 유틸리티 함수
// ========================================

// 현재 시간 표시 (실시간 업데이트)
function updateCurrentTime() {
  const now = new Date();
  const timeString = now.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const currentTimeEl = document.getElementById('current-time');
  if (currentTimeEl) {
    currentTimeEl.textContent = timeString;
  }
}

// 숫자를 통화 형식으로 변환
function formatCurrency(num) {
  if (!num) return '0';
  // 백만원 단위로 변환 후 쉼표 추가
  const baekman = Math.round(num / 1000000);
  return baekman.toLocaleString('ko-KR');
}

// ========================================
// Phase 3: 계산 함수
// ========================================

// 달성률 계산 (%)
function calculateAchievement(actual, goal) {
  if (goal === 0) return 0;
  return ((actual / goal) * 100).toFixed(1);
}

// 필요한 월평균 계산
function calculateRequiredMonthlyAverage(yearlyGoal, accumulated, monthsRemaining) {
  if (monthsRemaining === 0) return 0;
  return Math.ceil((yearlyGoal - accumulated) / monthsRemaining);
}

// ========================================
// Phase 5: LocalStorage 함수
// ========================================

// 사용자 프로필 저장
function saveUserProfile(name, department, position) {
  localStorage.setItem('userProfile', JSON.stringify({
    name,
    department,
    position,
    lastUpdated: new Date().toISOString()
  }));
}

// 사용자 프로필 로드
function loadUserProfile() {
  const stored = localStorage.getItem('userProfile');
  return stored ? JSON.parse(stored) : { name: '', department: '', position: '' };
}

// 목표 저장
function saveGoals(monthlyGoal, yearlyGoal) {
  localStorage.setItem('goalData', JSON.stringify({
    monthlyGoal: parseInt(monthlyGoal) || 0,
    yearlyGoal: parseInt(yearlyGoal) || 0,
    lastUpdated: new Date().toISOString()
  }));
}

// 목표 로드
function loadGoals() {
  const stored = localStorage.getItem('goalData');
  return stored ? JSON.parse(stored) : { monthlyGoal: 0, yearlyGoal: 0 };
}

// 전체 데이터 삭제
function clearAllData() {
  localStorage.removeItem('userProfile');
  localStorage.removeItem('goalData');
}

// ========================================
// Phase 6: 시스템 링크 렌더링
// ========================================

function renderSystemLinks() {
  const container = document.getElementById('system-links');
  if (!container) return;

  container.innerHTML = '';

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
      btn.rel = 'noopener noreferrer';
      btn.className = 'btn-link';
      btn.innerHTML = `
        <div class="icon-badge">${link.icon}</div>
        <span style="font-weight: 600; font-size: 13px; letter-spacing: 0.3px;">${link.name}</span>
      `;
      linkGroup.appendChild(btn);
    });

    categoryDiv.appendChild(linkGroup);
    container.appendChild(categoryDiv);
  });
}

// ========================================
// Phase 7: Claude API (AI 챗팅)
// ========================================
// 주의: 스트리밍 기능은 askAIStreaming() 함수를 사용합니다 (claude-api.js)
// 이 askAI 함수는 호환성 목적으로만 유지됩니다.

// ========================================
// 초기화
// ========================================

document.addEventListener('DOMContentLoaded', async function() {
  console.log('🚀 홈앤쇼핑 포탈 App 초기화 중...');

  // 현재 시간 설정
  updateCurrentTime();
  setInterval(updateCurrentTime, 1000);

  // API 키 로드
  if (typeof loadAPIKey === 'function') {
    console.log('🔑 API 키 로드 시작...');
    await loadAPIKey();
  }

  // API 상태 표시
  const updateAPIStatus = () => {
    const statusEl = document.getElementById('api-status');
    if (statusEl) {
      if (typeof hasAPIKey === 'function' && hasAPIKey()) {
        console.log('✅ API 키 설정됨');
        statusEl.textContent = '✓ API 키: 설정됨';
        statusEl.style.color = '#28a745';
      } else {
        console.warn('⚠️ API 키 미설정 - 사용자 입력 필요');
        statusEl.textContent = '⚠️ API 키: 미설정';
        statusEl.style.color = '#ffc107';
      }
    }
  };
  updateAPIStatus();

  // index.html에서만 시스템 링크 렌더링
  if (document.getElementById('system-links')) {
    renderSystemLinks();
  }

  // AI 챗팅 폼 이벤트 (스트리밍)
  const claudeForm = document.getElementById('claude-form');
  if (claudeForm) {
    console.log('✓ Claude 챗팅 폼 감지됨');

    claudeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const questionInput = document.getElementById('claude-question');
      const responseDiv = document.getElementById('claude-response');
      const submitBtn = claudeForm.querySelector('button[type="submit"]');

      if (!questionInput.value.trim()) {
        alert('질문을 입력해주세요.');
        return;
      }

      const question = questionInput.value;
      console.log('📤 질문 전송:', question.substring(0, 50) + '...');

      // UI 초기화
      responseDiv.textContent = '⏳ 응답 중...';
      responseDiv.style.opacity = '0.8';
      submitBtn.disabled = true;
      submitBtn.textContent = '처리 중...';

      // 스트리밍 응답
      if (typeof askAIStreaming === 'function') {
        console.log('🔄 askAIStreaming 함수 실행 중...');
        responseDiv.textContent = '';

        try {
          await askAIStreaming(question, (chunk) => {
            responseDiv.textContent += chunk;
            // 자동 스크롤
            if (responseDiv.scrollHeight > responseDiv.clientHeight) {
              responseDiv.scrollTop = responseDiv.scrollHeight;
            }
          });
          console.log('✅ 응답 완료');
        } catch (error) {
          console.error('❌ askAIStreaming 오류:', error);
          responseDiv.textContent = `오류 발생: ${error.message}`;
        }
      } else {
        console.error('❌ askAIStreaming 함수를 찾을 수 없습니다');
        responseDiv.textContent = '오류: Claude API 함수를 로드할 수 없습니다';
      }

      // UI 복원
      responseDiv.style.opacity = '1';
      submitBtn.disabled = false;
      submitBtn.textContent = '검색';
      questionInput.value = '';
      questionInput.focus();
    });
  } else {
    console.warn('⚠️ Claude 챗팅 폼을 찾을 수 없습니다');
  }

  // settings.html에서 프로필 로드
  const userNameInput = document.getElementById('user-name');
  if (userNameInput) {
    const profile = loadUserProfile();
    document.getElementById('user-name').value = profile.name || '';
    document.getElementById('user-department').value = profile.department || '';
    document.getElementById('user-position').value = profile.position || '';
  }

  // settings.html에서 목표 로드
  const settingsMonthlyGoal = document.getElementById('settings-monthly-goal');
  if (settingsMonthlyGoal) {
    const goals = loadGoals();
    document.getElementById('settings-monthly-goal').value = goals.monthlyGoal || '';
    document.getElementById('settings-yearly-goal').value = goals.yearlyGoal || '';
  }

  // analysis.html에서 목표 로드
  const monthlyGoalInput = document.getElementById('monthly-goal-input');
  if (monthlyGoalInput) {
    const goals = loadGoals();
    document.getElementById('monthly-goal-input').value = goals.monthlyGoal || '';
    document.getElementById('yearly-goal-input').value = goals.yearlyGoal || '';
  }
});

// ========================================
// Settings 페이지 함수
// ========================================

function saveUserProfile() {
  const name = document.getElementById('user-name').value;
  const department = document.getElementById('user-department').value;
  const position = document.getElementById('user-position').value;

  window.saveUserProfile(name, department, position);
  alert('프로필이 저장되었습니다.');
}

function saveSettingsGoals() {
  const monthlyGoal = document.getElementById('settings-monthly-goal').value;
  const yearlyGoal = document.getElementById('settings-yearly-goal').value;

  window.saveGoals(monthlyGoal, yearlyGoal);
  alert('목표가 저장되었습니다.');
}

console.log('✅ app.js 로드 완료\n📋 디버깅 팁:\n- F12 → Console 탭을 열어서 로그를 확인하세요\n- 더 자세한 정보: API_DEBUG_GUIDE.md 참고');

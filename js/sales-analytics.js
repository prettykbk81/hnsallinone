// ========================================
// 매출 분석 관련 함수 (Phase 4+)
// ========================================

// ========================================
// Phase 4: 일별 실적 테이블 렌더링
// ========================================

function renderDailyTable() {
  const tbody = document.querySelector('#daily-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  // 역순으로 정렬 (최신이 위)
  const sortedDaily = [...salesData.daily].reverse();

  sortedDaily.forEach((item, index) => {
    const row = document.createElement('tr');

    // 증감률에 따른 색상
    const growthColor = item.growth > 0 ? 'text-success' : (item.growth < 0 ? 'text-danger' : '');
    const growthSign = item.growth > 0 ? '+' : '';

    row.innerHTML = `
      <td>${item.date}</td>
      <td><strong>${formatCurrency(item.sales)}</strong></td>
      <td class="${growthColor}"><strong>${growthSign}${item.growth}%</strong></td>
    `;

    tbody.appendChild(row);
  });
}

// ========================================
// Phase 4: 월별 실적 테이블 렌더링
// ========================================

function renderMonthlyTable() {
  const tbody = document.querySelector('#monthly-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  const goals = loadGoals();

  salesData.monthly.forEach(item => {
    const row = document.createElement('tr');

    // 목표가 설정되었으면 사용, 아니면 기본값
    const goal = goals.monthlyGoal > 0 ? goals.monthlyGoal : item.goal;
    const achievement = calculateAchievement(item.sales, goal);

    // 달성률에 따른 색상
    const achievementColor = achievement >= 100 ? 'text-success' : (achievement >= 80 ? 'text-warning' : 'text-danger');

    row.innerHTML = `
      <td>${item.month}</td>
      <td>${formatCurrency(item.sales)}</td>
      <td>${formatCurrency(goal)}</td>
      <td class="${achievementColor}"><strong>${achievement}%</strong></td>
    `;

    tbody.appendChild(row);
  });
}

// ========================================
// Phase 4: 월별 요약 정보 렌더링
// ========================================

function renderMonthlySummary() {
  const summaryDiv = document.getElementById('monthly-summary');
  if (!summaryDiv) return;

  const goals = loadGoals();
  const currentMonth = salesData.monthly[salesData.monthly.length - 1];
  const goal = goals.monthlyGoal > 0 ? goals.monthlyGoal : currentMonth.goal;
  const achievement = calculateAchievement(currentMonth.sales, goal);

  const html = `
    <div>
      <h3 style="font-size: 16px; margin-bottom: 10px;">현재월 (6월) 현황</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
        <div>
          <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">누적 매출</p>
          <p style="font-size: 20px; font-weight: 600; color: var(--primary-color);">${formatCurrency(currentMonth.sales)}</p>
        </div>
        <div>
          <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">월 목표</p>
          <p style="font-size: 20px; font-weight: 600; color: var(--primary-color);">${formatCurrency(goal)}</p>
        </div>
      </div>
      <div>
        <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px;">달성률: ${achievement}%</p>
        <div class="progress">
          <div class="progress-bar" style="width: ${Math.min(achievement, 100)}%;">
            ${achievement}%
          </div>
        </div>
      </div>
    </div>
  `;

  summaryDiv.innerHTML = html;
}

// ========================================
// Phase 4: 년도 목표 요약 렌더링
// ========================================

function renderYearlySummary() {
  const summaryDiv = document.getElementById('yearly-summary');
  if (!summaryDiv) return;

  const goals = loadGoals();
  const yearlyGoal = goals.yearlyGoal > 0 ? goals.yearlyGoal : salesData.yearly.goal;
  const accumulated = salesData.yearly.accumulated;
  const monthsRemaining = salesData.yearly.monthsRemaining;
  const achievement = calculateAchievement(accumulated, yearlyGoal);
  const requiredMonthly = calculateRequiredMonthlyAverage(yearlyGoal, accumulated, monthsRemaining);

  const html = `
    <div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
        <div>
          <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">년도 목표</p>
          <p style="font-size: 20px; font-weight: 600; color: var(--primary-color);">${formatCurrency(yearlyGoal)}</p>
        </div>
        <div>
          <p style="color: var(--text-light); font-size: 13px; margin-bottom: 5px;">현재까지 누적</p>
          <p style="font-size: 20px; font-weight: 600; color: var(--success-color);">${formatCurrency(accumulated)}</p>
        </div>
      </div>
      <div style="margin-bottom: 20px;">
        <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px;">달성률: ${achievement}%</p>
        <div class="progress">
          <div class="progress-bar" style="width: ${Math.min(achievement, 100)}%;">
            ${achievement}%
          </div>
        </div>
      </div>
      <div style="padding: 15px; background-color: var(--bg-secondary); border-radius: 8px;">
        <p style="color: var(--text-light); font-size: 13px; margin-bottom: 8px;">남은 기간(6개월) 필요 월평균</p>
        <p style="font-size: 18px; font-weight: 600; color: var(--primary-color);">${formatCurrency(requiredMonthly)}</p>
      </div>
    </div>
  `;

  summaryDiv.innerHTML = html;
}

// ========================================
// Phase 5: 목표 저장 (analysis.html)
// ========================================

function saveGoals() {
  const monthlyGoal = document.getElementById('monthly-goal-input').value;
  const yearlyGoal = document.getElementById('yearly-goal-input').value;

  window.saveGoals(monthlyGoal, yearlyGoal);
  alert('목표가 저장되었습니다.');

  // 페이지 새로고침하여 업데이트된 목표 반영
  location.reload();
}

// ========================================
// 초기화 (analysis.html 로드 시)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('sales-analytics.js 로드됨');

  // analysis.html에서만 실행
  if (document.getElementById('daily-table')) {
    renderDailyTable();
    renderMonthlyTable();
    renderMonthlySummary();
    renderYearlySummary();
  }
});


#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
홈앤쇼핑 통합 포탈 - Streamlit 대시보드
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

# 페이지 설정
st.set_page_config(
    page_title="홈앤쇼핑 포탈",
    page_icon="🏠",
    layout="wide",
    initial_sidebar_state="expanded"
)

# 스타일 설정
st.markdown("""
    <style>
    .main {
        padding: 2rem;
    }
    h1 {
        color: #0066cc;
        text-align: center;
    }
    .metric-card {
        background-color: #f0f5ff;
        padding: 1.5rem;
        border-radius: 8px;
        border-left: 4px solid #0066cc;
    }
    </style>
""", unsafe_allow_html=True)

# ========================================
# 데이터 생성
# ========================================

def generate_sales_data():
    """목업 매출 데이터 생성"""

    # 일별 데이터 (최근 7일)
    dates = [datetime.now().date() - timedelta(days=x) for x in range(6, -1, -1)]
    daily_sales = pd.DataFrame({
        '날짜': dates,
        '매출액': [47500000, 48000000, 49000000, 48500000, 49500000, 48000000, 52000000],
        '증감률': [-1.0, 3.3, -2.0, 1.1, 2.1, -3.2, 8.5]
    })
    daily_sales['날짜'] = pd.to_datetime(daily_sales['날짜'])

    # 월별 데이터
    monthly_sales = pd.DataFrame({
        '월': ['4월', '5월', '6월'],
        '매출액': [1200000000, 1350000000, 1250000000],
        '목표액': [1300000000, 1450000000, 1500000000]
    })
    monthly_sales['달성률(%)'] = (
        monthly_sales['매출액'] / monthly_sales['목표액'] * 100
    ).round(1)

    # 년도 데이터
    yearly_goal = 15000000000
    yearly_accumulated = 7500000000
    yearly_achievement = (yearly_accumulated / yearly_goal * 100).__round__(1)

    return daily_sales, monthly_sales, yearly_goal, yearly_accumulated, yearly_achievement


# ========================================
# 메인 페이지
# ========================================

col1, col2 = st.columns([3, 1])
with col1:
    st.title("📊 홈앤쇼핑 포탈 대시보드")
with col2:
    st.write(f"🕐 {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

st.divider()

# 데이터 생성
daily_sales, monthly_sales, yearly_goal, yearly_accumulated, yearly_achievement = generate_sales_data()

# ========================================
# 1. 실시간 매출 현황
# ========================================

st.header("🎯 실시간 현황")

col1, col2, col3, col4 = st.columns(4)

with col1:
    st.metric(
        label="오늘 매출액",
        value=f"{daily_sales['매출액'].iloc[-1]/1000000:.0f}백만원",
        delta=f"{daily_sales['증감률'].iloc[-1]:.1f}%"
    )

with col2:
    month_sales = monthly_sales[monthly_sales['월'] == '6월']['매출액'].values[0]
    st.metric(
        label="6월 누적 매출",
        value=f"{month_sales/1000000000:.2f}십억원",
        delta="목표 대비"
    )

with col3:
    st.metric(
        label="6월 달성률",
        value=f"{monthly_sales[monthly_sales['월'] == '6월']['달성률(%)'].values[0]:.1f}%",
        delta="⚠️ 목표 부족"
    )

with col4:
    st.metric(
        label="년도 달성률",
        value=f"{yearly_achievement:.1f}%",
        delta="상반기 진행 중"
    )

st.divider()

# ========================================
# 2. 일별 매출 추이
# ========================================

st.header("📈 일별 매출 추이")

fig_daily = px.line(
    daily_sales,
    x='날짜',
    y='매출액',
    markers=True,
    title="최근 7일 매출액 추이",
    labels={'날짜': '날짜', '매출액': '매출액 (원)'},
    color_discrete_sequence=['#0066cc']
)
fig_daily.update_yaxis(tickformat=',.0f')
st.plotly_chart(fig_daily, use_container_width=True)

# 일별 상세 테이블
st.subheader("일별 상세 현황")
display_df = daily_sales.copy()
display_df['날짜'] = display_df['날짜'].dt.strftime('%Y-%m-%d')
display_df['매출액'] = display_df['매출액'].apply(lambda x: f"{x:,.0f}")
display_df['증감률'] = display_df['증감률'].apply(lambda x: f"{x:+.1f}%")
st.dataframe(display_df, use_container_width=True, hide_index=True)

st.divider()

# ========================================
# 3. 월별 목표 달성 현황
# ========================================

st.header("🎯 월별 목표 달성 현황")

col1, col2 = st.columns([2, 1])

with col1:
    # 월별 비교 차트
    fig_monthly = go.Figure()

    fig_monthly.add_trace(go.Bar(
        name='매출액',
        x=monthly_sales['월'],
        y=monthly_sales['매출액'],
        marker_color='#0066cc'
    ))

    fig_monthly.add_trace(go.Bar(
        name='목표액',
        x=monthly_sales['월'],
        y=monthly_sales['목표액'],
        marker_color='#ccddff'
    ))

    fig_monthly.update_layout(
        title="월별 매출 vs 목표",
        xaxis_title="월",
        yaxis_title="금액 (원)",
        barmode='group',
        height=400
    )
    fig_monthly.update_yaxis(tickformat=',.0f')

    st.plotly_chart(fig_monthly, use_container_width=True)

with col1:
    # 월별 달성률
    fig_achievement = px.bar(
        monthly_sales,
        x='월',
        y='달성률(%)',
        title="월별 달성률",
        color='달성률(%)',
        color_continuous_scale='RdYlGn',
        text='달성률(%)'
    )
    fig_achievement.update_traces(textposition='outside')
    fig_achievement.update_yaxis(range=[0, 120])
    st.plotly_chart(fig_achievement, use_container_width=True)

st.divider()

# ========================================
# 4. 년도 목표 현황
# ========================================

st.header("📅 년도 목표 현황")

col1, col2, col3 = st.columns(3)

with col1:
    st.metric(
        label="년도 목표액",
        value=f"{yearly_goal/1000000000:.1f}십억원"
    )

with col2:
    st.metric(
        label="누적 매출액",
        value=f"{yearly_accumulated/1000000000:.2f}십억원"
    )

with col3:
    st.metric(
        label="남은 목표액",
        value=f"{(yearly_goal - yearly_accumulated)/1000000000:.2f}십억원"
    )

# 년도 목표 프로그레스 바
st.subheader("년도 진행 현황")
col1, col2 = st.columns([4, 1])

with col1:
    progress_value = min(yearly_achievement / 100, 1.0)
    st.progress(progress_value, text=f"달성률 {yearly_achievement:.1f}%")

with col2:
    months_remaining = 6  # 상반기 진행 중
    required_monthly_avg = (yearly_goal - yearly_accumulated) / months_remaining
    st.write(f"**필요 월평균**\n{required_monthly_avg/100000000:.2f}십억")

st.divider()

# ========================================
# 5. 사이드바 - 설정
# ========================================

st.sidebar.header("⚙️ 설정")

st.sidebar.subheader("목표 설정")
monthly_goal_input = st.sidebar.number_input(
    "월 목표액 (원)",
    value=1500000000,
    step=100000000,
    format="%d"
)

yearly_goal_input = st.sidebar.number_input(
    "년도 목표액 (원)",
    value=15000000000,
    step=100000000,
    format="%d"
)

if st.sidebar.button("✅ 목표 저장"):
    st.sidebar.success("목표가 저장되었습니다!")

st.sidebar.divider()

st.sidebar.subheader("Claude AI 챗")
api_key_status = os.getenv('CLAUDE_API_KEY')
if api_key_status:
    st.sidebar.success("✅ API 키 설정됨")
else:
    st.sidebar.warning("⚠️ API 키 미설정")
    st.sidebar.info("`.env` 파일에 CLAUDE_API_KEY를 설정해주세요")

st.sidebar.divider()

st.sidebar.subheader("📋 정보")
st.sidebar.info(
    """
    **홈앤쇼핑 통합 포탈**

    - 📊 매출 분석
    - 🎯 목표 관리
    - 💬 Claude AI 챗
    - 🔗 시스템 연동
    """
)

# ========================================
# 푸터
# ========================================

st.divider()
st.markdown(
    """
    <div style="text-align: center; color: #999; font-size: 12px; margin-top: 2rem;">
    &copy; 2026 홈앤쇼핑 · 내부 포탈 | Streamlit 대시보드
    </div>
    """,
    unsafe_allow_html=True
)

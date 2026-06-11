// ========================================
// 상수 및 설정 데이터
// ========================================

// 목록 매출 데이터 (Phase 3)
const salesData = {
  daily: [
    { date: "2026-06-11", sales: 52000000, growth: 8.5 },
    { date: "2026-06-10", sales: 48000000, growth: -3.2 },
    { date: "2026-06-09", sales: 49500000, growth: 2.1 },
    { date: "2026-06-08", sales: 48500000, growth: 1.1 },
    { date: "2026-06-07", sales: 48000000, growth: -2.0 },
    { date: "2026-06-06", sales: 49000000, growth: 3.3 },
    { date: "2026-06-05", sales: 47500000, growth: -1.0 }
  ],
  monthly: [
    { month: "4월", sales: 1200000000, goal: 1300000000 },
    { month: "5월", sales: 1350000000, goal: 1450000000 },
    { month: "6월", sales: 1250000000, goal: 1500000000 }
  ],
  yearly: {
    goal: 15000000000,
    accumulated: 7500000000,
    monthsRemaining: 6
  }
};

// 시스템 링크 (Phase 6)
const systemLinks = [
  {
    category: "영업/주문 시스템",
    links: [
      { name: "BOS", url: "https://bos.example.com", icon: "💼" },
      { name: "콜판", url: "https://callpan.example.com", icon: "☎️" },
      { name: "뉴콜판", url: "https://newcall.example.com", icon: "📞" }
    ]
  },
  {
    category: "경영/분석 시스템",
    links: [
      { name: "PRISM 인사이트", url: "https://prism.example.com", icon: "📊" },
      { name: "OLAP", url: "https://olap.example.com", icon: "📈" },
      { name: "스팟파이어", url: "https://spotfire.example.com", icon: "🎯" }
    ]
  },
  {
    category: "홈쇼핑 플랫폼",
    links: [
      { name: "홈앤쇼핑 WEB", url: "https://www.homenshopping.com", icon: "🛍️" },
      { name: "홈앤쇼핑 모바일", url: "https://m.homenshopping.com", icon: "📱" },
      { name: "입점시스템", url: "https://seller.homenshopping.com", icon: "🏢" }
    ]
  },
  {
    category: "콘텐츠/방송",
    links: [
      { name: "방송심의", url: "https://broadcast.example.com", icon: "📺" },
      { name: "라방바", url: "https://livebroadcast.example.com", icon: "🎥" }
    ]
  },
  {
    category: "인사/교육 시스템",
    links: [
      { name: "그룹웨어", url: "https://groupware.example.com", icon: "📧" },
      { name: "EDU 포탈", url: "https://edu.example.com", icon: "🎓" },
      { name: "클라썸", url: "https://classum.example.com", icon: "👨‍💼" }
    ]
  },
  {
    category: "기타",
    links: [
      { name: "전자계약 WEB", url: "https://contract.example.com", icon: "✍️" },
      { name: "전자계약 어드민", url: "https://contract-admin.example.com", icon: "🔒" }
    ]
  }
];

// API 설정 (Phase 7)
// 주의: CLAUDE_API_KEY는 claude-api.js에서 동적으로 로드됩니다
const apiConfig = {
  API_ENDPOINT: 'https://api.anthropic.com/v1/messages',
  MODEL: 'claude-opus',
  MAX_TOKENS: 1024
};

console.log('constants.js 로드됨');

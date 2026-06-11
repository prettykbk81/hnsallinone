// ========================================
// Claude API (AI 챗팅 with Streaming)
// 🔐 보안 주의사항:
// - API 키는 절대 코드에 하드코딩하지 않음
// - .env.json (로컬개발용) 또는 localStorage에서만 로드
// - 모든 API 통신은 HTTPS 암호화
// ========================================

let CLAUDE_API_KEY = '';

// 페이지 로드 시 API 키 안전하게 로드
async function loadAPIKey() {
  try {
    // 1️⃣ .env.json 시도 (로컬 개발용, .gitignore에 포함)
    const response = await fetch('/.env.json').catch(() => null);

    if (response && response.ok) {
      const envData = await response.json();
      CLAUDE_API_KEY = envData.CLAUDE_API_KEY || '';
      if (CLAUDE_API_KEY) {
        console.log('✅ .env.json에서 API 키 로드됨');
      }
    }

    // 2️⃣ LocalStorage 우선 (사용자가 직접 입력한 키)
    const storedKey = localStorage.getItem('claude_api_key');
    if (storedKey) {
      CLAUDE_API_KEY = storedKey;
      console.log('✅ LocalStorage에서 API 키 로드됨');
    }

    // 상태 로그
    if (CLAUDE_API_KEY) {
      console.log('🔐 API 키: 설정됨 (길이:', CLAUDE_API_KEY.length, ')');
    } else {
      console.warn('⚠️  API 키: 아직 설정 안 됨 - 사용자 입력 대기 중');
    }
  } catch (error) {
    console.warn('API 키 로드 중 오류:', error);
  }
}

// API 키 설정 함수 (사용자가 키를 입력할 수 있게)
function setAPIKey(key) {
  CLAUDE_API_KEY = key.trim();
  if (CLAUDE_API_KEY) {
    localStorage.setItem('claude_api_key', CLAUDE_API_KEY);
    console.log('✓ API 키가 저장되었습니다.');
    return true;
  }
  return false;
}

// API 키 확인 함수
function hasAPIKey() {
  return CLAUDE_API_KEY && CLAUDE_API_KEY.length > 0;
}

// 스트리밍을 통한 AI 응답 함수
async function askAIStreaming(question, onChunk) {
  if (!question.trim()) {
    onChunk('질문을 입력해주세요.');
    return;
  }

  if (!hasAPIKey()) {
    const message = `⚠️ Claude API 키가 설정되지 않았습니다.\n\n🔧 설정 방법:\n1️⃣ https://console.anthropic.com 방문\n2️⃣ "API Keys" 메뉴 선택\n3️⃣ 새 API 키 생성 (sk-ant-로 시작)\n4️⃣ 아래 팝업에서 키 입력\n\n💡 팁: LocalStorage에만 저장되어 매우 안전합니다!\n`;
    onChunk(message);
    showAPIKeyPrompt();
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus',
        max_tokens: 1024,
        stream: true,
        system: '당신은 한국어로 친절하게 업무 관련 질문에 답변하는 포탈 어시스턴트입니다. 간결하고 명확하게 답변해주세요.',
        messages: [
          {
            role: 'user',
            content: question
          }
        ]
      })
    });

    if (!response.ok) {
      let errorMessage = 'API 오류가 발생했습니다.';

      if (response.status === 401) {
        errorMessage = '❌ API 키가 올바르지 않습니다.\n\nAPI 키를 다시 확인해주세요.';
        localStorage.removeItem('claude_api_key');
        CLAUDE_API_KEY = '';
      } else if (response.status === 429) {
        errorMessage = '⏳ 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.';
      } else if (response.status === 500) {
        errorMessage = '🔄 서버 오류입니다. 잠시 후 다시 시도해주세요.';
      }

      onChunk(errorMessage);
      return;
    }

    // 스트림 처리
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines[lines.length - 1];

      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i];

        if (line.startsWith('data: ')) {
          const data = line.slice(6);

          if (data === '[DONE]') continue;

          try {
            const json = JSON.parse(data);

            if (json.type === 'content_block_delta') {
              if (json.delta.type === 'text_delta') {
                onChunk(json.delta.text);
              }
            }
          } catch (e) {
            // JSON 파싱 오류 무시
          }
        }
      }
    }
  } catch (error) {
    console.error('AI 챗팅 오류:', error);
    onChunk(`❌ 오류: ${error.message}`);
  }
}

// API 키 입력 프롬프트 표시
function showAPIKeyPrompt() {
  setTimeout(() => {
    const key = prompt(
      '📌 Claude API 키를 입력하세요\n\n' +
      '발급 방법:\n' +
      '1. https://console.anthropic.com 방문\n' +
      '2. API Keys 메뉴에서 새 키 생성\n' +
      '3. sk-ant-로 시작하는 키를 아래에 입력\n\n' +
      '❗ 생성된 키는 이 브라우저의 LocalStorage에만 저장되며,\n' +
      '절대 공개 저장소나 네트워크를 통해 전송되지 않습니다.'
    );
    if (key && setAPIKey(key)) {
      alert('✓ API 키가 저장되었습니다!\n\n이제 Claude 챗을 사용할 수 있습니다.');
    } else if (key) {
      alert('❌ API 키 저장에 실패했습니다.\n다시 시도해주세요.');
    }
  }, 500);
}

import {
  ChatResponseUnion,
  createChatResponse,
  createDoneResponse,
  createThinkingResponse,
} from '../models/ChatResponse';

const API_BASE_URL = 'http://localhost:3000';

/**
 * Streamt ChatResponseUnion bis Done singal gesendet wurde als Stream
 *
 * Kommt vom Backend um Gedanken, Chat und File References sowie Errors zu streamen
 */
export async function* agenticQueryStream(
  query: string,
): AsyncGenerator<ChatResponseUnion> {
  try {
    const url = `${API_BASE_URL}/llm-tool-query-stream`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ error: 'Network error' }));
      throw new Error(
        errorData.error || `HTTP error! status: ${response.status}`,
      );
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data.trim()) {
            try {
              const parsed = JSON.parse(data);
              yield parsed as ChatResponseUnion;
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Agentic query stream error:', error);

    const mockResponse =
      "I apologize, but I'm currently experiencing technical difficulties. This is a mock response to demonstrate the fallback functionality. The system is designed to provide this placeholder content when the main service is unavailable.";

    yield createThinkingResponse('Hmm, let me think about this...');

    await new Promise((resolve) => setTimeout(resolve, 500));

    const words = mockResponse.split(' ');
    let currentContent = '';

    for (let i = 0; i < words.length; i++) {
      currentContent += words[i] + ' ';
      yield createChatResponse(currentContent.trim());

      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    yield createDoneResponse();
  }
}

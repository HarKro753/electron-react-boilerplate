import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import ChatMessages from './ChatMessages';

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();

  const handleSend = async () => {
    if (input.trim()) {
      const queryText = input;
      setInput('');
      await sendMessage(queryText);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-gray-50">
      <div className="w-full h-10 bg-white border-b border-gray-200 flex flex-row items-center justify-between py-1 px-2 gap-2">
        <div className="text-xs font-medium text-gray-600">Chat</div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-sm flex items-center justify-center cursor-pointer hover:bg-gray-200"
          aria-label="Close chat window"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <ChatMessages messages={messages} />

      <div className="border-t border-gray-200 bg-white">
        <div className="px-2 py-2 pb-4">
          <div className="flex items-stretch gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-gray-50 text-gray-800 placeholder-gray-400 rounded-sm px-3 py-2 resize-none border border-gray-200 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all min-h-[32px] max-h-20 text-xs"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#D1D5DB #F3F4F6',
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim()}
              aria-label="Send message"
              className={`px-2 rounded-sm transition-all text-xs flex items-center justify-center ${
                input.trim()
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { Message, SenderEnum } from '../models/Message';

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className="flex-1 px-4 py-2 overflow-y-auto custom-scrollbar"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#D1D5DB #F9FAFB',
      }}
    >
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === SenderEnum.User
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-xs ${
                message.sender === SenderEnum.User
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-gray-50 text-gray-700 border border-gray-200'
              }`}
            >
              {message.thought && (
                <div className="text-gray-400 text-xs italic mb-1">
                  {message.thought}
                </div>
              )}
              <div className="whitespace-pre-wrap">{message.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
}

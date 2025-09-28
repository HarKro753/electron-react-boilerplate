'use client';

import { useState } from 'react';
import { Message, SenderEnum } from '../models/Message';
import { agenticQueryStream } from '../api/agentic_prompt';
import { ChatResponseType } from '../models/ChatResponse';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const updateMessage = (id: number, updates: Partial<Message>) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg)),
    );
  };

  const sendMessage = async (input: string) => {
    if (input.trim()) {
      const newUserMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: SenderEnum.User,
      };

      setMessages((prev) => [...prev, newUserMessage]);

      const assistantMessageId = messages.length + 2;
      const newAssistantMessage: Message = {
        id: assistantMessageId,
        text: '',
        sender: SenderEnum.Assistant,
        thought: 'Thinking...',
      };

      setMessages((prev) => [...prev, newAssistantMessage]);

      try {
        const stream = agenticQueryStream(input);

        let accumulatedThought = '';
        let accumulatedText = '';

        for await (const chunk of stream) {
          switch (chunk.type) {
            case ChatResponseType.Error:
              updateMessage(assistantMessageId, {
                text: 'Sorry, I encountered an error while processing your request.',
                thought: undefined,
              });
              return;

            case ChatResponseType.Thinking:
              accumulatedThought += chunk.content;
              updateMessage(assistantMessageId, {
                thought: accumulatedThought,
              });
              break;

            case ChatResponseType.Chat:
              accumulatedText += chunk.content;
              updateMessage(assistantMessageId, { text: accumulatedText });
              break;

            case ChatResponseType.Done:
              updateMessage(assistantMessageId, { thought: undefined });
              break;
          }
        }
      } catch (error) {
        updateMessage(assistantMessageId, {
          text: 'Sorry, I encountered an error while processing your request.',
          thought: undefined,
        });
      }
    }
  };

  return {
    messages,
    sendMessage,
    updateMessage,
  };
};

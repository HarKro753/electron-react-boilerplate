import { FileReference } from './FileReference';

export enum ChatResponseType {
  Done = 'Done',
  Thinking = 'Thinking',
  FileReference = 'FileReference',
  Chat = 'Chat',
  Error = 'Error',
}

// Base interface
interface BaseChatResponse {
  type: ChatResponseType;
}

// Specific response types with proper content
export interface DoneResponse extends BaseChatResponse {
  type: ChatResponseType.Done;
  // No additional content needed
}

export interface ThinkingResponse extends BaseChatResponse {
  type: ChatResponseType.Thinking;
  content: string; // Streaming text content
}

export interface ChatResponse extends BaseChatResponse {
  type: ChatResponseType.Chat;
  content: string; // Final chat text response
}

export interface FileReferenceResponse extends BaseChatResponse {
  type: ChatResponseType.FileReference;
  content: FileReference;
}

export interface ErrorResponse extends BaseChatResponse {
  type: ChatResponseType.Error;
  content: string; // Error message
}

// Union type for type-safe responses
export type ChatResponseUnion =
  | DoneResponse
  | ThinkingResponse
  | ChatResponse
  | FileReferenceResponse
  | ErrorResponse;

// Helper functions to create responses
export const createDoneResponse = (): DoneResponse => ({
  type: ChatResponseType.Done,
});

export const createThinkingResponse = (content: string): ThinkingResponse => ({
  type: ChatResponseType.Thinking,
  content,
});

export const createChatResponse = (content: string): ChatResponse => ({
  type: ChatResponseType.Chat,
  content,
});

export const createFileReferenceResponse = (
  fileReference: FileReference,
): FileReferenceResponse => ({
  type: ChatResponseType.FileReference,
  content: fileReference,
});

export const createErrorResponse = (content: string): ErrorResponse => ({
  type: ChatResponseType.Error,
  content,
});

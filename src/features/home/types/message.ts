export type MessageRole = 'me' | 'assistant';

export type ChatMessage = {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: string;
};

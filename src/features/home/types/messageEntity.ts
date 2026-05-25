export type ChatMessage = {
  id: string;
  text: string;
  timestamp: string;
  type: 'text' | 'file';
};

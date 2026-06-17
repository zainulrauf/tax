export interface AssistantResponse {
  answer: string;

  recommendedProduct?: string;

  confidence: 'low' | 'medium' | 'high';

  reasons: string[];

  disclaimer: string;
}
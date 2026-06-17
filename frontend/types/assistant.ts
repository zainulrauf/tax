export interface AssistantResponse {
    answer: string;
    recommendedProduct?: string;
    confidence: string;
    reasons: string[];
    disclaimer: string;
  }
export interface RecommendationResult {
    recommendedProductId: string;
  
    recommendedProductName: string;
  
    price: number;
  
    confidence: 'low' | 'medium' | 'high';
  
    reasons: string[];
  
    matchedInputs: string[];
  
    optionalUpgrade?: {
      productId: string;
      productName: string;
      reason: string;
    };
  
    warnings?: string[];
  
    disclaimer: string;
  }
export interface Questionnaire {
    filingType: string;
    incomeSources: string[];
    deductions: string[];
    helpPreference: string;
    companyRevenue?: string;
  }
  
  export interface RecommendationResult {
    recommendedProductId: string;
    recommendedProductName: string;
    price: number;
    confidence: string;
    reasons: string[];
    matchedInputs: string[];
    warnings?: string[];
    disclaimer: string;
  }
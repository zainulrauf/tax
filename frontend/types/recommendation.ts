export interface Questionnaire {
  filingType: string;
  incomeSources: string[];
  deductions: string[];
  helpPreference: string;
  companyRevenue?: boolean;
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

export interface SelectCardProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

export interface ResultViewProps {
  result: RecommendationResult;
  restart: () => void;
}

export interface SidebarProps {
  step: number;
  progress: number;
}
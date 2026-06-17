export interface Product {
    id: string;
    name: string;
    price: number;
    currency: string;
    description: string;
    bestFor: string[];
    supports: Record<string, boolean>;
  }
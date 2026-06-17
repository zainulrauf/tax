export interface ProductFeatures {
    salaryIncome: boolean;
    studentIncome: boolean;
    medicalExpenses: boolean;
    donations: boolean;
    employmentExpenses: boolean;
    investmentIncome: boolean;
    capitalGains: boolean;
    foreignIncome: boolean;
    rentalIncome: boolean;
    freelanceIncome: boolean;
    gigWorkIncome: boolean;
    businessExpenses: boolean;
    homeOfficeExpenses: boolean;
    vehicleExpenses: boolean;
    expertHelp: boolean;
    fullService: boolean;
    corporateFiling: boolean;
    nilCorporateReturn: boolean;
}
export interface Product {
    id: string;
    name: string;
    price: number;
    currency: 'CAD';
    description: string;
    bestFor: string[];
    supports: ProductFeatures;
}

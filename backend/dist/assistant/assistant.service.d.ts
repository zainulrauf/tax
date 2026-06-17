export declare class AssistantService {
    ask(question: string): {
        answer: string;
        confidence: string;
        reasons: string[];
        disclaimer: string;
        recommendedProduct?: undefined;
    } | {
        answer: string;
        recommendedProduct: string;
        confidence: string;
        reasons: string[];
        disclaimer: string;
    };
}

import { AssistantService } from './assistant.service';
import { AssistantQuestionDto } from './dto/assistant-question.dto';
export declare class AssistantController {
    private readonly assistantService;
    constructor(assistantService: AssistantService);
    ask(dto: AssistantQuestionDto): {
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

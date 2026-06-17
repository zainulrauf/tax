import { QuestionnaireDto } from './dto/questionnaire.dto';
import { RecommendationResult } from './interfaces/recommendation-result.interface';
import { ValidationService } from './validation.service';
export declare class RecommendationService {
    private readonly validationService;
    private readonly disclaimer;
    constructor(validationService: ValidationService);
    recommend(dto: QuestionnaireDto): RecommendationResult;
}

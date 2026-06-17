import { QuestionnaireDto } from './dto/questionnaire.dto';
import { RecommendationService } from './recommendation.service';
export declare class RecommendationController {
    private readonly recommendationService;
    constructor(recommendationService: RecommendationService);
    recommend(dto: QuestionnaireDto): import("./interfaces/recommendation-result.interface").RecommendationResult;
}

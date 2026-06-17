import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import { QuestionnaireDto } from './dto/questionnaire.dto';
import { RecommendationService } from './recommendation.service';

@Controller('api/recommend')
export class RecommendationController {
  constructor(
    private readonly recommendationService: RecommendationService,
  ) {}

  @Post()
  recommend(
    @Body()
    dto: QuestionnaireDto,
  ) {
    return this.recommendationService.recommend(
      dto,
    );
  }
}
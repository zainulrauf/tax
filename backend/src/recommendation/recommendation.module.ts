import { Module } from '@nestjs/common';

import { RecommendationController } from './recommendation.controller';
import { RecommendationService } from './recommendation.service';
import { ValidationService } from './validation.service';

@Module({
  controllers: [
    RecommendationController,
  ],
  providers: [
    RecommendationService,
    ValidationService,
  ],
  exports: [
    RecommendationService,
  ],
})
export class RecommendationModule {}
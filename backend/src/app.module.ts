import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { RecommendationModule } from './recommendation/recommendation.module';
import { AssistantModule } from './assistant/assistant.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ProductsModule,
    RecommendationModule,
    AssistantModule,
    AdminModule,
    HealthModule,
  ],
})
export class AppModule {}
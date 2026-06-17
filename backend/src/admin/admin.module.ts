import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminExportController } from './admin-export.controller';
import { AdminValidationController } from './admin-validation.controller';

@Module({
  controllers: [
    AdminController,
    AdminExportController,
    AdminValidationController,
  ],
})
export class AdminModule {}
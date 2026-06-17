import {
  Controller,
  Get,
} from '@nestjs/common';

@Controller('health')
export class HealthController {

  @Get()
  check() {
    return {
      status: 'ok',
      service:
        'tax-recommendation-api',
      version: '1.0.0',
      timestamp:
        new Date().toISOString(),
      uptime:
        process.uptime(),
      environment:
        process.env.NODE_ENV ||
        'development',
    };
  }
}
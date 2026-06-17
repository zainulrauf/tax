import { Controller, Get } from '@nestjs/common';
import { PRODUCTS } from '../products/utils/products';

@Controller('api/admin/products')
export class AdminController {
  @Get()
  getProductConfig() {
    return PRODUCTS;
  }
}
import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  getProducts() {
    return this.productsService.findAll();
  }

  @Get(':id')
  getProduct(
    @Param('id') id: string,
  ) {
    return this.productsService.findById(id);
  }
}
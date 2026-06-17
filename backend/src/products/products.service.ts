import { Injectable } from '@nestjs/common';
import { PRODUCTS } from './utils/products';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  findAll(): Product[] {
    return PRODUCTS;
  }

  findById(id: string): Product | undefined {
    return PRODUCTS.find((p) => p.id === id);
  }
}
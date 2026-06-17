import { Injectable } from '@nestjs/common';
import { PRODUCTS } from './utils/products';

@Injectable()
export class ProductValidatorService {
  validate() {
    const errors: string[] = [];

    PRODUCTS.forEach((product) => {
      if (!product.id) {
        errors.push(
          `${product.name}: missing id`,
        );
      }

      if (!product.name) {
        errors.push(
          `${product.id}: missing name`,
        );
      }

      if (
        product.price === undefined
      ) {
        errors.push(
          `${product.id}: missing price`,
        );
      }
    });

    return {
      valid:
        errors.length === 0,
      errors,
    };
  }
}
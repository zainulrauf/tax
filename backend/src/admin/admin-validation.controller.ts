import { Controller, Get } from '@nestjs/common';

import { PRODUCTS } from '../products/utils/products';

@Controller('api/admin/validate')
export class AdminValidationController {
  @Get()
  validateProducts() {
    const errors: string[] = [];

    PRODUCTS.forEach(
      (product, index) => {
        if (!product.id) {
          errors.push(
            `Product ${index + 1}: Missing id`,
          );
        }

        if (!product.name) {
          errors.push(
            `Product ${index + 1}: Missing name`,
          );
        }

        if (
          product.price === null ||
          product.price === undefined
        ) {
          errors.push(
            `${product.id}: Missing price`,
          );
        }

        if (!product.description) {
          errors.push(
            `${product.id}: Missing description`,
          );
        }

        if (
          !Array.isArray(
            product.bestFor,
          )
        ) {
          errors.push(
            `${product.id}: bestFor must be an array`,
          );
        }

        if (!product.supports) {
          errors.push(
            `${product.id}: Missing supports object`,
          );
        }
      },
    );

    return {
      valid:
        errors.length === 0,
      totalProducts:
        PRODUCTS.length,
      errors,
    };
  }
}
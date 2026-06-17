import {
  Controller,
  Get,
  Res,
} from '@nestjs/common';

import { Response } from 'express';

import { PRODUCTS } from '../products/utils/products';

@Controller('api/admin/export')
export class AdminExportController {
  @Get()
  exportProducts(
    @Res() res: Response,
  ) {
    res.setHeader(
      'Content-Type',
      'application/json',
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=products.json',
    );

    return res.send(
      JSON.stringify(
        PRODUCTS,
        null,
        2,
      ),
    );
  }
}
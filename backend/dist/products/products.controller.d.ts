import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(): {};
    getProduct(id: string): import("./interfaces/product.interface").Product | undefined;
}

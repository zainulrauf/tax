import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(): import("./interfaces/product.interface").Product[];
    getProduct(id: string): import("./interfaces/product.interface").Product | undefined;
}

import { Product } from './interfaces/product.interface';
export declare class ProductsService {
    findAll(): Product[];
    findById(id: string): Product | undefined;
}

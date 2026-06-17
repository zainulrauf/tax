"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidatorService = void 0;
const common_1 = require("@nestjs/common");
const products_1 = require("./utils/products");
let ProductValidatorService = class ProductValidatorService {
    validate() {
        const errors = [];
        products_1.PRODUCTS.forEach((product) => {
            if (!product.id) {
                errors.push(`${product.name}: missing id`);
            }
            if (!product.name) {
                errors.push(`${product.id}: missing name`);
            }
            if (product.price === undefined) {
                errors.push(`${product.id}: missing price`);
            }
        });
        return {
            valid: errors.length === 0,
            errors,
        };
    }
};
exports.ProductValidatorService = ProductValidatorService;
exports.ProductValidatorService = ProductValidatorService = __decorate([
    (0, common_1.Injectable)()
], ProductValidatorService);
//# sourceMappingURL=product-validator.service.js.map
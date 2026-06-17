"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidationController = void 0;
const common_1 = require("@nestjs/common");
const products_1 = require("../products/utils/products");
let AdminValidationController = class AdminValidationController {
    validateProducts() {
        const errors = [];
        products_1.PRODUCTS.forEach((product, index) => {
            if (!product.id) {
                errors.push(`Product ${index + 1}: Missing id`);
            }
            if (!product.name) {
                errors.push(`Product ${index + 1}: Missing name`);
            }
            if (product.price === null ||
                product.price === undefined) {
                errors.push(`${product.id}: Missing price`);
            }
            if (!product.description) {
                errors.push(`${product.id}: Missing description`);
            }
            if (!Array.isArray(product.bestFor)) {
                errors.push(`${product.id}: bestFor must be an array`);
            }
            if (!product.supports) {
                errors.push(`${product.id}: Missing supports object`);
            }
        });
        return {
            valid: errors.length === 0,
            totalProducts: products_1.PRODUCTS.length,
            errors,
        };
    }
};
exports.AdminValidationController = AdminValidationController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminValidationController.prototype, "validateProducts", null);
exports.AdminValidationController = AdminValidationController = __decorate([
    (0, common_1.Controller)('api/admin/validate')
], AdminValidationController);
//# sourceMappingURL=admin-validation.controller.js.map
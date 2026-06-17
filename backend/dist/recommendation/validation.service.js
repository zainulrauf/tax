"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
let ValidationService = class ValidationService {
    validate(dto) {
        if (!dto.filingType) {
            throw new common_1.BadRequestException('Filing type is required');
        }
        if (!dto.incomeSources ||
            dto.incomeSources.length === 0) {
            throw new common_1.BadRequestException('At least one income source is required');
        }
        if (!dto.helpPreference) {
            throw new common_1.BadRequestException('Help preference is required');
        }
        if (dto.filingType === 'corporate' &&
            dto.companyRevenue === undefined) {
            throw new common_1.BadRequestException('Company revenue answer is required');
        }
        if (dto.deductions?.includes('noSpecialDeductions') &&
            dto.deductions.length > 1) {
            throw new common_1.BadRequestException('No Special Deductions conflicts with other deductions');
        }
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map
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
exports.RecommendationService = void 0;
const common_1 = require("@nestjs/common");
const validation_service_1 = require("./validation.service");
let RecommendationService = class RecommendationService {
    constructor(validationService) {
        this.validationService = validationService;
        this.disclaimer = 'This recommendation provides general product guidance only and is not tax, legal, or financial advice.';
    }
    recommend(dto) {
        this.validationService.validate(dto);
        if (dto.filingType === 'corporate') {
            if (dto.companyRevenue === false) {
                return {
                    recommendedProductId: 'nil-corporate-return',
                    recommendedProductName: 'Nil Corporate Return',
                    price: 175,
                    confidence: 'high',
                    reasons: [
                        'You selected Incorporated Company.',
                        'Company has no revenue.',
                    ],
                    matchedInputs: [
                        'corporate',
                        'noRevenue',
                    ],
                    disclaimer: this.disclaimer,
                };
            }
            return {
                recommendedProductId: 'business-corporate',
                recommendedProductName: 'Business Corporate',
                price: 400,
                confidence: 'high',
                reasons: [
                    'You selected Incorporated Company.',
                    'Company has revenue.',
                ],
                matchedInputs: [
                    'corporate',
                    'revenue',
                ],
                disclaimer: this.disclaimer,
            };
        }
        if (dto.helpPreference ===
            'full-service') {
            return {
                recommendedProductId: 'expert-full-service',
                recommendedProductName: 'Expert Full Service',
                price: 250,
                confidence: 'high',
                reasons: [
                    'You requested an expert to file your return.',
                ],
                matchedInputs: [
                    'full-service',
                ],
                disclaimer: this.disclaimer,
            };
        }
        if (dto.helpPreference ===
            'expert-help') {
            return {
                recommendedProductId: 'expert-assist',
                recommendedProductName: 'Expert Assist',
                price: 120,
                confidence: 'high',
                reasons: [
                    'You requested expert help while filing.',
                ],
                matchedInputs: [
                    'expert-help',
                ],
                disclaimer: this.disclaimer,
            };
        }
        if (dto.filingType ===
            'self-employed' ||
            dto.incomeSources.includes('freelanceIncome') ||
            dto.incomeSources.includes('gigWorkIncome') ||
            dto.incomeSources.includes('businessRevenue') ||
            dto.deductions.includes('businessExpenses') ||
            dto.deductions.includes('homeOfficeExpenses') ||
            dto.deductions.includes('vehicleExpenses')) {
            return {
                recommendedProductId: 'self-employed',
                recommendedProductName: 'Self-Employed',
                price: 70,
                confidence: 'high',
                reasons: [
                    'Freelance, business, or self-employed activity detected.',
                ],
                matchedInputs: [
                    ...dto.incomeSources,
                    ...dto.deductions,
                ],
                optionalUpgrade: {
                    productId: 'expert-assist',
                    productName: 'Expert Assist',
                    reason: 'You may benefit from expert guidance.',
                },
                disclaimer: this.disclaimer,
            };
        }
        if (dto.incomeSources.includes('investmentIncome') ||
            dto.incomeSources.includes('capitalGains') ||
            dto.incomeSources.includes('rentalIncome') ||
            dto.incomeSources.includes('foreignIncome')) {
            return {
                recommendedProductId: 'premier',
                recommendedProductName: 'Premier',
                price: 50,
                confidence: 'high',
                reasons: [
                    'Investment, rental, capital gains, or foreign income selected.',
                ],
                matchedInputs: dto.incomeSources,
                optionalUpgrade: {
                    productId: 'expert-assist',
                    productName: 'Expert Assist',
                    reason: 'Expert guidance may help with more complex tax situations.',
                },
                disclaimer: this.disclaimer,
            };
        }
        if (dto.deductions.includes('medicalExpenses') ||
            dto.deductions.includes('donations') ||
            dto.deductions.includes('employmentExpenses')) {
            return {
                recommendedProductId: 'deluxe',
                recommendedProductName: 'Deluxe',
                price: 30,
                confidence: 'medium',
                reasons: [
                    'Common deductions selected.',
                ],
                matchedInputs: dto.deductions,
                optionalUpgrade: {
                    productId: 'premier',
                    productName: 'Premier',
                    reason: 'Upgrade if investment or rental income applies.',
                },
                disclaimer: this.disclaimer,
            };
        }
        return {
            recommendedProductId: 'free',
            recommendedProductName: 'Free',
            price: 0,
            confidence: 'high',
            reasons: [
                'Simple personal return detected.',
            ],
            matchedInputs: dto.incomeSources,
            optionalUpgrade: {
                productId: 'deluxe',
                productName: 'Deluxe',
                reason: 'Upgrade if you have deductions in the future.',
            },
            disclaimer: this.disclaimer,
        };
    }
};
exports.RecommendationService = RecommendationService;
exports.RecommendationService = RecommendationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [validation_service_1.ValidationService])
], RecommendationService);
//# sourceMappingURL=recommendation.service.js.map
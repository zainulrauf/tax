"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssistantService = void 0;
const common_1 = require("@nestjs/common");
const disclaimer_constant_1 = require("../common/constants/disclaimer.constant");
let AssistantService = class AssistantService {
    ask(question) {
        const q = question.toLowerCase();
        if (q.includes('refund') ||
            q.includes('guarantee')) {
            return {
                answer: 'I cannot guarantee refunds or tax outcomes.',
                confidence: 'high',
                reasons: [
                    'Safety rule triggered.',
                ],
                disclaimer: disclaimer_constant_1.DISCLAIMER,
            };
        }
        if (q.includes('salary') &&
            q.includes('donation')) {
            return {
                answer: 'Based on the provided product rules, Deluxe appears suitable.',
                recommendedProduct: 'Deluxe',
                confidence: 'high',
                reasons: [
                    'Salary income detected.',
                    'Donation deductions detected.',
                ],
                disclaimer: disclaimer_constant_1.DISCLAIMER,
            };
        }
        if (q.includes('freelance') ||
            q.includes('freelancer') ||
            q.includes('self-employed') ||
            q.includes('home office')) {
            return {
                answer: 'Based on the provided product rules, Self-Employed appears suitable.',
                recommendedProduct: 'Self-Employed',
                confidence: 'high',
                reasons: [
                    'Freelance indicators detected.',
                    'Business expense support may be required.',
                ],
                disclaimer: disclaimer_constant_1.DISCLAIMER,
            };
        }
        if (q.includes('investment') ||
            q.includes('rental')) {
            return {
                answer: 'Based on the provided product rules, Premier appears suitable.',
                recommendedProduct: 'Premier',
                confidence: 'high',
                reasons: [
                    'Investment or rental income detected.',
                ],
                disclaimer: disclaimer_constant_1.DISCLAIMER,
            };
        }
        if (q.includes('incorporated') ||
            q.includes('corporation') ||
            q.includes('corporate') ||
            q.includes('company')) {
            return {
                answer: 'Based on the provided product rules, Corporate appears suitable.',
                recommendedProduct: 'Corporate',
                confidence: 'high',
                reasons: [
                    'Corporate filing indicators detected.',
                ],
                disclaimer: disclaimer_constant_1.DISCLAIMER,
            };
        }
        if (q.includes('file for me') ||
            q.includes('someone else file') ||
            q.includes('expert help')) {
            return {
                answer: 'You should select the Full Service filing option.',
                confidence: 'high',
                reasons: [
                    'User prefers expert-assisted filing.',
                ],
                disclaimer: disclaimer_constant_1.DISCLAIMER,
            };
        }
        if (q.includes('difference') &&
            q.includes('premier') &&
            q.includes('self-employed')) {
            return {
                answer: 'Premier focuses on investment and rental income, while Self-Employed focuses on freelance and business income with expense tracking.',
                confidence: 'high',
                reasons: [
                    'Product comparison request detected.',
                ],
                disclaimer: disclaimer_constant_1.DISCLAIMER,
            };
        }
        return {
            answer: 'Please provide additional details about your tax situation.',
            confidence: 'low',
            reasons: [],
            disclaimer: disclaimer_constant_1.DISCLAIMER,
        };
    }
};
exports.AssistantService = AssistantService;
exports.AssistantService = AssistantService = __decorate([
    (0, common_1.Injectable)()
], AssistantService);
//# sourceMappingURL=assistant.service.js.map
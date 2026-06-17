import { Injectable } from '@nestjs/common';

import { QuestionnaireDto } from './dto/questionnaire.dto';
import { RecommendationResult } from './interfaces/recommendation-result.interface';
import { ValidationService } from './validation.service';

@Injectable()
export class RecommendationService {
  private readonly disclaimer =
    'This recommendation provides general product guidance only and is not tax, legal, or financial advice.';

  constructor(
    private readonly validationService: ValidationService,
  ) {}

  recommend(
    dto: QuestionnaireDto,
  ): RecommendationResult {
    this.validationService.validate(dto);

    // RULE 1
    if (
      dto.filingType === 'corporate'
    ) {
      if (
        dto.companyRevenue === false
      ) {
        return {
          recommendedProductId:
            'nil-corporate-return',
          recommendedProductName:
            'Nil Corporate Return',
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
          disclaimer:
            this.disclaimer,
        };
      }

      return {
        recommendedProductId:
          'business-corporate',
        recommendedProductName:
          'Business Corporate',
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
        disclaimer:
          this.disclaimer,
      };
    }

    // RULE 2
    if (
      dto.helpPreference ===
      'full-service'
    ) {
      return {
        recommendedProductId:
          'expert-full-service',
        recommendedProductName:
          'Expert Full Service',
        price: 250,
        confidence: 'high',
        reasons: [
          'You requested an expert to file your return.',
        ],
        matchedInputs: [
          'full-service',
        ],
        disclaimer:
          this.disclaimer,
      };
    }

    // RULE 3
    if (
      dto.helpPreference ===
      'expert-help'
    ) {
      return {
        recommendedProductId:
          'expert-assist',
        recommendedProductName:
          'Expert Assist',
        price: 120,
        confidence: 'high',
        reasons: [
          'You requested expert help while filing.',
        ],
        matchedInputs: [
          'expert-help',
        ],
        disclaimer:
          this.disclaimer,
      };
    }

    // RULE 4
    if (
      dto.filingType ===
        'self-employed' ||
      dto.incomeSources.includes(
        'freelanceIncome',
      ) ||
      dto.incomeSources.includes(
        'gigWorkIncome',
      ) ||
      dto.incomeSources.includes(
        'businessRevenue',
      ) ||
      dto.deductions.includes(
        'businessExpenses',
      ) ||
      dto.deductions.includes(
        'homeOfficeExpenses',
      ) ||
      dto.deductions.includes(
        'vehicleExpenses',
      )
    ) {
      return {
        recommendedProductId:
          'self-employed',
        recommendedProductName:
          'Self-Employed',
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
          productId:
            'expert-assist',
          productName:
            'Expert Assist',
          reason:
            'You may benefit from expert guidance.',
        },
        disclaimer:
          this.disclaimer,
      };
    }

    // RULE 5
    if (
      dto.incomeSources.includes(
        'investmentIncome',
      ) ||
      dto.incomeSources.includes(
        'capitalGains',
      ) ||
      dto.incomeSources.includes(
        'rentalIncome',
      ) ||
      dto.incomeSources.includes(
        'foreignIncome',
      )
    ) {
      return {
        recommendedProductId:
          'premier',
        recommendedProductName:
          'Premier',
        price: 50,
        confidence: 'high',
        reasons: [
          'Investment, rental, capital gains, or foreign income selected.',
        ],
        matchedInputs:
          dto.incomeSources,
        optionalUpgrade: {
          productId:
            'expert-assist',
          productName:
            'Expert Assist',
          reason:
            'Expert guidance may help with more complex tax situations.',
        },
        disclaimer:
          this.disclaimer,
      };
    }

    // RULE 6
    if (
      dto.deductions.includes(
        'medicalExpenses',
      ) ||
      dto.deductions.includes(
        'donations',
      ) ||
      dto.deductions.includes(
        'employmentExpenses',
      )
    ) {
      return {
        recommendedProductId:
          'deluxe',
        recommendedProductName:
          'Deluxe',
        price: 30,
        confidence: 'medium',
        reasons: [
          'Common deductions selected.',
        ],
        matchedInputs:
          dto.deductions,
        optionalUpgrade: {
          productId:
            'premier',
          productName:
            'Premier',
          reason:
            'Upgrade if investment or rental income applies.',
        },
        disclaimer:
          this.disclaimer,
      };
    }

    // RULE 7
    return {
      recommendedProductId:
        'free',
      recommendedProductName:
        'Free',
      price: 0,
      confidence: 'high',
      reasons: [
        'Simple personal return detected.',
      ],
      matchedInputs:
        dto.incomeSources,
      optionalUpgrade: {
        productId:
          'deluxe',
        productName:
          'Deluxe',
        reason:
          'Upgrade if you have deductions in the future.',
      },
      disclaimer:
        this.disclaimer,
    };
  }
}
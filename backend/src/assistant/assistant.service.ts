import { Injectable } from '@nestjs/common';
import { DISCLAIMER } from '../common/constants/disclaimer.constant';

@Injectable()
export class AssistantService {
  ask(question: string) {
    const q = question.toLowerCase();

    if (
      q.includes('refund') ||
      q.includes('guarantee')
    ) {
      return {
        answer:
          'I cannot guarantee refunds or tax outcomes.',
        confidence: 'high',
        reasons: [
          'Safety rule triggered.',
        ],
        disclaimer: DISCLAIMER,
      };
    }

    // Salary + Donations
    if (
      q.includes('salary') &&
      q.includes('donation')
    ) {
      return {
        answer:
          'Based on the provided product rules, Deluxe appears suitable.',
        recommendedProduct:
          'Deluxe',
        confidence: 'high',
        reasons: [
          'Salary income detected.',
          'Donation deductions detected.',
        ],
        disclaimer: DISCLAIMER,
      };
    }

    // Freelancer / Home Office
    if (
      q.includes('freelance') ||
      q.includes('freelancer') ||
      q.includes('self-employed') ||
      q.includes('home office')
    ) {
      return {
        answer:
          'Based on the provided product rules, Self-Employed appears suitable.',
        recommendedProduct:
          'Self-Employed',
        confidence: 'high',
        reasons: [
          'Freelance indicators detected.',
          'Business expense support may be required.',
        ],
        disclaimer: DISCLAIMER,
      };
    }

    // Investment / Rental
    if (
      q.includes('investment') ||
      q.includes('rental')
    ) {
      return {
        answer:
          'Based on the provided product rules, Premier appears suitable.',
        recommendedProduct:
          'Premier',
        confidence: 'high',
        reasons: [
          'Investment or rental income detected.',
        ],
        disclaimer: DISCLAIMER,
      };
    }

    // Corporate
    if (
      q.includes('incorporated') ||
      q.includes('corporation') ||
      q.includes('corporate') ||
      q.includes('company')
    ) {
      return {
        answer:
          'Based on the provided product rules, Corporate appears suitable.',
        recommendedProduct:
          'Corporate',
        confidence: 'high',
        reasons: [
          'Corporate filing indicators detected.',
        ],
        disclaimer: DISCLAIMER,
      };
    }

    // Expert filing
    if (
      q.includes('file for me') ||
      q.includes('someone else file') ||
      q.includes('expert help')
    ) {
      return {
        answer:
          'You should select the Full Service filing option.',
        confidence: 'high',
        reasons: [
          'User prefers expert-assisted filing.',
        ],
        disclaimer: DISCLAIMER,
      };
    }

    // Product comparison
    if (
      q.includes('difference') &&
      q.includes('premier') &&
      q.includes('self-employed')
    ) {
      return {
        answer:
          'Premier focuses on investment and rental income, while Self-Employed focuses on freelance and business income with expense tracking.',
        confidence: 'high',
        reasons: [
          'Product comparison request detected.',
        ],
        disclaimer: DISCLAIMER,
      };
    }

    return {
      answer:
        'Please provide additional details about your tax situation.',
      confidence: 'low',
      reasons: [],
      disclaimer: DISCLAIMER,
    };
  }
}
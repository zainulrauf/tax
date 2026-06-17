import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  
  import { QuestionnaireDto } from './dto/questionnaire.dto';
  
  @Injectable()
  export class ValidationService {
    validate(
      dto: QuestionnaireDto,
    ): void {
      if (!dto.filingType) {
        throw new BadRequestException(
          'Filing type is required',
        );
      }
  
      if (
        !dto.incomeSources ||
        dto.incomeSources.length === 0
      ) {
        throw new BadRequestException(
          'At least one income source is required',
        );
      }
  
      if (!dto.helpPreference) {
        throw new BadRequestException(
          'Help preference is required',
        );
      }
  
      if (
        dto.filingType === 'corporate' &&
        dto.companyRevenue === undefined
      ) {
        throw new BadRequestException(
          'Company revenue answer is required',
        );
      }
  
      if (
        dto.deductions?.includes(
          'noSpecialDeductions',
        ) &&
        dto.deductions.length > 1
      ) {
        throw new BadRequestException(
          'No Special Deductions conflicts with other deductions'
        );
      }
    }
  }
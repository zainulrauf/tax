import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class QuestionnaireDto {
  @IsString()
  @IsIn([
    'personal',
    'self-employed',
    'corporate',
  ])
  filingType!: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  incomeSources!: string[];

  @IsArray()
  @IsString({ each: true })
  deductions!: string[];

  @IsString()
  @IsIn([
    'self',
    'expert-help',
    'full-service',
  ])
  helpPreference!: string;

  @IsOptional()
  @IsBoolean()
  companyRevenue?: boolean;
}
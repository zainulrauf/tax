import { IsNotEmpty, IsString } from 'class-validator';

export class AssistantQuestionDto {
  @IsString()
  @IsNotEmpty()
  question!: string;
}
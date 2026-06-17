import { Body, Controller, Post } from '@nestjs/common';
import { AssistantService } from './assistant.service';
import { AssistantQuestionDto } from './dto/assistant-question.dto';

@Controller('api/assistant')
export class AssistantController {
  constructor(
    private readonly assistantService: AssistantService,
  ) {}

  @Post()
  ask(
    @Body() dto: AssistantQuestionDto,
  ) {
    return this.assistantService.ask(
      dto.question,
    );
  }
}
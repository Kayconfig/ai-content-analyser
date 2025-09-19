import { Module } from '@nestjs/common';
import { LLMService } from './llm.service';
import { OllamaService } from './ollama.service';

@Module({
  providers: [LLMService, OllamaService],
  exports: [LLMService],
})
export class LLMModule {}

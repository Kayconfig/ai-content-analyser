import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LLMService } from './llm.service';
import { OllamaService } from './ollama.service';

@Module({
  imports: [ConfigModule],
  providers: [LLMService, OllamaService],
  exports: [LLMService],
})
export class LLMModule {}

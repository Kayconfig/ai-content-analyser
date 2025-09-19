import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AnalysisModule } from './analysis/analysis.module';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { LLMModule } from './llm/llm.module';

@Module({
  imports: [ConfigModule.forRoot(), AnalysisModule, LLMModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

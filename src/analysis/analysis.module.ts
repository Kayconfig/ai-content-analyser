import { Module } from '@nestjs/common';
import { LLMModule } from 'src/llm/llm.module';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { PrismaService } from './prisma.service';
import { AnalysisRepository } from './repository/analysis.repository';

@Module({
  imports: [LLMModule],
  controllers: [AnalysisController],
  providers: [AnalysisService, AnalysisRepository, PrismaService],
})
export class AnalysisModule {}

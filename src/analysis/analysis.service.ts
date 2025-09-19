import { Injectable } from '@nestjs/common';
import { LLMService } from 'src/llm/llm.service';
import { LLMResponse } from 'src/llm/types/llm-response';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';

import { Analysis, AnalysisType } from 'generated/prisma';

import { AnalysisNotFoundError } from './errors/analysis-not-found.error';
import { InvalidAnalysisTypeError } from './errors/invalid-analysis-type.error';
import { AnalysisRepository } from './repository/analysis.repository';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly llmService: LLMService,
    private readonly repository: AnalysisRepository,
  ) {}
  async performAnalysis({
    content,
    analysisType,
  }: PerformAnalysisDto): Promise<Analysis> {
    let llmResponse: LLMResponse | null = null;
    switch (analysisType) {
      case AnalysisType.sentiment:
        llmResponse = await this.llmService.performSentimentAnalysis(content);
        break;
      case AnalysisType.summary:
        llmResponse = await this.llmService.performSummary(content);
        break;
      case AnalysisType.themeExtraction:
        llmResponse = await this.llmService.performThemeExtraction(content);
        break;
      default:
        llmResponse = null;
    }
    if (!llmResponse) {
      throw InvalidAnalysisTypeError.create(analysisType);
    }
    const { result, confidence } = llmResponse;
    const createAnalysisInput = {
      result,
      confidence,
      analysisType: analysisType,
    };
    const analysis = await this.repository.create(createAnalysisInput);
    return analysis;
  }

  async findById(id: string): Promise<Analysis> {
    const analysis = await this.repository.findById(id);
    if (!analysis) {
      throw AnalysisNotFoundError.create(id);
    }
    return analysis;
  }
}

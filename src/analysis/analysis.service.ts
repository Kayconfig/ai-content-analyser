import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { LLMService } from 'src/llm/llm.service';
import { LLMResponse } from 'src/llm/types/llm-response';
import { AnalysisDto } from './dtos/analysis.dto';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';
import { AnalysisType } from './enums/analysis-type.enum';
import { InvalidAnalysisTypeError } from './errors/invalid-analysis-type.error';

@Injectable()
export class AnalysisService {
  constructor(private readonly llmService: LLMService) {}
  async performAnalysis({
    content,
    analysisType,
  }: PerformAnalysisDto): Promise<AnalysisDto> {
    let llmResponse: LLMResponse | null = null;
    switch (analysisType) {
      case AnalysisType.sentimentAnalysis:
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
    return {
      id: randomUUID(),
      result,
      confidence,
      analysisType: analysisType,
    };
  }
}

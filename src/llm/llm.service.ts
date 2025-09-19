import { Injectable } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import {
  getPerformSentimentAnalysisPropmt,
  getPerformSummaryPrompt,
  performThemeExtractionPrompt,
} from './prompts';
import { LLMResponse } from './types/llm-response';

@Injectable()
export class LLMService {
  constructor(private readonly chatOllama: OllamaService) {}
  async performSummary(content: string): Promise<LLMResponse> {
    const prompt = getPerformSummaryPrompt(content);

    const aiMsg = await this.chatOllama.invoke(
      [{ role: 'user', content: prompt }],
      false,
    );
    const parsedResult = JSON.parse(aiMsg.content.toString().trim());
    return { result: parsedResult.result, confidence: parsedResult.confidence };
  }

  async performSentimentAnalysis(content: string): Promise<LLMResponse> {
    const prompt = getPerformSentimentAnalysisPropmt(content);

    const aiMsg = await this.chatOllama.invoke(
      [{ role: 'user', content: prompt }],
      false,
    );
    const parsedResult = JSON.parse(aiMsg.content.toString().trim());
    return { result: parsedResult.result, confidence: parsedResult.confidence };
  }

  async performThemeExtraction(content: string): Promise<LLMResponse> {
    const prompt = performThemeExtractionPrompt(content);

    const aiMsg = await this.chatOllama.invoke(
      [{ role: 'user', content: prompt }],
      false,
    );
    const parsedResult = JSON.parse(aiMsg.content.toString().trim());
    return { result: parsedResult.result, confidence: parsedResult.confidence };
  }
}

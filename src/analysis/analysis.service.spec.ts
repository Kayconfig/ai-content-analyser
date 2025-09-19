import { Test } from '@nestjs/testing';
import { LLMService } from '../llm/llm.service';
import { AnalysisService } from './analysis.service';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';
import { AnalysisType } from './enums/analysis-type.enum';

describe('AnalysisService', () => {
  let service: AnalysisService;
  let llmService: LLMService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AnalysisService,
        {
          provide: LLMService,
          useValue: () => ({
            performSentimentAnalysis: jest.fn(),
            performSummary: jest.fn(),
            performThemeExtraction: jest.fn(),
          }),
        },
      ],
    }).compile();
    service = moduleRef.get(AnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('performAnalysis', () => {
    describe('on summary', () => {
      test('should return summary', async () => {
        const dto: PerformAnalysisDto = {
          analysisType: AnalysisType.summary,
          content: 'The world is beautiful and nice',
        };
        const output = await service.performAnalysis(dto);
        expect(output.result).toBeDefined();
      });
    });
  });
});

import { Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { Analysis, AnalysisType } from '../../generated/prisma';
import { LLMService } from '../llm/llm.service';
import { AnalysisService } from './analysis.service';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';
import { AnalysisRepository } from './repository/analysis.repository';

describe('AnalysisService', () => {
  let service: AnalysisService;
  let llmService: LLMService;
  let analysisRepo: AnalysisRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AnalysisService,
        {
          provide: LLMService,
          useValue: {
            performSentimentAnalysis: jest.fn(),
            performSummary: jest.fn(),
            performThemeExtraction: jest.fn(),
          },
        },
        {
          provide: AnalysisRepository,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();
    service = moduleRef.get(AnalysisService);
    llmService = moduleRef.get(LLMService);
    analysisRepo = moduleRef.get(AnalysisRepository);
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
        const mockAnalysis: Analysis = {
          id: randomUUID(),
          analysisType: 'summary',
          confidence: 0.87,
          createdAt: new Date(),
          result: 'result of summary',
        };
        jest
          .spyOn(llmService, 'performSummary')
          .mockImplementationOnce(async (content) => {
            expect(content).toBe(dto.content);
            return mockAnalysis;
          });

        jest
          .spyOn(analysisRepo, 'create')
          .mockImplementationOnce(async (dto) => {
            expect(dto).toBeDefined();
            return mockAnalysis;
          });
        const output = await service.performAnalysis(dto);
        expect(output).toEqual(mockAnalysis);
      });
    });

    describe('on sentiment analysis', () => {
      test('should return sentiment', async () => {
        const dto: PerformAnalysisDto = {
          analysisType: AnalysisType.sentiment,
          content: 'The world is beautiful and nice',
        };
        const mockAnalysis: Analysis = {
          id: randomUUID(),
          analysisType: AnalysisType.sentiment,
          confidence: 0.87,
          createdAt: new Date(),
          result: 'positive',
        };
        jest
          .spyOn(llmService, 'performSentimentAnalysis')
          .mockImplementationOnce(async (content) => {
            expect(content).toBe(dto.content);
            return mockAnalysis;
          });

        jest
          .spyOn(analysisRepo, 'create')
          .mockImplementationOnce(async (dto) => {
            expect(dto).toBeDefined();
            return mockAnalysis;
          });
        const output = await service.performAnalysis(dto);
        expect(output).toEqual(mockAnalysis);
      });
    });

    describe('on theme extraction', () => {
      test('should return theme', async () => {
        const dto: PerformAnalysisDto = {
          analysisType: AnalysisType.themeExtraction,
          content: 'The world is beautiful and nice',
        };
        const mockAnalysis: Analysis = {
          id: randomUUID(),
          analysisType: AnalysisType.themeExtraction,
          confidence: 0.87,
          createdAt: new Date(),
          result: 'poetry',
        };
        jest
          .spyOn(llmService, 'performThemeExtraction')
          .mockImplementationOnce(async (content) => {
            expect(content).toBe(dto.content);
            return mockAnalysis;
          });

        jest
          .spyOn(analysisRepo, 'create')
          .mockImplementationOnce(async (dto) => {
            expect(dto).toBeDefined();
            return mockAnalysis;
          });
        const output = await service.performAnalysis(dto);
        expect(output).toEqual(mockAnalysis);
      });
    });
  });
});

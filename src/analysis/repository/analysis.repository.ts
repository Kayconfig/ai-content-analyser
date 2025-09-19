import { Injectable } from '@nestjs/common';
import { Analysis } from 'generated/prisma';
import { AnalysisDto } from '../dtos/analysis.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AnalysisRepository {
  constructor(private readonly client: PrismaService) {}
  async create(input: Partial<AnalysisDto>): Promise<Analysis> {
    const analysis = await this.client.analysis.create({
      data: {
        analysisType: input.analysisType!,
        confidence: input.confidence!,
        result: input.result!,
      },
    });
    return analysis;
  }

  async findById(id: string): Promise<Analysis | null> {
    return await this.client.analysis.findFirst({ where: { id } });
  }
}

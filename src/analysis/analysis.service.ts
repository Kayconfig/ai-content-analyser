import { Injectable } from '@nestjs/common';
import { AnalysisDto } from './dtos/analysis.dto';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';

@Injectable()
export class AnalysisService {
  async performAnalysis(data: PerformAnalysisDto): Promise<AnalysisDto> {
    throw new Error('Unimplemented');
  }
}

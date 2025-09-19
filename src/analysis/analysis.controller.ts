import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiHttpExceptions } from 'src/common/exceptions/api-http-exceptions';
import { AnalysisService } from './analysis.service';
import { PerformAnalysisBadRequest } from './dtos/perform-analysis-bad-request.dto';
import { PerformAnalysisResponseDto } from './dtos/perform-analysis-response.dto';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';

@Controller('analysis')
export class AnalysisController {
  private readonly logger: Logger;
  constructor(private readonly service: AnalysisService) {
    this.logger = new Logger(AnalysisController.name);
  }
  @Post()
  @ApiOkResponse({ type: PerformAnalysisResponseDto })
  @ApiBadRequestResponse({ type: PerformAnalysisBadRequest })
  async performAnalysis(
    @Body() dto: PerformAnalysisDto,
  ): Promise<PerformAnalysisResponseDto> {
    try {
      const analysisData = await this.service.performAnalysis(dto);
      return PerformAnalysisResponseDto.create(analysisData);
    } catch (e) {
      this.logger.debug(e);
      throw ApiHttpExceptions.createInternalServerException(e);
    }
  }
}

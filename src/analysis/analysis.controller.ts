import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ApiHttpExceptions } from 'src/common/exceptions/api-http-exceptions';
import { AnalysisService } from './analysis.service';
import { FindAnalysisByIdNotFound } from './dtos/find-analysis-by-id-not-found-response.dto';
import { FindAnalysisByIdResponseDto } from './dtos/find-analysis-by-id-response.dto';
import { PerformAnalysisBadRequest } from './dtos/perform-analysis-bad-request.dto';
import { PerformAnalysisResponseDto } from './dtos/perform-analysis-response.dto';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';
import { AnalysisNotFoundError } from './errors/analysis-not-found.error';

@Controller('analysis')
export class AnalysisController {
  private readonly logger: Logger;
  constructor(private readonly service: AnalysisService) {
    this.logger = new Logger(AnalysisController.name);
  }
  @Post()
  @ApiCreatedResponse({ type: PerformAnalysisResponseDto })
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

  @Get(':id')
  @ApiOkResponse({ type: FindAnalysisByIdResponseDto })
  @ApiNotFoundResponse({ type: FindAnalysisByIdNotFound })
  async findById(
    @Param('id') id: string,
  ): Promise<FindAnalysisByIdResponseDto> {
    try {
      const analysis = await this.service.findById(id);
      return FindAnalysisByIdResponseDto.create(analysis);
    } catch (e) {
      if (e instanceof AnalysisNotFoundError) {
        throw ApiHttpExceptions.createNotFoundException(
          [`Analysis with id: ${id} not found`],
          'Not Found',
        );
      }
      this.logger.debug(e);
      throw ApiHttpExceptions.createInternalServerException(e);
    }
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { defaultInternalServerErrorMsg } from 'src/common/constants';
import { AnalysisService } from './analysis.service';
import { PerformAnalysisResponseDto } from './dtos/perform-analysis-response.dto';
import { PerformAnalysisDto } from './dtos/perform-analysis.dto';

@Controller('analysis')
@UseInterceptors(ClassSerializerInterceptor)
export class AnalysisController {
  private readonly logger: Logger;
  constructor(private readonly service: AnalysisService) {
    this.logger = new Logger(AnalysisController.name);
  }
  @Post()
  @ApiOkResponse({ type: PerformAnalysisResponseDto })
  async performAnalysis(
    @Body() dto: PerformAnalysisDto,
  ): Promise<PerformAnalysisResponseDto> {
    try {
      const analysisData = await this.service.performAnalysis(dto);
      return PerformAnalysisResponseDto.create(analysisData);
    } catch (e) {
      this.logger.debug(e);
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: defaultInternalServerErrorMsg,
        data: null,
        error: null,
      };
    }
  }
}

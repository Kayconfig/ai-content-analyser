import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from 'generated/prisma';
import { ApiResponse } from 'src/common/interface/api-response.interface';
import { performAnalysisMessage } from '../constants';
import { AnalysisDto } from './analysis.dto';

export class PerformAnalysisResponseDto implements ApiResponse<AnalysisDto> {
  @ApiProperty({
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    example: performAnalysisMessage,
  })
  message: string;

  @ApiProperty({
    type: AnalysisDto,
  })
  data: AnalysisDto | null;

  @ApiProperty({ example: null })
  error: string | null;
  static create(data: Analysis): PerformAnalysisResponseDto {
    const dto = new PerformAnalysisResponseDto();
    dto.statusCode = HttpStatus.OK;
    dto.message = performAnalysisMessage;
    dto.data = AnalysisDto.create(data);
    dto.error = null;
    return dto;
  }
}

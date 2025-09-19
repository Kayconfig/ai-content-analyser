import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Analysis } from 'generated/prisma';
import { performAnalysisMessage } from '../constants';
import { AnalysisDto } from './analysis.dto';

export class FindAnalysisByIdResponseDto {
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
  data: AnalysisDto;

  @ApiProperty({ example: null })
  error: string | null;
  static create(data: Analysis): FindAnalysisByIdResponseDto {
    const dto = new FindAnalysisByIdResponseDto();
    dto.statusCode = HttpStatus.OK;
    dto.message = performAnalysisMessage;
    dto.data = AnalysisDto.create(data);
    dto.error = null;
    return dto;
  }
}

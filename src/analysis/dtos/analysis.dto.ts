import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Analysis, AnalysisType } from 'generated/prisma';

export class AnalysisDto {
  @ApiProperty({
    type: String,
    example: 'aed3bd1d-ed77-4ad1-a61f-5377c30a2008',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'analysis result',
    example: 'The content is positive',
  })
  result: string;

  @ApiProperty({
    type: Number,
    description: 'confidence level',
    example: 0.95,
  })
  confidence: number;

  @ApiProperty({ enum: AnalysisType, description: 'analysis type' })
  @IsEnum(AnalysisType)
  analysisType: AnalysisType;

  static create(analysis: Analysis): AnalysisDto {
    const dto = new AnalysisDto();
    dto.id = analysis.id;
    dto.analysisType = analysis.analysisType;
    dto.confidence = analysis.confidence;
    dto.result = analysis.result;
    return dto;
  }
}

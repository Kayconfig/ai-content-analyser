import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AnalysisType } from 'generated/prisma';

export class PerformAnalysisDto {
  @ApiProperty({ example: 'Text to be analysed' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ enum: AnalysisType })
  @IsEnum(AnalysisType)
  @IsNotEmpty()
  analysisType: AnalysisType;
}

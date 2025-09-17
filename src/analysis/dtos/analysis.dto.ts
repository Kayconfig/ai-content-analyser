import { ApiProperty } from '@nestjs/swagger';

export class AnalysisDto {
  @ApiProperty({
    type: String,
    description: 'sentiment analysis',
  })
  sentiment: string;

  @ApiProperty({
    type: String,
    description: 'sentiment analysis',
  })
  summary: string;
}

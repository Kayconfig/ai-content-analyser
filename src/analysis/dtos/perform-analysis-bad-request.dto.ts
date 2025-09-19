import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class PerformAnalysisBadRequest {
  @ApiProperty({
    example: HttpStatus.BAD_REQUEST,
  })
  statusCode: number;

  @ApiProperty({
    example: ['content should not be empty', 'content must be a string'],
  })
  message: string[];

  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({
    example: 'Bad Request',
  })
  error: string;
}

import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class FindAnalysisByIdNotFound {
  @ApiProperty({
    example: HttpStatus.NOT_FOUND,
  })
  statusCode: number;

  @ApiProperty({
    example: [
      '`Analysis with id: "c951c108-b575-4dc6-8e4d-randomid" not found`',
    ],
  })
  message: string;

  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({ example: 'not found' })
  error: string | null;
}

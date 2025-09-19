import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

export class ApiHttpExceptions {
  static createInternalServerException(
    cause: unknown,
  ): InternalServerErrorException {
    return new InternalServerErrorException({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ['error occurred while processing request'],
      data: null,
      error: 'internal server error',
      cause,
    });
  }
  static createBadRequestException(
    message: string[],
    error: string,
    cause?: unknown,
  ): BadRequestException {
    return new BadRequestException({
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      data: null,
      error,
      cause,
    });
  }
}

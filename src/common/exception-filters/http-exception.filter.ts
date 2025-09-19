import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

type ExpectedExceptionResponse = {
  error: string;
  message: string[];
  statusCode: number;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionResponse =
      exception.getResponse() as ExpectedExceptionResponse;
    const { error, message, statusCode } = exceptionResponse;

    response.status(statusCode).json({
      statusCode,
      message,
      data: null,
      error,
    });
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { stat } from 'fs';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, context: ArgumentsHost) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(exception.getStatus()).send({
      message: exception.message,
      test: 'Lahh',
    });
  }

  createException(message: string, status: number) {
    throw new HttpException(message, status);
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, context: ArgumentsHost) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(process.env);
    response.status(exception.getStatus()).send({
      status: exception.getStatus(),
      message: exception.message,
      stackTrace: exception.stack,
    });
  }

  createException(message: string, status: number) {
    throw new HttpException(message, status);
  }
}

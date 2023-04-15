import { HttpException } from '@nestjs/common';

export class ExceptionFilter extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}

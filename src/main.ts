import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
async function bootstrap() {
  dotenv.config();

  const PORT: string = process.env.PORT_SERVER || '3000';

  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
}
bootstrap();

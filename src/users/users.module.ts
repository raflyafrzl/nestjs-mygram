import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CustomExceptionFilter } from 'src/exception/CustomException';
//test
@Module({
  controllers: [UsersController],
  providers: [UsersService, CustomExceptionFilter],
})
export class UsersModule {}

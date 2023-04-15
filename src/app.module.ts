import { Module } from '@nestjs/common';

import { PhotosController } from './photos/photos.controller';
import { PhotosService } from './photos/photos.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { CustomExceptionFilter } from './exception/CustomException';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule],
  controllers: [PhotosController, UsersController],
  providers: [PhotosService, CustomExceptionFilter, UsersService],
})
export class AppModule {}

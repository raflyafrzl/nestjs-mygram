import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { CustomExceptionFilter } from 'src/exception/CustomException';
import { ExceptionFilter } from 'src/exception/Exception';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(
    private exceptionCustom: CustomExceptionFilter,
    private userService: UsersService,
  ) {}

  @Get('/')
  async getAllData(): Promise<UserEntity[]> {
    const result: UserEntity[] = await this.userService.getAllData();

    return result;
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async insertData(@Body() payload: UserDTO): Promise<UserEntity> {
    const result: UserEntity = await this.userService.saveData(payload);

    return result;
  }
}

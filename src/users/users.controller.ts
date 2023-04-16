import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { CustomExceptionFilter } from 'src/exception/CustomException';
import { UsersService } from './users.service';
import { GuardValidation } from 'src/guards/guards.guard';
import { UserEntity } from './types/users.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  @UseGuards(GuardValidation)
  async getAllData() {
    const result: UserEntity[] = await this.userService.getAllData();

    return result;
  }

  @Get(':id')
  @UseGuards(GuardValidation)
  @UseFilters(CustomExceptionFilter)
  async findOneUser(@Param('id') id: string): Promise<UserEntity> {
    const result = await this.userService.findOneUser(id);

    if (!result) {
      throw new BadRequestException('User not found, please input a valid ID');
    }

    return result;
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  async insertData(@Body() payload: UserDTO): Promise<UserEntity> {
    const result: UserEntity = await this.userService.saveData(payload);

    return result;
  }
}

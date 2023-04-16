import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.interface';
import { CustomExceptionFilter } from 'src/exception/CustomException';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseFilters(CustomExceptionFilter)
  async getAuth(@Body() data: Auth) {
    return this.authService.signIn(data.username, data.username);
  }
}

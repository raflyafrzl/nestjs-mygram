import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { Token } from './auth.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async signIn(username: string, password: string): Promise<Token> | undefined {
    const result = await this.userService.findOneUser(username);
    const decodedPassword = await bcrypt.compare(password, result.password);
    if (decodedPassword) {
      throw new UnauthorizedException(
        'Username atau password yang dimasukan salah',
      );
    }
    const payload = { username: result.username, id: result.id };

    return {
      token: `Bearer ${await this.jwtService.signAsync(payload)}`,
    };
  }
}

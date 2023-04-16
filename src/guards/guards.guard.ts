import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class GuardValidation implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const extractedToken = this.extractToken(request);

    if (!extractedToken) {
      throw new UnauthorizedException(
        'Invalid token or token must be provided',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync(extractedToken, {
        secret: process.env.JWT_KEY,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Token Invalid, please try again');
    }

    return true;
  }

  extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

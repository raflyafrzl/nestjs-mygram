import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from './users.entity';
import { prisma } from 'src/prisma/prisma.hooks';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
// import { UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = prisma;
  }

  getAllData(): Promise<UserEntity[]> {
    return this.prisma.users.findMany({
      select: {
        password: false,
        email: true,
        username: true,
        fullname: true,
        age: true,
        profile_image_url: true,
      },
    });
  }

  async saveData(payload: UserDTO): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    return this.prisma.users.create({
      data: {
        fullname: payload.full_name,
        email: payload.email,
        age: payload.age,
        username: payload.username,
        password: hashedPassword,
        profile_image_url: payload.profile_img_url,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}

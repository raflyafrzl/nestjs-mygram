import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserEntity } from './types/users.entity';
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

  findOneUser(id: string): Promise<UserEntity> | undefined {
    return this.prisma.users.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        password: false,
        username: true,
        fullname: true,
        email: true,
      },
    });
  }

  async getAllData(): Promise<UserEntity[]> {
    return this.prisma.users.findMany({
      select: {
        username: true,
        password: false,
        profile_image_url: true,
        fullname: true,
        email: true,
        id: true,
        age: true,
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

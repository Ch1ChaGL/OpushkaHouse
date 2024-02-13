import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    const data = await this.prisma.user.findMany();
    return {
      users: data,
    };
  }
}
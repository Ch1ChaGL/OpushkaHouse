import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            roleId: true,
            name: true, // Выбираем только поле "name" из роли
          },
        },
      },
    });

    return users;
  }
  async deleteUser(userId: number) {
    return await this.prisma.user.delete({
      where: { userId: userId },
    });
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { hash, verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    const tokens = await this.issueTokens(user.userId);

    return {
      user: this.returnUserField(user),
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync(refreshToken);
    if (!result) throw new UnauthorizedException('Вход заблокирован');

    const user = await this.prisma.user.findUnique({
      where: {
        userId: result.userId,
      },
    });

    const tokens = await this.issueTokens(user.userId);

    return {
      user: this.returnUserField(user),
      ...tokens,
    };
  }

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });

    if (oldUser)
      throw new BadRequestException(
        'Пользователь под таким номером уже существует',
      );

    const user = await this.prisma.user.create({
      data: {
        phone: dto.phone,
        firstName: dto.firstName,
        lastName: dto.lastName,
        password: await hash(dto.password),
      },
    });

    const tokens = await this.issueTokens(user.userId);

    return {
      user: this.returnUserField(user),
      ...tokens,
    };
  }

  private async issueTokens(userId: Number) {
    const data = { userId };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private returnUserField(user: User): Pick<User, 'userId' | 'phone'> {
    return {
      userId: user.userId,
      phone: user.phone,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: dto.phone,
      },
    });

    if (!user)
      throw new NotFoundException('Пользователь под таким номером не найден');

    const isValid = await verify(user.password, dto.password);
    if (!isValid) throw new UnauthorizedException('Неправильный пароль');

    return user;
  }
}

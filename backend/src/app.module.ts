import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { StatusModule } from './status/status.module';
import { HouseModule } from './house/house.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), RoleModule, StatusModule, HouseModule, UserModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

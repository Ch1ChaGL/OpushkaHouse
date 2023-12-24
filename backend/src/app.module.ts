import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), RoleModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

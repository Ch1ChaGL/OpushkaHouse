import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorators';

import { RoleType } from 'src/role/role.enum';
import { Roles } from 'src/decorators/roles.decorators';
import { RolesGuard } from 'src/decorators/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Roles(RoleType.Admin)
  @UseGuards(RolesGuard)
  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.userService.deleteUser(+userId);
  }
  //TODO Создать получение активности пользователя и пользователей и их входов
}

import {
  Controller,
  Get,
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

  //TODO Создать получение активности пользователя и пользователей и их входов  
}

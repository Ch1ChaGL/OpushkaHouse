import { Controller, Get, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/decorators/roles.decorators';
import { RoleType } from 'src/role/role.enum';
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
}

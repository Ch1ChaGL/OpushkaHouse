import { Body, Controller, Get, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { HouseService } from './house.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/decorators/roles.decorators';
import { RoleType } from 'src/role/role.enum';
import { RolesGuard } from 'src/decorators/roles.guard';
import { HouseCreateDto } from './dto/house.create.dto';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Auth()
  @Roles(RoleType.Admin)
  @UseGuards(RolesGuard)
  @Get('all')
  async getAdminHouseInformation() {
    return this.houseService.getAdminHouseInformation();
  }

  @Auth()
  @Roles(RoleType.Admin, RoleType.Housemaid)
  @UseGuards(RolesGuard)
  @Get('housemaidStatus')
  async getHousemaidInformation() {
    return this.houseService.getHousemaidInformation();
  }

  @Auth()
  @Roles(RoleType.Admin, RoleType.Houseman)
  @UseGuards(RolesGuard)
  @Get('housemanStatus')
  async getHousemanInformation() {
    return this.houseService.getHousemanInformation();
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Roles(RoleType.Admin)
  @UseGuards(RolesGuard)
  @Post('house')
  async createHouse(@Body() dto: HouseCreateDto){
    
  }
}

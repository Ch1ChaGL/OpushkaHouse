import { ExcelService } from './../excel/excel.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HouseService } from './house.service';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/decorators/roles.decorators';
import { RoleType } from 'src/role/role.enum';
import { RolesGuard } from 'src/decorators/roles.guard';
import { HouseCreateDto } from './dto/house.create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { HouseStatusDto } from './dto/houseStatus.update.dto';

@Controller('house')
export class HouseController {
  constructor(
    private readonly houseService: HouseService,
    private excelService: ExcelService,
  ) {}

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

  //TODO вот это надо сделать в целом
  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Roles(RoleType.Admin)
  @UseGuards(RolesGuard)
  @Post('house')
  async createHouse(@Body() dto: HouseCreateDto) {}

  @Post('updateFromExcel')
  @UseInterceptors(FileInterceptor('file'))
  async updateHouseFromExcel(@UploadedFile() file) {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      throw new BadRequestException(
        'Неверный формат файла. Пожалуйста, загрузите файл Excel (.xlsx).',
      );
    }

    const houses = await this.excelService.getHousesFromExcel(file);
    await this.houseService.updateHouseFromExcel(houses);
  }

  //!Разделение на разные эндпоинты для огрничения возможности ролей или проверка роли через декоратор
  @Put('updateStatus')
  async updateStatus(dto: HouseStatusDto) {
    
  }
}

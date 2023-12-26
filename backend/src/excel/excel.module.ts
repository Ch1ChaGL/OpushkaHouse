import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { HouseModule } from 'src/house/house.module';

@Module({
  imports: [
    HouseModule
  ],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}

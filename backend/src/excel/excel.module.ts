import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { HouseModule } from 'src/house/house.module';

@Module({
  controllers: [],
  providers: [ExcelService],
  exports: [ExcelService]
})
export class ExcelModule {}

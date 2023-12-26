import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file) {
    if (!file.originalname.match(/\.(xlsx)$/)) {
      throw new BadRequestException(
        'Неверный формат файла. Пожалуйста, загрузите файл Excel (.xlsx).',
      );
    }

    return this.excelService.uploadExcel(file);
  }
}

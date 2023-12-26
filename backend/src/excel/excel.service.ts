import { BadRequestException, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
const moment = require('moment');
import { HousemaidFileColumn } from 'src/consts/HousemaidFileColumn.consts';

@Injectable()
export class ExcelService {
  constructor() {}

  dateFormat = 'DD.MM.YY HH:mm';

  async getHousesFromExcel(file) {
    try {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(file.buffer);

      const firstSheet = workbook.getWorksheet(1);

      const rowCount = firstSheet.rowCount;

      const columnHandlers = {
        [HousemaidFileColumn.HouseID]: cell => +cell.text,
        // [HousemaidFileColumn.Status]: cell => cell.text,
        [HousemaidFileColumn.CountPeople]: cell => +cell.text,
        [HousemaidFileColumn.CountChildren]: cell => +cell.text,
        [HousemaidFileColumn.Leave]: cell =>
          cell.text !== '' ? moment(cell.text, this.dateFormat).toDate() : null,
        [HousemaidFileColumn.MoveIn]: cell =>
          cell.text !== '' ? moment(cell.text, this.dateFormat).toDate() : null,
      };

      const houses = [];
      const firstRow = firstSheet.getRow(1);
      for (let i = 2; i <= rowCount; i++) {
        const row = firstSheet.getRow(i);
        const house = {};
        row.eachCell((cell, colNumber) => {
          const columnName = firstRow.getCell(colNumber);
          const columnHeader = columnHandlers[columnName.text];
          if (columnHeader) {
            house[columnName.text] = columnHeader(cell);
          }
        });

        houses.push(house);
      }

      return houses;
    } catch (error) {
      console.error('Ошибка обработки файла Excel:', error.message);
      throw new BadRequestException('Ошибка обработки файла Excel.');
    }
  }
}

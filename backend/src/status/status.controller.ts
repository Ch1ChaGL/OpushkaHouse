import { Controller, Get, Param } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('placeId/:placeId')
  async getStatusesByPlaceId(@Param('placeId') placeId: string){
    return this.statusService.getStatusesByPlaceId(+placeId);
  }
}

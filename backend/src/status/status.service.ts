import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StatusService {
  constructor(private prisma: PrismaService) {}

  async getStatusesByPlaceId(placeId: number) {
    return await this.prisma.status.findMany({
      where: {
        placeId: placeId,
      },
    });
  }
}

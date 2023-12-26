import { HousemaidFileColumn } from 'src/consts/HousemaidFileColumn.consts';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class HouseService {
  constructor(private prisma: PrismaService) {}

  async updateHouseFromExcel(houses) {
    console.log(houses);
    for (const house of houses) {
      const peopleCount =
        house[HousemaidFileColumn.CountChildren] +
        house[HousemaidFileColumn.CountPeople];

      this.updateCountPeople(house[HousemaidFileColumn.HouseID], peopleCount);

      const LeaveTime = house[HousemaidFileColumn.Leave];
      const MoveInTime = house[HousemaidFileColumn.MoveIn];

      //Заезд
      if (!LeaveTime && MoveInTime) {
      }
      //Выезд
      if (LeaveTime && !MoveInTime) {
      }
      
      // const LeaveMoveIn = LeaveTime && MoveInTime;
      // if (LeaveMoveIn && )
    }
  }

  async updateCountPeople(houseId: number, peopleCount: number) {
    return await this.prisma.house.update({
      where: { houseId },
      data: { peopleCount },
    });
  }

  async getAdminHouseInformation() {
    const houseData = await this.prisma.house.findMany({
      //@ts-ignore
      include: {
        houseStatus: {
          include: {
            status: true,
          },
        },
      },
    });

    return {
      houseData: this.transformedData(houseData),
    };
  }

  async getHousemaidInformation() {
    const houseData = await this.prisma.house.findMany({
      //@ts-ignore
      include: {
        houseStatus: {
          include: {
            status: true,
          },
          where: {
            status: {
              roleId: 2,
            },
          },
        },
      },
    });

    return {
      houseData: this.transformedData(houseData),
    };
  }

  async getHousemanInformation() {
    const houseData = await this.prisma.house.findMany({
      //@ts-ignore
      include: {
        houseStatus: {
          include: {
            status: true,
          },
          where: {
            status: {
              roleId: 3,
            },
          },
        },
      },
    });

    return {
      houseData: this.transformedData(houseData),
    };
  }

  private transformedData = houseData =>
    houseData.map(house => ({
      houseId: house.houseId,
      name: house.name,
      peopleCount: house.peopleCount,
      houseStatus: house.houseStatus.map(houseStatus => ({
        statusId: houseStatus.status.statusId,
        time: houseStatus.time,
        name: houseStatus.status.name,
        roleId: houseStatus.status.roleId,
      })),
    }));
}

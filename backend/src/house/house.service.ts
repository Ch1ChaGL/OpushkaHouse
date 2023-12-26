import { HousemaidFileColumn } from 'src/consts/HousemaidFileColumn.consts';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { HouseStatus } from 'src/consts/HouseStatus.const';
import { Place } from 'src/consts/Place.const';

@Injectable()
export class HouseService {
  constructor(private prisma: PrismaService) {}

  async updateHouseFromExcel(houses) {
    console.log(houses);

    for (const house of houses) {
      const houseId = house[HousemaidFileColumn.HouseID];

      const peopleCount =
        house[HousemaidFileColumn.CountChildren] +
        house[HousemaidFileColumn.CountPeople];

      this.updateCountPeople(house[HousemaidFileColumn.HouseID], peopleCount);

      const LeaveTime = house[HousemaidFileColumn.Leave];
      const MoveInTime = house[HousemaidFileColumn.MoveIn];

      if (!LeaveTime && !MoveInTime) continue;

      //Проживает
      if (
        house[HousemaidFileColumn.Busy] &&
        house[HousemaidFileColumn.Busy][0] !==
          house[HousemaidFileColumn.Busy][1] &&
        house[HousemaidFileColumn.Busy][1] !== 1
      ) {
        const amountDay = house[HousemaidFileColumn.Busy][1];
        let time = null;
        let houseStatus = null;
        if (amountDay >= 3) {
          houseStatus = HouseStatus.NeedsCleaningAndLinenReplacement;
        }
        if (amountDay < 3) {
          houseStatus = HouseStatus.RequiresWetCleaning;
        }

        await this.updateHouseStatus(houseId, houseStatus, Place.House, time);
        continue;
      }

      const HouseStatusTypeId = HouseStatus.NeedsHouseCleaning;
      const SiteStatusTypeId = HouseStatus.NeedsSiteCleaning;
      let time = null;

      //Заезд
      if (!LeaveTime && MoveInTime) time = house[HousemaidFileColumn.MoveIn];

      //Выезд
      if (LeaveTime && !MoveInTime) time = house[HousemaidFileColumn.Leave];

      //Выезд-Заезд
      if (LeaveTime && MoveInTime) time = house[HousemaidFileColumn.MoveIn];

      await this.updateHouseStatus(
        houseId,
        HouseStatusTypeId,
        Place.House,
        time,
      );
      await this.updateHouseStatus(houseId, SiteStatusTypeId, Place.Site, time);
    }
  }

  async updateCountPeople(houseId: number, peopleCount: number) {
    return await this.prisma.house.update({
      where: { houseId },
      data: { peopleCount },
    });
  }

  async updateHouseStatus(houseId, statusId, placeId, time = null) {
    await this.prisma.houseStatus.updateMany({
      //@ts-ignore
      where: { houseId, placeId },
      data: { statusId, time },
    });
  }

  async resetHouseStatus(houseId) {
    await this.updateHouseStatus(houseId, HouseStatus.CleanHouse, Place.House);
    await this.updateHouseStatus(houseId, HouseStatus.CleanSite, Place.Site);
    await this.updateHouseStatus(
      houseId,
      HouseStatus.NoBathhouseLightingRequired,
      Place.Bathhouse,
    );
    await this.updateHouseStatus(
      houseId,
      HouseStatus.NoHotTubKindlingRequired,
      Place.HotTub,
    );
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

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

      //Пустой чистый дом (как я понимаю)
      if (!LeaveTime && !MoveInTime) continue;

      //Проживает
      if (
        house[HousemaidFileColumn.Busy] &&
        house[HousemaidFileColumn.Busy][0] !==
          house[HousemaidFileColumn.Busy][1] &&
        house[HousemaidFileColumn.Busy][1] !== 1
      ) {
        console.log('house', house);
        continue;
        const amountDay = house[HousemaidFileColumn.Busy][1];
        let timeStart = null;
        let timeEnd = null;
        let houseStatus = null;
        if (amountDay >= 3) {
          houseStatus = HouseStatus.NeedsCleaningAndLinenReplacement;
        }
        if (amountDay < 3) {
          houseStatus = HouseStatus.RequiresWetCleaning;
          //continue;
        }

        await this.updateHouseStatus(
          houseId,
          houseStatus,
          Place.House,
          timeStart,
          timeEnd,
        );
        continue;
      }

      const HouseStatusTypeId = HouseStatus.NeedsHouseCleaning;
      const SiteStatusTypeId = HouseStatus.NeedsSiteCleaning;
      let timeStart = null;
      let timeEnd = null;

      //Заезд
      if (!LeaveTime && MoveInTime) {
        timeStart = null;
        timeEnd = house[HousemaidFileColumn.MoveIn];
      }

      //Выезд
      if (LeaveTime && !MoveInTime) {
        timeStart = house[HousemaidFileColumn.Leave];
        timeEnd = null;
      }

      //Выезд-Заезд
      if (LeaveTime && MoveInTime) {
        timeStart = house[HousemaidFileColumn.Leave];
        timeEnd = house[HousemaidFileColumn.MoveIn];
      }

      await this.updateHouseStatus(
        houseId,
        HouseStatusTypeId,
        Place.House,
        timeStart,
        timeEnd,
      );
      await this.updateHouseStatus(
        houseId,
        SiteStatusTypeId,
        Place.Site,
        timeStart,
        timeEnd,
      );
    }
  }

  async updateCountPeople(houseId: number, peopleCount: number) {
    return await this.prisma.house.update({
      where: { houseId },
      data: { peopleCount },
    });
  }

  async updateHouseStatus(
    houseId,
    statusId,
    placeId,
    timeStart = null,
    timeEnd = null,
  ) {
    await this.prisma.houseStatus.updateMany({
      //@ts-ignore
      where: { houseId, placeId },
      data: { statusId, timeStart, timeEnd },
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
            place: true,
          },
        },
        houseType: true,
      },
      orderBy: {
        houseId: 'asc', // Сортировка по возрастанию id
      },
    });

    return this.transformedData(houseData);
  }

  async getHousemaidInformation() {
    const houseData = await this.prisma.house.findMany({
      //@ts-ignore
      include: {
        houseStatus: {
          include: {
            status: true,
            place: true,
          },
          where: {
            status: {
              roleId: 2,
            },
          },
        },
        houseType: true,
      },
      orderBy: {
        houseId: 'asc', // Сортировка по возрастанию id
      },
    });

    return this.transformedData(houseData);
  }

  async getHouseInformationById(houseId: number) {
    const houseInformation = (await this.getAdminHouseInformation()).filter(
      house => house.houseId === houseId,
    )[0];

    const housemaidInformation = (await this.getHousemaidInformation()).filter(
      status => status.houseId === houseId,
    );
    const housemanInformation = (await this.getHousemanInformation()).filter(
      status => status.houseId === houseId,
    );

    return {
      houseType: houseInformation.houseType,
      houseId: houseInformation.houseId,
      peopleCount: houseInformation.peopleCount,
      status: [
        ...this.getFormatedHouseStatus(housemaidInformation),
        ...this.getFormatedHouseStatus(housemanInformation),
      ],
    };
  }

  private getFormatedHouseStatus(houseStatus: any) {
    const formatedHouseStatus = [];
    for (const status of houseStatus) {
      formatedHouseStatus.push(...status.houseStatus);
    }

    return formatedHouseStatus;
  }

  async getHousemanInformation() {
    const houseData = await this.prisma.house.findMany({
      //@ts-ignore
      include: {
        houseStatus: {
          include: {
            status: true,
            place: true,
          },
          where: {
            status: {
              roleId: 3,
            },
          },
          orderBy: {
            statusId: 'asc',
          },
        },
        houseType: true,
      },
    });

    return this.transformedData(houseData);
  }

  private transformedData = houseData =>
    houseData.map(house => ({
      houseId: house.houseId,
      name: house.name,
      houseType: house.houseType,
      peopleCount: house.peopleCount,
      houseStatus: house.houseStatus.map(houseStatus => ({
        statusId: houseStatus.status.statusId,
        timeStart: houseStatus.timeStart,
        timeEnd: houseStatus.timeEnd,
        name: houseStatus.status.name,
        place: houseStatus.place,
        roleId: houseStatus.status.roleId,
      })),
    }));
}

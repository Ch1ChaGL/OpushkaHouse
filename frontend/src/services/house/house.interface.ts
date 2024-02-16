export interface IHousemaidHouseInformation {
  houseId: number;
  peopleCount: number;
  houseType: IHouseType;
  houseStatus: IHousemaidHouseStatus[];
}

export interface IHouseType {
  houseTypeId: number;
  name: string;
}

export interface IHousemaidHouseStatus {
  statusId: number;
  placeId: number;
  timeStart: string | null;
  timeEnd: string | null;
  name: string | null;
  roleId: number | null;
}

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
  place: IPlace;
  timeStart: string | null;
  timeEnd: string | null;
  name: string | null;
  roleId: number | null;
}

export interface IAdminHouseStatus {
  houseId: number;
  houseType: IHouseType;
  peopleCount: number;
  houseStatus: IHouseStatus[];
}

export interface IPlace {
  placeId: number;
  name: string;
}

export interface IHouseStatus {
  statusId: number;
  place: IPlace;
  timeStart: string | null;
  timeEnd: string | null;
  name: string;
  roleId: number;
}

export interface IHouseInformation {
  houseType: IHouseType;
  houseId: number;
  peopleCount: number;
  status: IHouseStatus[];
}

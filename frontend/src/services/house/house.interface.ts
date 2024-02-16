export interface IHousemaidHouseInformation {
  houseId: number;
  peopleCount: number;
  houseStatus: IHousemaidHouseStatus[];
}

export interface IHousemaidHouseStatus {
  statusId: number;
  timeStart: string | null;
  timeEnd: string | null;
  name: string | null;
  roleId: number | null;
}

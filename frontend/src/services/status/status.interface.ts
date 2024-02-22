export interface IStatus {
  statusId: string;
  name: string;
  roleId: string;
  placeId: string;
}

export interface IStatusUpdate {
  updateTime: boolean;
  houseId: number;
  placeId: number;
  statusId: number;
  timeStart?: string | null;
  timeEnd?: string | null;
}

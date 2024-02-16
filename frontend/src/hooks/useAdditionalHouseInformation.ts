import { IHousemaidHouseInformation } from '../services/house/house.interface';

export const useAdditionalHouseInformation = (
  data: IHousemaidHouseInformation,
): string => {
  return `${data.houseType.name}, ${data.peopleCount} гостей`;
};

export const useTimeInterval = (
  timeStart: string | null,
  timeEnd: string | null,
) => {
  return `c ${useFormatDate(timeStart)} до ${useFormatDate(timeEnd)}`;
};

export const useFormatDate = (time: string | null) => {
  if (!time) return '-';
  const date = new Date(time);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(2);
  return `${day}.${month}.${year}`;
};

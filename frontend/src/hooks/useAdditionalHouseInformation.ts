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

  // Получаем время в часах, минутах и секундах по московскому времени
  const mskTime = new Date(
    date.toLocaleString('en-US', { timeZone: 'Europe/Moscow' }),
  );

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(2);
  const hours = mskTime.getHours().toString().padStart(2, '0');
  const minutes = mskTime.getMinutes().toString().padStart(2, '0');
  const seconds = mskTime.getSeconds().toString().padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};

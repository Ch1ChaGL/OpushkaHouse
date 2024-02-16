/**
 * @CleanHouse - Чисто в доме
 * @CleanSite - Чисто на участке
 * @NeedsHouseCleaning - Требует уборки в доме
 * @NeedsSiteCleaning - Требует уборки на участке
 * @NeedsCleaningAndLinenReplacement - Требует уборки с заменой белья
 * @RequiresWetCleaning - Требует влажной уборки
 * @BathhouseLightingRequired - Требуется растопка бани
 * @NoBathhouseLightingRequired - Растопка бани не требуется
 * @HotTubKindlingRequired - Требуется растопка купели
 * @NoHotTubKindlingRequired - Растопка купели не требуется
 * @BathhouseHeated - Баня растоплена
 * @HotTubHeated - Купель растоплена
 * @NeedCheckCleanHouse - Требуется проверка чистоты дома
 * @NeedCheckCleanSite - Требуется проверка чистоты на участке
 * @NeedChekBathhous - Требуется проверка растопки бани
 * @NeedChekHotTub - Требуется проверка растопки купели
 */
export enum HouseStatus {
  CleanHouse = 1, //'Чисто в доме'
  CleanSite = 2, //'Чисто на участке'
  NeedsHouseCleaning = 3, //'Требует уборки в доме'
  NeedsSiteCleaning = 4, //'Требует уборки на участке'
  NeedsCleaningAndLinenReplacement = 5, //'Требует уборки с заменой белья'
  RequiresWetCleaning = 6, //'Требует влажной уборки'
  BathhouseLightingRequired = 7, //'Требуется растопка бани'
  NoBathhouseLightingRequired = 8, //'Растопка бани не требуется'
  HotTubKindlingRequired = 9, //'Требуется растопка купели'
  NoHotTubKindlingRequired = 10, //'Растопка купели не требуется'
  BathhouseHeated = 11, //Баня растоплена
  HotTubHeated = 12, //Купель растоплена
  NeedCheckCleanHouse = 13,
  NeedCheckCleanSite = 14,
  NeedChekBathhous = 15,
  NeedChekHotTub = 16,
}

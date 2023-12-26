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
  BathhouseHeated = 11, //Бан растоплена
  HotTubHeated = 12, //Купель растоплена 
}

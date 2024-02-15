export const useWorkShift = (): string => {
  const currentDate = new Date(); // Текущая дата и время
  const tomorrowDate = new Date(); // Дата и время завтрашнего дня
  tomorrowDate.setDate(tomorrowDate.getDate() + 1); // Устанавливаем завтрашнюю дату

  // Форматирование даты в строку вида "ДД.ММ.ГГГГ"
  const formatDateString = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}.${month}.${year}`;
  };

  // Форматирование строки для вывода диапазона дат
  const formatRangeString = (startDate: Date, endDate: Date) => {
    const start = formatDateString(startDate);
    const end = formatDateString(endDate);
    return `Смена: ${start} - ${end}`;
  };

  return formatRangeString(currentDate, tomorrowDate);
};

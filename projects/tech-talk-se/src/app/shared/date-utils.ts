export function formatDateForDay(date: Date): string {
  const month = formatDateNumber(date.getMonth() + 1); // getMonth() returns from 0 to 11
  const day = formatDateNumber(date.getDate());
  return `${date.getFullYear()}-${month}-${day}`;
}

export function formatDateForHour(date: Date): string {
  const hours = formatDateNumber(date.getHours());
  const minutes = formatDateNumber(date.getMinutes());
  return `${hours}:${minutes}`;
}

export function getCurrentDate(): Date {
  return new Date();
}

export function formatDateNumber(d: number): string {
  return d <= 9 ? `0${d}` : `${d}`;
}

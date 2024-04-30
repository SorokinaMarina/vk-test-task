// Функция генерирует дату
export function getDate(data: number) : string {
  const newDate = new Date(data * 1000);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const date = newDate.getDate().toString().padStart(2, "0");
  const hours = newDate.getHours().toString().padStart(2, "0");
  const minutes = newDate.getMinutes().toString().padStart(2, "0");
  return `${date}.${month}.${year} ${hours}:${minutes}`;
}

const months: Record<number, string> = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

function addOnDigit(num: number) {
  return num.toString().length < 2 ? `0${num}` : `${num}`;
}

function getTimestamp(time: string | undefined) {
  if (!time) {
    return "00:00";
  }

  const date = new Date(time);
  const currentDate = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (date.getFullYear() < currentDate.getFullYear()) {
    return `${date.getFullYear()}`;
  }

  if (date.getMonth() < currentDate.getMonth()) {
    return months[date.getMonth()];
  }

  if (currentDate.getDay() !== date.getDay()) {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }

  return `${addOnDigit(hours)}:${addOnDigit(minutes)}`;
}

export default getTimestamp;

import { format, isToday, isYesterday } from "date-fns";

export const formatFullTime = (date: Date) => {
  let returnDate = "";

  if (isToday(date)) {
    returnDate = "Today";
  }

  if (isYesterday(date)) {
    returnDate = "Yesterday";
  }

  returnDate = `${returnDate || format(date, "MMM d, yyyy")} at ${format(date, "hh:mm:ss a")}`;

  return returnDate;
};

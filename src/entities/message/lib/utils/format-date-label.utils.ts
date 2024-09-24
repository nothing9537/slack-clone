import { format, isToday, isYesterday } from "date-fns";

export const formatDateLabel = (dateString: string) => {
  const timestamp = Date.parse(dateString.replace("-", "/"));
  const date = new Date(timestamp);

  if (isToday(date)) {
    return "Today";
  }

  if (isYesterday(date)) {
    return "Yesterday";
  }

  return format(date, "EEEE, MMMM d");
};

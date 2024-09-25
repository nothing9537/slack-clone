import { format } from "date-fns";

import { GetMessagesResponseType } from "../../model/types/message-services.types";

type GroupedMessagesType = Record<string, GetMessagesResponseType>;

export const generateGroupedMessages = (items: GetMessagesResponseType) => {
  return items.reduce((groups, message) => {
    const date = new Date(message._creationTime);
    const dateKey = format(date, "yyyy-MM-dd");

    if (!groups[dateKey]) {
      // eslint-disable-next-line no-param-reassign
      groups[dateKey] = [];
    }

    groups[dateKey].unshift(message);

    return groups;
  }, {} as (GroupedMessagesType));
};

import { api } from "@convex/_generated/api";

export type GetMessagesResponseType = typeof api.messages.getMessages._returnType["page"];
export type Message = GetMessagesResponseType[number];

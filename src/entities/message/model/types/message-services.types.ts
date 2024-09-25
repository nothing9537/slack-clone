import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

export type GetMessagesResponseType = (typeof api.messages.getMessages._returnType)["page"];
export type Message = GetMessagesResponseType[number];
export type MutateMessageResponseType = Id<"messages">;
export type MutateReactionResponseType = Id<"reactions">;
export type Reaction = Message["reactions"][number];

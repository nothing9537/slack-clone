import { defineTable } from "convex/server";
import { v } from "convex/values";

export const messageModel = defineTable({
  body: v.string(),
  images: v.optional(v.array(v.id("_storage"))),
  memberId: v.id("members"),
  workspaceId: v.id("workspaces"),
  channelId: v.optional(v.id("channels")),
  parentMessageId: v.optional(v.id("messages")),
  updatedAt: v.number(),
  // TODO Add conversation id
});

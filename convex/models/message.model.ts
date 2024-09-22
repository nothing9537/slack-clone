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
  conversationId: v.optional(v.id("conversations")),
})
  .index("by_workspace_id", ["workspaceId"])
  .index("by_member_id", ["memberId"])
  .index("by_channel_id", ["channelId"])
  .index("by_conversation_id", ["conversationId"])
  .index("by_channel_id_parent_message_id_conversation_id", ["channelId", "parentMessageId", "conversationId"]);

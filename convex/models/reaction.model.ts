import { defineTable } from "convex/server";
import { v } from "convex/values";

export const reactionModel = defineTable({
  workspaceId: v.id("workspaces"),
  messageId: v.id("messages"),
  memberId: v.id("members"),
  value: v.string(), // emoji
})
  .index("by_workspace_id", ["workspaceId"])
  .index("by_message_id", ["messageId"])
  .index("by_member_id", ["memberId"]);

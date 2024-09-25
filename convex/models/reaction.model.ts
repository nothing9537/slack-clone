import { defineTable } from "convex/server";
import { v } from "convex/values";

export const reactionModel = defineTable({
  workspaceId: v.id("workspaces"),
  messageId: v.id("messages"),
  memberId: v.id("members"),
  unified: v.string(), // unified emoji code
  native: v.string(), // emoji native
})
  .index("by_workspace_id", ["workspaceId"])
  .index("by_message_id", ["messageId"])
  .index("by_member_id", ["memberId"]);

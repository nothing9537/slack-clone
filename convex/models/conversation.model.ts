import { defineTable } from "convex/server";
import { v } from "convex/values";

export const conversationModel = defineTable({
  workspaceId: v.id("workspaces"),
  memberOneId: v.id("members"),
  memberTwoId: v.id("members"),
})
  .index("by_workspace_id", ["workspaceId"]);

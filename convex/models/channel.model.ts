import { defineTable } from "convex/server";
import { v } from "convex/values";

export const channelModel = defineTable({
  name: v.string(),
  workspaceId: v.id("workspaces"),
})
  .index("by_workspace_id", ["workspaceId"]);

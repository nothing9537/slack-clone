import { defineTable } from "convex/server";
import { v } from "convex/values";

export const memberModel = defineTable({
  userId: v.id("users"),
  workspaceId: v.id("workspaces"),
  role: v.union(v.literal("admin"), v.literal("member")),
})
  .index("by_user_id", ["userId"])
  .index("by_workspace_id", ["workspaceId"])
  .index("by_workspace_id_user_id", ["workspaceId", "userId"]);

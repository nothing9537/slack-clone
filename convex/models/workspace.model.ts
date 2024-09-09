import { defineTable } from "convex/server";
import { v } from "convex/values";

export const workspaceSchema = defineTable({
  name: v.string(),
  userId: v.id("users"),
  joinCode: v.string(),
});

import { ConvexError } from "convex/values";
import { Id, Doc } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export const getMemberOrThrow = async (ctx: QueryCtx, workspaceId: Id<"workspaces">, userId?: Id<"users">) => {
  let member: Doc<"members"> | null = null;

  if (workspaceId && userId) {
    member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", workspaceId).eq("userId", userId))
      .unique();
  } else {
    member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", workspaceId))
      .unique();
  }

  if (!member) {
    throw new ConvexError({ message: "Unauthorized." });
  }

  return member;
};

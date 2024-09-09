import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, query } from "./_generated/server";

export const getWorkspaces = query({
  args: {},
  handler: async (ctx) => {
    const data = await ctx.db.query("workspaces").collect();

    return data;
  },
});

export const createWorkspace = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const existingWorkspace = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existingWorkspace) {
      throw new ConvexError({ message: `Workspace with name: '${args.name}' already exists.` });
    }

    // TODO implement invitation code later
    const joinCode = "123456";

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    return workspaceId;
  },
});

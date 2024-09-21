import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, QueryCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const getMemberOrThrow = async (ctx: QueryCtx, workspaceId: Id<"workspaces">, userId: Id<"users">) => {
  const member = await ctx.db
    .query("members")
    .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", workspaceId).eq("userId", userId))
    .unique();

  if (!member) {
    throw new ConvexError({ message: "Unauthorized." });
  }

  return member;
};

export const createMessage = mutation({
  args: {
    body: v.string(),
    images: v.optional(v.array(v.id("_storage"))),
    workspaceId: v.id("workspaces"),
    channelId: v.optional(v.id("channels")),
    parentMessageId: v.optional(v.id("messages")),
    // TODO add conversation id
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const member = await getMemberOrThrow(ctx, args.workspaceId, userId);

    // TODO add conversation id

    const messageId = await ctx.db.insert("messages", {
      memberId: member._id,
      body: args.body,
      images: args.images,
      workspaceId: args.workspaceId,
      parentMessageId: args.parentMessageId,
      channelId: args.channelId,
      updatedAt: Date.now(),
    });

    return messageId;
  },
});

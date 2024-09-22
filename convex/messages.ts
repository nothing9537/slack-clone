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
    channelId: v.optional(v.id("channels")), //! either channelId or conversationId must be sent
    conversationId: v.optional(v.id("conversations")), //! either channelId or conversationId must be sent
    parentMessageId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const member = await getMemberOrThrow(ctx, args.workspaceId, userId);

    let { conversationId } = args;

    if (!args?.conversationId && !args?.channelId && args?.parentMessageId) {
      const parentMessage = await ctx.db.get(args.parentMessageId);

      if (!parentMessage) {
        throw new ConvexError({ message: "Parent message not found." });
      }

      conversationId = parentMessage.conversationId;
    }

    const messageId = await ctx.db.insert("messages", {
      memberId: member._id,
      body: args.body,
      images: args.images,
      workspaceId: args.workspaceId,
      parentMessageId: args.parentMessageId,
      channelId: args.channelId,
      conversationId,
      updatedAt: Date.now(),
    });

    return messageId;
  },
});

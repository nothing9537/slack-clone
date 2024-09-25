import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation } from "./_generated/server";
import { getMemberOrThrow } from "./utils/get-member-or-throw.utils";

export const toggleReaction = mutation({
  args: {
    messageId: v.id("messages"),
    unified: v.string(), // unified emoji code
    native: v.string(), // emoji native
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const message = await ctx.db.get(args.messageId);

    if (!message) {
      throw new ConvexError({ message: "Message not found." });
    }

    const member = await getMemberOrThrow(ctx, message.workspaceId, userId);

    const existingMessageReactionFromUser = await ctx.db
      .query("reactions")
      .filter((q) => q.and(
        q.eq(q.field("messageId"), args.messageId),
        q.eq(q.field("memberId"), member._id),
        q.eq(q.field("unified"), args.unified),
        q.eq(q.field("native"), args.native),
      ))
      .first();

    if (existingMessageReactionFromUser) {
      await ctx.db.delete(existingMessageReactionFromUser._id);

      return existingMessageReactionFromUser._id;
    }

    const newReactionId = await ctx.db.insert("reactions", {
      memberId: member._id,
      messageId: message._id,
      unified: args.unified,
      native: args.native,
      workspaceId: message.workspaceId,
    });

    return newReactionId;
  },
});

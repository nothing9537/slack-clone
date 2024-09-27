import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation } from "./_generated/server";
import { getMemberOrThrow } from "./utils/get-member-or-throw.utils";

export const createOrGet = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    memberId: v.id("members"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const currentMember = await getMemberOrThrow(ctx, args.workspaceId, userId);
    const otherMember = await ctx.db.get(args.memberId);

    if (!currentMember || !otherMember) {
      throw new ConvexError({ message: "Member not found." });
    }

    const existingConversation = await ctx.db
      .query("conversations")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .filter((q) => q.or(
        q.and(
          q.eq(q.field("memberOneId"), currentMember._id),
          q.eq(q.field("memberTwoId"), otherMember._id),
        ),
        q.and(
          q.eq(q.field("memberOneId"), otherMember._id),
          q.eq(q.field("memberTwoId"), currentMember._id),
        ),
      ))
      .unique();

    if (existingConversation) {
      return existingConversation;
    }

    const conversationId = await ctx.db.insert("conversations", {
      workspaceId: args.workspaceId,
      memberOneId: currentMember._id,
      memberTwoId: otherMember._id,
    });

    const conversation = await ctx.db.get(conversationId);

    return conversation;
  },
});

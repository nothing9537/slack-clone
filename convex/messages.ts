import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator } from "convex/server";

import { mutation, query } from "./_generated/server";
import { getMemberOrThrow } from "./utils/get-member-or-throw.utils";
import { normalizeMessage } from "./utils/normalize-messages.utils";
import { populateMember } from "./utils/populate-member.utils";
import { populateUser } from "./utils/populate-user.utils";

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
    });

    return messageId;
  },
});

export const getMessages = query({
  args: {
    channelId: v.optional(v.id("channels")),
    conversationId: v.optional(v.id("conversations")),
    parentMessageId: v.optional(v.id("messages")),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    let { conversationId } = args;

    if (!args?.conversationId && !args?.channelId && args?.parentMessageId) {
      const parentMessage = await ctx.db.get(args.parentMessageId);

      if (!parentMessage) {
        throw new ConvexError({ message: "Parent message not found" });
      }

      conversationId = parentMessage.conversationId;
    }

    const results = await ctx.db
      .query("messages")
      .withIndex("by_channel_id_parent_message_id_conversation_id", (q) => q
        .eq("channelId", args.channelId)
        .eq("parentMessageId", args.parentMessageId)
        .eq("conversationId", conversationId))
      .order("desc")
      .paginate(args.paginationOpts);

    const page = await Promise.all(results.page.map(normalizeMessage(ctx)));

    return {
      ...results,
      page: page.filter((m) => m !== null),
    };
  },
});

export const updateMessage = mutation({
  args: {
    messageId: v.id("messages"),
    body: v.string(),
    images: v.optional(v.array(v.id("_storage"))),
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

    if (!member || member._id !== message.memberId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    await ctx.db.patch(args.messageId, {
      body: args.body,
      images: args?.images,
      updatedAt: Date.now(),
    });

    return args.messageId;
  },
});

export const deleteMessage = mutation({
  args: {
    messageId: v.id("messages"),
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

    if (!member || member._id !== message.memberId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    await ctx.db.delete(args.messageId);

    return args.messageId;
  },
});

export const getMessageById = query({
  args: {
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const message = await ctx.db.get(args.messageId);

    if (!message) {
      return null;
    }

    const currentMember = await getMemberOrThrow(ctx, message.workspaceId, userId);

    if (!currentMember) {
      return null;
    }

    const member = await populateMember(ctx, message.memberId);

    if (!member) {
      return null;
    }

    const user = await populateUser(ctx, userId);

    if (!user) {
      return null;
    }

    const normalizedMessage = await normalizeMessage(ctx)(message);

    return normalizedMessage;
  },
});

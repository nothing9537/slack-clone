import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, query } from "./_generated/server";

export const getChannels = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return [];
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId))
      .unique();

    if (!member) {
      return [];
    }

    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    return channels;
  },
});

export const createChannel = mutation({
  args: {
    name: v.string(),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId))
      .unique();

    if (!member || member.role !== "admin") {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const existingChannel = await ctx.db
      .query("channels")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .unique();

    if (existingChannel) {
      throw new ConvexError({ message: `Channel with name: '${args.name}' already exists.` });
    }

    const validName = args.name.replace(/\s+/g, "-").toLowerCase();

    const channelId = await ctx.db.insert("channels", {
      name: validName,
      workspaceId: args.workspaceId,
    });

    return channelId;
  },
});

export const getChannelById = query({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const channel = await ctx.db.get(args.channelId);

    if (!channel) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", channel.workspaceId).eq("userId", userId))
      .unique();

    if (!member) {
      return null;
    }

    return channel;
  },
});

export const updateChannel = mutation({
  args: {
    channelId: v.id("channels"),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const channel = await ctx.db.get(args.channelId);

    if (!channel) {
      throw new ConvexError({ message: "Channel not found." });
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", channel.workspaceId).eq("userId", userId))
      .unique();

    if (!member || member.role !== "admin") {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const existingChannel = await ctx.db
      .query("channels")
      .filter((q) => q.eq(q.field("workspaceId"), channel.workspaceId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existingChannel) {
      throw new ConvexError({ message: `Channel with name: '${args.name}' already exists.` });
    }

    if (channel.name === "general" || args.name === "general") {
      throw new ConvexError({ message: `'general' channel cannot be renamed.` });
    }

    await ctx.db.patch(args.channelId, { name: args.name });

    return channel._id;
  },
});

export const deleteChannel = mutation({
  args: {
    channelId: v.id("channels"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const channel = await ctx.db.get(args.channelId);

    if (!channel) {
      throw new ConvexError({ message: "Channel not found." });
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", channel.workspaceId).eq("userId", userId))
      .unique();

    if (!member || member.role !== "admin") {
      throw new ConvexError({ message: "Unauthorized." });
    }

    if (channel.name === "general") {
      throw new ConvexError({ message: "'general' channel cannot be deleted." });
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_channel_id", (q) => q.eq("channelId", args.channelId))
      .collect();

    // eslint-disable-next-line no-restricted-syntax
    for await (const message of messages) {
      if (message.images) {
        await Promise.all(message.images.map((storeId) => ctx.storage.delete(storeId)));
      }
    }

    await Promise.all(messages.map((entity) => ctx.db.delete(entity._id)));

    await ctx.db.delete(args.channelId);

    return channel;
  },
});

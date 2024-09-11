import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

const generateInvitationCode = () => {
  const code = Array
    .from({ length: 6 }, () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)])
    .join("");

  return code.toUpperCase();
};

export const getWorkspaces = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return [];
    }

    const members = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    const workspaceIds = members.map((m) => m.workspaceId);
    const workspaces: ({ _id: Id<"workspaces">; _creationTime: number; name: string; userId: Id<"users">; joinCode: string; } | null)[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const workspaceId of workspaceIds) {
      const workspace = await ctx.db.get(workspaceId);

      if (workspace) {
        workspaces.push(workspace);
      }
    }

    return workspaces;
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

    const joinCode = generateInvitationCode();

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      userId,
      joinCode,
    });

    await ctx.db.insert("members", {
      userId,
      workspaceId,
      role: "admin",
    });

    await ctx.db.insert("channels", {
      name: "general",
      workspaceId,
    });

    return workspaceId;
  },
});

export const getWorkspaceById = query({
  args: {
    id: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.id).eq("userId", userId))
      .unique();

    if (!member) {
      return null;
    }

    const workspace = await ctx.db.get(args.id);

    return workspace;
  },
});

export const updateWorkspace = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    name: v.string(),
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

    const existingWorkspace = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existingWorkspace) {
      throw new ConvexError({ message: `Workspace with name: '${args.name}' already exists.` });
    }

    await ctx.db.patch(args.workspaceId, { name: args.name });

    return args.workspaceId;
  },
});

export const deleteWorkspace = mutation({
  args: {
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

    const [members, channels] = await Promise.all([
      ctx.db
        .query("members")
        .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
        .collect(),
      ctx.db
        .query("channels")
        .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
        .collect(),
    ]);

    const entitiesToDelete = [...members, ...channels];

    await Promise.all(entitiesToDelete.map((entity) => ctx.db.delete(entity._id)));

    await ctx.db.delete(args.workspaceId);

    return args.workspaceId;
  },
});

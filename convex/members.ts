import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { populateUser } from "./utils/populate-user.utils";

export const getCurrentMember = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", args.workspaceId).eq("userId", userId))
      .unique();

    if (!member) {
      return null;
    }

    return member;
  },
});

export const wetherCurrentWorkspaceMemberAdmin = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    const member = await getCurrentMember(ctx, args);

    if (!member) {
      return false;
    }

    return member.role === "admin";
  },
});

export const getWorkspaceMembers = query({
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

    const members: ({ user: Doc<"users"> } & Doc<"members">)[] = [];

    const data = await ctx.db
      .query("members")
      .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
      .collect();

    // eslint-disable-next-line no-restricted-syntax
    for await (const member of data) {
      const user = await populateUser(ctx, member.userId);

      if (user) {
        members.push({ ...member, user });
      }
    }

    return members;
  },
});

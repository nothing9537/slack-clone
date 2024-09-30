/* eslint-disable no-restricted-syntax */
import { ConvexError, v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";
import { populateUser } from "./utils/populate-user.utils";
import { getMemberOrThrow } from "./utils/get-member-or-throw.utils";

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

export const getMemberById = query({
  args: {
    memberId: v.id("members"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const member = await ctx.db.get(args.memberId);

    if (!member) {
      return null;
    }

    const currentMember = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) => q.eq("workspaceId", member.workspaceId).eq("userId", userId))
      .unique();

    if (!currentMember) {
      return null;
    }

    const user = await populateUser(ctx, member.userId);

    if (!user) {
      return null;
    }

    return {
      ...member,
      user,
    };
  },
});

export const updateMember = mutation({
  args: {
    memberId: v.id("members"),
    role: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const memberToUpdate = await ctx.db.get(args.memberId);

    if (!memberToUpdate) {
      throw new ConvexError({ message: "Member not found." });
    }

    const currentMember = await getMemberOrThrow(ctx, memberToUpdate.workspaceId, userId);

    if (!currentMember || currentMember.role !== "admin") {
      throw new ConvexError({ message: "Unauthorized." });
    }

    await ctx.db.patch(args.memberId, {
      role: args.role,
    });

    return args.memberId;
  },
});

export const removeMember = mutation({
  args: {
    memberId: v.id("members"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    const memberToRemove = await ctx.db.get(args.memberId);

    if (!memberToRemove) {
      throw new ConvexError({ message: "Member not found." });
    }

    const currentMember = await getMemberOrThrow(ctx, memberToRemove.workspaceId, userId);

    if (!currentMember) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    if (memberToRemove.role === "admin") {
      throw new ConvexError({ message: "Admin cannot be removed." });
    }

    const isSelf = currentMember._id === memberToRemove._id;

    if (isSelf && currentMember.role === "admin") {
      throw new ConvexError({ message: "Cannot remove self if self is an admin." });
    }

    if (currentMember.role !== "admin" && !isSelf) {
      throw new ConvexError({ message: "Unauthorized." });
    }

    // const [messages, reactions, conversations] = await Promise.all([
    //   ctx.db.query("messages")
    //     .withIndex("by_member_id", (q) => q.eq("memberId", memberToRemove._id))
    //     .collect(),
    //   ctx.db.query("reactions")
    //     .withIndex("by_member_id", (q) => q.eq("memberId", memberToRemove._id))
    //     .collect(),
    //   ctx.db.query("conversations")
    //     .filter((q) => q.or(
    //       q.eq(q.field("memberOneId"), memberToRemove._id),
    //       q.eq(q.field("memberTwoId"), memberToRemove._id),
    //     ))
    //     .collect(),
    // ]);

    // for await (const message of messages) {
    //   await ctx.db.delete(message._id);
    // }

    // for await (const reaction of reactions) {
    //   await ctx.db.delete(reaction._id);
    // }

    // for await (const conversation of conversations) {
    //   await ctx.db.delete(conversation._id);
    // }

    await ctx.db.delete(args.memberId);

    return args.memberId;
  },
});

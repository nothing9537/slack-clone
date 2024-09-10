import { Id } from "@convex/_generated/dataModel";

export type Member = {
  _id: Id<"members">;
  _creationTime: number;
  workspaceId: Id<"workspaces">;
  userId: Id<"users">;
  role: "admin" | "member";
} | null | undefined;

export type Members = ({
  _id: Id<"members">;
  _creationTime: number;
  workspaceId: Id<"workspaces">;
  userId: Id<"users">;
  role: "admin" | "member";
} | null)[] | undefined;

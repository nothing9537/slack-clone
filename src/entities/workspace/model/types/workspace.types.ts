import { Id } from "@convex/_generated/dataModel";

export type Workspace = {
  _id: Id<"workspaces">;
  _creationTime: number;
  name: string;
  userId: Id<"users">;
  joinCode: string;
} | null | undefined;

export type Workspaces = ({
  _id: Id<"workspaces">;
  _creationTime: number;
  name: string;
  userId: Id<"users">;
  joinCode: string;
} | null)[] | undefined;

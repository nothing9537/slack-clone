import { Id } from "@convex/_generated/dataModel";

export type Channel = {
  _id: Id<"channels">;
  _creationTime: number;
  workspaceId: Id<"workspaces">;
  name: string;
} | undefined;

export type Channels = ({
  _id: Id<"channels">;
  _creationTime: number;
  workspaceId: Id<"workspaces">;
  name: string;
})[] | undefined;

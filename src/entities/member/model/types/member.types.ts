import { Doc } from "@convex/_generated/dataModel";

export type Member = Doc<"members"> | null | undefined;

export type Members = (Doc<"members"> | null)[] | undefined;

export type PopulatedMember = { user: Doc<"users"> } & Doc<"members">;
export type PopulatedMembers = PopulatedMember[] | undefined;

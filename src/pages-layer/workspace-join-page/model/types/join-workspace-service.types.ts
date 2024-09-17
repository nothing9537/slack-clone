import { Id } from "@convex/_generated/dataModel";
import { JoinFormSchema } from "./join-form-schema.types";

export type JoinWorkspaceRequestType = JoinFormSchema;
export type JoinWorkspaceResponseType = Id<"workspaces">;

export interface JoinWorkspaceOptions {
  onSuccess?: (data: JoinWorkspaceResponseType, args: JoinWorkspaceRequestType) => void;
  onError?: (errorMessage: string) => void;
  onSettled?: () => void;
  throwError?: boolean;
}

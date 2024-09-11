import { Workspace } from "@/entities/workspace";

export interface WorkspacePreferencesModalData {
  workspace?: NonNullable<Workspace>;
}

export interface CreateChannelModalData {
  workspace?: NonNullable<Workspace>;
}

export type ModalData = WorkspacePreferencesModalData | CreateChannelModalData;

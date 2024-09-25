import { Channel } from "@/entities/channel";
import { Message } from "@/entities/message";
import { Workspace } from "@/entities/workspace";

export interface WorkspacePreferencesModalData {
  workspace?: NonNullable<Workspace>;
}

export interface CreateChannelModalData {
  workspace?: NonNullable<Workspace>;
}

export interface WorkspaceInviteModalData {
  workspace?: NonNullable<Workspace>;
}

export interface ChannelPreferencesModalData {
  channel?: NonNullable<Channel>;
}

export interface MessageDeleteModalData {
  message?: NonNullable<Message>;
}

export type ModalData =
  WorkspacePreferencesModalData
  | CreateChannelModalData
  | WorkspaceInviteModalData
  | ChannelPreferencesModalData
  | MessageDeleteModalData;

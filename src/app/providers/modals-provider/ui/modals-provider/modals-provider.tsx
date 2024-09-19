"use client";

import { FC } from "react";

import { WorkspaceCreationModal } from "@/features/create-workspace";
import { WorkspacePreferencesModal } from "@/features/workspace-preferences";
import { ChannelPreferencesModal } from "@/features/channel-preferences";
import { CreateChannelModal } from "@/features/create-channel";
import { InviteModal } from "@/features/invite";

import { Mounted } from "@/shared/lib/components/mounted";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";
import { useChannelIdParams } from "@/shared/lib/hooks/use-channel-id";

export const ModalsProvider: FC = () => {
  const workspaceId = useWorkspaceIdParams();
  const channelId = useChannelIdParams();

  return (
    <Mounted>
      <WorkspaceCreationModal />
      {workspaceId && (
        <>
          <InviteModal />
          <WorkspacePreferencesModal />
          <CreateChannelModal />
        </>
      )}
      {channelId && (
        <ChannelPreferencesModal />
      )}
    </Mounted>
  );
};

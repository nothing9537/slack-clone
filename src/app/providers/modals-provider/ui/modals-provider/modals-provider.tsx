"use client";

import { FC } from "react";

import { WorkspaceCreationModal } from "@/features/create-workspace";
import { WorkspacePreferencesModal } from "@/features/workspace-preferences";
import { CreateChannelModal } from "@/features/create-channel";

import { Mounted } from "@/shared/lib/components/mounted";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";

export const ModalsProvider: FC = () => {
  const workspaceId = useWorkspaceIdParams();

  return (
    <Mounted>
      <WorkspaceCreationModal />
      {workspaceId && (
        <>
          <WorkspacePreferencesModal />
          <CreateChannelModal />
        </>
      )}
    </Mounted>
  );
};

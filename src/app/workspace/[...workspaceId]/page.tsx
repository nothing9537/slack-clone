"use client";

import { FC } from "react";

import { UserButton } from "@/features/user-button";
import { useWorkspaceId } from "@/shared/lib/hooks";
import { useGetWorkspaceById } from "@/entities/workspace";

const WorkspaceIDPage: FC = () => {
  const workspaceId = useWorkspaceId();

  console.table({
    workspaceId,
  });

  const { workspace } = useGetWorkspaceById({ id: workspaceId });

  return (
    <div>
      Workspace with ID:
      {" "}
      {JSON.stringify(workspace)}
      <UserButton />
    </div>
  );
};

export default WorkspaceIDPage;

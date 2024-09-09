"use client";

import { FC } from "react";

import { useWorkspaceId } from "@/shared/lib/hooks";
import { useGetWorkspaceById } from "@/entities/workspace";

const WorkspaceIDPage: FC = () => {
  const workspaceId = useWorkspaceId();

  const { workspace } = useGetWorkspaceById({ id: workspaceId });

  return (
    <div>
      Workspace with ID:
      {" "}
      {workspace?.name}
    </div>
  );
};

export default WorkspaceIDPage;

"use client";

import { FC } from "react";

import { useWorkspaceIdParams } from "@/shared/lib/hooks";
import { useGetWorkspaceById } from "@/entities/workspace";

const WorkspaceIDPage: FC = () => {
  const workspaceId = useWorkspaceIdParams();

  const [workspace] = useGetWorkspaceById({ workspaceId });

  return (
    <div className="w-full h-full">
      Workspace with ID:
      {" "}
      {workspace?._id}
    </div>
  );
};

export default WorkspaceIDPage;

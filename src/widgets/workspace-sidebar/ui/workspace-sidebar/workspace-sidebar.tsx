import { FC } from "react";
import { AlertTriangle, Loader } from "lucide-react";

import { useGetWorkspaceById, WorkspaceHeader } from "@/entities/workspace";
import { useCurrentMember, useCurrentMemberIsAdmin } from "@/entities/member";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";

import { LoadingFallback } from "../loading-fallback/loading-fallback";

export const WorkspaceSidebar: FC = () => {
  const workspaceId = useWorkspaceIdParams();

  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });
  const [workspace, isWorkspaceLoading] = useGetWorkspaceById({ id: workspaceId });
  const isAdmin = useCurrentMemberIsAdmin({ workspaceId });

  if (isCurrentMemberLoading || isWorkspaceLoading) {
    return (
      <LoadingFallback>
        <Loader className="size-5 animate-spin text-white" />
      </LoadingFallback>
    );
  }

  if (!currentMember || !workspace) {
    return (
      <LoadingFallback>
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found.</p>
      </LoadingFallback>
    );
  }

  return (
    <div className="flex flex-col bg-[#532c5f] h-full">
      <WorkspaceHeader workspace={workspace} isAdmin={isAdmin} />
    </div>
  );
};

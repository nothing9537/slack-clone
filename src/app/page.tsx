"use client";

import { FC, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { WorkspaceLayout } from "@/pages-layer/workspace";
import { WorkspaceSidebarSkeleton } from "@/widgets/workspace-sidebar";
import { ToolbarSkeleton } from "@/widgets/toolbar";
import { SidebarSkeleton } from "@/widgets/sidebar";
import { ChannelSkeleton } from "@/widgets/channel";
import { useGetWorkspaces } from "@/entities/workspace";
import { useModal } from "@/shared/lib/hooks/use-modal";

const Page: FC = () => {
  const [workspaces, isLoading] = useGetWorkspaces();
  const { type, isOpen, onOpen, onClose } = useModal();
  const workspaceId = useMemo(() => workspaces?.[0]?._id, [workspaces]);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (workspaceId) {
      onClose();
      router.replace(`/workspace/${workspaceId}`);
    } else {
      onOpen("workspaceCreationModal");
      if (type === "workspaceCreationModal" && !isOpen) {
        onOpen("workspaceCreationModal");
      }
    }
  }, [isLoading, workspaceId, onOpen, isOpen, type, router, onClose]);

  return (
    <WorkspaceLayout
      toolbar={<ToolbarSkeleton />}
      sidebar={<SidebarSkeleton />}
      workspaceSidebar={<WorkspaceSidebarSkeleton />}
    >
      <ChannelSkeleton />
    </WorkspaceLayout>
  );
};

export default Page;

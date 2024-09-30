"use client";

import { FC, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { WorkspaceSidebarSkeleton } from "@/widgets/workspace-sidebar";
import { ToolbarSkeleton } from "@/widgets/toolbar";
import { SidebarSkeleton } from "@/widgets/sidebar";
import { ChannelSkeleton } from "@/widgets/channel";
import { useGetWorkspaces } from "@/entities/workspace";
import { useModal } from "@/shared/lib/hooks/use-modal";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable";

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
    <div className="h-full">
      <ToolbarSkeleton />
      <div className="flex h-[calc(100vh-40px)]">
        <SidebarSkeleton />
        <ResizablePanelGroup direction="horizontal" autoSaveId="workspace-resizable-layout">
          <ResizablePanel
            defaultSize={13}
            minSize={10}
            className="bg-[#5e2c5f]"
            id="sidebar"
          >
            <WorkspaceSidebarSkeleton />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={67}
            minSize={20}
            id="main"
          >
            <ChannelSkeleton />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default Page;

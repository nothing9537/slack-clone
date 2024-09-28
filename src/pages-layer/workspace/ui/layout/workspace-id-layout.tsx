import { FC, memo, ReactNode } from "react";

import { Toolbar } from "@/widgets/toolbar";
import { Sidebar } from "@/widgets/sidebar";
import { WorkspaceSidebar } from "@/widgets/workspace-sidebar";
import { useParentMessageId, useProfileMemberId } from "@/entities/message";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable";
import { usePanel } from "@/shared/lib/hooks/use-panel";

import { LayoutPanel } from "../layout-panel/layout-panel";
import { LayoutPanelId, LayoutPanelType } from "../../model/types/layout-panel.types";

interface WorkspaceLayoutProps {
  children: ReactNode;
  toolbar?: ReactNode;
  sidebar?: ReactNode;
  workspaceSidebar?: ReactNode;
}

export const WorkspaceIdLayout: FC<WorkspaceLayoutProps> = memo(({ children, toolbar, sidebar, workspaceSidebar }) => {
  const { queryParam: parentMessageId, onPanelClose: onThreadPanelClose } = usePanel(useParentMessageId);
  const { queryParam: profileMemberId, onPanelClose: onProfileMemberPanelClose } = usePanel(useProfileMemberId);

  let panelId: LayoutPanelId = null;
  let onPanelClose: (() => void) | null = null;
  let panelType: LayoutPanelType | undefined;

  if (parentMessageId) {
    panelType = "thread";
    panelId = parentMessageId;
    onPanelClose = onThreadPanelClose;
  }

  if (profileMemberId) {
    panelType = "memberProfile";
    panelId = profileMemberId;
    onPanelClose = onProfileMemberPanelClose;
  }

  return (
    <div className="h-full">
      {toolbar || <Toolbar />}
      <div className="flex h-[calc(100vh-40px)]">
        {sidebar || <Sidebar />}
        <ResizablePanelGroup direction="horizontal" autoSaveId="workspace-resizable-layout">
          <ResizablePanel
            defaultSize={13}
            minSize={10}
            className="bg-[#5e2c5f]"
            id="sidebar"
          >
            {workspaceSidebar || <WorkspaceSidebar />}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={67}
            minSize={20}
            id="main"
          >
            {children}
          </ResizablePanel>
          {panelType !== undefined && panelId !== null && onPanelClose !== null && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={10} defaultSize={20} id="panel">
                <LayoutPanel
                  panelId={panelId}
                  panelType={panelType}
                  onPanelClose={onPanelClose}
                />
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
});

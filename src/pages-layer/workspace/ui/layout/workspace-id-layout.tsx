import { FC, ReactNode } from "react";

import { Toolbar } from "@/widgets/toolbar";
import { Sidebar } from "@/widgets/sidebar";
import { WorkspaceSidebar } from "@/widgets/workspace-sidebar";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable";

interface WorkspaceLayoutProps {
  children: ReactNode;
  toolbar?: ReactNode;
  sidebar?: ReactNode;
  workspaceSidebar?: ReactNode;
}

export const WorkspaceIdLayout: FC<WorkspaceLayoutProps> = ({ children, toolbar, sidebar, workspaceSidebar }) => {
  return (
    <div className="h-full">
      {toolbar || <Toolbar />}
      <div className="flex h-[calc(100vh-40px)]">
        {sidebar || <Sidebar />}
        <ResizablePanelGroup direction="horizontal" autoSaveId="workspace-resizable-layout">
          <ResizablePanel
            defaultSize={20}
            minSize={11}
            className="bg-[#5e2c5f]"
          >
            {workspaceSidebar || <WorkspaceSidebar />}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={140}
            minSize={20}
          >
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

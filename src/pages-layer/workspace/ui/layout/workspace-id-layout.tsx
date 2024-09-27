import { FC, memo, ReactNode } from "react";
import { TriangleAlert } from "lucide-react";

import { Toolbar } from "@/widgets/toolbar";
import { Sidebar } from "@/widgets/sidebar";
import { WorkspaceSidebar } from "@/widgets/workspace-sidebar";
import { useParentMessageId } from "@/entities/message";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/shared/ui/resizable";
import { usePanel } from "@/shared/lib/hooks/use-panel";
import { Thread } from "@/widgets/thread";

interface WorkspaceLayoutProps {
  children: ReactNode;
  toolbar?: ReactNode;
  sidebar?: ReactNode;
  workspaceSidebar?: ReactNode;
}

const PanelFallback = () => (
  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
    <TriangleAlert className="size-5 text-destructive" />
    <p className="text-destructive">
      Something went wrong while loading panel... :(
    </p>
  </div>
);

export const WorkspaceIdLayout: FC<WorkspaceLayoutProps> = memo(({ children, toolbar, sidebar, workspaceSidebar }) => {
  const { queryParam: parentMessageId, onPanelClose } = usePanel(useParentMessageId);

  const showPanel = !!parentMessageId;

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
          >
            {workspaceSidebar || <WorkspaceSidebar />}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel
            defaultSize={67}
            minSize={20}
          >
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={10} defaultSize={20} id="thread">
                {parentMessageId ? (
                  <Thread
                    parentMessageId={parentMessageId}
                    onClose={onPanelClose}
                  />
                ) : (
                  <PanelFallback />
                )}
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
});

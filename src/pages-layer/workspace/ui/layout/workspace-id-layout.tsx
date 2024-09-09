import { FC, ReactNode } from "react";

import { Toolbar } from "@/widgets/toolbar";
import { Sidebar } from "@/widgets/sidebar";

interface WorkspaceLayoutProps {
  children: ReactNode;
}

export const WorkspaceIdLayout: FC<WorkspaceLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

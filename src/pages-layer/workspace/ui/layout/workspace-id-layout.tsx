import { FC, ReactNode } from "react";

import { Toolbar } from "@/widgets/toolbar";

interface WorkspaceLayoutProps {
  children: ReactNode;
}

export const WorkspaceIdLayout: FC<WorkspaceLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Toolbar />
      {children}
    </div>
  );
};

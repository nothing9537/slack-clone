import { FC, memo } from "react";
import { Bell, Home, MessageSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

import { UserButton } from "@/features/user-button";

import { WorkspaceSwitcher } from "../workspace-switcher/workspace-switcher";
import { SidebarButton } from "../sidebar-button/sidebar-button";

export const Sidebar: FC = memo(() => {
  const pathname = usePathname();

  return (
    <aside className="w-[4.5rem] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-2 pb-1 overflow-auto app-scrollbar">
      <WorkspaceSwitcher />
      <SidebarButton Icon={Home} label="Home" isActive={pathname.includes("/workspace")} />
      <SidebarButton Icon={MessageSquare} label="DM's" isActive={false} />
      <SidebarButton Icon={Bell} label="Activity" isActive={false} />
      <SidebarButton Icon={MoreHorizontal} label="More" isActive={false} />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto mb-2">
        <UserButton />
      </div>
    </aside>
  );
});

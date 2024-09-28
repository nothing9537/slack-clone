import { FC } from "react";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils/cn";

interface SidebarButtonProps {
  Icon: LucideIcon | IconType;
  label: string;
  isActive: boolean;
  action?: () => void;
}

export const SidebarButton: FC<SidebarButtonProps> = ({ Icon, label, isActive, action }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-1.5 cursor-pointer group">
      <Button
        variant="transparent"
        className={cn("size-9 p-2 group hover:bg-accent/20", isActive && "bg-accent/20")}
        onClick={action}
      >
        <Icon className="size-5 text-white group-hover:scale-110 transition-all" />
      </Button>
      <span className="text-xs text-white group-hover:text-accent">
        {label}
      </span>
    </div>
  );
};

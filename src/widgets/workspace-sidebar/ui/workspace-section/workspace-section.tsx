import { FC, ReactNode } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Plus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Hint } from "@/shared/ui/hint";
import { useToggle } from "@/shared/lib/hooks/use-toggle";
import { cn } from "@/shared/lib/utils/cn";

interface WorkspaceSectionProps {
  label: string;
  hint: string;
  onNew?: () => void;
  children: ReactNode;
}

export const WorkspaceSection: FC<WorkspaceSectionProps> = ({ label, hint, onNew, children }) => {
  const [on, toggle] = useToggle<HTMLButtonElement>(true);

  return (
    <div className="flex flex-col gap-1 mt-3 px-2">
      <div className="flex items-center px-3.5 group gap-0.5">
        <Button className="p-0.5 text-sm text-[#f9edffcc] shrink-0 size-6" variant="transparent" onClick={toggle}>
          <FaCaretDown className={cn("size-4 transition-transform", on && "-rotate-90")} />
        </Button>
        <Button size="sm" className="group px-1.5 text-sm text-[#f9edffcc] h-7 justify-start overflow-hidden flex items-center" variant="transparent">
          <span className="truncate">{label}</span>
        </Button>
        {onNew && (
          <Hint label={hint} side="top" align="center">
            <Button onClick={onNew} variant="transparent" size="iconSm" className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto p-0.5 text-sm text-[#f9edffcc] size-6 shrink-0">
              <Plus className="size-5" />
            </Button>
          </Hint>
        )}
      </div>
      {on && (
        children
      )}
    </div>
  );
};

import { X } from "lucide-react";

import { FC } from "react";
import { Button } from "@/shared/ui/button";

interface ThreadHeaderProps {
  onThreadClose: () => void;
}

export const ThreadHeader: FC<ThreadHeaderProps> = ({ onThreadClose }) => {
  return (
    <div className="flex justify-between items-center min-h-12 h-full max-h-12 px-4 border-b">
      <p className="text-lg font-bold">Thread</p>
      <Button size="iconSm" onClick={onThreadClose} variant="ghost">
        <X className="size-5 stroke-[1.5]" />
      </Button>
    </div>
  );
};

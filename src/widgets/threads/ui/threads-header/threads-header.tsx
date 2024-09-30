import { FC } from "react";

import { Button } from "@/shared/ui/button";

export const ThreadsHeader: FC = () => {
  return (
    <div className="bg-white border-b h-12 flex items-center px-4 overflow-hidden">
      <Button
        variant="ghost"
        className="text-lg font-semibold px-2 overflow-hidden w-auto"
        size="sm"
      >
        <p className="truncate">Threads from all channels</p>
      </Button>
    </div>
  );
};

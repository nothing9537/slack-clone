import React, { FC } from "react";

import { Skeleton } from "@/shared/ui/skeleton";

export const ToolbarSkeleton: FC = () => {
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-72 max-w-2xl grow-[2] shrink">
        <Skeleton className="w-full h-8 rounded-md" />
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Skeleton className="size-8 rounded-md" />
      </div>
    </nav>
  );
};

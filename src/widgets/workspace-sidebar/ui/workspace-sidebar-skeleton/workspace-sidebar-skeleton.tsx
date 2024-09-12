import { FC } from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export const WorkspaceSidebarSkeleton: FC = () => {
  return (
    <div className="flex flex-col bg-[#532c5f] h-full">
      <Skeleton className="w-full h-8" />
      <div className="flex flex-col px-2 mt-6 gap-1">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
      <div className="mt-2 px-2 gap-1 flex flex-col">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  );
};

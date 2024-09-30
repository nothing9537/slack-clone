import { FC } from "react";

import { Skeleton } from "@/shared/ui/skeleton";

export const ChannelSkeleton: FC = () => {
  return (
    <div className="flex flex-col h-full gap-y-2">
      <Skeleton className="w-full h-12 m-2" />
      <div className="flex-1 flex flex-col gap-y-2">
        <Skeleton className="h-9 w-[33%]" />
        <Skeleton className="h-9 w-[57%]" />
        <Skeleton className="h-9 w-[70%]" />
        <Skeleton className="h-9 w-[11%]" />
        <Skeleton className="h-9 w-[64%]" />
        <Skeleton className="h-9 w-[70%]" />
        <Skeleton className="h-9 w-[75%]" />
        <Skeleton className="h-9 w-[45%]" />
        <Skeleton className="h-9 w-[55%]" />
      </div>
      <div className="px-5 mt-2 mb-2">
        <Skeleton className="w-full h-32" />
      </div>
    </div>
  );
};

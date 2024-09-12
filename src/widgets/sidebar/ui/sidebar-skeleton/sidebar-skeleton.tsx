import { FC } from "react";

import { Skeleton } from "@/shared/ui/skeleton";

export const SidebarSkeleton: FC = () => {
  return (
    <aside className="w-[4.5rem] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-2 pb-1">
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
      <Skeleton className="size-10" />
      <div className="flex flex-col items-center justify-center gap-y-1 mt-auto mb-2">
        <Skeleton className="rounded-full size-10" />
      </div>
    </aside>
  );
};

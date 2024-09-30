"use client";

import { FC, memo } from "react";

import { Loader } from "lucide-react";
import { useGetMessages } from "@/entities/message";
import { useCurrentMember } from "@/entities/member";
import { NotFoundFallback } from "@/shared/ui/not-found-fallback";
import { Threads } from "@/widgets/threads";
import { Id } from "@convex/_generated/dataModel";

interface ThreadsPageProps {
  params: {
    workspaceId: Id<"workspaces">;
  };
}

export const ThreadsPage: FC<ThreadsPageProps> = memo(({ params }) => {
  const [threads, status, loadMore] = useGetMessages({ threads: true, workspaceId: params.workspaceId });
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId: params.workspaceId });

  if (status === "LoadingFirstPage" || isCurrentMemberLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!threads) {
    return (
      <div className="flex h-full items-center justify-center">
        <NotFoundFallback text="Threads not found." />
      </div>
    );
  }

  if (!currentMember) {
    return (
      <div className="flex h-full items-center justify-center">
        <NotFoundFallback text="Unauthorized." />
      </div>
    );
  }

  return (
    <Threads
      currentMember={currentMember}
      threads={threads}
      loadMore={loadMore}
      status={status}
    />
  );
});

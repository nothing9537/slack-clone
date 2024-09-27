"use client";

import { FC, useEffect, useState } from "react";
import { Loader, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

import { DirectMessage } from "@/widgets/direct-message";
import { GetOrCreateConversationResponseType, useGetOrCreateConversation } from "@/entities/conversation";
import { useCurrentMember } from "@/entities/member";
import { Id } from "@convex/_generated/dataModel";

interface DirectMessagePageProps {
  params: {
    workspaceId: Id<"workspaces">
    memberId: Id<"members">
  };
}

export const DirectMessagePage: FC<DirectMessagePageProps> = ({ params }) => {
  const getOrCreateConversation = useGetOrCreateConversation(params);
  const [conversation, setConversation] = useState<GetOrCreateConversationResponseType | null>(null);
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId: params.workspaceId });
  const [isPending, setIsPending] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsPending(true);

    getOrCreateConversation()
      .then((conversation) => {
        if (conversation) {
          setConversation(conversation);
        }
      })
      .finally(() => {
        setIsPending(false);
      });
  }, [getOrCreateConversation]);

  if (isPending || isCurrentMemberLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <TriangleAlert className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Conversation not found.</p>
        </div>
      </div>
    );
  }

  if (!currentMember) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <TriangleAlert className="text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Unauthorized.</p>
        </div>
      </div>
    );
  }

  if (currentMember._id === params.memberId) {
    router.replace(`/workspace/${params.workspaceId}`);
  }

  return (
    <DirectMessage
      conversation={conversation}
      currentMember={currentMember}
      workspaceId={params.workspaceId}
    />
  );
};

import { FC } from "react";

import { GetOrCreateConversationResponseType } from "@/entities/conversation";
import { Member, useGetMemberById } from "@/entities/member";
import { useGetMessages } from "@/entities/message";
import { Loader } from "@/shared/ui/loader";
import { NotFoundFallback } from "@/shared/ui/not-found-fallback";
import { useMemberIdParams } from "@/shared/lib/hooks/use-member-id";
import { Id } from "@convex/_generated/dataModel";

import { DirectMessageScreen } from "../direct-message-screen/direct-message-screen";
import { DirectMessageHeader } from "../direct-message-header/direct-message-header";
import { DirectMessageSendForm } from "../direct-message-send-form/direct-message-send-form";

interface DirectMessageProps {
  conversation: NonNullable<GetOrCreateConversationResponseType>;
  currentMember: NonNullable<Member>;
  workspaceId: Id<"workspaces">;
}

export const DirectMessage: FC<DirectMessageProps> = ({ conversation, currentMember, workspaceId }) => {
  const otherMemberId = useMemberIdParams();

  const [otherMember, isOtherMemberLoading] = useGetMemberById({ memberId: otherMemberId });
  const getMessagesReturn = useGetMessages({ conversationId: conversation._id });
  const status = getMessagesReturn[1];

  if (status === "LoadingFirstPage" || isOtherMemberLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!otherMember) {
    return (
      <div className="h-full flex items-center justify-center">
        <NotFoundFallback text="Other member not found." />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-y-2">
      <DirectMessageHeader otherMember={otherMember} />
      <DirectMessageScreen
        conversation={conversation}
        currentMember={currentMember}
        otherMember={otherMember}
        getMessagesReturn={getMessagesReturn}
      />
      <DirectMessageSendForm
        workspaceId={workspaceId}
        conversation={conversation}
        otherMember={otherMember}
      />
    </div>
  );
};

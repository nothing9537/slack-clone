import { FC } from "react";
import { format } from "date-fns";

import { GetOrCreateConversationResponseType } from "@/entities/conversation";
import { PopulatedMember } from "@/entities/member";

interface ThreadHeroProps {
  conversation: NonNullable<GetOrCreateConversationResponseType>;
  otherMember: NonNullable<PopulatedMember>;
}

export const DirectMessageHero: FC<ThreadHeroProps> = ({ conversation, otherMember }) => {
  return (
    <div className="mx-5 mb-auto">
      <p className="text-2xl font-bold mb-2">
        Conversation with
        {" "}
        {otherMember.user.name || "Workspace Member"}
      </p>
      <p className="font-normal text-slate-800 mb-4">
        This conversation was created on
        {" "}
        {format(conversation._creationTime, "MMMM do, yyyy")}
        .
        {" "}
        This is very beginning of the
        {" "}
        <strong>{`${otherMember.user?.name || "Workspace Member"}'s`}</strong>
        {" "}
        conversation.
      </p>
    </div>
  );
};

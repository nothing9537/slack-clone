import { FC } from "react";
import dynamic from "next/dynamic";

import { Message, MessageItem } from "@/entities/message";
import { Member } from "@/entities/member";

interface ThreadScreenProps {
  message: NonNullable<Message>;
  currentMember: NonNullable<Member>;
}

const Renderer = dynamic(() => import("@/shared/ui/renderer"), {
  ssr: true,
});

export const ThreadScreen: FC<ThreadScreenProps> = ({ message, currentMember }) => {
  return (
    <div>
      <MessageItem
        item={message}
        currentMember={currentMember}
        hideThreadButton
        isCompact={false}
        Renderer={Renderer}
      />
    </div>
  );
};

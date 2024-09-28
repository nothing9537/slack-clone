import { ComponentType } from "react";

import { RendererProps } from "@/shared/ui/renderer";
import { Member } from "@/entities/member";

import { useHandleToggleReaction } from "../../lib/hooks/use-toggle-reaction.hook";
import { Message } from "./message-services.types";

export interface BaseMessageItemProps {
  item: Message;
  Renderer: ComponentType<RendererProps>;
  onReactionChange: ReturnType<typeof useHandleToggleReaction>;
  currentMember: NonNullable<Member>;
  handleThread: () => void;
  handleMemberProfile: () => void;
}

import { FC } from "react";

import { ThreadPanel } from "@/widgets/thread-panel";
import { PanelFallback } from "@/shared/ui/panel";
import { MemberProfilePanel } from "@/widgets/member-profile-panel";
import { Id } from "@convex/_generated/dataModel";

import { LayoutPanelId, LayoutPanelType } from "../../model/types/layout-panel.types";

interface PanelProps {
  panelId?: LayoutPanelId;
  panelType: LayoutPanelType;
  onPanelClose: () => void;
}

export const LayoutPanel: FC<PanelProps> = (props) => {
  const { panelId, panelType, onPanelClose } = props;

  if (!panelId) {
    return <PanelFallback />;
  }

  switch (panelType) {
    case "thread":
      return (
        <ThreadPanel parentMessageId={panelId as Id<"messages">} onClose={onPanelClose} />
      );
    case "memberProfile":
      return (
        <MemberProfilePanel memberId={panelId as Id<"members">} onClose={onPanelClose} />
      );
    default:
      return null;
  }
};

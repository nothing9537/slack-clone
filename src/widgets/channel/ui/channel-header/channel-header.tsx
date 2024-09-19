import React, { FC, useCallback } from "react";
import { FaChevronDown } from "react-icons/fa";

import { Channel } from "@/entities/channel";
import { Button } from "@/shared/ui/button";
import { useGenericModal } from "@/shared/lib/hooks";
import { ChannelPreferencesModalData } from "@/shared/types";

interface ChannelScreenHeaderProps {
  channel: NonNullable<Channel>;
}

export const ChannelHeader: FC<ChannelScreenHeaderProps> = ({ channel }) => {
  const { onOpen } = useGenericModal<ChannelPreferencesModalData>();

  const onChannelPreferencesModalOpen = useCallback(() => {
    onOpen("channelPreferencesModal", { channel });
  }, [channel, onOpen]);

  return (
    <div className="bg-white border-b h-12 flex items-center px-4 overflow-hidden">
      <Button
        variant="ghost"
        className="text-lg font-semibold px-2 overflow-hidden w-auto"
        size="sm"
        onClick={onChannelPreferencesModalOpen}
      >
        <p className="truncate">
          #
          {" "}
          {channel.name}
        </p>
        <FaChevronDown className="size-2.5 ml-2" />
      </Button>
    </div>
  );
};

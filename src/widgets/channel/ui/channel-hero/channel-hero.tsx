import { FC } from "react";
import { format } from "date-fns";

import { Channel } from "@/entities/channel";

interface ChannelHeroProps {
  channel: NonNullable<Channel>;
}

export const ChannelHero: FC<ChannelHeroProps> = ({ channel }) => {
  return (
    <div className="mt-20 mx-5 mb-4">
      <p className="text-2xl font-bold mb-2">
        #
        {" "}
        {channel.name}
      </p>
      <p className="font-normal text-slate-800 mb-4">
        This channel was created on
        {" "}
        {format(channel._creationTime, "MMMM do, yyyy")}
        .
        {" "}
        This is very beginning of the
        {" "}
        <strong>{channel.name}</strong>
        {" "}
        channel.
      </p>
    </div>
  );
};

import { FC } from "react";
import { format } from "date-fns";

import { Message } from "@/entities/message";

interface ThreadHeroProps {
  parentMessage: NonNullable<Message>;
}

export const ThreadHero: FC<ThreadHeroProps> = ({ parentMessage }) => {
  return (
    <div className="mx-5 mb-auto">
      <p className="text-2xl font-bold mb-2">
        Thread by
        {" "}
        {parentMessage.user.name}
      </p>
      <p className="font-normal text-slate-800 mb-4">
        This thread was created on
        {" "}
        {format(parentMessage._creationTime, "MMMM do, yyyy")}
        .
        {" "}
        This is very beginning of the
        {" "}
        <strong>{`${parentMessage.user.name}'s`}</strong>
        {" "}
        thread.
      </p>
    </div>
  );
};

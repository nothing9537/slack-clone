import { FC } from "react";
import { FaChevronDown } from "react-icons/fa";

import { PopulatedMember } from "@/entities/member";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface DirectMessageHeaderProps {
  otherMember: NonNullable<PopulatedMember>;
}

export const DirectMessageHeader: FC<DirectMessageHeaderProps> = ({ otherMember }) => {
  return (
    <div className="bg-white border-b h-12 flex items-center px-4 overflow-hidden">
      <Button
        variant="ghost"
        className="text-lg font-semibold px-2 overflow-hidden w-auto"
        size="sm"
      >
        <Avatar className="size-6 mr-2">
          <AvatarImage src={otherMember.user?.image} />
          <AvatarFallback>
            {otherMember.user.name?.charAt?.(0) || "M"}
          </AvatarFallback>
        </Avatar>
        <p className="truncate">{otherMember.user?.name || "Member"}</p>
        <FaChevronDown className="size-2.5 ml-2" />
      </Button>
    </div>
  );
};

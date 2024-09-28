import { FC } from "react";

import { PopulatedMember } from "@/entities/member";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface MemberProfileAvatarProps {
  member: NonNullable<PopulatedMember>;
}

export const MemberProfileAvatar: FC<MemberProfileAvatarProps> = ({ member }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Avatar className="max-w-64 max-h-64 size-full">
        <AvatarImage src={member.user?.image} />
        <AvatarFallback className="aspect-square text-6xl">
          {member.user.name?.charAt(0) || "M"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

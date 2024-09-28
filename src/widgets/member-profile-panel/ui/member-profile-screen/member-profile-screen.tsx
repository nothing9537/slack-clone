import { FC } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";

import { PopulatedMember } from "@/entities/member";
import { Separator } from "@/shared/ui/separator";

import { MemberProfileAvatar } from "../member-profile-panel-avatar/member-profile-panel-avatar";

interface MemberProfileScreenProps {
  member: NonNullable<PopulatedMember>;
}

export const MemberProfileScreen: FC<MemberProfileScreenProps> = ({ member }) => {
  return (
    <>
      <MemberProfileAvatar member={member} />
      <div className="flex flex-col p-4">
        <p className="text-xl font-bold">{member.user?.name || "Member"}</p>
      </div>
      <Separator />
      <div className="flex flex-col p-4">
        <p className="text-sm font-bold mb-4">Contact information</p>
        <div className="flex items-center gap-2">
          <div className="size-9 rounded-md bg-muted flex items-center justify-center">
            <Mail className="size-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-muted-foreground">Email Address</p>
            <Link href={`mailto:${member.user.email}`} className="text-sm hover:underline text-[#1264a3]">
              {member.user.email}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

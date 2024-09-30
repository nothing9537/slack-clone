import { FC } from "react";

import { Member, PopulatedMember } from "@/entities/member";
import { Separator } from "@/shared/ui/separator";

import { MemberProfileAvatar } from "../member-profile-avatar/member-profile-avatar";
import { MemberProfilePreferences } from "../member-profile-preferences/member-profile-preferences";
import { ContactInformation } from "./contact-information";

interface MemberProfileScreenProps {
  member: NonNullable<PopulatedMember>;
  currentMember: NonNullable<Member>;
  isCurrentMemberAdmin: boolean;
}

export const MemberProfileScreen: FC<MemberProfileScreenProps> = ({ member, currentMember, isCurrentMemberAdmin }) => {
  return (
    <>
      <MemberProfileAvatar member={member} />
      <div className="flex flex-col p-4">
        <p className="text-xl font-bold">{member.user?.name || "Member"}</p>
        <p className="text-lg capitalize text-muted-foreground">
          Workspace role:
          {" "}
          {member.role}
        </p>
        <MemberProfilePreferences
          member={member}
          currentMember={currentMember}
          isCurrentMemberAdmin={isCurrentMemberAdmin}
        />
      </div>
      <Separator />
      <ContactInformation member={member} />
    </>
  );
};

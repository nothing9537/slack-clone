"use client";

import { FC, useCallback } from "react";
import { CircleUser, Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { useCurrentUser } from "@/entities/user";
import { useProfileMemberId } from "@/entities/message";
import { useCurrentMember } from "@/entities/member";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { usePanel } from "@/shared/lib/hooks/use-panel";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";

export const UserButton: FC = () => {
  const workspaceId = useWorkspaceIdParams();
  const [currentUser, isLoading] = useCurrentUser();
  const [currentMember, isCurrentMemberLoading] = useCurrentMember({ workspaceId });
  const { signOut } = useAuthActions();
  const { onPanelOpen } = usePanel(useProfileMemberId);
  const handleSignOut = useCallback(() => signOut(), [signOut]);

  if (isLoading || isCurrentMemberLoading) {
    return (
      <Loader className="size-5 animate-spin text-white" />
    );
  }

  if (!currentUser || !currentMember) {
    return null;
  }

  const { name, image } = currentUser;
  const avatarFallback = name!.charAt(0).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="bg-sky-500 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem onClick={() => onPanelOpen(currentMember._id)}>
          <CircleUser className="size-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

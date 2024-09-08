"use client";

import { FC, useCallback } from "react";
import { Loader, LogOut } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { useCurrentUser } from "@/shared/lib/hooks/use-current-user";

export const UserButton: FC = () => {
  const { data, isLoading } = useCurrentUser();
  const { signOut } = useAuthActions();
  const handleSignOut = useCallback(() => signOut(), [signOut]);

  if (isLoading) {
    return (
      <Loader className="size-10 animate-spin text-white" />
    );
  }

  if (!data) {
    return null;
  }

  const { name, image } = data;
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
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

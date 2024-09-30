import { Dispatch, FC, SetStateAction, useCallback } from "react";
import Link from "next/link";

import { PopulatedMembers } from "@/entities/member";
import { Channels } from "@/entities/channel";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/shared/ui/command";
import { Id } from "@convex/_generated/dataModel";

interface ToolbarCommandProps {
  isCommandDialogOpen: boolean;
  setIsCommandDialogOpen: Dispatch<SetStateAction<boolean>>;
  members: NonNullable<PopulatedMembers>;
  channels: NonNullable<Channels>;
  workspaceId: Id<"workspaces">;
}

export const ToolbarCommand: FC<ToolbarCommandProps> = ({ isCommandDialogOpen, setIsCommandDialogOpen, members, channels, workspaceId }) => {
  const onCommandItemClick = useCallback(() => {
    setIsCommandDialogOpen(false);
  }, [setIsCommandDialogOpen]);

  return (
    <CommandDialog open={isCommandDialogOpen} onOpenChange={setIsCommandDialogOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>
          No results found.
        </CommandEmpty>
        <CommandGroup heading="Channels">
          {channels.map((c) => (
            <Link key={c._id} href={`/workspace/${workspaceId}/channel/${c._id}`} onClick={onCommandItemClick}>
              <CommandItem className="cursor-pointer">
                {c.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Members">
          {members.map((m) => (
            <Link key={m._id} href={`/workspace/${workspaceId}/member/${m._id}`} onClick={onCommandItemClick}>
              <CommandItem className="cursor-pointer">
                {m.user.name}
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

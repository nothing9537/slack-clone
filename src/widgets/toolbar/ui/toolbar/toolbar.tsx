import { FC, memo, useState } from "react";
import { Info, Loader, Search, TriangleAlert } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";
import { useGetWorkspaceById } from "@/entities/workspace";
import { useGetChannels } from "@/entities/channel";
import { useGetMembers } from "@/entities/member";

import { ToolbarCommand } from "./toolbar-command";

interface ToolbarLayoutProps {
  commandComponent: JSX.Element;
  infoComponent: JSX.Element;
}

const ToolbarLayout: FC<ToolbarLayoutProps> = ({ commandComponent, infoComponent }) => {
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-72 max-w-2xl grow-[2] shrink">
        {commandComponent}
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        {infoComponent}
      </div>
    </nav>
  );
};

export const Toolbar: FC = memo(() => {
  const workspaceId = useWorkspaceIdParams();
  const [workspace, isWorkspaceLoading] = useGetWorkspaceById({ workspaceId });
  const [isCommandDialogOpen, setIsCommandDialogOpen] = useState(false);
  const [channels, isChannelsLoading] = useGetChannels({ workspaceId });
  const [members, isMembersLoading] = useGetMembers({ workspaceId });

  if (isChannelsLoading || isWorkspaceLoading || isMembersLoading) {
    return (
      <ToolbarLayout
        commandComponent={(
          <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2" onClick={() => setIsCommandDialogOpen(true)}>
            <Loader className="size-5 animate-spin" />
          </Button>
        )}
        infoComponent={(
          <Button variant="transparent" size="iconSm">
            <Loader className="size-5 animate-spin" />
          </Button>
        )}
      />
    );
  }

  if (!workspace || !channels || !members) {
    return (
      <ToolbarLayout
        commandComponent={(
          <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2" onClick={() => setIsCommandDialogOpen(true)}>
            <TriangleAlert className="size-4 text-white mr-2" />
            <span className="text-white text-sm flex items-center gap-2">
              Data not found.
            </span>
          </Button>
        )}
        infoComponent={(
          <Button variant="transparent" size="iconSm">
            <TriangleAlert className="size-5 text-white" />
          </Button>
        )}
      />
    );
  }

  return (
    <>
      <ToolbarCommand
        isCommandDialogOpen={isCommandDialogOpen}
        setIsCommandDialogOpen={setIsCommandDialogOpen}
        members={members}
        channels={channels}
        workspaceId={workspaceId}
      />
      <ToolbarLayout
        commandComponent={(
          <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2" onClick={() => setIsCommandDialogOpen(true)}>
            <Search className="size-4 text-white mr-2" />
            <span className="text-white text-sm flex items-center gap-2">
              Search in:
              {" "}
              {workspace.name}
            </span>
          </Button>
        )}
        infoComponent={(
          <Button variant="transparent" size="iconSm">
            <Info className="size-5 text-white" />
          </Button>
        )}
      />
    </>
  );
});

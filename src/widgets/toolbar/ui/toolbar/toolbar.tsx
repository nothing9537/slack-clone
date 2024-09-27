import { FC, memo } from "react";
import { Info, Loader, Search } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { useWorkspaceIdParams } from "@/shared/lib/hooks";
import { useGetWorkspaceById } from "@/entities/workspace";

export const Toolbar: FC = memo(() => {
  const workspaceId = useWorkspaceIdParams();
  const [workspace, isLoading] = useGetWorkspaceById({ workspaceId });

  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      <div className="flex-1" />
      <div className="min-w-72 max-w-2xl grow-[2] shrink">
        <Button size="sm" className="bg-accent/25 hover:bg-accent-25 w-full justify-start h-7 px-2">
          <Search className="size-4 text-white mr-2" />
          <span className="text-white text-sm flex items-center gap-2">
            Search in:
            {" "}
            {isLoading ? (
              <Loader className="size-5 animate-spin" />
            ) : (
              workspace?.name
            )}
          </span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
});

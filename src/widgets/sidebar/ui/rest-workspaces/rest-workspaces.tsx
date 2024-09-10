import { FC } from "react";
import { useRouter } from "next/navigation";

import { DropdownMenuItem } from "@/shared/ui/dropdown-menu";
import { Workspaces } from "@/entities/workspace";

interface RestWorkspacesProps {
  items: Workspaces;
}

export const RestWorkspaces: FC<RestWorkspacesProps> = ({ items }) => {
  const router = useRouter();

  if (!items?.length) {
    return (
      null
    );
  }

  return (
    items.map((workspace) => {
      if (!workspace) {
        return null;
      }

      return (
        <DropdownMenuItem
          key={workspace._id}
          className="cursor-progress capitalize overflow-hidden"
          onClick={() => router.push(`/workspace/${workspace._id}`)}
        >
          <div className="size-8 relative overflow-hidden bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            {workspace.name.charAt(0)}
          </div>
          <p className="truncate">{workspace.name}</p>
        </DropdownMenuItem>
      );
    })
  );
};

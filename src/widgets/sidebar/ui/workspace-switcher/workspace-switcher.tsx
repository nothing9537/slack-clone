"use client";

import { FC, useMemo } from "react";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { useGetWorkspaceById, useGetWorkspaces } from "@/entities/workspace";

import { useModal, useWorkspaceId } from "@/shared/lib/hooks";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";

import { RestWorkspaces } from "../rest-workspaces/rest-workspaces";

export const WorkspaceSwitcher: FC = () => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();
  const { onOpen } = useModal();

  const { workspaces } = useGetWorkspaces();
  const { workspace, isLoading: isWorkspaceLoading } = useGetWorkspaceById({ id: workspaceId });

  const filteredWorkspaces = useMemo(() => workspaces?.filter((ws) => ws?._id !== workspaceId), [workspaces, workspaceId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 relative overflow-hidden bg-[#ababad] hover:bg-[#ababad]/80 text-slate-800 font-semibold text-xl">
          {isWorkspaceLoading ? (
            <Loader className="size-5 animate-spin shrink-0" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="start" className="w-64">
        <DropdownMenuItem
          className="cursor-pointer flex-col justify-start items-start capitalize"
          onClick={() => router.push(`/workspace/${workspaceId}`)}
        >
          {workspace?.name}
          <span className="text-sm text-muted-foreground">
            Active Workspace
          </span>
        </DropdownMenuItem>
        <RestWorkspaces items={filteredWorkspaces} />
        <DropdownMenuItem className="cursor-pointer" onClick={() => onOpen("workspaceCreationModal")}>
          <div className="size-9 relative overflow-hidden bg-[#f2f2f2] text-slate-800 font-semibold text-lg rounded-md flex items-center justify-center mr-2">
            <Plus />
          </div>
          Create a new workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

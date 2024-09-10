"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import { UserButton } from "@/features/user-button";
import { useGetWorkspaces } from "@/entities/workspace";
import { useModal } from "@/shared/lib/hooks/use-modal";

const Page = () => {
  const [workspaces, isLoading] = useGetWorkspaces();
  const { type, isOpen, onOpen, onClose } = useModal();
  const workspaceId = useMemo(() => workspaces?.[0]?._id, [workspaces]);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
      onClose();
    } else {
      onOpen("workspaceCreationModal");
      if (type === "workspaceCreationModal" && !isOpen) {
        onOpen("workspaceCreationModal");
      }
    }
  }, [isLoading, workspaceId, onOpen, isOpen, type, router, onClose]);

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default Page;

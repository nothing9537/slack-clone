"use client";

/* eslint-disable react/jsx-no-useless-fragment */

import { FC } from "react";

import { Mounted } from "@/shared/lib/components/mounted";
import { WorkspaceCreationModal } from "@/features/create-workspace";

export const ModalsProvider: FC = () => {
  return (
    <Mounted>
      <>
        <WorkspaceCreationModal />
      </>
    </Mounted>
  );
};

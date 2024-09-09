"use client";

import { FC, ReactNode } from "react";

import { useMounted } from "../hooks/use-mounted";

interface MountedProps {
  children: ReactNode;
}

/**
 * Renders children only when the component is mounted to avoid some hydration errors.
 * @param children - The children to render.
 */
export const Mounted: FC<MountedProps> = ({ children }) => {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  return children;
};

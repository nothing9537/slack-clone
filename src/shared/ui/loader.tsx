import { FC } from "react";
import { ClassValue } from "clsx";
import { Loader as LucideLoader } from "lucide-react";

import { cn } from "../lib/utils/cn";

interface LoaderProps {
  className?: ClassValue;
}

export const Loader: FC<LoaderProps> = ({ className }) => <LucideLoader className={cn("size-5 animate-spin text-muted-foreground", className)} />;

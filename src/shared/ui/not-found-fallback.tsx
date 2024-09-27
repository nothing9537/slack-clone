import { FC } from "react";
import { ClassValue } from "clsx";
import { TriangleAlert } from "lucide-react";

import { cn } from "../lib/utils/cn";

interface NotFoundFallbackProps {
  text: string;
  iconClassName?: ClassValue;
  textClassName?: ClassValue;
}

export const NotFoundFallback: FC<NotFoundFallbackProps> = ({ text, iconClassName, textClassName }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <TriangleAlert className={cn("size-5 text-muted-foreground", iconClassName)} />
      <p className={cn("text-sm text-muted-foreground", textClassName)}>{text}</p>
    </div>
  );
};

import Link from "next/link";
import { FC } from "react";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils/cn";
import { Id } from "@convex/_generated/dataModel";

const variants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-[18px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481349] bg-white/90 hover:bg-white/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ChannelItemProps {
  label: string;
  Icon: LucideIcon | IconType;
  id: string;
  variant?: VariantProps<typeof variants>["variant"];
  workspaceId: Id<"workspaces">;
}

export const ChannelItem: FC<ChannelItemProps> = ({ label, Icon, id, variant, workspaceId }) => {
  return (
    <Button
      asChild
      variant="transparent"
      size="sm"
      className={cn(variants({ variant }))}
    >
      <Link href={`/workspace/${workspaceId}/channel/${id}`}>
        <Icon className="size-4 mr-1 shrink-0" />
        <span className="text-sm truncate">{label}</span>
      </Link>
    </Button>
  );
};

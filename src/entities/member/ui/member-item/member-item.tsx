import { FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils/cn";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Id } from "@convex/_generated/dataModel";

import { PopulatedMember } from "../../model/types/member.types";

const variants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 px-4 text-sm overflow-hidden",
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

interface MemberItemProps {
  item: PopulatedMember;
  label?: string;
  variant?: VariantProps<typeof variants>["variant"];
  workspaceId: Id<"workspaces">;
}

export const MemberItem: FC<MemberItemProps> = ({ item, label = "Member", variant, workspaceId }) => {
  return (
    <Button
      variant="transparent"
      className={cn((variants({ variant })))}
      size="sm"
      asChild
    >
      <Link href={`/workspace/${workspaceId}/member/${item.user._id}`}>
        <Avatar className="size-5 rounded-full mr-1">
          <AvatarImage src={item.user.image} />
          <AvatarFallback className="capitalize rounded-full bg-sky-500 text-white">
            {item.user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{item?.user?.name || label}</span>
      </Link>
    </Button>
  );
};

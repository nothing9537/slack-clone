import { ButtonHTMLAttributes, FC, memo } from "react";

import { ClassValue } from "clsx";

import { cn } from "@/shared/lib/utils/cn";

import { Button } from "../button";

interface UpdateVariantProps {
  disabled: boolean;
  actionButtonType: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  actionClassName: ClassValue;
  saveAction: (passImages: boolean) => void;
}

export const UpdateVariant: FC<UpdateVariantProps> = memo(({ disabled, actionButtonType, actionClassName, saveAction }) => {
  return (
    <div className="ml-auto flex items-center gap-x-2">
      <Button disabled={disabled} size="sm" variant="outline">
        Cancel
      </Button>
      <Button disabled={disabled} size="sm" variant="outline" className={cn(actionClassName)} type={actionButtonType} onClick={() => saveAction(false)}>
        Save
      </Button>
    </div>
  );
});

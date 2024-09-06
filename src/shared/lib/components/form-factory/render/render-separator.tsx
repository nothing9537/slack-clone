"use client";

import { FieldValues } from "react-hook-form";

import { Separator } from "@/shared/ui/separator";
import { Label } from "@/shared/ui/label";

import { FormFactorySeparatorComponent } from "../types/separator";

interface RenderSeparatorProps<T extends FieldValues> {
  component: FormFactorySeparatorComponent<T>
}

export const RenderSeparator = <T extends FieldValues>(props: RenderSeparatorProps<T>) => {
  const { component } = props;

  if (component?.label) {
    return (
      <div>
        <Separator className="mb-2" />
        <Label className={component.label?.className}>
          {component.label.text}
        </Label>
        <Separator className="mt-3" />
      </div>
    );
  }

  return (
    <Separator />
  );
};

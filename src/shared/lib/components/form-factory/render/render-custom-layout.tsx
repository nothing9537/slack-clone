"use client";

import { ReactNode } from "react";
import { ClassValue } from "clsx";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { cn } from "@/shared/lib/utils/cn";

import { FormFactoryCustomLayoutComponent } from "../types/custom-layout-component";

interface RenderCustomLayoutProps<T extends FieldValues> {
  component: FormFactoryCustomLayoutComponent<T>;
  children: ReactNode;
  form: UseFormReturn<T>;
}

export const RenderCustomLayout = <T extends FieldValues>(props: RenderCustomLayoutProps<T>) => {
  const { component, children, form } = props;

  const { as = "div" } = component;
  const Wrapper = as;

  if (Array.isArray(children)) {
    if ((children as ReactNode[]).every((el) => el === null)) {
      return null;
    }
  }

  let className: ClassValue;

  if (typeof component.className === "function") {
    className = component.className(form);
  } else {
    className = component.className;
  }

  return (
    <Wrapper className={cn(className)}>
      {children}
    </Wrapper>
  );
};

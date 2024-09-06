"use client";

import { FieldValues } from "react-hook-form";
import { FormFactoryCustomComponent } from "../types/custom-component";

interface RenderCustomComponentProps<T extends FieldValues> {
  component: FormFactoryCustomComponent<T>;
}

export const RenderCustomComponent = <T extends FieldValues>(props: RenderCustomComponentProps<T>) => {
  return props.component.element;
};

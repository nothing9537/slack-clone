import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { ClassValue } from "clsx";

import { FormFactoryComponentBase } from "./base-component";

export type RadioGroupValueAs = "number" | "string" | "boolean";

interface RadioGroupItem<T extends FieldValues> {
  label: string;
  value: PathValue<T, Path<T>> | string;
  className?: ClassValue;
}

export interface FormFactoryRadioGroupComponent<T extends FieldValues> extends FormFactoryComponentBase<T> {
  name: Path<T>;
  type: "radio-group";
  className?: string;
  valueAs?: RadioGroupValueAs | ((value: string) => number | string | boolean);
  items: RadioGroupItem<T>[];
  defaultValue?: PathValue<T, Path<T>> | string;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  action?: (v: PathValue<T, Path<T>>, form: UseFormReturn<T>) => void;
}

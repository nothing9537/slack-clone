import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { InputHTMLAttributes } from "react";

import { FormFactoryComponentBase } from "./base-component";

export type InputValueAs = "number" | "string";

export interface FormFactoryInputComponent<T extends FieldValues> extends FormFactoryComponentBase<T> {
  name: Path<T>;
  type: "input";
  className?: string;
  placeholder?: string;
  valueAs?: InputValueAs | ((value: string) => number | string);
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  defaultValue?: string;
  disabled?: boolean;
  action?: (v: PathValue<T, Path<T>>, form: UseFormReturn<T>) => void;
}

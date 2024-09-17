import { FieldValues, Path } from "react-hook-form";

import { FormFactoryComponentBase } from "./base-component";

export interface FormFactoryInputOTPComponent<T extends FieldValues> extends FormFactoryComponentBase<T> {
  name: Path<T>;
  type: "input-otp";
  className?: string;
  disabled?: boolean;
  pattern?: string;
  defaultValue?: string;
  valueAs?: "number" | ((value: string) => number | string);
}

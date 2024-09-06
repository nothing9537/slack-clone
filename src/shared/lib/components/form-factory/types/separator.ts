import { FieldValues } from "react-hook-form";
import { FormFactoryComponentBase } from "./base-component";

export interface FormFactorySeparatorComponent<T extends FieldValues> extends Omit<FormFactoryComponentBase<T>, "name"> {
  name: string;
  type: "separator";
  label?: {
    text: string;
    className?: string;
  };
}

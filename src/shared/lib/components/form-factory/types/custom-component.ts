import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";

import { FormFactoryComponentBase } from "./base-component";

export interface FormFactoryCustomComponent<T extends FieldValues> extends Omit<FormFactoryComponentBase<T>, | "name"> {
  name: string;
  type: "custom";
  element: ReactNode;
}

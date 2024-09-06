import { FieldValues, UseFormReturn } from "react-hook-form";
import { ClassValue } from "clsx";

// eslint-disable-next-line import/no-cycle
import { FormFactoryComponent } from "../form-factory-types";
import { FormFactoryComponentBase } from "./base-component";

export interface FormFactoryCustomLayoutComponent<T extends FieldValues> extends Omit<FormFactoryComponentBase<T>, "name"> {
  name: string;
  type: "custom-layout";
  className?: ClassValue | ((form: UseFormReturn<T>) => ClassValue);
  as?: keyof HTMLElementTagNameMap;
  components: FormFactoryComponent<T>[];
}

import { FieldValues } from "react-hook-form";

import { FormFactoryInputComponent } from "../types/input-component";

type GenerateInputNumberFieldComponentProps<T extends FieldValues> = Omit<FormFactoryInputComponent<T>, "type" | "inputMode" | "textFieldType" | "valueAs">;

export const generateInputNumberFieldComponent = <T extends FieldValues>(props: GenerateInputNumberFieldComponentProps<T>): FormFactoryInputComponent<T> => {
  return {
    ...props,
    type: "input",
    inputMode: "numeric",
    inputType: "number",
    valueAs: "number",
  };
};

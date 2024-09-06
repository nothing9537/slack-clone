import { FieldValues, UseFormReturn } from "react-hook-form";
import { FormFactoryComponent } from "../form-factory-types";

export const isHideKeysMatchValues = <T extends FieldValues>(component: FormFactoryComponent<T>, form: UseFormReturn<T>): boolean => {
  const { hideTemplate } = component;

  if (hideTemplate) {
    const { mode, templates } = hideTemplate;
    const checks: boolean[] = [];

    templates.forEach((template) => {
      checks.push(template.value === form.watch(template.key));
    });

    return mode === "every" ? checks.every(Boolean) : checks.some(Boolean);
  }

  return false;
};

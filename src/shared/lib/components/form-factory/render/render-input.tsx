"use client";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

import { Input } from "@/shared/ui/input";

import { FormFactoryInputComponent } from "../types/input-component";
import { FormFieldWrapper } from "../form-field-wrapper";

interface RenderInputProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  component: FormFactoryInputComponent<T>;
}

export const RenderInput = <T extends FieldValues>(props: RenderInputProps<T>) => {
  const { form, component } = props;

  return (
    <FormFieldWrapper form={form} name={component.name} {...component.overviewProps} key={component.name}>
      {({ field, formState }) => (
        <Input
          {...field}
          value={(field?.value || field.value === 0) ? field.value : ""}
          placeholder={component?.placeholder}
          className={component?.className}
          disabled={formState.isSubmitting || component.disabled}
          type={component?.inputType}
          inputMode={component?.inputMode}
          defaultValue={component?.defaultValue}
          autoComplete="false"
          onChange={(e) => {
            let changeValue: string | number | PathValue<T, Path<T>> = e.target.value;

            if (component.valueAs === "number") {
              const numberRegexp = /^-?\d*\.?\d+$/;

              if (numberRegexp.test(e.target.value)) {
                changeValue = +e.target.value;
              }
            }

            if (typeof component.valueAs === "function") {
              changeValue = component.valueAs(e.target.value);
            }

            component?.action?.(changeValue as never, form);

            field.onChange(changeValue);
          }}
        />
      )}
    </FormFieldWrapper>
  );
};

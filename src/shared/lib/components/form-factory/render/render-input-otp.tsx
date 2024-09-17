"use client";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/ui/input-otp";

import { FormFieldWrapper } from "../form-field-wrapper";
import { FormFactoryInputOTPComponent } from "../types/input-otp-component";

interface RenderInputOTPProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  component: FormFactoryInputOTPComponent<T>;
}

export const RenderInputOTP = <T extends FieldValues>(props: RenderInputOTPProps<T>) => {
  const { form, component } = props;

  return (
    <FormFieldWrapper form={form} name={component.name} {...component.overviewProps} key={component.name}>
      {({ field, formState }) => (
        <InputOTP
          {...field}
          maxLength={6}
          disabled={formState.isSubmitting || Boolean(component?.disabled)}
          pattern={component?.pattern}
          defaultValue={component?.defaultValue}
          onChange={(e) => {
            let changeValue: string | number | PathValue<T, Path<T>> = e;

            if (component.valueAs === "number") {
              const numberRegexp = /^-?\d*\.?\d+$/;

              if (numberRegexp.test(e)) {
                changeValue = +e;
              }
            }

            if (typeof component.valueAs === "function") {
              changeValue = component.valueAs(e);
            }

            field.onChange(changeValue);
          }}
        >
          <InputOTPGroup className={component?.className}>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      )}
    </FormFieldWrapper>
  );
};

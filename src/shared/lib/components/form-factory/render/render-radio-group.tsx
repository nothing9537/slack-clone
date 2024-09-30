"use client";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

import { Label } from "@/shared/ui/label";

import { FormControl } from "@/shared/ui/form";
import { RadioGroup, RadioGroupItem } from "@/shared/ui/radio-group";
import { cn } from "@/shared/lib/utils/cn";
import { FormFactoryRadioGroupComponent } from "../types/radio-group-component";
import { FormFieldWrapper } from "../form-field-wrapper";

interface RenderRadioGroupProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  component: FormFactoryRadioGroupComponent<T>;
}

export const RenderRadioGroup = <T extends FieldValues>(props: RenderRadioGroupProps<T>) => {
  const { component, form } = props;
  const { items, name, defaultValue, direction = "horizontal" } = component;

  return (
    <FormFieldWrapper form={form} name={name} {...component.overviewProps} key={component.name}>
      {({ field, formState }) => {
        let directionClassName: string = "";

        if (direction === "horizontal") {
          directionClassName = "flex-row";
        } else {
          directionClassName = "flex-col";
        }

        return (
          <FormControl>
            <RadioGroup
              disabled={formState.isSubmitting}
              value={field.value}
              defaultValue={defaultValue}
              className={cn("flex gap-x-2 flex-wrap", directionClassName)}
              onValueChange={(v: PathValue<T, Path<T>>) => {
                if (component.valueAs === "boolean") {
                  field.onChange(JSON.parse(v));
                  return;
                }

                if (component.valueAs === "number") {
                  field.onChange(+v);
                  return;
                }

                if (typeof component?.valueAs === "function") {
                  field.onChange(component.valueAs(v));
                  return;
                }

                field.onChange(v);
              }}
            >
              {items.map((item) => {
                const id = `${item.label}-${item.value}`;

                return (
                  <div key={`${item.label}-${item.label}`} className={cn("flex items-center gap-x-2")}>
                    <FormControl>
                      <RadioGroupItem value={item.value} id={id} />
                    </FormControl>
                    <Label
                      htmlFor={id}
                      className={cn(item.className)}
                    >
                      {item.label}
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
        );
      }}
    </FormFieldWrapper>
  );
};

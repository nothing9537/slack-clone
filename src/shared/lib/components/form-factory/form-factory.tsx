"use client";

import { ReactNode, useCallback } from "react";
import { FieldValues } from "react-hook-form";

import { typedMemo } from "../../hooks/use-typed-memo";
import { FormFactoryComponent, FormFactoryProps } from "./form-factory-types";

// render
import { RenderInput } from "./render/render-input";
import { RenderCustomComponent } from "./render/render-custom-component";
import { RenderSeparator } from "./render/render-separator";
import { RenderCustomLayout } from "./render/render-custom-layout";

// utils
import { isHideKeysMatchValues } from "./utils/is-hide-keys-match-values";
import { RenderInputOTP } from "./render/render-input-otp";
import { RenderRadioGroup } from "./render/render-radio-group";

export const FormFactory = typedMemo(<T extends FieldValues>(props: FormFactoryProps<T>): ReactNode[] => {
  const { form, components } = props;

  const renderComponent = useCallback((component: FormFactoryComponent<T>) => {
    if (isHideKeysMatchValues(component, form)) {
      return null;
    }

    switch (component.type) {
      case "input":
        return <RenderInput<T> key={component.name} form={form} component={component} />;
      case "input-otp":
        return <RenderInputOTP<T> key={component.name} form={form} component={component} />;
      case "custom":
        return <RenderCustomComponent<T> key={component.name} component={component} />;
      case "separator":
        return <RenderSeparator<T> key={component.name} component={component} />;
      case "radio-group":
        return <RenderRadioGroup<T> key={component.name} component={component} form={form} />;
      case "custom-layout":
        return (
          <RenderCustomLayout key={component.name} component={component} form={form}>
            {component.components.map(renderComponent)}
          </RenderCustomLayout>
        );
      default:
        return null;
    }
  }, [form]);

  return components.map(renderComponent);
});

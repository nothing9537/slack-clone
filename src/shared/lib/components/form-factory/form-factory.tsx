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

export const FormFactory = typedMemo(<T extends FieldValues>(props: FormFactoryProps<T>): ReactNode[] => {
  const { form, components } = props;

  const renderComponent = useCallback((component: FormFactoryComponent<T>) => {
    if (isHideKeysMatchValues(component, form)) {
      return null;
    }

    switch (component.type) {
      case "input":
        return <RenderInput key={component.name} form={form} component={component} />;
      case "input-otp":
        return <RenderInputOTP key={component.name} form={form} component={component} />;
      case "custom":
        return <RenderCustomComponent key={component.name} component={component} />;
      case "separator":
        return <RenderSeparator key={component.name} component={component} />;
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

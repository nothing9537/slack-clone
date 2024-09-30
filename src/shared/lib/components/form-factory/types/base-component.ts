import { FieldValues, Path, PathValue } from "react-hook-form";

import { FormFieldOverviewProps } from "../form-field-wrapper";

type ComponentType = "input" | "custom" | "separator" | "custom-layout" | "input-otp" | "radio-group";

interface HideType<T extends FieldValues> {
  key: Path<T>;
  value: PathValue<T, Path<T>>;
}

export interface HideTemplate<T extends FieldValues> {
  templates: HideType<T>[];
  mode: "some" | "every";
}

export interface FormFactoryComponentBase<T extends FieldValues> {
  name: Path<T>;
  type: ComponentType;
  hideTemplate?: HideTemplate<T>;
  overviewProps?: FormFieldOverviewProps<T>;
}

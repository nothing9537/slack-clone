import { FieldValues, UseFormReturn } from "react-hook-form";

// eslint-disable-next-line import/no-cycle
import { FormFactoryCustomLayoutComponent } from "./types/custom-layout-component";
import { FormFactoryInputComponent } from "./types/input-component";
import { FormFactoryCustomComponent } from "./types/custom-component";
import { FormFactorySeparatorComponent } from "./types/separator";
import { FormFactoryInputOTPComponent } from "./types/input-otp-component";
import { FormFactoryRadioGroupComponent } from "./types/radio-group-component";

export type FormFactoryComponent<T extends FieldValues> = FormFactoryInputComponent<T>
| FormFactoryCustomComponent<T>
| FormFactorySeparatorComponent<T>
| FormFactoryCustomLayoutComponent<T>
| FormFactoryInputOTPComponent<T>
| FormFactoryRadioGroupComponent<T>;

export interface FormFactoryProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  components: FormFactoryComponent<T>[];
}

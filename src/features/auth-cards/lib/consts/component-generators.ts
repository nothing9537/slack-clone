import { SignInComponent, SignUpComponent } from "../../model/types/auth-schemas.types";

export const GenerateSignInComponents = (isSubmitting: boolean): SignInComponent[] => {
  return [
    {
      disabled: isSubmitting,
      type: "input",
      name: "email",
      inputType: "email",
      placeholder: "Email",
    },
    {
      disabled: isSubmitting,
      type: "input",
      name: "password",
      inputType: "password",
      placeholder: "Password",
    },
  ];
};

export const GenerateSignUpComponents = (isSubmitting: boolean): SignUpComponent[] => {
  return [
    {
      disabled: isSubmitting,
      type: "input",
      name: "email",
      inputType: "email",
      placeholder: "Email",
    },
    {
      disabled: isSubmitting,
      type: "input",
      name: "password",
      inputType: "password",
      placeholder: "Password",
    },
    {
      disabled: isSubmitting,
      type: "input",
      name: "confirmPassword",
      inputType: "password",
      placeholder: "Confirm password",
    },
  ];
};

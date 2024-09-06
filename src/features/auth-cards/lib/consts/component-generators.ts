import { SignInComponent, SignUpComponent } from "../../model/types/auth-schemas.types";

export const GenerateSignInComponents = (): SignInComponent[] => {
  return [
    {
      type: "input",
      name: "email",
      inputType: "email",
      placeholder: "Email",
    },
    {
      type: "input",
      name: "password",
      inputType: "password",
      placeholder: "Password",
    },
  ];
};

export const GenerateSignUpComponents = (): SignUpComponent[] => {
  return [
    {
      type: "input",
      name: "email",
      inputType: "email",
      placeholder: "Email",
    },
    {
      type: "input",
      name: "password",
      inputType: "password",
      placeholder: "Password",
    },
    {
      type: "input",
      name: "confirmPassword",
      inputType: "password",
      placeholder: "Confirm password",
    },
  ];
};

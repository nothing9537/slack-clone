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
      type: "custom-layout",
      name: "sign-up-names-layout",
      className: "grid grid-cols-2 gap-2",
      components: [
        {
          type: "input",
          name: "firstName",
          placeholder: "First name",
          inputType: "text",
        },
        {
          type: "input",
          name: "lastName",
          placeholder: "Last name",
          inputType: "text",
        },
      ],
    },
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

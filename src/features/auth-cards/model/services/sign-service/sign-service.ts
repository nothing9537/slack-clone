import { useAuthActions } from "@convex-dev/auth/react";

import { UseFormReturn } from "react-hook-form";
import { SignInSchemaType, SignUpSchemaType } from "../../types/auth-schemas.types";
import { SignFlow } from "../../types/sign.types";

type IncomeFormType = SignInSchemaType | SignUpSchemaType;

export const useSignService = (flow: SignFlow, form: UseFormReturn<IncomeFormType>) => {
  const { signIn } = useAuthActions();

  return (data: IncomeFormType) => {
    return signIn("password", { ...data, flow })
      .then(() => {
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);

        if (flow === "signIn") {
          form.setError("error", { message: "Credentials are invalid" });
        } else {
          form.setError("error", { message: "Email is already registered" });
        }
      });
  };
};

import { useAuthActions } from "@convex-dev/auth/react";
import { UseFormReturn } from "react-hook-form";

import { isSignUpSchema } from "@/features/auth-cards/lib/utils/type-guards.utils";

import { SignInSchemaType, SignUpSchemaType } from "../../types/auth-schemas.types";
import { SignFlow } from "../../types/sign.types";

type IncomeFormType = SignInSchemaType | SignUpSchemaType;

export const useSignService = (flow: SignFlow, form: UseFormReturn<IncomeFormType>) => {
  const { signIn } = useAuthActions();

  return (data: IncomeFormType) => {
    const userData: { email: string; password: string; name?: string } = {
      email: data.email,
      password: data.password,
    };

    if (flow === "signUp" && isSignUpSchema(data)) {
      userData.name = `${data.firstName} ${data.lastName}`;
    }

    return signIn("password", { ...userData, flow })
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

"use client";

import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

import { FormFactory } from "@/shared/lib/components/form-factory";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

import { SignCardWrapper } from "../sign-card-wrapper/sign-card-wrapper";
import { SignInSchemaType } from "../../model/types/auth-schemas.types";
import { SignInSchema } from "../../lib/consts/auth-schemas.consts";
import { SignCardServices } from "../sign-card-wrapper/sign-card-services";
import { GenerateSignInComponents } from "../../lib/consts/component-generators";

interface SignInCardProps {
  switchCardsAction: () => void; // change card into a sign-up card
}

export const SignInCard: FC<SignInCardProps> = ({ switchCardsAction }) => {
  const form = useForm<SignInSchemaType>({ mode: "all", resolver: zodResolver(SignInSchema) });
  const { signIn } = useAuthActions();
  const githubAction = useCallback(() => signIn("github"), [signIn]);
  const googleAction = useCallback(() => signIn("github"), [signIn]);

  const onSubmit = (data: SignInSchemaType) => {
    console.log(data);

    return new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  };

  return (
    <SignCardWrapper
      headerText="Log-in to continue"
      descriptionText="Use your email or another service to continue."
      form={form}
      footer={{
        description: "Don't have an account?",
        actionText: "Sign Up",
        action: switchCardsAction,
      }}
    >
      <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormFactory<SignInSchemaType>
          form={form}
          components={GenerateSignInComponents()}
        />
        <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader className="animate-spin" /> : "Continue"}
        </Button>
      </form>
      <Separator />
      <SignCardServices
        githubAction={githubAction}
        googleAction={googleAction}
      />
    </SignCardWrapper>
  );
};

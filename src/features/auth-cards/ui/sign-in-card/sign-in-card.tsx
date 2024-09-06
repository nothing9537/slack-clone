"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";

import { FormFactory } from "@/shared/lib/components/form-factory";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

import { SignCardWrapper } from "../sign-card-wrapper/sign-card-wrapper";
import { SignInSchemaType } from "../../model/types/auth-schemas.types";
import { SignInSchema } from "../../lib/consts/auth-schemas.consts";
import { SignCardServices } from "../sign-card-wrapper/sign-card-services";
import { GenerateSignInComponents } from "../../lib/consts/component-generators";

interface SignInCardProps {
  authAction: () => void; // change card into a sign-up card
}

export const SignInCard: FC<SignInCardProps> = ({ authAction }) => {
  const form = useForm<SignInSchemaType>({ mode: "all", resolver: zodResolver(SignInSchema) });

  const onSubmit = (data: SignInSchemaType) => {
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
        action: authAction,
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
      <SignCardServices />
    </SignCardWrapper>
  );
};

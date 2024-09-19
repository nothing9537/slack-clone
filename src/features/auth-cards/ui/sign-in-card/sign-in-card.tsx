"use client";

import { FC, memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";

import { FormFactory } from "@/shared/lib/components/form-factory";
import { Button } from "@/shared/ui/button";

import { SignCardWrapper } from "../sign-card-wrapper/sign-card-wrapper";
import { SignInSchemaType } from "../../model/types/auth-schemas.types";
import { SignInSchema } from "../../lib/consts/auth-schemas.consts";
import { GenerateSignInComponents } from "../../lib/consts/component-generators.consts";
import { BaseSignCardProps } from "../../model/types/sign.types";
import { useSignService } from "../../model/services/sign/sign.service";

export const SignInCard: FC<BaseSignCardProps> = memo(({ switchCardsAction, flow }) => {
  const form = useForm<SignInSchemaType>({ mode: "onTouched", resolver: zodResolver(SignInSchema) });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = useSignService(flow, form);

  return (
    <SignCardWrapper
      errorMessage={form.formState.errors.error?.message}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
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
          components={GenerateSignInComponents(isSubmitting)}
        />
        <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting || isSubmitting}>
          {form.formState.isSubmitting ? <Loader className="animate-spin" /> : "Continue"}
        </Button>
      </form>
    </SignCardWrapper>
  );
});

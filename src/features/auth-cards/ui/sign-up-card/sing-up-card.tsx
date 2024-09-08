"use client";

import { FC, memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";

import { FormFactory } from "@/shared/lib/components/form-factory";
import { Button } from "@/shared/ui/button";

import { SignCardWrapper } from "../sign-card-wrapper/sign-card-wrapper";
import { SignUpSchemaType } from "../../model/types/auth-schemas.types";
import { SignUpSchema } from "../../lib/consts/auth-schemas.consts";
import { GenerateSignUpComponents } from "../../lib/consts/component-generators";
import { BaseSignCardProps } from "../../model/types/sign.types";
import { useSignService } from "../../model/services/sign-service/sign-service";

export const SignUpCard: FC<BaseSignCardProps> = memo(({ switchCardsAction, flow }) => {
  const form = useForm<SignUpSchemaType>({ mode: "all", resolver: zodResolver(SignUpSchema) });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmit = useSignService(flow, form as never);

  return (
    <SignCardWrapper<SignUpSchemaType>
      errorMessage={form.formState.errors.error?.message}
      isSubmitting={isSubmitting || form.formState.isSubmitting}
      setIsSubmitting={setIsSubmitting}
      headerText="Sign-up to continue"
      descriptionText="Use your email or another service to continue."
      form={form}
      footer={{
        actionText: "Sign In",
        description: "Already have an account?",
        action: switchCardsAction,
      }}
    >
      <form className="space-y-2.5" onSubmit={form.handleSubmit(onSubmit)}>
        <FormFactory<SignUpSchemaType>
          form={form}
          components={GenerateSignUpComponents(isSubmitting)}
        />
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader className="animate-spin" /> : "Continue"}
        </Button>
      </form>
    </SignCardWrapper>
  );
});

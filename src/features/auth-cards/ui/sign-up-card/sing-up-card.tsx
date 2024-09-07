"use client";

import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormFactory } from "@/shared/lib/components/form-factory";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";

import { SignCardWrapper } from "../sign-card-wrapper/sign-card-wrapper";
import { SignUpSchemaType } from "../../model/types/auth-schemas.types";
import { SignUpSchema } from "../../lib/consts/auth-schemas.consts";
import { GenerateSignUpComponents } from "../../lib/consts/component-generators";
import { SignCardServices } from "../sign-card-wrapper/sign-card-services";

interface SignInCardProps {
  switchCardsAction: () => void; // change card into a sign-in card
}

export const SignUpCard: FC<SignInCardProps> = ({ switchCardsAction }) => {
  const form = useForm<SignUpSchemaType>({ mode: "all", resolver: zodResolver(SignUpSchema) });

  return (
    <SignCardWrapper<SignUpSchemaType>
      headerText="Sign-up to continue"
      descriptionText="Use your email or another service to continue."
      form={form}
      footer={{
        actionText: "Sign In",
        description: "Already have an account?",
        action: switchCardsAction,
      }}
    >
      <form className="space-y-2.5">
        <FormFactory<SignUpSchemaType>
          form={form}
          components={GenerateSignUpComponents()}
        />
        <Button type="submit" className="w-full" size="lg">
          Continue
        </Button>
      </form>
      <Separator />
      <SignCardServices />
    </SignCardWrapper>
  );
};

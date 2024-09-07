"use client";

import { FC, useCallback, useState } from "react";

import { SignInCard, SignUpCard } from "@/features/auth-cards";

import { SignFlow } from "../../model/types/auth.types";

export const AuthScreen: FC = () => {
  const [signFlow, setSignFlow] = useState<SignFlow>("signIn");

  const setSignIn = useCallback(() => setSignFlow("signIn"), [setSignFlow]);
  const setSignUp = useCallback(() => setSignFlow("signUp"), [setSignFlow]);

  return (
    <div className="md:h-auto md:w-[26rem]">
      {signFlow === "signIn" ? <SignInCard switchCardsAction={setSignUp} /> : <SignUpCard switchCardsAction={setSignIn} />}
    </div>
  );
};

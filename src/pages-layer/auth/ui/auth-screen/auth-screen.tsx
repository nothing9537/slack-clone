"use client";

import { FC, useCallback, useState } from "react";

import { SignFlow, SignInCard, SignUpCard } from "@/features/auth-cards";

export const AuthScreen: FC = () => {
  const [signFlow, setSignFlow] = useState<SignFlow>("signIn");

  const setSignIn = useCallback(() => setSignFlow("signIn"), [setSignFlow]);
  const setSignUp = useCallback(() => setSignFlow("signUp"), [setSignFlow]);

  return (
    <div className="md:h-auto md:w-[26rem]">
      {signFlow === "signIn" ? (
        <SignInCard flow={signFlow} switchCardsAction={setSignUp} />
      ) : (
        <SignUpCard flow={signFlow} switchCardsAction={setSignIn} />
      )}
    </div>
  );
};

"use client";

import { FC, useCallback, useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";
import { SignFlow, SignInCard, SignUpCard } from "@/features/auth-cards";

export const AuthScreen: FC = () => {
  const [signFlow, setSignFlow] = useState<SignFlow>("signIn");
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!path.includes("auth")) {
      router.replace("/auth");
    }
  }, [path, router]);

  const setSignIn = useCallback(() => setSignFlow("signIn"), [setSignFlow]);
  const setSignUp = useCallback(() => setSignFlow("signUp"), [setSignFlow]);

  return (
    signFlow === "signIn" ? (
      <SignInCard flow={signFlow} switchCardsAction={setSignUp} className="m-auto" />
    ) : (
      <SignUpCard flow={signFlow} switchCardsAction={setSignIn} className="m-auto" />
    )
  );
};

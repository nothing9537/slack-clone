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
    <div className="md:h-auto md:w-[26rem]">
      {signFlow === "signIn" ? (
        <SignInCard flow={signFlow} switchCardsAction={setSignUp} />
      ) : (
        <SignUpCard flow={signFlow} switchCardsAction={setSignIn} />
      )}
    </div>
  );
};

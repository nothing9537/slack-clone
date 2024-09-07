"use client";

import { Dispatch, FC, memo, SetStateAction } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/shared/ui/button";

import { SignCallbackReturn } from "../../model/types/sign.types";

interface SignCardServicesProps {
  githubAction: () => Promise<SignCallbackReturn>;
  googleAction: () => Promise<SignCallbackReturn>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

export const SignCardServices: FC<SignCardServicesProps> = memo((props: SignCardServicesProps) => {
  const { githubAction, googleAction, isSubmitting, setIsSubmitting } = props;

  const onServiceAction = (action: () => Promise<SignCallbackReturn>) => {
    setIsSubmitting(true);

    action().finally(() => setIsSubmitting(false));
  };

  return (
    <div className="flex flex-col gap-y-2.5">
      <Button
        disabled={isSubmitting}
        variant="outline"
        size="lg"
        className="w-full relative"
        onClick={() => onServiceAction(googleAction)}
      >
        <FcGoogle className="size-5 absolute left-4 top-3" />
        Continue with Google
      </Button>
      <Button
        disabled={isSubmitting}
        variant="outline"
        size="lg"
        className="w-full relative"
        onClick={() => onServiceAction(githubAction)}
      >
        <FaGithub className="size-5 absolute left-4 top-3" />
        Continue with Github
      </Button>
    </div>
  );
});

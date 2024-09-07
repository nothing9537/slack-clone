"use client";

import { FC } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/shared/ui/button";

import { SignCallbackReturn } from "../../model/types/sign.types";

interface SignCardServicesProps {
  githubAction: () => Promise<SignCallbackReturn>;
  googleAction: () => Promise<SignCallbackReturn>;
}

export const SignCardServices: FC<SignCardServicesProps> = ({ githubAction, googleAction }) => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <Button variant="outline" size="lg" className="w-full relative" onClick={githubAction}>
        <FcGoogle className="size-5 absolute left-4 top-3" />
        Continue with Google
      </Button>
      <Button variant="outline" size="lg" className="w-full relative" onClick={googleAction}>
        <FaGithub className="size-5 absolute left-4 top-3" />
        Continue with Github
      </Button>
    </div>
  );
};

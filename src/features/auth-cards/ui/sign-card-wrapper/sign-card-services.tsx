import React, { FC } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/shared/ui/button";

export const SignCardServices: FC = () => {
  return (
    <div className="flex flex-col gap-y-2.5">
      <Button variant="outline" size="lg" className="w-full relative">
        <FcGoogle className="size-5 absolute left-4 top-3" />
        Continue with Google
      </Button>
      <Button variant="outline" size="lg" className="w-full relative">
        <FaGithub className="size-5 absolute left-4 top-3" />
        Continue with Github
      </Button>
    </div>
  );
};

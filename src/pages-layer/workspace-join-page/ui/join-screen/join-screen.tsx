import { FC } from "react";
import Image from "next/image";

import { JoinForm } from "./join-form";

export const JoinScreen: FC = () => {
  return (
    <div className="flex flex-col gap-y-8 items-center justify-center p-8 shadow-lg rounded-lg max-w-md w-full">
      <Image src="/next.svg" alt="Next Logo" width={300} height={300} className="select-none" />
      <div className="flex flex-col gap-y-4 items-center justify-center w-full">
        <div className="flex flex-col gap-y-2 items-center justify-center">
          <h1 className="text-2xl font-bold">Join workspace</h1>
          <p className="text-lg text-muted-foreground">Enter the workspace join code</p>
        </div>
        <JoinForm />
      </div>
    </div>
  );
};

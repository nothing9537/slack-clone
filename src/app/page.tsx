"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/shared/ui/button";

const Page = () => {
  const { signOut } = useAuthActions();

  return (
    <div>
      Logged in
      <Button onClick={() => signOut()}>
        Log out
      </Button>
    </div>
  );
};

export default Page;

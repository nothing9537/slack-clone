import { useAuthActions } from "@convex-dev/auth/react";
import { useCallback } from "react";

export const useSignActions = () => {
  const { signIn } = useAuthActions();
  const githubAction = useCallback(() => signIn("github"), [signIn]);
  const googleAction = useCallback(() => signIn("google"), [signIn]);

  return {
    githubAction,
    googleAction,
  };
};

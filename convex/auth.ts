import GitHubAuthProvider from "@auth/core/providers/github";
import GoogleAuthProvider from "@auth/core/providers/google";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [GitHubAuthProvider, GoogleAuthProvider],
});

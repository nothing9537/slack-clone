import GitHubAuthProvider from "@auth/core/providers/github";
import GoogleAuthProvider from "@auth/core/providers/google";
import { Password as PasswordProvider } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [PasswordProvider, GitHubAuthProvider, GoogleAuthProvider],
});

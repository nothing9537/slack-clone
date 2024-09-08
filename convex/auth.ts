import GitHubAuthProvider from "@auth/core/providers/github";
import GoogleAuthProvider from "@auth/core/providers/google";
import { Password as PasswordProvider } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

import { DataModel } from "./_generated/dataModel";

const CustomPassword = PasswordProvider<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [CustomPassword, GitHubAuthProvider, GoogleAuthProvider],
});

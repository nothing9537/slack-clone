import { useQuery } from "convex/react";

import { api } from "@convex/_generated/api";
import { User } from "../../types/user.types";

export const useCurrentUser = (): [User, boolean] => {
  const currentUser = useQuery(api.users.currentUser);
  const isLoading = currentUser === undefined;

  return [currentUser, isLoading];
};

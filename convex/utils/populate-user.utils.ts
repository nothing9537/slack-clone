import { Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export const populateUser = (ctx: QueryCtx, id: Id<"users">) => {
  return ctx.db.get(id);
};

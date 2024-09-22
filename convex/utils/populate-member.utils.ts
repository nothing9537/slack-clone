import { Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export const populateMember = (ctx: QueryCtx, memberId: Id<"members">) => {
  return ctx.db.get(memberId);
};

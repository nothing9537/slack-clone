import { Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

export const populateReactions = (ctx: QueryCtx, messageId: Id<"messages">) => {
  return ctx.db
    .query("reactions")
    .withIndex("by_message_id", (q) => q.eq("messageId", messageId))
    .collect();
};

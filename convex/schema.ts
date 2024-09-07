import { defineSchema } from "convex/server";
import { authSchema } from "./auth.schema";

const schema = defineSchema({
  ...authSchema,
});

export default schema;

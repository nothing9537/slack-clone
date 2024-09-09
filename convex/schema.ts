import { defineSchema } from "convex/server";

import { authSchema } from "./models/auth.model";
import { workspaceSchema } from "./models/workspace.model";

const schema = defineSchema({
  ...authSchema,
  workspaces: workspaceSchema,
});

export default schema;

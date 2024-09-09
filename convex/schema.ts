import { defineSchema } from "convex/server";

import { authSchema } from "./models/auth.model";
import { workspaceModel } from "./models/workspace.model";
import { memberModel } from "./models/members.model";

const schema = defineSchema({
  ...authSchema,
  workspaces: workspaceModel,
  members: memberModel,
});

export default schema;

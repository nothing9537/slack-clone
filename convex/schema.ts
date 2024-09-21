import { defineSchema } from "convex/server";

import { authSchema } from "./models/auth.model";
import { workspaceModel } from "./models/workspace.model";
import { memberModel } from "./models/members.model";
import { channelModel } from "./models/channel.model";
import { messageModel } from "./models/messages.model";

const schema = defineSchema({
  ...authSchema,
  workspaces: workspaceModel,
  members: memberModel,
  channels: channelModel,
  messages: messageModel,
});

export default schema;

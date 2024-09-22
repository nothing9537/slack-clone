import { defineSchema } from "convex/server";

import { authSchema } from "./models/auth.model";
import { workspaceModel } from "./models/workspace.model";
import { memberModel } from "./models/member.model";
import { channelModel } from "./models/channel.model";
import { messageModel } from "./models/message.model";
import { conversationModel } from "./models/conversation.model";
import { reactionModel } from "./models/reaction.model";

const schema = defineSchema({
  ...authSchema,
  workspaces: workspaceModel,
  members: memberModel,
  channels: channelModel,
  messages: messageModel,
  conversations: conversationModel,
  reactions: reactionModel,
});

export default schema;

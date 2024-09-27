import { Doc } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";
import { normalizeReactions } from "./normalize-reactions.utils";

import { populateMember } from "./populate-member.utils";
import { populateReactions } from "./populate-reactions.utils";
import { populateThread } from "./populate-thread.utils";
import { populateUser } from "./populate-user.utils";

export const normalizeMessage = (ctx: QueryCtx) => async (message: Doc<"messages">) => {
  const member = await populateMember(ctx, message.memberId);
  const user = member ? await populateUser(ctx, member.userId) : null;

  if (!member || !user) {
    return null;
  }

  const messageReactions = await populateReactions(ctx, message._id);
  const thread = await populateThread(ctx, message._id);
  const images: string[] = [];
  const imageUrlPromises: Promise<string | null>[] = [];

  if (message?.images?.length) {
    for (let i = 0; i < message.images?.length; i += 1) {
      const imageStorageId = message.images[i];

      imageUrlPromises.push(ctx.storage.getUrl(imageStorageId));
    }
  }

  const imageUrls = await Promise.all(imageUrlPromises);

  for (let i = 0; i < imageUrls.length; i += 1) {
    const imageUrl = imageUrls[i];

    if (imageUrl !== null) {
      images.push(imageUrl);
    }
  }

  const reactions = normalizeReactions(messageReactions);

  return {
    ...message,
    images,
    member,
    user,
    reactions,
    threadCount: thread.count,
    threadLastMessageImage: thread.image,
    threadLastMessageTimestamp: thread.timestamp,
    threadLastMessageUserName: thread.name,
  };
};

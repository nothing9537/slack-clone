import { Doc, Id } from "../_generated/dataModel";
import { QueryCtx } from "../_generated/server";

import { populateMember } from "./populate-member.utils";
import { populateReactions } from "./populate-reactions.utils";
import { populateThread } from "./populate-thread.utils";
import { populateUser } from "./populate-user.utils";

type DedupedReactions = (Doc<"reactions"> & { count: number; memberIds: Id<"members">[] })[];

export const normalizeMessages = (ctx: QueryCtx) => async (message: Doc<"messages">) => {
  const member = await populateMember(ctx, message.memberId);
  const user = member ? await populateUser(ctx, member.userId) : null;

  if (!member || !user) {
    return null;
  }

  const reactions = await populateReactions(ctx, message._id);
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

  const normalizedReactions = reactions.map((reaction) => {
    return {
      ...reaction,
      count: reactions.filter((r) => r.unified === reaction.unified).length,
    };
  });

  const dedupedReactions = normalizedReactions
    .reduce((acc, reaction) => {
      const existingReaction = acc.find((r) => r.unified === reaction.unified);

      if (existingReaction) {
        existingReaction.memberIds = Array.from(new Set([...existingReaction.memberIds, reaction.memberId]));
      } else {
        acc.push({ ...reaction, memberIds: [reaction.memberId] });
      }

      return acc;
    }, [] as DedupedReactions)
    .map(({ memberId: _memberId, ...rest }) => rest);

  return {
    ...message,
    images,
    member,
    user,
    reactions: dedupedReactions,
    threadCount: thread.count,
    threadImage: thread.image,
    threadTimestamp: thread.timestamp,
  };
};

import { Doc, Id } from "../_generated/dataModel";

type DedupedReactions = (Doc<"reactions"> & { count: number; memberIds: Id<"members">[] })[];

export const normalizeReactions = (reactions: Doc<"reactions">[]) => {
  const normalizedReactions = reactions.map((reaction) => {
    return {
      ...reaction,
      count: reactions.filter((r) => r.unified === reaction.unified).length,
    };
  });

  return normalizedReactions
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
};

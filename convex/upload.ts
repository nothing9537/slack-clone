import { ConvexError } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrls = mutation(async (ctx, args: { count: number }) => {
  const { count } = args;

  if (typeof count !== "number") {
    throw new ConvexError({ message: "Count must be an integer." });
  }

  if (count === 0) {
    return [];
  }

  const uploadUrlPromises: Promise<string>[] = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < count; i++) {
    uploadUrlPromises.push(ctx.storage.generateUploadUrl());
  }

  const uploadUrls = await Promise.all(uploadUrlPromises);
  return uploadUrls;
});

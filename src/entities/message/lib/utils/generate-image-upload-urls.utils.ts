import { Id } from "@convex/_generated/dataModel";

/* eslint-disable no-await-in-loop */
export const generateImageStorageURLs = async (images: File[], postUploadURLs: string[]) => {
  const imagesURLs: Id<"_storage">[] = [];

  for (let i = 0; i < images.length; i += 1) {
    const image = images[i];
    const uploadURL = postUploadURLs[i];

    const res = await fetch(uploadURL, {
      method: "POST",
      headers: { "Content-Type": image.type },
      body: image,
    });

    if (res.ok) {
      const { storageId } = await res.json() as { storageId: Id<"_storage"> };

      imagesURLs.push(storageId);
    }
  }

  return imagesURLs;
};

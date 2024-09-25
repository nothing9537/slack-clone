/* eslint-disable no-await-in-loop */
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "sonner";

import { UseFormReturn } from "react-hook-form";
import { useGenerateUploadURLs } from "@/shared/api";

import { Channel } from "@/entities/channel";
import { Id } from "@convex/_generated/dataModel";

import { SendMessageSchemaType } from "../../model/types/message-schemas.types";
import { useSendMessage } from "../../model/services/send-message/send-message.service";

interface UseHandleSendMessageOptions {
  setForceEditorRerender: Dispatch<SetStateAction<number>>;
  channel: NonNullable<Channel>;
  form: UseFormReturn<SendMessageSchemaType>;
}

export const useHandleSendMessage = (options: UseHandleSendMessageOptions) => {
  const { channel } = options;

  const generateImageUploadURLs = useGenerateUploadURLs({
    onError: (errorMessage) => {
      toast.error("Images action", {
        description: errorMessage || "Generate upload images URL.",
      });
    },
  });

  const sendMessage = useSendMessage({
    workspaceId: channel.workspaceId,
    channelId: channel._id,
  }, {
    onSettled: () => {
      options.form.reset({});

      options.setForceEditorRerender((prev) => prev + 1);
    },
  });

  const cb = useCallback(async (data: SendMessageSchemaType) => {
    const imageUploadURLS = await generateImageUploadURLs(data.images?.length || 0);
    const imagesURLs: Id<"_storage">[] = [];

    if (imageUploadURLS && data.images?.length) {
      const { images } = data;

      for (let i = 0; i < images.length; i += 1) {
        const image = images[i];
        const uploadURL = imageUploadURLS[i];

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
    }

    return sendMessage(data, imagesURLs);
  }, [sendMessage, generateImageUploadURLs]);

  return cb;
};

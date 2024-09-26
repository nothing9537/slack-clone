/* eslint-disable no-await-in-loop */
import { Dispatch, SetStateAction, useCallback } from "react";
import { toast } from "sonner";

import { UseFormReturn } from "react-hook-form";
import { useGenerateUploadURLs } from "@/shared/api";

import { Channel } from "@/entities/channel";
import { Id } from "@convex/_generated/dataModel";

import { SendMessageSchemaType } from "../../model/types/message-schemas.types";
import { useSendMessage } from "../../model/services/send-message/send-message.service";
import { generateImageStorageURLs } from "../utils/generate-image-upload-urls.utils";

interface UseHandleSendMessageOptions {
  setForceEditorRerender: Dispatch<SetStateAction<number>>;
  channel: NonNullable<Channel>;
  form: UseFormReturn<SendMessageSchemaType>;
  parentMessageId?: Id<"messages">;
}

export const useHandleSendMessage = (options: UseHandleSendMessageOptions) => {
  const { channel, parentMessageId } = options;

  const generateImageUploadURLs = useGenerateUploadURLs({
    onError: (errorMessage) => {
      toast.error("Images action", {
        description: errorMessage || "Failed to generate upload images URL.",
      });
    },
  });

  const sendMessage = useSendMessage({
    workspaceId: channel.workspaceId,
    channelId: channel._id,
    parentMessageId,
  }, {
    onSettled: () => {
      options.form.reset({});

      options.setForceEditorRerender((prev) => prev + 1);
    },
  });

  const cb = useCallback(async (data: SendMessageSchemaType) => {
    const imageUploadURLs = await generateImageUploadURLs(data.images?.length || 0);
    const imagesURLs: Id<"_storage">[] = [];

    if (imageUploadURLs && data.images?.length) {
      const { images } = data;

      const storageIDs = await generateImageStorageURLs(images, imageUploadURLs);

      imagesURLs.push(...storageIDs);
    }

    return sendMessage(data, imagesURLs);
  }, [sendMessage, generateImageUploadURLs]);

  return cb;
};

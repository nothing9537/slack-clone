/* eslint-disable no-await-in-loop */
import { Dispatch, MouseEvent, SetStateAction, useCallback } from "react";
import { toast } from "sonner";

import { UseFormReturn } from "react-hook-form";
import { useGenerateUploadURLs } from "@/shared/api";

import { Id } from "@convex/_generated/dataModel";

import { useUpdateMessage } from "../../model/services/edit-message/edit-message.service";
import { Message } from "../../model/types/message-services.types";
import { UpdateMessageSchemaType } from "../../model/types/message-schemas.types";

interface UseHandleUpdateMessageOptions {
  setForceEditorRerender: Dispatch<SetStateAction<number>>;
  handleSetIsEditing: (e?: MouseEvent<HTMLButtonElement>) => void;
  form: UseFormReturn<UpdateMessageSchemaType>;
  message: NonNullable<Message>;
}

export const useHandleUpdateMessage = (options: UseHandleUpdateMessageOptions) => {
  const { message } = options;

  const generateImageUploadURLs = useGenerateUploadURLs({
    onError: (errorMessage) => {
      toast.error("Images action", {
        description: errorMessage || "Generate upload images URL.",
      });
    },
  });

  const updateMessage = useUpdateMessage(message._id, {
    onSuccess: () => {
      toast.success("Message action.", {
        description: "Message updated.",
      });
    },
    onError: (errorMessage) => {
      toast.error("Message action.", {
        description: errorMessage,
      });
    },
    onSettled: () => {
      options.form.reset({});

      options.setForceEditorRerender((prev) => prev + 1);
      options.handleSetIsEditing();
    },
  });

  const cb = useCallback(async (data: UpdateMessageSchemaType) => {
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

    return updateMessage(data, imagesURLs);
  }, [updateMessage, generateImageUploadURLs]);

  return cb;
};

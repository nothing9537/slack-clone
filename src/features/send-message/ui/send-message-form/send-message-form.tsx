/* eslint-disable no-await-in-loop */
import { FC, useCallback, useRef, useState } from "react";
import Quill from "quill";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { toast } from "sonner";

import { Form } from "@/shared/ui/form";
import { Channel } from "@/entities/channel";
import { useGenerateUploadURLs } from "@/shared/api";
import { Id } from "@convex/_generated/dataModel";

import { SendChannelMessageSchemaType } from "../../model/types/send-message-schema.types";
import { SendChannelMessageSchema } from "../../lib/consts/send-message-schema.consts";
import { useSendMessage } from "../../model/services/send-message/send-message.service";

interface SendChannelMessageFormProps {
  channel: NonNullable<Channel>;
}

const EditorLoader = () => (
  <div className="border border-slate-200 rounded-md bg-white flex items-center justify-center h-[120px] mb-8">
    <Loader className="size-4 animate-spin" />
  </div>
);

const Editor = dynamic(
  () => import("@/shared/ui/editor"),
  { ssr: true, loading: EditorLoader },
);

export const SendMessageForm: FC<SendChannelMessageFormProps> = ({ channel }) => {
  const form = useForm<SendChannelMessageSchemaType>({ mode: "onTouched", resolver: zodResolver(SendChannelMessageSchema) });
  const editorRef = useRef<Quill | null>(null);
  const [forceEditorRerender, setForceEditorRerender] = useState(0);

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
      form.reset({});

      setForceEditorRerender((prev) => prev + 1);
    },
  });

  const handleSubmit = useCallback(async (data: SendChannelMessageSchemaType) => {
    const imageUploadURLS = await generateImageUploadURLs(data.images?.length || 0);
    const imagesURLs: Id<"_storage">[] = [];

    if (imageUploadURLS && data.images?.length) {
      const { images } = data;

      // const postUrlPromises: Promise<Response>[] = [];
      // const postUrlResponses: Response[] = [];

      // images.forEach((image, index) => {
      //   const uploadURL = imageUploadURLS[index];

      //   postUrlPromises.push(fetch(uploadURL, {
      //     method: "POST",
      //     headers: { "Content-Type": image.type },
      //     body: image,
      //   }));
      // });

      // Promise.all(postUrlPromises)
      //   .then((responses) => {
      //     responses.forEach((res) => {
      //       if (res.ok) {
      //         postUrlResponses.push(res);
      //       }
      //     });
      //   })
      //   .catch(() => {
      //     toast.error("Image upload action", {
      //       description: "Something went wrong while upload images",
      //     });
      //   });

      // postUrlResponses.forEach((response) => {
      //   response.json().then((res: { storageId: Id<"_storage"> }) => {
      //     imagesURLs.push(res.storageId);
      //   });
      // });

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Editor
          key={forceEditorRerender}
          placeholder={`Message to #${channel.name}`}
          innerRef={editorRef}
          actionButtonType="submit"
          disabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

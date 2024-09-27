/* eslint-disable no-await-in-loop */
import { FC, useRef, useState } from "react";
import Quill from "quill";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";

import { Form } from "@/shared/ui/form";
import { Channel } from "@/entities/channel";

import { SendMessageSchema } from "../../lib/consts/send-message-schema.consts";
import { SendMessageSchemaType } from "../../model/types/message-schemas.types";
import { useHandleSendMessage } from "../../lib/hooks/use-send-message.hook";

interface SendChannelMessageFormProps {
  channel: NonNullable<Channel>;
}

const EditorLoader = () => (
  <div className="border border-slate-200 rounded-md bg-white flex items-center justify-center h-[120px] mb-8">
    <Loader className="size-5 animate-spin" />
  </div>
);

const Editor = dynamic(
  () => import("@/shared/ui/editor"),
  { ssr: true, loading: EditorLoader },
);

export const SendMessageForm: FC<SendChannelMessageFormProps> = ({ channel }) => {
  const form = useForm<SendMessageSchemaType>({ mode: "onTouched", resolver: zodResolver(SendMessageSchema) });
  const editorRef = useRef<Quill | null>(null);
  const [forceEditorRerender, setForceEditorRerender] = useState(0);

  const handleSendMessage = useHandleSendMessage({
    setForceEditorRerender,
    channelId: channel._id,
    workspaceId: channel.workspaceId,
    form,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSendMessage)}>
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

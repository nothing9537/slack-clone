import { FC, useCallback, useRef, useState } from "react";
import Quill from "quill";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader } from "lucide-react";
import { Form } from "@/shared/ui/form";
import { Channel } from "@/entities/channel";

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
  { ssr: false, loading: EditorLoader },
);

export const SendMessageForm: FC<SendChannelMessageFormProps> = ({ channel }) => {
  const form = useForm<SendChannelMessageSchemaType>({ mode: "onTouched", resolver: zodResolver(SendChannelMessageSchema) });
  const editorRef = useRef<Quill | null>(null);
  const [forceEditorRerender, setForceEditorRerender] = useState(0);

  const sendMessage = useSendMessage({
    workspaceId: channel.workspaceId,
    channelId: channel._id,
  });

  const handleSubmit = useCallback((data: SendChannelMessageSchemaType) => {
    setForceEditorRerender((prev) => prev + 1);

    return sendMessage(data);
  }, [sendMessage]);

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

import { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { ClassValue } from "clsx";

import { Message, SendMessageSchema, SendMessageSchemaType, useHandleSendMessage } from "@/entities/message";
import { Form } from "@/shared/ui/form";
import { Channel } from "@/entities/channel";
import { cn } from "@/shared/lib/utils/cn";
import { EditorLoader } from "@/shared/ui/editor-loader";

const Editor = dynamic(() => import("@/shared/ui/editor"), {
  ssr: true,
  loading: EditorLoader,
});

interface ThreadReplyFormProps {
  threadMessage: NonNullable<Message>;
  currentChannel: NonNullable<Channel>;
  className?: ClassValue;
}

export const ThreadReplyForm: FC<ThreadReplyFormProps> = ({ threadMessage, currentChannel, className }) => {
  const form = useForm<SendMessageSchemaType>({ resolver: zodResolver(SendMessageSchema) });
  const [forceEditorRerender, setForceEditorRerender] = useState(0);

  const handleSendMessage = useHandleSendMessage({
    setForceEditorRerender,
    channelId: currentChannel._id,
    workspaceId: currentChannel.workspaceId,
    parentMessageId: threadMessage._id,
    form,
  });

  return (
    <Form {...form}>
      <form className={cn("px-5", className)} onSubmit={form.handleSubmit(handleSendMessage)}>
        <Editor
          key={forceEditorRerender}
          placeholder="Share your thoughts about this thread :)"
          disabled={form.formState.isSubmitting}
          actionButtonType="submit"
        />
      </form>
    </Form>
  );
};

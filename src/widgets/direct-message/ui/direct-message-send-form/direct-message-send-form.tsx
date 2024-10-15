import { FC, memo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { ClassValue } from "clsx";

import { SendMessageSchema, SendMessageSchemaType, useHandleSendMessage } from "@/entities/message";
import { GetOrCreateConversationResponseType } from "@/entities/conversation";
import { PopulatedMember } from "@/entities/member";
import { Form } from "@/shared/ui/form";
import { cn } from "@/shared/lib/utils/cn";
import { EditorLoader } from "@/shared/ui/editor-loader";
import { Id } from "@convex/_generated/dataModel";

const Editor = dynamic(() => import("@/shared/ui/editor"), {
  ssr: true,
  loading: EditorLoader,
});

interface ThreadReplyFormProps {
  workspaceId: Id<"workspaces">;
  conversation: NonNullable<GetOrCreateConversationResponseType>;
  otherMember: NonNullable<PopulatedMember>;
  className?: ClassValue;
}

export const DirectMessageSendForm: FC<ThreadReplyFormProps> = memo(({ className, workspaceId, conversation, otherMember }) => {
  const form = useForm<SendMessageSchemaType>({ resolver: zodResolver(SendMessageSchema) });
  const [forceEditorRerender, setForceEditorRerender] = useState(0);

  const handleSendMessage = useHandleSendMessage({
    setForceEditorRerender,
    workspaceId,
    conversationId: conversation._id,
    form,
  });

  return (
    <Form {...form}>
      <form className={cn("px-5", className)} onSubmit={form.handleSubmit(handleSendMessage)}>
        <Editor
          key={forceEditorRerender}
          placeholder={`Send your private message to ${otherMember.user.name || "Workspace Member"}`}
          disabled={form.formState.isSubmitting}
          actionButtonType="submit"
        />
      </form>
    </Form>
  );
});

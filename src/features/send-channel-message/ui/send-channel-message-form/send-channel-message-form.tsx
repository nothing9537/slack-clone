import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { FC, useRef } from "react";
import Quill from "quill";
import { Editor } from "@/shared/ui/editor";
import { Form } from "@/shared/ui/form";
import { Channel } from "@/entities/channel";

import { SendChannelMessageSchemaType } from "../../model/types/send-channel-message-schema.types";
import { SendChannelMessageSchema } from "../../lib/consts/send-channel-message-schema.consts";

interface SendChannelMessageFormProps {
  channel: NonNullable<Channel>;
}

export const SendChannelMessageForm: FC<SendChannelMessageFormProps> = ({ channel }) => {
  const form = useForm<SendChannelMessageSchemaType>({ mode: "onTouched", resolver: zodResolver(SendChannelMessageSchema) });
  const editorRef = useRef<Quill | null>(null);

  return (
    <Form {...form}>
      <form>
        <Editor
          placeholder={`Message to # ${channel.name}`}
          onChange={async () => { }}
          innerRef={editorRef}
        />
      </form>
    </Form>
  );
};

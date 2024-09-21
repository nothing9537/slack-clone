import { FC, useRef } from "react";
import Quill from "quill";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader } from "lucide-react";
import { Form } from "@/shared/ui/form";
import { Channel } from "@/entities/channel";

import { SendChannelMessageSchemaType } from "../../model/types/send-channel-message-schema.types";
import { SendChannelMessageSchema } from "../../lib/consts/send-channel-message-schema.consts";

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

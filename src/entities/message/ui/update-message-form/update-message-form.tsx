import Quill from "quill";
import { FC, MouseEvent, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import dynamic from "next/dynamic";

import { Form } from "@/shared/ui/form";

import { UpdateMessageSchema } from "../../lib/consts/update-message-schema.consts";
import { UpdateMessageSchemaType } from "../../model/types/message-schemas.types";
import { Message } from "../../model/types/message-services.types";
import { useHandleUpdateMessage } from "../../lib/hooks/use-update-message.hook";

const EditorLoader = () => (
  <div className="border border-slate-200 rounded-md bg-white flex items-center justify-center h-[120px] mb-8">
    <Loader className="size-5 animate-spin" />
  </div>
);

const Editor = dynamic(
  () => import("@/shared/ui/editor"),
  { ssr: true, loading: EditorLoader },
);

interface UpdateMessageFormProps {
  handleSetIsEditing: (e?: MouseEvent<HTMLButtonElement>) => void;
  item: NonNullable<Message>;
  messageImages: File[];
}

export const UpdateMessageForm: FC<UpdateMessageFormProps> = ({ handleSetIsEditing, item, messageImages }) => {
  const form = useForm<UpdateMessageSchemaType>({ mode: "onTouched", resolver: zodResolver(UpdateMessageSchema) });
  const editorRef = useRef<Quill | null>(null);
  const [forceEditorRerender, setForceEditorRerender] = useState(0);

  const handleUpdateMessage = useHandleUpdateMessage({
    form,
    message: item,
    setForceEditorRerender,
    handleSetIsEditing,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleUpdateMessage)}>
        <Editor
          key={forceEditorRerender}
          defaultValue={JSON.parse(item.body)}
          variant="update"
          onCancel={handleSetIsEditing}
          initialImages={item.images.length ? messageImages : []}
          placeholder="Edit your message..."
          actionButtonType="submit"
          innerRef={editorRef}
          disabled={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
};

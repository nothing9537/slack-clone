import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Workspace } from "@/entities/workspace";
import { FormFactory } from "@/shared/lib/components";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { useModal } from "@/shared/lib/hooks";

import { CreateChannelSchema } from "../../lib/consts/create-channel-schema.consts";
import { CreateChannelSchemaType } from "../../model/types/create-channel-schema.types";
import { useCreateChannel } from "../../model/services/create-channel/create-channel.service";

interface CreateChannelModalFormProps {
  workspace: NonNullable<Workspace>;
}

export const CreateChannelModalForm: FC<CreateChannelModalFormProps> = ({ workspace }) => {
  const form = useForm<CreateChannelSchemaType>({ mode: "onTouched", resolver: zodResolver(CreateChannelSchema) });
  const { onClose } = useModal();

  const onSubmit = useCreateChannel(workspace._id, {
    onError(errorMessage) {
      toast.error("Channel action", {
        description: errorMessage,
      });
    },
    onSuccess(id, { name }) {
      form.reset();

      onClose();

      toast.success("Channel action", {
        description: `Channel: '${name}' in workspace '${workspace.name}' has been created successfully!`,
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormFactory
          form={form}
          components={[
            {
              type: "input",
              name: "name",
              placeholder: "Enter channel name, e.g. plan-budget",
              valueAs: (value) => value.replace(/\s+/g, "-").toLowerCase(),
            },
          ]}
        />
        <div className="flex justify-end mt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Channel } from "@/entities/channel";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Form } from "@/shared/ui/form";
import { FormFactory } from "@/shared/lib/components";
import { Button } from "@/shared/ui/button";

import { UpdateChannelSchemaType } from "../../model/types/mutate-channel-schema.types";
import { UpdateChannelSchema } from "../../lib/consts/update-channel-schema.consts";
import { useMutateChannel } from "../../model/services/mutate-channel/mutate-channel.service";

interface EditChannelProps {
  channel: NonNullable<Channel>;
  isAdmin: boolean;
}

export const EditChannel: FC<EditChannelProps> = ({ channel, isAdmin }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const form = useForm<UpdateChannelSchemaType>({ mode: "onTouched", resolver: zodResolver(UpdateChannelSchema) });

  const handleOpenChange = useCallback((isOpen: boolean) => {
    if (!isAdmin) {
      return;
    }

    setIsEditModalOpen(isOpen);
  }, [setIsEditModalOpen, isAdmin]);

  const onSubmit = useMutateChannel(channel._id, {
    onError(errorMessage) {
      toast.error("Channel action", {
        description: errorMessage,
      });
    },
    onSuccess(_, { name }) {
      form.reset();

      setIsEditModalOpen(false);

      toast.success("Channel action", {
        description: `Channel name has been successfully changed to '${name}'!`,
      });
    },
  });

  return (
    <Dialog open={isEditModalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Channel name</p>
            {isAdmin && (
              <p className="text-sm text-[#126483] hover:underline">Edit</p>
            )}
          </div>
          <p className="text-sm">
            #
            {" "}
            {channel.name}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Rename this channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormFactory
              form={form}
              components={[
                {
                  type: "input",
                  name: "name",
                  placeholder: "Enter new channel name",
                  valueAs: (value) => value.replace(/\s+/g, "-").toLowerCase(),
                },
              ]}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={form.formState.isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

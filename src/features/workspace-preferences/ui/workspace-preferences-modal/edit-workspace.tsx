import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Workspace } from "@/entities/workspace";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Form } from "@/shared/ui/form";
import { FormFactory } from "@/shared/lib/components";
import { Button } from "@/shared/ui/button";

import { UpdateWorkspaceSchemaType } from "../../model/types/mutate-workspace-schema.types";
import { UpdateWorkspaceSchema } from "../../lib/consts/update-workspace-schema.consts";
import { useMutateWorkspace } from "../../model/services/mutate-workspace/mutate-workspace.service";

interface EditWorkspaceProps {
  workspace: NonNullable<Workspace>;
}

export const EditWorkspace: FC<EditWorkspaceProps> = ({ workspace }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const form = useForm<UpdateWorkspaceSchemaType>({ mode: "all", resolver: zodResolver(UpdateWorkspaceSchema) });

  const onSubmit = useMutateWorkspace(workspace._id, {
    onError(errorMessage) {
      toast.error("Workspace action", {
        description: errorMessage,
      });
    },
    onSuccess(_, { name }) {
      form.reset();

      setIsEditModalOpen(false);

      toast.success("Workspace action", {
        description: `Workspace name has been successfully changed to ${name}!`,
      });
    },
  });

  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogTrigger asChild>
        <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Workspace name</p>
            <p className="text-sm text-[#1264a3] hover:underline font-semibold">Edit</p>
          </div>
          <p>{workspace.name}</p>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>
            Rename this workspace
          </DialogTitle>
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormFactory
                form={form}
                components={[
                  { type: "input", name: "name", placeholder: "Enter new workspace name" },
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
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

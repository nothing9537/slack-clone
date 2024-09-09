"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { FormFactory } from "@/shared/lib/components/form-factory";

import { CreateWorkspaceSchema } from "../../lib/consts/create-workspace-schema.consts";
import { CreateWorkspaceSchemaType } from "../../model/types/create-workspace-schema.types";
import { useCreateWorkspace } from "../../model/services/create-workspace/create-workspace.service";

export const CreateWorkspaceForm: FC = () => {
  const form = useForm<CreateWorkspaceSchemaType>({ mode: "all", resolver: zodResolver(CreateWorkspaceSchema) });
  const router = useRouter();

  const onSubmit = useCreateWorkspace({
    onError(errorMessage) {
      toast.error("Workspace action", {
        description: errorMessage,
      });
    },
    onSuccess(id, name) {
      router.push(`/workspace/${id}`);

      toast.success("Workspace action", {
        description: `Workspace: '${name}' has been created successfully!`,
      });
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormFactory
          form={form}
          components={[
            {
              type: "input",
              name: "name",
              placeholder: "Workspace name e.g. 'Work', 'Personal', ...",
            },
            {
              type: "custom",
              name: "create-workspace-form-create-button",
              element: (
                <div className="flex justify-end">
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    Create
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </form>
    </Form>
  );
};

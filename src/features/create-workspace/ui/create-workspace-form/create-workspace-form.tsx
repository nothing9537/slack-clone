"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import Link from "next/link";
import { Form } from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { FormFactory } from "@/shared/lib/components";
import { useModal } from "@/shared/lib/hooks";

import { CreateWorkspaceSchema } from "../../lib/consts/create-workspace-schema.consts";
import { CreateWorkspaceSchemaType } from "../../model/types/create-workspace-schema.types";
import { useCreateWorkspace } from "../../model/services/create-workspace/create-workspace.service";

export const CreateWorkspaceForm: FC = () => {
  const form = useForm<CreateWorkspaceSchemaType>({ mode: "onTouched", resolver: zodResolver(CreateWorkspaceSchema) });
  const { onClose } = useModal();
  const router = useRouter();

  const onSubmit = useCreateWorkspace({
    onError(errorMessage) {
      toast.error("Workspace action", {
        description: errorMessage,
      });
    },
    onSuccess(id, { name }) {
      onClose();

      toast.success("Workspace action", {
        description: `Workspace: '${name}' has been created successfully!`,
      });

      router.push(`/workspace/${id}`);
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
                <div className="flex justify-between">
                  <Link href="/join">
                    <Button variant="outline" onClick={onClose}>
                      Go to join page
                    </Button>
                  </Link>
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

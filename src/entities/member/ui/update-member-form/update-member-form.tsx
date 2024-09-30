import { FC, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Form } from "@/shared/ui/form";
import { FormFactory } from "@/shared/lib/components";
import { useConfirmModal } from "@/shared/lib/hooks";
import { Button } from "@/shared/ui/button";
import { Id } from "@convex/_generated/dataModel";

import { UpdateMemberSchema } from "../../lib/consts/update-member.schema";
import { UpdateMemberSchemaType } from "../../model/types/update-member-schema.types";
import { useUpdateMember } from "../../model/services/update-member/update-member.service";

interface UpdateMemberFormProps {
  memberId: Id<"members">;
  defaultValue: "admin" | "member";
}

export const UpdateMemberForm: FC<UpdateMemberFormProps> = ({ memberId, defaultValue }) => {
  const form = useForm<UpdateMemberSchemaType>({ resolver: zodResolver(UpdateMemberSchema) });
  const [ConfirmDialog, confirm] = useConfirmModal({
    title: "Edit member role",
    description: "Are you sure you want to edit this member's role?",
  });

  const handleUpdateMember = useUpdateMember(memberId, {
    onSuccess: () => {
      toast.success("Member action", {
        description: "Member has been successfully updated.",
      });
    },
    onError: (errorMessage) => {
      toast.error("Member action", {
        description: errorMessage,
      });
    },
  });

  const onUpdate = useCallback(async (values: UpdateMemberSchemaType) => {
    const isConfirmed = await confirm();

    if (!isConfirmed) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return handleUpdateMember(values);
  }, [confirm, handleUpdateMember]);

  return (
    <>
      <ConfirmDialog />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="flex flex-col gap-2">
          <FormFactory
            form={form}
            components={[
              {
                type: "radio-group",
                name: "role",
                defaultValue,
                overviewProps: { label: "Member's role" },
                direction: "horizontal",
                items: [
                  { label: "Admin", value: "admin", className: "text-rose-500" },
                  { label: "Member", value: "member" },
                ],
              },
            ]}
          />
          <Button type="submit" disabled={form.formState.isSubmitting} size="sm" className="ml-auto">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

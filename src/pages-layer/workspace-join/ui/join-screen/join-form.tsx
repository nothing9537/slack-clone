import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Form } from "@/shared/ui/form";
import { FormFactory } from "@/shared/lib/components";
import { Button } from "@/shared/ui/button";

import { JoinSchema } from "../../lib/consts/join-form-schema.consts";
import { JoinFormSchema } from "../../model/types/join-form-schema.types";
import { useJoinWorkspace } from "../../model/services/join-workspace/join-workspace";

export const JoinForm: FC = () => {
  const router = useRouter();

  const form = useForm<JoinFormSchema>({
    resolver: zodResolver(JoinSchema),
    mode: "onTouched",
    defaultValues: {
      pin: "",
    },
  });

  const joinHandler = useJoinWorkspace({
    onError(errorMessage) {
      toast.error("Workspace action", {
        description: errorMessage,
      });
    },
    onSuccess(id, { pin }) {
      toast.success("Workspace action", {
        description: `You have successfully joined the code workspace: ${pin}.`,
      });

      router.replace(`/workspace/${id}`);
    },
  });

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(joinHandler)}>
        <FormFactory
          form={form}
          components={[
            {
              type: "input-otp",
              name: "pin",
              pattern: REGEXP_ONLY_DIGITS_AND_CHARS,
              valueAs: (v) => v.toUpperCase(),
              className: "mx-auto",
              overviewProps: {
                formFieldDescription: "Enter the workspace join code which you received from the workspace member.",
              },
            },
          ]}
        />
        <div className="flex justify-between items-center mt-8">
          <Link href="/">
            <Button type="button" variant="outline" disabled={form.formState.isSubmitting}>
              Back to home
            </Button>
          </Link>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Join
          </Button>
        </div>
      </form>
    </Form>
  );
};

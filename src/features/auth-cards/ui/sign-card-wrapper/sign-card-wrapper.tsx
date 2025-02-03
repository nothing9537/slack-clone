import { Dispatch, ReactNode, SetStateAction } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { TriangleAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";
import { Separator } from "@/shared/ui/separator";
import { Mounted } from "@/shared/lib/components";
import { cn } from "@/shared/lib/utils/cn";

import { useSignActions } from "../../lib/hooks/use-sign-actions";
import { SignCardServices } from "./sign-card-services";

interface SignCardWrapperProps<T extends FieldValues> {
  errorMessage?: string;
  headerText: string;
  descriptionText: string;
  children: ReactNode;
  form: UseFormReturn<T>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  className?: string;
  footer: {
    actionText: string;
    description: string;
    action: () => void;
  }
}

export const SignCardWrapper = <T extends FieldValues>(props: SignCardWrapperProps<T>) => {
  const { headerText, descriptionText, children, form, footer, isSubmitting, setIsSubmitting, errorMessage, className } = props;
  const { googleAction, githubAction } = useSignActions();

  return (
    <Mounted>
      <Card className={cn("sm:max-w-md w-full p-8", className)}>
        <CardHeader className="px-0 pt-0">
          <CardTitle>
            {headerText}
          </CardTitle>
          <CardDescription>
            {descriptionText}
          </CardDescription>
        </CardHeader>
        {!!errorMessage && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6 dark:bg-destructive/80">
            <TriangleAlert className="size-4" />
            <p>{errorMessage}</p>
          </div>
        )}
        <CardContent className="space-y-4 px-0 pb-0">
          <Form {...form}>
            {children}
            <Separator />
            <SignCardServices
              githubAction={githubAction}
              googleAction={googleAction}
              isSubmitting={isSubmitting}
              setIsSubmitting={setIsSubmitting}
            />
          </Form>
          <p className="text-sm text-muted-foreground">
            {footer.description}
            {" "}
            <button
              type="button"
              className="text-sky-700 hover:underline cursor-pointer"
              onClick={footer.action}
            >
              {footer.actionText}
            </button>
          </p>
        </CardContent>
      </Card>
    </Mounted>
  );
};

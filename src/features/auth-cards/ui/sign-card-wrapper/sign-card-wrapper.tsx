import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";

interface SignCardWrapperProps<T extends FieldValues> {
  headerText: string;
  descriptionText: string;
  children: ReactNode;
  form: UseFormReturn<T>;
  footer: {
    actionText: string;
    description: string;
    action: () => void;
  }
}

export const SignCardWrapper = <T extends FieldValues>(props: SignCardWrapperProps<T>) => {
  const { headerText, descriptionText, children, form, footer } = props;

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          {headerText}
        </CardTitle>
        <CardDescription>
          {descriptionText}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        <Form {...form}>
          {children}
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
  );
};

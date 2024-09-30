import { FC, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

interface ErrorPageProps {
  error?: string;
  stack?: string;
  errorMessage: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ errorMessage, error, stack }) => {
  const router = useRouter();

  const onHomeReturn = useCallback(() => {
    router.replace("/");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }, [router]);

  return (
    <div className="size-full grid items-center justify-center p-4">
      <Card className="h-fit w-full max-w-4xl shadow-lg overflow-y-auto app-scrollbar m-auto">
        <CardHeader>
          <CardTitle>Oops! Your interface has been crashed :(</CardTitle>
          <CardTitle>Very sorry to hear that you are seeing this screen.</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">
            {errorMessage}
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="error-message">
              <AccordionTrigger>Show error message</AccordionTrigger>
              <AccordionContent>
                {JSON.stringify(error)}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="call-stack">
              <AccordionTrigger>Show call stack</AccordionTrigger>
              <AccordionContent className="overflow-y-auto max-h-40 h-full app-scrollbar">
                {JSON.stringify(stack)}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <Button onClick={onHomeReturn} className="ml-auto">
            Go to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

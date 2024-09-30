/* eslint-disable no-console */
import { Component, ErrorInfo, ReactNode, Suspense } from "react";

import { ErrorPage } from "@/pages-layer/error";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: string;
  stack?: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error);

    return { hasError: true, error: error.message, stack: error.stack };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    const { hasError, error, stack } = this.state;
    const { children } = this.props;

    let errorMessage = error || "An unexpected error occurred";

    if (errorMessage.includes("does not match validator")) {
      errorMessage = "Please do not edit the parameters in the URL bar manually. This may cause errors of this kind.";
    }

    if (hasError) {
      return (
        <Suspense fallback="">
          <ErrorPage
            errorMessage={errorMessage}
            error={error}
            stack={stack}
          />
        </Suspense>
      );
    }

    return children;
  }
}

"use client";

import { ArrowLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as React from "react";

const ErrorPage: React.FC<{
  error: Error | string;
  reset: () => void;
}> = ({ error, reset }) => {
  const router = useRouter();
  let displayText: string;

  if (error instanceof Error) {
    displayText = error.message;
  } else {
    displayText = error;
  }

  return (
    <div className="flex flex-col gap-2 items-center p-2">
      <div className="flex flex-col items-center p-2">
        <h1 className="text-4xl font-bold">Something went wrong</h1>
        <p>{displayText}</p>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <Button
          variant={"ghost"}
          onClick={() => router.back()}
          className="gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Go back
        </Button>
        <Button onClick={() => reset()}>Retry</Button>
        <Button variant={"secondary"} onClick={() => router.refresh()}>
          Refresh Page
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;

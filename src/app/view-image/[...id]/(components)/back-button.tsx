"use client";

import { ArrowLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as React from "react";

export const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="w-5 h-5" />
    </Button>
  );
};
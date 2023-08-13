"use client";

import { ArrowLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import * as React from "react";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 items-center p-2">
      <div className="flex flex-col items-center p-2">
        <h1 className="text-4xl font-bold">404 | Page Not Found</h1>
        <p>The page you were looking for does not exist.</p>
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
      </div>

      <div>
        <Image
          src={"/spongebob.png"}
          priority
          fetchPriority="high"
          loading="eager"
          alt="Spongebob sad"
          width={320}
          height={320}
        />
      </div>
    </div>
  );
};

export default NotFound;
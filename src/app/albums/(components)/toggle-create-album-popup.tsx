"use client";

import * as React from "react";

import { AlbumIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export const ToggleCreateAlbumPopup: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      aria-label="Create an album"
      onClick={() => router.push(`${pathname}/?showModal=true`)}
      className="gap-2"
    >
      <AlbumIcon className="w-5 h-5" />
      Create Album
    </Button>
  );
};

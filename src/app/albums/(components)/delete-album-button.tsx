"use client";

import { DeleteIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

export const DeleteAlbumButton: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <React.Fragment>
      <Button
        onClick={() =>
          router.push(`${location.origin}/${pathname}?deleteAlbum=true`)
        }
        className="text-center gap-2"
        variant={"secondary"}
      >
        <DeleteIcon className="w-5 h-5" />
        <span className="flex-1">Delete Album</span>
      </Button>
    </React.Fragment>
  );
};

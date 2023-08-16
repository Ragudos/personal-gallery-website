"use client";

import * as React from "react";

import { deleteAlbum } from "@/app/actions/cloudinary";

import { DeleteIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const DeleteAlbumButton: React.FC<{ params: string }> = ({ params }) => {
  const [transition, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <Button
      aria-label="Delete a folder"
      onClick={() => {
        if (!transition) {
          toast({
            title: "Deleting album...",
            description: "The album is being deleted.",
          });
          startTransition(async () => {
            try {
              await deleteAlbum(params);
              toast({
                title: "Deleted album",
                description: "The album has been deleted.",
              });
            } catch (error) {
              if (error instanceof Error) {
                toast({
                  title: "Something went wrong",
                  description: error.message,
                });
              } else if (typeof error === "string") {
                toast({
                  title: "Something went wrong",
                  description: error,
                });
              } else {
                toast({
                  title: "Something went wrong",
                });
              }
            }
            router.refresh();
          });
        }
      }}
      variant={"secondary"}
      className="gap-2"
    >
      <DeleteIcon className="w-5 h-5" />
      <span className="flex-1">Delete Album</span>
    </Button>
  );
};

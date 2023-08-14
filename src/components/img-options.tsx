"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { AlbumIcon, DeleteIcon, HeartIcon } from "./icons";
import { deleteImage, setAsFavorite } from "@/app/actions/cloudinary";
import { useToast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ImageOptionsProps {
  imgPublicId: string;
  isImageFavorite: boolean;
  isBeingDeleted: boolean;
  onDelete: () => void;
  onStartDeletion: () => void;
}

export const ImageOptions: React.FC<ImageOptionsProps> = ({
  imgPublicId,
  isImageFavorite,
  isBeingDeleted,
  onDelete,
  onStartDeletion,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [transition, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(isImageFavorite);

  const onPopoverClose = () => {
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(openState) => {
        setOpen(openState);
        if (!openState) {
          onPopoverClose();
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "w-7 h-7 gap-[0.1rem] p-0 hover:bg-foreground/80 rounded-full bg-foreground",
            { "cursor-not-allowed pointer-events-none": isBeingDeleted },
          )}
        >
          {[1, 2, 3].map((num) => (
            <span
              key={num}
              className="w-[0.25rem] h-[0.2rem] rounded-full bg-background inline-block"
            />
          ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-20 relative">
        <div className="m-2 flex flex-col gap-2 p-4 shadow-md shadow-background/50 min-w-[14rem] min-h-[7rem] rounded-lg bg-foreground text-background">
          <p className="font-medium px-2">Move, Favorite, & Delete</p>
          <div className="flex flex-col gap-2">
            <Button
              aria-label={isFavorite ? "Unset image as favorite" : "Set image as favorite"}
              variant={"ghost"}
              className={cn("group p-1 md:text-base font-normal", {
                "pointer-events-none": isBeingDeleted,
              })}
              onClick={() => {
                // for optimistic updates
                onPopoverClose();
                if (!transition) {
                  setIsFavorite((prev) => !prev);
                  startTransition(async () => {
                    try {
                      await setAsFavorite(imgPublicId, isFavorite);
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
                      }
                    }
                    router.refresh();
                  });
                }
              }}
            >
              <HeartIcon className={`w-6 h-6${isFavorite ? " fill-red-500 stroke-red-500" : ""} `} />
              <span className="flex-1">{isFavorite ? "Unset as favorite" : "Set as favorite"}</span>
            </Button>
            <Button
              aria-label="Delete image"
              variant={"ghost"}
              className="md:text-base p-1 w-full justify-between font-normal"
              onClick={() => {
                onPopoverClose();
                router.push(`${pathname}?addToAlbum=true&imageId=${imgPublicId}`);
              }}
            >
              <AlbumIcon className="w-5 h-5" />
              <span className="flex-1">Move to an album</span>
            </Button>
            <Button
              aria-label="Delete image"
              variant={"ghost"}
              className="md:text-base p-1 w-full justify-between font-normal"
              onClick={async () => {
                toast({
                  title: "Deleting image...",
                  description: "Your image is being deleted...",
                });
                onPopoverClose();
                onStartDeletion();
                startTransition(async () => {
                  if (!transition) {
                    try {
                      await deleteImage(imgPublicId, pathname);
                      toast({
                        title: "Success!",
                        description: "The image has been deleted",
                        duration: 2000,
                      });
                    } catch (error: unknown) {
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
                      }
                    }
                    router.refresh();
                    onDelete();
                  }
                });
              }}
            >
              <DeleteIcon className="w-5 h-5" />
              <span className="flex-1">Delete image</span>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
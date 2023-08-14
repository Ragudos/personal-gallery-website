"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { DeleteIcon } from "./icons";
import { PinterestShareButton, PinterestIcon } from "react-share";
import { deleteImage } from "@/app/actions/cloudinary";
import { toast } from "./ui/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface ImageOptionsProps {
  imgPublicId: string;
  imgSecureUrl: string;
  isBeingDeleted: boolean;
  onDelete: () => void;
  onStartDeletion: () => void;
}

export const ImageOptions: React.FC<ImageOptionsProps> = ({ imgPublicId, imgSecureUrl, isBeingDeleted, onDelete, onStartDeletion }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [transition, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);

  const onPopoverClose = () => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={(openState) => {
      setOpen(openState);
      if (!openState) {
        onPopoverClose();
      }
    }}>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className={cn(
          "w-7 h-7 gap-[0.1rem] p-0 hover:bg-foreground/80 rounded-full bg-foreground",
          { "cursor-not-allowed pointer-events-none": isBeingDeleted }
        )}>
          {[1, 2, 3].map((num) => (
            <span
              key={num}
              className="w-[0.25rem] h-[0.2rem] rounded-full bg-background inline-block"
            />
          ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-20 relative shadow-xl shadow-foreground/10">
        <div className="m-2 flex flex-col gap-2 p-2 min-w-[14rem] min-h-[7rem] rounded-lg bg-foreground text-background">
          <Button onClick={async () => {
            toast({
              title: "Deleting image...",
              description: "Your image is being deleted..."
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
                    duration: 2000
                  });
                } catch (error: unknown) {
                  if (error instanceof Error) {
                    toast({
                      title: "Something went wrong",
                      description: error.message
                    });
                  } else if (typeof error === "string") {
                    toast({
                      title: "Something went wrong",
                      description: error
                    });
                  }
                };
                router.refresh();
                onDelete();
              }
            });
          }} variant={"ghost"} className="text-base p-1 w-full justify-between">
            <DeleteIcon />
            <span className="flex-1">Delete image</span>
          </Button>
          <Button asChild variant={"ghost"} className="react-share text-base p-1 w-full justify-between" onClick={() => onPopoverClose()}>
            <PinterestShareButton
              media={imgSecureUrl}
              url={`${location.origin}/view-image/${imgPublicId}`}
              resetButtonStyle
            >
              <PinterestIcon className="w-6 h-6 rounded-full" />
              <span className="flex-1">Share on Pinterest</span>
            </PinterestShareButton>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

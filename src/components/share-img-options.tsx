"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Popover } from "./ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { PinterestShareButton, PinterestIcon } from "react-share";
import { UploadIcon } from "./icons";

interface ShareImageOptionsProps {
  imgPublicId: string;
  imgSecureUrl: string;
}

export const ShareImageOptions: React.FC<ShareImageOptionsProps> = ({
  imgPublicId,
  imgSecureUrl,
}) => {
  const [open, setOpen] = React.useState(false);

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
          className="w-7 h-7 p-[0.35rem] hover:bg-foreground/80 rounded-full bg-foreground"
        >
          <UploadIcon className="stroke-background w-full h-full" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-20 relative">
        <div className="m-2 flex flex-col gap-2 p-4 shadow-md shadow-background/50 min-w-[14rem] min-h-[7rem] rounded-lg bg-foreground text-background">
          <p className="font-medium px-2">Share this image</p>
          <div className="flex flex-col gap-2">
            <Button
              asChild
              variant={"ghost"}
              className="react-share text-base p-1 w-full justify-between"
              onClick={() => onPopoverClose()}
            >
              <PinterestShareButton
                media={imgSecureUrl}
                url={`${location.origin}/view-image/${imgPublicId}`}
              >
                <PinterestIcon className="w-6 h-6 rounded-full" />
                <span className="flex-1">Share on Pinterest</span>
              </PinterestShareButton>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

"use client";

import { setAsFavorite } from "@/app/actions/cloudinary";
import { HeartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useOnMount } from "@/lib/hooks/use-on-mount";
import { CldImage } from "next-cloudinary";
import { useRouter } from "next/navigation";
import * as React from "react";

type CloudinaryImageProps = {
  publicId: string;
  alt: string;
  width: number | `${number}`;
  height: number | `${number}`;
  loading?: "eager" | "lazy";
  fetchPriority?: "low" | "high" | "auto";
  priority?: boolean;
  tags: string[];
};

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  width,
  height,
  loading = "lazy",
  fetchPriority = "auto",
  priority = false,
  tags
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [transition, startTransition] = React.useTransition();
  const { toast, dismiss } = useToast();
  const didMount = useOnMount();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = React.useState(tags.includes("favorite"));

  React.useEffect(() => {
    if (didMount) {
      setIsLoading(false);
    }
  }, [didMount]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Skeleton
          style={{
            height: `${parseFloat(height.toString()) * 0.25}px`,
            width: `${parseFloat(width.toString()) * 0.25}px`
          }}
        />
      ) : (
        <div
          className="relative"
          style={{
            maxHeight: `${height}px`,
            maxWidth: `${width}px`
          }}
        >
          <div className="absolute top-1 right-1">
            <Button
              variant={"ghost"}
              size={"icon"}
              className="hover:bg-transparent group p-1"
              aria-label="Click to mark this image as a favorite"
              onClick={() => {
                // for optimistic updates
                if (!transition) {
                  toast({
                    title: `${isFavorite ? "Removing image as favorite" : "Setting image as favorite"}`
                  }, publicId);
                  setIsFavorite((prev) => (!prev));
                  startTransition(async () => {
                    try {
                      await setAsFavorite(publicId, tags.includes("favorite"));
                      dismiss(publicId);
                      toast({
                        title: "Success!"
                      });
                    } catch (error) {
                      console.error(error);
                    }
                    router.refresh();
                  });
                }
              }}
            >
              <HeartIcon className={`group-hover:fill-red-500/80 group-hover:stroke-red-500/80${isFavorite ? " fill-red-500 stroke-red-500" : " stroke-red-700"} group-active:fill-red-500/60 group-active:stroke-red-500/60`} />
            </Button>
          </div>
          <CldImage
            src={publicId}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            fetchPriority={fetchPriority}
            priority={priority}
            className="z-0 rounded-lg shadow-md shadow-foreground/10"
          />
        </div>
      )}
    </React.Fragment>
  );
};
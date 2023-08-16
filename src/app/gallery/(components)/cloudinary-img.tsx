"use client";

import * as React from "react";

import { ImageOptions } from "@/components/img-options";
import { Skeleton } from "@/components/ui/skeleton";
import { useOnMount } from "@/lib/hooks/use-on-mount";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { ShareImageOptions } from "@/components/share-img-options";
import Link from "next/link";

type CloudinaryImageProps = {
  publicId: string;
  alt: string;
  width: number | `${number}`;
  height: number | `${number}`;
  loading?: "eager" | "lazy";
  fetchPriority?: "low" | "high" | "auto";
  priority?: boolean;
  tags: string[];
  secureUrl: string;
  // eslint-disable-next-line no-unused-vars
  onDelete: (publicId: string) => void;
  containerClassName?: string;
};

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  width,
  height,
  loading = "lazy",
  fetchPriority = "auto",
  priority = false,
  tags,
  secureUrl,
  onDelete,
  containerClassName,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const didMount = useOnMount();
  const [isBeingDeleted, setIsBeingDeleted] = React.useState(false);

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
            width: `${parseFloat(width.toString()) * 0.25}px`,
          }}
        />
      ) : (
        <Link
          className={cn(containerClassName, "block relative", {
            "opacity-70 pointer-events-none": isBeingDeleted,
          })}
          style={{
            maxHeight: `${height}px`,
            maxWidth: `${width}px`,
          }}
          href={publicId}
          title={`View this image at ${location.origin}/view-image/${publicId}`}
          aria-label={`View this image at ${location.origin}/view-image/${publicId}`}
        >
          <div className="absolute top-1 right-1 flex items-center gap-1">
            <ShareImageOptions
              imgPublicId={publicId}
              imgSecureUrl={secureUrl}
            />
            <ImageOptions
              imgPublicId={publicId}
              isImageFavorite={tags.includes("favorite")}
              isBeingDeleted={isBeingDeleted}
              onStartDeletion={() => {
                setIsBeingDeleted(true);
              }}
              onDelete={() => {
                setIsBeingDeleted(false);
                onDelete(publicId);
              }}
            />
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
        </Link>
      )}
    </React.Fragment>
  );
};

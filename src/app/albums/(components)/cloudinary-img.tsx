"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOnMount } from "@/lib/hooks/use-on-mount";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import * as React from "react";

type CloudinaryImageProps = {
  publicId: string;
  alt: string;
  width: number | `${number}`;
  height: number | `${number}`;
  loading?: "eager" | "lazy";
  fetchPriority?: "low" | "high" | "auto";
  priority?: boolean;
  className?: string;
};

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  width,
  height,
  loading = "lazy",
  fetchPriority = "auto",
  priority = false,
  className,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const didMount = useOnMount();

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
        <CldImage
          src={publicId}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          priority={priority}
          className={cn(
            "z-0 rounded-lg shadow-md shadow-foreground/10",
            className,
          )}
        />
      )}
    </React.Fragment>
  );
};

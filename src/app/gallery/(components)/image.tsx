"use client";

import { useOnMount } from "@/lib/hooks/use-on-mount";
import { CldImage } from "next-cloudinary";
import * as React from "react";

export const CloudinaryImage: React.FC<{
  src: string;
  width?: `${number}` | number;
  height?: `${number}` | number;
  alt: string;
  sizes: string;
  loading?: "eager" | "lazy"
  fetchPriority?: "high" | "low" | "auto"
  className?: string;
}> = ({
  src,
  width,
  height,
  alt,
  sizes,
  loading = "lazy",
  fetchPriority = "low",
  className = "rounded-lg shadow-lg shadow-foreground/20"
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
      {isLoading && (
        <p>Loading image...</p>
      )}
      {!isLoading && (
        <CldImage
          src={src}
          width={width}
          height={height}
          alt={alt}
          sizes={sizes}
          loading={loading}
          fetchPriority={fetchPriority}
          className={className}
        />
      )}
    </React.Fragment>
  );
};
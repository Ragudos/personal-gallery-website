"use client";

import * as React from "react";

import { ImageKeys } from "@/app/actions/cloudinary";
import { ImageSection } from "@/components/img-section";
import { CloudinaryImage } from "./cloudinary-img";

type ImageSectionProps = {
  resources: ImageKeys[];
};

export const ImgSection: React.FC<ImageSectionProps> = ({ resources }) => {
  const [imgResources, setImgResources] = React.useState(resources);

  const handleResources = (publicId: string) => {
    setImgResources((prevResources) =>
      prevResources.filter((resource) => resource.public_id !== publicId),
    );
  };

  return (
    <React.Fragment>
      <ImageSection
        resources={imgResources}
        getImage={(img, index) => (
          <CloudinaryImage
            key={img.public_id}
            publicId={img.public_id}
            alt={img.filename}
            width={img.width}
            height={img.height}
            loading={index > 10 ? "lazy" : "eager"}
            fetchPriority={index > 10 ? "low" : "high"}
            priority={index <= 10}
            tags={img.tags}
            secureUrl={img.secure_url}
            onDelete={handleResources}
          />
        )}
      />
    </React.Fragment>
  );
};

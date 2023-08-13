"use client";

import * as React from "react";

import { ImageKeys } from "@/app/actions/cloudinary";
import { ImageSection } from "@/components/img-section";
import { CloudinaryImage } from "./cloudinary-img";


type ImageSectionProps = {
  resources: ImageKeys[];
};


export const ImgSection: React.FC<ImageSectionProps> = ({
  resources
}) => {

  return (
    <React.Fragment>
      {!resources.length ? (
        <p>There no images in this album.</p>
      ) : (
        <ImageSection
          resources={resources}
          getImage={
            (img, index) => (
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
              />
            )}
        />
      )}
    </React.Fragment>
  );
};
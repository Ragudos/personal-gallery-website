import { getImages } from "@/app/actions/cloudinary";
import * as React from "react";
import { CloudinaryImage } from "./cloudinary-img";


export const ImageSection: React.FC = async () => {
  const results = await getImages(undefined, "folder:cloudinary-gallery-project AND resource_type:image");
  return (
    <React.Fragment>
      {results.resources.map((img, index) => (
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
      ))}
    </React.Fragment>
  );
};
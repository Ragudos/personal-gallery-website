
import * as React from "react";

import { CloudinaryImage } from "./image";
import { getImages } from "@/app/actions/cloudinary";

export const ImageSection: React.FC = async () => {
  const results = await getImages(undefined, 80);

  return (
    <React.Fragment>
      {results.resources.map((img, index) => (
        <div key={img.public_id}>
          <CloudinaryImage
            src={img.public_id}
            width={img.width}
            height={img.height}
            alt={img.filename}
            sizes="auto"
            loading={index > 10 ? "lazy" : "eager"}
            fetchPriority={index > 10 ? "low" : "high"}
          />
        </div>
      ))}
    </React.Fragment>
  );
};

import * as React from "react";

import { CloudinaryImage } from "./image";
import { getImages } from "@/app/actions/cloudinary";

export const ImageSection: React.FC<{
  next_cursor?: string
}> = async ({ next_cursor }) => {
  const result = await getImages(next_cursor);

  return (
    <React.Fragment>
      {result.resources.map((img, index) => (
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
      {result.next_cursor && (
        <React.Suspense>
          <ImageSection
            next_cursor={result.next_cursor}
          />
        </React.Suspense>
      )}
    </React.Fragment>
  );
};
import * as React from "react";

import { getImages } from "@/app/actions/cloudinary";
import { ImgSection } from "./image-section";

export const GalleryImages: React.FC<{ folderPath: string }> = async ({
  folderPath,
}) => {
  const results = await getImages(
    undefined,
    `folder:${folderPath} AND resource_type:image`,
  );
  return <ImgSection resources={results.resources} />;
};

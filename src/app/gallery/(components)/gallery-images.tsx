import * as React from "react";

import { getImages } from "@/app/actions/cloudinary";
import { ImgSection } from "./image-section";

export const GalleryImages: React.FC = async () => {
  const results = await getImages(undefined, "folder:cloudinary-gallery-project AND resource_type:image");
  return <ImgSection resources={results.resources} />;
};
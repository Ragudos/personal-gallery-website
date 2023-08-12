import * as React from "react";

import { getImages } from "@/app/actions/cloudinary";
import { FavoritesList } from "./favorites-list";

export const ImageSection: React.FC = async () => {
  const results = await getImages(undefined, "folder:cloudinary-gallery-project AND resource_type:image AND tags:favorite");

  return <FavoritesList initialResources={results} />;
};
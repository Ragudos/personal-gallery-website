"use client";

import { SearchResult } from "@/app/actions/cloudinary";
import * as React from "react";
import { CloudinaryImage } from "./cloudinary-img";
import { ImageSection } from "@/components/img-section";

type FavoritesListProps = {
  initialResources: SearchResult;
};

export const FavoritesList: React.FC<FavoritesListProps> = ({
  initialResources,
}) => {
  const [resources, setResources] = React.useState(initialResources.resources);

  React.useEffect(() => {
    setResources(initialResources.resources);
  }, [initialResources]);

  return (
    <React.Fragment>
      <ImageSection
        resources={resources}
        getImage={(img, index) => {
          return (
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
              onUnHeart={(resourceId: string) => {
                setResources((currentResources) => {
                  return currentResources.filter(
                    (resource) => resource.public_id !== resourceId,
                  );
                });
              }}
            />
          );
        }}
      />
    </React.Fragment>
  );
};

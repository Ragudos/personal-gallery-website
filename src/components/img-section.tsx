"use client";

import * as React from "react";

import { ImageKeys } from "@/app/actions/cloudinary";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

type ImageSectionProps = {
  // eslint-disable-next-line no-unused-vars
  getImage: (image: ImageKeys, index: number) => React.ReactNode;
  resources: ImageKeys[];
};

export const ImageSection: React.FC<ImageSectionProps> = ({
  getImage,
  resources
}) => {
  const matches = useMediaQuery("(min-width: 640px)");
  const isInDesktop = useMediaQuery("(min-width: 1280px)");
  const MAX_COLUMNS = isInDesktop
    ? 4
    : matches
      ? 3
      : 2;

  const getColumns = (colIndex: number) => {
    return resources.filter((resouce, idx) => (
      idx % MAX_COLUMNS === colIndex
    ));
  };

  return (
    <React.Fragment>
      {isInDesktop && (
        <React.Fragment>
          {resources.length > 4 ? (
            <React.Fragment>
              {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map((col, index) => (
                <div key={index} className="flex flex-col gap-4">
                  {col.map((img, index) => (getImage(img, index)))}
                </div>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {resources.map((img, index) => (getImage(img, index)))}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {matches && !isInDesktop && (
        <React.Fragment>
          {resources.length > 3 ? (
            <React.Fragment>
              {[getColumns(0), getColumns(1), getColumns(2)].map((col, index) => (
                <div key={index} className="flex flex-col gap-4">
                  {col.map((img, index) => (getImage(img, index)))}
                </div>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {resources.map((img, index) => (getImage(img, index)))}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      {!matches && !isInDesktop && (
        <React.Fragment>
          {resources.length > 2 ? (
            <React.Fragment>
              {[getColumns(0), getColumns(1)].map((col, index) => (
                <div key={index} className="flex flex-col gap-4">
                  {col.map((img, index) => (getImage(img, index)))}
                </div>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {resources.map((img, index) => (getImage(img, index)))}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
import * as React from "react";
import { UploadButton } from "./(components)/upload-button";
import dynamic from "next/dynamic";

const GalleryImages = dynamic(() =>
  import("./(components)/gallery-images").then((module) => {
    return module.GalleryImages;
  }),
);

const GalleryPage: React.FC = () => {
  return (
    <section className="lg:px-8 w-full">
      <div className="flex justify-between gap-4 items-center w-full">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <div className="py-12 gap-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
        <React.Suspense fallback={<p>Loading images...</p>}>
          <GalleryImages />
        </React.Suspense>
      </div>
    </section>
  );
};

export default GalleryPage;

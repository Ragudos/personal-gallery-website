import * as React from "react";
import { UploadButton } from "./(components)/upload-button";

const GalleryPage: React.FC = () => {

  return (
    <section className="px-8 w-full">
      <div className="flex justify-between gap-4 items-center w-full">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <div className="py-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      </div>
    </section>
  );
};

export default GalleryPage;

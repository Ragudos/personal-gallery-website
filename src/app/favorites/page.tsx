import * as React from "react";
import { UploadButton } from "./(components)/upload-button";
import dynamic from "next/dynamic";

const ImageSection = dynamic(() => import("./(components)/img-section").then((module) => {
  return module.ImageSection;
}));

const FavoritesPage: React.FC = () => {

  return (
    <section className="px-8 w-full">
      <div className="flex justify-between gap-4 items-center w-full">
        <h1 className="text-4xl font-bold">Gallery</h1>
        <UploadButton />
      </div>
      <div className="py-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <React.Suspense fallback={<p>Loading images...</p>}>
          <ImageSection />
        </React.Suspense>
      </div>
    </section>
  );
};

export default FavoritesPage;

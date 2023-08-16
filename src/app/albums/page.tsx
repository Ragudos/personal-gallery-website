import * as React from "react";
import dynamic from "next/dynamic";
import { ToggleCreateAlbumPopup } from "./(components)/toggle-create-album-popup";
import { DeleteAlbumButton } from "./(components)/delete-album-button";

const CreateAlbumPopup = dynamic(() => import("./(components)/create-album-popup"));

const AlbumList = dynamic(() =>
  import("./(components)/album-list").then((module) => {
    return module.AlbumList;
  }),
);

const AlbumPage: React.FC = () => {
  return (
    <React.Fragment>
      <section className="lg:px-8 w-full">
        <div className="flex justify-between gap-4 items-center w-full">
          <h1 className="text-4xl font-bold">Albums</h1>
          <div className="flex gap-2 items-center">
            <ToggleCreateAlbumPopup />
            <DeleteAlbumButton />
          </div>
        </div>
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 gap-4 xl:grid-cols-4">
          <React.Suspense fallback={<p>Loading albums...</p>}>
            <AlbumList />
          </React.Suspense>
        </div>
      </section>
      <React.Suspense>
        <CreateAlbumPopup />
      </React.Suspense>
    </React.Fragment>
  );
};

export default AlbumPage;

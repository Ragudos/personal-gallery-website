import { getImages } from "@/app/actions/cloudinary";
import * as React from "react";
import { CloudinaryImage } from "./(components)/cloudinary-img";
import { BackButton } from "./(components)/back-button";

const ImagePage: React.FC<{ params: { id: string[] } }> = async ({
  params: { id }
}) => {
  const image = (await getImages(undefined, `asset_id=${id.slice(-1).join("")}`)).resources[0];

  return (
    <React.Fragment>
      <BackButton />
      <div className="mt-8 p-2 flex flex-col lg:items-center lg:flex-row gap-6">
        <CloudinaryImage
          publicId={image.public_id}
          width={image.width}
          height={image.height}
          alt={image.filename}
        />
      </div>
    </React.Fragment>
  );
};

export default ImagePage;
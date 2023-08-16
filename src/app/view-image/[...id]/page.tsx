import { getImages } from "@/app/actions/cloudinary";
import * as React from "react";
import { CloudinaryImage } from "./(components)/cloudinary-img";

const ImagePage: React.FC<{ params: { id: string[] } }> = async ({
  params: { id }
}) => {
  const image = (await getImages(undefined, `folder:${id.join("/")} AND resource_type:image`, 1)).resources[0];

  return (
    <React.Fragment>
      <div className="p-2">
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
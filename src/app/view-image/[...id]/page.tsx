import { getImages } from "@/app/actions/cloudinary";
import * as React from "react";
import { CloudinaryImage } from "./(components)/cloudinary-img";

const ImagePage: React.FC<{ params: { id: string[] } }> = async ({
  params: { id }
}) => {
  const image = (await getImages(undefined, id.join("/"), 1)).resources[0];

  return (
    <React.Fragment>
      <div className="p-2">
        <CloudinaryImage
          publicId={image.public_id}
          secureUrl={image.secure_url}
          tags={image.tags}
          width={image.width}
          height={image.height}
          onDelete={() => {}}
          alt={image.filename}
        />
      </div>
    </React.Fragment>
  );
};

export default ImagePage;
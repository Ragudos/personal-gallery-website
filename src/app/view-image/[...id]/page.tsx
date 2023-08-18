
import * as React from "react";
import { CloudinaryImage } from "./(components)/cloudinary-img";
import { BackButton } from "./(components)/back-button";
import { getImageData } from "@/app/actions/cloudinary";

const ImagePage: React.FC<{ params: { id: string[] } }> = async ({
  params: { id }
}) => {
  const image = await getImageData(id.join("/"));
  return (
    <React.Fragment>
      <BackButton />
      <div className="mt-8 p-2 flex flex-col lg:flex-row gap-6">
        <CloudinaryImage
          publicId={id.join("/")}
          alt={image.secure_url}
          width={image.width}
          height={image.height}
        />
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">Image from Cloudinary</h1>
          <div className="flex gap-2 items-center">
            Uploaded on:
            <time dateTime={image.created_at}>
              {new Date(image.created_at).toLocaleDateString("en-US", {
                timeZone: "UTC",
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </time>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImagePage;
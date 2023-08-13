import { Folders, ImageKeys, getAlbums } from "@/app/actions/cloudinary";
import * as React from "react";
import { AlbumIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CloudinaryImage } from "./cloudinary-img";

export const AlbumList: React.FC = async () => {
  const { folders, thumbnails } = await getAlbums({
    isWithThumbnail: true
  }) as {
    folders: Folders[],
    thumbnails: {
      folderPath: string,
      thumbnail: ImageKeys
    }[]
  };

  return (
    <React.Fragment>
      {!folders?.length ? (
        <p className="w-full">You currently have no album. Create one?</p>
      ) : null}
      {folders?.map((folder, index) => {
        const { thumbnail, folderPath } = thumbnails[index];

        if (!thumbnail) {
          return (
            <Button asChild variant={"outline"} key={folder.path}>
              <Link href={`/albums/${folder.path}`}>
                <div className="flex justify-between items-center gap-2 p-1 w-full text-center">
                  <AlbumIcon />
                  <p className="w-full">{folder.name}</p>
                </div>
              </Link>
            </Button>
          );
        }
        return (
          <Button
            asChild
            key={folderPath}
            variant={"outline"}
            className="shadow-md shadow-foreground/20 rounded-lg relative aspect-square overflow-hidden p-0 flex-col h-auto group before:absolute before:w-full before:h-full before:inset-0 before:m-auto hover:before:bg-background/20"
          >
            <Link
              aria-label={`View ${folder.name}`}
              title={folder.name}
              href={`/albums/${folderPath}`}
            >
              <div className="w-full h-full">
                <CloudinaryImage
                  publicId={thumbnail.public_id}
                  alt={thumbnail.filename}
                  width={thumbnail.width}
                  height={thumbnail.height}
                  priority={index <= 10}
                  fetchPriority={index > 10 ? "low" : "high"}
                  loading={index > 10 ? "lazy" : "eager"}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full absolute z-10 bottom-0 left-0 flex gap-2 items-center justify-between px-4 py-3 bg-gradient-to-t from-background/80 to-transparent">
                <AlbumIcon className="w-5 h-5" />
                {folder.name}
              </div>
            </Link>
          </Button>
        );
      })}
    </React.Fragment>
  );
};
import { getAlbums } from "@/app/actions/cloudinary";
import * as React from "react";
import { AlbumIcon } from "@/components/icons";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const AlbumList: React.FC = async () => {
  const { folders, thumbnails } = await getAlbums({
    isWithThumbnail: true
  });

  return (
    <React.Fragment>
      {!folders?.length ? (
        <p className="w-full">You currently have no album. Create one ?</p>
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
          <div key={folder.path}>
            <div>
              <CldImage
                src={thumbnail.public_id}
                alt={thumbnail.filename}
                width={thumbnail.width}
                height={thumbnail.height}
                sizes="auto"
                priority={index <= 10}
                fetchPriority={index > 10 ? "low" : "high"}
                loading={index > 10 ? "lazy" : "eager"}
              />
            </div>

            <div>
              <AlbumIcon />
              <Button asChild>
                <Link href={`/albums/${folderPath}`}>
                  View Album
                </Link>
              </Button>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
import { getAlbums } from "@/app/actions/cloudinary";
import * as React from "react";
import { ClientAddToAlbumDialog } from "./client-add-to-album";

export const AddToAlbumDialog: React.FC = async () => {
  const { folders } = await getAlbums({});
  return <ClientAddToAlbumDialog folders={folders} />;
};

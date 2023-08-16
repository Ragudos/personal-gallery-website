
import { getAlbums } from "@/app/actions/cloudinary";
import * as React from "react";
import { ClientSideMenu } from "./client-side-menu";

export const SideMenuLinksContainer: React.FC = async () => {
  const { folders } = await getAlbums({});
  return <ClientSideMenu folders={folders} />;
};
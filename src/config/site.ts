import { AlbumIcon, GalleryIcon, HeartIcon } from "@/components/icons";

export const siteConfig = {
  title: "Aaron's Gallery",
  sideNav: [
    {
      name: "Gallery",
      id: "link-to-gallery",
      href: "/gallery",
      icon: GalleryIcon,
    },
    {
      name: "Albums",
      id: "link-to-albums",
      href: "/albums",
      icon: AlbumIcon,
    },
    {
      name: "Favorites",
      id: "link-to-favorites",
      href: "/favorites",
      icon: HeartIcon,
    },
  ],
};

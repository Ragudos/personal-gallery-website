"use server";

import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
export type ImageKeys = {
  public_id: string;
  width: number;
  height: number;
  filename: string;
  tags: string[];
  secure_url: string;
};

export type SearchResult = {
  resources: ImageKeys[];
  next_cursor: string;
};

export type Folders = {
  name: string;
  path: string;
};

export type AlbumsResponse = {
  folders: Folders[];
};

export const generateSignature = () => {
  const timestamp = Math.floor(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_SECRET as string,
  );

  return signature;
};

export const getImages = async (
  next_cursor?: string,
  expression?: string,
  max_results?: number,
) => {
  if (max_results) {
    const result = (await cloudinary.search
      .expression(expression ?? "resource_type:image")
      .sort_by("created_at", "desc")
      .next_cursor(next_cursor)
      .with_field("tags")
      .max_results(max_results)
      .execute()) as SearchResult;

    return result;
  } else {
    const result = (await cloudinary.search
      .expression(expression ?? "resource_type:image")
      .sort_by("created_at", "desc")
      .next_cursor(next_cursor)
      .with_field("tags")
      .execute()) as SearchResult;

    return result;
  }
};

export const setAsFavorite = async (publicId: string, isFavorite: boolean) => {
  if (isFavorite) {
    await cloudinary.uploader.remove_tag("favorite", [publicId]);
  } else {
    await cloudinary.uploader.add_tag("favorite", [publicId]);
  }
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        (function () {
          revalidatePath("/gallery");
          revalidatePath("/favorites");
          revalidatePath("/albums");
        })(),
      );
    }, 1000);
  });
};

export const getAlbums = async ({
  isWithThumbnail,
  rootFolder,
}: {
  isWithThumbnail?: boolean;
  rootFolder?: string;
}) => {
  const albums = (await cloudinary.api.sub_folders(
    rootFolder ?? "cloudinary-gallery-project",
  )) as AlbumsResponse;

  if (isWithThumbnail) {
    const allFolders = albums.folders;
    const images = [];

    for (const folder of allFolders) {
      const result = await getImages(
        undefined,
        `folder:${folder.path} AND resource_type:image`,
        1,
      );
      images.push({
        folderPath: folder.path,
        thumbnail: result.resources[0],
      });
    }

    return {
      folders: allFolders,
      thumbnails: images,
    };
  }

  return { folders: albums.folders };
};

export const addAlbum = async (formData: FormData) => {
  const name = formData.get("album-name") as string;

  await cloudinary.api.create_folder(`/cloudinary-gallery-project/${name}`);

  revalidatePath("/albums");
};

export const deleteImage = async (imgId: string, path: string) => {
  await cloudinary.api.delete_resources([imgId]);

  revalidatePath(path);
};

export const moveImage = async (
  imgId: string,
  folderName: string,
  rootFolder?: string,
) => {
  await cloudinary.uploader.rename(
    imgId,
    `${rootFolder ?? "cloudinary-gallery-project"}/${folderName}/${imgId
      .split("/")
      .at(-1)}`,
  );
  (function () {
    revalidatePath("/albums");
    revalidatePath("/gallery");
    revalidatePath("/favorites");
  })();
};

export const deleteAlbum = async (folderPath: string, resources?: ImageKeys[]) => {
  // recursively delete assets in a folder since we cannot delete a folder that
  // is not empty.
  let images: ImageKeys[];

  if (!resources) {
    images = (await getImages(undefined, `folder:${folderPath}`)).resources;
  } else {
    images = resources;
  }

  if (!images.length) {
    await cloudinary.api.delete_folder(folderPath);
    return;
  }

  await moveImage(images[images.length - 1].public_id, "", "cloudinary-gallery-project");

  (function () {
    revalidatePath("/albums");
    revalidatePath("/albums/:path*");
  })();

  // if we are at the last image, then just delete the folder
  // after moving it since we will have an empty folder on the
  // next iteration of this recursion.
  if (images.length === 1) {
    await deleteAlbum(folderPath, []);
  } else {
    await deleteAlbum(folderPath, images.slice(0, -1));
  }
};

export const getImageData = async (imgId: string) => {
  return await cloudinary.api.resource(imgId);
};
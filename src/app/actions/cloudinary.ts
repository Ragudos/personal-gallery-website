"use server";

import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
type ImageKeys = {
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

export const generateSignature = () => {
  const timestamp = Math.floor((new Date).getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request({
    timestamp
  }, process.env.CLOUDINARY_SECRET as string);

  return signature;
};

export const getImages = async (next_cursor?: string, expression?: string) => {
  const result = await cloudinary.search
    .expression(expression ?? "resource_type:image")
    .sort_by("created_at", "desc")
    .next_cursor(next_cursor)
    .with_field("tags")
    .execute() as SearchResult;

  return result;
};

export const setAsFavorite = async (
  publicId: string,
  isFavorite: boolean
) => {
  if (isFavorite) {
    await cloudinary.uploader.remove_tag("favorite", [publicId]);
  } else {
    await cloudinary.uploader.add_tag("favorite", [publicId]);
  }
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(revalidatePath("/gallery"));
    }, 1000);
  });
};
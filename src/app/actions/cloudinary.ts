"use server";

import { v2 as cloudinary } from "cloudinary";
type ImageKeys = {
  public_id: string;
  width: number;
  height: number;
  filename: string;
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

export const getImages = async (next_cursor?: string, max: number = 10) => {
  const result = await cloudinary.search
    .expression("resource_type:image AND tags=12stema7")
    .sort_by("public_id", "asc")
    .max_results(max)
    .next_cursor(next_cursor)
    .execute() as SearchResult;

  return result;
};
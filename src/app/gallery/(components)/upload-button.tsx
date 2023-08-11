"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";

// export type UploadResult = {

// };

export const UploadButton: React.FC = () => {
  return (
    <Button asChild>
      <CldUploadButton uploadPreset="" />
    </Button>
  );
};

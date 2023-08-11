"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { UploadIcon } from "@/components/icons";

// export type UploadResult = {

// };

export const UploadButton: React.FC = () => {
  return (
    <Button asChild>
      <CldUploadButton className="flex gap-1 items-center" uploadPreset="lx9juehj">
        <UploadIcon />
        Upload
      </CldUploadButton>
    </Button>
  );
};

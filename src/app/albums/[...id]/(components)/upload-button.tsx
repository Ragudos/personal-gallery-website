"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { CldUploadButton } from "next-cloudinary";
import { UploadIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

// export type UploadResult = {

// };

export const UploadButton: React.FC<{ folderPath: string }> = ({
  folderPath,
}) => {
  const router = useRouter();
  return (
    <Button asChild>
      <CldUploadButton
        className="flex gap-1 items-center"
        options={{
          folder: folderPath,
        }}
        onClose={() => {
          router.refresh();
        }}
        uploadPreset="lx9juehj"
        onUpload={() => {
          router.refresh();
        }}
      >
        <UploadIcon className="w-5 h-5" />
        Upload
      </CldUploadButton>
    </Button>
  );
};

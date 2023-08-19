"use client";

import * as React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { Folders, moveImage } from "@/app/actions/cloudinary";

export const ClientAddToAlbumDialog: React.FC<{ folders: Folders[] }> = ({
  folders,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const shouldShowModal = searchParams.get("addToAlbum");
  const imageId = searchParams.get("imageId");

  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    if (!dialogRef.current) return;
    const el = dialogRef.current;
    if (shouldShowModal === "true") {
      el.showModal();
    }
  }, [shouldShowModal, dialogRef, pathname, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dialogRef.current?.close();
    router.push(pathname);
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("album-name-select") as string;
    toast({
      title: `Moving image to ${name}.`,
    });
    try {
      await moveImage(imageId as string, name as string);
      toast({
        title: `The image has been moved to ${name} .`,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Something went wrong",
          description: error.message,
        });
      } else if (typeof error === "string") {
        toast({
          title: "Something went wrong",
          description: error,
        });
      }
    }
  };

  return (
    <Dialog
      ref={dialogRef}
      className="rounded-lg shadow-foreground/80 shadow-2xl"
    >
      <div className="p-8 w-[clamp(10rem,calc(80vw+0.1rem),27.5rem)] min-h-[17.5rem] h-[20vmin] bg-card">
        <h6 className="text-4xl font-bold">Move Image</h6>
        <p>Move an image to an album</p>
        <form className="py-6" onSubmit={handleSubmit}>
          {imageId ? (
            <React.Fragment>
              <Label htmlFor="album-name-select">Select an album</Label>
              <select
                name="album-name-select"
                id="album-name-select"
                placeholder="There are currently no albums."
                className=" w-full p-2 rounded-lg bg-background text-foreground border-[1px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {folders.length && folders.map((folder) => (
                  <option key={folder.path} value={folder.name}>
                    {folder.name}
                  </option>
                ))}
                {!folders.length && (
                  <option disabled value={""} selected>There are no albums</option>
                )}
              </select>
              <div className="flex justify-end gap-4 items-center mt-4">
                <Button type="submit" variant={"secondary"} disabled={folders.length < 1}>
                  Move image
                </Button>
                <Button
                  onClick={() => {
                    dialogRef.current?.close();
                    router.back();
                  }}
                  variant={"outline"}
                >
                  Cancel
                </Button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>Please select an image to move.</p>
              <Button
                onClick={() => {
                  dialogRef.current?.close();
                  router.back();
                }}
                variant={"outline"}
              >
                Cancel
              </Button>
            </React.Fragment>
          )}
        </form>
      </div>
    </Dialog>
  );
};

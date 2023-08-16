"use client";

import * as React from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Dialog } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { deleteAlbum, type Folders } from "@/app/actions/cloudinary";

const DeleteAlbumPopup: React.FC<{ folders: Folders[] }> = ({ folders }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [transition, startTransition] = React.useTransition();

  const shouldShowModal = searchParams.get("deleteAlbum");

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
    const formData = new FormData(e.target as HTMLFormElement);
    const path = formData.get("album-name-select-delete") as string;
    const name = path.split("/").at(-1);
    dialogRef.current?.close();
    router.push(pathname);
    toast({
      title: `Deleting the album ${name}.`,
    });
    if (!transition) {
      startTransition(async () => {
        try {
          await deleteAlbum(path);
          toast({
            title: `The album ${name} has been deleted.`,
          });
        } catch (error) {
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
          router.refresh();
        }
      });
    }
  };

  return (
    <Dialog
      ref={dialogRef}
      className="rounded-lg shadow-foreground/80 shadow-2xl"
    >
      <div className="p-8 w-[clamp(10rem,calc(80vw+0.1rem),27.5rem)] min-h-[17.5rem] h-[20vmin] bg-card">
        <h6 className="text-4xl font-bold">Delete Album</h6>
        <p>Choose an album to delete</p>
        <form className="py-6" onSubmit={handleSubmit}>
          <Label htmlFor="album-name-select-delete">Select an album</Label>
          <select
            name="album-name-select-delete"
            id="album-name-select-delete"
            placeholder="There are currently no albums."
            className=" w-full p-2 rounded-lg bg-background text-foreground border-[1px] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {folders.length &&
              folders.map((folder) => (
                <option key={folder.path} value={folder.path}>
                  {folder.name}
                </option>
              ))}
            {!folders.length && (
              <option disabled selected>
                There is no album
              </option>
            )}
          </select>
          <div className="flex justify-end gap-4 items-center mt-4">
            <Button
              disabled={!(folders.length > 0)}
              type="submit"
              variant={"secondary"}
            >
              Delete Album
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
        </form>
      </div>
    </Dialog>
  );
};

export default DeleteAlbumPopup;

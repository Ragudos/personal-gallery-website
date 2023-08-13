"use client";

import * as React from "react";
import { Dialog } from "@/components/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addAlbum } from "@/app/actions/cloudinary";
import { toast } from "@/components/ui/use-toast";

export const CreateAlbumPopup: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!dialogRef.current || !inputRef.current) return;
    const el = dialogRef.current;
    const el2 = inputRef.current;
    el2.focus();
    if (searchParams.get("showModal") === "true") {
      el.showModal();
    }
  }, [searchParams, dialogRef, pathname, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("album-name");
    dialogRef.current?.close();
    router.push(pathname);
    toast({
      title: `Adding ${name} to albums.`
    });
    try {
      await addAlbum(formData);
      toast({
        title: `The album ${name} has been added.`
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Something went wrong",
          description: error.message
        });
      } else if (typeof error === "string") {
        toast({
          title: "Something went wrong",
          description: error
        });
      }
    };
  };

  return (
    <Dialog ref={dialogRef} className="rounded-lg shadow-foreground/80 shadow-2xl">
      <div className="p-8 w-[clamp(10rem,calc(80vw+0.1rem),27.5rem)] min-h-[17.5rem] h-[20vmin] bg-card">
        <h6 className="text-4xl font-bold">Add an Album</h6>
        <p>Create a new album</p>
        <form className="py-6" onSubmit={handleSubmit}>
          <Label htmlFor="album-name">Album name</Label>
          <Input
            type="text"
            name="album-name"
            id="album-name"
            placeholder="My awesome collection of images 😎"
            className="w-full"
            minLength={3}
            pattern="[A-Za-z0-9]{3,}"
            required
            ref={inputRef}
          />
          <div className="flex justify-end gap-4 items-center mt-4">
            <Button
              type="submit"
              variant={"secondary"}
            >
              Add album
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
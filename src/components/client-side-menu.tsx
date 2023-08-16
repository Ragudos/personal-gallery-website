"use client";

import * as React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Folders } from "@/app/actions/cloudinary";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export const ClientSideMenu: React.FC<{ folders: Folders[] }> = ({
  folders
}) => {
  const pathname = usePathname();

  const [toggle, setToggle] = React.useState(false);

  const handleClose = () => {
    setToggle(false);
  };

  return (
    <React.Fragment>
      {siteConfig.sideNav.map((link) => {
        if (link.name === "Albums") {
          return (
            <li key={link.id}>
              <Popover open={toggle} onOpenChange={(state) => {
                setToggle(state);
                if (!state) {
                  handleClose();
                }
              }}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full gap-2 justify-start",
                      { "bg-accent": pathname.startsWith(link.href) }
                    )}
                    aria-label={link.name}
                    title={link.name}
                    onClick={() => setToggle((p) => (!p))}
                  >
                    <link.icon />
                    {link.name}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="m-4" sideOffset={2}>
                  <div className="flex flex-col gap-[0.25rem]" role="list">
                    <Button asChild variant={"ghost"} className={cn("w-full gap-2 justify-start", { "bg-accent": pathname === "/albums" })}>
                      <Link
                        role="listitem"
                        href={"/albums"}
                        aria-label="Show all albums"
                        title="Show all albums"
                        onClick={() => handleClose()}
                      >
                        All albums
                      </Link>
                    </Button>
                    {folders.map((folder) => {
                      const href = `/albums/${folder.path}`;
                      return (
                        <React.Fragment key={folder.path + "side-menu-link"}>
                          <Button asChild variant={"ghost"} className={cn("w-full gap-2 justify-start", { "bg-accent": pathname === href })}>
                            <Link
                              role="listitem"
                              href={href}
                              aria-label={folder.name}
                              title={folder.name}
                              onClick={() => handleClose()}
                            >
                              {folder.name}
                            </Link>
                          </Button>
                        </React.Fragment>
                      );
                    })}
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          );
        } else {
          return (
            <li key={link.id}>
              <Button asChild variant={"ghost"} className={cn("w-full gap-2 justify-start", { "bg-accent": pathname === link.href })}>
                <Link
                  href={link.href}
                  aria-label={link.name}
                  title={link.name}
                >
                  <link.icon />
                  {link.name}
                </Link>
              </Button>
            </li>
          );
        }
      })}
    </React.Fragment>
  );
};

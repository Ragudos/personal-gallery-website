import * as React from "react";
import { HomeIcon } from "./icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "./ui/button";

export const Header: React.FC = () => {
  const session = null;
  return (
    <header className="border-b-2 p-2">
      <div className="container flex items-center justify-between gap-8">
        <div>
          <Link
            href={"/"}
            title={`Go to ${siteConfig.title}'s Homepage`}
            aria-label={`Go to ${siteConfig.title}'s Homepage`}
            className="flex gap-2 items-center"
          >
            <HomeIcon />
            <span className="text-lg font-bold">{siteConfig.title}</span>
          </Link>
        </div>

        <div>
          {session ? (
            <Button size={"sm"} variant={"outline"}>
              Sign out
            </Button>
          ) : (
            <Button size={"sm"} variant={"outline"}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

import * as React from "react";
import { HomeIcon } from "./icons";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ClientHeader } from "./client-header";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 border-b-2 p-2 z-30 bg-background/80 backdrop-blur-lg">
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
        <ClientHeader session={null} />
      </div>
    </header>
  );
};

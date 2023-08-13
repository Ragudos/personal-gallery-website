"use client";

import * as React from "react";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export const ClientSideMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <React.Fragment>
      {
        siteConfig.sideNav.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              aria-label={link.name}
              title={link.name}
              className={cn(buttonVariants({
                variant: "ghost",
                className: "w-full p-4 justify-start gap-2"
              }), {
                "bg-accent": pathname === link.href
              })}
            >
              <link.icon />
              {link.name}
            </Link>
          </li>
        ))
      }
    </React.Fragment>
  );
};
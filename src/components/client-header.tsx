"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "./icons";
import { useOnMount } from "@/lib/hooks/use-on-mount";

export const ClientHeader: React.FC<{
  session: null;
}> = ({ session }) => {
  return (
    <div className="flex gap-2 items-center">
      <ThemeToggle />
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
  );
};

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const didMount = useOnMount();

  const toggleNight = () => {
    if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("dark");
    }
  };

  const toggleLight = () => {
    if (theme === "light") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <React.Fragment>
      {didMount && (
        <React.Fragment>
          <Label htmlFor="night-theme" className="sr-only">
            Toggle night theme
          </Label>
          <Button
            variant={"ghost"}
            size={"icon"}
            id="night-theme"
            name="night-theme"
            aria-label="Toggle night theme"
            onClick={toggleNight}
            className={`p-0 w-8 h-8${theme === "dark" ? " bg-foreground/10" : ""} active:bg-foreground/20`}
          >
            <MoonIcon className="w-full h-full object-contain" />
          </Button>

          <Label htmlFor="light-theme" className="sr-only">
            Toggle light theme
          </Label>
          <Button
            variant={"ghost"}
            size={"icon"}
            id="light-theme"
            name="light-theme"
            aria-label="Toggle light theme"
            onClick={toggleLight}
            className={`p-0 w-8 h-8${theme === "light" ? " bg-foreground/10" : ""} active:bg-foreground/20`}
          >
            <SunIcon className="w-full h-full object-contain" />
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

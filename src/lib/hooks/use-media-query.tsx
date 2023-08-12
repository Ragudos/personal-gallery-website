"use client";

import * as React from "react";
import { useOnMount } from "./use-on-mount";

type MediaQuery =
  | "(min-width: 480px)"
  | "(min-width: 640px)"
  | "(min-width: 769px)"
  | "(min-width: 1024px)"
  | "(min-width: 1280px)"
  | "(min-width: 1536px)"
  | "(prefers-color-scheme: dark)"
  | "(prefers-color-scheme: light)"
  | "(prefers-reduced-motion)"
  | "(orientation: portrait)"
  | "(orientation: landscape)";

export const useMediaQuery = (mediaQuery: MediaQuery) => {
  const [matches, setMatches] = React.useState(false);
  const didMount = useOnMount();

  React.useEffect(() => {
    if (!didMount) return;
    const query = window.matchMedia(mediaQuery);
    setMatches(query.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, [matches, didMount, mediaQuery]);

  return matches;
};

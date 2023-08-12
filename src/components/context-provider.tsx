"use client";

import * as React from "react";

import { ThemeProvider } from "next-themes";
import { Toaster } from "./ui/toaster";

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <ThemeProvider attribute="class"><Toaster />{children}</ThemeProvider>;
};

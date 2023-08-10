"use client";

import * as React from "react";

import { ThemeProvider } from "next-themes";

export const ContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};
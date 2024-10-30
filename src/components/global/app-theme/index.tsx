"use client";

import { ReactNode } from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";

const AppTheme = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex size-full flex-col">
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </div>
  );
};

export default AppTheme;

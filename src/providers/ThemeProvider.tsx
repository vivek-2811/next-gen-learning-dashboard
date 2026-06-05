"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Theme provider wrapping next-themes.
 *
 * - `attribute="class"` — adds "dark" / "light" class to <html>
 * - `defaultTheme="dark"` — dark mode by default
 * - `enableSystem` — respects OS preference if set to "system"
 * - `disableTransitionOnChange` is false — smooth CSS transitions
 * - Theme persisted in localStorage automatically by next-themes
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
